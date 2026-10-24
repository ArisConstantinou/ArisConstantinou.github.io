(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const rl="180",Qh=0,Cl=1,tu=2,rh=1,ah=2,Wn=3,jn=0,Ye=1,Le=2,li=0,os=1,Rl=2,Pl=3,Dl=4,eu=5,wi=100,nu=101,iu=102,su=103,ru=104,au=200,ou=201,lu=202,cu=203,lo=204,co=205,hu=206,uu=207,du=208,fu=209,pu=210,mu=211,gu=212,vu=213,xu=214,ho=0,uo=1,fo=2,hs=3,po=4,mo=5,go=6,vo=7,oh=0,_u=1,yu=2,ci=0,Mu=1,bu=2,Su=3,lh=4,wu=5,Eu=6,Tu=7,Ll="attached",Au="detached",ch=300,us=301,ds=302,xo=303,_o=304,Qr=306,fs=1e3,Ti=1001,yo=1002,cn=1003,Cu=1004,lr=1005,Tn=1006,ua=1007,oi=1008,Nn=1009,hh=1010,uh=1011,$s=1012,al=1013,Ri=1014,An=1015,tr=1016,ol=1017,ll=1018,qs=1020,dh=35902,fh=35899,ph=1021,mh=1022,ln=1023,Ys=1026,js=1027,cl=1028,hl=1029,gh=1030,ul=1031,dl=1033,Hr=33776,Vr=33777,Gr=33778,Wr=33779,Mo=35840,bo=35841,So=35842,wo=35843,Eo=36196,To=37492,Ao=37496,Co=37808,Ro=37809,Po=37810,Do=37811,Lo=37812,Io=37813,Uo=37814,No=37815,Fo=37816,zo=37817,Oo=37818,Bo=37819,ko=37820,Ho=37821,Vo=36492,Go=36494,Wo=36495,Xo=36283,$o=36284,qo=36285,Yo=36286,Ru=3200,Pu=3201,vh=0,Du=1,qn="",Qe="srgb",ps="srgb-linear",qr="linear",xe="srgb",Ni=7680,Il=519,Lu=512,Iu=513,Uu=514,xh=515,Nu=516,Fu=517,zu=518,Ou=519,jo=35044,Mi=35048,Ul="300 es",In=2e3,Yr=2001;class vs{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const i=n[t];if(i!==void 0){const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,t);t.target=null}}}const $e=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Nl=1234567;const Hs=Math.PI/180,Ks=180/Math.PI;function Un(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return($e[s&255]+$e[s>>8&255]+$e[s>>16&255]+$e[s>>24&255]+"-"+$e[t&255]+$e[t>>8&255]+"-"+$e[t>>16&15|64]+$e[t>>24&255]+"-"+$e[e&63|128]+$e[e>>8&255]+"-"+$e[e>>16&255]+$e[e>>24&255]+$e[n&255]+$e[n>>8&255]+$e[n>>16&255]+$e[n>>24&255]).toLowerCase()}function ie(s,t,e){return Math.max(t,Math.min(e,s))}function fl(s,t){return(s%t+t)%t}function Bu(s,t,e,n,i){return n+(s-t)*(i-n)/(e-t)}function ku(s,t,e){return s!==t?(e-s)/(t-s):0}function Vs(s,t,e){return(1-e)*s+e*t}function Hu(s,t,e,n){return Vs(s,t,1-Math.exp(-e*n))}function Vu(s,t=1){return t-Math.abs(fl(s,t*2)-t)}function Gu(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*(3-2*s))}function Wu(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*s*(s*(s*6-15)+10))}function Xu(s,t){return s+Math.floor(Math.random()*(t-s+1))}function $u(s,t){return s+Math.random()*(t-s)}function qu(s){return s*(.5-Math.random())}function Yu(s){s!==void 0&&(Nl=s);let t=Nl+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function ju(s){return s*Hs}function Ku(s){return s*Ks}function Zu(s){return(s&s-1)===0&&s!==0}function Ju(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Qu(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function td(s,t,e,n,i){const r=Math.cos,a=Math.sin,o=r(e/2),l=a(e/2),c=r((t+n)/2),h=a((t+n)/2),u=r((t-n)/2),d=a((t-n)/2),p=r((n-t)/2),m=a((n-t)/2);switch(i){case"XYX":s.set(o*h,l*u,l*d,o*c);break;case"YZY":s.set(l*d,o*h,l*u,o*c);break;case"ZXZ":s.set(l*u,l*d,o*h,o*c);break;case"XZX":s.set(o*h,l*m,l*p,o*c);break;case"YXY":s.set(l*p,o*h,l*m,o*c);break;case"ZYZ":s.set(l*m,l*p,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function En(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function me(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const Xn={DEG2RAD:Hs,RAD2DEG:Ks,generateUUID:Un,clamp:ie,euclideanModulo:fl,mapLinear:Bu,inverseLerp:ku,lerp:Vs,damp:Hu,pingpong:Vu,smoothstep:Gu,smootherstep:Wu,randInt:Xu,randFloat:$u,randFloatSpread:qu,seededRandom:Yu,degToRad:ju,radToDeg:Ku,isPowerOfTwo:Zu,ceilPowerOfTwo:Ju,floorPowerOfTwo:Qu,setQuaternionFromProperEuler:td,normalize:me,denormalize:En};class Ot{constructor(t=0,e=0){Ot.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=ie(this.x,t.x,e.x),this.y=ie(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=ie(this.x,t,e),this.y=ie(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ie(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(ie(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*i+t.x,this.y=r*i+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class er{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3];const d=r[a+0],p=r[a+1],m=r[a+2],v=r[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(o===1){t[e+0]=d,t[e+1]=p,t[e+2]=m,t[e+3]=v;return}if(u!==v||l!==d||c!==p||h!==m){let g=1-o;const f=l*d+c*p+h*m+u*v,y=f>=0?1:-1,w=1-f*f;if(w>Number.EPSILON){const T=Math.sqrt(w),R=Math.atan2(T,f*y);g=Math.sin(g*R)/T,o=Math.sin(o*R)/T}const _=o*y;if(l=l*g+d*_,c=c*g+p*_,h=h*g+m*_,u=u*g+v*_,g===1-o){const T=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=T,c*=T,h*=T,u*=T}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,r,a){const o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=r[a],d=r[a+1],p=r[a+2],m=r[a+3];return t[e]=o*m+h*u+l*p-c*d,t[e+1]=l*m+h*d+c*u-o*p,t[e+2]=c*m+h*p+o*d-l*u,t[e+3]=h*m-o*u-l*d-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),u=o(r/2),d=l(n/2),p=l(i/2),m=l(r/2);switch(a){case"XYZ":this._x=d*h*u+c*p*m,this._y=c*p*u-d*h*m,this._z=c*h*m+d*p*u,this._w=c*h*u-d*p*m;break;case"YXZ":this._x=d*h*u+c*p*m,this._y=c*p*u-d*h*m,this._z=c*h*m-d*p*u,this._w=c*h*u+d*p*m;break;case"ZXY":this._x=d*h*u-c*p*m,this._y=c*p*u+d*h*m,this._z=c*h*m+d*p*u,this._w=c*h*u-d*p*m;break;case"ZYX":this._x=d*h*u-c*p*m,this._y=c*p*u+d*h*m,this._z=c*h*m-d*p*u,this._w=c*h*u+d*p*m;break;case"YZX":this._x=d*h*u+c*p*m,this._y=c*p*u+d*h*m,this._z=c*h*m-d*p*u,this._w=c*h*u-d*p*m;break;case"XZY":this._x=d*h*u-c*p*m,this._y=c*p*u-d*h*m,this._z=c*h*m+d*p*u,this._w=c*h*u+d*p*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=n+o+u;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(h-l)*p,this._y=(r-c)*p,this._z=(a-i)*p}else if(n>o&&n>u){const p=2*Math.sqrt(1+n-o-u);this._w=(h-l)/p,this._x=.25*p,this._y=(i+a)/p,this._z=(r+c)/p}else if(o>u){const p=2*Math.sqrt(1+o-n-u);this._w=(r-c)/p,this._x=(i+a)/p,this._y=.25*p,this._z=(l+h)/p}else{const p=2*Math.sqrt(1+u-n-o);this._w=(a-i)/p,this._x=(r+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ie(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+i*c-r*l,this._y=i*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,r=this._z,a=this._w;let o=a*t._w+n*t._x+i*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=i,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const p=1-e;return this._w=p*a+e*this._w,this._x=p*n+e*this._x,this._y=p*i+e*this._y,this._z=p*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-e)*h)/c,d=Math.sin(e*h)/c;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class D{constructor(t=0,e=0,n=0){D.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Fl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Fl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*i-o*n),h=2*(o*e-r*i),u=2*(r*n-a*e);return this.x=e+l*c+a*u-o*h,this.y=n+l*h+o*c-r*u,this.z=i+l*u+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=ie(this.x,t.x,e.x),this.y=ie(this.y,t.y,e.y),this.z=ie(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=ie(this.x,t,e),this.y=ie(this.y,t,e),this.z=ie(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ie(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=i*l-r*o,this.y=r*a-n*l,this.z=n*o-i*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return da.copy(this).projectOnVector(t),this.sub(da)}reflect(t){return this.sub(da.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(ie(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const da=new D,Fl=new er;class Jt{constructor(t,e,n,i,r,a,o,l,c){Jt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,l,c)}set(t,e,n,i,r,a,o,l,c){const h=this.elements;return h[0]=t,h[1]=i,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],p=n[5],m=n[8],v=i[0],g=i[3],f=i[6],y=i[1],w=i[4],_=i[7],T=i[2],R=i[5],C=i[8];return r[0]=a*v+o*y+l*T,r[3]=a*g+o*w+l*R,r[6]=a*f+o*_+l*C,r[1]=c*v+h*y+u*T,r[4]=c*g+h*w+u*R,r[7]=c*f+h*_+u*C,r[2]=d*v+p*y+m*T,r[5]=d*g+p*w+m*R,r[8]=d*f+p*_+m*C,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+i*r*c-i*a*l}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=h*a-o*c,d=o*l-h*r,p=c*r-a*l,m=e*u+n*d+i*p;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/m;return t[0]=u*v,t[1]=(i*c-h*n)*v,t[2]=(o*n-i*a)*v,t[3]=d*v,t[4]=(h*e-i*l)*v,t[5]=(i*r-o*e)*v,t[6]=p*v,t[7]=(n*l-c*e)*v,t[8]=(a*e-n*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-i*c,i*l,-i*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(fa.makeScale(t,e)),this}rotate(t){return this.premultiply(fa.makeRotation(-t)),this}translate(t,e){return this.premultiply(fa.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const fa=new Jt;function _h(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function jr(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function ed(){const s=jr("canvas");return s.style.display="block",s}const zl={};function Zs(s){s in zl||(zl[s]=!0,console.warn(s))}function nd(s,t,e){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const Ol=new Jt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Bl=new Jt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function id(){const s={enabled:!0,workingColorSpace:ps,spaces:{},convert:function(i,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===xe&&(i.r=Yn(i.r),i.g=Yn(i.g),i.b=Yn(i.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===xe&&(i.r=ls(i.r),i.g=ls(i.g),i.b=ls(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===qn?qr:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,a){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,r){return Zs("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(i,r)},toWorkingColorSpace:function(i,r){return Zs("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(i,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[ps]:{primaries:t,whitePoint:n,transfer:qr,toXYZ:Ol,fromXYZ:Bl,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Qe},outputColorSpaceConfig:{drawingBufferColorSpace:Qe}},[Qe]:{primaries:t,whitePoint:n,transfer:xe,toXYZ:Ol,fromXYZ:Bl,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Qe}}}),s}const de=id();function Yn(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function ls(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let Fi;class sd{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Fi===void 0&&(Fi=jr("canvas")),Fi.width=t.width,Fi.height=t.height;const i=Fi.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),n=Fi}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=jr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=Yn(r[a]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Yn(e[n]/255)*255):e[n]=Yn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let rd=0;class pl{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:rd++}),this.uuid=Un(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(pa(i[a].image)):r.push(pa(i[a]))}else r=pa(i);n.url=r}return e||(t.images[this.uuid]=n),n}}function pa(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?sd.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let ad=0;const ma=new D;class je extends vs{constructor(t=je.DEFAULT_IMAGE,e=je.DEFAULT_MAPPING,n=Ti,i=Ti,r=Tn,a=oi,o=ln,l=Nn,c=je.DEFAULT_ANISOTROPY,h=qn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ad++}),this.uuid=Un(),this.name="",this.source=new pl(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Ot(0,0),this.repeat=new Ot(1,1),this.center=new Ot(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Jt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(ma).x}get height(){return this.source.getSize(ma).y}get depth(){return this.source.getSize(ma).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==ch)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case fs:t.x=t.x-Math.floor(t.x);break;case Ti:t.x=t.x<0?0:1;break;case yo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case fs:t.y=t.y-Math.floor(t.y);break;case Ti:t.y=t.y<0?0:1;break;case yo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}je.DEFAULT_IMAGE=null;je.DEFAULT_MAPPING=ch;je.DEFAULT_ANISOTROPY=1;class ue{constructor(t=0,e=0,n=0,i=1){ue.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*i+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r;const l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],p=l[5],m=l[9],v=l[2],g=l[6],f=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-v)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+v)<.1&&Math.abs(m+g)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const w=(c+1)/2,_=(p+1)/2,T=(f+1)/2,R=(h+d)/4,C=(u+v)/4,I=(m+g)/4;return w>_&&w>T?w<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(w),i=R/n,r=C/n):_>T?_<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(_),n=R/i,r=I/i):T<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(T),n=C/r,i=I/r),this.set(n,i,r,e),this}let y=Math.sqrt((g-m)*(g-m)+(u-v)*(u-v)+(d-h)*(d-h));return Math.abs(y)<.001&&(y=1),this.x=(g-m)/y,this.y=(u-v)/y,this.z=(d-h)/y,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=ie(this.x,t.x,e.x),this.y=ie(this.y,t.y,e.y),this.z=ie(this.z,t.z,e.z),this.w=ie(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=ie(this.x,t,e),this.y=ie(this.y,t,e),this.z=ie(this.z,t,e),this.w=ie(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ie(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class od extends vs{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Tn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new ue(0,0,t,e),this.scissorTest=!1,this.viewport=new ue(0,0,t,e);const i={width:t,height:e,depth:n.depth},r=new je(i);this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){const e={minFilter:Tn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const i=Object.assign({},t.textures[e].image);this.textures[e].source=new pl(i)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Kn extends od{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class yh extends je{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=cn,this.minFilter=cn,this.wrapR=Ti,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class ld extends je{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=cn,this.minFilter=cn,this.wrapR=Ti,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Zn{constructor(t=new D(1/0,1/0,1/0),e=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(_n.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(_n.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=_n.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,_n):_n.fromBufferAttribute(r,a),_n.applyMatrix4(t.matrixWorld),this.expandByPoint(_n);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),cr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),cr.copy(n.boundingBox)),cr.applyMatrix4(t.matrixWorld),this.union(cr)}const i=t.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,_n),_n.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Es),hr.subVectors(this.max,Es),zi.subVectors(t.a,Es),Oi.subVectors(t.b,Es),Bi.subVectors(t.c,Es),ti.subVectors(Oi,zi),ei.subVectors(Bi,Oi),pi.subVectors(zi,Bi);let e=[0,-ti.z,ti.y,0,-ei.z,ei.y,0,-pi.z,pi.y,ti.z,0,-ti.x,ei.z,0,-ei.x,pi.z,0,-pi.x,-ti.y,ti.x,0,-ei.y,ei.x,0,-pi.y,pi.x,0];return!ga(e,zi,Oi,Bi,hr)||(e=[1,0,0,0,1,0,0,0,1],!ga(e,zi,Oi,Bi,hr))?!1:(ur.crossVectors(ti,ei),e=[ur.x,ur.y,ur.z],ga(e,zi,Oi,Bi,hr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,_n).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(_n).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Bn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Bn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Bn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Bn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Bn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Bn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Bn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Bn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Bn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Bn=[new D,new D,new D,new D,new D,new D,new D,new D],_n=new D,cr=new Zn,zi=new D,Oi=new D,Bi=new D,ti=new D,ei=new D,pi=new D,Es=new D,hr=new D,ur=new D,mi=new D;function ga(s,t,e,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){mi.fromArray(s,r);const o=i.x*Math.abs(mi.x)+i.y*Math.abs(mi.y)+i.z*Math.abs(mi.z),l=t.dot(mi),c=e.dot(mi),h=n.dot(mi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const cd=new Zn,Ts=new D,va=new D;class hi{constructor(t=new D,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):cd.setFromPoints(t).getCenter(n);let i=0;for(let r=0,a=t.length;r<a;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ts.subVectors(t,this.center);const e=Ts.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(Ts,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(va.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ts.copy(t.center).add(va)),this.expandByPoint(Ts.copy(t.center).sub(va))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const kn=new D,xa=new D,dr=new D,ni=new D,_a=new D,fr=new D,ya=new D;class ta{constructor(t=new D,e=new D(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,kn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=kn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(kn.copy(this.origin).addScaledVector(this.direction,e),kn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){xa.copy(t).add(e).multiplyScalar(.5),dr.copy(e).sub(t).normalize(),ni.copy(this.origin).sub(xa);const r=t.distanceTo(e)*.5,a=-this.direction.dot(dr),o=ni.dot(this.direction),l=-ni.dot(dr),c=ni.lengthSq(),h=Math.abs(1-a*a);let u,d,p,m;if(h>0)if(u=a*l-o,d=a*o-l,m=r*h,u>=0)if(d>=-m)if(d<=m){const v=1/h;u*=v,d*=v,p=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=r,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*l)+c;else d<=-m?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-l),r),p=-u*u+d*(d+2*l)+c):d<=m?(u=0,d=Math.min(Math.max(-r,-l),r),p=d*(d+2*l)+c):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-l),r),p=-u*u+d*(d+2*l)+c);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(xa).addScaledVector(dr,d),p}intersectSphere(t,e){kn.subVectors(t.center,this.origin);const n=kn.dot(this.direction),i=kn.dot(kn)-n*n,r=t.radius*t.radius;if(i>r)return null;const a=Math.sqrt(r-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,i=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,i=(t.min.x-d.x)*c),h>=0?(r=(t.min.y-d.y)*h,a=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,a=(t.min.y-d.y)*h),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),u>=0?(o=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(o=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,kn)!==null}intersectTriangle(t,e,n,i,r){_a.subVectors(e,t),fr.subVectors(n,t),ya.crossVectors(_a,fr);let a=this.direction.dot(ya),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;ni.subVectors(this.origin,t);const l=o*this.direction.dot(fr.crossVectors(ni,fr));if(l<0)return null;const c=o*this.direction.dot(_a.cross(ni));if(c<0||l+c>a)return null;const h=-o*ni.dot(ya);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Kt{constructor(t,e,n,i,r,a,o,l,c,h,u,d,p,m,v,g){Kt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,l,c,h,u,d,p,m,v,g)}set(t,e,n,i,r,a,o,l,c,h,u,d,p,m,v,g){const f=this.elements;return f[0]=t,f[4]=e,f[8]=n,f[12]=i,f[1]=r,f[5]=a,f[9]=o,f[13]=l,f[2]=c,f[6]=h,f[10]=u,f[14]=d,f[3]=p,f[7]=m,f[11]=v,f[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Kt().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/ki.setFromMatrixColumn(t,0).length(),r=1/ki.setFromMatrixColumn(t,1).length(),a=1/ki.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const d=a*h,p=a*u,m=o*h,v=o*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=p+m*c,e[5]=d-v*c,e[9]=-o*l,e[2]=v-d*c,e[6]=m+p*c,e[10]=a*l}else if(t.order==="YXZ"){const d=l*h,p=l*u,m=c*h,v=c*u;e[0]=d+v*o,e[4]=m*o-p,e[8]=a*c,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=p*o-m,e[6]=v+d*o,e[10]=a*l}else if(t.order==="ZXY"){const d=l*h,p=l*u,m=c*h,v=c*u;e[0]=d-v*o,e[4]=-a*u,e[8]=m+p*o,e[1]=p+m*o,e[5]=a*h,e[9]=v-d*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const d=a*h,p=a*u,m=o*h,v=o*u;e[0]=l*h,e[4]=m*c-p,e[8]=d*c+v,e[1]=l*u,e[5]=v*c+d,e[9]=p*c-m,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const d=a*l,p=a*c,m=o*l,v=o*c;e[0]=l*h,e[4]=v-d*u,e[8]=m*u+p,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=p*u+m,e[10]=d-v*u}else if(t.order==="XZY"){const d=a*l,p=a*c,m=o*l,v=o*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+v,e[5]=a*h,e[9]=p*u-m,e[2]=m*u-p,e[6]=o*h,e[10]=v*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(hd,t,ud)}lookAt(t,e,n){const i=this.elements;return an.subVectors(t,e),an.lengthSq()===0&&(an.z=1),an.normalize(),ii.crossVectors(n,an),ii.lengthSq()===0&&(Math.abs(n.z)===1?an.x+=1e-4:an.z+=1e-4,an.normalize(),ii.crossVectors(n,an)),ii.normalize(),pr.crossVectors(an,ii),i[0]=ii.x,i[4]=pr.x,i[8]=an.x,i[1]=ii.y,i[5]=pr.y,i[9]=an.y,i[2]=ii.z,i[6]=pr.z,i[10]=an.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],p=n[13],m=n[2],v=n[6],g=n[10],f=n[14],y=n[3],w=n[7],_=n[11],T=n[15],R=i[0],C=i[4],I=i[8],M=i[12],S=i[1],U=i[5],N=i[9],k=i[13],q=i[2],Y=i[6],V=i[10],it=i[14],W=i[3],rt=i[7],at=i[11],Et=i[15];return r[0]=a*R+o*S+l*q+c*W,r[4]=a*C+o*U+l*Y+c*rt,r[8]=a*I+o*N+l*V+c*at,r[12]=a*M+o*k+l*it+c*Et,r[1]=h*R+u*S+d*q+p*W,r[5]=h*C+u*U+d*Y+p*rt,r[9]=h*I+u*N+d*V+p*at,r[13]=h*M+u*k+d*it+p*Et,r[2]=m*R+v*S+g*q+f*W,r[6]=m*C+v*U+g*Y+f*rt,r[10]=m*I+v*N+g*V+f*at,r[14]=m*M+v*k+g*it+f*Et,r[3]=y*R+w*S+_*q+T*W,r[7]=y*C+w*U+_*Y+T*rt,r[11]=y*I+w*N+_*V+T*at,r[15]=y*M+w*k+_*it+T*Et,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],p=t[14],m=t[3],v=t[7],g=t[11],f=t[15];return m*(+r*l*u-i*c*u-r*o*d+n*c*d+i*o*p-n*l*p)+v*(+e*l*p-e*c*d+r*a*d-i*a*p+i*c*h-r*l*h)+g*(+e*c*u-e*o*p-r*a*u+n*a*p+r*o*h-n*c*h)+f*(-i*o*h-e*l*u+e*o*d+i*a*u-n*a*d+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],p=t[11],m=t[12],v=t[13],g=t[14],f=t[15],y=u*g*c-v*d*c+v*l*p-o*g*p-u*l*f+o*d*f,w=m*d*c-h*g*c-m*l*p+a*g*p+h*l*f-a*d*f,_=h*v*c-m*u*c+m*o*p-a*v*p-h*o*f+a*u*f,T=m*u*l-h*v*l-m*o*d+a*v*d+h*o*g-a*u*g,R=e*y+n*w+i*_+r*T;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/R;return t[0]=y*C,t[1]=(v*d*r-u*g*r-v*i*p+n*g*p+u*i*f-n*d*f)*C,t[2]=(o*g*r-v*l*r+v*i*c-n*g*c-o*i*f+n*l*f)*C,t[3]=(u*l*r-o*d*r-u*i*c+n*d*c+o*i*p-n*l*p)*C,t[4]=w*C,t[5]=(h*g*r-m*d*r+m*i*p-e*g*p-h*i*f+e*d*f)*C,t[6]=(m*l*r-a*g*r-m*i*c+e*g*c+a*i*f-e*l*f)*C,t[7]=(a*d*r-h*l*r+h*i*c-e*d*c-a*i*p+e*l*p)*C,t[8]=_*C,t[9]=(m*u*r-h*v*r-m*n*p+e*v*p+h*n*f-e*u*f)*C,t[10]=(a*v*r-m*o*r+m*n*c-e*v*c-a*n*f+e*o*f)*C,t[11]=(h*o*r-a*u*r-h*n*c+e*u*c+a*n*p-e*o*p)*C,t[12]=T*C,t[13]=(h*v*i-m*u*i+m*n*d-e*v*d-h*n*g+e*u*g)*C,t[14]=(m*o*i-a*v*i-m*n*l+e*v*l+a*n*g-e*o*g)*C,t[15]=(a*u*i-h*o*i+h*n*l-e*u*l-a*n*d+e*o*d)*C,this}scale(t){const e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,a){return this.set(1,n,r,0,t,1,a,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,u=o+o,d=r*c,p=r*h,m=r*u,v=a*h,g=a*u,f=o*u,y=l*c,w=l*h,_=l*u,T=n.x,R=n.y,C=n.z;return i[0]=(1-(v+f))*T,i[1]=(p+_)*T,i[2]=(m-w)*T,i[3]=0,i[4]=(p-_)*R,i[5]=(1-(d+f))*R,i[6]=(g+y)*R,i[7]=0,i[8]=(m+w)*C,i[9]=(g-y)*C,i[10]=(1-(d+v))*C,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let r=ki.set(i[0],i[1],i[2]).length();const a=ki.set(i[4],i[5],i[6]).length(),o=ki.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),t.x=i[12],t.y=i[13],t.z=i[14],yn.copy(this);const c=1/r,h=1/a,u=1/o;return yn.elements[0]*=c,yn.elements[1]*=c,yn.elements[2]*=c,yn.elements[4]*=h,yn.elements[5]*=h,yn.elements[6]*=h,yn.elements[8]*=u,yn.elements[9]*=u,yn.elements[10]*=u,e.setFromRotationMatrix(yn),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,i,r,a,o=In,l=!1){const c=this.elements,h=2*r/(e-t),u=2*r/(n-i),d=(e+t)/(e-t),p=(n+i)/(n-i);let m,v;if(l)m=r/(a-r),v=a*r/(a-r);else if(o===In)m=-(a+r)/(a-r),v=-2*a*r/(a-r);else if(o===Yr)m=-a/(a-r),v=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,i,r,a,o=In,l=!1){const c=this.elements,h=2/(e-t),u=2/(n-i),d=-(e+t)/(e-t),p=-(n+i)/(n-i);let m,v;if(l)m=1/(a-r),v=a/(a-r);else if(o===In)m=-2/(a-r),v=-(a+r)/(a-r);else if(o===Yr)m=-1/(a-r),v=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=m,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const ki=new D,yn=new Kt,hd=new D(0,0,0),ud=new D(1,1,1),ii=new D,pr=new D,an=new D,kl=new Kt,Hl=new er;class Fn{constructor(t=0,e=0,n=0,i=Fn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,r=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],p=i[10];switch(e){case"XYZ":this._y=Math.asin(ie(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ie(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(ie(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-ie(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(ie(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-ie(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return kl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(kl,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Hl.setFromEuler(this),this.setFromQuaternion(Hl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Fn.DEFAULT_ORDER="XYZ";class ml{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let dd=0;const Vl=new D,Hi=new er,Hn=new Kt,mr=new D,As=new D,fd=new D,pd=new er,Gl=new D(1,0,0),Wl=new D(0,1,0),Xl=new D(0,0,1),$l={type:"added"},md={type:"removed"},Vi={type:"childadded",child:null},Ma={type:"childremoved",child:null};class Pe extends vs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:dd++}),this.uuid=Un(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Pe.DEFAULT_UP.clone();const t=new D,e=new Fn,n=new er,i=new D(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Kt},normalMatrix:{value:new Jt}}),this.matrix=new Kt,this.matrixWorld=new Kt,this.matrixAutoUpdate=Pe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Pe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ml,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Hi.setFromAxisAngle(t,e),this.quaternion.multiply(Hi),this}rotateOnWorldAxis(t,e){return Hi.setFromAxisAngle(t,e),this.quaternion.premultiply(Hi),this}rotateX(t){return this.rotateOnAxis(Gl,t)}rotateY(t){return this.rotateOnAxis(Wl,t)}rotateZ(t){return this.rotateOnAxis(Xl,t)}translateOnAxis(t,e){return Vl.copy(t).applyQuaternion(this.quaternion),this.position.add(Vl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Gl,t)}translateY(t){return this.translateOnAxis(Wl,t)}translateZ(t){return this.translateOnAxis(Xl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Hn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?mr.copy(t):mr.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),As.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Hn.lookAt(As,mr,this.up):Hn.lookAt(mr,As,this.up),this.quaternion.setFromRotationMatrix(Hn),i&&(Hn.extractRotation(i.matrixWorld),Hi.setFromRotationMatrix(Hn),this.quaternion.premultiply(Hi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent($l),Vi.child=t,this.dispatchEvent(Vi),Vi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(md),Ma.child=t,this.dispatchEvent(Ma),Ma.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Hn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Hn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Hn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent($l),Vi.child=t,this.dispatchEvent(Vi),Vi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(As,t,fd),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(As,pd,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(t),i.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));i.material=o}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),u=a(t.shapes),d=a(t.skeletons),p=a(t.animations),m=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),p.length>0&&(n.animations=p),m.length>0&&(n.nodes=m)}return n.object=i,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}Pe.DEFAULT_UP=new D(0,1,0);Pe.DEFAULT_MATRIX_AUTO_UPDATE=!0;Pe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Mn=new D,Vn=new D,ba=new D,Gn=new D,Gi=new D,Wi=new D,ql=new D,Sa=new D,wa=new D,Ea=new D,Ta=new ue,Aa=new ue,Ca=new ue;class pn{constructor(t=new D,e=new D,n=new D){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),Mn.subVectors(t,e),i.cross(Mn);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){Mn.subVectors(i,e),Vn.subVectors(n,e),ba.subVectors(t,e);const a=Mn.dot(Mn),o=Mn.dot(Vn),l=Mn.dot(ba),c=Vn.dot(Vn),h=Vn.dot(ba),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;const d=1/u,p=(c*l-o*h)*d,m=(a*h-o*l)*d;return r.set(1-p-m,m,p)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Gn)===null?!1:Gn.x>=0&&Gn.y>=0&&Gn.x+Gn.y<=1}static getInterpolation(t,e,n,i,r,a,o,l){return this.getBarycoord(t,e,n,i,Gn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Gn.x),l.addScaledVector(a,Gn.y),l.addScaledVector(o,Gn.z),l)}static getInterpolatedAttribute(t,e,n,i,r,a){return Ta.setScalar(0),Aa.setScalar(0),Ca.setScalar(0),Ta.fromBufferAttribute(t,e),Aa.fromBufferAttribute(t,n),Ca.fromBufferAttribute(t,i),a.setScalar(0),a.addScaledVector(Ta,r.x),a.addScaledVector(Aa,r.y),a.addScaledVector(Ca,r.z),a}static isFrontFacing(t,e,n,i){return Mn.subVectors(n,e),Vn.subVectors(t,e),Mn.cross(Vn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Mn.subVectors(this.c,this.b),Vn.subVectors(this.a,this.b),Mn.cross(Vn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return pn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return pn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return pn.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return pn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return pn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,r=this.c;let a,o;Gi.subVectors(i,n),Wi.subVectors(r,n),Sa.subVectors(t,n);const l=Gi.dot(Sa),c=Wi.dot(Sa);if(l<=0&&c<=0)return e.copy(n);wa.subVectors(t,i);const h=Gi.dot(wa),u=Wi.dot(wa);if(h>=0&&u<=h)return e.copy(i);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(n).addScaledVector(Gi,a);Ea.subVectors(t,r);const p=Gi.dot(Ea),m=Wi.dot(Ea);if(m>=0&&p<=m)return e.copy(r);const v=p*c-l*m;if(v<=0&&c>=0&&m<=0)return o=c/(c-m),e.copy(n).addScaledVector(Wi,o);const g=h*m-p*u;if(g<=0&&u-h>=0&&p-m>=0)return ql.subVectors(r,i),o=(u-h)/(u-h+(p-m)),e.copy(i).addScaledVector(ql,o);const f=1/(g+v+d);return a=v*f,o=d*f,e.copy(n).addScaledVector(Gi,a).addScaledVector(Wi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Mh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},si={h:0,s:0,l:0},gr={h:0,s:0,l:0};function Ra(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class $t{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Qe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,de.colorSpaceToWorking(this,e),this}setRGB(t,e,n,i=de.workingColorSpace){return this.r=t,this.g=e,this.b=n,de.colorSpaceToWorking(this,i),this}setHSL(t,e,n,i=de.workingColorSpace){if(t=fl(t,1),e=ie(e,0,1),n=ie(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=Ra(a,r,t+1/3),this.g=Ra(a,r,t),this.b=Ra(a,r,t-1/3)}return de.colorSpaceToWorking(this,i),this}setStyle(t,e=Qe){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Qe){const n=Mh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Yn(t.r),this.g=Yn(t.g),this.b=Yn(t.b),this}copyLinearToSRGB(t){return this.r=ls(t.r),this.g=ls(t.g),this.b=ls(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Qe){return de.workingToColorSpace(qe.copy(this),t),Math.round(ie(qe.r*255,0,255))*65536+Math.round(ie(qe.g*255,0,255))*256+Math.round(ie(qe.b*255,0,255))}getHexString(t=Qe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=de.workingColorSpace){de.workingToColorSpace(qe.copy(this),e);const n=qe.r,i=qe.g,r=qe.b,a=Math.max(n,i,r),o=Math.min(n,i,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(i-r)/u+(i<r?6:0);break;case i:l=(r-n)/u+2;break;case r:l=(n-i)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=de.workingColorSpace){return de.workingToColorSpace(qe.copy(this),e),t.r=qe.r,t.g=qe.g,t.b=qe.b,t}getStyle(t=Qe){de.workingToColorSpace(qe.copy(this),t);const e=qe.r,n=qe.g,i=qe.b;return t!==Qe?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(si),this.setHSL(si.h+t,si.s+e,si.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(si),t.getHSL(gr);const n=Vs(si.h,gr.h,e),i=Vs(si.s,gr.s,e),r=Vs(si.l,gr.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const qe=new $t;$t.NAMES=Mh;let gd=0;class Ii extends vs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:gd++}),this.uuid=Un(),this.name="",this.type="Material",this.blending=os,this.side=jn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=lo,this.blendDst=co,this.blendEquation=wi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new $t(0,0,0),this.blendAlpha=0,this.depthFunc=hs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Il,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ni,this.stencilZFail=Ni,this.stencilZPass=Ni,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==os&&(n.blending=this.blending),this.side!==jn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==lo&&(n.blendSrc=this.blendSrc),this.blendDst!==co&&(n.blendDst=this.blendDst),this.blendEquation!==wi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==hs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Il&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ni&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ni&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ni&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=i(t.textures),a=i(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class ea extends Ii{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new $t(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fn,this.combine=oh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ue=new D,vr=new Ot;let vd=0;class Ne{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:vd++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=jo,this.updateRanges=[],this.gpuType=An,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)vr.fromBufferAttribute(this,e),vr.applyMatrix3(t),this.setXY(e,vr.x,vr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.applyMatrix3(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.applyMatrix4(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.applyNormalMatrix(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.transformDirection(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=En(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=me(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=En(e,this.array)),e}setX(t,e){return this.normalized&&(e=me(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=En(e,this.array)),e}setY(t,e){return this.normalized&&(e=me(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=En(e,this.array)),e}setZ(t,e){return this.normalized&&(e=me(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=En(e,this.array)),e}setW(t,e){return this.normalized&&(e=me(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=me(e,this.array),n=me(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=me(e,this.array),n=me(n,this.array),i=me(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=me(e,this.array),n=me(n,this.array),i=me(i,this.array),r=me(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==jo&&(t.usage=this.usage),t}}class gl extends Ne{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class bh extends Ne{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class oe extends Ne{constructor(t,e,n){super(new Float32Array(t),e,n)}}let xd=0;const dn=new Kt,Pa=new Pe,Xi=new D,on=new Zn,Cs=new Zn,Ge=new D;class Me extends vs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:xd++}),this.uuid=Un(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(_h(t)?bh:gl)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Jt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return dn.makeRotationFromQuaternion(t),this.applyMatrix4(dn),this}rotateX(t){return dn.makeRotationX(t),this.applyMatrix4(dn),this}rotateY(t){return dn.makeRotationY(t),this.applyMatrix4(dn),this}rotateZ(t){return dn.makeRotationZ(t),this.applyMatrix4(dn),this}translate(t,e,n){return dn.makeTranslation(t,e,n),this.applyMatrix4(dn),this}scale(t,e,n){return dn.makeScale(t,e,n),this.applyMatrix4(dn),this}lookAt(t){return Pa.lookAt(t),Pa.updateMatrix(),this.applyMatrix4(Pa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Xi).negate(),this.translate(Xi.x,Xi.y,Xi.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let i=0,r=t.length;i<r;i++){const a=t[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new oe(n,3))}else{const n=Math.min(t.length,e.count);for(let i=0;i<n;i++){const r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Zn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const r=e[n];on.setFromBufferAttribute(r),this.morphTargetsRelative?(Ge.addVectors(this.boundingBox.min,on.min),this.boundingBox.expandByPoint(Ge),Ge.addVectors(this.boundingBox.max,on.max),this.boundingBox.expandByPoint(Ge)):(this.boundingBox.expandByPoint(on.min),this.boundingBox.expandByPoint(on.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new hi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(t){const n=this.boundingSphere.center;if(on.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];Cs.setFromBufferAttribute(o),this.morphTargetsRelative?(Ge.addVectors(on.min,Cs.min),on.expandByPoint(Ge),Ge.addVectors(on.max,Cs.max),on.expandByPoint(Ge)):(on.expandByPoint(Cs.min),on.expandByPoint(Cs.max))}on.getCenter(n);let i=0;for(let r=0,a=t.count;r<a;r++)Ge.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(Ge));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Ge.fromBufferAttribute(o,c),l&&(Xi.fromBufferAttribute(t,c),Ge.add(Xi)),i=Math.max(i,n.distanceToSquared(Ge))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ne(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let I=0;I<n.count;I++)o[I]=new D,l[I]=new D;const c=new D,h=new D,u=new D,d=new Ot,p=new Ot,m=new Ot,v=new D,g=new D;function f(I,M,S){c.fromBufferAttribute(n,I),h.fromBufferAttribute(n,M),u.fromBufferAttribute(n,S),d.fromBufferAttribute(r,I),p.fromBufferAttribute(r,M),m.fromBufferAttribute(r,S),h.sub(c),u.sub(c),p.sub(d),m.sub(d);const U=1/(p.x*m.y-m.x*p.y);isFinite(U)&&(v.copy(h).multiplyScalar(m.y).addScaledVector(u,-p.y).multiplyScalar(U),g.copy(u).multiplyScalar(p.x).addScaledVector(h,-m.x).multiplyScalar(U),o[I].add(v),o[M].add(v),o[S].add(v),l[I].add(g),l[M].add(g),l[S].add(g))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let I=0,M=y.length;I<M;++I){const S=y[I],U=S.start,N=S.count;for(let k=U,q=U+N;k<q;k+=3)f(t.getX(k+0),t.getX(k+1),t.getX(k+2))}const w=new D,_=new D,T=new D,R=new D;function C(I){T.fromBufferAttribute(i,I),R.copy(T);const M=o[I];w.copy(M),w.sub(T.multiplyScalar(T.dot(M))).normalize(),_.crossVectors(R,M);const U=_.dot(l[I])<0?-1:1;a.setXYZW(I,w.x,w.y,w.z,U)}for(let I=0,M=y.length;I<M;++I){const S=y[I],U=S.start,N=S.count;for(let k=U,q=U+N;k<q;k+=3)C(t.getX(k+0)),C(t.getX(k+1)),C(t.getX(k+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ne(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,p=n.count;d<p;d++)n.setXYZ(d,0,0,0);const i=new D,r=new D,a=new D,o=new D,l=new D,c=new D,h=new D,u=new D;if(t)for(let d=0,p=t.count;d<p;d+=3){const m=t.getX(d+0),v=t.getX(d+1),g=t.getX(d+2);i.fromBufferAttribute(e,m),r.fromBufferAttribute(e,v),a.fromBufferAttribute(e,g),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),o.fromBufferAttribute(n,m),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,g),o.add(h),l.add(h),c.add(h),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let d=0,p=e.count;d<p;d+=3)i.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),a.fromBufferAttribute(e,d+2),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ge.fromBufferAttribute(t,e),Ge.normalize(),t.setXYZ(e,Ge.x,Ge.y,Ge.z)}toNonIndexed(){function t(o,l){const c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h);let p=0,m=0;for(let v=0,g=l.length;v<g;v++){o.isInterleavedBufferAttribute?p=l[v]*o.data.stride+o.offset:p=l[v]*h;for(let f=0;f<h;f++)d[m++]=c[p++]}return new Ne(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Me,n=this.index.array,i=this.attributes;for(const o in i){const l=i[o],c=t(l,n);e.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){const d=c[h],p=t(d,n);l.push(p)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const i={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const p=c[u];h.push(p.toJSON(t.data))}h.length>0&&(i[l]=h,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const i=t.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],u=r[c];for(let d=0,p=u.length;d<p;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Yl=new Kt,gi=new ta,xr=new hi,jl=new D,_r=new D,yr=new D,Mr=new D,Da=new D,br=new D,Kl=new D,Sr=new D;class ge extends Pe{constructor(t=new Me,e=new ea){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const o=this.morphTargetInfluences;if(r&&o){br.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],u=r[l];h!==0&&(Da.fromBufferAttribute(u,t),a?br.addScaledVector(Da,h):br.addScaledVector(Da.sub(e),h))}e.add(br)}return e}raycast(t,e){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),xr.copy(n.boundingSphere),xr.applyMatrix4(r),gi.copy(t.ray).recast(t.near),!(xr.containsPoint(gi.origin)===!1&&(gi.intersectSphere(xr,jl)===null||gi.origin.distanceToSquared(jl)>(t.far-t.near)**2))&&(Yl.copy(r).invert(),gi.copy(t.ray).applyMatrix4(Yl),!(n.boundingBox!==null&&gi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,gi)))}_computeIntersections(t,e,n){let i;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,v=d.length;m<v;m++){const g=d[m],f=a[g.materialIndex],y=Math.max(g.start,p.start),w=Math.min(o.count,Math.min(g.start+g.count,p.start+p.count));for(let _=y,T=w;_<T;_+=3){const R=o.getX(_),C=o.getX(_+1),I=o.getX(_+2);i=wr(this,f,t,n,c,h,u,R,C,I),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=g.materialIndex,e.push(i))}}else{const m=Math.max(0,p.start),v=Math.min(o.count,p.start+p.count);for(let g=m,f=v;g<f;g+=3){const y=o.getX(g),w=o.getX(g+1),_=o.getX(g+2);i=wr(this,a,t,n,c,h,u,y,w,_),i&&(i.faceIndex=Math.floor(g/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let m=0,v=d.length;m<v;m++){const g=d[m],f=a[g.materialIndex],y=Math.max(g.start,p.start),w=Math.min(l.count,Math.min(g.start+g.count,p.start+p.count));for(let _=y,T=w;_<T;_+=3){const R=_,C=_+1,I=_+2;i=wr(this,f,t,n,c,h,u,R,C,I),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=g.materialIndex,e.push(i))}}else{const m=Math.max(0,p.start),v=Math.min(l.count,p.start+p.count);for(let g=m,f=v;g<f;g+=3){const y=g,w=g+1,_=g+2;i=wr(this,a,t,n,c,h,u,y,w,_),i&&(i.faceIndex=Math.floor(g/3),e.push(i))}}}}function _d(s,t,e,n,i,r,a,o){let l;if(t.side===Ye?l=n.intersectTriangle(a,r,i,!0,o):l=n.intersectTriangle(i,r,a,t.side===jn,o),l===null)return null;Sr.copy(o),Sr.applyMatrix4(s.matrixWorld);const c=e.ray.origin.distanceTo(Sr);return c<e.near||c>e.far?null:{distance:c,point:Sr.clone(),object:s}}function wr(s,t,e,n,i,r,a,o,l,c){s.getVertexPosition(o,_r),s.getVertexPosition(l,yr),s.getVertexPosition(c,Mr);const h=_d(s,t,e,n,_r,yr,Mr,Kl);if(h){const u=new D;pn.getBarycoord(Kl,_r,yr,Mr,u),i&&(h.uv=pn.getInterpolatedAttribute(i,o,l,c,u,new Ot)),r&&(h.uv1=pn.getInterpolatedAttribute(r,o,l,c,u,new Ot)),a&&(h.normal=pn.getInterpolatedAttribute(a,o,l,c,u,new D),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new D,materialIndex:0};pn.getNormal(_r,yr,Mr,d.normal),h.face=d,h.barycoord=u}return h}class xs extends Me{constructor(t=1,e=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};const o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],u=[];let d=0,p=0;m("z","y","x",-1,-1,n,e,t,a,r,0),m("z","y","x",1,-1,n,e,-t,a,r,1),m("x","z","y",1,1,t,n,e,i,a,2),m("x","z","y",1,-1,t,n,-e,i,a,3),m("x","y","z",1,-1,t,e,n,i,r,4),m("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new oe(c,3)),this.setAttribute("normal",new oe(h,3)),this.setAttribute("uv",new oe(u,2));function m(v,g,f,y,w,_,T,R,C,I,M){const S=_/C,U=T/I,N=_/2,k=T/2,q=R/2,Y=C+1,V=I+1;let it=0,W=0;const rt=new D;for(let at=0;at<V;at++){const Et=at*U-k;for(let Wt=0;Wt<Y;Wt++){const le=Wt*S-N;rt[v]=le*y,rt[g]=Et*w,rt[f]=q,c.push(rt.x,rt.y,rt.z),rt[v]=0,rt[g]=0,rt[f]=R>0?1:-1,h.push(rt.x,rt.y,rt.z),u.push(Wt/C),u.push(1-at/I),it+=1}}for(let at=0;at<I;at++)for(let Et=0;Et<C;Et++){const Wt=d+Et+Y*at,le=d+Et+Y*(at+1),he=d+(Et+1)+Y*(at+1),Bt=d+(Et+1)+Y*at;l.push(Wt,le,Bt),l.push(le,he,Bt),W+=6}o.addGroup(p,W,M),p+=W,d+=it}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new xs(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function ms(s){const t={};for(const e in s){t[e]={};for(const n in s[e]){const i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function Je(s){const t={};for(let e=0;e<s.length;e++){const n=ms(s[e]);for(const i in n)t[i]=n[i]}return t}function yd(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function Sh(s){const t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:de.workingColorSpace}const Kr={clone:ms,merge:Je};var Md=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,bd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class vn extends Ii{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Md,this.fragmentShader=bd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ms(t.uniforms),this.uniformsGroups=yd(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?e.uniforms[i]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[i]={type:"m4",value:a.toArray()}:e.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class wh extends Pe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Kt,this.projectionMatrix=new Kt,this.projectionMatrixInverse=new Kt,this.coordinateSystem=In,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ri=new D,Zl=new Ot,Jl=new Ot;class tn extends wh{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Ks*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Hs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ks*2*Math.atan(Math.tan(Hs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){ri.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ri.x,ri.y).multiplyScalar(-t/ri.z),ri.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ri.x,ri.y).multiplyScalar(-t/ri.z)}getViewSize(t,e){return this.getViewBounds(t,Zl,Jl),e.subVectors(Jl,Zl)}setViewOffset(t,e,n,i,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Hs*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*i/l,e-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const $i=-90,qi=1;class Sd extends Pe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new tn($i,qi,t,e);i.layers=this.layers,this.add(i);const r=new tn($i,qi,t,e);r.layers=this.layers,this.add(r);const a=new tn($i,qi,t,e);a.layers=this.layers,this.add(a);const o=new tn($i,qi,t,e);o.layers=this.layers,this.add(o);const l=new tn($i,qi,t,e);l.layers=this.layers,this.add(l);const c=new tn($i,qi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,r,a,o,l]=e;for(const c of e)this.remove(c);if(t===In)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Yr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,r),t.setRenderTarget(n,1,i),t.render(e,a),t.setRenderTarget(n,2,i),t.render(e,o),t.setRenderTarget(n,3,i),t.render(e,l),t.setRenderTarget(n,4,i),t.render(e,c),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(u,d,p),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class Eh extends je{constructor(t=[],e=us,n,i,r,a,o,l,c,h){super(t,e,n,i,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class wd extends Kn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new Eh(i),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new xs(5,5,5),r=new vn({name:"CubemapFromEquirect",uniforms:ms(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ye,blending:li});r.uniforms.tEquirect.value=e;const a=new ge(i,r),o=e.minFilter;return e.minFilter===oi&&(e.minFilter=Tn),new Sd(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,i=!0){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,i);t.setRenderTarget(r)}}class ke extends Pe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Ed={type:"move"};class La{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ke,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ke,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ke,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const v of t.hand.values()){const g=e.getJointPose(v,n),f=this._getHandJoint(c,v);g!==null&&(f.matrix.fromArray(g.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=g.radius),f.visible=g!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),p=.02,m=.005;c.inputState.pinching&&d>p+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=p-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Ed)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new ke;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class na{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new $t(t),this.density=e}clone(){return new na(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Ql extends Pe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Fn,this.environmentIntensity=1,this.environmentRotation=new Fn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Td{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=jo,this.updateRanges=[],this.version=0,this.uuid=Un()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,r=this.stride;i<r;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Un()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Un()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Ke=new D;class Zr{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Ke.fromBufferAttribute(this,e),Ke.applyMatrix4(t),this.setXYZ(e,Ke.x,Ke.y,Ke.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ke.fromBufferAttribute(this,e),Ke.applyNormalMatrix(t),this.setXYZ(e,Ke.x,Ke.y,Ke.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ke.fromBufferAttribute(this,e),Ke.transformDirection(t),this.setXYZ(e,Ke.x,Ke.y,Ke.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=En(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=me(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=me(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=me(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=me(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=me(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=En(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=En(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=En(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=En(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=me(e,this.array),n=me(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=me(e,this.array),n=me(n,this.array),i=me(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=me(e,this.array),n=me(n,this.array),i=me(i,this.array),r=me(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return new Ne(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Zr(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Th extends Ii{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new $t(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Yi;const Rs=new D,ji=new D,Ki=new D,Zi=new Ot,Ps=new Ot,Ah=new Kt,Er=new D,Ds=new D,Tr=new D,tc=new Ot,Ia=new Ot,ec=new Ot;class Ad extends Pe{constructor(t=new Th){if(super(),this.isSprite=!0,this.type="Sprite",Yi===void 0){Yi=new Me;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Td(e,5);Yi.setIndex([0,1,2,0,2,3]),Yi.setAttribute("position",new Zr(n,3,0,!1)),Yi.setAttribute("uv",new Zr(n,2,3,!1))}this.geometry=Yi,this.material=t,this.center=new Ot(.5,.5),this.count=1}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ji.setFromMatrixScale(this.matrixWorld),Ah.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Ki.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ji.multiplyScalar(-Ki.z);const n=this.material.rotation;let i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));const a=this.center;Ar(Er.set(-.5,-.5,0),Ki,a,ji,i,r),Ar(Ds.set(.5,-.5,0),Ki,a,ji,i,r),Ar(Tr.set(.5,.5,0),Ki,a,ji,i,r),tc.set(0,0),Ia.set(1,0),ec.set(1,1);let o=t.ray.intersectTriangle(Er,Ds,Tr,!1,Rs);if(o===null&&(Ar(Ds.set(-.5,.5,0),Ki,a,ji,i,r),Ia.set(0,1),o=t.ray.intersectTriangle(Er,Tr,Ds,!1,Rs),o===null))return;const l=t.ray.origin.distanceTo(Rs);l<t.near||l>t.far||e.push({distance:l,point:Rs.clone(),uv:pn.getInterpolation(Rs,Er,Ds,Tr,tc,Ia,ec,new Ot),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function Ar(s,t,e,n,i,r){Zi.subVectors(s,e).addScalar(.5).multiply(n),i!==void 0?(Ps.x=r*Zi.x-i*Zi.y,Ps.y=i*Zi.x+r*Zi.y):Ps.copy(Zi),s.copy(t),s.x+=Ps.x,s.y+=Ps.y,s.applyMatrix4(Ah)}const nc=new D,ic=new ue,sc=new ue,Cd=new D,rc=new Kt,Cr=new D,Ua=new hi,ac=new Kt,Na=new ta;class Rr extends ge{constructor(t,e){super(t,e),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Ll,this.bindMatrix=new Kt,this.bindMatrixInverse=new Kt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const t=this.geometry;this.boundingBox===null&&(this.boundingBox=new Zn),this.boundingBox.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Cr),this.boundingBox.expandByPoint(Cr)}computeBoundingSphere(){const t=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new hi),this.boundingSphere.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Cr),this.boundingSphere.expandByPoint(Cr)}copy(t,e){return super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}raycast(t,e){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ua.copy(this.boundingSphere),Ua.applyMatrix4(i),t.ray.intersectsSphere(Ua)!==!1&&(ac.copy(i).invert(),Na.copy(t.ray).applyMatrix4(ac),!(this.boundingBox!==null&&Na.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(t,e,Na)))}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){this.skeleton=t,e===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const t=new ue,e=this.geometry.attributes.skinWeight;for(let n=0,i=e.count;n<i;n++){t.fromBufferAttribute(e,n);const r=1/t.manhattanLength();r!==1/0?t.multiplyScalar(r):t.set(1,0,0,0),e.setXYZW(n,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),this.bindMode===Ll?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Au?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){const n=this.skeleton,i=this.geometry;ic.fromBufferAttribute(i.attributes.skinIndex,t),sc.fromBufferAttribute(i.attributes.skinWeight,t),nc.copy(e).applyMatrix4(this.bindMatrix),e.set(0,0,0);for(let r=0;r<4;r++){const a=sc.getComponent(r);if(a!==0){const o=ic.getComponent(r);rc.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),e.addScaledVector(Cd.copy(nc).applyMatrix4(rc),a)}}return e.applyMatrix4(this.bindMatrixInverse)}}class Ch extends Pe{constructor(){super(),this.isBone=!0,this.type="Bone"}}class vl extends je{constructor(t=null,e=1,n=1,i,r,a,o,l,c=cn,h=cn,u,d){super(null,a,o,l,c,h,i,r,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const oc=new Kt,Rd=new Kt;class xl{constructor(t=[],e=[]){this.uuid=Un(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(t.length*16),e.length===0)this.calculateInverses();else if(t.length!==e.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Kt)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,e=this.bones.length;t<e;t++){const n=new Kt;this.bones[t]&&n.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&n.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const t=this.bones,e=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,a=t.length;r<a;r++){const o=t[r]?t[r].matrixWorld:Rd;oc.multiplyMatrices(o,e[r]),oc.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new xl(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);const e=new Float32Array(t*t*4);e.set(this.boneMatrices);const n=new vl(e,t,t,ln,An);return n.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=n,this}getBoneByName(t){for(let e=0,n=this.bones.length;e<n;e++){const i=this.bones[e];if(i.name===t)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(t,e){this.uuid=t.uuid;for(let n=0,i=t.bones.length;n<i;n++){const r=t.bones[n];let a=e[r];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),a=new Ch),this.bones.push(a),this.boneInverses.push(new Kt().fromArray(t.boneInverses[n]))}return this.init(),this}toJSON(){const t={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;const e=this.bones,n=this.boneInverses;for(let i=0,r=e.length;i<r;i++){const a=e[i];t.bones.push(a.uuid);const o=n[i];t.boneInverses.push(o.toArray())}return t}}class is extends Ne{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Ji=new Kt,lc=new Kt,Pr=[],cc=new Zn,Pd=new Kt,Ls=new ge,Is=new hi;class bn extends ge{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new is(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Pd)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Zn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ji),cc.copy(t.boundingBox).applyMatrix4(Ji),this.boundingBox.union(cc)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new hi),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ji),Is.copy(t.boundingSphere).applyMatrix4(Ji),this.boundingSphere.union(Is)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(t,e){const n=this.matrixWorld,i=this.count;if(Ls.geometry=this.geometry,Ls.material=this.material,Ls.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Is.copy(this.boundingSphere),Is.applyMatrix4(n),t.ray.intersectsSphere(Is)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,Ji),lc.multiplyMatrices(n,Ji),Ls.matrixWorld=lc,Ls.raycast(t,Pr);for(let a=0,o=Pr.length;a<o;a++){const l=Pr[a];l.instanceId=r,l.object=this,e.push(l)}Pr.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new is(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new vl(new Float32Array(i*this.count),i,this.count,cl,An));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=i*t;r[l]=o,r.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Fa=new D,Dd=new D,Ld=new Jt;class $n{constructor(t=new D(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=Fa.subVectors(n,e).cross(Dd.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Fa),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Ld.getNormalMatrix(t),i=this.coplanarPoint(Fa).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const vi=new hi,Id=new Ot(.5,.5),Dr=new D;class _l{constructor(t=new $n,e=new $n,n=new $n,i=new $n,r=new $n,a=new $n){this.planes=[t,e,n,i,r,a]}set(t,e,n,i,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=In,n=!1){const i=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],u=r[5],d=r[6],p=r[7],m=r[8],v=r[9],g=r[10],f=r[11],y=r[12],w=r[13],_=r[14],T=r[15];if(i[0].setComponents(c-a,p-h,f-m,T-y).normalize(),i[1].setComponents(c+a,p+h,f+m,T+y).normalize(),i[2].setComponents(c+o,p+u,f+v,T+w).normalize(),i[3].setComponents(c-o,p-u,f-v,T-w).normalize(),n)i[4].setComponents(l,d,g,_).normalize(),i[5].setComponents(c-l,p-d,f-g,T-_).normalize();else if(i[4].setComponents(c-l,p-d,f-g,T-_).normalize(),e===In)i[5].setComponents(c+l,p+d,f+g,T+_).normalize();else if(e===Yr)i[5].setComponents(l,d,g,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),vi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),vi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(vi)}intersectsSprite(t){vi.center.set(0,0,0);const e=Id.distanceTo(t.center);return vi.radius=.7071067811865476+e,vi.applyMatrix4(t.matrixWorld),this.intersectsSphere(vi)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(Dr.x=i.normal.x>0?t.max.x:t.min.x,Dr.y=i.normal.y>0?t.max.y:t.min.y,Dr.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(Dr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Ud extends Ii{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new $t(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const hc=new Kt,Ko=new ta,Lr=new hi,Ir=new D;class Nd extends Pe{constructor(t=new Me,e=new Ud){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,r=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Lr.copy(n.boundingSphere),Lr.applyMatrix4(i),Lr.radius+=r,t.ray.intersectsSphere(Lr)===!1)return;hc.copy(i).invert(),Ko.copy(t.ray).applyMatrix4(hc);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,a.start),p=Math.min(c.count,a.start+a.count);for(let m=d,v=p;m<v;m++){const g=c.getX(m);Ir.fromBufferAttribute(u,g),uc(Ir,g,l,i,t,e,this)}}else{const d=Math.max(0,a.start),p=Math.min(u.count,a.start+a.count);for(let m=d,v=p;m<v;m++)Ir.fromBufferAttribute(u,m),uc(Ir,m,l,i,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function uc(s,t,e,n,i,r,a){const o=Ko.distanceSqToPoint(s);if(o<e){const l=new D;Ko.closestPointToPoint(s,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}class yl extends je{constructor(t,e,n,i,r,a,o,l,c){super(t,e,n,i,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Rh extends je{constructor(t,e,n=Ri,i,r,a,o=cn,l=cn,c,h=Ys,u=1){if(h!==Ys&&h!==js)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:t,height:e,depth:u};super(d,i,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new pl(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Ph extends je{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class Jn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(i),e.push(r),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const n=this.getLengths();let i=0;const r=n.length;let a;e?a=e:a=t*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),c=n[i]-a,c<0)o=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===a)return i/(r-1);const h=n[i],d=n[i+1]-h,p=(a-h)/d;return(i+p)/(r-1)}getTangent(t,e){let i=t-1e-4,r=t+1e-4;i<0&&(i=0),r>1&&(r=1);const a=this.getPoint(i),o=this.getPoint(r),l=e||(a.isVector2?new Ot:new D);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){const n=new D,i=[],r=[],a=[],o=new D,l=new Kt;for(let p=0;p<=t;p++){const m=p/t;i[p]=this.getTangentAt(m,new D)}r[0]=new D,a[0]=new D;let c=Number.MAX_VALUE;const h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],o),a[0].crossVectors(i[0],r[0]);for(let p=1;p<=t;p++){if(r[p]=r[p-1].clone(),a[p]=a[p-1].clone(),o.crossVectors(i[p-1],i[p]),o.length()>Number.EPSILON){o.normalize();const m=Math.acos(ie(i[p-1].dot(i[p]),-1,1));r[p].applyMatrix4(l.makeRotationAxis(o,m))}a[p].crossVectors(i[p],r[p])}if(e===!0){let p=Math.acos(ie(r[0].dot(r[t]),-1,1));p/=t,i[0].dot(o.crossVectors(r[0],r[t]))>0&&(p=-p);for(let m=1;m<=t;m++)r[m].applyMatrix4(l.makeRotationAxis(i[m],p*m)),a[m].crossVectors(i[m],r[m])}return{tangents:i,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Dh extends Jn{constructor(t=0,e=0,n=1,i=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new Ot){const n=e,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(a?r=0:r=i),this.aClockwise===!0&&!a&&(r===i?r=-i:r=r-i);const o=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,p=c-this.aY;l=d*h-p*u+this.aX,c=d*u+p*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Fd extends Dh{constructor(t,e,n,i,r,a){super(t,e,n,n,i,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Ml(){let s=0,t=0,e=0,n=0;function i(r,a,o,l){s=r,t=o,e=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){i(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,u){let d=(a-r)/c-(o-r)/(c+h)+(o-a)/h,p=(o-a)/h-(l-a)/(h+u)+(l-o)/u;d*=h,p*=h,i(a,o,d,p)},calc:function(r){const a=r*r,o=a*r;return s+t*r+e*a+n*o}}}const Ur=new D,za=new Ml,Oa=new Ml,Ba=new Ml;class Js extends Jn{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new D){const n=e,i=this.points,r=i.length,a=(r-(this.closed?0:1))*t;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=i[(o-1)%r]:(Ur.subVectors(i[0],i[1]).add(i[0]),c=Ur);const u=i[o%r],d=i[(o+1)%r];if(this.closed||o+2<r?h=i[(o+2)%r]:(Ur.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=Ur),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let m=Math.pow(c.distanceToSquared(u),p),v=Math.pow(u.distanceToSquared(d),p),g=Math.pow(d.distanceToSquared(h),p);v<1e-4&&(v=1),m<1e-4&&(m=v),g<1e-4&&(g=v),za.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,m,v,g),Oa.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,m,v,g),Ba.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,m,v,g)}else this.curveType==="catmullrom"&&(za.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),Oa.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),Ba.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(za.calc(l),Oa.calc(l),Ba.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new D().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function dc(s,t,e,n,i){const r=(n-t)*.5,a=(i-e)*.5,o=s*s,l=s*o;return(2*e-2*n+r+a)*l+(-3*e+3*n-2*r-a)*o+r*s+e}function zd(s,t){const e=1-s;return e*e*t}function Od(s,t){return 2*(1-s)*s*t}function Bd(s,t){return s*s*t}function Gs(s,t,e,n){return zd(s,t)+Od(s,e)+Bd(s,n)}function kd(s,t){const e=1-s;return e*e*e*t}function Hd(s,t){const e=1-s;return 3*e*e*s*t}function Vd(s,t){return 3*(1-s)*s*s*t}function Gd(s,t){return s*s*s*t}function Ws(s,t,e,n,i){return kd(s,t)+Hd(s,e)+Vd(s,n)+Gd(s,i)}class Wd extends Jn{constructor(t=new Ot,e=new Ot,n=new Ot,i=new Ot){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new Ot){const n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Ws(t,i.x,r.x,a.x,o.x),Ws(t,i.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Xd extends Jn{constructor(t=new D,e=new D,n=new D,i=new D){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new D){const n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Ws(t,i.x,r.x,a.x,o.x),Ws(t,i.y,r.y,a.y,o.y),Ws(t,i.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class $d extends Jn{constructor(t=new Ot,e=new Ot){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new Ot){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Ot){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class qd extends Jn{constructor(t=new D,e=new D){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new D){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new D){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Yd extends Jn{constructor(t=new Ot,e=new Ot,n=new Ot){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new Ot){const n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(Gs(t,i.x,r.x,a.x),Gs(t,i.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Lh extends Jn{constructor(t=new D,e=new D,n=new D){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new D){const n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(Gs(t,i.x,r.x,a.x),Gs(t,i.y,r.y,a.y),Gs(t,i.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class jd extends Jn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new Ot){const n=e,i=this.points,r=(i.length-1)*t,a=Math.floor(r),o=r-a,l=i[a===0?a:a-1],c=i[a],h=i[a>i.length-2?i.length-1:a+1],u=i[a>i.length-3?i.length-1:a+2];return n.set(dc(o,l.x,c.x,h.x,u.x),dc(o,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new Ot().fromArray(i))}return this}}var Kd=Object.freeze({__proto__:null,ArcCurve:Fd,CatmullRomCurve3:Js,CubicBezierCurve:Wd,CubicBezierCurve3:Xd,EllipseCurve:Dh,LineCurve:$d,LineCurve3:qd,QuadraticBezierCurve:Yd,QuadraticBezierCurve3:Lh,SplineCurve:jd});class Ci extends Me{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,u=t/o,d=e/l,p=[],m=[],v=[],g=[];for(let f=0;f<h;f++){const y=f*d-a;for(let w=0;w<c;w++){const _=w*u-r;m.push(_,-y,0),v.push(0,0,1),g.push(w/o),g.push(1-f/l)}}for(let f=0;f<l;f++)for(let y=0;y<o;y++){const w=y+c*f,_=y+c*(f+1),T=y+1+c*(f+1),R=y+1+c*f;p.push(w,_,R),p.push(_,T,R)}this.setIndex(p),this.setAttribute("position",new oe(m,3)),this.setAttribute("normal",new oe(v,3)),this.setAttribute("uv",new oe(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ci(t.width,t.height,t.widthSegments,t.heightSegments)}}class ia extends Me{constructor(t=1,e=32,n=16,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],u=new D,d=new D,p=[],m=[],v=[],g=[];for(let f=0;f<=n;f++){const y=[],w=f/n;let _=0;f===0&&a===0?_=.5/e:f===n&&l===Math.PI&&(_=-.5/e);for(let T=0;T<=e;T++){const R=T/e;u.x=-t*Math.cos(i+R*r)*Math.sin(a+w*o),u.y=t*Math.cos(a+w*o),u.z=t*Math.sin(i+R*r)*Math.sin(a+w*o),m.push(u.x,u.y,u.z),d.copy(u).normalize(),v.push(d.x,d.y,d.z),g.push(R+_,1-w),y.push(c++)}h.push(y)}for(let f=0;f<n;f++)for(let y=0;y<e;y++){const w=h[f][y+1],_=h[f][y],T=h[f+1][y],R=h[f+1][y+1];(f!==0||a>0)&&p.push(w,_,R),(f!==n-1||l<Math.PI)&&p.push(_,T,R)}this.setIndex(p),this.setAttribute("position",new oe(m,3)),this.setAttribute("normal",new oe(v,3)),this.setAttribute("uv",new oe(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ia(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class sa extends Me{constructor(t=new Lh(new D(-1,-1,0),new D(-1,1,0),new D(1,1,0)),e=64,n=1,i=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:i,closed:r};const a=t.computeFrenetFrames(e,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new D,l=new D,c=new Ot;let h=new D;const u=[],d=[],p=[],m=[];v(),this.setIndex(m),this.setAttribute("position",new oe(u,3)),this.setAttribute("normal",new oe(d,3)),this.setAttribute("uv",new oe(p,2));function v(){for(let w=0;w<e;w++)g(w);g(r===!1?e:0),y(),f()}function g(w){h=t.getPointAt(w/e,h);const _=a.normals[w],T=a.binormals[w];for(let R=0;R<=i;R++){const C=R/i*Math.PI*2,I=Math.sin(C),M=-Math.cos(C);l.x=M*_.x+I*T.x,l.y=M*_.y+I*T.y,l.z=M*_.z+I*T.z,l.normalize(),d.push(l.x,l.y,l.z),o.x=h.x+n*l.x,o.y=h.y+n*l.y,o.z=h.z+n*l.z,u.push(o.x,o.y,o.z)}}function f(){for(let w=1;w<=e;w++)for(let _=1;_<=i;_++){const T=(i+1)*(w-1)+(_-1),R=(i+1)*w+(_-1),C=(i+1)*w+_,I=(i+1)*(w-1)+_;m.push(T,R,I),m.push(R,C,I)}}function y(){for(let w=0;w<=e;w++)for(let _=0;_<=i;_++)c.x=w/e,c.y=_/i,p.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new sa(new Kd[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class Oe extends Ii{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new $t(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new $t(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=vh,this.normalScale=new Ot(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Ih extends Oe{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ot(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ie(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new $t(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new $t(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new $t(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class Zd extends Ii{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ru,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Jd extends Ii{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class bl extends Pe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new $t(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class fc extends bl{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Pe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new $t(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const ka=new Kt,pc=new D,mc=new D;class Uh{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ot(512,512),this.mapType=Nn,this.map=null,this.mapPass=null,this.matrix=new Kt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new _l,this._frameExtents=new Ot(1,1),this._viewportCount=1,this._viewports=[new ue(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;pc.setFromMatrixPosition(t.matrixWorld),e.position.copy(pc),mc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(mc),e.updateMatrixWorld(),ka.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ka,e.coordinateSystem,e.reversedDepth),e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ka)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const gc=new Kt,Us=new D,Ha=new D;class Qd extends Uh{constructor(){super(new tn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ot(4,2),this._viewportCount=6,this._viewports=[new ue(2,1,1,1),new ue(0,1,1,1),new ue(3,1,1,1),new ue(1,1,1,1),new ue(3,0,1,1),new ue(1,0,1,1)],this._cubeDirections=[new D(1,0,0),new D(-1,0,0),new D(0,0,1),new D(0,0,-1),new D(0,1,0),new D(0,-1,0)],this._cubeUps=[new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,0,1),new D(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,i=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Us.setFromMatrixPosition(t.matrixWorld),n.position.copy(Us),Ha.copy(n.position),Ha.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Ha),n.updateMatrixWorld(),i.makeTranslation(-Us.x,-Us.y,-Us.z),gc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(gc,n.coordinateSystem,n.reversedDepth)}}class tf extends bl{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Qd}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class Nh extends wh{constructor(t=-1,e=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=i+e,l=i-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class ef extends Uh{constructor(){super(new Nh(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Va extends bl{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Pe.DEFAULT_UP),this.updateMatrix(),this.target=new Pe,this.shadow=new ef}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class nf extends Me{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){const t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}}class sf extends tn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const vc=new Kt;class rf{constructor(t,e,n=0,i=1/0){this.ray=new ta(t,e),this.near=n,this.far=i,this.camera=null,this.layers=new ml,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return vc.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(vc),this}intersectObject(t,e=!0,n=[]){return Zo(t,this,n,e),n.sort(xc),n}intersectObjects(t,e=!0,n=[]){for(let i=0,r=t.length;i<r;i++)Zo(t[i],this,n,e);return n.sort(xc),n}}function xc(s,t){return s.distance-t.distance}function Zo(s,t,e,n){let i=!0;if(s.layers.test(t.layers)&&s.raycast(t,e)===!1&&(i=!1),i===!0&&n===!0){const r=s.children;for(let a=0,o=r.length;a<o;a++)Zo(r[a],t,e,!0)}}function _c(s,t,e,n){const i=af(n);switch(e){case ph:return s*t;case cl:return s*t/i.components*i.byteLength;case hl:return s*t/i.components*i.byteLength;case gh:return s*t*2/i.components*i.byteLength;case ul:return s*t*2/i.components*i.byteLength;case mh:return s*t*3/i.components*i.byteLength;case ln:return s*t*4/i.components*i.byteLength;case dl:return s*t*4/i.components*i.byteLength;case Hr:case Vr:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Gr:case Wr:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case bo:case wo:return Math.max(s,16)*Math.max(t,8)/4;case Mo:case So:return Math.max(s,8)*Math.max(t,8)/2;case Eo:case To:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Ao:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Co:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Ro:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case Po:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case Do:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case Lo:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case Io:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case Uo:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case No:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case Fo:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case zo:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case Oo:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case Bo:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case ko:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case Ho:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case Vo:case Go:case Wo:return Math.ceil(s/4)*Math.ceil(t/4)*16;case Xo:case $o:return Math.ceil(s/4)*Math.ceil(t/4)*8;case qo:case Yo:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function af(s){switch(s){case Nn:case hh:return{byteLength:1,components:1};case $s:case uh:case tr:return{byteLength:2,components:1};case ol:case ll:return{byteLength:2,components:4};case Ri:case al:case An:return{byteLength:4,components:1};case dh:case fh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:rl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=rl);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Fh(){let s=null,t=!1,e=null,n=null;function i(r,a){e(r,a),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function of(s){const t=new WeakMap;function e(o,l){const c=o.array,h=o.usage,u=c.byteLength,d=s.createBuffer();s.bindBuffer(l,d),s.bufferData(l,c,h),o.onUploadCallback();let p;if(c instanceof Float32Array)p=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=s.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=s.HALF_FLOAT:p=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=s.SHORT;else if(c instanceof Uint32Array)p=s.UNSIGNED_INT;else if(c instanceof Int32Array)p=s.INT;else if(c instanceof Int8Array)p=s.BYTE;else if(c instanceof Uint8Array)p=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){const h=l.array,u=l.updateRanges;if(s.bindBuffer(c,o),u.length===0)s.bufferSubData(c,0,h);else{u.sort((p,m)=>p.start-m.start);let d=0;for(let p=1;p<u.length;p++){const m=u[d],v=u[p];v.start<=m.start+m.count+1?m.count=Math.max(m.count,v.start+v.count-m.start):(++d,u[d]=v)}u.length=d+1;for(let p=0,m=u.length;p<m;p++){const v=u[p];s.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(s.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:r,update:a}}var lf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,cf=`#ifdef USE_ALPHAHASH
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
#endif`,hf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,uf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,df=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ff=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,pf=`#ifdef USE_AOMAP
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
#endif`,mf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,gf=`#ifdef USE_BATCHING
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
#endif`,vf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,xf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,_f=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,yf=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Mf=`#ifdef USE_IRIDESCENCE
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
#endif`,bf=`#ifdef USE_BUMPMAP
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
#endif`,Sf=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,wf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ef=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Tf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Af=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Cf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Rf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Pf=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Df=`#define PI 3.141592653589793
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
} // validated`,Lf=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,If=`vec3 transformedNormal = objectNormal;
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
#endif`,Uf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Nf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Ff=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,zf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Of="gl_FragColor = linearToOutputTexel( gl_FragColor );",Bf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,kf=`#ifdef USE_ENVMAP
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
#endif`,Hf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Vf=`#ifdef USE_ENVMAP
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
#endif`,Gf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Wf=`#ifdef USE_ENVMAP
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
#endif`,Xf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,$f=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,qf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Yf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,jf=`#ifdef USE_GRADIENTMAP
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
}`,Kf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Zf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Jf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Qf=`uniform bool receiveShadow;
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
#endif`,tp=`#ifdef USE_ENVMAP
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
#endif`,ep=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,np=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ip=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,sp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,rp=`PhysicalMaterial material;
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
#endif`,ap=`struct PhysicalMaterial {
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
}`,op=`
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
#endif`,lp=`#if defined( RE_IndirectDiffuse )
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
#endif`,cp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,hp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,up=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,dp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,fp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,pp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,mp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,gp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,vp=`#if defined( USE_POINTS_UV )
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
#endif`,xp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,_p=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,yp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Mp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,bp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Sp=`#ifdef USE_MORPHTARGETS
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
#endif`,wp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ep=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Tp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Ap=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Cp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Rp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Pp=`#ifdef USE_NORMALMAP
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
#endif`,Dp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Lp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Ip=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Up=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Np=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Fp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,zp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Op=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Bp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,kp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Hp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Vp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Gp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Wp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Xp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,$p=`float getShadowMask() {
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
}`,qp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Yp=`#ifdef USE_SKINNING
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
#endif`,jp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Kp=`#ifdef USE_SKINNING
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
#endif`,Zp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Jp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Qp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tm=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,em=`#ifdef USE_TRANSMISSION
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
#endif`,nm=`#ifdef USE_TRANSMISSION
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
#endif`,im=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,sm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,rm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,am=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const om=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,lm=`uniform sampler2D t2D;
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
}`,cm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,hm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,um=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,dm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,fm=`#include <common>
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
}`,pm=`#if DEPTH_PACKING == 3200
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
}`,mm=`#define DISTANCE
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
}`,gm=`#define DISTANCE
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
}`,vm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,xm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_m=`uniform float scale;
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
}`,ym=`uniform vec3 diffuse;
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
}`,Mm=`#include <common>
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
}`,bm=`uniform vec3 diffuse;
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
}`,Sm=`#define LAMBERT
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
}`,wm=`#define LAMBERT
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
}`,Em=`#define MATCAP
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
}`,Tm=`#define MATCAP
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
}`,Am=`#define NORMAL
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
}`,Cm=`#define NORMAL
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
}`,Rm=`#define PHONG
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
}`,Pm=`#define PHONG
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
}`,Dm=`#define STANDARD
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
}`,Lm=`#define STANDARD
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
}`,Im=`#define TOON
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
}`,Um=`#define TOON
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
}`,Nm=`uniform float size;
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
}`,Fm=`uniform vec3 diffuse;
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
}`,zm=`#include <common>
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
}`,Om=`uniform vec3 color;
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
}`,Bm=`uniform float rotation;
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
}`,km=`uniform vec3 diffuse;
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
}`,ee={alphahash_fragment:lf,alphahash_pars_fragment:cf,alphamap_fragment:hf,alphamap_pars_fragment:uf,alphatest_fragment:df,alphatest_pars_fragment:ff,aomap_fragment:pf,aomap_pars_fragment:mf,batching_pars_vertex:gf,batching_vertex:vf,begin_vertex:xf,beginnormal_vertex:_f,bsdfs:yf,iridescence_fragment:Mf,bumpmap_pars_fragment:bf,clipping_planes_fragment:Sf,clipping_planes_pars_fragment:wf,clipping_planes_pars_vertex:Ef,clipping_planes_vertex:Tf,color_fragment:Af,color_pars_fragment:Cf,color_pars_vertex:Rf,color_vertex:Pf,common:Df,cube_uv_reflection_fragment:Lf,defaultnormal_vertex:If,displacementmap_pars_vertex:Uf,displacementmap_vertex:Nf,emissivemap_fragment:Ff,emissivemap_pars_fragment:zf,colorspace_fragment:Of,colorspace_pars_fragment:Bf,envmap_fragment:kf,envmap_common_pars_fragment:Hf,envmap_pars_fragment:Vf,envmap_pars_vertex:Gf,envmap_physical_pars_fragment:tp,envmap_vertex:Wf,fog_vertex:Xf,fog_pars_vertex:$f,fog_fragment:qf,fog_pars_fragment:Yf,gradientmap_pars_fragment:jf,lightmap_pars_fragment:Kf,lights_lambert_fragment:Zf,lights_lambert_pars_fragment:Jf,lights_pars_begin:Qf,lights_toon_fragment:ep,lights_toon_pars_fragment:np,lights_phong_fragment:ip,lights_phong_pars_fragment:sp,lights_physical_fragment:rp,lights_physical_pars_fragment:ap,lights_fragment_begin:op,lights_fragment_maps:lp,lights_fragment_end:cp,logdepthbuf_fragment:hp,logdepthbuf_pars_fragment:up,logdepthbuf_pars_vertex:dp,logdepthbuf_vertex:fp,map_fragment:pp,map_pars_fragment:mp,map_particle_fragment:gp,map_particle_pars_fragment:vp,metalnessmap_fragment:xp,metalnessmap_pars_fragment:_p,morphinstance_vertex:yp,morphcolor_vertex:Mp,morphnormal_vertex:bp,morphtarget_pars_vertex:Sp,morphtarget_vertex:wp,normal_fragment_begin:Ep,normal_fragment_maps:Tp,normal_pars_fragment:Ap,normal_pars_vertex:Cp,normal_vertex:Rp,normalmap_pars_fragment:Pp,clearcoat_normal_fragment_begin:Dp,clearcoat_normal_fragment_maps:Lp,clearcoat_pars_fragment:Ip,iridescence_pars_fragment:Up,opaque_fragment:Np,packing:Fp,premultiplied_alpha_fragment:zp,project_vertex:Op,dithering_fragment:Bp,dithering_pars_fragment:kp,roughnessmap_fragment:Hp,roughnessmap_pars_fragment:Vp,shadowmap_pars_fragment:Gp,shadowmap_pars_vertex:Wp,shadowmap_vertex:Xp,shadowmask_pars_fragment:$p,skinbase_vertex:qp,skinning_pars_vertex:Yp,skinning_vertex:jp,skinnormal_vertex:Kp,specularmap_fragment:Zp,specularmap_pars_fragment:Jp,tonemapping_fragment:Qp,tonemapping_pars_fragment:tm,transmission_fragment:em,transmission_pars_fragment:nm,uv_pars_fragment:im,uv_pars_vertex:sm,uv_vertex:rm,worldpos_vertex:am,background_vert:om,background_frag:lm,backgroundCube_vert:cm,backgroundCube_frag:hm,cube_vert:um,cube_frag:dm,depth_vert:fm,depth_frag:pm,distanceRGBA_vert:mm,distanceRGBA_frag:gm,equirect_vert:vm,equirect_frag:xm,linedashed_vert:_m,linedashed_frag:ym,meshbasic_vert:Mm,meshbasic_frag:bm,meshlambert_vert:Sm,meshlambert_frag:wm,meshmatcap_vert:Em,meshmatcap_frag:Tm,meshnormal_vert:Am,meshnormal_frag:Cm,meshphong_vert:Rm,meshphong_frag:Pm,meshphysical_vert:Dm,meshphysical_frag:Lm,meshtoon_vert:Im,meshtoon_frag:Um,points_vert:Nm,points_frag:Fm,shadow_vert:zm,shadow_frag:Om,sprite_vert:Bm,sprite_frag:km},yt={common:{diffuse:{value:new $t(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Jt},alphaMap:{value:null},alphaMapTransform:{value:new Jt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Jt}},envmap:{envMap:{value:null},envMapRotation:{value:new Jt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Jt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Jt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Jt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Jt},normalScale:{value:new Ot(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Jt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Jt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Jt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Jt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new $t(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new $t(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Jt},alphaTest:{value:0},uvTransform:{value:new Jt}},sprite:{diffuse:{value:new $t(16777215)},opacity:{value:1},center:{value:new Ot(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Jt},alphaMap:{value:null},alphaMapTransform:{value:new Jt},alphaTest:{value:0}}},Ln={basic:{uniforms:Je([yt.common,yt.specularmap,yt.envmap,yt.aomap,yt.lightmap,yt.fog]),vertexShader:ee.meshbasic_vert,fragmentShader:ee.meshbasic_frag},lambert:{uniforms:Je([yt.common,yt.specularmap,yt.envmap,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.fog,yt.lights,{emissive:{value:new $t(0)}}]),vertexShader:ee.meshlambert_vert,fragmentShader:ee.meshlambert_frag},phong:{uniforms:Je([yt.common,yt.specularmap,yt.envmap,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.fog,yt.lights,{emissive:{value:new $t(0)},specular:{value:new $t(1118481)},shininess:{value:30}}]),vertexShader:ee.meshphong_vert,fragmentShader:ee.meshphong_frag},standard:{uniforms:Je([yt.common,yt.envmap,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.roughnessmap,yt.metalnessmap,yt.fog,yt.lights,{emissive:{value:new $t(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ee.meshphysical_vert,fragmentShader:ee.meshphysical_frag},toon:{uniforms:Je([yt.common,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.gradientmap,yt.fog,yt.lights,{emissive:{value:new $t(0)}}]),vertexShader:ee.meshtoon_vert,fragmentShader:ee.meshtoon_frag},matcap:{uniforms:Je([yt.common,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.fog,{matcap:{value:null}}]),vertexShader:ee.meshmatcap_vert,fragmentShader:ee.meshmatcap_frag},points:{uniforms:Je([yt.points,yt.fog]),vertexShader:ee.points_vert,fragmentShader:ee.points_frag},dashed:{uniforms:Je([yt.common,yt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ee.linedashed_vert,fragmentShader:ee.linedashed_frag},depth:{uniforms:Je([yt.common,yt.displacementmap]),vertexShader:ee.depth_vert,fragmentShader:ee.depth_frag},normal:{uniforms:Je([yt.common,yt.bumpmap,yt.normalmap,yt.displacementmap,{opacity:{value:1}}]),vertexShader:ee.meshnormal_vert,fragmentShader:ee.meshnormal_frag},sprite:{uniforms:Je([yt.sprite,yt.fog]),vertexShader:ee.sprite_vert,fragmentShader:ee.sprite_frag},background:{uniforms:{uvTransform:{value:new Jt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ee.background_vert,fragmentShader:ee.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Jt}},vertexShader:ee.backgroundCube_vert,fragmentShader:ee.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ee.cube_vert,fragmentShader:ee.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ee.equirect_vert,fragmentShader:ee.equirect_frag},distanceRGBA:{uniforms:Je([yt.common,yt.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ee.distanceRGBA_vert,fragmentShader:ee.distanceRGBA_frag},shadow:{uniforms:Je([yt.lights,yt.fog,{color:{value:new $t(0)},opacity:{value:1}}]),vertexShader:ee.shadow_vert,fragmentShader:ee.shadow_frag}};Ln.physical={uniforms:Je([Ln.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Jt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Jt},clearcoatNormalScale:{value:new Ot(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Jt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Jt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Jt},sheen:{value:0},sheenColor:{value:new $t(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Jt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Jt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Jt},transmissionSamplerSize:{value:new Ot},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Jt},attenuationDistance:{value:0},attenuationColor:{value:new $t(0)},specularColor:{value:new $t(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Jt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Jt},anisotropyVector:{value:new Ot},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Jt}}]),vertexShader:ee.meshphysical_vert,fragmentShader:ee.meshphysical_frag};const Nr={r:0,b:0,g:0},xi=new Fn,Hm=new Kt;function Vm(s,t,e,n,i,r,a){const o=new $t(0);let l=r===!0?0:1,c,h,u=null,d=0,p=null;function m(w){let _=w.isScene===!0?w.background:null;return _&&_.isTexture&&(_=(w.backgroundBlurriness>0?e:t).get(_)),_}function v(w){let _=!1;const T=m(w);T===null?f(o,l):T&&T.isColor&&(f(T,1),_=!0);const R=s.xr.getEnvironmentBlendMode();R==="additive"?n.buffers.color.setClear(0,0,0,1,a):R==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(s.autoClear||_)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function g(w,_){const T=m(_);T&&(T.isCubeTexture||T.mapping===Qr)?(h===void 0&&(h=new ge(new xs(1,1,1),new vn({name:"BackgroundCubeMaterial",uniforms:ms(Ln.backgroundCube.uniforms),vertexShader:Ln.backgroundCube.vertexShader,fragmentShader:Ln.backgroundCube.fragmentShader,side:Ye,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(R,C,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),xi.copy(_.backgroundRotation),xi.x*=-1,xi.y*=-1,xi.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(xi.y*=-1,xi.z*=-1),h.material.uniforms.envMap.value=T,h.material.uniforms.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Hm.makeRotationFromEuler(xi)),h.material.toneMapped=de.getTransfer(T.colorSpace)!==xe,(u!==T||d!==T.version||p!==s.toneMapping)&&(h.material.needsUpdate=!0,u=T,d=T.version,p=s.toneMapping),h.layers.enableAll(),w.unshift(h,h.geometry,h.material,0,0,null)):T&&T.isTexture&&(c===void 0&&(c=new ge(new Ci(2,2),new vn({name:"BackgroundMaterial",uniforms:ms(Ln.background.uniforms),vertexShader:Ln.background.vertexShader,fragmentShader:Ln.background.fragmentShader,side:jn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=T,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.toneMapped=de.getTransfer(T.colorSpace)!==xe,T.matrixAutoUpdate===!0&&T.updateMatrix(),c.material.uniforms.uvTransform.value.copy(T.matrix),(u!==T||d!==T.version||p!==s.toneMapping)&&(c.material.needsUpdate=!0,u=T,d=T.version,p=s.toneMapping),c.layers.enableAll(),w.unshift(c,c.geometry,c.material,0,0,null))}function f(w,_){w.getRGB(Nr,Sh(s)),n.buffers.color.setClear(Nr.r,Nr.g,Nr.b,_,a)}function y(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(w,_=1){o.set(w),l=_,f(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(w){l=w,f(o,l)},render:v,addToRenderList:g,dispose:y}}function Gm(s,t){const e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null);let r=i,a=!1;function o(S,U,N,k,q){let Y=!1;const V=u(k,N,U);r!==V&&(r=V,c(r.object)),Y=p(S,k,N,q),Y&&m(S,k,N,q),q!==null&&t.update(q,s.ELEMENT_ARRAY_BUFFER),(Y||a)&&(a=!1,_(S,U,N,k),q!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(q).buffer))}function l(){return s.createVertexArray()}function c(S){return s.bindVertexArray(S)}function h(S){return s.deleteVertexArray(S)}function u(S,U,N){const k=N.wireframe===!0;let q=n[S.id];q===void 0&&(q={},n[S.id]=q);let Y=q[U.id];Y===void 0&&(Y={},q[U.id]=Y);let V=Y[k];return V===void 0&&(V=d(l()),Y[k]=V),V}function d(S){const U=[],N=[],k=[];for(let q=0;q<e;q++)U[q]=0,N[q]=0,k[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:N,attributeDivisors:k,object:S,attributes:{},index:null}}function p(S,U,N,k){const q=r.attributes,Y=U.attributes;let V=0;const it=N.getAttributes();for(const W in it)if(it[W].location>=0){const at=q[W];let Et=Y[W];if(Et===void 0&&(W==="instanceMatrix"&&S.instanceMatrix&&(Et=S.instanceMatrix),W==="instanceColor"&&S.instanceColor&&(Et=S.instanceColor)),at===void 0||at.attribute!==Et||Et&&at.data!==Et.data)return!0;V++}return r.attributesNum!==V||r.index!==k}function m(S,U,N,k){const q={},Y=U.attributes;let V=0;const it=N.getAttributes();for(const W in it)if(it[W].location>=0){let at=Y[W];at===void 0&&(W==="instanceMatrix"&&S.instanceMatrix&&(at=S.instanceMatrix),W==="instanceColor"&&S.instanceColor&&(at=S.instanceColor));const Et={};Et.attribute=at,at&&at.data&&(Et.data=at.data),q[W]=Et,V++}r.attributes=q,r.attributesNum=V,r.index=k}function v(){const S=r.newAttributes;for(let U=0,N=S.length;U<N;U++)S[U]=0}function g(S){f(S,0)}function f(S,U){const N=r.newAttributes,k=r.enabledAttributes,q=r.attributeDivisors;N[S]=1,k[S]===0&&(s.enableVertexAttribArray(S),k[S]=1),q[S]!==U&&(s.vertexAttribDivisor(S,U),q[S]=U)}function y(){const S=r.newAttributes,U=r.enabledAttributes;for(let N=0,k=U.length;N<k;N++)U[N]!==S[N]&&(s.disableVertexAttribArray(N),U[N]=0)}function w(S,U,N,k,q,Y,V){V===!0?s.vertexAttribIPointer(S,U,N,q,Y):s.vertexAttribPointer(S,U,N,k,q,Y)}function _(S,U,N,k){v();const q=k.attributes,Y=N.getAttributes(),V=U.defaultAttributeValues;for(const it in Y){const W=Y[it];if(W.location>=0){let rt=q[it];if(rt===void 0&&(it==="instanceMatrix"&&S.instanceMatrix&&(rt=S.instanceMatrix),it==="instanceColor"&&S.instanceColor&&(rt=S.instanceColor)),rt!==void 0){const at=rt.normalized,Et=rt.itemSize,Wt=t.get(rt);if(Wt===void 0)continue;const le=Wt.buffer,he=Wt.type,Bt=Wt.bytesPerElement,K=he===s.INT||he===s.UNSIGNED_INT||rt.gpuType===al;if(rt.isInterleavedBufferAttribute){const J=rt.data,ft=J.stride,dt=rt.offset;if(J.isInstancedInterleavedBuffer){for(let St=0;St<W.locationSize;St++)f(W.location+St,J.meshPerAttribute);S.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let St=0;St<W.locationSize;St++)g(W.location+St);s.bindBuffer(s.ARRAY_BUFFER,le);for(let St=0;St<W.locationSize;St++)w(W.location+St,Et/W.locationSize,he,at,ft*Bt,(dt+Et/W.locationSize*St)*Bt,K)}else{if(rt.isInstancedBufferAttribute){for(let J=0;J<W.locationSize;J++)f(W.location+J,rt.meshPerAttribute);S.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let J=0;J<W.locationSize;J++)g(W.location+J);s.bindBuffer(s.ARRAY_BUFFER,le);for(let J=0;J<W.locationSize;J++)w(W.location+J,Et/W.locationSize,he,at,Et*Bt,Et/W.locationSize*J*Bt,K)}}else if(V!==void 0){const at=V[it];if(at!==void 0)switch(at.length){case 2:s.vertexAttrib2fv(W.location,at);break;case 3:s.vertexAttrib3fv(W.location,at);break;case 4:s.vertexAttrib4fv(W.location,at);break;default:s.vertexAttrib1fv(W.location,at)}}}}y()}function T(){I();for(const S in n){const U=n[S];for(const N in U){const k=U[N];for(const q in k)h(k[q].object),delete k[q];delete U[N]}delete n[S]}}function R(S){if(n[S.id]===void 0)return;const U=n[S.id];for(const N in U){const k=U[N];for(const q in k)h(k[q].object),delete k[q];delete U[N]}delete n[S.id]}function C(S){for(const U in n){const N=n[U];if(N[S.id]===void 0)continue;const k=N[S.id];for(const q in k)h(k[q].object),delete k[q];delete N[S.id]}}function I(){M(),a=!0,r!==i&&(r=i,c(r.object))}function M(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:I,resetDefaultState:M,dispose:T,releaseStatesOfGeometry:R,releaseStatesOfProgram:C,initAttributes:v,enableAttribute:g,disableUnusedAttributes:y}}function Wm(s,t,e){let n;function i(c){n=c}function r(c,h){s.drawArrays(n,c,h),e.update(h,n,1)}function a(c,h,u){u!==0&&(s.drawArraysInstanced(n,c,h,u),e.update(h,n,u))}function o(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let p=0;for(let m=0;m<u;m++)p+=h[m];e.update(p,n,1)}function l(c,h,u,d){if(u===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<c.length;m++)a(c[m],h[m],d[m]);else{p.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let m=0;for(let v=0;v<u;v++)m+=h[v]*d[v];e.update(m,n,1)}}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Xm(s,t,e,n){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const C=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(C){return!(C!==ln&&n.convert(C)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){const I=C===tr&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==Nn&&n.convert(C)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==An&&!I)}function l(C){if(C==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,d=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),p=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),m=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),f=s.getParameter(s.MAX_VERTEX_ATTRIBS),y=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),w=s.getParameter(s.MAX_VARYING_VECTORS),_=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),T=m>0,R=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:p,maxVertexTextures:m,maxTextureSize:v,maxCubemapSize:g,maxAttributes:f,maxVertexUniforms:y,maxVaryings:w,maxFragmentUniforms:_,vertexTextures:T,maxSamples:R}}function $m(s){const t=this;let e=null,n=0,i=!1,r=!1;const a=new $n,o=new Jt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const p=u.length!==0||d||n!==0||i;return i=d,n=u.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,p){const m=u.clippingPlanes,v=u.clipIntersection,g=u.clipShadows,f=s.get(u);if(!i||m===null||m.length===0||r&&!g)r?h(null):c();else{const y=r?0:n,w=y*4;let _=f.clippingState||null;l.value=_,_=h(m,d,w,p);for(let T=0;T!==w;++T)_[T]=e[T];f.clippingState=_,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,p,m){const v=u!==null?u.length:0;let g=null;if(v!==0){if(g=l.value,m!==!0||g===null){const f=p+v*4,y=d.matrixWorldInverse;o.getNormalMatrix(y),(g===null||g.length<f)&&(g=new Float32Array(f));for(let w=0,_=p;w!==v;++w,_+=4)a.copy(u[w]).applyMatrix4(y,o),a.normal.toArray(g,_),g[_+3]=a.constant}l.value=g,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,g}}function qm(s){let t=new WeakMap;function e(a,o){return o===xo?a.mapping=us:o===_o&&(a.mapping=ds),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===xo||o===_o)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new wd(l.height);return c.fromEquirectangularTexture(s,a),t.set(a,c),a.addEventListener("dispose",i),e(c.texture,a.mapping)}else return null}}return a}function i(a){const o=a.target;o.removeEventListener("dispose",i);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}const ss=4,yc=[.125,.215,.35,.446,.526,.582],Ei=20,Ga=new Nh,Mc=new $t;let Wa=null,Xa=0,$a=0,qa=!1;const bi=(1+Math.sqrt(5))/2,Qi=1/bi,bc=[new D(-bi,Qi,0),new D(bi,Qi,0),new D(-Qi,0,bi),new D(Qi,0,bi),new D(0,bi,-Qi),new D(0,bi,Qi),new D(-1,1,-1),new D(1,1,-1),new D(-1,1,1),new D(1,1,1)],Ym=new D;class Jo{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100,r={}){const{size:a=256,position:o=Ym}=r;Wa=this._renderer.getRenderTarget(),Xa=this._renderer.getActiveCubeFace(),$a=this._renderer.getActiveMipmapLevel(),qa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,i,l,o),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ec(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=wc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Wa,Xa,$a),this._renderer.xr.enabled=qa,t.scissorTest=!1,Fr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===us||t.mapping===ds?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Wa=this._renderer.getRenderTarget(),Xa=this._renderer.getActiveCubeFace(),$a=this._renderer.getActiveMipmapLevel(),qa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Tn,minFilter:Tn,generateMipmaps:!1,type:tr,format:ln,colorSpace:ps,depthBuffer:!1},i=Sc(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Sc(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=jm(r)),this._blurMaterial=Km(r,t,e)}return i}_compileMaterial(t){const e=new ge(this._lodPlanes[0],t);this._renderer.compile(e,Ga)}_sceneToCubeUV(t,e,n,i,r){const l=new tn(90,1,e,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,p=u.toneMapping;u.getClearColor(Mc),u.toneMapping=ci,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(i),u.clearDepth(),u.setRenderTarget(null));const v=new ea({name:"PMREM.Background",side:Ye,depthWrite:!1,depthTest:!1}),g=new ge(new xs,v);let f=!1;const y=t.background;y?y.isColor&&(v.color.copy(y),t.background=null,f=!0):(v.color.copy(Mc),f=!0);for(let w=0;w<6;w++){const _=w%3;_===0?(l.up.set(0,c[w],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[w],r.y,r.z)):_===1?(l.up.set(0,0,c[w]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[w],r.z)):(l.up.set(0,c[w],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[w]));const T=this._cubeSize;Fr(i,_*T,w>2?T:0,T,T),u.setRenderTarget(i),f&&u.render(g,l),u.render(t,l)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=p,u.autoClear=d,t.background=y}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===us||t.mapping===ds;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ec()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=wc());const r=i?this._cubemapMaterial:this._equirectMaterial,a=new ge(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;Fr(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,Ga)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodPlanes.length;for(let r=1;r<i;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=bc[(i-r-1)%bc.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,i,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,i,"latitudinal",r),this._halfBlur(a,t,n,n,i,"longitudinal",r)}_halfBlur(t,e,n,i,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new ge(this._lodPlanes[i],c),d=c.uniforms,p=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Ei-1),v=r/m,g=isFinite(r)?1+Math.floor(h*v):Ei;g>Ei&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Ei}`);const f=[];let y=0;for(let C=0;C<Ei;++C){const I=C/v,M=Math.exp(-I*I/2);f.push(M),C===0?y+=M:C<g&&(y+=2*M)}for(let C=0;C<f.length;C++)f[C]=f[C]/y;d.envMap.value=t.texture,d.samples.value=g,d.weights.value=f,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:w}=this;d.dTheta.value=m,d.mipInt.value=w-n;const _=this._sizeLods[i],T=3*_*(i>w-ss?i-w+ss:0),R=4*(this._cubeSize-_);Fr(e,T,R,3*_,2*_),l.setRenderTarget(e),l.render(u,Ga)}}function jm(s){const t=[],e=[],n=[];let i=s;const r=s-ss+1+yc.length;for(let a=0;a<r;a++){const o=Math.pow(2,i);e.push(o);let l=1/o;a>s-ss?l=yc[a-s+ss-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],p=6,m=6,v=3,g=2,f=1,y=new Float32Array(v*m*p),w=new Float32Array(g*m*p),_=new Float32Array(f*m*p);for(let R=0;R<p;R++){const C=R%3*2/3-1,I=R>2?0:-1,M=[C,I,0,C+2/3,I,0,C+2/3,I+1,0,C,I,0,C+2/3,I+1,0,C,I+1,0];y.set(M,v*m*R),w.set(d,g*m*R);const S=[R,R,R,R,R,R];_.set(S,f*m*R)}const T=new Me;T.setAttribute("position",new Ne(y,v)),T.setAttribute("uv",new Ne(w,g)),T.setAttribute("faceIndex",new Ne(_,f)),t.push(T),i>ss&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Sc(s,t,e){const n=new Kn(s,t,e);return n.texture.mapping=Qr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Fr(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function Km(s,t,e){const n=new Float32Array(Ei),i=new D(0,1,0);return new vn({name:"SphericalGaussianBlur",defines:{n:Ei,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Sl(),fragmentShader:`

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
		`,blending:li,depthTest:!1,depthWrite:!1})}function wc(){return new vn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Sl(),fragmentShader:`

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
		`,blending:li,depthTest:!1,depthWrite:!1})}function Ec(){return new vn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Sl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:li,depthTest:!1,depthWrite:!1})}function Sl(){return`

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
	`}function Zm(s){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===xo||l===_o,h=l===us||l===ds;if(c||h){let u=t.get(o);const d=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return e===null&&(e=new Jo(s)),u=c?e.fromEquirectangular(o,u):e.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),u.texture;if(u!==void 0)return u.texture;{const p=o.image;return c&&p&&p.height>0||h&&p&&i(p)?(e===null&&(e=new Jo(s)),u=c?e.fromEquirectangular(o):e.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function i(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function Jm(s){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&Zs("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Qm(s,t,e,n){const i={},r=new WeakMap;function a(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const m in d.attributes)t.remove(d.attributes[m]);d.removeEventListener("dispose",a),delete i[d.id];const p=r.get(d);p&&(t.remove(p),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function o(u,d){return i[d.id]===!0||(d.addEventListener("dispose",a),i[d.id]=!0,e.memory.geometries++),d}function l(u){const d=u.attributes;for(const p in d)t.update(d[p],s.ARRAY_BUFFER)}function c(u){const d=[],p=u.index,m=u.attributes.position;let v=0;if(p!==null){const y=p.array;v=p.version;for(let w=0,_=y.length;w<_;w+=3){const T=y[w+0],R=y[w+1],C=y[w+2];d.push(T,R,R,C,C,T)}}else if(m!==void 0){const y=m.array;v=m.version;for(let w=0,_=y.length/3-1;w<_;w+=3){const T=w+0,R=w+1,C=w+2;d.push(T,R,R,C,C,T)}}else return;const g=new(_h(d)?bh:gl)(d,1);g.version=v;const f=r.get(u);f&&t.remove(f),r.set(u,g)}function h(u){const d=r.get(u);if(d){const p=u.index;p!==null&&d.version<p.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function t0(s,t,e){let n;function i(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,p){s.drawElements(n,p,r,d*a),e.update(p,n,1)}function c(d,p,m){m!==0&&(s.drawElementsInstanced(n,p,r,d*a,m),e.update(p,n,m))}function h(d,p,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,d,0,m);let g=0;for(let f=0;f<m;f++)g+=p[f];e.update(g,n,1)}function u(d,p,m,v){if(m===0)return;const g=t.get("WEBGL_multi_draw");if(g===null)for(let f=0;f<d.length;f++)c(d[f]/a,p[f],v[f]);else{g.multiDrawElementsInstancedWEBGL(n,p,0,r,d,0,v,0,m);let f=0;for(let y=0;y<m;y++)f+=p[y]*v[y];e.update(f,n,1)}}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function e0(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case s.TRIANGLES:e.triangles+=o*(r/3);break;case s.LINES:e.lines+=o*(r/2);break;case s.LINE_STRIP:e.lines+=o*(r-1);break;case s.LINE_LOOP:e.lines+=o*r;break;case s.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function n0(s,t,e){const n=new WeakMap,i=new ue;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(o);if(d===void 0||d.count!==u){let S=function(){I.dispose(),n.delete(o),o.removeEventListener("dispose",S)};var p=S;d!==void 0&&d.texture.dispose();const m=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,f=o.morphAttributes.position||[],y=o.morphAttributes.normal||[],w=o.morphAttributes.color||[];let _=0;m===!0&&(_=1),v===!0&&(_=2),g===!0&&(_=3);let T=o.attributes.position.count*_,R=1;T>t.maxTextureSize&&(R=Math.ceil(T/t.maxTextureSize),T=t.maxTextureSize);const C=new Float32Array(T*R*4*u),I=new yh(C,T,R,u);I.type=An,I.needsUpdate=!0;const M=_*4;for(let U=0;U<u;U++){const N=f[U],k=y[U],q=w[U],Y=T*R*4*U;for(let V=0;V<N.count;V++){const it=V*M;m===!0&&(i.fromBufferAttribute(N,V),C[Y+it+0]=i.x,C[Y+it+1]=i.y,C[Y+it+2]=i.z,C[Y+it+3]=0),v===!0&&(i.fromBufferAttribute(k,V),C[Y+it+4]=i.x,C[Y+it+5]=i.y,C[Y+it+6]=i.z,C[Y+it+7]=0),g===!0&&(i.fromBufferAttribute(q,V),C[Y+it+8]=i.x,C[Y+it+9]=i.y,C[Y+it+10]=i.z,C[Y+it+11]=q.itemSize===4?i.w:1)}}d={count:u,texture:I,size:new Ot(T,R)},n.set(o,d),o.addEventListener("dispose",S)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",a.morphTexture,e);else{let m=0;for(let g=0;g<c.length;g++)m+=c[g];const v=o.morphTargetsRelative?1:1-m;l.getUniforms().setValue(s,"morphTargetBaseInfluence",v),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function i0(s,t,e,n){let i=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=t.get(l,h);if(i.get(u)!==c&&(t.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),i.get(l)!==c&&(e.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return u}function a(){i=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:a}}const zh=new je,Tc=new Rh(1,1),Oh=new yh,Bh=new ld,kh=new Eh,Ac=[],Cc=[],Rc=new Float32Array(16),Pc=new Float32Array(9),Dc=new Float32Array(4);function _s(s,t,e){const n=s[0];if(n<=0||n>0)return s;const i=t*e;let r=Ac[i];if(r===void 0&&(r=new Float32Array(i),Ac[i]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,s[a].toArray(r,o)}return r}function He(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function Ve(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function ra(s,t){let e=Cc[t];e===void 0&&(e=new Int32Array(t),Cc[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function s0(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function r0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(He(e,t))return;s.uniform2fv(this.addr,t),Ve(e,t)}}function a0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(He(e,t))return;s.uniform3fv(this.addr,t),Ve(e,t)}}function o0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(He(e,t))return;s.uniform4fv(this.addr,t),Ve(e,t)}}function l0(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(He(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),Ve(e,t)}else{if(He(e,n))return;Dc.set(n),s.uniformMatrix2fv(this.addr,!1,Dc),Ve(e,n)}}function c0(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(He(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),Ve(e,t)}else{if(He(e,n))return;Pc.set(n),s.uniformMatrix3fv(this.addr,!1,Pc),Ve(e,n)}}function h0(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(He(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),Ve(e,t)}else{if(He(e,n))return;Rc.set(n),s.uniformMatrix4fv(this.addr,!1,Rc),Ve(e,n)}}function u0(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function d0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(He(e,t))return;s.uniform2iv(this.addr,t),Ve(e,t)}}function f0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(He(e,t))return;s.uniform3iv(this.addr,t),Ve(e,t)}}function p0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(He(e,t))return;s.uniform4iv(this.addr,t),Ve(e,t)}}function m0(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function g0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(He(e,t))return;s.uniform2uiv(this.addr,t),Ve(e,t)}}function v0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(He(e,t))return;s.uniform3uiv(this.addr,t),Ve(e,t)}}function x0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(He(e,t))return;s.uniform4uiv(this.addr,t),Ve(e,t)}}function _0(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(Tc.compareFunction=xh,r=Tc):r=zh,e.setTexture2D(t||r,i)}function y0(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||Bh,i)}function M0(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||kh,i)}function b0(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||Oh,i)}function S0(s){switch(s){case 5126:return s0;case 35664:return r0;case 35665:return a0;case 35666:return o0;case 35674:return l0;case 35675:return c0;case 35676:return h0;case 5124:case 35670:return u0;case 35667:case 35671:return d0;case 35668:case 35672:return f0;case 35669:case 35673:return p0;case 5125:return m0;case 36294:return g0;case 36295:return v0;case 36296:return x0;case 35678:case 36198:case 36298:case 36306:case 35682:return _0;case 35679:case 36299:case 36307:return y0;case 35680:case 36300:case 36308:case 36293:return M0;case 36289:case 36303:case 36311:case 36292:return b0}}function w0(s,t){s.uniform1fv(this.addr,t)}function E0(s,t){const e=_s(t,this.size,2);s.uniform2fv(this.addr,e)}function T0(s,t){const e=_s(t,this.size,3);s.uniform3fv(this.addr,e)}function A0(s,t){const e=_s(t,this.size,4);s.uniform4fv(this.addr,e)}function C0(s,t){const e=_s(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function R0(s,t){const e=_s(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function P0(s,t){const e=_s(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function D0(s,t){s.uniform1iv(this.addr,t)}function L0(s,t){s.uniform2iv(this.addr,t)}function I0(s,t){s.uniform3iv(this.addr,t)}function U0(s,t){s.uniform4iv(this.addr,t)}function N0(s,t){s.uniform1uiv(this.addr,t)}function F0(s,t){s.uniform2uiv(this.addr,t)}function z0(s,t){s.uniform3uiv(this.addr,t)}function O0(s,t){s.uniform4uiv(this.addr,t)}function B0(s,t,e){const n=this.cache,i=t.length,r=ra(e,i);He(n,r)||(s.uniform1iv(this.addr,r),Ve(n,r));for(let a=0;a!==i;++a)e.setTexture2D(t[a]||zh,r[a])}function k0(s,t,e){const n=this.cache,i=t.length,r=ra(e,i);He(n,r)||(s.uniform1iv(this.addr,r),Ve(n,r));for(let a=0;a!==i;++a)e.setTexture3D(t[a]||Bh,r[a])}function H0(s,t,e){const n=this.cache,i=t.length,r=ra(e,i);He(n,r)||(s.uniform1iv(this.addr,r),Ve(n,r));for(let a=0;a!==i;++a)e.setTextureCube(t[a]||kh,r[a])}function V0(s,t,e){const n=this.cache,i=t.length,r=ra(e,i);He(n,r)||(s.uniform1iv(this.addr,r),Ve(n,r));for(let a=0;a!==i;++a)e.setTexture2DArray(t[a]||Oh,r[a])}function G0(s){switch(s){case 5126:return w0;case 35664:return E0;case 35665:return T0;case 35666:return A0;case 35674:return C0;case 35675:return R0;case 35676:return P0;case 5124:case 35670:return D0;case 35667:case 35671:return L0;case 35668:case 35672:return I0;case 35669:case 35673:return U0;case 5125:return N0;case 36294:return F0;case 36295:return z0;case 36296:return O0;case 35678:case 36198:case 36298:case 36306:case 35682:return B0;case 35679:case 36299:case 36307:return k0;case 35680:case 36300:case 36308:case 36293:return H0;case 36289:case 36303:case 36311:case 36292:return V0}}class W0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=S0(e.type)}}class X0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=G0(e.type)}}class $0{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let r=0,a=i.length;r!==a;++r){const o=i[r];o.setValue(t,e[o.id],n)}}}const Ya=/(\w+)(\])?(\[|\.)?/g;function Lc(s,t){s.seq.push(t),s.map[t.id]=t}function q0(s,t,e){const n=s.name,i=n.length;for(Ya.lastIndex=0;;){const r=Ya.exec(n),a=Ya.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){Lc(e,c===void 0?new W0(o,s,t):new X0(o,s,t));break}else{let u=e.map[o];u===void 0&&(u=new $0(o),Lc(e,u)),e=u}}}class Xr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=t.getActiveUniform(e,i),a=t.getUniformLocation(e,r.name);q0(r,a,this)}}setValue(t,e,n,i){const r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,r=t.length;i!==r;++i){const a=t[i];a.id in e&&n.push(a)}return n}}function Ic(s,t,e){const n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}const Y0=37297;let j0=0;function K0(s,t){const e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=i;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const Uc=new Jt;function Z0(s){de._getMatrix(Uc,de.workingColorSpace,s);const t=`mat3( ${Uc.elements.map(e=>e.toFixed(4))} )`;switch(de.getTransfer(s)){case qr:return[t,"LinearTransferOETF"];case xe:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function Nc(s,t,e){const n=s.getShaderParameter(t,s.COMPILE_STATUS),r=(s.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+K0(s.getShaderSource(t),o)}else return r}function J0(s,t){const e=Z0(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Q0(s,t){let e;switch(t){case Mu:e="Linear";break;case bu:e="Reinhard";break;case Su:e="Cineon";break;case lh:e="ACESFilmic";break;case Eu:e="AgX";break;case Tu:e="Neutral";break;case wu:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const zr=new D;function tg(){de.getLuminanceCoefficients(zr);const s=zr.x.toFixed(4),t=zr.y.toFixed(4),e=zr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function eg(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Bs).join(`
`)}function ng(s){const t=[];for(const e in s){const n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function ig(s,t){const e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(t,i),a=r.name;let o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:s.getAttribLocation(t,a),locationSize:o}}return e}function Bs(s){return s!==""}function Fc(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function zc(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const sg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Qo(s){return s.replace(sg,ag)}const rg=new Map;function ag(s,t){let e=ee[t];if(e===void 0){const n=rg.get(t);if(n!==void 0)e=ee[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Qo(e)}const og=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Oc(s){return s.replace(og,lg)}function lg(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Bc(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function cg(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===rh?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===ah?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Wn&&(t="SHADOWMAP_TYPE_VSM"),t}function hg(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case us:case ds:t="ENVMAP_TYPE_CUBE";break;case Qr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function ug(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case ds:t="ENVMAP_MODE_REFRACTION";break}return t}function dg(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case oh:t="ENVMAP_BLENDING_MULTIPLY";break;case _u:t="ENVMAP_BLENDING_MIX";break;case yu:t="ENVMAP_BLENDING_ADD";break}return t}function fg(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function pg(s,t,e,n){const i=s.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=cg(e),c=hg(e),h=ug(e),u=dg(e),d=fg(e),p=eg(e),m=ng(r),v=i.createProgram();let g,f,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(Bs).join(`
`),g.length>0&&(g+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(Bs).join(`
`),f.length>0&&(f+=`
`)):(g=[Bc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Bs).join(`
`),f=[Bc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ci?"#define TONE_MAPPING":"",e.toneMapping!==ci?ee.tonemapping_pars_fragment:"",e.toneMapping!==ci?Q0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",ee.colorspace_pars_fragment,J0("linearToOutputTexel",e.outputColorSpace),tg(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Bs).join(`
`)),a=Qo(a),a=Fc(a,e),a=zc(a,e),o=Qo(o),o=Fc(o,e),o=zc(o,e),a=Oc(a),o=Oc(o),e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,g=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,f=["#define varying in",e.glslVersion===Ul?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Ul?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const w=y+g+a,_=y+f+o,T=Ic(i,i.VERTEX_SHADER,w),R=Ic(i,i.FRAGMENT_SHADER,_);i.attachShader(v,T),i.attachShader(v,R),e.index0AttributeName!==void 0?i.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(v,0,"position"),i.linkProgram(v);function C(U){if(s.debug.checkShaderErrors){const N=i.getProgramInfoLog(v)||"",k=i.getShaderInfoLog(T)||"",q=i.getShaderInfoLog(R)||"",Y=N.trim(),V=k.trim(),it=q.trim();let W=!0,rt=!0;if(i.getProgramParameter(v,i.LINK_STATUS)===!1)if(W=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,v,T,R);else{const at=Nc(i,T,"vertex"),Et=Nc(i,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(v,i.VALIDATE_STATUS)+`

Material Name: `+U.name+`
Material Type: `+U.type+`

Program Info Log: `+Y+`
`+at+`
`+Et)}else Y!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Y):(V===""||it==="")&&(rt=!1);rt&&(U.diagnostics={runnable:W,programLog:Y,vertexShader:{log:V,prefix:g},fragmentShader:{log:it,prefix:f}})}i.deleteShader(T),i.deleteShader(R),I=new Xr(i,v),M=ig(i,v)}let I;this.getUniforms=function(){return I===void 0&&C(this),I};let M;this.getAttributes=function(){return M===void 0&&C(this),M};let S=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=i.getProgramParameter(v,Y0)),S},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=j0++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=T,this.fragmentShader=R,this}let mg=0;class gg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new vg(t),e.set(t,n)),n}}class vg{constructor(t){this.id=mg++,this.code=t,this.usedTimes=0}}function xg(s,t,e,n,i,r,a){const o=new ml,l=new gg,c=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures;let p=i.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(M){return c.add(M),M===0?"uv":`uv${M}`}function g(M,S,U,N,k){const q=N.fog,Y=k.geometry,V=M.isMeshStandardMaterial?N.environment:null,it=(M.isMeshStandardMaterial?e:t).get(M.envMap||V),W=it&&it.mapping===Qr?it.image.height:null,rt=m[M.type];M.precision!==null&&(p=i.getMaxPrecision(M.precision),p!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",p,"instead."));const at=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,Et=at!==void 0?at.length:0;let Wt=0;Y.morphAttributes.position!==void 0&&(Wt=1),Y.morphAttributes.normal!==void 0&&(Wt=2),Y.morphAttributes.color!==void 0&&(Wt=3);let le,he,Bt,K;if(rt){const re=Ln[rt];le=re.vertexShader,he=re.fragmentShader}else le=M.vertexShader,he=M.fragmentShader,l.update(M),Bt=l.getVertexShaderID(M),K=l.getFragmentShaderID(M);const J=s.getRenderTarget(),ft=s.state.buffers.depth.getReversed(),dt=k.isInstancedMesh===!0,St=k.isBatchedMesh===!0,jt=!!M.map,we=!!M.matcap,L=!!it,fe=!!M.aoMap,qt=!!M.lightMap,Xt=!!M.bumpMap,Dt=!!M.normalMap,_e=!!M.displacementMap,Ct=!!M.emissiveMap,Zt=!!M.metalnessMap,be=!!M.roughnessMap,Se=M.anisotropy>0,A=M.clearcoat>0,x=M.dispersion>0,H=M.iridescence>0,tt=M.sheen>0,st=M.transmission>0,Z=Se&&!!M.anisotropyMap,zt=A&&!!M.clearcoatMap,pt=A&&!!M.clearcoatNormalMap,Lt=A&&!!M.clearcoatRoughnessMap,Nt=H&&!!M.iridescenceMap,lt=H&&!!M.iridescenceThicknessMap,wt=tt&&!!M.sheenColorMap,kt=tt&&!!M.sheenRoughnessMap,Rt=!!M.specularMap,xt=!!M.specularColorMap,Ht=!!M.specularIntensityMap,F=st&&!!M.transmissionMap,ut=st&&!!M.thicknessMap,gt=!!M.gradientMap,At=!!M.alphaMap,ot=M.alphaTest>0,et=!!M.alphaHash,It=!!M.extensions;let Yt=ci;M.toneMapped&&(J===null||J.isXRRenderTarget===!0)&&(Yt=s.toneMapping);const ce={shaderID:rt,shaderType:M.type,shaderName:M.name,vertexShader:le,fragmentShader:he,defines:M.defines,customVertexShaderID:Bt,customFragmentShaderID:K,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:p,batching:St,batchingColor:St&&k._colorsTexture!==null,instancing:dt,instancingColor:dt&&k.instanceColor!==null,instancingMorph:dt&&k.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:J===null?s.outputColorSpace:J.isXRRenderTarget===!0?J.texture.colorSpace:ps,alphaToCoverage:!!M.alphaToCoverage,map:jt,matcap:we,envMap:L,envMapMode:L&&it.mapping,envMapCubeUVHeight:W,aoMap:fe,lightMap:qt,bumpMap:Xt,normalMap:Dt,displacementMap:d&&_e,emissiveMap:Ct,normalMapObjectSpace:Dt&&M.normalMapType===Du,normalMapTangentSpace:Dt&&M.normalMapType===vh,metalnessMap:Zt,roughnessMap:be,anisotropy:Se,anisotropyMap:Z,clearcoat:A,clearcoatMap:zt,clearcoatNormalMap:pt,clearcoatRoughnessMap:Lt,dispersion:x,iridescence:H,iridescenceMap:Nt,iridescenceThicknessMap:lt,sheen:tt,sheenColorMap:wt,sheenRoughnessMap:kt,specularMap:Rt,specularColorMap:xt,specularIntensityMap:Ht,transmission:st,transmissionMap:F,thicknessMap:ut,gradientMap:gt,opaque:M.transparent===!1&&M.blending===os&&M.alphaToCoverage===!1,alphaMap:At,alphaTest:ot,alphaHash:et,combine:M.combine,mapUv:jt&&v(M.map.channel),aoMapUv:fe&&v(M.aoMap.channel),lightMapUv:qt&&v(M.lightMap.channel),bumpMapUv:Xt&&v(M.bumpMap.channel),normalMapUv:Dt&&v(M.normalMap.channel),displacementMapUv:_e&&v(M.displacementMap.channel),emissiveMapUv:Ct&&v(M.emissiveMap.channel),metalnessMapUv:Zt&&v(M.metalnessMap.channel),roughnessMapUv:be&&v(M.roughnessMap.channel),anisotropyMapUv:Z&&v(M.anisotropyMap.channel),clearcoatMapUv:zt&&v(M.clearcoatMap.channel),clearcoatNormalMapUv:pt&&v(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Lt&&v(M.clearcoatRoughnessMap.channel),iridescenceMapUv:Nt&&v(M.iridescenceMap.channel),iridescenceThicknessMapUv:lt&&v(M.iridescenceThicknessMap.channel),sheenColorMapUv:wt&&v(M.sheenColorMap.channel),sheenRoughnessMapUv:kt&&v(M.sheenRoughnessMap.channel),specularMapUv:Rt&&v(M.specularMap.channel),specularColorMapUv:xt&&v(M.specularColorMap.channel),specularIntensityMapUv:Ht&&v(M.specularIntensityMap.channel),transmissionMapUv:F&&v(M.transmissionMap.channel),thicknessMapUv:ut&&v(M.thicknessMap.channel),alphaMapUv:At&&v(M.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(Dt||Se),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!Y.attributes.uv&&(jt||At),fog:!!q,useFog:M.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:M.flatShading===!0&&M.wireframe===!1,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:ft,skinning:k.isSkinnedMesh===!0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:Et,morphTextureStride:Wt,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:M.dithering,shadowMapEnabled:s.shadowMap.enabled&&U.length>0,shadowMapType:s.shadowMap.type,toneMapping:Yt,decodeVideoTexture:jt&&M.map.isVideoTexture===!0&&de.getTransfer(M.map.colorSpace)===xe,decodeVideoTextureEmissive:Ct&&M.emissiveMap.isVideoTexture===!0&&de.getTransfer(M.emissiveMap.colorSpace)===xe,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Le,flipSided:M.side===Ye,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:It&&M.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(It&&M.extensions.multiDraw===!0||St)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return ce.vertexUv1s=c.has(1),ce.vertexUv2s=c.has(2),ce.vertexUv3s=c.has(3),c.clear(),ce}function f(M){const S=[];if(M.shaderID?S.push(M.shaderID):(S.push(M.customVertexShaderID),S.push(M.customFragmentShaderID)),M.defines!==void 0)for(const U in M.defines)S.push(U),S.push(M.defines[U]);return M.isRawShaderMaterial===!1&&(y(S,M),w(S,M),S.push(s.outputColorSpace)),S.push(M.customProgramCacheKey),S.join()}function y(M,S){M.push(S.precision),M.push(S.outputColorSpace),M.push(S.envMapMode),M.push(S.envMapCubeUVHeight),M.push(S.mapUv),M.push(S.alphaMapUv),M.push(S.lightMapUv),M.push(S.aoMapUv),M.push(S.bumpMapUv),M.push(S.normalMapUv),M.push(S.displacementMapUv),M.push(S.emissiveMapUv),M.push(S.metalnessMapUv),M.push(S.roughnessMapUv),M.push(S.anisotropyMapUv),M.push(S.clearcoatMapUv),M.push(S.clearcoatNormalMapUv),M.push(S.clearcoatRoughnessMapUv),M.push(S.iridescenceMapUv),M.push(S.iridescenceThicknessMapUv),M.push(S.sheenColorMapUv),M.push(S.sheenRoughnessMapUv),M.push(S.specularMapUv),M.push(S.specularColorMapUv),M.push(S.specularIntensityMapUv),M.push(S.transmissionMapUv),M.push(S.thicknessMapUv),M.push(S.combine),M.push(S.fogExp2),M.push(S.sizeAttenuation),M.push(S.morphTargetsCount),M.push(S.morphAttributeCount),M.push(S.numDirLights),M.push(S.numPointLights),M.push(S.numSpotLights),M.push(S.numSpotLightMaps),M.push(S.numHemiLights),M.push(S.numRectAreaLights),M.push(S.numDirLightShadows),M.push(S.numPointLightShadows),M.push(S.numSpotLightShadows),M.push(S.numSpotLightShadowsWithMaps),M.push(S.numLightProbes),M.push(S.shadowMapType),M.push(S.toneMapping),M.push(S.numClippingPlanes),M.push(S.numClipIntersection),M.push(S.depthPacking)}function w(M,S){o.disableAll(),S.supportsVertexTextures&&o.enable(0),S.instancing&&o.enable(1),S.instancingColor&&o.enable(2),S.instancingMorph&&o.enable(3),S.matcap&&o.enable(4),S.envMap&&o.enable(5),S.normalMapObjectSpace&&o.enable(6),S.normalMapTangentSpace&&o.enable(7),S.clearcoat&&o.enable(8),S.iridescence&&o.enable(9),S.alphaTest&&o.enable(10),S.vertexColors&&o.enable(11),S.vertexAlphas&&o.enable(12),S.vertexUv1s&&o.enable(13),S.vertexUv2s&&o.enable(14),S.vertexUv3s&&o.enable(15),S.vertexTangents&&o.enable(16),S.anisotropy&&o.enable(17),S.alphaHash&&o.enable(18),S.batching&&o.enable(19),S.dispersion&&o.enable(20),S.batchingColor&&o.enable(21),S.gradientMap&&o.enable(22),M.push(o.mask),o.disableAll(),S.fog&&o.enable(0),S.useFog&&o.enable(1),S.flatShading&&o.enable(2),S.logarithmicDepthBuffer&&o.enable(3),S.reversedDepthBuffer&&o.enable(4),S.skinning&&o.enable(5),S.morphTargets&&o.enable(6),S.morphNormals&&o.enable(7),S.morphColors&&o.enable(8),S.premultipliedAlpha&&o.enable(9),S.shadowMapEnabled&&o.enable(10),S.doubleSided&&o.enable(11),S.flipSided&&o.enable(12),S.useDepthPacking&&o.enable(13),S.dithering&&o.enable(14),S.transmission&&o.enable(15),S.sheen&&o.enable(16),S.opaque&&o.enable(17),S.pointsUvs&&o.enable(18),S.decodeVideoTexture&&o.enable(19),S.decodeVideoTextureEmissive&&o.enable(20),S.alphaToCoverage&&o.enable(21),M.push(o.mask)}function _(M){const S=m[M.type];let U;if(S){const N=Ln[S];U=Kr.clone(N.uniforms)}else U=M.uniforms;return U}function T(M,S){let U;for(let N=0,k=h.length;N<k;N++){const q=h[N];if(q.cacheKey===S){U=q,++U.usedTimes;break}}return U===void 0&&(U=new pg(s,S,M,r),h.push(U)),U}function R(M){if(--M.usedTimes===0){const S=h.indexOf(M);h[S]=h[h.length-1],h.pop(),M.destroy()}}function C(M){l.remove(M)}function I(){l.dispose()}return{getParameters:g,getProgramCacheKey:f,getUniforms:_,acquireProgram:T,releaseProgram:R,releaseShaderCache:C,programs:h,dispose:I}}function _g(){let s=new WeakMap;function t(a){return s.has(a)}function e(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function n(a){s.delete(a)}function i(a,o,l){s.get(a)[o]=l}function r(){s=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:r}}function yg(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function kc(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function Hc(){const s=[];let t=0;const e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function a(u,d,p,m,v,g){let f=s[t];return f===void 0?(f={id:u.id,object:u,geometry:d,material:p,groupOrder:m,renderOrder:u.renderOrder,z:v,group:g},s[t]=f):(f.id=u.id,f.object=u,f.geometry=d,f.material=p,f.groupOrder=m,f.renderOrder=u.renderOrder,f.z=v,f.group=g),t++,f}function o(u,d,p,m,v,g){const f=a(u,d,p,m,v,g);p.transmission>0?n.push(f):p.transparent===!0?i.push(f):e.push(f)}function l(u,d,p,m,v,g){const f=a(u,d,p,m,v,g);p.transmission>0?n.unshift(f):p.transparent===!0?i.unshift(f):e.unshift(f)}function c(u,d){e.length>1&&e.sort(u||yg),n.length>1&&n.sort(d||kc),i.length>1&&i.sort(d||kc)}function h(){for(let u=t,d=s.length;u<d;u++){const p=s[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:o,unshift:l,finish:h,sort:c}}function Mg(){let s=new WeakMap;function t(n,i){const r=s.get(n);let a;return r===void 0?(a=new Hc,s.set(n,[a])):i>=r.length?(a=new Hc,r.push(a)):a=r[i],a}function e(){s=new WeakMap}return{get:t,dispose:e}}function bg(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new D,color:new $t};break;case"SpotLight":e={position:new D,direction:new D,color:new $t,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new D,color:new $t,distance:0,decay:0};break;case"HemisphereLight":e={direction:new D,skyColor:new $t,groundColor:new $t};break;case"RectAreaLight":e={color:new $t,position:new D,halfWidth:new D,halfHeight:new D};break}return s[t.id]=e,e}}}function Sg(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ot};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ot};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ot,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let wg=0;function Eg(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function Tg(s){const t=new bg,e=Sg(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new D);const i=new D,r=new Kt,a=new Kt;function o(c){let h=0,u=0,d=0;for(let M=0;M<9;M++)n.probe[M].set(0,0,0);let p=0,m=0,v=0,g=0,f=0,y=0,w=0,_=0,T=0,R=0,C=0;c.sort(Eg);for(let M=0,S=c.length;M<S;M++){const U=c[M],N=U.color,k=U.intensity,q=U.distance,Y=U.shadow&&U.shadow.map?U.shadow.map.texture:null;if(U.isAmbientLight)h+=N.r*k,u+=N.g*k,d+=N.b*k;else if(U.isLightProbe){for(let V=0;V<9;V++)n.probe[V].addScaledVector(U.sh.coefficients[V],k);C++}else if(U.isDirectionalLight){const V=t.get(U);if(V.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){const it=U.shadow,W=e.get(U);W.shadowIntensity=it.intensity,W.shadowBias=it.bias,W.shadowNormalBias=it.normalBias,W.shadowRadius=it.radius,W.shadowMapSize=it.mapSize,n.directionalShadow[p]=W,n.directionalShadowMap[p]=Y,n.directionalShadowMatrix[p]=U.shadow.matrix,y++}n.directional[p]=V,p++}else if(U.isSpotLight){const V=t.get(U);V.position.setFromMatrixPosition(U.matrixWorld),V.color.copy(N).multiplyScalar(k),V.distance=q,V.coneCos=Math.cos(U.angle),V.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),V.decay=U.decay,n.spot[v]=V;const it=U.shadow;if(U.map&&(n.spotLightMap[T]=U.map,T++,it.updateMatrices(U),U.castShadow&&R++),n.spotLightMatrix[v]=it.matrix,U.castShadow){const W=e.get(U);W.shadowIntensity=it.intensity,W.shadowBias=it.bias,W.shadowNormalBias=it.normalBias,W.shadowRadius=it.radius,W.shadowMapSize=it.mapSize,n.spotShadow[v]=W,n.spotShadowMap[v]=Y,_++}v++}else if(U.isRectAreaLight){const V=t.get(U);V.color.copy(N).multiplyScalar(k),V.halfWidth.set(U.width*.5,0,0),V.halfHeight.set(0,U.height*.5,0),n.rectArea[g]=V,g++}else if(U.isPointLight){const V=t.get(U);if(V.color.copy(U.color).multiplyScalar(U.intensity),V.distance=U.distance,V.decay=U.decay,U.castShadow){const it=U.shadow,W=e.get(U);W.shadowIntensity=it.intensity,W.shadowBias=it.bias,W.shadowNormalBias=it.normalBias,W.shadowRadius=it.radius,W.shadowMapSize=it.mapSize,W.shadowCameraNear=it.camera.near,W.shadowCameraFar=it.camera.far,n.pointShadow[m]=W,n.pointShadowMap[m]=Y,n.pointShadowMatrix[m]=U.shadow.matrix,w++}n.point[m]=V,m++}else if(U.isHemisphereLight){const V=t.get(U);V.skyColor.copy(U.color).multiplyScalar(k),V.groundColor.copy(U.groundColor).multiplyScalar(k),n.hemi[f]=V,f++}}g>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=yt.LTC_FLOAT_1,n.rectAreaLTC2=yt.LTC_FLOAT_2):(n.rectAreaLTC1=yt.LTC_HALF_1,n.rectAreaLTC2=yt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const I=n.hash;(I.directionalLength!==p||I.pointLength!==m||I.spotLength!==v||I.rectAreaLength!==g||I.hemiLength!==f||I.numDirectionalShadows!==y||I.numPointShadows!==w||I.numSpotShadows!==_||I.numSpotMaps!==T||I.numLightProbes!==C)&&(n.directional.length=p,n.spot.length=v,n.rectArea.length=g,n.point.length=m,n.hemi.length=f,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=w,n.pointShadowMap.length=w,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=w,n.spotLightMatrix.length=_+T-R,n.spotLightMap.length=T,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=C,I.directionalLength=p,I.pointLength=m,I.spotLength=v,I.rectAreaLength=g,I.hemiLength=f,I.numDirectionalShadows=y,I.numPointShadows=w,I.numSpotShadows=_,I.numSpotMaps=T,I.numLightProbes=C,n.version=wg++)}function l(c,h){let u=0,d=0,p=0,m=0,v=0;const g=h.matrixWorldInverse;for(let f=0,y=c.length;f<y;f++){const w=c[f];if(w.isDirectionalLight){const _=n.directional[u];_.direction.setFromMatrixPosition(w.matrixWorld),i.setFromMatrixPosition(w.target.matrixWorld),_.direction.sub(i),_.direction.transformDirection(g),u++}else if(w.isSpotLight){const _=n.spot[p];_.position.setFromMatrixPosition(w.matrixWorld),_.position.applyMatrix4(g),_.direction.setFromMatrixPosition(w.matrixWorld),i.setFromMatrixPosition(w.target.matrixWorld),_.direction.sub(i),_.direction.transformDirection(g),p++}else if(w.isRectAreaLight){const _=n.rectArea[m];_.position.setFromMatrixPosition(w.matrixWorld),_.position.applyMatrix4(g),a.identity(),r.copy(w.matrixWorld),r.premultiply(g),a.extractRotation(r),_.halfWidth.set(w.width*.5,0,0),_.halfHeight.set(0,w.height*.5,0),_.halfWidth.applyMatrix4(a),_.halfHeight.applyMatrix4(a),m++}else if(w.isPointLight){const _=n.point[d];_.position.setFromMatrixPosition(w.matrixWorld),_.position.applyMatrix4(g),d++}else if(w.isHemisphereLight){const _=n.hemi[v];_.direction.setFromMatrixPosition(w.matrixWorld),_.direction.transformDirection(g),v++}}}return{setup:o,setupView:l,state:n}}function Vc(s){const t=new Tg(s),e=[],n=[];function i(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function a(h){n.push(h)}function o(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function Ag(s){let t=new WeakMap;function e(i,r=0){const a=t.get(i);let o;return a===void 0?(o=new Vc(s),t.set(i,[o])):r>=a.length?(o=new Vc(s),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}const Cg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Rg=`uniform sampler2D shadow_pass;
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
}`;function Pg(s,t,e){let n=new _l;const i=new Ot,r=new Ot,a=new ue,o=new Zd({depthPacking:Pu}),l=new Jd,c={},h=e.maxTextureSize,u={[jn]:Ye,[Ye]:jn,[Le]:Le},d=new vn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ot},radius:{value:4}},vertexShader:Cg,fragmentShader:Rg}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const m=new Me;m.setAttribute("position",new Ne(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new ge(m,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=rh;let f=this.type;this.render=function(R,C,I){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||R.length===0)return;const M=s.getRenderTarget(),S=s.getActiveCubeFace(),U=s.getActiveMipmapLevel(),N=s.state;N.setBlending(li),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const k=f!==Wn&&this.type===Wn,q=f===Wn&&this.type!==Wn;for(let Y=0,V=R.length;Y<V;Y++){const it=R[Y],W=it.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",it,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;i.copy(W.mapSize);const rt=W.getFrameExtents();if(i.multiply(rt),r.copy(W.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/rt.x),i.x=r.x*rt.x,W.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/rt.y),i.y=r.y*rt.y,W.mapSize.y=r.y)),W.map===null||k===!0||q===!0){const Et=this.type!==Wn?{minFilter:cn,magFilter:cn}:{};W.map!==null&&W.map.dispose(),W.map=new Kn(i.x,i.y,Et),W.map.texture.name=it.name+".shadowMap",W.camera.updateProjectionMatrix()}s.setRenderTarget(W.map),s.clear();const at=W.getViewportCount();for(let Et=0;Et<at;Et++){const Wt=W.getViewport(Et);a.set(r.x*Wt.x,r.y*Wt.y,r.x*Wt.z,r.y*Wt.w),N.viewport(a),W.updateMatrices(it,Et),n=W.getFrustum(),_(C,I,W.camera,it,this.type)}W.isPointLightShadow!==!0&&this.type===Wn&&y(W,I),W.needsUpdate=!1}f=this.type,g.needsUpdate=!1,s.setRenderTarget(M,S,U)};function y(R,C){const I=t.update(v);d.defines.VSM_SAMPLES!==R.blurSamples&&(d.defines.VSM_SAMPLES=R.blurSamples,p.defines.VSM_SAMPLES=R.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new Kn(i.x,i.y)),d.uniforms.shadow_pass.value=R.map.texture,d.uniforms.resolution.value=R.mapSize,d.uniforms.radius.value=R.radius,s.setRenderTarget(R.mapPass),s.clear(),s.renderBufferDirect(C,null,I,d,v,null),p.uniforms.shadow_pass.value=R.mapPass.texture,p.uniforms.resolution.value=R.mapSize,p.uniforms.radius.value=R.radius,s.setRenderTarget(R.map),s.clear(),s.renderBufferDirect(C,null,I,p,v,null)}function w(R,C,I,M){let S=null;const U=I.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(U!==void 0)S=U;else if(S=I.isPointLight===!0?l:o,s.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const N=S.uuid,k=C.uuid;let q=c[N];q===void 0&&(q={},c[N]=q);let Y=q[k];Y===void 0&&(Y=S.clone(),q[k]=Y,C.addEventListener("dispose",T)),S=Y}if(S.visible=C.visible,S.wireframe=C.wireframe,M===Wn?S.side=C.shadowSide!==null?C.shadowSide:C.side:S.side=C.shadowSide!==null?C.shadowSide:u[C.side],S.alphaMap=C.alphaMap,S.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,S.map=C.map,S.clipShadows=C.clipShadows,S.clippingPlanes=C.clippingPlanes,S.clipIntersection=C.clipIntersection,S.displacementMap=C.displacementMap,S.displacementScale=C.displacementScale,S.displacementBias=C.displacementBias,S.wireframeLinewidth=C.wireframeLinewidth,S.linewidth=C.linewidth,I.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const N=s.properties.get(S);N.light=I}return S}function _(R,C,I,M,S){if(R.visible===!1)return;if(R.layers.test(C.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&S===Wn)&&(!R.frustumCulled||n.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,R.matrixWorld);const k=t.update(R),q=R.material;if(Array.isArray(q)){const Y=k.groups;for(let V=0,it=Y.length;V<it;V++){const W=Y[V],rt=q[W.materialIndex];if(rt&&rt.visible){const at=w(R,rt,M,S);R.onBeforeShadow(s,R,C,I,k,at,W),s.renderBufferDirect(I,null,k,at,R,W),R.onAfterShadow(s,R,C,I,k,at,W)}}}else if(q.visible){const Y=w(R,q,M,S);R.onBeforeShadow(s,R,C,I,k,Y,null),s.renderBufferDirect(I,null,k,Y,R,null),R.onAfterShadow(s,R,C,I,k,Y,null)}}const N=R.children;for(let k=0,q=N.length;k<q;k++)_(N[k],C,I,M,S)}function T(R){R.target.removeEventListener("dispose",T);for(const I in c){const M=c[I],S=R.target.uuid;S in M&&(M[S].dispose(),delete M[S])}}}const Dg={[ho]:uo,[fo]:go,[po]:vo,[hs]:mo,[uo]:ho,[go]:fo,[vo]:po,[mo]:hs};function Lg(s,t){function e(){let F=!1;const ut=new ue;let gt=null;const At=new ue(0,0,0,0);return{setMask:function(ot){gt!==ot&&!F&&(s.colorMask(ot,ot,ot,ot),gt=ot)},setLocked:function(ot){F=ot},setClear:function(ot,et,It,Yt,ce){ce===!0&&(ot*=Yt,et*=Yt,It*=Yt),ut.set(ot,et,It,Yt),At.equals(ut)===!1&&(s.clearColor(ot,et,It,Yt),At.copy(ut))},reset:function(){F=!1,gt=null,At.set(-1,0,0,0)}}}function n(){let F=!1,ut=!1,gt=null,At=null,ot=null;return{setReversed:function(et){if(ut!==et){const It=t.get("EXT_clip_control");et?It.clipControlEXT(It.LOWER_LEFT_EXT,It.ZERO_TO_ONE_EXT):It.clipControlEXT(It.LOWER_LEFT_EXT,It.NEGATIVE_ONE_TO_ONE_EXT),ut=et;const Yt=ot;ot=null,this.setClear(Yt)}},getReversed:function(){return ut},setTest:function(et){et?J(s.DEPTH_TEST):ft(s.DEPTH_TEST)},setMask:function(et){gt!==et&&!F&&(s.depthMask(et),gt=et)},setFunc:function(et){if(ut&&(et=Dg[et]),At!==et){switch(et){case ho:s.depthFunc(s.NEVER);break;case uo:s.depthFunc(s.ALWAYS);break;case fo:s.depthFunc(s.LESS);break;case hs:s.depthFunc(s.LEQUAL);break;case po:s.depthFunc(s.EQUAL);break;case mo:s.depthFunc(s.GEQUAL);break;case go:s.depthFunc(s.GREATER);break;case vo:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}At=et}},setLocked:function(et){F=et},setClear:function(et){ot!==et&&(ut&&(et=1-et),s.clearDepth(et),ot=et)},reset:function(){F=!1,gt=null,At=null,ot=null,ut=!1}}}function i(){let F=!1,ut=null,gt=null,At=null,ot=null,et=null,It=null,Yt=null,ce=null;return{setTest:function(re){F||(re?J(s.STENCIL_TEST):ft(s.STENCIL_TEST))},setMask:function(re){ut!==re&&!F&&(s.stencilMask(re),ut=re)},setFunc:function(re,hn,sn){(gt!==re||At!==hn||ot!==sn)&&(s.stencilFunc(re,hn,sn),gt=re,At=hn,ot=sn)},setOp:function(re,hn,sn){(et!==re||It!==hn||Yt!==sn)&&(s.stencilOp(re,hn,sn),et=re,It=hn,Yt=sn)},setLocked:function(re){F=re},setClear:function(re){ce!==re&&(s.clearStencil(re),ce=re)},reset:function(){F=!1,ut=null,gt=null,At=null,ot=null,et=null,It=null,Yt=null,ce=null}}}const r=new e,a=new n,o=new i,l=new WeakMap,c=new WeakMap;let h={},u={},d=new WeakMap,p=[],m=null,v=!1,g=null,f=null,y=null,w=null,_=null,T=null,R=null,C=new $t(0,0,0),I=0,M=!1,S=null,U=null,N=null,k=null,q=null;const Y=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,it=0;const W=s.getParameter(s.VERSION);W.indexOf("WebGL")!==-1?(it=parseFloat(/^WebGL (\d)/.exec(W)[1]),V=it>=1):W.indexOf("OpenGL ES")!==-1&&(it=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),V=it>=2);let rt=null,at={};const Et=s.getParameter(s.SCISSOR_BOX),Wt=s.getParameter(s.VIEWPORT),le=new ue().fromArray(Et),he=new ue().fromArray(Wt);function Bt(F,ut,gt,At){const ot=new Uint8Array(4),et=s.createTexture();s.bindTexture(F,et),s.texParameteri(F,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(F,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let It=0;It<gt;It++)F===s.TEXTURE_3D||F===s.TEXTURE_2D_ARRAY?s.texImage3D(ut,0,s.RGBA,1,1,At,0,s.RGBA,s.UNSIGNED_BYTE,ot):s.texImage2D(ut+It,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,ot);return et}const K={};K[s.TEXTURE_2D]=Bt(s.TEXTURE_2D,s.TEXTURE_2D,1),K[s.TEXTURE_CUBE_MAP]=Bt(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),K[s.TEXTURE_2D_ARRAY]=Bt(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),K[s.TEXTURE_3D]=Bt(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),J(s.DEPTH_TEST),a.setFunc(hs),Xt(!1),Dt(Cl),J(s.CULL_FACE),fe(li);function J(F){h[F]!==!0&&(s.enable(F),h[F]=!0)}function ft(F){h[F]!==!1&&(s.disable(F),h[F]=!1)}function dt(F,ut){return u[F]!==ut?(s.bindFramebuffer(F,ut),u[F]=ut,F===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=ut),F===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=ut),!0):!1}function St(F,ut){let gt=p,At=!1;if(F){gt=d.get(ut),gt===void 0&&(gt=[],d.set(ut,gt));const ot=F.textures;if(gt.length!==ot.length||gt[0]!==s.COLOR_ATTACHMENT0){for(let et=0,It=ot.length;et<It;et++)gt[et]=s.COLOR_ATTACHMENT0+et;gt.length=ot.length,At=!0}}else gt[0]!==s.BACK&&(gt[0]=s.BACK,At=!0);At&&s.drawBuffers(gt)}function jt(F){return m!==F?(s.useProgram(F),m=F,!0):!1}const we={[wi]:s.FUNC_ADD,[nu]:s.FUNC_SUBTRACT,[iu]:s.FUNC_REVERSE_SUBTRACT};we[su]=s.MIN,we[ru]=s.MAX;const L={[au]:s.ZERO,[ou]:s.ONE,[lu]:s.SRC_COLOR,[lo]:s.SRC_ALPHA,[pu]:s.SRC_ALPHA_SATURATE,[du]:s.DST_COLOR,[hu]:s.DST_ALPHA,[cu]:s.ONE_MINUS_SRC_COLOR,[co]:s.ONE_MINUS_SRC_ALPHA,[fu]:s.ONE_MINUS_DST_COLOR,[uu]:s.ONE_MINUS_DST_ALPHA,[mu]:s.CONSTANT_COLOR,[gu]:s.ONE_MINUS_CONSTANT_COLOR,[vu]:s.CONSTANT_ALPHA,[xu]:s.ONE_MINUS_CONSTANT_ALPHA};function fe(F,ut,gt,At,ot,et,It,Yt,ce,re){if(F===li){v===!0&&(ft(s.BLEND),v=!1);return}if(v===!1&&(J(s.BLEND),v=!0),F!==eu){if(F!==g||re!==M){if((f!==wi||_!==wi)&&(s.blendEquation(s.FUNC_ADD),f=wi,_=wi),re)switch(F){case os:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Rl:s.blendFunc(s.ONE,s.ONE);break;case Pl:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Dl:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}else switch(F){case os:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Rl:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case Pl:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Dl:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}y=null,w=null,T=null,R=null,C.set(0,0,0),I=0,g=F,M=re}return}ot=ot||ut,et=et||gt,It=It||At,(ut!==f||ot!==_)&&(s.blendEquationSeparate(we[ut],we[ot]),f=ut,_=ot),(gt!==y||At!==w||et!==T||It!==R)&&(s.blendFuncSeparate(L[gt],L[At],L[et],L[It]),y=gt,w=At,T=et,R=It),(Yt.equals(C)===!1||ce!==I)&&(s.blendColor(Yt.r,Yt.g,Yt.b,ce),C.copy(Yt),I=ce),g=F,M=!1}function qt(F,ut){F.side===Le?ft(s.CULL_FACE):J(s.CULL_FACE);let gt=F.side===Ye;ut&&(gt=!gt),Xt(gt),F.blending===os&&F.transparent===!1?fe(li):fe(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),a.setFunc(F.depthFunc),a.setTest(F.depthTest),a.setMask(F.depthWrite),r.setMask(F.colorWrite);const At=F.stencilWrite;o.setTest(At),At&&(o.setMask(F.stencilWriteMask),o.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),o.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),Ct(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?J(s.SAMPLE_ALPHA_TO_COVERAGE):ft(s.SAMPLE_ALPHA_TO_COVERAGE)}function Xt(F){S!==F&&(F?s.frontFace(s.CW):s.frontFace(s.CCW),S=F)}function Dt(F){F!==Qh?(J(s.CULL_FACE),F!==U&&(F===Cl?s.cullFace(s.BACK):F===tu?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):ft(s.CULL_FACE),U=F}function _e(F){F!==N&&(V&&s.lineWidth(F),N=F)}function Ct(F,ut,gt){F?(J(s.POLYGON_OFFSET_FILL),(k!==ut||q!==gt)&&(s.polygonOffset(ut,gt),k=ut,q=gt)):ft(s.POLYGON_OFFSET_FILL)}function Zt(F){F?J(s.SCISSOR_TEST):ft(s.SCISSOR_TEST)}function be(F){F===void 0&&(F=s.TEXTURE0+Y-1),rt!==F&&(s.activeTexture(F),rt=F)}function Se(F,ut,gt){gt===void 0&&(rt===null?gt=s.TEXTURE0+Y-1:gt=rt);let At=at[gt];At===void 0&&(At={type:void 0,texture:void 0},at[gt]=At),(At.type!==F||At.texture!==ut)&&(rt!==gt&&(s.activeTexture(gt),rt=gt),s.bindTexture(F,ut||K[F]),At.type=F,At.texture=ut)}function A(){const F=at[rt];F!==void 0&&F.type!==void 0&&(s.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function x(){try{s.compressedTexImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function H(){try{s.compressedTexImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function tt(){try{s.texSubImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function st(){try{s.texSubImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Z(){try{s.compressedTexSubImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function zt(){try{s.compressedTexSubImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function pt(){try{s.texStorage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Lt(){try{s.texStorage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Nt(){try{s.texImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function lt(){try{s.texImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function wt(F){le.equals(F)===!1&&(s.scissor(F.x,F.y,F.z,F.w),le.copy(F))}function kt(F){he.equals(F)===!1&&(s.viewport(F.x,F.y,F.z,F.w),he.copy(F))}function Rt(F,ut){let gt=c.get(ut);gt===void 0&&(gt=new WeakMap,c.set(ut,gt));let At=gt.get(F);At===void 0&&(At=s.getUniformBlockIndex(ut,F.name),gt.set(F,At))}function xt(F,ut){const At=c.get(ut).get(F);l.get(ut)!==At&&(s.uniformBlockBinding(ut,At,F.__bindingPointIndex),l.set(ut,At))}function Ht(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),h={},rt=null,at={},u={},d=new WeakMap,p=[],m=null,v=!1,g=null,f=null,y=null,w=null,_=null,T=null,R=null,C=new $t(0,0,0),I=0,M=!1,S=null,U=null,N=null,k=null,q=null,le.set(0,0,s.canvas.width,s.canvas.height),he.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:J,disable:ft,bindFramebuffer:dt,drawBuffers:St,useProgram:jt,setBlending:fe,setMaterial:qt,setFlipSided:Xt,setCullFace:Dt,setLineWidth:_e,setPolygonOffset:Ct,setScissorTest:Zt,activeTexture:be,bindTexture:Se,unbindTexture:A,compressedTexImage2D:x,compressedTexImage3D:H,texImage2D:Nt,texImage3D:lt,updateUBOMapping:Rt,uniformBlockBinding:xt,texStorage2D:pt,texStorage3D:Lt,texSubImage2D:tt,texSubImage3D:st,compressedTexSubImage2D:Z,compressedTexSubImage3D:zt,scissor:wt,viewport:kt,reset:Ht}}function Ig(s,t,e,n,i,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ot,h=new WeakMap;let u;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(A,x){return p?new OffscreenCanvas(A,x):jr("canvas")}function v(A,x,H){let tt=1;const st=Se(A);if((st.width>H||st.height>H)&&(tt=H/Math.max(st.width,st.height)),tt<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const Z=Math.floor(tt*st.width),zt=Math.floor(tt*st.height);u===void 0&&(u=m(Z,zt));const pt=x?m(Z,zt):u;return pt.width=Z,pt.height=zt,pt.getContext("2d").drawImage(A,0,0,Z,zt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+st.width+"x"+st.height+") to ("+Z+"x"+zt+")."),pt}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+st.width+"x"+st.height+")."),A;return A}function g(A){return A.generateMipmaps}function f(A){s.generateMipmap(A)}function y(A){return A.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?s.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function w(A,x,H,tt,st=!1){if(A!==null){if(s[A]!==void 0)return s[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let Z=x;if(x===s.RED&&(H===s.FLOAT&&(Z=s.R32F),H===s.HALF_FLOAT&&(Z=s.R16F),H===s.UNSIGNED_BYTE&&(Z=s.R8)),x===s.RED_INTEGER&&(H===s.UNSIGNED_BYTE&&(Z=s.R8UI),H===s.UNSIGNED_SHORT&&(Z=s.R16UI),H===s.UNSIGNED_INT&&(Z=s.R32UI),H===s.BYTE&&(Z=s.R8I),H===s.SHORT&&(Z=s.R16I),H===s.INT&&(Z=s.R32I)),x===s.RG&&(H===s.FLOAT&&(Z=s.RG32F),H===s.HALF_FLOAT&&(Z=s.RG16F),H===s.UNSIGNED_BYTE&&(Z=s.RG8)),x===s.RG_INTEGER&&(H===s.UNSIGNED_BYTE&&(Z=s.RG8UI),H===s.UNSIGNED_SHORT&&(Z=s.RG16UI),H===s.UNSIGNED_INT&&(Z=s.RG32UI),H===s.BYTE&&(Z=s.RG8I),H===s.SHORT&&(Z=s.RG16I),H===s.INT&&(Z=s.RG32I)),x===s.RGB_INTEGER&&(H===s.UNSIGNED_BYTE&&(Z=s.RGB8UI),H===s.UNSIGNED_SHORT&&(Z=s.RGB16UI),H===s.UNSIGNED_INT&&(Z=s.RGB32UI),H===s.BYTE&&(Z=s.RGB8I),H===s.SHORT&&(Z=s.RGB16I),H===s.INT&&(Z=s.RGB32I)),x===s.RGBA_INTEGER&&(H===s.UNSIGNED_BYTE&&(Z=s.RGBA8UI),H===s.UNSIGNED_SHORT&&(Z=s.RGBA16UI),H===s.UNSIGNED_INT&&(Z=s.RGBA32UI),H===s.BYTE&&(Z=s.RGBA8I),H===s.SHORT&&(Z=s.RGBA16I),H===s.INT&&(Z=s.RGBA32I)),x===s.RGB&&(H===s.UNSIGNED_INT_5_9_9_9_REV&&(Z=s.RGB9_E5),H===s.UNSIGNED_INT_10F_11F_11F_REV&&(Z=s.R11F_G11F_B10F)),x===s.RGBA){const zt=st?qr:de.getTransfer(tt);H===s.FLOAT&&(Z=s.RGBA32F),H===s.HALF_FLOAT&&(Z=s.RGBA16F),H===s.UNSIGNED_BYTE&&(Z=zt===xe?s.SRGB8_ALPHA8:s.RGBA8),H===s.UNSIGNED_SHORT_4_4_4_4&&(Z=s.RGBA4),H===s.UNSIGNED_SHORT_5_5_5_1&&(Z=s.RGB5_A1)}return(Z===s.R16F||Z===s.R32F||Z===s.RG16F||Z===s.RG32F||Z===s.RGBA16F||Z===s.RGBA32F)&&t.get("EXT_color_buffer_float"),Z}function _(A,x){let H;return A?x===null||x===Ri||x===qs?H=s.DEPTH24_STENCIL8:x===An?H=s.DEPTH32F_STENCIL8:x===$s&&(H=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===Ri||x===qs?H=s.DEPTH_COMPONENT24:x===An?H=s.DEPTH_COMPONENT32F:x===$s&&(H=s.DEPTH_COMPONENT16),H}function T(A,x){return g(A)===!0||A.isFramebufferTexture&&A.minFilter!==cn&&A.minFilter!==Tn?Math.log2(Math.max(x.width,x.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?x.mipmaps.length:1}function R(A){const x=A.target;x.removeEventListener("dispose",R),I(x),x.isVideoTexture&&h.delete(x)}function C(A){const x=A.target;x.removeEventListener("dispose",C),S(x)}function I(A){const x=n.get(A);if(x.__webglInit===void 0)return;const H=A.source,tt=d.get(H);if(tt){const st=tt[x.__cacheKey];st.usedTimes--,st.usedTimes===0&&M(A),Object.keys(tt).length===0&&d.delete(H)}n.remove(A)}function M(A){const x=n.get(A);s.deleteTexture(x.__webglTexture);const H=A.source,tt=d.get(H);delete tt[x.__cacheKey],a.memory.textures--}function S(A){const x=n.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),n.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let tt=0;tt<6;tt++){if(Array.isArray(x.__webglFramebuffer[tt]))for(let st=0;st<x.__webglFramebuffer[tt].length;st++)s.deleteFramebuffer(x.__webglFramebuffer[tt][st]);else s.deleteFramebuffer(x.__webglFramebuffer[tt]);x.__webglDepthbuffer&&s.deleteRenderbuffer(x.__webglDepthbuffer[tt])}else{if(Array.isArray(x.__webglFramebuffer))for(let tt=0;tt<x.__webglFramebuffer.length;tt++)s.deleteFramebuffer(x.__webglFramebuffer[tt]);else s.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&s.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&s.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let tt=0;tt<x.__webglColorRenderbuffer.length;tt++)x.__webglColorRenderbuffer[tt]&&s.deleteRenderbuffer(x.__webglColorRenderbuffer[tt]);x.__webglDepthRenderbuffer&&s.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const H=A.textures;for(let tt=0,st=H.length;tt<st;tt++){const Z=n.get(H[tt]);Z.__webglTexture&&(s.deleteTexture(Z.__webglTexture),a.memory.textures--),n.remove(H[tt])}n.remove(A)}let U=0;function N(){U=0}function k(){const A=U;return A>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+i.maxTextures),U+=1,A}function q(A){const x=[];return x.push(A.wrapS),x.push(A.wrapT),x.push(A.wrapR||0),x.push(A.magFilter),x.push(A.minFilter),x.push(A.anisotropy),x.push(A.internalFormat),x.push(A.format),x.push(A.type),x.push(A.generateMipmaps),x.push(A.premultiplyAlpha),x.push(A.flipY),x.push(A.unpackAlignment),x.push(A.colorSpace),x.join()}function Y(A,x){const H=n.get(A);if(A.isVideoTexture&&Zt(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&H.__version!==A.version){const tt=A.image;if(tt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(tt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{K(H,A,x);return}}else A.isExternalTexture&&(H.__webglTexture=A.sourceTexture?A.sourceTexture:null);e.bindTexture(s.TEXTURE_2D,H.__webglTexture,s.TEXTURE0+x)}function V(A,x){const H=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&H.__version!==A.version){K(H,A,x);return}e.bindTexture(s.TEXTURE_2D_ARRAY,H.__webglTexture,s.TEXTURE0+x)}function it(A,x){const H=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&H.__version!==A.version){K(H,A,x);return}e.bindTexture(s.TEXTURE_3D,H.__webglTexture,s.TEXTURE0+x)}function W(A,x){const H=n.get(A);if(A.version>0&&H.__version!==A.version){J(H,A,x);return}e.bindTexture(s.TEXTURE_CUBE_MAP,H.__webglTexture,s.TEXTURE0+x)}const rt={[fs]:s.REPEAT,[Ti]:s.CLAMP_TO_EDGE,[yo]:s.MIRRORED_REPEAT},at={[cn]:s.NEAREST,[Cu]:s.NEAREST_MIPMAP_NEAREST,[lr]:s.NEAREST_MIPMAP_LINEAR,[Tn]:s.LINEAR,[ua]:s.LINEAR_MIPMAP_NEAREST,[oi]:s.LINEAR_MIPMAP_LINEAR},Et={[Lu]:s.NEVER,[Ou]:s.ALWAYS,[Iu]:s.LESS,[xh]:s.LEQUAL,[Uu]:s.EQUAL,[zu]:s.GEQUAL,[Nu]:s.GREATER,[Fu]:s.NOTEQUAL};function Wt(A,x){if(x.type===An&&t.has("OES_texture_float_linear")===!1&&(x.magFilter===Tn||x.magFilter===ua||x.magFilter===lr||x.magFilter===oi||x.minFilter===Tn||x.minFilter===ua||x.minFilter===lr||x.minFilter===oi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(A,s.TEXTURE_WRAP_S,rt[x.wrapS]),s.texParameteri(A,s.TEXTURE_WRAP_T,rt[x.wrapT]),(A===s.TEXTURE_3D||A===s.TEXTURE_2D_ARRAY)&&s.texParameteri(A,s.TEXTURE_WRAP_R,rt[x.wrapR]),s.texParameteri(A,s.TEXTURE_MAG_FILTER,at[x.magFilter]),s.texParameteri(A,s.TEXTURE_MIN_FILTER,at[x.minFilter]),x.compareFunction&&(s.texParameteri(A,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(A,s.TEXTURE_COMPARE_FUNC,Et[x.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===cn||x.minFilter!==lr&&x.minFilter!==oi||x.type===An&&t.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){const H=t.get("EXT_texture_filter_anisotropic");s.texParameterf(A,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,i.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function le(A,x){let H=!1;A.__webglInit===void 0&&(A.__webglInit=!0,x.addEventListener("dispose",R));const tt=x.source;let st=d.get(tt);st===void 0&&(st={},d.set(tt,st));const Z=q(x);if(Z!==A.__cacheKey){st[Z]===void 0&&(st[Z]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,H=!0),st[Z].usedTimes++;const zt=st[A.__cacheKey];zt!==void 0&&(st[A.__cacheKey].usedTimes--,zt.usedTimes===0&&M(x)),A.__cacheKey=Z,A.__webglTexture=st[Z].texture}return H}function he(A,x,H){return Math.floor(Math.floor(A/H)/x)}function Bt(A,x,H,tt){const Z=A.updateRanges;if(Z.length===0)e.texSubImage2D(s.TEXTURE_2D,0,0,0,x.width,x.height,H,tt,x.data);else{Z.sort((lt,wt)=>lt.start-wt.start);let zt=0;for(let lt=1;lt<Z.length;lt++){const wt=Z[zt],kt=Z[lt],Rt=wt.start+wt.count,xt=he(kt.start,x.width,4),Ht=he(wt.start,x.width,4);kt.start<=Rt+1&&xt===Ht&&he(kt.start+kt.count-1,x.width,4)===xt?wt.count=Math.max(wt.count,kt.start+kt.count-wt.start):(++zt,Z[zt]=kt)}Z.length=zt+1;const pt=s.getParameter(s.UNPACK_ROW_LENGTH),Lt=s.getParameter(s.UNPACK_SKIP_PIXELS),Nt=s.getParameter(s.UNPACK_SKIP_ROWS);s.pixelStorei(s.UNPACK_ROW_LENGTH,x.width);for(let lt=0,wt=Z.length;lt<wt;lt++){const kt=Z[lt],Rt=Math.floor(kt.start/4),xt=Math.ceil(kt.count/4),Ht=Rt%x.width,F=Math.floor(Rt/x.width),ut=xt,gt=1;s.pixelStorei(s.UNPACK_SKIP_PIXELS,Ht),s.pixelStorei(s.UNPACK_SKIP_ROWS,F),e.texSubImage2D(s.TEXTURE_2D,0,Ht,F,ut,gt,H,tt,x.data)}A.clearUpdateRanges(),s.pixelStorei(s.UNPACK_ROW_LENGTH,pt),s.pixelStorei(s.UNPACK_SKIP_PIXELS,Lt),s.pixelStorei(s.UNPACK_SKIP_ROWS,Nt)}}function K(A,x,H){let tt=s.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(tt=s.TEXTURE_2D_ARRAY),x.isData3DTexture&&(tt=s.TEXTURE_3D);const st=le(A,x),Z=x.source;e.bindTexture(tt,A.__webglTexture,s.TEXTURE0+H);const zt=n.get(Z);if(Z.version!==zt.__version||st===!0){e.activeTexture(s.TEXTURE0+H);const pt=de.getPrimaries(de.workingColorSpace),Lt=x.colorSpace===qn?null:de.getPrimaries(x.colorSpace),Nt=x.colorSpace===qn||pt===Lt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,x.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,x.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Nt);let lt=v(x.image,!1,i.maxTextureSize);lt=be(x,lt);const wt=r.convert(x.format,x.colorSpace),kt=r.convert(x.type);let Rt=w(x.internalFormat,wt,kt,x.colorSpace,x.isVideoTexture);Wt(tt,x);let xt;const Ht=x.mipmaps,F=x.isVideoTexture!==!0,ut=zt.__version===void 0||st===!0,gt=Z.dataReady,At=T(x,lt);if(x.isDepthTexture)Rt=_(x.format===js,x.type),ut&&(F?e.texStorage2D(s.TEXTURE_2D,1,Rt,lt.width,lt.height):e.texImage2D(s.TEXTURE_2D,0,Rt,lt.width,lt.height,0,wt,kt,null));else if(x.isDataTexture)if(Ht.length>0){F&&ut&&e.texStorage2D(s.TEXTURE_2D,At,Rt,Ht[0].width,Ht[0].height);for(let ot=0,et=Ht.length;ot<et;ot++)xt=Ht[ot],F?gt&&e.texSubImage2D(s.TEXTURE_2D,ot,0,0,xt.width,xt.height,wt,kt,xt.data):e.texImage2D(s.TEXTURE_2D,ot,Rt,xt.width,xt.height,0,wt,kt,xt.data);x.generateMipmaps=!1}else F?(ut&&e.texStorage2D(s.TEXTURE_2D,At,Rt,lt.width,lt.height),gt&&Bt(x,lt,wt,kt)):e.texImage2D(s.TEXTURE_2D,0,Rt,lt.width,lt.height,0,wt,kt,lt.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){F&&ut&&e.texStorage3D(s.TEXTURE_2D_ARRAY,At,Rt,Ht[0].width,Ht[0].height,lt.depth);for(let ot=0,et=Ht.length;ot<et;ot++)if(xt=Ht[ot],x.format!==ln)if(wt!==null)if(F){if(gt)if(x.layerUpdates.size>0){const It=_c(xt.width,xt.height,x.format,x.type);for(const Yt of x.layerUpdates){const ce=xt.data.subarray(Yt*It/xt.data.BYTES_PER_ELEMENT,(Yt+1)*It/xt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ot,0,0,Yt,xt.width,xt.height,1,wt,ce)}x.clearLayerUpdates()}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ot,0,0,0,xt.width,xt.height,lt.depth,wt,xt.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,ot,Rt,xt.width,xt.height,lt.depth,0,xt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else F?gt&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,ot,0,0,0,xt.width,xt.height,lt.depth,wt,kt,xt.data):e.texImage3D(s.TEXTURE_2D_ARRAY,ot,Rt,xt.width,xt.height,lt.depth,0,wt,kt,xt.data)}else{F&&ut&&e.texStorage2D(s.TEXTURE_2D,At,Rt,Ht[0].width,Ht[0].height);for(let ot=0,et=Ht.length;ot<et;ot++)xt=Ht[ot],x.format!==ln?wt!==null?F?gt&&e.compressedTexSubImage2D(s.TEXTURE_2D,ot,0,0,xt.width,xt.height,wt,xt.data):e.compressedTexImage2D(s.TEXTURE_2D,ot,Rt,xt.width,xt.height,0,xt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):F?gt&&e.texSubImage2D(s.TEXTURE_2D,ot,0,0,xt.width,xt.height,wt,kt,xt.data):e.texImage2D(s.TEXTURE_2D,ot,Rt,xt.width,xt.height,0,wt,kt,xt.data)}else if(x.isDataArrayTexture)if(F){if(ut&&e.texStorage3D(s.TEXTURE_2D_ARRAY,At,Rt,lt.width,lt.height,lt.depth),gt)if(x.layerUpdates.size>0){const ot=_c(lt.width,lt.height,x.format,x.type);for(const et of x.layerUpdates){const It=lt.data.subarray(et*ot/lt.data.BYTES_PER_ELEMENT,(et+1)*ot/lt.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,et,lt.width,lt.height,1,wt,kt,It)}x.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,lt.width,lt.height,lt.depth,wt,kt,lt.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,Rt,lt.width,lt.height,lt.depth,0,wt,kt,lt.data);else if(x.isData3DTexture)F?(ut&&e.texStorage3D(s.TEXTURE_3D,At,Rt,lt.width,lt.height,lt.depth),gt&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,lt.width,lt.height,lt.depth,wt,kt,lt.data)):e.texImage3D(s.TEXTURE_3D,0,Rt,lt.width,lt.height,lt.depth,0,wt,kt,lt.data);else if(x.isFramebufferTexture){if(ut)if(F)e.texStorage2D(s.TEXTURE_2D,At,Rt,lt.width,lt.height);else{let ot=lt.width,et=lt.height;for(let It=0;It<At;It++)e.texImage2D(s.TEXTURE_2D,It,Rt,ot,et,0,wt,kt,null),ot>>=1,et>>=1}}else if(Ht.length>0){if(F&&ut){const ot=Se(Ht[0]);e.texStorage2D(s.TEXTURE_2D,At,Rt,ot.width,ot.height)}for(let ot=0,et=Ht.length;ot<et;ot++)xt=Ht[ot],F?gt&&e.texSubImage2D(s.TEXTURE_2D,ot,0,0,wt,kt,xt):e.texImage2D(s.TEXTURE_2D,ot,Rt,wt,kt,xt);x.generateMipmaps=!1}else if(F){if(ut){const ot=Se(lt);e.texStorage2D(s.TEXTURE_2D,At,Rt,ot.width,ot.height)}gt&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,wt,kt,lt)}else e.texImage2D(s.TEXTURE_2D,0,Rt,wt,kt,lt);g(x)&&f(tt),zt.__version=Z.version,x.onUpdate&&x.onUpdate(x)}A.__version=x.version}function J(A,x,H){if(x.image.length!==6)return;const tt=le(A,x),st=x.source;e.bindTexture(s.TEXTURE_CUBE_MAP,A.__webglTexture,s.TEXTURE0+H);const Z=n.get(st);if(st.version!==Z.__version||tt===!0){e.activeTexture(s.TEXTURE0+H);const zt=de.getPrimaries(de.workingColorSpace),pt=x.colorSpace===qn?null:de.getPrimaries(x.colorSpace),Lt=x.colorSpace===qn||zt===pt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,x.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,x.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Lt);const Nt=x.isCompressedTexture||x.image[0].isCompressedTexture,lt=x.image[0]&&x.image[0].isDataTexture,wt=[];for(let et=0;et<6;et++)!Nt&&!lt?wt[et]=v(x.image[et],!0,i.maxCubemapSize):wt[et]=lt?x.image[et].image:x.image[et],wt[et]=be(x,wt[et]);const kt=wt[0],Rt=r.convert(x.format,x.colorSpace),xt=r.convert(x.type),Ht=w(x.internalFormat,Rt,xt,x.colorSpace),F=x.isVideoTexture!==!0,ut=Z.__version===void 0||tt===!0,gt=st.dataReady;let At=T(x,kt);Wt(s.TEXTURE_CUBE_MAP,x);let ot;if(Nt){F&&ut&&e.texStorage2D(s.TEXTURE_CUBE_MAP,At,Ht,kt.width,kt.height);for(let et=0;et<6;et++){ot=wt[et].mipmaps;for(let It=0;It<ot.length;It++){const Yt=ot[It];x.format!==ln?Rt!==null?F?gt&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+et,It,0,0,Yt.width,Yt.height,Rt,Yt.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+et,It,Ht,Yt.width,Yt.height,0,Yt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):F?gt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+et,It,0,0,Yt.width,Yt.height,Rt,xt,Yt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+et,It,Ht,Yt.width,Yt.height,0,Rt,xt,Yt.data)}}}else{if(ot=x.mipmaps,F&&ut){ot.length>0&&At++;const et=Se(wt[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,At,Ht,et.width,et.height)}for(let et=0;et<6;et++)if(lt){F?gt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,0,0,wt[et].width,wt[et].height,Rt,xt,wt[et].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,Ht,wt[et].width,wt[et].height,0,Rt,xt,wt[et].data);for(let It=0;It<ot.length;It++){const ce=ot[It].image[et].image;F?gt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+et,It+1,0,0,ce.width,ce.height,Rt,xt,ce.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+et,It+1,Ht,ce.width,ce.height,0,Rt,xt,ce.data)}}else{F?gt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,0,0,Rt,xt,wt[et]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,Ht,Rt,xt,wt[et]);for(let It=0;It<ot.length;It++){const Yt=ot[It];F?gt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+et,It+1,0,0,Rt,xt,Yt.image[et]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+et,It+1,Ht,Rt,xt,Yt.image[et])}}}g(x)&&f(s.TEXTURE_CUBE_MAP),Z.__version=st.version,x.onUpdate&&x.onUpdate(x)}A.__version=x.version}function ft(A,x,H,tt,st,Z){const zt=r.convert(H.format,H.colorSpace),pt=r.convert(H.type),Lt=w(H.internalFormat,zt,pt,H.colorSpace),Nt=n.get(x),lt=n.get(H);if(lt.__renderTarget=x,!Nt.__hasExternalTextures){const wt=Math.max(1,x.width>>Z),kt=Math.max(1,x.height>>Z);st===s.TEXTURE_3D||st===s.TEXTURE_2D_ARRAY?e.texImage3D(st,Z,Lt,wt,kt,x.depth,0,zt,pt,null):e.texImage2D(st,Z,Lt,wt,kt,0,zt,pt,null)}e.bindFramebuffer(s.FRAMEBUFFER,A),Ct(x)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,tt,st,lt.__webglTexture,0,_e(x)):(st===s.TEXTURE_2D||st>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&st<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,tt,st,lt.__webglTexture,Z),e.bindFramebuffer(s.FRAMEBUFFER,null)}function dt(A,x,H){if(s.bindRenderbuffer(s.RENDERBUFFER,A),x.depthBuffer){const tt=x.depthTexture,st=tt&&tt.isDepthTexture?tt.type:null,Z=_(x.stencilBuffer,st),zt=x.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,pt=_e(x);Ct(x)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,pt,Z,x.width,x.height):H?s.renderbufferStorageMultisample(s.RENDERBUFFER,pt,Z,x.width,x.height):s.renderbufferStorage(s.RENDERBUFFER,Z,x.width,x.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,zt,s.RENDERBUFFER,A)}else{const tt=x.textures;for(let st=0;st<tt.length;st++){const Z=tt[st],zt=r.convert(Z.format,Z.colorSpace),pt=r.convert(Z.type),Lt=w(Z.internalFormat,zt,pt,Z.colorSpace),Nt=_e(x);H&&Ct(x)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Nt,Lt,x.width,x.height):Ct(x)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Nt,Lt,x.width,x.height):s.renderbufferStorage(s.RENDERBUFFER,Lt,x.width,x.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function St(A,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,A),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const tt=n.get(x.depthTexture);tt.__renderTarget=x,(!tt.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),Y(x.depthTexture,0);const st=tt.__webglTexture,Z=_e(x);if(x.depthTexture.format===Ys)Ct(x)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,st,0,Z):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,st,0);else if(x.depthTexture.format===js)Ct(x)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,st,0,Z):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,st,0);else throw new Error("Unknown depthTexture format")}function jt(A){const x=n.get(A),H=A.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==A.depthTexture){const tt=A.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),tt){const st=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,tt.removeEventListener("dispose",st)};tt.addEventListener("dispose",st),x.__depthDisposeCallback=st}x.__boundDepthTexture=tt}if(A.depthTexture&&!x.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");const tt=A.texture.mipmaps;tt&&tt.length>0?St(x.__webglFramebuffer[0],A):St(x.__webglFramebuffer,A)}else if(H){x.__webglDepthbuffer=[];for(let tt=0;tt<6;tt++)if(e.bindFramebuffer(s.FRAMEBUFFER,x.__webglFramebuffer[tt]),x.__webglDepthbuffer[tt]===void 0)x.__webglDepthbuffer[tt]=s.createRenderbuffer(),dt(x.__webglDepthbuffer[tt],A,!1);else{const st=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Z=x.__webglDepthbuffer[tt];s.bindRenderbuffer(s.RENDERBUFFER,Z),s.framebufferRenderbuffer(s.FRAMEBUFFER,st,s.RENDERBUFFER,Z)}}else{const tt=A.texture.mipmaps;if(tt&&tt.length>0?e.bindFramebuffer(s.FRAMEBUFFER,x.__webglFramebuffer[0]):e.bindFramebuffer(s.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=s.createRenderbuffer(),dt(x.__webglDepthbuffer,A,!1);else{const st=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Z=x.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,Z),s.framebufferRenderbuffer(s.FRAMEBUFFER,st,s.RENDERBUFFER,Z)}}e.bindFramebuffer(s.FRAMEBUFFER,null)}function we(A,x,H){const tt=n.get(A);x!==void 0&&ft(tt.__webglFramebuffer,A,A.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),H!==void 0&&jt(A)}function L(A){const x=A.texture,H=n.get(A),tt=n.get(x);A.addEventListener("dispose",C);const st=A.textures,Z=A.isWebGLCubeRenderTarget===!0,zt=st.length>1;if(zt||(tt.__webglTexture===void 0&&(tt.__webglTexture=s.createTexture()),tt.__version=x.version,a.memory.textures++),Z){H.__webglFramebuffer=[];for(let pt=0;pt<6;pt++)if(x.mipmaps&&x.mipmaps.length>0){H.__webglFramebuffer[pt]=[];for(let Lt=0;Lt<x.mipmaps.length;Lt++)H.__webglFramebuffer[pt][Lt]=s.createFramebuffer()}else H.__webglFramebuffer[pt]=s.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){H.__webglFramebuffer=[];for(let pt=0;pt<x.mipmaps.length;pt++)H.__webglFramebuffer[pt]=s.createFramebuffer()}else H.__webglFramebuffer=s.createFramebuffer();if(zt)for(let pt=0,Lt=st.length;pt<Lt;pt++){const Nt=n.get(st[pt]);Nt.__webglTexture===void 0&&(Nt.__webglTexture=s.createTexture(),a.memory.textures++)}if(A.samples>0&&Ct(A)===!1){H.__webglMultisampledFramebuffer=s.createFramebuffer(),H.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let pt=0;pt<st.length;pt++){const Lt=st[pt];H.__webglColorRenderbuffer[pt]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,H.__webglColorRenderbuffer[pt]);const Nt=r.convert(Lt.format,Lt.colorSpace),lt=r.convert(Lt.type),wt=w(Lt.internalFormat,Nt,lt,Lt.colorSpace,A.isXRRenderTarget===!0),kt=_e(A);s.renderbufferStorageMultisample(s.RENDERBUFFER,kt,wt,A.width,A.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+pt,s.RENDERBUFFER,H.__webglColorRenderbuffer[pt])}s.bindRenderbuffer(s.RENDERBUFFER,null),A.depthBuffer&&(H.__webglDepthRenderbuffer=s.createRenderbuffer(),dt(H.__webglDepthRenderbuffer,A,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(Z){e.bindTexture(s.TEXTURE_CUBE_MAP,tt.__webglTexture),Wt(s.TEXTURE_CUBE_MAP,x);for(let pt=0;pt<6;pt++)if(x.mipmaps&&x.mipmaps.length>0)for(let Lt=0;Lt<x.mipmaps.length;Lt++)ft(H.__webglFramebuffer[pt][Lt],A,x,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+pt,Lt);else ft(H.__webglFramebuffer[pt],A,x,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0);g(x)&&f(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(zt){for(let pt=0,Lt=st.length;pt<Lt;pt++){const Nt=st[pt],lt=n.get(Nt);let wt=s.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(wt=A.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(wt,lt.__webglTexture),Wt(wt,Nt),ft(H.__webglFramebuffer,A,Nt,s.COLOR_ATTACHMENT0+pt,wt,0),g(Nt)&&f(wt)}e.unbindTexture()}else{let pt=s.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(pt=A.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(pt,tt.__webglTexture),Wt(pt,x),x.mipmaps&&x.mipmaps.length>0)for(let Lt=0;Lt<x.mipmaps.length;Lt++)ft(H.__webglFramebuffer[Lt],A,x,s.COLOR_ATTACHMENT0,pt,Lt);else ft(H.__webglFramebuffer,A,x,s.COLOR_ATTACHMENT0,pt,0);g(x)&&f(pt),e.unbindTexture()}A.depthBuffer&&jt(A)}function fe(A){const x=A.textures;for(let H=0,tt=x.length;H<tt;H++){const st=x[H];if(g(st)){const Z=y(A),zt=n.get(st).__webglTexture;e.bindTexture(Z,zt),f(Z),e.unbindTexture()}}}const qt=[],Xt=[];function Dt(A){if(A.samples>0){if(Ct(A)===!1){const x=A.textures,H=A.width,tt=A.height;let st=s.COLOR_BUFFER_BIT;const Z=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,zt=n.get(A),pt=x.length>1;if(pt)for(let Nt=0;Nt<x.length;Nt++)e.bindFramebuffer(s.FRAMEBUFFER,zt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Nt,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,zt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Nt,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,zt.__webglMultisampledFramebuffer);const Lt=A.texture.mipmaps;Lt&&Lt.length>0?e.bindFramebuffer(s.DRAW_FRAMEBUFFER,zt.__webglFramebuffer[0]):e.bindFramebuffer(s.DRAW_FRAMEBUFFER,zt.__webglFramebuffer);for(let Nt=0;Nt<x.length;Nt++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(st|=s.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(st|=s.STENCIL_BUFFER_BIT)),pt){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,zt.__webglColorRenderbuffer[Nt]);const lt=n.get(x[Nt]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,lt,0)}s.blitFramebuffer(0,0,H,tt,0,0,H,tt,st,s.NEAREST),l===!0&&(qt.length=0,Xt.length=0,qt.push(s.COLOR_ATTACHMENT0+Nt),A.depthBuffer&&A.resolveDepthBuffer===!1&&(qt.push(Z),Xt.push(Z),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,Xt)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,qt))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),pt)for(let Nt=0;Nt<x.length;Nt++){e.bindFramebuffer(s.FRAMEBUFFER,zt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Nt,s.RENDERBUFFER,zt.__webglColorRenderbuffer[Nt]);const lt=n.get(x[Nt]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,zt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Nt,s.TEXTURE_2D,lt,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,zt.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){const x=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[x])}}}function _e(A){return Math.min(i.maxSamples,A.samples)}function Ct(A){const x=n.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function Zt(A){const x=a.render.frame;h.get(A)!==x&&(h.set(A,x),A.update())}function be(A,x){const H=A.colorSpace,tt=A.format,st=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||H!==ps&&H!==qn&&(de.getTransfer(H)===xe?(tt!==ln||st!==Nn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),x}function Se(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=k,this.resetTextureUnits=N,this.setTexture2D=Y,this.setTexture2DArray=V,this.setTexture3D=it,this.setTextureCube=W,this.rebindTextures=we,this.setupRenderTarget=L,this.updateRenderTargetMipmap=fe,this.updateMultisampleRenderTarget=Dt,this.setupDepthRenderbuffer=jt,this.setupFrameBufferTexture=ft,this.useMultisampledRTT=Ct}function Ug(s,t){function e(n,i=qn){let r;const a=de.getTransfer(i);if(n===Nn)return s.UNSIGNED_BYTE;if(n===ol)return s.UNSIGNED_SHORT_4_4_4_4;if(n===ll)return s.UNSIGNED_SHORT_5_5_5_1;if(n===dh)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===fh)return s.UNSIGNED_INT_10F_11F_11F_REV;if(n===hh)return s.BYTE;if(n===uh)return s.SHORT;if(n===$s)return s.UNSIGNED_SHORT;if(n===al)return s.INT;if(n===Ri)return s.UNSIGNED_INT;if(n===An)return s.FLOAT;if(n===tr)return s.HALF_FLOAT;if(n===ph)return s.ALPHA;if(n===mh)return s.RGB;if(n===ln)return s.RGBA;if(n===Ys)return s.DEPTH_COMPONENT;if(n===js)return s.DEPTH_STENCIL;if(n===cl)return s.RED;if(n===hl)return s.RED_INTEGER;if(n===gh)return s.RG;if(n===ul)return s.RG_INTEGER;if(n===dl)return s.RGBA_INTEGER;if(n===Hr||n===Vr||n===Gr||n===Wr)if(a===xe)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Hr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Vr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Gr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Wr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Hr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Vr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Gr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Wr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Mo||n===bo||n===So||n===wo)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Mo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===bo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===So)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===wo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Eo||n===To||n===Ao)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Eo||n===To)return a===xe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ao)return a===xe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Co||n===Ro||n===Po||n===Do||n===Lo||n===Io||n===Uo||n===No||n===Fo||n===zo||n===Oo||n===Bo||n===ko||n===Ho)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Co)return a===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ro)return a===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Po)return a===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Do)return a===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Lo)return a===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Io)return a===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Uo)return a===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===No)return a===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Fo)return a===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===zo)return a===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Oo)return a===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Bo)return a===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ko)return a===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ho)return a===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Vo||n===Go||n===Wo)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Vo)return a===xe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Go)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Wo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Xo||n===$o||n===qo||n===Yo)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Xo)return r.COMPRESSED_RED_RGTC1_EXT;if(n===$o)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===qo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Yo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===qs?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}const Ng=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Fg=`
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

}`;class zg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new Ph(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new vn({vertexShader:Ng,fragmentShader:Fg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ge(new Ci(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Og extends vs{constructor(t,e){super();const n=this;let i=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,p=null,m=null;const v=typeof XRWebGLBinding<"u",g=new zg,f={},y=e.getContextAttributes();let w=null,_=null;const T=[],R=[],C=new Ot;let I=null;const M=new tn;M.viewport=new ue;const S=new tn;S.viewport=new ue;const U=[M,S],N=new sf;let k=null,q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let J=T[K];return J===void 0&&(J=new La,T[K]=J),J.getTargetRaySpace()},this.getControllerGrip=function(K){let J=T[K];return J===void 0&&(J=new La,T[K]=J),J.getGripSpace()},this.getHand=function(K){let J=T[K];return J===void 0&&(J=new La,T[K]=J),J.getHandSpace()};function Y(K){const J=R.indexOf(K.inputSource);if(J===-1)return;const ft=T[J];ft!==void 0&&(ft.update(K.inputSource,K.frame,c||a),ft.dispatchEvent({type:K.type,data:K.inputSource}))}function V(){i.removeEventListener("select",Y),i.removeEventListener("selectstart",Y),i.removeEventListener("selectend",Y),i.removeEventListener("squeeze",Y),i.removeEventListener("squeezestart",Y),i.removeEventListener("squeezeend",Y),i.removeEventListener("end",V),i.removeEventListener("inputsourceschange",it);for(let K=0;K<T.length;K++){const J=R[K];J!==null&&(R[K]=null,T[K].disconnect(J))}k=null,q=null,g.reset();for(const K in f)delete f[K];t.setRenderTarget(w),p=null,d=null,u=null,i=null,_=null,Bt.stop(),n.isPresenting=!1,t.setPixelRatio(I),t.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){r=K,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){o=K,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(K){c=K},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return u===null&&v&&(u=new XRWebGLBinding(i,e)),u},this.getFrame=function(){return m},this.getSession=function(){return i},this.setSession=async function(K){if(i=K,i!==null){if(w=t.getRenderTarget(),i.addEventListener("select",Y),i.addEventListener("selectstart",Y),i.addEventListener("selectend",Y),i.addEventListener("squeeze",Y),i.addEventListener("squeezestart",Y),i.addEventListener("squeezeend",Y),i.addEventListener("end",V),i.addEventListener("inputsourceschange",it),y.xrCompatible!==!0&&await e.makeXRCompatible(),I=t.getPixelRatio(),t.getSize(C),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let ft=null,dt=null,St=null;y.depth&&(St=y.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ft=y.stencil?js:Ys,dt=y.stencil?qs:Ri);const jt={colorFormat:e.RGBA8,depthFormat:St,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(jt),i.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),_=new Kn(d.textureWidth,d.textureHeight,{format:ln,type:Nn,depthTexture:new Rh(d.textureWidth,d.textureHeight,dt,void 0,void 0,void 0,void 0,void 0,void 0,ft),stencilBuffer:y.stencil,colorSpace:t.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const ft={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(i,e,ft),i.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),_=new Kn(p.framebufferWidth,p.framebufferHeight,{format:ln,type:Nn,colorSpace:t.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),Bt.setContext(i),Bt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function it(K){for(let J=0;J<K.removed.length;J++){const ft=K.removed[J],dt=R.indexOf(ft);dt>=0&&(R[dt]=null,T[dt].disconnect(ft))}for(let J=0;J<K.added.length;J++){const ft=K.added[J];let dt=R.indexOf(ft);if(dt===-1){for(let jt=0;jt<T.length;jt++)if(jt>=R.length){R.push(ft),dt=jt;break}else if(R[jt]===null){R[jt]=ft,dt=jt;break}if(dt===-1)break}const St=T[dt];St&&St.connect(ft)}}const W=new D,rt=new D;function at(K,J,ft){W.setFromMatrixPosition(J.matrixWorld),rt.setFromMatrixPosition(ft.matrixWorld);const dt=W.distanceTo(rt),St=J.projectionMatrix.elements,jt=ft.projectionMatrix.elements,we=St[14]/(St[10]-1),L=St[14]/(St[10]+1),fe=(St[9]+1)/St[5],qt=(St[9]-1)/St[5],Xt=(St[8]-1)/St[0],Dt=(jt[8]+1)/jt[0],_e=we*Xt,Ct=we*Dt,Zt=dt/(-Xt+Dt),be=Zt*-Xt;if(J.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(be),K.translateZ(Zt),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),St[10]===-1)K.projectionMatrix.copy(J.projectionMatrix),K.projectionMatrixInverse.copy(J.projectionMatrixInverse);else{const Se=we+Zt,A=L+Zt,x=_e-be,H=Ct+(dt-be),tt=fe*L/A*Se,st=qt*L/A*Se;K.projectionMatrix.makePerspective(x,H,tt,st,Se,A),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function Et(K,J){J===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(J.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(i===null)return;let J=K.near,ft=K.far;g.texture!==null&&(g.depthNear>0&&(J=g.depthNear),g.depthFar>0&&(ft=g.depthFar)),N.near=S.near=M.near=J,N.far=S.far=M.far=ft,(k!==N.near||q!==N.far)&&(i.updateRenderState({depthNear:N.near,depthFar:N.far}),k=N.near,q=N.far),N.layers.mask=K.layers.mask|6,M.layers.mask=N.layers.mask&3,S.layers.mask=N.layers.mask&5;const dt=K.parent,St=N.cameras;Et(N,dt);for(let jt=0;jt<St.length;jt++)Et(St[jt],dt);St.length===2?at(N,M,S):N.projectionMatrix.copy(M.projectionMatrix),Wt(K,N,dt)};function Wt(K,J,ft){ft===null?K.matrix.copy(J.matrixWorld):(K.matrix.copy(ft.matrixWorld),K.matrix.invert(),K.matrix.multiply(J.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(J.projectionMatrix),K.projectionMatrixInverse.copy(J.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=Ks*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return N},this.getFoveation=function(){if(!(d===null&&p===null))return l},this.setFoveation=function(K){l=K,d!==null&&(d.fixedFoveation=K),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=K)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(N)},this.getCameraTexture=function(K){return f[K]};let le=null;function he(K,J){if(h=J.getViewerPose(c||a),m=J,h!==null){const ft=h.views;p!==null&&(t.setRenderTargetFramebuffer(_,p.framebuffer),t.setRenderTarget(_));let dt=!1;ft.length!==N.cameras.length&&(N.cameras.length=0,dt=!0);for(let L=0;L<ft.length;L++){const fe=ft[L];let qt=null;if(p!==null)qt=p.getViewport(fe);else{const Dt=u.getViewSubImage(d,fe);qt=Dt.viewport,L===0&&(t.setRenderTargetTextures(_,Dt.colorTexture,Dt.depthStencilTexture),t.setRenderTarget(_))}let Xt=U[L];Xt===void 0&&(Xt=new tn,Xt.layers.enable(L),Xt.viewport=new ue,U[L]=Xt),Xt.matrix.fromArray(fe.transform.matrix),Xt.matrix.decompose(Xt.position,Xt.quaternion,Xt.scale),Xt.projectionMatrix.fromArray(fe.projectionMatrix),Xt.projectionMatrixInverse.copy(Xt.projectionMatrix).invert(),Xt.viewport.set(qt.x,qt.y,qt.width,qt.height),L===0&&(N.matrix.copy(Xt.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),dt===!0&&N.cameras.push(Xt)}const St=i.enabledFeatures;if(St&&St.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&v){u=n.getBinding();const L=u.getDepthInformation(ft[0]);L&&L.isValid&&L.texture&&g.init(L,i.renderState)}if(St&&St.includes("camera-access")&&v){t.state.unbindTexture(),u=n.getBinding();for(let L=0;L<ft.length;L++){const fe=ft[L].camera;if(fe){let qt=f[fe];qt||(qt=new Ph,f[fe]=qt);const Xt=u.getCameraImage(fe);qt.sourceTexture=Xt}}}}for(let ft=0;ft<T.length;ft++){const dt=R[ft],St=T[ft];dt!==null&&St!==void 0&&St.update(dt,J,c||a)}le&&le(K,J),J.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:J}),m=null}const Bt=new Fh;Bt.setAnimationLoop(he),this.setAnimationLoop=function(K){le=K},this.dispose=function(){}}}const _i=new Fn,Bg=new Kt;function kg(s,t){function e(g,f){g.matrixAutoUpdate===!0&&g.updateMatrix(),f.value.copy(g.matrix)}function n(g,f){f.color.getRGB(g.fogColor.value,Sh(s)),f.isFog?(g.fogNear.value=f.near,g.fogFar.value=f.far):f.isFogExp2&&(g.fogDensity.value=f.density)}function i(g,f,y,w,_){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(g,f):f.isMeshToonMaterial?(r(g,f),u(g,f)):f.isMeshPhongMaterial?(r(g,f),h(g,f)):f.isMeshStandardMaterial?(r(g,f),d(g,f),f.isMeshPhysicalMaterial&&p(g,f,_)):f.isMeshMatcapMaterial?(r(g,f),m(g,f)):f.isMeshDepthMaterial?r(g,f):f.isMeshDistanceMaterial?(r(g,f),v(g,f)):f.isMeshNormalMaterial?r(g,f):f.isLineBasicMaterial?(a(g,f),f.isLineDashedMaterial&&o(g,f)):f.isPointsMaterial?l(g,f,y,w):f.isSpriteMaterial?c(g,f):f.isShadowMaterial?(g.color.value.copy(f.color),g.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(g,f){g.opacity.value=f.opacity,f.color&&g.diffuse.value.copy(f.color),f.emissive&&g.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(g.map.value=f.map,e(f.map,g.mapTransform)),f.alphaMap&&(g.alphaMap.value=f.alphaMap,e(f.alphaMap,g.alphaMapTransform)),f.bumpMap&&(g.bumpMap.value=f.bumpMap,e(f.bumpMap,g.bumpMapTransform),g.bumpScale.value=f.bumpScale,f.side===Ye&&(g.bumpScale.value*=-1)),f.normalMap&&(g.normalMap.value=f.normalMap,e(f.normalMap,g.normalMapTransform),g.normalScale.value.copy(f.normalScale),f.side===Ye&&g.normalScale.value.negate()),f.displacementMap&&(g.displacementMap.value=f.displacementMap,e(f.displacementMap,g.displacementMapTransform),g.displacementScale.value=f.displacementScale,g.displacementBias.value=f.displacementBias),f.emissiveMap&&(g.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,g.emissiveMapTransform)),f.specularMap&&(g.specularMap.value=f.specularMap,e(f.specularMap,g.specularMapTransform)),f.alphaTest>0&&(g.alphaTest.value=f.alphaTest);const y=t.get(f),w=y.envMap,_=y.envMapRotation;w&&(g.envMap.value=w,_i.copy(_),_i.x*=-1,_i.y*=-1,_i.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(_i.y*=-1,_i.z*=-1),g.envMapRotation.value.setFromMatrix4(Bg.makeRotationFromEuler(_i)),g.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=f.reflectivity,g.ior.value=f.ior,g.refractionRatio.value=f.refractionRatio),f.lightMap&&(g.lightMap.value=f.lightMap,g.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,g.lightMapTransform)),f.aoMap&&(g.aoMap.value=f.aoMap,g.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,g.aoMapTransform))}function a(g,f){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,f.map&&(g.map.value=f.map,e(f.map,g.mapTransform))}function o(g,f){g.dashSize.value=f.dashSize,g.totalSize.value=f.dashSize+f.gapSize,g.scale.value=f.scale}function l(g,f,y,w){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,g.size.value=f.size*y,g.scale.value=w*.5,f.map&&(g.map.value=f.map,e(f.map,g.uvTransform)),f.alphaMap&&(g.alphaMap.value=f.alphaMap,e(f.alphaMap,g.alphaMapTransform)),f.alphaTest>0&&(g.alphaTest.value=f.alphaTest)}function c(g,f){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,g.rotation.value=f.rotation,f.map&&(g.map.value=f.map,e(f.map,g.mapTransform)),f.alphaMap&&(g.alphaMap.value=f.alphaMap,e(f.alphaMap,g.alphaMapTransform)),f.alphaTest>0&&(g.alphaTest.value=f.alphaTest)}function h(g,f){g.specular.value.copy(f.specular),g.shininess.value=Math.max(f.shininess,1e-4)}function u(g,f){f.gradientMap&&(g.gradientMap.value=f.gradientMap)}function d(g,f){g.metalness.value=f.metalness,f.metalnessMap&&(g.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,g.metalnessMapTransform)),g.roughness.value=f.roughness,f.roughnessMap&&(g.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,g.roughnessMapTransform)),f.envMap&&(g.envMapIntensity.value=f.envMapIntensity)}function p(g,f,y){g.ior.value=f.ior,f.sheen>0&&(g.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),g.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(g.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,g.sheenColorMapTransform)),f.sheenRoughnessMap&&(g.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,g.sheenRoughnessMapTransform))),f.clearcoat>0&&(g.clearcoat.value=f.clearcoat,g.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(g.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,g.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(g.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Ye&&g.clearcoatNormalScale.value.negate())),f.dispersion>0&&(g.dispersion.value=f.dispersion),f.iridescence>0&&(g.iridescence.value=f.iridescence,g.iridescenceIOR.value=f.iridescenceIOR,g.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(g.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,g.iridescenceMapTransform)),f.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),f.transmission>0&&(g.transmission.value=f.transmission,g.transmissionSamplerMap.value=y.texture,g.transmissionSamplerSize.value.set(y.width,y.height),f.transmissionMap&&(g.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,g.transmissionMapTransform)),g.thickness.value=f.thickness,f.thicknessMap&&(g.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=f.attenuationDistance,g.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(g.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(g.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=f.specularIntensity,g.specularColor.value.copy(f.specularColor),f.specularColorMap&&(g.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,g.specularColorMapTransform)),f.specularIntensityMap&&(g.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,f){f.matcap&&(g.matcap.value=f.matcap)}function v(g,f){const y=t.get(f).light;g.referencePosition.value.setFromMatrixPosition(y.matrixWorld),g.nearDistance.value=y.shadow.camera.near,g.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Hg(s,t,e,n){let i={},r={},a=[];const o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,w){const _=w.program;n.uniformBlockBinding(y,_)}function c(y,w){let _=i[y.id];_===void 0&&(m(y),_=h(y),i[y.id]=_,y.addEventListener("dispose",g));const T=w.program;n.updateUBOMapping(y,T);const R=t.render.frame;r[y.id]!==R&&(d(y),r[y.id]=R)}function h(y){const w=u();y.__bindingPointIndex=w;const _=s.createBuffer(),T=y.__size,R=y.usage;return s.bindBuffer(s.UNIFORM_BUFFER,_),s.bufferData(s.UNIFORM_BUFFER,T,R),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,w,_),_}function u(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(y){const w=i[y.id],_=y.uniforms,T=y.__cache;s.bindBuffer(s.UNIFORM_BUFFER,w);for(let R=0,C=_.length;R<C;R++){const I=Array.isArray(_[R])?_[R]:[_[R]];for(let M=0,S=I.length;M<S;M++){const U=I[M];if(p(U,R,M,T)===!0){const N=U.__offset,k=Array.isArray(U.value)?U.value:[U.value];let q=0;for(let Y=0;Y<k.length;Y++){const V=k[Y],it=v(V);typeof V=="number"||typeof V=="boolean"?(U.__data[0]=V,s.bufferSubData(s.UNIFORM_BUFFER,N+q,U.__data)):V.isMatrix3?(U.__data[0]=V.elements[0],U.__data[1]=V.elements[1],U.__data[2]=V.elements[2],U.__data[3]=0,U.__data[4]=V.elements[3],U.__data[5]=V.elements[4],U.__data[6]=V.elements[5],U.__data[7]=0,U.__data[8]=V.elements[6],U.__data[9]=V.elements[7],U.__data[10]=V.elements[8],U.__data[11]=0):(V.toArray(U.__data,q),q+=it.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,N,U.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function p(y,w,_,T){const R=y.value,C=w+"_"+_;if(T[C]===void 0)return typeof R=="number"||typeof R=="boolean"?T[C]=R:T[C]=R.clone(),!0;{const I=T[C];if(typeof R=="number"||typeof R=="boolean"){if(I!==R)return T[C]=R,!0}else if(I.equals(R)===!1)return I.copy(R),!0}return!1}function m(y){const w=y.uniforms;let _=0;const T=16;for(let C=0,I=w.length;C<I;C++){const M=Array.isArray(w[C])?w[C]:[w[C]];for(let S=0,U=M.length;S<U;S++){const N=M[S],k=Array.isArray(N.value)?N.value:[N.value];for(let q=0,Y=k.length;q<Y;q++){const V=k[q],it=v(V),W=_%T,rt=W%it.boundary,at=W+rt;_+=rt,at!==0&&T-at<it.storage&&(_+=T-at),N.__data=new Float32Array(it.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=_,_+=it.storage}}}const R=_%T;return R>0&&(_+=T-R),y.__size=_,y.__cache={},this}function v(y){const w={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(w.boundary=4,w.storage=4):y.isVector2?(w.boundary=8,w.storage=8):y.isVector3||y.isColor?(w.boundary=16,w.storage=12):y.isVector4?(w.boundary=16,w.storage=16):y.isMatrix3?(w.boundary=48,w.storage=48):y.isMatrix4?(w.boundary=64,w.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),w}function g(y){const w=y.target;w.removeEventListener("dispose",g);const _=a.indexOf(w.__bindingPointIndex);a.splice(_,1),s.deleteBuffer(i[w.id]),delete i[w.id],delete r[w.id]}function f(){for(const y in i)s.deleteBuffer(i[y]);a=[],i={},r={}}return{bind:l,update:c,dispose:f}}class Vg{constructor(t={}){const{canvas:e=ed(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;const m=new Uint32Array(4),v=new Int32Array(4);let g=null,f=null;const y=[],w=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ci,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const _=this;let T=!1;this._outputColorSpace=Qe;let R=0,C=0,I=null,M=-1,S=null;const U=new ue,N=new ue;let k=null;const q=new $t(0);let Y=0,V=e.width,it=e.height,W=1,rt=null,at=null;const Et=new ue(0,0,V,it),Wt=new ue(0,0,V,it);let le=!1;const he=new _l;let Bt=!1,K=!1;const J=new Kt,ft=new D,dt=new ue,St={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let jt=!1;function we(){return I===null?W:1}let L=n;function fe(b,O){return e.getContext(b,O)}try{const b={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${rl}`),e.addEventListener("webglcontextlost",gt,!1),e.addEventListener("webglcontextrestored",At,!1),e.addEventListener("webglcontextcreationerror",ot,!1),L===null){const O="webgl2";if(L=fe(O,b),L===null)throw fe(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let qt,Xt,Dt,_e,Ct,Zt,be,Se,A,x,H,tt,st,Z,zt,pt,Lt,Nt,lt,wt,kt,Rt,xt,Ht;function F(){qt=new Jm(L),qt.init(),Rt=new Ug(L,qt),Xt=new Xm(L,qt,t,Rt),Dt=new Lg(L,qt),Xt.reversedDepthBuffer&&d&&Dt.buffers.depth.setReversed(!0),_e=new e0(L),Ct=new _g,Zt=new Ig(L,qt,Dt,Ct,Xt,Rt,_e),be=new qm(_),Se=new Zm(_),A=new of(L),xt=new Gm(L,A),x=new Qm(L,A,_e,xt),H=new i0(L,x,A,_e),lt=new n0(L,Xt,Zt),pt=new $m(Ct),tt=new xg(_,be,Se,qt,Xt,xt,pt),st=new kg(_,Ct),Z=new Mg,zt=new Ag(qt),Nt=new Vm(_,be,Se,Dt,H,p,l),Lt=new Pg(_,H,Xt),Ht=new Hg(L,_e,Xt,Dt),wt=new Wm(L,qt,_e),kt=new t0(L,qt,_e),_e.programs=tt.programs,_.capabilities=Xt,_.extensions=qt,_.properties=Ct,_.renderLists=Z,_.shadowMap=Lt,_.state=Dt,_.info=_e}F();const ut=new Og(_,L);this.xr=ut,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const b=qt.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=qt.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(b){b!==void 0&&(W=b,this.setSize(V,it,!1))},this.getSize=function(b){return b.set(V,it)},this.setSize=function(b,O,G=!0){if(ut.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}V=b,it=O,e.width=Math.floor(b*W),e.height=Math.floor(O*W),G===!0&&(e.style.width=b+"px",e.style.height=O+"px"),this.setViewport(0,0,b,O)},this.getDrawingBufferSize=function(b){return b.set(V*W,it*W).floor()},this.setDrawingBufferSize=function(b,O,G){V=b,it=O,W=G,e.width=Math.floor(b*G),e.height=Math.floor(O*G),this.setViewport(0,0,b,O)},this.getCurrentViewport=function(b){return b.copy(U)},this.getViewport=function(b){return b.copy(Et)},this.setViewport=function(b,O,G,X){b.isVector4?Et.set(b.x,b.y,b.z,b.w):Et.set(b,O,G,X),Dt.viewport(U.copy(Et).multiplyScalar(W).round())},this.getScissor=function(b){return b.copy(Wt)},this.setScissor=function(b,O,G,X){b.isVector4?Wt.set(b.x,b.y,b.z,b.w):Wt.set(b,O,G,X),Dt.scissor(N.copy(Wt).multiplyScalar(W).round())},this.getScissorTest=function(){return le},this.setScissorTest=function(b){Dt.setScissorTest(le=b)},this.setOpaqueSort=function(b){rt=b},this.setTransparentSort=function(b){at=b},this.getClearColor=function(b){return b.copy(Nt.getClearColor())},this.setClearColor=function(){Nt.setClearColor(...arguments)},this.getClearAlpha=function(){return Nt.getClearAlpha()},this.setClearAlpha=function(){Nt.setClearAlpha(...arguments)},this.clear=function(b=!0,O=!0,G=!0){let X=0;if(b){let B=!1;if(I!==null){const ct=I.texture.format;B=ct===dl||ct===ul||ct===hl}if(B){const ct=I.texture.type,Mt=ct===Nn||ct===Ri||ct===$s||ct===qs||ct===ol||ct===ll,Pt=Nt.getClearColor(),Tt=Nt.getClearAlpha(),E=Pt.r,P=Pt.g,z=Pt.b;Mt?(m[0]=E,m[1]=P,m[2]=z,m[3]=Tt,L.clearBufferuiv(L.COLOR,0,m)):(v[0]=E,v[1]=P,v[2]=z,v[3]=Tt,L.clearBufferiv(L.COLOR,0,v))}else X|=L.COLOR_BUFFER_BIT}O&&(X|=L.DEPTH_BUFFER_BIT),G&&(X|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",gt,!1),e.removeEventListener("webglcontextrestored",At,!1),e.removeEventListener("webglcontextcreationerror",ot,!1),Nt.dispose(),Z.dispose(),zt.dispose(),Ct.dispose(),be.dispose(),Se.dispose(),H.dispose(),xt.dispose(),Ht.dispose(),tt.dispose(),ut.dispose(),ut.removeEventListener("sessionstart",sn),ut.removeEventListener("sessionend",ui),Rn.stop()};function gt(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function At(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;const b=_e.autoReset,O=Lt.enabled,G=Lt.autoUpdate,X=Lt.needsUpdate,B=Lt.type;F(),_e.autoReset=b,Lt.enabled=O,Lt.autoUpdate=G,Lt.needsUpdate=X,Lt.type=B}function ot(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function et(b){const O=b.target;O.removeEventListener("dispose",et),It(O)}function It(b){Yt(b),Ct.remove(b)}function Yt(b){const O=Ct.get(b).programs;O!==void 0&&(O.forEach(function(G){tt.releaseProgram(G)}),b.isShaderMaterial&&tt.releaseShaderCache(b))}this.renderBufferDirect=function(b,O,G,X,B,ct){O===null&&(O=St);const Mt=B.isMesh&&B.matrixWorld.determinant()<0,Pt=rr(b,O,G,X,B);Dt.setMaterial(X,Mt);let Tt=G.index,E=1;if(X.wireframe===!0){if(Tt=x.getWireframeAttribute(G),Tt===void 0)return;E=2}const P=G.drawRange,z=G.attributes.position;let j=P.start*E,ht=(P.start+P.count)*E;ct!==null&&(j=Math.max(j,ct.start*E),ht=Math.min(ht,(ct.start+ct.count)*E)),Tt!==null?(j=Math.max(j,0),ht=Math.min(ht,Tt.count)):z!=null&&(j=Math.max(j,0),ht=Math.min(ht,z.count));const mt=ht-j;if(mt<0||mt===1/0)return;xt.setup(B,X,Pt,G,Tt);let Q,$=wt;if(Tt!==null&&(Q=A.get(Tt),$=kt,$.setIndex(Q)),B.isMesh)X.wireframe===!0?(Dt.setLineWidth(X.wireframeLinewidth*we()),$.setMode(L.LINES)):$.setMode(L.TRIANGLES);else if(B.isLine){let nt=X.linewidth;nt===void 0&&(nt=1),Dt.setLineWidth(nt*we()),B.isLineSegments?$.setMode(L.LINES):B.isLineLoop?$.setMode(L.LINE_LOOP):$.setMode(L.LINE_STRIP)}else B.isPoints?$.setMode(L.POINTS):B.isSprite&&$.setMode(L.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)Zs("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),$.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if(qt.get("WEBGL_multi_draw"))$.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{const nt=B._multiDrawStarts,bt=B._multiDrawCounts,_t=B._multiDrawCount,Vt=Tt?A.get(Tt).bytesPerElement:1,Qt=Ct.get(X).currentProgram.getUniforms();for(let pe=0;pe<_t;pe++)Qt.setValue(L,"_gl_DrawID",pe),$.render(nt[pe]/Vt,bt[pe])}else if(B.isInstancedMesh)$.renderInstances(j,mt,B.count);else if(G.isInstancedBufferGeometry){const nt=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,bt=Math.min(G.instanceCount,nt);$.renderInstances(j,mt,bt)}else $.render(j,mt)};function ce(b,O,G){b.transparent===!0&&b.side===Le&&b.forceSinglePass===!1?(b.side=Ye,b.needsUpdate=!0,di(b,O,G),b.side=jn,b.needsUpdate=!0,di(b,O,G),b.side=Le):di(b,O,G)}this.compile=function(b,O,G=null){G===null&&(G=b),f=zt.get(G),f.init(O),w.push(f),G.traverseVisible(function(B){B.isLight&&B.layers.test(O.layers)&&(f.pushLight(B),B.castShadow&&f.pushShadow(B))}),b!==G&&b.traverseVisible(function(B){B.isLight&&B.layers.test(O.layers)&&(f.pushLight(B),B.castShadow&&f.pushShadow(B))}),f.setupLights();const X=new Set;return b.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;const ct=B.material;if(ct)if(Array.isArray(ct))for(let Mt=0;Mt<ct.length;Mt++){const Pt=ct[Mt];ce(Pt,G,B),X.add(Pt)}else ce(ct,G,B),X.add(ct)}),f=w.pop(),X},this.compileAsync=function(b,O,G=null){const X=this.compile(b,O,G);return new Promise(B=>{function ct(){if(X.forEach(function(Mt){Ct.get(Mt).currentProgram.isReady()&&X.delete(Mt)}),X.size===0){B(b);return}setTimeout(ct,10)}qt.get("KHR_parallel_shader_compile")!==null?ct():setTimeout(ct,10)})};let re=null;function hn(b){re&&re(b)}function sn(){Rn.stop()}function ui(){Rn.start()}const Rn=new Fh;Rn.setAnimationLoop(hn),typeof self<"u"&&Rn.setContext(self),this.setAnimationLoop=function(b){re=b,ut.setAnimationLoop(b),b===null?Rn.stop():Rn.start()},ut.addEventListener("sessionstart",sn),ut.addEventListener("sessionend",ui),this.render=function(b,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),ut.enabled===!0&&ut.isPresenting===!0&&(ut.cameraAutoUpdate===!0&&ut.updateCamera(O),O=ut.getCamera()),b.isScene===!0&&b.onBeforeRender(_,b,O,I),f=zt.get(b,w.length),f.init(O),w.push(f),J.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),he.setFromProjectionMatrix(J,In,O.reversedDepth),K=this.localClippingEnabled,Bt=pt.init(this.clippingPlanes,K),g=Z.get(b,y.length),g.init(),y.push(g),ut.enabled===!0&&ut.isPresenting===!0){const ct=_.xr.getDepthSensingMesh();ct!==null&&Ms(ct,O,-1/0,_.sortObjects)}Ms(b,O,0,_.sortObjects),g.finish(),_.sortObjects===!0&&g.sort(rt,at),jt=ut.enabled===!1||ut.isPresenting===!1||ut.hasDepthSensing()===!1,jt&&Nt.addToRenderList(g,b),this.info.render.frame++,Bt===!0&&pt.beginShadows();const G=f.state.shadowsArray;Lt.render(G,b,O),Bt===!0&&pt.endShadows(),this.info.autoReset===!0&&this.info.reset();const X=g.opaque,B=g.transmissive;if(f.setupLights(),O.isArrayCamera){const ct=O.cameras;if(B.length>0)for(let Mt=0,Pt=ct.length;Mt<Pt;Mt++){const Tt=ct[Mt];nr(X,B,b,Tt)}jt&&Nt.render(b);for(let Mt=0,Pt=ct.length;Mt<Pt;Mt++){const Tt=ct[Mt];un(g,b,Tt,Tt.viewport)}}else B.length>0&&nr(X,B,b,O),jt&&Nt.render(b),un(g,b,O);I!==null&&C===0&&(Zt.updateMultisampleRenderTarget(I),Zt.updateRenderTargetMipmap(I)),b.isScene===!0&&b.onAfterRender(_,b,O),xt.resetDefaultState(),M=-1,S=null,w.pop(),w.length>0?(f=w[w.length-1],Bt===!0&&pt.setGlobalState(_.clippingPlanes,f.state.camera)):f=null,y.pop(),y.length>0?g=y[y.length-1]:g=null};function Ms(b,O,G,X){if(b.visible===!1)return;if(b.layers.test(O.layers)){if(b.isGroup)G=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(O);else if(b.isLight)f.pushLight(b),b.castShadow&&f.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||he.intersectsSprite(b)){X&&dt.setFromMatrixPosition(b.matrixWorld).applyMatrix4(J);const Mt=H.update(b),Pt=b.material;Pt.visible&&g.push(b,Mt,Pt,G,dt.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||he.intersectsObject(b))){const Mt=H.update(b),Pt=b.material;if(X&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),dt.copy(b.boundingSphere.center)):(Mt.boundingSphere===null&&Mt.computeBoundingSphere(),dt.copy(Mt.boundingSphere.center)),dt.applyMatrix4(b.matrixWorld).applyMatrix4(J)),Array.isArray(Pt)){const Tt=Mt.groups;for(let E=0,P=Tt.length;E<P;E++){const z=Tt[E],j=Pt[z.materialIndex];j&&j.visible&&g.push(b,Mt,j,G,dt.z,z)}}else Pt.visible&&g.push(b,Mt,Pt,G,dt.z,null)}}const ct=b.children;for(let Mt=0,Pt=ct.length;Mt<Pt;Mt++)Ms(ct[Mt],O,G,X)}function un(b,O,G,X){const B=b.opaque,ct=b.transmissive,Mt=b.transparent;f.setupLightsView(G),Bt===!0&&pt.setGlobalState(_.clippingPlanes,G),X&&Dt.viewport(U.copy(X)),B.length>0&&Qn(B,O,G),ct.length>0&&Qn(ct,O,G),Mt.length>0&&Qn(Mt,O,G),Dt.buffers.depth.setTest(!0),Dt.buffers.depth.setMask(!0),Dt.buffers.color.setMask(!0),Dt.setPolygonOffset(!1)}function nr(b,O,G,X){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[X.id]===void 0&&(f.state.transmissionRenderTarget[X.id]=new Kn(1,1,{generateMipmaps:!0,type:qt.has("EXT_color_buffer_half_float")||qt.has("EXT_color_buffer_float")?tr:Nn,minFilter:oi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:de.workingColorSpace}));const ct=f.state.transmissionRenderTarget[X.id],Mt=X.viewport||U;ct.setSize(Mt.z*_.transmissionResolutionScale,Mt.w*_.transmissionResolutionScale);const Pt=_.getRenderTarget(),Tt=_.getActiveCubeFace(),E=_.getActiveMipmapLevel();_.setRenderTarget(ct),_.getClearColor(q),Y=_.getClearAlpha(),Y<1&&_.setClearColor(16777215,.5),_.clear(),jt&&Nt.render(G);const P=_.toneMapping;_.toneMapping=ci;const z=X.viewport;if(X.viewport!==void 0&&(X.viewport=void 0),f.setupLightsView(X),Bt===!0&&pt.setGlobalState(_.clippingPlanes,X),Qn(b,G,X),Zt.updateMultisampleRenderTarget(ct),Zt.updateRenderTargetMipmap(ct),qt.has("WEBGL_multisampled_render_to_texture")===!1){let j=!1;for(let ht=0,mt=O.length;ht<mt;ht++){const Q=O[ht],$=Q.object,nt=Q.geometry,bt=Q.material,_t=Q.group;if(bt.side===Le&&$.layers.test(X.layers)){const Vt=bt.side;bt.side=Ye,bt.needsUpdate=!0,bs($,G,X,nt,bt,_t),bt.side=Vt,bt.needsUpdate=!0,j=!0}}j===!0&&(Zt.updateMultisampleRenderTarget(ct),Zt.updateRenderTargetMipmap(ct))}_.setRenderTarget(Pt,Tt,E),_.setClearColor(q,Y),z!==void 0&&(X.viewport=z),_.toneMapping=P}function Qn(b,O,G){const X=O.isScene===!0?O.overrideMaterial:null;for(let B=0,ct=b.length;B<ct;B++){const Mt=b[B],Pt=Mt.object,Tt=Mt.geometry,E=Mt.group;let P=Mt.material;P.allowOverride===!0&&X!==null&&(P=X),Pt.layers.test(G.layers)&&bs(Pt,O,G,Tt,P,E)}}function bs(b,O,G,X,B,ct){b.onBeforeRender(_,O,G,X,B,ct),b.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),B.onBeforeRender(_,O,G,X,b,ct),B.transparent===!0&&B.side===Le&&B.forceSinglePass===!1?(B.side=Ye,B.needsUpdate=!0,_.renderBufferDirect(G,O,X,B,b,ct),B.side=jn,B.needsUpdate=!0,_.renderBufferDirect(G,O,X,B,b,ct),B.side=Le):_.renderBufferDirect(G,O,X,B,b,ct),b.onAfterRender(_,O,G,X,B,ct)}function di(b,O,G){O.isScene!==!0&&(O=St);const X=Ct.get(b),B=f.state.lights,ct=f.state.shadowsArray,Mt=B.state.version,Pt=tt.getParameters(b,B.state,ct,O,G),Tt=tt.getProgramCacheKey(Pt);let E=X.programs;X.environment=b.isMeshStandardMaterial?O.environment:null,X.fog=O.fog,X.envMap=(b.isMeshStandardMaterial?Se:be).get(b.envMap||X.environment),X.envMapRotation=X.environment!==null&&b.envMap===null?O.environmentRotation:b.envMapRotation,E===void 0&&(b.addEventListener("dispose",et),E=new Map,X.programs=E);let P=E.get(Tt);if(P!==void 0){if(X.currentProgram===P&&X.lightsStateVersion===Mt)return sr(b,Pt),P}else Pt.uniforms=tt.getUniforms(b),b.onBeforeCompile(Pt,_),P=tt.acquireProgram(Pt,Tt),E.set(Tt,P),X.uniforms=Pt.uniforms;const z=X.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(z.clippingPlanes=pt.uniform),sr(b,Pt),X.needsLights=fi(b),X.lightsStateVersion=Mt,X.needsLights&&(z.ambientLightColor.value=B.state.ambient,z.lightProbe.value=B.state.probe,z.directionalLights.value=B.state.directional,z.directionalLightShadows.value=B.state.directionalShadow,z.spotLights.value=B.state.spot,z.spotLightShadows.value=B.state.spotShadow,z.rectAreaLights.value=B.state.rectArea,z.ltc_1.value=B.state.rectAreaLTC1,z.ltc_2.value=B.state.rectAreaLTC2,z.pointLights.value=B.state.point,z.pointLightShadows.value=B.state.pointShadow,z.hemisphereLights.value=B.state.hemi,z.directionalShadowMap.value=B.state.directionalShadowMap,z.directionalShadowMatrix.value=B.state.directionalShadowMatrix,z.spotShadowMap.value=B.state.spotShadowMap,z.spotLightMatrix.value=B.state.spotLightMatrix,z.spotLightMap.value=B.state.spotLightMap,z.pointShadowMap.value=B.state.pointShadowMap,z.pointShadowMatrix.value=B.state.pointShadowMatrix),X.currentProgram=P,X.uniformsList=null,P}function ir(b){if(b.uniformsList===null){const O=b.currentProgram.getUniforms();b.uniformsList=Xr.seqWithValue(O.seq,b.uniforms)}return b.uniformsList}function sr(b,O){const G=Ct.get(b);G.outputColorSpace=O.outputColorSpace,G.batching=O.batching,G.batchingColor=O.batchingColor,G.instancing=O.instancing,G.instancingColor=O.instancingColor,G.instancingMorph=O.instancingMorph,G.skinning=O.skinning,G.morphTargets=O.morphTargets,G.morphNormals=O.morphNormals,G.morphColors=O.morphColors,G.morphTargetsCount=O.morphTargetsCount,G.numClippingPlanes=O.numClippingPlanes,G.numIntersection=O.numClipIntersection,G.vertexAlphas=O.vertexAlphas,G.vertexTangents=O.vertexTangents,G.toneMapping=O.toneMapping}function rr(b,O,G,X,B){O.isScene!==!0&&(O=St),Zt.resetTextureUnits();const ct=O.fog,Mt=X.isMeshStandardMaterial?O.environment:null,Pt=I===null?_.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:ps,Tt=(X.isMeshStandardMaterial?Se:be).get(X.envMap||Mt),E=X.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,P=!!G.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),z=!!G.morphAttributes.position,j=!!G.morphAttributes.normal,ht=!!G.morphAttributes.color;let mt=ci;X.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(mt=_.toneMapping);const Q=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,$=Q!==void 0?Q.length:0,nt=Ct.get(X),bt=f.state.lights;if(Bt===!0&&(K===!0||b!==S)){const Fe=b===S&&X.id===M;pt.setState(X,b,Fe)}let _t=!1;X.version===nt.__version?(nt.needsLights&&nt.lightsStateVersion!==bt.state.version||nt.outputColorSpace!==Pt||B.isBatchedMesh&&nt.batching===!1||!B.isBatchedMesh&&nt.batching===!0||B.isBatchedMesh&&nt.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&nt.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&nt.instancing===!1||!B.isInstancedMesh&&nt.instancing===!0||B.isSkinnedMesh&&nt.skinning===!1||!B.isSkinnedMesh&&nt.skinning===!0||B.isInstancedMesh&&nt.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&nt.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&nt.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&nt.instancingMorph===!1&&B.morphTexture!==null||nt.envMap!==Tt||X.fog===!0&&nt.fog!==ct||nt.numClippingPlanes!==void 0&&(nt.numClippingPlanes!==pt.numPlanes||nt.numIntersection!==pt.numIntersection)||nt.vertexAlphas!==E||nt.vertexTangents!==P||nt.morphTargets!==z||nt.morphNormals!==j||nt.morphColors!==ht||nt.toneMapping!==mt||nt.morphTargetsCount!==$)&&(_t=!0):(_t=!0,nt.__version=X.version);let Vt=nt.currentProgram;_t===!0&&(Vt=di(X,O,B));let Qt=!1,pe=!1,Ee=!1;const ne=Vt.getUniforms(),Ie=nt.uniforms;if(Dt.useProgram(Vt.program)&&(Qt=!0,pe=!0,Ee=!0),X.id!==M&&(M=X.id,pe=!0),Qt||S!==b){Dt.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),ne.setValue(L,"projectionMatrix",b.projectionMatrix),ne.setValue(L,"viewMatrix",b.matrixWorldInverse);const De=ne.map.cameraPosition;De!==void 0&&De.setValue(L,ft.setFromMatrixPosition(b.matrixWorld)),Xt.logarithmicDepthBuffer&&ne.setValue(L,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&ne.setValue(L,"isOrthographic",b.isOrthographicCamera===!0),S!==b&&(S=b,pe=!0,Ee=!0)}if(B.isSkinnedMesh){ne.setOptional(L,B,"bindMatrix"),ne.setOptional(L,B,"bindMatrixInverse");const Fe=B.skeleton;Fe&&(Fe.boneTexture===null&&Fe.computeBoneTexture(),ne.setValue(L,"boneTexture",Fe.boneTexture,Zt))}B.isBatchedMesh&&(ne.setOptional(L,B,"batchingTexture"),ne.setValue(L,"batchingTexture",B._matricesTexture,Zt),ne.setOptional(L,B,"batchingIdTexture"),ne.setValue(L,"batchingIdTexture",B._indirectTexture,Zt),ne.setOptional(L,B,"batchingColorTexture"),B._colorsTexture!==null&&ne.setValue(L,"batchingColorTexture",B._colorsTexture,Zt));const Xe=G.morphAttributes;if((Xe.position!==void 0||Xe.normal!==void 0||Xe.color!==void 0)&&lt.update(B,G,Vt),(pe||nt.receiveShadow!==B.receiveShadow)&&(nt.receiveShadow=B.receiveShadow,ne.setValue(L,"receiveShadow",B.receiveShadow)),X.isMeshGouraudMaterial&&X.envMap!==null&&(Ie.envMap.value=Tt,Ie.flipEnvMap.value=Tt.isCubeTexture&&Tt.isRenderTargetTexture===!1?-1:1),X.isMeshStandardMaterial&&X.envMap===null&&O.environment!==null&&(Ie.envMapIntensity.value=O.environmentIntensity),pe&&(ne.setValue(L,"toneMappingExposure",_.toneMappingExposure),nt.needsLights&&Ss(Ie,Ee),ct&&X.fog===!0&&st.refreshFogUniforms(Ie,ct),st.refreshMaterialUniforms(Ie,X,W,it,f.state.transmissionRenderTarget[b.id]),Xr.upload(L,ir(nt),Ie,Zt)),X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(Xr.upload(L,ir(nt),Ie,Zt),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&ne.setValue(L,"center",B.center),ne.setValue(L,"modelViewMatrix",B.modelViewMatrix),ne.setValue(L,"normalMatrix",B.normalMatrix),ne.setValue(L,"modelMatrix",B.matrixWorld),X.isShaderMaterial||X.isRawShaderMaterial){const Fe=X.uniformsGroups;for(let De=0,Ui=Fe.length;De<Ui;De++){const rn=Fe[De];Ht.update(rn,Vt),Ht.bind(rn,Vt)}}return Vt}function Ss(b,O){b.ambientLightColor.needsUpdate=O,b.lightProbe.needsUpdate=O,b.directionalLights.needsUpdate=O,b.directionalLightShadows.needsUpdate=O,b.pointLights.needsUpdate=O,b.pointLightShadows.needsUpdate=O,b.spotLights.needsUpdate=O,b.spotLightShadows.needsUpdate=O,b.rectAreaLights.needsUpdate=O,b.hemisphereLights.needsUpdate=O}function fi(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(b,O,G){const X=Ct.get(b);X.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,X.__autoAllocateDepthBuffer===!1&&(X.__useRenderToTexture=!1),Ct.get(b.texture).__webglTexture=O,Ct.get(b.depthTexture).__webglTexture=X.__autoAllocateDepthBuffer?void 0:G,X.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,O){const G=Ct.get(b);G.__webglFramebuffer=O,G.__useDefaultFramebuffer=O===void 0};const ar=L.createFramebuffer();this.setRenderTarget=function(b,O=0,G=0){I=b,R=O,C=G;let X=!0,B=null,ct=!1,Mt=!1;if(b){const Tt=Ct.get(b);if(Tt.__useDefaultFramebuffer!==void 0)Dt.bindFramebuffer(L.FRAMEBUFFER,null),X=!1;else if(Tt.__webglFramebuffer===void 0)Zt.setupRenderTarget(b);else if(Tt.__hasExternalTextures)Zt.rebindTextures(b,Ct.get(b.texture).__webglTexture,Ct.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const z=b.depthTexture;if(Tt.__boundDepthTexture!==z){if(z!==null&&Ct.has(z)&&(b.width!==z.image.width||b.height!==z.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Zt.setupDepthRenderbuffer(b)}}const E=b.texture;(E.isData3DTexture||E.isDataArrayTexture||E.isCompressedArrayTexture)&&(Mt=!0);const P=Ct.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(P[O])?B=P[O][G]:B=P[O],ct=!0):b.samples>0&&Zt.useMultisampledRTT(b)===!1?B=Ct.get(b).__webglMultisampledFramebuffer:Array.isArray(P)?B=P[G]:B=P,U.copy(b.viewport),N.copy(b.scissor),k=b.scissorTest}else U.copy(Et).multiplyScalar(W).floor(),N.copy(Wt).multiplyScalar(W).floor(),k=le;if(G!==0&&(B=ar),Dt.bindFramebuffer(L.FRAMEBUFFER,B)&&X&&Dt.drawBuffers(b,B),Dt.viewport(U),Dt.scissor(N),Dt.setScissorTest(k),ct){const Tt=Ct.get(b.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+O,Tt.__webglTexture,G)}else if(Mt){const Tt=O;for(let E=0;E<b.textures.length;E++){const P=Ct.get(b.textures[E]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+E,P.__webglTexture,G,Tt)}}else if(b!==null&&G!==0){const Tt=Ct.get(b.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Tt.__webglTexture,G)}M=-1},this.readRenderTargetPixels=function(b,O,G,X,B,ct,Mt,Pt=0){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Tt=Ct.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Mt!==void 0&&(Tt=Tt[Mt]),Tt){Dt.bindFramebuffer(L.FRAMEBUFFER,Tt);try{const E=b.textures[Pt],P=E.format,z=E.type;if(!Xt.textureFormatReadable(P)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Xt.textureTypeReadable(z)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=b.width-X&&G>=0&&G<=b.height-B&&(b.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+Pt),L.readPixels(O,G,X,B,Rt.convert(P),Rt.convert(z),ct))}finally{const E=I!==null?Ct.get(I).__webglFramebuffer:null;Dt.bindFramebuffer(L.FRAMEBUFFER,E)}}},this.readRenderTargetPixelsAsync=async function(b,O,G,X,B,ct,Mt,Pt=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Tt=Ct.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Mt!==void 0&&(Tt=Tt[Mt]),Tt)if(O>=0&&O<=b.width-X&&G>=0&&G<=b.height-B){Dt.bindFramebuffer(L.FRAMEBUFFER,Tt);const E=b.textures[Pt],P=E.format,z=E.type;if(!Xt.textureFormatReadable(P))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Xt.textureTypeReadable(z))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const j=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,j),L.bufferData(L.PIXEL_PACK_BUFFER,ct.byteLength,L.STREAM_READ),b.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+Pt),L.readPixels(O,G,X,B,Rt.convert(P),Rt.convert(z),0);const ht=I!==null?Ct.get(I).__webglFramebuffer:null;Dt.bindFramebuffer(L.FRAMEBUFFER,ht);const mt=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await nd(L,mt,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,j),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,ct),L.deleteBuffer(j),L.deleteSync(mt),ct}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,O=null,G=0){const X=Math.pow(2,-G),B=Math.floor(b.image.width*X),ct=Math.floor(b.image.height*X),Mt=O!==null?O.x:0,Pt=O!==null?O.y:0;Zt.setTexture2D(b,0),L.copyTexSubImage2D(L.TEXTURE_2D,G,0,0,Mt,Pt,B,ct),Dt.unbindTexture()};const la=L.createFramebuffer(),ca=L.createFramebuffer();this.copyTextureToTexture=function(b,O,G=null,X=null,B=0,ct=null){ct===null&&(B!==0?(Zs("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ct=B,B=0):ct=0);let Mt,Pt,Tt,E,P,z,j,ht,mt;const Q=b.isCompressedTexture?b.mipmaps[ct]:b.image;if(G!==null)Mt=G.max.x-G.min.x,Pt=G.max.y-G.min.y,Tt=G.isBox3?G.max.z-G.min.z:1,E=G.min.x,P=G.min.y,z=G.isBox3?G.min.z:0;else{const Xe=Math.pow(2,-B);Mt=Math.floor(Q.width*Xe),Pt=Math.floor(Q.height*Xe),b.isDataArrayTexture?Tt=Q.depth:b.isData3DTexture?Tt=Math.floor(Q.depth*Xe):Tt=1,E=0,P=0,z=0}X!==null?(j=X.x,ht=X.y,mt=X.z):(j=0,ht=0,mt=0);const $=Rt.convert(O.format),nt=Rt.convert(O.type);let bt;O.isData3DTexture?(Zt.setTexture3D(O,0),bt=L.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(Zt.setTexture2DArray(O,0),bt=L.TEXTURE_2D_ARRAY):(Zt.setTexture2D(O,0),bt=L.TEXTURE_2D),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,O.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,O.unpackAlignment);const _t=L.getParameter(L.UNPACK_ROW_LENGTH),Vt=L.getParameter(L.UNPACK_IMAGE_HEIGHT),Qt=L.getParameter(L.UNPACK_SKIP_PIXELS),pe=L.getParameter(L.UNPACK_SKIP_ROWS),Ee=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,Q.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Q.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,E),L.pixelStorei(L.UNPACK_SKIP_ROWS,P),L.pixelStorei(L.UNPACK_SKIP_IMAGES,z);const ne=b.isDataArrayTexture||b.isData3DTexture,Ie=O.isDataArrayTexture||O.isData3DTexture;if(b.isDepthTexture){const Xe=Ct.get(b),Fe=Ct.get(O),De=Ct.get(Xe.__renderTarget),Ui=Ct.get(Fe.__renderTarget);Dt.bindFramebuffer(L.READ_FRAMEBUFFER,De.__webglFramebuffer),Dt.bindFramebuffer(L.DRAW_FRAMEBUFFER,Ui.__webglFramebuffer);for(let rn=0;rn<Tt;rn++)ne&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Ct.get(b).__webglTexture,B,z+rn),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Ct.get(O).__webglTexture,ct,mt+rn)),L.blitFramebuffer(E,P,Mt,Pt,j,ht,Mt,Pt,L.DEPTH_BUFFER_BIT,L.NEAREST);Dt.bindFramebuffer(L.READ_FRAMEBUFFER,null),Dt.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(B!==0||b.isRenderTargetTexture||Ct.has(b)){const Xe=Ct.get(b),Fe=Ct.get(O);Dt.bindFramebuffer(L.READ_FRAMEBUFFER,la),Dt.bindFramebuffer(L.DRAW_FRAMEBUFFER,ca);for(let De=0;De<Tt;De++)ne?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Xe.__webglTexture,B,z+De):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Xe.__webglTexture,B),Ie?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Fe.__webglTexture,ct,mt+De):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Fe.__webglTexture,ct),B!==0?L.blitFramebuffer(E,P,Mt,Pt,j,ht,Mt,Pt,L.COLOR_BUFFER_BIT,L.NEAREST):Ie?L.copyTexSubImage3D(bt,ct,j,ht,mt+De,E,P,Mt,Pt):L.copyTexSubImage2D(bt,ct,j,ht,E,P,Mt,Pt);Dt.bindFramebuffer(L.READ_FRAMEBUFFER,null),Dt.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else Ie?b.isDataTexture||b.isData3DTexture?L.texSubImage3D(bt,ct,j,ht,mt,Mt,Pt,Tt,$,nt,Q.data):O.isCompressedArrayTexture?L.compressedTexSubImage3D(bt,ct,j,ht,mt,Mt,Pt,Tt,$,Q.data):L.texSubImage3D(bt,ct,j,ht,mt,Mt,Pt,Tt,$,nt,Q):b.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,ct,j,ht,Mt,Pt,$,nt,Q.data):b.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,ct,j,ht,Q.width,Q.height,$,Q.data):L.texSubImage2D(L.TEXTURE_2D,ct,j,ht,Mt,Pt,$,nt,Q);L.pixelStorei(L.UNPACK_ROW_LENGTH,_t),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Vt),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Qt),L.pixelStorei(L.UNPACK_SKIP_ROWS,pe),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Ee),ct===0&&O.generateMipmaps&&L.generateMipmap(bt),Dt.unbindTexture()},this.initRenderTarget=function(b){Ct.get(b).__webglFramebuffer===void 0&&Zt.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?Zt.setTextureCube(b,0):b.isData3DTexture?Zt.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?Zt.setTexture2DArray(b,0):Zt.setTexture2D(b,0),Dt.unbindTexture()},this.resetState=function(){R=0,C=0,I=null,Dt.reset(),xt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return In}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=de._getDrawingBufferColorSpace(t),e.unpackColorSpace=de._getUnpackColorSpace()}}class aa extends ge{constructor(){const t=aa.SkyShader,e=new vn({name:t.name,uniforms:Kr.clone(t.uniforms),vertexShader:t.vertexShader,fragmentShader:t.fragmentShader,side:Ye,depthWrite:!1});super(new xs(1,1,1),e),this.isSky=!0}}aa.SkyShader={name:"SkyShader",uniforms:{turbidity:{value:2},rayleigh:{value:1},mieCoefficient:{value:.005},mieDirectionalG:{value:.8},sunPosition:{value:new D},up:{value:new D(0,1,0)}},vertexShader:`
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

		}`};class Gg extends ge{constructor(t,e={}){super(t),this.isWater=!0;const n=this,i=e.textureWidth!==void 0?e.textureWidth:512,r=e.textureHeight!==void 0?e.textureHeight:512,a=e.clipBias!==void 0?e.clipBias:0,o=e.alpha!==void 0?e.alpha:1,l=e.time!==void 0?e.time:0,c=e.waterNormals!==void 0?e.waterNormals:null,h=e.sunDirection!==void 0?e.sunDirection:new D(.70707,.70707,0),u=new $t(e.sunColor!==void 0?e.sunColor:16777215),d=new $t(e.waterColor!==void 0?e.waterColor:8355711),p=e.eye!==void 0?e.eye:new D(0,0,0),m=e.distortionScale!==void 0?e.distortionScale:20,v=e.side!==void 0?e.side:jn,g=e.fog!==void 0?e.fog:!1,f=new $n,y=new D,w=new D,_=new D,T=new Kt,R=new D(0,0,-1),C=new ue,I=new D,M=new D,S=new ue,U=new Kt,N=new tn,k=new Kn(i,r),q={name:"MirrorShader",uniforms:Kr.merge([yt.fog,yt.lights,{normalSampler:{value:null},mirrorSampler:{value:null},alpha:{value:1},time:{value:0},size:{value:1},distortionScale:{value:20},textureMatrix:{value:new Kt},sunColor:{value:new $t(8355711)},sunDirection:{value:new D(.70707,.70707,0)},eye:{value:new D},waterColor:{value:new $t(5592405)}}]),vertexShader:`
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
				}`},Y=new vn({name:q.name,uniforms:Kr.clone(q.uniforms),vertexShader:q.vertexShader,fragmentShader:q.fragmentShader,lights:!0,side:v,fog:g});Y.uniforms.mirrorSampler.value=k.texture,Y.uniforms.textureMatrix.value=U,Y.uniforms.alpha.value=o,Y.uniforms.time.value=l,Y.uniforms.normalSampler.value=c,Y.uniforms.sunColor.value=u,Y.uniforms.waterColor.value=d,Y.uniforms.sunDirection.value=h,Y.uniforms.distortionScale.value=m,Y.uniforms.eye.value=p,n.material=Y,n.onBeforeRender=function(V,it,W){if(w.setFromMatrixPosition(n.matrixWorld),_.setFromMatrixPosition(W.matrixWorld),T.extractRotation(n.matrixWorld),y.set(0,0,1),y.applyMatrix4(T),I.subVectors(w,_),I.dot(y)>0)return;I.reflect(y).negate(),I.add(w),T.extractRotation(W.matrixWorld),R.set(0,0,-1),R.applyMatrix4(T),R.add(_),M.subVectors(w,R),M.reflect(y).negate(),M.add(w),N.position.copy(I),N.up.set(0,1,0),N.up.applyMatrix4(T),N.up.reflect(y),N.lookAt(M),N.far=W.far,N.updateMatrixWorld(),N.projectionMatrix.copy(W.projectionMatrix),U.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),U.multiply(N.projectionMatrix),U.multiply(N.matrixWorldInverse),f.setFromNormalAndCoplanarPoint(y,w),f.applyMatrix4(N.matrixWorldInverse),C.set(f.normal.x,f.normal.y,f.normal.z,f.constant);const rt=N.projectionMatrix;S.x=(Math.sign(C.x)+rt.elements[8])/rt.elements[0],S.y=(Math.sign(C.y)+rt.elements[9])/rt.elements[5],S.z=-1,S.w=(1+rt.elements[10])/rt.elements[14],C.multiplyScalar(2/C.dot(S)),rt.elements[2]=C.x,rt.elements[6]=C.y,rt.elements[10]=C.z+1-a,rt.elements[14]=C.w,p.setFromMatrixPosition(W.matrixWorld);const at=V.getRenderTarget(),Et=V.xr.enabled,Wt=V.shadowMap.autoUpdate;n.visible=!1,V.xr.enabled=!1,V.shadowMap.autoUpdate=!1,V.setRenderTarget(k),V.state.buffers.depth.setMask(!0),V.autoClear===!1&&V.clear(),V.render(it,N),n.visible=!0,V.xr.enabled=Et,V.shadowMap.autoUpdate=Wt,V.setRenderTarget(at);const le=W.viewport;le!==void 0&&V.state.viewport(le)}}}function wl(s,t=!1){const e=s[0].index!==null,n=new Set(Object.keys(s[0].attributes)),i=new Set(Object.keys(s[0].morphAttributes)),r={},a={},o=s[0].morphTargetsRelative,l=new Me;let c=0;for(let h=0;h<s.length;++h){const u=s[h];let d=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const p in u.attributes){if(!n.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+p+'" attribute exists among all geometries, or in none of them.'),null;r[p]===void 0&&(r[p]=[]),r[p].push(u.attributes[p]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const p in u.morphAttributes){if(!i.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[p]===void 0&&(a[p]=[]),a[p].push(u.morphAttributes[p])}if(t){let p;if(e)p=u.index.count;else if(u.attributes.position!==void 0)p=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,p,h),c+=p}}if(e){let h=0;const u=[];for(let d=0;d<s.length;++d){const p=s[d].index;for(let m=0;m<p.count;++m)u.push(p.getX(m)+h);h+=s[d].attributes.position.count}l.setIndex(u)}for(const h in r){const u=Gc(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(const h in a){const u=a[h][0].length;if(u===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let d=0;d<u;++d){const p=[];for(let v=0;v<a[h].length;++v)p.push(a[h][v][d]);const m=Gc(p);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(m)}}return l}function Gc(s){let t,e,n,i=-1,r=0;for(let c=0;c<s.length;++c){const h=s[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=h.gpuType),i!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}const a=new t(r),o=new Ne(a,e,n);let l=0;for(let c=0;c<s.length;++c){const h=s[c];if(h.isInterleavedBufferAttribute){const u=l/e;for(let d=0,p=h.count;d<p;d++)for(let m=0;m<e;m++){const v=h.getComponent(d,m);o.setComponent(d+u,m,v)}}else a.set(h.array,l);l+=h.count*e}return i!==void 0&&(o.gpuType=i),o}const ve=Math.PI*2,ks=Xn.clamp,ts=(s,t,e)=>(e=ks((e-s)/(t-s),0,1),e*e*(3-2*e));function Pi(s){return()=>{s|=0,s=s+1831565813|0;let t=Math.imul(s^s>>>15,1|s);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}const ja=(s,t)=>Math.sin(s*.213+Math.sin(t*.137)*1.9)*.48+Math.sin(t*.329-s*.079)*.27+Math.cos(s*.741+t*.533)*.13,Be=s=>new $t(s),Ut=new Pe;new D(0,1,0);function Hh(s,t,e=1){const n=document.createElement("canvas");n.width=n.height=s,t(n.getContext("2d"),s);const i=new yl(n);return i.colorSpace=Qe,i.wrapS=i.wrapT=fs,i.repeat.set(e,e),i.anisotropy=4,i}function Ka(s,t=!1){const e=Pi(s);return Hh(256,(n,i)=>{n.fillStyle=t?"#6c7155":"#8b8978",n.fillRect(0,0,i,i);for(let r=0;r<15e3;r++){const a=e()*i,o=e()*i,l=45+e()*110;n.fillStyle=t?`rgba(${l*.8},${l},${l*.61},${.12+e()*.28})`:`rgba(${l*1.06},${l},${l*.85},${.15+e()*.3})`,n.fillRect(a,o,.5+e()*3,.5+e()*3)}n.lineWidth=.7;for(let r=0;r<26;r++){n.strokeStyle=`rgba(31,36,28,${.06+e()*.15})`,n.beginPath();let a=e()*i;n.moveTo(0,a);for(let o=0;o<i;o+=10)a+=(e()-.5)*9,n.lineTo(o,a);n.stroke()}},1)}function Wg(s){const t=Pi(s);return Hh(512,(e,n)=>{const i=e.createRadialGradient(n*.5,n*.5,4,n*.5,n*.5,n*.54);i.addColorStop(0,"#588a39"),i.addColorStop(.6,"#6ca04a"),i.addColorStop(1,"#345d27"),e.fillStyle=i,e.fillRect(0,0,n,n);for(let r=0;r<9e3;r++)e.fillStyle=t()>.5?"rgba(185,214,109,.08)":"rgba(18,58,20,.06)",e.fillRect(t()*n,t()*n,t()*4+1,t()*4+1);for(let r=.18;r<ve-.18;r+=.31){const a=n*.5+Math.cos(r)*n*.49,o=n*.5+Math.sin(r)*n*.49;e.strokeStyle="rgba(191,204,117,.42)",e.lineWidth=1.8,e.beginPath(),e.moveTo(n*.5,n*.5),e.quadraticCurveTo(n*.5+Math.cos(r+.08)*n*.28,n*.5+Math.sin(r+.08)*n*.28,a,o),e.stroke();for(let l=.2;l<.9;l+=.15)for(const c of[-1,1])e.strokeStyle="rgba(186,211,124,.19)",e.lineWidth=.8,e.beginPath(),e.moveTo(n*.5+Math.cos(r)*n*l*.5,n*.5+Math.sin(r)*n*l*.5),e.lineTo(n*.5+Math.cos(r+c*.12)*n*(l+.1)*.5,n*.5+Math.sin(r+c*.12)*n*(l+.1)*.5),e.stroke()}for(let r=0;r<13;r++){const a=t()*ve,o=t()*n*.45;e.fillStyle="rgba(42,56,17,.16)",e.beginPath(),e.ellipse(n*.5+Math.cos(a)*o,n*.5+Math.sin(a)*o,t()*5+2,t()*3+1,a,0,ve),e.fill()}})}function Xg(s){const e=document.createElement("canvas");e.width=e.height=256;const n=e.getContext("2d"),i=n.createImageData(256,256);for(let a=0;a<256;a++)for(let o=0;o<256;o++){const l=(a*256+o)*4,c=o*ve/256,h=a*ve/256,u=Math.cos(c*9+h*7)*.27+Math.cos(c*17-h*11)*.14+Math.sin(c*31+h*19)*.07,d=Math.sin(c*7+h*13)*.27+Math.sin(c*19-h*9)*.13+Math.cos(c*29+h*23)*.08;i.data[l]=128+u*110,i.data[l+1]=128+d*110,i.data[l+2]=245,i.data[l+3]=255}n.putImageData(i,0,0);const r=new yl(e);return r.wrapS=r.wrapT=fs,r.colorSpace=qn,r}function tl(s,t,e=.1,n=1){const i=Pi(n),r=s.attributes.position,a=new Float32Array(r.count*3),o=Be(t);for(let l=0;l<r.count;l++){const c=1+(i()-.5)*e;a[l*3]=o.r*c,a[l*3+1]=o.g*c,a[l*3+2]=o.b*c}return s.setAttribute("color",new Ne(a,3)),s}function Ze(s,t,e,n=12,i=0){const r=new Js(s.map(o=>new D(...o))),a=new sa(r,n,t,5,!1);if(i){const o=a.attributes.position;for(let l=0;l<=n;l++){const c=r.getPointAt(l/n),h=1-i*l/n;for(let u=0;u<=5;u++){const d=l*6+u;o.setXYZ(d,c.x+(o.getX(d)-c.x)*h,c.y+(o.getY(d)-c.y)*h,c.z+(o.getZ(d)-c.z)*h)}}a.computeVertexNormals()}return new ge(a,e)}function yi(s,t=[],e=new Set){s.updateMatrixWorld(!0);const n=new Kt().copy(s.matrixWorld).invert(),i=new Map;s.traverse(r=>{if(!r.isMesh||r.isInstancedMesh||e.has(r)||Array.isArray(r.material))return;const a=r.material.uuid;i.has(a)||i.set(a,{material:r.material,meshes:[]}),i.get(a).meshes.push(r)});for(const{material:r,meshes:a}of i.values()){if(a.length<2)continue;const o=a.map(h=>h.geometry.clone().applyMatrix4(new Kt().multiplyMatrices(n,h.matrixWorld))),l=wl(o,!1);for(const h of o)h.dispose();if(!l)continue;const c=new ge(l,r);c.castShadow=a.some(h=>h.castShadow),c.receiveShadow=!0,t.push(l);for(const h of a){h.removeFromParent();const u=t.indexOf(h.geometry);u>=0&&(t.splice(u,1),h.geometry.dispose())}s.add(c)}}function Za(s=1,t=1,e=.08){const n=[],i=[],r=[];for(let c=0;c<=3;c++)for(let h=0;h<=40;h++){const u=c/3,d=.22+h/40*(ve-.44),p=1+.027*Math.sin(d*7)+.016*Math.cos(d*13),m=Math.cos(d)*u*p,v=Math.sin(d)*u*p;n.push(m*s,e*(u*u)+.014*Math.sin(d*4)*u*u,v*t),i.push(m*.48+.5,v*.48+.5)}for(let c=0;c<3;c++)for(let h=0;h<40;h++){const u=c*41+h,d=u+40+1;r.push(u,u+1,d,d,u+1,d+1)}const l=new Me;return l.setAttribute("position",new oe(n,3)),l.setAttribute("uv",new oe(i,2)),l.setIndex(r),l.computeVertexNormals(),l}function Ja(s){const t=Pi(s),e=28,n=[[-.47,.57],[-.2,.91],[.15,1],[.52,.86],[.71,.61],[.76,.08]],i=[],r=[],a=[],o=Array.from({length:e+1},(h,u)=>.87+.12*Math.sin(u*1.51+s)+t()*.12);o[e]=o[0];for(let h=0;h<n.length;h++)for(let u=0;u<=e;u++){const d=u/e*ve,p=n[h][1]*o[u],m=(Math.sin(d*5+s)+Math.sin(d*9-s))*.045;i.push(Math.cos(d)*p,n[h][0]+m*(h===5?.15:1),Math.sin(d)*p*.86),r.push(Math.cos(d)*p*.5+.5,Math.sin(d)*p*.5+.5)}for(let h=0;h<n.length-1;h++)for(let u=0;u<e;u++){const d=h*(e+1)+u,p=d+e+1;a.push(d,p,d+1,d+1,p,p+1)}const l=i.length/3;i.push(0,.764,0),r.push(.5,.5);for(let h=0;h<e;h++)a.push(l,(n.length-1)*(e+1)+h+1,(n.length-1)*(e+1)+h);const c=new Me;return c.setAttribute("position",new oe(i,3)),c.setAttribute("uv",new oe(r,2)),c.setIndex(a),c.computeVertexNormals(),c}function Vh(s){const t=Pi(s),e=[],n=[],i=[],r=[];for(let o=0;o<5;o++){const l=t()*ve,c=.55+t()*.7,h=.1+t()*.35,u=.022+t()*.035,d=Be(o%2?"#819c42":"#526f33"),p=e.length/3;for(let m=0;m<=7;m++){const v=m/7,g=Math.cos(l)*h*v*v,f=Math.sin(l)*h*v*v,y=u*Math.sin(Math.PI*(v*.94+.04));for(const w of[-1,1])e.push(g+Math.cos(l+Math.PI/2)*y*w,v*c,f+Math.sin(l+Math.PI/2)*y*w),n.push(w*.5+.5,v),r.push(d.r*(.65+v*.35),d.g*(.65+v*.35),d.b*(.65+v*.35))}for(let m=0;m<7;m++){const v=p+m*2;i.push(v,v+1,v+2,v+1,v+3,v+2)}}const a=new Me;return a.setAttribute("position",new oe(e,3)),a.setAttribute("uv",new oe(n,2)),a.setAttribute("color",new oe(r,3)),a.setIndex(i),a.computeVertexNormals(),a}function $g(){const s=new sa(new Js([new D,new D(.03,.8,.015),new D(.1,1.8,.04)]),9,.013,5,!1);tl(s,"#64754a",.15,8);const t=new ia(1,7,7);t.scale(.065,.25,.065),t.translate(.1,1.61,.04),tl(t,"#5d3f27",.3,5);const e=Vh(92);e.scale(.8,1.45,.8);const n=wl([s,t,e],!1);return s.dispose(),t.dispose(),e.dispose(),n}function qg(s){const t=new ia(1,13,9),e=t.attributes.position;for(let n=0;n<e.count;n++){const i=e.getX(n),r=e.getY(n),a=e.getZ(n),o=1+.06*Math.sin(i*12+s)*Math.sin(a*13-r*7);e.setXYZ(n,i*o,r*.83*o,a*o)}return t.computeVertexNormals(),t}function Yg(){const s=[],t=[],e=[];function n(r,a,o,l){const c=s.length/3;s.push(...r,...a,...o);const h=Be(l);for(let u=0;u<3;u++)t.push(h.r,h.g,h.b);e.push(c,c+1,c+2)}n([0,.025,-.1],[-.045,0,0],[0,.04,.09],"#16201b"),n([0,.025,-.1],[0,.04,.09],[.045,0,0],"#293327"),n([0,0,0],[-.17,.025,-.035],[-.12,.015,.07],"#a0b3b0"),n([0,0,0],[.12,.015,.07],[.17,.025,-.035],"#a0b3b0");const i=new Me;return i.setAttribute("position",new oe(s,3)),i.setAttribute("color",new oe(t,3)),i.setIndex(e),i.computeVertexNormals(),i}function jg(s,t,e={}){const n=e.seed??731,i=Pi(n),r=new ke;r.name="The living creek",s.add(r);const a=[],o=[],l=new Set,c=[],h=new Map,u=6;new $t("#8aaab0");const d=new $t("#819e91");s.fog||(s.fog=new na(d,.0042));const p=Ka(n),m=Ka(n+9,!0),v=Wg(n),g=Xg();c.push(p,m,v,g);const f={terrain:new Oe({color:16777215,vertexColors:!0,map:m,roughness:1}),leaf:new Oe({color:"#b5d28f",map:v,roughness:.44,metalness:.025,side:Le}),rock:new Oe({color:"#a4a292",map:p,roughness:.89}),mossRock:new Oe({color:"#89976c",map:m,roughness:.94}),plant:new Oe({color:16777215,vertexColors:!0,roughness:.87,side:Le}),bark:new Oe({color:"#65513a",map:p,roughness:.94}),reed:new Oe({color:"#b4a676",map:p,roughness:.83}),compost:new Oe({color:"#57422e",map:m,roughness:1}),fruit:new Oe({color:"#b38539",map:p,roughness:.75}),darkFruit:new Oe({color:"#685831",map:m,roughness:.95})},y=[Ja(7),Ja(35),Ja(89)],w=Za(),_=qg(19),T=[{id:"home",x:8,z:8,radius:7.4,team:"neutral",name:"Willow Haven"},{id:"mudfang",x:-31,z:-30,radius:7,team:"enemy",name:"Mudfang Den"},{id:"redreed",x:31,z:-56,radius:7.6,team:"enemy",name:"Red Reed Stronghold"},{id:"mossjaw",x:-24,z:49,radius:7.1,team:"enemy",name:"Mossjaw Hollow"},{id:"blackpool",x:34,z:79,radius:8,team:"enemy",name:"Blackwater Nest"},{id:"thornback",x:-8,z:-91,radius:8,team:"enemy",name:"Thornback Root"},{id:"oldwillow",x:-38,z:96,radius:7.5,team:"enemy",name:"Old Willow Court"},{id:"quietbend",x:29,z:32,radius:6.8,team:"neutral",name:"Quiet Bend"},{id:"foxglove",x:-39,z:2,radius:6.8,team:"neutral",name:"Foxglove Island"}];function R(E,P){const z=Math.sin(P*.032)*15+Math.sin(P*.073)*5,j=Math.abs(E-z);let ht=-2.2+ja(E,P)*.47+ts(44,71,j)*6;ht+=ts(105,132,Math.abs(P))*4.8;for(const mt of T){const Q=E-mt.x,$=P-mt.z,nt=Math.hypot(Q,$),bt=mt.radius*(1+.06*Math.sin(Math.atan2($,Q)*5+mt.x));if(nt<bt+3.8){const _t=.39+ja(E*1.7,P*1.7)*.07-ts(bt*.65,bt+3.8,nt)*2.8;ht=Math.max(ht,_t)}}return ht}const C=new Ci(270,270,180,180);C.rotateX(-Math.PI/2);const I=C.attributes.position,M=new Float32Array(I.count*3),S=Be("#8b8a62"),U=Be("#43533b"),N=Be("#52634e");for(let E=0;E<I.count;E++){const P=I.getX(E),z=I.getZ(E),j=R(P,z);I.setY(E,j);const ht=N.clone().lerp(U,ts(-1.7,.05,j)).lerp(S,ts(.02,2,j));ht.multiplyScalar(.88+ja(P*2,z*2)*.18),ht.toArray(M,E*3)}C.setAttribute("color",new Ne(M,3)),C.computeVertexNormals(),m.repeat.set(44,44);const k=new ge(C,f.terrain);k.receiveShadow=!0,r.add(k);const q=Ka(n+9,!0);c.push(q),f.mossRock.map=q,f.compost.map=q,f.darkFruit.map=q;const Y=new Ci(266,266,88,88),V=new Gg(Y,{textureWidth:512,textureHeight:512,waterNormals:g,sunDirection:new D(.6,.8,-.3),sunColor:16771517,waterColor:3039835,distortionScale:2.5,alpha:.91,fog:!0});V.name="Reflecting creek",V.rotation.x=-Math.PI/2,V.position.y=-.035,V.material.transparent=!0,V.material.depthWrite=!1,V.renderOrder=-2,V.material.uniforms.size.value=4.8,r.add(V);const it=Y.attributes.position.array.slice(),W=[],rt=new ke,at=[];rt.name="Willow trunks and tangled roots",r.add(rt);for(let E of[-1,1])for(let P=0;P<15;P++){const z=-122+P*17+(i()-.5)*7,j=E*(59+i()*15)+Math.sin(z*.032)*15,ht=R(j,z);if(ht<.2)continue;const mt=new ke;mt.position.set(j,ht,z);const Q=9+i()*14,$=(i()-.5)*3,nt=Ze([[0,-.8,0],[.25,Q*.3,0],[$,Q*.72,.6],[$*.8,Q,1]],.68+i()*.65,f.bark,13,.72);nt.castShadow=!0,mt.add(nt),W.push(nt.geometry);for(let bt=0;bt<5;bt++){const _t=bt/5*ve+i(),Vt=3+i()*4,Qt=Ze([[0,.7,0],[Math.cos(_t)*Vt*.45,.1,Math.sin(_t)*Vt*.45],[Math.cos(_t)*Vt,-.4,Math.sin(_t)*Vt]],.15+i()*.2,f.bark,9,.82);Qt.castShadow=!0,mt.add(Qt),W.push(Qt.geometry)}for(let bt=0;bt<4;bt++){const _t=i()*ve,Vt=Q*(.5+i()*.3),Qt=3+i()*6,pe=Ze([[$*.4,Vt,0],[Math.cos(_t)*Qt*.45,Vt+2,Math.sin(_t)*Qt*.45],[Math.cos(_t)*Qt,Vt+3,Math.sin(_t)*Qt]],.16+i()*.2,f.bark,10,.83);mt.add(pe),W.push(pe.geometry);for(let Ee=0;Ee<70;Ee++){const ne=Math.sqrt(i())*4,Ie=i()*ve;at.push({x:j+Math.cos(_t)*Qt+Math.cos(Ie)*ne,y:ht+Vt+3+(i()-.5)*3-Math.abs(ne)*.25,z:z+Math.sin(_t)*Qt+Math.sin(Ie)*ne,angle:i()*ve,scale:.65+i()*.6})}}rt.add(mt)}yi(rt,W);const Et=new Me;Et.setAttribute("position",new oe([0,0,0,-.12,-.32,.035,0,-.38,.06,.12,-.32,.035,-.1,-.64,.02,0,-.76,.04,.1,-.64,.02,0,-1.05,0],3)),Et.setAttribute("uv",new oe([.5,0,0,.3,.5,.35,1,.3,0,.6,.5,.7,1,.6,.5,1],2)),Et.setIndex([0,1,2,0,2,3,1,4,2,2,4,5,2,5,6,2,6,3,4,7,5,5,7,6]),Et.computeVertexNormals(),tl(Et,"#69834d",.25,n);const Wt=new bn(Et,f.plant,at.length);Wt.name="Hanging willow foliage",at.forEach((E,P)=>{Ut.position.set(E.x,E.y,E.z),Ut.rotation.set((i()-.5)*.8,E.angle,(i()-.5)*.7),Ut.scale.setScalar(E.scale),Ut.updateMatrix(),Wt.setMatrixAt(P,Ut.matrix)}),r.add(Wt);function le(E){a.push(E);const P=Math.floor((E.x-E.radius)/u),z=Math.floor((E.x+E.radius)/u),j=Math.floor((E.z-E.radius)/u),ht=Math.floor((E.z+E.radius)/u);for(let mt=P;mt<=z;mt++)for(let Q=j;Q<=ht;Q++){const $=mt+":"+Q;h.has($)||h.set($,[]),h.get($).push(E)}return E}const he=[],Bt=[[],[],[]];function K(E,P,z=1.35+i()*.9){const j=le({id:"p"+a.length,type:"lily",x:E,z:P,y:.105,radius:z*.91,visualRadius:z,angle:i()*ve,phase:i()*ve});return he.push(j),j}function J(E,P,z=1.3+i()*1.3,j=.65+i()*.65){const ht=Math.floor(i()*3),mt=le({id:"p"+a.length,type:"rock",x:E,z:P,y:j*.76-.05,radius:z*.72,visualRadius:z,scaleY:j,angle:i()*ve,variant:ht});return Bt[ht].push(mt),mt}K(0,0,3.1),K(3.7,1,2.3),J(-3.9,2.2,2.5,.9);function ft(E,P){const z=Math.hypot(P.x-E.x,P.z-E.z),j=Math.ceil(z/3.65);for(let ht=1;ht<j;ht++){const mt=ht/j,Q=E.x+(P.x-E.x)*mt+Math.sin(mt*Math.PI*3)*1.25,$=E.z+(P.z-E.z)*mt;R(Q,$)>-.1||(i()<.18?J(Q,$,1.8+i()*.7,.65+i()*.55):K(Q,$,1.65+i()*.65))}}const dt={x:0,z:0};ft(dt,T[0]);for(const E of T)ft(dt,E);for(let E=1;E<T.length;E++)ft(T[E-1],T[E]);for(let E=0;E<670;E++){const P=(i()-.5)*218,z=(i()-.5)*108+Math.sin(P*.032)*10;R(z,P)>-.18||(h.get(Math.floor(z/u)+":"+Math.floor(P/u))||[]).some(ht=>Math.hypot(ht.x-z,ht.z-P)<ht.radius+1)||(i()<.15?J(z,P,1.1+i()*2.3,.55+i()*1.2):K(z,P,1.1+i()*1.1))}for(const E of T)le({id:"island-"+E.id,type:"land",x:E.x,z:E.z,y:.39,radius:E.radius*.8});const St=new bn(w,f.leaf,he.length);St.name="Veined water lily leaves",St.castShadow=!0,St.receiveShadow=!0,St.instanceMatrix.setUsage(Mi),he.forEach((E,P)=>{Ut.position.set(E.x,E.y,E.z),Ut.rotation.set((i()-.5)*.04,E.angle,(i()-.5)*.035),Ut.scale.set(E.visualRadius,1,E.visualRadius*(.89+i()*.18)),Ut.updateMatrix(),St.setMatrixAt(P,Ut.matrix),St.setColorAt(P,Be(["#b6cf8a","#88ac67","#749d59","#c0cc7e","#729958"][Math.floor(i()*5)]))}),r.add(St),Bt.forEach((E,P)=>{const z=new bn(y[P],P===1?f.mossRock:f.rock,E.length);z.name="Weathered waterline outcrops",z.castShadow=!0,z.receiveShadow=!0,E.forEach((j,ht)=>{Ut.position.set(j.x,-.05,j.z),Ut.rotation.set(0,j.angle,0),Ut.scale.set(j.visualRadius,j.scaleY,j.visualRadius),Ut.updateMatrix(),z.setMatrixAt(ht,Ut.matrix),z.setColorAt(ht,Be("#ffffff").multiplyScalar(.7+i()*.4))}),r.add(z)});const jt=new Me,we=[],L=[],fe=[];for(let E=0;E<=9;E++){const P=E/9,z=Math.sin(P*Math.PI)*.16;for(const j of[-1,1])we.push(j*z,.13*Math.sin(P*Math.PI)+.23*P*P,P*.65),L.push(j*.5+.5,P)}for(let E=0;E<9;E++){const P=E*2;fe.push(P,P+1,P+2,P+1,P+3,P+2)}jt.setAttribute("position",new oe(we,3)),jt.setAttribute("uv",new oe(L,2)),jt.setIndex(fe),jt.computeVertexNormals();const qt=new Oe({color:"#f4e5d5",roughness:.48,side:Le}),Xt=he.filter((E,P)=>P%23===5),Dt=new bn(jt,qt,Xt.length*13);let _e=0;for(const E of Xt)for(let P=0;P<13;P++)Ut.position.set(E.x+.24,E.y+.045,E.z),Ut.rotation.set(P>7?.1:0,P/8*ve,P>7?.1:0),Ut.scale.setScalar(P>7?.67:1),Ut.updateMatrix(),Dt.setMatrixAt(_e++,Ut.matrix);r.add(Dt);const Ct=[];for(let E=0;E<21500;E++){const P=(i()-.5)*254,z=(i()-.5)*254,j=R(P,z);j<-.52||j>3.2||T.some(ht=>Math.hypot(ht.x-P,ht.z-z)<ht.radius*.68)||Math.hypot(P,z)<8||Ct.push({x:P,z,y:j,scale:.65+i()*2.2,angle:i()*ve})}const Zt=Vh(44),be=new bn(Zt,f.plant,Ct.length);be.name="Curved river reeds",be.receiveShadow=!0,Ct.forEach((E,P)=>{Ut.position.set(E.x,E.y,E.z),Ut.rotation.set(0,E.angle,0),Ut.scale.set(.65+E.scale*.25,E.scale,.65+E.scale*.25),Ut.updateMatrix(),be.setMatrixAt(P,Ut.matrix),be.setColorAt(P,Be("#ffffff").multiplyScalar(.75+i()*.5))}),r.add(be);const Se=Ct.filter((E,P)=>E.y<.5&&P%5===0),A=$g(),x=new bn(A,f.plant,Se.length);Se.forEach((E,P)=>{Ut.position.set(E.x+.12,E.y,E.z),Ut.rotation.set(0,E.angle,0),Ut.scale.setScalar(.7+E.scale*.4),Ut.updateMatrix(),x.setMatrixAt(P,Ut.matrix)}),r.add(x);const H={value:0};f.plant.onBeforeCompile=E=>{E.uniforms.uCreekTime=H,E.vertexShader=`uniform float uCreekTime;
`+E.vertexShader,E.vertexShader=E.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
 transformed.x += sin(uCreekTime * 1.1 + position.y * 2.3 + instanceMatrix[3].x * .13 + instanceMatrix[3].z * .17) * pow(max(position.y, 0.0), 1.6) * .035;`)},f.plant.customProgramCacheKey=()=>"creek-wind-1";function tt(E,P){let z=R(E,P),j=z>-.1?"land":"water",ht=null;z<=-.1&&(z=-.25);const mt=h.get(Math.floor(E/u)+":"+Math.floor(P/u))||[];for(const Q of mt){if(Q.type==="land")continue;const $=Math.hypot(E-Q.x,P-Q.z);if($<=Q.radius){let nt=Q.y;Q.type==="rock"&&(nt-=ts(Q.radius*.62,Q.radius,$)*.14*Q.scaleY),nt>z&&(z=nt,j=Q.type,ht=Q)}}return{height:z,type:j,platform:ht}}function st(E,P){return tt(E,P).height}const Z=[{x:4.5,z:-4,rich:!1},{x:-10,z:12,rich:!0},{x:15,z:-20,rich:!1},{x:-25,z:-23,rich:!0},{x:26,z:-47,rich:!0},{x:-17,z:40,rich:!0},{x:27,z:69,rich:!0},{x:-4,z:-81,rich:!0},{x:-34,z:86,rich:!0},{x:23,z:26,rich:!1},{x:-33,z:7,rich:!1},{x:4,z:51,rich:!1},{x:9,z:-59,rich:!1},{x:-12,z:76,rich:!1},{x:39,z:-4,rich:!1},{x:-42,z:-59,rich:!0}],zt=[],pt=[],Lt=new ke;r.add(Lt);for(let E=0;E<Z.length;E++){const P=Z[E];R(P.x,P.z)<-.15&&J(P.x,P.z,P.rich?3.2:2.2,.62);const j=st(P.x,P.z),ht={id:"flies-"+E,x:P.x,z:P.z,y:j+.25,flies:P.rich?240:100,maxFlies:P.rich?240:100,rich:P.rich};o.push(ht);const mt=new ge(y[E%3],f.compost);mt.position.set(P.x,j+.05,P.z),mt.scale.set(P.rich?1.7:1.05,.28,P.rich?1.25:.75),mt.rotation.y=i()*ve,r.add(mt);for(let Q=0;Q<(P.rich?12:6);Q++){const $=i()*ve,nt=i()*(P.rich?1.5:.85);zt.push({x:P.x+Math.cos($)*nt,y:j+.12+i()*.16,z:P.z+Math.sin($)*nt,scale:.12+i()*.18,rot:i()*ve})}for(let Q=0;Q<3;Q++){const $=i()*ve,nt=.7+i()*.8,bt=Ze([[0,0,0],[nt*.5,.02,.06],[nt,.04,.14]],.035,f.bark,4);bt.position.set(P.x+(i()-.5)*1.6,j+.1,P.z+(i()-.5)*1.6),bt.rotation.y=$,Lt.add(bt),pt.push(bt.geometry)}}yi(Lt,pt);for(const E of Z)if(R(E.x,E.z)<-.15){const P=Bt.flat().find(z=>Math.abs(z.x-E.x)<.01&&Math.abs(z.z-E.z)<.01);if(P){const z=new ge(y[P.variant],f.mossRock);z.position.set(P.x,-.05,P.z),z.rotation.y=P.angle,z.scale.set(P.visualRadius,P.scaleY,P.visualRadius),z.castShadow=!0,z.receiveShadow=!0,r.add(z)}}const Nt=new bn(_,f.fruit,zt.length);zt.forEach((E,P)=>{Ut.position.set(E.x,E.y,E.z),Ut.rotation.set(.3,E.rot,.2),Ut.scale.setScalar(E.scale),Ut.updateMatrix(),Nt.setMatrixAt(P,Ut.matrix),Nt.setColorAt(P,Be(["#cb9d59","#6d7341","#aa7044","#c5ad62"][P%4]))}),r.add(Nt);const lt=[];for(let E=0;E<o.length;E++)for(let P=0;P<(o[E].rich?65:30);P++)lt.push({spot:E,phase:i()*ve,phase2:i()*ve,r:.25+i()*(o[E].rich?2.3:1.35),height:.45+i()*1.9,speed:.65+i()*1.7,rank:P});const wt=new Oe({vertexColors:!0,roughness:.45,side:Le}),kt=new bn(Yg(),wt,lt.length);kt.instanceMatrix.setUsage(Mi),kt.frustumCulled=!1,kt.name="Fly swarms",r.add(kt);const Rt=64,xt=new Ci(2,2),Ht=new nf;xt.rotateX(-Math.PI/2),Ht.index=xt.index,Ht.attributes.position=xt.attributes.position,Ht.attributes.uv=xt.attributes.uv;const F=new Float32Array(Rt*3),ut=new Float32Array(Rt).fill(-100),gt=new Float32Array(Rt),At=new Float32Array(Rt*3);Ht.setAttribute("aCenter",new is(F,3)),Ht.setAttribute("aStart",new is(ut,1)),Ht.setAttribute("aSize",new is(gt,1)),Ht.setAttribute("aTint",new is(At,3)),Ht.instanceCount=Rt;const ot=new vn({transparent:!0,depthWrite:!1,side:Le,uniforms:{uTime:{value:0}},vertexShader:"attribute vec3 aCenter; attribute float aStart; attribute float aSize; attribute vec3 aTint; uniform float uTime; varying vec2 vUv; varying float vLife; varying vec3 vTint; void main(){vUv=uv; vLife=(uTime-aStart)/2.4; vTint=aTint; vec3 p=position*aSize*(.35+clamp(vLife,0.,1.)*3.8)+aCenter; gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}",fragmentShader:"varying vec2 vUv;varying float vLife;varying vec3 vTint;void main(){if(vLife<0.||vLife>1.)discard;float r=length(vUv-.5)*2.;float band=exp(-pow((r-.82)/(.026+vLife*.018),2.))* .58+exp(-pow((r-.64)/.026,2.))*.22;float a=band*pow(1.-vLife,1.6);gl_FragColor=vec4(vTint,a);}"}),et=new ge(Ht,ot);et.frustumCulled=!1,et.renderOrder=2,r.add(et);let It=0,Yt=0;const ce=1100,re=new Float32Array(ce*3),hn=new Float32Array(ce*3),sn=new Float32Array(ce),ui=new Float32Array(ce),Rn=Array.from({length:ce},()=>({life:0,max:1,vx:0,vy:0,vz:0,water:!0}));let Ms=0;const un=new Me;un.setAttribute("position",new Ne(re,3).setUsage(Mi)),un.setAttribute("aColor",new Ne(hn,3).setUsage(Mi)),un.setAttribute("aSize",new Ne(sn,1).setUsage(Mi)),un.setAttribute("aAlpha",new Ne(ui,1).setUsage(Mi));const nr=new vn({transparent:!0,depthWrite:!1,uniforms:{uScale:{value:500}},vertexShader:"attribute vec3 aColor;attribute float aSize;attribute float aAlpha;uniform float uScale;varying vec3 vColor;varying float vAlpha;void main(){vColor=aColor;vAlpha=aAlpha;vec4 mv=modelViewMatrix*vec4(position,1.);gl_Position=projectionMatrix*mv;gl_PointSize=clamp(aSize*uScale/max(.1,-mv.z),1.,35.);}",fragmentShader:"varying vec3 vColor;varying float vAlpha;void main(){vec2 p=gl_PointCoord-.5;float d=length(p)*2.;if(d>1.)discard;float shade=.6+.4*max(0.,1.-length(p-vec2(-.12,.12))*2.);gl_FragColor=vec4(vColor*shade,smoothstep(1.,.55,d)*vAlpha);}"}),Qn=new Nd(un,nr);Qn.frustumCulled=!1,Qn.renderOrder=3,r.add(Qn);function bs(E,P,z){const j=It++%Rt;F.set([E.x,Math.max(-.005,(E.y??0)+.025),E.z],j*3),ut[j]=Yt,gt[j]=.7+P*.7,Be(z??"#c2e1d5").toArray(At,j*3);for(const mt of["aCenter","aStart","aSize","aTint"])Ht.attributes[mt].needsUpdate=!0}function di(E,P,z,j){const ht=Math.min(90,Math.round(18+P*21)),mt=Be(z??(j?"#b2d7ce":"#d5bc80"));for(let Q=0;Q<ht;Q++){const $=Ms++%ce,nt=Rn[$],bt=i()*ve,_t=(.6+i()*2.7)*Math.sqrt(P);nt.life=nt.max=.5+i()*.8,nt.vx=Math.cos(bt)*_t,nt.vz=Math.sin(bt)*_t,nt.vy=(1.5+i()*4)*Math.sqrt(P),nt.water=j,re.set([E.x+(i()-.5)*.3,(E.y??0)+.12,E.z+(i()-.5)*.3],$*3),mt.clone().multiplyScalar(.85+i()*.3).toArray(hn,$*3),sn[$]=(.045+i()*.085)*(j?1:.8),ui[$]=.9}un.attributes.aColor.needsUpdate=!0,un.attributes.aSize.needsUpdate=!0}function ir(E,P=1,z){P=ks(P,.1,4),bs({x:E.x,y:.01,z:E.z},P,z),di({x:E.x,y:.03,z:E.z},P,z,!0)}function sr(E,P="#e9cb87",z=1){di(E,z,P,!1),tt(E.x,E.z).type==="water"&&bs({x:E.x,y:.01,z:E.z},z,P)}function rr(E,P,z,j=1){const ht=[],mt=[],Q=[],$=[],nt=Pi(j),bt=16,_t=20;for(let Qt=0;Qt<=bt;Qt++)for(let pe=0;pe<=_t;pe++){const Ee=pe/_t*2-1,ne=Qt/bt,Ie=.5+Math.sqrt(Math.max(0,1-Ee*Ee))*z+.06*Math.sin(ne*23+Ee*5),Xe=Ee*E*(.97+.025*Math.sin(ne*19));ht.push(Xe,Ie,(ne-.5)*P),mt.push(pe/_t,Qt/bt),Be("#809549").multiplyScalar(.85+nt()*.23).toArray($,$.length)}for(let Qt=0;Qt<bt;Qt++)for(let pe=0;pe<_t;pe++){const Ee=Qt*(_t+1)+pe,ne=Ee+_t+1;Q.push(Ee,ne,Ee+1,ne,ne+1,Ee+1)}const Vt=new Me;return Vt.setAttribute("position",new oe(ht,3)),Vt.setAttribute("uv",new oe(mt,2)),Vt.setAttribute("color",new oe($,3)),Vt.setIndex(Q),Vt.computeVertexNormals(),Vt}function Ss(E,P,z){const j=new ke,ht=new Oe({color:"#a6bf76",map:v,vertexColors:!0,roughness:.78,side:Le});z.push(ht);const mt=rr(1.75,3.8,1.95,n+Math.round(E*7));z.push(mt);const Q=new ge(mt,ht);Q.castShadow=!0,Q.receiveShadow=!0,j.add(Q);for(let $=0;$<8;$++){const nt=-1.85+$*.53,bt=[];for(let Vt=0;Vt<=12;Vt++){const Qt=Vt/12*Math.PI;bt.push([Math.cos(Qt)*1.75,.5+Math.sin(Qt)*1.96+.025,nt+.025*Math.sin(Qt*4)])}const _t=Ze(bt,.038,f.reed,18);z.push(_t.geometry),j.add(_t)}for(let $ of[-1,1])for(let nt=0;nt<5;nt++){const bt=-1.6+nt*.8,_t=Ze([[$*1.68,-.08,bt],[$*1.7,.45,bt],[$*1.38,1.5,bt]],.052,f.bark,5);z.push(_t.geometry),j.add(_t)}for(let $=0;$<7;$++){const nt=.16+$*.12,bt=Ze([[-1.65,nt,-1.8],[0,nt+.025,-1.88],[1.65,nt,-1.8]],.036,f.reed,8);z.push(bt.geometry),j.add(bt)}return yi(j,z,new Set([Q])),j.scale.setScalar(E),j.userData.roof=Q,j}const fi={player:"#8ecf75",friendly:"#8ecf75",ally:"#8ecf75",enemy:"#cf7554",neutral:"#ceb785"};function ar(E){if(typeof E=="string"&&E.startsWith("enemy")){const P=["#cf7554","#c8a456","#a57db4","#69a3a4","#c38c55","#8d809d"],z=parseInt(E.replace(/\D/g,""),10)||0;return P[z%P.length]}return fi[E]||fi.neutral}function la(E,P){const z=new ke,j=Ze([[0,0,0],[.04,1.6,0],[-.03,3.1,.02]],.047,f.bark,7);P.push(j.geometry),z.add(j);const ht=new Me,mt=[0,2.93,0,.9,2.8,.09,1.13,2.12,.02,.6,2.25,-.03,0,2.18,0],Q=[0,1,1,1,1,0,.5,.1,0,0];ht.setAttribute("position",new oe(mt,3)),ht.setAttribute("uv",new oe(Q,2)),ht.setIndex([0,1,3,1,2,3,0,3,4]),ht.computeVertexNormals();const $=new Oe({color:ar(E),roughness:.8,side:Le,map:v}),nt=new ge(ht,$);return nt.castShadow=!0,z.add(nt),z.userData.flag=nt,P.push(ht,$),z}function ca(E){const P=new ke;P.name="Shelter "+(E.id??""),P.position.set(E.x,st(E.x,E.z),E.z),P.userData.id=E.id,P.userData.owned=[];const z=P.userData.owned,j=Ss(1,fi[E.team],z);j.position.set(-.55,.04,-.5),P.add(j),P.userData.core=j;const ht=la(E.team,z);ht.position.set(1.8,0,1.1),P.add(ht),P.userData.banner=ht;const mt=new ke;mt.name="Additional sleeping leaves";const Q=Ss(.62,fi[E.team],z);Q.position.set(-3,.01,.2),Q.rotation.y=-.5,mt.add(Q),P.add(mt),P.userData.extra=mt;const $=new ke;$.name="Hatchery";const nt=Ss(.52,fi[E.team],z);nt.position.set(3.05,0,-1.8),nt.rotation.y=.7,$.add(nt);for(let vt=0;vt<5;vt++){const ae=[];for(let xn=0;xn<=24;xn++){const On=xn/24*ve;ae.push([3.05+Math.cos(On)*.74,.06+vt*.065,-1.7+Math.sin(On)*.63])}const Ce=Ze(ae,.035,f.reed,25);z.push(Ce.geometry),$.add(Ce)}yi($,z),P.add($),P.userData.nursery=$;const bt=new ke;bt.name="Leaf-wrapped food cache",bt.position.set(-2.8,.04,2.2);const _t=new bn(_,f.fruit,15);for(let vt=0;vt<15;vt++)Ut.position.set(vt%4*.32-.5,Math.floor(vt/8)*.25+.15,Math.floor(vt/4)%2*.35),Ut.scale.setScalar(.22+vt%3*.025),Ut.rotation.set(vt*.7,vt*.4,0),Ut.updateMatrix(),_t.setMatrixAt(vt,Ut.matrix),_t.setColorAt(vt,Be(vt%3?"#b7b06c":"#6d673f"));bt.add(_t);for(let vt=0;vt<3;vt++){const ae=Ze([[-.85,.05,-.3+vt*.45],[0,.02,-.3+vt*.45],[.85,.08,-.3+vt*.45]],.075,f.bark,5);z.push(ae.geometry),bt.add(ae)}const Vt=new ge(Za(1,.8,.23),f.leaf);Vt.position.set(0,.5,.1),Vt.rotation.z=.17,z.push(Vt.geometry),bt.add(Vt),yi(bt,z),P.add(bt),P.userData.storage=bt,P.userData.foodMesh=_t,P.userData.storageCover=Vt;const Qt=new ke;Qt.name="Lookout perch",Qt.position.set(3.1,0,2.5);for(let vt=0;vt<3;vt++){const ae=vt/3*ve,Ce=Ze([[Math.cos(ae)*.7,-.1,Math.sin(ae)*.7],[Math.cos(ae)*.44,1.4,Math.sin(ae)*.44],[Math.cos(ae)*.35,2.65,Math.sin(ae)*.35]],.085,f.bark,7);z.push(Ce.geometry),Qt.add(Ce)}for(let vt=0;vt<8;vt++){const ae=-.6+vt*.17,Ce=Ze([[-.7,2.35,ae],[0,2.32,ae],[.7,2.36,ae]],.06,f.reed,4);z.push(Ce.geometry),Qt.add(Ce)}const pe=new ge(Za(1.1,.9,.08),f.leaf);pe.position.y=3.15,pe.rotation.x=.17,z.push(pe.geometry),Qt.add(pe);for(let vt=0;vt<6;vt++){const ae=Ze([[-.25,vt*.34,.63],[.25,vt*.34,.63]],.035,f.reed,2);z.push(ae.geometry),Qt.add(ae)}yi(Qt,z),P.add(Qt),P.userData.watchtower=Qt;const Ee=new ke;Ee.name="Root-and-reed defences";const ne=[];for(let vt=0;vt<54;vt++){const ae=vt/54*ve;if(Math.abs(Math.sin(ae))<.19)continue;const Ce=Math.cos(ae)*5.2,xn=Math.sin(ae)*4.5,On=.65+vt%5*.12,ws=Ze([[Ce,-.07,xn],[Ce*1.008,On*.6,xn*1.008],[Ce*1.025,On,xn*1.025]],.055,f.bark,3);ne.push(ws.geometry)}const Ie=wl(ne,!1);for(const vt of ne)vt.dispose();const Xe=new ge(Ie,f.bark);Xe.castShadow=!0,z.push(Ie),Ee.add(Xe),P.add(Ee),P.userData.palisade=Ee;const Fe=new bn(y[1],f.mossRock,25);for(let vt=0;vt<25;vt++){const ae=vt/25*ve;Ut.position.set(Math.cos(ae)*2.15,-.12,Math.sin(ae)*2.35-.5),Ut.rotation.set(0,ae,0),Ut.scale.set(.25,.25,.25),Ut.updateMatrix(),Fe.setMatrixAt(vt,Ut.matrix)}P.add(Fe);const De=new ke;De.name="Collapsed shelter remains";const Ui=new Oe({color:"#839061",map:v,roughness:.94,side:Le});z.push(Ui);for(let vt=0;vt<6;vt++){const ae=rr(.62+vt%3*.16,1.35+vt%2*.55,.14+vt%3*.05,n+vt*19),Ce=new ge(ae,Ui);Ce.position.set(-1.3+vt%3*.85,-.46+vt%2*.04,-1.5+Math.floor(vt/3)*1.7),Ce.rotation.set((vt%2-.5)*.24,vt*1.71,(vt%3-1)*.13),Ce.castShadow=!0,z.push(ae),De.add(Ce)}for(let vt=0;vt<22;vt++){const ae=vt*2.399,Ce=.65+vt%5*.27,xn=Math.cos(ae)*(vt<14?1.2:3.4),On=Math.sin(ae)*(vt<14?1.6:2.8)-.3,ws=Ze([[xn,.055,On],[xn+Math.cos(ae+.7)*Ce*.6,.11+vt%3*.07,On+Math.sin(ae+.7)*Ce*.6],[xn+Math.cos(ae+.7)*Ce,.04+vt%4*.06,On+Math.sin(ae+.7)*Ce]],vt%2?.045:.065,vt%2?f.reed:f.bark,4);ws.castShadow=!0,z.push(ws.geometry),De.add(ws)}yi(De,z),P.add(De),P.userData.ruin=De;const rn=new bn(_,f.fruit,8);rn.name="Supplies exposed in the ruins";for(let vt=0;vt<8;vt++)Ut.position.set(-.5+vt%4*.29,.12+Math.floor(vt/4)*.08,1.35+Math.floor(vt/4)*.31),Ut.rotation.set(vt*.43,vt*1.31,.2),Ut.scale.setScalar(.16+vt%3*.025),Ut.updateMatrix(),rn.setMatrixAt(vt,Ut.matrix),rn.setColorAt(vt,Be(vt%2?"#a99958":"#d9a253"));P.add(rn),P.userData.looseLoot=rn;const Al=new Oe({color:"#edc371",emissive:"#e5a64c",emissiveIntensity:.7,roughness:.7});z.push(Al);const or=new ge(_,Al);or.position.set(1.7,.55,1.1),or.scale.set(.15,.22,.15),P.add(or),P.userData.lamp=or;const ha=new tf("#ffd098",1.8,12,2);return ha.position.set(0,2.3,1.8),P.add(ha),P.userData.light=ha,r.add(P),l.add(P),b(P,E),P}function b(E,P={}){if(!E)return;const z=E.userData.visualState||{},j={...z,...P},ht=Math.max(1,j.tier??1),mt=j.buildings||{},Q=ks((j.hp??j.maxHp??100)/(j.maxHp??100),0,1),$=!!j.destroyed||Q<=0,nt=j.team??z.team??"neutral";E.userData.visualState={team:nt,tier:ht,hp:j.hp,maxHp:j.maxHp,buildings:{...mt},storage:j.storage,resources:j.resources,lootTaken:!!j.lootTaken,destroyed:$},E.userData.team=nt,E.userData.tier=ht,E.userData.health=Q,E.userData.destroyed=$,E.userData.banner.userData.flag.material.color.set(ar(nt));const bt=!!(mt.storage??mt.store??!1);E.userData.core.visible=!$,E.userData.extra.visible=!$&&ht>=2,E.userData.ruin.visible=$,E.userData.nursery.visible=!$&&!!(mt.nursery||mt.hatchery||mt.spawn||mt.breeding),E.userData.watchtower.visible=!$&&!!(mt.watchtower||mt.tower||mt.guards),E.userData.palisade.visible=!$&&!!(mt.palisade||mt.walls||mt.wall||mt.defense),E.userData.core.rotation.z=$?0:(1-Q)*.09,E.userData.core.userData.roof.scale.y=$?1:.78+.22*Q;let _t=typeof j.storage=="number"?j.storage:j.storage?.food??j.resources??0;Number.isFinite(_t)||(_t=0),_t=Math.max(0,_t);const Vt=_t>0&&!j.lootTaken;E.userData.storage.visible=bt&&(!$||Vt),E.userData.storage.rotation.z=$?-.08:0,E.userData.foodMesh.count=$&&!Vt?0:Math.min(15,Math.ceil(_t/8)),E.userData.storageCover.position.set($?-.65:0,$?.1:.5,$?.52:.1),E.userData.storageCover.rotation.set($?.28:0,0,$?-.32:.17),E.userData.looseLoot.visible=$&&Vt&&!bt,E.userData.looseLoot.count=Math.min(8,Math.ceil(_t/5)),E.userData.banner.position.y=$?.035:0,E.userData.banner.rotation.set($?.08:0,$?.35:0,$?1.49:Q<.25?.22:0),E.userData.lamp.visible=!$,$&&(E.userData.light.visible=!1)}function O(E){if(E){r.remove(E),l.delete(E),E.traverse(P=>{P.isInstancedMesh&&P.dispose()});for(const P of E.userData.owned||[])P.dispose?.()}}let G=0;const X=Be("#2c6258"),B=Be("#0c2b32"),ct=Be("#fff0cb"),Mt=Be("#7aa5cb");function Pt(E,P,z=1,j){if(Yt=P,G++,z=ks(z,0,1),H.value=P,V.material.uniforms.time.value=P*.45,V.material.uniforms.waterColor.value.copy(B).lerp(X,z),V.material.uniforms.sunColor.value.copy(Mt).lerp(ct,z),V.material.uniforms.sunDirection.value.set(.35+.25*Math.sin(P*.008),.45+z*.4,-.45).normalize(),G%3===0){const Q=Y.attributes.position;for(let $=0;$<Q.count;$++){const nt=it[$*3],bt=it[$*3+1];Q.setZ($,Math.sin(nt*.33+bt*.21+P*.91)*.025+Math.sin(nt*.14-bt*.38-P*.72)*.018)}Q.needsUpdate=!0}ot.uniforms.uTime.value=P;let ht=!1;for(let Q=0;Q<ce;Q++){const $=Rn[Q];$.life<=0||($.life-=E,$.vy-=9.2*E,re[Q*3]+=$.vx*E,re[Q*3+1]+=$.vy*E,re[Q*3+2]+=$.vz*E,ui[Q]=Math.max(0,$.life/$.max)*.88,(re[Q*3+1]<-.03||$.life<=0)&&($.life=0,ui[Q]=0),ht=!0)}if(ht&&(un.attributes.position.needsUpdate=!0,un.attributes.aAlpha.needsUpdate=!0),G%2===0){for(let Q=0;Q<lt.length;Q++){const $=lt[Q],nt=o[$.spot],bt=ks(nt.flies/nt.maxFlies,0,1),_t=(nt.rich?65:30)*bt;if($.rank>=_t)Ut.position.set(nt.x,-10,nt.z),Ut.scale.setScalar(.001);else{const Vt=P*$.speed+$.phase;Ut.position.set(nt.x+Math.sin(Vt)*$.r+Math.sin(Vt*2.9)*.13,nt.y+$.height+Math.sin(Vt*1.7+$.phase2)*.26,nt.z+Math.cos(Vt*.83+$.phase2)*$.r),Ut.scale.setScalar(.55+.3*Math.sin($.phase2)**2),Ut.rotation.set(Math.sin(Vt*3)*.25,-Vt,Math.sin(Vt*12)*.25)}Ut.updateMatrix(),kt.setMatrixAt(Q,Ut.matrix)}kt.instanceMatrix.needsUpdate=!0}G%5===0&&j&&(he.forEach((Q,$)=>{Math.hypot(j.x-Q.x,j.z-Q.z)>48||(Ut.position.set(Q.x,Q.y+Math.sin(P*.9+Q.phase)*.018,Q.z),Ut.rotation.set(Math.sin(P*.61+Q.phase)*.015,Q.angle,Math.cos(P*.8+Q.phase)*.015),Ut.scale.set(Q.visualRadius,1,Q.visualRadius),Ut.updateMatrix(),St.setMatrixAt($,Ut.matrix))}),St.instanceMatrix.needsUpdate=!0);const mt=[...l].filter(Q=>!Q.userData.destroyed).sort((Q,$)=>j?Q.position.distanceToSquared(j)-$.position.distanceToSquared(j):0).slice(0,3);for(const Q of l)Q.userData.light.visible=mt.includes(Q),Q.userData.light.intensity=.25+(1-z)*3,Q.userData.lamp.material.emissiveIntensity=.3+(1-z)*1.3,Q.userData.banner.userData.flag.rotation.y=Math.sin(P*1.4+Q.position.x)*.06}function Tt(){s.remove(r);const E=new Set,P=new Set;r.traverse(z=>{z.isInstancedMesh&&z.dispose(),z.geometry&&E.add(z.geometry),z.material&&(Array.isArray(z.material)?z.material.forEach(j=>P.add(j)):P.add(z.material))});for(const z of E)z.dispose();for(const z of P)z.dispose();for(const z of c)z.dispose();V.material.uniforms.mirrorSampler?.value?.dispose?.(),l.clear()}return{group:r,platforms:a,hotspots:o,campSites:T,sampleHeight:st,getSurface:tt,update:Pt,splash:ir,impact:sr,createShelter:ca,updateShelter:b,removeShelter:O,dispose:Tt,water:V}}const Xs=Math.PI*2,nn=(s,t=0,e=1)=>Math.max(t,Math.min(e,s)),Re=(s,t,e)=>s+(t-s)*e,mn=(s,t,e)=>{const n=nn((e-s)/(t-s));return n*n*(3-2*n)},Ns=(s,t=0,e=0)=>{const n=Math.sin(s*127.1+t*311.7+e*74.7)*43758.5453;return n-Math.floor(n)},Ae=(s=0,t=0,e=0)=>new D(s,t,e),Qa=new Map,to=new Map,Wc=Ae(0,1,0);Ae();function eo(s,t){if(typeof s=="number")return s;const e=nn(t)*(s.length-1),n=Math.min(s.length-2,Math.floor(e)),i=e-n,r=i*i*(3-2*i);return Re(s[n],s[n+1],r)}function Ai(s,t){if(s.length===1)return[[s[0],1]];const e=nn(t)*(s.length-1),n=Math.min(s.length-2,Math.floor(e)),i=e-n;return[[s[n],1-i],[s[n+1],i]]}function se(s,t=0){return{color:s,mask:t}}class Cn{constructor(){this.p=[],this.uv=[],this.c=[],this.mask=[],this.si=[],this.sw=[],this.idx=[]}vertex(t,e=[0,0],n=[[0,1]],i={color:[1,1,1],mask:0}){const r=this.p.length/3;this.p.push(t.x,t.y,t.z),this.uv.push(...e),this.c.push(...i.color),this.mask.push(i.mask||0);let a=n.reduce((o,l)=>o+l[1],0)||1;for(let o=0;o<4;o++)this.si.push(n[o]?.[0]||0),this.sw.push((n[o]?.[1]||0)/a);return r}tri(t,e,n){this.idx.push(t,e,n)}quad(t,e,n,i,r=!1){r?(this.tri(t,n,e),this.tri(e,n,i)):(this.tri(t,e,n),this.tri(e,i,n))}tube(t,e,n,i={}){const{segments:r=28,radial:a=16,bones:o=[0],paint:l=()=>se([.7,.7,.7],1),distort:c}=i,h=new Js(t.map(w=>w.isVector3?w:Ae(...w)),!1,"catmullrom",.5),u=this.p.length/3;for(let w=0;w<=r;w++){const _=w/r,T=h.getPoint(_),R=h.getTangent(_).normalize(),C=new D().crossVectors(Math.abs(R.y)>.94?Ae(0,0,1):Wc,R).normalize(),I=new D().crossVectors(R,C).normalize();for(let M=0;M<=a;M++){const S=M/a,U=S*Xs,N=Math.cos(U)*eo(e,_),k=Math.sin(U)*eo(n,_),q=T.clone().addScaledVector(C,N).addScaledVector(I,k);c&&c(q,_,U,T);const Y=typeof o=="function"?o(_,q):Ai(o,_);this.vertex(q,[S,_],Y,l(q,_,U))}}for(let w=0;w<r;w++)for(let _=0;_<a;_++){const T=u+w*(a+1)+_;this.quad(T,T+1,T+a+1,T+a+2)}const d=h.getPoint(0),p=h.getPoint(1),m=typeof o=="function"?o(0,d):Ai(o,0),v=typeof o=="function"?o(1,p):Ai(o,1),g=this.vertex(d,[.5,0],m,l(d,0,0)),f=this.vertex(p,[.5,1],v,l(p,1,0)),y=u+r*(a+1);for(let w=0;w<a;w++)this.tri(g,u+w+1,u+w),this.tri(f,y+w,y+w+1);return this}ellipsoid(t,e,{bone:n=0,rings:i=14,radial:r=24,paint:a=()=>se([1,1,1]),rotationY:o=0,sculpt:l}={}){const c=this.p.length/3,h=Ae(...t),u=Math.cos(o),d=Math.sin(o);for(let p=0;p<=i;p++){const m=p/i,v=Math.PI*m;for(let g=0;g<=r;g++){const f=g/r,y=Xs*f;let w=Math.sin(v)*Math.cos(y)*e[0],_=Math.cos(v)*e[1],T=Math.sin(v)*Math.sin(y)*e[2];const R=Ae(w,_,T);l&&l(R,f,m);const C=Ae(R.x*u+R.z*d,R.y,-R.x*d+R.z*u).add(h);this.vertex(C,[f,m],[[n,1]],a(R,f,m))}}for(let p=0;p<i;p++)for(let m=0;m<r;m++){const v=c+p*(r+1)+m;this.quad(v,v+1,v+r+1,v+r+2)}return this}leaf(t,e,{bone:n=0,bones:i,segments:r=14,across:a=6,color:o=[.35,.45,.22],ridge:l=.025,mask:c=0,vein:h=!0}={}){const u=new Js(t.map(p=>p.isVector3?p:Ae(...p)),!1,"catmullrom",.5),d=this.p.length/3;for(let p=0;p<=r;p++){const m=p/r,v=u.getPoint(m),g=u.getTangent(m).normalize(),f=new D().crossVectors(Math.abs(g.y)>.95?Ae(0,0,1):Wc,g).normalize();for(let y=0;y<=a;y++){const w=y/a*2-1,_=v.clone().addScaledVector(f,w*eo(e,m));_.y+=l*(1-Math.abs(w))*Math.sin(m*Math.PI);const T=(h?.88+.12*Math.cos(m*45+Math.abs(w)*9):1)+.12*(1-Math.abs(w));this.vertex(_,[(w+1)/2,m],i?Ai(i,m):[[n,1]],se(o.map(R=>R*T),c))}}for(let p=0;p<r;p++)for(let m=0;m<a;m++){const v=d+p*(a+1)+m;this.quad(v,v+1,v+a+1,v+a+2,!0)}return this}geometry(){const t=new Me;return t.setAttribute("position",new oe(this.p,3)),t.setAttribute("uv",new oe(this.uv,2)),t.setAttribute("color",new oe(this.c,3)),t.setAttribute("skinTintMask",new oe(this.mask,1)),t.setAttribute("skinIndex",new gl(this.si,4)),t.setAttribute("skinWeight",new oe(this.sw,4)),t.setIndex(this.idx),t.computeVertexNormals(),t.computeBoundingSphere(),t}}function oa(){const s=[],t={};return{defs:s,ids:t,bone(e,n,i=null){const r=s.length;return t[e]=r,s.push({name:e,p:n,parent:typeof i=="string"?t[i]:i}),r}}}function es(s,t=0,e=0){const n=1-mn(.26,.47,s.y),i=Math.sin(s.x*31+Math.sin(s.z*13))*Math.sin(s.z*25+s.y*23),r=mn(.42,.77,i)*.5,a=.75-r+.06*Math.sin(s.x*75+s.z*64),o=(1-mn(.026,.065,Math.abs(s.x)))*mn(.52,.67,s.y);return o>.3?se([.78,.61,.18].map(l=>Re(a,l,o)),1-o):se([Re(a,.76,n),Re(a,.72,n),Re(a,.49,n)],1-n*.96)}function Pn(s,t=0,e=0){const n=(1-mn(-.55,.1,Math.sin(e)))*.65,r=.79-.36*mn(.38,.78,Math.sin(s.x*35+s.z*17)*Math.sin(s.y*39-s.z*23));return se([Re(r,.7,n),Re(r,.66,n),Re(r,.43,n)],1-n*.92)}function Xc(){const s=oa(),t=new Cn,e=new Cn,n=new Cn,i=new Cn,r=s.bone("pelvis",[0,.36,-.35]),a=s.bone("spine",[0,.43,-.07],r),o=s.bone("head",[0,.47,.29],a),l=s.bone("jaw",[0,.39,.37],o),c=s.bone("throat",[0,.29,.36],l),h=s.bone("eyeL",[-.292,.685,.53],o),u=s.bone("eyeR",[.292,.685,.53],o),d=s.bone("mouth",[0,.405,.755],l);t.tube([[0,.35,-.72],[0,.42,-.48],[0,.43,-.08],[0,.47,.3],[0,.46,.58],[0,.43,.75]],[.012,.32,.435,.43,.34,.018],[.012,.245,.27,.235,.145,.025],{segments:42,radial:36,bones:m=>Ai([r,r,a,o,o],m),paint:es,distort(m,v,g){const f=Math.max(0,Math.sin(g));m.y+=f*.008*Math.sin(m.x*70+m.z*50);const y=Math.exp(-Math.pow((Math.abs(m.x)-.22)/.035,2));m.y+=y*f*.023*Math.sin(v*Math.PI)}});for(const m of[-1,1]){const v=m<0?h:u,g=[m*.292,.685,.53];t.ellipsoid([m*.292,.605,.405],[.15,.145,.165],{bone:o,rings:14,radial:24,paint:M=>es(M.clone().add(Ae(m*.292,.605,.405)))}),e.ellipsoid(g,[.106,.103,.113],{bone:v,radial:40,rings:22,rotationY:m*.32,paint(M,S,U){const N=M.z/.113,k=Math.pow(M.x/.084,2)+Math.pow(M.y/.029,2);if(N<.12)return se([.065,.14,.018]);if(N<.34)return se([.04,.065,.012]);if(N>.52&&k<1)return se([.008,.012,.006]);const q=.12*Math.sin(Math.atan2(M.y,M.x)*51+Math.hypot(M.x,M.y)*120);return se([.74+q,.52+q*.6,.08+q*.12])}});const f=s.bone(`hip${m}`,[m*.33,.32,-.33],r),y=s.bone(`knee${m}`,[m*.64,.24,.025],f),w=s.bone(`ankle${m}`,[m*.46,.09,-.61],y),_=s.bone(`foot${m}`,[m*.64,.045,-.49],w);t.ellipsoid([m*.64,.24,.025],[.143,.128,.148],{bone:y,rings:12,radial:18,paint:(M,S,U)=>Pn(M.clone().add(Ae(m*.64,.24,.025)),S,Math.PI*(.5-U)),sculpt(M){M.x*=1+.06*Math.sin(M.z*30)}}),t.ellipsoid([m*.46,.09,-.61],[.069,.052,.071],{bone:w,rings:8,radial:12,paint:(M,S,U)=>Pn(M.clone().add(Ae(m*.46,.09,-.61)),S,Math.PI*(.5-U))}),t.tube([[m*.3,.33,-.35],[m*.5,.3,-.21],[m*.64,.24,.025]],[.13,.223,.14],[.13,.173,.12],{segments:20,radial:22,bones:[f,f,y],paint:Pn}),t.tube([[m*.64,.24,.025],[m*.57,.15,-.27],[m*.46,.09,-.61]],[.12,.105,.065],[.11,.09,.05],{segments:20,radial:18,bones:[y,y,w],paint:Pn}),t.tube([[m*.46,.09,-.61],[m*.57,.06,-.55],[m*.72,.035,-.35]],[.06,.07,.047],[.047,.04,.025],{segments:12,radial:14,bones:[w,_,_],paint:Pn});const T=[];for(let M=0;M<4;M++){const S=m*(.7+(M-1.5)*.075),U=-.34+.36*(1-Math.abs(M-1.5)*.16),N=[m*(.67+(M-1.5)*.028),.036,-.37],k=[Re(N[0],S,.53),.037,-.18];t.tube([N,k,[S,.035,U]],[.032,.024,.007],[.02,.014,.006],{segments:10,radial:8,bones:[_],paint:Pn}),T.push([S,.034,U*.66-.12])}for(let M=0;M<3;M++){const S=Ae(m*.68,.035,-.36),U=Ae(...T[M]),N=Ae(...T[M+1]),k=U.clone().lerp(N,.5).lerp(S,.2),q=t.vertex(S,[0,0],[[_,1]],es(S)),Y=t.vertex(U,[1,0],[[_,1]],es(U)),V=t.vertex(k,[.5,1],[[_,1]],es(k)),it=t.vertex(N,[0,1],[[_,1]],es(N));t.tri(q,Y,V),t.tri(q,V,it),t.tri(V,Y,it)}const R=s.bone(`shoulder${m}`,[m*.3,.43,.31],a),C=s.bone(`elbow${m}`,[m*.48,.235,.4],R),I=s.bone(`wrist${m}`,[m*.46,.058,.62],C);t.ellipsoid([m*.48,.235,.4],[.064,.066,.064],{bone:C,rings:8,radial:12,paint:(M,S,U)=>Pn(M.clone().add(Ae(m*.48,.235,.4)),S,Math.PI*(.5-U))}),t.tube([[m*.3,.43,.31],[m*.43,.33,.335],[m*.48,.235,.4]],[.092,.085,.061],[.09,.077,.059],{segments:14,radial:16,bones:[R,R,C],paint:Pn}),t.tube([[m*.48,.235,.4],[m*.48,.14,.48],[m*.46,.058,.62]],[.062,.07,.039],[.058,.057,.03],{segments:12,radial:14,bones:[C,C,I],paint:Pn});for(let M=0;M<4;M++){const S=m*(.44+(M-1.5)*.075),U=.81+.04*(1.5-Math.abs(M-1.5));t.tube([[m*.46,.055,.61],[Re(m*.46,S,.6),.031,.74],[S,.025,U]],[.025,.017,.009],[.021,.014,.006],{segments:9,radial:8,bones:[I],paint:Pn}),t.ellipsoid([S,.025,U],[.017,.01,.021],{bone:I,rings:6,radial:10,paint:()=>se([.71,.65,.4],.4)})}for(let M=0;M<3;M++){const S=.32+M*.016;t.tube(Array.from({length:17},(U,N)=>[m*.415+Math.cos(N/16*Xs)*.085,S+Math.sin(N/16*Xs)*.072,.355+Math.sin(N/16*Xs)*.02]),.009,.009,{segments:20,radial:6,bones:[R],paint:()=>se([.38,.55,.12],.25)})}n.leaf([[m*.12,.695,-.08],[m*.31,.69,-.19],[m*.48,.52,-.38]],[.012,.14,.03],{bone:a,color:[.26,.4,.12],ridge:.025,segments:15}),n.leaf([[m*.04,.715,.05],[m*.2,.73,-.03],[m*.36,.59,-.2]],[.008,.13,.015],{bone:a,color:[.34,.48,.18],ridge:.035,segments:15}),i.leaf([[m*.17,.76,.4],[m*.21,.89,.32],[m*.24,.91,.18]],[.025,.055,.002],{bone:o,color:[.69,.53,.19],ridge:.015,segments:12})}const p=Array.from({length:13},(m,v)=>{const g=(v/12-.5)*.74;return[g,.414-.025*Math.abs(g)/.37,.748-.2*Math.pow(g/.37,2)]});return t.tube(p,.009,.009,{segments:34,radial:8,bones:[o],paint:()=>se([.045,.065,.016])}),t.tube(p.map(m=>[m[0],m[1]-.019,m[2]+.001]),.009,.014,{segments:34,radial:8,bones:[l],paint:()=>se([.65,.61,.35])}),t.ellipsoid([0,.284,.385],[.25,.125,.265],{bone:c,rings:18,radial:28,paint:()=>se([.75,.72,.48]),sculpt(m){m.y+=.01*Math.sin(m.x*80)*Math.cos(m.z*60)}}),{type:"frog",rig:s,skin:t.geometry(),eyes:e.geometry(),armor:n.geometry(),crest:i.geometry(),mouth:d,length:1.7,height:.8,scale:1}}function ns(s,t,e,n,i,r,a=.05){const o=Ae(...t).lerp(Ae(...e),.5);o.y+=a,s.leaf([t,o.toArray(),e],[.012,n,n*.7,.002],{bone:i,segments:13,across:6,ridge:.012,color:r,vein:!0})}function Kg(){const s=oa(),t=new Cn,e=new Cn,n=s.bone("pelvis",[0,2.45,-.16]),i=s.bone("spine",[0,2.79,.02],n),r=s.bone("neck0",[0,2.97,.24],i),a=s.bone("neck1",[0,3.35,.03],r),o=s.bone("neck2",[0,3.82,.18],a),l=s.bone("head",[0,4.19,.6],o),c=s.bone("jaw",[0,4.12,.7],l),h=s.bone("mouth",[0,4.11,1.48],c),u=s.bone("eyeL",[-.125,4.25,.69],l),d=s.bone("eyeR",[.125,4.25,.69],l),p=m=>{const v=mn(2.7,3.02,m.y)*.35;return se([.54-v,.59-v,.61-v])};t.tube([[0,2.43,-.95],[0,2.58,-.53],[0,2.78,-.05],[0,2.99,.27]],[.02,.34,.41,.14],[.02,.39,.48,.18],{segments:30,radial:28,bones:[n,n,i,i],paint:p}),t.tube([[0,2.97,.24],[0,3.22,.16],[0,3.46,.015],[0,3.83,.18],[0,4.12,.52],[0,4.21,.65]],[.16,.15,.12,.1,.1,.13],[.17,.17,.14,.12,.13,.14],{segments:40,radial:20,bones:[r,r,a,o,l,l],paint(m,v,g){const f=Math.cos(g)>.7?.65:.9;return se([f,f*.99,f*.91])}}),t.tube([[0,4.18,.36],[0,4.28,.57],[0,4.25,.76],[0,4.18,.91]],[.018,.15,.14,.045],[.02,.16,.14,.07],{segments:22,radial:20,bones:[l],paint(m){return m.y>4.32?se([.07,.1,.12]):se([.83,.86,.82])}}),t.tube([[0,4.19,.81],[0,4.18,1.04],[0,4.15,1.32],[0,4.12,1.6]],[.072,.055,.027,.001],[.06,.044,.022,.001],{segments:20,radial:10,bones:[l],paint(m,v){return se([Re(.74,.34,v),Re(.47,.24,v),.075])}}),t.tube([[0,4.112,.81],[0,4.105,1.06],[0,4.103,1.36],[0,4.115,1.59]],[.063,.046,.022,.001],[.026,.02,.012,.001],{segments:18,radial:8,bones:[c],paint:()=>se([.68,.38,.07])});for(const m of[-1,1]){const v=m<0?u:d;e.ellipsoid([m*.132,4.255,.69],[.029,.039,.043],{bone:v,rings:10,radial:18,paint:I=>Math.abs(I.x)>.022&&Math.abs(I.y)<.018&&Math.abs(I.z)<.021?se([.005,.008,.006]):se([.9,.7,.13])});const g=s.bone(`hip${m}`,[m*.14,2.47,-.12],n),f=s.bone(`knee${m}`,[m*.18,1.5,-.12],g),y=s.bone(`ankle${m}`,[m*.22,.16,.04],f),w=s.bone(`foot${m}`,[m*.22,.075,.15],y),_=(I,M)=>{const S=.8+.2*Math.sin(I.y*110);return se([.38*S,.36*S,.21*S])};t.tube([[m*.14,2.47,-.12],[m*.18,1.73,-.15],[m*.18,1.5,-.12]],[.077,.04,.049],[.074,.037,.049],{segments:20,radial:12,bones:[g,g,f],paint:_}),t.tube([[m*.18,1.5,-.12],[m*.2,.7,-.02],[m*.22,.16,.04]],[.042,.024,.031],[.042,.023,.03],{segments:22,radial:10,bones:[f,f,y],paint:_});for(let I=0;I<4;I++){const M=I<3?(I-1)*.23:-.08,S=I<3?.54-.06*Math.abs(I-1):-.21;t.tube([[m*.22,.16,.04],[m*.22+M*.5,.065,(S+.04)*.55],[m*.22+M,.035,S]],[.025,.017,.006],[.023,.013,.005],{segments:12,radial:8,bones:[w],paint:_})}const T=s.bone(`wing${m}`,[m*.31,2.91,-.03],i),R=s.bone(`wingElbow${m}`,[m*.94,2.83,-.12],T),C=s.bone(`wingWrist${m}`,[m*1.5,2.68,-.24],R);t.leaf([[m*.31,2.91,-.03],[m*.95,2.84,-.18],[m*1.58,2.69,-.35]],[.08,.29,.1],{bones:[T,R,C],segments:22,across:10,ridge:.05,color:[.36,.43,.47]});for(let I=0;I<15;I++){const M=.42+I*.088,S=I<6?T:I<11?R:C;ns(t,[m*M,2.89-I*.014,-.05-I*.012],[m*(M+.22+I*.009),2.73-I*.023,-.76-I*.018],.105-I*.002,S,[.26+I*.004,.32+I*.004,.36+I*.004]),I<12&&ns(t,[m*M,2.94-I*.014,.035],[m*(M+.1),2.86-I*.017,-.44],.077,S,[.49,.55,.57])}for(let I=0;I<11;I++)ns(t,[m*(.11+.015*I),2.86-.042*I,-.21],[m*(.29+.009*I),2.7-.044*I,-.75-.022*I],.075,i,[.51+I*.013,.56+I*.012,.56+I*.012]);ns(t,[m*.065,4.34,.51],[m*.13,4.28,-.02],.018,l,[.04,.07,.09],.025)}for(let m=0;m<9;m++)ns(t,[(m-4)*.045,2.53,-.65],[(m-4)*.075,2.34,-1.34-.1*(1-Math.abs(m-4)/4)],.07,n,[.21,.28,.31]);for(let m=0;m<9;m++)ns(t,[(m-4)*.025,3.06,.35],[(m-4)*.044,2.48-.06*(m%3),.42],.032,i,[.79,.8,.72],.01);return{type:"heron",rig:s,skin:t.geometry(),eyes:e.geometry(),mouth:h,length:3,height:4.55,scale:1}}function Zg(){const s=oa(),t=new Cn,e=new Cn,n=new Cn,i=s.bone("head",[0,.27,1.97]),r=[i];for(let u=1;u<=20;u++)r.push(s.bone(`coil${u}`,[0,.23,1.97-u*.22],r[u-1]));const a=s.bone("jaw",[0,.205,2.1],i),o=s.bone("mouth",[0,.19,2.48],a),l=s.bone("eyeL",[-.183,.346,2.21],i),c=s.bone("eyeR",[.183,.346,2.21],i),h=(u,d,p)=>{const m=1-mn(.13,.22,u.y),v=.73-.26*mn(.2,.65,Math.sin(u.z*7+u.x*18));return se([Re(v,.65,m),Re(v,.6,m),Re(v,.36,m)],1-m)};t.tube([[0,.25,2.05],[0,.23,1.4],[0,.23,.5],[0,.22,-.4],[0,.18,-1.5],[0,.09,-2.46]],[.13,.186,.205,.18,.115,.002],[.11,.16,.17,.15,.09,.003],{segments:100,radial:20,bones:u=>Ai(r,u),paint:h,distort(u,d,p){u.y+=.003*Math.sin(d*390)*Math.sin(p*12)}}),t.tube([[0,.265,1.86],[0,.29,2.07],[0,.285,2.27],[0,.245,2.48]],[.115,.237,.202,.035],[.1,.12,.105,.038],{segments:24,radial:24,bones:[i],paint:h}),t.tube([[0,.192,1.99],[0,.179,2.25],[0,.207,2.47]],[.14,.19,.025],[.027,.035,.006],{segments:18,radial:16,bones:[a],paint:()=>se([.66,.63,.42])});for(const u of[-1,1])e.ellipsoid([u*.183,.346,2.21],[.045,.043,.05],{bone:u<0?l:c,rings:12,radial:20,rotationY:u*.9,paint(d){return Math.abs(d.x)<.012&&d.z>.015?se([.009,.008,.005]):se([.69,.51,.12])}}),t.tube([[u*.2,.228,2.06],[u*.197,.218,2.29],[u*.045,.225,2.475]],.004,.004,{segments:20,radial:6,bones:[i],paint:()=>se([.05,.06,.025])}),n.tube([[0,.194,2.47],[0,.19,2.73],[u*.06,.18,2.84]],[.014,.01,.001],[.007,.005,.001],{segments:16,radial:6,bones:[a],paint:()=>se([.28,.025,.035])});return{type:"snake",rig:s,skin:t.geometry(),eyes:e.geometry(),tongue:n.geometry(),mouth:o,length:5,height:.43,scale:1}}function Jg(){const s=oa(),t=new Cn,e=new Cn,n=s.bone("spine",[0,.6,.18]),i=s.bone("head",[0,.61,.78],n),r=s.bone("tail0",[0,.55,-.44],n),a=s.bone("tail1",[0,.49,-.99],r),o=s.bone("tail",[0,.48,-1.43],a),l=s.bone("jaw",[0,.42,1.03],i),c=s.bone("mouth",[0,.43,1.55],l),h=s.bone("eyeL",[-.22,.72,1.06],i),u=s.bone("eyeR",[.22,.72,1.06],i),d=g=>{const f=1-mn(.35,.62,g.y),y=.74-.25*mn(.1,.6,Math.sin(g.z*18+g.y*29)*Math.sin(g.y*35));return se([Re(y,.81,f),Re(y,.78,f),Re(y,.61,f)],1-f)};t.tube([[0,.48,-1.46],[0,.51,-.92],[0,.61,-.28],[0,.64,.34],[0,.62,.84],[0,.55,1.24],[0,.52,1.56]],[.018,.15,.31,.35,.29,.19,.027],[.035,.22,.46,.48,.32,.19,.05],{segments:54,radial:28,bones:g=>Ai([o,a,r,n,i,i,i],g),paint:d}),t.tube([[0,.43,.92],[0,.36,1.25],[0,.445,1.56]],[.14,.16,.025],[.055,.065,.018],{segments:18,radial:18,bones:[l],paint:()=>se([.72,.69,.49])});const p=[.33,.4,.23],m=t.p.length/3;for(let g=0;g<=18;g++){const f=g/18,y=Math.cos(f*Math.PI)*.62,w=-1.45-(.3+.3*Math.abs(Math.cos(f*Math.PI)));for(let _=0;_<=6;_++){const T=_/6,R=Ae(.025*Math.sin(f*Math.PI),.48+y*T,Re(-1.43,w,T)),C=g%2?.85:1.15;t.vertex(R,[T,f],[[o,1]],se(p.map(I=>I*C),.3))}}for(let g=0;g<18;g++)for(let f=0;f<6;f++){const y=m+g*7+f;t.quad(y,y+1,y+7,y+8)}const v=(g,f,y,w,_=1)=>{const T=Ae(...g).lerp(Ae(...f),.5);T.x+=_*y,t.leaf([g,T.toArray(),f],[.01,y*.8,.003],{bone:w,segments:16,across:8,ridge:.014,color:p,mask:.3})};for(const g of[-1,1]){e.ellipsoid([g*.22,.72,1.06],[.052,.07,.08],{bone:g<0?h:u,rings:12,radial:22,rotationY:g*1,paint(y){return y.z>.035&&Math.pow(y.x/.035,2)+Math.pow(y.y/.04,2)<1?se([.005,.007,.004]):se([.75,.59,.18])}});const f=s.bone(`fin${g}`,[g*.255,.42,.65],n);v([g*.255,.42,.65],[g*.63,.21,.11],.16,f,g),v([g*.2,.26,-.11],[g*.38,.13,-.57],.12,r,g),t.tube([[g*.24,.86,.71],[g*.31,.64,.67],[g*.24,.39,.69]],.009,.011,{segments:20,radial:6,bones:[i],paint:()=>se([.19,.24,.12],.3)});for(let y=0;y<8;y++){const w=1.18+y*.04,_=g*(.12-y*.009);t.tube([[_,.445,w],[_*.9,.475,w+.005]],[.008,.001],[.008,.001],{segments:3,radial:5,bones:[l],paint:()=>se([.78,.76,.56])})}}for(const g of[!0,!1]){const f=t.p.length/3,y=22;for(let w=0;w<=y;w++){const _=w/y,T=Re(-.9,.18,_),R=g?.8+.22*_:.26-.1*_,C=Math.sin(Math.PI*_)*(g?.45:-.24),I=_<.5?r:n;for(let M=0;M<=6;M++){const S=M/6,U=Ae(.012*Math.sin(_*6),R+C*S,T-.1*S);t.vertex(U,[S,_],[[I,1]],se(p.map(N=>N*(w%2?.85:1.1)),.2))}}for(let w=0;w<y;w++)for(let _=0;_<6;_++){const T=f+w*7+_;t.quad(T,T+1,T+7,T+8)}}return{type:"fish",rig:s,skin:t.geometry(),eyes:e.geometry(),mouth:c,length:3.65,height:1.65,scale:1}}function Qg(s){if(to.has(s))return to.get(s);const t=256,e=new Uint8Array(t*t*4);for(let i=0;i<t;i++)for(let r=0;r<t;r++){const a=r/t,o=i/t;let l=.82+Ns(r,i)*.18;if(s==="frog"){const d=Math.floor(a*28),p=Math.floor(o*28),m=a*28-d-.5,v=o*28-p-.5,g=Math.hypot(m,v),f=Math.exp(-g*g*38)*(.1+Ns(d,p)*.18);l=.79+.16*Ns(r,i)+f-.11*Math.exp(-Math.pow(g-.31,2)*300)}else if(s==="snake"||s==="fish"){const u=s==="snake"?28:35,d=o*u,p=Math.floor(d),m=a*20+p%2*.5,v=m-Math.floor(m)-.5,g=d-p-.5,f=Math.abs(v)*1.4+Math.abs(g);l=.74+.22*(1-mn(.49,.72,f))+.04*Ns(r,i)}else l=.79+.15*Math.sin(a*170+.4*Math.sin(o*31))**2+.06*Ns(r,i);const c=(i*t+r)*4,h=Math.floor(nn(l)*255);e[c]=e[c+1]=e[c+2]=h,e[c+3]=255}const n=new vl(e,t,t,ln);return n.wrapS=n.wrapT=fs,n.magFilter=Tn,n.minFilter=oi,n.generateMipmaps=!0,n.needsUpdate=!0,n.repeat.set(s==="heron"?1:2,s==="frog"?3:2),to.set(s,n),n}function tv(s,t){const e=Qg(s),n=new Ih({color:16777215,vertexColors:!0,map:e,bumpMap:e,bumpScale:s==="frog"?.013:s==="heron"?.007:.009,roughness:s==="frog"?.32:s==="heron"?.68:.37,metalness:0,clearcoat:s==="heron"?0:.42,clearcoatRoughness:.25,envMapIntensity:.8,side:Le}),i=new $t(t);return n.userData.tint=i,n.onBeforeCompile=r=>{r.uniforms.skinTint={value:i},r.vertexShader=`attribute float skinTintMask; varying float vSkinTint;
`+r.vertexShader,r.vertexShader=r.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
 vSkinTint = skinTintMask;`),r.fragmentShader=`uniform vec3 skinTint; varying float vSkinTint;
`+r.fragmentShader,r.fragmentShader=r.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
 diffuseColor.rgb *= mix(vec3(1.0),skinTint,vSkinTint);`)},n.customProgramCacheKey=()=>"anatomical-skin-v3",n}function ev(s,t){const e=new ea({color:s,side:Ye,transparent:!0,opacity:.91,depthWrite:!1,toneMapped:!1});return e.userData.thickness={value:t},e.onBeforeCompile=n=>{n.uniforms.outlineThickness=e.userData.thickness,n.vertexShader=`uniform float outlineThickness;
`+n.vertexShader,n.vertexShader=n.vertexShader.replace("#include <begin_vertex>","vec3 transformed = position + normal * outlineThickness;")},e.customProgramCacheKey=()=>"skeletal-silhouette-v3",e}function nv(s){const t=s.map(e=>{const n=new Ch;return n.name=e.name,n});for(let e=0;e<s.length;e++){const n=s[e];t[e].position.fromArray(n.p),n.parent!==null&&n.parent!==void 0&&(t[e].position.sub(Ae(...s[n.parent].p)),t[n.parent].add(t[e]))}return{bones:t,skeleton:new xl(t),root:t[0]}}function iv(s){if(!Qa.has(s)){const t=({frog:Xc,heron:Kg,snake:Zg,fish:Jg}[s]||Xc)();for(const e of["skin","eyes","armor","crest","tongue"])t[e]?.boundingSphere&&(t[e].boundingSphere.radius*=1.9);Qa.set(s,t)}return Qa.get(s)}function no(s,t,e,n,i,r,a){const o=Math.hypot(n.y,n.z),l=Math.hypot(i.y,i.z),c=n.y+i.y+r,h=n.z+i.z+a,u=Math.max(Math.abs(o-l)+1e-5,Math.min(o+l-1e-5,Math.hypot(c,h))),d=Math.atan2(h,c),p=-Math.sign(n.y*i.z-n.z*i.y)||1,m=Math.acos(nn((o*o+u*u-l*l)/(2*o*u),-1,1)),v=d+p*m,g=v-Math.atan2(n.z,n.y);s.rotation.x=Math.atan2(Math.sin(g),Math.cos(g));const f=Math.cos(v)*o,y=Math.sin(v)*o,w=Math.atan2(h-y,c-f)-s.rotation.x-Math.atan2(i.z,i.y);t.rotation.x=Math.atan2(Math.sin(w),Math.cos(w)),e.rotation.x=-s.rotation.x-t.rotation.x}function sv(s,t){if(!s)return{type:"",phase:0,force:0};let e="kick",n=t;return typeof s=="string"?e=s:typeof s=="number"?n=s:(e=s.type||s.kind||"kick",n=s.phase??s.progress??t),n=nn(n),{type:e,phase:n,force:Math.sin(n*Math.PI)}}function io(s="frog",t={}){["frog","heron","snake","fish"].includes(s)||(s="frog");const e=iv(s),n=new ke,i=new ke;n.name=`creature-${s}`,i.name="anatomical-animation-pivot",n.add(i);const r=s==="frog"?7378989:s==="snake"?6715206:s==="fish"?8624996:16777215,a=tv(s,t.color??r),o=new Ih({color:16777215,vertexColors:!0,roughness:.13,clearcoat:1,clearcoatRoughness:.05,metalness:.05}),{bones:l,skeleton:c,root:h}=nv(e.rig.defs),u=new Rr(e.skin,a);u.name=`${s}-weighted-surface`,u.add(h),i.add(u),u.castShadow=!0,u.receiveShadow=!0,u.frustumCulled=!0,n.updateMatrixWorld(!0),u.bind(c);const d=new Rr(e.eyes,o);d.name="articulated-eyes",d.bind(c,u.bindMatrix),d.castShadow=!1,d.frustumCulled=!0,i.add(d);const p=new Rr(e.skin,ev(t.outlineColor??(t.team==="enemy"?16741200:t.team==="player"?11075554:s==="frog"?8513956:16755275),s==="frog"?.018:.027));p.name="animated-color-silhouette",p.bind(c,u.bindMatrix),p.frustumCulled=!0,p.renderOrder=-1,i.add(p);const m=[];for(const N of["armor","crest","tongue"])if(e[N]){const k=new Oe({color:16777215,vertexColors:!0,roughness:N==="tongue"?.35:.79,side:Le}),q=new Rr(e[N],k);q.name=N,q.bind(c,u.bindMatrix),q.frustumCulled=!0,q.castShadow=N!=="tongue",q.visible=N==="tongue",i.add(q),m.push(q)}const v={};for(const N of l)v[N.name]=N;const g=l.map(N=>N.position.clone()),f=new Pe;f.name="mouth-attachment",l[e.mouth].add(f);let y=(t.seed||0)*.731,w=0,_="",T=1,R=0,C=0;const I=t.role||"scout",M=s==="frog"?["guardian","brute","tank"].includes(I)?[1.15,1.12,1.05]:["scout","hunter","agile"].includes(I)?[.96,.98,1.04]:[1.03,1.02,1.02]:[1,1,1];i.scale.set(...M);const S=()=>{for(let N=0;N<l.length;N++)l[N].rotation.set(0,0,0),l[N].scale.set(1,1,1),l[N].position.copy(g[N])},U={group:n,bones:v,skeleton:c,mesh:u,stats:{type:s,vertices:e.skin.attributes.position.count+e.eyes.attributes.position.count,triangles:(e.skin.index.count+e.eyes.index.count)/3,boneCount:l.length,length:e.length,height:e.height,rigged:!0},setOutline(N,k=!0){N!=null&&p.material.color.set(N),p.visible=k},setTier(N){T=nn(Math.round(N||1),1,5);for(const q of m)q.name==="armor"?q.visible=T>=2:q.name==="crest"&&(q.visible=T>=3);const k=1+(T-1)*.028;i.scale.set(M[0]*k,M[1]*k,M[2]*k)},mouthWorld(N=new D){return n.updateWorldMatrix(!0,!0),f.getWorldPosition(N)},update(N,k={}){N=nn(Number(N)||0,0,.1),y=k.time!==void 0?k.time+(t.seed||0)*.731:y+N,S();const q=Math.max(0,Number(k.speed)||0),Y=nn(q/(s==="frog"?2.8:3));C=Re(C,Y,1-Math.exp(-N*12));const V=k.swimming?1:0,it=typeof k.jump=="number"?nn(k.jump):k.jump?.5:0,W=typeof k.attack=="string"?k.attack:k.attack?.type||k.attack?.kind||(k.attack?"kick":"");W!==_?(w=0,_=W):k.attack&&(w+=N/.55);const rt=sv(k.attack,w),at=rt.force,Et=typeof k.roar=="number"?nn(k.roar):k.roar?1:0,Wt=typeof k.hit=="number"?nn(k.hit):k.hit?1:0;R=Re(R,k.dead?1:0,1-Math.exp(-N*5)),i.position.set(0,0,0),i.rotation.set(0,0,0);const le=(y+(t.seed||0)*.4)%5.7,he=le>5.5?.08+.92*Math.abs((le-5.6)*10):1;if(v.eyeL&&(v.eyeL.scale.y=nn(he,.08,1)),v.eyeR&&(v.eyeR.scale.y=nn(he,.08,1)),s==="frog"){const Bt=y*(V?7.8:10.6),K=Math.max(0,Math.sin(Bt)),J=Math.sin(Bt),ft=Math.sin(it*Math.PI);i.position.y=V?-.14+.023*Math.sin(y*3):K*.045*C,i.rotation.x=V?-.12:-.05*J*C,v.spine.rotation.x=Math.sin(y*2.6)*.009+C*J*.045,v.spine.scale.y=1+Math.sin(y*2.6)*.018,v.head.rotation.x=.02*Math.sin(y*1.7)-Et*.18-ft*.06,v.jaw.rotation.x=-Et*.13-(rt.type==="tongue"?at*.16:0),v.throat.scale.set(1+Et*.26,1+Et*1.45+Math.sin(y*2.5)*.035,1+Et*.25);for(const dt of[-1,1]){const St=Math.sin(V?Bt:Bt+dt*.14),jt=C*St;v[`hip${dt}`].rotation.x=-.32*jt-ft*.62,v[`hip${dt}`].rotation.z=dt*(ft*.1+V*.07*St),v[`knee${dt}`].rotation.x=.62*jt+ft*1.05,v[`ankle${dt}`].rotation.x=-.25*jt-ft*.3,v[`foot${dt}`].rotation.x=.2*jt;const we=Math.sin(Bt+dt*1.3)*C;if(v[`shoulder${dt}`].rotation.x=-.23*we+ft*.25,v[`elbow${dt}`].rotation.x=.28*we-ft*.32,v[`wrist${dt}`].rotation.x=-.12*we,V&&(v[`shoulder${dt}`].rotation.z=dt*(.22+.25*St*C),v[`elbow${dt}`].rotation.y=dt*.3),!V&&it===0&&!rt.type&&!k.dead){const L=e.rig.ids,fe=Bt+dt*.12,qt=Bt+dt*1.3+Math.PI;no(v[`hip${dt}`],v[`knee${dt}`],v[`ankle${dt}`],g[L[`knee${dt}`]],g[L[`ankle${dt}`]],Math.max(0,Math.sin(fe))*.11*C-i.position.y,Math.cos(fe)*.095*C),no(v[`shoulder${dt}`],v[`elbow${dt}`],v[`wrist${dt}`],g[L[`elbow${dt}`]],g[L[`wrist${dt}`]],Math.max(0,Math.sin(qt))*.08*C-i.position.y,Math.cos(qt)*.07*C)}}if(rt.type==="kick"||rt.type==="strike"){i.rotation.y=-at*.55,i.rotation.z=at*.22,i.position.y+=at*.16;const dt=e.rig.ids;no(v.hip1,v.knee1,v.ankle1,g[dt.knee1],g[dt.ankle1],.26*at,1.16*at),v.hip1.rotation.y=-at*.3,v.hip1.rotation.z=-at*.08,v["shoulder-1"].rotation.z=at*.55}else if(rt.type==="slam"||rt.type==="belly"){const dt=Math.sin(rt.phase*Math.PI);i.rotation.x=-dt*.28,i.position.y+=dt*.22;for(const St of[-1,1])v[`hip${St}`].rotation.x-=dt*.7,v[`shoulder${St}`].rotation.z=St*dt*.45}else rt.type==="tongue"&&(v.head.rotation.x-=at*.1,v.spine.rotation.x-=at*.07);i.rotation.z+=Wt*.21*Math.sin(y*44),i.position.y-=R*.22,i.rotation.z+=R*1.35,v.spine.scale.y*=1-R*.15}else if(s==="heron"){const Bt=y*5.6,K=C;i.position.y=.035*Math.sin(Bt*2)*K,v.spine.rotation.x=-.03*Math.sin(Bt)*K,v.neck0.rotation.x=.1*Math.sin(y*1.4)-at*.62,v.neck1.rotation.x=-.08*Math.sin(y*1.4)+at*.58,v.neck2.rotation.x=-.03+at*.7,v.head.rotation.x=-.06*Math.sin(y*1.8)+at*.48,v.jaw.rotation.x=-at*.5;for(const J of[-1,1]){const ft=Bt+(J<0?Math.PI:0),dt=Math.sin(ft);v[`hip${J}`].rotation.x=dt*.31*K,v[`knee${J}`].rotation.x=Math.max(0,-dt)*.57*K,v[`foot${J}`].rotation.x=-.18*dt*K,v[`wing${J}`].rotation.y=J*(1.24-at*1.07-Wt*.55),v[`wing${J}`].rotation.z=J*(.07+at*(.5+.25*Math.sin(y*18))+Wt*.5),v[`wingElbow${J}`].rotation.y=J*.12,v[`wingWrist${J}`].rotation.z=J*at*.18}i.rotation.z+=Wt*.08*Math.sin(y*32)+R*1.45,i.position.y-=R*1.8}else if(s==="snake"){const Bt=y*(3+C*5),K=.055+C*.105;for(let ft=1;ft<=20;ft++)v[`coil${ft}`].rotation.y=Math.sin(Bt-ft*.48)*K,v[`coil${ft}`].rotation.x=ft<6?-at*.18*(1-ft/7):.006*Math.sin(y*3-ft);v.head.rotation.x=at*.45,v.head.rotation.y=Math.sin(Bt)*.035,v.jaw.rotation.x=-at*.62,i.position.y=at*.28;const J=m.find(ft=>ft.name==="tongue");J&&(J.visible=!k.dead&&(Math.sin(y*3.7)>.77||at>.2)),i.rotation.z=R*.65+Wt*.1*Math.sin(y*32)}else if(s==="fish"){const Bt=y*(4+C*10),K=.09+C*.22;v.spine.rotation.y=Math.sin(Bt)*K*.2,v.head.rotation.y=-Math.sin(Bt)*K*.13,v.tail0.rotation.y=Math.sin(Bt-.5)*K,v.tail1.rotation.y=Math.sin(Bt-1.1)*K*1.25,v.tail.rotation.y=Math.sin(Bt-1.6)*K*1.2,v.jaw.rotation.x=-at*.62-.035*Math.sin(y*2.5);for(const J of[-1,1])v[`fin${J}`].rotation.z=J*(.13+.16*Math.sin(y*6)),v[`fin${J}`].rotation.y=J*.15*Math.sin(y*5);i.rotation.x=-at*.35,i.position.y=.035*Math.sin(y*2),i.rotation.z=R*Math.PI+Wt*.14*Math.sin(y*35)}},dispose(){a.dispose(),o.dispose(),p.material.dispose();for(const N of m)N.material.dispose();c.dispose(),n.removeFromParent()}};return U.setTier(t.tier||1),U.update(0,{}),n.userData.creature=U,U}const so=(s,t)=>s.querySelector(t),$c=(s,t)=>Array.from(s.querySelectorAll(t)),el=(s,t=0,e=1)=>Math.max(t,Math.min(e,Number(s)||0)),Sn=(s="")=>String(s).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),ze=s=>Math.max(0,Math.round(Number(s)||0)),fn=(s,t)=>el((Number(s)||0)/(Number(t)||100)),rv={scout:"Ανιχνευτής",hunter:"Κυνηγός",bruiser:"Μαχητής",brute:"Βαρύς μαχητής",guardian:"Φύλακας",guard:"Φρουρός",leader:"Αρχηγός",agile:"Ακροβάτης",warrior:"Πολεμιστής",striker:"Μαχητής",intimidator:"Εκφοβιστής"},qc={heron:"ΕΡΩΔΙΟΣ",snake:"ΝΕΡΟΦΙΔΟ",fish:"ΑΡΠΑΚΤΙΚΟ ΨΑΡΙ"},av={heron:"Απέφυγε το ράμφος. Χτύπησε όταν ορμήσει.",snake:"Άνοιξε την ομάδα. Επίθεση από τα πλάγια.",fish:"Πήγαινε σε πέτρες και ρηχά. Πρόσεχε τη σκιά."},Yc={leaf:'<path d="M19 3C8 2 3 7 4 14c1 6 9 7 12 1 2-4 1-7 3-12Z"/><path d="M5 20 15 8M8 15l-1-5M11 12l5 1"/>',fly:'<path d="M12 8v11M9 10l-4-4M15 10l4-4M9 14l-5 2M15 14l5 2M10 18l-3 3M14 18l3 3"/><ellipse cx="7" cy="9" rx="3" ry="5" transform="rotate(-35 7 9)"/><ellipse cx="17" cy="9" rx="3" ry="5" transform="rotate(35 17 9)"/>',reeds:'<path d="M7 22V8m5 14V4m5 18V10M5 7V3h4v4Zm5-4V1h4v2Zm5 6V5h4v4Z"/>',heart:'<path d="m12 20-8-8C-1 6 7 1 12 7c5-6 13-1 8 5Z"/>',bolt:'<path d="m14 2-9 12h6l-1 8 9-13h-6Z"/>',stomach:'<path d="M10 3v6c-5-1-7 2-6 6 1 6 10 8 15 2 4-5 0-11-5-9V3M6 14c2-2 4 1 6 1"/>',moon:'<path d="M20 15A9 9 0 0 1 9 3a9 9 0 1 0 11 12Z"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 1v3m0 16v3M1 12h3m16 0h3M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2"/>',shield:'<path d="m12 2 8 3v7c0 5-8 10-8 10S4 17 4 12V5Z"/><path d="m8 12 3 3 6-6"/>',group:'<circle cx="12" cy="7" r="3"/><path d="M6 21v-4c0-6 12-6 12 0v4M4 7a3 3 0 0 0 0 6M20 7a3 3 0 0 1 0 6M2 20v-3m20 3v-3"/>',camp:'<path d="m2 20 10-17 10 17ZM8 20l4-8 4 8M9 3l3 4 3-4"/>',crown:'<path d="m3 6 4 4 5-7 5 7 4-4-3 14H6ZM7 16h10"/>',arrow:'<path d="m5 12 14 0m-6-6 6 6-6 6"/>',close:'<path d="m5 5 14 14M19 5 5 19"/>',sound:'<path d="M3 9v6h4l5 5V4L7 9ZM16 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/>',eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',pin:'<path d="M19 9c0 5-7 13-7 13S5 14 5 9a7 7 0 1 1 14 0Z"/><circle cx="12" cy="9" r="2"/>',skull:'<path d="M8 21v-4H5V9a7 7 0 0 1 14 0v8h-3v4ZM12 18v3"/><circle cx="9" cy="10" r="1.5"/><circle cx="15" cy="10" r="1.5"/>',check:'<path d="m4 12 5 5L20 6"/>'};function te(s,t=""){return`<svg class="fg-icon ${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${Yc[s]||Yc.leaf}</svg>`}const We=s=>`<kbd>${s}</kbd>`;class ov{constructor({onAction:t=()=>{},onStart:e=()=>{},onResume:n=()=>{},onSettings:i=()=>{}}={}){this.callbacks={onAction:t,onStart:e,onResume:n,onSettings:i},this.abort=new AbortController,this.state={},this.portraits={},this.panel=null,this.menu=null,this.lastDraw=0,this.lastPanel=0,this.settings={quality:"high",volume:.65,sensitivity:1},this.root=document.createElement("div"),this.root.id="frog-ui",this.root.innerHTML=this.markup(),document.body.append(this.root),so(this.root,".fg-title-art").style.backgroundImage='url("./art/creek.jpg")',this.refs={};for(const r of $c(this.root,"[data-ref]"))this.refs[r.dataset.ref]=r;this.root.addEventListener("click",r=>this.click(r),{signal:this.abort.signal}),this.root.addEventListener("input",r=>this.setting(r),{signal:this.abort.signal}),this.root.addEventListener("change",r=>this.setting(r),{signal:this.abort.signal}),this.root.addEventListener("contextmenu",r=>r.preventDefault(),{signal:this.abort.signal}),this.root.addEventListener("keydown",r=>{r.target.matches("input,select,button")&&r.stopPropagation()},{signal:this.abort.signal}),window.addEventListener("resize",()=>{this.lastDraw=0},{signal:this.abort.signal}),this.setLoading("Δημιουργία του ποταμού…")}markup(){return`
    <div class="fg-hud" data-ref="hud" hidden>
      <section class="fg-player" aria-label="Κατάσταση παίκτη">
        <div class="fg-player-top"><div class="fg-avatar"><img data-ref="playerPortrait" alt="Ο βάτραχός σου" hidden><span data-ref="playerBadge">${te("crown")}</span><b data-ref="level">1</b></div><div class="fg-player-title"><span class="fg-eyebrow">Η ΣΥΜΜΟΡΙΑ ΣΟΥ</span><strong>Πράσινο Ρεύμα</strong><div class="fg-rank"><span data-ref="tier">Βαθμίδα I</span><span class="fg-dot"></span><span data-ref="gangCount">1 βάτραχος</span></div></div></div>
        <div class="fg-vital fg-health">${te("heart")}<div class="fg-meter"><span data-ref="hpBar"></span></div><small data-ref="hpLabel">100</small></div>
        <div class="fg-vital fg-energy">${te("bolt")}<div class="fg-meter"><span data-ref="staminaBar"></span></div><small data-ref="staminaLabel">100</small></div>
        <div class="fg-vital fg-hunger">${te("stomach")}<div class="fg-meter"><span data-ref="stomachBar"></span></div><small data-ref="stomachLabel">70</small></div>
        <div class="fg-vital-labels"><span>Υγεία</span><span>Αντοχή</span><span data-ref="hungerStatus">Χορτάτος</span></div>
        <div class="fg-xp"><span data-ref="xpBar"></span></div>
      </section>
      <section class="fg-objective" data-ref="objectiveBox"><span class="fg-eyebrow">${te("pin")} ΣΤΟΧΟΣ</span><strong data-ref="objective">Βρες τροφή και χτίσε τη συμμορία σου.</strong><small data-ref="objectiveProgress"></small></section>
      <section class="fg-hunt" data-ref="hunt" aria-live="polite" hidden>
        <div class="fg-hunt-portrait"><img data-ref="predatorPortrait" alt="Θηρευτής" hidden><span data-ref="predatorFallback">${te("eye")}</span></div>
        <div class="fg-hunt-content"><div class="fg-hunt-heading"><span class="fg-eyebrow">ΣΕ ΚΥΝΗΓΑ</span><b data-ref="predatorName">ΘΗΡΕΥΤΗΣ</b><span data-ref="predatorHpLabel">100 / 100</span></div><div class="fg-predator-health"><span data-ref="predatorHp"></span></div><strong>Πολέμησε για να τον απωθήσεις ή να τον σκοτώσεις.</strong><small data-ref="predatorNote"></small></div>
      </section>
      <section class="fg-location"><div class="fg-clock"><span data-ref="dayIcon">${te("sun")}</span><b data-ref="clock">07:30</b><span data-ref="day">Ημέρα 1</span></div><button class="fg-map-button" data-action="open-roster" aria-label="Άνοιγμα χάρτη και συμμορίας"><canvas data-ref="minimap" width="340" height="340"></canvas><span class="fg-map-north">N</span><span class="fg-map-key">TAB · ΧΑΡΤΗΣ</span></button><div class="fg-resource-row"><span title="Αποθέματα τροφής">${te("fly")}<b data-ref="food">0</b></span><span title="Καλάμια για κατασκευές">${te("reeds")}<b data-ref="reeds">0</b></span></div><small class="fg-location-name" data-ref="location">Ο Μεγάλος Ποταμός</small></section>
      <div class="fg-crosshair" data-ref="crosshair"><i></i><i></i><i></i><i></i><span></span></div>
      <div class="fg-context" data-ref="context" hidden><span data-ref="hint"></span></div>
      <div class="fg-squad-status"><span class="fg-squad-pip"></span><span data-ref="squadMode">Η συμμορία ακολουθεί</span><span data-ref="guardCount"></span><span class="fg-view-label" data-ref="viewMode">Τρίτο πρόσωπο</span></div>
      <div class="fg-actionbar"><div class="fg-action-group"><span>${We("W A S D")} Κίνηση</span><span>${We("SPACE")} Άλμα</span><span>${We("SHIFT")} Τρέξιμο</span><span>${We("Z")} Αποφυγή</span></div><div class="fg-action-group"><span>${We("LMB")} Γλώσσα</span><span>${We("Q")} Ειδική</span><span>${We("R")} Εκφοβισμός</span><span>${We("E")} Ενέργεια</span></div><div class="fg-action-group"><button data-action="cycle-view">${We("C")} Κάμερα</button><button data-action="gang-toggle">${We("F")} Ομάδα</button><button data-action="open-build">${We("V")} Καταφύγιο</button><button data-action="open-pause" aria-label="Παύση">${We("ESC")}</button></div></div>
      <div class="fg-save-status" data-ref="saveStatus"></div>
    </div>
    <div class="fg-toasts" data-ref="toasts" role="status" aria-live="polite"></div>
    <div class="fg-loading" data-ref="loading"><div class="fg-loading-mark">${te("leaf")}</div><b>FROG</b><span data-ref="loadingText">Δημιουργία του ποταμού…</span><div class="fg-loading-line"></div></div>
    <section class="fg-title fg-overlay" data-ref="title" hidden>
      <div class="fg-title-art"></div><div class="fg-title-shade"></div><div class="fg-title-top"><span>${te("leaf")} ARIS CONSTANTINOU</span><small>3D SURVIVAL · TERRITORY · GANGS</small></div>
      <div class="fg-title-body"><div class="fg-eyebrow fg-title-kicker">ΕΝΑΣ ΠΟΤΑΜΟΣ. ΠΟΛΛΕΣ ΣΥΜΜΟΡΙΕΣ.</div><h1>FROG<span>CREEK DOMINION</span></h1><p>Κυνήγησε. Στρατολόγησε. Κυριάρχησε.<br>Κράτησε τη συμμορία σου ζωντανή.</p><div class="fg-title-actions"><button class="fg-button fg-primary" data-action="continue" data-ref="continueButton" hidden>Συνέχεια ${te("arrow")}</button><button class="fg-button fg-primary" data-action="new-game" data-ref="newButton">Μπες στον ποταμό ${te("arrow")}</button><button class="fg-button fg-subtle" data-action="title-help">Χειρισμός & οδηγός</button></div><div class="fg-title-note">Ποντίκι για στόχευση · WASD για κίνηση · Αποθήκευση στη συσκευή σου</div></div>
      <div class="fg-title-bottom"><div><b>01</b><span>Βρες τα μεγάλα σμήνη</span></div><div><b>02</b><span>Χτίσε και υπερασπίσου</span></div><div><b>03</b><span>Ένωσε τον ποταμό</span></div></div>
    </section>
    <section class="fg-modal-layer" data-ref="pause" hidden><div class="fg-panel fg-pause-panel"><div class="fg-panel-head"><div><span class="fg-eyebrow">ΜΙΑ ΑΝΑΣΑ ΣΤΗΝ ΟΧΘΗ</span><h2>Παύση</h2></div><button class="fg-icon-button" data-action="resume" aria-label="Συνέχεια">${te("close")}</button></div><p class="fg-muted">Ο ποταμός σε περιμένει.</p><div class="fg-pause-actions"><button class="fg-button fg-primary" data-action="resume">Επιστροφή στο παιχνίδι ${te("arrow")}</button><button class="fg-button" data-action="save">Αποθήκευση προόδου ${te("check")}</button></div><div class="fg-settings"><label>Ποιότητα γραφικών<select data-setting="quality"><option value="high">Υψηλή</option><option value="medium">Ισορροπημένη</option><option value="low">Απόδοση</option></select></label><label>Ένταση ήχου <output data-ref="volumeOutput">65%</output><input type="range" min="0" max="100" value="65" data-setting="volume"></label><label>Ευαισθησία ποντικιού <output data-ref="sensitivityOutput">1.0×</output><input type="range" min="30" max="200" value="100" data-setting="sensitivity"></label></div><button class="fg-text-button" data-action="pause-help">Πλήρης χειρισμός & οδηγός ${te("arrow")}</button><button class="fg-text-button fg-danger-text" data-action="restart-confirm">Νέο ταξίδι</button><div data-ref="restartConfirm" class="fg-confirm" hidden><p>Η τρέχουσα αποθηκευμένη πρόοδος θα αντικατασταθεί.</p><button class="fg-button fg-danger" data-action="restart">Έναρξη νέου παιχνιδιού</button><button class="fg-button" data-action="restart-cancel">Ακύρωση</button></div></div></section>
    <section class="fg-modal-layer" data-ref="panelLayer" hidden><div class="fg-panel fg-game-panel" data-ref="panel"></div></section>
    <section class="fg-modal-layer" data-ref="ending" hidden><div class="fg-panel fg-ending-panel"><span class="fg-ending-mark" data-ref="endingMark">${te("crown")}</span><span class="fg-eyebrow" data-ref="endingEyebrow">Ο ΠΟΤΑΜΟΣ ΕΝΩΘΗΚΕ</span><h2 data-ref="endingTitle">Κυρίαρχος του ποταμού</h2><p data-ref="endingText"></p><div class="fg-ending-stats" data-ref="endingStats"></div><div class="fg-pause-actions"><button class="fg-button fg-primary" data-action="continue-after-end" data-ref="endingContinue">Συνέχισε την εξερεύνηση</button><button class="fg-button" data-action="restart">Νέο ταξίδι</button></div></div></section>`}click(t){const e=t.target.closest("[data-action]");if(!e||e.disabled)return;const n=e.dataset.action;if(t.stopPropagation(),n==="new-game"||n==="continue"){this.hideMenus(),this.menu=null,this.refs.hud.hidden=!1,this.callbacks.onStart(n==="continue"?"continue":"new");return}if(n==="resume"||n==="close-panel"||n==="continue-after-end"){this.hideMenus(),this.callbacks.onResume();return}if(n==="open-pause"){this.showPause(!0),this.callbacks.onAction("pause",{});return}if(n==="open-build"){this.callbacks.onAction("panel-open",{name:"build"});return}if(n==="open-roster"){this.callbacks.onAction("panel-open",{name:"roster"});return}if(n==="title-help"||n==="pause-help"){this.returnMenu=n==="title-help"?"title":"pause",this.showPanel("help");return}if(n==="help-back"){this.closePanels(),this.returnMenu==="title"?this.showTitle(this.hasSave):this.showPause(!0);return}if(n==="tab-roster"||n==="tab-map"){this.showPanel(n==="tab-map"?"map":"roster");return}if(n==="build"){this.callbacks.onAction("build",{type:e.dataset.type,campId:e.dataset.camp||this.state.currentCampId});return}if(n==="frog-command"){this.callbacks.onAction("frog-command",{id:e.dataset.id,command:e.dataset.command});return}if(n==="gang-toggle"){this.callbacks.onAction("gang-command",{command:this.state.squadMode==="attack"?"follow":"attack"});return}if(n==="gang-follow"||n==="gang-guard"||n==="gang-attack"){this.callbacks.onAction("gang-command",{command:n.slice(5)});return}if(n==="restart-confirm"){this.refs.restartConfirm.hidden=!1;return}if(n==="restart-cancel"){this.refs.restartConfirm.hidden=!0;return}if(n==="restart"){this.hideMenus(),this.refs.hud.hidden=!1,this.callbacks.onAction("restart",{});return}if(n==="save"){this.callbacks.onAction("save",{});return}if(n==="consume"){this.callbacks.onAction("consume",{});return}if(n==="recruit"){this.callbacks.onAction("recruit",{});return}this.callbacks.onAction(n,{})}setting(t){const e=t.target.closest("[data-setting]");if(!e)return;const n=e.dataset.setting;this.settings[n]=n==="quality"?e.value:Number(e.value)/100,this.refs.volumeOutput.textContent=`${ze(this.settings.volume*100)}%`,this.refs.sensitivityOutput.textContent=`${this.settings.sensitivity.toFixed(1)}×`,this.callbacks.onSettings({...this.settings})}setSettings(t={}){Object.assign(this.settings,t);for(const e of $c(this.root,"[data-setting]")){const n=e.dataset.setting;e.value=n==="quality"?this.settings[n]:this.settings[n]*100}this.refs.volumeOutput.textContent=`${ze(this.settings.volume*100)}%`,this.refs.sensitivityOutput.textContent=`${this.settings.sensitivity.toFixed(1)}×`}setLoading(t,e){this.refs.loading.hidden=!1,this.refs.loadingText.textContent=t,e!==void 0&&this.refs.loading.style.setProperty("--progress",`${el(e)*100}%`)}showTitle(t=!1){this.hasSave=t,this.hideMenus(),this.menu="title",this.refs.loading.hidden=!0,this.refs.title.hidden=!1,this.refs.hud.hidden=!0,this.refs.continueButton.hidden=!t,this.refs.newButton.innerHTML=t?`Νέο ταξίδι ${te("arrow")}`:`Μπες στον ποταμό ${te("arrow")}`,this.refs.newButton.classList.toggle("fg-primary",!t)}showPause(t=!0){if(!t){this.refs.pause.hidden=!0,this.menu==="pause"&&(this.menu=null);return}this.closePanels(),this.menu="pause",this.refs.pause.hidden=!1,this.refs.restartConfirm.hidden=!0,document.exitPointerLock?.()}hideMenus(){for(const t of["title","pause","ending","panelLayer","loading"])this.refs[t].hidden=!0;this.panel=null,this.menu=null}isBlocking(){return!!(this.menu||this.panel)}closePanels(){this.panel=null,this.refs.panelLayer.hidden=!0}togglePanel(t,e){this.panel===t?this.closePanels():this.showPanel(t,e)}showPanel(t,e){this.panel=t,this.panelData=e||{},this.refs.pause.hidden=!0,this.refs.panelLayer.hidden=!1,document.exitPointerLock?.(),this.renderPanel(!0)}setPortraits(t){Object.assign(this.portraits,t),this.portraits.frog&&(this.refs.playerPortrait.src=this.portraits.frog,this.refs.playerPortrait.hidden=!1,this.refs.playerBadge.hidden=!0),this.activePortrait=null}update(t={}){this.state=t;const e=t.player||{};this.meter("hpBar",fn(e.hp,e.maxHp)),this.meter("staminaBar",fn(e.stamina,e.maxStamina)),this.meter("stomachBar",fn(e.stomach,e.maxStomach)),this.meter("xpBar",fn(e.xp,e.nextXp)),this.setText("hpLabel",ze(e.hp)),this.setText("staminaLabel",ze(e.stamina)),this.setText("stomachLabel",`${ze(fn(e.stomach,e.maxStomach)*100)}%`),this.setText("level",e.level||1),this.setText("tier",`Βαθμίδα ${["","I","II","III","IV","V"][e.tier||1]||e.tier}`);const n=fn(e.stomach,e.maxStomach);this.setText("hungerStatus",n>.94?"Γεμάτο στομάχι":n>.35?"Χορτάτος":n>.1?"Πεινάς":"Χρειάζεσαι τροφή"),this.root.classList.toggle("fg-low-health",fn(e.hp,e.maxHp)<.25),this.root.classList.toggle("fg-low-hunger",n<.15);const i=t.allies||[];this.setText("gangCount",`${t.gangCount??i.length+1} βάτραχοι`);const r=i.filter(d=>d.guard||d.order==="guard").length;this.setText("guardCount",r?`${r} σε φρουρά`:""),this.setText("squadMode",t.squadModeLabel||{follow:"Η συμμορία ακολουθεί",attack:"Η συμμορία επιτίθεται",guard:"Η συμμορία φρουρεί",stay:"Η συμμορία περιμένει"}[t.squadMode]||"Η συμμορία ακολουθεί");const a=this.resources(t.resources);this.setText("food",ze(a.food)),this.setText("reeds",ze(a.reeds)),this.setText("clock",t.timeLabel||"07:30"),this.setText("day",`Ημέρα ${t.day||1}`);const o=!!t.night;o!==this.lastNight&&(this.refs.dayIcon.innerHTML=te(o?"moon":"sun"),this.lastNight=o),this.setText("location",t.locationName||"Ο Μεγάλος Ποταμός");const l=t.objective;this.setText("objective",typeof l=="string"?l:l?.title||"Βρες τροφή και δυνάμωσε τη συμμορία σου."),this.setText("objectiveProgress",t.objectiveProgress||l?.progress||""),this.setText("hint",t.hint||""),this.refs.context.hidden=!t.hint||this.isBlocking(),this.refs.crosshair.hidden=this.isBlocking()||t.viewMode==="topdown",this.setText("viewMode",{third:"Τρίτο πρόσωπο",first:"Πρώτο πρόσωπο",topdown:"Κάτοψη"}[t.viewMode]||"Τρίτο πρόσωπο"),this.root.classList.toggle("fg-aiming",!!t.aiming);const c=t.predator,h=!!(c&&c.hp>0);if(this.refs.hunt.hidden=!h,this.refs.objectiveBox.hidden=h,h){this.setText("predatorName",c.name||qc[c.type]||"ΘΗΡΕΥΤΗΣ"),this.setText("predatorHpLabel",`${ze(c.hp)} / ${ze(c.maxHp)}`),this.meter("predatorHp",fn(c.hp,c.maxHp)),this.setText("predatorNote",c.objective||c.note||av[c.type]||"Συντόνισε τις επιθέσεις της συμμορίας.");const d=c.portrait||this.portraits[c.type];d&&d!==this.activePortrait&&(this.refs.predatorPortrait.src=d,this.refs.predatorPortrait.alt=c.name||qc[c.type]||"Θηρευτής",this.activePortrait=d),this.refs.predatorPortrait.hidden=!d,this.refs.predatorFallback.hidden=!!d}t.savedAt&&t.savedAt!==this.savedAt&&(this.savedAt=t.savedAt,this.setText("saveStatus","Η πρόοδος αποθηκεύτηκε"),clearTimeout(this.saveTimer),this.saveTimer=setTimeout(()=>this.setText("saveStatus",""),3e3));const u=performance.now();if(u-this.lastDraw>100&&(this.drawMap(this.refs.minimap,t.world||{},!1),this.lastDraw=u,this.panel==="map")){const d=so(this.refs.panel,"canvas");d&&this.drawMap(d,t.world||{},!0)}this.panel&&u-this.lastPanel>700&&!["help","map"].includes(this.panel)&&(this.renderPanel(!1),this.lastPanel=u)}resources(t){return typeof t=="number"?{food:t,reeds:t}:{food:t?.food??t?.flies??0,reeds:t?.reeds??t?.wood??t?.materials??0}}setText(t,e){const n=this.refs[t];n&&n.textContent!==String(e)&&(n.textContent=String(e))}meter(t,e){const n=this.refs[t];n&&(n.style.transform=`scaleX(${el(e)})`)}panelHeader(t,e,n=""){return`<div class="fg-panel-head"><div><span class="fg-eyebrow">${t}</span><h2>${e}</h2></div><button class="fg-icon-button" data-action="${this.panel==="help"?"help-back":"close-panel"}" aria-label="Κλείσιμο">${te("close")}</button></div>${n}`}renderPanel(t=!1){const e=this.refs.panel;if(!this.panel)return;const n=e.scrollTop,i=document.activeElement;if(!(!t&&e.contains(i)&&i.tagName==="BUTTON")){if(this.panel==="help"){e.innerHTML=this.helpMarkup();return}this.panel==="build"?e.innerHTML=this.buildMarkup():this.panel==="roster"?e.innerHTML=this.rosterMarkup():this.panel==="map"&&(e.innerHTML=this.panelHeader("Ο ΚΟΣΜΟΣ ΣΟΥ","Ο Μεγάλος Ποταμός",this.tabs("map"))+'<div class="fg-large-map"><canvas width="1024" height="720"></canvas><span class="fg-map-north">N</span></div><div class="fg-map-legend"><span><i style="--legend:#c8f3a1"></i>Εσύ & σύμμαχοι</span><span><i style="--legend:#ee9a71"></i>Αντίπαλοι</span><span><i style="--legend:#f6db82"></i>Τροφή</span><span><i style="--legend:#c2b9e8"></i>Ελεύθερες θέσεις</span><span><i style="--legend:#f85a48"></i>Θηρευτές</span></div>',this.drawMap(so(e,"canvas"),this.state.world||{},!0)),e.scrollTop=n}}tabs(t){return`<div class="fg-tabs"><button class="${t==="roster"?"active":""}" data-action="tab-roster">${te("group")} Συμμορία</button><button class="${t==="map"?"active":""}" data-action="tab-map">${te("pin")} Χάρτης</button></div>`}buildMarkup(){const t=this.state,e=this.resources(t.resources),n=t.currentCamp||this.panelData?.camp,i=[{type:"shelter",name:"Νέο καταφύγιο",description:"Ίδρυσε ασφαλή βάση σε κατάλληλο σημείο.",cost:{food:20,reeds:30},icon:"camp"},{type:"store",name:"Αποθήκη τροφής",description:"Περισσότερα προστατευμένα αποθέματα για τη συμμορία.",cost:{food:15,reeds:20},icon:"fly"},{type:"nursery",name:"Φωλιά στρατολόγησης",description:"Δημιουργεί νέους βατράχους, καταναλώνοντας τροφή.",cost:{food:35,reeds:35},icon:"group"},{type:"watchtower",name:"Σκοπιά & οχύρωση",description:"Ενισχύει την άμυνα και την επιτήρηση του καταφυγίου.",cost:{food:15,reeds:30},icon:"shield"},{type:"upgrade",name:"Αναβάθμιση καταφυγίου",description:"Μεγαλύτερη αντοχή και καλύτερη υποστήριξη της ομάδας.",cost:{food:45,reeds:45},icon:"crown"}],r=t.buildOptions||this.panelData?.buildOptions||i;return this.panelHeader("ΦΥΛΛΑ, ΚΑΛΑΜΙΑ ΚΑΙ ΑΣΦΑΛΕΙΑ","Το καταφύγιό σου")+`
      <div class="fg-camp-summary"><div>${te("camp")}<strong>${Sn(n?.name||t.campName||(t.inCamp?"Φιλικό καταφύγιο":"Νέο σημείο εγκατάστασης"))}</strong><small>${t.inCamp?"Οργάνωσε τη βάση και άφησε φρουρά πριν φύγεις.":"Βρες ασφαλές σημείο σε νησίδα ή φαρδύ βράχο."}</small></div><div class="fg-camp-resources"><span>${te("fly")}${ze(e.food)}</span><span>${te("reeds")}${ze(e.reeds)}</span></div></div>
      <div class="fg-build-grid">${r.map((a,o)=>{const l=typeof a.cost=="number"?{food:a.cost,reeds:0}:a.cost||{},c=e.food>=(l.food||0)&&e.reeds>=(l.reeds||0),h=a.enabled!==!1&&c;return`<button class="fg-build-card" data-action="build" data-type="${Sn(a.type)}" data-camp="${Sn(n?.id||t.currentCampId||"")}" ${h?"":"disabled"}><span class="fg-build-icon">${te(a.icon||i.find(u=>u.type===a.type)?.icon||"camp")}</span><span class="fg-build-info"><strong>${Sn(a.name)}</strong><small>${Sn(a.description||"")}</small><span class="fg-build-cost">${l.food?`<span class="${e.food<l.food?"fg-short":""}">${te("fly")}${ze(l.food)}</span>`:""}${l.reeds?`<span class="${e.reeds<l.reeds?"fg-short":""}">${te("reeds")}${ze(l.reeds)}</span>`:""}${a.level?`<em>Βαθμίδα ${a.level}</em>`:""}</span>${h?"":`<span class="fg-build-reason">${Sn(a.reason||(c?"Μη διαθέσιμο εδώ":"Δεν αρκούν τα αποθέματα"))}</span>`}</span><kbd>${o+1}</kbd></button>`}).join("")}</div>
      <div class="fg-camp-footer"><button class="fg-button fg-small" data-action="consume" ${t.inCamp?"":"disabled"}>${We("G")} Φάε από τα αποθέματα</button><span>Η εφεδρική τροφή είναι περιορισμένη. Το κυνήγι παραμένει απαραίτητο.</span></div>
      <div class="fg-panel-bottom">${We("V")} ή ${We("ESC")} επιστροφή στον ποταμό <span>Διαθέσιμα καταφύγια: ${(t.camps||[]).filter(a=>a.team==="player"||a.team==="ally"||a.team==="friendly").length}</span></div>`}rosterMarkup(){const t=this.state.allies||[];return this.panelHeader("ΔΥΝΑΜΗ ΜΕ ΣΥΝΤΟΝΙΣΜΟ","Η συμμορία σου",this.tabs("roster"))+`
      <div class="fg-roster-summary"><span><b>${t.length+1}</b> μέλη</span><span><b>${t.filter(e=>e.guard||e.order==="guard").length}</b> φρουροί</span><span><b>${ze(t.length?t.reduce((e,n)=>e+fn(n.stomach,n.maxStomach),0)/t.length*100:100)}%</b> κορεσμός ομάδας</span></div>
      <div class="fg-squad-commands"><button class="fg-button fg-small" data-action="gang-follow">${te("group")} Ακολουθήστε</button><button class="fg-button fg-small" data-action="gang-guard">${te("shield")} Φυλάξτε</button><button class="fg-button fg-small" data-action="gang-attack">${te("bolt")} Επιτεθείτε</button></div>
      <div class="fg-roster-list">${t.length?t.map((e,n)=>{const i=e.guard||e.order==="guard";return`<article class="fg-frog-row"><div class="fg-frog-rank"><span>${ze(e.level||1)}</span><small>LVL</small></div><div class="fg-frog-info"><div><strong>${Sn(e.name||`Βάτραχος ${n+1}`)}</strong><span class="fg-role-tag">${Sn(rv[e.role]||e.role||"Κυνηγός")}</span></div><small>Βαθμίδα ${e.tier||1} · ${i?"Σε φρουρά":"Στην ομάδα"}</small><div class="fg-frog-meters"><span title="Υγεία">${te("heart")}<i><b style="width:${fn(e.hp,e.maxHp)*100}%"></b></i>${ze(e.hp)}</span><span title="Στομάχι">${te("stomach")}<i><b style="width:${fn(e.stomach,e.maxStomach)*100}%"></b></i>${ze(fn(e.stomach,e.maxStomach)*100)}%</span></div></div><div class="fg-frog-commands"><button class="fg-button fg-small" data-action="frog-command" data-id="${Sn(e.id)}" data-command="${i?"follow":"guard"}">${te(i?"group":"shield")}${i?"Έλα μαζί":"Φρουρά"}</button><button class="fg-button fg-small fg-promote" data-action="frog-command" data-id="${Sn(e.id)}" data-command="promote" ${e.canPromote===!1?"disabled":""}>${te("crown")}Προαγωγή${e.promoteCost?` · ${ze(e.promoteCost)}`:""}</button></div></article>`}).join(""):`<div class="fg-empty">${te("group")}<h3>Η συμμορία ξεκινά από εσένα.</h3><p>Πλησίασε έναν ανεξάρτητο ή φοβισμένο βάτραχο και πάτησε ${We("E")} για να τον στρατολογήσεις.</p></div>`}</div>
      <div class="fg-panel-bottom">${We("X")} αναθέτει φρουρά κοντά σε βάση <span>Άφησε φρουρούς όταν βγαίνεις για κυνήγι.</span></div>`}helpMarkup(){const t=[["W A S D","Κίνηση σε σχέση με την κάμερα · σταθερή κατεύθυνση στην κάτοψη"],["Ποντίκι","Κάμερα και στόχευση · ελεύθερος δείκτης στην κάτοψη"],["C","Αλλαγή κάμερας: τρίτο → πρώτο πρόσωπο → κάτοψη"],["Ροδέλα","Απόσταση κάμερας / μεγέθυνση κάτοψης"],["SPACE","Άλμα σε φύλλα και βράχους"],["SHIFT","Γρήγορη κίνηση · καταναλώνει αντοχή"],["Z","Γρήγορη αποφυγή επίθεσης"],["LMB","Γλώσσα · πιάσε μύγες ή χτύπησε στόχο"],["RMB","Στόχευση / αμυντική στάση"],["Q","Εκτέλεση της επιλεγμένης ειδικής επίθεσης"],["1 / 2 / 3","Επιλογή ειδικής κίνησης"],["E","Στρατολόγηση, αλληλεπίδραση ή λεηλασία"],["R","Εκφοβισμός των αντιπάλων"],["F","Εναλλαγή εντολής συμμορίας: επίθεση / ακολουθήστε"],["X","Ανάθεση φρουράς / επιστροφή στην ομάδα"],["V","Κατασκευή και αναβάθμιση καταφυγίου"],["G","Τροφή από αποθέματα κοντά στη βάση"],["TAB","Συμμορία και χάρτης"],["ESC","Παύση / απελευθέρωση ποντικιού"]];return this.panelHeader("ΚΡΑΤΗΣΕ ΤΑ ΔΑΧΤΥΛΑ ΚΟΝΤΑ ΣΤΟ WASD","Χειρισμός & επιβίωση")+`<div class="fg-help-grid"><div><h3>Χειρισμός</h3><dl class="fg-controls">${t.map(([e,n])=>`<div><dt>${We(e)}</dt><dd>${n}</dd></div>`).join("")}</dl></div><div class="fg-guide"><h3>Το ταξίδι σου</h3><article><b>01 / Κυνήγησε</b><p>Τα σμήνη πάνω από σάπια φρούτα έχουν άφθονη τροφή. Το στομάχι κάθε βατράχου γεμίζει· παρακολούθησε την πείνα όλης της ομάδας.</p></article><article><b>02 / Οργάνωσε</b><p>Στρατολόγησε, προήγαγε και μοίρασε ρόλους. Κατασκεύασε φωλιές, αποθήκες και σκοπιές σε διαφορετικές περιοχές.</p></article><article><b>03 / Υπερασπίσου</b><p>Άφησε φρουρά όταν φεύγεις. Οι αντίπαλοι κάνουν επιδρομές για να κλέψουν αποθέματα, ιδιαίτερα τη νύχτα.</p></article><article><b>04 / Αντιμετώπισε τους θηρευτές</b><p>Διάβασε την προειδοποίηση της επίθεσης, άνοιξε την ομάδα και αντεπιτέσου. Η αριθμητική υπεροχή βοηθά, αλλά κανείς δεν είναι άτρωτος.</p></article><article><b>05 / Ένωσε τον ποταμό</b><p>Κατάστρεψε τις εχθρικές βάσεις ή πείσε τις συμμορίες να ενωθούν μαζί σου. Η δύναμη και οι νίκες σου αυξάνουν την επιρροή σου.</p></article><div class="fg-outline-guide"><span><i style="--legend:#9ee9a0"></i>Σύμμαχος</span><span><i style="--legend:#ef936d"></i>Αντίπαλος</span><span><i style="--legend:#f2ce73"></i>Θηρευτής</span></div></div></div>`}drawMap(t,e={},n=!1){const i=t.getContext("2d");if(!i)return;const r=t.width,a=t.height,o=e.radius||110,l=Math.min(r,a)/(o*2.12),c=r/2,h=a/2,u=y=>[c+(y.x??y.position?.x??0)*l,h+(y.z??y.position?.z??0)*l];i.clearRect(0,0,r,a),i.fillStyle="#102825",i.fillRect(0,0,r,a),i.strokeStyle="#263e37",i.lineWidth=1;const d=20*l;for(let y=c%d;y<r;y+=d)i.beginPath(),i.moveTo(y,0),i.lineTo(y,a),i.stroke();for(let y=h%d;y<a;y+=d)i.beginPath(),i.moveTo(0,y),i.lineTo(r,y),i.stroke();if(e.platforms){i.fillStyle="#42523d";for(const y of e.platforms){const[w,_]=u(y);i.beginPath(),i.arc(w,_,Math.max(1,(y.radius||1)*l),0,Math.PI*2),i.fill()}}for(const y of e.hotspots||[]){if(y.flies===0)continue;const[w,_]=u(y);i.fillStyle=y.rich?"#d6b96b":"#8c9c6e",i.globalAlpha=.65,i.beginPath(),i.arc(w,_,n?5:3,0,Math.PI*2),i.fill()}i.globalAlpha=1;for(const y of e.camps||this.state.camps||[]){const[w,_]=u(y),T=["player","ally","friendly",0].includes(y.team),R=y.team==="neutral"||y.team==null;i.strokeStyle=T?"#b8e89b":R?"#b6a9da":"#e89470",i.fillStyle=T?"#324e35":R?"#332f45":"#51392e",i.lineWidth=n?2:1.5;const C=n?7:5;i.beginPath(),i.moveTo(w,_-C),i.lineTo(w+C,_),i.lineTo(w+C,_+C),i.lineTo(w-C,_+C),i.lineTo(w-C,_),i.closePath(),i.fill(),i.stroke(),n&&y.name&&(i.font="13px system-ui",i.textAlign="center",i.fillStyle="#c9d0ba",i.fillText(y.name,w,_+C+16))}const p=(y,w,_)=>{i.fillStyle=w;for(const T of y||[]){if(T.dead)continue;const[R,C]=u(T);i.beginPath(),i.arc(R,C,_,0,Math.PI*2),i.fill()}};p(e.enemies,"#df936f",n?3:2),p(e.allies,"#94ca8c",n?3:2);for(const y of e.predators||[]){if(y.dead||y.hp===0)continue;const[w,_]=u(y);i.save(),i.translate(w,_),i.rotate(Math.PI/4),i.fillStyle=y.hunting?"#ff6953":"#b47b67";const T=n?6:4;i.fillRect(-T,-T,T*2,T*2),i.restore()}const m=e.player||{x:0,z:0,yaw:0},[v,g]=u(m);i.strokeStyle="rgba(199,235,165,.16)",i.lineWidth=1,i.beginPath(),i.arc(v,g,18*l,0,Math.PI*2),i.stroke(),i.save(),i.translate(v,g),i.rotate(Math.PI-(m.yaw||0)),i.fillStyle="#e2f4bc",i.strokeStyle="#142a20",i.lineWidth=2;const f=n?9:7;i.beginPath(),i.moveTo(0,-f),i.lineTo(f*.65,f*.7),i.lineTo(0,f*.35),i.lineTo(-f*.65,f*.7),i.closePath(),i.fill(),i.stroke(),i.restore(),n&&(i.font="12px system-ui",i.textAlign="left",i.fillStyle="#829b8c",i.fillText("Κάθε τετράγωνο: 20 μονάδες",20,a-20))}toast(t,e="info"){const n=document.createElement("div");for(n.className=`fg-toast fg-toast-${e}`,n.innerHTML=`${te(e==="success"?"check":e==="warning"||e==="danger"?"eye":e==="food"?"fly":"leaf")}<span>${Sn(t)}</span>`,this.refs.toasts.append(n);this.refs.toasts.children.length>4;)this.refs.toasts.firstChild.remove();setTimeout(()=>{n.classList.add("fg-toast-out"),setTimeout(()=>n.remove(),250)},e==="warning"?6e3:4200)}showEnding(t,e={}){this.hideMenus(),this.menu="ending",this.refs.ending.hidden=!1,document.exitPointerLock?.(),this.refs.endingMark.innerHTML=te(t?"crown":"leaf"),this.setText("endingEyebrow",t?"Ο ΠΟΤΑΜΟΣ ΕΝΩΘΗΚΕ":"ΤΟ ΤΑΞΙΔΙ ΤΕΛΕΙΩΣΕ"),this.setText("endingTitle",t?"Κυρίαρχος του ποταμού":"Η λίμνη θυμάται"),this.setText("endingText",t?"Οι αντίπαλες βάσεις έπεσαν ή επέλεξαν να ενωθούν μαζί σου. Η συμμορία σου γράφει πλέον την ιστορία του ποταμού.":"Κάθε διαδρομή αφήνει μια ιστορία. Επέστρεψε με καλύτερη φρουρά, γεμάτα στομάχια και μια πιο δεμένη συμμορία."),this.refs.endingContinue.hidden=!t;const n=[["Ημέρες",e.days||e.day||1],["Μύγες",e.fliesCaught||e.flies||0],["Στρατολογήσεις",e.recruited||0],["Καταφύγια",e.campsCaptured||e.camps||0],["Θηρευτές",e.predatorsKilled||e.predators||0]];this.refs.endingStats.innerHTML=n.map(([i,r])=>`<div><b>${ze(r)}</b><span>${i}</span></div>`).join("")}destroy(){this.abort.abort(),clearTimeout(this.saveTimer),this.root.remove()}}class lv{constructor({volume:t=.65}={}){this.volume=Math.max(0,Math.min(1,t)),this._muted=!1,this.context=null,this.master=null,this.started=!1,this.elapsed=0,this.nextCroak=7,this.nextBird=4,this.nextNote=12,this.lastPlayed=new Map,this.ambient=[],this.activeVoices=0,this.seed=78103,this.night=!1,this.hunt=!1,this.water=!1}random(){return this.seed=Math.imul(this.seed,1664525)+1013904223>>>0,this.seed/4294967296}async init(){if(this.context){this.context.state==="suspended"&&await this.context.resume().catch(()=>{});return}const t=window.AudioContext||window.webkitAudioContext;if(t)try{this.context=new t;const e=this.context;this.master=e.createGain(),this.master.gain.value=this._muted?0:this.volume*.58,this.compressor=e.createDynamicsCompressor(),this.compressor.threshold.value=-18,this.compressor.knee.value=18,this.compressor.ratio.value=3,this.compressor.attack.value=.012,this.compressor.release.value=.2,this.master.connect(this.compressor),this.compressor.connect(e.destination),this.sfx=e.createGain(),this.sfx.gain.value=.8,this.sfx.connect(this.master),this.ambience=e.createGain(),this.ambience.gain.value=.6,this.ambience.connect(this.master);const n=e.sampleRate*4;this.noise=e.createBuffer(1,n,e.sampleRate);const i=this.noise.getChannelData(0);let r=0;for(let o=0;o<n;o++)r=(r+(this.random()*2-1)*.025)/1.015,i[o]=r*5;this.white=e.createBuffer(1,e.sampleRate*2,e.sampleRate);const a=this.white.getChannelData(0);for(let o=0;o<a.length;o++)a[o]=this.random()*2-1;this.startAmbience(),e.state==="suspended"&&await e.resume().catch(()=>{})}catch{this.context=null}}async start(){await this.init(),this.started=!!this.context}get muted(){return this._muted}set muted(t){this._muted=!!t,this.setVolume(this.volume)}setVolume(t){this.volume=Math.max(0,Math.min(1,Number(t)||0)),this.master&&this.master.gain.setTargetAtTime(this._muted?0:this.volume*.58,this.context.currentTime,.08)}setMuted(t){this.muted=t}async resume(){this.context?.state==="suspended"&&await this.context.resume().catch(()=>{})}async suspend(){this.context?.state==="running"&&await this.context.suspend().catch(()=>{})}startAmbience(){const t=this.context,e=(n,i,r,a)=>{const o=t.createBufferSource();o.buffer=n,o.loop=!0;const l=t.createBiquadFilter();l.type=i,l.frequency.value=r,l.Q.value=.5;const c=t.createGain();return c.gain.value=a,o.connect(l),l.connect(c),c.connect(this.ambience),o.start(),this.ambient.push(o),{source:o,filter:l,volume:c}};this.current=e(this.noise,"lowpass",650,.11),this.breeze=e(this.white,"bandpass",1800,.018),this.insects=e(this.white,"bandpass",6200,.0015),this.lowTone=t.createOscillator(),this.lowTone.type="sine",this.lowTone.frequency.value=73.416,this.lowGain=t.createGain(),this.lowGain.gain.value=.002,this.lowTone.connect(this.lowGain),this.lowGain.connect(this.ambience),this.lowTone.start(),this.ambient.push(this.lowTone)}update(t,{night:e=!1,water:n=!1,hunt:i=!1,paused:r=!1}={}){if(!this.context||!this.started||this.context.state!=="running"||r)return;this.elapsed+=Math.min(t,.1),this.night=e,this.water=n,this.hunt=i;const a=this.context.currentTime;if(this.current.volume.gain.setTargetAtTime((n?.2:.075)+Math.sin(this.elapsed*.31)*.015,a,.5),this.breeze.volume.gain.setTargetAtTime((e?.009:.019)+(Math.sin(this.elapsed*.071)+1)*.004,a,1),this.insects.volume.gain.setTargetAtTime(e?.005:.001,a,1.4),this.lowGain.gain.setTargetAtTime(i?.025:.002,a,1.1),this.lowTone.frequency.setTargetAtTime(i?55:73.416,a,.5),this.elapsed>this.nextCroak&&(this.nextCroak=this.elapsed+(e?5:9)+this.random()*14,this.croak(.2+this.random()*.15,180+this.random()*110,(this.random()-.5)*1.8)),!e&&this.elapsed>this.nextBird&&(this.nextBird=this.elapsed+11+this.random()*21,this.chirp(.08,(this.random()-.5)*1.6)),!i&&this.elapsed>this.nextNote){this.nextNote=this.elapsed+15+this.random()*13;const o=e?[146.832,220,293.665]:[196,246.942,293.665,440],l=o[Math.floor(this.random()*o.length)];this.tone(l,l,3.8,.014,"sine",.6,(this.random()-.5)*.8,this.ambience),this.tone(l*1.5,l*1.5,4.4,.005,"sine",.8,0,this.ambience)}}output(t=0,e){const n=this.context;if(n.createStereoPanner){const i=n.createStereoPanner();return i.pan.value=Math.max(-1,Math.min(1,t)),i.connect(e||this.sfx),i}return e||this.sfx}tone(t,e,n,i=.1,r="sine",a=.005,o=0,l,c=0){if(!this.context)return;const h=this.context,u=h.currentTime+c,d=h.createOscillator();d.type=r,d.frequency.setValueAtTime(Math.max(20,t),u),d.frequency.exponentialRampToValueAtTime(Math.max(20,e),u+n);const p=h.createGain();p.gain.setValueAtTime(0,u),p.gain.linearRampToValueAtTime(i,u+Math.min(a,n*.4)),p.gain.exponentialRampToValueAtTime(1e-4,u+n);const m=this.output(o,l);d.connect(p),p.connect(m),d.start(u),d.stop(u+n+.03),d.onended=()=>{d.disconnect(),p.disconnect(),m!==this.sfx&&m!==this.ambience&&m.disconnect()}}noiseBurst(t,e=.1,n=1e3,i=.4,r="bandpass",a=0,o=0){if(!this.context)return;const l=this.context,c=l.currentTime+o,h=l.createBufferSource();h.buffer=this.white;const u=l.createBiquadFilter();u.type=r,u.frequency.value=n,u.Q.value=i;const d=l.createGain();d.gain.setValueAtTime(0,c),d.gain.linearRampToValueAtTime(e,c+.006),d.gain.exponentialRampToValueAtTime(1e-4,c+t);const p=this.output(a);h.connect(u),u.connect(d),d.connect(p),h.start(c,this.random()*.7),h.stop(c+t+.02),h.onended=()=>{h.disconnect(),u.disconnect(),d.disconnect(),p!==this.sfx&&p.disconnect()}}croak(t=.35,e=210,n=0){this.tone(e*1.2,e*.72,.17,t*.12,"sawtooth",.018,n),this.tone(e*.7,e*.55,.22,t*.17,"sine",.02,n),this.tone(e,e*.76,.18,t*.1,"triangle",.012,n,void 0,.16),this.noiseBurst(.18,t*.025,900,2,"bandpass",n)}chirp(t=.2,e=0){const n=1600+this.random()*1e3;this.tone(n,n*1.32,.09,t*.3,"sine",.012,e),this.tone(n*1.45,n,.12,t*.22,"sine",.008,e,void 0,.13),this.tone(n,n*1.18,.07,t*.2,"sine",.006,e,void 0,.3)}play(t,e={}){if(!this.context||this.context.state!=="running"||this._muted)return;typeof e=="number"&&(e={intensity:e});const n=this.context.currentTime,i={splash:.11,hit:.065,tongue:.09,footstep:.14,water:.15,ui:.04}[t]||.045;if(n-(this.lastPlayed.get(t)??-100)<i)return;this.lastPlayed.set(t,n);const r=Math.max(.03,Math.min(2,e.volume??e.intensity??1)),a=e.pan||0;switch(t){case"tongue":case"catch":this.tone(650,125,.13,.085*r,"sine",.002,a),this.tone(190,420,.065,.06*r,"triangle",.001,a),this.noiseBurst(.035,.035*r,1700,.8,"bandpass",a);break;case"eat":case"fly":case"food":this.tone(430,220,.075,.075*r,"sine",.003,a),this.noiseBurst(.08,.025*r,1300,.7,"bandpass",a),this.tone(740,880,.09,.018*r,"sine",.004,a,void 0,.04);break;case"jump":this.noiseBurst(.17,.065*r,500,.7,"bandpass",a),this.tone(140,65,.16,.055*r,"sine",.005,a);break;case"land":case"footstep":this.noiseBurst(.085,.055*r,410,.7,"lowpass",a),this.tone(100,45,.11,.055*r,"sine",.002,a);break;case"splash":case"water":this.noiseBurst(.42,.15*r,1700,.2,"lowpass",a),this.noiseBurst(.16,.08*r,3600,.4,"bandpass",a,.025),this.tone(140,50,.24,.07*r,"sine",.003,a),this.tone(660,220,.13,.018*r,"sine",.005,a,void 0,.08);break;case"hit":case"kick":case"damage":this.tone(125,38,.16,.18*r,"sine",.002,a),this.noiseBurst(.105,.12*r,850,.5,"lowpass",a),this.noiseBurst(.04,.055*r,2600,.6,"bandpass",a);break;case"slam":case"heavy":this.tone(90,27,.42,.23*r,"sine",.005,a),this.noiseBurst(.35,.2*r,1100,.3,"lowpass",a),this.noiseBurst(.18,.1*r,3200,.5,"bandpass",a,.02);break;case"roar":case"intimidate":this.croak(.8*r,115,a),this.tone(77,51,.65,.15*r,"triangle",.05,a),this.croak(.7*r,105,a);break;case"croak":this.croak(.6*r,180+this.random()*75,a);break;case"hurt":this.tone(330,120,.2,.07*r,"sawtooth",.005,a),this.tone(160,90,.25,.095*r,"sine",.006,a);break;case"death":this.tone(220,43,.55,.08*r,"triangle",.01,a),this.noiseBurst(.3,.065*r,1200,.5,"lowpass",a);break;case"recruit":case"success":this.croak(.3*r,220,a),[392,493.883,587.33].forEach((o,l)=>this.tone(o,o,.28,.045*r,"sine",.015,a,void 0,l*.1));break;case"promote":case"levelup":case"level-up":[293.665,392,493.883,587.33].forEach((o,l)=>this.tone(o,o,.6,.06*r,"sine",.014,a,void 0,l*.12)),this.tone(146.832,146.832,1.2,.045*r,"sine",.03,a);break;case"build":for(let o=0;o<4;o++)this.noiseBurst(.09,.085*r,1e3+o*350,.8,"bandpass",a,o*.12),this.tone(210+o*35,80,.11,.06*r,"triangle",.003,a,void 0,o*.12);break;case"loot":case"gather":this.noiseBurst(.2,.055*r,2300,.7,"bandpass",a),[550,740].forEach((o,l)=>this.tone(o,o*1.04,.18,.035*r,"sine",.006,a,void 0,l*.08));break;case"flap":this.noiseBurst(.2,.19*r,550,.3,"lowpass",a),this.noiseBurst(.17,.12*r,900,.5,"bandpass",a,.22);break;case"heron":case"hunt":case"warning":this.tone(490,170,.55,.085*r,"sawtooth",.045,a),this.noiseBurst(.6,.09*r,1900,1.2,"bandpass",a),this.tone(65,52,.8,.1*r,"sine",.06,a);break;case"snake":case"hiss":this.noiseBurst(.7,.12*r,4200,1.3,"bandpass",a);break;case"fish":this.noiseBurst(.65,.21*r,950,.4,"lowpass",a),this.tone(90,25,.45,.2*r,"sine",.008,a);break;case"night":this.tone(196,196,2,.025*r,"sine",.3,a),this.tone(293.665,293.665,2.6,.018*r,"sine",.4,a);break;case"victory":case"win":[196,246.942,293.665,392,493.883,587.33,784].forEach((o,l)=>this.tone(o,o,1.3,.05*r,"sine",.03,a,void 0,l*.19));break;case"defeat":case"lose":[196,174.614,146.832,98].forEach((o,l)=>this.tone(o,o,1,.04*r,"sine",.04,a,void 0,l*.28));break;case"ui":case"click":this.tone(520,440,.045,.035*r,"sine",.002,a);break;case"blocked":case"error":this.tone(150,120,.1,.04*r,"triangle",.003,a);break}}async destroy(){for(const t of this.ambient)try{t.stop(),t.disconnect()}catch{}this.ambient=[],this.context&&await this.context.close().catch(()=>{}),this.context=null,this.started=!1}}class cv{constructor(t,e){this.canvas=t,this.onAction=e,this.keys=new Set,this.pressed=new Set,this.released=new Set,this.dx=0,this.dy=0,this.left=!1,this.right=!1,this.pointerLocked=!1,this.mode="third",this.zoomDelta=0,this.pointerInside=!1,this.mouseX=innerWidth/2,this.mouseY=innerHeight/2,this.mouse={x:this.mouseX,y:this.mouseY,ndcX:0,ndcY:0},this.ndc={x:0,y:0},this.mouseNDC=this.ndc,this.abort=new AbortController;const n=this.abort.signal;addEventListener("keydown",i=>{i.target instanceof HTMLElement&&i.target.closest('input,textarea,select,[contenteditable="true"]')||(["Space","Tab","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(i.code)&&i.preventDefault(),this.keys.has(i.code)||this.pressed.add(i.code),this.keys.add(i.code),!i.repeat&&i.code==="Escape"&&this.onAction("escape"))},{signal:n}),addEventListener("keyup",i=>{this.keys.delete(i.code),this.released.add(i.code)},{signal:n}),addEventListener("mousemove",i=>{const r=this.canvas.getBoundingClientRect();this.mouseX=i.clientX,this.mouseY=i.clientY,this.mouse.x=i.clientX,this.mouse.y=i.clientY,this.ndc.x=(i.clientX-r.left)/(r.width||1)*2-1,this.ndc.y=1-(i.clientY-r.top)/(r.height||1)*2,this.mouse.ndcX=this.ndc.x,this.mouse.ndcY=this.ndc.y,this.mode!=="topdown"&&(this.pointerLocked||this.right)&&(this.dx+=i.movementX||0,this.dy+=i.movementY||0)},{signal:n}),t.addEventListener("mouseenter",()=>{this.pointerInside=!0},{signal:n}),t.addEventListener("mouseleave",()=>{this.pointerInside=!1},{signal:n}),t.addEventListener("mousedown",i=>{i.button===0&&(this.left=!0,this.pressed.add("MouseLeft")),i.button===2&&(this.right=!0,this.pressed.add("MouseRight"))},{signal:n}),addEventListener("mouseup",i=>{i.button===0&&(this.left=!1,this.released.add("MouseLeft")),i.button===2&&(this.right=!1,this.released.add("MouseRight"))},{signal:n}),t.addEventListener("wheel",i=>{i.preventDefault();const r=i.deltaMode===1?16:i.deltaMode===2?innerHeight:1;this.zoomDelta+=Math.max(-180,Math.min(180,i.deltaY*r))},{signal:n,passive:!1}),t.addEventListener("contextmenu",i=>i.preventDefault(),{signal:n}),document.addEventListener("pointerlockchange",()=>{const i=this.pointerLocked;this.pointerLocked=document.pointerLockElement===t,i&&!this.pointerLocked&&this.onAction("unlock")},{signal:n}),addEventListener("blur",()=>{this.clear(),this.onAction("blur")},{signal:n})}setMode(t){this.mode=t,this.canvas.style.cursor=t==="topdown"?"crosshair":"default",t==="topdown"&&this.clearMouseMotion()}clearMouseMotion(){this.dx=0,this.dy=0,this.zoomDelta=0}lock(){if(this.mode!=="topdown")try{const t=this.canvas.requestPointerLock();t?.catch&&t.catch(()=>{})}catch{}}unlock(){document.pointerLockElement===this.canvas&&document.exitPointerLock()}down(t){return this.keys.has(t)}hit(t){return this.pressed.has(t)}up(t){return this.released.has(t)}endFrame(){this.pressed.clear(),this.released.clear(),this.dx=0,this.dy=0,this.zoomDelta=0}clear(){this.keys.clear(),this.pressed.clear(),this.released.clear(),this.left=!1,this.right=!1,this.clearMouseMotion()}destroy(){this.abort.abort()}}class hv{constructor(t){this.scene=t,this.tongues=[],this.cues=[],this.labels=[],this.tmp=new D}tongue(t,e,n=14192541){let i=this.tongues.find(r=>r.life<=0);if(!i){const o=new Me,l=new Float32Array(600),c=[];for(let u=0;u<24;u++)for(let d=0;d<7;d++){const p=u*8+d,m=p+7+1;c.push(p,m,p+1,m,m+1,p+1)}o.setAttribute("position",new Ne(l,3).setUsage(Mi)),o.setIndex(c);const h=new ge(o,new Oe({color:n,roughness:.3,metalness:0,side:Le}));h.frustumCulled=!1,h.castShadow=!0,this.scene.add(h),i={mesh:h,g:o,pos:l,n:24,m:7,life:0},this.tongues.push(i)}i.actor=t,i.end=e.clone(),i.life=.29,i.total=.29,i.mesh.visible=!0,i.mesh.material.color.set(n)}cue(t,e=2,n=1,i=16744532){const a=[],o=[];for(let u=0;u<=72;u++){const d=u/72*Math.PI*2;for(const p of[e*.94,e])a.push(Math.sin(d)*p,0,Math.cos(d)*p);if(u<72){const p=u*2;o.push(p,p+1,p+2,p+1,p+3,p+2)}}const l=new Me;l.setAttribute("position",new oe(a,3)),l.setIndex(o),l.computeVertexNormals();const c=new ea({color:i,transparent:!0,opacity:.65,depthWrite:!1,side:Le}),h=new ge(l,c);return h.position.copy(t),h.position.y=Math.max(.12,t.y+.035),this.scene.add(h),this.cues.push({mesh:h,life:n,total:n}),h}number(t,e,n="#f5ebc5"){if(this.labels.length>24)return;const i=document.createElement("canvas");i.width=128,i.height=64;const r=i.getContext("2d");r.font="bold 36px system-ui",r.textAlign="center",r.textBaseline="middle",r.lineWidth=5,r.strokeStyle="#14271d",r.strokeText(String(e),64,32),r.fillStyle=n,r.fillText(String(e),64,32);const a=new yl(i);a.colorSpace=Qe;const o=new Ad(new Th({map:a,transparent:!0,depthTest:!1,depthWrite:!1}));o.position.copy(t).add(new D(0,1.7,0)),o.scale.set(1.1,.55,1),this.scene.add(o),this.labels.push({sprite:o,life:.85})}update(t){const e=new D,n=new D,i=new D,r=new D,a=new D(0,1,0);for(const o of this.tongues){if(o.life<=0)continue;if(o.life-=t,o.life<=0){o.mesh.visible=!1;continue}o.actor.model.mouthWorld(e),n.copy(o.end).sub(e);const l=1-o.life/o.total,c=Math.sin(Math.PI*l)**.6;n.multiplyScalar(c),i.crossVectors(n,a).normalize(),i.lengthSq()<.01&&i.set(1,0,0),r.crossVectors(i,n).normalize();for(let h=0;h<=o.n;h++){const u=h/o.n,d=e.clone().addScaledVector(n,u);d.y+=Math.sin(u*Math.PI)*.12*(1-c);const p=(.035+.028*Math.pow(u,8))*(.8+.2*Math.sin(Math.PI*u));for(let m=0;m<=o.m;m++){const v=m/o.m*Math.PI*2,g=(h*(o.m+1)+m)*3;o.pos[g]=d.x+(i.x*Math.cos(v)+r.x*Math.sin(v))*p,o.pos[g+1]=d.y+(i.y*Math.cos(v)+r.y*Math.sin(v))*p,o.pos[g+2]=d.z+(i.z*Math.cos(v)+r.z*Math.sin(v))*p}}o.g.attributes.position.needsUpdate=!0,o.g.computeVertexNormals()}for(let o=this.cues.length-1;o>=0;o--){const l=this.cues[o];if(l.life-=t,l.life<=0)this.scene.remove(l.mesh),l.mesh.geometry.dispose(),l.mesh.material.dispose(),this.cues.splice(o,1);else{const c=l.life/l.total;l.mesh.material.opacity=.15+.6*c,l.mesh.scale.setScalar(1+(1-c)*.15)}}for(let o=this.labels.length-1;o>=0;o--){const l=this.labels[o];l.life-=t,l.sprite.position.y+=t*.8,l.sprite.material.opacity=Math.min(1,l.life*3),l.life<=0&&(this.scene.remove(l.sprite),l.sprite.material.map.dispose(),l.sprite.material.dispose(),this.labels.splice(o,1))}}clear(){for(const t of this.tongues)t.life=0,t.mesh.visible=!1;for(const t of this.cues)this.scene.remove(t.mesh),t.mesh.geometry.dispose(),t.mesh.material.dispose();this.cues=[];for(const t of this.labels)this.scene.remove(t.sprite),t.sprite.material.map.dispose(),t.sprite.material.dispose();this.labels=[]}}const jc=new WeakMap,Fs=Xn.clamp,uv={third:"Τρίτο πρόσωπο",first:"Πρώτο πρόσωπο",topdown:"Κάτοψη"};function dv(s){let t=jc.get(s);return t||(t={focus:new D,wanted:new D,target:new D,look:new D,forward:new D,right:new D,sample:new D,raycaster:new rf,ndc:new Ot,plane:new $n(new D(0,1,0),0),hit:new D,lastMode:null,time:0},jc.set(s,t)),t}function nl(s,t,e){let n=0;return s.world?.sampleHeight?n=s.world.sampleHeight(t,e):s.world?.getSurface&&(n=s.world.getSurface(t,e)?.height),Number.isFinite(n)?n:0}function fv(s,t,e,n){for(let i=3;i<=18;i++){const r=i/18;n.sample.lerpVectors(t,e,r);const a=nl(s,n.sample.x,n.sample.z);if(n.sample.y<a+.28){e.lerpVectors(t,e,Math.max(.16,r-.085));break}}e.y=Math.max(e.y,nl(s,e.x,e.z)+.3)}function pv(s,t,e){const n=s.input;if(e==="topdown"){const l=n?.ndc||n?.mouseNDC;t.ndc.set(l?.x||0,l?.y||0)}else t.ndc.set(0,0);t.raycaster.setFromCamera(t.ndc,s.camera);const i=s.player;let r=e==="first"?i.y+.45:Math.max(0,i.y+.08),a=!1;for(let l=0;l<3;l++){t.plane.constant=-r;const c=t.raycaster.ray.intersectPlane(t.plane,t.hit);if(!c)break;a=!0,r=nl(s,c.x,c.z)+.08}const o=s.aimPoint||(s.aimPoint=new D);if(a&&t.hit.distanceTo(s.camera.position)<350?o.copy(t.hit):t.raycaster.ray.at(e==="topdown"?60:24,o),e==="topdown"){const l=o.x-i.x,c=o.z-i.z;l*l+c*c>.0225&&(s.aimYaw=Math.atan2(l,c))}else s.aimYaw=s.cameraYaw;s.aimPitch=e==="topdown"?0:s.cameraPitch}function Gh(s,t,e=!1){if(!s.camera||!s.player)return;const n=dv(s),i=s.camera,r=s.player,a=s.input,o=s.viewMode||(s.viewMode="third");n.lastMode!==o&&(e=!0,n.lastMode=o,a?.setMode?.(o)),n.time+=Math.min(Math.max(t,0),.1),s.cameraYaw=Number.isFinite(s.cameraYaw)?s.cameraYaw:.28,s.cameraPitch=Number.isFinite(s.cameraPitch)?s.cameraPitch:.38,s.cameraDistance=Number.isFinite(s.cameraDistance)?s.cameraDistance:8.4;const l=s.started!==!1&&!s.paused&&!s.ui?.isBlocking?.();if(l&&o!=="topdown"){const g=Fs(s.settings?.sensitivity??1,.15,3);s.cameraYaw-=(a?.dx||0)*.0025*g,s.cameraPitch+=(a?.dy||0)*.002*g,s.cameraPitch=Fs(s.cameraPitch,o==="first"?-1.18:-.12,o==="first"?1.25:1.18)}l&&a?.zoomDelta&&(o==="topdown"?s.topdownHeight=Fs((s.topdownHeight||26)+a.zoomDelta*.025,15,48):o==="third"&&(s.cameraDistance=Fs(s.cameraDistance+a.zoomDelta*.009,3.8,16))),s.hidePlayer=o==="first",r.model?.group&&(r.model.group.visible=!s.hidePlayer);const c=s.cameraYaw,h=s.cameraPitch;n.forward.set(Math.sin(c),0,Math.cos(c)),n.right.set(-Math.cos(c),0,Math.sin(c));const u=s.cameraFocus||n.focus,d=s.cameraWanted||n.wanted,p=1-Math.exp(-Math.max(0,t)*12);n.target.set(r.x,r.y+.73,r.z),e||o==="first"?u.copy(n.target):u.lerp(n.target,p),i.up.set(0,1,0);let m=63;if(o==="first")m=76,d.set(r.x,r.y+.86,r.z).addScaledVector(n.forward,.38),i.near=.045,i.position.copy(d),n.sample.set(Math.sin(c)*Math.cos(h),-Math.sin(h),Math.cos(c)*Math.cos(h)),n.look.copy(i.position).add(n.sample);else if(o==="topdown"){m=49,i.near=.15;const g=s.topdownHeight||26;d.set(u.x,u.y+g,u.z-g*.31),e?i.position.copy(d):i.position.lerp(d,1-Math.exp(-t*9)),n.look.set(u.x,u.y-.2,u.z+1.2)}else{i.near=.1;const g=s.cameraDistance;d.copy(u).addScaledVector(n.forward,-Math.cos(h)*g).addScaledVector(n.right,.62),d.y+=Math.sin(h)*g+.35,fv(s,u,d,n),e?i.position.copy(d):i.position.lerp(d,1-Math.exp(-t*15)),n.look.copy(u).addScaledVector(n.forward,1.65).addScaledVector(n.right,.14)}const v=typeof s.shake=="number"?s.shake:s.shake?.amount||0;if(l&&v>0){const g=Fs(v,0,2)*(o==="first"?.035:.075);i.position.x+=Math.sin(n.time*111.3)*g,i.position.y+=Math.sin(n.time*137.1+1)*g*.7,i.position.z+=Math.sin(n.time*91.8+2)*g*.5}return i.lookAt(n.look),Math.abs(i.fov-m)>.01?(i.fov=m,i.updateProjectionMatrix()):e&&i.updateProjectionMatrix(),i.updateMatrixWorld(!0),pv(s,n,o),s.movementYaw=o==="topdown"?0:s.cameraYaw,o}function Kc(s){const t=s.viewMode||"third",e={third:"first",first:"topdown",topdown:"third"}[t]||"third";return s.viewMode=e,s.hidePlayer=e==="first",s.ignoreUnlockUntil=performance.now()+500,s.input?.setMode?.(e),s.input?.clearMouseMotion?.(),e==="topdown"?s.input?.unlock?.():s.started&&!s.paused&&!s.ui?.isBlocking?.()&&s.input?.lock?.(),Gh(s,0,!0),s.ui?.toast?.(`${uv[e]} · C για αλλαγή κάμερας`,"info"),e}const Wh=1,Zc="frog-creek-dominion-v1",wn={player:15005068,ally:7531963,enemy:16742501,neutral:15652229,predator:16753999,surrender:16770459},mv={scout:"Ανιχνευτής",bruiser:"Μαχητής",caller:"Κράχτης",hunter:"Κυνηγός"},Xh={heron:{name:"Ο Ερωδιός",hp:650,speed:3.5,damage:30,reach:4.2,windup:1.25,recover:1.55,grab:3.7,scale:1.25},snake:{name:"Το Νερόφιδο",hp:470,speed:4.6,damage:24,reach:3.1,windup:1,recover:1.45,grab:4.2,scale:1.1},fish:{name:"Ο Κυνηγός του Βυθού",hp:540,speed:5.7,damage:35,reach:3.6,windup:1.5,recover:2,grab:3.5,scale:1.2}},Jc={shelter:{name:"Νέο καταφύγιο",description:"Μια νέα βάση, αποθέματα και ασφαλές σημείο επιστροφής.",cost:{food:12,reeds:30}},store:{name:"Αποθήκη",description:"Περισσότερη ασφαλής τροφή και καλύτερη συλλογή πόρων.",cost:{food:10,reeds:20}},nursery:{name:"Φωλιά στρατολόγησης",description:"Δημιουργεί νέο βάτραχο κάθε 85″ με κόστος 10 τροφή / 6 καλάμια.",cost:{food:22,reeds:28}},watchtower:{name:"Σκοπιά",description:"Οι φρουροί εντοπίζουν νωρίτερα επιδρομές και μάχονται καλύτερα.",cost:{food:12,reeds:24}},palisade:{name:"Περίφραξη",description:"Προσθέτει 180 αντοχή στη βάση και καθυστερεί επιδρομείς.",cost:{food:8,reeds:30}},upgrade:{name:"Αναβάθμιση βάσης",description:"Επόμενη βαθμίδα, περισσότερη αντοχή και θέσεις συμμάχων.",cost:{food:30,reeds:40}},repair:{name:"Επισκευή",description:"Αποκαθιστά 150 αντοχή στο καταφύγιο.",cost:{food:3,reeds:12}}};function Gt(s,t,e){return Math.min(e,Math.max(t,Number.isFinite(s)?s:t))}function rs(s,t){return Object.entries(t).every(([e,n])=>(s[e]||0)>=n)}function Si(s,t){if(!rs(s,t))return!1;for(const[e,n]of Object.entries(t))s[e]-=n;return!0}function il(s){return 40+Math.max(1,s)*28}function ro(s,t){s.xp=(s.xp||0)+Math.max(0,t);let e=0;for(;s.xp>=il(s.level||1);)s.xp-=il(s.level||1),s.level=(s.level||1)+1,s.maxHp+=8,s.hp=Math.min(s.maxHp,s.hp+20),e++;return e}function as(s){return{food:12*(s.tier||1),reeds:18*(s.tier||1)}}function sl(s,t){return s.hp>0&&(s.tier||1)<3&&s.level>=(s.tier||1)*2&&rs(t,as(s))}function Qc(s,t){return sl(s,t)?(Si(t,as(s)),s.tier++,s.maxHp+=25,s.hp=s.maxHp,!0):!1}function gv({allyPower:s=1,enemyPower:t=1,hp:e=1,maxHp:n=1,morale:i=100,campDestroyed:r=!1,neutral:a=!1}){return a?1:Gt(.16+.26*(s/Math.max(t,1))+.26*(1-e/Math.max(1,n))+.22*(1-i/100)+(r?.32:0),.06,.98)}function zs(s,t=1,e=1,n=!1){return Math.max(1,Math.round(s*(1+(t-1)*.28+(e-1)*.045)*(n?.35:1)))}function ao(s,t){const e=Math.max(0,(s.maxStomach||100)-s.stomach),n=Math.min(e,Math.max(0,t));return s.stomach+=n,n}function vv(s){return s.some(t=>t.originalEnemy)&&s.filter(t=>t.originalEnemy).every(t=>t.team==="ally"||t.destroyed)}function th(s){return 6+s.filter(t=>t.team==="ally"&&!t.destroyed).reduce((t,e)=>t+4+(e.tier||1)*2+(e.buildings?.nursery?3:0),0)}function ai(s){const t=((s/600+.375)%1+1)%1,e=Gt(Math.sin(t*Math.PI*2-Math.PI/2)*1.35,0,1),n=Math.floor(t*24),i=Math.floor((t*24-n)*60);return{phase:t,daylight:e,night:e<.2,day:Math.floor((s+225)/600)+1,timeLabel:`${String(n).padStart(2,"0")}:${String(i).padStart(2,"0")}`}}function xv(s){if(!s||s.version!==Wh||!s.player||typeof s.player!="object"||!Array.isArray(s.frogs)||!Array.isArray(s.camps)||!Number.isFinite(s.player.x)||!Number.isFinite(s.player.z)||!Number.isFinite(s.player.hp))return null;const t=JSON.parse(JSON.stringify(s));t.elapsed=Gt(t.elapsed||0,0,1e8),t.resources={food:Gt(t.resources?.food||0,0,1e6),reeds:Gt(t.resources?.reeds||0,0,1e6)};const e=i=>typeof i=="string"&&/^(player|ally|neutral|enemy\d*)$/.test(i),n=i=>({...i,name:typeof i.name=="string"?i.name.slice(0,60):"Βάτραχος",role:Object.hasOwn(mv,i.role)?i.role:"hunter",x:Gt(i.x,-108,108),z:Gt(i.z,-108,108),yaw:Number.isFinite(i.yaw)?i.yaw:0,maxHp:Gt(i.maxHp||100,25,1e4),hp:Gt(i.hp,1,Gt(i.maxHp||100,25,1e4)),stomach:Gt(i.stomach||0,0,100),maxStomach:100,level:Math.floor(Gt(i.level||1,1,99)),tier:Math.floor(Gt(i.tier||1,1,3)),xp:Gt(i.xp||0,0,1e6),morale:Gt(i.morale??100,0,100),home:typeof i.home=="string"?i.home:null,guard:!!i.guard,leader:!!i.leader,surrendered:!!i.surrendered});return t.player=n({...t.player,team:"player",id:"player"}),t.frogs=t.frogs.filter(i=>i&&typeof i=="object"&&typeof i.id=="string"&&Number.isFinite(i.x)&&Number.isFinite(i.z)&&i.hp>0&&e(i.team)&&i.team!=="player").map(n),t.camps=t.camps.filter(i=>i&&typeof i=="object"&&typeof i.id=="string"&&Number.isFinite(i.x)&&Number.isFinite(i.z)&&e(i.team)).map(i=>({...i,name:typeof i.name=="string"?i.name.slice(0,80):"Καταφύγιο",x:Gt(i.x,-108,108),z:Gt(i.z,-108,108),tier:Math.floor(Gt(i.tier||1,1,3)),maxHp:Gt(i.maxHp||350,100,1e4),hp:Gt(i.hp??350,0,Gt(i.maxHp||350,100,1e4)),stock:{food:Gt(i.stock?.food||0,0,1e6),reeds:Gt(i.stock?.reeds||0,0,1e6)},buildings:Object.fromEntries(["store","nursery","watchtower","palisade"].map(r=>[r,!!i.buildings?.[r]])),morale:Gt(i.morale??100,0,100),destroyed:!!i.destroyed,originalEnemy:!!i.originalEnemy,spawnTimer:Gt(i.spawnTimer||0,0,1e4),mealCount:Gt(i.mealCount||0,0,2),mealDay:Gt(i.mealDay||0,0,1e6)})),t.idCounter=Math.floor(Gt(t.idCounter||0,0,1e8)),t.won=!!t.won,t}function _v(s){return()=>{let t=s+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}const ye=(s,t)=>Math.hypot(s.x-t.x,s.z-t.z),gn=s=>s&&(s.team==="player"||s.team==="ally"),Di=s=>s&&!s.dead&&s.hp>0,Qs=(s,t=.3)=>new D(s.x,(s.y||0)+t,s.z),yv=(s,t,e)=>s+Math.atan2(Math.sin(t-s),Math.cos(t-s))*Math.min(1,e),Mv={heron:21,snake:17,fish:23},$h={heron:2.65,snake:1.65,fish:2.85},El={heron:.44,snake:.38,fish:.58},bv={heron:1.8,snake:2.05,fish:1.35},Or=new D;function qh(s){s._aiReady||(s._aiReady=!0,s.baseSpeed=Xh[s.type].speed,s.speed=0,s.health=s.hp,s.grabCooldown=0,s.thinkTime=0,s.chaseTime=0,s.lostTime=0,s.huntUntil=0,s.playerDamage=0,s.lastCombatAt=-100,s.engagedPlayer=!1,s.hitAnim=0,s.repelAwarded=!1,s.killAwarded=!1,s.provokedUntil=0,s.hunting=!1,s.attackDuration=1,s.attackType="lunge",s.movePulse=0,s.grace=s.grace||0)}function Yh(s,t,e){return s.world.getSurface(t,e)}function cs(s,t,e){const n=Yh(s,t,e);return n.type==="water"||n.type==="lily"||n.type==="leaf"||n.height<.13}function jh(s,t,e){return gn(e)&&s.elapsed<(s.graceUntil||0)&&s.elapsed>=(t.provokedUntil||0)}function Jr(s,t,e){return!Di(e)||e.grabbedBy&&e.grabbedBy!==t||jh(s,t,e)?!1:t.type==="fish"?cs(s,e.x,e.z)&&e.y<1.15:t.type==="snake"?e.y<2.2:e.y<4.1}function Kh(s,t,e=5){const n=t.team==="player"?"ally":t.team;let i=0;for(const r of s.frogs)r===t||!Di(r)||r.grabbedBy||(r.team==="player"?"ally":r.team)===n&&ye(r,t)<e&&i++;return i}function Li(s,t,e=37){return s.player&&ye(s.player,t)<e}function zn(s,t,e,n=1){Li(s,t,42)&&s.audio?.play?.(e,{intensity:n*Math.max(.25,1-ye(s.player,t)/52)})}function gs(s,t){t.engagedPlayer=!0,t.huntUntil=s.elapsed+10,t.hunting=!0,(!s.hunt||s.hunt.dead||s.hunt.phase==="dormant"||ye(s.player,t)<ye(s.player,s.hunt)*.72)&&(s.hunt=t),(!t.announced||s.elapsed-t.announced>28)&&(t.announced=s.elapsed,s.ui?.toast?.(`${t.name} σε κυνηγά! Πολέμησε για να τον απωθήσεις ή να τον σκοτώσεις.`,"warning"),zn(s,t,"hunt",.9))}function en(s,t){s.phase=t,s.phaseTime=0,s.speed=0}function Sv(s,t){let e=null,n=1/0;const i=Mv[t.type];for(const r of s.frogs){if(!Jr(s,t,r))continue;const a=ye(t,r);if(a>i)continue;const o=Kh(s,r),l=a+r.hp/r.maxHp*2.3+Math.min(o,5)*.65-(r.hp<r.maxHp*.45?2:0);l<n&&(n=l,e=r)}return e&&(t.target=e,t.targetId=e.id,t.chaseTime=0,t.lostTime=0,en(t,"stalk"),gn(e)&&Li(s,t,40)?gs(s,t):zn(s,t,t.type,.45)),e}function oo(s,t,e,n,i,r){let a=e-t.x,o=n-t.z,l=Math.hypot(a,o);if(l<.05){t.speed=0;return}let c=t.x+a/l*Math.min(l,i*r),h=t.z+o/l*Math.min(l,i*r);if(t.type==="fish"&&!cs(s,c,h)){let u=null,d=1/0;const p=Math.atan2(a,o),m=Math.max(.16,i*r);for(const v of[.45,-.45,.9,-.9,1.4,-1.4,2.2,-2.2]){const g=p+v,f=t.x+Math.sin(g)*m,y=t.z+Math.cos(g)*m;if(!cs(s,f,y))continue;const w=Math.hypot(e-f,n-y)+Math.abs(v)*.08;w<d&&(d=w,u={x:f,z:y})}if(!u){t.speed=0;return}c=u.x,h=u.z,a=c-t.x,o=h-t.z}c=Gt(c,-106,106),h=Gt(h,-106,106),t.yaw=yv(t.yaw,Math.atan2(a,o),r*(t.type==="heron"?4:7)),t.speed=Math.hypot(c-t.x,h-t.z)/Math.max(.001,r),t.x=c,t.z=h,t.movePulse+=r*t.speed,t.movePulse>4.5&&t.type!=="snake"&&Li(s,t,32)&&(t.movePulse=0,cs(s,t.x,t.z)&&s.world.splash(Qs(t,-t.y),t.type==="heron"?.32:.2))}function Dn(s,t){if(t.type==="fish"){let e=-1.52+Math.sin(s.elapsed*1.8)*.055;t.phase==="windup"&&(e+=Gt(t.phaseTime/t.windup,0,1)*.32),t.phase==="lunge"&&(e=-1.15+Math.sin(Gt(t.phaseTime/El.fish,0,1)*Math.PI)*1.05),t.phase==="grab"&&(e=-.74+Math.sin(s.elapsed*3)*.08),t.phase==="recover"&&(e=-1.52+Math.max(0,1-t.phaseTime/.7)*.4),t.dead&&(e=-.78),t.y=e}else{const e=s.world.sampleHeight(t.x,t.z);t.y=t.type==="snake"?Math.max(-.1,e):Math.max(-.2,e)}}function $r(s,t){t.target=null,t.targetId=null,t.chaseTime=0,t.lostTime=0,t.cooldown=Math.max(t.cooldown,2.5),t.huntUntil=Math.min(t.huntUntil,s.elapsed+3),en(t,"patrol")}function wv(s,t){const e=t.target;if(!Jr(s,t,e)){$r(s,t);return}en(t,"windup"),t.strike={x:Gt(e.x+(e.vx||0)*.12,-106,106),z:Gt(e.z+(e.vz||0)*.12,-106,106)},t.attackType="lunge",t.attackDuration=t.windup+El[t.type],t.attackAnim=t.attackDuration;const n=Yh(s,t.strike.x,t.strike.z),i=new D(t.strike.x,Math.max(.05,n.height),t.strike.z);s.vfx?.cue?.(i,$h[t.type],t.windup,t.type==="fish"?16760152:16740437),t.type==="fish"&&s.world.splash(i,.65,"#adcfba"),zn(s,t,t.type,.9),gn(e)&&Li(s,t,42)&&gs(s,t)}function Ev(s,t){en(t,"lunge"),t.struck=!1,t.lungeStart={x:t.x,z:t.z};const e=t.strike.x-t.x,n=t.strike.z-t.z,i=Math.hypot(e,n)||1;t.yaw=Math.atan2(e,n);const r=Math.max(0,Math.min(i-bv[t.type],t.reach+1.3));t.lungeEnd={x:t.x+e/i*r,z:t.z+n/i*r},t.type==="heron"&&zn(s,t,"flap",.7)}function Tv(s,t,e){t.grabbed=e,e.grabbedBy=t,t.rescueDamage=0,t.grabCooldown=15,e.vx=e.vz=e.vy=e.speed=0,e.grounded=!1,e.stun=0,en(t,"grab"),t.attackType="lunge",t.attackDuration=t.grab,t.attackAnim=t.grab,gn(e)&&(gs(s,t),s.ui?.toast?.(e===s.player?"Σε άρπαξε! Πάτα Q / Space / R για να ξεφύγεις!":`${e.name} αρπάχτηκε! Χτύπα τον θηρευτή για να τον σώσεις!`,"warning"))}function Av(s,t){if(t.struck)return;t.struck=!0;const e=new D(t.strike.x,Math.max(.08,s.world.sampleHeight(t.strike.x,t.strike.z)),t.strike.z);s.world.splash(e,t.type==="fish"?2.2:t.type==="heron"?1.25:.8),s.world.impact(e,"#d7d7a6",t.type==="snake"?.8:1.4),zn(s,t,t.type==="fish"?"fish":"slam",.85);let n=null;for(const i of s.frogs){if(!Di(i)||i.grabbedBy||jh(s,t,i)||t.type==="fish"&&!cs(s,i.x,i.z)||ye(i,t.strike)>$h[t.type]||i.y>e.y+(t.type==="heron"?2:1.15))continue;const r=i.hp,a=(i.invulnerable||0)>0,o=i===t.target&&!a&&!i.blocking&&t.grabCooldown<=0&&(i.hp/i.maxHp<.68||Kh(s,i,5)<=1);s.damage(i,t.damage,t,{knockback:t.type==="snake"?2.8:4.8}),o&&Di(i)&&i.hp<r&&(n=i)}n&&Tv(s,t,n)}function ys(s,t){const e=t.grabbed;if(!e)return null;if(t.grabbed=null,t.rescueDamage=0,e.grabbedBy=null,!e.dead){const n=t.yaw+(t.type==="snake"?1.5:1.1),i=t.type==="heron"?2.6:2.1;e.x=Gt(t.x+Math.sin(n)*i,-106,106),e.z=Gt(t.z+Math.cos(n)*i,-106,106),e.y=Math.max(s.world.sampleHeight(e.x,e.z)+.45,t.type==="heron"?t.y+.9:.35),e.vx=Math.sin(n)*3,e.vz=Math.cos(n)*3,e.vy=3.7,e.grounded=!1,e.jumpTime=.7,e.invulnerable=Math.max(e.invulnerable||0,1.4),e.stun=Math.max(e.stun||0,.18)}return e}function Zh(s,t){const e=ys(s,t);en(t,"recover"),t.cooldown=1.25,t.rescueResistUntil=s.elapsed+5,t.grabCooldown=Math.max(t.grabCooldown,16),s.world.impact(Qs(t,t.type==="heron"?1.4:.4),"#a9edc9",1.1),zn(s,t,"success",.7),gn(e)&&(s.ui?.toast?.(e===s.player?"Ξέφυγες! Η ομάδα σου έχει παράθυρο αντεπίθεσης.":`${e.name} σώθηκε!`,"success"),s.gainXP?.(12))}function Cv(s,t){const e=t.grabbed;e&&(t.grabbed=null,e.grabbedBy=null,s.damage(e,e.hp+e.maxHp+100,t,{bypass:!0,knockback:0}),t.hp=Math.min(t.maxHp,t.hp+t.maxHp*.07),t.health=t.hp,gn(e)&&e!==s.player&&s.ui?.toast?.(`${t.name} έφαγε τον ${e.name}. Κράτα την ομάδα κοντά σου.`,"danger"),zn(s,t,"death",.8),en(t,"recover"),t.cooldown=2.8,t.target=null,t.targetId=null)}function Jh(s,t){ys(s,t),en(t,"flee"),t.fleeTime=0,t.target=null,t.targetId=null,t.attackAnim=0;const e=s.player||t.lastAttacker||{x:0,z:0},n=t.x-e.x,i=t.z-e.z,r=Math.hypot(n,i)||1;t.fleeDestination=ye(t.anchor,e)>ye(t,e)+8?{...t.anchor}:{x:Gt(t.anchor.x+n/r*35,-104,104),z:Gt(t.anchor.z+i/r*35,-104,104)},t.engagedPlayer&&(t.huntUntil=s.elapsed+24,s.ui?.toast?.(`${t.name} υποχωρεί! Μπορείς να τον καταδιώξεις.`,"success"))}function Rv(s,t,e,n=!1){ys(s,t),en(t,"dormant"),t.model.group.visible=!1,t.respawnAt=s.elapsed+e,t.hunting=!1,t.huntUntil=0,t.speed=0,n&&t.engagedPlayer&&!t.repelAwarded&&!t.killAwarded&&(t.repelAwarded=!0,s.stats.predatorsRepelled=(s.stats.predatorsRepelled||0)+1,s.gainXP?.(45),s.ui?.toast?.(`${t.name} απωθήθηκε. Η περιοχή είναι ασφαλέστερη για λίγο.`,"success"),zn(s,t,"success",.75)),s.hunt===t&&(s.hunt=null)}function eh(s,t){t.dead=!1,t.hp=t.maxHp,t.health=t.hp,t.x=t.anchor.x,t.z=t.anchor.z,t.yaw=0,t.model.group.visible=!0,t.grabbed=null,t.rescueDamage=0,t.target=null,t.targetId=null,t.playerDamage=0,t.engagedPlayer=!1,t.repelAwarded=!1,t.killAwarded=!1,t.announced=0,t.hunting=!1,t.huntUntil=0,t.cooldown=3,t.grabCooldown=3,t.grace=s.elapsed+8,t.attackAnim=0,t.hitAnim=0,t.provokedUntil=0,t.lastCombatAt=-100,t.chaseTime=0,t.lostTime=0,en(t,"patrol"),Dn(s,t)}function Pv(s,t,e){ys(s,t),t.dead=!0,t.hp=0,t.health=0,t.respawnAt=s.elapsed+220,en(t,"dead"),t.attackAnim=0,t.target=null,t.targetId=null,t.hunting=!1,t.huntUntil=0,(gn(e)||t.playerDamage>0)&&!t.killAwarded&&(t.killAwarded=!0,s.stats.predatorsKilled=(s.stats.predatorsKilled||0)+1,s.gainXP?.(100),s.ui?.toast?.(`${t.name} νικήθηκε! +100 εμπειρία`,"success"),zn(s,t,"victory",.65)),s.hunt===t&&(s.hunt=null),s.world.splash(Qs(t,-t.y),1.4)}function nh(s,t,e,n=null){if(qh(t),e=Number(e),!Number.isFinite(e)||e<=0||t.dead||t.phase==="dormant")return!1;const i=Math.min(t.hp,Math.max(1,e));return t.hp=Math.max(0,t.hp-i),t.health=t.hp,t.hitAnim=.23,t.lastCombatAt=s.elapsed,t.lastAttacker=n,gn(n)&&(t.playerDamage+=i,t.provokedUntil=s.elapsed+35,(Li(s,t,45)||n===s.player)&&gs(s,t)),Li(s,t,35)&&(s.vfx?.number?.(Qs(t,t.type==="heron"?1.5:.25),Math.round(i),"#ffc877"),s.world.impact(Qs(t,t.type==="heron"?1.5:.45),"#ebd9ab",Gt(i/30,.5,1.8)),zn(s,t,"hit",.75)),t.grabbed&&(t.rescueDamage+=i),t.hp<=0?(Pv(s,t,n),!0):(t.grabbed&&t.rescueDamage>=45&&Zh(s,t),t.hp<=t.maxHp*.24&&t.phase!=="flee"?(Jh(s,t),!0):(Di(n)&&(t.phase==="patrol"||!t.target)&&(t.target=n,t.targetId=n.id,t.chaseTime=0,t.lostTime=0,t.phase!=="recover"&&t.phase!=="flee"&&en(t,"stalk")),!0))}function ih(s){return s?s.grabbed?.team==="player"?"ΣΕ ΑΡΠΑΞΕ — Πάτα Q / Space / R. Οι σύμμαχοι μπορούν να σε ελευθερώσουν!":s.grabbed&&gn(s.grabbed)?`ΔΙΑΣΩΣΗ — Χτύπα τον θηρευτή πριν καταπιεί τον ${s.grabbed.name}!`:s.phase==="windup"?s.type==="fish"?"ΕΦΟΔΟΣ ΑΠΟ ΚΑΤΩ — Βγες από τον φωτεινό κύκλο!":"ΕΤΟΙΜΑΖΕΙ ΕΠΙΘΕΣΗ — Απέφυγε τον κύκλο και αντεπιτέσου.":s.phase==="flee"?"ΥΠΟΧΩΡΕΙ — Απώθησέ τον ή καταδίωξέ τον για να τον νικήσεις.":s.phase==="recover"?"ΠΑΡΑΘΥΡΟ ΑΝΤΕΠΙΘΕΣΗΣ — Συντόνισε τα χτυπήματα της ομάδας.":{heron:"Χτύπα τα πόδια και απόφυγε το ράμφος. Η ομάδα μπορεί να διακόψει ένα άρπαγμα.",snake:"Άνοιξε την ομάδα και χτύπα από τα πλάγια. Πρόσεχε την έφοδο από τις καλαμιές.",fish:"Χρησιμοποίησε βράχους και ρηχά. Χτύπα όταν βγει στην επιφάνεια."}[s.type]||"Πολέμησε για να απωθήσεις ή να σκοτώσεις τον θηρευτή.":""}function Dv(s,t){t=Gt(t,0,.1);for(const i of s.predators){if(qh(i),i.phaseTime+=t,i.cooldown=Math.max(0,i.cooldown-t),i.grabCooldown=Math.max(0,i.grabCooldown-t),i.thinkTime-=t,i.speed=0,i.dead||i.phase==="dead"){i.phaseTime>=4&&(i.model.group.visible=!1),s.elapsed>=i.respawnAt&&ye(s.player,i.anchor)>34&&!s.allies().some(l=>ye(l,i.anchor)<15)&&eh(s,i);continue}if(i.phase==="dormant"){s.elapsed>=i.respawnAt&&ye(s.player,i.anchor)>34&&!s.allies().some(l=>ye(l,i.anchor)<15)&&eh(s,i);continue}if(i.hp<=i.maxHp*.24&&i.phase!=="flee"&&Jh(s,i),i.phase==="flee"){if(i.fleeTime+=t,ye(i,i.fleeDestination)<2.5&&ye(i,s.player)<29){const l=Math.atan2(i.x-s.player.x,i.z-s.player.z);i.fleeDestination={x:Gt(i.x+Math.sin(l)*25,-105,105),z:Gt(i.z+Math.cos(l)*25,-105,105)}}oo(s,i,i.fleeDestination.x,i.fleeDestination.z,i.baseSpeed*1.65,t),(i.fleeTime>2&&ye(i,s.player)>30||i.fleeTime>17&&ye(i,s.player)>19)&&Rv(s,i,180,!0),Dn(s,i);continue}if(i.phase==="grab"){const l=i.grabbed;if(!Di(l)){ys(s,i),en(i,"recover");continue}if(i.rescueDamage>=45){Zh(s,i);continue}gn(l)&&gs(s,i),i.model.mouthWorld?(i.model.mouthWorld(Or),l.x=Or.x,l.z=Or.z,l.y=Or.y-.2):(l.x=i.x+Math.sin(i.yaw)*1.5,l.z=i.z+Math.cos(i.yaw)*1.5,l.y=i.y+(i.type==="heron"?2.4:.8)),l.yaw=i.yaw+Math.PI*.4,l.vx=l.vz=l.vy=0,l.speed=0,l.grounded=!1,i.phaseTime>=i.grab&&Cv(s,i),Dn(s,i);continue}if(i.phase==="windup"){i.phaseTime>=i.windup&&Ev(s,i),Dn(s,i);continue}if(i.phase==="lunge"){const l=Gt(i.phaseTime/El[i.type],0,1),c=1-Math.pow(1-l,3),h=i.lungeStart.x+(i.lungeEnd.x-i.lungeStart.x)*c,u=i.lungeStart.z+(i.lungeEnd.z-i.lungeStart.z)*c;(i.type!=="fish"||cs(s,h,u))&&(i.speed=ye(i,{x:h,z:u})/Math.max(.001,t),i.x=h,i.z=u),l>=.55&&Av(s,i),i.phase==="lunge"&&l>=1&&(en(i,"recover"),i.cooldown=i.recover),Dn(s,i);continue}if(i.phase==="recover"){i.phaseTime>=i.recover&&(Jr(s,i,i.target)&&ye(i,i.target)<29?en(i,"stalk"):$r(s,i)),Dn(s,i);continue}if(i.phase==="stalk"){if(i.chaseTime+=t,!Di(i.target)){$r(s,i),Dn(s,i);continue}if(Jr(s,i,i.target)?i.lostTime=0:i.lostTime+=t,i.lostTime>2.4||ye(i,i.target)>34||i.chaseTime>36&&ye(i,i.target)>13){$r(s,i),Dn(s,i);continue}gn(i.target)&&Li(s,i,42)&&gs(s,i);const l=ye(i,i.target);if(l<=i.reach&&i.cooldown<=0&&i.lostTime===0)wv(s,i);else{let c=i.target.x,h=i.target.z;if(i.type==="snake"&&l>6){const u=Math.atan2(c-i.x,h-i.z)+.48;c+=Math.cos(u)*1.4,h-=Math.sin(u)*1.4}oo(s,i,c,h,i.baseSpeed*(i.type==="heron"?1.08:1.02),t)}Dn(s,i);continue}const r=s.elapsed*(i.type==="heron"?.07:.11)+(i.type==="snake"?2.1:i.type==="fish"?4.3:0),a=i.anchor.x+Math.sin(r)*(i.type==="fish"?10:6),o=i.anchor.z+Math.cos(r*.83)*(i.type==="fish"?8:5);oo(s,i,a,o,i.baseSpeed*.36,t),i.thinkTime<=0&&s.elapsed>=i.grace&&(i.thinkTime=.38,Sv(s,i)),Dn(s,i)}const e=s.predators.filter(i=>!i.dead&&i.phase!=="dormant"&&(i.huntUntil>s.elapsed||gn(i.target)&&ye(i,s.player)<42));for(const i of s.predators)i.hunting=e.includes(i);e.includes(s.hunt)||(s.hunt=e.sort((i,r)=>ye(i,s.player)-ye(r,s.player))[0]||null);const n=e.find(i=>i.grabbed===s.player);n&&(s.hunt=n)}const Te=D,sh=Math.PI*2,Ft=(s,t)=>Math.hypot(s.x-t.x,s.z-t.z),Br=(s,t,e)=>s+Math.atan2(Math.sin(t-s),Math.cos(t-s))*Math.min(1,e),Os=["Σπίθα","Βρύο","Κρόκος","Σκιά","Νούφαρο","Σάλτος","Ρίζα","Σμάραγδος","Βότσαλο","Κάλαμος","Ρόζος","Σβούρα","Αστραπή","Λωτός","Νέφος","Σφύριγμα"],kr=["scout","hunter","bruiser","caller"],Lv=["id","name","team","role","tier","level","hp","maxHp","stomach","maxStomach","xp","x","z","yaw","morale","home","guard","leader","surrendered"];class Iv{constructor(){this.settings={quality:"high",volume:.55,sensitivity:1};try{Object.assign(this.settings,JSON.parse(localStorage.getItem("frog-settings")||"{}"))}catch{}this.scene=new Ql,this.scene.background=new $t("#aacbd0"),this.scene.fog=new na("#98b9ba",.0065),this.renderer=new Vg({antialias:!0,powerPreference:"high-performance",alpha:!1}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.5)),this.renderer.setSize(innerWidth,innerHeight),this.renderer.outputColorSpace=Qe,this.renderer.toneMapping=lh,this.renderer.toneMappingExposure=1.12,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=ah,this.renderer.domElement.id="world-canvas",this.renderer.domElement.setAttribute("aria-label","Τρισδιάστατος κόσμος Frog — Creek Dominion"),document.body.prepend(this.renderer.domElement),this.camera=new tn(59,innerWidth/innerHeight,.07,370),this.cameraYaw=.28,this.cameraPitch=.38,this.cameraDistance=8.4,this.cameraFocus=new Te,this.cameraWanted=new Te,this.sun=new Va(16771003,3),this.sun.position.set(25,48,17),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(2048,2048),Object.assign(this.sun.shadow.camera,{left:-35,right:35,top:35,bottom:-35,near:1,far:140}),this.sun.shadow.bias=-25e-5,this.sun.shadow.normalBias=.035,this.scene.add(this.sun,this.sun.target),this.hemi=new fc(13165807,4215607,2),this.scene.add(this.hemi),this.moon=new Va(9549544,.15),this.moon.position.set(-30,35,-20),this.scene.add(this.moon),this.sky=new aa,this.sky.scale.setScalar(1e3),this.sky.material.uniforms.turbidity.value=5,this.sky.material.uniforms.rayleigh.value=1.8,this.sky.material.uniforms.mieCoefficient.value=.004,this.sky.material.uniforms.mieDirectionalG.value=.8,this.sky.material.uniforms.sunPosition.value.set(25,48,17),this.scene.add(this.sky);const t=new Jo(this.renderer);this.environment=t.fromScene(this.sky,.04,1,1500),this.scene.environment=this.environment.texture,this.scene.environmentIntensity=.55,t.dispose(),this.world=jg(this.scene,this.renderer,{seed:731}),this.vfx=new hv(this.scene),this.audio=new lv,this.frogs=[],this.predators=[],this.camps=[],this.resources={food:22,reeds:40},this.elapsed=0,this.frameTime=0,this.idCounter=0,this.random=_v(9541),this.started=!1,this.paused=!0,this.ended=!1,this.won=!1,this.command="follow",this.targetCommand=null,this.specialIndex=0,this.ui=new ov({onAction:(e,n)=>this.onAction(e,n),onStart:e=>this.start(e),onResume:()=>this.resume(),onSettings:e=>this.setSettings(e)}),this.ui.setSettings(this.settings),this.input=new cv(this.renderer.domElement,e=>{e==="escape"?this.escape():this.started&&!this.paused&&!this.ui.panel&&performance.now()>(this.ignoreUnlockUntil||0)&&this.pause()}),this.labels=document.createElement("canvas"),this.labels.id="world-labels",Object.assign(this.labels.style,{position:"fixed",inset:"0",width:"100%",height:"100%",pointerEvents:"none",zIndex:4}),document.body.append(this.labels),this.labelCtx=this.labels.getContext("2d"),this.timers={ui:0,save:0,objective:0,raids:0,lighting:0,flyAttack:0},this.shake=0,this.hitPause=0,this.stats=this.emptyStats(),this.hunt=null,this.resetWorld(),this.saved=this.readSave(),this.ui.showTitle(!!this.saved),this.applySettings(),this.resize(),this.makePortraits(),addEventListener("resize",()=>this.resize()),addEventListener("beforeunload",()=>this.save()),document.addEventListener("visibilitychange",()=>{document.hidden&&this.started&&(this.save(),this.pause())}),this.renderer.domElement.addEventListener("click",()=>{this.started&&!this.paused&&!this.ui.panel&&!this.input.pointerLocked&&this.input.lock()}),this.last=performance.now(),this.fps=60,this.renderer.setAnimationLoop(e=>this.frame(e)),window.__FROG__={version:"1.0.0",inspect:()=>this.inspect(),save:()=>this.save()},document.getElementById("boot")?.remove()}emptyStats(){return{flies:0,recruited:0,kills:0,predatorsKilled:0,predatorsRepelled:0,campsBuilt:0,campsCaptured:0,raidsDefended:0,losses:0}}resetWorld(t=null){for(const n of[...this.frogs,...this.predators])this.scene.remove(n.model.group),n.model.dispose?.();for(const n of this.camps)this.world.removeShelter(n.mesh);this.frogs=[],this.predators=[],this.camps=[],this.vfx.clear(),this.player=null,this.elapsed=t?.elapsed||0,this.resources=t?.resources||{food:22,reeds:40},this.stats={...this.emptyStats(),...t?.stats||{}},this.idCounter=t?.idCounter||0,this.command="follow",this.targetCommand=null,this.hunt=null,this.won=t?.won||!1,this.ended=!1,this.nextRaid=this.elapsed+110,this.graceUntil=this.elapsed+45,this.deathTimer=0;for(const n of this.world.hotspots)n.flies=n.maxFlies;if(t){this.player=this.spawnFrog({...t.player,team:"player"});for(const n of t.frogs)this.spawnFrog(n);for(const n of t.camps)this.addCamp(n);for(const n of this.world.hotspots){const i=t.hotspots?.find(r=>r.id===n.id);i&&(n.flies=Gt(i.flies,0,n.maxFlies))}}else{this.player=this.spawnFrog({id:"player",name:"Άρης",x:0,z:0,yaw:-.55,team:"player",role:"hunter",hp:120,maxHp:120,stomach:55}),this.spawnFrog({name:"Σπίθα",x:-2,z:-2,team:"ally",role:"scout",stomach:62}),this.spawnFrog({name:"Βρύο",x:1.8,z:-2.4,team:"ally",role:"bruiser",stomach:65}),this.spawnFrog({name:"Κρόκος",x:3,z:-1,team:"ally",role:"caller",stomach:59});let n=this.world.campSites.filter(r=>r.team==="enemy").slice(0,5);n.length<5&&(n=this.world.campSites.filter(r=>Ft(r,{x:0,z:0})>25).slice(0,5)),n.forEach((r,a)=>{const o=this.addCamp({id:r.id||`enemy-camp-${a}`,x:r.x,z:r.z,name:["Οι Χάλκινοι","Οι Ριζοφύλακες","Τα Κόκκινα Καλάμια","Οι Νυχτοβάτες","Οι Βασιλιάδες του Βάλτου"][a],team:`enemy${a}`,originalEnemy:!0,tier:a>2?2:1,hp:350+a*45,maxHp:350+a*45,stock:{food:30+a*12,reeds:38+a*8},buildings:{store:!0,watchtower:a>1,nursery:a>2,palisade:a>2},morale:100});for(let l=0;l<4+(a>2?1:0);l++){const c=l/5*sh;this.spawnFrog({x:o.x+Math.sin(c)*4,z:o.z+Math.cos(c)*4,team:o.team,home:o.id,leader:l===0,name:l===0?`Αρχηγός · ${o.name}`:Os[(a*4+l)%Os.length],role:kr[(a+l)%4],tier:a>2?2:1,level:1+a,guard:l<2})}});const i=[{x:12,z:-7},{x:-14,z:8},{x:20,z:18},{x:-24,z:-15}];for(let r=0;r<i.length;r++)this.spawnFrog({...i[r],team:"neutral",role:kr[r],name:Os[4+r]})}const e=[{type:"heron",x:34,z:14},{type:"snake",x:-38,z:-22},{type:"fish",x:12,z:48}];for(const n of e)this.spawnPredator(n);this.cameraYaw=this.player.yaw||.28,this.cameraFocus.set(this.player.x,1.1,this.player.z),this.updateCamera(1,!0)}spawnFrog(t){const e=t.role||kr[Math.floor(this.random()*kr.length)],n=t.tier||1,i={id:t.id||`frog-${++this.idCounter}`,name:t.name||Os[this.idCounter%Os.length],team:t.team||"neutral",role:e,tier:n,level:t.level||1,xp:t.xp||0,hp:t.hp??(e==="bruiser"?120:95),maxHp:t.maxHp||(e==="bruiser"?120:95),stomach:t.stomach??65,maxStomach:100,x:t.x||0,z:t.z||0,y:0,yaw:t.yaw||0,vx:0,vz:0,vy:0,grounded:!0,jump:0,jumpTime:0,speed:0,morale:t.morale??100,home:t.home||null,guard:!!t.guard,leader:!!t.leader,surrendered:!!t.surrendered,dead:!1,attackAnim:0,attackType:"",roarAnim:0,hitAnim:0,attackCD:0,specialCD:0,invulnerable:0,stun:0,aiTime:0,brain:0,eatCD:0,intent:null,seed:this.idCounter,grabbedBy:null,thinkOffset:this.random()*5},r=i.team==="player"?6065973:i.team==="ally"?5740139:i.team==="neutral"?11838541:11033138;return i.model=io("frog",{color:r,team:i.team,role:e,tier:n,seed:this.idCounter}),i.model.setOutline(wn[i.team]||wn.enemy,!0),i.y=this.world.sampleHeight(i.x,i.z),i.model.group.position.set(i.x,i.y,i.z),i.model.group.rotation.y=i.yaw,i.model.group.userData.actor=i,this.scene.add(i.model.group),this.frogs.push(i),i.team==="player"&&(i.maxStamina=100,i.stamina=100,i.charge=-1,i.maxHp=t.maxHp||120,i.hp=t.hp??120),i}spawnPredator(t){const e=Xh[t.type],n={...e,...t,id:`predator-${t.type}`,maxHp:e.hp,hp:e.hp,team:"predator",y:0,yaw:0,phase:"patrol",phaseTime:0,attackAnim:0,hitAnim:0,dead:!1,cooldown:0,target:null,targetId:null,anchor:{x:t.x,z:t.z},notice:0,rescueDamage:0,grabbed:null,fleeTime:0,respawnAt:0,grace:0};return n.model=io(t.type,{team:"predator",seed:432}),n.model.group.scale.setScalar(e.scale),n.model.setOutline(wn.predator,!0),n.y=t.type==="fish"?-.7:this.world.sampleHeight(n.x,n.z),n.model.group.position.set(n.x,n.y,n.z),this.scene.add(n.model.group),this.predators.push(n),n}addCamp(t){const e={tier:1,hp:350,maxHp:350,stock:{food:14,reeds:20},buildings:{},morale:100,destroyed:!1,spawnTimer:0,mealCount:0,mealDay:0,...t};return e.mesh=this.world.createShelter({...e,storage:e.stock}),this.camps.push(e),e}allies(){return this.frogs.filter(t=>t.team==="ally"&&!t.dead)}ownedCamps(){return this.camps.filter(t=>t.team==="ally"&&!t.destroyed)}hostile(t,e){if(t.dead||e.dead||t===e||t.team==="neutral"||e.team==="neutral"||t.surrendered||e.surrendered)return!1;const n=t.team==="player"?"ally":t.team,i=e.team==="player"?"ally":e.team;return n!==i}start(t){t==="continue"&&this.saved?this.resetWorld(this.saved):this.started&&this.resetWorld(),this.started=!0,this.paused=!1,this.ended=!1,this.ui.closePanels(),this.ui.showPause(!1),this.audio.init?.(),this.audio.start?.(),this.audio.setVolume?.(this.settings.volume),this.input.clear(),this.input.lock(),this.ui.toast("WASD κίνηση · Ποντίκι στόχευση · Space άλμα · E αλληλεπίδραση","info"),this.save()}pause(){!this.started||this.ended||(this.paused=!0,this.input.clear(),this.input.unlock(),this.ui.showPause(!0),this.save())}resume(){this.started&&(this.paused=!1,this.ended=!1,this.ui.hideMenus(),this.input.clear(),this.input.lock())}escape(){if(!this.started){this.ui.panel&&this.ui.showTitle(!!this.saved);return}this.ui.panel?this.ui.panel==="help"&&this.ui.returnMenu==="pause"?(this.ui.closePanels(),this.ui.showPause(!0),this.paused=!0):this.resume():this.paused?this.resume():this.pause()}setSettings(t){Object.assign(this.settings,t),localStorage.setItem("frog-settings",JSON.stringify(this.settings)),this.applySettings()}applySettings(){const t=this.settings.quality;this.renderer.setPixelRatio(Math.min(devicePixelRatio,t==="high"?1.5:t==="medium"?1.15:1)),this.renderer.shadowMap.enabled=t!=="low",this.scene.fog.density=t==="low"?.009:.0065,this.audio?.setVolume?.(this.settings.volume),this.resize()}resize(){this.camera.aspect=innerWidth/innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(innerWidth,innerHeight),this.labels&&(this.labels.width=innerWidth,this.labels.height=innerHeight)}frame(t){let e=Math.min(.05,Math.max(.001,(t-this.last)/1e3));if(this.last=t,this.frameTime+=e,this.fps=Xn.lerp(this.fps,1/e,.03),this.input.hit("KeyC")&&this.started&&!this.ended&&(Kc(this),this.input.pressed.delete("KeyC")),this.ui.panel&&this.started){if(this.ui.panel==="build"&&this.input.hit("KeyV")||["roster","map"].includes(this.ui.panel)&&this.input.hit("Tab"))this.ui.closePanels(),this.paused=!1,this.input.pressed.delete("KeyV"),this.input.pressed.delete("Tab"),this.input.lock();else if(this.ui.panel==="build"){for(let i=0;i<8;i++)if(this.input.hit(`Digit${i+1}`)){const r=this.buildOptions()[i];r?.enabled&&this.build(r.type),this.input.pressed.delete(`Digit${i+1}`)}}}this.started&&!this.paused&&!this.ended&&!this.ui.isBlocking?.()&&(this.hitPause>0&&(this.hitPause-=e,e*=.17),this.elapsed+=e,this.updatePlayer(e),this.updateFrogs(e),this.updatePredators(e),this.updateEconomy(e),this.checkVictory());const n=ai(this.elapsed);this.updateLighting(n),this.world.update(e,this.elapsed+this.frameTime*.025,n.daylight,new Te(this.player.x,this.player.y,this.player.z)),this.vfx.update(e),this.updateModels(e),this.updateCamera(e),this.drawLabels(),this.timers.ui+=e,this.timers.ui>.1&&(this.updateUI(n),this.timers.ui=0),this.started&&!this.paused&&(this.timers.save+=e,this.timers.save>20&&(this.save(),this.timers.save=0)),this.audio.update?.(e,{night:n.night,water:!!this.player.swimming,hunt:!!this.hunt,paused:this.paused||this.ui.isBlocking()}),this.renderer.render(this.scene,this.camera),this.input.endFrame()}updateLighting(t){const e=t.phase*sh-Math.PI/2,n=t.daylight;this.sun.position.set(this.player.x+Math.cos(e)*35,this.player.y+Math.max(8,Math.sin(e)*45+12),this.player.z+25),this.sun.target.position.set(this.player.x,0,this.player.z),this.sun.intensity=.1+n*3,this.hemi.intensity=.5+n*1.3,this.moon.intensity=.65*(1-n),this.scene.environmentIntensity=.12+n*.48,this.sun.color.setHSL(.1,.3+.3*(1-n),.82),this.hemi.color.setRGB(.38+n*.39,.5+n*.37,.69+n*.25),this.scene.fog.color.setRGB(.04+n*.52,.095+n*.58,.16+n*.56),this.scene.background.copy(this.scene.fog.color),this.sky.material.uniforms.sunPosition.value.set(Math.cos(e)*80,Math.max(-6,Math.sin(e)*70+10),40),this.sky.material.uniforms.rayleigh.value=1.5+2*(1-n),this.sky.visible=n>.05,this.renderer.toneMappingExposure=.88+n*.18}updateCamera(t,e=!1){Gh(this,t,e)}updatePlayer(t){const e=this.player;if(e.dead){this.deathTimer+=t,this.deathTimer>3&&this.respawn();return}for(const d of["attackCD","specialCD","invulnerable","stun","eatCD","roarCD","dodgeCD"])e[d]=Math.max(0,(e[d]||0)-t);if(e.grabbedBy){(this.input.hit("KeyQ")||this.input.hit("Space")||this.input.hit("KeyR"))&&(e.grabbedBy.rescueDamage+=13,this.audio.play?.("hit"));return}const n=(this.input.down("KeyD")?1:0)-(this.input.down("KeyA")?1:0),i=(this.input.down("KeyW")?1:0)-(this.input.down("KeyS")?1:0),r=Math.hypot(n,i),a=this.input.down("ShiftLeft")&&e.stamina>8&&r>0,o=this.input.right&&e.stamina>2;e.blocking=o;let l=(a?6.6:4.25)*(e.stomach<10?.78:1)*(e.swimming?.72:1)*(o?.55:1)*(e.stun>0?.1:1);const c=this.viewMode==="topdown"?0:this.cameraYaw,h=r?(Math.sin(c)*i-Math.cos(c)*n)/r:0,u=r?(Math.cos(c)*i+Math.sin(c)*n)/r:0;e.vx=Xn.damp(e.vx,h*l,12,t),e.vz=Xn.damp(e.vz,u*l,12,t),r&&(e.yaw=Br(e.yaw,Math.atan2(h,u),t*14)),(o||this.input.left||this.viewMode==="first"||this.viewMode==="topdown")&&(e.yaw=Br(e.yaw,this.aimYaw??this.cameraYaw,t*14)),this.input.hit("Space")&&e.grounded&&e.stamina>12&&(e.charge=0),e.charge>=0&&this.input.down("Space")&&(e.charge=Math.min(.65,e.charge+t)),this.input.up("Space")&&e.charge>=0&&(this.jump(e,8+e.charge*4),e.stamina-=12+e.charge*8,e.charge=-1),this.input.hit("KeyZ")&&e.dodgeCD===0&&e.stamina>=22&&(e.stamina-=22,e.dodgeCD=1.5,e.invulnerable=.42,e.vx=(h||Math.sin(this.cameraYaw))*11,e.vz=(u||Math.cos(this.cameraYaw))*11,this.jump(e,4.5),this.audio.play?.("jump")),this.moveActor(e,t),e.stamina=Gt(e.stamina+t*(a?-12:o?-3.5:15),0,100),e.stomach=Gt(e.stomach-t*(a?.14:.085),0,100),e.stomach<=0&&this.elapsed%2<t&&this.damage(e,2,null),this.aimTarget=this.findAim(),(this.input.left||this.input.hit("MouseLeft"))&&e.attackCD<=0&&this.primaryAttack(),this.input.hit("KeyQ")&&this.special(e),this.input.hit("KeyR")&&this.intimidate(e),this.input.hit("KeyE")&&this.interact(),this.input.hit("KeyF")&&this.gangCommand(this.command==="attack"?"follow":"attack"),this.input.hit("KeyX")&&this.gangCommand(this.command==="guard"?"follow":"guard"),this.input.hit("KeyV")&&this.openPanel("build"),this.input.hit("Tab")&&this.openPanel("roster"),this.input.hit("KeyG")&&this.consume();for(let d=0;d<3;d++)this.input.hit(`Digit${d+1}`)&&(this.specialIndex=d,this.ui.toast(`Ειδική κίνηση: ${["Εναέρια κλωτσιά","Βαριά προσγείωση","Χτύπημα γλώσσας"][d]}`))}jump(t,e=7){!t.grounded&&!t.swimming||(t.vy=e,t.grounded=!1,t.jumpTime=.8,this.world.splash(new Te(t.x,Math.max(0,t.y),t.z),.4),t===this.player&&this.audio.play?.("jump"))}moveActor(t,e){let n=Gt(t.x+t.vx*e,-107,107),i=Gt(t.z+t.vz*e,-107,107),r=this.world.getSurface(n,i),a=r.height;if(a>t.y+.65&&t.grounded&&(n=t.x,i=t.z,r=this.world.getSurface(n,i),a=r.height,t!==this.player&&this.jump(t,7.5)),t.x=n,t.z=i,t.speed=Math.hypot(t.vx,t.vz),t.swimming=r.type==="water",t.grounded)t.y>a+.2?(t.grounded=!1,t.vy=0):t.y=a+(t.swimming?Math.sin(this.elapsed*4+t.seed)*.025:0);else if(t.vy-=20*e,t.y+=t.vy*e,t.y<=a&&t.vy<=0){const o=Math.abs(t.vy);t.y=a,t.vy=0,t.grounded=!0,t.jumpTime=0,(t.swimming||r.type==="lily")&&this.world.splash(new Te(t.x,0,t.z),Math.min(1.2,o*.12)),t===this.player&&o>5&&this.audio.play?.("land")}t.jump=t.grounded?0:Gt(t.vy/10,-1,1),t.swimming&&t.speed>1&&Math.random()<e*3&&this.world.splash(new Te(t.x,0,t.z),.12)}findAim(){const t=this.player,e=new Te;let n=null,i=1;const r=this.viewMode==="topdown"&&this.input.ndc?.x||0,a=this.viewMode==="topdown"&&this.input.ndc?.y||0;for(const o of[...this.frogs,...this.predators]){if(o===t||o.dead||o.phase==="dormant"||Ft(o,t)>19||(e.set(o.x,o.y+(o.type==="heron"?2:.7),o.z).project(this.camera),e.z>1||e.z<-1))continue;const l=Math.hypot(e.x-r,e.y-a);l<.28&&l<i&&(i=l,n={kind:"actor",entity:o})}if(n)return n;for(const o of this.world.hotspots){if(o.flies<1||Ft(o,t)>10)continue;e.set(o.x,1.4,o.z).project(this.camera);const l=Math.hypot(e.x-r,e.y-a);l<.42&&l<i&&(i=l,n={kind:"flies",entity:o})}return n}gainXP(t){ro(this.player,t)&&(this.ui.toast(`Επίπεδο ${this.player.level} — περισσότερη ζωή!`,"success"),this.audio.play?.("levelup"));for(const n of this.allies())Ft(n,this.player)<24&&ro(n,t*.45)}power(t="ally"){return this.frogs.filter(e=>!e.dead&&!e.surrendered&&(t==="ally"?["ally","player"].includes(e.team):e.team===t)).reduce((e,n)=>e+(n.tier+.15*n.level)*(.35+.65*n.hp/n.maxHp),0)}damage(t,e,n,i={}){if(!t||t.dead)return;if(t.team==="predator"){nh(this,t,e,n);return}if(!i.bypass&&n&&n!==t&&n.team!=="predator"&&!this.hostile(n,t)||t.surrendered&&n?.team!=="predator"&&!i.eaten&&!i.bypass||t.invulnerable>0&&!i.bypass)return;let r=e;t===this.player&&t.blocking&&t.stamina>5&&(r*=.35,t.stamina=Math.max(0,t.stamina-e*.5),this.audio.play?.("block"));const a=this.camps.find(o=>o.id===t.home);if(t.guard&&a?.buildings.watchtower&&(r*=.82),t.hp=Math.max(0,t.hp-r),t.hitAnim=.34,t.invulnerable=t===this.player?.38:.1,t.stun=t===this.player?.12:.18,t.morale=Math.max(0,t.morale-r*.48),n&&n!==t){const o=Math.max(.5,Ft(t,n));t.vx+=(t.x-n.x)/o*2.5,t.vz+=(t.z-n.z)/o*2.5}if(this.world.impact(new Te(t.x,t.y+.5,t.z),t.team==="ally"?9563071:15778678,.55),Ft(t,this.player)<20&&(this.vfx.number(new Te(t.x,t.y,t.z),Math.ceil(r),t===this.player?"#ffac98":"#f6e6b2"),this.audio.play?.("hit")),t===this.player&&(this.shake=.7),t.hp<=0){if(t.team.startsWith("enemy")&&n?.team!=="predator"&&!i.eaten){t.hp=t.maxHp*.15,t.surrendered=!0,t.morale=0,t.guard=!1,t.surrenderTimer=80,t.model.setOutline(wn.surrender,!0),this.targetCommand===t&&(this.targetCommand=null,this.command==="attack"&&(this.command="follow"));for(const o of this.frogs)o.intent?.target===t&&(o.intent=null,o.brain=0);(n?.team==="player"||n?.team==="ally")&&(this.stats.kills++,this.gainXP(24),this.resources.reeds+=5,this.ui.toast(`${t.name} παραδόθηκε. E για στρατολόγηση.`,"success"));return}t.dead=!0,t.deadTime=0,t.model.setOutline(wn.enemy,!1),t===this.player?(this.deathTimer=0,this.ui.toast("Έπεσες στη μάχη…","danger"),this.input.clear()):t.team==="ally"?(this.stats.losses++,this.ui.toast(`Χάθηκε ο ${t.name}.`,"danger")):(this.stats.kills++,(n?.team==="player"||n?.team==="ally")&&(this.gainXP(22),this.resources.food+=4,this.resources.reeds+=6))}}primaryAttack(){const t=this.player;if(t.stamina<3)return;t.attackCD=.43,t.attackAnim=.34,t.attackDuration=.34,t.attackType="tongue",this.audio.play?.("tongue");const e=this.aimTarget,n=this.aimYaw??this.cameraYaw;let i=new Te(t.x+Math.sin(n)*7,t.y+.7,t.z+Math.cos(n)*7);if(e?.kind==="actor"&&Ft(e.entity,t)<10){const r=e.entity;(this.hostile(t,r)||r.team==="predator")&&(i.set(r.x,r.y+(r.type==="heron"?1.6:.55),r.z),this.damage(r,zs(14,t.tier,t.level),t),t.stamina=Math.max(0,t.stamina-5),this.hitPause=.035)}else if(e?.kind==="flies"){const r=e.entity;t.stomach>94?(this.ui.toast("Το στομάχι σου γέμισε. Μάζεψε αποθέματα με E ή οργάνωσε καταφύγιο με V.","food"),t.attackCD=1):r.flies>=1&&(r.flies=Math.max(0,r.flies-1),ao(t,10),this.resources.food+=2,this.stats.flies++,this.gainXP(4),i.set(r.x+(Math.random()-.5),1.3+Math.random(),r.z+(Math.random()-.5)),this.audio.play?.("eat"),this.vfx.number(new Te(t.x,t.y,t.z),"+10","#bceaa0"))}else{const r=this.frogs.find(a=>this.hostile(t,a)&&Ft(a,t)<3.2&&Math.cos(Math.atan2(a.x-t.x,a.z-t.z)-n)>.3);if(r)i.set(r.x,r.y+.6,r.z),this.damage(r,zs(14,t.tier,t.level),t);else{const a=this.camps.find(o=>o.team.startsWith("enemy")&&!o.destroyed&&Ft(o,t)<7&&Math.cos(Math.atan2(o.x-t.x,o.z-t.z)-n)>.3);a&&(i.set(a.x,this.world.sampleHeight(a.x,a.z)+1,a.z),this.damageCamp(a,16,t),t.stamina=Math.max(0,t.stamina-3))}}this.vfx.tongue(t,i)}special(t){if(t.specialCD>0||t.dead||t.grabbedBy)return;if(t===this.player&&t.stamina<23){this.ui.toast("Χρειάζεσαι περισσότερη αντοχή.","warning");return}const e=t===this.player?["kick","slam","tongue"][this.specialIndex]:t.role==="bruiser"?"slam":t.role==="hunter"?"tongue":"kick";t.specialCD=e==="slam"?5.2:4,t.attackAnim=.65,t.attackDuration=.65,t.attackType=e,t===this.player&&(t.stamina-=23);const n=t===this.player?this.aimYaw??this.cameraYaw:t.yaw;t.yaw=n;const i=e==="tongue"?8:e==="slam"?4.6:3.8;e==="kick"&&(this.jump(t,5.3),t.vx=Math.sin(n)*8,t.vz=Math.cos(n)*8),this.audio.play?.(e==="slam"?"slam":"hit"),this.world.splash(new Te(t.x,Math.max(0,t.y),t.z),e==="slam"?2:1),this.vfx.cue(new Te(t.x,t.y+.05,t.z),i,e==="slam"?.6:.25,e==="slam"?12051147:15326363);for(const r of[...this.frogs,...this.predators]){if(r===t||r.dead||!this.hostile(t,r)&&r.team!=="predator"||Ft(t,r)>i)continue;const a=Math.cos(Math.atan2(r.x-t.x,r.z-t.z)-n);e!=="slam"&&a<-.1||this.damage(r,zs(e==="kick"?43:e==="slam"?33:29,t.tier,t.level),t)}for(const r of this.camps)!r.destroyed&&r.team!==t.team&&r.team!=="ally"&&Ft(t,r)<i+2&&this.damageCamp(r,e==="slam"?38:26,t);t===this.player&&(this.shake=.4,this.hitPause=.065)}intimidate(t){if(t.roarCD>0||t.dead||t===this.player&&t.stamina<18)return;t.roarCD=8,t.roarAnim=1.25,t===this.player&&(t.stamina-=18),this.audio.play?.("croak"),this.vfx.cue(new Te(t.x,Math.max(.1,t.y),t.z),8,1.1,15133095);const e=28+t.tier*7;for(const n of this.frogs)!this.hostile(t,n)||Ft(t,n)>9||(n.morale=Math.max(0,n.morale-e),n.fear=4+t.tier,n.fearFrom={x:t.x,z:t.z},n.hp<n.maxHp*.42&&n.morale<20&&(n.surrendered=!0,n.guard=!1,n.model.setOutline(wn.surrender,!0)));for(const n of this.predators)!n.dead&&Ft(t,n)<10&&n.phase!=="patrol"&&(n.rescueDamage+=20,nh(this,n,6+t.tier*3,t));t===this.player&&this.ui.toast("Το κόασμά σου τρομάζει τους κοντινούς αντιπάλους.")}context(){const t=this.player,e=this.frogs.filter(o=>o!==t&&!o.dead&&Ft(o,t)<4.5).sort((o,l)=>Ft(o,t)-Ft(l,t)),n=e.find(o=>o.team==="neutral"||o.surrendered);if(n)return{type:"recruit",entity:n,hint:`E · Στρατολόγηση ${n.name} · 6 τροφή`};const i=this.camps.filter(o=>Ft(o,t)<7.5).sort((o,l)=>Ft(o,t)-Ft(l,t))[0];if(i){if(i.destroyed)return{type:"loot",entity:i,hint:i.lootTaken?"V · Ξαναχτίσε αυτό το καταφύγιο":"E · Λεηλασία αποθεμάτων"};if(i.team.startsWith("enemy"))return{type:"persuade-camp",entity:i,hint:"E · Πείσε τη συμμορία · LMB / Q · Επίθεση στη βάση"};if(i.team==="ally")return{type:"home",entity:i,hint:"V · Κτίρια / επισκευή · G · Φαγητό · X · Φρουρά"}}const r=this.world.hotspots.filter(o=>Ft(o,t)<5).sort((o,l)=>Ft(o,t)-Ft(l,t))[0];if(r)return{type:"gather",entity:r,hint:"LMB · Φάε μύγες · E · Συλλογή τροφής και καλαμιών"};const a=e.find(o=>o.team==="ally");return a?{type:"ally",entity:a,hint:`E · ${a.guard?"Κάλεσε πίσω":"Όρισε φρουρό"} τον ${a.name} · Tab · Συμμορία`}:this.world.getSurface(t.x,t.z).type==="land"?{type:"reeds",hint:"E · Συλλογή καλαμιών · V · Νέο καταφύγιο"}:{type:"none",hint:"C · Κάμερα · LMB · Γλώσσα · Space · Άλμα · Q · Ειδική επίθεση"}}interact(){const t=this.context(),e=this.player;if(t.type==="recruit")return this.recruit(t.entity);if(t.type==="loot"){const n=t.entity;if(n.lootTaken){this.openPanel("build");return}this.resources.food+=Math.round(n.stock.food),this.resources.reeds+=Math.round(n.stock.reeds),n.stock={food:0,reeds:0},n.lootTaken=!0,this.world.updateShelter(n.mesh,{...n,storage:n.stock}),this.gainXP(35),this.ui.toast("Τα αποθέματα της βάσης πέρασαν στη συμμορία σου.","success"),this.audio.play?.("eat");return}if(t.type==="persuade-camp")return this.persuadeCamp(t.entity);if(t.type==="home"){this.openPanel("build");return}if(t.type==="ally"){this.frogCommand(t.entity.id,t.entity.guard?"follow":"guard");return}if((t.type==="gather"||t.type==="reeds")&&e.eatCD<=0){e.eatCD=4;let n=0,i=3;if(t.entity){const r=Math.min(t.entity.flies,8);t.entity.flies-=r,n=Math.floor(r*.65),i=t.entity.rich?6:3}this.resources.food+=n,this.resources.reeds+=i,this.ui.toast(`Συλλογή: +${n} τροφή · +${i} καλάμια`,"food"),this.audio.play?.("eat"),this.vfx.number(new Te(e.x,e.y,e.z),`+${i}`,"#dfd3a6");return}t.type==="none"&&this.ui.toast("Πλησίασε βάτραχο, σμήνος, όχθη ή καταφύγιο για αλληλεπίδραση.")}recruit(t){if(this.allies().length>=th(this.camps)){this.ui.toast("Χρειάζεσαι περισσότερα ή μεγαλύτερα καταφύγια για νέους συμμάχους.","warning");return}if(!rs(this.resources,{food:6})){this.ui.toast("Χρειάζονται 6 τροφή για στρατολόγηση.","warning");return}if((t.persuadeCD||0)>this.elapsed){this.ui.toast("Δώσε του λίγο χρόνο πριν προσπαθήσεις ξανά.");return}t.team;const e=this.camps.find(i=>i.id===t.home),n=gv({allyPower:this.power(),enemyPower:this.power(t.team),hp:t.hp,maxHp:t.maxHp,morale:t.morale,campDestroyed:!!e?.destroyed,neutral:t.team==="neutral"});if(t.persuadeCD=this.elapsed+8,Math.random()>n){this.resources.food-=2,this.ui.toast(`${t.name}: αρνήθηκε. Αποδυνάμωσε τη βάση ή δείξε μεγαλύτερη ισχύ.`,"warning");return}Si(this.resources,{food:6}),t.team="ally",t.surrendered=!1,t.morale=100,t.fear=0,t.guard=!1,t.home=this.ownedCamps()[0]?.id||null,t.hp=Math.max(t.hp,t.maxHp*.5),t.intent=null,t.brain=0,t.raidTarget=null,t.model.setOutline(wn.ally,!0),this.stats.recruited++,this.gainXP(20),this.audio.play?.("recruit"),this.ui.toast(`${t.name} εντάχθηκε στη συμμορία σου!`,"success"),this.targetCommand===t&&(this.targetCommand=null,this.command==="attack"&&(this.command="follow"));for(const i of this.frogs)i.intent?.target===t&&(i.intent=null,i.brain=0);t.leader&&e&&!e.destroyed&&e.hp/e.maxHp<.5&&this.captureCamp(e)}persuadeCamp(t){if((t.persuadeCD||0)>this.elapsed){this.ui.toast("Η συμμορία δεν θέλει ακόμη να διαπραγματευτεί.");return}const e=this.power()/Math.max(.5,this.power(t.team)),n=1-t.hp/t.maxHp;if(e<1.35&&n<.5){this.ui.toast("Η αντίπαλη συμμορία αντιστέκεται. Χτύπησε τη βάση ή αύξησε τη δύναμή σου.","warning");return}if(!rs(this.resources,{food:12})){this.ui.toast("Χρειάζεσαι 12 τροφή για προσφορά συμμαχίας.","warning");return}t.persuadeCD=this.elapsed+15;const i=Gt(.15+e*.2+n*.5+(100-t.morale)*.002,.1,.97);Math.random()<i?(Si(this.resources,{food:12}),this.captureCamp(t)):(this.ui.toast("Η συμμαχία απορρίφθηκε. Η φθορά της βάσης αυξάνει τις πιθανότητες.","warning"),t.morale=Math.max(0,t.morale-12))}captureCamp(t){if(!t||t.team==="ally")return;const e=t.team;t.team="ally",t.destroyed=!1,t.hp=Math.max(t.hp,t.maxHp*.5),t.morale=100,this.stats.campsCaptured++,this.resources.food+=Math.round(t.stock.food*.5),this.resources.reeds+=Math.round(t.stock.reeds*.5),t.stock={food:15,reeds:20};for(const n of this.frogs)n.team===e&&!n.dead&&(n.team="ally",n.surrendered=!1,n.morale=100,n.home=t.id,n.guard=!0,n.raidTarget=null,n.intent=null,n.brain=0,n.model.setOutline(wn.ally,!0),this.stats.recruited++);(this.targetCommand===t||this.targetCommand?.model&&this.targetCommand.team==="ally")&&(this.targetCommand=null,this.command==="attack"&&(this.command="follow"));for(const n of this.frogs)(n.intent?.target===t||n.intent?.kind==="attack"&&n.intent.target?.team!=="predator"&&!this.hostile(n,n.intent.target))&&(n.intent=null,n.brain=0);this.world.updateShelter(t.mesh,{...t,storage:t.stock}),this.gainXP(100),this.audio.play?.("recruit"),this.ui.toast(`${t.name}: η βάση και οι βάτραχοί της ενώθηκαν μαζί σου!`,"success"),this.save()}damageCamp(t,e,n){if(!(!t||t.destroyed)&&!(n&&(n.dead||n.surrendered||(n.team==="player"?"ally":n.team)===(t.team==="player"?"ally":t.team)))&&(t.hp=Math.max(0,t.hp-e),t.morale=Math.max(0,t.morale-e*.14),this.world.impact(new Te(t.x,this.world.sampleHeight(t.x,t.z)+1,t.z),13810570,.6),(this.elapsed-(t.visualUpdate||0)>.4||t.hp===0)&&(t.visualUpdate=this.elapsed,this.world.updateShelter(t.mesh,{...t,storage:t.stock})),t.hp<=0)){if(t.destroyed=!0,this.world.updateShelter(t.mesh,{...t,storage:t.stock}),this.audio.play?.("slam"),t.team.startsWith("enemy")){(n?.team==="player"||n?.team==="ally")&&this.gainXP(120),this.ui.toast(`Καταστράφηκε το ${t.name}. E για λάφυρα — οι υπερασπιστές μπορούν να στρατολογηθούν.`,"success");for(const i of this.frogs)i.home===t.id&&!i.dead&&(i.morale=0,i.guard=!1,i.surrendered=!0,i.intent=null,i.brain=0,i.model.setOutline(wn.surrender,!0))}else this.ui.toast(`Το καταφύγιο ${t.name} έπεσε! Ξαναχτίζεται με V.`,"danger");(this.targetCommand===t||this.targetCommand?.model&&this.targetCommand.surrendered)&&(this.targetCommand=null,this.command==="attack"&&(this.command="follow"));for(const i of this.frogs)(i.intent?.target===t||i.intent?.kind==="attack"&&i.intent.target?.surrendered)&&(i.intent=null,i.brain=0);this.save()}}updateFrogs(t){const e=this.player,n=this.allies();for(const i of this.frogs){if(i===e)continue;if(i.dead){i.deadTime=(i.deadTime||0)+t;continue}for(const d of["attackCD","specialCD","roarCD","invulnerable","stun","eatCD","fear"])i[d]=Math.max(0,(i[d]||0)-t);if(i.stomach=Gt(i.stomach-t*.055,0,100),i.grabbedBy)continue;if(i.surrendered){i.vx=Xn.damp(i.vx,0,8,t),i.vz=Xn.damp(i.vz,0,8,t),this.moveActor(i,t);continue}i.brain-=t,i.brain<=0&&(i.brain=Ft(i,e)>65?.65:.2,i.intent=this.thinkFrog(i,n));const r=i.intent;if(!r){i.vx=0,i.vz=0,this.moveActor(i,t);continue}const a=r.kind==="attack"&&(!r.target||r.target.dead||r.target.surrendered||r.target.phase==="dormant"||r.target.team!=="predator"&&!this.hostile(i,r.target)),o=r.kind==="camp-attack"&&(!r.target||r.target.destroyed||r.target.team==="neutral"||(i.team==="player"?"ally":i.team)===(r.target.team==="player"?"ally":r.target.team));if(a||o){i.intent=null,i.brain=0,i.vx=0,i.vz=0,this.moveActor(i,t);continue}const l=r.target,c=Ft(i,l);let h=(i.role==="scout"?4.6:3.7)*(i.stomach<10?.75:1);const u=r.kind==="attack"?l.team==="predator"?2.8:i.role==="hunter"?5:1.6:r.kind==="camp-attack"?4.5:r.kind==="eat"?2:1.3;if(c>u){const d=(l.x-i.x)/Math.max(c,.01),p=(l.z-i.z)/Math.max(c,.01);let m=0,v=0;for(const g of this.frogs){if(g===i||g.dead)continue;const f=Ft(i,g);f<1.15&&f>.01&&(m+=(i.x-g.x)/f*(1.15-f),v+=(i.z-g.z)/f*(1.15-f))}i.vx=d*h+m*2,i.vz=p*h+v*2,i.yaw=Br(i.yaw,Math.atan2(i.vx,i.vz),t*10),i.grounded&&!i.swimming&&c>3&&(this.elapsed+i.thinkOffset)%1.5<t&&this.jump(i,6.4)}else{if(i.vx=Xn.damp(i.vx,0,10,t),i.vz=Xn.damp(i.vz,0,10,t),c>.1&&(i.yaw=Br(i.yaw,Math.atan2(l.x-i.x,l.z-i.z),t*10)),r.kind==="attack"&&!l.dead&&i.attackCD<=0&&(i.attackCD=1.15+this.random()*.35,i.attackAnim=.4,i.attackDuration=.4,i.attackType=i.role==="hunter"?"tongue":"kick",this.damage(l,zs(i.role==="bruiser"?14:10,i.tier,i.level),i),i.role==="hunter"&&this.vfx.tongue(i,new Te(l.x,l.y+.6,l.z)),i.specialCD<=0&&(i.role==="caller"?this.intimidate(i):c<4&&this.special(i))),r.kind==="camp-attack"&&i.attackCD<=0&&!l.destroyed&&(i.attackCD=1.4,i.attackAnim=.4,i.attackDuration=.4,i.attackType="kick",this.damageCamp(l,zs(10,i.tier,i.level),i),i.raidTarget&&l.team==="ally"&&!this.frogs.some(d=>d.team==="ally"&&d.guard&&d.home===l.id&&!d.dead&&Ft(d,l)<10))){const d=Math.min(3,this.resources.food,l.stock.food);this.resources.food-=d,l.stock.food-=d,i.loot=(i.loot||0)+d,i.loot>=9&&(i.raidTarget=null,i.intent=null,this.ui.toast("Επιδρομείς έκλεψαν τρόφιμα από αφύλακτη βάση!","danger"))}r.kind==="eat"&&i.eatCD<=0&&l.flies>=1&&(l.flies--,ao(i,15),i.eatCD=2.5,i.attackAnim=.3,i.attackDuration=.3,i.attackType="tongue",Ft(i,e)<30&&this.vfx.tongue(i,new Te(l.x,1.5,l.z)),i.team==="ally"&&(this.resources.food++,ro(i,3)))}i.stun>0&&(i.vx*=.2,i.vz*=.2),this.moveActor(i,t)}}thinkFrog(t,e){if(t.fear>0&&t.fearFrom){const o=Math.atan2(t.x-t.fearFrom.x,t.z-t.fearFrom.z);return{kind:"move",target:{x:t.x+Math.sin(o)*9,z:t.z+Math.cos(o)*9}}}const n=t.team==="ally",i=this.camps.find(o=>o.id===t.home&&!o.destroyed);if(t.team==="neutral")return{kind:"move",target:{x:t.x+Math.sin(this.elapsed*.15+t.seed)*.2,z:t.z+Math.cos(this.elapsed*.15+t.seed)*.2}};const r=this.predators.filter(o=>!o.dead&&!["patrol","dormant","flee","dead"].includes(o.phase)&&Ft(o,t)<(n?16:10)&&(!o.target||o.target.team===t.team||o.target===this.player)).sort((o,l)=>Ft(o,t)-Ft(l,t))[0];if(r)return{kind:"attack",target:r};const a=this.frogs.filter(o=>this.hostile(t,o)&&Ft(o,t)<(t.guard?15:10)).sort((o,l)=>Ft(o,t)-Ft(l,t));if(a[0]&&(t.team==="ally"||this.elapsed>this.graceUntil||a[0].team.startsWith("enemy")))return{kind:"attack",target:a[0]};if(n&&this.command==="attack"&&this.targetCommand&&!t.guard){const o=this.targetCommand;if(o.model?!o.dead&&!o.surrendered&&o.phase!=="dormant"&&(o.team==="predator"||this.hostile(t,o)):!o.destroyed&&typeof o.team=="string"&&o.team.startsWith("enemy"))return{kind:o.model?"attack":"camp-attack",target:o};this.targetCommand=null,this.command="follow"}if(t.raidTarget){const o=this.camps.find(l=>l.id===t.raidTarget&&!l.destroyed);if(o)return{kind:"camp-attack",target:o};t.raidTarget=null}if(t.stomach<83){const o=this.world.hotspots.filter(l=>l.flies>0&&Ft(l,t)<(n?8:24)).sort((l,c)=>Ft(l,t)-Ft(c,t))[0];if(o&&(!n||Ft(o,this.player)<16||t.guard))return{kind:"eat",target:o}}if(n&&!t.guard){const o=e.indexOf(t),l=Math.floor(o/4),c=this.player.yaw+Math.PI+(o%4-1.5)*.48;return{kind:"move",target:{x:this.player.x+Math.sin(c)*(3.2+l*1.8),z:this.player.z+Math.cos(c)*(3.2+l*1.8)}}}if(i){const o=this.elapsed*.08+t.seed*2.3;return{kind:"move",target:{x:i.x+Math.sin(o)*(t.guard?4.5:8),z:i.z+Math.cos(o)*(t.guard?4.5:8)}}}return null}updatePredators(t){Dv(this,t)}updateEconomy(t){const e=ai(this.elapsed);for(const n of this.world.hotspots)n.flies=Math.min(n.maxFlies,n.flies+t*(n.rich?.55:.16)*(e.night?.65:1));for(const n of this.camps)if(!n.destroyed)if(n.spawnTimer=(n.spawnTimer||0)+t,n.stock.food=Math.min(150,n.stock.food+t*.03),n.stock.reeds=Math.min(180,n.stock.reeds+t*.02),n.team==="ally"){const i=this.frogs.filter(r=>!r.dead&&["player","ally"].includes(r.team)&&Ft(r,n)<7&&!r.grabbedBy);if(!this.frogs.some(r=>r.team.startsWith("enemy")&&!r.dead&&!r.surrendered&&Ft(r,n)<12)&&!this.predators.some(r=>!r.dead&&Ft(r,n)<12&&r.phase!=="patrol"))for(const r of i)r.hp=Math.min(r.maxHp,r.hp+t*(n.buildings.store?2.4:1.4)),r.morale=Math.min(100,r.morale+t*2);if(n.buildings.nursery&&n.spawnTimer>=85&&this.allies().length<th(this.camps)&&rs(this.resources,{food:10,reeds:6})){Si(this.resources,{food:10,reeds:6}),n.spawnTimer=0;const r=this.spawnFrog({x:n.x+2,z:n.z,team:"ally",home:n.id,guard:!0,stomach:80});this.ui.toast(`${r.name} βγήκε από τη φωλιά και φρουρεί το ${n.name}.`,"success"),this.audio.play?.("recruit")}}else n.team.startsWith("enemy")&&n.spawnTimer>110&&(n.spawnTimer=0,this.frogs.filter(r=>r.home===n.id&&r.team===n.team&&!r.dead&&!r.surrendered).length<4&&n.stock.food>=12&&this.frogs.filter(r=>!r.dead).length<65&&(n.stock.food-=12,this.spawnFrog({x:n.x+3,z:n.z,team:n.team,home:n.id,guard:!0,tier:n.tier,level:n.tier+1})));this.elapsed>=this.nextRaid&&(this.nextRaid=this.elapsed+(e.night?85:140),this.launchRaid()),this.player.hp<25&&!this.lowHealthWarn&&(this.lowHealthWarn=!0,this.ui.toast("Χαμηλή ζωή. Υποχώρησε σε φιλικό καταφύγιο για ανάρρωση.","danger")),this.player.hp>45&&(this.lowHealthWarn=!1)}launchRaid(){const t=this.ownedCamps();if(!t.length)return;const e=this.camps.filter(a=>a.team.startsWith("enemy")&&!a.destroyed);if(!e.length)return;const n=t[Math.floor(this.random()*t.length)],i=e.sort((a,o)=>Ft(a,n)-Ft(o,n))[0],r=this.frogs.filter(a=>a.home===i.id&&a.team===i.team&&!a.dead&&!a.surrendered&&!a.grabbedBy).slice(-3);for(const a of r)a.raidTarget=n.id,a.guard=!1,a.intent=null,a.brain=0,a.loot=0;r.length&&(n.underRaid=!0,this.ui.toast(`${n.buildings.watchtower?"Η σκοπιά εντόπισε":"Πλησιάζει"} επιδρομή στο ${n.name}! Άφησε φρουρά ή γύρνα στη βάση.`,"warning"),this.audio.play?.("croak"))}nearestHome(t=10){return this.ownedCamps().filter(e=>Ft(e,this.player)<t).sort((e,n)=>Ft(e,this.player)-Ft(n,this.player))[0]||null}placement(){const t=this.player,e=this.camps.find(a=>a.destroyed&&Ft(a,t)<7);if(e)return{x:e.x,z:e.z,ruin:e};if(this.camps.some(a=>!a.destroyed&&Ft(a,t)<14))return null;const i=this.world.campSites.find(a=>Ft(a,t)<7&&!this.camps.some(o=>Ft(o,a)<12&&!o.destroyed));if(i)return{x:i.x,z:i.z};const r=this.world.getSurface(t.x,t.z);return r.type==="land"||r.type==="rock"&&r.platform?.radius>3.5?{x:t.x,z:t.z}:null}buildOptions(){const t=this.nearestHome(),e=this.placement();return[...Object.entries(Jc).map(([n,i])=>{let r="";return n==="shelter"?e||(r="Πλησίασε ελεύθερη νησίδα, όχθη ή ερείπιο, μακριά από άλλη βάση."):t?n==="upgrade"&&t.tier>=3?r="Η βάση βρίσκεται ήδη στην ανώτερη βαθμίδα.":n==="repair"&&t.hp>=t.maxHp?r="Το καταφύγιο δεν έχει ζημιές.":!["upgrade","repair"].includes(n)&&t.buildings[n]&&(r="Το κτίριο υπάρχει ήδη."):r="Πλησίασε ενεργό φιλικό καταφύγιο.",{type:n,...i,enabled:!r,reason:r}}),{type:"promote-player",name:"Προαγωγή αρχηγού",description:`Βαθμίδα ${this.player.tier+1}: περισσότερη ζωή, ισχυρότερα χτυπήματα και εξοπλισμός από φύλλα. Απαιτεί επίπεδο ${this.player.tier*2}.`,cost:as(this.player),enabled:sl(this.player,this.resources),reason:this.player.tier>=3?"Ανώτερη βαθμίδα.":`Απαιτεί επίπεδο ${this.player.tier*2} και τους απαραίτητους πόρους.`}]}build(t){if(t==="promote-player"){Qc(this.player,this.resources)&&(this.player.model.setTier(this.player.tier),this.ui.toast(`Αρχηγός βαθμίδας ${this.player.tier}!`,"success"),this.audio.play?.("levelup"),this.save());return}const e=Jc[t],n=this.buildOptions().find(i=>i.type===t);if(!e||!n?.enabled){this.ui.toast(n?.reason||"Δεν μπορείς να χτίσεις εδώ.","warning");return}if(!rs(this.resources,e.cost)){this.ui.toast("Δεν αρκούν οι πόροι. Κυνήγησε ή λεηλάτησε εχθρικές αποθήκες.","warning");return}if(t==="shelter"){const i=this.placement();if(!i)return;Si(this.resources,e.cost);let r;i.ruin?(r=i.ruin,r.team="ally",r.destroyed=!1,r.hp=r.maxHp,r.stock={food:12,reeds:15},r.buildings={},this.world.updateShelter(r.mesh,{...r,storage:r.stock})):r=this.addCamp({id:`camp-${++this.idCounter}`,x:i.x,z:i.z,name:`Φωλιά ${this.ownedCamps().length+1}`,team:"ally",hp:350,maxHp:350,tier:1,originalEnemy:!1,buildings:{}}),this.stats.campsBuilt++,this.gainXP(35);for(const a of this.allies())a.home||(a.home=r.id);this.ui.toast(`Χτίστηκε το ${r.name}. X για φρουρά, V για νέα κτίρια.`,"success")}else{const i=this.nearestHome();if(!i)return;Si(this.resources,e.cost),t==="upgrade"?(i.tier++,i.maxHp+=150,i.hp=Math.min(i.maxHp,i.hp+180)):t==="repair"?i.hp=Math.min(i.maxHp,i.hp+150):(i.buildings[t]=!0,t==="palisade"&&(i.maxHp+=180,i.hp+=180),t==="store"&&(i.stock.food+=20)),this.world.updateShelter(i.mesh,{...i,storage:i.stock}),this.ui.toast(`${e.name}: ολοκληρώθηκε στο ${i.name}.`,"success")}this.audio.play?.("build"),this.world.impact(new Te(this.player.x,this.player.y+.5,this.player.z),13230757,1),this.updateUI(ai(this.elapsed)),this.ui.renderPanel?.(!0),this.save()}consume(){const t=this.nearestHome();if(!t){this.ui.toast("Πρέπει να βρίσκεσαι σε φιλικό καταφύγιο.","warning");return}const e=ai(this.elapsed).day;if(t.mealDay!==e&&(t.mealDay=e,t.mealCount=0),t.mealCount>=2){this.ui.toast("Οι δύο εφεδρικές μερίδες της ημέρας εξαντλήθηκαν. Βγες για κυνήγι.","warning");return}if(this.player.stomach>85){this.ui.toast("Δεν χρειάζεσαι ακόμη εφεδρικό γεύμα.");return}if(!Si(this.resources,{food:10})){this.ui.toast("Χρειάζονται 10 τροφή για μια εφεδρική μερίδα.","warning");return}ao(this.player,25),t.mealCount++,this.audio.play?.("eat"),this.ui.toast("+25 στομάχι. Η εφεδρική τροφή είναι περιορισμένη.","food")}gangCommand(t){const e=this.command;if(t==="guard"){const n=this.nearestHome(14);if(!n){this.ui.toast("Πλησίασε το καταφύγιο που θέλεις να φρουρήσουν.","warning");return}const i=this.allies().filter(r=>Ft(r,this.player)<20);for(const r of i)r.guard=!0,r.home=n.id,r.brain=0;this.command="guard",this.ui.toast(`${i.length} βάτραχοι φρουρούν το ${n.name}. Μπορείς να φύγεις για κυνήγι.`,"success")}else if(t==="attack"){let n=this.aimTarget?.kind==="actor"?this.aimTarget.entity:null;if((!n||!this.hostile(this.player,n)&&n.team!=="predator")&&(n=this.camps.filter(i=>i.team.startsWith("enemy")&&!i.destroyed&&Ft(i,this.player)<38).sort((i,r)=>Ft(i,this.player)-Ft(r,this.player))[0]),!n){this.ui.toast("Σημάδεψε αντίπαλο ή πλησίασε μια εχθρική βάση.","warning");return}this.command="attack",this.targetCommand=n;for(const i of this.allies())i.guard||(i.brain=0);this.ui.toast(`Η ομάδα επιτίθεται: ${n.name||"αντίπαλος"}. Οι φρουροί μένουν στις βάσεις.`)}else{if(e==="guard"){const n=this.nearestHome(14);if(n)for(const i of this.allies())i.home===n.id&&Ft(i,n)<20&&(i.guard=!1)}this.command="follow",this.targetCommand=null;for(const n of this.allies())n.brain=0;this.ui.toast("Η κινητή ομάδα σε ακολουθεί. Οι μακρινοί φρουροί κρατούν τις βάσεις.")}this.audio.play?.("croak")}frogCommand(t,e){const n=this.frogs.find(i=>i.id===String(t)&&i.team==="ally"&&!i.dead);if(n){if(e==="promote"){if(!Qc(n,this.resources)){this.ui.toast(`Απαιτεί επίπεδο ${n.tier*2}, ${as(n).food} τροφή και ${as(n).reeds} καλάμια.`,"warning");return}n.model.setTier(n.tier),this.audio.play?.("levelup"),this.ui.toast(`${n.name}: προαγωγή σε βαθμίδα ${n.tier}.`,"success")}else if(e==="guard"){const i=this.nearestHome(18)||this.ownedCamps().sort((r,a)=>Ft(r,n)-Ft(a,n))[0];if(!i){this.ui.toast("Χτίσε πρώτα ένα καταφύγιο.","warning");return}n.guard=!0,n.home=i.id,n.brain=0,this.ui.toast(`${n.name} αναλαμβάνει φρουρά στο ${i.name}.`)}else n.guard=!1,n.brain=0,this.ui.toast(`${n.name} επιστρέφει στην ομάδα.`);this.updateUI(ai(this.elapsed)),this.ui.renderPanel?.(!0),this.save()}}openPanel(t){if(this.ui.panel===t){this.ui.closePanels(),this.paused=!1,this.input.lock();return}this.updateUI(ai(this.elapsed)),this.ui.showPanel(t),this.ignoreUnlockUntil=performance.now()+500,this.input.unlock()}onAction(t,e={}){t==="build"?this.build(e.type):t==="frog-command"?this.frogCommand(e.id,e.command):t==="gang-command"?this.gangCommand(e.command):t==="consume"?this.consume():t==="save"?(this.save(),this.ui.toast("Η πρόοδος αποθηκεύτηκε σε αυτόν τον browser.","success")):t==="restart"?(this.ui.hideMenus(),this.start("new")):t==="pause"?this.pause():t==="panel-open"?this.openPanel(e.name):t==="recruit"?this.interact():t==="cycle-view"&&Kc(this)}objective(){if(this.hunt&&!this.hunt.dead)return ih(this.hunt);if(!this.ownedCamps().length)return this.player.stomach<85?"Κυνήγησε μύγες, τάισε τη συμμορία και βρες μια ασφαλή νησίδα.":"Το στομάχι σου γέμισε. Πήγαινε στη νησίδα κοντά στην αρχή και πάτησε V για καταφύγιο.";const t=this.ownedCamps().find(n=>this.frogs.some(i=>i.raidTarget===n.id&&!i.dead&&!i.surrendered));if(t)return`Υπερασπίσου το ${t.name} από την επιδρομή.`;const e=this.camps.filter(n=>n.originalEnemy&&!n.destroyed&&n.team!=="ally").length;return e?`Ένωσε τον ποταμό: κατάστρεψε ή πείσε τις ${e} αντίπαλες συμμορίες.`:"Ο ποταμός είναι δικός σου. Εξερεύνησε, επέκτεινε και κράτησε τη συμμορία ασφαλή."}updateUI(t){const e=this.player,n=this.nearestHome(),i=this.allies(),r=this.camps.filter(c=>c.originalEnemy),a=r.filter(c=>c.destroyed||c.team==="ally").length,o=this.hunt&&!this.hunt.dead?{...this.hunt,objective:ih(this.hunt)}:null,l=i.map(c=>({id:c.id,name:c.name,hp:c.hp,maxHp:c.maxHp,stomach:c.stomach,maxStomach:100,level:c.level,tier:c.tier,role:c.role,guard:c.guard,canPromote:sl(c,this.resources),promoteCost:as(c).food}));this.ui.update({player:{hp:e.hp,maxHp:e.maxHp,stamina:e.stamina,maxStamina:100,stomach:e.stomach,maxStomach:100,level:e.level,xp:e.xp,nextXp:il(e.level),tier:e.tier},resources:this.resources,allies:l,camps:this.camps,predator:o,objective:this.objective(),objectiveProgress:`${a} / ${r.length} περιοχές`,hint:e.grabbedBy?"ΠΑΓΙΔΕΥΤΗΚΕΣ · Πάτα Q / Space / R για να παλέψεις και κάλεσε βοήθεια!":this.context().hint,timeLabel:t.timeLabel,day:t.day,night:t.night,world:{radius:110,player:{x:e.x,z:e.z,yaw:e.yaw},platforms:this.world.platforms,hotspots:this.world.hotspots,camps:[...this.camps,...this.world.campSites.filter(c=>!this.camps.some(h=>Ft(h,c)<8)).map(c=>({...c,team:"neutral"}))],enemies:this.frogs.filter(c=>c.team.startsWith("enemy")&&!c.dead),allies:i,predators:this.predators.map(c=>({x:c.x,z:c.z,hp:c.hp,dead:c.dead,hunting:c===this.hunt}))},stats:this.stats,fps:Math.round(this.fps),paused:this.paused,inCamp:!!n,currentCamp:n,currentCampId:n?.id,campName:n?.name,buildOptions:this.buildOptions(),squadMode:this.command,gangCount:i.length+1,savedAt:this.savedAt,aiming:!!this.aimTarget,viewMode:this.viewMode,mouse:this.input.mouse,locationName:n?.name||"Ο Μεγάλος Ποταμός"})}updateModels(t){for(const e of this.frogs){e.attackAnim=Math.max(0,(e.attackAnim||0)-t),e.roarAnim=Math.max(0,(e.roarAnim||0)-t),e.hitAnim=Math.max(0,(e.hitAnim||0)-t),e.model.group.position.set(e.x,e.y,e.z),e.model.group.rotation.y=e.yaw;const n=Ft(e,this.player)<80;e.model.group.visible=n&&!(e===this.player&&this.hidePlayer)&&(!e.dead||(e.deadTime||0)<5),n&&(e.model.update(t,{time:this.elapsed+e.seed*.31,speed:this.paused?0:e.speed,swimming:e.swimming,jump:e.grounded?0:Gt(.5+e.vy/20,0,1),attack:e.attackAnim>0?{type:e.attackType||"tongue",phase:1-e.attackAnim/(e.attackDuration||.4)}:0,roar:e.roarAnim/1.25,hit:e.hitAnim/.34,dead:e.dead}),e.surrendered&&e.model.setOutline(wn.surrender,!0))}for(const e of this.predators)e.attackAnim=Math.max(0,(e.attackAnim||0)-t),e.hitAnim=Math.max(0,(e.hitAnim||0)-t),e.model.group.position.set(e.x,e.y,e.z),e.model.group.rotation.y=e.yaw,e.model.group.visible=e.phase!=="dormant"&&Ft(e,this.player)<100&&(!e.dead||e.phaseTime<4),e.model.update(t,{time:this.elapsed,speed:e.phase==="patrol"?1:e.phase==="stalk"||e.phase==="flee"?e.speed:0,swimming:e.type==="fish",attack:e.attackAnim>0?{type:e.attackType||"lunge",phase:1-e.attackAnim/(e.attackDuration||.65)}:0,hit:e.hitAnim/.35,dead:e.dead});this.shake=Math.max(0,this.shake-t*1.8)}drawLabels(){const t=this.labelCtx,e=this.labels.width,n=this.labels.height;if(t.clearRect(0,0,e,n),!this.started||this.ui.isBlocking())return;const i=new Te;t.textAlign="center";for(const r of this.frogs){if(r===this.player||r.dead||Ft(r,this.player)>22||(i.set(r.x,r.y+1.7,r.z).project(this.camera),i.z<0||i.z>1||Math.abs(i.x)>1.1||Math.abs(i.y)>1.1))continue;const a=(i.x*.5+.5)*e,o=(-i.y*.5+.5)*n,l=r.team==="ally"?43:47;if(t.fillStyle="rgba(8,23,20,.72)",t.fillRect(a-l/2-1,o-1,l+2,6),t.fillStyle=r.surrendered?"#f0d18b":r.team==="ally"?"#87dba9":r.team==="neutral"?"#e0cd85":"#e58e78",t.fillRect(a-l/2,o,l*r.hp/r.maxHp,4),Ft(r,this.player)<11||this.aimTarget?.entity===r){t.font="600 10px system-ui",t.lineWidth=3,t.strokeStyle="#14251f";const c=`${r.surrendered?"◇ ":""}${r.name} · ${r.level}`;t.strokeText(c,a,o-7),t.fillStyle="#eef1d9",t.fillText(c,a,o-7)}}}makePortraits(){const t={},n=new Kn(192,192),i=new Uint8Array(36864*4),r=document.createElement("canvas");r.width=192,r.height=192;const a=r.getContext("2d");for(const o of["frog","heron","snake","fish"]){const l=new Ql;l.background=new $t("#18332d"),l.environment=this.environment.texture,l.environmentIntensity=.5,l.add(new fc(15005923,2702891,2.5));const c=new Va(16772552,4);c.position.set(4,6,5),l.add(c);const h=io(o,{color:o==="frog"?7447366:void 0,seed:21});h.setOutline(16777215,!1),l.add(h.group),h.update(0,{time:0,speed:0}),h.group.updateMatrixWorld(!0);const u=new Zn().setFromObject(h.group),d=u.getCenter(new Te),p=u.getSize(new Te),m=Math.max(p.x,p.y,p.z),v=new tn(36,1,.05,100);v.position.copy(d).add(new Te(m*.95,m*.47,m*1.6)),v.lookAt(d),v.updateMatrixWorld(!0),this.renderer.setRenderTarget(n),this.renderer.render(l,v),this.renderer.readRenderTargetPixels(n,0,0,192,192,i);const g=a.createImageData(192,192);for(let f=0;f<192;f++)g.data.set(i.subarray(f*192*4,(f+1)*192*4),(191-f)*192*4);a.putImageData(g,0,0),t[o]=r.toDataURL("image/png"),h.dispose?.()}this.renderer.setRenderTarget(null),n.dispose(),this.ui.setPortraits(t),this.portraits=t}checkVictory(){!this.won&&vv(this.camps)&&(this.won=!0,this.paused=!0,this.ended=!0,this.input.unlock(),this.audio.play?.("victory"),this.ui.showEnding(!0,{...this.stats,days:ai(this.elapsed).day}),this.save())}respawn(){const t=this.ownedCamps()[0];if(!t){this.ended=!0,this.paused=!0,this.ui.showEnding(!1,{...this.stats,days:ai(this.elapsed).day}),this.input.unlock();return}const e=this.player;e.grabbedBy&&ys(this,e.grabbedBy),e.dead=!1,e.hp=e.maxHp*.65,e.stomach=Math.max(e.stomach,35),e.stamina=100,e.x=t.x+3,e.z=t.z,e.y=this.world.sampleHeight(e.x,e.z),e.grounded=!0,e.vy=0,e.invulnerable=6,this.graceUntil=this.elapsed+20,this.resources.food=Math.floor(this.resources.food*.8),this.resources.reeds=Math.floor(this.resources.reeds*.85),this.hunt=null,this.deathTimer=0,e.model.setOutline(wn.player,!0),this.ui.toast("Επέστρεψες στο καταφύγιο, με απώλεια μέρους των πόρων.","warning"),this.save()}readSave(){try{return xv(JSON.parse(localStorage.getItem(Zc)||"null"))}catch{return null}}save(){if(!this.started||this.player.dead)return!1;const t=n=>Object.fromEntries(Lv.map(i=>[i,n[i]])),e={version:Wh,elapsed:this.elapsed,resources:{...this.resources},stats:{...this.stats},player:t(this.player),frogs:this.frogs.filter(n=>n!==this.player&&!n.dead).map(t),camps:this.camps.map(n=>({id:n.id,x:n.x,z:n.z,name:n.name,team:n.team,tier:n.tier,hp:n.hp,maxHp:n.maxHp,stock:n.stock,buildings:n.buildings,originalEnemy:n.originalEnemy,destroyed:n.destroyed,lootTaken:n.lootTaken,morale:n.morale,spawnTimer:n.spawnTimer,mealCount:n.mealCount,mealDay:n.mealDay})),hotspots:this.world.hotspots.map(n=>({id:n.id,flies:n.flies})),idCounter:this.idCounter,won:this.won};try{return localStorage.setItem(Zc,JSON.stringify(e)),this.savedAt=Date.now(),!0}catch{return this.saveWarn||(this.ui.toast("Η αποθήκευση του browser είναι γεμάτη ή απενεργοποιημένη.","warning"),this.saveWarn=!0),!1}}inspect(){return{version:"1.0.0",started:this.started,paused:this.paused,ended:this.ended,view:this.viewMode,elapsed:Math.round(this.elapsed),player:{x:this.player.x,y:this.player.y,z:this.player.z,hp:this.player.hp,stomach:this.player.stomach,level:this.player.level,grounded:this.player.grounded,swimming:this.player.swimming},frogs:this.frogs.length,allies:this.allies().length,camps:this.camps.map(t=>({name:t.name,team:t.team,hp:t.hp,destroyed:t.destroyed})),predators:this.predators.map(t=>({type:t.type,phase:t.phase,hp:t.hp,x:t.x,z:t.z})),hunt:this.hunt?.type,resources:this.resources,objective:this.objective(),performance:{fps:Math.round(this.fps),drawCalls:this.renderer.info.render.calls,triangles:this.renderer.info.render.triangles,geometries:this.renderer.info.memory.geometries,textures:this.renderer.info.memory.textures},rigs:this.frogs[0].model.stats}}}function Tl(s){if(console.error(s),document.getElementById("boot")){const e=document.getElementById("boot-error");e.textContent=`Δεν μπόρεσε να ξεκινήσει ο 3D κόσμος. Ενεργοποίησε το hardware acceleration στον browser και κάνε ανανέωση.
`+(s?.message||String(s))}}addEventListener("error",s=>Tl(s.error||s.message));addEventListener("unhandledrejection",s=>Tl(s.reason));requestAnimationFrame(()=>{try{window.frogGame=new Iv}catch(s){Tl(s)}});
