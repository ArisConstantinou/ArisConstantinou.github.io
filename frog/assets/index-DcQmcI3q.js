(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Uc="180",vf=0,Mh=1,_f=2,ed=1,yf=2,Ei=3,zi=0,Pn=1,Pe=2,ts=0,dr=1,bh=2,Sh=3,wh=4,Mf=5,_s=100,bf=101,Sf=102,wf=103,Ef=104,Tf=200,Af=201,Rf=202,Cf=203,Fl=204,Ol=205,Pf=206,Df=207,If=208,zf=209,Lf=210,Uf=211,Nf=212,kf=213,Ff=214,Bl=0,Hl=1,Gl=2,xr=3,Vl=4,Wl=5,Xl=6,ql=7,nd=0,Of=1,Bf=2,es=0,Hf=1,Gf=2,Vf=3,id=4,Wf=5,Xf=6,qf=7,Eh="attached",$f="detached",sd=300,vr=301,_r=302,$l=303,Yl=304,ya=306,yr=1e3,Ki=1001,Zl=1002,Bn=1003,Yf=1004,vo=1005,ii=1006,Fa=1007,Ji=1008,pi=1009,rd=1010,od=1011,eo=1012,Nc=1013,Ss=1014,si=1015,ho=1016,kc=1017,Fc=1018,no=1020,ad=35902,ld=35899,cd=1021,hd=1022,On=1023,io=1026,so=1027,Oc=1028,Bc=1029,ud=1030,Hc=1031,Gc=1033,ra=33776,oa=33777,aa=33778,la=33779,jl=35840,Kl=35841,Jl=35842,Ql=35843,tc=36196,ec=37492,nc=37496,ic=37808,sc=37809,rc=37810,oc=37811,ac=37812,lc=37813,cc=37814,hc=37815,uc=37816,dc=37817,fc=37818,pc=37819,mc=37820,gc=37821,xc=36492,vc=36494,_c=36495,yc=36283,Mc=36284,bc=36285,Sc=36286,Zf=3200,jf=3201,Vc=0,Kf=1,Ti="",In="srgb",Mr="srgb-linear",ha="linear",Ge="srgb",Os=7680,Th=519,Jf=512,Qf=513,tp=514,dd=515,ep=516,np=517,ip=518,sp=519,Ah=35044,Ai=35048,Rh="300 es",di=2e3,ua=2001;class wr{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const s=n[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const bn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Ch=1234567;const Zr=Math.PI/180,ro=180/Math.PI;function As(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(bn[i&255]+bn[i>>8&255]+bn[i>>16&255]+bn[i>>24&255]+"-"+bn[t&255]+bn[t>>8&255]+"-"+bn[t>>16&15|64]+bn[t>>24&255]+"-"+bn[e&63|128]+bn[e>>8&255]+"-"+bn[e>>16&255]+bn[e>>24&255]+bn[n&255]+bn[n>>8&255]+bn[n>>16&255]+bn[n>>24&255]).toLowerCase()}function Se(i,t,e){return Math.max(t,Math.min(e,i))}function Wc(i,t){return(i%t+t)%t}function rp(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function op(i,t,e){return i!==t?(e-i)/(t-i):0}function jr(i,t,e){return(1-e)*i+e*t}function ap(i,t,e,n){return jr(i,t,1-Math.exp(-e*n))}function lp(i,t=1){return t-Math.abs(Wc(i,t*2)-t)}function cp(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function hp(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function up(i,t){return i+Math.floor(Math.random()*(t-i+1))}function dp(i,t){return i+Math.random()*(t-i)}function fp(i){return i*(.5-Math.random())}function pp(i){i!==void 0&&(Ch=i);let t=Ch+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function mp(i){return i*Zr}function gp(i){return i*ro}function xp(i){return(i&i-1)===0&&i!==0}function vp(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function _p(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function yp(i,t,e,n,s){const r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+n)/2),h=o((t+n)/2),u=r((t-n)/2),d=o((t-n)/2),f=r((n-t)/2),m=o((n-t)/2);switch(s){case"XYX":i.set(a*h,l*u,l*d,a*c);break;case"YZY":i.set(l*d,a*h,l*u,a*c);break;case"ZXZ":i.set(l*u,l*d,a*h,a*c);break;case"XZX":i.set(a*h,l*m,l*f,a*c);break;case"YXY":i.set(l*f,a*h,l*m,a*c);break;case"ZYZ":i.set(l*m,l*f,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function rr(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function An(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const wc={DEG2RAD:Zr,RAD2DEG:ro,generateUUID:As,clamp:Se,euclideanModulo:Wc,mapLinear:rp,inverseLerp:op,lerp:jr,damp:ap,pingpong:lp,smoothstep:cp,smootherstep:hp,randInt:up,randFloat:dp,randFloatSpread:fp,seededRandom:pp,degToRad:mp,radToDeg:gp,isPowerOfTwo:xp,ceilPowerOfTwo:vp,floorPowerOfTwo:_p,setQuaternionFromProperEuler:yp,normalize:An,denormalize:rr};class Wt{constructor(t=0,e=0){Wt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Se(this.x,t.x,e.x),this.y=Se(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Se(this.x,t,e),this.y=Se(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Se(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Se(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ns{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3];const d=r[o+0],f=r[o+1],m=r[o+2],x=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=d,t[e+1]=f,t[e+2]=m,t[e+3]=x;return}if(u!==x||l!==d||c!==f||h!==m){let g=1-a;const p=l*d+c*f+h*m+u*x,v=p>=0?1:-1,y=1-p*p;if(y>Number.EPSILON){const T=Math.sqrt(y),A=Math.atan2(T,p*v);g=Math.sin(g*A)/T,a=Math.sin(a*A)/T}const _=a*v;if(l=l*g+d*_,c=c*g+f*_,h=h*g+m*_,u=u*g+x*_,g===1-a){const T=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=T,c*=T,h*=T,u*=T}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,o){const a=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[o],d=r[o+1],f=r[o+2],m=r[o+3];return t[e]=a*m+h*u+l*f-c*d,t[e+1]=l*m+h*d+c*u-a*f,t[e+2]=c*m+h*f+a*d-l*u,t[e+3]=h*m-a*u-l*d-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(s/2),u=a(r/2),d=l(n/2),f=l(s/2),m=l(r/2);switch(o){case"XYZ":this._x=d*h*u+c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u-d*f*m;break;case"YXZ":this._x=d*h*u+c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u+d*f*m;break;case"ZXY":this._x=d*h*u-c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u-d*f*m;break;case"ZYX":this._x=d*h*u-c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u+d*f*m;break;case"YZX":this._x=d*h*u+c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u-d*f*m;break;case"XZY":this._x=d*h*u-c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u+d*f*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=n+a+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-s)*f}else if(n>a&&n>u){const f=2*Math.sqrt(1+n-a-u);this._w=(h-l)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+c)/f}else if(a>u){const f=2*Math.sqrt(1+a-n-u);this._w=(r-c)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-n-a);this._w=(o-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Se(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-s*a,this._w=o*h-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-e)*h)/c,d=Math.sin(e*h)/c;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(t=0,e=0,n=0){L.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Ph.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Ph.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*n),h=2*(a*e-r*s),u=2*(r*n-o*e);return this.x=e+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=s+l*u+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Se(this.x,t.x,e.x),this.y=Se(this.y,t.y,e.y),this.z=Se(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Se(this.x,t,e),this.y=Se(this.y,t,e),this.z=Se(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Se(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Oa.copy(this).projectOnVector(t),this.sub(Oa)}reflect(t){return this.sub(Oa.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Se(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Oa=new L,Ph=new ns;class xe{constructor(t,e,n,s,r,o,a,l,c){xe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c)}set(t,e,n,s,r,o,a,l,c){const h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],m=n[8],x=s[0],g=s[3],p=s[6],v=s[1],y=s[4],_=s[7],T=s[2],A=s[5],E=s[8];return r[0]=o*x+a*v+l*T,r[3]=o*g+a*y+l*A,r[6]=o*p+a*_+l*E,r[1]=c*x+h*v+u*T,r[4]=c*g+h*y+u*A,r[7]=c*p+h*_+u*E,r[2]=d*x+f*v+m*T,r[5]=d*g+f*y+m*A,r[8]=d*p+f*_+m*E,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*r*h+n*a*l+s*r*c-s*o*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,d=a*l-h*r,f=c*r-o*l,m=e*u+n*d+s*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/m;return t[0]=u*x,t[1]=(s*c-h*n)*x,t[2]=(a*n-s*o)*x,t[3]=d*x,t[4]=(h*e-s*l)*x,t[5]=(s*r-a*e)*x,t[6]=f*x,t[7]=(n*l-c*e)*x,t[8]=(o*e-n*r)*x,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Ba.makeScale(t,e)),this}rotate(t){return this.premultiply(Ba.makeRotation(-t)),this}translate(t,e){return this.premultiply(Ba.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Ba=new xe;function fd(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function da(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Mp(){const i=da("canvas");return i.style.display="block",i}const Dh={};function oo(i){i in Dh||(Dh[i]=!0,console.warn(i))}function bp(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const Ih=new xe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),zh=new xe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Sp(){const i={enabled:!0,workingColorSpace:Mr,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===Ge&&(s.r=Di(s.r),s.g=Di(s.g),s.b=Di(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Ge&&(s.r=fr(s.r),s.g=fr(s.g),s.b=fr(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Ti?ha:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return oo("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return oo("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Mr]:{primaries:t,whitePoint:n,transfer:ha,toXYZ:Ih,fromXYZ:zh,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:In},outputColorSpaceConfig:{drawingBufferColorSpace:In}},[In]:{primaries:t,whitePoint:n,transfer:Ge,toXYZ:Ih,fromXYZ:zh,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:In}}}),i}const Ue=Sp();function Di(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function fr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Bs;class wp{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Bs===void 0&&(Bs=da("canvas")),Bs.width=t.width,Bs.height=t.height;const s=Bs.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=Bs}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=da("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Di(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Di(e[n]/255)*255):e[n]=Di(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Ep=0;class Xc{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ep++}),this.uuid=As(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Ha(s[o].image)):r.push(Ha(s[o]))}else r=Ha(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function Ha(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?wp.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Tp=0;const Ga=new L;class En extends wr{constructor(t=En.DEFAULT_IMAGE,e=En.DEFAULT_MAPPING,n=Ki,s=Ki,r=ii,o=Ji,a=On,l=pi,c=En.DEFAULT_ANISOTROPY,h=Ti){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Tp++}),this.uuid=As(),this.name="",this.source=new Xc(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Wt(0,0),this.repeat=new Wt(1,1),this.center=new Wt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new xe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Ga).x}get height(){return this.source.getSize(Ga).y}get depth(){return this.source.getSize(Ga).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==sd)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case yr:t.x=t.x-Math.floor(t.x);break;case Ki:t.x=t.x<0?0:1;break;case Zl:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case yr:t.y=t.y-Math.floor(t.y);break;case Ki:t.y=t.y<0?0:1;break;case Zl:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}En.DEFAULT_IMAGE=null;En.DEFAULT_MAPPING=sd;En.DEFAULT_ANISOTROPY=1;class ze{constructor(t=0,e=0,n=0,s=1){ze.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],m=l[9],x=l[2],g=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-x)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+x)<.1&&Math.abs(m+g)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const y=(c+1)/2,_=(f+1)/2,T=(p+1)/2,A=(h+d)/4,E=(u+x)/4,C=(m+g)/4;return y>_&&y>T?y<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(y),s=A/n,r=E/n):_>T?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=A/s,r=C/s):T<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),n=E/r,s=C/r),this.set(n,s,r,e),this}let v=Math.sqrt((g-m)*(g-m)+(u-x)*(u-x)+(d-h)*(d-h));return Math.abs(v)<.001&&(v=1),this.x=(g-m)/v,this.y=(u-x)/v,this.z=(d-h)/v,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Se(this.x,t.x,e.x),this.y=Se(this.y,t.y,e.y),this.z=Se(this.z,t.z,e.z),this.w=Se(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Se(this.x,t,e),this.y=Se(this.y,t,e),this.z=Se(this.z,t,e),this.w=Se(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Se(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Ap extends wr{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ii,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new ze(0,0,t,e),this.scissorTest=!1,this.viewport=new ze(0,0,t,e);const s={width:t,height:e,depth:n.depth},r=new En(s);this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){const e={minFilter:ii,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new Xc(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class is extends Ap{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class pd extends En{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Bn,this.minFilter=Bn,this.wrapR=Ki,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Rp extends En{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Bn,this.minFilter=Bn,this.wrapR=Ki,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class qn{constructor(t=new L(1/0,1/0,1/0),e=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Kn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Kn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Kn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Kn):Kn.fromBufferAttribute(r,o),Kn.applyMatrix4(t.matrixWorld),this.expandByPoint(Kn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),_o.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),_o.copy(n.boundingBox)),_o.applyMatrix4(t.matrixWorld),this.union(_o)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Kn),Kn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ur),yo.subVectors(this.max,Ur),Hs.subVectors(t.a,Ur),Gs.subVectors(t.b,Ur),Vs.subVectors(t.c,Ur),Bi.subVectors(Gs,Hs),Hi.subVectors(Vs,Gs),hs.subVectors(Hs,Vs);let e=[0,-Bi.z,Bi.y,0,-Hi.z,Hi.y,0,-hs.z,hs.y,Bi.z,0,-Bi.x,Hi.z,0,-Hi.x,hs.z,0,-hs.x,-Bi.y,Bi.x,0,-Hi.y,Hi.x,0,-hs.y,hs.x,0];return!Va(e,Hs,Gs,Vs,yo)||(e=[1,0,0,0,1,0,0,0,1],!Va(e,Hs,Gs,Vs,yo))?!1:(Mo.crossVectors(Bi,Hi),e=[Mo.x,Mo.y,Mo.z],Va(e,Hs,Gs,Vs,yo))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Kn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Kn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(_i[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),_i[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),_i[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),_i[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),_i[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),_i[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),_i[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),_i[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(_i),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const _i=[new L,new L,new L,new L,new L,new L,new L,new L],Kn=new L,_o=new qn,Hs=new L,Gs=new L,Vs=new L,Bi=new L,Hi=new L,hs=new L,Ur=new L,yo=new L,Mo=new L,us=new L;function Va(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){us.fromArray(i,r);const a=s.x*Math.abs(us.x)+s.y*Math.abs(us.y)+s.z*Math.abs(us.z),l=t.dot(us),c=e.dot(us),h=n.dot(us);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const Cp=new qn,Nr=new L,Wa=new L;class Ui{constructor(t=new L,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Cp.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Nr.subVectors(t,this.center);const e=Nr.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Nr,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Wa.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Nr.copy(t.center).add(Wa)),this.expandByPoint(Nr.copy(t.center).sub(Wa))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const yi=new L,Xa=new L,bo=new L,Gi=new L,qa=new L,So=new L,$a=new L;class ws{constructor(t=new L,e=new L(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,yi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=yi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(yi.copy(this.origin).addScaledVector(this.direction,e),yi.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Xa.copy(t).add(e).multiplyScalar(.5),bo.copy(e).sub(t).normalize(),Gi.copy(this.origin).sub(Xa);const r=t.distanceTo(e)*.5,o=-this.direction.dot(bo),a=Gi.dot(this.direction),l=-Gi.dot(bo),c=Gi.lengthSq(),h=Math.abs(1-o*o);let u,d,f,m;if(h>0)if(u=o*l-a,d=o*a-l,m=r*h,u>=0)if(d>=-m)if(d<=m){const x=1/h;u*=x,d*=x,f=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d<=-m?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=m?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Xa).addScaledVector(bo,d),f}intersectSphere(t,e){yi.subVectors(t.center,this.origin);const n=yi.dot(this.direction),s=yi.dot(yi)-n*n,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,s=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,s=(t.min.x-d.x)*c),h>=0?(r=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,yi)!==null}intersectTriangle(t,e,n,s,r){qa.subVectors(e,t),So.subVectors(n,t),$a.crossVectors(qa,So);let o=this.direction.dot($a),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Gi.subVectors(this.origin,t);const l=a*this.direction.dot(So.crossVectors(Gi,So));if(l<0)return null;const c=a*this.direction.dot(qa.cross(Gi));if(c<0||l+c>o)return null;const h=-a*Gi.dot($a);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class he{constructor(t,e,n,s,r,o,a,l,c,h,u,d,f,m,x,g){he.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c,h,u,d,f,m,x,g)}set(t,e,n,s,r,o,a,l,c,h,u,d,f,m,x,g){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=m,p[11]=x,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new he().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/Ws.setFromMatrixColumn(t,0).length(),r=1/Ws.setFromMatrixColumn(t,1).length(),o=1/Ws.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const d=o*h,f=o*u,m=a*h,x=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=f+m*c,e[5]=d-x*c,e[9]=-a*l,e[2]=x-d*c,e[6]=m+f*c,e[10]=o*l}else if(t.order==="YXZ"){const d=l*h,f=l*u,m=c*h,x=c*u;e[0]=d+x*a,e[4]=m*a-f,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=f*a-m,e[6]=x+d*a,e[10]=o*l}else if(t.order==="ZXY"){const d=l*h,f=l*u,m=c*h,x=c*u;e[0]=d-x*a,e[4]=-o*u,e[8]=m+f*a,e[1]=f+m*a,e[5]=o*h,e[9]=x-d*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const d=o*h,f=o*u,m=a*h,x=a*u;e[0]=l*h,e[4]=m*c-f,e[8]=d*c+x,e[1]=l*u,e[5]=x*c+d,e[9]=f*c-m,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const d=o*l,f=o*c,m=a*l,x=a*c;e[0]=l*h,e[4]=x-d*u,e[8]=m*u+f,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=f*u+m,e[10]=d-x*u}else if(t.order==="XZY"){const d=o*l,f=o*c,m=a*l,x=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+x,e[5]=o*h,e[9]=f*u-m,e[2]=m*u-f,e[6]=a*h,e[10]=x*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Pp,t,Dp)}lookAt(t,e,n){const s=this.elements;return Nn.subVectors(t,e),Nn.lengthSq()===0&&(Nn.z=1),Nn.normalize(),Vi.crossVectors(n,Nn),Vi.lengthSq()===0&&(Math.abs(n.z)===1?Nn.x+=1e-4:Nn.z+=1e-4,Nn.normalize(),Vi.crossVectors(n,Nn)),Vi.normalize(),wo.crossVectors(Nn,Vi),s[0]=Vi.x,s[4]=wo.x,s[8]=Nn.x,s[1]=Vi.y,s[5]=wo.y,s[9]=Nn.y,s[2]=Vi.z,s[6]=wo.z,s[10]=Nn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],m=n[2],x=n[6],g=n[10],p=n[14],v=n[3],y=n[7],_=n[11],T=n[15],A=s[0],E=s[4],C=s[8],S=s[12],b=s[1],U=s[5],P=s[9],G=s[13],j=s[2],H=s[6],q=s[10],B=s[14],O=s[3],Q=s[7],W=s[11],ft=s[15];return r[0]=o*A+a*b+l*j+c*O,r[4]=o*E+a*U+l*H+c*Q,r[8]=o*C+a*P+l*q+c*W,r[12]=o*S+a*G+l*B+c*ft,r[1]=h*A+u*b+d*j+f*O,r[5]=h*E+u*U+d*H+f*Q,r[9]=h*C+u*P+d*q+f*W,r[13]=h*S+u*G+d*B+f*ft,r[2]=m*A+x*b+g*j+p*O,r[6]=m*E+x*U+g*H+p*Q,r[10]=m*C+x*P+g*q+p*W,r[14]=m*S+x*G+g*B+p*ft,r[3]=v*A+y*b+_*j+T*O,r[7]=v*E+y*U+_*H+T*Q,r[11]=v*C+y*P+_*q+T*W,r[15]=v*S+y*G+_*B+T*ft,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],f=t[14],m=t[3],x=t[7],g=t[11],p=t[15];return m*(+r*l*u-s*c*u-r*a*d+n*c*d+s*a*f-n*l*f)+x*(+e*l*f-e*c*d+r*o*d-s*o*f+s*c*h-r*l*h)+g*(+e*c*u-e*a*f-r*o*u+n*o*f+r*a*h-n*c*h)+p*(-s*a*h-e*l*u+e*a*d+s*o*u-n*o*d+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],f=t[11],m=t[12],x=t[13],g=t[14],p=t[15],v=u*g*c-x*d*c+x*l*f-a*g*f-u*l*p+a*d*p,y=m*d*c-h*g*c-m*l*f+o*g*f+h*l*p-o*d*p,_=h*x*c-m*u*c+m*a*f-o*x*f-h*a*p+o*u*p,T=m*u*l-h*x*l-m*a*d+o*x*d+h*a*g-o*u*g,A=e*v+n*y+s*_+r*T;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const E=1/A;return t[0]=v*E,t[1]=(x*d*r-u*g*r-x*s*f+n*g*f+u*s*p-n*d*p)*E,t[2]=(a*g*r-x*l*r+x*s*c-n*g*c-a*s*p+n*l*p)*E,t[3]=(u*l*r-a*d*r-u*s*c+n*d*c+a*s*f-n*l*f)*E,t[4]=y*E,t[5]=(h*g*r-m*d*r+m*s*f-e*g*f-h*s*p+e*d*p)*E,t[6]=(m*l*r-o*g*r-m*s*c+e*g*c+o*s*p-e*l*p)*E,t[7]=(o*d*r-h*l*r+h*s*c-e*d*c-o*s*f+e*l*f)*E,t[8]=_*E,t[9]=(m*u*r-h*x*r-m*n*f+e*x*f+h*n*p-e*u*p)*E,t[10]=(o*x*r-m*a*r+m*n*c-e*x*c-o*n*p+e*a*p)*E,t[11]=(h*a*r-o*u*r-h*n*c+e*u*c+o*n*f-e*a*f)*E,t[12]=T*E,t[13]=(h*x*s-m*u*s+m*n*d-e*x*d-h*n*g+e*u*g)*E,t[14]=(m*a*s-o*x*s-m*n*l+e*x*l+o*n*g-e*a*g)*E,t[15]=(o*u*s-h*a*s+h*n*l-e*u*l-o*n*d+e*a*d)*E,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+n,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,u=a+a,d=r*c,f=r*h,m=r*u,x=o*h,g=o*u,p=a*u,v=l*c,y=l*h,_=l*u,T=n.x,A=n.y,E=n.z;return s[0]=(1-(x+p))*T,s[1]=(f+_)*T,s[2]=(m-y)*T,s[3]=0,s[4]=(f-_)*A,s[5]=(1-(d+p))*A,s[6]=(g+v)*A,s[7]=0,s[8]=(m+y)*E,s[9]=(g-v)*E,s[10]=(1-(d+x))*E,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=Ws.set(s[0],s[1],s[2]).length();const o=Ws.set(s[4],s[5],s[6]).length(),a=Ws.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],Jn.copy(this);const c=1/r,h=1/o,u=1/a;return Jn.elements[0]*=c,Jn.elements[1]*=c,Jn.elements[2]*=c,Jn.elements[4]*=h,Jn.elements[5]*=h,Jn.elements[6]*=h,Jn.elements[8]*=u,Jn.elements[9]*=u,Jn.elements[10]*=u,e.setFromRotationMatrix(Jn),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=di,l=!1){const c=this.elements,h=2*r/(e-t),u=2*r/(n-s),d=(e+t)/(e-t),f=(n+s)/(n-s);let m,x;if(l)m=r/(o-r),x=o*r/(o-r);else if(a===di)m=-(o+r)/(o-r),x=-2*o*r/(o-r);else if(a===ua)m=-o/(o-r),x=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=di,l=!1){const c=this.elements,h=2/(e-t),u=2/(n-s),d=-(e+t)/(e-t),f=-(n+s)/(n-s);let m,x;if(l)m=1/(o-r),x=o/(o-r);else if(a===di)m=-2/(o-r),x=-(o+r)/(o-r);else if(a===ua)m=-1/(o-r),x=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=m,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Ws=new L,Jn=new he,Pp=new L(0,0,0),Dp=new L(1,1,1),Vi=new L,wo=new L,Nn=new L,Lh=new he,Uh=new ns;class mi{constructor(t=0,e=0,n=0,s=mi.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(Se(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Se(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Se(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Se(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Se(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Se(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Lh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Lh,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Uh.setFromEuler(this),this.setFromQuaternion(Uh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}mi.DEFAULT_ORDER="XYZ";class qc{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Ip=0;const Nh=new L,Xs=new ns,Mi=new he,Eo=new L,kr=new L,zp=new L,Lp=new ns,kh=new L(1,0,0),Fh=new L(0,1,0),Oh=new L(0,0,1),Bh={type:"added"},Up={type:"removed"},qs={type:"childadded",child:null},Ya={type:"childremoved",child:null};class We extends wr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ip++}),this.uuid=As(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=We.DEFAULT_UP.clone();const t=new L,e=new mi,n=new ns,s=new L(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new he},normalMatrix:{value:new xe}}),this.matrix=new he,this.matrixWorld=new he,this.matrixAutoUpdate=We.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=We.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new qc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Xs.setFromAxisAngle(t,e),this.quaternion.multiply(Xs),this}rotateOnWorldAxis(t,e){return Xs.setFromAxisAngle(t,e),this.quaternion.premultiply(Xs),this}rotateX(t){return this.rotateOnAxis(kh,t)}rotateY(t){return this.rotateOnAxis(Fh,t)}rotateZ(t){return this.rotateOnAxis(Oh,t)}translateOnAxis(t,e){return Nh.copy(t).applyQuaternion(this.quaternion),this.position.add(Nh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(kh,t)}translateY(t){return this.translateOnAxis(Fh,t)}translateZ(t){return this.translateOnAxis(Oh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Mi.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Eo.copy(t):Eo.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),kr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Mi.lookAt(kr,Eo,this.up):Mi.lookAt(Eo,kr,this.up),this.quaternion.setFromRotationMatrix(Mi),s&&(Mi.extractRotation(s.matrixWorld),Xs.setFromRotationMatrix(Mi),this.quaternion.premultiply(Xs.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Bh),qs.child=t,this.dispatchEvent(qs),qs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Up),Ya.child=t,this.dispatchEvent(Ya),Ya.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Mi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Mi.multiply(t.parent.matrixWorld)),t.applyMatrix4(Mi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Bh),qs.child=t,this.dispatchEvent(qs),qs.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(kr,t,zp),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(kr,Lp,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),u=o(t.shapes),d=o(t.skeletons),f=o(t.animations),m=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=s,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}We.DEFAULT_UP=new L(0,1,0);We.DEFAULT_MATRIX_AUTO_UPDATE=!0;We.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Qn=new L,bi=new L,Za=new L,Si=new L,$s=new L,Ys=new L,Hh=new L,ja=new L,Ka=new L,Ja=new L,Qa=new ze,tl=new ze,el=new ze;class Vn{constructor(t=new L,e=new L,n=new L){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),Qn.subVectors(t,e),s.cross(Qn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){Qn.subVectors(s,e),bi.subVectors(n,e),Za.subVectors(t,e);const o=Qn.dot(Qn),a=Qn.dot(bi),l=Qn.dot(Za),c=bi.dot(bi),h=bi.dot(Za),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(c*l-a*h)*d,m=(o*h-a*l)*d;return r.set(1-f-m,m,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Si)===null?!1:Si.x>=0&&Si.y>=0&&Si.x+Si.y<=1}static getInterpolation(t,e,n,s,r,o,a,l){return this.getBarycoord(t,e,n,s,Si)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Si.x),l.addScaledVector(o,Si.y),l.addScaledVector(a,Si.z),l)}static getInterpolatedAttribute(t,e,n,s,r,o){return Qa.setScalar(0),tl.setScalar(0),el.setScalar(0),Qa.fromBufferAttribute(t,e),tl.fromBufferAttribute(t,n),el.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(Qa,r.x),o.addScaledVector(tl,r.y),o.addScaledVector(el,r.z),o}static isFrontFacing(t,e,n,s){return Qn.subVectors(n,e),bi.subVectors(t,e),Qn.cross(bi).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Qn.subVectors(this.c,this.b),bi.subVectors(this.a,this.b),Qn.cross(bi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Vn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Vn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return Vn.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return Vn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Vn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let o,a;$s.subVectors(s,n),Ys.subVectors(r,n),ja.subVectors(t,n);const l=$s.dot(ja),c=Ys.dot(ja);if(l<=0&&c<=0)return e.copy(n);Ka.subVectors(t,s);const h=$s.dot(Ka),u=Ys.dot(Ka);if(h>=0&&u<=h)return e.copy(s);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector($s,o);Ja.subVectors(t,r);const f=$s.dot(Ja),m=Ys.dot(Ja);if(m>=0&&f<=m)return e.copy(r);const x=f*c-l*m;if(x<=0&&c>=0&&m<=0)return a=c/(c-m),e.copy(n).addScaledVector(Ys,a);const g=h*m-f*u;if(g<=0&&u-h>=0&&f-m>=0)return Hh.subVectors(r,s),a=(u-h)/(u-h+(f-m)),e.copy(s).addScaledVector(Hh,a);const p=1/(g+x+d);return o=x*p,a=d*p,e.copy(n).addScaledVector($s,o).addScaledVector(Ys,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const md={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Wi={h:0,s:0,l:0},To={h:0,s:0,l:0};function nl(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class ee{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=In){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Ue.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=Ue.workingColorSpace){return this.r=t,this.g=e,this.b=n,Ue.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=Ue.workingColorSpace){if(t=Wc(t,1),e=Se(e,0,1),n=Se(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=nl(o,r,t+1/3),this.g=nl(o,r,t),this.b=nl(o,r,t-1/3)}return Ue.colorSpaceToWorking(this,s),this}setStyle(t,e=In){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=In){const n=md[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Di(t.r),this.g=Di(t.g),this.b=Di(t.b),this}copyLinearToSRGB(t){return this.r=fr(t.r),this.g=fr(t.g),this.b=fr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=In){return Ue.workingToColorSpace(Sn.copy(this),t),Math.round(Se(Sn.r*255,0,255))*65536+Math.round(Se(Sn.g*255,0,255))*256+Math.round(Se(Sn.b*255,0,255))}getHexString(t=In){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Ue.workingColorSpace){Ue.workingToColorSpace(Sn.copy(this),e);const n=Sn.r,s=Sn.g,r=Sn.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Ue.workingColorSpace){return Ue.workingToColorSpace(Sn.copy(this),e),t.r=Sn.r,t.g=Sn.g,t.b=Sn.b,t}getStyle(t=In){Ue.workingToColorSpace(Sn.copy(this),t);const e=Sn.r,n=Sn.g,s=Sn.b;return t!==In?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Wi),this.setHSL(Wi.h+t,Wi.s+e,Wi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Wi),t.getHSL(To);const n=jr(Wi.h,To.h,e),s=jr(Wi.s,To.s,e),r=jr(Wi.l,To.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Sn=new ee;ee.NAMES=md;let Np=0;class rs extends wr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Np++}),this.uuid=As(),this.name="",this.type="Material",this.blending=dr,this.side=zi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Fl,this.blendDst=Ol,this.blendEquation=_s,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ee(0,0,0),this.blendAlpha=0,this.depthFunc=xr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Th,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Os,this.stencilZFail=Os,this.stencilZPass=Os,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==dr&&(n.blending=this.blending),this.side!==zi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Fl&&(n.blendSrc=this.blendSrc),this.blendDst!==Ol&&(n.blendDst=this.blendDst),this.blendEquation!==_s&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==xr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Th&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Os&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Os&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Os&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class _n extends rs{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ee(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new mi,this.combine=nd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const sn=new L,Ao=new Wt;let kp=0;class cn{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:kp++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Ah,this.updateRanges=[],this.gpuType=si,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Ao.fromBufferAttribute(this,e),Ao.applyMatrix3(t),this.setXY(e,Ao.x,Ao.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)sn.fromBufferAttribute(this,e),sn.applyMatrix3(t),this.setXYZ(e,sn.x,sn.y,sn.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)sn.fromBufferAttribute(this,e),sn.applyMatrix4(t),this.setXYZ(e,sn.x,sn.y,sn.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)sn.fromBufferAttribute(this,e),sn.applyNormalMatrix(t),this.setXYZ(e,sn.x,sn.y,sn.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)sn.fromBufferAttribute(this,e),sn.transformDirection(t),this.setXYZ(e,sn.x,sn.y,sn.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=rr(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=An(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=rr(e,this.array)),e}setX(t,e){return this.normalized&&(e=An(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=rr(e,this.array)),e}setY(t,e){return this.normalized&&(e=An(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=rr(e,this.array)),e}setZ(t,e){return this.normalized&&(e=An(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=rr(e,this.array)),e}setW(t,e){return this.normalized&&(e=An(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=An(e,this.array),n=An(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=An(e,this.array),n=An(n,this.array),s=An(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=An(e,this.array),n=An(n,this.array),s=An(s,this.array),r=An(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Ah&&(t.usage=this.usage),t}}class $c extends cn{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class gd extends cn{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Gt extends cn{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Fp=0;const Gn=new he,il=new We,Zs=new L,kn=new qn,Fr=new qn,fn=new L;class we extends wr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Fp++}),this.uuid=As(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(fd(t)?gd:$c)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new xe().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Gn.makeRotationFromQuaternion(t),this.applyMatrix4(Gn),this}rotateX(t){return Gn.makeRotationX(t),this.applyMatrix4(Gn),this}rotateY(t){return Gn.makeRotationY(t),this.applyMatrix4(Gn),this}rotateZ(t){return Gn.makeRotationZ(t),this.applyMatrix4(Gn),this}translate(t,e,n){return Gn.makeTranslation(t,e,n),this.applyMatrix4(Gn),this}scale(t,e,n){return Gn.makeScale(t,e,n),this.applyMatrix4(Gn),this}lookAt(t){return il.lookAt(t),il.updateMatrix(),this.applyMatrix4(il.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Zs).negate(),this.translate(Zs.x,Zs.y,Zs.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Gt(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new qn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];kn.setFromBufferAttribute(r),this.morphTargetsRelative?(fn.addVectors(this.boundingBox.min,kn.min),this.boundingBox.expandByPoint(fn),fn.addVectors(this.boundingBox.max,kn.max),this.boundingBox.expandByPoint(fn)):(this.boundingBox.expandByPoint(kn.min),this.boundingBox.expandByPoint(kn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ui);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(t){const n=this.boundingSphere.center;if(kn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];Fr.setFromBufferAttribute(a),this.morphTargetsRelative?(fn.addVectors(kn.min,Fr.min),kn.expandByPoint(fn),fn.addVectors(kn.max,Fr.max),kn.expandByPoint(fn)):(kn.expandByPoint(Fr.min),kn.expandByPoint(Fr.max))}kn.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)fn.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(fn));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)fn.fromBufferAttribute(a,c),l&&(Zs.fromBufferAttribute(t,c),fn.add(Zs)),s=Math.max(s,n.distanceToSquared(fn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new cn(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let C=0;C<n.count;C++)a[C]=new L,l[C]=new L;const c=new L,h=new L,u=new L,d=new Wt,f=new Wt,m=new Wt,x=new L,g=new L;function p(C,S,b){c.fromBufferAttribute(n,C),h.fromBufferAttribute(n,S),u.fromBufferAttribute(n,b),d.fromBufferAttribute(r,C),f.fromBufferAttribute(r,S),m.fromBufferAttribute(r,b),h.sub(c),u.sub(c),f.sub(d),m.sub(d);const U=1/(f.x*m.y-m.x*f.y);isFinite(U)&&(x.copy(h).multiplyScalar(m.y).addScaledVector(u,-f.y).multiplyScalar(U),g.copy(u).multiplyScalar(f.x).addScaledVector(h,-m.x).multiplyScalar(U),a[C].add(x),a[S].add(x),a[b].add(x),l[C].add(g),l[S].add(g),l[b].add(g))}let v=this.groups;v.length===0&&(v=[{start:0,count:t.count}]);for(let C=0,S=v.length;C<S;++C){const b=v[C],U=b.start,P=b.count;for(let G=U,j=U+P;G<j;G+=3)p(t.getX(G+0),t.getX(G+1),t.getX(G+2))}const y=new L,_=new L,T=new L,A=new L;function E(C){T.fromBufferAttribute(s,C),A.copy(T);const S=a[C];y.copy(S),y.sub(T.multiplyScalar(T.dot(S))).normalize(),_.crossVectors(A,S);const U=_.dot(l[C])<0?-1:1;o.setXYZW(C,y.x,y.y,y.z,U)}for(let C=0,S=v.length;C<S;++C){const b=v[C],U=b.start,P=b.count;for(let G=U,j=U+P;G<j;G+=3)E(t.getX(G+0)),E(t.getX(G+1)),E(t.getX(G+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new cn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const s=new L,r=new L,o=new L,a=new L,l=new L,c=new L,h=new L,u=new L;if(t)for(let d=0,f=t.count;d<f;d+=3){const m=t.getX(d+0),x=t.getX(d+1),g=t.getX(d+2);s.fromBufferAttribute(e,m),r.fromBufferAttribute(e,x),o.fromBufferAttribute(e,g),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,m),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,g),a.add(h),l.add(h),c.add(h),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let d=0,f=e.count;d<f;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)fn.fromBufferAttribute(t,e),fn.normalize(),t.setXYZ(e,fn.x,fn.y,fn.z)}toNonIndexed(){function t(a,l){const c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h);let f=0,m=0;for(let x=0,g=l.length;x<g;x++){a.isInterleavedBufferAttribute?f=l[x]*a.data.stride+a.offset:f=l[x]*h;for(let p=0;p<h;p++)d[m++]=c[f++]}return new cn(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new we,n=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=t(l,n);e.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=t(d,n);l.push(f)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const s=t.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Gh=new he,ds=new ws,Ro=new Ui,Vh=new L,Co=new L,Po=new L,Do=new L,sl=new L,Io=new L,Wh=new L,zo=new L;class Zt extends We{constructor(t=new we,e=new _n){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){Io.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=a[l],u=r[l];h!==0&&(sl.fromBufferAttribute(u,t),o?Io.addScaledVector(sl,h):Io.addScaledVector(sl.sub(e),h))}e.add(Io)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ro.copy(n.boundingSphere),Ro.applyMatrix4(r),ds.copy(t.ray).recast(t.near),!(Ro.containsPoint(ds.origin)===!1&&(ds.intersectSphere(Ro,Vh)===null||ds.origin.distanceToSquared(Vh)>(t.far-t.near)**2))&&(Gh.copy(r).invert(),ds.copy(t.ray).applyMatrix4(Gh),!(n.boundingBox!==null&&ds.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ds)))}_computeIntersections(t,e,n){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,x=d.length;m<x;m++){const g=d[m],p=o[g.materialIndex],v=Math.max(g.start,f.start),y=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let _=v,T=y;_<T;_+=3){const A=a.getX(_),E=a.getX(_+1),C=a.getX(_+2);s=Lo(this,p,t,n,c,h,u,A,E,C),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const m=Math.max(0,f.start),x=Math.min(a.count,f.start+f.count);for(let g=m,p=x;g<p;g+=3){const v=a.getX(g),y=a.getX(g+1),_=a.getX(g+2);s=Lo(this,o,t,n,c,h,u,v,y,_),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let m=0,x=d.length;m<x;m++){const g=d[m],p=o[g.materialIndex],v=Math.max(g.start,f.start),y=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let _=v,T=y;_<T;_+=3){const A=_,E=_+1,C=_+2;s=Lo(this,p,t,n,c,h,u,A,E,C),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const m=Math.max(0,f.start),x=Math.min(l.count,f.start+f.count);for(let g=m,p=x;g<p;g+=3){const v=g,y=g+1,_=g+2;s=Lo(this,o,t,n,c,h,u,v,y,_),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}}function Op(i,t,e,n,s,r,o,a){let l;if(t.side===Pn?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,t.side===zi,a),l===null)return null;zo.copy(a),zo.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(zo);return c<e.near||c>e.far?null:{distance:c,point:zo.clone(),object:i}}function Lo(i,t,e,n,s,r,o,a,l,c){i.getVertexPosition(a,Co),i.getVertexPosition(l,Po),i.getVertexPosition(c,Do);const h=Op(i,t,e,n,Co,Po,Do,Wh);if(h){const u=new L;Vn.getBarycoord(Wh,Co,Po,Do,u),s&&(h.uv=Vn.getInterpolatedAttribute(s,a,l,c,u,new Wt)),r&&(h.uv1=Vn.getInterpolatedAttribute(r,a,l,c,u,new Wt)),o&&(h.normal=Vn.getInterpolatedAttribute(o,a,l,c,u,new L),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:l,c,normal:new L,materialIndex:0};Vn.getNormal(Co,Po,Do,d.normal),h.face=d,h.barycoord=u}return h}class Li extends we{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],h=[],u=[];let d=0,f=0;m("z","y","x",-1,-1,n,e,t,o,r,0),m("z","y","x",1,-1,n,e,-t,o,r,1),m("x","z","y",1,1,t,n,e,s,o,2),m("x","z","y",1,-1,t,n,-e,s,o,3),m("x","y","z",1,-1,t,e,n,s,r,4),m("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new Gt(c,3)),this.setAttribute("normal",new Gt(h,3)),this.setAttribute("uv",new Gt(u,2));function m(x,g,p,v,y,_,T,A,E,C,S){const b=_/E,U=T/C,P=_/2,G=T/2,j=A/2,H=E+1,q=C+1;let B=0,O=0;const Q=new L;for(let W=0;W<q;W++){const ft=W*U-G;for(let Vt=0;Vt<H;Vt++){const Me=Vt*b-P;Q[x]=Me*v,Q[g]=ft*y,Q[p]=j,c.push(Q.x,Q.y,Q.z),Q[x]=0,Q[g]=0,Q[p]=A>0?1:-1,h.push(Q.x,Q.y,Q.z),u.push(Vt/E),u.push(1-W/C),B+=1}}for(let W=0;W<C;W++)for(let ft=0;ft<E;ft++){const Vt=d+ft+H*W,Me=d+ft+H*(W+1),ce=d+(ft+1)+H*(W+1),ht=d+(ft+1)+H*W;l.push(Vt,Me,ht),l.push(Me,ce,ht),O+=6}a.addGroup(f,O,S),f+=O,d+=B}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Li(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function br(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Rn(i){const t={};for(let e=0;e<i.length;e++){const n=br(i[e]);for(const s in n)t[s]=n[s]}return t}function Bp(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function xd(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Ue.workingColorSpace}const fa={clone:br,merge:Rn};var Hp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Gp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class $n extends rs{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Hp,this.fragmentShader=Gp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=br(t.uniforms),this.uniformsGroups=Bp(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class vd extends We{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new he,this.projectionMatrix=new he,this.projectionMatrixInverse=new he,this.coordinateSystem=di,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Xi=new L,Xh=new Wt,qh=new Wt;class zn extends vd{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=ro*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Zr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ro*2*Math.atan(Math.tan(Zr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Xi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Xi.x,Xi.y).multiplyScalar(-t/Xi.z),Xi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Xi.x,Xi.y).multiplyScalar(-t/Xi.z)}getViewSize(t,e){return this.getViewBounds(t,Xh,qh),e.subVectors(qh,Xh)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Zr*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const js=-90,Ks=1;class Vp extends We{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new zn(js,Ks,t,e);s.layers=this.layers,this.add(s);const r=new zn(js,Ks,t,e);r.layers=this.layers,this.add(r);const o=new zn(js,Ks,t,e);o.layers=this.layers,this.add(o);const a=new zn(js,Ks,t,e);a.layers=this.layers,this.add(a);const l=new zn(js,Ks,t,e);l.layers=this.layers,this.add(l);const c=new zn(js,Ks,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,l]=e;for(const c of e)this.remove(c);if(t===di)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===ua)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class _d extends En{constructor(t=[],e=vr,n,s,r,o,a,l,c,h){super(t,e,n,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Wp extends is{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new _d(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Li(5,5,5),r=new $n({name:"CubemapFromEquirect",uniforms:br(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Pn,blending:ts});r.uniforms.tEquirect.value=e;const o=new Zt(s,r),a=e.minFilter;return e.minFilter===Ji&&(e.minFilter=ii),new Vp(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}}class te extends We{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Xp={type:"move"};class rl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new te,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new te,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new te,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const x of t.hand.values()){const g=e.getJointPose(x,n),p=this._getHandJoint(c,x);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,m=.005;c.inputState.pinching&&d>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Xp)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new te;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class Ma{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new ee(t),this.density=e}clone(){return new Ma(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class qp extends We{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new mi,this.environmentIntensity=1,this.environmentRotation=new mi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}const $h=new L,Yh=new ze,Zh=new ze,$p=new L,jh=new he,Uo=new L,ol=new Ui,Kh=new he,al=new ws;class No extends Zt{constructor(t,e){super(t,e),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Eh,this.bindMatrix=new he,this.bindMatrixInverse=new he,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const t=this.geometry;this.boundingBox===null&&(this.boundingBox=new qn),this.boundingBox.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Uo),this.boundingBox.expandByPoint(Uo)}computeBoundingSphere(){const t=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Ui),this.boundingSphere.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Uo),this.boundingSphere.expandByPoint(Uo)}copy(t,e){return super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}raycast(t,e){const n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ol.copy(this.boundingSphere),ol.applyMatrix4(s),t.ray.intersectsSphere(ol)!==!1&&(Kh.copy(s).invert(),al.copy(t.ray).applyMatrix4(Kh),!(this.boundingBox!==null&&al.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(t,e,al)))}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){this.skeleton=t,e===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const t=new ze,e=this.geometry.attributes.skinWeight;for(let n=0,s=e.count;n<s;n++){t.fromBufferAttribute(e,n);const r=1/t.manhattanLength();r!==1/0?t.multiplyScalar(r):t.set(1,0,0,0),e.setXYZW(n,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),this.bindMode===Eh?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===$f?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){const n=this.skeleton,s=this.geometry;Yh.fromBufferAttribute(s.attributes.skinIndex,t),Zh.fromBufferAttribute(s.attributes.skinWeight,t),$h.copy(e).applyMatrix4(this.bindMatrix),e.set(0,0,0);for(let r=0;r<4;r++){const o=Zh.getComponent(r);if(o!==0){const a=Yh.getComponent(r);jh.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),e.addScaledVector($p.copy($h).applyMatrix4(jh),o)}}return e.applyMatrix4(this.bindMatrixInverse)}}class yd extends We{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Yc extends En{constructor(t=null,e=1,n=1,s,r,o,a,l,c=Bn,h=Bn,u,d){super(null,o,a,l,c,h,s,r,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Jh=new he,Yp=new he;class Zc{constructor(t=[],e=[]){this.uuid=As(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(t.length*16),e.length===0)this.calculateInverses();else if(t.length!==e.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new he)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,e=this.bones.length;t<e;t++){const n=new he;this.bones[t]&&n.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&n.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const t=this.bones,e=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,o=t.length;r<o;r++){const a=t[r]?t[r].matrixWorld:Yp;Jh.multiplyMatrices(a,e[r]),Jh.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new Zc(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);const e=new Float32Array(t*t*4);e.set(this.boneMatrices);const n=new Yc(e,t,t,On,si);return n.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=n,this}getBoneByName(t){for(let e=0,n=this.bones.length;e<n;e++){const s=this.bones[e];if(s.name===t)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(t,e){this.uuid=t.uuid;for(let n=0,s=t.bones.length;n<s;n++){const r=t.bones[n];let o=e[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new yd),this.bones.push(o),this.boneInverses.push(new he().fromArray(t.boneInverses[n]))}return this.init(),this}toJSON(){const t={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;const e=this.bones,n=this.boneInverses;for(let s=0,r=e.length;s<r;s++){const o=e[s];t.bones.push(o.uuid);const a=n[s];t.boneInverses.push(a.toArray())}return t}}class ar extends cn{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Js=new he,Qh=new he,ko=[],tu=new qn,Zp=new he,Or=new Zt,Br=new Ui;class wn extends Zt{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new ar(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Zp)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new qn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Js),tu.copy(t.boundingBox).applyMatrix4(Js),this.boundingBox.union(tu)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ui),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Js),Br.copy(t.boundingSphere).applyMatrix4(Js),this.boundingSphere.union(Br)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(Or.geometry=this.geometry,Or.material=this.material,Or.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Br.copy(this.boundingSphere),Br.applyMatrix4(n),t.ray.intersectsSphere(Br)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Js),Qh.multiplyMatrices(n,Js),Or.matrixWorld=Qh,Or.raycast(t,ko);for(let o=0,a=ko.length;o<a;o++){const l=ko[o];l.instanceId=r,l.object=this,e.push(l)}ko.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new ar(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Yc(new Float32Array(s*this.count),s,this.count,Oc,si));const r=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=s*t;r[l]=a,r.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const ll=new L,jp=new L,Kp=new xe;class hi{constructor(t=new L(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=ll.subVectors(n,e).cross(jp.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(ll),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Kp.getNormalMatrix(t),s=this.coplanarPoint(ll).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const fs=new Ui,Jp=new Wt(.5,.5),Fo=new L;class jc{constructor(t=new hi,e=new hi,n=new hi,s=new hi,r=new hi,o=new hi){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=di,n=!1){const s=this.planes,r=t.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],u=r[5],d=r[6],f=r[7],m=r[8],x=r[9],g=r[10],p=r[11],v=r[12],y=r[13],_=r[14],T=r[15];if(s[0].setComponents(c-o,f-h,p-m,T-v).normalize(),s[1].setComponents(c+o,f+h,p+m,T+v).normalize(),s[2].setComponents(c+a,f+u,p+x,T+y).normalize(),s[3].setComponents(c-a,f-u,p-x,T-y).normalize(),n)s[4].setComponents(l,d,g,_).normalize(),s[5].setComponents(c-l,f-d,p-g,T-_).normalize();else if(s[4].setComponents(c-l,f-d,p-g,T-_).normalize(),e===di)s[5].setComponents(c+l,f+d,p+g,T+_).normalize();else if(e===ua)s[5].setComponents(l,d,g,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),fs.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),fs.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(fs)}intersectsSprite(t){fs.center.set(0,0,0);const e=Jp.distanceTo(t.center);return fs.radius=.7071067811865476+e,fs.applyMatrix4(t.matrixWorld),this.intersectsSphere(fs)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Fo.x=s.normal.x>0?t.max.x:t.min.x,Fo.y=s.normal.y>0?t.max.y:t.min.y,Fo.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Fo)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Kc extends rs{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ee(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const pa=new L,ma=new L,eu=new he,Hr=new ws,Oo=new Ui,cl=new L,nu=new L;class ao extends We{constructor(t=new we,e=new Kc){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)pa.fromBufferAttribute(e,s-1),ma.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=pa.distanceTo(ma);t.setAttribute("lineDistance",new Gt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Oo.copy(n.boundingSphere),Oo.applyMatrix4(s),Oo.radius+=r,t.ray.intersectsSphere(Oo)===!1)return;eu.copy(s).invert(),Hr.copy(t.ray).applyMatrix4(eu);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,o.start),m=Math.min(h.count,o.start+o.count);for(let x=f,g=m-1;x<g;x+=c){const p=h.getX(x),v=h.getX(x+1),y=Bo(this,t,Hr,l,p,v,x);y&&e.push(y)}if(this.isLineLoop){const x=h.getX(m-1),g=h.getX(f),p=Bo(this,t,Hr,l,x,g,m-1);p&&e.push(p)}}else{const f=Math.max(0,o.start),m=Math.min(d.count,o.start+o.count);for(let x=f,g=m-1;x<g;x+=c){const p=Bo(this,t,Hr,l,x,x+1,x);p&&e.push(p)}if(this.isLineLoop){const x=Bo(this,t,Hr,l,m-1,f,m-1);x&&e.push(x)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Bo(i,t,e,n,s,r,o){const a=i.geometry.attributes.position;if(pa.fromBufferAttribute(a,s),ma.fromBufferAttribute(a,r),e.distanceSqToSegment(pa,ma,cl,nu)>n)return;cl.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(cl);if(!(c<t.near||c>t.far))return{distance:c,point:nu.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}const iu=new L,su=new L;class Qp extends ao{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)iu.fromBufferAttribute(e,s),su.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+iu.distanceTo(su);t.setAttribute("lineDistance",new Gt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class tm extends ao{constructor(t,e){super(t,e),this.isLineLoop=!0,this.type="LineLoop"}}class em extends rs{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ee(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const ru=new he,Ec=new ws,Ho=new Ui,Go=new L;class nm extends We{constructor(t=new we,e=new em){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ho.copy(n.boundingSphere),Ho.applyMatrix4(s),Ho.radius+=r,t.ray.intersectsSphere(Ho)===!1)return;ru.copy(s).invert(),Ec.copy(t.ray).applyMatrix4(ru);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let m=d,x=f;m<x;m++){const g=c.getX(m);Go.fromBufferAttribute(u,g),ou(Go,g,l,s,t,e,this)}}else{const d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let m=d,x=f;m<x;m++)Go.fromBufferAttribute(u,m),ou(Go,m,l,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function ou(i,t,e,n,s,r,o){const a=Ec.distanceSqToPoint(i);if(a<e){const l=new L;Ec.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class Md extends En{constructor(t,e,n,s,r,o,a,l,c){super(t,e,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class bd extends En{constructor(t,e,n=Ss,s,r,o,a=Bn,l=Bn,c,h=io,u=1){if(h!==io&&h!==so)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:t,height:e,depth:u};super(d,s,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Xc(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Sd extends En{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class ba extends we{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],o=[],a=[],l=[],c=new L,h=new Wt;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=e;u++,d+=3){const f=n+u/e*s;c.x=t*Math.cos(f),c.y=t*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[d]/t+1)/2,h.y=(o[d+1]/t+1)/2,l.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new Gt(o,3)),this.setAttribute("normal",new Gt(a,3)),this.setAttribute("uv",new Gt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ba(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Rs extends we{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],d=[],f=[];let m=0;const x=[],g=n/2;let p=0;v(),o===!1&&(t>0&&y(!0),e>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new Gt(u,3)),this.setAttribute("normal",new Gt(d,3)),this.setAttribute("uv",new Gt(f,2));function v(){const _=new L,T=new L;let A=0;const E=(e-t)/n;for(let C=0;C<=r;C++){const S=[],b=C/r,U=b*(e-t)+t;for(let P=0;P<=s;P++){const G=P/s,j=G*l+a,H=Math.sin(j),q=Math.cos(j);T.x=U*H,T.y=-b*n+g,T.z=U*q,u.push(T.x,T.y,T.z),_.set(H,E,q).normalize(),d.push(_.x,_.y,_.z),f.push(G,1-b),S.push(m++)}x.push(S)}for(let C=0;C<s;C++)for(let S=0;S<r;S++){const b=x[S][C],U=x[S+1][C],P=x[S+1][C+1],G=x[S][C+1];(t>0||S!==0)&&(h.push(b,U,G),A+=3),(e>0||S!==r-1)&&(h.push(U,P,G),A+=3)}c.addGroup(p,A,0),p+=A}function y(_){const T=m,A=new Wt,E=new L;let C=0;const S=_===!0?t:e,b=_===!0?1:-1;for(let P=1;P<=s;P++)u.push(0,g*b,0),d.push(0,b,0),f.push(.5,.5),m++;const U=m;for(let P=0;P<=s;P++){const j=P/s*l+a,H=Math.cos(j),q=Math.sin(j);E.x=S*q,E.y=g*b,E.z=S*H,u.push(E.x,E.y,E.z),d.push(0,b,0),A.x=H*.5+.5,A.y=q*.5*b+.5,f.push(A.x,A.y),m++}for(let P=0;P<s;P++){const G=T+P,j=U+P;_===!0?h.push(j,j+1,G):h.push(j+1,j,G),C+=3}c.addGroup(p,C,_===!0?1:2),p+=C}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Rs(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Jc extends Rs{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new Jc(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class uo extends we{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const r=[],o=[];a(s),c(n),h(),this.setAttribute("position",new Gt(r,3)),this.setAttribute("normal",new Gt(r.slice(),3)),this.setAttribute("uv",new Gt(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(v){const y=new L,_=new L,T=new L;for(let A=0;A<e.length;A+=3)f(e[A+0],y),f(e[A+1],_),f(e[A+2],T),l(y,_,T,v)}function l(v,y,_,T){const A=T+1,E=[];for(let C=0;C<=A;C++){E[C]=[];const S=v.clone().lerp(_,C/A),b=y.clone().lerp(_,C/A),U=A-C;for(let P=0;P<=U;P++)P===0&&C===A?E[C][P]=S:E[C][P]=S.clone().lerp(b,P/U)}for(let C=0;C<A;C++)for(let S=0;S<2*(A-C)-1;S++){const b=Math.floor(S/2);S%2===0?(d(E[C][b+1]),d(E[C+1][b]),d(E[C][b])):(d(E[C][b+1]),d(E[C+1][b+1]),d(E[C+1][b]))}}function c(v){const y=new L;for(let _=0;_<r.length;_+=3)y.x=r[_+0],y.y=r[_+1],y.z=r[_+2],y.normalize().multiplyScalar(v),r[_+0]=y.x,r[_+1]=y.y,r[_+2]=y.z}function h(){const v=new L;for(let y=0;y<r.length;y+=3){v.x=r[y+0],v.y=r[y+1],v.z=r[y+2];const _=g(v)/2/Math.PI+.5,T=p(v)/Math.PI+.5;o.push(_,1-T)}m(),u()}function u(){for(let v=0;v<o.length;v+=6){const y=o[v+0],_=o[v+2],T=o[v+4],A=Math.max(y,_,T),E=Math.min(y,_,T);A>.9&&E<.1&&(y<.2&&(o[v+0]+=1),_<.2&&(o[v+2]+=1),T<.2&&(o[v+4]+=1))}}function d(v){r.push(v.x,v.y,v.z)}function f(v,y){const _=v*3;y.x=t[_+0],y.y=t[_+1],y.z=t[_+2]}function m(){const v=new L,y=new L,_=new L,T=new L,A=new Wt,E=new Wt,C=new Wt;for(let S=0,b=0;S<r.length;S+=9,b+=6){v.set(r[S+0],r[S+1],r[S+2]),y.set(r[S+3],r[S+4],r[S+5]),_.set(r[S+6],r[S+7],r[S+8]),A.set(o[b+0],o[b+1]),E.set(o[b+2],o[b+3]),C.set(o[b+4],o[b+5]),T.copy(v).add(y).add(_).divideScalar(3);const U=g(T);x(A,b+0,v,U),x(E,b+2,y,U),x(C,b+4,_,U)}}function x(v,y,_,T){T<0&&v.x===1&&(o[y]=v.x-1),_.x===0&&_.z===0&&(o[y]=T/2/Math.PI+.5)}function g(v){return Math.atan2(v.z,-v.x)}function p(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new uo(t.vertices,t.indices,t.radius,t.details)}}class Sa extends uo{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,o,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Sa(t.radius,t.detail)}}class Ni{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const n=this.getLengths();let s=0;const r=n.length;let o;e?o=e:o=t*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=n[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===o)return s/(r-1);const h=n[s],d=n[s+1]-h,f=(o-h)/d;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),l=e||(o.isVector2?new Wt:new L);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){const n=new L,s=[],r=[],o=[],a=new L,l=new he;for(let f=0;f<=t;f++){const m=f/t;s[f]=this.getTangentAt(m,new L)}r[0]=new L,o[0]=new L;let c=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();const m=Math.acos(Se(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,m))}o[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos(Se(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(f=-f);for(let m=1;m<=t;m++)r[m].applyMatrix4(l.makeRotationAxis(s[m],f*m)),o[m].crossVectors(s[m],r[m])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class wd extends Ni{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new Wt){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class im extends wd{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Qc(){let i=0,t=0,e=0,n=0;function s(r,o,a,l){i=r,t=a,e=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,u){let d=(o-r)/c-(a-r)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+u)+(l-a)/u;d*=h,f*=h,s(o,a,d,f)},calc:function(r){const o=r*r,a=o*r;return i+t*r+e*o+n*a}}}const Vo=new L,hl=new Qc,ul=new Qc,dl=new Qc;class lo extends Ni{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new L){const n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=s[(a-1)%r]:(Vo.subVectors(s[0],s[1]).add(s[0]),c=Vo);const u=s[a%r],d=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(Vo.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Vo),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let m=Math.pow(c.distanceToSquared(u),f),x=Math.pow(u.distanceToSquared(d),f),g=Math.pow(d.distanceToSquared(h),f);x<1e-4&&(x=1),m<1e-4&&(m=x),g<1e-4&&(g=x),hl.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,m,x,g),ul.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,m,x,g),dl.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,m,x,g)}else this.curveType==="catmullrom"&&(hl.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),ul.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),dl.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(hl.calc(l),ul.calc(l),dl.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new L().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function au(i,t,e,n,s){const r=(n-t)*.5,o=(s-e)*.5,a=i*i,l=i*a;return(2*e-2*n+r+o)*l+(-3*e+3*n-2*r-o)*a+r*i+e}function sm(i,t){const e=1-i;return e*e*t}function rm(i,t){return 2*(1-i)*i*t}function om(i,t){return i*i*t}function Kr(i,t,e,n){return sm(i,t)+rm(i,e)+om(i,n)}function am(i,t){const e=1-i;return e*e*e*t}function lm(i,t){const e=1-i;return 3*e*e*i*t}function cm(i,t){return 3*(1-i)*i*i*t}function hm(i,t){return i*i*i*t}function Jr(i,t,e,n,s){return am(i,t)+lm(i,e)+cm(i,n)+hm(i,s)}class um extends Ni{constructor(t=new Wt,e=new Wt,n=new Wt,s=new Wt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new Wt){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Jr(t,s.x,r.x,o.x,a.x),Jr(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class dm extends Ni{constructor(t=new L,e=new L,n=new L,s=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new L){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Jr(t,s.x,r.x,o.x,a.x),Jr(t,s.y,r.y,o.y,a.y),Jr(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class fm extends Ni{constructor(t=new Wt,e=new Wt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new Wt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Wt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class pm extends Ni{constructor(t=new L,e=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new L){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new L){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class mm extends Ni{constructor(t=new Wt,e=new Wt,n=new Wt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new Wt){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(Kr(t,s.x,r.x,o.x),Kr(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Ed extends Ni{constructor(t=new L,e=new L,n=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new L){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(Kr(t,s.x,r.x,o.x),Kr(t,s.y,r.y,o.y),Kr(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class gm extends Ni{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new Wt){const n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(au(a,l.x,c.x,h.x,u.x),au(a,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new Wt().fromArray(s))}return this}}var xm=Object.freeze({__proto__:null,ArcCurve:im,CatmullRomCurve3:lo,CubicBezierCurve:um,CubicBezierCurve3:dm,EllipseCurve:wd,LineCurve:fm,LineCurve3:pm,QuadraticBezierCurve:mm,QuadraticBezierCurve3:Ed,SplineCurve:gm});class th extends uo{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new th(t.radius,t.detail)}}class eh extends uo{constructor(t=1,e=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new eh(t.radius,t.detail)}}class Ci extends we{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(s),c=a+1,h=l+1,u=t/a,d=e/l,f=[],m=[],x=[],g=[];for(let p=0;p<h;p++){const v=p*d-o;for(let y=0;y<c;y++){const _=y*u-r;m.push(_,-v,0),x.push(0,0,1),g.push(y/a),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let v=0;v<a;v++){const y=v+c*p,_=v+c*(p+1),T=v+1+c*(p+1),A=v+1+c*p;f.push(y,_,A),f.push(_,T,A)}this.setIndex(f),this.setAttribute("position",new Gt(m,3)),this.setAttribute("normal",new Gt(x,3)),this.setAttribute("uv",new Gt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ci(t.width,t.height,t.widthSegments,t.heightSegments)}}class Qi extends we{constructor(t=.5,e=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);const a=[],l=[],c=[],h=[];let u=t;const d=(e-t)/s,f=new L,m=new Wt;for(let x=0;x<=s;x++){for(let g=0;g<=n;g++){const p=r+g/n*o;f.x=u*Math.cos(p),f.y=u*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),m.x=(f.x/e+1)/2,m.y=(f.y/e+1)/2,h.push(m.x,m.y)}u+=d}for(let x=0;x<s;x++){const g=x*(n+1);for(let p=0;p<n;p++){const v=p+g,y=v,_=v+n+1,T=v+n+2,A=v+1;a.push(y,_,A),a.push(_,T,A)}}this.setIndex(a),this.setAttribute("position",new Gt(l,3)),this.setAttribute("normal",new Gt(c,3)),this.setAttribute("uv",new Gt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Qi(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Yn extends we{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],u=new L,d=new L,f=[],m=[],x=[],g=[];for(let p=0;p<=n;p++){const v=[],y=p/n;let _=0;p===0&&o===0?_=.5/e:p===n&&l===Math.PI&&(_=-.5/e);for(let T=0;T<=e;T++){const A=T/e;u.x=-t*Math.cos(s+A*r)*Math.sin(o+y*a),u.y=t*Math.cos(o+y*a),u.z=t*Math.sin(s+A*r)*Math.sin(o+y*a),m.push(u.x,u.y,u.z),d.copy(u).normalize(),x.push(d.x,d.y,d.z),g.push(A+_,1-y),v.push(c++)}h.push(v)}for(let p=0;p<n;p++)for(let v=0;v<e;v++){const y=h[p][v+1],_=h[p][v],T=h[p+1][v],A=h[p+1][v+1];(p!==0||o>0)&&f.push(y,_,A),(p!==n-1||l<Math.PI)&&f.push(_,T,A)}this.setIndex(f),this.setAttribute("position",new Gt(m,3)),this.setAttribute("normal",new Gt(x,3)),this.setAttribute("uv",new Gt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Yn(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class nh extends we{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const o=[],a=[],l=[],c=[],h=new L,u=new L,d=new L;for(let f=0;f<=n;f++)for(let m=0;m<=s;m++){const x=m/s*r,g=f/n*Math.PI*2;u.x=(t+e*Math.cos(g))*Math.cos(x),u.y=(t+e*Math.cos(g))*Math.sin(x),u.z=e*Math.sin(g),a.push(u.x,u.y,u.z),h.x=t*Math.cos(x),h.y=t*Math.sin(x),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(m/s),c.push(f/n)}for(let f=1;f<=n;f++)for(let m=1;m<=s;m++){const x=(s+1)*f+m-1,g=(s+1)*(f-1)+m-1,p=(s+1)*(f-1)+m,v=(s+1)*f+m;o.push(x,g,v),o.push(g,p,v)}this.setIndex(o),this.setAttribute("position",new Gt(a,3)),this.setAttribute("normal",new Gt(l,3)),this.setAttribute("uv",new Gt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new nh(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class wa extends we{constructor(t=new Ed(new L(-1,-1,0),new L(-1,1,0),new L(1,1,0)),e=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:s,closed:r};const o=t.computeFrenetFrames(e,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new L,l=new L,c=new Wt;let h=new L;const u=[],d=[],f=[],m=[];x(),this.setIndex(m),this.setAttribute("position",new Gt(u,3)),this.setAttribute("normal",new Gt(d,3)),this.setAttribute("uv",new Gt(f,2));function x(){for(let y=0;y<e;y++)g(y);g(r===!1?e:0),v(),p()}function g(y){h=t.getPointAt(y/e,h);const _=o.normals[y],T=o.binormals[y];for(let A=0;A<=s;A++){const E=A/s*Math.PI*2,C=Math.sin(E),S=-Math.cos(E);l.x=S*_.x+C*T.x,l.y=S*_.y+C*T.y,l.z=S*_.z+C*T.z,l.normalize(),d.push(l.x,l.y,l.z),a.x=h.x+n*l.x,a.y=h.y+n*l.y,a.z=h.z+n*l.z,u.push(a.x,a.y,a.z)}}function p(){for(let y=1;y<=e;y++)for(let _=1;_<=s;_++){const T=(s+1)*(y-1)+(_-1),A=(s+1)*y+(_-1),E=(s+1)*y+_,C=(s+1)*(y-1)+_;m.push(T,A,C),m.push(A,E,C)}}function v(){for(let y=0;y<=e;y++)for(let _=0;_<=s;_++)c.x=y/e,c.y=_/s,f.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new wa(new xm[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class Ve extends rs{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ee(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ee(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Vc,this.normalScale=new Wt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new mi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Td extends Ve{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Wt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Se(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ee(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ee(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ee(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class vn extends rs{constructor(t){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new ee(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ee(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Vc,this.normalScale=new Wt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.gradientMap=t.gradientMap,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.alphaMap=t.alphaMap,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}class vm extends rs{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Zf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class _m extends rs{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Ad extends Kc{constructor(t){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(t)}copy(t){return super.copy(t),this.scale=t.scale,this.dashSize=t.dashSize,this.gapSize=t.gapSize,this}}class ih extends We{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new ee(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class ym extends ih{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(We.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ee(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const fl=new he,lu=new L,cu=new L;class Rd{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Wt(512,512),this.mapType=pi,this.map=null,this.mapPass=null,this.matrix=new he,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new jc,this._frameExtents=new Wt(1,1),this._viewportCount=1,this._viewports=[new ze(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;lu.setFromMatrixPosition(t.matrixWorld),e.position.copy(lu),cu.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(cu),e.updateMatrixWorld(),fl.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(fl,e.coordinateSystem,e.reversedDepth),e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(fl)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const hu=new he,Gr=new L,pl=new L;class Mm extends Rd{constructor(){super(new zn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Wt(4,2),this._viewportCount=6,this._viewports=[new ze(2,1,1,1),new ze(0,1,1,1),new ze(3,1,1,1),new ze(1,1,1,1),new ze(3,0,1,1),new ze(1,0,1,1)],this._cubeDirections=[new L(1,0,0),new L(-1,0,0),new L(0,0,1),new L(0,0,-1),new L(0,1,0),new L(0,-1,0)],this._cubeUps=[new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,0,1),new L(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Gr.setFromMatrixPosition(t.matrixWorld),n.position.copy(Gr),pl.copy(n.position),pl.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(pl),n.updateMatrixWorld(),s.makeTranslation(-Gr.x,-Gr.y,-Gr.z),hu.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(hu,n.coordinateSystem,n.reversedDepth)}}class bm extends ih{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Mm}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class Cd extends vd{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Sm extends Rd{constructor(){super(new Cd(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class wm extends ih{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(We.DEFAULT_UP),this.updateMatrix(),this.target=new We,this.shadow=new Sm}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Em extends we{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){const t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}}class Tm extends zn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const uu=new he;class ml{constructor(t,e,n=0,s=1/0){this.ray=new ws(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new qc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return uu.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(uu),this}intersectObject(t,e=!0,n=[]){return Tc(t,this,n,e),n.sort(du),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)Tc(t[s],this,n,e);return n.sort(du),n}}function du(i,t){return i.distance-t.distance}function Tc(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let o=0,a=r.length;o<a;o++)Tc(r[o],t,e,!0)}}function fu(i,t,e,n){const s=Am(n);switch(e){case cd:return i*t;case Oc:return i*t/s.components*s.byteLength;case Bc:return i*t/s.components*s.byteLength;case ud:return i*t*2/s.components*s.byteLength;case Hc:return i*t*2/s.components*s.byteLength;case hd:return i*t*3/s.components*s.byteLength;case On:return i*t*4/s.components*s.byteLength;case Gc:return i*t*4/s.components*s.byteLength;case ra:case oa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case aa:case la:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Kl:case Ql:return Math.max(i,16)*Math.max(t,8)/4;case jl:case Jl:return Math.max(i,8)*Math.max(t,8)/2;case tc:case ec:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case nc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ic:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case sc:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case rc:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case oc:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case ac:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case lc:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case cc:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case hc:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case uc:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case dc:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case fc:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case pc:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case mc:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case gc:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case xc:case vc:case _c:return Math.ceil(i/4)*Math.ceil(t/4)*16;case yc:case Mc:return Math.ceil(i/4)*Math.ceil(t/4)*8;case bc:case Sc:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Am(i){switch(i){case pi:case rd:return{byteLength:1,components:1};case eo:case od:case ho:return{byteLength:2,components:1};case kc:case Fc:return{byteLength:2,components:4};case Ss:case Nc:case si:return{byteLength:4,components:1};case ad:case ld:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Uc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Uc);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Pd(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Rm(i){const t=new WeakMap;function e(a,l){const c=a.array,h=a.usage,u=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){const h=l.array,u=l.updateRanges;if(i.bindBuffer(c,a),u.length===0)i.bufferSubData(c,0,h);else{u.sort((f,m)=>f.start-m.start);let d=0;for(let f=1;f<u.length;f++){const m=u[d],x=u[f];x.start<=m.start+m.count+1?m.count=Math.max(m.count,x.start+x.count-m.start):(++d,u[d]=x)}u.length=d+1;for(let f=0,m=u.length;f<m;f++){const x=u[f];i.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(i.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var Cm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Pm=`#ifdef USE_ALPHAHASH
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
#endif`,Dm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Im=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,zm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Lm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Um=`#ifdef USE_AOMAP
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
#endif`,Nm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,km=`#ifdef USE_BATCHING
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
#endif`,Fm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Om=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Bm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Hm=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Gm=`#ifdef USE_IRIDESCENCE
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
#endif`,Vm=`#ifdef USE_BUMPMAP
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
#endif`,Wm=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Xm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,qm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,$m=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ym=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Zm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,jm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Km=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Jm=`#define PI 3.141592653589793
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
} // validated`,Qm=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,tg=`vec3 transformedNormal = objectNormal;
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
#endif`,eg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ng=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ig=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,sg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,rg="gl_FragColor = linearToOutputTexel( gl_FragColor );",og=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ag=`#ifdef USE_ENVMAP
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
#endif`,lg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,cg=`#ifdef USE_ENVMAP
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
#endif`,hg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ug=`#ifdef USE_ENVMAP
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
#endif`,dg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,pg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,mg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gg=`#ifdef USE_GRADIENTMAP
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
}`,xg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,vg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,_g=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,yg=`uniform bool receiveShadow;
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
#endif`,Mg=`#ifdef USE_ENVMAP
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
#endif`,bg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Sg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,wg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Eg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Tg=`PhysicalMaterial material;
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
#endif`,Ag=`struct PhysicalMaterial {
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
}`,Rg=`
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
#endif`,Cg=`#if defined( RE_IndirectDiffuse )
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
#endif`,Pg=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Dg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ig=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Lg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Ug=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ng=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,kg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Fg=`#if defined( USE_POINTS_UV )
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
#endif`,Og=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Bg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Hg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Gg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Vg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Wg=`#ifdef USE_MORPHTARGETS
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
#endif`,Xg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,qg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,$g=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Yg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Zg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,jg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Kg=`#ifdef USE_NORMALMAP
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
#endif`,Jg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Qg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,t0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,e0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,n0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,i0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,s0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,r0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,o0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,a0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,l0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,c0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,h0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,u0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,d0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,f0=`float getShadowMask() {
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
}`,p0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,m0=`#ifdef USE_SKINNING
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
#endif`,g0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,x0=`#ifdef USE_SKINNING
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
#endif`,v0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,_0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,y0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,M0=`#ifndef saturate
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
#endif`,S0=`#ifdef USE_TRANSMISSION
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
#endif`,w0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,E0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,T0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,A0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const R0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,C0=`uniform sampler2D t2D;
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
}`,P0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,D0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,I0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,z0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,L0=`#include <common>
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
}`,U0=`#if DEPTH_PACKING == 3200
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
}`,N0=`#define DISTANCE
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
}`,F0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,O0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,B0=`uniform float scale;
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
}`,H0=`uniform vec3 diffuse;
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
}`,G0=`#include <common>
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
}`,V0=`uniform vec3 diffuse;
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
}`,W0=`#define LAMBERT
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
}`,X0=`#define LAMBERT
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
}`,q0=`#define MATCAP
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
}`,Y0=`#define NORMAL
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
}`,Z0=`#define NORMAL
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
}`,j0=`#define PHONG
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
}`,K0=`#define PHONG
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
}`,J0=`#define STANDARD
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
}`,Q0=`#define STANDARD
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
}`,tx=`#define TOON
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
}`,ex=`#define TOON
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
}`,nx=`uniform float size;
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
}`,ix=`uniform vec3 diffuse;
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
}`,sx=`#include <common>
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
}`,rx=`uniform vec3 color;
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
}`,ox=`uniform float rotation;
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
}`,ax=`uniform vec3 diffuse;
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
}`,_e={alphahash_fragment:Cm,alphahash_pars_fragment:Pm,alphamap_fragment:Dm,alphamap_pars_fragment:Im,alphatest_fragment:zm,alphatest_pars_fragment:Lm,aomap_fragment:Um,aomap_pars_fragment:Nm,batching_pars_vertex:km,batching_vertex:Fm,begin_vertex:Om,beginnormal_vertex:Bm,bsdfs:Hm,iridescence_fragment:Gm,bumpmap_pars_fragment:Vm,clipping_planes_fragment:Wm,clipping_planes_pars_fragment:Xm,clipping_planes_pars_vertex:qm,clipping_planes_vertex:$m,color_fragment:Ym,color_pars_fragment:Zm,color_pars_vertex:jm,color_vertex:Km,common:Jm,cube_uv_reflection_fragment:Qm,defaultnormal_vertex:tg,displacementmap_pars_vertex:eg,displacementmap_vertex:ng,emissivemap_fragment:ig,emissivemap_pars_fragment:sg,colorspace_fragment:rg,colorspace_pars_fragment:og,envmap_fragment:ag,envmap_common_pars_fragment:lg,envmap_pars_fragment:cg,envmap_pars_vertex:hg,envmap_physical_pars_fragment:Mg,envmap_vertex:ug,fog_vertex:dg,fog_pars_vertex:fg,fog_fragment:pg,fog_pars_fragment:mg,gradientmap_pars_fragment:gg,lightmap_pars_fragment:xg,lights_lambert_fragment:vg,lights_lambert_pars_fragment:_g,lights_pars_begin:yg,lights_toon_fragment:bg,lights_toon_pars_fragment:Sg,lights_phong_fragment:wg,lights_phong_pars_fragment:Eg,lights_physical_fragment:Tg,lights_physical_pars_fragment:Ag,lights_fragment_begin:Rg,lights_fragment_maps:Cg,lights_fragment_end:Pg,logdepthbuf_fragment:Dg,logdepthbuf_pars_fragment:Ig,logdepthbuf_pars_vertex:zg,logdepthbuf_vertex:Lg,map_fragment:Ug,map_pars_fragment:Ng,map_particle_fragment:kg,map_particle_pars_fragment:Fg,metalnessmap_fragment:Og,metalnessmap_pars_fragment:Bg,morphinstance_vertex:Hg,morphcolor_vertex:Gg,morphnormal_vertex:Vg,morphtarget_pars_vertex:Wg,morphtarget_vertex:Xg,normal_fragment_begin:qg,normal_fragment_maps:$g,normal_pars_fragment:Yg,normal_pars_vertex:Zg,normal_vertex:jg,normalmap_pars_fragment:Kg,clearcoat_normal_fragment_begin:Jg,clearcoat_normal_fragment_maps:Qg,clearcoat_pars_fragment:t0,iridescence_pars_fragment:e0,opaque_fragment:n0,packing:i0,premultiplied_alpha_fragment:s0,project_vertex:r0,dithering_fragment:o0,dithering_pars_fragment:a0,roughnessmap_fragment:l0,roughnessmap_pars_fragment:c0,shadowmap_pars_fragment:h0,shadowmap_pars_vertex:u0,shadowmap_vertex:d0,shadowmask_pars_fragment:f0,skinbase_vertex:p0,skinning_pars_vertex:m0,skinning_vertex:g0,skinnormal_vertex:x0,specularmap_fragment:v0,specularmap_pars_fragment:_0,tonemapping_fragment:y0,tonemapping_pars_fragment:M0,transmission_fragment:b0,transmission_pars_fragment:S0,uv_pars_fragment:w0,uv_pars_vertex:E0,uv_vertex:T0,worldpos_vertex:A0,background_vert:R0,background_frag:C0,backgroundCube_vert:P0,backgroundCube_frag:D0,cube_vert:I0,cube_frag:z0,depth_vert:L0,depth_frag:U0,distanceRGBA_vert:N0,distanceRGBA_frag:k0,equirect_vert:F0,equirect_frag:O0,linedashed_vert:B0,linedashed_frag:H0,meshbasic_vert:G0,meshbasic_frag:V0,meshlambert_vert:W0,meshlambert_frag:X0,meshmatcap_vert:q0,meshmatcap_frag:$0,meshnormal_vert:Y0,meshnormal_frag:Z0,meshphong_vert:j0,meshphong_frag:K0,meshphysical_vert:J0,meshphysical_frag:Q0,meshtoon_vert:tx,meshtoon_frag:ex,points_vert:nx,points_frag:ix,shadow_vert:sx,shadow_frag:rx,sprite_vert:ox,sprite_frag:ax},Ct={common:{diffuse:{value:new ee(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new xe},alphaMap:{value:null},alphaMapTransform:{value:new xe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new xe}},envmap:{envMap:{value:null},envMapRotation:{value:new xe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new xe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new xe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new xe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new xe},normalScale:{value:new Wt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new xe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new xe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new xe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new xe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ee(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ee(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new xe},alphaTest:{value:0},uvTransform:{value:new xe}},sprite:{diffuse:{value:new ee(16777215)},opacity:{value:1},center:{value:new Wt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new xe},alphaMap:{value:null},alphaMapTransform:{value:new xe},alphaTest:{value:0}}},ui={basic:{uniforms:Rn([Ct.common,Ct.specularmap,Ct.envmap,Ct.aomap,Ct.lightmap,Ct.fog]),vertexShader:_e.meshbasic_vert,fragmentShader:_e.meshbasic_frag},lambert:{uniforms:Rn([Ct.common,Ct.specularmap,Ct.envmap,Ct.aomap,Ct.lightmap,Ct.emissivemap,Ct.bumpmap,Ct.normalmap,Ct.displacementmap,Ct.fog,Ct.lights,{emissive:{value:new ee(0)}}]),vertexShader:_e.meshlambert_vert,fragmentShader:_e.meshlambert_frag},phong:{uniforms:Rn([Ct.common,Ct.specularmap,Ct.envmap,Ct.aomap,Ct.lightmap,Ct.emissivemap,Ct.bumpmap,Ct.normalmap,Ct.displacementmap,Ct.fog,Ct.lights,{emissive:{value:new ee(0)},specular:{value:new ee(1118481)},shininess:{value:30}}]),vertexShader:_e.meshphong_vert,fragmentShader:_e.meshphong_frag},standard:{uniforms:Rn([Ct.common,Ct.envmap,Ct.aomap,Ct.lightmap,Ct.emissivemap,Ct.bumpmap,Ct.normalmap,Ct.displacementmap,Ct.roughnessmap,Ct.metalnessmap,Ct.fog,Ct.lights,{emissive:{value:new ee(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:_e.meshphysical_vert,fragmentShader:_e.meshphysical_frag},toon:{uniforms:Rn([Ct.common,Ct.aomap,Ct.lightmap,Ct.emissivemap,Ct.bumpmap,Ct.normalmap,Ct.displacementmap,Ct.gradientmap,Ct.fog,Ct.lights,{emissive:{value:new ee(0)}}]),vertexShader:_e.meshtoon_vert,fragmentShader:_e.meshtoon_frag},matcap:{uniforms:Rn([Ct.common,Ct.bumpmap,Ct.normalmap,Ct.displacementmap,Ct.fog,{matcap:{value:null}}]),vertexShader:_e.meshmatcap_vert,fragmentShader:_e.meshmatcap_frag},points:{uniforms:Rn([Ct.points,Ct.fog]),vertexShader:_e.points_vert,fragmentShader:_e.points_frag},dashed:{uniforms:Rn([Ct.common,Ct.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:_e.linedashed_vert,fragmentShader:_e.linedashed_frag},depth:{uniforms:Rn([Ct.common,Ct.displacementmap]),vertexShader:_e.depth_vert,fragmentShader:_e.depth_frag},normal:{uniforms:Rn([Ct.common,Ct.bumpmap,Ct.normalmap,Ct.displacementmap,{opacity:{value:1}}]),vertexShader:_e.meshnormal_vert,fragmentShader:_e.meshnormal_frag},sprite:{uniforms:Rn([Ct.sprite,Ct.fog]),vertexShader:_e.sprite_vert,fragmentShader:_e.sprite_frag},background:{uniforms:{uvTransform:{value:new xe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:_e.background_vert,fragmentShader:_e.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new xe}},vertexShader:_e.backgroundCube_vert,fragmentShader:_e.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:_e.cube_vert,fragmentShader:_e.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:_e.equirect_vert,fragmentShader:_e.equirect_frag},distanceRGBA:{uniforms:Rn([Ct.common,Ct.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:_e.distanceRGBA_vert,fragmentShader:_e.distanceRGBA_frag},shadow:{uniforms:Rn([Ct.lights,Ct.fog,{color:{value:new ee(0)},opacity:{value:1}}]),vertexShader:_e.shadow_vert,fragmentShader:_e.shadow_frag}};ui.physical={uniforms:Rn([ui.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new xe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new xe},clearcoatNormalScale:{value:new Wt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new xe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new xe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new xe},sheen:{value:0},sheenColor:{value:new ee(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new xe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new xe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new xe},transmissionSamplerSize:{value:new Wt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new xe},attenuationDistance:{value:0},attenuationColor:{value:new ee(0)},specularColor:{value:new ee(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new xe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new xe},anisotropyVector:{value:new Wt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new xe}}]),vertexShader:_e.meshphysical_vert,fragmentShader:_e.meshphysical_frag};const Wo={r:0,b:0,g:0},ps=new mi,lx=new he;function cx(i,t,e,n,s,r,o){const a=new ee(0);let l=r===!0?0:1,c,h,u=null,d=0,f=null;function m(y){let _=y.isScene===!0?y.background:null;return _&&_.isTexture&&(_=(y.backgroundBlurriness>0?e:t).get(_)),_}function x(y){let _=!1;const T=m(y);T===null?p(a,l):T&&T.isColor&&(p(T,1),_=!0);const A=i.xr.getEnvironmentBlendMode();A==="additive"?n.buffers.color.setClear(0,0,0,1,o):A==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||_)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function g(y,_){const T=m(_);T&&(T.isCubeTexture||T.mapping===ya)?(h===void 0&&(h=new Zt(new Li(1,1,1),new $n({name:"BackgroundCubeMaterial",uniforms:br(ui.backgroundCube.uniforms),vertexShader:ui.backgroundCube.vertexShader,fragmentShader:ui.backgroundCube.fragmentShader,side:Pn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(A,E,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),ps.copy(_.backgroundRotation),ps.x*=-1,ps.y*=-1,ps.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(ps.y*=-1,ps.z*=-1),h.material.uniforms.envMap.value=T,h.material.uniforms.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(lx.makeRotationFromEuler(ps)),h.material.toneMapped=Ue.getTransfer(T.colorSpace)!==Ge,(u!==T||d!==T.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,u=T,d=T.version,f=i.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):T&&T.isTexture&&(c===void 0&&(c=new Zt(new Ci(2,2),new $n({name:"BackgroundMaterial",uniforms:br(ui.background.uniforms),vertexShader:ui.background.vertexShader,fragmentShader:ui.background.fragmentShader,side:zi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=T,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.toneMapped=Ue.getTransfer(T.colorSpace)!==Ge,T.matrixAutoUpdate===!0&&T.updateMatrix(),c.material.uniforms.uvTransform.value.copy(T.matrix),(u!==T||d!==T.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,u=T,d=T.version,f=i.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function p(y,_){y.getRGB(Wo,xd(i)),n.buffers.color.setClear(Wo.r,Wo.g,Wo.b,_,o)}function v(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,_=1){a.set(y),l=_,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,p(a,l)},render:x,addToRenderList:g,dispose:v}}function hx(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,o=!1;function a(b,U,P,G,j){let H=!1;const q=u(G,P,U);r!==q&&(r=q,c(r.object)),H=f(b,G,P,j),H&&m(b,G,P,j),j!==null&&t.update(j,i.ELEMENT_ARRAY_BUFFER),(H||o)&&(o=!1,_(b,U,P,G),j!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(j).buffer))}function l(){return i.createVertexArray()}function c(b){return i.bindVertexArray(b)}function h(b){return i.deleteVertexArray(b)}function u(b,U,P){const G=P.wireframe===!0;let j=n[b.id];j===void 0&&(j={},n[b.id]=j);let H=j[U.id];H===void 0&&(H={},j[U.id]=H);let q=H[G];return q===void 0&&(q=d(l()),H[G]=q),q}function d(b){const U=[],P=[],G=[];for(let j=0;j<e;j++)U[j]=0,P[j]=0,G[j]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:P,attributeDivisors:G,object:b,attributes:{},index:null}}function f(b,U,P,G){const j=r.attributes,H=U.attributes;let q=0;const B=P.getAttributes();for(const O in B)if(B[O].location>=0){const W=j[O];let ft=H[O];if(ft===void 0&&(O==="instanceMatrix"&&b.instanceMatrix&&(ft=b.instanceMatrix),O==="instanceColor"&&b.instanceColor&&(ft=b.instanceColor)),W===void 0||W.attribute!==ft||ft&&W.data!==ft.data)return!0;q++}return r.attributesNum!==q||r.index!==G}function m(b,U,P,G){const j={},H=U.attributes;let q=0;const B=P.getAttributes();for(const O in B)if(B[O].location>=0){let W=H[O];W===void 0&&(O==="instanceMatrix"&&b.instanceMatrix&&(W=b.instanceMatrix),O==="instanceColor"&&b.instanceColor&&(W=b.instanceColor));const ft={};ft.attribute=W,W&&W.data&&(ft.data=W.data),j[O]=ft,q++}r.attributes=j,r.attributesNum=q,r.index=G}function x(){const b=r.newAttributes;for(let U=0,P=b.length;U<P;U++)b[U]=0}function g(b){p(b,0)}function p(b,U){const P=r.newAttributes,G=r.enabledAttributes,j=r.attributeDivisors;P[b]=1,G[b]===0&&(i.enableVertexAttribArray(b),G[b]=1),j[b]!==U&&(i.vertexAttribDivisor(b,U),j[b]=U)}function v(){const b=r.newAttributes,U=r.enabledAttributes;for(let P=0,G=U.length;P<G;P++)U[P]!==b[P]&&(i.disableVertexAttribArray(P),U[P]=0)}function y(b,U,P,G,j,H,q){q===!0?i.vertexAttribIPointer(b,U,P,j,H):i.vertexAttribPointer(b,U,P,G,j,H)}function _(b,U,P,G){x();const j=G.attributes,H=P.getAttributes(),q=U.defaultAttributeValues;for(const B in H){const O=H[B];if(O.location>=0){let Q=j[B];if(Q===void 0&&(B==="instanceMatrix"&&b.instanceMatrix&&(Q=b.instanceMatrix),B==="instanceColor"&&b.instanceColor&&(Q=b.instanceColor)),Q!==void 0){const W=Q.normalized,ft=Q.itemSize,Vt=t.get(Q);if(Vt===void 0)continue;const Me=Vt.buffer,ce=Vt.type,ht=Vt.bytesPerElement,Y=ce===i.INT||ce===i.UNSIGNED_INT||Q.gpuType===Nc;if(Q.isInterleavedBufferAttribute){const rt=Q.data,yt=rt.stride,Xt=Q.offset;if(rt.isInstancedInterleavedBuffer){for(let kt=0;kt<O.locationSize;kt++)p(O.location+kt,rt.meshPerAttribute);b.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let kt=0;kt<O.locationSize;kt++)g(O.location+kt);i.bindBuffer(i.ARRAY_BUFFER,Me);for(let kt=0;kt<O.locationSize;kt++)y(O.location+kt,ft/O.locationSize,ce,W,yt*ht,(Xt+ft/O.locationSize*kt)*ht,Y)}else{if(Q.isInstancedBufferAttribute){for(let rt=0;rt<O.locationSize;rt++)p(O.location+rt,Q.meshPerAttribute);b.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let rt=0;rt<O.locationSize;rt++)g(O.location+rt);i.bindBuffer(i.ARRAY_BUFFER,Me);for(let rt=0;rt<O.locationSize;rt++)y(O.location+rt,ft/O.locationSize,ce,W,ft*ht,ft/O.locationSize*rt*ht,Y)}}else if(q!==void 0){const W=q[B];if(W!==void 0)switch(W.length){case 2:i.vertexAttrib2fv(O.location,W);break;case 3:i.vertexAttrib3fv(O.location,W);break;case 4:i.vertexAttrib4fv(O.location,W);break;default:i.vertexAttrib1fv(O.location,W)}}}}v()}function T(){C();for(const b in n){const U=n[b];for(const P in U){const G=U[P];for(const j in G)h(G[j].object),delete G[j];delete U[P]}delete n[b]}}function A(b){if(n[b.id]===void 0)return;const U=n[b.id];for(const P in U){const G=U[P];for(const j in G)h(G[j].object),delete G[j];delete U[P]}delete n[b.id]}function E(b){for(const U in n){const P=n[U];if(P[b.id]===void 0)continue;const G=P[b.id];for(const j in G)h(G[j].object),delete G[j];delete P[b.id]}}function C(){S(),o=!0,r!==s&&(r=s,c(r.object))}function S(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:C,resetDefaultState:S,dispose:T,releaseStatesOfGeometry:A,releaseStatesOfProgram:E,initAttributes:x,enableAttribute:g,disableUnusedAttributes:v}}function ux(i,t,e){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),e.update(h,n,1)}function o(c,h,u){u!==0&&(i.drawArraysInstanced(n,c,h,u),e.update(h,n,u))}function a(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let m=0;m<u;m++)f+=h[m];e.update(f,n,1)}function l(c,h,u,d){if(u===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<c.length;m++)o(c[m],h[m],d[m]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let m=0;for(let x=0;x<u;x++)m+=h[x]*d[x];e.update(m,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function dx(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const E=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(E){return!(E!==On&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(E){const C=E===ho&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(E!==pi&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==si&&!C)}function l(E){if(E==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,d=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),v=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),y=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),T=m>0,A=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:m,maxTextureSize:x,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:_,vertexTextures:T,maxSamples:A}}function fx(i){const t=this;let e=null,n=0,s=!1,r=!1;const o=new hi,a=new xe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||s;return s=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){const m=u.clippingPlanes,x=u.clipIntersection,g=u.clipShadows,p=i.get(u);if(!s||m===null||m.length===0||r&&!g)r?h(null):c();else{const v=r?0:n,y=v*4;let _=p.clippingState||null;l.value=_,_=h(m,d,y,f);for(let T=0;T!==y;++T)_[T]=e[T];p.clippingState=_,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,m){const x=u!==null?u.length:0;let g=null;if(x!==0){if(g=l.value,m!==!0||g===null){const p=f+x*4,v=d.matrixWorldInverse;a.getNormalMatrix(v),(g===null||g.length<p)&&(g=new Float32Array(p));for(let y=0,_=f;y!==x;++y,_+=4)o.copy(u[y]).applyMatrix4(v,a),o.normal.toArray(g,_),g[_+3]=o.constant}l.value=g,l.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,g}}function px(i){let t=new WeakMap;function e(o,a){return a===$l?o.mapping=vr:a===Yl&&(o.mapping=_r),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===$l||a===Yl)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Wp(l.height);return c.fromEquirectangularTexture(i,o),t.set(o,c),o.addEventListener("dispose",s),e(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}const lr=4,pu=[.125,.215,.35,.446,.526,.582],ys=20,gl=new Cd,mu=new ee;let xl=null,vl=0,_l=0,yl=!1;const xs=(1+Math.sqrt(5))/2,Qs=1/xs,gu=[new L(-xs,Qs,0),new L(xs,Qs,0),new L(-Qs,0,xs),new L(Qs,0,xs),new L(0,xs,-Qs),new L(0,xs,Qs),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)],mx=new L;class xu{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100,r={}){const{size:o=256,position:a=mx}=r;xl=this._renderer.getRenderTarget(),vl=this._renderer.getActiveCubeFace(),_l=this._renderer.getActiveMipmapLevel(),yl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,s,l,a),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=yu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=_u(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(xl,vl,_l),this._renderer.xr.enabled=yl,t.scissorTest=!1,Xo(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===vr||t.mapping===_r?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),xl=this._renderer.getRenderTarget(),vl=this._renderer.getActiveCubeFace(),_l=this._renderer.getActiveMipmapLevel(),yl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:ii,minFilter:ii,generateMipmaps:!1,type:ho,format:On,colorSpace:Mr,depthBuffer:!1},s=vu(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=vu(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=gx(r)),this._blurMaterial=xx(r,t,e)}return s}_compileMaterial(t){const e=new Zt(this._lodPlanes[0],t);this._renderer.compile(e,gl)}_sceneToCubeUV(t,e,n,s,r){const l=new zn(90,1,e,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(mu),u.toneMapping=es,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null));const x=new _n({name:"PMREM.Background",side:Pn,depthWrite:!1,depthTest:!1}),g=new Zt(new Li,x);let p=!1;const v=t.background;v?v.isColor&&(x.color.copy(v),t.background=null,p=!0):(x.color.copy(mu),p=!0);for(let y=0;y<6;y++){const _=y%3;_===0?(l.up.set(0,c[y],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[y],r.y,r.z)):_===1?(l.up.set(0,0,c[y]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[y],r.z)):(l.up.set(0,c[y],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[y]));const T=this._cubeSize;Xo(s,_*T,y>2?T:0,T,T),u.setRenderTarget(s),p&&u.render(g,l),u.render(t,l)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=d,t.background=v}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===vr||t.mapping===_r;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=yu()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=_u());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new Zt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const l=this._cubeSize;Xo(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,gl)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=gu[(s-r-1)%gu.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Zt(this._lodPlanes[s],c),d=c.uniforms,f=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*ys-1),x=r/m,g=isFinite(r)?1+Math.floor(h*x):ys;g>ys&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${ys}`);const p=[];let v=0;for(let E=0;E<ys;++E){const C=E/x,S=Math.exp(-C*C/2);p.push(S),E===0?v+=S:E<g&&(v+=2*S)}for(let E=0;E<p.length;E++)p[E]=p[E]/v;d.envMap.value=t.texture,d.samples.value=g,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:y}=this;d.dTheta.value=m,d.mipInt.value=y-n;const _=this._sizeLods[s],T=3*_*(s>y-lr?s-y+lr:0),A=4*(this._cubeSize-_);Xo(e,T,A,3*_,2*_),l.setRenderTarget(e),l.render(u,gl)}}function gx(i){const t=[],e=[],n=[];let s=i;const r=i-lr+1+pu.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let l=1/a;o>i-lr?l=pu[o-i+lr-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,m=6,x=3,g=2,p=1,v=new Float32Array(x*m*f),y=new Float32Array(g*m*f),_=new Float32Array(p*m*f);for(let A=0;A<f;A++){const E=A%3*2/3-1,C=A>2?0:-1,S=[E,C,0,E+2/3,C,0,E+2/3,C+1,0,E,C,0,E+2/3,C+1,0,E,C+1,0];v.set(S,x*m*A),y.set(d,g*m*A);const b=[A,A,A,A,A,A];_.set(b,p*m*A)}const T=new we;T.setAttribute("position",new cn(v,x)),T.setAttribute("uv",new cn(y,g)),T.setAttribute("faceIndex",new cn(_,p)),t.push(T),s>lr&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function vu(i,t,e){const n=new is(i,t,e);return n.texture.mapping=ya,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Xo(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function xx(i,t,e){const n=new Float32Array(ys),s=new L(0,1,0);return new $n({name:"SphericalGaussianBlur",defines:{n:ys,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:sh(),fragmentShader:`

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
		`,blending:ts,depthTest:!1,depthWrite:!1})}function _u(){return new $n({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:sh(),fragmentShader:`

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
		`,blending:ts,depthTest:!1,depthWrite:!1})}function yu(){return new $n({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:sh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ts,depthTest:!1,depthWrite:!1})}function sh(){return`

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
	`}function vx(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===$l||l===Yl,h=l===vr||l===_r;if(c||h){let u=t.get(a);const d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new xu(i)),u=c?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const f=a.image;return c&&f&&f.height>0||h&&f&&s(f)?(e===null&&(e=new xu(i)),u=c?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function _x(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&oo("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function yx(i,t,e,n){const s={},r=new WeakMap;function o(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const m in d.attributes)t.remove(d.attributes[m]);d.removeEventListener("dispose",o),delete s[d.id];const f=r.get(d);f&&(t.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,e.memory.geometries++),d}function l(u){const d=u.attributes;for(const f in d)t.update(d[f],i.ARRAY_BUFFER)}function c(u){const d=[],f=u.index,m=u.attributes.position;let x=0;if(f!==null){const v=f.array;x=f.version;for(let y=0,_=v.length;y<_;y+=3){const T=v[y+0],A=v[y+1],E=v[y+2];d.push(T,A,A,E,E,T)}}else if(m!==void 0){const v=m.array;x=m.version;for(let y=0,_=v.length/3-1;y<_;y+=3){const T=y+0,A=y+1,E=y+2;d.push(T,A,A,E,E,T)}}else return;const g=new(fd(d)?gd:$c)(d,1);g.version=x;const p=r.get(u);p&&t.remove(p),r.set(u,g)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function Mx(i,t,e){let n;function s(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,f){i.drawElements(n,f,r,d*o),e.update(f,n,1)}function c(d,f,m){m!==0&&(i.drawElementsInstanced(n,f,r,d*o,m),e.update(f,n,m))}function h(d,f,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,m);let g=0;for(let p=0;p<m;p++)g+=f[p];e.update(g,n,1)}function u(d,f,m,x){if(m===0)return;const g=t.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<d.length;p++)c(d[p]/o,f[p],x[p]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,x,0,m);let p=0;for(let v=0;v<m;v++)p+=f[v]*x[v];e.update(p,n,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function bx(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Sx(i,t,e){const n=new WeakMap,s=new ze;function r(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(a);if(d===void 0||d.count!==u){let b=function(){C.dispose(),n.delete(a),a.removeEventListener("dispose",b)};var f=b;d!==void 0&&d.texture.dispose();const m=a.morphAttributes.position!==void 0,x=a.morphAttributes.normal!==void 0,g=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],v=a.morphAttributes.normal||[],y=a.morphAttributes.color||[];let _=0;m===!0&&(_=1),x===!0&&(_=2),g===!0&&(_=3);let T=a.attributes.position.count*_,A=1;T>t.maxTextureSize&&(A=Math.ceil(T/t.maxTextureSize),T=t.maxTextureSize);const E=new Float32Array(T*A*4*u),C=new pd(E,T,A,u);C.type=si,C.needsUpdate=!0;const S=_*4;for(let U=0;U<u;U++){const P=p[U],G=v[U],j=y[U],H=T*A*4*U;for(let q=0;q<P.count;q++){const B=q*S;m===!0&&(s.fromBufferAttribute(P,q),E[H+B+0]=s.x,E[H+B+1]=s.y,E[H+B+2]=s.z,E[H+B+3]=0),x===!0&&(s.fromBufferAttribute(G,q),E[H+B+4]=s.x,E[H+B+5]=s.y,E[H+B+6]=s.z,E[H+B+7]=0),g===!0&&(s.fromBufferAttribute(j,q),E[H+B+8]=s.x,E[H+B+9]=s.y,E[H+B+10]=s.z,E[H+B+11]=j.itemSize===4?s.w:1)}}d={count:u,texture:C,size:new Wt(T,A)},n.set(a,d),a.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let m=0;for(let g=0;g<c.length;g++)m+=c[g];const x=a.morphTargetsRelative?1:1-m;l.getUniforms().setValue(i,"morphTargetBaseInfluence",x),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function wx(i,t,e,n){let s=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=t.get(l,h);if(s.get(u)!==c&&(t.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;s.get(d)!==c&&(d.update(),s.set(d,c))}return u}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}const Dd=new En,Mu=new bd(1,1),Id=new pd,zd=new Rp,Ld=new _d,bu=[],Su=[],wu=new Float32Array(16),Eu=new Float32Array(9),Tu=new Float32Array(4);function Er(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=bu[s];if(r===void 0&&(r=new Float32Array(s),bu[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function hn(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function un(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Ea(i,t){let e=Su[t];e===void 0&&(e=new Int32Array(t),Su[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Ex(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Tx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(hn(e,t))return;i.uniform2fv(this.addr,t),un(e,t)}}function Ax(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(hn(e,t))return;i.uniform3fv(this.addr,t),un(e,t)}}function Rx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(hn(e,t))return;i.uniform4fv(this.addr,t),un(e,t)}}function Cx(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(hn(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),un(e,t)}else{if(hn(e,n))return;Tu.set(n),i.uniformMatrix2fv(this.addr,!1,Tu),un(e,n)}}function Px(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(hn(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),un(e,t)}else{if(hn(e,n))return;Eu.set(n),i.uniformMatrix3fv(this.addr,!1,Eu),un(e,n)}}function Dx(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(hn(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),un(e,t)}else{if(hn(e,n))return;wu.set(n),i.uniformMatrix4fv(this.addr,!1,wu),un(e,n)}}function Ix(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function zx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(hn(e,t))return;i.uniform2iv(this.addr,t),un(e,t)}}function Lx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(hn(e,t))return;i.uniform3iv(this.addr,t),un(e,t)}}function Ux(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(hn(e,t))return;i.uniform4iv(this.addr,t),un(e,t)}}function Nx(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function kx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(hn(e,t))return;i.uniform2uiv(this.addr,t),un(e,t)}}function Fx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(hn(e,t))return;i.uniform3uiv(this.addr,t),un(e,t)}}function Ox(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(hn(e,t))return;i.uniform4uiv(this.addr,t),un(e,t)}}function Bx(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Mu.compareFunction=dd,r=Mu):r=Dd,e.setTexture2D(t||r,s)}function Hx(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||zd,s)}function Gx(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Ld,s)}function Vx(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Id,s)}function Wx(i){switch(i){case 5126:return Ex;case 35664:return Tx;case 35665:return Ax;case 35666:return Rx;case 35674:return Cx;case 35675:return Px;case 35676:return Dx;case 5124:case 35670:return Ix;case 35667:case 35671:return zx;case 35668:case 35672:return Lx;case 35669:case 35673:return Ux;case 5125:return Nx;case 36294:return kx;case 36295:return Fx;case 36296:return Ox;case 35678:case 36198:case 36298:case 36306:case 35682:return Bx;case 35679:case 36299:case 36307:return Hx;case 35680:case 36300:case 36308:case 36293:return Gx;case 36289:case 36303:case 36311:case 36292:return Vx}}function Xx(i,t){i.uniform1fv(this.addr,t)}function qx(i,t){const e=Er(t,this.size,2);i.uniform2fv(this.addr,e)}function $x(i,t){const e=Er(t,this.size,3);i.uniform3fv(this.addr,e)}function Yx(i,t){const e=Er(t,this.size,4);i.uniform4fv(this.addr,e)}function Zx(i,t){const e=Er(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function jx(i,t){const e=Er(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Kx(i,t){const e=Er(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Jx(i,t){i.uniform1iv(this.addr,t)}function Qx(i,t){i.uniform2iv(this.addr,t)}function tv(i,t){i.uniform3iv(this.addr,t)}function ev(i,t){i.uniform4iv(this.addr,t)}function nv(i,t){i.uniform1uiv(this.addr,t)}function iv(i,t){i.uniform2uiv(this.addr,t)}function sv(i,t){i.uniform3uiv(this.addr,t)}function rv(i,t){i.uniform4uiv(this.addr,t)}function ov(i,t,e){const n=this.cache,s=t.length,r=Ea(e,s);hn(n,r)||(i.uniform1iv(this.addr,r),un(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||Dd,r[o])}function av(i,t,e){const n=this.cache,s=t.length,r=Ea(e,s);hn(n,r)||(i.uniform1iv(this.addr,r),un(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||zd,r[o])}function lv(i,t,e){const n=this.cache,s=t.length,r=Ea(e,s);hn(n,r)||(i.uniform1iv(this.addr,r),un(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Ld,r[o])}function cv(i,t,e){const n=this.cache,s=t.length,r=Ea(e,s);hn(n,r)||(i.uniform1iv(this.addr,r),un(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Id,r[o])}function hv(i){switch(i){case 5126:return Xx;case 35664:return qx;case 35665:return $x;case 35666:return Yx;case 35674:return Zx;case 35675:return jx;case 35676:return Kx;case 5124:case 35670:return Jx;case 35667:case 35671:return Qx;case 35668:case 35672:return tv;case 35669:case 35673:return ev;case 5125:return nv;case 36294:return iv;case 36295:return sv;case 36296:return rv;case 35678:case 36198:case 36298:case 36306:case 35682:return ov;case 35679:case 36299:case 36307:return av;case 35680:case 36300:case 36308:case 36293:return lv;case 36289:case 36303:case 36311:case 36292:return cv}}class uv{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Wx(e.type)}}class dv{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=hv(e.type)}}class fv{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],n)}}}const Ml=/(\w+)(\])?(\[|\.)?/g;function Au(i,t){i.seq.push(t),i.map[t.id]=t}function pv(i,t,e){const n=i.name,s=n.length;for(Ml.lastIndex=0;;){const r=Ml.exec(n),o=Ml.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Au(e,c===void 0?new uv(a,i,t):new dv(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new fv(a),Au(e,u)),e=u}}}class ca{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);pv(r,o,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&n.push(o)}return n}}function Ru(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const mv=37297;let gv=0;function xv(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const Cu=new xe;function vv(i){Ue._getMatrix(Cu,Ue.workingColorSpace,i);const t=`mat3( ${Cu.elements.map(e=>e.toFixed(4))} )`;switch(Ue.getTransfer(i)){case ha:return[t,"LinearTransferOETF"];case Ge:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Pu(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+xv(i.getShaderSource(t),a)}else return r}function _v(i,t){const e=vv(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function yv(i,t){let e;switch(t){case Hf:e="Linear";break;case Gf:e="Reinhard";break;case Vf:e="Cineon";break;case id:e="ACESFilmic";break;case Xf:e="AgX";break;case qf:e="Neutral";break;case Wf:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const qo=new L;function Mv(){Ue.getLuminanceCoefficients(qo);const i=qo.x.toFixed(4),t=qo.y.toFixed(4),e=qo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function bv(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter($r).join(`
`)}function Sv(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function wv(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function $r(i){return i!==""}function Du(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Iu(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Ev=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ac(i){return i.replace(Ev,Av)}const Tv=new Map;function Av(i,t){let e=_e[t];if(e===void 0){const n=Tv.get(t);if(n!==void 0)e=_e[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Ac(e)}const Rv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function zu(i){return i.replace(Rv,Cv)}function Cv(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Lu(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function Pv(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===ed?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===yf?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Ei&&(t="SHADOWMAP_TYPE_VSM"),t}function Dv(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case vr:case _r:t="ENVMAP_TYPE_CUBE";break;case ya:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Iv(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case _r:t="ENVMAP_MODE_REFRACTION";break}return t}function zv(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case nd:t="ENVMAP_BLENDING_MULTIPLY";break;case Of:t="ENVMAP_BLENDING_MIX";break;case Bf:t="ENVMAP_BLENDING_ADD";break}return t}function Lv(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Uv(i,t,e,n){const s=i.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=Pv(e),c=Dv(e),h=Iv(e),u=zv(e),d=Lv(e),f=bv(e),m=Sv(r),x=s.createProgram();let g,p,v=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter($r).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter($r).join(`
`),p.length>0&&(p+=`
`)):(g=[Lu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter($r).join(`
`),p=[Lu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==es?"#define TONE_MAPPING":"",e.toneMapping!==es?_e.tonemapping_pars_fragment:"",e.toneMapping!==es?yv("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",_e.colorspace_pars_fragment,_v("linearToOutputTexel",e.outputColorSpace),Mv(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter($r).join(`
`)),o=Ac(o),o=Du(o,e),o=Iu(o,e),a=Ac(a),a=Du(a,e),a=Iu(a,e),o=zu(o),a=zu(a),e.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",e.glslVersion===Rh?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Rh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const y=v+g+o,_=v+p+a,T=Ru(s,s.VERTEX_SHADER,y),A=Ru(s,s.FRAGMENT_SHADER,_);s.attachShader(x,T),s.attachShader(x,A),e.index0AttributeName!==void 0?s.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function E(U){if(i.debug.checkShaderErrors){const P=s.getProgramInfoLog(x)||"",G=s.getShaderInfoLog(T)||"",j=s.getShaderInfoLog(A)||"",H=P.trim(),q=G.trim(),B=j.trim();let O=!0,Q=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(O=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,T,A);else{const W=Pu(s,T,"vertex"),ft=Pu(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+U.name+`
Material Type: `+U.type+`

Program Info Log: `+H+`
`+W+`
`+ft)}else H!==""?console.warn("THREE.WebGLProgram: Program Info Log:",H):(q===""||B==="")&&(Q=!1);Q&&(U.diagnostics={runnable:O,programLog:H,vertexShader:{log:q,prefix:g},fragmentShader:{log:B,prefix:p}})}s.deleteShader(T),s.deleteShader(A),C=new ca(s,x),S=wv(s,x)}let C;this.getUniforms=function(){return C===void 0&&E(this),C};let S;this.getAttributes=function(){return S===void 0&&E(this),S};let b=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=s.getProgramParameter(x,mv)),b},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=gv++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=T,this.fragmentShader=A,this}let Nv=0;class kv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Fv(t),e.set(t,n)),n}}class Fv{constructor(t){this.id=Nv++,this.code=t,this.usedTimes=0}}function Ov(i,t,e,n,s,r,o){const a=new qc,l=new kv,c=new Set,h=[],u=s.logarithmicDepthBuffer,d=s.vertexTextures;let f=s.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(S){return c.add(S),S===0?"uv":`uv${S}`}function g(S,b,U,P,G){const j=P.fog,H=G.geometry,q=S.isMeshStandardMaterial?P.environment:null,B=(S.isMeshStandardMaterial?e:t).get(S.envMap||q),O=B&&B.mapping===ya?B.image.height:null,Q=m[S.type];S.precision!==null&&(f=s.getMaxPrecision(S.precision),f!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));const W=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,ft=W!==void 0?W.length:0;let Vt=0;H.morphAttributes.position!==void 0&&(Vt=1),H.morphAttributes.normal!==void 0&&(Vt=2),H.morphAttributes.color!==void 0&&(Vt=3);let Me,ce,ht,Y;if(Q){const ve=ui[Q];Me=ve.vertexShader,ce=ve.fragmentShader}else Me=S.vertexShader,ce=S.fragmentShader,l.update(S),ht=l.getVertexShaderID(S),Y=l.getFragmentShaderID(S);const rt=i.getRenderTarget(),yt=i.state.buffers.depth.getReversed(),Xt=G.isInstancedMesh===!0,kt=G.isBatchedMesh===!0,fe=!!S.map,Ee=!!S.matcap,I=!!B,ne=!!S.aoMap,Yt=!!S.lightMap,qt=!!S.bumpMap,Lt=!!S.normalMap,se=!!S.displacementMap,mt=!!S.emissiveMap,bt=!!S.metalnessMap,le=!!S.roughnessMap,De=S.anisotropy>0,D=S.clearcoat>0,w=S.dispersion>0,tt=S.iridescence>0,at=S.sheen>0,lt=S.transmission>0,ot=De&&!!S.anisotropyMap,Ut=D&&!!S.clearcoatMap,ct=D&&!!S.clearcoatNormalMap,wt=D&&!!S.clearcoatRoughnessMap,Pt=tt&&!!S.iridescenceMap,gt=tt&&!!S.iridescenceThicknessMap,Rt=at&&!!S.sheenColorMap,jt=at&&!!S.sheenRoughnessMap,Ot=!!S.specularMap,Et=!!S.specularColorMap,ue=!!S.specularIntensityMap,$=lt&&!!S.transmissionMap,_t=lt&&!!S.thicknessMap,Tt=!!S.gradientMap,Ft=!!S.alphaMap,xt=S.alphaTest>0,ut=!!S.alphaHash,Bt=!!S.extensions;let de=es;S.toneMapped&&(rt===null||rt.isXRRenderTarget===!0)&&(de=i.toneMapping);const Oe={shaderID:Q,shaderType:S.type,shaderName:S.name,vertexShader:Me,fragmentShader:ce,defines:S.defines,customVertexShaderID:ht,customFragmentShaderID:Y,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:kt,batchingColor:kt&&G._colorsTexture!==null,instancing:Xt,instancingColor:Xt&&G.instanceColor!==null,instancingMorph:Xt&&G.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:rt===null?i.outputColorSpace:rt.isXRRenderTarget===!0?rt.texture.colorSpace:Mr,alphaToCoverage:!!S.alphaToCoverage,map:fe,matcap:Ee,envMap:I,envMapMode:I&&B.mapping,envMapCubeUVHeight:O,aoMap:ne,lightMap:Yt,bumpMap:qt,normalMap:Lt,displacementMap:d&&se,emissiveMap:mt,normalMapObjectSpace:Lt&&S.normalMapType===Kf,normalMapTangentSpace:Lt&&S.normalMapType===Vc,metalnessMap:bt,roughnessMap:le,anisotropy:De,anisotropyMap:ot,clearcoat:D,clearcoatMap:Ut,clearcoatNormalMap:ct,clearcoatRoughnessMap:wt,dispersion:w,iridescence:tt,iridescenceMap:Pt,iridescenceThicknessMap:gt,sheen:at,sheenColorMap:Rt,sheenRoughnessMap:jt,specularMap:Ot,specularColorMap:Et,specularIntensityMap:ue,transmission:lt,transmissionMap:$,thicknessMap:_t,gradientMap:Tt,opaque:S.transparent===!1&&S.blending===dr&&S.alphaToCoverage===!1,alphaMap:Ft,alphaTest:xt,alphaHash:ut,combine:S.combine,mapUv:fe&&x(S.map.channel),aoMapUv:ne&&x(S.aoMap.channel),lightMapUv:Yt&&x(S.lightMap.channel),bumpMapUv:qt&&x(S.bumpMap.channel),normalMapUv:Lt&&x(S.normalMap.channel),displacementMapUv:se&&x(S.displacementMap.channel),emissiveMapUv:mt&&x(S.emissiveMap.channel),metalnessMapUv:bt&&x(S.metalnessMap.channel),roughnessMapUv:le&&x(S.roughnessMap.channel),anisotropyMapUv:ot&&x(S.anisotropyMap.channel),clearcoatMapUv:Ut&&x(S.clearcoatMap.channel),clearcoatNormalMapUv:ct&&x(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:wt&&x(S.clearcoatRoughnessMap.channel),iridescenceMapUv:Pt&&x(S.iridescenceMap.channel),iridescenceThicknessMapUv:gt&&x(S.iridescenceThicknessMap.channel),sheenColorMapUv:Rt&&x(S.sheenColorMap.channel),sheenRoughnessMapUv:jt&&x(S.sheenRoughnessMap.channel),specularMapUv:Ot&&x(S.specularMap.channel),specularColorMapUv:Et&&x(S.specularColorMap.channel),specularIntensityMapUv:ue&&x(S.specularIntensityMap.channel),transmissionMapUv:$&&x(S.transmissionMap.channel),thicknessMapUv:_t&&x(S.thicknessMap.channel),alphaMapUv:Ft&&x(S.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(Lt||De),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:G.isPoints===!0&&!!H.attributes.uv&&(fe||Ft),fog:!!j,useFog:S.fog===!0,fogExp2:!!j&&j.isFogExp2,flatShading:S.flatShading===!0&&S.wireframe===!1,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:yt,skinning:G.isSkinnedMesh===!0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:ft,morphTextureStride:Vt,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&U.length>0,shadowMapType:i.shadowMap.type,toneMapping:de,decodeVideoTexture:fe&&S.map.isVideoTexture===!0&&Ue.getTransfer(S.map.colorSpace)===Ge,decodeVideoTextureEmissive:mt&&S.emissiveMap.isVideoTexture===!0&&Ue.getTransfer(S.emissiveMap.colorSpace)===Ge,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Pe,flipSided:S.side===Pn,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Bt&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Bt&&S.extensions.multiDraw===!0||kt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Oe.vertexUv1s=c.has(1),Oe.vertexUv2s=c.has(2),Oe.vertexUv3s=c.has(3),c.clear(),Oe}function p(S){const b=[];if(S.shaderID?b.push(S.shaderID):(b.push(S.customVertexShaderID),b.push(S.customFragmentShaderID)),S.defines!==void 0)for(const U in S.defines)b.push(U),b.push(S.defines[U]);return S.isRawShaderMaterial===!1&&(v(b,S),y(b,S),b.push(i.outputColorSpace)),b.push(S.customProgramCacheKey),b.join()}function v(S,b){S.push(b.precision),S.push(b.outputColorSpace),S.push(b.envMapMode),S.push(b.envMapCubeUVHeight),S.push(b.mapUv),S.push(b.alphaMapUv),S.push(b.lightMapUv),S.push(b.aoMapUv),S.push(b.bumpMapUv),S.push(b.normalMapUv),S.push(b.displacementMapUv),S.push(b.emissiveMapUv),S.push(b.metalnessMapUv),S.push(b.roughnessMapUv),S.push(b.anisotropyMapUv),S.push(b.clearcoatMapUv),S.push(b.clearcoatNormalMapUv),S.push(b.clearcoatRoughnessMapUv),S.push(b.iridescenceMapUv),S.push(b.iridescenceThicknessMapUv),S.push(b.sheenColorMapUv),S.push(b.sheenRoughnessMapUv),S.push(b.specularMapUv),S.push(b.specularColorMapUv),S.push(b.specularIntensityMapUv),S.push(b.transmissionMapUv),S.push(b.thicknessMapUv),S.push(b.combine),S.push(b.fogExp2),S.push(b.sizeAttenuation),S.push(b.morphTargetsCount),S.push(b.morphAttributeCount),S.push(b.numDirLights),S.push(b.numPointLights),S.push(b.numSpotLights),S.push(b.numSpotLightMaps),S.push(b.numHemiLights),S.push(b.numRectAreaLights),S.push(b.numDirLightShadows),S.push(b.numPointLightShadows),S.push(b.numSpotLightShadows),S.push(b.numSpotLightShadowsWithMaps),S.push(b.numLightProbes),S.push(b.shadowMapType),S.push(b.toneMapping),S.push(b.numClippingPlanes),S.push(b.numClipIntersection),S.push(b.depthPacking)}function y(S,b){a.disableAll(),b.supportsVertexTextures&&a.enable(0),b.instancing&&a.enable(1),b.instancingColor&&a.enable(2),b.instancingMorph&&a.enable(3),b.matcap&&a.enable(4),b.envMap&&a.enable(5),b.normalMapObjectSpace&&a.enable(6),b.normalMapTangentSpace&&a.enable(7),b.clearcoat&&a.enable(8),b.iridescence&&a.enable(9),b.alphaTest&&a.enable(10),b.vertexColors&&a.enable(11),b.vertexAlphas&&a.enable(12),b.vertexUv1s&&a.enable(13),b.vertexUv2s&&a.enable(14),b.vertexUv3s&&a.enable(15),b.vertexTangents&&a.enable(16),b.anisotropy&&a.enable(17),b.alphaHash&&a.enable(18),b.batching&&a.enable(19),b.dispersion&&a.enable(20),b.batchingColor&&a.enable(21),b.gradientMap&&a.enable(22),S.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reversedDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),S.push(a.mask)}function _(S){const b=m[S.type];let U;if(b){const P=ui[b];U=fa.clone(P.uniforms)}else U=S.uniforms;return U}function T(S,b){let U;for(let P=0,G=h.length;P<G;P++){const j=h[P];if(j.cacheKey===b){U=j,++U.usedTimes;break}}return U===void 0&&(U=new Uv(i,b,S,r),h.push(U)),U}function A(S){if(--S.usedTimes===0){const b=h.indexOf(S);h[b]=h[h.length-1],h.pop(),S.destroy()}}function E(S){l.remove(S)}function C(){l.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:_,acquireProgram:T,releaseProgram:A,releaseShaderCache:E,programs:h,dispose:C}}function Bv(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function Hv(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Uu(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Nu(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u,d,f,m,x,g){let p=i[t];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:m,renderOrder:u.renderOrder,z:x,group:g},i[t]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=m,p.renderOrder=u.renderOrder,p.z=x,p.group=g),t++,p}function a(u,d,f,m,x,g){const p=o(u,d,f,m,x,g);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):e.push(p)}function l(u,d,f,m,x,g){const p=o(u,d,f,m,x,g);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):e.unshift(p)}function c(u,d){e.length>1&&e.sort(u||Hv),n.length>1&&n.sort(d||Uu),s.length>1&&s.sort(d||Uu)}function h(){for(let u=t,d=i.length;u<d;u++){const f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:l,finish:h,sort:c}}function Gv(){let i=new WeakMap;function t(n,s){const r=i.get(n);let o;return r===void 0?(o=new Nu,i.set(n,[o])):s>=r.length?(o=new Nu,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function Vv(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new L,color:new ee};break;case"SpotLight":e={position:new L,direction:new L,color:new ee,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new L,color:new ee,distance:0,decay:0};break;case"HemisphereLight":e={direction:new L,skyColor:new ee,groundColor:new ee};break;case"RectAreaLight":e={color:new ee,position:new L,halfWidth:new L,halfHeight:new L};break}return i[t.id]=e,e}}}function Wv(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Wt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Wt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Wt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let Xv=0;function qv(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function $v(i){const t=new Vv,e=Wv(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new L);const s=new L,r=new he,o=new he;function a(c){let h=0,u=0,d=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let f=0,m=0,x=0,g=0,p=0,v=0,y=0,_=0,T=0,A=0,E=0;c.sort(qv);for(let S=0,b=c.length;S<b;S++){const U=c[S],P=U.color,G=U.intensity,j=U.distance,H=U.shadow&&U.shadow.map?U.shadow.map.texture:null;if(U.isAmbientLight)h+=P.r*G,u+=P.g*G,d+=P.b*G;else if(U.isLightProbe){for(let q=0;q<9;q++)n.probe[q].addScaledVector(U.sh.coefficients[q],G);E++}else if(U.isDirectionalLight){const q=t.get(U);if(q.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){const B=U.shadow,O=e.get(U);O.shadowIntensity=B.intensity,O.shadowBias=B.bias,O.shadowNormalBias=B.normalBias,O.shadowRadius=B.radius,O.shadowMapSize=B.mapSize,n.directionalShadow[f]=O,n.directionalShadowMap[f]=H,n.directionalShadowMatrix[f]=U.shadow.matrix,v++}n.directional[f]=q,f++}else if(U.isSpotLight){const q=t.get(U);q.position.setFromMatrixPosition(U.matrixWorld),q.color.copy(P).multiplyScalar(G),q.distance=j,q.coneCos=Math.cos(U.angle),q.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),q.decay=U.decay,n.spot[x]=q;const B=U.shadow;if(U.map&&(n.spotLightMap[T]=U.map,T++,B.updateMatrices(U),U.castShadow&&A++),n.spotLightMatrix[x]=B.matrix,U.castShadow){const O=e.get(U);O.shadowIntensity=B.intensity,O.shadowBias=B.bias,O.shadowNormalBias=B.normalBias,O.shadowRadius=B.radius,O.shadowMapSize=B.mapSize,n.spotShadow[x]=O,n.spotShadowMap[x]=H,_++}x++}else if(U.isRectAreaLight){const q=t.get(U);q.color.copy(P).multiplyScalar(G),q.halfWidth.set(U.width*.5,0,0),q.halfHeight.set(0,U.height*.5,0),n.rectArea[g]=q,g++}else if(U.isPointLight){const q=t.get(U);if(q.color.copy(U.color).multiplyScalar(U.intensity),q.distance=U.distance,q.decay=U.decay,U.castShadow){const B=U.shadow,O=e.get(U);O.shadowIntensity=B.intensity,O.shadowBias=B.bias,O.shadowNormalBias=B.normalBias,O.shadowRadius=B.radius,O.shadowMapSize=B.mapSize,O.shadowCameraNear=B.camera.near,O.shadowCameraFar=B.camera.far,n.pointShadow[m]=O,n.pointShadowMap[m]=H,n.pointShadowMatrix[m]=U.shadow.matrix,y++}n.point[m]=q,m++}else if(U.isHemisphereLight){const q=t.get(U);q.skyColor.copy(U.color).multiplyScalar(G),q.groundColor.copy(U.groundColor).multiplyScalar(G),n.hemi[p]=q,p++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ct.LTC_FLOAT_1,n.rectAreaLTC2=Ct.LTC_FLOAT_2):(n.rectAreaLTC1=Ct.LTC_HALF_1,n.rectAreaLTC2=Ct.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const C=n.hash;(C.directionalLength!==f||C.pointLength!==m||C.spotLength!==x||C.rectAreaLength!==g||C.hemiLength!==p||C.numDirectionalShadows!==v||C.numPointShadows!==y||C.numSpotShadows!==_||C.numSpotMaps!==T||C.numLightProbes!==E)&&(n.directional.length=f,n.spot.length=x,n.rectArea.length=g,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=_+T-A,n.spotLightMap.length=T,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=E,C.directionalLength=f,C.pointLength=m,C.spotLength=x,C.rectAreaLength=g,C.hemiLength=p,C.numDirectionalShadows=v,C.numPointShadows=y,C.numSpotShadows=_,C.numSpotMaps=T,C.numLightProbes=E,n.version=Xv++)}function l(c,h){let u=0,d=0,f=0,m=0,x=0;const g=h.matrixWorldInverse;for(let p=0,v=c.length;p<v;p++){const y=c[p];if(y.isDirectionalLight){const _=n.directional[u];_.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(g),u++}else if(y.isSpotLight){const _=n.spot[f];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(g),_.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(g),f++}else if(y.isRectAreaLight){const _=n.rectArea[m];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(g),o.identity(),r.copy(y.matrixWorld),r.premultiply(g),o.extractRotation(r),_.halfWidth.set(y.width*.5,0,0),_.halfHeight.set(0,y.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),m++}else if(y.isPointLight){const _=n.point[d];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(g),d++}else if(y.isHemisphereLight){const _=n.hemi[x];_.direction.setFromMatrixPosition(y.matrixWorld),_.direction.transformDirection(g),x++}}}return{setup:a,setupView:l,state:n}}function ku(i){const t=new $v(i),e=[],n=[];function s(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function Yv(i){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new ku(i),t.set(s,[a])):r>=o.length?(a=new ku(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}const Zv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,jv=`uniform sampler2D shadow_pass;
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
}`;function Kv(i,t,e){let n=new jc;const s=new Wt,r=new Wt,o=new ze,a=new vm({depthPacking:jf}),l=new _m,c={},h=e.maxTextureSize,u={[zi]:Pn,[Pn]:zi,[Pe]:Pe},d=new $n({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Wt},radius:{value:4}},vertexShader:Zv,fragmentShader:jv}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const m=new we;m.setAttribute("position",new cn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new Zt(m,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ed;let p=this.type;this.render=function(A,E,C){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||A.length===0)return;const S=i.getRenderTarget(),b=i.getActiveCubeFace(),U=i.getActiveMipmapLevel(),P=i.state;P.setBlending(ts),P.buffers.depth.getReversed()===!0?P.buffers.color.setClear(0,0,0,0):P.buffers.color.setClear(1,1,1,1),P.buffers.depth.setTest(!0),P.setScissorTest(!1);const G=p!==Ei&&this.type===Ei,j=p===Ei&&this.type!==Ei;for(let H=0,q=A.length;H<q;H++){const B=A[H],O=B.shadow;if(O===void 0){console.warn("THREE.WebGLShadowMap:",B,"has no shadow.");continue}if(O.autoUpdate===!1&&O.needsUpdate===!1)continue;s.copy(O.mapSize);const Q=O.getFrameExtents();if(s.multiply(Q),r.copy(O.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/Q.x),s.x=r.x*Q.x,O.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/Q.y),s.y=r.y*Q.y,O.mapSize.y=r.y)),O.map===null||G===!0||j===!0){const ft=this.type!==Ei?{minFilter:Bn,magFilter:Bn}:{};O.map!==null&&O.map.dispose(),O.map=new is(s.x,s.y,ft),O.map.texture.name=B.name+".shadowMap",O.camera.updateProjectionMatrix()}i.setRenderTarget(O.map),i.clear();const W=O.getViewportCount();for(let ft=0;ft<W;ft++){const Vt=O.getViewport(ft);o.set(r.x*Vt.x,r.y*Vt.y,r.x*Vt.z,r.y*Vt.w),P.viewport(o),O.updateMatrices(B,ft),n=O.getFrustum(),_(E,C,O.camera,B,this.type)}O.isPointLightShadow!==!0&&this.type===Ei&&v(O,C),O.needsUpdate=!1}p=this.type,g.needsUpdate=!1,i.setRenderTarget(S,b,U)};function v(A,E){const C=t.update(x);d.defines.VSM_SAMPLES!==A.blurSamples&&(d.defines.VSM_SAMPLES=A.blurSamples,f.defines.VSM_SAMPLES=A.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new is(s.x,s.y)),d.uniforms.shadow_pass.value=A.map.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(E,null,C,d,x,null),f.uniforms.shadow_pass.value=A.mapPass.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(E,null,C,f,x,null)}function y(A,E,C,S){let b=null;const U=C.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(U!==void 0)b=U;else if(b=C.isPointLight===!0?l:a,i.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0||E.alphaToCoverage===!0){const P=b.uuid,G=E.uuid;let j=c[P];j===void 0&&(j={},c[P]=j);let H=j[G];H===void 0&&(H=b.clone(),j[G]=H,E.addEventListener("dispose",T)),b=H}if(b.visible=E.visible,b.wireframe=E.wireframe,S===Ei?b.side=E.shadowSide!==null?E.shadowSide:E.side:b.side=E.shadowSide!==null?E.shadowSide:u[E.side],b.alphaMap=E.alphaMap,b.alphaTest=E.alphaToCoverage===!0?.5:E.alphaTest,b.map=E.map,b.clipShadows=E.clipShadows,b.clippingPlanes=E.clippingPlanes,b.clipIntersection=E.clipIntersection,b.displacementMap=E.displacementMap,b.displacementScale=E.displacementScale,b.displacementBias=E.displacementBias,b.wireframeLinewidth=E.wireframeLinewidth,b.linewidth=E.linewidth,C.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const P=i.properties.get(b);P.light=C}return b}function _(A,E,C,S,b){if(A.visible===!1)return;if(A.layers.test(E.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&b===Ei)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,A.matrixWorld);const G=t.update(A),j=A.material;if(Array.isArray(j)){const H=G.groups;for(let q=0,B=H.length;q<B;q++){const O=H[q],Q=j[O.materialIndex];if(Q&&Q.visible){const W=y(A,Q,S,b);A.onBeforeShadow(i,A,E,C,G,W,O),i.renderBufferDirect(C,null,G,W,A,O),A.onAfterShadow(i,A,E,C,G,W,O)}}}else if(j.visible){const H=y(A,j,S,b);A.onBeforeShadow(i,A,E,C,G,H,null),i.renderBufferDirect(C,null,G,H,A,null),A.onAfterShadow(i,A,E,C,G,H,null)}}const P=A.children;for(let G=0,j=P.length;G<j;G++)_(P[G],E,C,S,b)}function T(A){A.target.removeEventListener("dispose",T);for(const C in c){const S=c[C],b=A.target.uuid;b in S&&(S[b].dispose(),delete S[b])}}}const Jv={[Bl]:Hl,[Gl]:Xl,[Vl]:ql,[xr]:Wl,[Hl]:Bl,[Xl]:Gl,[ql]:Vl,[Wl]:xr};function Qv(i,t){function e(){let $=!1;const _t=new ze;let Tt=null;const Ft=new ze(0,0,0,0);return{setMask:function(xt){Tt!==xt&&!$&&(i.colorMask(xt,xt,xt,xt),Tt=xt)},setLocked:function(xt){$=xt},setClear:function(xt,ut,Bt,de,Oe){Oe===!0&&(xt*=de,ut*=de,Bt*=de),_t.set(xt,ut,Bt,de),Ft.equals(_t)===!1&&(i.clearColor(xt,ut,Bt,de),Ft.copy(_t))},reset:function(){$=!1,Tt=null,Ft.set(-1,0,0,0)}}}function n(){let $=!1,_t=!1,Tt=null,Ft=null,xt=null;return{setReversed:function(ut){if(_t!==ut){const Bt=t.get("EXT_clip_control");ut?Bt.clipControlEXT(Bt.LOWER_LEFT_EXT,Bt.ZERO_TO_ONE_EXT):Bt.clipControlEXT(Bt.LOWER_LEFT_EXT,Bt.NEGATIVE_ONE_TO_ONE_EXT),_t=ut;const de=xt;xt=null,this.setClear(de)}},getReversed:function(){return _t},setTest:function(ut){ut?rt(i.DEPTH_TEST):yt(i.DEPTH_TEST)},setMask:function(ut){Tt!==ut&&!$&&(i.depthMask(ut),Tt=ut)},setFunc:function(ut){if(_t&&(ut=Jv[ut]),Ft!==ut){switch(ut){case Bl:i.depthFunc(i.NEVER);break;case Hl:i.depthFunc(i.ALWAYS);break;case Gl:i.depthFunc(i.LESS);break;case xr:i.depthFunc(i.LEQUAL);break;case Vl:i.depthFunc(i.EQUAL);break;case Wl:i.depthFunc(i.GEQUAL);break;case Xl:i.depthFunc(i.GREATER);break;case ql:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Ft=ut}},setLocked:function(ut){$=ut},setClear:function(ut){xt!==ut&&(_t&&(ut=1-ut),i.clearDepth(ut),xt=ut)},reset:function(){$=!1,Tt=null,Ft=null,xt=null,_t=!1}}}function s(){let $=!1,_t=null,Tt=null,Ft=null,xt=null,ut=null,Bt=null,de=null,Oe=null;return{setTest:function(ve){$||(ve?rt(i.STENCIL_TEST):yt(i.STENCIL_TEST))},setMask:function(ve){_t!==ve&&!$&&(i.stencilMask(ve),_t=ve)},setFunc:function(ve,Tn,Un){(Tt!==ve||Ft!==Tn||xt!==Un)&&(i.stencilFunc(ve,Tn,Un),Tt=ve,Ft=Tn,xt=Un)},setOp:function(ve,Tn,Un){(ut!==ve||Bt!==Tn||de!==Un)&&(i.stencilOp(ve,Tn,Un),ut=ve,Bt=Tn,de=Un)},setLocked:function(ve){$=ve},setClear:function(ve){Oe!==ve&&(i.clearStencil(ve),Oe=ve)},reset:function(){$=!1,_t=null,Tt=null,Ft=null,xt=null,ut=null,Bt=null,de=null,Oe=null}}}const r=new e,o=new n,a=new s,l=new WeakMap,c=new WeakMap;let h={},u={},d=new WeakMap,f=[],m=null,x=!1,g=null,p=null,v=null,y=null,_=null,T=null,A=null,E=new ee(0,0,0),C=0,S=!1,b=null,U=null,P=null,G=null,j=null;const H=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let q=!1,B=0;const O=i.getParameter(i.VERSION);O.indexOf("WebGL")!==-1?(B=parseFloat(/^WebGL (\d)/.exec(O)[1]),q=B>=1):O.indexOf("OpenGL ES")!==-1&&(B=parseFloat(/^OpenGL ES (\d)/.exec(O)[1]),q=B>=2);let Q=null,W={};const ft=i.getParameter(i.SCISSOR_BOX),Vt=i.getParameter(i.VIEWPORT),Me=new ze().fromArray(ft),ce=new ze().fromArray(Vt);function ht($,_t,Tt,Ft){const xt=new Uint8Array(4),ut=i.createTexture();i.bindTexture($,ut),i.texParameteri($,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri($,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Bt=0;Bt<Tt;Bt++)$===i.TEXTURE_3D||$===i.TEXTURE_2D_ARRAY?i.texImage3D(_t,0,i.RGBA,1,1,Ft,0,i.RGBA,i.UNSIGNED_BYTE,xt):i.texImage2D(_t+Bt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,xt);return ut}const Y={};Y[i.TEXTURE_2D]=ht(i.TEXTURE_2D,i.TEXTURE_2D,1),Y[i.TEXTURE_CUBE_MAP]=ht(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Y[i.TEXTURE_2D_ARRAY]=ht(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Y[i.TEXTURE_3D]=ht(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),rt(i.DEPTH_TEST),o.setFunc(xr),qt(!1),Lt(Mh),rt(i.CULL_FACE),ne(ts);function rt($){h[$]!==!0&&(i.enable($),h[$]=!0)}function yt($){h[$]!==!1&&(i.disable($),h[$]=!1)}function Xt($,_t){return u[$]!==_t?(i.bindFramebuffer($,_t),u[$]=_t,$===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=_t),$===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=_t),!0):!1}function kt($,_t){let Tt=f,Ft=!1;if($){Tt=d.get(_t),Tt===void 0&&(Tt=[],d.set(_t,Tt));const xt=$.textures;if(Tt.length!==xt.length||Tt[0]!==i.COLOR_ATTACHMENT0){for(let ut=0,Bt=xt.length;ut<Bt;ut++)Tt[ut]=i.COLOR_ATTACHMENT0+ut;Tt.length=xt.length,Ft=!0}}else Tt[0]!==i.BACK&&(Tt[0]=i.BACK,Ft=!0);Ft&&i.drawBuffers(Tt)}function fe($){return m!==$?(i.useProgram($),m=$,!0):!1}const Ee={[_s]:i.FUNC_ADD,[bf]:i.FUNC_SUBTRACT,[Sf]:i.FUNC_REVERSE_SUBTRACT};Ee[wf]=i.MIN,Ee[Ef]=i.MAX;const I={[Tf]:i.ZERO,[Af]:i.ONE,[Rf]:i.SRC_COLOR,[Fl]:i.SRC_ALPHA,[Lf]:i.SRC_ALPHA_SATURATE,[If]:i.DST_COLOR,[Pf]:i.DST_ALPHA,[Cf]:i.ONE_MINUS_SRC_COLOR,[Ol]:i.ONE_MINUS_SRC_ALPHA,[zf]:i.ONE_MINUS_DST_COLOR,[Df]:i.ONE_MINUS_DST_ALPHA,[Uf]:i.CONSTANT_COLOR,[Nf]:i.ONE_MINUS_CONSTANT_COLOR,[kf]:i.CONSTANT_ALPHA,[Ff]:i.ONE_MINUS_CONSTANT_ALPHA};function ne($,_t,Tt,Ft,xt,ut,Bt,de,Oe,ve){if($===ts){x===!0&&(yt(i.BLEND),x=!1);return}if(x===!1&&(rt(i.BLEND),x=!0),$!==Mf){if($!==g||ve!==S){if((p!==_s||_!==_s)&&(i.blendEquation(i.FUNC_ADD),p=_s,_=_s),ve)switch($){case dr:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case bh:i.blendFunc(i.ONE,i.ONE);break;case Sh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case wh:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",$);break}else switch($){case dr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case bh:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Sh:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case wh:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",$);break}v=null,y=null,T=null,A=null,E.set(0,0,0),C=0,g=$,S=ve}return}xt=xt||_t,ut=ut||Tt,Bt=Bt||Ft,(_t!==p||xt!==_)&&(i.blendEquationSeparate(Ee[_t],Ee[xt]),p=_t,_=xt),(Tt!==v||Ft!==y||ut!==T||Bt!==A)&&(i.blendFuncSeparate(I[Tt],I[Ft],I[ut],I[Bt]),v=Tt,y=Ft,T=ut,A=Bt),(de.equals(E)===!1||Oe!==C)&&(i.blendColor(de.r,de.g,de.b,Oe),E.copy(de),C=Oe),g=$,S=!1}function Yt($,_t){$.side===Pe?yt(i.CULL_FACE):rt(i.CULL_FACE);let Tt=$.side===Pn;_t&&(Tt=!Tt),qt(Tt),$.blending===dr&&$.transparent===!1?ne(ts):ne($.blending,$.blendEquation,$.blendSrc,$.blendDst,$.blendEquationAlpha,$.blendSrcAlpha,$.blendDstAlpha,$.blendColor,$.blendAlpha,$.premultipliedAlpha),o.setFunc($.depthFunc),o.setTest($.depthTest),o.setMask($.depthWrite),r.setMask($.colorWrite);const Ft=$.stencilWrite;a.setTest(Ft),Ft&&(a.setMask($.stencilWriteMask),a.setFunc($.stencilFunc,$.stencilRef,$.stencilFuncMask),a.setOp($.stencilFail,$.stencilZFail,$.stencilZPass)),mt($.polygonOffset,$.polygonOffsetFactor,$.polygonOffsetUnits),$.alphaToCoverage===!0?rt(i.SAMPLE_ALPHA_TO_COVERAGE):yt(i.SAMPLE_ALPHA_TO_COVERAGE)}function qt($){b!==$&&($?i.frontFace(i.CW):i.frontFace(i.CCW),b=$)}function Lt($){$!==vf?(rt(i.CULL_FACE),$!==U&&($===Mh?i.cullFace(i.BACK):$===_f?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):yt(i.CULL_FACE),U=$}function se($){$!==P&&(q&&i.lineWidth($),P=$)}function mt($,_t,Tt){$?(rt(i.POLYGON_OFFSET_FILL),(G!==_t||j!==Tt)&&(i.polygonOffset(_t,Tt),G=_t,j=Tt)):yt(i.POLYGON_OFFSET_FILL)}function bt($){$?rt(i.SCISSOR_TEST):yt(i.SCISSOR_TEST)}function le($){$===void 0&&($=i.TEXTURE0+H-1),Q!==$&&(i.activeTexture($),Q=$)}function De($,_t,Tt){Tt===void 0&&(Q===null?Tt=i.TEXTURE0+H-1:Tt=Q);let Ft=W[Tt];Ft===void 0&&(Ft={type:void 0,texture:void 0},W[Tt]=Ft),(Ft.type!==$||Ft.texture!==_t)&&(Q!==Tt&&(i.activeTexture(Tt),Q=Tt),i.bindTexture($,_t||Y[$]),Ft.type=$,Ft.texture=_t)}function D(){const $=W[Q];$!==void 0&&$.type!==void 0&&(i.bindTexture($.type,null),$.type=void 0,$.texture=void 0)}function w(){try{i.compressedTexImage2D(...arguments)}catch($){console.error("THREE.WebGLState:",$)}}function tt(){try{i.compressedTexImage3D(...arguments)}catch($){console.error("THREE.WebGLState:",$)}}function at(){try{i.texSubImage2D(...arguments)}catch($){console.error("THREE.WebGLState:",$)}}function lt(){try{i.texSubImage3D(...arguments)}catch($){console.error("THREE.WebGLState:",$)}}function ot(){try{i.compressedTexSubImage2D(...arguments)}catch($){console.error("THREE.WebGLState:",$)}}function Ut(){try{i.compressedTexSubImage3D(...arguments)}catch($){console.error("THREE.WebGLState:",$)}}function ct(){try{i.texStorage2D(...arguments)}catch($){console.error("THREE.WebGLState:",$)}}function wt(){try{i.texStorage3D(...arguments)}catch($){console.error("THREE.WebGLState:",$)}}function Pt(){try{i.texImage2D(...arguments)}catch($){console.error("THREE.WebGLState:",$)}}function gt(){try{i.texImage3D(...arguments)}catch($){console.error("THREE.WebGLState:",$)}}function Rt($){Me.equals($)===!1&&(i.scissor($.x,$.y,$.z,$.w),Me.copy($))}function jt($){ce.equals($)===!1&&(i.viewport($.x,$.y,$.z,$.w),ce.copy($))}function Ot($,_t){let Tt=c.get(_t);Tt===void 0&&(Tt=new WeakMap,c.set(_t,Tt));let Ft=Tt.get($);Ft===void 0&&(Ft=i.getUniformBlockIndex(_t,$.name),Tt.set($,Ft))}function Et($,_t){const Ft=c.get(_t).get($);l.get(_t)!==Ft&&(i.uniformBlockBinding(_t,Ft,$.__bindingPointIndex),l.set(_t,Ft))}function ue(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},Q=null,W={},u={},d=new WeakMap,f=[],m=null,x=!1,g=null,p=null,v=null,y=null,_=null,T=null,A=null,E=new ee(0,0,0),C=0,S=!1,b=null,U=null,P=null,G=null,j=null,Me.set(0,0,i.canvas.width,i.canvas.height),ce.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:rt,disable:yt,bindFramebuffer:Xt,drawBuffers:kt,useProgram:fe,setBlending:ne,setMaterial:Yt,setFlipSided:qt,setCullFace:Lt,setLineWidth:se,setPolygonOffset:mt,setScissorTest:bt,activeTexture:le,bindTexture:De,unbindTexture:D,compressedTexImage2D:w,compressedTexImage3D:tt,texImage2D:Pt,texImage3D:gt,updateUBOMapping:Ot,uniformBlockBinding:Et,texStorage2D:ct,texStorage3D:wt,texSubImage2D:at,texSubImage3D:lt,compressedTexSubImage2D:ot,compressedTexSubImage3D:Ut,scissor:Rt,viewport:jt,reset:ue}}function t_(i,t,e,n,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Wt,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(D,w){return f?new OffscreenCanvas(D,w):da("canvas")}function x(D,w,tt){let at=1;const lt=De(D);if((lt.width>tt||lt.height>tt)&&(at=tt/Math.max(lt.width,lt.height)),at<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){const ot=Math.floor(at*lt.width),Ut=Math.floor(at*lt.height);u===void 0&&(u=m(ot,Ut));const ct=w?m(ot,Ut):u;return ct.width=ot,ct.height=Ut,ct.getContext("2d").drawImage(D,0,0,ot,Ut),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+lt.width+"x"+lt.height+") to ("+ot+"x"+Ut+")."),ct}else return"data"in D&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+lt.width+"x"+lt.height+")."),D;return D}function g(D){return D.generateMipmaps}function p(D){i.generateMipmap(D)}function v(D){return D.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:D.isWebGL3DRenderTarget?i.TEXTURE_3D:D.isWebGLArrayRenderTarget||D.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function y(D,w,tt,at,lt=!1){if(D!==null){if(i[D]!==void 0)return i[D];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let ot=w;if(w===i.RED&&(tt===i.FLOAT&&(ot=i.R32F),tt===i.HALF_FLOAT&&(ot=i.R16F),tt===i.UNSIGNED_BYTE&&(ot=i.R8)),w===i.RED_INTEGER&&(tt===i.UNSIGNED_BYTE&&(ot=i.R8UI),tt===i.UNSIGNED_SHORT&&(ot=i.R16UI),tt===i.UNSIGNED_INT&&(ot=i.R32UI),tt===i.BYTE&&(ot=i.R8I),tt===i.SHORT&&(ot=i.R16I),tt===i.INT&&(ot=i.R32I)),w===i.RG&&(tt===i.FLOAT&&(ot=i.RG32F),tt===i.HALF_FLOAT&&(ot=i.RG16F),tt===i.UNSIGNED_BYTE&&(ot=i.RG8)),w===i.RG_INTEGER&&(tt===i.UNSIGNED_BYTE&&(ot=i.RG8UI),tt===i.UNSIGNED_SHORT&&(ot=i.RG16UI),tt===i.UNSIGNED_INT&&(ot=i.RG32UI),tt===i.BYTE&&(ot=i.RG8I),tt===i.SHORT&&(ot=i.RG16I),tt===i.INT&&(ot=i.RG32I)),w===i.RGB_INTEGER&&(tt===i.UNSIGNED_BYTE&&(ot=i.RGB8UI),tt===i.UNSIGNED_SHORT&&(ot=i.RGB16UI),tt===i.UNSIGNED_INT&&(ot=i.RGB32UI),tt===i.BYTE&&(ot=i.RGB8I),tt===i.SHORT&&(ot=i.RGB16I),tt===i.INT&&(ot=i.RGB32I)),w===i.RGBA_INTEGER&&(tt===i.UNSIGNED_BYTE&&(ot=i.RGBA8UI),tt===i.UNSIGNED_SHORT&&(ot=i.RGBA16UI),tt===i.UNSIGNED_INT&&(ot=i.RGBA32UI),tt===i.BYTE&&(ot=i.RGBA8I),tt===i.SHORT&&(ot=i.RGBA16I),tt===i.INT&&(ot=i.RGBA32I)),w===i.RGB&&(tt===i.UNSIGNED_INT_5_9_9_9_REV&&(ot=i.RGB9_E5),tt===i.UNSIGNED_INT_10F_11F_11F_REV&&(ot=i.R11F_G11F_B10F)),w===i.RGBA){const Ut=lt?ha:Ue.getTransfer(at);tt===i.FLOAT&&(ot=i.RGBA32F),tt===i.HALF_FLOAT&&(ot=i.RGBA16F),tt===i.UNSIGNED_BYTE&&(ot=Ut===Ge?i.SRGB8_ALPHA8:i.RGBA8),tt===i.UNSIGNED_SHORT_4_4_4_4&&(ot=i.RGBA4),tt===i.UNSIGNED_SHORT_5_5_5_1&&(ot=i.RGB5_A1)}return(ot===i.R16F||ot===i.R32F||ot===i.RG16F||ot===i.RG32F||ot===i.RGBA16F||ot===i.RGBA32F)&&t.get("EXT_color_buffer_float"),ot}function _(D,w){let tt;return D?w===null||w===Ss||w===no?tt=i.DEPTH24_STENCIL8:w===si?tt=i.DEPTH32F_STENCIL8:w===eo&&(tt=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===Ss||w===no?tt=i.DEPTH_COMPONENT24:w===si?tt=i.DEPTH_COMPONENT32F:w===eo&&(tt=i.DEPTH_COMPONENT16),tt}function T(D,w){return g(D)===!0||D.isFramebufferTexture&&D.minFilter!==Bn&&D.minFilter!==ii?Math.log2(Math.max(w.width,w.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?w.mipmaps.length:1}function A(D){const w=D.target;w.removeEventListener("dispose",A),C(w),w.isVideoTexture&&h.delete(w)}function E(D){const w=D.target;w.removeEventListener("dispose",E),b(w)}function C(D){const w=n.get(D);if(w.__webglInit===void 0)return;const tt=D.source,at=d.get(tt);if(at){const lt=at[w.__cacheKey];lt.usedTimes--,lt.usedTimes===0&&S(D),Object.keys(at).length===0&&d.delete(tt)}n.remove(D)}function S(D){const w=n.get(D);i.deleteTexture(w.__webglTexture);const tt=D.source,at=d.get(tt);delete at[w.__cacheKey],o.memory.textures--}function b(D){const w=n.get(D);if(D.depthTexture&&(D.depthTexture.dispose(),n.remove(D.depthTexture)),D.isWebGLCubeRenderTarget)for(let at=0;at<6;at++){if(Array.isArray(w.__webglFramebuffer[at]))for(let lt=0;lt<w.__webglFramebuffer[at].length;lt++)i.deleteFramebuffer(w.__webglFramebuffer[at][lt]);else i.deleteFramebuffer(w.__webglFramebuffer[at]);w.__webglDepthbuffer&&i.deleteRenderbuffer(w.__webglDepthbuffer[at])}else{if(Array.isArray(w.__webglFramebuffer))for(let at=0;at<w.__webglFramebuffer.length;at++)i.deleteFramebuffer(w.__webglFramebuffer[at]);else i.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&i.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&i.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let at=0;at<w.__webglColorRenderbuffer.length;at++)w.__webglColorRenderbuffer[at]&&i.deleteRenderbuffer(w.__webglColorRenderbuffer[at]);w.__webglDepthRenderbuffer&&i.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const tt=D.textures;for(let at=0,lt=tt.length;at<lt;at++){const ot=n.get(tt[at]);ot.__webglTexture&&(i.deleteTexture(ot.__webglTexture),o.memory.textures--),n.remove(tt[at])}n.remove(D)}let U=0;function P(){U=0}function G(){const D=U;return D>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+D+" texture units while this GPU supports only "+s.maxTextures),U+=1,D}function j(D){const w=[];return w.push(D.wrapS),w.push(D.wrapT),w.push(D.wrapR||0),w.push(D.magFilter),w.push(D.minFilter),w.push(D.anisotropy),w.push(D.internalFormat),w.push(D.format),w.push(D.type),w.push(D.generateMipmaps),w.push(D.premultiplyAlpha),w.push(D.flipY),w.push(D.unpackAlignment),w.push(D.colorSpace),w.join()}function H(D,w){const tt=n.get(D);if(D.isVideoTexture&&bt(D),D.isRenderTargetTexture===!1&&D.isExternalTexture!==!0&&D.version>0&&tt.__version!==D.version){const at=D.image;if(at===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(at.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(tt,D,w);return}}else D.isExternalTexture&&(tt.__webglTexture=D.sourceTexture?D.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,tt.__webglTexture,i.TEXTURE0+w)}function q(D,w){const tt=n.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&tt.__version!==D.version){Y(tt,D,w);return}e.bindTexture(i.TEXTURE_2D_ARRAY,tt.__webglTexture,i.TEXTURE0+w)}function B(D,w){const tt=n.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&tt.__version!==D.version){Y(tt,D,w);return}e.bindTexture(i.TEXTURE_3D,tt.__webglTexture,i.TEXTURE0+w)}function O(D,w){const tt=n.get(D);if(D.version>0&&tt.__version!==D.version){rt(tt,D,w);return}e.bindTexture(i.TEXTURE_CUBE_MAP,tt.__webglTexture,i.TEXTURE0+w)}const Q={[yr]:i.REPEAT,[Ki]:i.CLAMP_TO_EDGE,[Zl]:i.MIRRORED_REPEAT},W={[Bn]:i.NEAREST,[Yf]:i.NEAREST_MIPMAP_NEAREST,[vo]:i.NEAREST_MIPMAP_LINEAR,[ii]:i.LINEAR,[Fa]:i.LINEAR_MIPMAP_NEAREST,[Ji]:i.LINEAR_MIPMAP_LINEAR},ft={[Jf]:i.NEVER,[sp]:i.ALWAYS,[Qf]:i.LESS,[dd]:i.LEQUAL,[tp]:i.EQUAL,[ip]:i.GEQUAL,[ep]:i.GREATER,[np]:i.NOTEQUAL};function Vt(D,w){if(w.type===si&&t.has("OES_texture_float_linear")===!1&&(w.magFilter===ii||w.magFilter===Fa||w.magFilter===vo||w.magFilter===Ji||w.minFilter===ii||w.minFilter===Fa||w.minFilter===vo||w.minFilter===Ji)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(D,i.TEXTURE_WRAP_S,Q[w.wrapS]),i.texParameteri(D,i.TEXTURE_WRAP_T,Q[w.wrapT]),(D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY)&&i.texParameteri(D,i.TEXTURE_WRAP_R,Q[w.wrapR]),i.texParameteri(D,i.TEXTURE_MAG_FILTER,W[w.magFilter]),i.texParameteri(D,i.TEXTURE_MIN_FILTER,W[w.minFilter]),w.compareFunction&&(i.texParameteri(D,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(D,i.TEXTURE_COMPARE_FUNC,ft[w.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===Bn||w.minFilter!==vo&&w.minFilter!==Ji||w.type===si&&t.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){const tt=t.get("EXT_texture_filter_anisotropic");i.texParameterf(D,tt.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,s.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function Me(D,w){let tt=!1;D.__webglInit===void 0&&(D.__webglInit=!0,w.addEventListener("dispose",A));const at=w.source;let lt=d.get(at);lt===void 0&&(lt={},d.set(at,lt));const ot=j(w);if(ot!==D.__cacheKey){lt[ot]===void 0&&(lt[ot]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,tt=!0),lt[ot].usedTimes++;const Ut=lt[D.__cacheKey];Ut!==void 0&&(lt[D.__cacheKey].usedTimes--,Ut.usedTimes===0&&S(w)),D.__cacheKey=ot,D.__webglTexture=lt[ot].texture}return tt}function ce(D,w,tt){return Math.floor(Math.floor(D/tt)/w)}function ht(D,w,tt,at){const ot=D.updateRanges;if(ot.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,w.width,w.height,tt,at,w.data);else{ot.sort((gt,Rt)=>gt.start-Rt.start);let Ut=0;for(let gt=1;gt<ot.length;gt++){const Rt=ot[Ut],jt=ot[gt],Ot=Rt.start+Rt.count,Et=ce(jt.start,w.width,4),ue=ce(Rt.start,w.width,4);jt.start<=Ot+1&&Et===ue&&ce(jt.start+jt.count-1,w.width,4)===Et?Rt.count=Math.max(Rt.count,jt.start+jt.count-Rt.start):(++Ut,ot[Ut]=jt)}ot.length=Ut+1;const ct=i.getParameter(i.UNPACK_ROW_LENGTH),wt=i.getParameter(i.UNPACK_SKIP_PIXELS),Pt=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,w.width);for(let gt=0,Rt=ot.length;gt<Rt;gt++){const jt=ot[gt],Ot=Math.floor(jt.start/4),Et=Math.ceil(jt.count/4),ue=Ot%w.width,$=Math.floor(Ot/w.width),_t=Et,Tt=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,ue),i.pixelStorei(i.UNPACK_SKIP_ROWS,$),e.texSubImage2D(i.TEXTURE_2D,0,ue,$,_t,Tt,tt,at,w.data)}D.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,ct),i.pixelStorei(i.UNPACK_SKIP_PIXELS,wt),i.pixelStorei(i.UNPACK_SKIP_ROWS,Pt)}}function Y(D,w,tt){let at=i.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(at=i.TEXTURE_2D_ARRAY),w.isData3DTexture&&(at=i.TEXTURE_3D);const lt=Me(D,w),ot=w.source;e.bindTexture(at,D.__webglTexture,i.TEXTURE0+tt);const Ut=n.get(ot);if(ot.version!==Ut.__version||lt===!0){e.activeTexture(i.TEXTURE0+tt);const ct=Ue.getPrimaries(Ue.workingColorSpace),wt=w.colorSpace===Ti?null:Ue.getPrimaries(w.colorSpace),Pt=w.colorSpace===Ti||ct===wt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,w.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,w.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pt);let gt=x(w.image,!1,s.maxTextureSize);gt=le(w,gt);const Rt=r.convert(w.format,w.colorSpace),jt=r.convert(w.type);let Ot=y(w.internalFormat,Rt,jt,w.colorSpace,w.isVideoTexture);Vt(at,w);let Et;const ue=w.mipmaps,$=w.isVideoTexture!==!0,_t=Ut.__version===void 0||lt===!0,Tt=ot.dataReady,Ft=T(w,gt);if(w.isDepthTexture)Ot=_(w.format===so,w.type),_t&&($?e.texStorage2D(i.TEXTURE_2D,1,Ot,gt.width,gt.height):e.texImage2D(i.TEXTURE_2D,0,Ot,gt.width,gt.height,0,Rt,jt,null));else if(w.isDataTexture)if(ue.length>0){$&&_t&&e.texStorage2D(i.TEXTURE_2D,Ft,Ot,ue[0].width,ue[0].height);for(let xt=0,ut=ue.length;xt<ut;xt++)Et=ue[xt],$?Tt&&e.texSubImage2D(i.TEXTURE_2D,xt,0,0,Et.width,Et.height,Rt,jt,Et.data):e.texImage2D(i.TEXTURE_2D,xt,Ot,Et.width,Et.height,0,Rt,jt,Et.data);w.generateMipmaps=!1}else $?(_t&&e.texStorage2D(i.TEXTURE_2D,Ft,Ot,gt.width,gt.height),Tt&&ht(w,gt,Rt,jt)):e.texImage2D(i.TEXTURE_2D,0,Ot,gt.width,gt.height,0,Rt,jt,gt.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){$&&_t&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Ft,Ot,ue[0].width,ue[0].height,gt.depth);for(let xt=0,ut=ue.length;xt<ut;xt++)if(Et=ue[xt],w.format!==On)if(Rt!==null)if($){if(Tt)if(w.layerUpdates.size>0){const Bt=fu(Et.width,Et.height,w.format,w.type);for(const de of w.layerUpdates){const Oe=Et.data.subarray(de*Bt/Et.data.BYTES_PER_ELEMENT,(de+1)*Bt/Et.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,xt,0,0,de,Et.width,Et.height,1,Rt,Oe)}w.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,xt,0,0,0,Et.width,Et.height,gt.depth,Rt,Et.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,xt,Ot,Et.width,Et.height,gt.depth,0,Et.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else $?Tt&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,xt,0,0,0,Et.width,Et.height,gt.depth,Rt,jt,Et.data):e.texImage3D(i.TEXTURE_2D_ARRAY,xt,Ot,Et.width,Et.height,gt.depth,0,Rt,jt,Et.data)}else{$&&_t&&e.texStorage2D(i.TEXTURE_2D,Ft,Ot,ue[0].width,ue[0].height);for(let xt=0,ut=ue.length;xt<ut;xt++)Et=ue[xt],w.format!==On?Rt!==null?$?Tt&&e.compressedTexSubImage2D(i.TEXTURE_2D,xt,0,0,Et.width,Et.height,Rt,Et.data):e.compressedTexImage2D(i.TEXTURE_2D,xt,Ot,Et.width,Et.height,0,Et.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):$?Tt&&e.texSubImage2D(i.TEXTURE_2D,xt,0,0,Et.width,Et.height,Rt,jt,Et.data):e.texImage2D(i.TEXTURE_2D,xt,Ot,Et.width,Et.height,0,Rt,jt,Et.data)}else if(w.isDataArrayTexture)if($){if(_t&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Ft,Ot,gt.width,gt.height,gt.depth),Tt)if(w.layerUpdates.size>0){const xt=fu(gt.width,gt.height,w.format,w.type);for(const ut of w.layerUpdates){const Bt=gt.data.subarray(ut*xt/gt.data.BYTES_PER_ELEMENT,(ut+1)*xt/gt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ut,gt.width,gt.height,1,Rt,jt,Bt)}w.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,gt.width,gt.height,gt.depth,Rt,jt,gt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Ot,gt.width,gt.height,gt.depth,0,Rt,jt,gt.data);else if(w.isData3DTexture)$?(_t&&e.texStorage3D(i.TEXTURE_3D,Ft,Ot,gt.width,gt.height,gt.depth),Tt&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,gt.width,gt.height,gt.depth,Rt,jt,gt.data)):e.texImage3D(i.TEXTURE_3D,0,Ot,gt.width,gt.height,gt.depth,0,Rt,jt,gt.data);else if(w.isFramebufferTexture){if(_t)if($)e.texStorage2D(i.TEXTURE_2D,Ft,Ot,gt.width,gt.height);else{let xt=gt.width,ut=gt.height;for(let Bt=0;Bt<Ft;Bt++)e.texImage2D(i.TEXTURE_2D,Bt,Ot,xt,ut,0,Rt,jt,null),xt>>=1,ut>>=1}}else if(ue.length>0){if($&&_t){const xt=De(ue[0]);e.texStorage2D(i.TEXTURE_2D,Ft,Ot,xt.width,xt.height)}for(let xt=0,ut=ue.length;xt<ut;xt++)Et=ue[xt],$?Tt&&e.texSubImage2D(i.TEXTURE_2D,xt,0,0,Rt,jt,Et):e.texImage2D(i.TEXTURE_2D,xt,Ot,Rt,jt,Et);w.generateMipmaps=!1}else if($){if(_t){const xt=De(gt);e.texStorage2D(i.TEXTURE_2D,Ft,Ot,xt.width,xt.height)}Tt&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,Rt,jt,gt)}else e.texImage2D(i.TEXTURE_2D,0,Ot,Rt,jt,gt);g(w)&&p(at),Ut.__version=ot.version,w.onUpdate&&w.onUpdate(w)}D.__version=w.version}function rt(D,w,tt){if(w.image.length!==6)return;const at=Me(D,w),lt=w.source;e.bindTexture(i.TEXTURE_CUBE_MAP,D.__webglTexture,i.TEXTURE0+tt);const ot=n.get(lt);if(lt.version!==ot.__version||at===!0){e.activeTexture(i.TEXTURE0+tt);const Ut=Ue.getPrimaries(Ue.workingColorSpace),ct=w.colorSpace===Ti?null:Ue.getPrimaries(w.colorSpace),wt=w.colorSpace===Ti||Ut===ct?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,w.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,w.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,wt);const Pt=w.isCompressedTexture||w.image[0].isCompressedTexture,gt=w.image[0]&&w.image[0].isDataTexture,Rt=[];for(let ut=0;ut<6;ut++)!Pt&&!gt?Rt[ut]=x(w.image[ut],!0,s.maxCubemapSize):Rt[ut]=gt?w.image[ut].image:w.image[ut],Rt[ut]=le(w,Rt[ut]);const jt=Rt[0],Ot=r.convert(w.format,w.colorSpace),Et=r.convert(w.type),ue=y(w.internalFormat,Ot,Et,w.colorSpace),$=w.isVideoTexture!==!0,_t=ot.__version===void 0||at===!0,Tt=lt.dataReady;let Ft=T(w,jt);Vt(i.TEXTURE_CUBE_MAP,w);let xt;if(Pt){$&&_t&&e.texStorage2D(i.TEXTURE_CUBE_MAP,Ft,ue,jt.width,jt.height);for(let ut=0;ut<6;ut++){xt=Rt[ut].mipmaps;for(let Bt=0;Bt<xt.length;Bt++){const de=xt[Bt];w.format!==On?Ot!==null?$?Tt&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Bt,0,0,de.width,de.height,Ot,de.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Bt,ue,de.width,de.height,0,de.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):$?Tt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Bt,0,0,de.width,de.height,Ot,Et,de.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Bt,ue,de.width,de.height,0,Ot,Et,de.data)}}}else{if(xt=w.mipmaps,$&&_t){xt.length>0&&Ft++;const ut=De(Rt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,Ft,ue,ut.width,ut.height)}for(let ut=0;ut<6;ut++)if(gt){$?Tt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0,0,0,Rt[ut].width,Rt[ut].height,Ot,Et,Rt[ut].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0,ue,Rt[ut].width,Rt[ut].height,0,Ot,Et,Rt[ut].data);for(let Bt=0;Bt<xt.length;Bt++){const Oe=xt[Bt].image[ut].image;$?Tt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Bt+1,0,0,Oe.width,Oe.height,Ot,Et,Oe.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Bt+1,ue,Oe.width,Oe.height,0,Ot,Et,Oe.data)}}else{$?Tt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0,0,0,Ot,Et,Rt[ut]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0,ue,Ot,Et,Rt[ut]);for(let Bt=0;Bt<xt.length;Bt++){const de=xt[Bt];$?Tt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Bt+1,0,0,Ot,Et,de.image[ut]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Bt+1,ue,Ot,Et,de.image[ut])}}}g(w)&&p(i.TEXTURE_CUBE_MAP),ot.__version=lt.version,w.onUpdate&&w.onUpdate(w)}D.__version=w.version}function yt(D,w,tt,at,lt,ot){const Ut=r.convert(tt.format,tt.colorSpace),ct=r.convert(tt.type),wt=y(tt.internalFormat,Ut,ct,tt.colorSpace),Pt=n.get(w),gt=n.get(tt);if(gt.__renderTarget=w,!Pt.__hasExternalTextures){const Rt=Math.max(1,w.width>>ot),jt=Math.max(1,w.height>>ot);lt===i.TEXTURE_3D||lt===i.TEXTURE_2D_ARRAY?e.texImage3D(lt,ot,wt,Rt,jt,w.depth,0,Ut,ct,null):e.texImage2D(lt,ot,wt,Rt,jt,0,Ut,ct,null)}e.bindFramebuffer(i.FRAMEBUFFER,D),mt(w)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,at,lt,gt.__webglTexture,0,se(w)):(lt===i.TEXTURE_2D||lt>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&lt<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,at,lt,gt.__webglTexture,ot),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Xt(D,w,tt){if(i.bindRenderbuffer(i.RENDERBUFFER,D),w.depthBuffer){const at=w.depthTexture,lt=at&&at.isDepthTexture?at.type:null,ot=_(w.stencilBuffer,lt),Ut=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ct=se(w);mt(w)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ct,ot,w.width,w.height):tt?i.renderbufferStorageMultisample(i.RENDERBUFFER,ct,ot,w.width,w.height):i.renderbufferStorage(i.RENDERBUFFER,ot,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Ut,i.RENDERBUFFER,D)}else{const at=w.textures;for(let lt=0;lt<at.length;lt++){const ot=at[lt],Ut=r.convert(ot.format,ot.colorSpace),ct=r.convert(ot.type),wt=y(ot.internalFormat,Ut,ct,ot.colorSpace),Pt=se(w);tt&&mt(w)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Pt,wt,w.width,w.height):mt(w)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Pt,wt,w.width,w.height):i.renderbufferStorage(i.RENDERBUFFER,wt,w.width,w.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function kt(D,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,D),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const at=n.get(w.depthTexture);at.__renderTarget=w,(!at.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),H(w.depthTexture,0);const lt=at.__webglTexture,ot=se(w);if(w.depthTexture.format===io)mt(w)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,lt,0,ot):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,lt,0);else if(w.depthTexture.format===so)mt(w)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,lt,0,ot):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,lt,0);else throw new Error("Unknown depthTexture format")}function fe(D){const w=n.get(D),tt=D.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==D.depthTexture){const at=D.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),at){const lt=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,at.removeEventListener("dispose",lt)};at.addEventListener("dispose",lt),w.__depthDisposeCallback=lt}w.__boundDepthTexture=at}if(D.depthTexture&&!w.__autoAllocateDepthBuffer){if(tt)throw new Error("target.depthTexture not supported in Cube render targets");const at=D.texture.mipmaps;at&&at.length>0?kt(w.__webglFramebuffer[0],D):kt(w.__webglFramebuffer,D)}else if(tt){w.__webglDepthbuffer=[];for(let at=0;at<6;at++)if(e.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer[at]),w.__webglDepthbuffer[at]===void 0)w.__webglDepthbuffer[at]=i.createRenderbuffer(),Xt(w.__webglDepthbuffer[at],D,!1);else{const lt=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ot=w.__webglDepthbuffer[at];i.bindRenderbuffer(i.RENDERBUFFER,ot),i.framebufferRenderbuffer(i.FRAMEBUFFER,lt,i.RENDERBUFFER,ot)}}else{const at=D.texture.mipmaps;if(at&&at.length>0?e.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=i.createRenderbuffer(),Xt(w.__webglDepthbuffer,D,!1);else{const lt=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ot=w.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ot),i.framebufferRenderbuffer(i.FRAMEBUFFER,lt,i.RENDERBUFFER,ot)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Ee(D,w,tt){const at=n.get(D);w!==void 0&&yt(at.__webglFramebuffer,D,D.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),tt!==void 0&&fe(D)}function I(D){const w=D.texture,tt=n.get(D),at=n.get(w);D.addEventListener("dispose",E);const lt=D.textures,ot=D.isWebGLCubeRenderTarget===!0,Ut=lt.length>1;if(Ut||(at.__webglTexture===void 0&&(at.__webglTexture=i.createTexture()),at.__version=w.version,o.memory.textures++),ot){tt.__webglFramebuffer=[];for(let ct=0;ct<6;ct++)if(w.mipmaps&&w.mipmaps.length>0){tt.__webglFramebuffer[ct]=[];for(let wt=0;wt<w.mipmaps.length;wt++)tt.__webglFramebuffer[ct][wt]=i.createFramebuffer()}else tt.__webglFramebuffer[ct]=i.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){tt.__webglFramebuffer=[];for(let ct=0;ct<w.mipmaps.length;ct++)tt.__webglFramebuffer[ct]=i.createFramebuffer()}else tt.__webglFramebuffer=i.createFramebuffer();if(Ut)for(let ct=0,wt=lt.length;ct<wt;ct++){const Pt=n.get(lt[ct]);Pt.__webglTexture===void 0&&(Pt.__webglTexture=i.createTexture(),o.memory.textures++)}if(D.samples>0&&mt(D)===!1){tt.__webglMultisampledFramebuffer=i.createFramebuffer(),tt.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,tt.__webglMultisampledFramebuffer);for(let ct=0;ct<lt.length;ct++){const wt=lt[ct];tt.__webglColorRenderbuffer[ct]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,tt.__webglColorRenderbuffer[ct]);const Pt=r.convert(wt.format,wt.colorSpace),gt=r.convert(wt.type),Rt=y(wt.internalFormat,Pt,gt,wt.colorSpace,D.isXRRenderTarget===!0),jt=se(D);i.renderbufferStorageMultisample(i.RENDERBUFFER,jt,Rt,D.width,D.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ct,i.RENDERBUFFER,tt.__webglColorRenderbuffer[ct])}i.bindRenderbuffer(i.RENDERBUFFER,null),D.depthBuffer&&(tt.__webglDepthRenderbuffer=i.createRenderbuffer(),Xt(tt.__webglDepthRenderbuffer,D,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ot){e.bindTexture(i.TEXTURE_CUBE_MAP,at.__webglTexture),Vt(i.TEXTURE_CUBE_MAP,w);for(let ct=0;ct<6;ct++)if(w.mipmaps&&w.mipmaps.length>0)for(let wt=0;wt<w.mipmaps.length;wt++)yt(tt.__webglFramebuffer[ct][wt],D,w,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ct,wt);else yt(tt.__webglFramebuffer[ct],D,w,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0);g(w)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Ut){for(let ct=0,wt=lt.length;ct<wt;ct++){const Pt=lt[ct],gt=n.get(Pt);let Rt=i.TEXTURE_2D;(D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(Rt=D.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(Rt,gt.__webglTexture),Vt(Rt,Pt),yt(tt.__webglFramebuffer,D,Pt,i.COLOR_ATTACHMENT0+ct,Rt,0),g(Pt)&&p(Rt)}e.unbindTexture()}else{let ct=i.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(ct=D.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ct,at.__webglTexture),Vt(ct,w),w.mipmaps&&w.mipmaps.length>0)for(let wt=0;wt<w.mipmaps.length;wt++)yt(tt.__webglFramebuffer[wt],D,w,i.COLOR_ATTACHMENT0,ct,wt);else yt(tt.__webglFramebuffer,D,w,i.COLOR_ATTACHMENT0,ct,0);g(w)&&p(ct),e.unbindTexture()}D.depthBuffer&&fe(D)}function ne(D){const w=D.textures;for(let tt=0,at=w.length;tt<at;tt++){const lt=w[tt];if(g(lt)){const ot=v(D),Ut=n.get(lt).__webglTexture;e.bindTexture(ot,Ut),p(ot),e.unbindTexture()}}}const Yt=[],qt=[];function Lt(D){if(D.samples>0){if(mt(D)===!1){const w=D.textures,tt=D.width,at=D.height;let lt=i.COLOR_BUFFER_BIT;const ot=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ut=n.get(D),ct=w.length>1;if(ct)for(let Pt=0;Pt<w.length;Pt++)e.bindFramebuffer(i.FRAMEBUFFER,Ut.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Pt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Ut.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Pt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Ut.__webglMultisampledFramebuffer);const wt=D.texture.mipmaps;wt&&wt.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ut.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ut.__webglFramebuffer);for(let Pt=0;Pt<w.length;Pt++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(lt|=i.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(lt|=i.STENCIL_BUFFER_BIT)),ct){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Ut.__webglColorRenderbuffer[Pt]);const gt=n.get(w[Pt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,gt,0)}i.blitFramebuffer(0,0,tt,at,0,0,tt,at,lt,i.NEAREST),l===!0&&(Yt.length=0,qt.length=0,Yt.push(i.COLOR_ATTACHMENT0+Pt),D.depthBuffer&&D.resolveDepthBuffer===!1&&(Yt.push(ot),qt.push(ot),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,qt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Yt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ct)for(let Pt=0;Pt<w.length;Pt++){e.bindFramebuffer(i.FRAMEBUFFER,Ut.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Pt,i.RENDERBUFFER,Ut.__webglColorRenderbuffer[Pt]);const gt=n.get(w[Pt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Ut.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Pt,i.TEXTURE_2D,gt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ut.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.resolveDepthBuffer===!1&&l){const w=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[w])}}}function se(D){return Math.min(s.maxSamples,D.samples)}function mt(D){const w=n.get(D);return D.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function bt(D){const w=o.render.frame;h.get(D)!==w&&(h.set(D,w),D.update())}function le(D,w){const tt=D.colorSpace,at=D.format,lt=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||tt!==Mr&&tt!==Ti&&(Ue.getTransfer(tt)===Ge?(at!==On||lt!==pi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",tt)),w}function De(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(c.width=D.naturalWidth||D.width,c.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(c.width=D.displayWidth,c.height=D.displayHeight):(c.width=D.width,c.height=D.height),c}this.allocateTextureUnit=G,this.resetTextureUnits=P,this.setTexture2D=H,this.setTexture2DArray=q,this.setTexture3D=B,this.setTextureCube=O,this.rebindTextures=Ee,this.setupRenderTarget=I,this.updateRenderTargetMipmap=ne,this.updateMultisampleRenderTarget=Lt,this.setupDepthRenderbuffer=fe,this.setupFrameBufferTexture=yt,this.useMultisampledRTT=mt}function e_(i,t){function e(n,s=Ti){let r;const o=Ue.getTransfer(s);if(n===pi)return i.UNSIGNED_BYTE;if(n===kc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Fc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===ad)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===ld)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===rd)return i.BYTE;if(n===od)return i.SHORT;if(n===eo)return i.UNSIGNED_SHORT;if(n===Nc)return i.INT;if(n===Ss)return i.UNSIGNED_INT;if(n===si)return i.FLOAT;if(n===ho)return i.HALF_FLOAT;if(n===cd)return i.ALPHA;if(n===hd)return i.RGB;if(n===On)return i.RGBA;if(n===io)return i.DEPTH_COMPONENT;if(n===so)return i.DEPTH_STENCIL;if(n===Oc)return i.RED;if(n===Bc)return i.RED_INTEGER;if(n===ud)return i.RG;if(n===Hc)return i.RG_INTEGER;if(n===Gc)return i.RGBA_INTEGER;if(n===ra||n===oa||n===aa||n===la)if(o===Ge)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ra)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===oa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===aa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===la)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ra)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===oa)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===aa)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===la)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===jl||n===Kl||n===Jl||n===Ql)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===jl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Kl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Jl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ql)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===tc||n===ec||n===nc)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===tc||n===ec)return o===Ge?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===nc)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===ic||n===sc||n===rc||n===oc||n===ac||n===lc||n===cc||n===hc||n===uc||n===dc||n===fc||n===pc||n===mc||n===gc)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ic)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===sc)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===rc)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===oc)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ac)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===lc)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===cc)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===hc)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===uc)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===dc)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===fc)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===pc)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===mc)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===gc)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===xc||n===vc||n===_c)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===xc)return o===Ge?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===vc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===_c)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===yc||n===Mc||n===bc||n===Sc)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===yc)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Mc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===bc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Sc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===no?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const n_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,i_=`
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

}`;class s_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new Sd(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new $n({vertexShader:n_,fragmentShader:i_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Zt(new Ci(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class r_ extends wr{constructor(t,e){super();const n=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,m=null;const x=typeof XRWebGLBinding<"u",g=new s_,p={},v=e.getContextAttributes();let y=null,_=null;const T=[],A=[],E=new Wt;let C=null;const S=new zn;S.viewport=new ze;const b=new zn;b.viewport=new ze;const U=[S,b],P=new Tm;let G=null,j=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let rt=T[Y];return rt===void 0&&(rt=new rl,T[Y]=rt),rt.getTargetRaySpace()},this.getControllerGrip=function(Y){let rt=T[Y];return rt===void 0&&(rt=new rl,T[Y]=rt),rt.getGripSpace()},this.getHand=function(Y){let rt=T[Y];return rt===void 0&&(rt=new rl,T[Y]=rt),rt.getHandSpace()};function H(Y){const rt=A.indexOf(Y.inputSource);if(rt===-1)return;const yt=T[rt];yt!==void 0&&(yt.update(Y.inputSource,Y.frame,c||o),yt.dispatchEvent({type:Y.type,data:Y.inputSource}))}function q(){s.removeEventListener("select",H),s.removeEventListener("selectstart",H),s.removeEventListener("selectend",H),s.removeEventListener("squeeze",H),s.removeEventListener("squeezestart",H),s.removeEventListener("squeezeend",H),s.removeEventListener("end",q),s.removeEventListener("inputsourceschange",B);for(let Y=0;Y<T.length;Y++){const rt=A[Y];rt!==null&&(A[Y]=null,T[Y].disconnect(rt))}G=null,j=null,g.reset();for(const Y in p)delete p[Y];t.setRenderTarget(y),f=null,d=null,u=null,s=null,_=null,ht.stop(),n.isPresenting=!1,t.setPixelRatio(C),t.setSize(E.width,E.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){a=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&x&&(u=new XRWebGLBinding(s,e)),u},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(Y){if(s=Y,s!==null){if(y=t.getRenderTarget(),s.addEventListener("select",H),s.addEventListener("selectstart",H),s.addEventListener("selectend",H),s.addEventListener("squeeze",H),s.addEventListener("squeezestart",H),s.addEventListener("squeezeend",H),s.addEventListener("end",q),s.addEventListener("inputsourceschange",B),v.xrCompatible!==!0&&await e.makeXRCompatible(),C=t.getPixelRatio(),t.getSize(E),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let yt=null,Xt=null,kt=null;v.depth&&(kt=v.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,yt=v.stencil?so:io,Xt=v.stencil?no:Ss);const fe={colorFormat:e.RGBA8,depthFormat:kt,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(fe),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),_=new is(d.textureWidth,d.textureHeight,{format:On,type:pi,depthTexture:new bd(d.textureWidth,d.textureHeight,Xt,void 0,void 0,void 0,void 0,void 0,void 0,yt),stencilBuffer:v.stencil,colorSpace:t.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const yt={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,yt),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),_=new is(f.framebufferWidth,f.framebufferHeight,{format:On,type:pi,colorSpace:t.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),ht.setContext(s),ht.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function B(Y){for(let rt=0;rt<Y.removed.length;rt++){const yt=Y.removed[rt],Xt=A.indexOf(yt);Xt>=0&&(A[Xt]=null,T[Xt].disconnect(yt))}for(let rt=0;rt<Y.added.length;rt++){const yt=Y.added[rt];let Xt=A.indexOf(yt);if(Xt===-1){for(let fe=0;fe<T.length;fe++)if(fe>=A.length){A.push(yt),Xt=fe;break}else if(A[fe]===null){A[fe]=yt,Xt=fe;break}if(Xt===-1)break}const kt=T[Xt];kt&&kt.connect(yt)}}const O=new L,Q=new L;function W(Y,rt,yt){O.setFromMatrixPosition(rt.matrixWorld),Q.setFromMatrixPosition(yt.matrixWorld);const Xt=O.distanceTo(Q),kt=rt.projectionMatrix.elements,fe=yt.projectionMatrix.elements,Ee=kt[14]/(kt[10]-1),I=kt[14]/(kt[10]+1),ne=(kt[9]+1)/kt[5],Yt=(kt[9]-1)/kt[5],qt=(kt[8]-1)/kt[0],Lt=(fe[8]+1)/fe[0],se=Ee*qt,mt=Ee*Lt,bt=Xt/(-qt+Lt),le=bt*-qt;if(rt.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(le),Y.translateZ(bt),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),kt[10]===-1)Y.projectionMatrix.copy(rt.projectionMatrix),Y.projectionMatrixInverse.copy(rt.projectionMatrixInverse);else{const De=Ee+bt,D=I+bt,w=se-le,tt=mt+(Xt-le),at=ne*I/D*De,lt=Yt*I/D*De;Y.projectionMatrix.makePerspective(w,tt,at,lt,De,D),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function ft(Y,rt){rt===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(rt.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(s===null)return;let rt=Y.near,yt=Y.far;g.texture!==null&&(g.depthNear>0&&(rt=g.depthNear),g.depthFar>0&&(yt=g.depthFar)),P.near=b.near=S.near=rt,P.far=b.far=S.far=yt,(G!==P.near||j!==P.far)&&(s.updateRenderState({depthNear:P.near,depthFar:P.far}),G=P.near,j=P.far),P.layers.mask=Y.layers.mask|6,S.layers.mask=P.layers.mask&3,b.layers.mask=P.layers.mask&5;const Xt=Y.parent,kt=P.cameras;ft(P,Xt);for(let fe=0;fe<kt.length;fe++)ft(kt[fe],Xt);kt.length===2?W(P,S,b):P.projectionMatrix.copy(S.projectionMatrix),Vt(Y,P,Xt)};function Vt(Y,rt,yt){yt===null?Y.matrix.copy(rt.matrixWorld):(Y.matrix.copy(yt.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(rt.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(rt.projectionMatrix),Y.projectionMatrixInverse.copy(rt.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=ro*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return P},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(Y){l=Y,d!==null&&(d.fixedFoveation=Y),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Y)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(P)},this.getCameraTexture=function(Y){return p[Y]};let Me=null;function ce(Y,rt){if(h=rt.getViewerPose(c||o),m=rt,h!==null){const yt=h.views;f!==null&&(t.setRenderTargetFramebuffer(_,f.framebuffer),t.setRenderTarget(_));let Xt=!1;yt.length!==P.cameras.length&&(P.cameras.length=0,Xt=!0);for(let I=0;I<yt.length;I++){const ne=yt[I];let Yt=null;if(f!==null)Yt=f.getViewport(ne);else{const Lt=u.getViewSubImage(d,ne);Yt=Lt.viewport,I===0&&(t.setRenderTargetTextures(_,Lt.colorTexture,Lt.depthStencilTexture),t.setRenderTarget(_))}let qt=U[I];qt===void 0&&(qt=new zn,qt.layers.enable(I),qt.viewport=new ze,U[I]=qt),qt.matrix.fromArray(ne.transform.matrix),qt.matrix.decompose(qt.position,qt.quaternion,qt.scale),qt.projectionMatrix.fromArray(ne.projectionMatrix),qt.projectionMatrixInverse.copy(qt.projectionMatrix).invert(),qt.viewport.set(Yt.x,Yt.y,Yt.width,Yt.height),I===0&&(P.matrix.copy(qt.matrix),P.matrix.decompose(P.position,P.quaternion,P.scale)),Xt===!0&&P.cameras.push(qt)}const kt=s.enabledFeatures;if(kt&&kt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){u=n.getBinding();const I=u.getDepthInformation(yt[0]);I&&I.isValid&&I.texture&&g.init(I,s.renderState)}if(kt&&kt.includes("camera-access")&&x){t.state.unbindTexture(),u=n.getBinding();for(let I=0;I<yt.length;I++){const ne=yt[I].camera;if(ne){let Yt=p[ne];Yt||(Yt=new Sd,p[ne]=Yt);const qt=u.getCameraImage(ne);Yt.sourceTexture=qt}}}}for(let yt=0;yt<T.length;yt++){const Xt=A[yt],kt=T[yt];Xt!==null&&kt!==void 0&&kt.update(Xt,rt,c||o)}Me&&Me(Y,rt),rt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:rt}),m=null}const ht=new Pd;ht.setAnimationLoop(ce),this.setAnimationLoop=function(Y){Me=Y},this.dispose=function(){}}}const ms=new mi,o_=new he;function a_(i,t){function e(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,xd(i)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,v,y,_){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(g,p):p.isMeshToonMaterial?(r(g,p),u(g,p)):p.isMeshPhongMaterial?(r(g,p),h(g,p)):p.isMeshStandardMaterial?(r(g,p),d(g,p),p.isMeshPhysicalMaterial&&f(g,p,_)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),x(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(o(g,p),p.isLineDashedMaterial&&a(g,p)):p.isPointsMaterial?l(g,p,v,y):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,e(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Pn&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,e(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Pn&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,e(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,e(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const v=t.get(p),y=v.envMap,_=v.envMapRotation;y&&(g.envMap.value=y,ms.copy(_),ms.x*=-1,ms.y*=-1,ms.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(ms.y*=-1,ms.z*=-1),g.envMapRotation.value.setFromMatrix4(o_.makeRotationFromEuler(ms)),g.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,g.aoMapTransform))}function o(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform))}function a(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,v,y){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*v,g.scale.value=y*.5,p.map&&(g.map.value=p.map,e(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function u(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function d(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,v){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Pn&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=v.texture,g.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function x(g,p){const v=t.get(p).light;g.referencePosition.value.setFromMatrixPosition(v.matrixWorld),g.nearDistance.value=v.shadow.camera.near,g.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function l_(i,t,e,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,y){const _=y.program;n.uniformBlockBinding(v,_)}function c(v,y){let _=s[v.id];_===void 0&&(m(v),_=h(v),s[v.id]=_,v.addEventListener("dispose",g));const T=y.program;n.updateUBOMapping(v,T);const A=t.render.frame;r[v.id]!==A&&(d(v),r[v.id]=A)}function h(v){const y=u();v.__bindingPointIndex=y;const _=i.createBuffer(),T=v.__size,A=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,_),i.bufferData(i.UNIFORM_BUFFER,T,A),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,y,_),_}function u(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(v){const y=s[v.id],_=v.uniforms,T=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,y);for(let A=0,E=_.length;A<E;A++){const C=Array.isArray(_[A])?_[A]:[_[A]];for(let S=0,b=C.length;S<b;S++){const U=C[S];if(f(U,A,S,T)===!0){const P=U.__offset,G=Array.isArray(U.value)?U.value:[U.value];let j=0;for(let H=0;H<G.length;H++){const q=G[H],B=x(q);typeof q=="number"||typeof q=="boolean"?(U.__data[0]=q,i.bufferSubData(i.UNIFORM_BUFFER,P+j,U.__data)):q.isMatrix3?(U.__data[0]=q.elements[0],U.__data[1]=q.elements[1],U.__data[2]=q.elements[2],U.__data[3]=0,U.__data[4]=q.elements[3],U.__data[5]=q.elements[4],U.__data[6]=q.elements[5],U.__data[7]=0,U.__data[8]=q.elements[6],U.__data[9]=q.elements[7],U.__data[10]=q.elements[8],U.__data[11]=0):(q.toArray(U.__data,j),j+=B.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,P,U.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(v,y,_,T){const A=v.value,E=y+"_"+_;if(T[E]===void 0)return typeof A=="number"||typeof A=="boolean"?T[E]=A:T[E]=A.clone(),!0;{const C=T[E];if(typeof A=="number"||typeof A=="boolean"){if(C!==A)return T[E]=A,!0}else if(C.equals(A)===!1)return C.copy(A),!0}return!1}function m(v){const y=v.uniforms;let _=0;const T=16;for(let E=0,C=y.length;E<C;E++){const S=Array.isArray(y[E])?y[E]:[y[E]];for(let b=0,U=S.length;b<U;b++){const P=S[b],G=Array.isArray(P.value)?P.value:[P.value];for(let j=0,H=G.length;j<H;j++){const q=G[j],B=x(q),O=_%T,Q=O%B.boundary,W=O+Q;_+=Q,W!==0&&T-W<B.storage&&(_+=T-W),P.__data=new Float32Array(B.storage/Float32Array.BYTES_PER_ELEMENT),P.__offset=_,_+=B.storage}}}const A=_%T;return A>0&&(_+=T-A),v.__size=_,v.__cache={},this}function x(v){const y={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(y.boundary=4,y.storage=4):v.isVector2?(y.boundary=8,y.storage=8):v.isVector3||v.isColor?(y.boundary=16,y.storage=12):v.isVector4?(y.boundary=16,y.storage=16):v.isMatrix3?(y.boundary=48,y.storage=48):v.isMatrix4?(y.boundary=64,y.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),y}function g(v){const y=v.target;y.removeEventListener("dispose",g);const _=o.indexOf(y.__bindingPointIndex);o.splice(_,1),i.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function p(){for(const v in s)i.deleteBuffer(s[v]);o=[],s={},r={}}return{bind:l,update:c,dispose:p}}class c_{constructor(t={}){const{canvas:e=Mp(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;const m=new Uint32Array(4),x=new Int32Array(4);let g=null,p=null;const v=[],y=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=es,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const _=this;let T=!1;this._outputColorSpace=In;let A=0,E=0,C=null,S=-1,b=null;const U=new ze,P=new ze;let G=null;const j=new ee(0);let H=0,q=e.width,B=e.height,O=1,Q=null,W=null;const ft=new ze(0,0,q,B),Vt=new ze(0,0,q,B);let Me=!1;const ce=new jc;let ht=!1,Y=!1;const rt=new he,yt=new L,Xt=new ze,kt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let fe=!1;function Ee(){return C===null?O:1}let I=n;function ne(R,K){return e.getContext(R,K)}try{const R={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Uc}`),e.addEventListener("webglcontextlost",Tt,!1),e.addEventListener("webglcontextrestored",Ft,!1),e.addEventListener("webglcontextcreationerror",xt,!1),I===null){const K="webgl2";if(I=ne(K,R),I===null)throw ne(K)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let Yt,qt,Lt,se,mt,bt,le,De,D,w,tt,at,lt,ot,Ut,ct,wt,Pt,gt,Rt,jt,Ot,Et,ue;function $(){Yt=new _x(I),Yt.init(),Ot=new e_(I,Yt),qt=new dx(I,Yt,t,Ot),Lt=new Qv(I,Yt),qt.reversedDepthBuffer&&d&&Lt.buffers.depth.setReversed(!0),se=new bx(I),mt=new Bv,bt=new t_(I,Yt,Lt,mt,qt,Ot,se),le=new px(_),De=new vx(_),D=new Rm(I),Et=new hx(I,D),w=new yx(I,D,se,Et),tt=new wx(I,w,D,se),gt=new Sx(I,qt,bt),ct=new fx(mt),at=new Ov(_,le,De,Yt,qt,Et,ct),lt=new a_(_,mt),ot=new Gv,Ut=new Yv(Yt),Pt=new cx(_,le,De,Lt,tt,f,l),wt=new Kv(_,tt,qt),ue=new l_(I,se,qt,Lt),Rt=new ux(I,Yt,se),jt=new Mx(I,Yt,se),se.programs=at.programs,_.capabilities=qt,_.extensions=Yt,_.properties=mt,_.renderLists=ot,_.shadowMap=wt,_.state=Lt,_.info=se}$();const _t=new r_(_,I);this.xr=_t,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const R=Yt.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=Yt.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return O},this.setPixelRatio=function(R){R!==void 0&&(O=R,this.setSize(q,B,!1))},this.getSize=function(R){return R.set(q,B)},this.setSize=function(R,K,et=!0){if(_t.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}q=R,B=K,e.width=Math.floor(R*O),e.height=Math.floor(K*O),et===!0&&(e.style.width=R+"px",e.style.height=K+"px"),this.setViewport(0,0,R,K)},this.getDrawingBufferSize=function(R){return R.set(q*O,B*O).floor()},this.setDrawingBufferSize=function(R,K,et){q=R,B=K,O=et,e.width=Math.floor(R*et),e.height=Math.floor(K*et),this.setViewport(0,0,R,K)},this.getCurrentViewport=function(R){return R.copy(U)},this.getViewport=function(R){return R.copy(ft)},this.setViewport=function(R,K,et,nt){R.isVector4?ft.set(R.x,R.y,R.z,R.w):ft.set(R,K,et,nt),Lt.viewport(U.copy(ft).multiplyScalar(O).round())},this.getScissor=function(R){return R.copy(Vt)},this.setScissor=function(R,K,et,nt){R.isVector4?Vt.set(R.x,R.y,R.z,R.w):Vt.set(R,K,et,nt),Lt.scissor(P.copy(Vt).multiplyScalar(O).round())},this.getScissorTest=function(){return Me},this.setScissorTest=function(R){Lt.setScissorTest(Me=R)},this.setOpaqueSort=function(R){Q=R},this.setTransparentSort=function(R){W=R},this.getClearColor=function(R){return R.copy(Pt.getClearColor())},this.setClearColor=function(){Pt.setClearColor(...arguments)},this.getClearAlpha=function(){return Pt.getClearAlpha()},this.setClearAlpha=function(){Pt.setClearAlpha(...arguments)},this.clear=function(R=!0,K=!0,et=!0){let nt=0;if(R){let J=!1;if(C!==null){const vt=C.texture.format;J=vt===Gc||vt===Hc||vt===Bc}if(J){const vt=C.texture.type,It=vt===pi||vt===Ss||vt===eo||vt===no||vt===kc||vt===Fc,Ht=Pt.getClearColor(),Dt=Pt.getClearAlpha(),Kt=Ht.r,oe=Ht.g,Jt=Ht.b;It?(m[0]=Kt,m[1]=oe,m[2]=Jt,m[3]=Dt,I.clearBufferuiv(I.COLOR,0,m)):(x[0]=Kt,x[1]=oe,x[2]=Jt,x[3]=Dt,I.clearBufferiv(I.COLOR,0,x))}else nt|=I.COLOR_BUFFER_BIT}K&&(nt|=I.DEPTH_BUFFER_BIT),et&&(nt|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(nt)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Tt,!1),e.removeEventListener("webglcontextrestored",Ft,!1),e.removeEventListener("webglcontextcreationerror",xt,!1),Pt.dispose(),ot.dispose(),Ut.dispose(),mt.dispose(),le.dispose(),De.dispose(),tt.dispose(),Et.dispose(),ue.dispose(),at.dispose(),_t.dispose(),_t.removeEventListener("sessionstart",Un),_t.removeEventListener("sessionend",Ar),ri.stop()};function Tt(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function Ft(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;const R=se.autoReset,K=wt.enabled,et=wt.autoUpdate,nt=wt.needsUpdate,J=wt.type;$(),se.autoReset=R,wt.enabled=K,wt.autoUpdate=et,wt.needsUpdate=nt,wt.type=J}function xt(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function ut(R){const K=R.target;K.removeEventListener("dispose",ut),Bt(K)}function Bt(R){de(R),mt.remove(R)}function de(R){const K=mt.get(R).programs;K!==void 0&&(K.forEach(function(et){at.releaseProgram(et)}),R.isShaderMaterial&&at.releaseShaderCache(R))}this.renderBufferDirect=function(R,K,et,nt,J,vt){K===null&&(K=kt);const It=J.isMesh&&J.matrixWorld.determinant()<0,Ht=za(R,K,et,nt,J);Lt.setMaterial(nt,It);let Dt=et.index,Kt=1;if(nt.wireframe===!0){if(Dt=w.getWireframeAttribute(et),Dt===void 0)return;Kt=2}const oe=et.drawRange,Jt=et.attributes.position;let be=oe.start*Kt,Ne=(oe.start+oe.count)*Kt;vt!==null&&(be=Math.max(be,vt.start*Kt),Ne=Math.min(Ne,(vt.start+vt.count)*Kt)),Dt!==null?(be=Math.max(be,0),Ne=Math.min(Ne,Dt.count)):Jt!=null&&(be=Math.max(be,0),Ne=Math.min(Ne,Jt.count));const Be=Ne-be;if(Be<0||Be===1/0)return;Et.setup(J,nt,Ht,et,Dt);let ke,Te=Rt;if(Dt!==null&&(ke=D.get(Dt),Te=jt,Te.setIndex(ke)),J.isMesh)nt.wireframe===!0?(Lt.setLineWidth(nt.wireframeLinewidth*Ee()),Te.setMode(I.LINES)):Te.setMode(I.TRIANGLES);else if(J.isLine){let Qt=nt.linewidth;Qt===void 0&&(Qt=1),Lt.setLineWidth(Qt*Ee()),J.isLineSegments?Te.setMode(I.LINES):J.isLineLoop?Te.setMode(I.LINE_LOOP):Te.setMode(I.LINE_STRIP)}else J.isPoints?Te.setMode(I.POINTS):J.isSprite&&Te.setMode(I.TRIANGLES);if(J.isBatchedMesh)if(J._multiDrawInstances!==null)oo("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Te.renderMultiDrawInstances(J._multiDrawStarts,J._multiDrawCounts,J._multiDrawCount,J._multiDrawInstances);else if(Yt.get("WEBGL_multi_draw"))Te.renderMultiDraw(J._multiDrawStarts,J._multiDrawCounts,J._multiDrawCount);else{const Qt=J._multiDrawStarts,Xe=J._multiDrawCounts,Ae=J._multiDrawCount,yn=Dt?D.get(Dt).bytesPerElement:1,xi=mt.get(nt).currentProgram.getUniforms();for(let pn=0;pn<Ae;pn++)xi.setValue(I,"_gl_DrawID",pn),Te.render(Qt[pn]/yn,Xe[pn])}else if(J.isInstancedMesh)Te.renderInstances(be,Be,J.count);else if(et.isInstancedBufferGeometry){const Qt=et._maxInstanceCount!==void 0?et._maxInstanceCount:1/0,Xe=Math.min(et.instanceCount,Qt);Te.renderInstances(be,Be,Xe)}else Te.render(be,Be)};function Oe(R,K,et){R.transparent===!0&&R.side===Pe&&R.forceSinglePass===!1?(R.side=Pn,R.needsUpdate=!0,zs(R,K,et),R.side=zi,R.needsUpdate=!0,zs(R,K,et),R.side=Pe):zs(R,K,et)}this.compile=function(R,K,et=null){et===null&&(et=R),p=Ut.get(et),p.init(K),y.push(p),et.traverseVisible(function(J){J.isLight&&J.layers.test(K.layers)&&(p.pushLight(J),J.castShadow&&p.pushShadow(J))}),R!==et&&R.traverseVisible(function(J){J.isLight&&J.layers.test(K.layers)&&(p.pushLight(J),J.castShadow&&p.pushShadow(J))}),p.setupLights();const nt=new Set;return R.traverse(function(J){if(!(J.isMesh||J.isPoints||J.isLine||J.isSprite))return;const vt=J.material;if(vt)if(Array.isArray(vt))for(let It=0;It<vt.length;It++){const Ht=vt[It];Oe(Ht,et,J),nt.add(Ht)}else Oe(vt,et,J),nt.add(vt)}),p=y.pop(),nt},this.compileAsync=function(R,K,et=null){const nt=this.compile(R,K,et);return new Promise(J=>{function vt(){if(nt.forEach(function(It){mt.get(It).currentProgram.isReady()&&nt.delete(It)}),nt.size===0){J(R);return}setTimeout(vt,10)}Yt.get("KHR_parallel_shader_compile")!==null?vt():setTimeout(vt,10)})};let ve=null;function Tn(R){ve&&ve(R)}function Un(){ri.stop()}function Ar(){ri.start()}const ri=new Pd;ri.setAnimationLoop(Tn),typeof self<"u"&&ri.setContext(self),this.setAnimationLoop=function(R){ve=R,_t.setAnimationLoop(R),R===null?ri.stop():ri.start()},_t.addEventListener("sessionstart",Un),_t.addEventListener("sessionend",Ar),this.render=function(R,K){if(K!==void 0&&K.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),K.parent===null&&K.matrixWorldAutoUpdate===!0&&K.updateMatrixWorld(),_t.enabled===!0&&_t.isPresenting===!0&&(_t.cameraAutoUpdate===!0&&_t.updateCamera(K),K=_t.getCamera()),R.isScene===!0&&R.onBeforeRender(_,R,K,C),p=Ut.get(R,y.length),p.init(K),y.push(p),rt.multiplyMatrices(K.projectionMatrix,K.matrixWorldInverse),ce.setFromProjectionMatrix(rt,di,K.reversedDepth),Y=this.localClippingEnabled,ht=ct.init(this.clippingPlanes,Y),g=ot.get(R,v.length),g.init(),v.push(g),_t.enabled===!0&&_t.isPresenting===!0){const vt=_.xr.getDepthSensingMesh();vt!==null&&Rr(vt,K,-1/0,_.sortObjects)}Rr(R,K,0,_.sortObjects),g.finish(),_.sortObjects===!0&&g.sort(Q,W),fe=_t.enabled===!1||_t.isPresenting===!1||_t.hasDepthSensing()===!1,fe&&Pt.addToRenderList(g,R),this.info.render.frame++,ht===!0&&ct.beginShadows();const et=p.state.shadowsArray;wt.render(et,R,K),ht===!0&&ct.endShadows(),this.info.autoReset===!0&&this.info.reset();const nt=g.opaque,J=g.transmissive;if(p.setupLights(),K.isArrayCamera){const vt=K.cameras;if(J.length>0)for(let It=0,Ht=vt.length;It<Ht;It++){const Dt=vt[It];os(nt,J,R,Dt)}fe&&Pt.render(R);for(let It=0,Ht=vt.length;It<Ht;It++){const Dt=vt[It];Cr(g,R,Dt,Dt.viewport)}}else J.length>0&&os(nt,J,R,K),fe&&Pt.render(R),Cr(g,R,K);C!==null&&E===0&&(bt.updateMultisampleRenderTarget(C),bt.updateRenderTargetMipmap(C)),R.isScene===!0&&R.onAfterRender(_,R,K),Et.resetDefaultState(),S=-1,b=null,y.pop(),y.length>0?(p=y[y.length-1],ht===!0&&ct.setGlobalState(_.clippingPlanes,p.state.camera)):p=null,v.pop(),v.length>0?g=v[v.length-1]:g=null};function Rr(R,K,et,nt){if(R.visible===!1)return;if(R.layers.test(K.layers)){if(R.isGroup)et=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(K);else if(R.isLight)p.pushLight(R),R.castShadow&&p.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||ce.intersectsSprite(R)){nt&&Xt.setFromMatrixPosition(R.matrixWorld).applyMatrix4(rt);const It=tt.update(R),Ht=R.material;Ht.visible&&g.push(R,It,Ht,et,Xt.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||ce.intersectsObject(R))){const It=tt.update(R),Ht=R.material;if(nt&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),Xt.copy(R.boundingSphere.center)):(It.boundingSphere===null&&It.computeBoundingSphere(),Xt.copy(It.boundingSphere.center)),Xt.applyMatrix4(R.matrixWorld).applyMatrix4(rt)),Array.isArray(Ht)){const Dt=It.groups;for(let Kt=0,oe=Dt.length;Kt<oe;Kt++){const Jt=Dt[Kt],be=Ht[Jt.materialIndex];be&&be.visible&&g.push(R,It,be,et,Xt.z,Jt)}}else Ht.visible&&g.push(R,It,Ht,et,Xt.z,null)}}const vt=R.children;for(let It=0,Ht=vt.length;It<Ht;It++)Rr(vt[It],K,et,nt)}function Cr(R,K,et,nt){const J=R.opaque,vt=R.transmissive,It=R.transparent;p.setupLightsView(et),ht===!0&&ct.setGlobalState(_.clippingPlanes,et),nt&&Lt.viewport(U.copy(nt)),J.length>0&&Is(J,K,et),vt.length>0&&Is(vt,K,et),It.length>0&&Is(It,K,et),Lt.buffers.depth.setTest(!0),Lt.buffers.depth.setMask(!0),Lt.buffers.color.setMask(!0),Lt.setPolygonOffset(!1)}function os(R,K,et,nt){if((et.isScene===!0?et.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[nt.id]===void 0&&(p.state.transmissionRenderTarget[nt.id]=new is(1,1,{generateMipmaps:!0,type:Yt.has("EXT_color_buffer_half_float")||Yt.has("EXT_color_buffer_float")?ho:pi,minFilter:Ji,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ue.workingColorSpace}));const vt=p.state.transmissionRenderTarget[nt.id],It=nt.viewport||U;vt.setSize(It.z*_.transmissionResolutionScale,It.w*_.transmissionResolutionScale);const Ht=_.getRenderTarget(),Dt=_.getActiveCubeFace(),Kt=_.getActiveMipmapLevel();_.setRenderTarget(vt),_.getClearColor(j),H=_.getClearAlpha(),H<1&&_.setClearColor(16777215,.5),_.clear(),fe&&Pt.render(et);const oe=_.toneMapping;_.toneMapping=es;const Jt=nt.viewport;if(nt.viewport!==void 0&&(nt.viewport=void 0),p.setupLightsView(nt),ht===!0&&ct.setGlobalState(_.clippingPlanes,nt),Is(R,et,nt),bt.updateMultisampleRenderTarget(vt),bt.updateRenderTargetMipmap(vt),Yt.has("WEBGL_multisampled_render_to_texture")===!1){let be=!1;for(let Ne=0,Be=K.length;Ne<Be;Ne++){const ke=K[Ne],Te=ke.object,Qt=ke.geometry,Xe=ke.material,Ae=ke.group;if(Xe.side===Pe&&Te.layers.test(nt.layers)){const yn=Xe.side;Xe.side=Pn,Xe.needsUpdate=!0,ki(Te,et,nt,Qt,Xe,Ae),Xe.side=yn,Xe.needsUpdate=!0,be=!0}}be===!0&&(bt.updateMultisampleRenderTarget(vt),bt.updateRenderTargetMipmap(vt))}_.setRenderTarget(Ht,Dt,Kt),_.setClearColor(j,H),Jt!==void 0&&(nt.viewport=Jt),_.toneMapping=oe}function Is(R,K,et){const nt=K.isScene===!0?K.overrideMaterial:null;for(let J=0,vt=R.length;J<vt;J++){const It=R[J],Ht=It.object,Dt=It.geometry,Kt=It.group;let oe=It.material;oe.allowOverride===!0&&nt!==null&&(oe=nt),Ht.layers.test(et.layers)&&ki(Ht,K,et,Dt,oe,Kt)}}function ki(R,K,et,nt,J,vt){R.onBeforeRender(_,K,et,nt,J,vt),R.modelViewMatrix.multiplyMatrices(et.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),J.onBeforeRender(_,K,et,nt,R,vt),J.transparent===!0&&J.side===Pe&&J.forceSinglePass===!1?(J.side=Pn,J.needsUpdate=!0,_.renderBufferDirect(et,K,nt,J,R,vt),J.side=zi,J.needsUpdate=!0,_.renderBufferDirect(et,K,nt,J,R,vt),J.side=Pe):_.renderBufferDirect(et,K,nt,J,R,vt),R.onAfterRender(_,K,et,nt,J,vt)}function zs(R,K,et){K.isScene!==!0&&(K=kt);const nt=mt.get(R),J=p.state.lights,vt=p.state.shadowsArray,It=J.state.version,Ht=at.getParameters(R,J.state,vt,K,et),Dt=at.getProgramCacheKey(Ht);let Kt=nt.programs;nt.environment=R.isMeshStandardMaterial?K.environment:null,nt.fog=K.fog,nt.envMap=(R.isMeshStandardMaterial?De:le).get(R.envMap||nt.environment),nt.envMapRotation=nt.environment!==null&&R.envMap===null?K.environmentRotation:R.envMapRotation,Kt===void 0&&(R.addEventListener("dispose",ut),Kt=new Map,nt.programs=Kt);let oe=Kt.get(Dt);if(oe!==void 0){if(nt.currentProgram===oe&&nt.lightsStateVersion===It)return Ls(R,Ht),oe}else Ht.uniforms=at.getUniforms(R),R.onBeforeCompile(Ht,_),oe=at.acquireProgram(Ht,Dt),Kt.set(Dt,oe),nt.uniforms=Ht.uniforms;const Jt=nt.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Jt.clippingPlanes=ct.uniform),Ls(R,Ht),nt.needsLights=po(R),nt.lightsStateVersion=It,nt.needsLights&&(Jt.ambientLightColor.value=J.state.ambient,Jt.lightProbe.value=J.state.probe,Jt.directionalLights.value=J.state.directional,Jt.directionalLightShadows.value=J.state.directionalShadow,Jt.spotLights.value=J.state.spot,Jt.spotLightShadows.value=J.state.spotShadow,Jt.rectAreaLights.value=J.state.rectArea,Jt.ltc_1.value=J.state.rectAreaLTC1,Jt.ltc_2.value=J.state.rectAreaLTC2,Jt.pointLights.value=J.state.point,Jt.pointLightShadows.value=J.state.pointShadow,Jt.hemisphereLights.value=J.state.hemi,Jt.directionalShadowMap.value=J.state.directionalShadowMap,Jt.directionalShadowMatrix.value=J.state.directionalShadowMatrix,Jt.spotShadowMap.value=J.state.spotShadowMap,Jt.spotLightMatrix.value=J.state.spotLightMatrix,Jt.spotLightMap.value=J.state.spotLightMap,Jt.pointShadowMap.value=J.state.pointShadowMap,Jt.pointShadowMatrix.value=J.state.pointShadowMatrix),nt.currentProgram=oe,nt.uniformsList=null,oe}function oi(R){if(R.uniformsList===null){const K=R.currentProgram.getUniforms();R.uniformsList=ca.seqWithValue(K.seq,R.uniforms)}return R.uniformsList}function Ls(R,K){const et=mt.get(R);et.outputColorSpace=K.outputColorSpace,et.batching=K.batching,et.batchingColor=K.batchingColor,et.instancing=K.instancing,et.instancingColor=K.instancingColor,et.instancingMorph=K.instancingMorph,et.skinning=K.skinning,et.morphTargets=K.morphTargets,et.morphNormals=K.morphNormals,et.morphColors=K.morphColors,et.morphTargetsCount=K.morphTargetsCount,et.numClippingPlanes=K.numClippingPlanes,et.numIntersection=K.numClipIntersection,et.vertexAlphas=K.vertexAlphas,et.vertexTangents=K.vertexTangents,et.toneMapping=K.toneMapping}function za(R,K,et,nt,J){K.isScene!==!0&&(K=kt),bt.resetTextureUnits();const vt=K.fog,It=nt.isMeshStandardMaterial?K.environment:null,Ht=C===null?_.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:Mr,Dt=(nt.isMeshStandardMaterial?De:le).get(nt.envMap||It),Kt=nt.vertexColors===!0&&!!et.attributes.color&&et.attributes.color.itemSize===4,oe=!!et.attributes.tangent&&(!!nt.normalMap||nt.anisotropy>0),Jt=!!et.morphAttributes.position,be=!!et.morphAttributes.normal,Ne=!!et.morphAttributes.color;let Be=es;nt.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(Be=_.toneMapping);const ke=et.morphAttributes.position||et.morphAttributes.normal||et.morphAttributes.color,Te=ke!==void 0?ke.length:0,Qt=mt.get(nt),Xe=p.state.lights;if(ht===!0&&(Y===!0||R!==b)){const dn=R===b&&nt.id===S;ct.setState(nt,R,dn)}let Ae=!1;nt.version===Qt.__version?(Qt.needsLights&&Qt.lightsStateVersion!==Xe.state.version||Qt.outputColorSpace!==Ht||J.isBatchedMesh&&Qt.batching===!1||!J.isBatchedMesh&&Qt.batching===!0||J.isBatchedMesh&&Qt.batchingColor===!0&&J.colorTexture===null||J.isBatchedMesh&&Qt.batchingColor===!1&&J.colorTexture!==null||J.isInstancedMesh&&Qt.instancing===!1||!J.isInstancedMesh&&Qt.instancing===!0||J.isSkinnedMesh&&Qt.skinning===!1||!J.isSkinnedMesh&&Qt.skinning===!0||J.isInstancedMesh&&Qt.instancingColor===!0&&J.instanceColor===null||J.isInstancedMesh&&Qt.instancingColor===!1&&J.instanceColor!==null||J.isInstancedMesh&&Qt.instancingMorph===!0&&J.morphTexture===null||J.isInstancedMesh&&Qt.instancingMorph===!1&&J.morphTexture!==null||Qt.envMap!==Dt||nt.fog===!0&&Qt.fog!==vt||Qt.numClippingPlanes!==void 0&&(Qt.numClippingPlanes!==ct.numPlanes||Qt.numIntersection!==ct.numIntersection)||Qt.vertexAlphas!==Kt||Qt.vertexTangents!==oe||Qt.morphTargets!==Jt||Qt.morphNormals!==be||Qt.morphColors!==Ne||Qt.toneMapping!==Be||Qt.morphTargetsCount!==Te)&&(Ae=!0):(Ae=!0,Qt.__version=nt.version);let yn=Qt.currentProgram;Ae===!0&&(yn=zs(nt,K,J));let xi=!1,pn=!1,ls=!1;const qe=yn.getUniforms(),tn=Qt.uniforms;if(Lt.useProgram(yn.program)&&(xi=!0,pn=!0,ls=!0),nt.id!==S&&(S=nt.id,pn=!0),xi||b!==R){Lt.buffers.depth.getReversed()&&R.reversedDepth!==!0&&(R._reversedDepth=!0,R.updateProjectionMatrix()),qe.setValue(I,"projectionMatrix",R.projectionMatrix),qe.setValue(I,"viewMatrix",R.matrixWorldInverse);const mn=qe.map.cameraPosition;mn!==void 0&&mn.setValue(I,yt.setFromMatrixPosition(R.matrixWorld)),qt.logarithmicDepthBuffer&&qe.setValue(I,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(nt.isMeshPhongMaterial||nt.isMeshToonMaterial||nt.isMeshLambertMaterial||nt.isMeshBasicMaterial||nt.isMeshStandardMaterial||nt.isShaderMaterial)&&qe.setValue(I,"isOrthographic",R.isOrthographicCamera===!0),b!==R&&(b=R,pn=!0,ls=!0)}if(J.isSkinnedMesh){qe.setOptional(I,J,"bindMatrix"),qe.setOptional(I,J,"bindMatrixInverse");const dn=J.skeleton;dn&&(dn.boneTexture===null&&dn.computeBoneTexture(),qe.setValue(I,"boneTexture",dn.boneTexture,bt))}J.isBatchedMesh&&(qe.setOptional(I,J,"batchingTexture"),qe.setValue(I,"batchingTexture",J._matricesTexture,bt),qe.setOptional(I,J,"batchingIdTexture"),qe.setValue(I,"batchingIdTexture",J._indirectTexture,bt),qe.setOptional(I,J,"batchingColorTexture"),J._colorsTexture!==null&&qe.setValue(I,"batchingColorTexture",J._colorsTexture,bt));const on=et.morphAttributes;if((on.position!==void 0||on.normal!==void 0||on.color!==void 0)&&gt.update(J,et,yn),(pn||Qt.receiveShadow!==J.receiveShadow)&&(Qt.receiveShadow=J.receiveShadow,qe.setValue(I,"receiveShadow",J.receiveShadow)),nt.isMeshGouraudMaterial&&nt.envMap!==null&&(tn.envMap.value=Dt,tn.flipEnvMap.value=Dt.isCubeTexture&&Dt.isRenderTargetTexture===!1?-1:1),nt.isMeshStandardMaterial&&nt.envMap===null&&K.environment!==null&&(tn.envMapIntensity.value=K.environmentIntensity),pn&&(qe.setValue(I,"toneMappingExposure",_.toneMappingExposure),Qt.needsLights&&Fi(tn,ls),vt&&nt.fog===!0&&lt.refreshFogUniforms(tn,vt),lt.refreshMaterialUniforms(tn,nt,O,B,p.state.transmissionRenderTarget[R.id]),ca.upload(I,oi(Qt),tn,bt)),nt.isShaderMaterial&&nt.uniformsNeedUpdate===!0&&(ca.upload(I,oi(Qt),tn,bt),nt.uniformsNeedUpdate=!1),nt.isSpriteMaterial&&qe.setValue(I,"center",J.center),qe.setValue(I,"modelViewMatrix",J.modelViewMatrix),qe.setValue(I,"normalMatrix",J.normalMatrix),qe.setValue(I,"modelMatrix",J.matrixWorld),nt.isShaderMaterial||nt.isRawShaderMaterial){const dn=nt.uniformsGroups;for(let mn=0,Oi=dn.length;mn<Oi;mn++){const ai=dn[mn];ue.update(ai,yn),ue.bind(ai,yn)}}return yn}function Fi(R,K){R.ambientLightColor.needsUpdate=K,R.lightProbe.needsUpdate=K,R.directionalLights.needsUpdate=K,R.directionalLightShadows.needsUpdate=K,R.pointLights.needsUpdate=K,R.pointLightShadows.needsUpdate=K,R.spotLights.needsUpdate=K,R.spotLightShadows.needsUpdate=K,R.rectAreaLights.needsUpdate=K,R.hemisphereLights.needsUpdate=K}function po(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(R,K,et){const nt=mt.get(R);nt.__autoAllocateDepthBuffer=R.resolveDepthBuffer===!1,nt.__autoAllocateDepthBuffer===!1&&(nt.__useRenderToTexture=!1),mt.get(R.texture).__webglTexture=K,mt.get(R.depthTexture).__webglTexture=nt.__autoAllocateDepthBuffer?void 0:et,nt.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(R,K){const et=mt.get(R);et.__webglFramebuffer=K,et.__useDefaultFramebuffer=K===void 0};const as=I.createFramebuffer();this.setRenderTarget=function(R,K=0,et=0){C=R,A=K,E=et;let nt=!0,J=null,vt=!1,It=!1;if(R){const Dt=mt.get(R);if(Dt.__useDefaultFramebuffer!==void 0)Lt.bindFramebuffer(I.FRAMEBUFFER,null),nt=!1;else if(Dt.__webglFramebuffer===void 0)bt.setupRenderTarget(R);else if(Dt.__hasExternalTextures)bt.rebindTextures(R,mt.get(R.texture).__webglTexture,mt.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const Jt=R.depthTexture;if(Dt.__boundDepthTexture!==Jt){if(Jt!==null&&mt.has(Jt)&&(R.width!==Jt.image.width||R.height!==Jt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");bt.setupDepthRenderbuffer(R)}}const Kt=R.texture;(Kt.isData3DTexture||Kt.isDataArrayTexture||Kt.isCompressedArrayTexture)&&(It=!0);const oe=mt.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(oe[K])?J=oe[K][et]:J=oe[K],vt=!0):R.samples>0&&bt.useMultisampledRTT(R)===!1?J=mt.get(R).__webglMultisampledFramebuffer:Array.isArray(oe)?J=oe[et]:J=oe,U.copy(R.viewport),P.copy(R.scissor),G=R.scissorTest}else U.copy(ft).multiplyScalar(O).floor(),P.copy(Vt).multiplyScalar(O).floor(),G=Me;if(et!==0&&(J=as),Lt.bindFramebuffer(I.FRAMEBUFFER,J)&&nt&&Lt.drawBuffers(R,J),Lt.viewport(U),Lt.scissor(P),Lt.setScissorTest(G),vt){const Dt=mt.get(R.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+K,Dt.__webglTexture,et)}else if(It){const Dt=K;for(let Kt=0;Kt<R.textures.length;Kt++){const oe=mt.get(R.textures[Kt]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+Kt,oe.__webglTexture,et,Dt)}}else if(R!==null&&et!==0){const Dt=mt.get(R.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Dt.__webglTexture,et)}S=-1},this.readRenderTargetPixels=function(R,K,et,nt,J,vt,It,Ht=0){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Dt=mt.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&It!==void 0&&(Dt=Dt[It]),Dt){Lt.bindFramebuffer(I.FRAMEBUFFER,Dt);try{const Kt=R.textures[Ht],oe=Kt.format,Jt=Kt.type;if(!qt.textureFormatReadable(oe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!qt.textureTypeReadable(Jt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}K>=0&&K<=R.width-nt&&et>=0&&et<=R.height-J&&(R.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+Ht),I.readPixels(K,et,nt,J,Ot.convert(oe),Ot.convert(Jt),vt))}finally{const Kt=C!==null?mt.get(C).__webglFramebuffer:null;Lt.bindFramebuffer(I.FRAMEBUFFER,Kt)}}},this.readRenderTargetPixelsAsync=async function(R,K,et,nt,J,vt,It,Ht=0){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Dt=mt.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&It!==void 0&&(Dt=Dt[It]),Dt)if(K>=0&&K<=R.width-nt&&et>=0&&et<=R.height-J){Lt.bindFramebuffer(I.FRAMEBUFFER,Dt);const Kt=R.textures[Ht],oe=Kt.format,Jt=Kt.type;if(!qt.textureFormatReadable(oe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!qt.textureTypeReadable(Jt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const be=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,be),I.bufferData(I.PIXEL_PACK_BUFFER,vt.byteLength,I.STREAM_READ),R.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+Ht),I.readPixels(K,et,nt,J,Ot.convert(oe),Ot.convert(Jt),0);const Ne=C!==null?mt.get(C).__webglFramebuffer:null;Lt.bindFramebuffer(I.FRAMEBUFFER,Ne);const Be=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await bp(I,Be,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,be),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,vt),I.deleteBuffer(be),I.deleteSync(Be),vt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(R,K=null,et=0){const nt=Math.pow(2,-et),J=Math.floor(R.image.width*nt),vt=Math.floor(R.image.height*nt),It=K!==null?K.x:0,Ht=K!==null?K.y:0;bt.setTexture2D(R,0),I.copyTexSubImage2D(I.TEXTURE_2D,et,0,0,It,Ht,J,vt),Lt.unbindTexture()};const Pr=I.createFramebuffer(),Us=I.createFramebuffer();this.copyTextureToTexture=function(R,K,et=null,nt=null,J=0,vt=null){vt===null&&(J!==0?(oo("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),vt=J,J=0):vt=0);let It,Ht,Dt,Kt,oe,Jt,be,Ne,Be;const ke=R.isCompressedTexture?R.mipmaps[vt]:R.image;if(et!==null)It=et.max.x-et.min.x,Ht=et.max.y-et.min.y,Dt=et.isBox3?et.max.z-et.min.z:1,Kt=et.min.x,oe=et.min.y,Jt=et.isBox3?et.min.z:0;else{const on=Math.pow(2,-J);It=Math.floor(ke.width*on),Ht=Math.floor(ke.height*on),R.isDataArrayTexture?Dt=ke.depth:R.isData3DTexture?Dt=Math.floor(ke.depth*on):Dt=1,Kt=0,oe=0,Jt=0}nt!==null?(be=nt.x,Ne=nt.y,Be=nt.z):(be=0,Ne=0,Be=0);const Te=Ot.convert(K.format),Qt=Ot.convert(K.type);let Xe;K.isData3DTexture?(bt.setTexture3D(K,0),Xe=I.TEXTURE_3D):K.isDataArrayTexture||K.isCompressedArrayTexture?(bt.setTexture2DArray(K,0),Xe=I.TEXTURE_2D_ARRAY):(bt.setTexture2D(K,0),Xe=I.TEXTURE_2D),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,K.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,K.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,K.unpackAlignment);const Ae=I.getParameter(I.UNPACK_ROW_LENGTH),yn=I.getParameter(I.UNPACK_IMAGE_HEIGHT),xi=I.getParameter(I.UNPACK_SKIP_PIXELS),pn=I.getParameter(I.UNPACK_SKIP_ROWS),ls=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,ke.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,ke.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Kt),I.pixelStorei(I.UNPACK_SKIP_ROWS,oe),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Jt);const qe=R.isDataArrayTexture||R.isData3DTexture,tn=K.isDataArrayTexture||K.isData3DTexture;if(R.isDepthTexture){const on=mt.get(R),dn=mt.get(K),mn=mt.get(on.__renderTarget),Oi=mt.get(dn.__renderTarget);Lt.bindFramebuffer(I.READ_FRAMEBUFFER,mn.__webglFramebuffer),Lt.bindFramebuffer(I.DRAW_FRAMEBUFFER,Oi.__webglFramebuffer);for(let ai=0;ai<Dt;ai++)qe&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,mt.get(R).__webglTexture,J,Jt+ai),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,mt.get(K).__webglTexture,vt,Be+ai)),I.blitFramebuffer(Kt,oe,It,Ht,be,Ne,It,Ht,I.DEPTH_BUFFER_BIT,I.NEAREST);Lt.bindFramebuffer(I.READ_FRAMEBUFFER,null),Lt.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(J!==0||R.isRenderTargetTexture||mt.has(R)){const on=mt.get(R),dn=mt.get(K);Lt.bindFramebuffer(I.READ_FRAMEBUFFER,Pr),Lt.bindFramebuffer(I.DRAW_FRAMEBUFFER,Us);for(let mn=0;mn<Dt;mn++)qe?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,on.__webglTexture,J,Jt+mn):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,on.__webglTexture,J),tn?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,dn.__webglTexture,vt,Be+mn):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,dn.__webglTexture,vt),J!==0?I.blitFramebuffer(Kt,oe,It,Ht,be,Ne,It,Ht,I.COLOR_BUFFER_BIT,I.NEAREST):tn?I.copyTexSubImage3D(Xe,vt,be,Ne,Be+mn,Kt,oe,It,Ht):I.copyTexSubImage2D(Xe,vt,be,Ne,Kt,oe,It,Ht);Lt.bindFramebuffer(I.READ_FRAMEBUFFER,null),Lt.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else tn?R.isDataTexture||R.isData3DTexture?I.texSubImage3D(Xe,vt,be,Ne,Be,It,Ht,Dt,Te,Qt,ke.data):K.isCompressedArrayTexture?I.compressedTexSubImage3D(Xe,vt,be,Ne,Be,It,Ht,Dt,Te,ke.data):I.texSubImage3D(Xe,vt,be,Ne,Be,It,Ht,Dt,Te,Qt,ke):R.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,vt,be,Ne,It,Ht,Te,Qt,ke.data):R.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,vt,be,Ne,ke.width,ke.height,Te,ke.data):I.texSubImage2D(I.TEXTURE_2D,vt,be,Ne,It,Ht,Te,Qt,ke);I.pixelStorei(I.UNPACK_ROW_LENGTH,Ae),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,yn),I.pixelStorei(I.UNPACK_SKIP_PIXELS,xi),I.pixelStorei(I.UNPACK_SKIP_ROWS,pn),I.pixelStorei(I.UNPACK_SKIP_IMAGES,ls),vt===0&&K.generateMipmaps&&I.generateMipmap(Xe),Lt.unbindTexture()},this.initRenderTarget=function(R){mt.get(R).__webglFramebuffer===void 0&&bt.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?bt.setTextureCube(R,0):R.isData3DTexture?bt.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?bt.setTexture2DArray(R,0):bt.setTexture2D(R,0),Lt.unbindTexture()},this.resetState=function(){A=0,E=0,C=null,Lt.reset(),Et.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return di}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=Ue._getDrawingBufferColorSpace(t),e.unpackColorSpace=Ue._getUnpackColorSpace()}}class h_ extends Zt{constructor(t,e={}){super(t),this.isWater=!0;const n=this,s=e.textureWidth!==void 0?e.textureWidth:512,r=e.textureHeight!==void 0?e.textureHeight:512,o=e.clipBias!==void 0?e.clipBias:0,a=e.alpha!==void 0?e.alpha:1,l=e.time!==void 0?e.time:0,c=e.waterNormals!==void 0?e.waterNormals:null,h=e.sunDirection!==void 0?e.sunDirection:new L(.70707,.70707,0),u=new ee(e.sunColor!==void 0?e.sunColor:16777215),d=new ee(e.waterColor!==void 0?e.waterColor:8355711),f=e.eye!==void 0?e.eye:new L(0,0,0),m=e.distortionScale!==void 0?e.distortionScale:20,x=e.side!==void 0?e.side:zi,g=e.fog!==void 0?e.fog:!1,p=new hi,v=new L,y=new L,_=new L,T=new he,A=new L(0,0,-1),E=new ze,C=new L,S=new L,b=new ze,U=new he,P=new zn,G=new is(s,r),j={name:"MirrorShader",uniforms:fa.merge([Ct.fog,Ct.lights,{normalSampler:{value:null},mirrorSampler:{value:null},alpha:{value:1},time:{value:0},size:{value:1},distortionScale:{value:20},textureMatrix:{value:new he},sunColor:{value:new ee(8355711)},sunDirection:{value:new L(.70707,.70707,0)},eye:{value:new L},waterColor:{value:new ee(5592405)}}]),vertexShader:`
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
				}`},H=new $n({name:j.name,uniforms:fa.clone(j.uniforms),vertexShader:j.vertexShader,fragmentShader:j.fragmentShader,lights:!0,side:x,fog:g});H.uniforms.mirrorSampler.value=G.texture,H.uniforms.textureMatrix.value=U,H.uniforms.alpha.value=a,H.uniforms.time.value=l,H.uniforms.normalSampler.value=c,H.uniforms.sunColor.value=u,H.uniforms.waterColor.value=d,H.uniforms.sunDirection.value=h,H.uniforms.distortionScale.value=m,H.uniforms.eye.value=f,n.material=H,n.onBeforeRender=function(q,B,O){if(y.setFromMatrixPosition(n.matrixWorld),_.setFromMatrixPosition(O.matrixWorld),T.extractRotation(n.matrixWorld),v.set(0,0,1),v.applyMatrix4(T),C.subVectors(y,_),C.dot(v)>0)return;C.reflect(v).negate(),C.add(y),T.extractRotation(O.matrixWorld),A.set(0,0,-1),A.applyMatrix4(T),A.add(_),S.subVectors(y,A),S.reflect(v).negate(),S.add(y),P.position.copy(C),P.up.set(0,1,0),P.up.applyMatrix4(T),P.up.reflect(v),P.lookAt(S),P.far=O.far,P.updateMatrixWorld(),P.projectionMatrix.copy(O.projectionMatrix),U.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),U.multiply(P.projectionMatrix),U.multiply(P.matrixWorldInverse),p.setFromNormalAndCoplanarPoint(v,y),p.applyMatrix4(P.matrixWorldInverse),E.set(p.normal.x,p.normal.y,p.normal.z,p.constant);const Q=P.projectionMatrix;b.x=(Math.sign(E.x)+Q.elements[8])/Q.elements[0],b.y=(Math.sign(E.y)+Q.elements[9])/Q.elements[5],b.z=-1,b.w=(1+Q.elements[10])/Q.elements[14],E.multiplyScalar(2/E.dot(b)),Q.elements[2]=E.x,Q.elements[6]=E.y,Q.elements[10]=E.z+1-o,Q.elements[14]=E.w,f.setFromMatrixPosition(O.matrixWorld);const W=q.getRenderTarget(),ft=q.xr.enabled,Vt=q.shadowMap.autoUpdate;n.visible=!1,q.xr.enabled=!1,q.shadowMap.autoUpdate=!1,q.setRenderTarget(G),q.state.buffers.depth.setMask(!0),q.autoClear===!1&&q.clear(),q.render(B,P),n.visible=!0,q.xr.enabled=ft,q.shadowMap.autoUpdate=Vt,q.setRenderTarget(W);const Me=O.viewport;Me!==void 0&&q.state.viewport(Me)}}}function Ri(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,l=new we;let c=0;for(let h=0;h<i.length;++h){const u=i[h];let d=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in u.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(u.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in u.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[f]===void 0&&(o[f]=[]),o[f].push(u.morphAttributes[f])}if(t){let f;if(e)f=u.index.count;else if(u.attributes.position!==void 0)f=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,h),c+=f}}if(e){let h=0;const u=[];for(let d=0;d<i.length;++d){const f=i[d].index;for(let m=0;m<f.count;++m)u.push(f.getX(m)+h);h+=i[d].attributes.position.count}l.setIndex(u)}for(const h in r){const u=Fu(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(const h in o){const u=o[h][0].length;if(u===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let d=0;d<u;++d){const f=[];for(let x=0;x<o[h].length;++x)f.push(o[h][x][d]);const m=Fu(f);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(m)}}return l}function Fu(i){let t,e,n,s=-1,r=0;for(let c=0;c<i.length;++c){const h=i[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}const o=new t(r),a=new cn(o,e,n);let l=0;for(let c=0;c<i.length;++c){const h=i[c];if(h.isInterleavedBufferAttribute){const u=l/e;for(let d=0,f=h.count;d<f;d++)for(let m=0;m<e;m++){const x=h.getComponent(d,m);a.setComponent(d+u,m,x)}}else o.set(h.array,l);l+=h.count*e}return s!==void 0&&(a.gpuType=s),a}const ge=1.8,u_=2,d_=110*ge,f_=108*ge,ie=3,cr=ie/2.15,Ms=12.3*cr,gs=Ms+6,p_=Ms+8,$o=17,m_=cr,Wn=i=>Object.freeze(Object.fromEntries(Object.entries(i).map(([t,e])=>[t,t==="yaw"?e:e*m_])));Object.freeze({store:Wn({width:4.4,depth:3.6}),nursery:Wn({width:5.8,depth:5.9}),watchtower:Wn({width:4.8,depth:4}),training:Wn({width:5.7,depth:4.8}),palisade:Wn({width:7,depth:1})});Wn({x:-1.1825,z:-1.0664,yaw:0,width:7.68,depth:8.25});const g_=Wn({x:-6.45,z:.43,yaw:-.5,width:4.8,depth:5.2});Object.freeze({store:Wn({x:-6.0962,z:4.9054,yaw:0}),nursery:Wn({x:6.5601,z:-3.869,yaw:0}),watchtower:Wn({x:6.6295,z:5.3482,yaw:0}),training:Wn({x:-6.2831,z:-6.0974,yaw:0}),palisade:Wn({x:0,z:9.8,yaw:0})});const x_=Ms-.15,v_=6.8,ga=3.8,__=.9,Ou=(i,t)=>Number.isFinite(i)?i:t,y_=i=>i?.natural===!0||i?.mesh?.userData?.natural===!0,M_=Array.from({length:5},(i,t)=>Object.freeze({stage:t,unfinished:t<4,wallHeight:t===0?0:t===1?ga*.35:ga,keep:t>=3,gate:t===4})),b_=Object.freeze({stage:4,unfinished:!1,wallHeight:0,keep:!1,gate:!1});function Bu(i){if(y_(i))return b_;const t=i.mesh?.userData?.visualState,e=i.underConstruction??t?.underConstruction??!1,n=e?Math.max(0,Math.min(1,Ou(i.constructionProgress,Ou(t?.constructionProgress,0)))):1,s=e?Math.min(3,Math.floor(n*4)):4;return M_[s]}const vs=(i,t=0)=>Number.isFinite(i)?i:t,xa=(i,t,e)=>Math.max(t,Math.min(e,i)),hr=1e-6,S_=i=>i&&i.active!==!1;function w_(i,t){const e=Math.cos(i.yaw||0),n=Math.sin(i.yaw||0),s=t.x-i.x,r=t.z-i.z;return{x:e*s-n*r,y:t.y,z:n*s+e*r}}function Yo(i,t){const e=Math.cos(i.yaw||0),n=Math.sin(i.yaw||0);return{x:i.x+e*t.x+n*t.z,y:vs(t.y,i.floorY),z:i.z-n*t.x+e*t.z}}const Ud=(i,t,e=0)=>i.x>t.minX+e-hr&&i.x<t.maxX-e+hr&&i.z>t.minZ+e-hr&&i.z<t.maxZ-e+hr,wi=(i,t,e,n,s,r,o)=>({id:i,minX:t,maxX:e,minZ:n,maxZ:s,minY:r,maxY:o});function Hu(i,t,e=0){return t.outline?t.outline.every((s,r)=>{const o=t.outline[(r+1)%t.outline.length],a=o.x-s.x,l=o.z-s.z;return a*(i.z-s.z)-l*(i.x-s.x)>=Math.max(0,e)*Math.hypot(a,l)-hr})||e<0&&t.outline.some((s,r)=>E_(i,s,t.outline[(r+1)%t.outline.length])<e*e-hr):Ud(i,t,e)}function E_(i,t,e){const n=e.x-t.x,s=e.z-t.z,r=xa(((i.x-t.x)*n+(i.z-t.z)*s)/(n*n+s*s||1),0,1);return(i.x-t.x-n*r)**2+(i.z-t.z-s*r)**2}function T_(i,t){return i.outline=t.map(([e,n])=>({x:e,z:n})),i.minX=Math.min(...t.map(e=>e[0])),i.maxX=Math.max(...t.map(e=>e[0])),i.minZ=Math.min(...t.map(e=>e[1])),i.maxZ=Math.max(...t.map(e=>e[1])),i}function A_(i,{terrainHeight:t,minimumFloorY:e=.82}={}){const n=t||(()=>0),s={id:i.id,x:vs(i.x),z:vs(i.z),yaw:vs(i.yaw,Math.atan2(-i.x,-i.z)),team:i.team||"neutral",active:!0};let r=-1/0,o=1/0;for(let m=-3.75;m<=3.76;m+=1.25)for(let x=-3.25;x<=4.26;x+=1.25){const g=Yo(s,{x:m,z:x,y:0}),p=vs(n(g.x,g.z));r=Math.max(r,p),o=Math.min(o,p)}s.floorY=Math.max(e,r+.045),s.floorBottom=Math.min(o-.16,s.floorY-.22),s.roofBottom=s.floorY+2.25,s.roofTop=s.floorY+3.05,s.interior={minX:-3.1,maxX:3.1,minZ:-2.6,maxZ:.45},s.floor={minX:-3.75,maxX:3.75,minZ:-3.25,maxZ:4.1},s.entrance={x:1.55,z:4,minX:.3,maxX:2.8,minZ:3.35,maxZ:4,width:2.5,height:1.95},s.solids=[wi("floor",-3.75,3.75,-3.25,4.1,s.floorBottom,s.floorY),wi("left-wall",-3.75,-3.1,-3.25,4,s.floorY,s.roofBottom),wi("right-wall",3.1,3.75,-3.25,4,s.floorY,s.roofBottom),wi("back-wall",-3.75,3.75,-3.25,-2.6,s.floorY,s.roofBottom),wi("front-left",-3.75,.3,3.35,4,s.floorY,s.roofBottom),wi("front-right",2.8,3.75,3.35,4,s.floorY,s.roofBottom),wi("entrance-lintel",.3,2.8,3.35,4,s.floorY+1.95,s.roofBottom),wi("root-baffle",-.35,3.1,.45,1.05,s.floorY,s.roofBottom),wi("roof",-3.75,3.75,-3.25,4,s.roofBottom,s.roofTop)];const l={floor:[[-4.12,-2.2],[-3.45,-3.45],[2.9,-3.65],[4.1,-2.3],[4,3.4],[3.45,4.2],[-3.15,4.2],[-4.12,3.4]],roof:[[-4.12,-2.2],[-3.45,-3.45],[2.9,-3.65],[4.1,-2.3],[4,3.4],[3.45,4.22],[-3.15,4.45],[-4.12,3.4]],"left-wall":[[-3.1,-3.35],[-3.1,4.3],[-3.95,3.4],[-4.05,-2.2]],"right-wall":[[3.1,-3.35],[3.95,-2.3],[3.85,3.4],[3.1,4.2]],"back-wall":[[-3.25,-2.6],[-3.5,-3.3],[2.9,-3.5],[3.3,-2.6]],"front-left":[[-3.3,3.35],[.3,3.35],[.3,4.13],[-3.15,4.3]],"front-right":[[2.8,3.35],[3.3,3.35],[3.45,4],[2.8,4]],"root-baffle":[[-.35,.45],[3.1,.45],[3.1,1.05],[-.3,.98]]};for(const m of s.solids)T_(m,l[m.id]||[[m.minX,m.minZ],[m.maxX,m.minZ],[m.maxX,m.maxZ],[m.minX,m.maxZ]]);s.floor={...s.solids[0]},s.shellBounds={minX:Math.min(...s.solids.map(m=>m.minX)),maxX:Math.max(...s.solids.map(m=>m.maxX)),minZ:Math.min(...s.solids.map(m=>m.minZ)),maxZ:Math.max(...s.solids.map(m=>m.maxZ))};let c=4.5;const h=4.2;for(let m=0;m<3;m++){const x=Yo(s,{x:s.entrance.x,z:h+c,y:0});c=xa(Math.abs(s.floorY-n(x.x,x.z))/.32,4.5,14)}const u=Math.max(10,Math.ceil(c/.45)),d=6,f={minX:s.entrance.x-1.6,maxX:s.entrance.x+1.6,minZ:h,maxZ:h+c,rows:u,cols:d,heights:[],bottoms:[]};for(let m=0;m<=u;m++)for(let x=0;x<=d;x++){const g=m/u,p=f.minX+(f.maxX-f.minX)*x/d,v=f.minZ+c*g,y=Yo(s,{x:p,z:v,y:0}),_=Yo(s,{x:p,z:f.maxZ,y:0}),T=vs(n(y.x,y.z)),A=s.floorY+(vs(n(_.x,_.z))-s.floorY)*g;f.heights.push(m===0?s.floorY:Math.max(T+(m===u?.005:.02),A)),f.bottoms.push(Math.min(T-.14,A-.18))}return s.ramp=f,s.radius=Math.max(6,Math.hypot(f.maxX,f.maxZ)),s}function R_(i,t){const e=i.ramp;if(!e||!Ud(t,e))return null;const n=xa((t.x-e.minX)/(e.maxX-e.minX)*e.cols,0,e.cols),s=xa((t.z-e.minZ)/(e.maxZ-e.minZ)*e.rows,0,e.rows),r=Math.min(e.cols-1,Math.floor(n)),o=Math.min(e.rows-1,Math.floor(s)),a=n-r,l=s-o,c=(m,x)=>e.heights[x*(e.cols+1)+m],h=c(r,o),u=c(r+1,o),d=c(r,o+1),f=c(r+1,o+1);return a+l<=1?h+(u-h)*a+(d-h)*l:f+(d-f)*(1-a)+(u-f)*(1-l)}function C_(i,t,e,{y:n}={}){let s=null;for(const r of i||[]){if(!S_(r)||Math.hypot(t-r.x,e-r.z)>r.radius+1)continue;const o=w_(r,{x:t,z:e}),a=r.solids.find(u=>u.id==="roof");let l=null,c="floor";Hu(o,r.floor)&&(l=r.floorY);const h=R_(r,o);h!==null&&(l===null||h>l)&&(l=h,c="ramp"),Number.isFinite(n)&&n>=r.roofTop-.06&&Hu(o,a)&&(l=r.roofTop,c="roof"),l!==null&&(!s||l>s.height)&&(s={height:l,type:c==="roof"?"rock":"land",platform:r,refuge:r,surface:c})}return s}const rh=(i,t,e)=>Math.max(t,Math.min(e,i)),ni=(i,t,e)=>{const n=rh((e-i)/(t-i),0,1);return n*n*(3-2*n)},qi=-.035;function P_(i,t){if(!Number.isFinite(i)||!Number.isFinite(t))return .91;const e=Math.max(0,t-.215-i);return .91-.63*ni(.1,.6,e)}const D_=Object.freeze({pond:{id:"pond",x:0,z:0,radius:8,label:"Λιμνούλα των νούφαρων",description:"Μύγες, ανθισμένα φύλλα και χαμηλές διαδρομές πάνω από το νερό.",hint:"Παρατήρησε πού μαζεύονται οι μύγες.",findPoint:{x:6.5,z:3}},creek:{id:"creek",x:8,z:-24,radius:7,label:"Το στενό ρυάκι",description:"Το ρεύμα αλλάζει τις διαδρομές και μεταφέρει την τροφή.",hint:"Ακολούθησε την κίνηση του νερού.",findPoint:{x:4,z:-29}},bank:{id:"bank",x:27,z:8,radius:7,label:"Η όχθη με τα βότσαλα",description:"Ψηλά βράχια, κρυψώνες και εκτεθειμένα περάσματα.",hint:"Οι καλαμιές κρύβουν μια δεύτερη προσέγγιση.",findPoint:{x:30,z:6}},roots:{id:"roots",x:24,z:-16,radius:5,label:"Το πέρασμα στις ρίζες",description:"Ένα φυσικό άνοιγμα που αποκαλύπτεται όταν χαμηλώνει το νερό.",hint:"Μικρά έντομα χάνονται κάτω από τις καμπύλες ρίζες.",findPoint:{x:31,z:-16}}});function I_(i){const t=e=>({...e,...i.toWorld(e.x,e.z)});return{landmarks:Object.values(D_).map(e=>({...t(e),findPoint:t(e.findPoint)})),nest:t({id:"creek-nest",x:17,z:16,radius:4,label:"Κοιλότητα κάτω από τις ρίζες"}),refuges:[{id:"willow-crevice",x:-20,z:7,label:"Κρυψώνα της πεσμένης ιτιάς"},{id:"bank-crevice",x:34,z:-9,label:"Κοιλότητα της πετρώδους όχθης"}].map(e=>({...t(e),yaw:Math.atan2(-e.x,-e.z)+i.yaw})),cover:[{id:"nest-reeds",x:14,z:20,radius:3.1},{id:"root-reeds",x:18,z:-7,radius:3},{id:"bank-reeds",x:29,z:11,radius:3.3},{id:"creek-reeds",x:18,z:-22,radius:3}].map(t)}}function Nd(i){return 6+Math.sin(i*.035)*9}function z_(i,t,e=0,n=[]){const s=Math.abs(i-Nd(t));let r=-1.9+ni(6,17,s)*3.5+e*.22;r+=ni(20,55,s)*(.4+Math.sin(t*.04+.6)**2*1.2);const o=1-ni(11,20,Math.hypot(i*.95,t*.8));r=r*(1-o)+(-2.65+e*.2)*o;for(const l of n){const c=Math.hypot(i-l.x,t-l.z),u=l.radius*(1+.045*Math.sin(Math.atan2(t-l.z,i-l.x)*5+(l.shorePhase||0))),d=1-ni(u*.46,u+5,c);d>0&&(r=Math.max(r,r*(1-d)+l.elevation*d))}const a=(1-ni(1.9,4.7,Math.abs(t+16)))*ni(9,14,i)*(1-ni(31,36,i));return r=r*(1-a)+Math.min(r,-.18+e*.025)*a,r+=ni(190,235,Math.max(Math.abs(i),Math.abs(t)))*4,r}function L_(i,t,e,n=.45){const s=i.toSource(t,e),r=Math.abs(s.x-Nd(s.z)),o=rh(Number(n)||0,0,1.5)*(1-ni(5,17,r))*(.55+.45*ni(5,23,Math.abs(s.z)));if(o<=0)return{x:0,z:0,strength:0};const a=.315*Math.cos(s.z*.035),l=Math.hypot(a,1),c=i.toWorld(0,0),h=i.toWorld(a/l,1/l);return{x:(h.x-c.x)*o,z:(h.z-c.z)*o,strength:o}}function U_({group:i,layout:t,terrainHeight:e,surface:n,insertPlatform:s,materials:r,rockGeos:o,tube:a,leafGeometry:l,bladeGeometry:c,geography:h}){const u=new te;u.name="Natural creek discoveries",i.add(u);const d=[],f=new We,m=new Map,x=new Yn(1,11,7),g=new Ve({color:"#e0c58b",roughness:.68}),p=new Ve({color:"#698d9d",roughness:.65}),v=l(.55,.38,.11),y=r.leaf.clone();y.color.set("#adc68a");const _=(H,q,B)=>{const O=t.toWorld(H,q);return[O.x,B,O.z]},T=h.landmarks.find(H=>H.id==="roots"),A=e(T.x,T.z);for(const H of[-.48,.45]){const q=a([[0,-.1,-4.1],[-.3,2.3,-2.6],[.2,3.7,0],[.35,2.5,2.7],[0,-.1,4.2]].map(B=>_(24+B[0]+H,-16+B[2],A+B[1])),.48,r.bark,24,.14);q.name="Passable willow root arch",q.castShadow=!0,q.receiveShadow=!0,u.add(q)}for(const H of[-1,1])for(let q=0;q<4;q++){const B=-16+H*(3.4+q*.45),O=24+(q-1.5)*1.1,Q=t.toWorld(O,B),W=t.toWorld(O-4.5,B+H*1.5),ft=a([[Q.x,e(Q.x,Q.z)+.8,Q.z],[(Q.x+W.x)/2,e(W.x,W.z)+.45,(Q.z+W.z)/2],[W.x,e(W.x,W.z)-.05,W.z]],.1+q*.025,r.bark,12,.75);ft.castShadow=!0,u.add(ft)}const E=[{id:"creek-stone",x:4,z:-29,r:1.8,height:3.5},{id:"root-approach",x:18,z:-7,r:1.65,height:1.65},{id:"root-perch",x:24,z:-11,r:1.7,height:2},{id:"bank-perch",x:30,z:6,r:2,height:2.05},{id:"nest-perch",x:19,z:20,r:1.8,height:1.7},{id:"pond-perch",x:-5,z:8,r:1.7,height:3.5}],C=new Ve({color:"#c4d9ad",roughness:.82});for(const[H,q]of E.entries()){const B=t.toWorld(q.x,q.z),O=e(B.x,B.z),Q=q.height,W=new Zt(o[H%o.length],r.mossRock);W.name="Moss-covered grip outcrop",W.position.set(B.x,O,B.z),W.scale.set(q.r,Q,q.r),W.rotation.y=H*1.93,W.castShadow=!0,W.receiveShadow=!0,u.add(W);const ft=s({id:q.id,type:"rock",...B,y:O+Q*.76,radius:q.r*.72,visualRadius:q.r,scaleY:Q}),Vt=new Zt(x,C);Vt.name="Pale natural grip",Vt.position.set(B.x,ft.y+.045,B.z),Vt.scale.set(.22,.07,.22),u.add(Vt),d.push({id:q.id,...B,y:ft.y+.13,radius:ft.radius})}const S=c(123),b=new wn(S,r.plant,h.cover.length*84);b.name="Dense camouflage reed pockets";let U=0;for(const[H,q]of h.cover.entries())for(let B=0;B<84;B++){const O=B*2.399+H*.7,Q=Math.sqrt((B+.4)/84)*q.radius,W=q.x+Math.cos(O)*Q,ft=q.z+Math.sin(O)*Q;f.position.set(W,e(W,ft),ft),f.rotation.set(0,O,0),f.scale.set(1.2,1.65+B%5*.18,1.2),f.updateMatrix(),b.setMatrixAt(U++,f.matrix)}b.receiveShadow=!0,b.computeBoundingSphere(),u.add(b);function P(H,q,B){const O=new te;O.name=B?"Lost food and natural keepsakes":"Natural discovery";const Q=new Zt(v,y);Q.rotation.y=m.size*2.4%6.28,Q.receiveShadow=!0,O.add(Q);for(let W=0;W<(B?3:1);W++){const ft=new Zt(x,q.kind==="keepsake"||q.keepsakesCount?g:p);ft.position.set((W-1)*.15,.15+W%2*.035,.015),ft.scale.set(.22,.15,.18),ft.rotation.set(.2,W*.9,.1),ft.castShadow=!0,O.add(ft)}return O.userData.creekPoint={...q},u.add(O),m.set(H,O),O}function G(H,q){const B=new Set;for(const[O,Q]of[[!1,H.finds||[]],[!0,H.dropped||[]]])for(const W of Q){if(!Number.isFinite(W.x)||!Number.isFinite(W.z)||W.collected||W.visible===!1)continue;const ft=(O?"drop:":"find:")+W.id;B.add(ft);const Vt=m.get(ft)||P(ft,W,O);Vt.userData.creekPoint={...W},Vt.visible=!0,Vt.position.set(W.x,Math.max(n(W.x,W.z).height,q)+.07,W.z),Vt.updateMatrix()}for(const[O,Q]of m)B.has(O)||(Q.removeFromParent(),m.delete(O))}function j(H,q){for(const B of m.values()){const O=B.userData.creekPoint,Q=n(O.x,O.z),W=Q.type==="water";B.position.y=Math.max(Q.height,H)+.07+(W?Math.sin(q*1.5+O.x)*.025:0),B.rotation.z=W?Math.sin(q*.8+O.z)*.045:0,B.updateMatrix()}}return{group:u,grips:d,sync:G,update:j,resources:[x,g,p,v,y,C,S]}}function N_(i){const t=i.outline||[{x:i.minX,z:i.minZ},{x:i.maxX,z:i.minZ},{x:i.maxX,z:i.maxZ},{x:i.minX,z:i.maxZ}],e=t.length,n=[],s=[];for(const h of[i.minY,i.maxY])for(const u of t)n.push(u.x,h,u.z);for(let h=1;h<e-1;h++)s.push(0,h,h+1,e,e+h+1,e+h);for(let h=0;h<e;h++){const u=(h+1)%e;s.push(h,e+h,u,u,e+h,e+u)}const r=new we;r.setAttribute("position",new Gt(n,3)),r.setIndex(s);const o=r.toNonIndexed();r.dispose(),o.computeVertexNormals();const a=o.attributes.position,l=o.attributes.normal,c=[];for(let h=0;h<a.count;h++){const u=Math.abs(l.getY(h))>.5;c.push((u?a.getX(h):Math.abs(l.getX(h))>.5?a.getZ(h):a.getX(h))*.35,(u?a.getZ(h):a.getY(h))*.35)}return o.setAttribute("uv",new Gt(c,2)),o}function k_(i,{terrainHeight:t,materials:e,rockGeos:n,tube:s,leafGeometry:r,mergeStaticParts:o,teamColor:a}){const l=A_(i,{terrainHeight:t}),c=new te;c.name="Natural refuge "+(i.id||""),c.position.set(i.x,l.floorY,i.z),c.rotation.y=l.yaw;const h=[],u=e.leaf.clone(),d=e.rock.clone();d.color.set("#71816a"),h.push(u,d);const f=new te;f.name="Opaque rock and root cavity",c.add(f);const m=new te;m.name="Overhanging refuge slab",f.add(m);for(const E of l.solids){const C=N_(E),S=E.id==="root-baffle"?e.bark:E.id==="floor"?d:e.mossRock,b=new Zt(C,S);b.name="Refuge solid · "+E.id,b.userData.refugeSolid=E,b.position.y=-l.floorY,b.castShadow=!0,b.receiveShadow=!0,h.push(C),(E.id==="roof"?m:f).add(b)}const x=l.ramp,g=[],p=[];for(let E=0;E<=x.rows;E++)for(let C=0;C<=x.cols;C++){const S=E*(x.cols+1)+C;g.push(x.minX+(x.maxX-x.minX)*C/x.cols,x.heights[S]-l.floorY,x.minZ+(x.maxZ-x.minZ)*E/x.rows)}for(let E=0;E<x.rows;E++)for(let C=0;C<x.cols;C++){const S=E*(x.cols+1)+C,b=S+1,U=S+x.cols+1,P=U+1;p.push(S,U,b,b,U,P)}const v=[];for(let E=0;E<=x.cols;E++)v.push(E);for(let E=1;E<=x.rows;E++)v.push(E*(x.cols+1)+x.cols);for(let E=x.cols-1;E>=0;E--)v.push(x.rows*(x.cols+1)+E);for(let E=x.rows-1;E>0;E--)v.push(E*(x.cols+1));for(let E=0;E<v.length;E++){const C=v[E],S=v[(E+1)%v.length],b=g.length/3,U=b+1;g.push(g[C*3],x.bottoms[C]-l.floorY,g[C*3+2],g[S*3],x.bottoms[S]-l.floorY,g[S*3+2]),p.push(C,S,b,S,U,b)}const y=new we;y.setAttribute("position",new Gt(g,3)),y.setAttribute("uv",new Gt(Array.from({length:g.length/3},(E,C)=>[g[C*3]*.35,g[C*3+2]*.35]).flat(),2)),y.setIndex(p),y.computeVertexNormals(),h.push(y);const _=new Zt(y,e.mossRock);_.name="Terrain-joined natural refuge ledge",_.castShadow=!0,_.receiveShadow=!0,f.add(_);for(const E of[-1,1])for(let C=0;C<3;C++){const S=E*(3.6-C*.12),b=-2.4+C*2.3,U=s([[S,l.floorBottom-l.floorY,b+.55],[S+E*.08,.55,b+.35],[S-E*.12,1.8,b],[S-E*.45,2.6,b-.2]],.16+C*.045,e.bark,15,.48);U.castShadow=!0,h.push(U.geometry),f.add(U)}for(let E=0;E<5;E++){const C=-2.3+E*1.3,S=s([[-3.5,3.03,C],[-1.6,3.12,C-.2],[.5,3.1,C+.1],[3.4,3.04,C+.35]],.075+E%2*.045,e.bark,18,.35);S.castShadow=!0,h.push(S.geometry),m.add(S)}const T=[];for(let E=0;E<4;E++){const C=new te;C.name="Natural life "+E,T.push(C),m.add(C);for(let S=0;S<8+E*3;S++){const b=S*2.399+E*.7,U=Math.cos(b)*(2.1+S%3*.48),P=.35+Math.sin(b)*(2.1+S%4*.2),G=new Zt(r(.65+S%3*.15,.85,.12),u);h.push(G.geometry),G.position.set(U,3.07+S%3*.025,P),G.rotation.set((S%3-1)*.08,b,(S%2-.5)*.1),G.castShadow=!0,G.receiveShadow=!0,C.add(G)}o(C,h)}const A=new te;A.name="Dry leaves inside the root hollow",f.add(A);for(let E=0;E<8;E++){const C=new Zt(r(.3,.48,.045),u);h.push(C.geometry),C.position.set(Math.sin(E*2.4)*2,.025,-1.1+Math.cos(E*2.4)*.7),C.rotation.y=E*1.7,C.receiveShadow=!0,A.add(C)}return o(A,h),l.mesh=c,c.userData={id:i.id,natural:!0,radius:l.radius,owned:h,growth:T,leafMaterial:u,terrain:null,keepCollision:{rects:[]},trainingPoint:c.position.clone(),support:{x:i.x,z:i.z,y:l.floorY,type:"land",radius:0},team:i.team,refuge:l,refugeSolids:f,refugeRoof:m},kd(c,i,a),c}function kd(i,t={},e){const n=i.userData.visualState||{},s={...n,...t},r=rh(Math.floor(Number(s.nestLevel??s.level??s.tier??1)||0),0,3);return i.userData.visualState={team:s.team??"neutral",tier:s.tier??1,nestLevel:r,safe:s.safe!==!1,hp:s.hp,maxHp:s.maxHp,destroyed:!!s.destroyed},i.userData.team=i.userData.visualState.team,i.userData.level=r,i.userData.destroyed=!!s.destroyed,i.userData.refuge&&(i.userData.refuge.team=i.userData.team),i.userData.leafMaterial.color.set(e(i.userData.team)).lerp(new ee("#72964b"),.7),i.userData.growth.forEach((o,a)=>{o.visible=a<=r}),i.userData.collisionRevision=(i.userData.collisionRevision||0)+1,i}const Le=Math.PI*2,Zi=wc.clamp,ti=(i,t,e)=>(e=Zi((e-i)/(t-i),0,1),e*e*(3-2*e));function Ii(i){return()=>{i|=0,i=i+1831565813|0;let t=Math.imul(i^i>>>15,1|i);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}const Zo=(i,t)=>Math.sin(i*.213+Math.sin(t*.137)*1.9)*.48+Math.sin(t*.329-i*.079)*.27+Math.cos(i*.741+t*.533)*.13,ln=i=>new ee(i),pt=new We;new L(0,1,0);const Gu=[{sky:"#8aaab0",fog:"#819e91",earth:"#8b8a62",wet:"#43533b",deep:"#52634e",leaf:"#b5d28f",rock:"#a4a292",moss:"#89976c",bark:"#65513a",reed:"#b4a676",water:"#2c6258",nightWater:"#0c2b32"},{sky:"#91acbd",fog:"#8bada6",earth:"#82958a",wet:"#3c6257",deep:"#456b68",leaf:"#a0c9ad",rock:"#a7b5ae",moss:"#7f9b88",bark:"#605848",reed:"#aebca0",water:"#3b747b",nightWater:"#122c3b"},{sky:"#b4a58a",fog:"#a39b7e",earth:"#b09b6b",wet:"#685b3c",deep:"#626047",leaf:"#d0b46b",rock:"#b6a184",moss:"#9f9a6d",bark:"#78543b",reed:"#c8ad73",water:"#69765a",nightWater:"#25352b"},{sky:"#82989c",fog:"#738d81",earth:"#7a8064",wet:"#364f3b",deep:"#3e5c52",leaf:"#93b57d",rock:"#939b8b",moss:"#6b8664",bark:"#554934",reed:"#9b9d70",water:"#376b57",nightWater:"#112e29"}];function F_(i=0,t=731+Math.max(0,i)*7919){const e=Math.max(0,Math.floor(Number(i)||0)),n=e%8,[s,r]=[[1,0],[0,1],[-1,0],[0,-1]][n%4],o=n>=4?-1:1,a=(h,u)=>e?{x:s*h*o+r*u,z:-r*h*o+s*u}:{x:h,z:u},l=(h,u)=>e?{x:o*(s*h-r*u),z:r*h+s*u}:{x:h,z:u},c=Ii((Number(t)||731)^Math.imul(e,2654435761));return{index:e,seed:t,symmetry:n,yaw:n%4*Math.PI/2,toWorld:a,toSource:l,palette:{...Gu[e%Gu.length]},noiseOffset:e?{x:(c()-.5)*170,z:(c()-.5)*170}:{x:0,z:0}}}function oh(i,t,e=1){const n=document.createElement("canvas");n.width=n.height=i,t(n.getContext("2d"),i);const s=new Md(n);return s.colorSpace=In,s.wrapS=s.wrapT=yr,s.repeat.set(e,e),s.anisotropy=4,s}function bl(i,t=!1){const e=Ii(i);return oh(256,(n,s)=>{n.fillStyle=t?"#6c7155":"#8b8978",n.fillRect(0,0,s,s);for(let r=0;r<15e3;r++){const o=e()*s,a=e()*s,l=45+e()*110;n.fillStyle=t?`rgba(${l*.8},${l},${l*.61},${.12+e()*.28})`:`rgba(${l*1.06},${l},${l*.85},${.15+e()*.3})`,n.fillRect(o,a,.5+e()*3,.5+e()*3)}n.lineWidth=.7;for(let r=0;r<26;r++){n.strokeStyle=`rgba(31,36,28,${.06+e()*.15})`,n.beginPath();let o=e()*s;n.moveTo(0,o);for(let a=0;a<s;a+=10)o+=(e()-.5)*9,n.lineTo(a,o);n.stroke()}},1)}function O_(i){const t=Ii(i);return oh(512,(e,n)=>{const s=e.createRadialGradient(n*.5,n*.5,4,n*.5,n*.5,n*.54);s.addColorStop(0,"#588a39"),s.addColorStop(.6,"#6ca04a"),s.addColorStop(1,"#345d27"),e.fillStyle=s,e.fillRect(0,0,n,n);for(let r=0;r<9e3;r++)e.fillStyle=t()>.5?"rgba(185,214,109,.08)":"rgba(18,58,20,.06)",e.fillRect(t()*n,t()*n,t()*4+1,t()*4+1);for(let r=.18;r<Le-.18;r+=.31){const o=n*.5+Math.cos(r)*n*.49,a=n*.5+Math.sin(r)*n*.49;e.strokeStyle="rgba(191,204,117,.42)",e.lineWidth=1.8,e.beginPath(),e.moveTo(n*.5,n*.5),e.quadraticCurveTo(n*.5+Math.cos(r+.08)*n*.28,n*.5+Math.sin(r+.08)*n*.28,o,a),e.stroke();for(let l=.2;l<.9;l+=.15)for(const c of[-1,1])e.strokeStyle="rgba(186,211,124,.19)",e.lineWidth=.8,e.beginPath(),e.moveTo(n*.5+Math.cos(r)*n*l*.5,n*.5+Math.sin(r)*n*l*.5),e.lineTo(n*.5+Math.cos(r+c*.12)*n*(l+.1)*.5,n*.5+Math.sin(r+c*.12)*n*(l+.1)*.5),e.stroke()}for(let r=0;r<13;r++){const o=t()*Le,a=t()*n*.45;e.fillStyle="rgba(42,56,17,.16)",e.beginPath(),e.ellipse(n*.5+Math.cos(o)*a,n*.5+Math.sin(o)*a,t()*5+2,t()*3+1,o,0,Le),e.fill()}})}function B_(i){const e=document.createElement("canvas");e.width=e.height=256;const n=e.getContext("2d"),s=n.createImageData(256,256);for(let o=0;o<256;o++)for(let a=0;a<256;a++){const l=(o*256+a)*4,c=a*Le/256,h=o*Le/256,u=Math.cos(c*9+h*7)*.27+Math.cos(c*17-h*11)*.14+Math.sin(c*31+h*19)*.07,d=Math.sin(c*7+h*13)*.27+Math.sin(c*19-h*9)*.13+Math.cos(c*29+h*23)*.08;s.data[l]=128+u*110,s.data[l+1]=128+d*110,s.data[l+2]=245,s.data[l+3]=255}n.putImageData(s,0,0);const r=new Md(e);return r.wrapS=r.wrapT=yr,r.colorSpace=Ti,r}function Rc(i,t,e=.1,n=1){const s=Ii(n),r=i.attributes.position,o=new Float32Array(r.count*3),a=ln(t);for(let l=0;l<r.count;l++){const c=1+(s()-.5)*e;o[l*3]=a.r*c,o[l*3+1]=a.g*c,o[l*3+2]=a.b*c}return i.setAttribute("color",new cn(o,3)),i}function Ke(i,t,e,n=12,s=0){const r=new lo(i.map(a=>new L(...a))),o=new wa(r,n,t,5,!1);if(s){const a=o.attributes.position;for(let l=0;l<=n;l++){const c=r.getPointAt(l/n),h=1-s*l/n;for(let u=0;u<=5;u++){const d=l*6+u;a.setXYZ(d,c.x+(a.getX(d)-c.x)*h,c.y+(a.getY(d)-c.y)*h,c.z+(a.getZ(d)-c.z)*h)}}o.computeVertexNormals()}return new Zt(o,e)}function ei(i,t=[],e=new Set){i.updateMatrixWorld(!0);const n=new he().copy(i.matrixWorld).invert(),s=new Map;i.traverse(r=>{if(!r.isMesh||r.isInstancedMesh||e.has(r)||Array.isArray(r.material))return;const o=r.material.uuid;s.has(o)||s.set(o,{material:r.material,meshes:[]}),s.get(o).meshes.push(r)});for(const{material:r,meshes:o}of s.values()){if(o.length<2)continue;const a=o.map(h=>h.geometry.clone().applyMatrix4(new he().multiplyMatrices(n,h.matrixWorld))),l=Ri(a,!1);for(const h of a)h.dispose();if(!l)continue;const c=new Zt(l,r);c.castShadow=o.some(h=>h.castShadow),c.receiveShadow=!0,t.push(l);for(const h of o){h.removeFromParent();const u=t.indexOf(h.geometry);u>=0&&(t.splice(u,1),h.geometry.dispose())}i.add(c)}}function $i(i=1,t=1,e=.08){const n=[],s=[],r=[];for(let c=0;c<=3;c++)for(let h=0;h<=40;h++){const u=c/3,d=.22+h/40*(Le-.44),f=1+.027*Math.sin(d*7)+.016*Math.cos(d*13),m=Math.cos(d)*u*f,x=Math.sin(d)*u*f;n.push(m*i,e*(u*u)+.014*Math.sin(d*4)*u*u,x*t),s.push(m*.48+.5,x*.48+.5)}for(let c=0;c<3;c++)for(let h=0;h<40;h++){const u=c*41+h,d=u+40+1;r.push(u,u+1,d,d,u+1,d+1)}const l=new we;return l.setAttribute("position",new Gt(n,3)),l.setAttribute("uv",new Gt(s,2)),l.setIndex(r),l.computeVertexNormals(),l}function Sl(i){const t=Ii(i),e=28,n=[[-.47,.57],[-.2,.91],[.15,1],[.52,.86],[.71,.61],[.76,.08]],s=[],r=[],o=[],a=Array.from({length:e+1},(h,u)=>.87+.12*Math.sin(u*1.51+i)+t()*.12);a[e]=a[0];for(let h=0;h<n.length;h++)for(let u=0;u<=e;u++){const d=u/e*Le,f=n[h][1]*a[u],m=(Math.sin(d*5+i)+Math.sin(d*9-i))*.045;s.push(Math.cos(d)*f,n[h][0]+m*(h===5?.15:1),Math.sin(d)*f*.86),r.push(Math.cos(d)*f*.5+.5,Math.sin(d)*f*.5+.5)}for(let h=0;h<n.length-1;h++)for(let u=0;u<e;u++){const d=h*(e+1)+u,f=d+e+1;o.push(d,f,d+1,d+1,f,f+1)}const l=s.length/3;s.push(0,.764,0),r.push(.5,.5);for(let h=0;h<e;h++)o.push(l,(n.length-1)*(e+1)+h+1,(n.length-1)*(e+1)+h);const c=new we;return c.setAttribute("position",new Gt(s,3)),c.setAttribute("uv",new Gt(r,2)),c.setIndex(o),c.computeVertexNormals(),c}function Cc(i){const t=Ii(i),e=[],n=[],s=[],r=[];for(let a=0;a<5;a++){const l=t()*Le,c=.55+t()*.7,h=.1+t()*.35,u=.022+t()*.035,d=ln(a%2?"#819c42":"#526f33"),f=e.length/3;for(let m=0;m<=7;m++){const x=m/7,g=Math.cos(l)*h*x*x,p=Math.sin(l)*h*x*x,v=u*Math.sin(Math.PI*(x*.94+.04));for(const y of[-1,1])e.push(g+Math.cos(l+Math.PI/2)*v*y,x*c,p+Math.sin(l+Math.PI/2)*v*y),n.push(y*.5+.5,x),r.push(d.r*(.65+x*.35),d.g*(.65+x*.35),d.b*(.65+x*.35))}for(let m=0;m<7;m++){const x=f+m*2;s.push(x,x+1,x+2,x+1,x+3,x+2)}}const o=new we;return o.setAttribute("position",new Gt(e,3)),o.setAttribute("uv",new Gt(n,2)),o.setAttribute("color",new Gt(r,3)),o.setIndex(s),o.computeVertexNormals(),o}function H_(){const i=new wa(new lo([new L,new L(.03,.8,.015),new L(.1,1.8,.04)]),9,.013,5,!1);Rc(i,"#64754a",.15,8);const t=new Yn(1,7,7);t.scale(.065,.25,.065),t.translate(.1,1.61,.04),Rc(t,"#5d3f27",.3,5);const e=Cc(92);e.scale(.8,1.45,.8);const n=Ri([i,t,e],!1);return i.dispose(),t.dispose(),e.dispose(),n}function G_(i){const t=new Yn(1,13,9),e=t.attributes.position;for(let n=0;n<e.count;n++){const s=e.getX(n),r=e.getY(n),o=e.getZ(n),a=1+.06*Math.sin(s*12+i)*Math.sin(o*13-r*7);e.setXYZ(n,s*a,r*.83*a,o*a)}return t.computeVertexNormals(),t}function V_(){const i=[],t=[],e=[];function n(r,o,a,l){const c=i.length/3;i.push(...r,...o,...a);const h=ln(l);for(let u=0;u<3;u++)t.push(h.r,h.g,h.b);e.push(c,c+1,c+2)}n([0,.025,-.1],[-.045,0,0],[0,.04,.09],"#16201b"),n([0,.025,-.1],[0,.04,.09],[.045,0,0],"#293327"),n([0,0,0],[-.17,.025,-.035],[-.12,.015,.07],"#a0b3b0"),n([0,0,0],[.12,.015,.07],[.17,.025,-.035],"#a0b3b0");const s=new we;return s.setAttribute("position",new Gt(i,3)),s.setAttribute("color",new Gt(t,3)),s.setIndex(e),s.computeVertexNormals(),s}function Vr(i,t,e,n,{castShadow:s=!1,receiveShadow:r=!1,dynamic:o=!1}={}){const a=new te;a.name=n;const l=new Map,c=[],h=[],u=new Set,d=128;e.forEach((f,m)=>{const x=Math.floor(f.x/d)+":"+Math.floor(f.z/d);l.has(x)||l.set(x,[]),l.get(x).push(m)});for(const[f,m]of l){const x=new wn(i,t,m.length);x.name=n+" · "+f,x.castShadow=s,x.receiveShadow=r,x.userData.spatialChunk=!0,x.userData.chunkSpan=d,o&&x.instanceMatrix.setUsage(Ai),m.forEach((g,p)=>{c[g]={mesh:x,index:p}}),a.add(x),h.push(x)}return{group:a,meshes:h,count:e.length,setMatrixAt(f,m){const x=c[f];x.mesh.setMatrixAt(x.index,m),u.add(x.mesh)},setColorAt(f,m){const x=c[f];x.mesh.setColorAt(x.index,m)},finish(){for(const f of h)f.computeBoundingBox(),f.computeBoundingSphere(),f.boundingSphere.radius+=.75,f.instanceMatrix.needsUpdate=!0,f.instanceColor&&(f.instanceColor.needsUpdate=!0);u.clear()},flush(){for(const f of u)f.instanceMatrix.needsUpdate=!0;u.clear()}}}function W_(i,t,e={}){const n=Math.max(0,Math.floor(Number(e.regionIndex)||0)),s=e.seed??731+n*7919,r=F_(n,s),o=r.palette,a=Ii(s),l=new te;l.name="The living creek",i.add(l);const c=e.natural===!0,h=c?I_(r):null,u=h?.landmarks||[],d=h?.nest||null,f=h?.cover||[],m=[],x=[];let g=qi,p=qi,v={flow:.45},y=!1,_=null;const T=[],A=[],E=new Set,C=new Map,S=new Set,b=[],U=new Map,P=6;let G=null;const j={reflectionRenders:0,reflectionSkips:0,flyMatricesUpdated:0,spatialChunks:0,terrainUpdates:0};new ee(o.sky);const H=new ee(o.fog);i.fog?i.fog.color.copy(H):i.fog=new Ma(H,.0042);const q=bl(s),B=bl(s+9,!0),O=O_(s),Q=B_();b.push(q,B,O,Q);const W={terrain:new Ve({color:16777215,vertexColors:!0,map:B,roughness:1}),leaf:new Ve({color:o.leaf,map:O,roughness:.44,metalness:.025,side:Pe}),rock:new Ve({color:o.rock,map:q,roughness:.89}),mossRock:new Ve({color:o.moss,map:B,roughness:.94}),plant:new Ve({color:16777215,vertexColors:!0,roughness:.87,side:Pe}),bark:new Ve({color:o.bark,map:q,roughness:.94}),reed:new Ve({color:o.reed,map:q,roughness:.83}),compost:new Ve({color:"#57422e",map:B,roughness:1}),fruit:new Ve({color:"#b38539",map:q,roughness:.75}),darkFruit:new Ve({color:"#685831",map:B,roughness:.95})},ft=[Sl(7),Sl(35),Sl(89)],Vt=$i(),Me=G_(19),ce=[{id:"home",x:8,z:8,radius:7.4,team:"neutral",name:"Willow Haven"},{id:"mudfang",x:-31,z:-30,radius:7,team:"enemy",name:"Mudfang Den"},{id:"redreed",x:31,z:-56,radius:7.6,team:"enemy",name:"Red Reed Stronghold"},{id:"mossjaw",x:-24,z:49,radius:7.1,team:"enemy",name:"Mossjaw Hollow"},{id:"blackpool",x:34,z:79,radius:8,team:"enemy",name:"Blackwater Nest"},{id:"thornback",x:-8,z:-91,radius:8,team:"enemy",name:"Thornback Root"},{id:"oldwillow",x:-38,z:96,radius:7.5,team:"neutral",name:"Αυλή της Γέρικης Ιτιάς"},{id:"quietbend",x:29,z:32,radius:6.8,team:"neutral",name:"Quiet Bend"},{id:"foxglove",x:-39,z:2,radius:6.8,team:"neutral",name:"Foxglove Island"},{id:"reedcrossing",x:3,z:-45,radius:6.8,team:"neutral",name:"Πέρασμα των Καλαμιών"},{id:"longreed",x:-4,z:67,radius:6.8,team:"neutral",name:"Νησίδα των Ανέμων"},{id:"eastshallows",x:58,z:35,radius:6.8,team:"neutral",name:"Ανατολικές Αβαθείς"}],ht={home:.65,mudfang:2.7,redreed:4.1,mossjaw:1.8,blackpool:5.2,thornback:7.1,oldwillow:2.9,quietbend:1.2,foxglove:2.1,reedcrossing:1.7,longreed:2.5,eastshallows:3.4},Y=Ii(s^3582759),rt={home:{x:17,z:16,radius:7.4,elevation:.65},mudfang:{x:38,z:-19,radius:9,elevation:1.35},redreed:{x:-37,z:-46,radius:11,elevation:1.2},mossjaw:{x:-34,z:44,radius:11,elevation:1.05},blackpool:{x:40,z:86,radius:12,elevation:1.5},thornback:{x:-16,z:-120,radius:12,elevation:1.65}};for(const M of ce){const z=rt[M.id],k=c&&z?{x:z.x,z:z.z}:{x:M.x*ge,z:M.z*ge};Object.assign(M,r.toWorld(k.x,k.z)),M.radius=c?z?.radius||10:Math.max(36,M.radius*(M.id==="thornback"?5.8:4.9)),M.elevation=c?z?.elevation||1.1:Math.max(.45,ht[M.id]+(n?(Y()-.5)*.6:0)),M.shorePhase=k.x+(n?Y()*Le:0),n&&(M.yaw=r.yaw)}ce.find(M=>M.id==="thornback").stronghold=!0;const yt=[{id:"haven",name:"Απάνεμη Όχθη",x:0,z:12,radius:30,tint:"#77965d"},{id:"reedways",name:"Περάσματα των Καλαμιών",x:2,z:-50,radius:45,tint:"#a99d64"},{id:"westernroots",name:"Δυτικές Ρίζες",x:-34,z:22,radius:37,tint:"#657f67"},{id:"blackwater",name:"Βαθύ Νερό",x:10,z:75,radius:34,tint:"#496f79"}].map(M=>({...M,...r.toWorld(M.x*ge,M.z*ge),radius:M.radius*ge})),Xt={heron:r.toWorld(34*ge,14*ge),snake:r.toWorld(-38*ge,-22*ge),fish:r.toWorld(12*ge,48*ge)},kt={heron:r.toWorld(43*ge,-73*ge),snake:r.toWorld(-39*ge,70*ge),fish:r.toWorld(11*ge,94*ge)};c&&(Object.assign(Xt,{heron:r.toWorld(34,15),snake:r.toWorld(-26,-23),fish:r.toWorld(5,-34)}),Object.assign(kt,{heron:r.toWorld(41,-70),snake:r.toWorld(-34,62),fish:r.toWorld(7,106)}));const fe=c?ce.map(M=>({...M,...r.toSource(M.x,M.z)})):[];function Ee(M,z){const k=r.toSource(M,z),F=k.x/ge,N=k.z/ge;if(c)return z_(k.x,k.z,Zo(k.x+r.noiseOffset.x,k.z+r.noiseOffset.z),fe);const V=Math.sin(N*.032)*15+Math.sin(N*.073)*5,Z=Math.abs(F-V);let X=-2.2+Zo(k.x+r.noiseOffset.x,k.z+r.noiseOffset.z)*.47+ti(44,71,Z)*6;X+=ti(47,72,Z)*(1.5+3.3*Math.sin(N*.036+.7)**2),X+=ti(105,132,Math.abs(N))*4.8;let it=null,dt=0;for(const Nt of ce){const re=M-Nt.x,Re=z-Nt.z,Ce=Math.hypot(re,Re),me=r.toSource(re,Re),en=Nt.radius*(1+.05*Math.sin(Math.atan2(me.z,me.x)*5+Nt.shorePhase));if(Ce<en+7){const Je=p_,an=Nt.elevation-ti(Je,en+7,Ce)*(Nt.elevation+2.8);X=Math.max(X,an);const gn=1-ti(Je,Je+8,Ce);gn>dt&&(it=Nt,dt=gn)}}it&&(X=X*(1-dt)+it.elevation*dt);let At=null,$t=0,zt=1/0;for(const Nt of C.values()){const re=Math.hypot(M-Nt.x,z-Nt.z),Re=1-ti(gs,gs+$o,re);(Re>$t||Re===$t&&Re>0&&re<zt)&&(At=Nt,$t=Re,zt=re)}if(At){const Nt=X*(1-$t)+At.elevation*$t;X=$t===1?At.elevation:Math.max(X,Nt)}return X}const I=new Ci(270*ge,270*ge,216,216);I.rotateX(-Math.PI/2);const ne=I.attributes.position,Yt=new Float32Array(ne.count*3),qt=ln(o.earth),Lt=ln(o.wet),se=ln(o.deep);for(let M=0;M<ne.count;M++){const z=ne.getX(M),k=ne.getZ(M),F=Ee(z,k);ne.setY(M,F);const N=se.clone().lerp(Lt,ti(-1.7,.05,F)).lerp(qt,ti(.02,2,F));N.multiplyScalar(.88+Zo(z*2,k*2)*.18),N.toArray(Yt,M*3)}I.setAttribute("color",new cn(Yt,3)),I.computeVertexNormals(),B.repeat.set(44*ge,44*ge);const mt=new Zt(I,W.terrain);mt.receiveShadow=!0,mt.name="Creek bed and island banks",l.add(mt);const bt=135*ge,le=270*ge/216,De=217;function D(M,z){const k=wc.clamp((M+bt)/le,0,216),F=wc.clamp((z+bt)/le,0,216),N=Math.min(215,Math.floor(k)),V=Math.min(215,Math.floor(F)),Z=k-N,X=F-V,it=V*De+N,dt=it+De,At=ne.getY(it),$t=ne.getY(it+1),zt=ne.getY(dt),Nt=ne.getY(dt+1);return Z+X<=1?At+Z*($t-At)+X*(zt-At):Nt+(1-Z)*(zt-Nt)+(1-X)*($t-Nt)}function w(M){const z=gs+$o+le*2;for(let k=0;k<ne.count;k++){const F=ne.getX(k),N=ne.getZ(k);if(Math.abs(F-M.x)>z||Math.abs(N-M.z)>z)continue;const V=Ee(F,N);ne.setY(k,V);const Z=se.clone().lerp(Lt,ti(-1.7,.05,V)).lerp(qt,ti(.02,2,V));Z.multiplyScalar(.88+Zo(F*2,N*2)*.18),Z.toArray(Yt,k*3)}ne.needsUpdate=!0,I.attributes.color.needsUpdate=!0,I.computeVertexNormals(),I.computeBoundingBox(),I.computeBoundingSphere(),j.terrainUpdates++}const tt=bl(s+9,!0);b.push(tt),W.mossRock.map=tt,W.compost.map=tt,W.darkFruit.map=tt;const at=new Ci(266*ge,266*ge,88,88),lt=new h_(at,{textureWidth:512,textureHeight:512,waterNormals:Q,sunDirection:new L(.6,.8,-.3),sunColor:16771517,waterColor:3039835,distortionScale:2.5,alpha:.91,fog:!0});lt.name="Reflecting creek",lt.rotation.x=-Math.PI/2,lt.position.y=qi,lt.material.transparent=!0,lt.material.depthWrite=!1,lt.renderOrder=-2,lt.material.uniforms.size.value=4.8,l.add(lt);const ot=lt.onBeforeRender;let Ut=0;lt.onBeforeRender=function(M,z,k){if(lt.material.uniforms.eye.value.setFromMatrixPosition(k.matrixWorld),Ut++%2){j.reflectionSkips++;return}j.reflectionRenders++,ot.call(this,M,z,k)};const ct=at.attributes.position.array.slice(),wt=[],Pt=new te,gt=[];Pt.name="Willow trunks and tangled roots",l.add(Pt);for(let M of[-1,1])for(let z=0;z<15;z++){const k=(-122+z*17+(a()-.5)*7)*ge,F=(M*(59+a()*15)+Math.sin(k/ge*.032)*15)*ge,{x:N,z:V}=r.toWorld(F,k),Z=Ee(N,V);if(Z<.2)continue;const X=new te;X.position.set(N,Z,V);const it=9+a()*14,dt=(a()-.5)*3,At=Ke([[0,-.8,0],[.25,it*.3,0],[dt,it*.72,.6],[dt*.8,it,1]],.68+a()*.65,W.bark,13,.72);At.castShadow=!0,X.add(At),wt.push(At.geometry);for(let $t=0;$t<5;$t++){const zt=$t/5*Le+a(),Nt=3+a()*4,re=Ke([[0,.7,0],[Math.cos(zt)*Nt*.45,.1,Math.sin(zt)*Nt*.45],[Math.cos(zt)*Nt,-.4,Math.sin(zt)*Nt]],.15+a()*.2,W.bark,9,.82);re.castShadow=!0,X.add(re),wt.push(re.geometry)}for(let $t=0;$t<4;$t++){const zt=a()*Le,Nt=it*(.5+a()*.3),re=3+a()*6,Re=Ke([[dt*.4,Nt,0],[Math.cos(zt)*re*.45,Nt+2,Math.sin(zt)*re*.45],[Math.cos(zt)*re,Nt+3,Math.sin(zt)*re]],.16+a()*.2,W.bark,10,.83);X.add(Re),wt.push(Re.geometry);for(let Ce=0;Ce<70;Ce++){const me=Math.sqrt(a())*4,en=a()*Le;gt.push({x:N+Math.cos(zt)*re+Math.cos(en)*me,y:Z+Nt+3+(a()-.5)*3-Math.abs(me)*.25,z:V+Math.sin(zt)*re+Math.sin(en)*me,angle:a()*Le,scale:.65+a()*.6})}}Pt.add(X)}ei(Pt,wt);const Rt=new we;Rt.setAttribute("position",new Gt([0,0,0,-.12,-.32,.035,0,-.38,.06,.12,-.32,.035,-.1,-.64,.02,0,-.76,.04,.1,-.64,.02,0,-1.05,0],3)),Rt.setAttribute("uv",new Gt([.5,0,0,.3,.5,.35,1,.3,0,.6,.5,.7,1,.6,.5,1],2)),Rt.setIndex([0,1,2,0,2,3,1,4,2,2,4,5,2,5,6,2,6,3,4,7,5,5,7,6]),Rt.computeVertexNormals(),Rc(Rt,"#69834d",.25,s);const jt=Vr(Rt,W.plant,gt,"Hanging willow foliage");gt.forEach((M,z)=>{pt.position.set(M.x,M.y,M.z),pt.rotation.set((a()-.5)*.8,M.angle,(a()-.5)*.7),pt.scale.setScalar(M.scale),pt.updateMatrix(),jt.setMatrixAt(z,pt.matrix)}),jt.finish(),l.add(jt.group),j.spatialChunks+=jt.meshes.length;function Ot(M){T.push(M);const z=Math.floor((M.x-M.radius)/P),k=Math.floor((M.x+M.radius)/P),F=Math.floor((M.z-M.radius)/P),N=Math.floor((M.z+M.radius)/P);for(let V=z;V<=k;V++)for(let Z=F;Z<=N;Z++){const X=V+":"+Z;U.has(X)||U.set(X,[]),U.get(X).push(M)}return M}const Et=[],ue=[[],[],[]];function $(M,z,k=1.35+a()*.9){const F=Ot({id:"p"+T.length,type:"lily",x:M,z,y:.105,radius:k*.91,visualRadius:k,angle:a()*Le,phase:a()*Le});return Et.push(F),F}function _t(M,z,k=1.3+a()*1.3,F=.65+a()*.65){const N=Math.floor(a()*3),V=Ot({id:"p"+T.length,type:"rock",x:M,z,y:F*.76-.05,radius:k*.72,visualRadius:k,scaleY:F,angle:a()*Le,variant:N});return ue[N].push(V),V}const Tt=r.toWorld(3.7,1),Ft=r.toWorld(-3.9,2.2);if($(0,0,3.1),$(Tt.x,Tt.z,2.3),_t(Ft.x,Ft.z,2.5,.9),c){const M=u.find(z=>z.id==="pond").findPoint;$(M.x,M.z,1.7)}function xt(M,z){const k=Math.hypot(z.x-M.x,z.z-M.z),F=Math.ceil(k/3.65),N=r.toSource(M.x,M.z),V=r.toSource(z.x,z.z);for(let Z=1;Z<F;Z++){const X=Z/F,{x:it,z:dt}=r.toWorld(N.x+(V.x-N.x)*X+Math.sin(X*Math.PI*3)*1.25,N.z+(V.z-N.z)*X);if(Ee(it,dt)>-.1)continue;const At=r.toSource(it,dt);c&&At.x>14&&At.x<32&&Math.abs(At.z+16)<3.7||(a()<.18?_t(it,dt,1.8+a()*.7,.65+a()*.55):$(it,dt,1.65+a()*.65))}}const ut={id:"origin",x:0,z:0},Bt=new Map(ce.map(M=>[M.id,M]));Bt.set("origin",ut);const Oe=[["origin","home"],["origin","foxglove"],["home","mudfang"],["home","quietbend"],["mudfang","reedcrossing"],["reedcrossing","redreed"],["reedcrossing","thornback"],["foxglove","mossjaw"],["quietbend","mossjaw"],["quietbend","eastshallows"],["mossjaw","longreed"],["longreed","blackpool"],["longreed","oldwillow"],["eastshallows","blackpool"],["redreed","thornback"]].map(([M,z])=>({from:M,to:z,start:Bt.get(M),end:Bt.get(z)}));for(const M of Oe)xt(M.start,M.end);if(c){const M=z=>u.find(k=>k.id===z);for(const[z,k]of[[ut,M("creek")],[M("creek"),M("roots")],[M("roots"),M("bank")],[M("bank"),d]])xt(z,k)}for(let M=0;M<1180;M++){const z=(a()-.5)*218*ge,k=((a()-.5)*108+Math.sin(z/ge*.032)*10)*ge,{x:F,z:N}=r.toWorld(k,z);if(Ee(F,N)>-.18)continue;const V=r.toSource(F,N);c&&V.x>14&&V.x<32&&Math.abs(V.z+16)<3.7||(U.get(Math.floor(F/P)+":"+Math.floor(N/P))||[]).some(X=>Math.hypot(X.x-F,X.z-N)<X.radius+1)||(a()<.15?_t(F,N,1.1+a()*2.3,.55+a()*1.2):$(F,N,1.1+a()*1.1))}for(const M of ce)Ot({id:"island-"+M.id,type:"land",x:M.x,z:M.z,y:M.elevation,radius:M.radius*.8});const ve=Vr(Vt,W.leaf,Et,"Veined water lily leaves",{castShadow:!0,receiveShadow:!0,dynamic:!0});Et.forEach((M,z)=>{pt.position.set(M.x,M.y,M.z),pt.rotation.set((a()-.5)*.04,M.angle,(a()-.5)*.035),pt.scale.set(M.visualRadius,1,M.visualRadius*(.89+a()*.18)),pt.updateMatrix(),ve.setMatrixAt(z,pt.matrix),ve.setColorAt(z,ln(["#b6cf8a","#88ac67","#749d59","#c0cc7e","#729958"][Math.floor(a()*5)]))}),ve.finish(),l.add(ve.group),j.spatialChunks+=ve.meshes.length,ue.forEach((M,z)=>{const k=Vr(ft[z],z===1?W.mossRock:W.rock,M,"Weathered waterline outcrops",{castShadow:!0,receiveShadow:!0});M.forEach((F,N)=>{pt.position.set(F.x,-.05,F.z),pt.rotation.set(0,F.angle,0),pt.scale.set(F.visualRadius,F.scaleY,F.visualRadius),pt.updateMatrix(),k.setMatrixAt(N,pt.matrix),k.setColorAt(N,ln("#ffffff").multiplyScalar(.7+a()*.4))}),k.finish(),l.add(k.group),j.spatialChunks+=k.meshes.length});const Tn=new we,Un=[],Ar=[],ri=[];for(let M=0;M<=9;M++){const z=M/9,k=Math.sin(z*Math.PI)*.16;for(const F of[-1,1])Un.push(F*k,.13*Math.sin(z*Math.PI)+.23*z*z,z*.65),Ar.push(F*.5+.5,z)}for(let M=0;M<9;M++){const z=M*2;ri.push(z,z+1,z+2,z+1,z+3,z+2)}Tn.setAttribute("position",new Gt(Un,3)),Tn.setAttribute("uv",new Gt(Ar,2)),Tn.setIndex(ri),Tn.computeVertexNormals();const Rr=new Ve({color:"#f4e5d5",roughness:.48,side:Pe}),Cr=Et.filter((M,z)=>z%23===5),os=new wn(Tn,Rr,Cr.length*13);let Is=0;for(const M of Cr)for(let z=0;z<13;z++)pt.position.set(M.x+.24,M.y+.045,M.z),pt.rotation.set(z>7?.1:0,z/8*Le,z>7?.1:0),pt.scale.setScalar(z>7?.67:1),pt.updateMatrix(),os.setMatrixAt(Is++,pt.matrix);l.add(os);const ki=[];for(let M=0;M<26e3;M++){const z=(a()-.5)*254*ge,k=(a()-.5)*254*ge,F=Ee(z,k);F<-.52||F>3.2||ce.some(N=>Math.hypot(N.x-z,N.z-k)<N.radius*.68)||Math.hypot(z,k)<8||ki.push({x:z,z:k,y:F,scale:.65+a()*2.2,angle:a()*Le})}const zs=Cc(44),oi=Vr(zs,W.plant,ki,"Curved river reeds",{receiveShadow:!0});ki.forEach((M,z)=>{pt.position.set(M.x,M.y,M.z),pt.rotation.set(0,M.angle,0),pt.scale.set(.65+M.scale*.25,M.scale,.65+M.scale*.25),pt.updateMatrix(),oi.setMatrixAt(z,pt.matrix),oi.setColorAt(z,ln("#ffffff").multiplyScalar(.75+a()*.5))}),oi.finish(),l.add(oi.group),j.spatialChunks+=oi.meshes.length;const Ls=ki.filter((M,z)=>M.y<.5&&z%5===0),za=H_(),Fi=Vr(za,W.plant,Ls,"Cattail patches");Ls.forEach((M,z)=>{pt.position.set(M.x+.12,M.y,M.z),pt.rotation.set(0,M.angle,0),pt.scale.setScalar(.7+M.scale*.4),pt.updateMatrix(),Fi.setMatrixAt(z,pt.matrix)}),Fi.finish(),l.add(Fi.group),j.spatialChunks+=Fi.meshes.length;const po={value:0};W.plant.onBeforeCompile=M=>{M.uniforms.uCreekTime=po,M.vertexShader=`uniform float uCreekTime;
`+M.vertexShader,M.vertexShader=M.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
 transformed.x += sin(uCreekTime * 1.1 + position.y * 2.3 + instanceMatrix[3].x * .13 + instanceMatrix[3].z * .17) * pow(max(position.y, 0.0), 1.6) * .035;`)},W.plant.customProgramCacheKey=()=>"creek-wind-1";function as(M,z){const k=c?g-.065:-.1;let F=D(M,z),N=F>k?"land":"water",V=null;F<=k&&(F=c?g-.215:-.25);const Z=U.get(Math.floor(M/P)+":"+Math.floor(z/P))||[];for(const X of Z){if(X.type==="land")continue;const it=Math.hypot(M-X.x,z-X.z);if(it<=X.radius){let dt=X.y;if(X.type==="rock"&&(dt-=ti(X.radius*.62,X.radius,it)*.14*X.scaleY),c&&dt<=k)continue;dt>F&&(F=dt,N=X.type==="shelter"?"land":X.type,V=X)}}return C_(x,M,z)||{height:F,type:N,platform:V}}function Pr(M,z){return as(M,z).height}const Us=[{x:4.5/ge,z:-4/ge,rich:!1},{x:-10,z:12,rich:!0},{x:15,z:-20,rich:!1},{x:-25,z:-23,rich:!0},{x:26,z:-47,rich:!0},{x:-17,z:40,rich:!0},{x:27,z:69,rich:!0},{x:-4,z:-81,rich:!0},{x:-34,z:86,rich:!0},{x:23,z:26,rich:!1},{x:-33,z:7,rich:!1},{x:4,z:51,rich:!1},{x:9,z:-59,rich:!1},{x:-12,z:76,rich:!1},{x:39,z:-4,rich:!1},{x:-42,z:-59,rich:!0},{x:7,z:-39,rich:!0},{x:0,z:63,rich:!0},{x:53,z:33,rich:!0},{x:-24,z:17,rich:!1},{x:17,z:-70,rich:!1},{x:18,z:90,rich:!0}].map(M=>({...M,...r.toWorld(M.x*ge,M.z*ge)}));if(c)for(const[M,z]of[{x:4.5,z:-4},{x:18,z:14},{x:9,z:-24},{x:26,z:10},{x:31,z:-16},{x:-20,z:-8}].entries())Object.assign(Us[M],r.toWorld(z.x,z.z));const R=[],K=[],et=[],nt=new te;l.add(nt);for(let M=0;M<Us.length;M++){const z=Us[M];Ee(z.x,z.z)<-.15&&_t(z.x,z.z,z.rich?3.2:2.2,.62);const F=Pr(z.x,z.z),N={id:"flies-"+M,x:z.x,z:z.z,y:F+.25,flies:z.rich?240:100,maxFlies:z.rich?240:100,rich:z.rich};if(c){const Z=[...u].sort((X,it)=>Math.hypot(z.x-X.x,z.z-X.z)-Math.hypot(z.x-it.x,z.z-it.z))[0]?.id||"creek";N.ecology={habitat:Z,activity:1},N.regenMultiplier=1}A.push(N);const V=new Zt(ft[M%3],W.compost);V.position.set(z.x,F+.05,z.z),V.scale.set(z.rich?1.7:1.05,.28,z.rich?1.25:.75),V.rotation.y=a()*Le,l.add(V),K.push(V);for(let Z=0;Z<(z.rich?12:6);Z++){const X=a()*Le,it=a()*(z.rich?1.5:.85),dt=.12+a()*.16;R.push({spot:M,groundOffset:dt,x:z.x+Math.cos(X)*it,y:F+dt,z:z.z+Math.sin(X)*it,scale:.12+a()*.18,rot:a()*Le})}for(let Z=0;Z<3;Z++){const X=a()*Le,it=.7+a()*.8,dt=Ke([[0,0,0],[it*.5,.02,.06],[it,.04,.14]],.035,W.bark,4);dt.position.set(z.x+(a()-.5)*1.6,F+.1,z.z+(a()-.5)*1.6),dt.rotation.y=X,nt.add(dt),et.push(dt.geometry)}}ei(nt,et);for(const M of Us)if(Ee(M.x,M.z)<-.15){const z=ue.flat().find(k=>Math.abs(k.x-M.x)<.01&&Math.abs(k.z-M.z)<.01);if(z){const k=new Zt(ft[z.variant],W.mossRock);k.position.set(z.x,-.05,z.z),k.rotation.y=z.angle,k.scale.set(z.visualRadius,z.scaleY,z.visualRadius),k.castShadow=!0,k.receiveShadow=!0,l.add(k)}}const J=new wn(Me,W.fruit,R.length);R.forEach((M,z)=>{pt.position.set(M.x,M.y,M.z),pt.rotation.set(.3,M.rot,.2),pt.scale.setScalar(M.scale),pt.updateMatrix(),J.setMatrixAt(z,pt.matrix),J.setColorAt(z,ln(["#cb9d59","#6d7341","#aa7044","#c5ad62"][z%4]))}),l.add(J);const vt=[];for(let M=0;M<A.length;M++)for(let z=0;z<(A[M].rich?65:30);z++)vt.push({spot:M,phase:a()*Le,phase2:a()*Le,r:.25+a()*(A[M].rich?2.3:1.35),height:.45+a()*1.9,speed:.65+a()*1.7,rank:z});const It=A.map(()=>[]);for(const M of vt)It[M.spot].push(M);const Ht=new Ve({vertexColors:!0,roughness:.45,side:Pe}),Dt=new wn(V_(),Ht,vt.length);Dt.instanceMatrix.setUsage(Ai),Dt.frustumCulled=!1,Dt.name="Fly swarms",Dt.count=0,l.add(Dt);const Kt=c?U_({group:l,layout:r,terrainHeight:D,surface:as,insertPlatform:Ot,materials:W,rockGeos:ft,tube:Ke,leafGeometry:$i,bladeGeometry:Cc,geography:h}):null;Kt&&m.push(...Kt.grips);function oe(M,z){return c&&as(M,z).type==="water"?L_(r,M,z,v.flow):{x:0,z:0,strength:0}}function Jt(M,z){return c&&f.some(k=>Math.hypot(M-k.x,z-k.z)<k.radius*.85)&&D(M,z)>g-.5}function be(M){g=M,lt.position.y=M,lt.updateMatrix(),os.position.y=M-qi,os.updateMatrix();for(const z of Et)z.y=.105+M-qi}function Ne(M={}){if(!c)return!1;v={...v,...M.phase||{}},p=qi+Zi(Number(v.waterOffset)||0,-.75,.65),y||(be(p),y=!0);for(const k of A){const F=k.ecology?.habitat===v.foodShift?1.4:typeof v.foodShift=="string"?.45:1;k.regenMultiplier=F,k.ecology.activity=F}const z=M.nest;if(z&&Number.isFinite(z.x)&&Number.isFinite(z.z)){const k={id:"living-creek-nest",x:z.x,z:z.z,team:"ally",natural:!0,nestLevel:z.level??0,safe:z.safe,hp:1,maxHp:1};_?ka(_,k):_=go(k)}return Kt.sync(M,g),!0}const Be=64,ke=new Ci(2,2),Te=new Em;ke.rotateX(-Math.PI/2),Te.index=ke.index,Te.attributes.position=ke.attributes.position,Te.attributes.uv=ke.attributes.uv;const Qt=new Float32Array(Be*3),Xe=new Float32Array(Be).fill(-100),Ae=new Float32Array(Be),yn=new Float32Array(Be*3);Te.setAttribute("aCenter",new ar(Qt,3)),Te.setAttribute("aStart",new ar(Xe,1)),Te.setAttribute("aSize",new ar(Ae,1)),Te.setAttribute("aTint",new ar(yn,3)),Te.instanceCount=Be;const xi=new $n({transparent:!0,depthWrite:!1,side:Pe,uniforms:{uTime:{value:0}},vertexShader:"attribute vec3 aCenter; attribute float aStart; attribute float aSize; attribute vec3 aTint; uniform float uTime; varying vec2 vUv; varying float vLife; varying vec3 vTint; void main(){vUv=uv; vLife=(uTime-aStart)/2.4; vTint=aTint; vec3 p=position*aSize*(.35+clamp(vLife,0.,1.)*3.8)+aCenter; gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}",fragmentShader:"varying vec2 vUv;varying float vLife;varying vec3 vTint;void main(){if(vLife<0.||vLife>1.)discard;float r=length(vUv-.5)*2.;float band=exp(-pow((r-.82)/(.026+vLife*.018),2.))* .58+exp(-pow((r-.64)/.026,2.))*.22;float a=band*pow(1.-vLife,1.6);gl_FragColor=vec4(vTint,a);}"}),pn=new Zt(Te,xi);pn.frustumCulled=!1,pn.renderOrder=2,l.add(pn);let ls=0,qe=0;const tn=1100,on=new Float32Array(tn*3),dn=new Float32Array(tn*3),mn=new Float32Array(tn),Oi=new Float32Array(tn),ai=Array.from({length:tn},()=>({life:0,max:1,vx:0,vy:0,vz:0,water:!0}));let Kd=0;const vi=new we;vi.setAttribute("position",new cn(on,3).setUsage(Ai)),vi.setAttribute("aColor",new cn(dn,3).setUsage(Ai)),vi.setAttribute("aSize",new cn(mn,1).setUsage(Ai)),vi.setAttribute("aAlpha",new cn(Oi,1).setUsage(Ai));const Jd=new $n({transparent:!0,depthWrite:!1,uniforms:{uScale:{value:500}},vertexShader:"attribute vec3 aColor;attribute float aSize;attribute float aAlpha;uniform float uScale;varying vec3 vColor;varying float vAlpha;void main(){vColor=aColor;vAlpha=aAlpha;vec4 mv=modelViewMatrix*vec4(position,1.);gl_Position=projectionMatrix*mv;gl_PointSize=clamp(aSize*uScale/max(.1,-mv.z),1.,35.);}",fragmentShader:"varying vec3 vColor;varying float vAlpha;void main(){vec2 p=gl_PointCoord-.5;float d=length(p)*2.;if(d>1.)discard;float shade=.6+.4*max(0.,1.-length(p-vec2(-.12,.12))*2.);gl_FragColor=vec4(vColor*shade,smoothstep(1.,.55,d)*vAlpha);}"}),La=new nm(vi,Jd);La.frustumCulled=!1,La.renderOrder=3,l.add(La);function Qd(M,z,k){const F=ls++%Be;Qt.set([M.x,c?(M.y??g)+.025:Math.max(-.005,(M.y??0)+.025),M.z],F*3),Xe[F]=qe,Ae[F]=.7+z*.7,ln(k??"#c2e1d5").toArray(yn,F*3);for(const V of["aCenter","aStart","aSize","aTint"])Te.attributes[V].needsUpdate=!0}function dh(M,z,k,F){const N=Math.min(90,Math.round(18+z*21)),V=ln(k??(F?"#b2d7ce":"#d5bc80"));for(let Z=0;Z<N;Z++){const X=Kd++%tn,it=ai[X],dt=a()*Le,At=(.6+a()*2.7)*Math.sqrt(z);it.life=it.max=.5+a()*.8,it.vx=Math.cos(dt)*At,it.vz=Math.sin(dt)*At,it.vy=(1.5+a()*4)*Math.sqrt(z),it.water=F,on.set([M.x+(a()-.5)*.3,(M.y??0)+.12,M.z+(a()-.5)*.3],X*3),V.clone().multiplyScalar(.85+a()*.3).toArray(dn,X*3),mn[X]=(.045+a()*.085)*(F?1:.8),Oi[X]=.9}vi.attributes.aColor.needsUpdate=!0,vi.attributes.aSize.needsUpdate=!0}function tf(M,z=1,k){z=Zi(z,.1,4),Qd({x:M.x,y:c?g+.01:.01,z:M.z},z,k),dh({x:M.x,y:c?g+.03:.03,z:M.z},z,k,!0)}function ef(M,z="#e9cb87",k=1){dh(M,k,z,!1)}function fh(M,z,k,F=1){const N=[],V=[],Z=[],X=[],it=Ii(F),dt=16,At=20;for(let zt=0;zt<=dt;zt++)for(let Nt=0;Nt<=At;Nt++){const re=Nt/At*2-1,Re=zt/dt,Ce=.5+Math.sqrt(Math.max(0,1-re*re))*k+.06*Math.sin(Re*23+re*5),me=re*M*(.97+.025*Math.sin(Re*19));N.push(me,Ce,(Re-.5)*z),V.push(Nt/At,zt/dt),ln("#809549").multiplyScalar(.85+it()*.23).toArray(X,X.length)}for(let zt=0;zt<dt;zt++)for(let Nt=0;Nt<At;Nt++){const re=zt*(At+1)+Nt,Re=re+At+1;Z.push(re,Re,re+1,Re,Re+1,re+1)}const $t=new we;return $t.setAttribute("position",new Gt(N,3)),$t.setAttribute("uv",new Gt(V,2)),$t.setAttribute("color",new Gt(X,3)),$t.setIndex(Z),$t.computeVertexNormals(),$t}function Ua(M,z,k){const F=new te,N=new Ve({color:"#a6bf76",map:O,vertexColors:!0,roughness:.78,side:Pe});k.push(N);const V=fh(1.75,3.8,1.95,s+Math.round(M*7));k.push(V);const Z=new Zt(V,N);Z.castShadow=!0,Z.receiveShadow=!0,F.add(Z);for(let X=0;X<8;X++){const it=-1.85+X*.53,dt=[];for(let $t=0;$t<=12;$t++){const zt=$t/12*Math.PI;dt.push([Math.cos(zt)*1.75,.5+Math.sin(zt)*1.96+.025,it+.025*Math.sin(zt*4)])}const At=Ke(dt,.038,W.reed,18);k.push(At.geometry),F.add(At)}for(let X of[-1,1])for(let it=0;it<5;it++){const dt=-1.6+it*.8,At=Ke([[X*1.68,-.08,dt],[X*1.7,.45,dt],[X*1.38,1.5,dt]],.052,W.bark,5);k.push(At.geometry),F.add(At)}for(let X=0;X<7;X++){const it=.16+X*.12,dt=Ke([[-1.65,it,-1.8],[0,it+.025,-1.88],[1.65,it,-1.8]],.036,W.reed,8);k.push(dt.geometry),F.add(dt)}return ei(F,k,new Set([Z])),F.scale.setScalar(M),F.userData.roof=Z,F}const Dr={player:"#8ecf75",friendly:"#8ecf75",ally:"#8ecf75",enemy:"#cf7554",neutral:"#ceb785"};function Ns(M){if(typeof M=="string"&&M.startsWith("enemy")){const z=["#e8aa70","#d8786b","#b9ad81","#a9a0d4","#8dc2b8"],k=parseInt(M.replace(/\D/g,""),10)||0;return z[k%z.length]}return Dr[M]||Dr.neutral}const Na=new Map;function mo(M){if(Na.has(M))return Na.get(M);const z=["player","ally","friendly"].includes(M),k=M==="neutral",F=(parseInt(String(M).replace(/\D/g,""),10)||0)%5,N=oh(256,(V,Z)=>{V.fillStyle="#eee9cb",V.fillRect(0,0,Z,Z);for(let it=0;it<256;it+=4)V.fillStyle=it%8?"#ded9bd":"#f3eed3",V.fillRect(it,0,1,Z),V.fillRect(0,it,Z,1);V.save(),V.translate(38,23),V.scale(2.8,2.8),V.fillStyle=z?"#194333":k?"#494633":"#472c29",V.strokeStyle="#fff2c9",V.lineWidth=2,V.beginPath(),V.moveTo(32,3),V.lineTo(59,14),V.lineTo(56,44),V.quadraticCurveTo(53,55,32,68),V.quadraticCurveTo(11,55,8,44),V.lineTo(5,14),V.closePath(),V.fill(),V.stroke(),V.lineWidth=3.2,V.lineCap="round",V.lineJoin="round";const X=it=>{V.beginPath(),it.forEach((dt,At)=>At?V.lineTo(...dt):V.moveTo(...dt)),V.stroke()};if(z)V.beginPath(),V.moveTo(43,20),V.bezierCurveTo(28,17,18,26,21,38),V.bezierCurveTo(24,48,35,47,40,37),V.bezierCurveTo(43,30,40,24,43,20),V.stroke(),X([[20,51],[37,27]]),X([[28,40],[23,32]]),X([[32,35],[39,34]]);else if(k)X([[24,27],[32,19],[40,27]]),X([[32,19],[32,49]]),X([[23,40],[32,49],[41,40]]);else if(F===0)X([[20,19],[27,31],[22,44]]),X([[44,19],[37,31],[42,44]]),X([[28,46],[36,46]]);else if(F===1)X([[22,18],[18,36],[32,49],[46,36],[42,18]]),X([[25,30],[32,36],[39,30]]);else if(F===2)for(const[it,dt]of[[21,20],[32,15],[43,20]])X([[it,dt],[it,49]]),X([[it-4,dt+6],[it+4,dt+6]]);else F===3?(V.beginPath(),V.moveTo(44,17),V.bezierCurveTo(15,9,11,48,32,52),V.bezierCurveTo(39,53,44,50,47,45),V.bezierCurveTo(29,43,26,26,44,17),V.stroke()):X([[18,24],[25,30],[32,17],[39,30],[46,24],[41,46],[23,46],[18,24]]);V.restore()});return N.wrapS=N.wrapT=Ki,Na.set(M,N),b.push(N),N}function nf(M,z,k=0){const F=new te;F.name="Woven reed courtyard and rooted foundations";const N=5.68;for(let V=0;V<43;V++){const Z=-5.58+V*.266,X=Math.sqrt(Math.max(0,N*N-Z*Z))*(.97+.02*Math.sin(V*1.7)),it=Ke([[-X,-.045,Z],[-X*.25,-.035,Z+.022],[X*.4,-.04,Z-.018],[X,-.045,Z+.015]],.077,W.bark,7);it.receiveShadow=!0,z.push(it.geometry),F.add(it)}for(let V=0;V<25;V++){const Z=-5.4+V*.45,X=Math.sqrt(Math.max(0,N*N-Z*Z))*.98,it=Ke([[Z,.018,-X],[Z+.025,.028,0],[Z-.018,.02,X]],.027,W.reed,10);z.push(it.geometry),F.add(it)}for(let V=0;V<16;V++){const Z=V/16*Le,X=Math.cos(Z)*5.1,it=Math.sin(Z)*5.1,dt=(D(M.position.x+(X*Math.cos(k)+it*Math.sin(k))*ie,M.position.z+(it*Math.cos(k)-X*Math.sin(k))*ie)-M.position.y)/ie,At=Ke([[X,Math.min(-.18,dt-.15),it],[X+.03,-.35,it-.02],[X,-.08,it]],.095,W.bark,5);z.push(At.geometry),F.add(At)}ei(F,z),M.add(F),M.userData.foundation=F}function sf(M,z){const k=new te,F=Ke([[0,0,0],[.04,1.6,0],[-.03,3.1,.02]],.047,W.bark,7);z.push(F.geometry),k.add(F);const N=new we,V=[0,2.93,0,.9,2.8,.09,1.13,2.12,.02,.6,2.25,-.03,0,2.18,0],Z=[0,1,1,1,1,0,.5,.1,0,0];N.setAttribute("position",new Gt(V,3)),N.setAttribute("uv",new Gt(Z,2)),N.setIndex([0,1,3,1,2,3,0,3,4]),N.computeVertexNormals();const X=new Ve({color:Ns(M),roughness:.8,side:Pe,map:mo(M)}),it=new Zt(N,X);return it.castShadow=!0,k.add(it),k.userData.flag=it,k.userData.emblemTeam=M,z.push(N,X),k}function rf(M,z,k){const F=x_,N=v_,V=ga,Z=.11,X=new te;X.name="Enclosed creek castle",M.add(X);const it=new te;it.name="Reinforced castle perimeter",M.add(it);const dt=Math.asin((N/2+.25)/F),At=44,$t=(Le-dt*2)/At,zt=[],Nt=[],re=2*(F+.65)*Math.tan($t/2)+.08;for(let st=0;st<At;st++){const St=dt+$t*(st+.5),ae=Math.sin(St)*F,je=Math.cos(St)*F;zt.push({x:ae,z:je,y:Z+V/2,w:re,h:V,d:__,ry:St});for(const He of[-.29,.29]){const pe=St+$t*He;zt.push({x:Math.sin(pe)*F,z:Math.cos(pe)*F,y:Z+V+.37,w:.76,h:.74,d:1.2,ry:pe})}Nt.push({x:Math.sin(St)*(F+.64),z:Math.cos(St)*(F+.64),y:Z+1.65,w:re*.7,h:3.1,d:.5,ry:St}),Nt.push({x:Math.sin(St)*(F+.4),z:Math.cos(St)*(F+.4),y:Z+3.5,w:re*1.01,h:.28,d:.9,ry:St})}const Re=[Math.PI/4,Math.PI*3/4,Math.PI*5/4,Math.PI*7/4],Ce=[];for(const st of Re){const St=Math.sin(st)*(F+.15),ae=Math.cos(st)*(F+.15);Ce.push({x:St,z:ae});for(let je=0;je<10;je++){const He=je/10*Le;zt.push({x:St+Math.sin(He)*1.42,z:ae+Math.cos(He)*1.42,y:Z+6.15,w:.6,h:.85,d:.66,ry:He})}}for(const st of[-1,1])zt.push({x:st*(N/2+.62),z:F,y:Z+2.8,w:1.24,h:5.6,d:2}),zt.push({x:st*(N/2+.62),z:F,y:Z+5.95,w:1.6,h:.7,d:2.35}),Nt.push({x:st*(N/2+.62),z:F+1.05,y:Z+2.4,w:1.32,h:4.8,d:.25});zt.push({x:0,z:F,y:Z+4.85,w:N+1.2,h:.78,d:1.75});const me=(st,St,ae,je)=>{const He=new Li(1,1,1),pe=new wn(He,je,ae.length);return k.push(He),pe.name=St,pe.castShadow=!0,pe.receiveShadow=!0,ae.forEach((nn,xf)=>{pt.position.set((nn.x||0)/ie,(nn.y||0)/ie,(nn.z||0)/ie),pt.rotation.set(nn.rx||0,nn.ry||0,nn.rz||0),pt.scale.set(nn.w/ie,nn.h/ie,nn.d/ie),pt.updateMatrix(),pe.setMatrixAt(xf,pt.matrix)}),st.add(pe),pe},en=me(X,"Continuous moss-stone walls and crenellations",zt,W.mossRock);en.userData.fullCount=zt.length,en.userData.firstCoursesCount=At*3,me(it,"Whole-ring stone buttresses and gate reinforcement",Nt,W.rock);const Je=new Rs(1,1.12,1,12,1),an=new wn(Je,W.mossRock,4);k.push(Je),an.name="Four castle defence towers",an.castShadow=!0,an.receiveShadow=!0,Ce.forEach((st,St)=>{pt.position.set(st.x/ie,(Z+2.9)/ie,st.z/ie),pt.rotation.set(0,Re[St],0),pt.scale.set(1.65/ie,5.8/ie,1.65/ie),pt.updateMatrix(),an.setMatrixAt(St,pt.matrix)}),X.add(an);const gn=$i(1,1,.28),Mn=new wn(gn,W.leaf,4);k.push(gn),Mn.name="Folded leaf tower roofs",Mn.castShadow=!0,Ce.forEach((st,St)=>{pt.position.set(st.x/ie,(Z+6.68)/ie,st.z/ie),pt.rotation.set(0,Re[St],0),pt.scale.set(2/ie,2.4/ie,2/ie),pt.updateMatrix(),Mn.setMatrixAt(St,pt.matrix)}),X.add(Mn);const jn=new te;jn.name="Working south castle gate",jn.position.set(0,Z/ie,F/ie),X.add(jn);const ks=[];for(const st of[-1,1]){const St=new te;St.position.x=st*N/(2*ie),St.name=st<0?"Left hinged gate":"Right hinged gate",jn.add(St);const ae=[],je=[],He=N/2;for(let pe=0;pe<7;pe++)ae.push({x:-st*((pe+.5)*He/7),y:V/2,z:0,w:He/7+.025,h:V-.08,d:.36});for(const pe of[.65,1.9,3.2])je.push({x:-st*He/2,y:pe,z:.23,w:He-.1,h:.22,d:.2});me(St,"Bound timber gate leaf",ae,W.bark),me(St,"Gate cross braces",je,W.reed),ks.push(St)}const cs=new te;cs.name="Breached gate fallen slabs",jn.add(cs),me(cs,"Broken gate timber",[{x:-1.45,y:.18,z:1.5,w:2.8,h:.3,d:3.5,ry:.18},{x:1.6,y:.23,z:.9,w:2.7,h:.35,d:3.2,ry:-.24}],W.bark);const zr=new Ci(1.7/ie,1.9/ie),Lr=new Ve({map:mo(z.team),color:Ns(z.team),side:Pe,roughness:.85});k.push(zr,Lr);const Fs=new Zt(zr,Lr);return Fs.name="Castle gate clan crest",Fs.position.set(0,(Z+5.2)/ie,(F+1.02)/ie),X.add(Fs),M.userData.fortification=X,M.userData.palisade=it,M.userData.gate=jn,M.userData.gateLeaves=ks,M.userData.fallenGate=cs,M.userData.gateCrest=Fs,M.userData.fortWalls=en,M.userData.fortTowers=an,M.userData.fortTowerRoofs=Mn,M.userData.fortificationGeometry={radius:F,gateWidth:N,wallHeight:V,gateDirection:{x:0,z:1},towerCount:4},X}function of(M){const z=Ua(1,Dr.ally,M);z.name="Stone keep beneath woven leaf roof",z.userData.groundWalls=[];const k=new te;k.name="Enclosed central keep";const F=(N,V,Z,X,it,dt,At=W.mossRock)=>{const $t=new Li(X,it,dt),zt=new Zt($t,At);M.push($t),zt.position.set(N,V,Z),zt.castShadow=!0,zt.receiveShadow=!0,k.add(zt),V-it/2<.03&&z.userData.groundWalls.push({minX:N-X/2,maxX:N+X/2,minZ:Z-dt/2,maxZ:Z+dt/2,height:V+it/2})};F(-1.6,.68,0,.26,1.36,3.45),F(1.6,.68,0,.26,1.36,3.45),F(0,.68,-1.65,3.05,1.36,.25);for(const N of[-1,1])F(N*1.14,.68,1.64,.9,1.36,.26);F(0,1.22,1.64,1.45,.28,.27);for(const N of[-1.23,1.23])for(const V of[-1.34,1.34]){F(N,1.36,V,.58,2.72,.58);for(const Z of[-.2,.2])for(const X of[-.2,.2])F(N+Z,2.83,V+X,.19,.3,.19,W.rock)}return ei(k,M),z.add(k),z}function ph(M){const z=gs+$o+3,k=N=>Math.hypot(N.x-M.x,N.z-M.z)<z,F=N=>[...C.values()].some(V=>Math.hypot(N.x-V.x,N.z-V.z)<gs-2);ki.forEach((N,V)=>{k(N)&&(pt.position.set(N.x,D(N.x,N.z),N.z),pt.rotation.set(0,N.angle,0),pt.scale.set(.65+N.scale*.25,N.scale,.65+N.scale*.25),F(N)&&pt.scale.setScalar(0),pt.updateMatrix(),oi.setMatrixAt(V,pt.matrix))}),oi.finish(),Ls.forEach((N,V)=>{k(N)&&(pt.position.set(N.x+.12,D(N.x,N.z),N.z),pt.rotation.set(0,N.angle,0),pt.scale.setScalar(F(N)?0:.7+N.scale*.4),pt.updateMatrix(),Fi.setMatrixAt(V,pt.matrix))}),Fi.finish(),A.forEach((N,V)=>{k(N)&&(N.y=as(N.x,N.z).height+.25,K[V].position.y=N.y-.2,K[V].updateMatrix())}),R.forEach((N,V)=>{k(N)&&(pt.position.set(N.x,A[N.spot].y-.25+N.groundOffset,N.z),pt.rotation.set(.3,N.rot,.2),pt.scale.setScalar(N.scale),pt.updateMatrix(),J.setMatrixAt(V,pt.matrix))}),J.instanceMatrix.needsUpdate=!0,J.computeBoundingBox(),J.computeBoundingSphere()}function mh(M,z){for(const N of C.values())if(Math.hypot(N.x-M,N.z-z)<.01)return N.elevation;const k=ce.find(N=>Math.hypot(N.x-M,N.z-z)<.01);let F=k?Math.fround(k.elevation):Math.max(.35,Pr(M,z));if(!k){const N=gs+le,V=Math.max(0,Math.floor((M-N+bt)/le)),Z=Math.min(216,Math.ceil((M+N+bt)/le)),X=Math.max(0,Math.floor((z-N+bt)/le)),it=Math.min(216,Math.ceil((z+N+bt)/le));for(let dt=X;dt<=it;dt++)for(let At=V;At<=Z;At++){const $t=dt*De+At;Math.hypot(ne.getX($t)-M,ne.getZ($t)-z)<=N&&(F=Math.max(F,ne.getY($t)))}}return F}function af(M){const z=mh(M.x,M.z),k={id:M.id,x:M.x,z:M.z,elevation:z};return C.set(M.id,k),w(k),ph(k),k}function go(M,z={}){if((c||M.natural===!0)&&!z.preview){const st=k_(M,{terrainHeight:D,materials:W,rockGeos:ft,tube:Ke,leafGeometry:$i,mergeStaticParts:ei,teamColor:Ns});return l.add(st),E.add(st),x.push(st.userData.refuge),st}const k=!!z.preview,F=k?null:af(M),N=new te;N.name="Shelter "+(M.id??""),N.position.set(M.x,F?.elevation??0,M.z),N.scale.setScalar(ie),N.userData.id=M.id,N.userData.radius=Ms,N.userData.owned=[],N.userData.terrain=F;const V=N.userData.owned;nf(N,V,Number.isFinite(M.yaw)?M.yaw:0),k||(N.userData.support=Ot({id:"shelter-"+M.id,type:"shelter",x:M.x,z:M.z,y:N.position.y+.11,radius:Ms-.2}),N.userData.landmark=Ot({id:"castle-land-"+M.id,type:"land",x:M.x,z:M.z,y:N.position.y,radius:gs+$o*.45})),rf(N,M,V);const Z=of(V);Z.position.set(-.55,.04,-.5),N.add(Z),N.userData.core=Z,N.userData.keepCollision={rects:Z.userData.groundWalls.map(st=>({minX:(st.minX+Z.position.x)*ie,maxX:(st.maxX+Z.position.x)*ie,minZ:(st.minZ+Z.position.z)*ie,maxZ:(st.maxZ+Z.position.z)*ie,height:(st.height+Z.position.y)*ie})),door:{x:Z.position.x*ie,z:(Z.position.z+1.64)*ie}};const X=sf(M.team,V);X.position.set(1.8,0,1.1),N.add(X),N.userData.banner=X;const it=new te;it.name="Additional sleeping leaves";const dt=Ua(.62,Dr[M.team],V);dt.position.set(-3,.01,.2),dt.rotation.y=-.5,it.add(dt),N.add(it),N.userData.extra=it;const At=new te;At.name="Hatchery";const $t=Ua(.52,Dr[M.team],V);$t.position.set(3.05,0,-1.8),$t.rotation.y=.7,At.add($t);for(let st=0;st<5;st++){const St=[];for(let je=0;je<=24;je++){const He=je/24*Le;St.push([3.05+Math.cos(He)*.74,.06+st*.065,-1.7+Math.sin(He)*.63])}const ae=Ke(St,.035,W.reed,25);V.push(ae.geometry),At.add(ae)}ei(At,V),N.add(At),N.userData.nursery=At;const zt=new te;zt.name="Leaf training yard and woven sparring dummies",zt.position.set(-2.9,.07,-3.2);for(let st=0;st<3;st++){const St=-.82+st*.8,ae=st%2?-.2:.2,je=new Zt($i(.46,.65,.04),W.leaf);je.position.set(St,.025,ae+.6),je.rotation.y=(st-1)*.35,V.push(je.geometry),zt.add(je);for(const pe of[-.21,.21]){const nn=Ke([[St+pe,-.02,ae-.25],[St+pe*.3,.48,ae-.3],[St,.96,ae-.25]],.035,W.bark,5);V.push(nn.geometry),zt.add(nn)}const He=Ke([[St-.4,.64,ae-.2],[St,.72,ae-.28],[St+.4,.64,ae-.2]],.041,W.reed,6);V.push(He.geometry),zt.add(He);for(let pe=0;pe<3;pe++){const nn=new Zt($i(.23,.37,.15),W.leaf);nn.position.set(St+(pe-1)*.06,.59,ae-.19),nn.rotation.set(Math.PI/2,(pe-1)*.25,(pe-1)*.3),V.push(nn.geometry),zt.add(nn)}for(const pe of[-.12,.12]){const nn=Ke([[St+pe,.89,ae-.22],[St+pe*1.45,1.09,ae-.22],[St+pe*.5,1.07,ae-.19],[St+pe,.89,ae-.22]],.025,W.reed,10);V.push(nn.geometry),zt.add(nn)}}for(const st of[-1.2,1.2]){const St=Ke([[st,-.04,-.65],[st*.98,.75,-.68],[st,.98,-.65]],.04,W.bark,5);V.push(St.geometry),zt.add(St)}for(let st=0;st<2;st++){const St=Ke([[-1.2,.45+st*.28,-.65],[0,.38+st*.28,-.7],[1.2,.45+st*.28,-.65]],.025,W.reed,10);V.push(St.geometry),zt.add(St)}ei(zt,V),N.add(zt),N.userData.training=zt,N.userData.trainingPoint=new L(M.x-2.9*ie,N.position.y+.12,M.z-2.5*ie);const Nt=new te;Nt.name="Leaf-wrapped food cache",Nt.position.set(-2.8,.04,2.2);const re=new wn(Me,W.fruit,15);for(let st=0;st<15;st++)pt.position.set(st%4*.32-.5,Math.floor(st/8)*.25+.15,Math.floor(st/4)%2*.35),pt.scale.setScalar(.22+st%3*.025),pt.rotation.set(st*.7,st*.4,0),pt.updateMatrix(),re.setMatrixAt(st,pt.matrix),re.setColorAt(st,ln(st%3?"#b7b06c":"#6d673f"));Nt.add(re);for(let st=0;st<3;st++){const St=Ke([[-.85,.05,-.3+st*.45],[0,.02,-.3+st*.45],[.85,.08,-.3+st*.45]],.075,W.bark,5);V.push(St.geometry),Nt.add(St)}const Re=new Zt($i(1,.8,.23),W.leaf);Re.position.set(0,.5,.1),Re.rotation.z=.17,V.push(Re.geometry),Nt.add(Re),ei(Nt,V),N.add(Nt),N.userData.storage=Nt,N.userData.foodMesh=re,N.userData.storageCover=Re;const Ce=new te;Ce.name="Lookout perch",Ce.position.set(3.1,0,2.5);for(let st=0;st<3;st++){const St=st/3*Le,ae=Ke([[Math.cos(St)*.7,-.1,Math.sin(St)*.7],[Math.cos(St)*.44,1.4,Math.sin(St)*.44],[Math.cos(St)*.35,2.65,Math.sin(St)*.35]],.085,W.bark,7);V.push(ae.geometry),Ce.add(ae)}for(let st=0;st<8;st++){const St=-.6+st*.17,ae=Ke([[-.7,2.35,St],[0,2.32,St],[.7,2.36,St]],.06,W.reed,4);V.push(ae.geometry),Ce.add(ae)}const me=new Zt($i(1.1,.9,.08),W.leaf);me.position.y=3.15,me.rotation.x=.17,V.push(me.geometry),Ce.add(me);for(let st=0;st<6;st++){const St=Ke([[-.25,st*.34,.63],[.25,st*.34,.63]],.035,W.reed,2);V.push(St.geometry),Ce.add(St)}ei(Ce,V),N.add(Ce),N.userData.watchtower=Ce;const en=new wn(ft[1],W.mossRock,25);for(let st=0;st<25;st++){const St=st/25*Le;pt.position.set(Math.cos(St)*2.15,-.12,Math.sin(St)*2.35-.5),pt.rotation.set(0,St,0),pt.scale.set(.25,.25,.25),pt.updateMatrix(),en.setMatrixAt(st,pt.matrix)}N.add(en);const Je=new te;Je.name="Collapsed shelter remains";const an=new Ve({color:"#839061",map:O,roughness:.94,side:Pe});V.push(an);for(let st=0;st<6;st++){const St=fh(.62+st%3*.16,1.35+st%2*.55,.14+st%3*.05,s+st*19),ae=new Zt(St,an);ae.position.set(-1.3+st%3*.85,-.46+st%2*.04,-1.5+Math.floor(st/3)*1.7),ae.rotation.set((st%2-.5)*.24,st*1.71,(st%3-1)*.13),ae.castShadow=!0,V.push(St),Je.add(ae)}for(let st=0;st<22;st++){const St=st*2.399,ae=.65+st%5*.27,je=Math.cos(St)*(st<14?1.2:3.4),He=Math.sin(St)*(st<14?1.6:2.8)-.3,pe=Ke([[je,.055,He],[je+Math.cos(St+.7)*ae*.6,.11+st%3*.07,He+Math.sin(St+.7)*ae*.6],[je+Math.cos(St+.7)*ae,.04+st%4*.06,He+Math.sin(St+.7)*ae]],st%2?.045:.065,st%2?W.reed:W.bark,4);pe.castShadow=!0,V.push(pe.geometry),Je.add(pe)}ei(Je,V),N.add(Je),N.userData.ruin=Je;const gn=new wn(Me,W.fruit,8);gn.name="Supplies exposed in the ruins";for(let st=0;st<8;st++)pt.position.set(-.5+st%4*.29,.12+Math.floor(st/4)*.08,1.35+Math.floor(st/4)*.31),pt.rotation.set(st*.43,st*1.31,.2),pt.scale.setScalar(.16+st%3*.025),pt.updateMatrix(),gn.setMatrixAt(st,pt.matrix),gn.setColorAt(st,ln(st%2?"#a99958":"#d9a253"));N.add(gn),N.userData.looseLoot=gn;const Mn=new Ve({color:"#edc371",emissive:"#e5a64c",emissiveIntensity:.7,roughness:.7});V.push(Mn);const jn=new Zt(Me,Mn);jn.position.set(1.7,.55,1.1),jn.scale.set(.15,.22,.15),N.add(jn),N.userData.lamp=jn;const ks=new bm("#ffd098",1.8,25,2);ks.position.set(0,2.3,1.8),N.add(ks),N.userData.light=ks,N.updateMatrixWorld(!0),N.userData.buildingGroups={},N.userData.defaultPlacements={};for(const[st,St]of Object.entries({store:"storage",nursery:"nursery",watchtower:"watchtower",training:"training"})){const ae=N.userData[St],je=new qn().setFromObject(ae),He=N.worldToLocal(je.getCenter(new L)),pe=new te;pe.name=ae.name+" placement",pe.position.set(He.x,ae.position.y,He.z),N.add(pe),ae.position.sub(pe.position),pe.add(ae),N.userData[St]=pe,N.userData.buildingGroups[st]=pe,N.userData.defaultPlacements[st]={x:He.x*ie,z:He.z*ie,yaw:0}}N.updateMatrixWorld(!0);const cs=new qn().setFromObject(Z),zr=N.worldToLocal(cs.getCenter(new L)),Lr=cs.getSize(new L);N.userData.coreFootprint={x:zr.x*ie,z:zr.z*ie,width:Lr.x,depth:Lr.z},k||(l.add(N),E.add(N)),ka(N,M);const Fs=new Set([N.userData.core.userData.roof,N.userData.storageCover,N.userData.banner.userData.flag]);return N.traverse(st=>{st.isMesh&&!Fs.has(st)&&(st.updateMatrix(),st.matrixAutoUpdate=!1)}),N}function ka(M,z={}){if(!M)return;if(M.userData.natural)return kd(M,z,Ns);const k=M.userData.visualState||{},F={...k,...z},N=Math.max(1,F.tier??1),V=F.buildings||{},Z=Zi((F.hp??F.maxHp??100)/(F.maxHp??100),0,1),X=!!F.destroyed||Z<=0,it=F.team??k.team??"neutral",dt={};for(const[Ce,me]of Object.entries(F.buildingPlacements||{}))M.userData.buildingGroups[Ce]&&me&&Number.isFinite(me.x)&&Number.isFinite(me.z)&&Number.isFinite(me.yaw??0)&&(dt[Ce]={x:me.x,z:me.z,yaw:me.yaw??0});M.userData.visualState={team:it,tier:N,hp:F.hp,maxHp:F.maxHp,buildings:{...V},buildingPlacements:dt,yaw:Number.isFinite(F.yaw)?F.yaw:0,storage:F.storage,resources:F.resources,lootTaken:!!F.lootTaken,gateHp:F.gateHp,gateOpen:!!F.gateOpen,destroyed:X,underConstruction:!!F.underConstruction,constructionProgress:Zi(Number(F.constructionProgress)||0,0,1)},M.rotation.y=M.userData.visualState.yaw;for(const[Ce,me]of Object.entries(M.userData.buildingGroups)){const en=dt[Ce]||M.userData.defaultPlacements[Ce];me.position.x=en.x/ie,me.position.z=en.z/ie,me.rotation.y=en.yaw}const At=M.userData.buildingGroups.training;M.updateMatrixWorld(!0),M.userData.trainingPoint.copy(At.getWorldPosition(new L)),M.userData.trainingPoint.y=M.position.y+.12,M.userData.team=it,M.userData.tier=N,M.userData.health=Z,M.userData.destroyed=X,M.userData.banner.userData.flag.material.color.set(Ns(it)),M.userData.banner.userData.emblemTeam!==it&&(M.userData.banner.userData.flag.material.map=mo(it),M.userData.banner.userData.flag.material.needsUpdate=!0,M.userData.banner.userData.emblemTeam=it),M.userData.gateCrest.material.color.set(Ns(it)),M.userData.gateCrest.material.map=mo(it);const $t=!!(V.storage??V.store??!1);M.userData.core.visible=!X,M.userData.extra.visible=!X&&N>=2,M.userData.ruin.visible=X,M.userData.nursery.visible=!X&&!!(V.nursery||V.hatchery||V.spawn||V.breeding),M.userData.training.visible=!X&&!!(V.training||V.trainingGround||V.drill),M.userData.watchtower.visible=!X&&!!(V.watchtower||V.tower||V.guards);const zt=!X&&!!(V.palisade||V.walls||V.wall||V.defense);M.userData.fortification.visible=!X,M.userData.palisade.visible=zt;const Nt=Number.isFinite(F.gateHp)&&F.gateHp<=0;M.userData.gate.userData.breached=Nt,M.userData.gate.userData.open=!!F.gateOpen,M.userData.fallenGate.visible=Nt;for(let Ce=0;Ce<2;Ce++){const me=M.userData.gateLeaves[Ce];me.visible=!Nt,me.rotation.y=F.gateOpen?(Ce===0?-1:1)*Math.PI*.52:0}M.userData.core.rotation.z=X?0:(1-Z)*.09,M.userData.core.userData.roof.scale.y=X?1:.78+.22*Z;let re=typeof F.storage=="number"?F.storage:F.storage?.food??F.resources??0;Number.isFinite(re)||(re=0),re=Math.max(0,re);const Re=re>0&&!F.lootTaken;M.userData.storage.visible=$t&&(!X||Re),M.userData.storage.rotation.z=X?-.08:0,M.userData.foodMesh.count=X&&!Re?0:Math.min(15,Math.ceil(re/8)),M.userData.storageCover.position.set(X?-.65:0,X?.1:.5,X?.52:.1),M.userData.storageCover.rotation.set(X?.28:0,0,X?-.32:.17),M.userData.looseLoot.visible=X&&Re&&!$t,M.userData.looseLoot.count=Math.min(8,Math.ceil(re/5)),M.userData.banner.position.y=X?.035:0,M.userData.banner.rotation.set(X?.08:0,X?.35:0,X?1.49:Z<.25?.22:0),M.userData.lamp.visible=!X,X&&(M.userData.light.visible=!1),gh(M),M.userData.collisionRevision=(M.userData.collisionRevision||0)+1}function gh(M){const z=M.userData.visualState||{},k=Bu({...z,mesh:M}),{stage:F,unfinished:N,wallHeight:V}=k,Z=!!z.destroyed,X=M.userData.fortWalls,it=V/ga;if(X.visible=!Z&&F>=1,X.count=F===1?X.userData.firstCoursesCount:X.userData.fullCount,X.scale.y=it||1,X.position.y=.11*(1-(it||1))/ie,X.updateMatrix(),M.userData.fortification.visible=!Z&&F>=1,M.userData.fortTowers.visible=!Z&&F>=2,M.userData.fortTowerRoofs.visible=!Z&&F>=3,M.userData.core.visible=!Z&&F>=3,M.userData.gate.visible=!Z&&!N,M.userData.gateCrest.visible=!Z&&!N,M.userData.banner.visible=!N,N)for(const dt of["extra","nursery","training","watchtower","storage","palisade","lamp","light","looseLoot"])M.userData[dt].visible=!1;M.userData.constructionStage=F,M.userData.constructionWallHeight=V}function lf(M,z,k){if(M?.type!=="shelter")return!1;const F=k?.mesh||[...E].find(X=>X.userData.id===(M.siteId||M.campId));if(!F?.userData?.fortWalls)return!1;const N=Zi(Number(z)||0,0,1);k&&(k.constructionProgress=N);const V=F.userData.visualState||{};return V.constructionProgress=N,V.underConstruction=k?.underConstruction??V.underConstruction??!0,F.userData.visualState=V,Bu({...V,mesh:F}).stage!==F.userData.constructionStage&&(gh(F),F.userData.collisionRevision=(F.userData.collisionRevision||0)+1),!0}function xh(M){if(!M)return;if(G?.userData.camp===M&&Ir(),l.remove(M),E.delete(M),M.userData.refuge){M.userData.refuge.active=!1;const k=x.indexOf(M.userData.refuge);k>=0&&x.splice(k,1)}M===_&&(_=null);for(const k of[M.userData.support,M.userData.landmark])if(k){const F=T.indexOf(k);F>=0&&T.splice(F,1);for(const N of U.values()){const V=N.indexOf(k);V>=0&&N.splice(V,1)}}const z=M.userData.terrain;z&&(C.delete(z.id),w(z),ph(z)),M.traverse(k=>{k.isInstancedMesh&&k.dispose()});for(const k of M.userData.owned||[])k.dispose?.()}function cf(M){if(c||!["shelter","store","nursery","watchtower","training"].includes(M))return null;const z=go({id:"construction-preview",x:0,z:0,team:"ally",tier:1,hp:350,maxHp:350,buildings:{},storage:{food:80}},{preview:!0});if(z.name="Construction preview: "+M,z.userData.previewType=M,z.userData.previewMaterials=[],M!=="shelter"){const F=z.userData.buildingGroups[M];for(const N of z.children)N.visible=N===F;F.visible=!0,F.position.x=F.position.z=0,F.rotation.y=0}const k=new Map;return z.traverse(F=>{if(F.isLight){F.visible=!1;return}if(!F.isMesh)return;F.castShadow=!1,F.receiveShadow=!1,F.renderOrder=8;const N=V=>{if(k.has(V))return k.get(V);const Z=V.clone();return Z.transparent=!0,Z.opacity=.46,Z.depthWrite=!1,Z.polygonOffset=!0,Z.polygonOffsetFactor=-1,Z.polygonOffsetUnits=-1,k.set(V,Z),z.userData.previewMaterials.push(Z),z.userData.owned.push(Z),Z};F.material=Array.isArray(F.material)?F.material.map(N):N(F.material)}),S.add(z),l.add(z),vh(z,{x:0,y:0,z:0,yaw:0,valid:!1}),z.visible=!1,z}function vh(M,{x:z,y:k,z:F,yaw:N=0,valid:V=!1}={}){if(M?.userData.previewType&&(Number.isFinite(z)&&(M.position.x=z),Number.isFinite(k)&&(M.position.y=k),Number.isFinite(F)&&(M.position.z=F),M.rotation.y=Number.isFinite(N)?N:0,M.visible=!0,M.userData.previewValid!==!!V)){M.userData.previewValid=!!V;for(const Z of M.userData.previewMaterials)Z.color?.set(V?"#69ed89":"#ef665b"),Z.emissive?.set(V?"#266c37":"#782d27"),"emissiveIntensity"in Z&&(Z.emissiveIntensity=.4)}}function _h(M){!M||!S.has(M)||(S.delete(M),M.removeFromParent(),xh(M))}function Ir(){if(!G)return;G.removeFromParent();const M=new Set,z=new Set;G.traverse(k=>{k.geometry&&M.add(k.geometry),k.material&&z.add(k.material)});for(const k of M)k.dispose();for(const k of z)k.dispose();G=null}function hf(M){const z=M?.mesh||M;if(!z?.isObject3D)return Ir(),null;if(G?.userData.camp===z)return G;Ir(),G=new te,G.name="Construction courtyard guide",G.userData.camp=z;const k=(Ms-.2)/ie,F=.075,N=(it,dt,At,$t=!1)=>{const zt=new we().setFromPoints(it),Nt=new Kc({color:dt,transparent:!0,opacity:At,depthWrite:!1}),re=$t?new tm(zt,Nt):new Qp(zt,Nt);return re.renderOrder=6,G.add(re),re},V=[];for(let it=0;it<96;it++){const dt=it/96*Le;V.push(new L(Math.cos(dt)*k,F,Math.sin(dt)*k))}N(V,"#9fe5af",.78,!0);const Z=[];for(let it=-7;it<=7;it++){const dt=it*.7;if(Math.abs(dt)>=k)continue;const At=Math.sqrt(k*k-dt*dt);Z.push(new L(dt,F,-At),new L(dt,F,At),new L(-At,F,dt),new L(At,F,dt))}N(Z,"#b7ddbc",.22);const X=(it,dt)=>{const At=it.x/ie,$t=it.z/ie,zt=it.width/(2*ie)+.025,Nt=it.depth/(2*ie)+.025,re=Math.cos(it.yaw||0),Re=Math.sin(it.yaw||0),Ce=F+.012,me=(Je,an)=>new L(At+Je*re+an*Re,Ce,$t+an*re-Je*Re);N([me(-zt,-Nt),me(zt,-Nt),me(zt,Nt),me(-zt,Nt)],"#ec8a72",.8,!0).name=dt+" outline";const en=[];for(let Je=-zt-Nt;Je<=zt+Nt;Je+=.42){const an=[];for(const gn of[-zt,zt]){const Mn=Je-gn;Mn>=-Nt&&Mn<=Nt&&an.push(me(gn,Mn))}for(const gn of[-Nt,Nt]){const Mn=Je-gn;Mn>-zt&&Mn<zt&&an.push(me(Mn,gn))}an.length===2&&en.push(...an)}N(en,"#d9806c",.35).name=dt+" hatch"};return X(z.userData.coreFootprint||{x:-1.1825*cr,z:-1.0664*cr,width:7.68*cr,depth:8.25*cr},"Main hut exclusion"),X(g_,"Sleeping hut reservation"),z.add(G),G}let xo=0,yh=qi;const uf=ln(o.water),df=ln(o.nightWater),ff=ln("#fff0cb"),pf=ln("#7aa5cb");function mf(M,z,k=1,F){if(qe=z,xo++,k=Zi(k,0,1),po.value=z,c){const Z=1-Math.exp(-Math.max(0,Math.min(.5,Number(M)||0))*3);be(g+(p-g)*Z);const X=lt.material.uniforms.alpha,it=P_(F?.y,g);if(X.value+=(it-X.value)*(1-Math.exp(-Math.max(0,Math.min(.5,Number(M)||0))*8)),Math.abs(yh-g)>.008){for(let dt=0;dt<Et.length;dt++){const At=Et[dt];pt.position.set(At.x,At.y,At.z),pt.rotation.set(0,At.angle,0),pt.scale.set(At.visualRadius,1,At.visualRadius),pt.updateMatrix(),ve.setMatrixAt(dt,pt.matrix)}ve.flush(),yh=g}Kt.update(g,z)}if(lt.material.uniforms.time.value=z*.45,lt.material.uniforms.waterColor.value.copy(df).lerp(uf,k),lt.material.uniforms.sunColor.value.copy(pf).lerp(ff,k),lt.material.uniforms.sunDirection.value.set(.35+.25*Math.sin(z*.008),.45+k*.4,-.45).normalize(),xo%3===0){const Z=at.attributes.position;for(let X=0;X<Z.count;X++){const it=ct[X*3],dt=ct[X*3+1];Z.setZ(X,Math.sin(it*.33+dt*.21+z*.91)*.025+Math.sin(it*.14-dt*.38-z*.72)*.018)}Z.needsUpdate=!0}xi.uniforms.uTime.value=z;let N=!1;for(let Z=0;Z<tn;Z++){const X=ai[Z];X.life<=0||(X.life-=M,X.vy-=9.2*M,on[Z*3]+=X.vx*M,on[Z*3+1]+=X.vy*M,on[Z*3+2]+=X.vz*M,Oi[Z]=Math.max(0,X.life/X.max)*.88,(on[Z*3+1]<(c?g-.03:-.03)||X.life<=0)&&(X.life=0,Oi[Z]=0),N=!0)}if(N&&(vi.attributes.position.needsUpdate=!0,vi.attributes.aAlpha.needsUpdate=!0),xo%2===0){let Z=0;for(let X=0;X<A.length;X++){const it=A[X];if(F&&(it.x-F.x)**2+(it.z-F.z)**2>90**2)continue;const dt=(it.rich?65:30)*Zi(it.flies/it.maxFlies,0,1)*(c?Math.min(1,it.ecology?.activity??1):1);for(const At of It[X]){if(At.rank>=dt)continue;const $t=z*At.speed+At.phase;pt.position.set(it.x+Math.sin($t)*At.r+Math.sin($t*2.9)*.13,it.y+At.height+Math.sin($t*1.7+At.phase2)*.26,it.z+Math.cos($t*.83+At.phase2)*At.r),pt.scale.setScalar(.55+.3*Math.sin(At.phase2)**2),pt.rotation.set(Math.sin($t*3)*.25,-$t,Math.sin($t*12)*.25),pt.updateMatrix(),Dt.setMatrixAt(Z++,pt.matrix)}}Dt.count=Z,j.flyMatricesUpdated=Z,Z&&(Dt.instanceMatrix.clearUpdateRanges(),Dt.instanceMatrix.addUpdateRange(0,Z*16),Dt.instanceMatrix.needsUpdate=!0)}xo%5===0&&F&&(Et.forEach((Z,X)=>{Math.hypot(F.x-Z.x,F.z-Z.z)>48||(pt.position.set(Z.x,Z.y+Math.sin(z*.9+Z.phase)*.018,Z.z),pt.rotation.set(Math.sin(z*.61+Z.phase)*.015,Z.angle,Math.cos(z*.8+Z.phase)*.015),pt.scale.set(Z.visualRadius,1,Z.visualRadius),pt.updateMatrix(),ve.setMatrixAt(X,pt.matrix))}),ve.flush());const V=[...E].filter(Z=>!Z.userData.natural&&!Z.userData.destroyed&&!Z.userData.visualState?.underConstruction).sort((Z,X)=>F?Z.position.distanceToSquared(F)-X.position.distanceToSquared(F):0).slice(0,3);for(const Z of E)Z.userData.natural||(Z.userData.light.visible=V.includes(Z),Z.userData.light.intensity=.25+(1-k)*3,Z.userData.lamp.material.emissiveIntensity=.3+(1-k)*1.3,Z.userData.banner.userData.flag.rotation.y=Math.sin(z*1.4+Z.position.x)*.06)}function gf(){Ir();for(const k of[...S])_h(k);i.remove(l);const M=new Set,z=new Set;l.traverse(k=>{k.isInstancedMesh&&k.dispose(),k.geometry&&M.add(k.geometry),k.material&&(Array.isArray(k.material)?k.material.forEach(F=>z.add(F)):z.add(k.material))});for(const k of Kt?.resources||[])k.isBufferGeometry&&M.add(k),k.isMaterial&&z.add(k);for(const k of M)k.dispose();for(const k of z)k.dispose();for(const k of b)k.dispose();lt.material.uniforms.mirrorSampler?.value?.dispose?.(),E.clear();for(const k of x)k.active=!1;x.length=0}for(const M of h?.refuges||[])go({...M,natural:!0,team:"neutral",nestLevel:0});return l.traverse(M=>{M.updateMatrix(),M.matrixAutoUpdate=!1}),l.updateMatrixWorld(!0),{group:l,platforms:T,hotspots:A,campSites:ce,mapRegions:yt,routes:Oe,predatorAnchors:Xt,bossAnchors:kt,renderStats:j,seed:s,regionIndex:n,palette:o,toRegionPoint:r.toWorld,radius:d_,boundary:f_,revision:u_,sampleHeight:Pr,getTerrainHeight:D,getSurface:as,shelterLandHeight:mh,update:mf,splash:tf,impact:ef,createShelter:go,updateShelter:ka,setConstructionProgress:lf,removeShelter:xh,createBuildingPreview:cf,setBuildingPreview:vh,removeBuildingPreview:_h,showBuildArea:hf,hideBuildArea:Ir,dispose:gf,water:lt,shelterRadius:Ms,shelterScale:ie,natural:c,creekLandmarks:u,creekNest:d,creekCover:f,creekGrips:m,creekRefuges:x,creekSpawn:c?{x:0,z:0}:null,creekTerritories:c?ce.filter(M=>M.team==="enemy"):[],setCreekState:Ne,currentAt:oe,isCreekCover:Jt,get waterLevel(){return c?g:qi}}}const ci=Math.PI*2,$e=(i,t=0,e=1)=>Math.max(t,Math.min(e,i)),Ze=(i,t,e)=>i+(t-i)*e,Xn=(i,t,e)=>{const n=$e((e-i)/(t-i));return n*n*(3-2*n)},Wr=(i,t=0,e=0)=>{const n=Math.sin(i*127.1+t*311.7+e*74.7)*43758.5453;return n-Math.floor(n)},Fe=(i=0,t=0,e=0)=>new L(i,t,e),wl=new Map,El=new Map;let Yi,Tl;const Pc=Fe(0,1,0);Fe();function Al(i,t){if(typeof i=="number")return i;const e=$e(t)*(i.length-1),n=Math.min(i.length-2,Math.floor(e)),s=e-n,r=s*s*(3-2*s);return Ze(i[n],i[n+1],r)}function bs(i,t){if(i.length===1)return[[i[0],1]];const e=$e(t)*(i.length-1),n=Math.min(i.length-2,Math.floor(e)),s=e-n;return[[i[n],1-s],[i[n+1],s]]}function ye(i,t=0){return{color:i,mask:t}}class Fn{constructor(t=1){this.detail=t,this.p=[],this.uv=[],this.c=[],this.mask=[],this.si=[],this.sw=[],this.idx=[]}vertex(t,e=[0,0],n=[[0,1]],s={color:[1,1,1],mask:0}){const r=this.p.length/3;this.p.push(t.x,t.y,t.z),this.uv.push(...e),this.c.push(...s.color),this.mask.push(s.mask||0);let o=n.reduce((a,l)=>a+l[1],0)||1;for(let a=0;a<4;a++)this.si.push(n[a]?.[0]||0),this.sw.push((n[a]?.[1]||0)/o);return r}tri(t,e,n){this.idx.push(t,e,n)}quad(t,e,n,s,r=!1){r?(this.tri(t,n,e),this.tri(e,n,s)):(this.tri(t,e,n),this.tri(e,s,n))}tube(t,e,n,s={}){const{bones:r=[0],paint:o=()=>ye([.7,.7,.7],1),distort:a}=s,l=Math.max(2,Math.round((s.segments??28)*this.detail)),c=Math.max(3,Math.round((s.radial??16)*this.detail)),h=new lo(t.map(y=>y.isVector3?y:Fe(...y)),!1,"catmullrom",.5),u=this.p.length/3;for(let y=0;y<=l;y++){const _=y/l,T=h.getPoint(_),A=h.getTangent(_).normalize(),E=new L().crossVectors(Math.abs(A.y)>.94?Fe(0,0,1):Pc,A).normalize(),C=new L().crossVectors(A,E).normalize();for(let S=0;S<=c;S++){const b=S/c,U=b*ci,P=Math.cos(U)*Al(e,_),G=Math.sin(U)*Al(n,_),j=T.clone().addScaledVector(E,P).addScaledVector(C,G);a&&a(j,_,U,T);const H=typeof r=="function"?r(_,j):bs(r,_);this.vertex(j,[b,_],H,o(j,_,U))}}for(let y=0;y<l;y++)for(let _=0;_<c;_++){const T=u+y*(c+1)+_;this.quad(T,T+1,T+c+1,T+c+2)}const d=h.getPoint(0),f=h.getPoint(1),m=typeof r=="function"?r(0,d):bs(r,0),x=typeof r=="function"?r(1,f):bs(r,1),g=this.vertex(d,[.5,0],m,o(d,0,0)),p=this.vertex(f,[.5,1],x,o(f,1,0)),v=u+l*(c+1);for(let y=0;y<c;y++)this.tri(g,u+y+1,u+y),this.tri(p,v+y,v+y+1);return this}ellipsoid(t,e,{bone:n=0,rings:s=14,radial:r=24,paint:o=()=>ye([1,1,1]),rotationY:a=0,sculpt:l}={}){s=Math.max(3,Math.round(s*this.detail)),r=Math.max(4,Math.round(r*this.detail));const c=this.p.length/3,h=Fe(...t),u=Math.cos(a),d=Math.sin(a);for(let f=0;f<=s;f++){const m=f/s,x=Math.PI*m;for(let g=0;g<=r;g++){const p=g/r,v=ci*p;let y=Math.sin(x)*Math.cos(v)*e[0],_=Math.cos(x)*e[1],T=Math.sin(x)*Math.sin(v)*e[2];const A=Fe(y,_,T);l&&l(A,p,m);const E=Fe(A.x*u+A.z*d,A.y,-A.x*d+A.z*u).add(h);this.vertex(E,[p,m],[[n,1]],o(A,p,m))}}for(let f=0;f<s;f++)for(let m=0;m<r;m++){const x=c+f*(r+1)+m;this.quad(x,x+1,x+r+1,x+r+2)}return this}leaf(t,e,{bone:n=0,bones:s,segments:r=14,across:o=6,color:a=[.35,.45,.22],ridge:l=.025,mask:c=0,vein:h=!0}={}){r=Math.max(2,Math.round(r*this.detail)),o=Math.max(2,Math.round(o*this.detail));const u=new lo(t.map(f=>f.isVector3?f:Fe(...f)),!1,"catmullrom",.5),d=this.p.length/3;for(let f=0;f<=r;f++){const m=f/r,x=u.getPoint(m),g=u.getTangent(m).normalize(),p=new L().crossVectors(Math.abs(g.y)>.95?Fe(0,0,1):Pc,g).normalize();for(let v=0;v<=o;v++){const y=v/o*2-1,_=x.clone().addScaledVector(p,y*Al(e,m));_.y+=l*(1-Math.abs(y))*Math.sin(m*Math.PI);const T=(h?.88+.12*Math.cos(m*45+Math.abs(y)*9):1)+.12*(1-Math.abs(y));this.vertex(_,[(y+1)/2,m],s?bs(s,m):[[n,1]],ye(a.map(A=>A*T),c))}}for(let f=0;f<r;f++)for(let m=0;m<o;m++){const x=d+f*(o+1)+m;this.quad(x,x+1,x+o+1,x+o+2,!0)}return this}geometry(){const t=new we;return t.setAttribute("position",new Gt(this.p,3)),t.setAttribute("uv",new Gt(this.uv,2)),t.setAttribute("color",new Gt(this.c,3)),t.setAttribute("skinTintMask",new Gt(this.mask,1)),t.setAttribute("skinIndex",new $c(this.si,4)),t.setAttribute("skinWeight",new Gt(this.sw,4)),t.setIndex(this.idx),t.computeVertexNormals(),t.computeBoundingSphere(),t}}function Ta(){const i=[],t={};return{defs:i,ids:t,bone(e,n,s=null){const r=i.length;return t[e]=r,i.push({name:e,p:n,parent:typeof s=="string"?t[s]:s}),r}}}function tr(i,t=0,e=0){const n=1-Xn(.26,.47,i.y),s=Math.sin(i.x*31+Math.sin(i.z*13))*Math.sin(i.z*25+i.y*23),r=Xn(.42,.77,s)*.5,o=.75-r+.06*Math.sin(i.x*75+i.z*64),a=(1-Xn(.026,.065,Math.abs(i.x)))*Xn(.52,.67,i.y);return a>.3?ye([.78,.61,.18].map(l=>Ze(o,l,a)),1-a):ye([Ze(o,.76,n),Ze(o,.72,n),Ze(o,.49,n)],1-n*.96)}function li(i,t=0,e=0){const n=(1-Xn(-.55,.1,Math.sin(e)))*.65,r=.79-.36*Xn(.38,.78,Math.sin(i.x*35+i.z*17)*Math.sin(i.y*39-i.z*23));return ye([Ze(r,.7,n),Ze(r,.66,n),Ze(r,.43,n)],1-n*.92)}function Vu(i=1){const t=Ta(),e=new Fn(i),n=new Fn(i),s=new Fn(i),r=new Fn(i),o=new Fn(i),a=new Fn(i),l=t.bone("pelvis",[0,.36,-.35]),c=t.bone("spine",[0,.43,-.07],l),h=t.bone("head",[0,.47,.29],c),u=t.bone("jaw",[0,.39,.37],h),d=t.bone("throat",[0,.29,.36],u),f=t.bone("eyeL",[-.292,.685,.53],h),m=t.bone("eyeR",[.292,.685,.53],h),x=t.bone("mouth",[0,.405,.755],u);e.tube([[0,.35,-.72],[0,.42,-.48],[0,.43,-.08],[0,.47,.3],[0,.46,.58],[0,.43,.75]],[.012,.32,.435,.43,.34,.018],[.012,.245,.27,.235,.145,.025],{segments:42,radial:36,bones:p=>bs([l,l,c,h,h],p),paint:tr,distort(p,v,y){const _=Math.max(0,Math.sin(y));p.y+=_*.008*Math.sin(p.x*70+p.z*50);const T=Math.exp(-Math.pow((Math.abs(p.x)-.22)/.035,2));p.y+=T*_*.023*Math.sin(v*Math.PI)}});for(const p of[-1,1]){const v=p<0?f:m,y=[p*.292,.685,.53];e.ellipsoid([p*.292,.605,.405],[.15,.145,.165],{bone:h,rings:14,radial:24,paint:P=>tr(P.clone().add(Fe(p*.292,.605,.405)))}),n.ellipsoid(y,[.106,.103,.113],{bone:v,radial:40,rings:22,rotationY:p*.32,paint(P,G,j){const H=P.z/.113,q=Math.pow(P.x/.084,2)+Math.pow(P.y/.029,2);if(H<.12)return ye([.065,.14,.018]);if(H<.34)return ye([.04,.065,.012]);if(H>.52&&q<1)return ye([.008,.012,.006]);const B=.12*Math.sin(Math.atan2(P.y,P.x)*51+Math.hypot(P.x,P.y)*120);return ye([.74+B,.52+B*.6,.08+B*.12])}});const _=t.bone(`hip${p}`,[p*.33,.32,-.33],l),T=t.bone(`knee${p}`,[p*.64,.24,.025],_),A=t.bone(`ankle${p}`,[p*.46,.09,-.61],T),E=t.bone(`foot${p}`,[p*.64,.045,-.49],A);e.ellipsoid([p*.64,.24,.025],[.143,.128,.148],{bone:T,rings:12,radial:18,paint:(P,G,j)=>li(P.clone().add(Fe(p*.64,.24,.025)),G,Math.PI*(.5-j)),sculpt(P){P.x*=1+.06*Math.sin(P.z*30)}}),e.ellipsoid([p*.46,.09,-.61],[.069,.052,.071],{bone:A,rings:8,radial:12,paint:(P,G,j)=>li(P.clone().add(Fe(p*.46,.09,-.61)),G,Math.PI*(.5-j))}),e.tube([[p*.3,.33,-.35],[p*.5,.3,-.21],[p*.64,.24,.025]],[.13,.223,.14],[.13,.173,.12],{segments:20,radial:22,bones:[_,_,T],paint:li}),e.tube([[p*.64,.24,.025],[p*.57,.15,-.27],[p*.46,.09,-.61]],[.12,.105,.065],[.11,.09,.05],{segments:20,radial:18,bones:[T,T,A],paint:li}),e.tube([[p*.46,.09,-.61],[p*.57,.06,-.55],[p*.72,.035,-.35]],[.06,.07,.047],[.047,.04,.025],{segments:12,radial:14,bones:[A,E,E],paint:li});const C=[];for(let P=0;P<4;P++){const G=p*(.7+(P-1.5)*.075),j=-.34+.36*(1-Math.abs(P-1.5)*.16),H=[p*(.67+(P-1.5)*.028),.036,-.37],q=[Ze(H[0],G,.53),.037,-.18];e.tube([H,q,[G,.035,j]],[.032,.024,.007],[.02,.014,.006],{segments:10,radial:8,bones:[E],paint:li}),C.push([G,.034,j*.66-.12])}for(let P=0;P<3;P++){const G=Fe(p*.68,.035,-.36),j=Fe(...C[P]),H=Fe(...C[P+1]),q=j.clone().lerp(H,.5).lerp(G,.2),B=e.vertex(G,[0,0],[[E,1]],tr(G)),O=e.vertex(j,[1,0],[[E,1]],tr(j)),Q=e.vertex(q,[.5,1],[[E,1]],tr(q)),W=e.vertex(H,[0,1],[[E,1]],tr(H));e.tri(B,O,Q),e.tri(B,Q,W),e.tri(Q,O,W)}const S=t.bone(`shoulder${p}`,[p*.3,.43,.31],c),b=t.bone(`elbow${p}`,[p*.48,.235,.4],S),U=t.bone(`wrist${p}`,[p*.46,.058,.62],b);e.ellipsoid([p*.48,.235,.4],[.064,.066,.064],{bone:b,rings:8,radial:12,paint:(P,G,j)=>li(P.clone().add(Fe(p*.48,.235,.4)),G,Math.PI*(.5-j))}),e.tube([[p*.3,.43,.31],[p*.43,.33,.335],[p*.48,.235,.4]],[.092,.085,.061],[.09,.077,.059],{segments:14,radial:16,bones:[S,S,b],paint:li}),e.tube([[p*.48,.235,.4],[p*.48,.14,.48],[p*.46,.058,.62]],[.062,.07,.039],[.058,.057,.03],{segments:12,radial:14,bones:[b,b,U],paint:li});for(let P=0;P<4;P++){const G=p*(.44+(P-1.5)*.075),j=.81+.04*(1.5-Math.abs(P-1.5));e.tube([[p*.46,.055,.61],[Ze(p*.46,G,.6),.031,.74],[G,.025,j]],[.025,.017,.009],[.021,.014,.006],{segments:9,radial:8,bones:[U],paint:li}),e.ellipsoid([G,.025,j],[.017,.01,.021],{bone:U,rings:6,radial:10,paint:()=>ye([.71,.65,.4],.4)})}for(let P=0;P<3;P++){const G=.32+P*.016;e.tube(Array.from({length:17},(j,H)=>[p*.415+Math.cos(H/16*ci)*.085,G+Math.sin(H/16*ci)*.072,.355+Math.sin(H/16*ci)*.02]),.009,.009,{segments:20,radial:6,bones:[S],paint:()=>ye([.38,.55,.12],.25)})}s.leaf([[p*.12,.695,-.08],[p*.31,.69,-.19],[p*.48,.52,-.38]],[.012,.14,.03],{bone:c,color:[.26,.4,.12],ridge:.025,segments:15}),s.leaf([[p*.04,.715,.05],[p*.2,.73,-.03],[p*.36,.59,-.2]],[.008,.13,.015],{bone:c,color:[.34,.48,.18],ridge:.035,segments:15}),r.leaf([[p*.17,.76,.4],[p*.21,.89,.32],[p*.24,.91,.18]],[.025,.055,.002],{bone:h,color:[.69,.53,.19],ridge:.015,segments:12});for(const[P,G,j,H,q]of[[p*.16,.745,-.005,.18,.21],[p*.29,.67,-.25,.17,.19]])o.ellipsoid([P,G,j],[H,.055,q],{bone:c,rings:8,radial:18,paint:(B,O)=>ye([.84+.08*Math.cos(O*ci*9),.79,.59]),sculpt(B){const O=1+.035*Math.cos(Math.atan2(B.x,B.z)*9);B.x*=O,B.z*=O}});for(let P=0;P<3;P++){const G=.19+P*.028,j=.455-P*.017;a.tube(Array.from({length:13},(H,q)=>[p*.478+Math.cos(q/12*ci)*.081,G+Math.sin(q/12*ci)*.027,j+Math.sin(q/12*ci)*.079]),.016,.014,{segments:14,radial:6,bones:[b],paint:()=>ye([.72,.47,.16])})}}const g=Array.from({length:13},(p,v)=>{const y=(v/12-.5)*.74;return[y,.414-.025*Math.abs(y)/.37,.748-.2*Math.pow(y/.37,2)]});return e.tube(g,.009,.009,{segments:34,radial:8,bones:[h],paint:()=>ye([.045,.065,.016])}),e.tube(g.map(p=>[p[0],p[1]-.019,p[2]+.001]),.009,.014,{segments:34,radial:8,bones:[u],paint:()=>ye([.65,.61,.35])}),e.ellipsoid([0,.284,.385],[.25,.125,.265],{bone:d,rings:18,radial:28,paint:()=>ye([.75,.72,.48]),sculpt(p){p.y+=.01*Math.sin(p.x*80)*Math.cos(p.z*60)}}),{type:"frog",rig:t,skin:e.geometry(),eyes:n.geometry(),armor:s.geometry(),shell:o.geometry(),bracers:a.geometry(),crest:r.geometry(),mouth:x,length:1.7,height:.8,scale:1}}function er(i,t,e,n,s,r,o=.05){const a=Fe(...t).lerp(Fe(...e),.5);a.y+=o,i.leaf([t,a.toArray(),e],[.012,n,n*.7,.002],{bone:s,segments:13,across:6,ridge:.012,color:r,vein:!0})}function X_(){const i=Ta(),t=new Fn,e=new Fn,n=i.bone("pelvis",[0,2.45,-.16]),s=i.bone("spine",[0,2.79,.02],n),r=i.bone("neck0",[0,2.97,.24],s),o=i.bone("neck1",[0,3.35,.03],r),a=i.bone("neck2",[0,3.82,.18],o),l=i.bone("head",[0,4.19,.6],a),c=i.bone("jaw",[0,4.12,.7],l),h=i.bone("mouth",[0,4.11,1.48],c),u=i.bone("eyeL",[-.125,4.25,.69],l),d=i.bone("eyeR",[.125,4.25,.69],l),f=m=>{const x=Xn(2.7,3.02,m.y)*.35;return ye([.54-x,.59-x,.61-x])};t.tube([[0,2.43,-.95],[0,2.58,-.53],[0,2.78,-.05],[0,2.99,.27]],[.02,.34,.41,.14],[.02,.39,.48,.18],{segments:30,radial:28,bones:[n,n,s,s],paint:f}),t.tube([[0,2.97,.24],[0,3.22,.16],[0,3.46,.015],[0,3.83,.18],[0,4.12,.52],[0,4.21,.65]],[.16,.15,.12,.1,.1,.13],[.17,.17,.14,.12,.13,.14],{segments:40,radial:20,bones:[r,r,o,a,l,l],paint(m,x,g){const p=Math.cos(g)>.7?.65:.9;return ye([p,p*.99,p*.91])}}),t.tube([[0,4.18,.36],[0,4.28,.57],[0,4.25,.76],[0,4.18,.91]],[.018,.15,.14,.045],[.02,.16,.14,.07],{segments:22,radial:20,bones:[l],paint(m){return m.y>4.32?ye([.07,.1,.12]):ye([.83,.86,.82])}}),t.tube([[0,4.19,.81],[0,4.18,1.04],[0,4.15,1.32],[0,4.12,1.6]],[.072,.055,.027,.001],[.06,.044,.022,.001],{segments:20,radial:10,bones:[l],paint(m,x){return ye([Ze(.74,.34,x),Ze(.47,.24,x),.075])}}),t.tube([[0,4.112,.81],[0,4.105,1.06],[0,4.103,1.36],[0,4.115,1.59]],[.063,.046,.022,.001],[.026,.02,.012,.001],{segments:18,radial:8,bones:[c],paint:()=>ye([.68,.38,.07])});for(const m of[-1,1]){const x=m<0?u:d;e.ellipsoid([m*.132,4.255,.69],[.029,.039,.043],{bone:x,rings:10,radial:18,paint:C=>Math.abs(C.x)>.022&&Math.abs(C.y)<.018&&Math.abs(C.z)<.021?ye([.005,.008,.006]):ye([.9,.7,.13])});const g=i.bone(`hip${m}`,[m*.14,2.47,-.12],n),p=i.bone(`knee${m}`,[m*.18,1.5,-.12],g),v=i.bone(`ankle${m}`,[m*.22,.16,.04],p),y=i.bone(`foot${m}`,[m*.22,.075,.15],v),_=(C,S)=>{const b=.8+.2*Math.sin(C.y*110);return ye([.38*b,.36*b,.21*b])};t.tube([[m*.14,2.47,-.12],[m*.18,1.73,-.15],[m*.18,1.5,-.12]],[.077,.04,.049],[.074,.037,.049],{segments:20,radial:12,bones:[g,g,p],paint:_}),t.tube([[m*.18,1.5,-.12],[m*.2,.7,-.02],[m*.22,.16,.04]],[.042,.024,.031],[.042,.023,.03],{segments:22,radial:10,bones:[p,p,v],paint:_});for(let C=0;C<4;C++){const S=C<3?(C-1)*.23:-.08,b=C<3?.54-.06*Math.abs(C-1):-.21;t.tube([[m*.22,.16,.04],[m*.22+S*.5,.065,(b+.04)*.55],[m*.22+S,.035,b]],[.025,.017,.006],[.023,.013,.005],{segments:12,radial:8,bones:[y],paint:_})}const T=i.bone(`wing${m}`,[m*.31,2.91,-.03],s),A=i.bone(`wingElbow${m}`,[m*.94,2.83,-.12],T),E=i.bone(`wingWrist${m}`,[m*1.5,2.68,-.24],A);t.leaf([[m*.31,2.91,-.03],[m*.95,2.84,-.18],[m*1.58,2.69,-.35]],[.08,.29,.1],{bones:[T,A,E],segments:22,across:10,ridge:.05,color:[.36,.43,.47]});for(let C=0;C<15;C++){const S=.42+C*.088,b=C<6?T:C<11?A:E;er(t,[m*S,2.89-C*.014,-.05-C*.012],[m*(S+.22+C*.009),2.73-C*.023,-.76-C*.018],.105-C*.002,b,[.26+C*.004,.32+C*.004,.36+C*.004]),C<12&&er(t,[m*S,2.94-C*.014,.035],[m*(S+.1),2.86-C*.017,-.44],.077,b,[.49,.55,.57])}for(let C=0;C<11;C++)er(t,[m*(.11+.015*C),2.86-.042*C,-.21],[m*(.29+.009*C),2.7-.044*C,-.75-.022*C],.075,s,[.51+C*.013,.56+C*.012,.56+C*.012]);er(t,[m*.065,4.34,.51],[m*.13,4.28,-.02],.018,l,[.04,.07,.09],.025)}for(let m=0;m<9;m++)er(t,[(m-4)*.045,2.53,-.65],[(m-4)*.075,2.34,-1.34-.1*(1-Math.abs(m-4)/4)],.07,n,[.21,.28,.31]);for(let m=0;m<9;m++)er(t,[(m-4)*.025,3.06,.35],[(m-4)*.044,2.48-.06*(m%3),.42],.032,s,[.79,.8,.72],.01);return{type:"heron",rig:i,skin:t.geometry(),eyes:e.geometry(),mouth:h,length:3,height:4.55,scale:1}}function q_(){const i=Ta(),t=new Fn,e=new Fn,n=new Fn,s=i.bone("head",[0,.27,1.97]),r=[s];for(let u=1;u<=20;u++)r.push(i.bone(`coil${u}`,[0,.23,1.97-u*.22],r[u-1]));const o=i.bone("jaw",[0,.205,2.1],s),a=i.bone("mouth",[0,.19,2.48],o),l=i.bone("eyeL",[-.183,.346,2.21],s),c=i.bone("eyeR",[.183,.346,2.21],s),h=(u,d,f)=>{const m=1-Xn(.13,.22,u.y),x=.73-.26*Xn(.2,.65,Math.sin(u.z*7+u.x*18));return ye([Ze(x,.65,m),Ze(x,.6,m),Ze(x,.36,m)],1-m)};t.tube([[0,.25,2.05],[0,.23,1.4],[0,.23,.5],[0,.22,-.4],[0,.18,-1.5],[0,.09,-2.46]],[.13,.186,.205,.18,.115,.002],[.11,.16,.17,.15,.09,.003],{segments:100,radial:20,bones:u=>bs(r,u),paint:h,distort(u,d,f){u.y+=.003*Math.sin(d*390)*Math.sin(f*12)}}),t.tube([[0,.265,1.86],[0,.29,2.07],[0,.285,2.27],[0,.245,2.48]],[.115,.237,.202,.035],[.1,.12,.105,.038],{segments:24,radial:24,bones:[s],paint:h}),t.tube([[0,.192,1.99],[0,.179,2.25],[0,.207,2.47]],[.14,.19,.025],[.027,.035,.006],{segments:18,radial:16,bones:[o],paint:()=>ye([.66,.63,.42])});for(const u of[-1,1])e.ellipsoid([u*.183,.346,2.21],[.045,.043,.05],{bone:u<0?l:c,rings:12,radial:20,rotationY:u*.9,paint(d){return Math.abs(d.x)<.012&&d.z>.015?ye([.009,.008,.005]):ye([.69,.51,.12])}}),t.tube([[u*.2,.228,2.06],[u*.197,.218,2.29],[u*.045,.225,2.475]],.004,.004,{segments:20,radial:6,bones:[s],paint:()=>ye([.05,.06,.025])}),n.tube([[0,.194,2.47],[0,.19,2.73],[u*.06,.18,2.84]],[.014,.01,.001],[.007,.005,.001],{segments:16,radial:6,bones:[o],paint:()=>ye([.28,.025,.035])});return{type:"snake",rig:i,skin:t.geometry(),eyes:e.geometry(),tongue:n.geometry(),mouth:a,length:5,height:.43,scale:1}}function $_(){const i=Ta(),t=new Fn,e=new Fn,n=i.bone("spine",[0,.6,.18]),s=i.bone("head",[0,.61,.78],n),r=i.bone("tail0",[0,.55,-.44],n),o=i.bone("tail1",[0,.49,-.99],r),a=i.bone("tail",[0,.48,-1.43],o),l=i.bone("jaw",[0,.42,1.03],s),c=i.bone("mouth",[0,.43,1.55],l),h=i.bone("eyeL",[-.22,.72,1.06],s),u=i.bone("eyeR",[.22,.72,1.06],s),d=g=>{const p=1-Xn(.35,.62,g.y),v=.74-.25*Xn(.1,.6,Math.sin(g.z*18+g.y*29)*Math.sin(g.y*35));return ye([Ze(v,.81,p),Ze(v,.78,p),Ze(v,.61,p)],1-p)};t.tube([[0,.48,-1.46],[0,.51,-.92],[0,.61,-.28],[0,.64,.34],[0,.62,.84],[0,.55,1.24],[0,.52,1.56]],[.018,.15,.31,.35,.29,.19,.027],[.035,.22,.46,.48,.32,.19,.05],{segments:54,radial:28,bones:g=>bs([a,o,r,n,s,s,s],g),paint:d}),t.tube([[0,.43,.92],[0,.36,1.25],[0,.445,1.56]],[.14,.16,.025],[.055,.065,.018],{segments:18,radial:18,bones:[l],paint:()=>ye([.72,.69,.49])});const f=[.33,.4,.23],m=t.p.length/3;for(let g=0;g<=18;g++){const p=g/18,v=Math.cos(p*Math.PI)*.62,y=-1.45-(.3+.3*Math.abs(Math.cos(p*Math.PI)));for(let _=0;_<=6;_++){const T=_/6,A=Fe(.025*Math.sin(p*Math.PI),.48+v*T,Ze(-1.43,y,T)),E=g%2?.85:1.15;t.vertex(A,[T,p],[[a,1]],ye(f.map(C=>C*E),.3))}}for(let g=0;g<18;g++)for(let p=0;p<6;p++){const v=m+g*7+p;t.quad(v,v+1,v+7,v+8)}const x=(g,p,v,y,_=1)=>{const T=Fe(...g).lerp(Fe(...p),.5);T.x+=_*v,t.leaf([g,T.toArray(),p],[.01,v*.8,.003],{bone:y,segments:16,across:8,ridge:.014,color:f,mask:.3})};for(const g of[-1,1]){e.ellipsoid([g*.22,.72,1.06],[.052,.07,.08],{bone:g<0?h:u,rings:12,radial:22,rotationY:g*1,paint(v){return v.z>.035&&Math.pow(v.x/.035,2)+Math.pow(v.y/.04,2)<1?ye([.005,.007,.004]):ye([.75,.59,.18])}});const p=i.bone(`fin${g}`,[g*.255,.42,.65],n);x([g*.255,.42,.65],[g*.63,.21,.11],.16,p,g),x([g*.2,.26,-.11],[g*.38,.13,-.57],.12,r,g),t.tube([[g*.24,.86,.71],[g*.31,.64,.67],[g*.24,.39,.69]],.009,.011,{segments:20,radial:6,bones:[s],paint:()=>ye([.19,.24,.12],.3)});for(let v=0;v<8;v++){const y=1.18+v*.04,_=g*(.12-v*.009);t.tube([[_,.445,y],[_*.9,.475,y+.005]],[.008,.001],[.008,.001],{segments:3,radial:5,bones:[l],paint:()=>ye([.78,.76,.56])})}}for(const g of[!0,!1]){const p=t.p.length/3,v=22;for(let y=0;y<=v;y++){const _=y/v,T=Ze(-.9,.18,_),A=g?.8+.22*_:.26-.1*_,E=Math.sin(Math.PI*_)*(g?.45:-.24),C=_<.5?r:n;for(let S=0;S<=6;S++){const b=S/6,U=Fe(.012*Math.sin(_*6),A+E*b,T-.1*b);t.vertex(U,[b,_],[[C,1]],ye(f.map(P=>P*(y%2?.85:1.1)),.2))}}for(let y=0;y<v;y++)for(let _=0;_<6;_++){const T=p+y*7+_;t.quad(T,T+1,T+7,T+8)}}return{type:"fish",rig:i,skin:t.geometry(),eyes:e.geometry(),mouth:c,length:3.65,height:1.65,scale:1}}function Y_(i){if(El.has(i))return El.get(i);const t=256,e=new Uint8Array(t*t*4);for(let s=0;s<t;s++)for(let r=0;r<t;r++){const o=r/t,a=s/t;let l=.82+Wr(r,s)*.18;if(i==="frog"){const d=Math.floor(o*28),f=Math.floor(a*28),m=o*28-d-.5,x=a*28-f-.5,g=Math.hypot(m,x),p=Math.exp(-g*g*38)*(.1+Wr(d,f)*.18);l=.79+.16*Wr(r,s)+p-.11*Math.exp(-Math.pow(g-.31,2)*300)}else if(i==="snake"||i==="fish"){const u=i==="snake"?28:35,d=a*u,f=Math.floor(d),m=o*20+f%2*.5,x=m-Math.floor(m)-.5,g=d-f-.5,p=Math.abs(x)*1.4+Math.abs(g);l=.74+.22*(1-Xn(.49,.72,p))+.04*Wr(r,s)}else l=.79+.15*Math.sin(o*170+.4*Math.sin(a*31))**2+.06*Wr(r,s);const c=(s*t+r)*4,h=Math.floor($e(l)*255);e[c]=e[c+1]=e[c+2]=h,e[c+3]=255}const n=new Yc(e,t,t,On);return n.wrapS=n.wrapT=yr,n.magFilter=ii,n.minFilter=Ji,n.generateMipmaps=!0,n.needsUpdate=!0,n.repeat.set(i==="heron"?1:2,i==="frog"?3:2),El.set(i,n),n}function Z_(i,t){const e=Y_(i),n=new Td({color:16777215,vertexColors:!0,map:e,bumpMap:e,bumpScale:i==="frog"?.013:i==="heron"?.007:.009,roughness:i==="frog"?.32:i==="heron"?.68:.37,metalness:0,clearcoat:i==="heron"?0:.42,clearcoatRoughness:.25,envMapIntensity:.8,side:Pe}),s=new ee(t);return n.userData.tint=s,n.onBeforeCompile=r=>{r.uniforms.skinTint={value:s},r.vertexShader=`attribute float skinTintMask; varying float vSkinTint;
`+r.vertexShader,r.vertexShader=r.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
 vSkinTint = skinTintMask;`),r.fragmentShader=`uniform vec3 skinTint; varying float vSkinTint;
`+r.fragmentShader,r.fragmentShader=r.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
 diffuseColor.rgb *= mix(vec3(1.0),skinTint,vSkinTint);`)},n.customProgramCacheKey=()=>"anatomical-skin-v3",n}function j_(i,t){const e=new _n({color:i,side:Pn,transparent:!0,opacity:.91,depthWrite:!1,toneMapped:!1});return e.userData.thickness={value:t},e.onBeforeCompile=n=>{n.uniforms.outlineThickness=e.userData.thickness,n.vertexShader=`uniform float outlineThickness;
`+n.vertexShader,n.vertexShader=n.vertexShader.replace("#include <begin_vertex>","vec3 transformed = position + normal * outlineThickness;")},e.customProgramCacheKey=()=>"skeletal-silhouette-v3",e}function K_(i){const t=i.map(e=>{const n=new yd;return n.name=e.name,n});for(let e=0;e<i.length;e++){const n=i[e];t[e].position.fromArray(n.p),n.parent!==null&&n.parent!==void 0&&(t[e].position.sub(Fe(...i[n.parent].p)),t[n.parent].add(t[e]))}return{bones:t,skeleton:new Zc(t),root:t[0]}}function J_(){if(!Yi){const n=[],s=[];for(let o=0;o<=48;o++){const a=o/48*ci,l=Math.sin(a),c=Math.cos(a),h=Math.abs(o%8-4)/4,u=-.018*c,d=u+.1+.205*h,f=1+.08*h;n.push(l*.255,u,c*.175,l*.27*f,d,c*.188*f,l*.231,u,c*.151,l*(.27*f-.024),d,c*(.188*f-.024))}for(let o=0;o<48;o++){const a=o*4,l=a+4;s.push(a,l,a+1,l,l+1,a+1),s.push(a+2,a+3,l+2,l+2,a+3,l+3),s.push(a+1,l+1,a+3,l+1,l+3,a+3),s.push(a,a+2,l,l,a+2,l+2)}Yi=new we,Yi.setAttribute("position",new Gt(n,3)),Yi.setIndex(s),Yi.computeVertexNormals(),Yi.computeBoundingSphere(),Yi.computeBoundingBox(),Tl=new eh(.047,0),Tl.scale(.78,1.05,.5)}const i=new te;i.name="royal-crown",i.position.set(0,.22,-.11);const t=new Zt(Yi,new Ve({color:15910746,roughness:.29,metalness:.58,emissive:5911813,emissiveIntensity:.12}));t.name="royal-crown-gold",t.castShadow=!0,t.receiveShadow=!0,i.add(t);const e=new Zt(Tl,new Ve({color:14562379,roughness:.18,metalness:.2,flatShading:!0,emissive:4785420,emissiveIntensity:.12}));return e.name="royal-crown-ruby",e.position.set(0,.042,.195),i.add(e),i}function Wu(i,t=0){const e=i==="frog"&&t?`${i}:${t}`:i;if(!wl.has(e)){const n=i==="frog"?Vu([1,.36,.18][t]):({heron:X_,snake:q_,fish:$_}[i]||Vu)();for(const s of["skin","eyes","armor","shell","bracers","crest","tongue"])n[s]?.boundingSphere&&(n[s].boundingSphere.radius*=1.9);wl.set(e,n)}return wl.get(e)}function Rl(i,t,e,n,s,r,o){const a=Math.hypot(n.y,n.z),l=Math.hypot(s.y,s.z),c=n.y+s.y+r,h=n.z+s.z+o,u=Math.max(Math.abs(a-l)+1e-5,Math.min(a+l-1e-5,Math.hypot(c,h))),d=Math.atan2(h,c),f=-Math.sign(n.y*s.z-n.z*s.y)||1,m=Math.acos($e((a*a+u*u-l*l)/(2*a*u),-1,1)),x=d+f*m,g=x-Math.atan2(n.z,n.y);i.rotation.x=Math.atan2(Math.sin(g),Math.cos(g));const p=Math.cos(x)*a,v=Math.sin(x)*a,y=Math.atan2(h-v,c-p)-i.rotation.x-Math.atan2(s.z,s.y);t.rotation.x=Math.atan2(Math.sin(y),Math.cos(y)),e.rotation.x=-i.rotation.x-t.rotation.x}function Q_(i,t){if(!i)return{type:"",phase:0,force:0};let e="kick",n=t;return typeof i=="string"?e=i:typeof i=="number"?n=i:(e=i.type||i.kind||"kick",n=i.phase??i.progress??t),n=$e(n),{type:e,phase:n,force:Math.sin(n*Math.PI)}}function Cl(i,t,e){const n=i.points;if(t<=n[0].s)return e.copy(n[0]),e;for(let s=1;s<n.length;s++)if(t<=n[s].s){const r=n[s-1],o=n[s],a=(t-r.s)/(o.s-r.s||1);return e.set(Ze(r.x,o.x,a),Ze(r.y,o.y,a),Ze(r.z,o.z,a))}return e.copy(n.at(-1)),e}function t1(i="frog",t={}){["frog","heron","snake","fish"].includes(i)||(i="frog");const e=Wu(i),n=new te,s=new te;n.name=`creature-${i}`,s.name="anatomical-animation-pivot",n.add(s);const r=i==="frog"?7378989:i==="snake"?6715206:i==="fish"?8624996:16777215,o=Z_(i,t.color??r);o.emissive.set(16777215),o.emissiveIntensity=0;const a=new Td({color:16777215,vertexColors:!0,roughness:.13,clearcoat:1,clearcoatRoughness:.05,metalness:.05}),{bones:l,skeleton:c,root:h}=K_(e.rig.defs),u=new No(e.skin,o);u.name=`${i}-weighted-surface`,u.add(h),s.add(u),u.castShadow=!0,u.receiveShadow=!0,u.frustumCulled=!0,n.updateMatrixWorld(!0),u.bind(c);const d=new No(e.eyes,a);d.name="articulated-eyes",d.bind(c,u.bindMatrix),d.castShadow=!1,d.frustumCulled=!0,s.add(d);const f=new No(e.skin,j_(t.outlineColor??(t.team==="enemy"?16741200:t.team==="player"?11075554:i==="frog"?8513956:16755275),i==="frog"?.018:.027));f.name="animated-color-silhouette",f.bind(c,u.bindMatrix),f.frustumCulled=!0,f.renderOrder=-1,s.add(f);const m=[];for(const ht of["armor","shell","bracers","crest","tongue"])if(e[ht]){const Y=new Ve({color:16777215,vertexColors:!0,roughness:ht==="tongue"?.35:.79,side:Pe}),rt=new No(e[ht],Y);rt.name=ht,rt.bind(c,u.bindMatrix),rt.frustumCulled=!0,rt.castShadow=ht!=="tongue",rt.visible=ht==="tongue",s.add(rt),m.push(rt)}const x={};for(const ht of l)x[ht.name]=ht;const g=l.map(ht=>ht.position.clone()),p=new We;p.name="mouth-attachment",l[e.mouth].add(p);let v=(t.seed||0)*.731,y=0,_="",T=1,A=0,E=0,C=0,S=!0,b=!1,U=null,P=1,G=!1,j=0,H={x:0,z:1,strength:0,life:0,duration:.26,heavy:!1},q={armor:null,weapon:null,crest:!1};const B=t.role||"scout",O=i==="frog"?["guardian","brute","tank"].includes(B)?[1.15,1.12,1.05]:["scout","hunter","agile"].includes(B)?[.96,.98,1.04]:[1.03,1.02,1.02]:[1,1,1];s.scale.set(...O);const Q=()=>{const ht=1+(T-1)*.04+Math.min(24,Math.max(0,P-1))*.004;s.scale.set(O[0]*ht,O[1]*ht,O[2]*ht)},W=()=>{for(const ht of m)ht.name==="armor"&&(ht.visible=i==="frog"&&q.armor==="reed"),ht.name==="shell"&&(ht.visible=i==="frog"&&q.armor==="shell"),ht.name==="bracers"&&(ht.visible=i==="frog"&&q.weapon==="reed"),ht.name==="crest"&&(ht.visible=i==="frog"&&q.crest&&!b)},ft=()=>{for(let ht=0;ht<l.length;ht++)l[ht].rotation.set(0,0,0),l[ht].scale.set(1,1,1),l[ht].position.copy(g[ht])};let Vt=null;function Me(ht){if(i!=="snake"||!ht?.points?.length||!ht.weight)return;Vt||(Vt={targets:Array.from({length:21},()=>new he),local:new he,inverse:new he,point:Fe(),before:Fe(),after:Fe(),translation:Fe(),rotation:new ns,scale:Fe(1,1,1),localPosition:Fe(),localRotation:new ns,localScale:Fe()});const Y=Vt,rt=$e(ht.weight),yt=ht.scale||1,Xt=ht.origin,kt=Math.cos(ht.yaw||0),fe=Math.sin(ht.yaw||0);s.position.y*=1-rt,s.rotation.x*=1-rt,s.rotation.z*=1-rt;for(let I=0;I<=20;I++){const ne=I?x["coil"+I]:x.head,Yt=1.97-I*.22,qt=(I?Yt:2.17)*yt;Cl(ht,qt,Y.point),Cl(ht,qt-.07*yt,Y.before),Cl(ht,qt+.07*yt,Y.after);const Lt=Y.after.x-Y.before.x,se=Y.after.z-Y.before.z,mt=Math.hypot(Lt,se),bt=mt>1e-4?Math.atan2(Lt,se):ht.yaw||0;I||(Y.point.x-=Math.sin(bt)*.2*yt,Y.point.z-=Math.cos(bt)*.2*yt);const le=(Y.point.x-Xt.x)/yt,De=(Y.point.z-Xt.z)/yt,D=Math.max(Y.point.y,Y.before.y,Y.after.y);Y.translation.set(kt*le-fe*De,(D-Xt.y)/yt+(I?.26:.3),fe*le+kt*De),Y.rotation.setFromAxisAngle(Pc,bt-(ht.yaw||0)),Y.targets[I].compose(Y.translation,Y.rotation,Y.scale),Y.local.copy(Y.targets[I]),I&&Y.local.premultiply(Y.inverse.copy(Y.targets[I-1]).invert()),Y.local.decompose(Y.localPosition,Y.localRotation,Y.localScale),ne.position.lerp(Y.localPosition,rt),ne.quaternion.slerp(Y.localRotation,rt),ne.scale.lerp(Y.localScale,rt)}x.jaw.rotation.x*=1-rt*.8;const Ee=m.find(I=>I.name==="tongue");Ee&&rt>.8&&(Ee.visible=!1)}const ce={group:n,bones:x,skeleton:c,mesh:u,get crowned(){return b},get equipment(){return{...q}},get level(){return P},get working(){return G},stats:{type:i,vertices:e.skin.attributes.position.count+e.eyes.attributes.position.count,triangles:(e.skin.index.count+e.eyes.index.count)/3,boneCount:l.length,length:e.length,height:e.height,rigged:!0,renderLOD:0},setOutline(ht,Y=!0){ht!=null&&f.material.color.set(ht),S=Y,f.visible=Y&&C===0},setRenderLOD(ht=0){const Y=i==="frog"?$e(Math.round(Number(ht)||0),0,2):0;if(Y===C)return;C=Y;const rt=Wu(i,Y);for(const yt of[u,d,f,...m])yt.geometry=rt[yt===u||yt===f?"skin":yt===d?"eyes":yt.name],yt.boundingSphere=null,yt.boundingBox=null,yt.castShadow=Y===0&&yt!==d&&yt!==f&&yt.name!=="tongue";f.visible=S&&Y===0,U&&(U.getObjectByName("royal-crown-gold").castShadow=Y===0),ce.stats.vertices=rt.skin.attributes.position.count+rt.eyes.attributes.position.count,ce.stats.triangles=(rt.skin.index.count+rt.eyes.index.count)/3,ce.stats.renderLOD=Y},setTier(ht){T=$e(Math.round(ht||1),1,5),Q()},setLevel(ht){P=$e(Math.floor(Number(ht)||1),1,999),Q()},setEquipment(ht={}){return q=i==="frog"?{armor:["reed","shell"].includes(ht?.armor)?ht.armor:null,weapon:ht?.weapon==="reed"?"reed":null,crest:ht?.crest===!0}:{armor:null,weapon:null,crest:!1},W(),{...q}},setWorking(ht=!1){G=i==="frog"&&!!ht},setImpact(ht={}){const Y=$e(Number(ht.strength)||0,0,1.5),rt=Number(ht.x)||0,yt=Number(ht.z)||0,Xt=Math.hypot(rt,yt)||1,kt=$e(Number(ht.duration)||.26,.08,.5);H={x:rt/Xt,z:yt/Xt,strength:Y,life:Y?kt:0,duration:kt,heavy:!!ht.heavy},o.emissiveIntensity=Y?Math.min(.82,.34+Y*.35):0},setCrowned(ht=!1){return b=i==="frog"&&!!ht,b&&!U&&(U=J_(),x.head.add(U)),U&&(U.visible=b,U.getObjectByName("royal-crown-gold").castShadow=C===0),W(),b},mouthWorld(ht=new L){return n.updateWorldMatrix(!0,!0),p.getWorldPosition(ht)},update(ht,Y={}){ht=$e(Number(ht)||0,0,.1),v=Y.time!==void 0?Y.time+(t.seed||0)*.731:v+ht,ft();const rt=Math.max(0,Number(Y.speed)||0),yt=$e(rt/(i==="frog"?2.8:3));E=Ze(E,yt,1-Math.exp(-ht*12));const Xt=Y.swimming?1:0,kt=typeof Y.jump=="number"?$e(Y.jump):Y.jump?.5:0,fe=typeof Y.attack=="string"?Y.attack:Y.attack?.type||Y.attack?.kind||(Y.attack?"kick":"");fe!==_?(y=0,_=fe):Y.attack&&(y+=ht/.55);const Ee=Q_(Y.attack,y),I=Ee.force,ne=typeof Y.roar=="number"?$e(Y.roar):Y.roar?1:0,Yt=typeof Y.hit=="number"?$e(Y.hit):Y.hit?1:0;H.life=Math.max(0,H.life-ht),o.emissiveIntensity=H.life>0?Math.max(0,1-(H.duration-H.life)/.07)*Math.min(.82,.34+H.strength*.35):0,Y.building!==void 0&&(G=i==="frog"&&!!Y.building),j=Ze(j,G&&!Y.dead&&!Ee.type&&rt<1?1:0,1-Math.exp(-ht*12)),A=Ze(A,Y.dead?1:0,1-Math.exp(-ht*5)),s.position.set(0,0,0),s.rotation.set(0,0,0);const qt=(v+(t.seed||0)*.4)%5.7,Lt=qt>5.5?.08+.92*Math.abs((qt-5.6)*10):1;if(x.eyeL&&(x.eyeL.scale.y=$e(Lt,.08,1)),x.eyeR&&(x.eyeR.scale.y=$e(Lt,.08,1)),i==="frog"){const se=Y.hop||(kt>0?{phase:"air",progress:1-kt}:{phase:"idle",progress:0}),mt=$e(se.progress||0),bt=se.phase==="air",le=se.phase==="gather"?mt:0,De=se.phase==="land"?Math.sin(mt*Math.PI):0,D=bt?Math.sin($e(mt/.14)*Math.PI/2)*(1-$e((mt-.16)/.48)):0,w=bt?$e((mt-.82)/.18):0,tt=bt?1-$e(mt/.14):0,at=bt?$e((mt-.25)/.45)*(1-w):0,lt=bt?$e((mt-.6)/.35):0,ot=v*7.8,Ut=Math.sin(ot)*E;s.position.y=Xt?-.14+.023*Math.sin(v*3):-.085*(le+tt)-.075*De,s.rotation.x=Xt?-.12:(le+tt)*.07-(bt?Math.sin(mt*Math.PI)*.12:0)+lt*.08*(1-w),x.spine.rotation.x=Math.sin(v*2.6)*.009,x.spine.scale.y=1+Math.sin(v*2.6)*.018,x.head.rotation.x=.02*Math.sin(v*1.7)-ne*.18-(bt?.04:0),x.jaw.rotation.x=-ne*.13-(Ee.type==="tongue"?I*.16:0),x.throat.scale.set(1+ne*.26,1+ne*1.45+Math.sin(v*2.5)*.035,1+ne*.25);for(const ct of[-1,1])if(Xt)x[`hip${ct}`].rotation.x=-.32*Ut,x[`hip${ct}`].rotation.z=ct*.07*Ut,x[`knee${ct}`].rotation.x=.62*Ut,x[`ankle${ct}`].rotation.x=-.25*Ut,x[`foot${ct}`].rotation.x=.2*Ut,x[`shoulder${ct}`].rotation.x=-.23*Ut,x[`elbow${ct}`].rotation.x=.28*Ut,x[`wrist${ct}`].rotation.x=-.12*Ut,x[`shoulder${ct}`].rotation.z=ct*(.22+.25*Ut),x[`elbow${ct}`].rotation.y=ct*.3;else if(!Y.dead){const wt=e.rig.ids,Pt=bt?.085*tt+(-.1*D+.045*at)*(1-tt):-s.position.y,gt=bt?.035*tt+(-.42*D+.11*at)*(1-tt):.035*le,Rt=bt?.085*tt+(.085*(1-lt)-.035*lt)*(1-w)*(1-tt):-s.position.y,jt=bt?(-.075*(1-lt)+.13*lt)*(1-w)*(1-tt):0;Rl(x[`hip${ct}`],x[`knee${ct}`],x[`ankle${ct}`],g[wt[`knee${ct}`]],g[wt[`ankle${ct}`]],Pt,gt),Rl(x[`shoulder${ct}`],x[`elbow${ct}`],x[`wrist${ct}`],g[wt[`elbow${ct}`]],g[wt[`wrist${ct}`]],Rt,jt),x[`foot${ct}`].rotation.x=-D*.14}if(Ee.type==="kick"||Ee.type==="strike"){s.rotation.y=-I*.55,s.rotation.z=I*.22,s.position.y+=I*.16;const ct=e.rig.ids;Rl(x.hip1,x.knee1,x.ankle1,g[ct.knee1],g[ct.ankle1],.26*I,1.16*I),x.hip1.rotation.y=-I*.3,x.hip1.rotation.z=-I*.08,x["shoulder-1"].rotation.z=I*.55}else if(Ee.type==="slam"||Ee.type==="belly"){const ct=Math.sin(Ee.phase*Math.PI);s.rotation.x=-ct*.28,s.position.y+=ct*.22;for(const wt of[-1,1])x[`hip${wt}`].rotation.x-=ct*.7,x[`shoulder${wt}`].rotation.z=wt*ct*.45}else Ee.type==="tongue"&&(x.head.rotation.x-=I*.1,x.spine.rotation.x-=I*.07);if(j>.001){const ct=v*8.2,wt=.5+.5*Math.sin(ct),Pt=.5+.5*Math.sin(ct+Math.PI);x.spine.rotation.x+=.1*j,x.head.rotation.x+=(.12+.06*wt)*j,x.shoulder1.rotation.x-=(.25+wt*.85)*j,x.elbow1.rotation.x+=(.2+wt*.55)*j,x.wrist1.rotation.x-=wt*.3*j,x["shoulder-1"].rotation.x-=(.13+Pt*.35)*j,x["elbow-1"].rotation.x+=(.15+Pt*.2)*j,s.position.y+=.025*Math.cos(ct)*j}if(H.life>0){const ct=1-H.life/H.duration,wt=Math.sin(Math.min(1,ct/.22)*Math.PI/2)*Math.pow(1-ct,1.8)*H.strength,Pt=wt*(H.heavy?1.2:1);s.rotation.x+=H.z*.17*Pt,s.rotation.z-=H.x*.21*Pt,s.position.x+=H.x*.045*Pt,s.position.z+=H.z*.055*Pt,x.spine.scale.z*=1-.075*wt,x.head.rotation.x-=.15*Pt,x.head.rotation.z-=H.x*.08*Pt,x.jaw.rotation.x-=.12*Pt,x["shoulder-1"].rotation.z-=.1*Pt,x.shoulder1.rotation.z+=.1*Pt,x.eyeL.scale.y*=1-.55*wt,x.eyeR.scale.y*=1-.55*wt}else Yt>0&&(s.rotation.x+=Yt*.065);s.position.y-=A*.22,s.rotation.z+=A*1.35,x.spine.scale.y*=1-A*.15}else if(i==="heron"){const se=v*5.6,mt=E;s.position.y=.035*Math.sin(se*2)*mt,x.spine.rotation.x=-.03*Math.sin(se)*mt,x.neck0.rotation.x=.1*Math.sin(v*1.4)-I*.62,x.neck1.rotation.x=-.08*Math.sin(v*1.4)+I*.58,x.neck2.rotation.x=-.03+I*.7,x.head.rotation.x=-.06*Math.sin(v*1.8)+I*.48,x.jaw.rotation.x=-I*.5;for(const bt of[-1,1]){const le=se+(bt<0?Math.PI:0),De=Math.sin(le);x[`hip${bt}`].rotation.x=De*.31*mt,x[`knee${bt}`].rotation.x=Math.max(0,-De)*.57*mt,x[`foot${bt}`].rotation.x=-.18*De*mt,x[`wing${bt}`].rotation.y=bt*(1.24-I*1.07-Yt*.55),x[`wing${bt}`].rotation.z=bt*(.07+I*(.5+.25*Math.sin(v*18))+Yt*.5),x[`wingElbow${bt}`].rotation.y=bt*.12,x[`wingWrist${bt}`].rotation.z=bt*I*.18}s.rotation.z+=(H.life>0?0:Yt*.08*Math.sin(v*32))+A*1.45,s.position.y-=A*1.8}else if(i==="snake"){const se=v*(3+E*5),mt=.055+E*.105;for(let le=1;le<=20;le++)x[`coil${le}`].rotation.y=Math.sin(se-le*.48)*mt,x[`coil${le}`].rotation.x=le<6?-I*.18*(1-le/7):.006*Math.sin(v*3-le);x.head.rotation.x=I*.45,x.head.rotation.y=Math.sin(se)*.035,x.jaw.rotation.x=-I*.62,s.position.y=I*.28;const bt=m.find(le=>le.name==="tongue");bt&&(bt.visible=!Y.dead&&(Math.sin(v*3.7)>.77||I>.2)),s.rotation.z=A*.65+(H.life>0?0:Yt*.1*Math.sin(v*32))}else if(i==="fish"){const se=v*(4+E*10),mt=.09+E*.22;x.spine.rotation.y=Math.sin(se)*mt*.2,x.head.rotation.y=-Math.sin(se)*mt*.13,x.tail0.rotation.y=Math.sin(se-.5)*mt,x.tail1.rotation.y=Math.sin(se-1.1)*mt*1.25,x.tail.rotation.y=Math.sin(se-1.6)*mt*1.2,x.jaw.rotation.x=-I*.62-.035*Math.sin(v*2.5);for(const bt of[-1,1])x[`fin${bt}`].rotation.z=bt*(.13+.16*Math.sin(v*6)),x[`fin${bt}`].rotation.y=bt*.15*Math.sin(v*5);s.rotation.x=-I*.35,s.position.y=.035*Math.sin(v*2),s.rotation.z=A*Math.PI+(H.life>0?0:Yt*.14*Math.sin(v*35))}if(i!=="frog"&&H.life>0){const se=1-H.life/H.duration,mt=Math.sin(Math.min(1,se/.22)*Math.PI/2)*Math.pow(1-se,1.8)*H.strength*(H.heavy?1.2:1);s.rotation.x+=H.z*.055*mt,s.rotation.z-=H.x*.08*mt,x.head.rotation.x-=.075*mt,x.head.rotation.z-=H.x*.05*mt}i==="snake"&&Me(Y.snakePose)},dispose(){o.dispose(),a.dispose(),f.material.dispose();for(const ht of m)ht.material.dispose();U&&U.traverse(ht=>{ht.isMesh&&ht.material.dispose()}),c.dispose(),n.removeFromParent()}};return ce.setTier(t.tier||1),ce.setLevel(t.level||1),ce.setEquipment(t.equipment),ce.setCrowned(t.crowned),ce.update(0,{}),n.userData.creature=ce,ce}const Dn=(i,t)=>Object.freeze({x:i,z:t}),pr=["player","rival-1","rival-2"],e1=.78,gi=.84,Cn=1e-5,Aa=Object.freeze([{id:"catapult-player",enclosureId:"yard-player",owner:pr[0],x:-8.5,z:16},{id:"catapult-rival-1",enclosureId:"yard-rival-1",owner:pr[1],x:-16,z:-8.5},{id:"catapult-rival-2",enclosureId:"yard-rival-2",owner:pr[2],x:16,z:-8.5}].map(Object.freeze)),Hn=Object.freeze([{id:"base-player",owner:pr[0],x:0,z:20.5,spawn:Dn(0,19.65),spawnHeading:Math.PI,stock:Dn(0,21.4),gate:Dn(0,17.9),approach:Dn(0,16.25),side:"north",halfWidth:3.1,halfDepth:2.6},{id:"base-rival-1",owner:pr[1],x:-18,z:1,spawn:Dn(-17.35,1),spawnHeading:Math.PI/2,stock:Dn(-19.1,1),gate:Dn(-14.9,1),approach:Dn(-13.25,1),side:"east",halfWidth:3.1,halfDepth:2.9},{id:"base-rival-2",owner:pr[2],x:18,z:1,spawn:Dn(17.35,1),spawnHeading:-Math.PI/2,stock:Dn(19.1,1),gate:Dn(14.9,1),approach:Dn(13.25,1),side:"west",halfWidth:3.1,halfDepth:2.9}].map(Object.freeze));function Fd(i,t){return i.map(e=>{let n=-1/0,s=1/0;const r=e.halfWidth+.18,o=e.halfDepth+.18,a=Math.ceil(r*2/.22),l=Math.ceil(o*2/.22);for(let g=0;g<=a;g++)for(let p=0;p<=l;p++){const v=-r+r*2*g/a,y=-o+o*2*p/l,_=t(e.x+v,e.z+y);n=Math.max(n,_),s=Math.min(s,_)}const c=n+.16,h=Math.hypot(e.gate.x-e.x,e.gate.z-e.z),u=(e.gate.x-e.x)/h,d=(e.gate.z-e.z)/h,f=-d,m=u,x={x:e.gate.x+u*.18,z:e.gate.z+d*.18,dx:u,dz:d,rightX:f,rightZ:m,halfWidth:1.55,length:2.5,rows:10,cols:6,heights:[]};for(let g=0;g<=x.rows;g++)for(let p=0;p<=x.cols;p++){const v=g/x.rows*x.length,y=(p/x.cols*2-1)*x.halfWidth,_=x.x+u*v+f*y,T=x.z+d*v+m*y,A=t(x.x+u*x.length+f*y,x.z+d*x.length+m*y)+.015;x.heights.push(Math.max(c+(A-c)*g/x.rows,t(_,T)+.015))}return{id:e.id,baseId:e.id,x:e.x,z:e.z,halfWidth:r,halfDepth:o,height:c,minimum:s,ramp:x}})}function n1(i){return Fd(Hn,i)}function i1(i){return Fd(Od,i)}function s1(i,t,e){if(!e)return null;for(const n of e){if(Math.abs(i-n.x)<=n.halfWidth+1e-7&&Math.abs(t-n.z)<=n.halfDepth+1e-7)return n.height;const s=n.ramp,r=i-s.x,o=t-s.z,a=r*s.dx+o*s.dz,l=r*s.rightX+o*s.rightZ;if(a<-1e-7||a>s.length+1e-7||Math.abs(l)>s.halfWidth+1e-7)continue;const c=Math.max(0,Math.min(s.rows,a/s.length*s.rows)),h=Math.max(0,Math.min(s.cols,(l/s.halfWidth+1)*.5*s.cols)),u=Math.min(s.rows-1,Math.floor(c)),d=Math.min(s.cols-1,Math.floor(h)),f=c-u,m=h-d,x=s.heights[u*(s.cols+1)+d],g=s.heights[u*(s.cols+1)+d+1],p=s.heights[(u+1)*(s.cols+1)+d],v=s.heights[(u+1)*(s.cols+1)+d+1];return(x+(g-x)*m)*(1-f)+(p+(v-p)*m)*f}return null}const Od=Object.freeze(Aa.map(i=>Object.freeze({id:i.enclosureId,owner:i.owner,x:i.x,z:i.z,halfWidth:2.8,halfDepth:2.8,side:"south",gate:Dn(i.x,i.z+2.8),approach:Dn(i.x,i.z+4.45)}))),Ra=Object.freeze([...Hn.map(i=>Object.freeze({...i,kind:"shelter",height:2.3})),...Od.map(i=>Object.freeze({...i,kind:"catapult",height:1.65}))]),jo=3.2,nr=.34;function r1(i){const t=[],e=(n,s,r,o,a,l="whole")=>t.push(Object.freeze({id:`${i.id}-${n}-${l}`,enclosureId:i.id,owner:i.owner,x:s,z:r,hw:o,hd:a,height:i.height}));for(const n of["north","south"]){const s=i.z+(n==="north"?-i.halfDepth:i.halfDepth);if(i.side===n){const r=(i.halfWidth-jo/2)/2;for(const o of[-1,1])e(n,i.x+o*(jo/2+r),s,r,nr/2,String(o))}else e(n,i.x,s,i.halfWidth+nr/2,nr/2)}for(const n of["west","east"]){const s=i.x+(n==="west"?-i.halfWidth:i.halfWidth);if(i.side===n){const r=(i.halfDepth-jo/2)/2;for(const o of[-1,1])e(n,s,i.z+o*(jo/2+r),nr/2,r,String(o))}else e(n,s,i.z,nr/2,i.halfDepth+nr/2)}return t}const Es=Object.freeze(Ra.flatMap(r1)),ah=Object.freeze([{id:"grove-west",x:-7,z:9,radius:3.1},{id:"grove-east",x:8,z:6.4,radius:3.1},{id:"grove-middle",x:0,z:-4.5,radius:3.4},{id:"grove-northwest",x:-7.2,z:-8.8,radius:2.5},{id:"grove-northeast",x:7.6,z:-9.2,radius:2.5}].map(Object.freeze)),fo=Object.freeze([{x:-8,z:2,r:1.5},{x:8,z:-3,r:1.7},{x:-2,z:-12,r:1.4},{x:13,z:12,r:1.6},...Aa.map(i=>({x:i.x,z:i.z,r:.95,machine:!0}))]);function Ca(i,t=0){return{minX:i.x-i.hw-t,maxX:i.x+i.hw+t,minZ:i.z-i.hd-t,maxZ:i.z+i.hd+t}}function lh(i,t,e,n=0){return i>e.minX+n&&i<e.maxX-n&&t>e.minZ+n&&t<e.maxZ-n}function Bd(i,t,e,n,s,r=0){const o=Ca(s,r),a=e-i,l=n-t;let c=-1/0,h=1/0,u=0,d=0;for(const[f,m,x,g,p]of[[i,a,o.minX,o.maxX,"x"],[t,l,o.minZ,o.maxZ,"z"]]){if(Math.abs(m)<1e-12){if(f<x-Cn||f>g+Cn)return null;continue}const v=(x-f)/m,y=(g-f)/m,_=Math.min(v,y),T=Math.max(v,y);if(_>c&&(c=_,u=p==="x"?m>0?-1:1:0,d=p==="z"?m>0?-1:1:0),h=Math.min(h,T),c>h+Cn)return null}return h<0||c>1||c<0&&!lh(i,t,o,-Cn)?null:{t:Math.max(0,c),nx:u,nz:d}}function Pa(i,t,e,n,s=0){let r=1/0;for(const o of Es){const a=Bd(i,t,e,n,o,s);a&&a.t<r&&(r=a.t)}return Number.isFinite(r)?r:null}function Cs(i,t,e=.1){return Pa(i.x,i.z,t.x,t.z,e)===null}function Qr(i,t,e,n=e1){let s=i.x,r=i.z,o=Number.isFinite(t)?t:0,a=Number.isFinite(e)?e:0;for(let l=0;l<4;l++){let c=!1;for(const h of Es){const u=Ca(h,n);if(!lh(s,r,u,Cn))continue;const d=[{distance:s-u.minX,x:u.minX-Cn,z:r},{distance:u.maxX-s,x:u.maxX+Cn,z:r},{distance:r-u.minZ,x:s,z:u.minZ-Cn},{distance:u.maxZ-r,x:s,z:u.maxZ+Cn}];d.sort((f,m)=>f.distance-m.distance),s=d[0].x,r=d[0].z,c=!0}if(!c)break}for(let l=0;l<4&&(Math.abs(o)>Cn||Math.abs(a)>Cn);l++){let c=null;for(const f of Es){const m=Bd(s,r,s+o,r+a,f,n);m&&(!c||m.t<c.t)&&(c=m)}if(!c){s+=o,r+=a;break}const h=Math.max(0,c.t-Cn);s+=o*h,r+=a*h;const u=1-c.t;o*=u,a*=u;const d=o*c.nx+a*c.nz;if(d<0)o-=c.nx*d,a-=c.nz*d;else break}return{x:s,z:r}}function Da(i){return ah.find(t=>Math.hypot(i.x-t.x,i.z-t.z)<=t.radius)||null}function o1(i){return Da(i)?.55:1}function a1(i){return Ra.find(t=>Math.abs(i.x-t.x)<t.halfWidth&&Math.abs(i.z-t.z)<t.halfDepth)||null}function l1(i,t,e,n){const s=t.x-i.x,r=t.z-i.z,o=s*s+r*r,a=o?Math.max(0,Math.min(1,((e.x-i.x)*s+(e.z-i.z)*r)/o)):0;return Math.hypot(i.x+a*s-e.x,i.z+a*r-e.z)<n-Cn}function mr(i,t){return Cs(i,t,gi)&&fo.every(e=>!l1(i,t,e,e.r+gi))}function c1(i){return Math.hypot(i.x,i.z)<=23.85&&Es.every(t=>!lh(i.x,i.z,Ca(t,gi),-Cn))&&fo.every(t=>Math.hypot(i.x-t.x,i.z-t.z)>t.r+gi+Cn)}let Ko=null;const ir=new WeakMap;function h1(){if(Ko)return Ko;const i=[],t=(n,s)=>{const r={x:n,z:s};c1(r)&&!i.some(o=>Math.hypot(o.x-n,o.z-s)<.1)&&i.push(r)};for(const n of Es){const s=Ca(n,gi+.06);for(const r of[s.minX,s.maxX])for(const o of[s.minZ,s.maxZ])t(r,o)}for(const n of fo)for(let s=0;s<12;s++){const r=s*Math.PI/6,o=(n.r+gi+.08)/Math.cos(Math.PI/12);t(n.x+Math.cos(r)*o,n.z+Math.sin(r)*o)}for(const n of Ra)t(n.gate.x,n.gate.z),t(n.approach.x,n.approach.z),t(n.gate.x+(n.x-n.gate.x)*.4,n.gate.z+(n.z-n.gate.z)*.4);const e=i.map(()=>[]);for(let n=0;n<i.length;n++)for(let s=n+1;s<i.length;s++)if(mr(i[n],i[s])){const r=Math.hypot(i[n].x-i[s].x,i[n].z-i[s].z);e[n].push([s,r]),e[s].push([n,r])}return Ko={nodes:i,edges:e},Ko}function u1(i,t){let e={x:t.x,z:t.z};const n=fo.find(s=>s.machine&&Math.hypot(e.x-s.x,e.z-s.z)<s.r+gi);return n&&(e={x:n.x,z:n.z+2.05}),Qr(e,0,0,gi+.02)}function d1(i,t){const{nodes:e,edges:n}=h1(),s=e.length,r=new Float64Array(s),o=new Int32Array(s),a=new Uint8Array(s);r.fill(1/0),o.fill(-1);const l=new Map;for(let d=0;d<s;d++)mr(i,e[d])&&(r[d]=Math.hypot(i.x-e[d].x,i.z-e[d].z)),mr(e[d],t)&&l.set(d,Math.hypot(t.x-e[d].x,t.z-e[d].z));let c=-1,h=1/0;for(let d=0;d<s;d++){let f=-1,m=1/0;for(let x=0;x<s;x++)!a[x]&&r[x]<m&&(m=r[x],f=x);if(f<0||m>=h)break;a[f]=1,l.has(f)&&m+l.get(f)<h&&(c=f,h=m+l.get(f));for(const[x,g]of n[f])m+g<r[x]&&(r[x]=m+g,o[x]=f)}if(c<0)return[];const u=[t];for(let d=c;d>=0;d=o[d])u.unshift(e[d]);return u}function Hd(i,t){if(!Number.isFinite(t?.x)||!Number.isFinite(t?.z))return{x:0,z:0};const e=Qr(i,0,0,gi+.02),n=Math.hypot(e.x-i.x,e.z-i.z);if(n>.005)return ir.delete(i),{x:(e.x-i.x)/n,z:(e.z-i.z)/n};for(const c of fo){const h=i.x-c.x,u=i.z-c.z,d=Math.hypot(h,u);if(d<c.r+gi+.01)return ir.delete(i),d>1e-6?{x:h/d,z:u/d}:{x:0,z:1}}const s=u1(i,t),r=Math.hypot(s.x-i.x,s.z-i.z);if(r<.18)return ir.delete(i),{x:0,z:0};if(mr(i,s))return ir.delete(i),{x:(s.x-i.x)/r,z:(s.z-i.z)/r};let o=ir.get(i);for((!o||Math.hypot(o.goal.x-s.x,o.goal.z-s.z)>1.1||Math.hypot(o.lastX-i.x,o.lastZ-i.z)>3)&&(o={goal:s,path:d1(i,s),lastX:i.x,lastZ:i.z},ir.set(i,o)),o.lastX=i.x,o.lastZ=i.z;o.path.length&&Math.hypot(o.path[0].x-i.x,o.path[0].z-i.z)<.18&&(o.path.length===1||mr(i,o.path[1]));)o.path.shift();for(let c=o.path.length-1;c>0;c--)if(mr(i,o.path[c])){o.path.splice(0,c);break}const a=o.path[0];if(!a)return{x:0,z:0};const l=Math.hypot(a.x-i.x,a.z-i.z);return l?{x:(a.x-i.x)/l,z:(a.z-i.z)/l}:{x:0,z:0}}const Ie=Object.freeze({delivery:"catapult",interactionRange:3,baseRadius:.95,minRange:5,maxRange:28,blastRadius:2.8,innerRadius:1.25,flightTime:1.25,arcHeight:8,cooldown:3,recoilDuration:.45,centerLift:.85,rimLift:.45,centerRecovery:.48,rimRecovery:.42}),ch=Aa,f1=(i,t,e)=>Math.max(t,Math.min(e,i));function p1(i,t,e,n=.6){const s=Math.hypot(t,e),r=s>1e-6?t/s:0,o=s>1e-6?e/s:-1,a=Ie.minRange+(Ie.maxRange-Ie.minRange)*f1(Number.isFinite(n)?n:.6,0,1),l=i.x*r+i.z*o,c=576-i.x*i.x-i.z*i.z,h=Math.max(0,-l+Math.sqrt(Math.max(0,l*l+c))),u=Math.min(a,h);return{x:i.x+r*u,z:i.z+o*u,range:u,valid:u>=Ie.minRange-1e-6}}function m1(){return ch.map(i=>({...i,occupant:null,cooldown:0,loaded:!0,aimX:0,aimZ:-1,recoil:0}))}function Gd(i,t){return i.catapults.filter(e=>(e.owner===t.id||!e.owner)&&(!e.occupant||e.occupant===t.id)&&Math.hypot(e.x-t.x,e.z-t.z)<=Ie.interactionRange&&Cs(t,e,.1)).sort((e,n)=>Math.hypot(e.x-t.x,e.z-t.z)-Math.hypot(n.x-t.x,n.z-t.z))[0]||null}function Ts(i,t){const e=i.catapults.find(s=>s.id===t.catapultId);if(e?.occupant===t.id){e.occupant=null,t.x=e.x,t.z=e.z+2.3;const s=Math.hypot(t.x,t.z);s>24&&(t.x*=24/s,t.z*=24/s)}const n=!!t.catapultId;return t.catapultId=null,t.catapultShots=0,t.interactHeld=!1,n}function g1(i,t){if(t.catapultId)return Ts(i,t);if(t.ko||t.dizzyTime>0||t.knockUp>0||t.kick>0||t.id!=="player"&&i.phase!=="battle")return!1;const e=Gd(i,t);return e?(e.occupant=t.id,t.catapultId=e.id,t.catapultShots=0,t.catapultAim=1,t.x=e.x,t.z=e.z,t.hop=0,t.height=0,t.idle=0,t.hopX=t.hopZ=0,t.impulseX=t.impulseZ=0,i.events.push({type:"catapultMount",id:t.id,catapultId:e.id}),!0):!1}function x1(i,t,e){const n=i.catapults.find(f=>f.id===t.catapultId);if(i.phase!=="battle"||t.ko||t.dizzyTime>0||t.hit>0||t.knockUp>0||!n||n.occupant!==t.id||!n.loaded||n.cooldown>0||e?.valid===!1||!Number.isFinite(e?.x)||!Number.isFinite(e?.z))return!1;let s=e.x,r=e.z;const o=Math.hypot(s,r);o>24&&(s*=24/o,r*=24/o);const a=s-n.x,l=r-n.z,c=Math.hypot(a,l);if(c<Ie.minRange-1e-6)return!1;const h=a/c,u=l/c;c>Ie.maxRange&&(s=n.x+h*Ie.maxRange,r=n.z+u*Ie.maxRange);const d={id:i.nextId++,owner:t.id,catapultId:n.id,startX:n.x+h,startZ:n.z+u,startHeight:1.6,tx:s,tz:r,age:0,duration:Ie.flightTime,arcHeight:Ie.arcHeight};return n.aimX=h,n.aimZ=u,n.loaded=!1,n.cooldown=Ie.cooldown,n.recoil=Ie.recoilDuration,t.catapultShots++,i.shells.push(d),i.events.push({type:"stoneShot",id:t.id,shellId:d.id,catapultId:n.id}),!0}function v1(i,t,e){for(const n of i.catapults)if(n.cooldown=Math.max(0,n.cooldown-t),n.recoil=Math.max(0,n.recoil-t),n.loaded=n.cooldown===0,n.occupant){const s=i.actors.find(r=>r.id===n.occupant);(!s||s.ko||s.dizzyTime>0||s.knockUp>0||s.catapultId!==n.id)&&(s&&s.catapultId===n.id?Ts(i,s):n.occupant=null)}for(const n of i.shells)if(n.age+=t,!(n.age<n.duration)&&(i.events.push({type:"stoneImpact",id:n.id,owner:n.owner,x:n.tx,z:n.tz,radius:Ie.blastRadius}),i.phase==="battle"))for(const s of i.actors){const r=s.x-n.tx,o=s.z-n.tz,a=Math.hypot(r,o);if(s.ko||a>Ie.blastRadius||!Cs({x:n.tx,z:n.tz},s,0))continue;const l=n.tx-n.startX,c=n.tz-n.startZ,h=Math.hypot(l,c)||1,u=a>1e-6?{dx:r/a,dz:o/a}:{dx:l/h,dz:c/h},d=a<=Ie.innerRadius;e(i,s,{owner:n.owner,...u,damage:d?4:2,force:d?12:8,lift:d?Ie.centerLift:Ie.rimLift,liftDuration:d?Ie.centerRecovery:Ie.rimRecovery})}i.shells=i.shells.filter(n=>n.age<n.duration)}const Pl="4.3.3",Jo="frog-arcade-save-v1",Qo="frog-arcade-settings-v1",Mt=Object.freeze({radius:25,capacity:60,dizzyHits:6,finishHits:3,dizzySeconds:4.5,tongueRange:3.2,pickupRange:3.2,tongueInterval:.22,kickRange:3.6,kickCooldown:1.1,kickDuration:.48,hopDuration:.3,landingDuration:.035,shotInterval:.14,projectileSpeed:32,projectileLifetime:.65,introSeconds:20,sabotageSeconds:10,sabotageRange:2.4,sabotageRecovery:.55,respawnSeconds:12,revealSeconds:2.5}),Ps=Object.freeze([{x:-8,z:2,r:1.5},{x:8,z:-3,r:1.7},{x:-2,z:-12,r:1.4},{x:13,z:12,r:1.6}]),Sr=Object.freeze([[0,3.5],[-13,8],[13,1],[-12,-11],[10,-14],[2,17]].map(([i,t],e)=>Object.freeze({id:`swarm-${e}`,x:i,z:t,radius:2.1}))),rn=(i,t,e)=>Math.max(t,Math.min(e,i)),Qe=(i,t)=>Math.hypot(i.x-t.x,i.z-t.z),Zn=(i,t)=>{const e=Math.hypot(i,t);return e>1e-6?{x:i/e,z:t/e}:{x:0,z:1}},Ye=(i,t=0)=>Number.isFinite(i)?i:t;function Pi(i){let t=i.seed+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Vd(i,t,e,n=Math.PI){return{id:i,x:t,z:e,aimX:Math.sin(n),aimZ:Math.cos(n),aiming:!1,face:n,ammo:Mt.capacity,load:1,dizzy:0,finishHits:0,dizzyTime:0,ko:!1,eliminated:!1,respawnTime:0,hit:0,invuln:0,shot:0,tongue:0,kick:0,kickCooldown:0,kickPending:!1,impulseX:0,impulseZ:0,hop:0,hopX:0,hopZ:0,hopSpeed:0,height:0,knockUp:0,knockUpDuration:0,knockUpPeak:0,knockUpStart:0,idle:0,brain:0,decision:0,catapultId:null,catapultShots:0,catapultAim:0,interactHeld:!1,machineTimer:i==="rival-1"?8:12,machineSeeking:!1,aimWindup:0,aiShotReady:0,aiCharging:!1,aiAimX:Math.sin(n),aiAimZ:Math.cos(n),refilling:!1,raidId:null,sabotageId:null,sabotageRecovery:0,revealedTime:0}}function Ds(i,t){return i.bases?.find(e=>e.owner===t.id)||null}const fi=i=>Hn.find(t=>t.id===i?.id);function to(i,t,e){const n=Math.max(1,Math.ceil(Math.hypot(t,e)/.35));for(let s=0;s<n;s++){let{x:r,z:o}=Qr(i,t/n,e/n);for(const c of Ps){const h=Math.hypot(r-c.x,o-c.z),u=c.r+.78;if(h<u){const d=Zn(r-c.x,o-c.z);r=c.x+d.x*u,o=c.z+d.z*u}}for(const c of ch){if(i.catapultId===c.id)continue;const h=Math.hypot(r-c.x,o-c.z),u=Ie.baseRadius+.78;if(h<u){const d=Zn(r-c.x,o-c.z);r=c.x+d.x*u,o=c.z+d.z*u}}({x:r,z:o}=Qr(i,r-i.x,o-i.z));const a=Math.hypot(r,o);a>Mt.radius-1&&(r*=(Mt.radius-1)/a,o*=(Mt.radius-1)/a);const l=Qr({x:r,z:o},0,0);i.x=l.x,i.z=l.z}}function va(i,t,e,n,s,r){const o=e-i,a=n-t,l=i-s.x,c=t-s.z,h=o*o+a*a,u=l*l+c*c-r*r;if(u<=0)return 0;if(h<1e-12)return null;const d=2*(l*o+c*a),f=d*d-4*h*u;if(f<0)return null;const m=(-d-Math.sqrt(f))/(2*h);return m>=0&&m<=1?m:null}function ss(i,t){return Cs(i,t,.1)&&Ps.every(e=>va(i.x,i.z,t.x,t.z,e,e.r+.1)===null)}function _1(i,t){return!t.ko&&!t.eliminated&&Qe(i,t)<=23&&ss(i,t)&&(!Da(t)||t.revealedTime>0||Qe(i,t)<2.2)}function Wd(i,t){const e=Sr[Math.floor(t.id/12)];t.swarmId=e.id;const n=Pi(i)*Math.PI*2,s=Math.sqrt(Pi(i))*e.radius;t.x=e.x+Math.sin(n)*s,t.z=e.z+Math.cos(n)*s,t.wait=0,t.phase=Pi(i)*Math.PI*2}function Dc(i=731){const t={version:2,swarmVersion:1,seed:i,time:0,status:"playing",phase:"countdown",intro:Mt.introSeconds,actors:Hn.map(e=>Vd(e.owner,e.spawn.x,e.spawn.z,e.spawnHeading)),bases:Hn.map(e=>({id:e.id,owner:e.owner,x:e.x,z:e.z,destroyed:!1,progress:0,attackerId:null})),flies:[],catapults:m1(),shells:[],bullets:[],events:[],nextId:1,stats:{caught:0,shots:0,hits:0,kos:0,basesDestroyed:0}};for(let e=0;e<72;e++){const n={id:e,swarmId:"",x:0,z:0,wait:0,phase:0};Wd(t,n),t.flies.push(n)}return t}function y1(i,t){const e=Math.hypot(i,t);return{x:e>.08?i/Math.max(1,e):0,z:e>.08?t/Math.max(1,e):0,fire:e>=.72}}function Ic(i,t){return i.actors.filter(e=>e!==t&&!e.ko&&Qe(t,e)<=Mt.kickRange&&ss(t,e)).sort((e,n)=>Qe(t,e)-Qe(t,n))[0]||null}function M1(i,t){if(t.ko||t.eliminated||t.dizzyTime>0||t.catapultId||t.tongue>0||t.ammo>=Mt.capacity)return!1;const e=Ds(i,t),n=fi(e)?.stock;if(e&&!e.destroyed&&n&&Qe(t,n)<=Mt.pickupRange&&ss(t,n))return t.tongue=Mt.tongueInterval,t.ammo++,i.events.push({type:"tongue",id:t.id,x:n.x,z:n.z,baseId:e.id}),t.id==="player"&&i.stats.caught++,!0;const s=i.flies.filter(r=>r.wait<=0&&Qe(t,r)<=Mt.pickupRange&&ss(t,r)).sort((r,o)=>Qe(t,r)-Qe(t,o))[0];return s?(t.tongue=Mt.tongueInterval,t.ammo++,s.wait=7+Pi(i)*4,i.events.push({type:"tongue",id:t.id,x:s.x,z:s.z,swarmId:s.swarmId}),t.id==="player"&&i.stats.caught++,!0):!1}function b1(i,t){if(t.ko||t.eliminated||t.dizzyTime>0||t.hit>0||t.catapultId||t.knockUp>0||t.shot>0||t.ammo<=0||t.id!=="player"&&i.phase!=="battle")return!1;t.shot=Mt.shotInterval,t.ammo--,t.revealedTime=Mt.revealSeconds;const e=Zn(t.aimX,t.aimZ),n=t.x+e.x*1.2,s=t.z+e.z*1.2;let r=Pa(t.x,t.z,n,s,.1);for(const o of Ps){const a=va(t.x,t.z,n,s,o,o.r+.1);a!==null&&(r===null||a<r)&&(r=a)}return r!==null?i.events.push({type:"splat",x:t.x+(n-t.x)*r,z:t.z+(s-t.z)*r,wall:!0,dx:e.x,dz:e.z}):i.bullets.push({id:i.nextId++,owner:t.id,x:n,z:s,dx:e.x,dz:e.z,life:Mt.projectileLifetime}),i.events.push({type:"shot",id:t.id}),t.id==="player"&&i.stats.shots++,!0}function co(i,t,e="interrupted"){for(const n of i.bases||[])n.attackerId!==t.id||n.destroyed||(n.progress>0&&i.events.push({type:"sabotageInterrupted",baseId:n.id,id:n.owner,by:t.id,reason:e}),n.progress=0,n.attackerId=null);t.sabotageId=null}function S1(i,t,e){co(i,t,"knockout"),Ts(i,t),t.ko=!0,t.dizzyTime=0,t.hop=0,t.knockUp=0,t.knockUpStart=0,t.height=.9,t.impulseX=e.dx*17,t.impulseZ=e.dz*17,t.ammo=0,t.aiCharging=!1,t.respawnTime=Ds(i,t)?.destroyed?0:Mt.respawnSeconds,i.events.push({type:"ko",id:t.id,by:e.owner,x:t.x,z:t.z,dx:e.dx,dz:e.dz}),e.owner==="player"&&t.id!=="player"&&i.stats.kos++}function zc(i,t,e){if(t.ko||t.eliminated||t.invuln>0)return!1;const n=Math.max(0,t.height),s=Zn(Ye(e.dx),Ye(e.dz)),r=rn(Ye(e.force,5),0,30);let o=rn(Math.floor(Ye(e.damage,1)),1,9);if(co(i,t,"hit"),t.sabotageRecovery=Mt.sabotageRecovery,t.aiCharging=!1,t.aimWindup=0,t.aiShotReady=Math.max(t.aiShotReady,.4),t.hit=.23,t.invuln=.12,t.impulseX=s.x*r,t.impulseZ=s.z*r,t.revealedTime=Mt.revealSeconds,t.dizzyTime<=0){const a=Math.min(o,Mt.dizzyHits-t.dizzy);t.dizzy+=a,o-=a,t.dizzy>=Mt.dizzyHits&&(t.dizzy=Mt.dizzyHits,t.dizzyTime=Mt.dizzySeconds,t.finishHits=0,t.hop=0,t.knockUp<=0&&(t.height=0),Ts(i,t),i.events.push({type:"dizzy",id:t.id}))}return t.dizzyTime>0&&o>0&&(t.finishHits=Math.min(Mt.finishHits,t.finishHits+o)),Ye(e.lift)>0&&(Ts(i,t),t.knockUpDuration=rn(Ye(e.liftDuration,.48),.25,.65),t.knockUp=t.knockUpDuration,t.knockUpPeak=rn(e.lift,.1,1.2),t.knockUpStart=n,t.height=n,t.hop=0,t.hopX=t.hopZ=0,t.hopSpeed=0,t.kick=0,t.kickPending=!1),i.events.push({type:"hit",id:t.id,owner:e.owner,x:t.x,z:t.z,dx:s.x,dz:s.z}),e.owner==="player"&&t.id!=="player"&&i.stats.hits++,t.finishHits>=Mt.finishHits&&S1(i,t,{...e,dx:s.x,dz:s.z}),!0}function w1(i,t){if(i.phase!=="battle"||t.ko||t.eliminated||t.dizzyTime>0||t.hit>0||t.catapultId||t.knockUp>0||t.kick>0||t.kickCooldown>0)return!1;const e=Ic(i,t);if(!e)return!1;const n=Zn(e.x-t.x,e.z-t.z);return t.aimX=n.x,t.aimZ=n.z,t.kick=Mt.kickDuration,t.kickCooldown=Mt.kickCooldown,t.kickPending=!0,t.kickId=e.id,t.revealedTime=Mt.revealSeconds,i.events.push({type:"kick",id:t.id}),!0}function E1(i,t){t.kickPending=!1;const e=i.actors.find(s=>s.id===t.kickId);if(!e||e.ko||Qe(t,e)>Mt.kickRange+.25||!ss(t,e))return;const n=Zn(e.x-t.x,e.z-t.z);zc(i,e,{owner:t.id,dx:n.x,dz:n.z,damage:1,force:14}),e.ko||(e.impulseX=n.x*14,e.impulseZ=n.z*14)}function Ia(i,t){return t.ko||t.eliminated||t.catapultId?null:(i.bases||[]).filter(e=>!e.destroyed&&e.owner!==t.id&&Qe(t,fi(e).stock)<=Mt.sabotageRange&&ss(t,fi(e).stock)).sort((e,n)=>Qe(t,fi(e).stock)-Qe(t,fi(n).stock))[0]||null}function T1(i,t,e){t.destroyed=!0,t.progress=Mt.sabotageSeconds,t.attackerId=null,e.sabotageId=null;const n=i.actors.find(s=>s.id===t.owner);n&&(co(i,n,"eliminated"),Ts(i,n),n.eliminated=!0,n.ko=!0,n.respawnTime=0,n.ammo=0,n.dizzyTime=0,n.hop=0,n.height=0,n.knockUp=0),e.id==="player"&&i.stats.basesDestroyed++,i.events.push({type:"baseDestroyed",baseId:t.id,id:t.owner,by:e.id,x:t.x,z:t.z})}function A1(i,t,e){for(const n of i.bases){if(n.destroyed)continue;const s=i.actors.filter(l=>t.get(l.id)===n.id&&!l.ko&&!l.eliminated&&l.dizzyTime<=0&&l.hit<=0&&l.sabotageRecovery<=0&&l.knockUp<=0&&l.kick<=0&&l.shot<=0&&l.hop<=0&&Ia(i,l)?.id===n.id),r=s.find(l=>l.id===n.attackerId)||s.sort((l,c)=>l.id.localeCompare(c.id))[0];if(!r){if(n.attackerId){const l=i.actors.find(c=>c.id===n.attackerId);l&&co(i,l,"released")}continue}if(n.attackerId!==r.id){if(n.attackerId){const l=i.actors.find(c=>c.id===n.attackerId);l&&co(i,l,"interrupted")}n.progress=0,n.attackerId=r.id,r.sabotageId=n.id,i.events.push({type:"sabotageStart",baseId:n.id,id:n.owner,by:r.id})}const o=fi(n).stock,a=Zn(o.x-r.x,o.z-r.z);r.sabotageId=n.id,r.aiming=!1,r.face=Math.atan2(a.x,a.z),r.aimX=a.x,r.aimZ=a.z,r.revealedTime=Mt.revealSeconds,n.progress=Math.min(Mt.sabotageSeconds,n.progress+e),n.progress>=Mt.sabotageSeconds-1e-8&&T1(i,n,r)}}function ta(i,t,e={}){const n=Hd(i,t);return{mx:n.x,mz:n.z,aiming:!1,...e}}function or(i){i.aiCharging=!1,i.aimWindup=0}function Dl(i,t,e){const n=Qe(t,e),s=Zn(e.x-t.x,e.z-t.z);t.brain-=1/60,t.brain<=0&&(t.brain=.7+Pi(i)*.5,t.decision=Pi(i)>.5?1:-1);let r=!1;if(n<16&&t.ammo>0&&ss(t,e))if(!t.aiCharging&&t.aiShotReady<=0){const l=(Pi(i)-.5)*.08,c=Math.cos(l),h=Math.sin(l);t.aiAimX=s.x*c-s.z*h,t.aiAimZ=s.x*h+s.z*c,t.aimWindup=.32,t.aiCharging=!0}else t.aiCharging&&t.aimWindup<=0&&(r=!0,t.aiCharging=!1,t.aiShotReady=.22+Pi(i)*.1);else or(t);let o=0,a=0;if(n>11){const l=Hd(t,e);o=l.x,a=l.z}else{const l=n<6?-1:0;o=s.x*l+s.z*t.decision*.45,a=s.z*l-s.x*t.decision*.45}return{mx:o,mz:a,aiming:!0,ax:t.aiCharging||r?t.aiAimX:s.x,az:t.aiCharging||r?t.aiAimZ:s.z,fire:r,kick:n<3.3}}function R1(i,t){if(i.phase!=="battle"||t.ko||t.eliminated)return{};if(t.hit>0){or(t);const h=Zn(t.impulseX,t.impulseZ);return{mx:h.x,mz:h.z,aiming:!1}}const e=Ds(i,t),n=fi(e),s=i.actors.filter(h=>h!==t&&_1(t,h)).sort((h,u)=>Qe(t,h)-Qe(t,u)),r=s[0],o=r?Qe(t,r):1/0;if(t.catapultId){if(!r||o<7||t.catapultShots>=2)return t.machineTimer=18,t.machineSeeking=!1,{interactCatapult:!0};const h=i.catapults.find(d=>d.id===t.catapultId),u=Zn(r.x-t.x,r.z-t.z);return{aiming:!0,ax:u.x,az:u.z,throwStone:h?.loaded&&t.catapultAim<=0?{x:r.x,z:r.z}:void 0}}if(t.ammo<6&&(t.refilling=!0),t.ammo>=48&&(t.refilling=!1),t.refilling&&e&&!e.destroyed)return or(t),Qe(t,n.stock)<=Mt.pickupRange-.35&&ss(t,n.stock)?r&&o<5&&t.ammo>0?Dl(i,t,r):{}:ta(t,n.stock);if(e?.attackerId&&e.attackerId!==t.id){const h=s.find(u=>u.id===e.attackerId);return h?Dl(i,t,h):(or(t),ta(t,n.stock))}if(!i.bases.find(h=>h.id===t.raidId&&!h.destroyed&&h.owner!==t.id)){const h=i.bases.filter(d=>!d.destroyed&&d.owner!==t.id),u=t.id==="rival-1"?"rival-2":"player";t.raidId=(h.find(d=>d.owner===u)||h[0])?.id||null}const l=i.bases.find(h=>h.id===t.raidId),c=fi(l)?.stock;if(l&&Qe(t,c)<=Mt.sabotageRange-.2&&(t.sabotageId===l.id||!r||o>6.5))return or(t),t.machineSeeking=!1,{sabotage:!0,aiming:!1};if(r&&o<16){const h=i.catapults.find(u=>u.owner===t.id&&!u.occupant);if(t.machineTimer<=0&&!t.machineSeeking&&(t.machineSeeking=!!h&&o>11&&Pi(i)<.35,t.machineTimer=8),t.machineSeeking&&h)if(o<7)t.machineSeeking=!1,t.machineTimer=12;else return ta(t,{x:h.x,z:h.z+2.2},{interactCatapult:Qe(t,h)<=Ie.interactionRange&&Cs(t,h)});return Dl(i,t,r)}return or(t),c?ta(t,c):{}}function C1(i,t){const e=Ds(i,t),n=fi(e);if(!e||e.destroyed||!n)return;const s=Vd(t.id,n.spawn.x,n.spawn.z,n.spawnHeading);Object.assign(t,s,{invuln:1}),i.events.push({type:"respawn",id:t.id,x:t.x,z:t.z})}function Xd(i){const t=i.bases.find(n=>n.owner==="player"),e=i.bases.filter(n=>!n.destroyed);t?.destroyed?i.status="lost":e.length===1&&e[0].owner==="player"&&(i.status="won")}function Xu(i,t={},e=1/60){if(i.status!=="playing"||(i.events.length=0,e=rn(Ye(e),0,.05),e===0))return;i.time+=e,i.phase==="countdown"&&(i.intro=Math.max(0,i.intro-e),i.intro<1e-8&&(i.intro=0,i.phase="battle",i.events.push({type:"battle"})));for(const s of i.flies)s.wait>0&&(s.wait-=e,s.wait<=0&&Wd(i,s));const n=new Map;for(const s of i.actors){for(const u of["shot","tongue","invuln","hit","idle","kickCooldown","aimWindup","aiShotReady","catapultAim","sabotageRecovery","revealedTime"])s[u]=Math.max(0,s[u]-e);if(i.phase==="battle"&&(s.machineTimer=Math.max(0,s.machineTimer-e)),s.ko){Ts(i,s),to(s,s.impulseX*e,s.impulseZ*e),s.impulseX*=Math.exp(-e*3),s.impulseZ*=Math.exp(-e*3),s.height=Math.max(0,s.height-e*1.6),!s.eliminated&&!Ds(i,s)?.destroyed&&(s.respawnTime=Math.max(0,s.respawnTime-e),s.respawnTime<1e-8&&C1(i,s));continue}s.kick>0&&(s.kick=Math.max(0,s.kick-e),s.kickPending&&s.kick<.3&&E1(i,s)),s.dizzyTime>0&&(s.dizzyTime=Math.max(0,s.dizzyTime-e),s.dizzyTime===0&&(s.dizzy=0,s.finishHits=0,s.invuln=.55,i.events.push({type:"recover",id:s.id})));const r=s.id==="player"?t:R1(i,s);r.interactCatapult&&!s.interactHeld&&g1(i,s),s.interactHeld=!!r.interactCatapult;const o=s.catapultId?0:Ye(r.mx),a=s.catapultId?0:Ye(r.mz),l=Math.hypot(o,a),c=l>.08&&s.knockUp<=0,h=Number.isFinite(r.ax)&&Number.isFinite(r.az)&&Math.hypot(r.ax,r.az)>.05;if(s.aiming=r.aiming===void 0?h:r.aiming===!0,s.aiming&&h){const u=Zn(r.ax,r.az);s.aimX=u.x,s.aimZ=u.z}if(c&&(s.face=Math.atan2(o,a),!s.aiming&&s.kick<=0)){const u=Zn(o,a);s.aimX=u.x,s.aimZ=u.z}if(i.phase==="battle"&&r.sabotage&&!c&&!r.fire&&!r.kick&&!r.throwStone){const u=Ia(i,s);u&&n.set(s.id,u.id)}if(s.dizzyTime<=0){if(M1(i,s),r.fire&&b1(i,s),r.kick&&w1(i,s),r.throwStone&&x1(i,s,r.throwStone),s.catapultId){const u=i.catapults.find(d=>d.id===s.catapultId);u&&(u.aimX=s.aimX,u.aimZ=s.aimZ,s.x=u.x,s.z=u.z,s.impulseX=s.impulseZ=0)}if(s.knockUp<=0&&s.hop<=0&&s.idle<=0&&c&&(s.hop=Mt.hopDuration,s.hopSpeed=rn(l,0,1)),s.knockUp<=0&&s.hop>0){s.hop=Math.max(0,s.hop-e);const u=(s.id==="player"?8.8:6.2)*o1(s),d=c?u/Math.max(1,l):0;s.hopX=o*d,s.hopZ=a*d,to(s,s.hopX*e,s.hopZ*e),s.height=Math.sin((1-s.hop/Mt.hopDuration)*Math.PI)*(.35+.32*s.hopSpeed),s.hop===0&&(s.height=0,s.hopX=0,s.hopZ=0,s.idle=Mt.landingDuration,i.events.push({type:"land",id:s.id,x:s.x,z:s.z}))}}if(to(s,s.impulseX*e,s.impulseZ*e),s.impulseX*=Math.exp(-e*10),s.impulseZ*=Math.exp(-e*10),s.knockUp>0){s.knockUp=Math.max(0,s.knockUp-e);const u=1-s.knockUp/s.knockUpDuration;s.height=s.knockUpStart*(1-u)+Math.sin(u*Math.PI)*s.knockUpPeak,s.knockUp===0&&(s.height=0,s.knockUpStart=0,s.idle=Mt.landingDuration,i.events.push({type:"land",id:s.id,x:s.x,z:s.z,stone:!0,strength:s.knockUpPeak}))}s.load+=(s.ammo/Mt.capacity-s.load)*(1-Math.exp(-e*12))}for(const s of i.bullets){const r=Math.min(e,Math.max(0,s.life));if(s.life-=e,r<=0)continue;const o=s.x+s.dx*Mt.projectileSpeed*r,a=s.z+s.dz*Mt.projectileSpeed*r,l=Pa(s.x,s.z,o,a,.1);let c=l??2,h=l===null?null:{type:"wall"};for(const u of Ps){const d=va(s.x,s.z,o,a,u,u.r+.1);d!==null&&d<c&&(c=d,h={type:"wall",o:u})}for(const u of i.actors){if(i.phase!=="battle"||u.id===s.owner||u.ko)continue;const d=va(s.x,s.z,o,a,u,1+u.load*.2);d!==null&&d<c&&(c=d,h={type:"actor",a:u})}h?(s.x+=(o-s.x)*c,s.z+=(a-s.z)*c,s.life=0,h.type==="actor"&&zc(i,h.a,s),i.events.push({type:"splat",x:s.x,z:s.z,wall:h.type==="wall",dx:s.dx,dz:s.dz})):(s.x=o,s.z=a,Math.hypot(o,a)>Mt.radius-.2&&(s.life=0,i.events.push({type:"splat",x:o,z:a,wall:!1,dx:s.dx,dz:s.dz})))}i.bullets=i.bullets.filter(s=>s.life>0),v1(i,e,zc),A1(i,n,e),Xd(i)}function P1(i){return JSON.stringify({...i,events:[],bullets:[],shells:[]})}function D1(i){try{const t=JSON.parse(i);if(![1,2].includes(t?.version)||!Array.isArray(t.actors)||t.actors.length!==3||!Array.isArray(t.flies)||t.flies.length!==72||!["playing","won","lost"].includes(t.status))return null;const e=t.version===1,n=Dc(Ye(t.seed,731));if(n.time=rn(Ye(t.time),0,1e7),n.nextId=rn(Math.floor(Ye(t.nextId,1)),1,1e9),n.intro=e?Mt.introSeconds:rn(Ye(t.intro,Mt.introSeconds),0,Mt.introSeconds),n.phase=!e&&(t.phase==="battle"||n.intro===0)?"battle":"countdown",!e){if(!Array.isArray(t.bases)||t.bases.length!==Hn.length)return null;for(const s of n.bases){const r=t.bases.find(o=>o?.id===s.id&&o?.owner===s.owner);if(!r)return null;s.destroyed=r.destroyed===!0,s.progress=s.destroyed?Mt.sabotageSeconds:0}}for(let s=0;s<3;s++){const r=t.actors[s],o=n.actors[s];if(r?.id!==o.id||!Number.isFinite(r.x)||!Number.isFinite(r.z))return null;for(const h of Object.keys(o))typeof o[h]=="number"&&(o[h]=rn(Ye(r[h],o[h]),-1e4,1e4));const a=Ds(n,o),l=a.destroyed,c=l||r.ko===!0;Object.assign(o,{ko:c,eliminated:l,respawnTime:c&&!l?rn(Ye(r.respawnTime,Mt.respawnSeconds)||Mt.respawnSeconds,.01,Mt.respawnSeconds):0,aiming:!1,catapultId:null,interactHeld:!1,machineSeeking:!1,aiCharging:!1,aimWindup:0,refilling:r.refilling===!0||Ye(r.ammo)<6,raidId:null,sabotageId:null,sabotageRecovery:0,revealedTime:0,ammo:l?0:rn(Math.floor(Ye(r.ammo)),0,Mt.capacity),load:rn(Ye(r.load),0,1),dizzy:rn(Ye(r.dizzy),0,Mt.dizzyHits),finishHits:rn(Ye(r.finishHits),0,Mt.finishHits),dizzyTime:rn(Ye(r.dizzyTime),0,Mt.dizzySeconds),kickPending:!1,kick:0,hop:0,hopX:0,hopZ:0,height:0,knockUp:0,knockUpDuration:0,knockUpPeak:0,knockUpStart:0,idle:0,impulseX:0,impulseZ:0});for(const h of["shot","tongue","invuln","hit","kickCooldown","aiShotReady"])o[h]=rn(o[h],0,2);if(o.machineTimer=rn(o.machineTimer,0,30),o.face=Ye(o.face,Math.PI),e){const h=fi(a);Object.assign(o,{x:h.spawn.x,z:h.spawn.z,face:h.spawnHeading,aimX:Math.sin(h.spawnHeading),aimZ:Math.cos(h.spawnHeading)})}to(o,0,0)}for(let s=0;s<72;s++){const r=t.flies[s],o=Sr[Math.floor(s/12)];r&&(t.swarmVersion===1&&r.swarmId===o.id&&Number.isFinite(r.x)&&Number.isFinite(r.z)&&Qe(r,o)<=o.radius+.001&&Object.assign(n.flies[s],{x:r.x,z:r.z,phase:Ye(r.phase)}),n.flies[s].wait=rn(Ye(r.wait),0,12))}if(Array.isArray(t.catapults))for(const s of n.catapults){const r=t.catapults.find(a=>a.id===s.id);r&&(s.cooldown=rn(Ye(r.cooldown),0,Ie.cooldown),s.loaded=s.cooldown===0);const o=!e&&t.actors.find(a=>a.catapultId===s.id);if(o){const a=n.actors.find(l=>l.id===o.id);a.x=s.x,a.z=s.z+2.3,to(a,0,0)}}for(const s of Object.keys(n.stats))n.stats[s]=Math.max(0,Math.floor(Ye(t.stats?.[s])));return Xd(n),n}catch{return null}}function I1(i){const t=i.aiming||i.shot>.02||i.kick>0,e=Math.hypot(i.aimX,i.aimZ);if((t||!Number.isFinite(i.face))&&Number.isFinite(e)&&e>1e-6)return{x:i.aimX/e,z:i.aimZ/e};const n=Number.isFinite(i.face)?i.face:Math.PI;return{x:Math.sin(n),z:Math.cos(n)}}const Ln=Object.freeze({yaw:Math.PI,pitch:.44,minPitch:.18,maxPitch:1.05,sensitivity:.005}),gr=Object.freeze({min:.7,max:1.5,default:1});function z1(i,t,e){const n=(Number.isFinite(i?.yaw)?i.yaw:Ln.yaw)-(Number.isFinite(t)?t:0)*Ln.sensitivity,s=(Number.isFinite(i?.pitch)?i.pitch:Ln.pitch)+(Number.isFinite(e)?e:0)*Ln.sensitivity;return{yaw:Math.atan2(Math.sin(n),Math.cos(n)),pitch:Math.max(Ln.minPitch,Math.min(Ln.maxPitch,s))}}function qd(i,t,e=1.6,n="chase3d",s=Ln){const r=Number.isFinite(e)&&e>0?e:1.6,o=Number.isFinite(s?.zoom)?Math.max(gr.min,Math.min(gr.max,s.zoom)):gr.default;if(n==="overview"){const x=Math.max(.86,Math.min(1.6,Math.sqrt(1.2/r)));return{look:[i.x,t+1.2,i.z],position:[i.x,t+1.2+(26*x-1.2)/o,i.z+19*x/o]}}const a=Number.isFinite(s?.yaw)?s.yaw:Ln.yaw,l=Math.max(Ln.minPitch,Math.min(Ln.maxPitch,Number.isFinite(s?.pitch)?s.pitch:Ln.pitch)),c={x:Math.sin(a),z:Math.cos(a)},u=12.6*Math.max(1,Math.min(1.42,.72/r))/o,d=u*Math.cos(l),f=i.x+c.x*.9,m=i.z+c.z*.9;return{look:[f,t+1.2,m],position:[f-c.x*d,t+1.2+u*Math.sin(l),m-c.z*d]}}function ea(i,t,e,n){const s=n.x-e.x,r=n.z-e.z,o=Math.hypot(s,r),a=o>1e-6?s/o:0,l=o>1e-6?r/o:-1,c=Number.isFinite(i)?i:0,h=Number.isFinite(t)?t:0;return{x:-l*c-a*h,z:a*c-l*h}}const Il=["#d2ff70","#ff765d","#d7a0ff"],L1=new Map(Sr.map((i,t)=>[i.id,t])),qu=new WeakMap;function $d(i){let t=qu.get(i);t||(t=Sr.map(e=>({swarm:e,available:0,next:1/0})),qu.set(i,t));for(const e of t)e.available=0,e.next=1/0;for(const e of i.flies){const n=t[L1.get(e.swarmId)];n&&(e.wait<=0?n.available++:n.next=Math.min(n.next,e.wait))}return t}function Yd(i,t,e,n,s){i.fillStyle=s?"#dceee6":"#718781",i.beginPath(),i.ellipse(t-n*.5,e-n*.28,n*.6,n*.32,-.5,0,Math.PI*2),i.ellipse(t+n*.5,e-n*.28,n*.6,n*.32,.5,0,Math.PI*2),i.fill(),i.fillStyle=s?"#384c4c":"#536763",i.strokeStyle=s?"#b6d1c3":"#8ca09a",i.lineWidth=1.4,i.beginPath(),i.ellipse(t,e+n*.12,n*.34,n*.56,0,0,Math.PI*2),i.fill(),i.stroke()}function U1(i,t){if(!t)return;const e=t.getContext("2d");if(!e)return;const n=t.width,s=n/2,r=n*.43,o=r/Mt.radius;e.clearRect(0,0,n,n),e.save(),e.translate(s,s),e.fillStyle="#153e3af2",e.strokeStyle="#9bd1be",e.lineWidth=4,e.beginPath(),e.arc(0,0,r,0,Math.PI*2),e.fill(),e.stroke(),e.clip();const a=i.focus.x-i.camera.position.x,l=i.focus.z-i.camera.position.z,c=Math.hypot(a,l),h=c>1e-6?a/c:0,u=c>1e-6?l/c:-1,d=(f,m)=>({x:(-u*f+h*m)*o,y:-(h*f+u*m)*o});e.strokeStyle="#ffffff17",e.lineWidth=1;for(let f=-20;f<=20;f+=10){const m=d(f,-25),x=d(f,25),g=d(-25,f),p=d(25,f);e.beginPath(),e.moveTo(m.x,m.y),e.lineTo(x.x,x.y),e.moveTo(g.x,g.y),e.lineTo(p.x,p.y),e.stroke()}for(const f of Ps){const m=d(f.x,f.z);e.fillStyle="#769084",e.beginPath(),e.arc(m.x,m.y,f.r*o,0,Math.PI*2),e.fill()}for(const f of ah){const m=d(f.x,f.z);e.fillStyle="#517d4788",e.beginPath(),e.arc(m.x,m.y,f.radius*o,0,Math.PI*2),e.fill()}for(const f of Es){const m=[d(f.x-f.hw,f.z-f.hd),d(f.x+f.hw,f.z-f.hd),d(f.x+f.hw,f.z+f.hd),d(f.x-f.hw,f.z+f.hd)];e.fillStyle="#c4b492",e.beginPath(),e.moveTo(m[0].x,m[0].y);for(const x of m.slice(1))e.lineTo(x.x,x.y);e.closePath(),e.fill()}for(const f of Aa){const m=d(f.x,f.z);e.strokeStyle="#bfd6d0",e.lineWidth=2,e.beginPath(),e.moveTo(m.x-3,m.y+3),e.lineTo(m.x,m.y-4),e.lineTo(m.x+4,m.y+3),e.moveTo(m.x,m.y-1),e.lineTo(m.x+4,m.y-6),e.stroke()}for(const[f,m]of Hn.entries()){const x=i.state.bases?.find(p=>p.id===m.id),g=d(m.stock.x,m.stock.z);if(m.owner==="player"&&x?.attackerId&&!x.destroyed){const p=.5+.5*Math.sin((i.elapsed||0)*4);e.strokeStyle="#ff9a6a",e.lineWidth=3+p,e.beginPath(),e.arc(g.x,g.y,13+p*3,0,Math.PI*2),e.stroke()}e.fillStyle=x?.destroyed?"#4f6258":x?.attackerId?"#ffce77":Il[f],e.strokeStyle="#092b22",e.lineWidth=2,e.beginPath(),e.moveTo(g.x-7,g.y-2),e.lineTo(g.x,g.y-8),e.lineTo(g.x+7,g.y-2),e.lineTo(g.x+7,g.y+7),e.lineTo(g.x-7,g.y+7),e.closePath(),e.fill(),e.stroke(),x?.destroyed&&(e.strokeStyle="#b7c7ba",e.beginPath(),e.moveTo(g.x-5,g.y-5),e.lineTo(g.x+5,g.y+5),e.moveTo(g.x+5,g.y-5),e.lineTo(g.x-5,g.y+5),e.stroke())}for(const f of $d(i.state)){const m=d(f.swarm.x,f.swarm.z),x=f.available>0;e.strokeStyle=x?"#b8daa7":"#6a827b",e.lineWidth=x?1.8:1.2,e.beginPath(),e.arc(m.x,m.y,9,0,Math.PI*2),e.stroke(),Yd(e,m.x,m.y,6,x)}i.state.actors.forEach((f,m)=>{if(f.ko||f.eliminated)return;const x=i.state.actors[0];if(m>0&&Da(f)&&f.revealedTime<=0&&Math.hypot(f.x-x.x,f.z-x.z)>2.2)return;const g=d(f.x,f.z);if(e.fillStyle=Il[m],e.strokeStyle="#102923",e.lineWidth=3,e.beginPath(),e.arc(g.x,g.y,m===0?9:8,0,Math.PI*2),e.fill(),e.stroke(),m===0){const p=d(f.aimX*2.7,f.aimZ*2.7);e.strokeStyle=Il[0],e.lineWidth=4,e.beginPath(),e.moveTo(g.x,g.y),e.lineTo(g.x+p.x,g.y+p.y),e.stroke()}else e.fillStyle="#102923",e.beginPath(),e.arc(g.x-3,g.y-2,1.6,0,Math.PI*2),e.arc(g.x+3,g.y-2,1.6,0,Math.PI*2),e.fill()}),e.restore(),e.fillStyle="#f2ffe1",e.font="bold 18px sans-serif",e.textAlign="center",e.fillText("ΒΑΣΕΙΣ • ΜΥΓΕΣ • ΚΑΛΥΨΗ",s,n-5)}function N1(i,t){const e=i.state.actors[0];if(e.ko||e.ammo>=Mt.capacity)return;const n=Hn.find(v=>v.owner===e.id),s=i.state.bases?.find(v=>v.owner===e.id);if(n&&s&&!s.destroyed&&Math.hypot(e.x-n.stock.x,e.z-n.stock.z)<=Mt.pickupRange&&Cs(e,n.stock))return;let r=null,o=null,a=1/0,l=1/0;for(const v of $d(i.state)){const y=Math.hypot(v.swarm.x-e.x,v.swarm.z-e.z);y<a&&(r=v,a=y),v.available>0&&y<l&&(o=v,l=y)}const h=r&&r.available===0&&a<=r.swarm.radius+Mt.pickupRange+.5?r:o;if(!h)return;const u=h.swarm,d=i.project(u.x,i.ground(u.x,u.z)+.35,u.z),f=i.touch&&i.h>i.w?240:110,m=i.touch?Math.min(165,i.h*.3):65;if(!d.visible||d.x<72||d.x>i.w-72||d.y<f||d.y>i.h-m)return;t.save(),t.font="700 12px sans-serif",t.textAlign="left",t.lineJoin="round";const x=h.available>0?`Μύγες · ${h.available}`:`Ξανά σε ${Math.max(1,Math.ceil(h.next))}″`,g=t.measureText(x).width+22,p=d.x-g/2;Yd(t,p+7,d.y+8,6,h.available>0),t.strokeStyle="#18352de6",t.lineWidth=3,t.strokeText(x,p+20,d.y+12),t.fillStyle=h.available>0?"#e8f4d5":"#c1d0c9",t.fillText(x,p+20,d.y+12),t.restore()}function k1(i,t,e=Mt.projectileSpeed*Mt.projectileLifetime){const n=Math.hypot(t.aimX,t.aimZ)||1,s=t.aimX/n,r=t.aimZ/n;let o=e,a=null,l=!1;const c=(f,m,x)=>{const g=t.x+s*1.2-f,p=t.z+r*1.2-m,v=g*s+p*r,y=g*g+p*p-x*x,_=v*v-y;if(_<0)return 1/0;const T=-v-Math.sqrt(_);return y<0?1.2:T>=0?T+1.2:1/0},h=t.x*s+t.z*r,u=t.x*t.x+t.z*t.z-(Mt.radius-.2)**2;o=Math.min(o,Math.max(1.2,-h+Math.sqrt(Math.max(0,h*h-u))));for(const f of Ps){const m=c(f.x,f.z,f.r+.1);m<o&&(o=m,l=!0)}const d=Pa(t.x,t.z,t.x+s*o,t.z+r*o,.1);d!==null&&(o*=d,l=!0);for(const f of i.actors){if(f===t||f.ko||f.eliminated)continue;const m=c(f.x,f.z,1+f.load*.2);m<o&&(o=m,a=f.id,l=!1)}return{x:t.x+s*o,z:t.z+r*o,distance:o,targetId:a,blocked:l}}const F1=new L(0,1,0),O1=Math.PI*2,zl=(i,t=0,e=1)=>Math.max(t,Math.min(e,i)),na=(i,t,e)=>i+(t-i)*e,ia=["#b8e76c","#ef886a","#be94e0"],B1=.45;class H1{constructor(t){this.game=t,this.scene=t.scene,this.clock=0,this.machines=new Map,this.platforms=new Map,this.shellMeshes=new Map,this.dummy=new We,this._vector=new L,this._direction=new L,this.geometry={box:new Li(1,1,1),cylinder:new Rs(.5,.5,1,8),rock:new Sa(.4,0),leaf:new Yn(1,10,5),cup:new Yn(.38,10,6,0,O1,Math.PI/2,Math.PI/2),ring:new Qi(.94,1,48),disc:new ba(1,32),rope:new nh(.14,.027,5,10)},this.material={wood:new vn({color:"#a47746"}),lightWood:new vn({color:"#d4ac64"}),darkWood:new vn({color:"#67503c"}),rope:new vn({color:"#d3c593"}),leaf:new vn({color:"#5c9b67"}),stone:new vn({color:"#90999b",emissive:"#172023",emissiveIntensity:.16}),preview:new Ad({color:"#e6f7a1",dashSize:.45,gapSize:.25,transparent:!0,opacity:.85,depthWrite:!1}),landing:new _n({color:"#d6ed8b",transparent:!0,opacity:.72,side:Pe,depthWrite:!1})},this.material.ramp=new vn({color:"#b18b59",side:Pe});for(const[s,r]of ch.entries()){const o=this.createPlatform(r);o&&this.platforms.set(r.id,o),this.machines.set(r.id,this.createMachine(r,s))}const e=new Float32Array(99),n=new we;n.setAttribute("position",new cn(e,3)),this.previewLine=new ao(n,this.material.preview),this.previewLine.name="catapult-trajectory-preview",this.previewLine.frustumCulled=!1,this.previewLine.visible=!1,this.scene.add(this.previewLine),this.landingMarker=new Zt(this.geometry.ring,this.material.landing),this.landingMarker.name="catapult-landing-preview",this.landingMarker.rotation.x=-Math.PI/2,this.landingMarker.scale.setScalar(Ie.blastRadius),this.landingMarker.visible=!1,this.scene.add(this.landingMarker)}ground(t,e){return this.game.ground(t,e)}mesh(t,e,n,s=[0,0,0],r=[1,1,1]){const o=new Zt(e,n);return o.position.fromArray(s),o.scale.fromArray(r),t.add(o),o}createPlatform(t){const e=this.game.houseFloors?.find(d=>d.id===t.enclosureId);if(!e)return null;const n=new te;n.name=`${t.id}-level-platform`,n.position.set(e.x,e.height,e.z),this.scene.add(n);const s=this.mesh(n,this.geometry.box,this.material.darkWood,[0,-.1,0],[e.halfWidth*2,.2,e.halfDepth*2]);s.name="catapult-floor-at-operator-height";const r=[],o=[];for(let d=-e.halfDepth+.2;d<e.halfDepth;d+=.4){const f=this.geometry.box.clone();f.scale(e.halfWidth*2-.06,.025,.355),f.translate(0,-.012,Math.min(d,e.halfDepth-.2)),r.push(f)}for(const d of[-e.halfWidth+.18,e.halfWidth-.18])for(const f of[-e.halfDepth+.18,e.halfDepth-.18]){const m=this.game.world?.getSurface(e.x+d,e.z+f).height??e.minimum,x=Math.max(.2,e.height-m),g=this.geometry.box.clone();g.scale(.3,x,.3),g.translate(d,-x*.5,f),o.push(g)}for(const[d,f]of[[r,this.material.lightWood],[o,this.material.darkWood]]){const m=Ri(d);for(const g of d)g.dispose();const x=this.mesh(n,m,f);x.userData.ownedGeometry=!0}const a=e.ramp,l=[],c=[];for(let d=0;d<=a.rows;d++)for(let f=0;f<=a.cols;f++){const m=d/a.rows*a.length,x=(f/a.cols*2-1)*a.halfWidth;l.push(a.x+a.dx*m+a.rightX*x-e.x,a.heights[d*(a.cols+1)+f]-e.height,a.z+a.dz*m+a.rightZ*x-e.z)}for(let d=0;d<a.rows;d++)for(let f=0;f<a.cols;f++){const m=d*(a.cols+1)+f,x=m+1,g=m+a.cols+1,p=g+1;c.push(m,g,x,x,g,p)}const h=new we;h.setAttribute("position",new Gt(l,3)),h.setIndex(c),h.computeVertexNormals();const u=this.mesh(n,h,this.material.ramp);return u.name=`${t.id}-walkable-entrance-ramp`,u.userData.ownedGeometry=!0,{group:n,deck:s,ramp:u,floor:e}}createMachine(t,e){const n=new te;n.name=t.id,n.position.set(t.x,this.ground(t.x,t.z),t.z),this.scene.add(n);const s=new te;s.name="wooden-catapult-frame",n.add(s);const r={wood:[],lightWood:[],darkWood:[],rope:[]},o=(y,_,T,A,E,C,S)=>{const b=this.geometry.box.clone();b.scale(E,C,S),b.translate(_,T,A),r[y].push(b)},a=(y,_,T,A)=>{const E=new L(..._),C=new L(...T),S=C.clone().sub(E),b=this.geometry.cylinder.clone();b.scale(A,S.length(),A),b.applyQuaternion(new ns().setFromUnitVectors(F1,S.normalize())),b.translate(...E.add(C).multiplyScalar(.5).toArray()),r[y].push(b)};for(const y of[-1,1])o("wood",y*.82,.18,.6,.26,.28,2.65);for(const y of[-.55,.12,.83,1.68])o("lightWood",0,.29,y,1.98,.14,.22);o("darkWood",0,.34,-.03,1.2,.14,.93);for(const y of[-1,1])a("wood",[y*.76,.3,.1],[y*.76,.99,1],.17),a("wood",[y*.76,.3,1.83],[y*.76,.99,1],.17),a("rope",[y*.77,.48,.35],[y*.77,.58,.47],.21),a("rope",[y*.77,.48,1.61],[y*.77,.58,1.49],.21);a("darkWood",[-.94,.85,1],[.94,.85,1],.22),o("lightWood",0,.52,1.66,1.72,.17,.17);for(const[y,_]of Object.entries(r)){if(!_.length)continue;const T=Ri(_);for(const E of _)E.dispose();const A=this.mesh(s,T,this.material[y]);A.userData.ownedGeometry=!0}const l=this.mesh(s,this.geometry.leaf,this.material.leaf,[0,.41,-.04],[.59,.065,.48]);l.name="operator-seat";const c=new vn({color:ia[e%ia.length]}),h=this.mesh(s,this.geometry.leaf,c,[-.98,.64,1.65],[.13,.45,.3]);h.rotation.z=-.3,h.name="side-leaf";const u=new te;u.name="throwing-arm",u.position.set(0,.85,1),s.add(u),this.mesh(u,this.geometry.box,this.material.lightWood,[0,.07,0],[.18,1.2,.2]),this.mesh(u,this.geometry.box,this.material.darkWood,[0,-.48,0],[.43,.27,.37]);const d=this.mesh(u,this.geometry.cup,this.material.darkWood,[0,.57,0],[1.1,.72,1.3]);d.name="stone-cup";const f=this.mesh(u,this.geometry.rock,this.material.stone,[0,.75,0],[.78,.7,.8]);f.name="loaded-catapult-stone",u.rotation.x=-.45;const m=new te;m.name="reload-winch",m.position.set(0,.61,.53),s.add(m);const x=this.mesh(m,this.geometry.cylinder,this.material.darkWood,[0,0,0],[.13,1.37,.13]);x.rotation.z=Math.PI/2;for(const y of[-1,1]){const _=this.mesh(m,this.geometry.box,this.material.lightWood,[y*.47,.12,0],[.13,.35,.12]);_.name="operator-handle";const T=this.mesh(s,this.geometry.rope,this.material.rope,[y*.76,.85,1],[1,1,1]);T.rotation.y=Math.PI/2}const g=[];for(let y=0;y<2;y++){const _=this.mesh(s,this.geometry.rock,this.material.stone,[1.17,.29,.72+y*.64],[.65,.6,.68]);_.rotation.set(y*.7,.6+y,0),g.push(_)}const p=new _n({color:ia[e%ia.length],transparent:!0,opacity:.25,side:Pe,depthWrite:!1}),v=this.mesh(n,this.geometry.ring,p,[0,.045,.4],[1.65,1.65,1.65]);return v.rotation.x=-Math.PI/2,v.name="catapult-station-ring",{group:n,turret:s,arm:u,winch:m,loadedRock:f,pile:g,ring:v,factionMaterial:c,ringMaterial:p,definition:t,launchAge:1/0,yaw:Math.PI}}operatorPose(t){const e=this.machines.get(typeof t=="string"?t:t?.id);if(!e)return null;const n=this.game.state.catapults?.find(s=>s.id===e.definition.id);return{x:e.definition.x,y:this.ground(e.definition.x,e.definition.z)+B1,z:e.definition.z,yaw:n?Math.atan2(n.aimX,n.aimZ):e.yaw}}consumeEvent(t){if(t.type==="stoneShot"){const e=this.machines.get(t.catapultId);e&&(e.launchAge=0,e.arm.rotation.x=0,e.loadedRock.visible=!1)}}shellPoint(t,e,n=this._vector){const s=na(t.startX,t.tx,e),r=na(t.startZ,t.tz,e),o=this.ground(t.startX,t.startZ)+(t.startHeight??1.6),a=this.ground(t.tx,t.tz)+.12;return n.set(s,na(o,a,e)+4*t.arcHeight*e*(1-e),r)}createShell(t){const e=this.mesh(this.scene,this.geometry.rock,this.material.stone,void 0,[1.05,.95,1.14]);e.name=`catapult-stone-${t.id}`;const n=new _n({color:t.owner==="player"?"#e4c36e":"#f17e62",transparent:!0,opacity:.45,side:Pe,depthWrite:!1}),s=this.mesh(this.scene,this.geometry.ring,n,[t.tx,this.ground(t.tx,t.tz)+.055,t.tz],[Ie.blastRadius,Ie.blastRadius,Ie.blastRadius]);s.rotation.x=-Math.PI/2,s.name=`catapult-danger-${t.id}`;const r=this.mesh(this.scene,this.geometry.disc,n,[t.tx,this.ground(t.tx,t.tz)+.05,t.tz],[.13,.13,.13]);return r.rotation.x=-Math.PI/2,{stone:e,ring:s,core:r,material:n}}updatePreview(){const t=this.game.state,e=t.actors[0],n=this.game.catapultAim,s=t.catapults?.find(m=>m.id===e.catapultId&&m.occupant===e.id),r=n?.target,o=this.game.running&&n?.active&&s&&r&&Number.isFinite(r.x)&&Number.isFinite(r.z)&&!e.ko&&e.dizzyTime<=0;if(this.previewLine.visible=!!o,this.landingMarker.visible=!!o,!o)return;const a=r.x-s.x,l=r.z-s.z,c=Math.hypot(a,l)||1,h={startX:s.x+a/c,startZ:s.z+l/c,startHeight:1.6,tx:r.x,tz:r.z,arcHeight:Ie.arcHeight},u=this.previewLine.geometry.attributes.position;for(let m=0;m<u.count;m++){const x=this.shellPoint(h,m/(u.count-1));u.setXYZ(m,x.x,x.y,x.z)}u.needsUpdate=!0,this.previewLine.computeLineDistances(),this.landingMarker.position.set(r.x,this.ground(r.x,r.z)+.065,r.z),this.landingMarker.scale.setScalar(Ie.blastRadius);const d=s.loaded&&s.cooldown<=0,f=r.valid===!1;this.material.preview.color.set(f?"#ef826d":d?"#e6f7a1":"#b7bfaf"),this.material.landing.color.set(f?"#ef826d":d?"#d6ed8b":"#b7bfaf")}poseOperator(t,e,n){const s=this.game.state.actors.findIndex(c=>c.id===t.id),r=this.game.models?.[s];if(!r?.bones||t.ko)return;const o=r.bones,a=n.cooldown>0,l=a?Math.sin(this.clock*9)*.13:0;for(const c of[-1,1]){const h=o[`shoulder${c}`],u=o[`elbow${c}`],d=o[`wrist${c}`];h&&(h.rotation.x=-.53-l*c,h.rotation.z=c*.08),u&&(u.rotation.x=.45+l*c),d&&(d.rotation.x=-.18)}o.spine&&(o.spine.rotation.x=.08+Math.abs(l)*.12),o.head&&(o.head.rotation.x=-.04)}update(t=0){const e=this.game.running?Math.max(0,Math.min(.1,t)):0;this.clock+=e;const n=this.game.state;for(const s of n.catapults||[]){const r=this.machines.get(s.id);if(!r)continue;r.group.position.y=this.ground(s.x,s.z);const o=Math.atan2(s.aimX,s.aimZ);r.yaw=o,r.turret.rotation.y=o,Number.isFinite(r.launchAge)&&(r.launchAge+=e);const a=this.game.catapultAim;let c=s.occupant==="player"&&a?.active?-.74:-.45;if(s.cooldown>0){const u=1-zl(s.cooldown/(Ie.cooldown||3));c=na(.6,-.45,u*u),r.winch.rotation.x=this.clock*7}else r.winch.rotation.x=0;r.launchAge<.18&&(c=.6*Math.sin(zl(r.launchAge/.09)*Math.PI/2)),r.arm.rotation.x+=(c-r.arm.rotation.x)*(1-Math.exp(-e*18)),r.loadedRock.visible=!!s.loaded,r.ring.material.opacity=s.occupant?.42:.2;const h=n.actors.find(u=>u.id===s.occupant);h&&this.poseOperator(h,r,s)}for(const s of n.shells||[]){let r=this.shellMeshes.get(s.id);r||(r=this.createShell(s),this.shellMeshes.set(s.id,r));const o=zl(s.age/s.duration);this.shellPoint(s,o,r.stone.position),r.stone.rotation.set(s.age*4,s.age*3,s.age*1.5),r.material.opacity=.35+.22*o+.08*Math.sin(this.clock*13)}for(const[s,r]of this.shellMeshes)(n.shells||[]).some(o=>o.id===s)||(r.stone.removeFromParent(),r.ring.removeFromParent(),r.core.removeFromParent(),r.material.dispose(),this.shellMeshes.delete(s));this.updatePreview()}dispose(){for(const t of this.platforms.values())t.group.removeFromParent(),t.group.traverse(e=>{e.userData.ownedGeometry&&e.geometry.dispose()});for(const t of this.machines.values())t.group.removeFromParent(),t.group.traverse(e=>{e.userData.ownedGeometry&&e.geometry.dispose()}),t.factionMaterial.dispose(),t.ringMaterial.dispose();for(const t of this.shellMeshes.values())t.stone.removeFromParent(),t.ring.removeFromParent(),t.core.removeFromParent(),t.material.dispose();this.previewLine.removeFromParent(),this.previewLine.geometry.dispose(),this.landingMarker.removeFromParent();for(const t of Object.values(this.geometry))t.dispose();for(const t of Object.values(this.material))t.dispose();this.machines.clear(),this.platforms.clear(),this.shellMeshes.clear()}}const G1=Math.PI*2,V1=new L(0,1,0),Xr=(i,t=0,e=1)=>Math.max(t,Math.min(e,i)),Ll=i=>Number.isFinite(i?.x)&&Number.isFinite(i?.z),$u=["#c4e4de","#83bcb4","#eaf4e4"].map(i=>new ee(i)),sa=Object.freeze({mobileDrops:96,desktopDrops:144,mobileRipples:6,desktopRipples:8}),W1=`
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
`,X1=`
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
`;class q1{constructor(t){this.game=t,this.scene=t.scene,this.time=0,this.seed=7919,this.cursor=0,this.rippleCursor=0,this.capacity=t.touch?sa.mobileDrops:sa.desktopDrops,this.particles=Array.from({length:this.capacity},()=>({life:0,total:1,x:0,y:0,z:0,vx:0,vy:0,vz:0,size:.08,color:0})),this.dummy=new We,this.direction=new L,this.dropGeometry=new Yn(1,7,5),this.dropMaterial=new vn({color:"#ffffff",emissive:"#163a35",emissiveIntensity:.06,depthTest:!0,depthWrite:!0}),this.droplets=new wn(this.dropGeometry,this.dropMaterial,this.capacity),this.droplets.name="arcade-impact-droplets",this.droplets.instanceMatrix.setUsage(Ai),this.droplets.frustumCulled=!1,this.droplets.count=0;for(let n=0;n<this.capacity;n++)this.droplets.setColorAt(n,$u[0]);this.droplets.instanceColor.setUsage(Ai),this.scene.add(this.droplets);const e=t.touch?sa.mobileRipples:sa.desktopRipples;this.ripples=Array.from({length:e},(n,s)=>{const r=new Ci(2,2,8,8);r.rotateX(-Math.PI/2);const o=r.attributes.position.array.slice(),a=new $n({vertexShader:W1,fragmentShader:X1,uniforms:fa.merge([Ct.fog,{uAge:{value:0},uOpacity:{value:.75},uWater:{value:new ee("#6aaba4")},uFoam:{value:new ee("#e8f2df")}}]),transparent:!0,depthTest:!0,depthWrite:!1,side:Pe,fog:!0,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),l=new Zt(r,a);return l.name=`arcade-impact-ripple-${s}`,l.frustumCulled=!1,l.visible=!1,this.scene.add(l),{mesh:l,reference:o,age:0,duration:1,active:!1}})}ground(t,e){const n=this.game.ground(t,e);return Number.isFinite(n)?n:0}random(){return this.seed=Math.imul(this.seed,1664525)+1013904223>>>0,this.seed/4294967296}ripple(t,e,n,s,r=.75){const o=this.ripples[this.rippleCursor++%this.ripples.length],a=o.mesh.geometry.attributes.position;for(let l=0;l<a.count;l++){const c=t+o.reference[l*3]*n,h=e+o.reference[l*3+2]*n;a.setXYZ(l,c,this.ground(c,h)+.035,h)}a.needsUpdate=!0,o.mesh.geometry.computeVertexNormals(),o.mesh.material.uniforms.uAge.value=0,o.mesh.material.uniforms.uOpacity.value=r,o.age=0,o.duration=s,o.active=!0,o.mesh.visible=!0}emit({x:t,y:e,z:n,count:s,power:r,spread:o=.12,dx:a=0,dz:l=0,lifetime:c=.55}){const h=Math.hypot(a,l);h>0&&(a/=h,l/=h);for(let u=0;u<s;u++){const d=this.particles[this.cursor++%this.capacity],f=this.random()*G1,m=(.8+this.random()*1.7)*r;d.x=t+(this.random()-.5)*o,d.y=e+this.random()*.07,d.z=n+(this.random()-.5)*o,d.vx=Math.sin(f)*m+a*r*.65,d.vz=Math.cos(f)*m+l*r*.65,d.vy=(1.8+this.random()*2.2)*r,d.total=c*(.82+this.random()*.3),d.life=d.total,d.size=(.045+this.random()*.045)*Math.sqrt(r),d.color=u%3}this.drawDrops()}hit({x:t,z:e,dx:n=0,dz:s=0,height:r,heavy:o=!1}={}){if(!Ll({x:t,z:e}))return;const a=this.ground(t,e),l=Number.isFinite(r)?Math.max(a+.04,r):a+.7;this.ripple(t,e,o?1.3:.72,o?.54:.4,o?.8:.64),this.emit({x:t,y:l,z:e,dx:n,dz:s,count:o?15:8,power:o?1.2:.72,spread:o?.22:.1,lifetime:o?.58:.43})}stone({x:t,z:e,radius:n=2.8}={}){if(!Ll({x:t,z:e}))return;const s=Xr(Number.isFinite(n)?n:2.8,1,4);this.ripple(t,e,s,.74,.9),this.emit({x:t,y:this.ground(t,e)+.12,z:e,count:this.game.touch?28:34,power:1.8,spread:.55,lifetime:.76})}landing({x:t,z:e,strength:n=1}={}){if(!Ll({x:t,z:e}))return;const s=Xr(Number.isFinite(n)?n:1,.35,1.8);this.ripple(t,e,.75+s*.42,.48,.68),this.emit({x:t,y:this.ground(t,e)+.08,z:e,count:Math.round(6+s*5),power:.6+s*.28,spread:.25,lifetime:.48})}drawDrops(){let t=0;for(const e of this.particles){if(e.life<=0)continue;const n=Xr(e.life/.13),s=e.size*n;this.dummy.position.set(e.x,e.y,e.z),this.direction.set(e.vx,e.vy,e.vz),this.direction.lengthSq()>1e-6?this.dummy.quaternion.setFromUnitVectors(V1,this.direction.normalize()):this.dummy.quaternion.identity(),this.dummy.scale.set(s,s*1.55,s),this.dummy.updateMatrix(),this.droplets.setMatrixAt(t,this.dummy.matrix),this.droplets.setColorAt(t,$u[e.color]),t++}this.droplets.count=t,this.droplets.instanceMatrix.needsUpdate=!0,this.droplets.instanceColor.needsUpdate=!0}update(t=0){const e=Xr(Number.isFinite(t)?t:0,0,.1);if(e!==0){this.time+=e;for(const n of this.particles){if(n.life<=0||(n.life=Math.max(0,n.life-e),n.life===0))continue;n.x+=n.vx*e,n.z+=n.vz*e,n.y+=n.vy*e-7*e*e,n.vy-=14*e;const s=Math.exp(-e*1.2);n.vx*=s,n.vz*=s;const r=this.ground(n.x,n.z)+.025;n.y<r&&(n.y=r,n.vy=0,n.vx*=.3,n.vz*=.3,n.life=Math.min(n.life,.06))}this.drawDrops();for(const n of this.ripples)n.active&&(n.age+=e,n.mesh.material.uniforms.uAge.value=Xr(n.age/n.duration),n.age>=n.duration&&(n.active=!1,n.mesh.visible=!1))}}clear(){for(const t of this.particles)t.life=0;this.droplets.count=0;for(const t of this.ripples)t.active=!1,t.mesh.visible=!1,t.age=0;this.time=0}dispose(){this.clear(),this.droplets.removeFromParent(),this.dropGeometry.dispose(),this.dropMaterial.dispose();for(const t of this.ripples)t.mesh.removeFromParent(),t.mesh.geometry.dispose(),t.mesh.material.dispose()}}const sr=["#b5dc72","#ee8c72","#bd9ee3"],Yu=(i,t=0,e=1)=>Math.max(t,Math.min(e,i)),Zu=Math.PI*2,$1=["pelvis","spine","head","eyeL","eyeR","wrist-1","wrist1","foot-1","foot1"];class Y1{constructor(t){this.game=t,this.scene=t.scene,this.clock=0,this.group=new te,this.group.name="storage-homes-and-fenced-catapult-yards",this.scene.add(this.group),this.bases=new Map,this.groves=[],this.enclosures=new Map,this.ownedGeometries=[],this.ownedMaterials=[],this.dummy=new We,this.sightRay=new ws,this.sightTarget=new L,this.sightHit=new L,this.roofRay=new ws,this.roofHit=new L,this.roofCamera=new L,this.roofAnchor=new L,this.roofNearest=new L,this.roofTargets=Array.from({length:16},()=>new L),this.roofTargetCount=0,this.geometries={box:new Li(1,1,1),cylinder:new Rs(.5,.5,1,8),cone:new Jc(1,1,5),leaf:new th(1,1),ring:new Qi(.91,1,40),wing:new Yn(1,6,4),sphere:new Yn(1,8,6)},this.materials={wood:new vn({color:"#866244"}),lightWood:new vn({color:"#c69b62"}),darkWood:new vn({color:"#554535"}),leaf:new vn({color:"#56874d"}),fly:new vn({color:"#233e38"}),wing:new vn({color:"#d5eee1",transparent:!0,opacity:.85}),ruin:new vn({color:"#6a6855"}),dark:new _n({color:"#173b31"}),alert:new _n({color:"#f4af69"})},this.buildWalls();for(const[e,n]of Hn.entries())this.bases.set(n.id,this.buildBase(n,e));for(const[e,n]of ah.entries())this.groves.push(this.buildGrove(n,e))}ground(t,e){return this.game.ground(t,e)}mesh(t,e,n,s=0,r=0,o=0,a=1,l=1,c=1){const h=new Zt(e,n);return h.position.set(s,r,o),h.scale.set(a,l,c),t.add(h),h}material(t){const e=new vn(t);return this.ownedMaterials.push(e),e}mergeParts(t,e,n){if(!t.length)return null;const s=Ri(t);for(const o of t)o.dispose();this.ownedGeometries.push(s);const r=new Zt(s,e);return r.name=n,this.group.add(r),r}boxPart(t,e,n,s,r,o,a){const l=this.geometries.box.clone();l.scale(r,o,a),l.translate(e,n,s),t.push(l)}buildWalls(){const t=[];for(const e of Ra){const n=Hn.findIndex(g=>g.owner===e.owner),s=[],r=[],o=[],a=this.material({color:"#866244",transparent:!0,opacity:1}),l=this.material({color:sr[n],transparent:!0,opacity:1});for(const g of Es){if(g.enclosureId!==e.id)continue;const p=this.ground(g.x,g.z);this.boxPart(t,g.x,p+.25,g.z,g.hw*2+.08,.5,g.hd*2+.08),this.boxPart(s,g.x,p+g.height*.5,g.z,g.hw*2,g.height,g.hd*2),this.boxPart(r,g.x,p+g.height+.055,g.z,g.hw*2+.05,.16,g.hd*2+.05);const v=g.hw>g.hd,y=v?g.hw*2:g.hd*2,_=Math.max(1,Math.floor(y/.65));for(let T=0;T<=_;T++){const A=_?T/_-.5:0;this.boxPart(s,g.x+(v?A*y:0),p+g.height*.55,g.z+(v?0:A*y),.15,g.height+.32,.15)}o.push(new qn(new L(g.x-g.hw-.1,p,g.z-g.hd-.1),new L(g.x+g.hw+.1,p+g.height+.35,g.z+g.hd+.1)))}const c=this.mergeParts(s,a,`${e.id}-solid-walls`),h=this.mergeParts(r,l,`${e.id}-wall-tops`);this.enclosures.set(e.id,{definition:e,wallMesh:c,capMesh:h,woodMaterial:a,capMaterial:l,boxes:o,faded:!1});const u=this.ground(e.gate.x,e.gate.z),d=new te;d.name=`${e.id}-single-open-entrance`,d.position.set(e.gate.x,u,e.gate.z),this.group.add(d),(e.side==="east"||e.side==="west")&&(d.rotation.y=Math.PI/2),this.mesh(d,this.geometries.box,a,-1.6,1.25,0,.18,2.5,.25),this.mesh(d,this.geometries.box,a,1.6,1.25,0,.18,2.5,.25),this.mesh(d,this.geometries.box,l,0,2.5,0,3.38,.22,.3);const m=this.mesh(d,this.geometries.box,this.material({color:sr[n]}),0,.045,0,2.8,.07,.5);m.name="walkable-gate-threshold";const x=this.mesh(d,this.geometries.leaf,this.material({color:sr[n]}),0,2.9,0,.4,.35,.1);x.rotation.z=.25}this.mergeParts(t,this.materials.ruin,"enclosure-foundations")}updateWallVisibility(t,e,n){const s=this.game.camera;let r=0;t&&s&&(this.sightTarget.set(t.x,this.ground(t.x,t.z)+(t.height||0)+.9,t.z),this.sightRay.origin.copy(s.position),this.sightRay.direction.copy(this.sightTarget).sub(s.position),r=this.sightRay.direction.lengthSq(),this.sightRay.direction.normalize());const o=1-Math.exp(-Math.max(n,.016)*10);for(const a of this.enclosures.values()){let l=e?.id===a.definition.id;if(!l&&r>0){for(const h of a.boxes)if(this.sightRay.intersectBox(h,this.sightHit)&&this.sightHit.distanceToSquared(this.sightRay.origin)<r-.05){l=!0;break}}a.faded=l;const c=l?.2:a.woodMaterial.opacity+(1-a.woodMaterial.opacity)*o;a.woodMaterial.opacity=a.capMaterial.opacity=c,a.woodMaterial.depthWrite=a.capMaterial.depthWrite=c>.95}}prepareRoofSight(t){this.roofTargetCount=0;const e=this.game.camera;if(!t||!e)return;e.getWorldPosition(this.roofCamera);const n=this.game.models?.[0],s=Yu(t.load||0);if(n?.group){n.group.updateWorldMatrix(!0,!0),this.roofAnchor.setFromMatrixPosition(n.group.matrixWorld);for(const c of $1){const h=n.bones?.[c];h&&this.roofTargets[this.roofTargetCount++].setFromMatrixPosition(h.matrixWorld)}}else this.roofAnchor.set(t.x,this.ground(t.x,t.z)+(t.height||0)+s*.28+(t.catapultId?.45:0),t.z);const r=.86+s*.45,o=.55+s*.22,a=.85+s*.32,l=this.roofAnchor;this.roofTargets[this.roofTargetCount++].set(l.x,l.y+o,l.z),this.roofTargets[this.roofTargetCount++].set(l.x-r,l.y+o,l.z),this.roofTargets[this.roofTargetCount++].set(l.x+r,l.y+o,l.z),this.roofTargets[this.roofTargetCount++].set(l.x,l.y+o,l.z-r),this.roofTargets[this.roofTargetCount++].set(l.x,l.y+o,l.z+r),this.roofTargets[this.roofTargetCount++].set(l.x,l.y+.08,l.z),this.roofTargets[this.roofTargetCount++].set(l.x,l.y+a,l.z)}roofObstructsPlayer(t){if(!this.roofTargetCount)return!1;const e=this.roofCamera,n=this.roofRay,s=this.game.camera,r=s.near||.1,o=Math.tan((s.fov||52)*Math.PI/360),a=Math.max(.35,r*Math.sqrt(1+o*o*(1+(s.aspect||1)**2))+.08);for(const l of t.roofTriangles)if(l.closestPointToPoint(e,this.roofNearest),this.roofNearest.distanceToSquared(e)<a*a)return!0;n.origin.copy(e);for(let l=0;l<this.roofTargetCount;l++){n.direction.copy(this.roofTargets[l]).sub(e);const c=n.direction.lengthSq();if(!(c<1e-8)&&(n.direction.normalize(),!!n.intersectsBox(t.roofBounds))){for(const h of t.roofTriangles)if(n.intersectTriangle(h.a,h.b,h.c,!1,this.roofHit)&&this.roofHit.distanceToSquared(e)<c)return!0}}return!1}buildHouse(t,e,n){const s=this.game.houseFloors?.find(P=>P.baseId===t.id),r=s?.height??this.ground(t.x,t.z),o=t.halfWidth+.18,a=t.halfDepth+.18,l=new te;l.name=`${t.id}-actual-roofed-house`,l.position.set(t.x,r,t.z),this.group.add(l);const c=this.mesh(l,this.geometries.box,this.materials.darkWood,0,-.09,0,o*2,.18,a*2);c.name="house-floor-at-actor-height";const h=[];for(let P=-a+.2;P<a;P+=.4)this.boxPart(h,0,-.012,Math.min(P,a-.2),o*2-.06,.025,.355);const u=Ri(h);for(const P of h)P.dispose();this.ownedGeometries.push(u),this.mesh(l,u,this.materials.lightWood);const d=[];for(const P of[-t.halfWidth,t.halfWidth])for(const G of[-t.halfDepth,t.halfDepth]){const j=this.game.world?.getSurface(t.x+P,t.z+G).height??s?.minimum??r-.2,H=Math.max(.18,r-j);this.boxPart(d,P,-H*.5,G,.3,H,.3)}const f=Ri(d);for(const P of d)P.dispose();this.ownedGeometries.push(f),this.mesh(l,f,this.materials.darkWood);const m=t.side==="east"||t.side==="west",x=(m?t.halfDepth:t.halfWidth)+.32,g=(m?t.halfWidth:t.halfDepth)+.32,p=2.62,v=4.05,y=new we;y.setAttribute("position",new Gt([-x,p,-g,0,v,-g,x,p,-g,-x,p,g,0,v,g,x,p,g],3)),y.setIndex([0,3,4,0,4,1,1,4,5,1,5,2,0,1,2,3,5,4]),y.computeVertexNormals(),m&&y.rotateY(Math.PI/2),this.ownedGeometries.push(y);const _=this.mesh(l,y,e);_.name="full-house-leaf-roof",_.updateWorldMatrix(!0,!1);const T=[],A=new qn,E=y.attributes.position,C=y.index;for(let P=0;P<C.count;P+=3){const G=new Vn;G.a.fromBufferAttribute(E,C.getX(P)).applyMatrix4(_.matrixWorld),G.b.fromBufferAttribute(E,C.getX(P+1)).applyMatrix4(_.matrixWorld),G.c.fromBufferAttribute(E,C.getX(P+2)).applyMatrix4(_.matrixWorld),T.push(G),A.expandByPoint(G.a).expandByPoint(G.b).expandByPoint(G.c)}const S=this.mesh(l,this.geometries.cylinder,n,0,v+.18,0,.13,.55,.13);S.rotation.z=.2;const b=this.mesh(l,this.geometries.leaf,n,.2,v+.48,0,.5,.14,.24);b.rotation.z=.3;let U=null;if(s?.ramp){const P=s.ramp,G=[],j=[];for(let B=0;B<=P.rows;B++)for(let O=0;O<=P.cols;O++){const Q=B/P.rows*P.length,W=(O/P.cols*2-1)*P.halfWidth;G.push(P.x+P.dx*Q+P.rightX*W,P.heights[B*(P.cols+1)+O],P.z+P.dz*Q+P.rightZ*W)}for(let B=0;B<P.rows;B++)for(let O=0;O<P.cols;O++){const Q=B*(P.cols+1)+O,W=Q+1,ft=Q+P.cols+1,Vt=ft+1;j.push(Q,ft,W,W,ft,Vt)}const H=new we;H.setAttribute("position",new Gt(G,3)),H.setIndex(j),H.computeVertexNormals(),this.ownedGeometries.push(H);const q=this.material({color:"#b18b59",side:Pe});U=new Zt(H,q),U.name=`${t.id}-walkable-door-ramp`,this.group.add(U)}return l.userData={baseId:t.id,interior:{x:t.x,z:t.z,halfWidth:t.halfWidth-.17,halfDepth:t.halfDepth-.17},floorY:r,roofEaveY:r+p,roofRidgeY:r+v},{house:l,deck:c,ramp:U,roof:_,roofStem:S,roofLeaf:b,roofTriangles:T,roofBounds:A}}buildBase(t,e){const n=new te;n.name=`${t.id}-shelter`,n.position.set(t.stock.x,this.ground(t.stock.x,t.stock.z),t.stock.z),this.group.add(n);const s=t.side==="north"?0:t.side==="east"?Math.PI/2:-Math.PI/2,r=new te;r.rotation.y=s,n.add(r);const o=this.material({color:sr[e]}),a=this.material({color:e===0?"#61975b":e===1?"#ba7356":"#9270b0",transparent:!0,opacity:1,depthWrite:!0,side:Pe}),l=this.mesh(r,this.geometries.cylinder,this.materials.wood,0,.38,0,1.25,.76,1.25);l.name="infinite-fly-stock-basket",this.mesh(r,this.geometries.cylinder,this.materials.darkWood,0,.77,0,1.15,.09,1.15);const c=this.mesh(r,this.geometries.cylinder,o,0,.42,0,1.31,.14,1.31);c.name="owner-color-on-stock";const{house:h,deck:u,ramp:d,roof:f,roofStem:m,roofLeaf:x,roofTriangles:g,roofBounds:p}=this.buildHouse(t,a,o),v=new te;v.name="visible-fly-reserve",r.add(v);const y=new wn(this.geometries.sphere,this.materials.fly,8),_=new wn(this.geometries.wing,this.materials.wing,16);y.name="reserve-fly-bodies",_.name="reserve-fly-wings",y.frustumCulled=_.frustumCulled=!1,v.add(y,_);const T=new _n({color:sr[e],transparent:!0,opacity:.36,side:Pe,depthWrite:!1});this.ownedMaterials.push(T);const A=this.mesh(n,this.geometries.ring,T,0,.045,0,2.05,2.05,2.05);A.rotation.x=-Math.PI/2,A.name="stock-refill-ring";const E=new te;E.name="storage-destruction-progress",E.position.set(0,2.12,0),n.add(E),this.mesh(E,this.geometries.box,this.materials.dark,0,0,0,2.2,.17,.09);const C=this.mesh(E,this.geometries.box,this.materials.alert,-1.06,0,.055,0,.115,.05);E.visible=!1;const S=new te;S.name="destroyed-storage-remains",S.visible=!1,n.add(S);const b=[];for(let P=0;P<5;P++){const G=this.geometries.box.clone();G.scale(.2,.2,1.1),G.rotateY(P*.8),G.translate(Math.sin(P*2.4)*.8,.12+P%2*.08,Math.cos(P*2.4)*.7),b.push(G)}const U=Ri(b);for(const P of b)P.dispose();return this.ownedGeometries.push(U),this.mesh(S,U,this.materials.ruin),{definition:t,group:n,cabin:r,house:h,deck:u,ramp:d,roof:f,roofStem:m,roofLeaf:x,roofTriangles:g,roofBounds:p,roofObstructed:!1,roofHold:0,roofMaterial:a,marker:A,markerMaterial:T,bar:E,fill:C,supply:v,flyBodies:y,flyWings:_,ruins:S,index:e}}buildGrove(t,e){const n=new te;n.name=t.id,this.group.add(n);const s=this.material({color:["#487c47","#609147","#397553","#668349","#4d825a"][e],transparent:!0,opacity:.94,depthWrite:!0}),r=[],o=[],a=[],l=new te;l.name="tree-cover-canopy",n.add(l);for(let d=0;d<3;d++){const f=d*Zu/3+e*.7,m=t.x+Math.cos(f)*t.radius*.43,x=t.z+Math.sin(f)*t.radius*.43,g=this.ground(m,x),p=3.3+d%2*.5,v=this.geometries.cylinder.clone();v.scale(.24,p,.24),v.translate(m,g+p/2,x),o.push(v);for(let _=0;_<3;_++){const T=this.geometries.leaf.clone();T.scale(1.35+_*.12,.8,1.25),T.translate(m+Math.sin(_*2.1)*.42,g+p+_*.35,x+Math.cos(_*2.1)*.35),r.push(T)}const y=this.geometries.leaf.clone();y.scale(.7,.35,.7),y.translate(m+.5,g+.22,x-.25),a.push(y)}const c=(d,f,m,x)=>{const g=Ri(d);for(const v of d)v.dispose();this.ownedGeometries.push(g);const p=new Zt(g,f);return p.name=m,x.add(p),p};c(o,this.materials.wood,"grove-trunks",n),c(r,s,"grove-leaf-crown",l),c(a,this.materials.leaf,"slow-moving-underbrush",n);const h=new _n({color:"#50733f",transparent:!0,opacity:.2,side:Pe,depthWrite:!1});this.ownedMaterials.push(h);const u=this.mesh(n,this.geometries.ring,h,t.x,this.ground(t.x,t.z)+.02,t.z,t.radius,t.radius,t.radius);return u.rotation.x=-Math.PI/2,{definition:t,group:n,canopy:l,material:s}}update(t=0){const e=this.game.running?Math.max(0,Math.min(.1,t)):0;this.clock+=e;const n=this.game.state.actors?.[0],s=n?a1(n):null;this.updateWallVisibility(n,s,t),this.prepareRoofSight(n);const r=this.game.state.bases||[];for(const o of this.bases.values()){const a=r.find(d=>d.id===o.definition.id||d.owner===o.definition.owner),l=!!a?.destroyed,c=Yu((a?.progress||0)/10),h=c>0&&!l;o.cabin.visible=!l,o.supply.visible=!l,o.ruins.visible=l,o.markerMaterial.color.set(l?"#5c7067":h?"#ff9b58":sr[o.index]),o.markerMaterial.opacity=l?.12:h?.4+.12*Math.sin(this.clock*8):.28,o.bar.visible=h,o.fill.scale.x=2.12*c,o.fill.position.x=-1.06+1.06*c,this.game.camera&&o.bar.quaternion.copy(this.game.camera.quaternion),o.roofObstructed=s?.id===o.definition.id||this.roofObstructsPlayer(o),o.roofHold=o.roofObstructed?.18:Math.max(0,o.roofHold-Math.max(t,.016));const u=o.roofObstructed||o.roofHold>0;o.roof.visible=!l&&!u,o.roofMaterial.opacity=u?0:o.roofMaterial.opacity+(1-o.roofMaterial.opacity)*(1-Math.exp(-Math.max(t,.016)*10)),o.roofMaterial.depthWrite=o.roofMaterial.opacity>.9,o.roofStem.visible=o.roofLeaf.visible=o.roof.visible&&o.roofMaterial.opacity>.6,o.cabin.position.x=h?Math.sin(this.clock*25)*.025:0;for(let d=0;d<8;d++){const f=this.clock*(1.4+d%3*.2)+d*Zu/8,m=.3+d%3*.13,x=Math.sin(f)*m,g=1.05+d%3*.17+Math.sin(this.clock*4+d)*.08,p=Math.cos(f)*m,v=this.dummy;v.position.set(x,g,p),v.scale.set(.09,.08,.13),v.rotation.set(0,f,0),v.updateMatrix(),o.flyBodies.setMatrixAt(d,v.matrix);for(let y=0;y<2;y++){const _=y===0?-1:1;v.position.set(x+Math.cos(f)*_*.105,g+.035,p-Math.sin(f)*_*.105),v.scale.set(.15,.016,.07),v.rotation.set(0,f,Math.sin(this.clock*36+d)*.55*_),v.updateMatrix(),o.flyWings.setMatrixAt(d*2+y,v.matrix)}}o.flyBodies.instanceMatrix.needsUpdate=!0,o.flyWings.instanceMatrix.needsUpdate=!0}for(const o of this.groves){const l=n&&Math.hypot(n.x-o.definition.x,n.z-o.definition.z)<o.definition.radius+1.4?.23:.94;o.material.opacity+=(l-o.material.opacity)*(1-Math.exp(-Math.max(t,.016)*8)),o.material.depthWrite=o.material.opacity>.9}}dispose(){this.group.removeFromParent();for(const t of this.ownedGeometries)t.dispose();for(const t of Object.values(this.geometries))t.dispose();for(const t of this.ownedMaterials)t.dispose();for(const t of Object.values(this.materials))t.dispose();this.bases.clear(),this.enclosures.clear(),this.groves.length=0}}const ji=["move","aim","fire"],Yr=8,_a=(i,t,e)=>Math.max(t,Math.min(e,i)),ur=(i,t)=>Number.isFinite(i)?i:t,hh=(i,t)=>({left:i.x-t.width/2,top:i.y-t.height/2,right:i.x+t.width/2,bottom:i.y+t.height/2}),Z1=(i,t,e=Yr)=>i.left<t.right+e&&i.right>t.left-e&&i.top<t.bottom+e&&i.bottom>t.top-e;function Zd(i,t,e,n,s=i){const r=e.left+t.width/2,o=Math.max(r,e.right-t.width/2),a=e.top+t.height/2,l=Math.max(a,e.bottom-t.height/2),c=m=>({x:_a(ur(m?.x,r),r,o),y:_a(ur(m?.y,a),a,l)}),h=c(i),u=[h,c(s)];for(const m of n)u.push(c({x:m.left-t.width/2-Yr,y:h.y}),c({x:m.right+t.width/2+Yr,y:h.y}),c({x:h.x,y:m.top-t.height/2-Yr}),c({x:h.x,y:m.bottom+t.height/2+Yr}));for(let m=a;m<=l+16;m+=16)for(let x=r;x<=o+16;x+=16)u.push(c({x,y:m}));let d=null,f=1/0;for(const m of u){if(n.some(g=>Z1(hh(m,t),g)))continue;const x=(m.x-h.x)**2+(m.y-h.y)**2;x<f&&(d=m,f=x)}return d||c(s)}function j1(i,t,e){const n=t>=i,s=e.move,r=e.aim,o=e.fire;return{move:{x:14+s.width/2,y:t-26-s.height/2},aim:{x:i-14-r.width/2,y:t-26-r.height/2},fire:n?{x:i-14-r.width/2,y:t-26-r.height-20-o.height/2}:{x:i-14-r.width-22-o.width/2,y:t-26-o.height/2}}}function K1({width:i,height:t,controls:e,preferred:n={},blocked:s=[],insets:r={}}){const o={left:Math.max(10,ur(r.left,0)+8),top:Math.max(10,ur(r.top,0)+8),right:i-Math.max(10,ur(r.right,0)+8),bottom:t-Math.max(18,ur(r.bottom,0)+8)},a=j1(i,t,e),l={},c=[...s];for(const h of ji){const u=n[h],d=u&&Number.isFinite(u.x)&&Number.isFinite(u.y)?{x:u.x*i,y:u.y*t}:a[h];l[h]=Zd(d,e[h],o,c,a[h]),c.push(hh(l[h],e[h]))}return{positions:l,bounds:o}}function J1({root:i,movePad:t,aimPad:e,fireButton:n,toggleButton:s,storageKey:r="frog.touch-layout.v1",onEditingChange:o=()=>{},announce:a=()=>{}}){const l=i.ownerDocument,c=l.defaultView,h={move:t,aim:e,fire:n},u=i.querySelector("#layout-hint");let d=!1,f=null,m={},x={},g={},p={portrait:{},landscape:{}},v=0,y=!1,_={width:c.innerWidth,height:c.innerHeight,mode:c.innerHeight>=c.innerWidth?"portrait":"landscape"};const T=[],A=(B,O,Q,W)=>{B.addEventListener(O,Q,W),T.push(()=>B.removeEventListener(O,Q,W))},E=()=>c.innerHeight>=c.innerWidth?"portrait":"landscape";try{const B=JSON.parse(c.localStorage.getItem(r)||"null");if(B?.version===1)for(const O of["portrait","landscape"])for(const Q of ji){const W=B[O]?.[Q];Number.isFinite(W?.x)&&Number.isFinite(W?.y)&&(p[O][Q]={x:_a(W.x,0,1),y:_a(W.y,0,1)})}}catch{}const C=()=>{const{mode:B,width:O,height:Q}=_;for(const W of ji)m[W]&&(p[B][W]={x:m[W].x/O,y:m[W].y/Q});try{c.localStorage.setItem(r,JSON.stringify({version:1,...p}))}catch{}},S=()=>{const B=[];for(const O of l.querySelectorAll("#arcade-hud, #minimap, #view-button, #layout-button, #layout-hint, #round-status, #base-status, #catapult-status, #sabotage-status, #kick-button, #catapult-button, #sabotage-button")){if(O.hidden||O.closest("[hidden]")||c.getComputedStyle(O).visibility==="hidden")continue;const Q=O.getBoundingClientRect();Q.width&&Q.height&&B.push({left:Q.left,top:Q.top,right:Q.right,bottom:Q.bottom})}return B},b=()=>{for(const B of ji){const O=h[B],Q=m[B];Q&&(O.style.left=`${Q.x-x[B].width/2}px`,O.style.top=`${Q.y-x[B].height/2}px`,O.style.right="auto",O.style.bottom="auto")}},U=()=>{if(y)return;const B=c.getComputedStyle(i),O={};for(const W of["left","right","top","bottom"])O[W]=parseFloat(B.getPropertyValue(`--touch-safe-${W}`))||0;for(const W of ji){const ft=h[W],Vt=ft.getBoundingClientRect(),Me=c.getComputedStyle(ft);x[W]={width:Math.max(44,Vt.width||parseFloat(Me.width)||72),height:Math.max(44,Vt.height||parseFloat(Me.height)||72)}}const Q=K1({width:c.innerWidth,height:c.innerHeight,controls:x,preferred:p[E()],blocked:S(),insets:O});m=Q.positions,g=Q.bounds,_={width:c.innerWidth,height:c.innerHeight,mode:E()},b()},P=()=>{c.cancelAnimationFrame(v),v=c.requestAnimationFrame(U)},G=()=>{f&&(f=null,C())},j=B=>{const O=!!B;if(O!==d){G(),d=O,i.classList.toggle("layout-editing",d),s.setAttribute("aria-pressed",String(d)),s.setAttribute("aria-label",d?"Ολοκλήρωση αλλαγής θέσεων χειριστηρίων":"Αλλαγή θέσεων χειριστηρίων"),s.querySelector("span")?.replaceChildren(d?"ΤΕΛΟΣ":"ΘΕΣΕΙΣ"),u&&(u.hidden=!d);for(const Q of ji)h[Q].setAttribute("data-layout-label",{move:"ΚΙΝΗΣΗ",aim:"ΣΤΟΧΕΥΣΗ",fire:"ΒΟΛΗ"}[Q]),h[Q].classList.toggle("layout-draggable",d);d||C(),o(d),a(d?"Σύρε τα χειριστήρια στη θέση που σε βολεύει. Πάτησε ΤΕΛΟΣ για να συνεχίσεις.":"Οι θέσεις των χειριστηρίων αποθηκεύτηκαν.")}},H=()=>{p[E()]={},U(),C(),a("Επαναφέρθηκαν οι αρχικές θέσεις χειριστηρίων.")};if(u){u.textContent.trim()||u.append("Σύρε κίνηση, στόχευση και βολή. ");const B=l.createElement("button");B.type="button",B.className="layout-reset",B.textContent="ΕΠΑΝΑΦΟΡΑ",B.setAttribute("aria-label","Επαναφορά αρχικών θέσεων χειριστηρίων"),u.append(B),A(B,"click",H)}for(const B of ji){const O=h[B];A(O,"pointerdown",Q=>{d&&(Q.preventDefault(),Q.stopImmediatePropagation(),!f&&(m[B]||U(),f={key:B,id:Q.pointerId,dx:Q.clientX-m[B].x,dy:Q.clientY-m[B].y},O.setPointerCapture?.(Q.pointerId)))},!0),A(O,"pointermove",Q=>{if(!d||(Q.preventDefault(),Q.stopImmediatePropagation(),!f||f.id!==Q.pointerId||f.key!==B))return;const W=S();for(const ft of ji)ft!==B&&m[ft]&&W.push(hh(m[ft],x[ft]));m[B]=Zd({x:Q.clientX-f.dx,y:Q.clientY-f.dy},x[B],g,W,m[B]),b()},!0);for(const Q of["pointerup","pointercancel","lostpointercapture"])A(O,Q,W=>{d&&(W.preventDefault?.(),W.stopImmediatePropagation(),f?.id===W.pointerId&&G())},!0);A(O,"click",Q=>{d&&(Q.preventDefault(),Q.stopImmediatePropagation())},!0)}let q=-1/0;return A(s,"pointerdown",B=>{B.pointerType==="touch"&&(B.preventDefault(),B.stopPropagation(),q=Date.now(),j(!d))}),A(s,"click",B=>{(B.detail===0||Date.now()-q>600)&&j(!d)}),A(c,"resize",()=>{G(),P()}),A(c,"orientationchange",P),A(c,"keydown",B=>{d&&B.code==="Escape"&&(B.preventDefault(),B.stopImmediatePropagation(),j(!1))},!0),A(c,"blur",()=>{G(),d&&j(!1)}),s.setAttribute("aria-pressed","false"),P(),{get editing(){return d},setEditing:j,refresh:U,reset:H,destroy(){if(!y){j(!1),y=!0,c.cancelAnimationFrame(v);for(const B of T)B()}}}}const ju=i=>Number.isFinite(i)?Math.max(0,Math.min(1,i)):0,Q1=Object.freeze([.96,.98,1.04]);function ty(i){if(i.stats?.type!=="frog")return i;i.group.getObjectByName("anatomical-animation-pivot").scale.set(...Q1),i.group.scale.setScalar(1);const e=i.mesh.material;return e.bumpScale=0,e.roughness=.9,e.clearcoat=.08,e.clearcoatRoughness=.75,i}function ey(i,{load:t=0,spit:e=0}={}){if(i.stats?.type!=="frog")return i;const n=ju(t),s=ju(e),r=i.bones;i.group.scale.setScalar(1),r.throat.scale.x*=1+n*.08+s*.1,r.throat.scale.y*=1+n*.12+s*.16,r.throat.scale.z*=1+n*.08+s*.08,r.jaw.rotation.x-=s*.42,r.head.rotation.x-=s*.08;for(const o of["eyeL","eyeR"])r[o].scale.multiplyScalar(1.14);return i}const Lc=Object.freeze({cameraZoom:gr.default,cameraFov:52}),Ku=(i,t)=>{const e=typeof i=="number"||typeof i=="string"&&i.trim()?Number(i):NaN;return Number.isFinite(e)?e:t},Ju=(i,t,e)=>Math.max(t,Math.min(e,i));function jd(i={}){const t=Ju(Ku(i?.cameraZoom,Lc.cameraZoom),gr.min,gr.max),e=Ju(Ku(i?.cameraFov,Lc.cameraFov),40,80);return{cameraZoom:Math.round(t*20)/20,cameraFov:Math.round(e)}}function ny(i){const t=i.camera,e=i.state?.actors?.[0];if(t.fov=i.settings.cameraFov,t.updateProjectionMatrix(),e){const n=qd(e,i.ground(e.x,e.z),t.aspect,i.viewMode,{yaw:i.cameraYaw,pitch:i.cameraPitch,zoom:i.settings.cameraZoom});i.focus.fromArray(n.look),i.cameraTarget.fromArray(n.position),t.position.copy(i.cameraTarget),t.lookAt(i.focus),t.updateMatrixWorld(),i.cameraReady=!0,i.basesView?.update(0)}i.renderer.render(i.scene,t),i.drawLabels?.()}function iy(i,{onChange:t=()=>{}}={}){const e=["camera-zoom","camera-zoom-value","camera-fov","camera-fov-value","camera-reset"],[n,s,r,o,a]=e.map(f=>{const m=i.$(f);if(!m)throw new Error(`Camera settings need #${f}`);return m});n.min="70",n.max="150",n.step="5",r.min="40",r.max="80",r.step="1";const l=()=>{const f=jd(i.settings);return Object.assign(i.settings,f),n.value=String(Math.round(f.cameraZoom*100)),s.textContent=n.value+"%",r.value=String(f.cameraFov),o.textContent=r.value+"°",f},c=()=>{const f=l();ny(i),t(f)},h=()=>{i.settings.cameraZoom=Number(n.value)/100,c()},u=()=>{i.settings.cameraFov=Number(r.value),c()},d=()=>{Object.assign(i.settings,Lc),c()};return n.addEventListener("input",h),r.addEventListener("input",u),a.addEventListener("click",d),l(),()=>{n.removeEventListener("input",h),r.removeEventListener("input",u),a.removeEventListener("click",d)}}const xn=L,Ul=new xn(0,1,0),Nl=(i,t,e)=>Math.max(t,Math.min(e,i)),sy=new Set(["KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"]),kl=i=>{try{return localStorage.getItem(i)}catch{return null}},qr=(i,t)=>{try{return localStorage.setItem(i,t),!0}catch{return!1}},Tr=i=>`<svg viewBox="0 0 64 64" fill="none" aria-hidden="true">${i}</svg>`,Qu=Tr('<ellipse cx="21" cy="23" rx="13" ry="8" fill="#e5fdff" transform="rotate(-30 21 23)"/><ellipse cx="43" cy="23" rx="13" ry="8" fill="#e5fdff" transform="rotate(30 43 23)"/><ellipse cx="32" cy="37" rx="10" ry="15" fill="#344b50" stroke="#12282b" stroke-width="3"/><circle cx="27" cy="25" r="5" fill="#fff6cd"/><circle cx="37" cy="25" r="5" fill="#fff6cd"/><circle cx="28" cy="25" r="2" fill="#14282c"/><circle cx="36" cy="25" r="2" fill="#14282c"/>'),ry=Tr('<path d="m15 8 11 5-4 21 29 6 4 10-36 4-9-11z" fill="#d3ff80" stroke="#314b2d" stroke-width="3"/><path d="m46 13 4 8m9-5-6 9m9 4-9 1" stroke="#ffce71" stroke-width="4"/>'),oy=Tr('<path d="M9 50h46M18 47l10-28 18 28M31 27l20-17" stroke="#d9bf82" stroke-width="6" stroke-linecap="round"/><path d="m45 9 13 4-4 10-12-5z" fill="#8ea29a"/><circle cx="17" cy="53" r="6" fill="#6d4e35"/><circle cx="48" cy="53" r="6" fill="#6d4e35"/>'),td=Tr('<path d="M18 10v44l36-22z" fill="#f3ffd0" stroke="#264e26" stroke-width="4" stroke-linejoin="round"/>'),ay=Tr('<path d="M12 18h40M12 32h40M12 46h40" stroke="#e9f3e5" stroke-width="5" stroke-linecap="round"/><circle cx="24" cy="18" r="6" fill="#fbc562"/><circle cx="42" cy="32" r="6" fill="#fbc562"/><circle cx="24" cy="46" r="6" fill="#fbc562"/>'),ly=Tr('<path d="M8 29 32 9l24 20M14 27v29h36V27" stroke="#f4dfad" stroke-width="5" stroke-linejoin="round"/><path d="M24 56V35h16v21" fill="#243e36" stroke="#f4dfad" stroke-width="3"/><path d="m12 12 11 10m29-10L41 22" stroke="#ffad7a" stroke-width="4"/>');class cy{constructor(){this.volume=.5,this.ctx=null,this.gain=null}resume(){try{this.ctx||(this.ctx=new(window.AudioContext||window.webkitAudioContext),this.gain=this.ctx.createGain(),this.gain.connect(this.ctx.destination)),this.gain.gain.value=this.volume,this.ctx.resume()}catch{}}pause(){this.ctx&&(this.gain.gain.value=0,this.ctx.suspend().catch(()=>{}))}play(t){if(!this.ctx||this.ctx.state!=="running"||this.volume<=0)return;const e=this.ctx,n=e.currentTime,s=e.createOscillator(),r=e.createGain(),a={shot:[200,70,.065],tongue:[560,150,.11],hit:[110,45,.12],hitConfirm:[860,530,.07],storageAlert:[740,480,.3],stoneShot:[110,65,.2],stoneImpact:[75,35,.3],land:[95,50,.13],dizzy:[700,240,.28],ko:[80,330,.26],win:[400,800,.45],lost:[220,55,.4]}[t];a&&(s.type=t==="hit"?"triangle":"sine",s.frequency.setValueAtTime(a[0],n),s.frequency.exponentialRampToValueAtTime(a[1],n+a[2]),r.gain.setValueAtTime(1e-4,n),r.gain.exponentialRampToValueAtTime(.14,n+.008),r.gain.exponentialRampToValueAtTime(1e-4,n+a[2]),s.connect(r),r.connect(this.gain),s.start(n),s.stop(n+a[2]+.01),s.onended=()=>{s.disconnect(),r.disconnect()})}}class hy{constructor(){this.touch=matchMedia("(pointer: coarse)").matches||navigator.maxTouchPoints>0,this.settings={volume:.5,quality:this.touch?"low":"high"};try{Object.assign(this.settings,JSON.parse(kl(Qo)||"{}"))}catch{}Object.assign(this.settings,jd(this.settings)),this.storageAlertUntil=-1/0,this.settings.volume=Nl(Number(this.settings.volume)||0,0,1),["low","high"].includes(this.settings.quality)||(this.settings.quality="low");const t=kl(Jo);try{JSON.parse(t)?.version===1&&!kl(Jo+"-before-bases")&&qr(Jo+"-before-bases",t)}catch{}this.state=Dc(),this.saved=D1(t),this.running=!1,this.mode="title",this.keys=new Set,this.actions={fire:!1,kick:!1,sabotage:!1},this.aimStrength=0,this.lastMouseAim=-1/0,this.move={x:0,z:0},this.aim={x:0,z:-1},this.mouse={x:0,y:0,valid:!1},this.pointers=new Map,this.layoutEditing=!1,this.fx=[],this.particles=[],this.splats=[],this.tongues=new Map,this.bulletMeshes=new Map,this.koTimes=new Map,this.elapsed=0,this.shake=0,this.saveClock=0,this.accumulator=0,this.failures=[],this.hitConfirmUntil=0,this.lastPlayerHit=null,this.scene=new qp,this.scene.background=new ee("#9fe4ff"),this.scene.fog=new Ma("#baf0ea",.006),this.renderer=new c_({antialias:!this.touch,powerPreference:"high-performance"}),this.renderer.domElement.id="arcade-world",this.renderer.domElement.setAttribute("aria-label","FROG — κωμική μάχη με μύγες"),this.renderer.outputColorSpace=In,this.renderer.toneMapping=id,this.renderer.toneMappingExposure=1.3,document.body.append(this.renderer.domElement),this.camera=new zn(this.settings.cameraFov,innerWidth/innerHeight,.1,250),this.camera.position.set(0,8,15),this.focus=new xn(0,2,3),this.cameraTarget=new xn(0,8,15),this.viewMode="chase3d",this.cameraReady=!1,this.cameraYaw=Ln.yaw,this.cameraPitch=Ln.pitch,this.cameraDrag=null,this.stickAim={x:0,z:-1},this.mouseRay=new ml,this.mousePoint=new xn,this.mouseNdc=new Wt,this.mousePlane=new hi(Ul,0),this.scene.add(new ym("#def8ff","#52733a",2.6)),this.sun=new wm("#fff1bf",3.2),this.sun.position.set(-16,36,12),this.scene.add(this.sun),this.world=W_(this.scene,this.renderer,{seed:731,natural:!0});for(const s of[...this.world.creekRefuges])this.world.removeShelter(s.mesh);const e=(s,r)=>this.world.getSurface(s,r).height;this.houseFloors=[...n1(e),...i1(e)];const n=this.world.group.getObjectByName("Fly swarms");n&&(n.visible=!1);for(const s of this.world.hotspots)s.flies=0;this.labels=document.createElement("canvas"),this.labels.id="arcade-labels",document.body.append(this.labels),this.labelCtx=this.labels.getContext("2d"),this.sound=new cy,this.sound.volume=this.settings.volume,this.shared={sphere:new Yn(1,10,7),wing:new Yn(1,6,4),cylinder:new Rs(1,1,1,8),circle:new ba(1,18)},this.materials={insect:new Ve({color:"#263f42",roughness:.8,metalness:0}),wing:new _n({color:"#edfcff",transparent:!0,opacity:.86,side:Pe,depthWrite:!1}),tongue:new Ve({color:"#ff839c",roughness:.4}),shot:new Ve({color:"#384b4d",emissive:"#a6c9bf",emissiveIntensity:.16}),ink:new _n({color:"#90e44c",transparent:!0,opacity:.9,depthWrite:!1,side:Pe}),rock:new Ve({color:"#617b70",roughness:.9}),rim:new _n({color:"#eaff9e",transparent:!0,opacity:.6,depthWrite:!1})},this.createArena(),this.models=[],this.buildActors(),this.createFlies(),this.artilleryView=new H1(this),this.basesView=new Y1(this),this.impactEffects=new q1(this),this.createUI(),this.bindInputs(),this.applyQuality(),this.resize(),this.showTitle(),window.__FROG__={version:Pl,mode:"arcade",inspect:()=>this.inspect(),save:()=>this.persist()},new URLSearchParams(location.search).has("test")&&(window.__FROG__.test={step:(s,r=1)=>{for(let o=0;o<r;o++)Xu(this.state,s,1/60),this.consumeEvents();this.updateHUD()},state:()=>this.state,setState:s=>{this.state=s,this.buildActors(),this.updateHUD()},input:()=>this.currentInput(),kickTarget:()=>Ic(this.state,this.state.actors[0])?.id}),this.last=performance.now(),iy(this,{onChange:()=>qr(Qo,JSON.stringify(this.settings))}),this.renderer.setAnimationLoop(s=>this.frame(s)),document.getElementById("boot")?.remove()}ground(t,e){return s1(t,e,this.houseFloors)??this.world.getSurface(t,e).height}createArena(){this.obstacleMeshes=[];for(const n of Ps){const s=new Zt(new Sa(n.r,1),this.materials.rock);s.scale.y=1.7,s.position.set(n.x,this.ground(n.x,n.z)+n.r*.9,n.z),this.scene.add(s),this.obstacleMeshes.push(s)}const t=[];for(let n=0;n<=160;n++){const s=n/160*Math.PI*2,r=Math.sin(s)*Mt.radius,o=Math.cos(s)*Mt.radius;t.push(new xn(r,this.ground(r,o)+.06,o))}const e=new ao(new we().setFromPoints(t),this.materials.rim);this.scene.add(e),this.playerRing=new Zt(new Qi(1.05,1.18,32),new _n({color:"#ecff9a",side:Pe,transparent:!0,opacity:.85,depthWrite:!1})),this.playerRing.rotation.x=-Math.PI/2,this.scene.add(this.playerRing),this.aimGuide=new ao(new we().setFromPoints([new xn,new xn]),new Ad({color:"#fff2b0",dashSize:.45,gapSize:.35,transparent:!0,opacity:.65})),this.scene.add(this.aimGuide),this.aimReticle=new Zt(new Qi(.35,.42,24),new _n({color:"#fff2b0",side:Pe,transparent:!0,opacity:.88,depthWrite:!1})),this.aimReticle.rotation.x=-Math.PI/2,this.scene.add(this.aimReticle),this.targetRing=new Zt(new Qi(1.32,1.44,32),new _n({color:"#ffb19c",side:Pe,transparent:!0,opacity:.9,depthWrite:!1})),this.targetRing.rotation.x=-Math.PI/2,this.targetRing.visible=!1,this.scene.add(this.targetRing),this.swarmRings=Sr.map(n=>{const s=new Zt(new Qi(n.radius-.08,n.radius+.03,40),new _n({color:"#c8e0a3",side:Pe,transparent:!0,opacity:.22,depthWrite:!1}));return s.rotation.x=-Math.PI/2,s.position.set(n.x,this.ground(n.x,n.z)+.08,n.z),this.scene.add(s),s})}buildActors(){for(const t of this.models||[])t.dispose();this.models=this.state.actors.map((t,e)=>{const n=t1("frog",{seed:7+e*39,team:e===0?"player":`enemy${e}`,role:e===2?"bruiser":"hunter",tier:1,level:1});if(n.setEquipment({}),n.setOutline(e===0?"#e7fca7":e===1?"#ffae88":"#d3a8ff",!0),this.settings.quality==="low"&&n.setRenderLOD(1),n.mesh?.material){const s=n.mesh.material;s.bumpScale=0,s.roughness=.85,s.userData?.tint?.set(["#86da38","#ff694a","#bb70ed"][e])}return ty(n),this.scene.add(n.group),n})}createFlies(){const t=this.state.flies.length;this.flyBodies=new wn(this.shared.sphere,this.materials.insect,t),this.flyWings=new wn(this.shared.wing,this.materials.wing,t*2);for(const e of[this.flyBodies,this.flyWings])e.instanceMatrix.setUsage(Ai),e.frustumCulled=!1,this.scene.add(e);this.dummy=new We}createUI(){this.ui=document.createElement("div"),this.ui.id="arcade-ui",this.ui.classList.toggle("is-touch",this.touch),this.ui.innerHTML=`<header id="arcade-hud" hidden><button class="view-button" id="view-button" aria-label="Αλλαγή σε κεντραρισμένη κάτοψη">ΠΙΣΩ 3D · C</button><div class="ammo-card">${Qu}<div class="ammo-info"><div class="ammo-numbers"><strong id="ammo-count">0 / ${Mt.capacity}</strong><b id="ammo-percent">0%</b></div><div id="ammo-track" role="progressbar" aria-label="Γέμιση με μύγες" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><i id="ammo-fill"></i></div><span id="ammo-state">Γέμισε στην αποθήκη σου</span></div></div><div class="ko-card base-card"><b id="ko-count">3 / 3</b><span>ΑΠΟΘΗΚΕΣ</span><div id="base-dots" aria-label="Άθικτες αποθήκες"><i data-owner="player"></i><i data-owner="rival-1"></i><i data-owner="rival-2"></i></div></div><button class="small-button" id="pause-button" aria-label="Παύση">Ⅱ</button></header>
  <div id="round-status" hidden><b id="round-time">20″</b><span id="round-copy">ΠΡΟΕΤΟΙΜΑΣΙΑ · Προστάτεψε την αποθήκη σου</span></div><div id="base-status" hidden><b id="base-warning-title" role="alert" aria-atomic="true"></b><span id="base-warning-detail"></span></div>
  <button id="catapult-button" class="touch-action catapult-button" aria-label="Χρήση κοντινού καταπέλτη" hidden>${oy}<span>ΧΡΗΣΗ</span></button><div id="catapult-status" hidden></div>
  <button id="sabotage-button" class="touch-action sabotage-button" aria-label="Κράτησε για καταστροφή εχθρικής αποθήκης" hidden>${ly}<span>ΚΡΑΤΑ · 10″</span></button><div id="sabotage-status" hidden><span id="sabotage-copy"></span><div role="progressbar" aria-label="Καταστροφή αποθήκης" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" id="sabotage-track"><i id="sabotage-fill"></i></div></div>
  <canvas id="minimap" width="320" height="320" aria-label="Χάρτης: η βάση σου πράσινη, εχθρικές αποθήκες κόκκινη και μωβ, είσοδοι, καταπέλτες και σμήνη"></canvas><div id="dizzy-banner" hidden>🌀 ΖΑΛΙΣΤΗΚΕΣ! <b id="dizzy-time"></b></div><div id="callout" aria-live="polite"></div>
  <div id="desktop-help" hidden><span><b>WASD</b> Κίνηση</span><span><b>Δεξί σύρσιμο</b> Κάμερα</span><span><b>Κλικ</b> Μύγες</span><span><b>E κράτημα</b> Αποθήκη</span><span><b>E</b> Καταπέλτης</span><span id="pc-kick"><b>Q</b> Κλωτσιά</span></div>
  <div id="touch-controls" hidden><div class="stick-zone move-zone"><div id="move-stick" class="stick" aria-label="Κίνηση"><div class="stick-inner"></div><div class="stick-knob"></div></div><span class="stick-caption">ΑΛΜΑΤΑ</span></div><button id="kick-button" class="touch-action kick-button" aria-label="Αμυντική κλωτσιά για απώθηση κοντινού αντιπάλου" hidden disabled>${ry}<span>ΚΛΩΤΣΙΑ</span></button><button id="fire-button" class="touch-action fire-button" aria-label="Κράτησε για εκτόξευση μυγών">${Qu}<span>ΠΥΡ</span></button><div class="stick-zone aim-zone"><div id="aim-stick" class="stick" aria-label="Στόχευση"><div class="fire-ring"></div><div class="stick-inner"></div><div class="stick-knob"></div><span class="aim-center" aria-hidden="true">+</span></div><span class="stick-caption">ΣΤΟΧΕΥΣΗ</span></div><button id="layout-button" class="layout-button" aria-label="Μετακίνηση χειριστηρίων"><b aria-hidden="true">↔</b><span>ΘΕΣΕΙΣ</span></button><div id="layout-hint" hidden>Σύρε τα χειριστήρια στη θέση σου.</div></div>
  <section id="arcade-menu" class="menu"><div id="menu-main" class="menu-buttons"><button id="play-button" class="art-button play-button">${td}<span>ΠΑΙΞΕ</span></button><button id="settings-button" class="art-button settings-button">${ay}<span>ΡΥΘΜΙΣΕΙΣ</span></button><button id="new-round-button" class="plain-button" hidden>ΝΕΟΣ ΓΥΡΟΣ</button></div><div id="settings-panel" class="settings-panel" hidden><h2>Ρυθμίσεις</h2><div class="settings-grid"><label>Ήχος <input id="volume" type="range" min="0" max="100" value="${Math.round(this.settings.volume*100)}"></label><label>Γραφικά <select id="quality"><option value="low">Ομαλή κίνηση</option><option value="high">Υψηλά</option></select></label></div><div class="camera-settings-heading"><h3>Κάμερα</h3><button id="camera-reset" type="button">ΕΠΑΝΑΦΟΡΑ</button></div><div class="settings-grid camera-settings-grid"><label for="camera-zoom"><span>Zoom <output id="camera-zoom-value" for="camera-zoom">100%</output></span><input id="camera-zoom" type="range" min="70" max="150" step="5" value="100"></label><label for="camera-fov"><span>Οπτικό πεδίο <output id="camera-fov-value" for="camera-fov">52°</output></span><input id="camera-fov" type="range" min="40" max="80" step="1" value="52" aria-label="Οπτικό πεδίο FOV σε μοίρες"></label></div><button id="settings-back" class="art-button compact">ΠΙΣΩ</button></div><div id="result-panel" class="result-panel" hidden><span class="result-kicker">FROG • FLY FRENZY</span><h1 id="result-title"></h1><p id="result-copy"></p><button id="replay-button" class="art-button play-button">${td}<span>ΠΑΙΞΕ ΞΑΝΑ</span></button><button id="result-settings" class="plain-button">Ρυθμίσεις</button></div><span class="version">FROG ${Pl}</span></section>`,document.body.append(this.ui),this.$=t=>this.ui.querySelector("#"+t),this.$("quality").value=this.settings.quality,this.$("view-button").onclick=()=>this.toggleView(),this.$("play-button").onclick=()=>this.startOrResume(),this.$("pause-button").onclick=()=>this.pause(),this.$("settings-button").onclick=()=>this.settingsMenu(),this.$("result-settings").onclick=()=>this.settingsMenu(),this.$("settings-back").onclick=()=>{this.$("arcade-menu").classList.remove("settings-open"),this.$("settings-panel").hidden=!0,this.mode==="result"?this.$("result-panel").hidden=!1:this.$("menu-main").hidden=!1},this.$("replay-button").onclick=()=>this.startNew(),this.$("new-round-button").onclick=()=>this.startNew(),this.$("volume").oninput=t=>{this.settings.volume=Number(t.target.value)/100,this.sound.volume=this.settings.volume,qr(Qo,JSON.stringify(this.settings))},this.$("quality").onchange=t=>{this.settings.quality=t.target.value,this.applyQuality(),qr(Qo,JSON.stringify(this.settings))},this.touchLayout=J1({root:this.$("touch-controls"),movePad:this.ui.querySelector(".move-zone"),aimPad:this.ui.querySelector(".aim-zone"),fireButton:this.$("fire-button"),toggleButton:this.$("layout-button"),storageKey:"frog-touch-layout-v1",onEditingChange:t=>{this.layoutEditing=t,this.clearInputs(),this.accumulator=0,t?this.sound.pause():this.running&&this.sound.resume()},announce:t=>this.message(t,2)})}showTitle(){this.running=!1,this.mode="title",this.$("play-button").querySelector("span").textContent=this.saved?.status==="playing"?"ΣΥΝΕΧΕΙΑ":"ΠΑΙΞΕ",this.$("new-round-button").hidden=this.saved?.status!=="playing",this.ui.classList.add("in-menu")}settingsMenu(){this.$("arcade-menu").classList.add("settings-open"),this.$("menu-main").hidden=!0,this.$("result-panel").hidden=!0,this.$("settings-panel").hidden=!1}startOrResume(){if(this.mode==="pause"){this.go();return}this.saved?.status==="playing"?(this.state=this.saved,this.saved=null,this.resetCamera(),this.buildActors(),this.go()):this.startNew()}toggleView(){this.stopCameraDrag(),this.mouse.valid=!1,this.viewMode=this.viewMode==="chase3d"?"overview":"chase3d",this.$("view-button").textContent=this.viewMode==="chase3d"?"ΠΙΣΩ 3D · C":"ΚΑΤΟΨΗ · C",this.$("view-button").setAttribute("aria-label",this.viewMode==="chase3d"?"Αλλαγή σε κεντραρισμένη κάτοψη":"Αλλαγή σε κάμερα πίσω από τον βάτραχο"),this.cameraReady=!1}startNew(){this.storageAlertUntil=-1/0,this.saved=null,this.state=Dc(731+Math.floor(Math.random()*1e5)),this.resetCamera(),this.clearEffects(),this.buildActors(),this.go(),this.message("60 μύγες έτοιμες!",1.6)}resetCamera(){const t=this.state.actors[0],e=I1(t);this.cameraYaw=Math.atan2(e.x,e.z),this.cameraPitch=Ln.pitch,this.cameraReady=!1,this.mouse.valid=!1,this.aim={x:t.aimX,z:t.aimZ},this.stopCameraDrag()}beginCameraDrag(t){if(this.cameraDrag)return;this.viewMode==="overview"&&this.toggleView(),this.mouse.valid=!1,this.actions.fire=!1,this.cameraDrag={id:t.pointerId,type:t.pointerType,x:t.clientX,y:t.clientY};const e=this.renderer.domElement;e.setPointerCapture(t.pointerId),e.classList.add("camera-dragging")}stopCameraDrag(){const t=this.cameraDrag;this.cameraDrag=null;const e=this.renderer?.domElement;t&&e?.hasPointerCapture?.(t.id)&&e.releasePointerCapture(t.id),e?.classList.remove("camera-dragging")}go(){this.$("arcade-menu").classList.remove("settings-open"),this.clearInputs(),this.accumulator=0,this.last=performance.now(),this.running=!0,this.mode="play",this.$("new-round-button").hidden=!0,this.$("arcade-menu").hidden=!0,this.$("settings-panel").hidden=!0,this.$("result-panel").hidden=!0,this.$("menu-main").hidden=!1,this.$("arcade-hud").hidden=!1,this.$("desktop-help").hidden=this.touch,this.$("touch-controls").hidden=!this.touch,this.ui.classList.remove("in-menu"),this.sound.resume(),this.updateHUD(),this.touchLayout?.refresh(),this.persist()}pause(){this.running&&(this.touchLayout?.setEditing(!1),this.running=!1,this.mode="pause",this.clearInputs(),this.persist(),this.sound.pause(),this.$("arcade-menu").hidden=!1,this.$("menu-main").hidden=!1,this.$("settings-panel").hidden=!0,this.$("play-button").querySelector("span").textContent="ΣΥΝΕΧΕΙΑ",this.$("new-round-button").hidden=!1,this.ui.classList.add("in-menu"))}finish(){this.touchLayout?.setEditing(!1),this.running=!1,this.mode="finishing",this.resultAt=this.elapsed+.85,this.clearInputs(),this.persist()}showResult(){this.running=!1,this.mode="result",this.clearInputs(),this.persist();const t=this.state.status==="won";this.sound.play(t?"win":"lost"),this.$("arcade-menu").hidden=!1,this.$("menu-main").hidden=!0,this.$("result-panel").hidden=!1,this.$("result-title").textContent=t?"Η ΤΕΛΕΥΤΑΙΑ ΑΠΟΘΗΚΗ ΕΙΝΑΙ ΔΙΚΗ ΣΟΥ!":"Η ΑΠΟΘΗΚΗ ΣΟΥ ΚΑΤΑΣΤΡΑΦΗΚΕ",this.$("result-copy").textContent=t?`${this.state.stats.kos} νοκ άουτ · ${this.state.stats.shots} βολές · ${Math.floor(this.state.time)}″ μάχης`:"Κράτησε την είσοδο, διέκοψε τους εισβολείς με μία εύστοχη βολή και ανεφοδιάσου πριν ξαναβγείς.",this.ui.classList.add("in-menu")}persist(){return this.mode==="title"?!1:qr(Jo,P1(this.state))}clearInputs(){if(this.keys.clear(),this.actions={fire:!1,kick:!1,sabotage:!1},this.aimStrength=0,this.mouse.valid=!1,this.lastMouseAim=-1/0,this.move={x:0,z:0},this.pointers.clear(),this.stopCameraDrag(),this.ui){for(const t of this.ui.querySelectorAll(".stick-knob"))t.style.transform="translate(-50%,-50%)";this.$("aim-stick").classList.remove("firing"),this.$("fire-button")?.classList.remove("firing")}}bindInputs(){addEventListener("keydown",s=>{if(!s.target.matches("input,select")){if(s.code==="Escape"){if(s.preventDefault(),this.layoutEditing){this.touchLayout.setEditing(!1);return}this.running?this.pause():this.mode==="pause"&&this.go();return}if(!(!this.running||this.layoutEditing)){if(s.code==="KeyC"&&!s.repeat){s.preventDefault(),this.toggleView();return}(sy.has(s.code)||["KeyQ","KeyE"].includes(s.code))&&(s.preventDefault(),this.keys.add(s.code))}}}),addEventListener("keyup",s=>this.keys.delete(s.code));const t=this.renderer.domElement;t.addEventListener("pointermove",s=>{if(!(!this.running||this.layoutEditing)){if(s.pointerType==="mouse"&&(this.cameraDrag?.type==="mouse"&&!(s.buttons&2)&&this.stopCameraDrag(),s.buttons&2&&!this.cameraDrag&&this.beginCameraDrag(s)),this.cameraDrag){if(s.pointerId!==this.cameraDrag.id)return;s.preventDefault();const r=z1({yaw:this.cameraYaw,pitch:this.cameraPitch},s.clientX-this.cameraDrag.x,s.clientY-this.cameraDrag.y);this.cameraYaw=r.yaw,this.cameraPitch=r.pitch,this.cameraDrag.x=s.clientX,this.cameraDrag.y=s.clientY;return}s.pointerType==="mouse"&&this.captureMouseAim(s)}}),t.addEventListener("pointerdown",s=>{if(!(!this.running||this.layoutEditing)){if(s.preventDefault(),s.button===2||s.pointerType==="touch"){this.beginCameraDrag(s);return}s.button===0&&!this.cameraDrag&&(this.captureMouseAim(s),this.actions.fire=!0)}}),addEventListener("pointerup",s=>{this.cameraDrag?.id===s.pointerId&&(s.button===2||s.pointerType==="touch")&&this.stopCameraDrag(),s.pointerType!=="touch"&&s.button===0&&(this.actions.fire=!1)}),t.addEventListener("pointercancel",s=>{this.cameraDrag?.id===s.pointerId&&this.stopCameraDrag(),this.actions.fire=!1}),t.addEventListener("lostpointercapture",s=>{this.cameraDrag?.id===s.pointerId&&this.stopCameraDrag()}),t.addEventListener("contextmenu",s=>s.preventDefault());const e=(s,r)=>{const o=this.$(s),a=o.querySelector(".stick-knob");let l=null;const c=u=>{const d=o.getBoundingClientRect(),f=(u.clientX-d.left-d.width/2)/(d.width/2),m=(u.clientY-d.top-d.height/2)/(d.height/2),x=y1(f,m),g=Math.hypot(f,m),p=g>1?1/g:1;a.style.transform=`translate(-50%,-50%) translate(${f*p*d.width*.31}px,${m*p*d.height*.31}px)`,r==="move"?this.move={x:x.x,z:x.z}:(this.aimStrength=Math.min(1,g),g>.08&&(this.stickAim={x:f/g,z:m/g})),this.mouse.valid=!1};o.onpointerdown=u=>{!this.running||this.layoutEditing||l!==null&&this.pointers.has(r)||(u.preventDefault(),l=u.pointerId,this.pointers.set(r,l),o.setPointerCapture(u.pointerId),c(u))},o.onpointermove=u=>{!this.layoutEditing&&l===u.pointerId&&this.pointers.get(r)===l&&(u.preventDefault(),c(u))};const h=u=>{u.pointerId===l&&(l=null,this.pointers.delete(r),a.style.transform="translate(-50%,-50%)",r==="move"?this.move={x:0,z:0}:(this.aimStrength=0,o.classList.remove("firing")))};o.onpointerup=h,o.onpointercancel=h,o.onlostpointercapture=h};e("move-stick","move"),e("aim-stick","aim");const n=(s,r)=>{const o=this.$(s);let a=null;o.onpointerdown=c=>{!this.running||this.layoutEditing||o.disabled||(c.preventDefault(),a=c.pointerId,o.setPointerCapture(c.pointerId),this.actions[r]=!0)};const l=c=>{c.pointerId===a&&(a=null,this.actions[r]=!1)};o.onpointerup=l,o.onpointercancel=l,o.onlostpointercapture=l};n("kick-button","kick"),n("fire-button","fire"),n("sabotage-button","sabotage"),addEventListener("blur",()=>{this.clearInputs(),this.running&&this.pause()}),document.addEventListener("visibilitychange",()=>{document.hidden&&(this.clearInputs(),this.pause(),this.sound.pause())}),addEventListener("beforeunload",()=>this.persist()),addEventListener("resize",()=>{this.clearInputs(),this.resize()})}applyQuality(){const t=this.settings.quality==="low";this.renderer.setPixelRatio(Math.min(devicePixelRatio||1,t?1:1.5));for(const e of this.models)e.setRenderLOD(t?1:0);this.resize()}resize(){const t=innerWidth,e=innerHeight;this.renderer.setSize(t,e),this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.cameraReady=!1,this.labels.width=t,this.labels.height=e,this.w=t,this.h=e,this.touchLayout?.refresh()}captureMouseAim(t){this.mouse.x=t.clientX,this.mouse.y=t.clientY,this.mouse.valid=!0,this.lastMouseAim=performance.now(),this.updateMouseTarget()}updateMouseTarget(){if(!this.mouse.valid||this.cameraDrag)return;const t=this.state.actors[0];if(this.mouseNdc.set(this.mouse.x/this.w*2-1,1-this.mouse.y/this.h*2),this.mouseRay.setFromCamera(this.mouseNdc,this.camera),this.mousePlane.constant=-this.ground(t.x,t.z)-.9,this.mouseRay.ray.intersectPlane(this.mousePlane,this.mousePoint))this.mouse.target={x:this.mousePoint.x,z:this.mousePoint.z};else{const e=this.mouseRay.ray.direction,n=Math.hypot(e.x,e.z),s=ea(0,-1,this.camera.position,this.focus),r=t.catapultId?Ie.maxRange:Mt.projectileSpeed*Mt.projectileLifetime;this.mouse.target={x:t.x+(n>1e-6?e.x/n:s.x)*r,z:t.z+(n>1e-6?e.z/n:s.z)*r}}}aimFromScreen(t,e){const n=this.state.actors[0],s=this.ground(n.x,n.z)+.9,r=this.project(n.x,s,n.z),o=Math.min(this.w,this.h)*.34,a=new xn,l=new ml;if(l.setFromCamera(new Wt((r.x+t*o)/this.w*2-1,1-(r.y+e*o)/this.h*2),this.camera),l.ray.intersectPlane(new hi(Ul,-s),a)){const c=a.x-n.x,h=a.z-n.z,u=Math.hypot(c,h);if(u>.05&&Number.isFinite(u))return{x:c/u,z:h/u,distance:u}}return ea(t,e,this.camera.position,this.focus)}currentInput(){if(this.layoutEditing)return{};const t=this.state.actors[0],e=this.pointers.has("aim")&&this.aimStrength>.08,n=!this.cameraDrag&&(this.actions.fire||e||!this.touch&&this.mouse.valid);if(e&&(this.aim={...ea(this.stickAim.x,this.stickAim.z,this.camera.position,this.focus),distance:14}),this.updateMouseTarget(),this.mouse.valid&&n&&this.mouse.target){const r=this.mouse.target.x-t.x,o=this.mouse.target.z-t.z,a=Math.hypot(r,o);a>.1&&(this.aim={x:r/a,z:o/a,distance:a})}const s=ea(this.move.x+(this.keys.has("KeyD")||this.keys.has("ArrowRight")?1:0)-(this.keys.has("KeyA")||this.keys.has("ArrowLeft")?1:0),this.move.z+(this.keys.has("KeyS")||this.keys.has("ArrowDown")?1:0)-(this.keys.has("KeyW")||this.keys.has("ArrowUp")?1:0),this.camera.position,this.focus);return{mx:s.x,mz:s.z,ax:this.aim.x,az:this.aim.z,aiming:n,fire:this.actions.fire&&!this.cameraDrag,kick:this.actions.kick||this.keys.has("KeyQ"),sabotage:!t.catapultId&&(this.actions.sabotage||this.keys.has("KeyE"))}}message(t,e=1.5){this.$("callout").textContent=t,this.calloutUntil=this.elapsed+e}makeFlyBullet(){const t=new te,e=new Zt(this.shared.sphere,this.materials.shot);e.scale.set(.12,.1,.19),t.add(e);for(const n of[-1,1]){const s=new Zt(this.shared.wing,this.materials.wing);s.position.set(n*.13,.07,0),s.scale.set(.17,.018,.09),t.add(s)}return this.scene.add(t),t}consumeEvents(){for(const t of this.state.events){this.artilleryView?.consumeEvent(t);const e=this.state.actors.findIndex(r=>r.id===t.id),n=this.state.actors[e],s=this.models[e];if(t.type==="tongue"&&n){const r=this.tongues.get(n.id);r&&this.scene.remove(r.mesh);const o=new Zt(this.shared.cylinder,this.materials.tongue);this.scene.add(o),this.tongues.set(n.id,{mesh:o,start:this.elapsed,x:t.x,z:t.z})}if(t.type==="shot"&&n?.id==="player"&&this.sound.play("shot"),t.type==="hit"&&s){s.mesh.material.emissive?.set("#ffffff");const r=s.group.rotation.y,o=Math.cos(r),a=Math.sin(r);s.setImpact({x:o*t.dx-a*t.dz,z:a*t.dx+o*t.dz,strength:1.3,duration:n.knockUp>0?.42:.27}),this.impactEffects.hit({...t,height:this.ground(t.x,t.z)+n.height+.75,heavy:n.knockUp>0}),this.shake=Math.max(this.shake,n.id==="player"?.16:.025),t.owner==="player"&&n.id!=="player"?(this.hitConfirmUntil=this.elapsed+.2,this.lastPlayerHit={id:n.id,x:t.x,z:t.z,time:this.elapsed},this.sound.play("hitConfirm")):n.id==="player"&&this.sound.play("hit")}if(t.type==="dizzy"&&(this.addText("ΖΑΛΗ!",n.x,n.z,"#ffe375",1),this.sound.play("dizzy"),n.id!=="player"&&this.message("ΖΑΛΙΣΤΗΚΕ! ΣΥΝΕΧΙΣΕ ΤΙΣ ΕΥΣΤΟΧΕΣ ΒΟΛΕΣ.",2)),t.type==="ko"&&(this.koTimes.set(n.id,{time:this.elapsed,dx:t.dx,dz:t.dz}),this.addText("ΝΟΚ ΑΟΥΤ!",n.x,n.z,"#ffe791",1.4),this.sound.play("ko"),this.shake=.32,this.makeSplat({...t,wall:!1})),t.type==="respawn"&&(this.koTimes.delete(t.id),t.id==="player"&&(this.clearInputs(),this.resetCamera(),this.message("Επέστρεψες με 60 μύγες!",2))),t.type==="sabotageStart"&&(t.id==="player"?this.elapsed>=this.storageAlertUntil&&(this.sound.play("storageAlert"),this.storageAlertUntil=this.elapsed+3):t.by==="player"&&this.message("Κράτα μέχρι το τέλος · οι βολές εναντίον σου διακόπτουν.",2)),t.type==="sabotageInterrupted"&&t.by==="player"&&this.message(t.reason==="hit"?"Σε χτύπησαν! Η καταστροφή διακόπηκε.":"Η καταστροφή διακόπηκε.",1.5),t.type==="baseDestroyed"){const r=Hn.find(o=>o.id===t.baseId);r&&this.addText("ΑΠΟΘΗΚΗ ΚΑΤΑΣΤΡΑΦΗΚΕ",r.stock.x,r.stock.z,"#ffc689",2),this.sound.play("stoneImpact"),this.shake=.2}t.type==="splat"&&this.makeSplat(t),t.type==="stoneShot"&&this.sound.play("stoneShot"),t.type==="land"&&t.stone&&(this.impactEffects.landing(t),Math.hypot(t.x-this.state.actors[0].x,t.z-this.state.actors[0].z)<10&&this.sound.play("land")),t.type==="stoneImpact"&&(this.sound.play("stoneImpact"),this.impactEffects.stone(t),Math.hypot(t.x-this.state.actors[0].x,t.z-this.state.actors[0].z)<7&&(this.shake=Math.max(this.shake,.16))),t.type==="battle"&&this.message("ΜΑΧΗ!",1.2)}}addText(t,e,n,s,r){this.fx.push({text:t,x:e,z:n,color:s,life:r,start:this.elapsed}),this.fx.length>28&&this.fx.shift()}burst(t,e){for(let n=0;n<9;n++){const s=new Zt(this.shared.sphere,this.materials.shot);s.scale.setScalar(.06+Math.random()*.07),s.position.set(t,this.ground(t,e)+1,e),this.scene.add(s),this.particles.push({mesh:s,start:this.elapsed,v:new xn((Math.random()-.5)*6,2+Math.random()*4,(Math.random()-.5)*6)})}for(;this.particles.length>90;)this.particles.shift().mesh.removeFromParent()}makeSplat(t){const e=[];for(let l=0;l<20;l++){const c=l/20*6.283,h=(l+1)/20*6.283,u=.4+l%3*.14,d=.4+(l+1)%3*.14;e.push(0,0,0,Math.cos(c)*u,Math.sin(c)*u,0,Math.cos(h)*d,Math.sin(h)*d,0)}const s=new we;s.setAttribute("position",new Gt(e,3));const r=this.materials.ink.clone();r.color.set(["#d2ed4d","#f5bf52","#c6ef78"][this.splats.length%3]);const o=new Zt(s,r),a=this.ground(t.x,t.z);if(t.wall){const l=new xn(t.x-t.dx*1.5,a+.9,t.z-t.dz*1.5),c=new xn(t.dx,0,t.dz);for(const u of this.obstacleMeshes)u.updateMatrixWorld();const h=new ml(l,c,0,5).intersectObjects(this.obstacleMeshes,!1)[0];if(h){const u=h.face.normal.clone().transformDirection(h.object.matrixWorld);o.position.copy(h.point).addScaledVector(u,.025),o.quaternion.setFromUnitVectors(new xn(0,0,1),u)}else o.position.set(t.x,a+.05,t.z),o.rotation.x=-Math.PI/2}else o.position.set(t.x,a+.045,t.z),o.rotation.x=-Math.PI/2;if(this.scene.add(o),this.splats.push({mesh:o,start:this.elapsed}),this.splats.length>90){const l=this.splats.shift();l.mesh.removeFromParent(),l.mesh.geometry.dispose(),l.mesh.material.dispose()}}clearEffects(){this.impactEffects?.clear();for(const t of this.particles)t.mesh.removeFromParent();this.particles=[];for(const t of this.splats)t.mesh.removeFromParent(),t.mesh.geometry.dispose(),t.mesh.material.dispose();this.splats=[];for(const t of this.bulletMeshes.values())t.removeFromParent();this.bulletMeshes.clear();for(const t of this.tongues.values())t.mesh.removeFromParent();this.tongues.clear(),this.fx=[],this.koTimes.clear()}updateHUD(){const t=this.state.actors[0],e=Math.round(t.ammo/Mt.capacity*100),n=Ic(this.state,t),s=Ds(this.state,t),r=this.state.bases.filter(T=>!T.destroyed).length,o=Hn.find(T=>T.owner===t.id)?.stock,a=s&&!s.destroyed&&o&&Math.hypot(t.x-o.x,t.z-o.z)<=Mt.pickupRange&&Cs(t,o),l=Da(t)&&t.revealedTime<=0,c=Ia(this.state,t),h=this.state.bases.find(T=>!T.destroyed&&T.attackerId===t.id),u=this.$("sabotage-button");u.hidden=!this.running||this.layoutEditing||this.state.phase!=="battle"||t.ko||t.catapultId||!c,u.disabled=t.dizzyTime>0||t.knockUp>0||t.hit>0||t.sabotageRecovery>0,u.querySelector("span").textContent=h?`${Math.max(0,Mt.sabotageSeconds-h.progress).toFixed(1)}″`:this.touch?"ΚΡΑΤΑ · 10″":"ΚΡΑΤΑ E · 10″",this.$("sabotage-status").hidden=!this.running||!h;const d=h?h.progress/Mt.sabotageSeconds:0;this.$("sabotage-copy").textContent="ΚΑΤΑΣΤΡΟΦΗ ΑΠΟΘΗΚΗΣ",this.$("sabotage-fill").style.transform=`scaleX(${d})`,this.$("sabotage-track").setAttribute("aria-valuenow",String(Math.round(d*100)));const f=this.state.catapults?.find(T=>T.id===t.catapultId),m=Gd(this.state,t),x=this.$("catapult-button");x.hidden=!this.running||t.ko||!f&&(!m||this.state.phase!=="battle"),x.disabled=t.dizzyTime>0||t.knockUp>0,x.querySelector("span").textContent=f?"ΕΞΟΔΟΣ":"ΧΡΗΣΗ",x.setAttribute("aria-label",f?"Έξοδος από τον καταπέλτη":"Χρήση κοντινού καταπέλτη"),x.classList.toggle("ready",!!f),this.$("catapult-status").hidden=!f||!this.running||this.layoutEditing,this.$("catapult-status").textContent=f?f.cooldown>0?`ΦΟΡΤΩΝΕΙ ΠΕΤΡΑ · ${f.cooldown.toFixed(1)}″`:this.touch?"ΣΗΜΑΔΕΨΕ · ΠΑΤΑ ΠΕΤΡΑ":"ΠΕΤΡΑ ΕΤΟΙΜΗ · ΑΡΙΣΤΕΡΟ ΚΛΙΚ":"",this.$("aim-stick").classList.toggle("catapult",!!f),this.ui.querySelector(".aim-zone .stick-caption").textContent=f?"ΚΑΤΕΥΘΥΝΣΗ · ΙΣΧΥΣ":"ΣΤΟΧΕΥΣΗ",this.ui.querySelector(".move-zone").classList.toggle("mounted",!!f),this.$("fire-button").disabled=!this.layoutEditing&&(t.ko||t.dizzyTime>0||t.knockUp>0),this.$("fire-button").querySelector("span").textContent=f?"ΠΕΤΡΑ":"ΠΥΡ",this.$("fire-button").classList.toggle("firing",this.actions.fire),this.$("fire-button").classList.toggle("empty",f?f.cooldown>0:t.ammo===0),this.$("ammo-count").textContent=`${t.ammo} / ${Mt.capacity}`,this.$("ammo-percent").textContent=e+"%",this.$("ammo-fill").style.transform=`scaleX(${e/100})`,this.$("ammo-track").setAttribute("aria-valuenow",String(e)),this.$("ammo-state").textContent=t.ko?"Επιστρέφεις στην αποθήκη":t.ammo===Mt.capacity?"ΓΕΜΑΤΟΣ!":a?"ΑΠΟΘΗΚΗ ∞ · ΓΕΜΙΖΕΙ…":t.tongue>0?"ΜΑΖΕΥΕΙ ΜΥΓΕΣ…":t.ammo===0?"Γύρνα στην αποθήκη ή βρες σμήνος":"Μύγες για τις επόμενες βολές",this.$("ko-count").textContent=`${r} / 3`;for(const T of this.$("base-dots").children){const A=this.state.bases.find(E=>E.owner===T.dataset.owner);T.classList.toggle("destroyed",!!A?.destroyed),T.classList.toggle("attacked",!!A?.attackerId),T.title=(T.dataset.owner==="player"?"Η αποθήκη σου":T.dataset.owner==="rival-1"?"Κόκκινη αποθήκη":"Μωβ αποθήκη")+(A?.destroyed?" · κατεστραμμένη":A?.attackerId?" · υπό επίθεση":" · άθικτη")}this.$("round-status").hidden=!this.running||!this.layoutEditing&&!t.ko&&this.state.phase==="battle",this.$("round-status").classList.toggle("warmup",this.state.phase!=="battle"),this.$("round-time").textContent=this.layoutEditing?"↔":t.ko?`${Math.ceil(t.respawnTime||0)}″`:this.state.phase!=="battle"?`${Math.ceil(this.state.intro)}″`:`${r}`,this.$("round-copy").textContent=this.layoutEditing?this.touch?"ΡΥΘΜΙΣΗ ΘΕΣΕΩΝ":"ΡΥΘΜΙΣΗ ΘΕΣΕΩΝ · Το παιχνίδι περιμένει":t.ko?this.touch?"ΕΠΙΣΤΡΟΦΗ":"ΕΠΙΣΤΡΟΦΗ ΣΤΗ ΒΑΣΗ":this.state.phase!=="battle"?this.touch?"ΠΡΟΕΤΟΙΜΑΣΙΑ":"ΠΡΟΕΤΟΙΜΑΣΙΑ · Προστάτεψε την αποθήκη σου":"";const g=!!s?.attackerId&&!s.destroyed,p=this.running&&!this.layoutEditing&&g;this.ui.classList.toggle("storage-threat",p),this.$("base-status").hidden=!this.running||this.layoutEditing||!g&&!l,this.$("base-status").classList.toggle("threat",g);const v=g?"ΕΠΙΘΕΣΗ ΣΤΗΝ ΑΠΟΘΗΚΗ ΣΟΥ":l?"ΚΡΥΜΜΕΝΟΣ ΣΤΑ ΔΕΝΤΡΑ":"";this.$("base-warning-title").textContent!==v&&(this.$("base-warning-title").textContent=v),this.$("base-warning-detail").textContent=g?`${Math.max(0,Mt.sabotageSeconds-s.progress).toFixed(1)}″ μέχρι καταστροφή · Χτύπησέ τον!`:l?"Πιο αργά άλματα":"";const y=!t.ko&&!!n&&this.state.phase==="battle"&&!t.catapultId&&t.dizzyTime<=0&&t.knockUp<=0&&t.kick<=0&&(t.kickCooldown||0)<=0;this.$("kick-button").hidden=!this.running||t.ko||this.state.phase!=="battle"||!!t.catapultId||!n&&t.kick<=0,this.$("kick-button").disabled=!y,this.$("kick-button").classList.toggle("ready",y),this.$("pc-kick").classList.toggle("ready",y),this.$("dizzy-banner").hidden=t.dizzyTime<=0,this.$("dizzy-time").textContent=t.dizzyTime.toFixed(1)+"″",this.$("aim-stick").classList.toggle("empty",f?f.cooldown>0:t.ammo===0),this.calloutUntil<this.elapsed&&(this.$("callout").textContent="");const _=["round-status","base-status","catapult-button","catapult-status","kick-button","sabotage-button","sabotage-status"].map(T=>this.$(T).hidden?0:1).join("");this.touch&&!this.layoutEditing&&this.running&&_!==this.contextLayout&&(this.contextLayout=_,this.touchLayout?.refresh())}renderActors(t){this.state.actors.forEach((a,l)=>{const c=this.models[l];if(c.group.visible=!a.eliminated,a.eliminated)return;const h=this.ground(a.x,a.z);let u=a.x,d=a.z,f=h+a.height+(a.catapultId?.45:0);const m=this.koTimes.get(a.id),x=m?this.elapsed-m.time:99;x<.65&&(u+=m.dx*x*5,d+=m.dz*x*5,f+=Math.sin(x/.65*Math.PI)*2.5),c.group.position.set(u,f,d);const g=a.aiming||a.shot>.02||a.kick>0,p=g?Math.atan2(a.aimX,a.aimZ):a.face;let v=Math.atan2(Math.sin(p-c.group.rotation.y),Math.cos(p-c.group.rotation.y));c.group.rotation.y+=v*(1-Math.exp(-t*22)),c.update(t,{time:this.elapsed,speed:Math.hypot(a.hopX,a.hopZ),building:!!a.sabotageId,hop:a.knockUp>0?{phase:"air",progress:1-a.knockUp/a.knockUpDuration}:a.hop>0?{phase:"air",progress:1-a.hop/Mt.hopDuration}:a.idle>0?{phase:"land",progress:1-a.idle/Mt.landingDuration}:{phase:"idle",progress:0},dead:a.ko,attack:a.kick>0?{type:"kick",phase:1-a.kick/(Mt.kickDuration||.48)}:a.tongue>0||a.shot>0?{type:"tongue",phase:a.tongue>0?1-a.tongue/.22:1-a.shot/Mt.shotInterval}:null});const y=a.load,_=a.shot>0?Math.sin((1-a.shot/Mt.shotInterval)*Math.PI):0;if(ey(c,{load:y,spit:_}),a.hop>0){const T=Math.atan2(a.hopX,a.hopZ)-c.group.rotation.y,A=Math.min(1,Math.hypot(a.hopX,a.hopZ)/8.8)*Math.sin((1-a.hop/Mt.hopDuration)*Math.PI);c.bones.spine.rotation.z-=Math.sin(T)*A*.1;for(const E of[-1,1])c.bones[`hip${E}`].rotation.z-=Math.sin(T)*A*.14}if(a.dizzyTime>0?(c.group.rotation.z=Math.sin(this.elapsed*7)*.17,c.bones.head.rotation.z+=Math.sin(this.elapsed*9)*.2):c.group.rotation.z=x<.65?x*6:0,c.group.rotation.x=0,a.knockUp>0){const T=1-a.knockUp/a.knockUpDuration,A=Math.sin(T*Math.PI)*.38,E=Math.atan2(a.impulseX,a.impulseZ)-c.group.rotation.y;c.group.rotation.x=Math.cos(E)*A,c.group.rotation.z-=Math.sin(E)*A}});const e=this.state.actors[0];this.playerRing.position.set(e.x,this.ground(e.x,e.z)+.07,e.z),this.playerRing.scale.setScalar(1);const n=k1(this.state,e,Math.min(Mt.projectileSpeed*Mt.projectileLifetime,this.aim.distance||14)),s=this.aimGuide.geometry.attributes.position;s.setXYZ(0,e.x+e.aimX*1.3,this.ground(e.x,e.z)+.18,e.z+e.aimZ*1.3),s.setXYZ(1,n.x,this.ground(n.x,n.z)+.18,n.z),s.needsUpdate=!0,this.aimGuide.computeLineDistances();const r=this.running&&!this.layoutEditing&&!e.catapultId&&!e.ko&&e.dizzyTime<=0&&(e.aiming||e.shot>0);this.currentAimPreview=r?n:null,this.aimGuide.visible=r,this.aimGuide.material.color.set(n.targetId?"#ffc09b":n.blocked?"#b9c0b5":"#f4f7d5"),this.aimReticle.visible=r,this.aimReticle.position.set(n.x,this.ground(n.x,n.z)+.12,n.z),this.aimReticle.material.color.copy(this.aimGuide.material.color);const o=this.state.actors.find(a=>a.id===n.targetId);this.targetRing.visible=r&&!!o,o&&(this.targetRing.position.set(o.x,this.ground(o.x,o.z)+.1,o.z),this.targetRing.scale.setScalar(1+o.load*.2))}renderFlies(){this.state.flies.forEach((e,n)=>{const s=this.dummy,r=e.wait<=0,o=this.ground(e.x,e.z)+1.05+Math.sin(this.elapsed*5+e.phase)*.12,a=e.x+Math.sin(this.elapsed*3+e.phase)*.12;s.position.set(a,r?o:-100,e.z),s.scale.set(r?.105:0,r?.08:0,r?.14:0),s.rotation.set(0,e.phase,0),s.updateMatrix(),this.flyBodies.setMatrixAt(n,s.matrix);for(let l=0;l<2;l++)s.position.set(a+(l===0?-.1:.1),r?o+.045:-100,e.z),s.scale.set(r?.17:0,r?.015:0,r?.08:0),s.rotation.set(0,e.phase,Math.sin(this.elapsed*55+e.phase)*(l===0?1:-1)*.5),s.updateMatrix(),this.flyWings.setMatrixAt(n*2+l,s.matrix)}),this.flyBodies.instanceMatrix.needsUpdate=!0,this.flyWings.instanceMatrix.needsUpdate=!0,Sr.forEach((e,n)=>{const s=this.state.flies.filter(o=>o.swarmId===e.id&&o.wait<=0).length,r=this.swarmRings[n];r.material.opacity=s?.2:.09,r.material.color.set(s?"#c8e0a3":"#6f8c83")});const t=new Set;for(const e of this.state.bullets){t.add(e.id);let n=this.bulletMeshes.get(e.id);if(!n){n=this.makeFlyBullet(),this.bulletMeshes.set(e.id,n);const r=this.state.actors.findIndex(o=>o.id===e.owner);n.userData.mouth=this.models[r].mouthWorld().clone()}n.position.set(e.x,this.ground(e.x,e.z)+.9,e.z);const s=(Mt.projectileLifetime||1.6)-e.life;s<.09&&n.position.lerp(n.userData.mouth,1-s/.09),n.rotation.y=Math.atan2(e.dx,e.dz),n.children[1].rotation.z=Math.sin(this.elapsed*75),n.children[2].rotation.z=-Math.sin(this.elapsed*75)}for(const[e,n]of this.bulletMeshes)t.has(e)||(n.removeFromParent(),this.bulletMeshes.delete(e));for(const[e,n]of this.tongues){const s=(this.elapsed-n.start)/.22;if(s>=1){n.mesh.removeFromParent(),this.tongues.delete(e);continue}const r=this.state.actors.findIndex(u=>u.id===e),o=this.models[r],a=o.mouthWorld(),l=new xn(n.x,this.ground(n.x,n.z)+1,n.z),c=Math.sin(s*Math.PI);l.lerpVectors(a,l,c);const h=l.clone().sub(a);n.mesh.position.copy(a).addScaledVector(h,.5),n.mesh.quaternion.setFromUnitVectors(Ul,h.clone().normalize()),n.mesh.scale.set(.07,Math.max(.001,h.length()),.07)}}project(t,e,n){const s=new xn(t,e,n).project(this.camera);return{x:(s.x+1)*this.w/2,y:(1-s.y)*this.h/2,visible:s.z>-1&&s.z<1}}drawLabels(){const t=this.labelCtx;if(t.clearRect(0,0,this.w,this.h),t.textAlign="center",t.lineJoin="round",t.font="800 18px sans-serif",this.running&&(N1(this,t),U1(this,this.$("minimap"))),this.currentAimPreview){const e=this.currentAimPreview,n=this.project(e.x,this.ground(e.x,e.z)+.9,e.z);if(n.visible&&n.x>12&&n.x<this.w-12&&n.y>90&&n.y<this.h-30){t.save(),t.lineWidth=4,t.strokeStyle="#173c35",t.beginPath(),t.arc(n.x,n.y,7,0,Math.PI*2),t.stroke(),t.lineWidth=2,t.strokeStyle=e.targetId?"#ffc5a0":"#f4ffdd",t.beginPath(),t.arc(n.x,n.y,7,0,Math.PI*2);for(const[s,r]of[[1,0],[-1,0],[0,1],[0,-1]])t.moveTo(n.x+s*10,n.y+r*10),t.lineTo(n.x+s*16,n.y+r*16);t.stroke(),t.restore()}}if(this.hitConfirmUntil>this.elapsed&&this.lastPlayerHit){const e=this.lastPlayerHit,n=this.state.actors.find(r=>r.id===e.id),s=this.project(e.x,this.ground(e.x,e.z)+(n?.height||0)+1.2,e.z);if(s.visible){t.save(),t.strokeStyle="#143d35",t.lineWidth=6,t.beginPath();for(const[r,o]of[[1,1],[-1,1],[1,-1],[-1,-1]])t.moveTo(s.x+r*6,s.y+o*6),t.lineTo(s.x+r*15,s.y+o*15);t.stroke(),t.strokeStyle="#fffce2",t.lineWidth=3,t.stroke(),t.restore()}}if(this.state.actors.forEach((e,n)=>{if(e.eliminated)return;const s=this.project(e.x,this.ground(e.x,e.z)+e.height+2.4,e.z);if(!s.visible)return;if(!(s.x>20&&s.x<this.w-20&&s.y>70&&s.y<this.h-40)&&n>0&&!e.ko&&this.running){const o=Nl(s.x,24,this.w-24),a=Nl(s.y,110,this.h-(this.touch?210:90));t.font="bold 24px sans-serif",t.fillStyle=n===1?"#ffbb8e":"#dfb5ff",t.fillText("▼",o,a);return}if(e.ko){t.font="900 20px sans-serif",t.strokeStyle="#1e2e28",t.lineWidth=5;const o=`KO · ${Math.ceil(e.respawnTime||0)}″`;t.strokeText(o,s.x,s.y),t.fillStyle="#ffe374",t.fillText(o,s.x,s.y);return}if(e.dizzyTime>0){for(let o=0;o<3;o++){const a=this.elapsed*4+o*2.094;t.font="bold 25px sans-serif",t.fillStyle="#ffdf57",t.strokeStyle="#725c21",t.lineWidth=3;const l=s.x+Math.cos(a)*27,c=s.y+Math.sin(a)*7;t.strokeText("★",l,c),t.fillText("★",l,c)}t.font="bold 15px sans-serif",t.fillStyle="#fff4ad",t.fillText(e.dizzyTime.toFixed(1)+"″",s.x,s.y+24);for(let o=0;o<Mt.finishHits;o++)t.beginPath(),t.arc(s.x+(o-(Mt.finishHits-1)/2)*11,s.y+36,4,0,Math.PI*2),t.fillStyle=o<e.finishHits?"#ffb58e":"#244438",t.fill(),t.strokeStyle="#ffe6ac",t.lineWidth=1.5,t.stroke()}else if(n>0){e.aimWindup>0&&(t.font="900 22px sans-serif",t.fillStyle="#ffddaa",t.fillText("!",s.x,s.y-40));const o=n===1?"ΚΟΚΚΙΝΟΣ":"ΜΩΒ",a=n===1?"#ff886a":"#dba1ff";t.fillStyle="#112b27dd",t.strokeStyle=a,t.lineWidth=3,t.beginPath(),t.roundRect?t.roundRect(s.x-52,s.y-28,104,24,10):t.rect(s.x-52,s.y-28,104,24),t.fill(),t.stroke(),t.font="bold 15px sans-serif",t.fillStyle=a,t.fillText(o,s.x,s.y-11);for(let l=0;l<6;l++)t.beginPath(),t.arc(s.x+(l-2.5)*9,s.y+6,3.8,0,Math.PI*2),t.fillStyle=l<e.dizzy?"#ffe16a":"#214036bb",t.fill()}}),this.running){const e=this.state.actors[0];for(const n of this.state.bases){const s=Hn.find(l=>l.id===n.id),r=Math.hypot(e.x-s.stock.x,e.z-s.stock.z)<10;if(n.destroyed||!r&&!n.attackerId)continue;const o=this.project(s.stock.x,this.ground(s.stock.x,s.stock.z)+3.5,s.stock.z);if(!o.visible||o.x<70||o.x>this.w-70||o.y<95||o.y>this.h-(this.touch?220:85))continue;const a=n.attackerId?`ΚΑΤΑΣΤΡΟΦΗ · ${Math.max(0,Mt.sabotageSeconds-n.progress).toFixed(1)}″`:n.owner==="player"?"Η ΑΠΟΘΗΚΗ ΣΟΥ · ∞":"ΕΧΘΡΙΚΗ ΑΠΟΘΗΚΗ";t.font="800 12px sans-serif",t.strokeStyle="#14342df2",t.lineWidth=5,t.strokeText(a,o.x,o.y),t.fillStyle=n.attackerId?"#ffd197":n.owner==="player"?"#dbff9d":"#ffbdad",t.fillText(a,o.x,o.y)}}this.fx=this.fx.filter(e=>this.elapsed-e.start<e.life);for(const e of this.fx){const n=(this.elapsed-e.start)/e.life,s=this.project(e.x,this.ground(e.x,e.z)+2+n*2,e.z);t.globalAlpha=1-n,t.font=`900 ${e.text==="ΝΟΚ ΑΟΥΤ!"?32:22}px sans-serif`,t.strokeStyle="#244136",t.lineWidth=6,t.strokeText(e.text,s.x,s.y),t.fillStyle=e.color,t.fillText(e.text,s.x,s.y)}t.globalAlpha=1}frame(t){const e=Math.min(.05,Math.max(0,(t-this.last)/1e3));if(this.last=t,this.running&&!this.layoutEditing){for(this.elapsed+=e,this.accumulator+=e;this.accumulator>=1/60;)if(Xu(this.state,this.currentInput(),1/60),this.consumeEvents(),this.accumulator-=1/60,this.state.status!=="playing"){this.finish();break}this.saveClock+=e,this.saveClock>3&&(this.saveClock=0,this.persist())}else(this.mode==="result"||this.mode==="finishing")&&(this.elapsed+=e);this.mode==="finishing"&&this.elapsed>=this.resultAt&&this.showResult();const n=this.state.actors[0],s=qd(n,this.ground(n.x,n.z),this.w/this.h,this.viewMode,{yaw:this.cameraYaw,pitch:this.cameraPitch,zoom:this.settings.cameraZoom}),r=new xn(...s.look),o=new xn(...s.position);this.cameraReady?(this.focus.lerp(r,1-Math.exp(-e*8)),this.cameraTarget.lerp(o,1-Math.exp(-e*8))):(this.focus.copy(r),this.cameraTarget.copy(o),this.cameraReady=!0),this.shake*=Math.exp(-e*15);const a=this.running?this.shake:0;if(this.camera.position.copy(this.cameraTarget),this.camera.position.x+=(Math.random()-.5)*a,this.camera.lookAt(this.focus),this.camera.updateMatrixWorld(),this.running||this.mode==="title"||this.mode==="result"||this.mode==="finishing"){const l=this.mode==="title"||this.layoutEditing?0:e;this.renderActors(l),this.renderFlies(),this.updateCatapultAim?.(),this.artilleryView.update(l),this.basesView.update(l),this.impactEffects.update(l),this.world.update(this.running&&!this.layoutEditing?e:0,this.elapsed,1,new xn(n.x,this.ground(n.x,n.z),n.z))}(this.running&&!this.layoutEditing||this.mode==="finishing"||this.mode==="result")&&(this.particles=this.particles.filter(l=>this.elapsed-l.start>.55?(l.mesh.removeFromParent(),!1):(l.v.y-=e*16,l.mesh.position.addScaledVector(l.v,e),!0))),this.renderer.render(this.scene,this.camera),this.drawLabels(),this.updateHUD()}inspect(){return{version:Pl,viewMode:this.viewMode,cameraYaw:this.cameraYaw,cameraPitch:this.cameraPitch,cameraDragging:!!this.cameraDrag,phase:this.state.phase,intro:this.state.intro,mode:this.mode,status:this.state.status,ammo:this.state.actors[0].ammo,fillPercent:Math.round(this.state.actors[0].ammo/Mt.capacity*100),actors:this.state.actors.map(t=>({id:t.id,x:t.x,z:t.z,ammo:t.ammo,dizzy:t.dizzy,dizzyTime:t.dizzyTime,ko:t.ko,eliminated:t.eliminated,respawnTime:t.respawnTime,sabotageId:t.sabotageId,aiming:t.aiming,face:t.face,hop:t.hop,hopX:t.hopX,hopZ:t.hopZ,height:t.height,knockUp:t.knockUp,finishHits:t.finishHits,kickCooldown:t.kickCooldown,catapultId:t.catapultId})),bases:this.state.bases.map(t=>({...t})),layoutEditing:this.layoutEditing,touch:this.touch,catapults:this.state.catapults?.map(t=>({id:t.id,occupant:t.occupant,cooldown:t.cooldown})),shells:this.state.shells?.length,hitConfirmUntil:this.hitConfirmUntil,bullets:this.state.bullets.length,splats:this.splats.length,legacySavePreserved:!0}}}function uy(i){const t={fire:!1,kick:!1},e=r=>{i.running&&!i.layoutEditing&&!i.cameraDrag&&(t[r]=!0)},n=i.currentInput.bind(i),s=i.clearInputs.bind(i);i.currentInput=()=>{const r=n();for(const o of Object.keys(t))!i.layoutEditing&&!i.cameraDrag&&(r[o]||=t[o]),t[o]=!1;return!i.layoutEditing&&!i.cameraDrag&&(r.aiming||=r.fire),r},i.clearInputs=()=>{for(const r of Object.keys(t))t[r]=!1;s()},addEventListener("keydown",r=>{r.repeat||r.target.matches("input,select")||r.code==="KeyQ"&&e("kick")},!0),addEventListener("pointerdown",r=>{r.target.closest?.("#kick-button")&&!i.$("kick-button").disabled?e("kick"):(r.target===i.renderer.domElement&&r.pointerType!=="touch"&&r.button===0||r.target.closest?.("#fire-button")&&!i.$("fire-button").disabled)&&e("fire")},!0),addEventListener("pointercancel",()=>{for(const r of Object.keys(t))t[r]=!1},!0)}function dy(i,t=()=>performance.now()){const e=i.$("view-button");let n=-1/0;e.onpointerdown=s=>{s.pointerType!=="touch"||!i.running||(s.preventDefault(),n=t(),i.toggleView())},e.onclick=s=>{i.running&&(s.detail===0||t()-n>600)&&i.toggleView()}}function fy(i){i.catapultAim={active:!1,target:null};let t=!1,e=!1;const n=()=>!!i.state.actors[0].catapultId;i.updateCatapultAim=()=>{if(!n()){i.catapultAim={active:!1,target:null};return}const l=i.state.actors[0];if(!i.touch&&i.mouse.valid&&i.mouse.target){const u=i.mouse.target.x-l.x,d=i.mouse.target.z-l.z,f=Math.hypot(u,d);f>.01&&(i.aim={x:u/f,z:d/f,distance:f})}const c=i.aim||{x:l.aimX,z:l.aimZ},h=i.touch?Math.max(0,Math.min(1,(i.aimStrength-.08)/.92)):Math.max(0,Math.min(1,((c.distance||17)-Ie.minRange)/(Ie.maxRange-Ie.minRange)));i.catapultAim={active:!0,target:p1(l,c.x,c.z,h)}};const s=i.currentInput.bind(i),r=i.clearInputs.bind(i);i.currentInput=()=>{const l=s();if(i.layoutEditing)return t=!1,e=!1,{};const c=l.fire&&!e;return e=!!l.fire,n()&&(i.updateCatapultAim(),l.fire=!1,l.aiming=!0,l.ax=i.aim.x,l.az=i.aim.z,l.sabotage=!1,c&&i.catapultAim.target?.valid!==!1&&(l.throwStone={...i.catapultAim.target})),t&&(l.interactCatapult=!0,t=!1),l},i.clearInputs=()=>{t=!1,e=!1,i.catapultAim={active:!1,target:null},r()};const o=i.$("catapult-button");o.onpointerdown=l=>{!i.running||i.layoutEditing||o.disabled||!n()&&i.state.phase!=="battle"||(l.preventDefault(),t=!0)},o.onclick=l=>{l.detail===0&&i.running&&!i.layoutEditing&&!o.disabled&&(t=!0)},addEventListener("keydown",l=>{l.code!=="KeyE"||l.repeat||l.target.matches("input,select")||!i.running||i.layoutEditing||!n()&&i.state.phase!=="battle"||!n()&&Ia(i.state,i.state.actors[0])||(l.preventDefault(),t=!0)});const a=i.$("aim-stick");a.addEventListener("pointerdown",()=>{n()&&i.updateCatapultAim()}),a.addEventListener("pointermove",()=>{n()&&i.pointers.has("aim")&&i.updateCatapultAim()})}const py='input,select,textarea,[contenteditable]:not([contenteditable="false"])',my=new Set(["+","=","-","_","0"]),gy=new Set(["Equal","Minus","Digit0","NumpadAdd","NumpadSubtract","Numpad0"]);function xy({document:i=globalThis.document,surfaces:t,enabled:e=()=>!0}={}){const n=t??[...i.querySelectorAll("#arcade-world,#arcade-labels,#arcade-ui")],s=[],r=new Set;let o=!1;const a=p=>(p?.nodeType===3?p.parentElement:p)?.closest?.(py),l=p=>!!p?.nodeType&&!a(p)&&n.some(v=>v&&(v===p||v.contains?.(p))),c=p=>{const v=p.composedPath?.()||[];return v.length?v:[p.target]},h=p=>{const v=c(p);return!v.some(a)&&v.some(l)},u=p=>{p.cancelable&&p.preventDefault()},d=(p,v,y=!1)=>{const _={capture:!0,passive:y};i.addEventListener(p,v,_),s.push([p,v,_])},f=()=>{r.clear(),o=!1},m=()=>e()?!0:(f(),!1),x=p=>r.size>0||h(p)||Array.from(p.touches||[]).some(v=>l(v.target));d("touchstart",p=>{if(m()){for(const v of p.changedTouches||[])l(v.target)&&r.add(v.identifier);p.touches?.length>1&&x(p)&&u(p)}}),d("touchmove",p=>{m()&&x(p)&&u(p)});const g=p=>{for(const v of p.changedTouches||[])r.delete(v.identifier);p.touches?.length||r.clear()};d("touchend",g,!0),d("touchcancel",g,!0);for(const p of["gesturestart","gesturechange","gestureend"])d(p,v=>{m()&&(p==="gesturestart"&&(o=x(v)),(o||x(v))&&u(v),p==="gestureend"&&(o=!1))});for(const p of["wheel","dblclick","selectstart","contextmenu","dragstart"])d(p,v=>{m()&&h(v)&&u(v)});return d("keydown",p=>{if(!m()||!(p.ctrlKey||p.metaKey)||p.altKey||!my.has(p.key)&&!gy.has(p.code)||c(p).some(a))return;const v=[i,i.body,i.documentElement].includes(p.target);(h(p)||n.length&&v)&&u(p)}),d("visibilitychange",()=>{i.hidden&&f()},!0),()=>{for(const[p,v,y]of s)i.removeEventListener(p,v,y);s.length=0,f()}}function uh(i){console.error(i);let t=document.getElementById("boot");if(!t){t=document.createElement("div"),t.id="boot";const n=document.createElement("div");n.id="boot-error",t.append(n),document.body.append(t)}t.classList.add("has-error");const e=document.getElementById("boot-error");e.textContent=`Δεν μπόρεσε να ξεκινήσει ο 3D κόσμος. Ενεργοποίησε την επιτάχυνση γραφικών στον browser και κάνε ανανέωση.
`+(i?.message||String(i))}addEventListener("error",i=>uh(i.error||i.message));addEventListener("unhandledrejection",i=>uh(i.reason));requestAnimationFrame(()=>{try{const i=window.frogArcade=new hy;uy(i),dy(i),fy(i),xy({surfaces:[i.renderer.domElement,i.labels,i.ui]})}catch(i){uh(i)}});
