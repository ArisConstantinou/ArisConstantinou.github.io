(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Il="180",ju=0,mc=1,Ku=2,qh=1,Ju=2,di=3,_i=0,Sn=1,$e=2,Oi=0,Hs=1,gc=2,xc=3,_c=4,Qu=5,es=100,td=101,ed=102,nd=103,id=104,sd=200,rd=201,od=202,ad=203,Fa=204,Oa=205,ld=206,cd=207,hd=208,ud=209,dd=210,fd=211,pd=212,md=213,gd=214,ka=0,Ba=1,Ha=2,Ws=3,Ga=4,Va=5,Wa=6,Xa=7,Yh=0,xd=1,_d=2,ki=0,vd=1,Md=2,yd=3,$h=4,Sd=5,bd=6,wd=7,vc="attached",Ed="detached",Zh=300,Xs=301,qs=302,qa=303,Ya=304,Ro=306,Ys=1e3,zi=1001,$a=1002,In=1003,Td=1004,zr=1005,Xn=1006,Ho=1007,Ni=1008,ei=1009,jh=1010,Kh=1011,yr=1012,Ul=1013,os=1014,qn=1015,Rr=1016,zl=1017,Nl=1018,Sr=1020,Jh=35902,Qh=35899,tu=1021,eu=1022,Ln=1023,br=1026,wr=1027,Fl=1028,Ol=1029,nu=1030,kl=1031,Bl=1033,po=33776,mo=33777,go=33778,xo=33779,Za=35840,ja=35841,Ka=35842,Ja=35843,Qa=36196,tl=37492,el=37496,nl=37808,il=37809,sl=37810,rl=37811,ol=37812,al=37813,ll=37814,cl=37815,hl=37816,ul=37817,dl=37818,fl=37819,pl=37820,ml=37821,gl=36492,xl=36494,_l=36495,vl=36283,Ml=36284,yl=36285,Sl=36286,Ad=3200,Rd=3201,iu=0,Cd=1,mi="",wn="srgb",$s="srgb-linear",Mo="linear",ke="srgb",vs=7680,Mc=519,Pd=512,Dd=513,Ld=514,su=515,Id=516,Ud=517,zd=518,Nd=519,yc=35044,Ui=35048,Sc="300 es",ti=2e3,yo=2001;class js{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const s=n[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const mn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let bc=1234567;const xr=Math.PI/180,Er=180/Math.PI;function hs(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(mn[i&255]+mn[i>>8&255]+mn[i>>16&255]+mn[i>>24&255]+"-"+mn[t&255]+mn[t>>8&255]+"-"+mn[t>>16&15|64]+mn[t>>24&255]+"-"+mn[e&63|128]+mn[e>>8&255]+"-"+mn[e>>16&255]+mn[e>>24&255]+mn[n&255]+mn[n>>8&255]+mn[n>>16&255]+mn[n>>24&255]).toLowerCase()}function Me(i,t,e){return Math.max(t,Math.min(e,i))}function Hl(i,t){return(i%t+t)%t}function Fd(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Od(i,t,e){return i!==t?(e-i)/(t-i):0}function _r(i,t,e){return(1-e)*i+e*t}function kd(i,t,e,n){return _r(i,t,1-Math.exp(-e*n))}function Bd(i,t=1){return t-Math.abs(Hl(i,t*2)-t)}function Hd(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Gd(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Vd(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Wd(i,t){return i+Math.random()*(t-i)}function Xd(i){return i*(.5-Math.random())}function qd(i){i!==void 0&&(bc=i);let t=bc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Yd(i){return i*xr}function $d(i){return i*Er}function Zd(i){return(i&i-1)===0&&i!==0}function jd(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Kd(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Jd(i,t,e,n,s){const r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+n)/2),h=o((t+n)/2),u=r((t-n)/2),p=o((t-n)/2),f=r((n-t)/2),x=o((n-t)/2);switch(s){case"XYX":i.set(a*h,l*u,l*p,a*c);break;case"YZY":i.set(l*p,a*h,l*u,a*c);break;case"ZXZ":i.set(l*u,l*p,a*h,a*c);break;case"XZX":i.set(a*h,l*x,l*f,a*c);break;case"YXY":i.set(l*f,a*h,l*x,a*c);break;case"ZYZ":i.set(l*x,l*f,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Ns(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function vn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const bl={DEG2RAD:xr,RAD2DEG:Er,generateUUID:hs,clamp:Me,euclideanModulo:Hl,mapLinear:Fd,inverseLerp:Od,lerp:_r,damp:kd,pingpong:Bd,smoothstep:Hd,smootherstep:Gd,randInt:Vd,randFloat:Wd,randFloatSpread:Xd,seededRandom:qd,degToRad:Yd,radToDeg:$d,isPowerOfTwo:Zd,ceilPowerOfTwo:jd,floorPowerOfTwo:Kd,setQuaternionFromProperEuler:Jd,normalize:vn,denormalize:Ns};class Gt{constructor(t=0,e=0){Gt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Me(this.x,t.x,e.x),this.y=Me(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Me(this.x,t,e),this.y=Me(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Me(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Me(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class as{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3];const p=r[o+0],f=r[o+1],x=r[o+2],g=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=p,t[e+1]=f,t[e+2]=x,t[e+3]=g;return}if(u!==g||l!==p||c!==f||h!==x){let m=1-a;const d=l*p+c*f+h*x+u*g,S=d>=0?1:-1,b=1-d*d;if(b>Number.EPSILON){const C=Math.sqrt(b),R=Math.atan2(C,d*S);m=Math.sin(m*R)/C,a=Math.sin(a*R)/C}const v=a*S;if(l=l*m+p*v,c=c*m+f*v,h=h*m+x*v,u=u*m+g*v,m===1-a){const C=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=C,c*=C,h*=C,u*=C}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,o){const a=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[o],p=r[o+1],f=r[o+2],x=r[o+3];return t[e]=a*x+h*u+l*f-c*p,t[e+1]=l*x+h*p+c*u-a*f,t[e+2]=c*x+h*f+a*p-l*u,t[e+3]=h*x-a*u-l*p-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(s/2),u=a(r/2),p=l(n/2),f=l(s/2),x=l(r/2);switch(o){case"XYZ":this._x=p*h*u+c*f*x,this._y=c*f*u-p*h*x,this._z=c*h*x+p*f*u,this._w=c*h*u-p*f*x;break;case"YXZ":this._x=p*h*u+c*f*x,this._y=c*f*u-p*h*x,this._z=c*h*x-p*f*u,this._w=c*h*u+p*f*x;break;case"ZXY":this._x=p*h*u-c*f*x,this._y=c*f*u+p*h*x,this._z=c*h*x+p*f*u,this._w=c*h*u-p*f*x;break;case"ZYX":this._x=p*h*u-c*f*x,this._y=c*f*u+p*h*x,this._z=c*h*x-p*f*u,this._w=c*h*u+p*f*x;break;case"YZX":this._x=p*h*u+c*f*x,this._y=c*f*u+p*h*x,this._z=c*h*x-p*f*u,this._w=c*h*u-p*f*x;break;case"XZY":this._x=p*h*u-c*f*x,this._y=c*f*u-p*h*x,this._z=c*h*x+p*f*u,this._w=c*h*u+p*f*x;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],p=n+a+u;if(p>0){const f=.5/Math.sqrt(p+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-s)*f}else if(n>a&&n>u){const f=2*Math.sqrt(1+n-a-u);this._w=(h-l)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+c)/f}else if(a>u){const f=2*Math.sqrt(1+a-n-u);this._w=(r-c)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-n-a);this._w=(o-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Me(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-s*a,this._w=o*h-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-e)*h)/c,p=Math.sin(e*h)/c;return this._w=o*u+this._w*p,this._x=n*u+this._x*p,this._y=s*u+this._y*p,this._z=r*u+this._z*p,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class U{constructor(t=0,e=0,n=0){U.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(wc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(wc.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*n),h=2*(a*e-r*s),u=2*(r*n-o*e);return this.x=e+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=s+l*u+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Me(this.x,t.x,e.x),this.y=Me(this.y,t.y,e.y),this.z=Me(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Me(this.x,t,e),this.y=Me(this.y,t,e),this.z=Me(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Me(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Go.copy(this).projectOnVector(t),this.sub(Go)}reflect(t){return this.sub(Go.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Me(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Go=new U,wc=new as;class me{constructor(t,e,n,s,r,o,a,l,c){me.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c)}set(t,e,n,s,r,o,a,l,c){const h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],p=n[2],f=n[5],x=n[8],g=s[0],m=s[3],d=s[6],S=s[1],b=s[4],v=s[7],C=s[2],R=s[5],T=s[8];return r[0]=o*g+a*S+l*C,r[3]=o*m+a*b+l*R,r[6]=o*d+a*v+l*T,r[1]=c*g+h*S+u*C,r[4]=c*m+h*b+u*R,r[7]=c*d+h*v+u*T,r[2]=p*g+f*S+x*C,r[5]=p*m+f*b+x*R,r[8]=p*d+f*v+x*T,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*r*h+n*a*l+s*r*c-s*o*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,p=a*l-h*r,f=c*r-o*l,x=e*u+n*p+s*f;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/x;return t[0]=u*g,t[1]=(s*c-h*n)*g,t[2]=(a*n-s*o)*g,t[3]=p*g,t[4]=(h*e-s*l)*g,t[5]=(s*r-a*e)*g,t[6]=f*g,t[7]=(n*l-c*e)*g,t[8]=(o*e-n*r)*g,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Vo.makeScale(t,e)),this}rotate(t){return this.premultiply(Vo.makeRotation(-t)),this}translate(t,e){return this.premultiply(Vo.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Vo=new me;function ru(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function So(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Qd(){const i=So("canvas");return i.style.display="block",i}const Ec={};function Tr(i){i in Ec||(Ec[i]=!0,console.warn(i))}function tf(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const Tc=new me().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ac=new me().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function ef(){const i={enabled:!0,workingColorSpace:$s,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===ke&&(s.r=gi(s.r),s.g=gi(s.g),s.b=gi(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===ke&&(s.r=Gs(s.r),s.g=Gs(s.g),s.b=Gs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===mi?Mo:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Tr("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Tr("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[$s]:{primaries:t,whitePoint:n,transfer:Mo,toXYZ:Tc,fromXYZ:Ac,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:wn},outputColorSpaceConfig:{drawingBufferColorSpace:wn}},[wn]:{primaries:t,whitePoint:n,transfer:ke,toXYZ:Tc,fromXYZ:Ac,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:wn}}}),i}const Le=ef();function gi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Gs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Ms;class nf{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Ms===void 0&&(Ms=So("canvas")),Ms.width=t.width,Ms.height=t.height;const s=Ms.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=Ms}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=So("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=gi(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(gi(e[n]/255)*255):e[n]=gi(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let sf=0;class Gl{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:sf++}),this.uuid=hs(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Wo(s[o].image)):r.push(Wo(s[o]))}else r=Wo(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function Wo(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?nf.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let rf=0;const Xo=new U;class xn extends js{constructor(t=xn.DEFAULT_IMAGE,e=xn.DEFAULT_MAPPING,n=zi,s=zi,r=Xn,o=Ni,a=Ln,l=ei,c=xn.DEFAULT_ANISOTROPY,h=mi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:rf++}),this.uuid=hs(),this.name="",this.source=new Gl(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Gt(0,0),this.repeat=new Gt(1,1),this.center=new Gt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new me,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Xo).x}get height(){return this.source.getSize(Xo).y}get depth(){return this.source.getSize(Xo).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Zh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ys:t.x=t.x-Math.floor(t.x);break;case zi:t.x=t.x<0?0:1;break;case $a:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ys:t.y=t.y-Math.floor(t.y);break;case zi:t.y=t.y<0?0:1;break;case $a:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}xn.DEFAULT_IMAGE=null;xn.DEFAULT_MAPPING=Zh;xn.DEFAULT_ANISOTROPY=1;class Pe{constructor(t=0,e=0,n=0,s=1){Pe.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const l=t.elements,c=l[0],h=l[4],u=l[8],p=l[1],f=l[5],x=l[9],g=l[2],m=l[6],d=l[10];if(Math.abs(h-p)<.01&&Math.abs(u-g)<.01&&Math.abs(x-m)<.01){if(Math.abs(h+p)<.1&&Math.abs(u+g)<.1&&Math.abs(x+m)<.1&&Math.abs(c+f+d-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const b=(c+1)/2,v=(f+1)/2,C=(d+1)/2,R=(h+p)/4,T=(u+g)/4,A=(x+m)/4;return b>v&&b>C?b<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(b),s=R/n,r=T/n):v>C?v<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),n=R/s,r=A/s):C<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(C),n=T/r,s=A/r),this.set(n,s,r,e),this}let S=Math.sqrt((m-x)*(m-x)+(u-g)*(u-g)+(p-h)*(p-h));return Math.abs(S)<.001&&(S=1),this.x=(m-x)/S,this.y=(u-g)/S,this.z=(p-h)/S,this.w=Math.acos((c+f+d-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Me(this.x,t.x,e.x),this.y=Me(this.y,t.y,e.y),this.z=Me(this.z,t.z,e.z),this.w=Me(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Me(this.x,t,e),this.y=Me(this.y,t,e),this.z=Me(this.z,t,e),this.w=Me(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Me(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class of extends js{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Xn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Pe(0,0,t,e),this.scissorTest=!1,this.viewport=new Pe(0,0,t,e);const s={width:t,height:e,depth:n.depth},r=new xn(s);this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){const e={minFilter:Xn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new Gl(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Bi extends of{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class ou extends xn{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=In,this.minFilter=In,this.wrapR=zi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class af extends xn{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=In,this.minFilter=In,this.wrapR=zi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ni{constructor(t=new U(1/0,1/0,1/0),e=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(On.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(On.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=On.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,On):On.fromBufferAttribute(r,o),On.applyMatrix4(t.matrixWorld),this.expandByPoint(On);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Nr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Nr.copy(n.boundingBox)),Nr.applyMatrix4(t.matrixWorld),this.union(Nr)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,On),On.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(or),Fr.subVectors(this.max,or),ys.subVectors(t.a,or),Ss.subVectors(t.b,or),bs.subVectors(t.c,or),wi.subVectors(Ss,ys),Ei.subVectors(bs,Ss),qi.subVectors(ys,bs);let e=[0,-wi.z,wi.y,0,-Ei.z,Ei.y,0,-qi.z,qi.y,wi.z,0,-wi.x,Ei.z,0,-Ei.x,qi.z,0,-qi.x,-wi.y,wi.x,0,-Ei.y,Ei.x,0,-qi.y,qi.x,0];return!qo(e,ys,Ss,bs,Fr)||(e=[1,0,0,0,1,0,0,0,1],!qo(e,ys,Ss,bs,Fr))?!1:(Or.crossVectors(wi,Ei),e=[Or.x,Or.y,Or.z],qo(e,ys,Ss,bs,Fr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,On).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(On).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(oi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),oi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),oi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),oi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),oi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),oi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),oi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),oi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(oi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const oi=[new U,new U,new U,new U,new U,new U,new U,new U],On=new U,Nr=new ni,ys=new U,Ss=new U,bs=new U,wi=new U,Ei=new U,qi=new U,or=new U,Fr=new U,Or=new U,Yi=new U;function qo(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Yi.fromArray(i,r);const a=s.x*Math.abs(Yi.x)+s.y*Math.abs(Yi.y)+s.z*Math.abs(Yi.z),l=t.dot(Yi),c=e.dot(Yi),h=n.dot(Yi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const lf=new ni,ar=new U,Yo=new U;class vi{constructor(t=new U,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):lf.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ar.subVectors(t,this.center);const e=ar.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(ar,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Yo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ar.copy(t.center).add(Yo)),this.expandByPoint(ar.copy(t.center).sub(Yo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const ai=new U,$o=new U,kr=new U,Ti=new U,Zo=new U,Br=new U,jo=new U;class Cr{constructor(t=new U,e=new U(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,ai)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=ai.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(ai.copy(this.origin).addScaledVector(this.direction,e),ai.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){$o.copy(t).add(e).multiplyScalar(.5),kr.copy(e).sub(t).normalize(),Ti.copy(this.origin).sub($o);const r=t.distanceTo(e)*.5,o=-this.direction.dot(kr),a=Ti.dot(this.direction),l=-Ti.dot(kr),c=Ti.lengthSq(),h=Math.abs(1-o*o);let u,p,f,x;if(h>0)if(u=o*l-a,p=o*a-l,x=r*h,u>=0)if(p>=-x)if(p<=x){const g=1/h;u*=g,p*=g,f=u*(u+o*p+2*a)+p*(o*u+p+2*l)+c}else p=r,u=Math.max(0,-(o*p+a)),f=-u*u+p*(p+2*l)+c;else p=-r,u=Math.max(0,-(o*p+a)),f=-u*u+p*(p+2*l)+c;else p<=-x?(u=Math.max(0,-(-o*r+a)),p=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+p*(p+2*l)+c):p<=x?(u=0,p=Math.min(Math.max(-r,-l),r),f=p*(p+2*l)+c):(u=Math.max(0,-(o*r+a)),p=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+p*(p+2*l)+c);else p=o>0?-r:r,u=Math.max(0,-(o*p+a)),f=-u*u+p*(p+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy($o).addScaledVector(kr,p),f}intersectSphere(t,e){ai.subVectors(t.center,this.origin);const n=ai.dot(this.direction),s=ai.dot(ai)-n*n,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,p=this.origin;return c>=0?(n=(t.min.x-p.x)*c,s=(t.max.x-p.x)*c):(n=(t.max.x-p.x)*c,s=(t.min.x-p.x)*c),h>=0?(r=(t.min.y-p.y)*h,o=(t.max.y-p.y)*h):(r=(t.max.y-p.y)*h,o=(t.min.y-p.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-p.z)*u,l=(t.max.z-p.z)*u):(a=(t.max.z-p.z)*u,l=(t.min.z-p.z)*u),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,ai)!==null}intersectTriangle(t,e,n,s,r){Zo.subVectors(e,t),Br.subVectors(n,t),jo.crossVectors(Zo,Br);let o=this.direction.dot(jo),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Ti.subVectors(this.origin,t);const l=a*this.direction.dot(Br.crossVectors(Ti,Br));if(l<0)return null;const c=a*this.direction.dot(Zo.cross(Ti));if(c<0||l+c>o)return null;const h=-a*Ti.dot(jo);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class le{constructor(t,e,n,s,r,o,a,l,c,h,u,p,f,x,g,m){le.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c,h,u,p,f,x,g,m)}set(t,e,n,s,r,o,a,l,c,h,u,p,f,x,g,m){const d=this.elements;return d[0]=t,d[4]=e,d[8]=n,d[12]=s,d[1]=r,d[5]=o,d[9]=a,d[13]=l,d[2]=c,d[6]=h,d[10]=u,d[14]=p,d[3]=f,d[7]=x,d[11]=g,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new le().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/ws.setFromMatrixColumn(t,0).length(),r=1/ws.setFromMatrixColumn(t,1).length(),o=1/ws.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const p=o*h,f=o*u,x=a*h,g=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=f+x*c,e[5]=p-g*c,e[9]=-a*l,e[2]=g-p*c,e[6]=x+f*c,e[10]=o*l}else if(t.order==="YXZ"){const p=l*h,f=l*u,x=c*h,g=c*u;e[0]=p+g*a,e[4]=x*a-f,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=f*a-x,e[6]=g+p*a,e[10]=o*l}else if(t.order==="ZXY"){const p=l*h,f=l*u,x=c*h,g=c*u;e[0]=p-g*a,e[4]=-o*u,e[8]=x+f*a,e[1]=f+x*a,e[5]=o*h,e[9]=g-p*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const p=o*h,f=o*u,x=a*h,g=a*u;e[0]=l*h,e[4]=x*c-f,e[8]=p*c+g,e[1]=l*u,e[5]=g*c+p,e[9]=f*c-x,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const p=o*l,f=o*c,x=a*l,g=a*c;e[0]=l*h,e[4]=g-p*u,e[8]=x*u+f,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=f*u+x,e[10]=p-g*u}else if(t.order==="XZY"){const p=o*l,f=o*c,x=a*l,g=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=p*u+g,e[5]=o*h,e[9]=f*u-x,e[2]=x*u-f,e[6]=a*h,e[10]=g*u+p}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(cf,t,hf)}lookAt(t,e,n){const s=this.elements;return An.subVectors(t,e),An.lengthSq()===0&&(An.z=1),An.normalize(),Ai.crossVectors(n,An),Ai.lengthSq()===0&&(Math.abs(n.z)===1?An.x+=1e-4:An.z+=1e-4,An.normalize(),Ai.crossVectors(n,An)),Ai.normalize(),Hr.crossVectors(An,Ai),s[0]=Ai.x,s[4]=Hr.x,s[8]=An.x,s[1]=Ai.y,s[5]=Hr.y,s[9]=An.y,s[2]=Ai.z,s[6]=Hr.z,s[10]=An.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],p=n[9],f=n[13],x=n[2],g=n[6],m=n[10],d=n[14],S=n[3],b=n[7],v=n[11],C=n[15],R=s[0],T=s[4],A=s[8],y=s[12],M=s[1],I=s[5],N=s[9],X=s[13],J=s[2],B=s[6],W=s[10],Q=s[14],Y=s[3],ct=s[7],j=s[11],Mt=s[15];return r[0]=o*R+a*M+l*J+c*Y,r[4]=o*T+a*I+l*B+c*ct,r[8]=o*A+a*N+l*W+c*j,r[12]=o*y+a*X+l*Q+c*Mt,r[1]=h*R+u*M+p*J+f*Y,r[5]=h*T+u*I+p*B+f*ct,r[9]=h*A+u*N+p*W+f*j,r[13]=h*y+u*X+p*Q+f*Mt,r[2]=x*R+g*M+m*J+d*Y,r[6]=x*T+g*I+m*B+d*ct,r[10]=x*A+g*N+m*W+d*j,r[14]=x*y+g*X+m*Q+d*Mt,r[3]=S*R+b*M+v*J+C*Y,r[7]=S*T+b*I+v*B+C*ct,r[11]=S*A+b*N+v*W+C*j,r[15]=S*y+b*X+v*Q+C*Mt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],p=t[10],f=t[14],x=t[3],g=t[7],m=t[11],d=t[15];return x*(+r*l*u-s*c*u-r*a*p+n*c*p+s*a*f-n*l*f)+g*(+e*l*f-e*c*p+r*o*p-s*o*f+s*c*h-r*l*h)+m*(+e*c*u-e*a*f-r*o*u+n*o*f+r*a*h-n*c*h)+d*(-s*a*h-e*l*u+e*a*p+s*o*u-n*o*p+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],p=t[10],f=t[11],x=t[12],g=t[13],m=t[14],d=t[15],S=u*m*c-g*p*c+g*l*f-a*m*f-u*l*d+a*p*d,b=x*p*c-h*m*c-x*l*f+o*m*f+h*l*d-o*p*d,v=h*g*c-x*u*c+x*a*f-o*g*f-h*a*d+o*u*d,C=x*u*l-h*g*l-x*a*p+o*g*p+h*a*m-o*u*m,R=e*S+n*b+s*v+r*C;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/R;return t[0]=S*T,t[1]=(g*p*r-u*m*r-g*s*f+n*m*f+u*s*d-n*p*d)*T,t[2]=(a*m*r-g*l*r+g*s*c-n*m*c-a*s*d+n*l*d)*T,t[3]=(u*l*r-a*p*r-u*s*c+n*p*c+a*s*f-n*l*f)*T,t[4]=b*T,t[5]=(h*m*r-x*p*r+x*s*f-e*m*f-h*s*d+e*p*d)*T,t[6]=(x*l*r-o*m*r-x*s*c+e*m*c+o*s*d-e*l*d)*T,t[7]=(o*p*r-h*l*r+h*s*c-e*p*c-o*s*f+e*l*f)*T,t[8]=v*T,t[9]=(x*u*r-h*g*r-x*n*f+e*g*f+h*n*d-e*u*d)*T,t[10]=(o*g*r-x*a*r+x*n*c-e*g*c-o*n*d+e*a*d)*T,t[11]=(h*a*r-o*u*r-h*n*c+e*u*c+o*n*f-e*a*f)*T,t[12]=C*T,t[13]=(h*g*s-x*u*s+x*n*p-e*g*p-h*n*m+e*u*m)*T,t[14]=(x*a*s-o*g*s-x*n*l+e*g*l+o*n*m-e*a*m)*T,t[15]=(o*u*s-h*a*s+h*n*l-e*u*l-o*n*p+e*a*p)*T,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+n,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,u=a+a,p=r*c,f=r*h,x=r*u,g=o*h,m=o*u,d=a*u,S=l*c,b=l*h,v=l*u,C=n.x,R=n.y,T=n.z;return s[0]=(1-(g+d))*C,s[1]=(f+v)*C,s[2]=(x-b)*C,s[3]=0,s[4]=(f-v)*R,s[5]=(1-(p+d))*R,s[6]=(m+S)*R,s[7]=0,s[8]=(x+b)*T,s[9]=(m-S)*T,s[10]=(1-(p+g))*T,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=ws.set(s[0],s[1],s[2]).length();const o=ws.set(s[4],s[5],s[6]).length(),a=ws.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],kn.copy(this);const c=1/r,h=1/o,u=1/a;return kn.elements[0]*=c,kn.elements[1]*=c,kn.elements[2]*=c,kn.elements[4]*=h,kn.elements[5]*=h,kn.elements[6]*=h,kn.elements[8]*=u,kn.elements[9]*=u,kn.elements[10]*=u,e.setFromRotationMatrix(kn),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=ti,l=!1){const c=this.elements,h=2*r/(e-t),u=2*r/(n-s),p=(e+t)/(e-t),f=(n+s)/(n-s);let x,g;if(l)x=r/(o-r),g=o*r/(o-r);else if(a===ti)x=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===yo)x=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=p,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=x,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=ti,l=!1){const c=this.elements,h=2/(e-t),u=2/(n-s),p=-(e+t)/(e-t),f=-(n+s)/(n-s);let x,g;if(l)x=1/(o-r),g=o/(o-r);else if(a===ti)x=-2/(o-r),g=-(o+r)/(o-r);else if(a===yo)x=-1/(o-r),g=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=p,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=x,c[14]=g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const ws=new U,kn=new le,cf=new U(0,0,0),hf=new U(1,1,1),Ai=new U,Hr=new U,An=new U,Rc=new le,Cc=new as;class ii{constructor(t=0,e=0,n=0,s=ii.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],u=s[2],p=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(Me(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(p,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Me(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Me(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Me(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(p,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Me(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Me(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(p,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Rc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Rc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Cc.setFromEuler(this),this.setFromQuaternion(Cc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ii.DEFAULT_ORDER="XYZ";class Vl{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let uf=0;const Pc=new U,Es=new as,li=new le,Gr=new U,lr=new U,df=new U,ff=new as,Dc=new U(1,0,0),Lc=new U(0,1,0),Ic=new U(0,0,1),Uc={type:"added"},pf={type:"removed"},Ts={type:"childadded",child:null},Ko={type:"childremoved",child:null};class Ye extends js{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:uf++}),this.uuid=hs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ye.DEFAULT_UP.clone();const t=new U,e=new ii,n=new as,s=new U(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new le},normalMatrix:{value:new me}}),this.matrix=new le,this.matrixWorld=new le,this.matrixAutoUpdate=Ye.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ye.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Vl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Es.setFromAxisAngle(t,e),this.quaternion.multiply(Es),this}rotateOnWorldAxis(t,e){return Es.setFromAxisAngle(t,e),this.quaternion.premultiply(Es),this}rotateX(t){return this.rotateOnAxis(Dc,t)}rotateY(t){return this.rotateOnAxis(Lc,t)}rotateZ(t){return this.rotateOnAxis(Ic,t)}translateOnAxis(t,e){return Pc.copy(t).applyQuaternion(this.quaternion),this.position.add(Pc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Dc,t)}translateY(t){return this.translateOnAxis(Lc,t)}translateZ(t){return this.translateOnAxis(Ic,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(li.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Gr.copy(t):Gr.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),lr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?li.lookAt(lr,Gr,this.up):li.lookAt(Gr,lr,this.up),this.quaternion.setFromRotationMatrix(li),s&&(li.extractRotation(s.matrixWorld),Es.setFromRotationMatrix(li),this.quaternion.premultiply(Es.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Uc),Ts.child=t,this.dispatchEvent(Ts),Ts.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(pf),Ko.child=t,this.dispatchEvent(Ko),Ko.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),li.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),li.multiply(t.parent.matrixWorld)),t.applyMatrix4(li),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Uc),Ts.child=t,this.dispatchEvent(Ts),Ts.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(lr,t,df),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(lr,ff,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),u=o(t.shapes),p=o(t.skeletons),f=o(t.animations),x=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),p.length>0&&(n.skeletons=p),f.length>0&&(n.animations=f),x.length>0&&(n.nodes=x)}return n.object=s,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}Ye.DEFAULT_UP=new U(0,1,0);Ye.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ye.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Bn=new U,ci=new U,Jo=new U,hi=new U,As=new U,Rs=new U,zc=new U,Qo=new U,ta=new U,ea=new U,na=new Pe,ia=new Pe,sa=new Pe;class Wn{constructor(t=new U,e=new U,n=new U){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),Bn.subVectors(t,e),s.cross(Bn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){Bn.subVectors(s,e),ci.subVectors(n,e),Jo.subVectors(t,e);const o=Bn.dot(Bn),a=Bn.dot(ci),l=Bn.dot(Jo),c=ci.dot(ci),h=ci.dot(Jo),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;const p=1/u,f=(c*l-a*h)*p,x=(o*h-a*l)*p;return r.set(1-f-x,x,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,hi)===null?!1:hi.x>=0&&hi.y>=0&&hi.x+hi.y<=1}static getInterpolation(t,e,n,s,r,o,a,l){return this.getBarycoord(t,e,n,s,hi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,hi.x),l.addScaledVector(o,hi.y),l.addScaledVector(a,hi.z),l)}static getInterpolatedAttribute(t,e,n,s,r,o){return na.setScalar(0),ia.setScalar(0),sa.setScalar(0),na.fromBufferAttribute(t,e),ia.fromBufferAttribute(t,n),sa.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(na,r.x),o.addScaledVector(ia,r.y),o.addScaledVector(sa,r.z),o}static isFrontFacing(t,e,n,s){return Bn.subVectors(n,e),ci.subVectors(t,e),Bn.cross(ci).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Bn.subVectors(this.c,this.b),ci.subVectors(this.a,this.b),Bn.cross(ci).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Wn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Wn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return Wn.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return Wn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Wn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let o,a;As.subVectors(s,n),Rs.subVectors(r,n),Qo.subVectors(t,n);const l=As.dot(Qo),c=Rs.dot(Qo);if(l<=0&&c<=0)return e.copy(n);ta.subVectors(t,s);const h=As.dot(ta),u=Rs.dot(ta);if(h>=0&&u<=h)return e.copy(s);const p=l*u-h*c;if(p<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(As,o);ea.subVectors(t,r);const f=As.dot(ea),x=Rs.dot(ea);if(x>=0&&f<=x)return e.copy(r);const g=f*c-l*x;if(g<=0&&c>=0&&x<=0)return a=c/(c-x),e.copy(n).addScaledVector(Rs,a);const m=h*x-f*u;if(m<=0&&u-h>=0&&f-x>=0)return zc.subVectors(r,s),a=(u-h)/(u-h+(f-x)),e.copy(s).addScaledVector(zc,a);const d=1/(m+g+p);return o=g*d,a=p*d,e.copy(n).addScaledVector(As,o).addScaledVector(Rs,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const au={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ri={h:0,s:0,l:0},Vr={h:0,s:0,l:0};function ra(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class se{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=wn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Le.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=Le.workingColorSpace){return this.r=t,this.g=e,this.b=n,Le.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=Le.workingColorSpace){if(t=Hl(t,1),e=Me(e,0,1),n=Me(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=ra(o,r,t+1/3),this.g=ra(o,r,t),this.b=ra(o,r,t-1/3)}return Le.colorSpaceToWorking(this,s),this}setStyle(t,e=wn){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=wn){const n=au[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=gi(t.r),this.g=gi(t.g),this.b=gi(t.b),this}copyLinearToSRGB(t){return this.r=Gs(t.r),this.g=Gs(t.g),this.b=Gs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=wn){return Le.workingToColorSpace(gn.copy(this),t),Math.round(Me(gn.r*255,0,255))*65536+Math.round(Me(gn.g*255,0,255))*256+Math.round(Me(gn.b*255,0,255))}getHexString(t=wn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Le.workingColorSpace){Le.workingToColorSpace(gn.copy(this),e);const n=gn.r,s=gn.g,r=gn.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Le.workingColorSpace){return Le.workingToColorSpace(gn.copy(this),e),t.r=gn.r,t.g=gn.g,t.b=gn.b,t}getStyle(t=wn){Le.workingToColorSpace(gn.copy(this),t);const e=gn.r,n=gn.g,s=gn.b;return t!==wn?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Ri),this.setHSL(Ri.h+t,Ri.s+e,Ri.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Ri),t.getHSL(Vr);const n=_r(Ri.h,Vr.h,e),s=_r(Ri.s,Vr.s,e),r=_r(Ri.l,Vr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const gn=new se;se.NAMES=au;let mf=0;class us extends js{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:mf++}),this.uuid=hs(),this.name="",this.type="Material",this.blending=Hs,this.side=_i,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Fa,this.blendDst=Oa,this.blendEquation=es,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new se(0,0,0),this.blendAlpha=0,this.depthFunc=Ws,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Mc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=vs,this.stencilZFail=vs,this.stencilZPass=vs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Hs&&(n.blending=this.blending),this.side!==_i&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Fa&&(n.blendSrc=this.blendSrc),this.blendDst!==Oa&&(n.blendDst=this.blendDst),this.blendEquation!==es&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ws&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Mc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==vs&&(n.stencilFail=this.stencilFail),this.stencilZFail!==vs&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==vs&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class is extends us{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new se(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ii,this.combine=Yh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Qe=new U,Wr=new Gt;let gf=0;class cn{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:gf++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=yc,this.updateRanges=[],this.gpuType=qn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Wr.fromBufferAttribute(this,e),Wr.applyMatrix3(t),this.setXY(e,Wr.x,Wr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Qe.fromBufferAttribute(this,e),Qe.applyMatrix3(t),this.setXYZ(e,Qe.x,Qe.y,Qe.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Qe.fromBufferAttribute(this,e),Qe.applyMatrix4(t),this.setXYZ(e,Qe.x,Qe.y,Qe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Qe.fromBufferAttribute(this,e),Qe.applyNormalMatrix(t),this.setXYZ(e,Qe.x,Qe.y,Qe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Qe.fromBufferAttribute(this,e),Qe.transformDirection(t),this.setXYZ(e,Qe.x,Qe.y,Qe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Ns(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=vn(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Ns(e,this.array)),e}setX(t,e){return this.normalized&&(e=vn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Ns(e,this.array)),e}setY(t,e){return this.normalized&&(e=vn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Ns(e,this.array)),e}setZ(t,e){return this.normalized&&(e=vn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Ns(e,this.array)),e}setW(t,e){return this.normalized&&(e=vn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=vn(e,this.array),n=vn(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=vn(e,this.array),n=vn(n,this.array),s=vn(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=vn(e,this.array),n=vn(n,this.array),s=vn(s,this.array),r=vn(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==yc&&(t.usage=this.usage),t}}class Wl extends cn{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class lu extends cn{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class qt extends cn{constructor(t,e,n){super(new Float32Array(t),e,n)}}let xf=0;const Un=new le,oa=new Ye,Cs=new U,Rn=new ni,cr=new ni,ln=new U;class Ce extends js{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:xf++}),this.uuid=hs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(ru(t)?lu:Wl)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new me().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Un.makeRotationFromQuaternion(t),this.applyMatrix4(Un),this}rotateX(t){return Un.makeRotationX(t),this.applyMatrix4(Un),this}rotateY(t){return Un.makeRotationY(t),this.applyMatrix4(Un),this}rotateZ(t){return Un.makeRotationZ(t),this.applyMatrix4(Un),this}translate(t,e,n){return Un.makeTranslation(t,e,n),this.applyMatrix4(Un),this}scale(t,e,n){return Un.makeScale(t,e,n),this.applyMatrix4(Un),this}lookAt(t){return oa.lookAt(t),oa.updateMatrix(),this.applyMatrix4(oa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Cs).negate(),this.translate(Cs.x,Cs.y,Cs.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new qt(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ni);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];Rn.setFromBufferAttribute(r),this.morphTargetsRelative?(ln.addVectors(this.boundingBox.min,Rn.min),this.boundingBox.expandByPoint(ln),ln.addVectors(this.boundingBox.max,Rn.max),this.boundingBox.expandByPoint(ln)):(this.boundingBox.expandByPoint(Rn.min),this.boundingBox.expandByPoint(Rn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new vi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new U,1/0);return}if(t){const n=this.boundingSphere.center;if(Rn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];cr.setFromBufferAttribute(a),this.morphTargetsRelative?(ln.addVectors(Rn.min,cr.min),Rn.expandByPoint(ln),ln.addVectors(Rn.max,cr.max),Rn.expandByPoint(ln)):(Rn.expandByPoint(cr.min),Rn.expandByPoint(cr.max))}Rn.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)ln.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(ln));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)ln.fromBufferAttribute(a,c),l&&(Cs.fromBufferAttribute(t,c),ln.add(Cs)),s=Math.max(s,n.distanceToSquared(ln))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new cn(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let A=0;A<n.count;A++)a[A]=new U,l[A]=new U;const c=new U,h=new U,u=new U,p=new Gt,f=new Gt,x=new Gt,g=new U,m=new U;function d(A,y,M){c.fromBufferAttribute(n,A),h.fromBufferAttribute(n,y),u.fromBufferAttribute(n,M),p.fromBufferAttribute(r,A),f.fromBufferAttribute(r,y),x.fromBufferAttribute(r,M),h.sub(c),u.sub(c),f.sub(p),x.sub(p);const I=1/(f.x*x.y-x.x*f.y);isFinite(I)&&(g.copy(h).multiplyScalar(x.y).addScaledVector(u,-f.y).multiplyScalar(I),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-x.x).multiplyScalar(I),a[A].add(g),a[y].add(g),a[M].add(g),l[A].add(m),l[y].add(m),l[M].add(m))}let S=this.groups;S.length===0&&(S=[{start:0,count:t.count}]);for(let A=0,y=S.length;A<y;++A){const M=S[A],I=M.start,N=M.count;for(let X=I,J=I+N;X<J;X+=3)d(t.getX(X+0),t.getX(X+1),t.getX(X+2))}const b=new U,v=new U,C=new U,R=new U;function T(A){C.fromBufferAttribute(s,A),R.copy(C);const y=a[A];b.copy(y),b.sub(C.multiplyScalar(C.dot(y))).normalize(),v.crossVectors(R,y);const I=v.dot(l[A])<0?-1:1;o.setXYZW(A,b.x,b.y,b.z,I)}for(let A=0,y=S.length;A<y;++A){const M=S[A],I=M.start,N=M.count;for(let X=I,J=I+N;X<J;X+=3)T(t.getX(X+0)),T(t.getX(X+1)),T(t.getX(X+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new cn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let p=0,f=n.count;p<f;p++)n.setXYZ(p,0,0,0);const s=new U,r=new U,o=new U,a=new U,l=new U,c=new U,h=new U,u=new U;if(t)for(let p=0,f=t.count;p<f;p+=3){const x=t.getX(p+0),g=t.getX(p+1),m=t.getX(p+2);s.fromBufferAttribute(e,x),r.fromBufferAttribute(e,g),o.fromBufferAttribute(e,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,x),l.fromBufferAttribute(n,g),c.fromBufferAttribute(n,m),a.add(h),l.add(h),c.add(h),n.setXYZ(x,a.x,a.y,a.z),n.setXYZ(g,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let p=0,f=e.count;p<f;p+=3)s.fromBufferAttribute(e,p+0),r.fromBufferAttribute(e,p+1),o.fromBufferAttribute(e,p+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(p+0,h.x,h.y,h.z),n.setXYZ(p+1,h.x,h.y,h.z),n.setXYZ(p+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)ln.fromBufferAttribute(t,e),ln.normalize(),t.setXYZ(e,ln.x,ln.y,ln.z)}toNonIndexed(){function t(a,l){const c=a.array,h=a.itemSize,u=a.normalized,p=new c.constructor(l.length*h);let f=0,x=0;for(let g=0,m=l.length;g<m;g++){a.isInterleavedBufferAttribute?f=l[g]*a.data.stride+a.offset:f=l[g]*h;for(let d=0;d<h;d++)p[x++]=c[f++]}return new cn(p,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Ce,n=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=t(l,n);e.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){const p=c[h],f=t(p,n);l.push(f)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,p=c.length;u<p;u++){const f=c[u];h.push(f.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const s=t.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],u=r[c];for(let p=0,f=u.length;p<f;p++)h.push(u[p].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Nc=new le,$i=new Cr,Xr=new vi,Fc=new U,qr=new U,Yr=new U,$r=new U,aa=new U,Zr=new U,Oc=new U,jr=new U;class ae extends Ye{constructor(t=new Ce,e=new is){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){Zr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=a[l],u=r[l];h!==0&&(aa.fromBufferAttribute(u,t),o?Zr.addScaledVector(aa,h):Zr.addScaledVector(aa.sub(e),h))}e.add(Zr)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Xr.copy(n.boundingSphere),Xr.applyMatrix4(r),$i.copy(t.ray).recast(t.near),!(Xr.containsPoint($i.origin)===!1&&($i.intersectSphere(Xr,Fc)===null||$i.origin.distanceToSquared(Fc)>(t.far-t.near)**2))&&(Nc.copy(r).invert(),$i.copy(t.ray).applyMatrix4(Nc),!(n.boundingBox!==null&&$i.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,$i)))}_computeIntersections(t,e,n){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,p=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let x=0,g=p.length;x<g;x++){const m=p[x],d=o[m.materialIndex],S=Math.max(m.start,f.start),b=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let v=S,C=b;v<C;v+=3){const R=a.getX(v),T=a.getX(v+1),A=a.getX(v+2);s=Kr(this,d,t,n,c,h,u,R,T,A),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const x=Math.max(0,f.start),g=Math.min(a.count,f.start+f.count);for(let m=x,d=g;m<d;m+=3){const S=a.getX(m),b=a.getX(m+1),v=a.getX(m+2);s=Kr(this,o,t,n,c,h,u,S,b,v),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let x=0,g=p.length;x<g;x++){const m=p[x],d=o[m.materialIndex],S=Math.max(m.start,f.start),b=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let v=S,C=b;v<C;v+=3){const R=v,T=v+1,A=v+2;s=Kr(this,d,t,n,c,h,u,R,T,A),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const x=Math.max(0,f.start),g=Math.min(l.count,f.start+f.count);for(let m=x,d=g;m<d;m+=3){const S=m,b=m+1,v=m+2;s=Kr(this,o,t,n,c,h,u,S,b,v),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function _f(i,t,e,n,s,r,o,a){let l;if(t.side===Sn?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,t.side===_i,a),l===null)return null;jr.copy(a),jr.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(jr);return c<e.near||c>e.far?null:{distance:c,point:jr.clone(),object:i}}function Kr(i,t,e,n,s,r,o,a,l,c){i.getVertexPosition(a,qr),i.getVertexPosition(l,Yr),i.getVertexPosition(c,$r);const h=_f(i,t,e,n,qr,Yr,$r,Oc);if(h){const u=new U;Wn.getBarycoord(Oc,qr,Yr,$r,u),s&&(h.uv=Wn.getInterpolatedAttribute(s,a,l,c,u,new Gt)),r&&(h.uv1=Wn.getInterpolatedAttribute(r,a,l,c,u,new Gt)),o&&(h.normal=Wn.getInterpolatedAttribute(o,a,l,c,u,new U),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const p={a,b:l,c,normal:new U,materialIndex:0};Wn.getNormal(qr,Yr,$r,p.normal),h.face=p,h.barycoord=u}return h}class ls extends Ce{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],h=[],u=[];let p=0,f=0;x("z","y","x",-1,-1,n,e,t,o,r,0),x("z","y","x",1,-1,n,e,-t,o,r,1),x("x","z","y",1,1,t,n,e,s,o,2),x("x","z","y",1,-1,t,n,-e,s,o,3),x("x","y","z",1,-1,t,e,n,s,r,4),x("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new qt(c,3)),this.setAttribute("normal",new qt(h,3)),this.setAttribute("uv",new qt(u,2));function x(g,m,d,S,b,v,C,R,T,A,y){const M=v/T,I=C/A,N=v/2,X=C/2,J=R/2,B=T+1,W=A+1;let Q=0,Y=0;const ct=new U;for(let j=0;j<W;j++){const Mt=j*I-X;for(let Yt=0;Yt<B;Yt++){const we=Yt*M-N;ct[g]=we*S,ct[m]=Mt*b,ct[d]=J,c.push(ct.x,ct.y,ct.z),ct[g]=0,ct[m]=0,ct[d]=R>0?1:-1,h.push(ct.x,ct.y,ct.z),u.push(Yt/T),u.push(1-j/A),Q+=1}}for(let j=0;j<A;j++)for(let Mt=0;Mt<T;Mt++){const Yt=p+Mt+B*j,we=p+Mt+B*(j+1),oe=p+(Mt+1)+B*(j+1),ht=p+(Mt+1)+B*j;l.push(Yt,we,ht),l.push(we,oe,ht),Y+=6}a.addGroup(f,Y,y),f+=Y,p+=Q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ls(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Zs(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function yn(i){const t={};for(let e=0;e<i.length;e++){const n=Zs(i[e]);for(const s in n)t[s]=n[s]}return t}function vf(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function cu(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Le.workingColorSpace}const wl={clone:Zs,merge:yn};var Mf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,yf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Yn extends us{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Mf,this.fragmentShader=yf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Zs(t.uniforms),this.uniformsGroups=vf(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class hu extends Ye{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new le,this.projectionMatrix=new le,this.projectionMatrixInverse=new le,this.coordinateSystem=ti,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ci=new U,kc=new Gt,Bc=new Gt;class Pn extends hu{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Er*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(xr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Er*2*Math.atan(Math.tan(xr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Ci.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Ci.x,Ci.y).multiplyScalar(-t/Ci.z),Ci.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ci.x,Ci.y).multiplyScalar(-t/Ci.z)}getViewSize(t,e){return this.getViewBounds(t,kc,Bc),e.subVectors(Bc,kc)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(xr*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Ps=-90,Ds=1;class Sf extends Ye{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Pn(Ps,Ds,t,e);s.layers=this.layers,this.add(s);const r=new Pn(Ps,Ds,t,e);r.layers=this.layers,this.add(r);const o=new Pn(Ps,Ds,t,e);o.layers=this.layers,this.add(o);const a=new Pn(Ps,Ds,t,e);a.layers=this.layers,this.add(a);const l=new Pn(Ps,Ds,t,e);l.layers=this.layers,this.add(l);const c=new Pn(Ps,Ds,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,l]=e;for(const c of e)this.remove(c);if(t===ti)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===yo)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,h]=this.children,u=t.getRenderTarget(),p=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),x=t.xr.enabled;t.xr.enabled=!1;const g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=g,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,p,f),t.xr.enabled=x,n.texture.needsPMREMUpdate=!0}}class uu extends xn{constructor(t=[],e=Xs,n,s,r,o,a,l,c,h){super(t,e,n,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class bf extends Bi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new uu(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new ls(5,5,5),r=new Yn({name:"CubemapFromEquirect",uniforms:Zs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Sn,blending:Oi});r.uniforms.tEquirect.value=e;const o=new ae(s,r),a=e.minFilter;return e.minFilter===Ni&&(e.minFilter=Xn),new Sf(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}}class be extends Ye{constructor(){super(),this.isGroup=!0,this.type="Group"}}const wf={type:"move"};class la{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new be,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new be,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new be,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const g of t.hand.values()){const m=e.getJointPose(g,n),d=this._getHandJoint(c,g);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],p=h.position.distanceTo(u.position),f=.02,x=.005;c.inputState.pinching&&p>f+x?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&p<=f-x&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(wf)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new be;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class Co{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new se(t),this.density=e}clone(){return new Co(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Ef extends Ye{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ii,this.environmentIntensity=1,this.environmentRotation=new ii,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}const Hc=new U,Gc=new Pe,Vc=new Pe,Tf=new U,Wc=new le,Jr=new U,ca=new vi,Xc=new le,ha=new Cr;class Qr extends ae{constructor(t,e){super(t,e),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=vc,this.bindMatrix=new le,this.bindMatrixInverse=new le,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const t=this.geometry;this.boundingBox===null&&(this.boundingBox=new ni),this.boundingBox.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Jr),this.boundingBox.expandByPoint(Jr)}computeBoundingSphere(){const t=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new vi),this.boundingSphere.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Jr),this.boundingSphere.expandByPoint(Jr)}copy(t,e){return super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}raycast(t,e){const n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ca.copy(this.boundingSphere),ca.applyMatrix4(s),t.ray.intersectsSphere(ca)!==!1&&(Xc.copy(s).invert(),ha.copy(t.ray).applyMatrix4(Xc),!(this.boundingBox!==null&&ha.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(t,e,ha)))}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){this.skeleton=t,e===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const t=new Pe,e=this.geometry.attributes.skinWeight;for(let n=0,s=e.count;n<s;n++){t.fromBufferAttribute(e,n);const r=1/t.manhattanLength();r!==1/0?t.multiplyScalar(r):t.set(1,0,0,0),e.setXYZW(n,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),this.bindMode===vc?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Ed?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){const n=this.skeleton,s=this.geometry;Gc.fromBufferAttribute(s.attributes.skinIndex,t),Vc.fromBufferAttribute(s.attributes.skinWeight,t),Hc.copy(e).applyMatrix4(this.bindMatrix),e.set(0,0,0);for(let r=0;r<4;r++){const o=Vc.getComponent(r);if(o!==0){const a=Gc.getComponent(r);Wc.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),e.addScaledVector(Tf.copy(Hc).applyMatrix4(Wc),o)}}return e.applyMatrix4(this.bindMatrixInverse)}}class du extends Ye{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Xl extends xn{constructor(t=null,e=1,n=1,s,r,o,a,l,c=In,h=In,u,p){super(null,o,a,l,c,h,s,r,u,p),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const qc=new le,Af=new le;class ql{constructor(t=[],e=[]){this.uuid=hs(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(t.length*16),e.length===0)this.calculateInverses();else if(t.length!==e.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new le)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,e=this.bones.length;t<e;t++){const n=new le;this.bones[t]&&n.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&n.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const t=this.bones,e=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,o=t.length;r<o;r++){const a=t[r]?t[r].matrixWorld:Af;qc.multiplyMatrices(a,e[r]),qc.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new ql(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);const e=new Float32Array(t*t*4);e.set(this.boneMatrices);const n=new Xl(e,t,t,Ln,qn);return n.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=n,this}getBoneByName(t){for(let e=0,n=this.bones.length;e<n;e++){const s=this.bones[e];if(s.name===t)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(t,e){this.uuid=t.uuid;for(let n=0,s=t.bones.length;n<s;n++){const r=t.bones[n];let o=e[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new du),this.bones.push(o),this.boneInverses.push(new le().fromArray(t.boneInverses[n]))}return this.init(),this}toJSON(){const t={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;const e=this.bones,n=this.boneInverses;for(let s=0,r=e.length;s<r;s++){const o=e[s];t.bones.push(o.uuid);const a=n[s];t.boneInverses.push(a.toArray())}return t}}class Fs extends cn{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Ls=new le,Yc=new le,to=[],$c=new ni,Rf=new le,hr=new ae,ur=new vi;class Cn extends ae{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Fs(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Rf)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new ni),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ls),$c.copy(t.boundingBox).applyMatrix4(Ls),this.boundingBox.union($c)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new vi),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ls),ur.copy(t.boundingSphere).applyMatrix4(Ls),this.boundingSphere.union(ur)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(hr.geometry=this.geometry,hr.material=this.material,hr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ur.copy(this.boundingSphere),ur.applyMatrix4(n),t.ray.intersectsSphere(ur)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ls),Yc.multiplyMatrices(n,Ls),hr.matrixWorld=Yc,hr.raycast(t,to);for(let o=0,a=to.length;o<a;o++){const l=to[o];l.instanceId=r,l.object=this,e.push(l)}to.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Fs(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Xl(new Float32Array(s*this.count),s,this.count,Fl,qn));const r=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=s*t;r[l]=a,r.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const ua=new U,Cf=new U,Pf=new me;class pi{constructor(t=new U(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=ua.subVectors(n,e).cross(Cf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(ua),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Pf.getNormalMatrix(t),s=this.coplanarPoint(ua).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Zi=new vi,Df=new Gt(.5,.5),eo=new U;class Yl{constructor(t=new pi,e=new pi,n=new pi,s=new pi,r=new pi,o=new pi){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=ti,n=!1){const s=this.planes,r=t.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],u=r[5],p=r[6],f=r[7],x=r[8],g=r[9],m=r[10],d=r[11],S=r[12],b=r[13],v=r[14],C=r[15];if(s[0].setComponents(c-o,f-h,d-x,C-S).normalize(),s[1].setComponents(c+o,f+h,d+x,C+S).normalize(),s[2].setComponents(c+a,f+u,d+g,C+b).normalize(),s[3].setComponents(c-a,f-u,d-g,C-b).normalize(),n)s[4].setComponents(l,p,m,v).normalize(),s[5].setComponents(c-l,f-p,d-m,C-v).normalize();else if(s[4].setComponents(c-l,f-p,d-m,C-v).normalize(),e===ti)s[5].setComponents(c+l,f+p,d+m,C+v).normalize();else if(e===yo)s[5].setComponents(l,p,m,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Zi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Zi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Zi)}intersectsSprite(t){Zi.center.set(0,0,0);const e=Df.distanceTo(t.center);return Zi.radius=.7071067811865476+e,Zi.applyMatrix4(t.matrixWorld),this.intersectsSphere(Zi)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(eo.x=s.normal.x>0?t.max.x:t.min.x,eo.y=s.normal.y>0?t.max.y:t.min.y,eo.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(eo)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class $l extends us{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new se(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const bo=new U,wo=new U,Zc=new le,dr=new Cr,no=new vi,da=new U,jc=new U;class Eo extends Ye{constructor(t=new Ce,e=new $l){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)bo.fromBufferAttribute(e,s-1),wo.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=bo.distanceTo(wo);t.setAttribute("lineDistance",new qt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),no.copy(n.boundingSphere),no.applyMatrix4(s),no.radius+=r,t.ray.intersectsSphere(no)===!1)return;Zc.copy(s).invert(),dr.copy(t.ray).applyMatrix4(Zc);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,p=n.attributes.position;if(h!==null){const f=Math.max(0,o.start),x=Math.min(h.count,o.start+o.count);for(let g=f,m=x-1;g<m;g+=c){const d=h.getX(g),S=h.getX(g+1),b=io(this,t,dr,l,d,S,g);b&&e.push(b)}if(this.isLineLoop){const g=h.getX(x-1),m=h.getX(f),d=io(this,t,dr,l,g,m,x-1);d&&e.push(d)}}else{const f=Math.max(0,o.start),x=Math.min(p.count,o.start+o.count);for(let g=f,m=x-1;g<m;g+=c){const d=io(this,t,dr,l,g,g+1,g);d&&e.push(d)}if(this.isLineLoop){const g=io(this,t,dr,l,x-1,f,x-1);g&&e.push(g)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function io(i,t,e,n,s,r,o){const a=i.geometry.attributes.position;if(bo.fromBufferAttribute(a,s),wo.fromBufferAttribute(a,r),e.distanceSqToSegment(bo,wo,da,jc)>n)return;da.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(da);if(!(c<t.near||c>t.far))return{distance:c,point:jc.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}const Kc=new U,Jc=new U;class Lf extends Eo{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)Kc.fromBufferAttribute(e,s),Jc.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Kc.distanceTo(Jc);t.setAttribute("lineDistance",new qt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class If extends Eo{constructor(t,e){super(t,e),this.isLineLoop=!0,this.type="LineLoop"}}class Uf extends us{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new se(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Qc=new le,El=new Cr,so=new vi,ro=new U;class zf extends Ye{constructor(t=new Ce,e=new Uf){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),so.copy(n.boundingSphere),so.applyMatrix4(s),so.radius+=r,t.ray.intersectsSphere(so)===!1)return;Qc.copy(s).invert(),El.copy(t.ray).applyMatrix4(Qc);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){const p=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let x=p,g=f;x<g;x++){const m=c.getX(x);ro.fromBufferAttribute(u,m),th(ro,m,l,s,t,e,this)}}else{const p=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let x=p,g=f;x<g;x++)ro.fromBufferAttribute(u,x),th(ro,x,l,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function th(i,t,e,n,s,r,o){const a=El.distanceSqToPoint(i);if(a<e){const l=new U;El.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class fu extends xn{constructor(t,e,n,s,r,o,a,l,c){super(t,e,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class pu extends xn{constructor(t,e,n=os,s,r,o,a=In,l=In,c,h=br,u=1){if(h!==br&&h!==wr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const p={width:t,height:e,depth:u};super(p,s,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Gl(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class mu extends xn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class Zl extends Ce{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],o=[],a=[],l=[],c=new U,h=new Gt;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let u=0,p=3;u<=e;u++,p+=3){const f=n+u/e*s;c.x=t*Math.cos(f),c.y=t*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[p]/t+1)/2,h.y=(o[p+1]/t+1)/2,l.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new qt(o,3)),this.setAttribute("normal",new qt(a,3)),this.setAttribute("uv",new qt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Zl(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Po extends Ce{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],p=[],f=[];let x=0;const g=[],m=n/2;let d=0;S(),o===!1&&(t>0&&b(!0),e>0&&b(!1)),this.setIndex(h),this.setAttribute("position",new qt(u,3)),this.setAttribute("normal",new qt(p,3)),this.setAttribute("uv",new qt(f,2));function S(){const v=new U,C=new U;let R=0;const T=(e-t)/n;for(let A=0;A<=r;A++){const y=[],M=A/r,I=M*(e-t)+t;for(let N=0;N<=s;N++){const X=N/s,J=X*l+a,B=Math.sin(J),W=Math.cos(J);C.x=I*B,C.y=-M*n+m,C.z=I*W,u.push(C.x,C.y,C.z),v.set(B,T,W).normalize(),p.push(v.x,v.y,v.z),f.push(X,1-M),y.push(x++)}g.push(y)}for(let A=0;A<s;A++)for(let y=0;y<r;y++){const M=g[y][A],I=g[y+1][A],N=g[y+1][A+1],X=g[y][A+1];(t>0||y!==0)&&(h.push(M,I,X),R+=3),(e>0||y!==r-1)&&(h.push(I,N,X),R+=3)}c.addGroup(d,R,0),d+=R}function b(v){const C=x,R=new Gt,T=new U;let A=0;const y=v===!0?t:e,M=v===!0?1:-1;for(let N=1;N<=s;N++)u.push(0,m*M,0),p.push(0,M,0),f.push(.5,.5),x++;const I=x;for(let N=0;N<=s;N++){const J=N/s*l+a,B=Math.cos(J),W=Math.sin(J);T.x=y*W,T.y=m*M,T.z=y*B,u.push(T.x,T.y,T.z),p.push(0,M,0),R.x=B*.5+.5,R.y=W*.5*M+.5,f.push(R.x,R.y),x++}for(let N=0;N<s;N++){const X=C+N,J=I+N;v===!0?h.push(J,J+1,X):h.push(J+1,J,X),A+=3}c.addGroup(d,A,v===!0?1:2),d+=A}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Po(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Do extends Ce{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const r=[],o=[];a(s),c(n),h(),this.setAttribute("position",new qt(r,3)),this.setAttribute("normal",new qt(r.slice(),3)),this.setAttribute("uv",new qt(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(S){const b=new U,v=new U,C=new U;for(let R=0;R<e.length;R+=3)f(e[R+0],b),f(e[R+1],v),f(e[R+2],C),l(b,v,C,S)}function l(S,b,v,C){const R=C+1,T=[];for(let A=0;A<=R;A++){T[A]=[];const y=S.clone().lerp(v,A/R),M=b.clone().lerp(v,A/R),I=R-A;for(let N=0;N<=I;N++)N===0&&A===R?T[A][N]=y:T[A][N]=y.clone().lerp(M,N/I)}for(let A=0;A<R;A++)for(let y=0;y<2*(R-A)-1;y++){const M=Math.floor(y/2);y%2===0?(p(T[A][M+1]),p(T[A+1][M]),p(T[A][M])):(p(T[A][M+1]),p(T[A+1][M+1]),p(T[A+1][M]))}}function c(S){const b=new U;for(let v=0;v<r.length;v+=3)b.x=r[v+0],b.y=r[v+1],b.z=r[v+2],b.normalize().multiplyScalar(S),r[v+0]=b.x,r[v+1]=b.y,r[v+2]=b.z}function h(){const S=new U;for(let b=0;b<r.length;b+=3){S.x=r[b+0],S.y=r[b+1],S.z=r[b+2];const v=m(S)/2/Math.PI+.5,C=d(S)/Math.PI+.5;o.push(v,1-C)}x(),u()}function u(){for(let S=0;S<o.length;S+=6){const b=o[S+0],v=o[S+2],C=o[S+4],R=Math.max(b,v,C),T=Math.min(b,v,C);R>.9&&T<.1&&(b<.2&&(o[S+0]+=1),v<.2&&(o[S+2]+=1),C<.2&&(o[S+4]+=1))}}function p(S){r.push(S.x,S.y,S.z)}function f(S,b){const v=S*3;b.x=t[v+0],b.y=t[v+1],b.z=t[v+2]}function x(){const S=new U,b=new U,v=new U,C=new U,R=new Gt,T=new Gt,A=new Gt;for(let y=0,M=0;y<r.length;y+=9,M+=6){S.set(r[y+0],r[y+1],r[y+2]),b.set(r[y+3],r[y+4],r[y+5]),v.set(r[y+6],r[y+7],r[y+8]),R.set(o[M+0],o[M+1]),T.set(o[M+2],o[M+3]),A.set(o[M+4],o[M+5]),C.copy(S).add(b).add(v).divideScalar(3);const I=m(C);g(R,M+0,S,I),g(T,M+2,b,I),g(A,M+4,v,I)}}function g(S,b,v,C){C<0&&S.x===1&&(o[b]=S.x-1),v.x===0&&v.z===0&&(o[b]=C/2/Math.PI+.5)}function m(S){return Math.atan2(S.z,-S.x)}function d(S){return Math.atan2(-S.y,Math.sqrt(S.x*S.x+S.z*S.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Do(t.vertices,t.indices,t.radius,t.details)}}class jl extends Do{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,o,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new jl(t.radius,t.detail)}}class Mi{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const n=this.getLengths();let s=0;const r=n.length;let o;e?o=e:o=t*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=n[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===o)return s/(r-1);const h=n[s],p=n[s+1]-h,f=(o-h)/p;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),l=e||(o.isVector2?new Gt:new U);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){const n=new U,s=[],r=[],o=[],a=new U,l=new le;for(let f=0;f<=t;f++){const x=f/t;s[f]=this.getTangentAt(x,new U)}r[0]=new U,o[0]=new U;let c=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),p=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),p<=c&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();const x=Math.acos(Me(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,x))}o[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos(Me(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(f=-f);for(let x=1;x<=t;x++)r[x].applyMatrix4(l.makeRotationAxis(s[x],f*x)),o[x].crossVectors(s[x],r[x])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class gu extends Mi{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new Gt){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),p=l-this.aX,f=c-this.aY;l=p*h-f*u+this.aX,c=p*u+f*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Nf extends gu{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Kl(){let i=0,t=0,e=0,n=0;function s(r,o,a,l){i=r,t=a,e=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,u){let p=(o-r)/c-(a-r)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+u)+(l-a)/u;p*=h,f*=h,s(o,a,p,f)},calc:function(r){const o=r*r,a=o*r;return i+t*r+e*o+n*a}}}const oo=new U,fa=new Kl,pa=new Kl,ma=new Kl;class Ar extends Mi{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new U){const n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=s[(a-1)%r]:(oo.subVectors(s[0],s[1]).add(s[0]),c=oo);const u=s[a%r],p=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(oo.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=oo),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let x=Math.pow(c.distanceToSquared(u),f),g=Math.pow(u.distanceToSquared(p),f),m=Math.pow(p.distanceToSquared(h),f);g<1e-4&&(g=1),x<1e-4&&(x=g),m<1e-4&&(m=g),fa.initNonuniformCatmullRom(c.x,u.x,p.x,h.x,x,g,m),pa.initNonuniformCatmullRom(c.y,u.y,p.y,h.y,x,g,m),ma.initNonuniformCatmullRom(c.z,u.z,p.z,h.z,x,g,m)}else this.curveType==="catmullrom"&&(fa.initCatmullRom(c.x,u.x,p.x,h.x,this.tension),pa.initCatmullRom(c.y,u.y,p.y,h.y,this.tension),ma.initCatmullRom(c.z,u.z,p.z,h.z,this.tension));return n.set(fa.calc(l),pa.calc(l),ma.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new U().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function eh(i,t,e,n,s){const r=(n-t)*.5,o=(s-e)*.5,a=i*i,l=i*a;return(2*e-2*n+r+o)*l+(-3*e+3*n-2*r-o)*a+r*i+e}function Ff(i,t){const e=1-i;return e*e*t}function Of(i,t){return 2*(1-i)*i*t}function kf(i,t){return i*i*t}function vr(i,t,e,n){return Ff(i,t)+Of(i,e)+kf(i,n)}function Bf(i,t){const e=1-i;return e*e*e*t}function Hf(i,t){const e=1-i;return 3*e*e*i*t}function Gf(i,t){return 3*(1-i)*i*i*t}function Vf(i,t){return i*i*i*t}function Mr(i,t,e,n,s){return Bf(i,t)+Hf(i,e)+Gf(i,n)+Vf(i,s)}class Wf extends Mi{constructor(t=new Gt,e=new Gt,n=new Gt,s=new Gt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new Gt){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Mr(t,s.x,r.x,o.x,a.x),Mr(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Xf extends Mi{constructor(t=new U,e=new U,n=new U,s=new U){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new U){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Mr(t,s.x,r.x,o.x,a.x),Mr(t,s.y,r.y,o.y,a.y),Mr(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class qf extends Mi{constructor(t=new Gt,e=new Gt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new Gt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Gt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Yf extends Mi{constructor(t=new U,e=new U){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new U){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new U){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class $f extends Mi{constructor(t=new Gt,e=new Gt,n=new Gt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new Gt){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(vr(t,s.x,r.x,o.x),vr(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class xu extends Mi{constructor(t=new U,e=new U,n=new U){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new U){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(vr(t,s.x,r.x,o.x),vr(t,s.y,r.y,o.y),vr(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Zf extends Mi{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new Gt){const n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(eh(a,l.x,c.x,h.x,u.x),eh(a,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new Gt().fromArray(s))}return this}}var jf=Object.freeze({__proto__:null,ArcCurve:Nf,CatmullRomCurve3:Ar,CubicBezierCurve:Wf,CubicBezierCurve3:Xf,EllipseCurve:gu,LineCurve:qf,LineCurve3:Yf,QuadraticBezierCurve:$f,QuadraticBezierCurve3:xu,SplineCurve:Zf});class Jl extends Do{constructor(t=1,e=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Jl(t.radius,t.detail)}}class Fi extends Ce{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(s),c=a+1,h=l+1,u=t/a,p=e/l,f=[],x=[],g=[],m=[];for(let d=0;d<h;d++){const S=d*p-o;for(let b=0;b<c;b++){const v=b*u-r;x.push(v,-S,0),g.push(0,0,1),m.push(b/a),m.push(1-d/l)}}for(let d=0;d<l;d++)for(let S=0;S<a;S++){const b=S+c*d,v=S+c*(d+1),C=S+1+c*(d+1),R=S+1+c*d;f.push(b,v,R),f.push(v,C,R)}this.setIndex(f),this.setAttribute("position",new qt(x,3)),this.setAttribute("normal",new qt(g,3)),this.setAttribute("uv",new qt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Fi(t.width,t.height,t.widthSegments,t.heightSegments)}}class Ql extends Ce{constructor(t=.5,e=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);const a=[],l=[],c=[],h=[];let u=t;const p=(e-t)/s,f=new U,x=new Gt;for(let g=0;g<=s;g++){for(let m=0;m<=n;m++){const d=r+m/n*o;f.x=u*Math.cos(d),f.y=u*Math.sin(d),l.push(f.x,f.y,f.z),c.push(0,0,1),x.x=(f.x/e+1)/2,x.y=(f.y/e+1)/2,h.push(x.x,x.y)}u+=p}for(let g=0;g<s;g++){const m=g*(n+1);for(let d=0;d<n;d++){const S=d+m,b=S,v=S+n+1,C=S+n+2,R=S+1;a.push(b,v,R),a.push(v,C,R)}}this.setIndex(a),this.setAttribute("position",new qt(l,3)),this.setAttribute("normal",new qt(c,3)),this.setAttribute("uv",new qt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ql(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class cs extends Ce{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],u=new U,p=new U,f=[],x=[],g=[],m=[];for(let d=0;d<=n;d++){const S=[],b=d/n;let v=0;d===0&&o===0?v=.5/e:d===n&&l===Math.PI&&(v=-.5/e);for(let C=0;C<=e;C++){const R=C/e;u.x=-t*Math.cos(s+R*r)*Math.sin(o+b*a),u.y=t*Math.cos(o+b*a),u.z=t*Math.sin(s+R*r)*Math.sin(o+b*a),x.push(u.x,u.y,u.z),p.copy(u).normalize(),g.push(p.x,p.y,p.z),m.push(R+v,1-b),S.push(c++)}h.push(S)}for(let d=0;d<n;d++)for(let S=0;S<e;S++){const b=h[d][S+1],v=h[d][S],C=h[d+1][S],R=h[d+1][S+1];(d!==0||o>0)&&f.push(b,v,R),(d!==n-1||l<Math.PI)&&f.push(v,C,R)}this.setIndex(f),this.setAttribute("position",new qt(x,3)),this.setAttribute("normal",new qt(g,3)),this.setAttribute("uv",new qt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new cs(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Lo extends Ce{constructor(t=new xu(new U(-1,-1,0),new U(-1,1,0),new U(1,1,0)),e=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:s,closed:r};const o=t.computeFrenetFrames(e,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new U,l=new U,c=new Gt;let h=new U;const u=[],p=[],f=[],x=[];g(),this.setIndex(x),this.setAttribute("position",new qt(u,3)),this.setAttribute("normal",new qt(p,3)),this.setAttribute("uv",new qt(f,2));function g(){for(let b=0;b<e;b++)m(b);m(r===!1?e:0),S(),d()}function m(b){h=t.getPointAt(b/e,h);const v=o.normals[b],C=o.binormals[b];for(let R=0;R<=s;R++){const T=R/s*Math.PI*2,A=Math.sin(T),y=-Math.cos(T);l.x=y*v.x+A*C.x,l.y=y*v.y+A*C.y,l.z=y*v.z+A*C.z,l.normalize(),p.push(l.x,l.y,l.z),a.x=h.x+n*l.x,a.y=h.y+n*l.y,a.z=h.z+n*l.z,u.push(a.x,a.y,a.z)}}function d(){for(let b=1;b<=e;b++)for(let v=1;v<=s;v++){const C=(s+1)*(b-1)+(v-1),R=(s+1)*b+(v-1),T=(s+1)*b+v,A=(s+1)*(b-1)+v;x.push(C,R,A),x.push(R,T,A)}}function S(){for(let b=0;b<=e;b++)for(let v=0;v<=s;v++)c.x=b/e,c.y=v/s,f.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new Lo(new jf[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class Be extends us{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new se(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new se(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=iu,this.normalScale=new Gt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ii,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class _u extends Be{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Gt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Me(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new se(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new se(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new se(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class Kf extends us{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ad,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Jf extends us{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Qf extends $l{constructor(t){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(t)}copy(t){return super.copy(t),this.scale=t.scale,this.dashSize=t.dashSize,this.gapSize=t.gapSize,this}}class tc extends Ye{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new se(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class tp extends tc{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ye.DEFAULT_UP),this.updateMatrix(),this.groundColor=new se(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const ga=new le,nh=new U,ih=new U;class vu{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Gt(512,512),this.mapType=ei,this.map=null,this.mapPass=null,this.matrix=new le,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Yl,this._frameExtents=new Gt(1,1),this._viewportCount=1,this._viewports=[new Pe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;nh.setFromMatrixPosition(t.matrixWorld),e.position.copy(nh),ih.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(ih),e.updateMatrixWorld(),ga.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ga,e.coordinateSystem,e.reversedDepth),e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ga)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const sh=new le,fr=new U,xa=new U;class ep extends vu{constructor(){super(new Pn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Gt(4,2),this._viewportCount=6,this._viewports=[new Pe(2,1,1,1),new Pe(0,1,1,1),new Pe(3,1,1,1),new Pe(1,1,1,1),new Pe(3,0,1,1),new Pe(1,0,1,1)],this._cubeDirections=[new U(1,0,0),new U(-1,0,0),new U(0,0,1),new U(0,0,-1),new U(0,1,0),new U(0,-1,0)],this._cubeUps=[new U(0,1,0),new U(0,1,0),new U(0,1,0),new U(0,1,0),new U(0,0,1),new U(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),fr.setFromMatrixPosition(t.matrixWorld),n.position.copy(fr),xa.copy(n.position),xa.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(xa),n.updateMatrixWorld(),s.makeTranslation(-fr.x,-fr.y,-fr.z),sh.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(sh,n.coordinateSystem,n.reversedDepth)}}class np extends tc{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new ep}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class ec extends hu{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class ip extends vu{constructor(){super(new ec(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class sp extends tc{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ye.DEFAULT_UP),this.updateMatrix(),this.target=new Ye,this.shadow=new ip}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class rp extends Ce{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){const t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}}class op extends Pn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const rh=new le;class oh{constructor(t,e,n=0,s=1/0){this.ray=new Cr(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new Vl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return rh.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(rh),this}intersectObject(t,e=!0,n=[]){return Tl(t,this,n,e),n.sort(ah),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)Tl(t[s],this,n,e);return n.sort(ah),n}}function ah(i,t){return i.distance-t.distance}function Tl(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let o=0,a=r.length;o<a;o++)Tl(r[o],t,e,!0)}}function lh(i,t,e,n){const s=ap(n);switch(e){case tu:return i*t;case Fl:return i*t/s.components*s.byteLength;case Ol:return i*t/s.components*s.byteLength;case nu:return i*t*2/s.components*s.byteLength;case kl:return i*t*2/s.components*s.byteLength;case eu:return i*t*3/s.components*s.byteLength;case Ln:return i*t*4/s.components*s.byteLength;case Bl:return i*t*4/s.components*s.byteLength;case po:case mo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case go:case xo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ja:case Ja:return Math.max(i,16)*Math.max(t,8)/4;case Za:case Ka:return Math.max(i,8)*Math.max(t,8)/2;case Qa:case tl:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case el:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case nl:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case il:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case sl:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case rl:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case ol:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case al:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case ll:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case cl:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case hl:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case ul:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case dl:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case fl:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case pl:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case ml:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case gl:case xl:case _l:return Math.ceil(i/4)*Math.ceil(t/4)*16;case vl:case Ml:return Math.ceil(i/4)*Math.ceil(t/4)*8;case yl:case Sl:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function ap(i){switch(i){case ei:case jh:return{byteLength:1,components:1};case yr:case Kh:case Rr:return{byteLength:2,components:1};case zl:case Nl:return{byteLength:2,components:4};case os:case Ul:case qn:return{byteLength:4,components:1};case Jh:case Qh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Il}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Il);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Mu(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function lp(i){const t=new WeakMap;function e(a,l){const c=a.array,h=a.usage,u=c.byteLength,p=i.createBuffer();i.bindBuffer(l,p),i.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:p,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){const h=l.array,u=l.updateRanges;if(i.bindBuffer(c,a),u.length===0)i.bufferSubData(c,0,h);else{u.sort((f,x)=>f.start-x.start);let p=0;for(let f=1;f<u.length;f++){const x=u[p],g=u[f];g.start<=x.start+x.count+1?x.count=Math.max(x.count,g.start+g.count-x.start):(++p,u[p]=g)}u.length=p+1;for(let f=0,x=u.length;f<x;f++){const g=u[f];i.bufferSubData(c,g.start*h.BYTES_PER_ELEMENT,h,g.start,g.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(i.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var cp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,hp=`#ifdef USE_ALPHAHASH
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
#endif`,up=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,dp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,fp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,pp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,mp=`#ifdef USE_AOMAP
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
#endif`,gp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,xp=`#ifdef USE_BATCHING
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
#endif`,_p=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,vp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Mp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,yp=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Sp=`#ifdef USE_IRIDESCENCE
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
#endif`,bp=`#ifdef USE_BUMPMAP
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
#endif`,wp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Ep=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Tp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ap=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Rp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Cp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Pp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Dp=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Lp=`#define PI 3.141592653589793
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
} // validated`,Ip=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Up=`vec3 transformedNormal = objectNormal;
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
#endif`,zp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Np=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Fp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Op=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,kp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Bp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Hp=`#ifdef USE_ENVMAP
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
#endif`,Gp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Vp=`#ifdef USE_ENVMAP
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
#endif`,Wp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Xp=`#ifdef USE_ENVMAP
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
#endif`,qp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Yp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,$p=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Zp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,jp=`#ifdef USE_GRADIENTMAP
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
}`,Kp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Jp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Qp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,tm=`uniform bool receiveShadow;
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
#endif`,em=`#ifdef USE_ENVMAP
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
#endif`,nm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,im=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,sm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,rm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,om=`PhysicalMaterial material;
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
#endif`,am=`struct PhysicalMaterial {
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
}`,lm=`
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
#endif`,cm=`#if defined( RE_IndirectDiffuse )
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
#endif`,hm=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,um=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,dm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,fm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,pm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,mm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,gm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,xm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,_m=`#if defined( USE_POINTS_UV )
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
#endif`,vm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Mm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ym=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Sm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,bm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,wm=`#ifdef USE_MORPHTARGETS
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
#endif`,Em=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Tm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Am=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Rm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Cm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Pm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Dm=`#ifdef USE_NORMALMAP
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
#endif`,Lm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Im=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Um=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,zm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Nm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Fm=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Om=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,km=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Bm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Hm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Gm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Vm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Wm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Xm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,qm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Ym=`float getShadowMask() {
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
}`,$m=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Zm=`#ifdef USE_SKINNING
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
#endif`,jm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Km=`#ifdef USE_SKINNING
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
#endif`,Jm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Qm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,t0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,e0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,n0=`#ifdef USE_TRANSMISSION
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
#endif`,i0=`#ifdef USE_TRANSMISSION
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
#endif`,s0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,r0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,o0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,a0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const l0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,c0=`uniform sampler2D t2D;
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
}`,h0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,u0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,d0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,f0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,p0=`#include <common>
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
}`,m0=`#if DEPTH_PACKING == 3200
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
}`,g0=`#define DISTANCE
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
}`,x0=`#define DISTANCE
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
}`,_0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,v0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,M0=`uniform float scale;
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
}`,y0=`uniform vec3 diffuse;
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
}`,S0=`#include <common>
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
}`,b0=`uniform vec3 diffuse;
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
}`,w0=`#define LAMBERT
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
}`,E0=`#define LAMBERT
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
}`,T0=`#define MATCAP
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
}`,A0=`#define MATCAP
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
}`,R0=`#define NORMAL
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
}`,C0=`#define NORMAL
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
}`,P0=`#define PHONG
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
}`,D0=`#define PHONG
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
}`,L0=`#define STANDARD
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
}`,I0=`#define STANDARD
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
}`,U0=`#define TOON
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
}`,z0=`#define TOON
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
}`,N0=`uniform float size;
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
}`,F0=`uniform vec3 diffuse;
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
}`,O0=`#include <common>
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
}`,k0=`uniform vec3 color;
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
}`,B0=`uniform float rotation;
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
}`,H0=`uniform vec3 diffuse;
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
}`,xe={alphahash_fragment:cp,alphahash_pars_fragment:hp,alphamap_fragment:up,alphamap_pars_fragment:dp,alphatest_fragment:fp,alphatest_pars_fragment:pp,aomap_fragment:mp,aomap_pars_fragment:gp,batching_pars_vertex:xp,batching_vertex:_p,begin_vertex:vp,beginnormal_vertex:Mp,bsdfs:yp,iridescence_fragment:Sp,bumpmap_pars_fragment:bp,clipping_planes_fragment:wp,clipping_planes_pars_fragment:Ep,clipping_planes_pars_vertex:Tp,clipping_planes_vertex:Ap,color_fragment:Rp,color_pars_fragment:Cp,color_pars_vertex:Pp,color_vertex:Dp,common:Lp,cube_uv_reflection_fragment:Ip,defaultnormal_vertex:Up,displacementmap_pars_vertex:zp,displacementmap_vertex:Np,emissivemap_fragment:Fp,emissivemap_pars_fragment:Op,colorspace_fragment:kp,colorspace_pars_fragment:Bp,envmap_fragment:Hp,envmap_common_pars_fragment:Gp,envmap_pars_fragment:Vp,envmap_pars_vertex:Wp,envmap_physical_pars_fragment:em,envmap_vertex:Xp,fog_vertex:qp,fog_pars_vertex:Yp,fog_fragment:$p,fog_pars_fragment:Zp,gradientmap_pars_fragment:jp,lightmap_pars_fragment:Kp,lights_lambert_fragment:Jp,lights_lambert_pars_fragment:Qp,lights_pars_begin:tm,lights_toon_fragment:nm,lights_toon_pars_fragment:im,lights_phong_fragment:sm,lights_phong_pars_fragment:rm,lights_physical_fragment:om,lights_physical_pars_fragment:am,lights_fragment_begin:lm,lights_fragment_maps:cm,lights_fragment_end:hm,logdepthbuf_fragment:um,logdepthbuf_pars_fragment:dm,logdepthbuf_pars_vertex:fm,logdepthbuf_vertex:pm,map_fragment:mm,map_pars_fragment:gm,map_particle_fragment:xm,map_particle_pars_fragment:_m,metalnessmap_fragment:vm,metalnessmap_pars_fragment:Mm,morphinstance_vertex:ym,morphcolor_vertex:Sm,morphnormal_vertex:bm,morphtarget_pars_vertex:wm,morphtarget_vertex:Em,normal_fragment_begin:Tm,normal_fragment_maps:Am,normal_pars_fragment:Rm,normal_pars_vertex:Cm,normal_vertex:Pm,normalmap_pars_fragment:Dm,clearcoat_normal_fragment_begin:Lm,clearcoat_normal_fragment_maps:Im,clearcoat_pars_fragment:Um,iridescence_pars_fragment:zm,opaque_fragment:Nm,packing:Fm,premultiplied_alpha_fragment:Om,project_vertex:km,dithering_fragment:Bm,dithering_pars_fragment:Hm,roughnessmap_fragment:Gm,roughnessmap_pars_fragment:Vm,shadowmap_pars_fragment:Wm,shadowmap_pars_vertex:Xm,shadowmap_vertex:qm,shadowmask_pars_fragment:Ym,skinbase_vertex:$m,skinning_pars_vertex:Zm,skinning_vertex:jm,skinnormal_vertex:Km,specularmap_fragment:Jm,specularmap_pars_fragment:Qm,tonemapping_fragment:t0,tonemapping_pars_fragment:e0,transmission_fragment:n0,transmission_pars_fragment:i0,uv_pars_fragment:s0,uv_pars_vertex:r0,uv_vertex:o0,worldpos_vertex:a0,background_vert:l0,background_frag:c0,backgroundCube_vert:h0,backgroundCube_frag:u0,cube_vert:d0,cube_frag:f0,depth_vert:p0,depth_frag:m0,distanceRGBA_vert:g0,distanceRGBA_frag:x0,equirect_vert:_0,equirect_frag:v0,linedashed_vert:M0,linedashed_frag:y0,meshbasic_vert:S0,meshbasic_frag:b0,meshlambert_vert:w0,meshlambert_frag:E0,meshmatcap_vert:T0,meshmatcap_frag:A0,meshnormal_vert:R0,meshnormal_frag:C0,meshphong_vert:P0,meshphong_frag:D0,meshphysical_vert:L0,meshphysical_frag:I0,meshtoon_vert:U0,meshtoon_frag:z0,points_vert:N0,points_frag:F0,shadow_vert:O0,shadow_frag:k0,sprite_vert:B0,sprite_frag:H0},Ct={common:{diffuse:{value:new se(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new me},alphaMap:{value:null},alphaMapTransform:{value:new me},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new me}},envmap:{envMap:{value:null},envMapRotation:{value:new me},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new me}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new me}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new me},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new me},normalScale:{value:new Gt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new me},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new me}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new me}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new me}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new se(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new se(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new me},alphaTest:{value:0},uvTransform:{value:new me}},sprite:{diffuse:{value:new se(16777215)},opacity:{value:1},center:{value:new Gt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new me},alphaMap:{value:null},alphaMapTransform:{value:new me},alphaTest:{value:0}}},Qn={basic:{uniforms:yn([Ct.common,Ct.specularmap,Ct.envmap,Ct.aomap,Ct.lightmap,Ct.fog]),vertexShader:xe.meshbasic_vert,fragmentShader:xe.meshbasic_frag},lambert:{uniforms:yn([Ct.common,Ct.specularmap,Ct.envmap,Ct.aomap,Ct.lightmap,Ct.emissivemap,Ct.bumpmap,Ct.normalmap,Ct.displacementmap,Ct.fog,Ct.lights,{emissive:{value:new se(0)}}]),vertexShader:xe.meshlambert_vert,fragmentShader:xe.meshlambert_frag},phong:{uniforms:yn([Ct.common,Ct.specularmap,Ct.envmap,Ct.aomap,Ct.lightmap,Ct.emissivemap,Ct.bumpmap,Ct.normalmap,Ct.displacementmap,Ct.fog,Ct.lights,{emissive:{value:new se(0)},specular:{value:new se(1118481)},shininess:{value:30}}]),vertexShader:xe.meshphong_vert,fragmentShader:xe.meshphong_frag},standard:{uniforms:yn([Ct.common,Ct.envmap,Ct.aomap,Ct.lightmap,Ct.emissivemap,Ct.bumpmap,Ct.normalmap,Ct.displacementmap,Ct.roughnessmap,Ct.metalnessmap,Ct.fog,Ct.lights,{emissive:{value:new se(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:xe.meshphysical_vert,fragmentShader:xe.meshphysical_frag},toon:{uniforms:yn([Ct.common,Ct.aomap,Ct.lightmap,Ct.emissivemap,Ct.bumpmap,Ct.normalmap,Ct.displacementmap,Ct.gradientmap,Ct.fog,Ct.lights,{emissive:{value:new se(0)}}]),vertexShader:xe.meshtoon_vert,fragmentShader:xe.meshtoon_frag},matcap:{uniforms:yn([Ct.common,Ct.bumpmap,Ct.normalmap,Ct.displacementmap,Ct.fog,{matcap:{value:null}}]),vertexShader:xe.meshmatcap_vert,fragmentShader:xe.meshmatcap_frag},points:{uniforms:yn([Ct.points,Ct.fog]),vertexShader:xe.points_vert,fragmentShader:xe.points_frag},dashed:{uniforms:yn([Ct.common,Ct.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:xe.linedashed_vert,fragmentShader:xe.linedashed_frag},depth:{uniforms:yn([Ct.common,Ct.displacementmap]),vertexShader:xe.depth_vert,fragmentShader:xe.depth_frag},normal:{uniforms:yn([Ct.common,Ct.bumpmap,Ct.normalmap,Ct.displacementmap,{opacity:{value:1}}]),vertexShader:xe.meshnormal_vert,fragmentShader:xe.meshnormal_frag},sprite:{uniforms:yn([Ct.sprite,Ct.fog]),vertexShader:xe.sprite_vert,fragmentShader:xe.sprite_frag},background:{uniforms:{uvTransform:{value:new me},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:xe.background_vert,fragmentShader:xe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new me}},vertexShader:xe.backgroundCube_vert,fragmentShader:xe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:xe.cube_vert,fragmentShader:xe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:xe.equirect_vert,fragmentShader:xe.equirect_frag},distanceRGBA:{uniforms:yn([Ct.common,Ct.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:xe.distanceRGBA_vert,fragmentShader:xe.distanceRGBA_frag},shadow:{uniforms:yn([Ct.lights,Ct.fog,{color:{value:new se(0)},opacity:{value:1}}]),vertexShader:xe.shadow_vert,fragmentShader:xe.shadow_frag}};Qn.physical={uniforms:yn([Qn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new me},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new me},clearcoatNormalScale:{value:new Gt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new me},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new me},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new me},sheen:{value:0},sheenColor:{value:new se(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new me},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new me},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new me},transmissionSamplerSize:{value:new Gt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new me},attenuationDistance:{value:0},attenuationColor:{value:new se(0)},specularColor:{value:new se(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new me},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new me},anisotropyVector:{value:new Gt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new me}}]),vertexShader:xe.meshphysical_vert,fragmentShader:xe.meshphysical_frag};const ao={r:0,b:0,g:0},ji=new ii,G0=new le;function V0(i,t,e,n,s,r,o){const a=new se(0);let l=r===!0?0:1,c,h,u=null,p=0,f=null;function x(b){let v=b.isScene===!0?b.background:null;return v&&v.isTexture&&(v=(b.backgroundBlurriness>0?e:t).get(v)),v}function g(b){let v=!1;const C=x(b);C===null?d(a,l):C&&C.isColor&&(d(C,1),v=!0);const R=i.xr.getEnvironmentBlendMode();R==="additive"?n.buffers.color.setClear(0,0,0,1,o):R==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(b,v){const C=x(v);C&&(C.isCubeTexture||C.mapping===Ro)?(h===void 0&&(h=new ae(new ls(1,1,1),new Yn({name:"BackgroundCubeMaterial",uniforms:Zs(Qn.backgroundCube.uniforms),vertexShader:Qn.backgroundCube.vertexShader,fragmentShader:Qn.backgroundCube.fragmentShader,side:Sn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(R,T,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),ji.copy(v.backgroundRotation),ji.x*=-1,ji.y*=-1,ji.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(ji.y*=-1,ji.z*=-1),h.material.uniforms.envMap.value=C,h.material.uniforms.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(G0.makeRotationFromEuler(ji)),h.material.toneMapped=Le.getTransfer(C.colorSpace)!==ke,(u!==C||p!==C.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,u=C,p=C.version,f=i.toneMapping),h.layers.enableAll(),b.unshift(h,h.geometry,h.material,0,0,null)):C&&C.isTexture&&(c===void 0&&(c=new ae(new Fi(2,2),new Yn({name:"BackgroundMaterial",uniforms:Zs(Qn.background.uniforms),vertexShader:Qn.background.vertexShader,fragmentShader:Qn.background.fragmentShader,side:_i,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=C,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=Le.getTransfer(C.colorSpace)!==ke,C.matrixAutoUpdate===!0&&C.updateMatrix(),c.material.uniforms.uvTransform.value.copy(C.matrix),(u!==C||p!==C.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,u=C,p=C.version,f=i.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function d(b,v){b.getRGB(ao,cu(i)),n.buffers.color.setClear(ao.r,ao.g,ao.b,v,o)}function S(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(b,v=1){a.set(b),l=v,d(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(b){l=b,d(a,l)},render:g,addToRenderList:m,dispose:S}}function W0(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=p(null);let r=s,o=!1;function a(M,I,N,X,J){let B=!1;const W=u(X,N,I);r!==W&&(r=W,c(r.object)),B=f(M,X,N,J),B&&x(M,X,N,J),J!==null&&t.update(J,i.ELEMENT_ARRAY_BUFFER),(B||o)&&(o=!1,v(M,I,N,X),J!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(J).buffer))}function l(){return i.createVertexArray()}function c(M){return i.bindVertexArray(M)}function h(M){return i.deleteVertexArray(M)}function u(M,I,N){const X=N.wireframe===!0;let J=n[M.id];J===void 0&&(J={},n[M.id]=J);let B=J[I.id];B===void 0&&(B={},J[I.id]=B);let W=B[X];return W===void 0&&(W=p(l()),B[X]=W),W}function p(M){const I=[],N=[],X=[];for(let J=0;J<e;J++)I[J]=0,N[J]=0,X[J]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:N,attributeDivisors:X,object:M,attributes:{},index:null}}function f(M,I,N,X){const J=r.attributes,B=I.attributes;let W=0;const Q=N.getAttributes();for(const Y in Q)if(Q[Y].location>=0){const j=J[Y];let Mt=B[Y];if(Mt===void 0&&(Y==="instanceMatrix"&&M.instanceMatrix&&(Mt=M.instanceMatrix),Y==="instanceColor"&&M.instanceColor&&(Mt=M.instanceColor)),j===void 0||j.attribute!==Mt||Mt&&j.data!==Mt.data)return!0;W++}return r.attributesNum!==W||r.index!==X}function x(M,I,N,X){const J={},B=I.attributes;let W=0;const Q=N.getAttributes();for(const Y in Q)if(Q[Y].location>=0){let j=B[Y];j===void 0&&(Y==="instanceMatrix"&&M.instanceMatrix&&(j=M.instanceMatrix),Y==="instanceColor"&&M.instanceColor&&(j=M.instanceColor));const Mt={};Mt.attribute=j,j&&j.data&&(Mt.data=j.data),J[Y]=Mt,W++}r.attributes=J,r.attributesNum=W,r.index=X}function g(){const M=r.newAttributes;for(let I=0,N=M.length;I<N;I++)M[I]=0}function m(M){d(M,0)}function d(M,I){const N=r.newAttributes,X=r.enabledAttributes,J=r.attributeDivisors;N[M]=1,X[M]===0&&(i.enableVertexAttribArray(M),X[M]=1),J[M]!==I&&(i.vertexAttribDivisor(M,I),J[M]=I)}function S(){const M=r.newAttributes,I=r.enabledAttributes;for(let N=0,X=I.length;N<X;N++)I[N]!==M[N]&&(i.disableVertexAttribArray(N),I[N]=0)}function b(M,I,N,X,J,B,W){W===!0?i.vertexAttribIPointer(M,I,N,J,B):i.vertexAttribPointer(M,I,N,X,J,B)}function v(M,I,N,X){g();const J=X.attributes,B=N.getAttributes(),W=I.defaultAttributeValues;for(const Q in B){const Y=B[Q];if(Y.location>=0){let ct=J[Q];if(ct===void 0&&(Q==="instanceMatrix"&&M.instanceMatrix&&(ct=M.instanceMatrix),Q==="instanceColor"&&M.instanceColor&&(ct=M.instanceColor)),ct!==void 0){const j=ct.normalized,Mt=ct.itemSize,Yt=t.get(ct);if(Yt===void 0)continue;const we=Yt.buffer,oe=Yt.type,ht=Yt.bytesPerElement,V=oe===i.INT||oe===i.UNSIGNED_INT||ct.gpuType===Ul;if(ct.isInterleavedBufferAttribute){const st=ct.data,vt=st.stride,Ht=ct.offset;if(st.isInstancedInterleavedBuffer){for(let Nt=0;Nt<Y.locationSize;Nt++)d(Y.location+Nt,st.meshPerAttribute);M.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=st.meshPerAttribute*st.count)}else for(let Nt=0;Nt<Y.locationSize;Nt++)m(Y.location+Nt);i.bindBuffer(i.ARRAY_BUFFER,we);for(let Nt=0;Nt<Y.locationSize;Nt++)b(Y.location+Nt,Mt/Y.locationSize,oe,j,vt*ht,(Ht+Mt/Y.locationSize*Nt)*ht,V)}else{if(ct.isInstancedBufferAttribute){for(let st=0;st<Y.locationSize;st++)d(Y.location+st,ct.meshPerAttribute);M.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=ct.meshPerAttribute*ct.count)}else for(let st=0;st<Y.locationSize;st++)m(Y.location+st);i.bindBuffer(i.ARRAY_BUFFER,we);for(let st=0;st<Y.locationSize;st++)b(Y.location+st,Mt/Y.locationSize,oe,j,Mt*ht,Mt/Y.locationSize*st*ht,V)}}else if(W!==void 0){const j=W[Q];if(j!==void 0)switch(j.length){case 2:i.vertexAttrib2fv(Y.location,j);break;case 3:i.vertexAttrib3fv(Y.location,j);break;case 4:i.vertexAttrib4fv(Y.location,j);break;default:i.vertexAttrib1fv(Y.location,j)}}}}S()}function C(){A();for(const M in n){const I=n[M];for(const N in I){const X=I[N];for(const J in X)h(X[J].object),delete X[J];delete I[N]}delete n[M]}}function R(M){if(n[M.id]===void 0)return;const I=n[M.id];for(const N in I){const X=I[N];for(const J in X)h(X[J].object),delete X[J];delete I[N]}delete n[M.id]}function T(M){for(const I in n){const N=n[I];if(N[M.id]===void 0)continue;const X=N[M.id];for(const J in X)h(X[J].object),delete X[J];delete N[M.id]}}function A(){y(),o=!0,r!==s&&(r=s,c(r.object))}function y(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:A,resetDefaultState:y,dispose:C,releaseStatesOfGeometry:R,releaseStatesOfProgram:T,initAttributes:g,enableAttribute:m,disableUnusedAttributes:S}}function X0(i,t,e){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),e.update(h,n,1)}function o(c,h,u){u!==0&&(i.drawArraysInstanced(n,c,h,u),e.update(h,n,u))}function a(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let x=0;x<u;x++)f+=h[x];e.update(f,n,1)}function l(c,h,u,p){if(u===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let x=0;x<c.length;x++)o(c[x],h[x],p[x]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,p,0,u);let x=0;for(let g=0;g<u;g++)x+=h[g]*p[g];e.update(x,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function q0(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const T=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(T){return!(T!==Ln&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(T){const A=T===Rr&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(T!==ei&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==qn&&!A)}function l(T){if(T==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,p=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),d=i.getParameter(i.MAX_VERTEX_ATTRIBS),S=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),b=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),C=x>0,R=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:p,maxTextures:f,maxVertexTextures:x,maxTextureSize:g,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:S,maxVaryings:b,maxFragmentUniforms:v,vertexTextures:C,maxSamples:R}}function Y0(i){const t=this;let e=null,n=0,s=!1,r=!1;const o=new pi,a=new me,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,p){const f=u.length!==0||p||n!==0||s;return s=p,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,p){e=h(u,p,0)},this.setState=function(u,p,f){const x=u.clippingPlanes,g=u.clipIntersection,m=u.clipShadows,d=i.get(u);if(!s||x===null||x.length===0||r&&!m)r?h(null):c();else{const S=r?0:n,b=S*4;let v=d.clippingState||null;l.value=v,v=h(x,p,b,f);for(let C=0;C!==b;++C)v[C]=e[C];d.clippingState=v,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,p,f,x){const g=u!==null?u.length:0;let m=null;if(g!==0){if(m=l.value,x!==!0||m===null){const d=f+g*4,S=p.matrixWorldInverse;a.getNormalMatrix(S),(m===null||m.length<d)&&(m=new Float32Array(d));for(let b=0,v=f;b!==g;++b,v+=4)o.copy(u[b]).applyMatrix4(S,a),o.normal.toArray(m,v),m[v+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=g,t.numIntersection=0,m}}function $0(i){let t=new WeakMap;function e(o,a){return a===qa?o.mapping=Xs:a===Ya&&(o.mapping=qs),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===qa||a===Ya)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new bf(l.height);return c.fromEquirectangularTexture(i,o),t.set(o,c),o.addEventListener("dispose",s),e(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}const Os=4,ch=[.125,.215,.35,.446,.526,.582],ns=20,_a=new ec,hh=new se;let va=null,Ma=0,ya=0,Sa=!1;const Qi=(1+Math.sqrt(5))/2,Is=1/Qi,uh=[new U(-Qi,Is,0),new U(Qi,Is,0),new U(-Is,0,Qi),new U(Is,0,Qi),new U(0,Qi,-Is),new U(0,Qi,Is),new U(-1,1,-1),new U(1,1,-1),new U(-1,1,1),new U(1,1,1)],Z0=new U;class dh{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100,r={}){const{size:o=256,position:a=Z0}=r;va=this._renderer.getRenderTarget(),Ma=this._renderer.getActiveCubeFace(),ya=this._renderer.getActiveMipmapLevel(),Sa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,s,l,a),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=mh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ph(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(va,Ma,ya),this._renderer.xr.enabled=Sa,t.scissorTest=!1,lo(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Xs||t.mapping===qs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),va=this._renderer.getRenderTarget(),Ma=this._renderer.getActiveCubeFace(),ya=this._renderer.getActiveMipmapLevel(),Sa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Xn,minFilter:Xn,generateMipmaps:!1,type:Rr,format:Ln,colorSpace:$s,depthBuffer:!1},s=fh(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=fh(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=j0(r)),this._blurMaterial=K0(r,t,e)}return s}_compileMaterial(t){const e=new ae(this._lodPlanes[0],t);this._renderer.compile(e,_a)}_sceneToCubeUV(t,e,n,s,r){const l=new Pn(90,1,e,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,p=u.autoClear,f=u.toneMapping;u.getClearColor(hh),u.toneMapping=ki,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null));const g=new is({name:"PMREM.Background",side:Sn,depthWrite:!1,depthTest:!1}),m=new ae(new ls,g);let d=!1;const S=t.background;S?S.isColor&&(g.color.copy(S),t.background=null,d=!0):(g.color.copy(hh),d=!0);for(let b=0;b<6;b++){const v=b%3;v===0?(l.up.set(0,c[b],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[b],r.y,r.z)):v===1?(l.up.set(0,0,c[b]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[b],r.z)):(l.up.set(0,c[b],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[b]));const C=this._cubeSize;lo(s,v*C,b>2?C:0,C,C),u.setRenderTarget(s),d&&u.render(m,l),u.render(t,l)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=f,u.autoClear=p,t.background=S}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===Xs||t.mapping===qs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=mh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ph());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new ae(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const l=this._cubeSize;lo(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,_a)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=uh[(s-r-1)%uh.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new ae(this._lodPlanes[s],c),p=c.uniforms,f=this._sizeLods[n]-1,x=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*ns-1),g=r/x,m=isFinite(r)?1+Math.floor(h*g):ns;m>ns&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ns}`);const d=[];let S=0;for(let T=0;T<ns;++T){const A=T/g,y=Math.exp(-A*A/2);d.push(y),T===0?S+=y:T<m&&(S+=2*y)}for(let T=0;T<d.length;T++)d[T]=d[T]/S;p.envMap.value=t.texture,p.samples.value=m,p.weights.value=d,p.latitudinal.value=o==="latitudinal",a&&(p.poleAxis.value=a);const{_lodMax:b}=this;p.dTheta.value=x,p.mipInt.value=b-n;const v=this._sizeLods[s],C=3*v*(s>b-Os?s-b+Os:0),R=4*(this._cubeSize-v);lo(e,C,R,3*v,2*v),l.setRenderTarget(e),l.render(u,_a)}}function j0(i){const t=[],e=[],n=[];let s=i;const r=i-Os+1+ch.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let l=1/a;o>i-Os?l=ch[o-i+Os-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,u=1+c,p=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,x=6,g=3,m=2,d=1,S=new Float32Array(g*x*f),b=new Float32Array(m*x*f),v=new Float32Array(d*x*f);for(let R=0;R<f;R++){const T=R%3*2/3-1,A=R>2?0:-1,y=[T,A,0,T+2/3,A,0,T+2/3,A+1,0,T,A,0,T+2/3,A+1,0,T,A+1,0];S.set(y,g*x*R),b.set(p,m*x*R);const M=[R,R,R,R,R,R];v.set(M,d*x*R)}const C=new Ce;C.setAttribute("position",new cn(S,g)),C.setAttribute("uv",new cn(b,m)),C.setAttribute("faceIndex",new cn(v,d)),t.push(C),s>Os&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function fh(i,t,e){const n=new Bi(i,t,e);return n.texture.mapping=Ro,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function lo(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function K0(i,t,e){const n=new Float32Array(ns),s=new U(0,1,0);return new Yn({name:"SphericalGaussianBlur",defines:{n:ns,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:nc(),fragmentShader:`

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
		`,blending:Oi,depthTest:!1,depthWrite:!1})}function ph(){return new Yn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:nc(),fragmentShader:`

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
		`,blending:Oi,depthTest:!1,depthWrite:!1})}function mh(){return new Yn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:nc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Oi,depthTest:!1,depthWrite:!1})}function nc(){return`

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
	`}function J0(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===qa||l===Ya,h=l===Xs||l===qs;if(c||h){let u=t.get(a);const p=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==p)return e===null&&(e=new dh(i)),u=c?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const f=a.image;return c&&f&&f.height>0||h&&f&&s(f)?(e===null&&(e=new dh(i)),u=c?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Q0(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&Tr("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function tg(i,t,e,n){const s={},r=new WeakMap;function o(u){const p=u.target;p.index!==null&&t.remove(p.index);for(const x in p.attributes)t.remove(p.attributes[x]);p.removeEventListener("dispose",o),delete s[p.id];const f=r.get(p);f&&(t.remove(f),r.delete(p)),n.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,e.memory.geometries--}function a(u,p){return s[p.id]===!0||(p.addEventListener("dispose",o),s[p.id]=!0,e.memory.geometries++),p}function l(u){const p=u.attributes;for(const f in p)t.update(p[f],i.ARRAY_BUFFER)}function c(u){const p=[],f=u.index,x=u.attributes.position;let g=0;if(f!==null){const S=f.array;g=f.version;for(let b=0,v=S.length;b<v;b+=3){const C=S[b+0],R=S[b+1],T=S[b+2];p.push(C,R,R,T,T,C)}}else if(x!==void 0){const S=x.array;g=x.version;for(let b=0,v=S.length/3-1;b<v;b+=3){const C=b+0,R=b+1,T=b+2;p.push(C,R,R,T,T,C)}}else return;const m=new(ru(p)?lu:Wl)(p,1);m.version=g;const d=r.get(u);d&&t.remove(d),r.set(u,m)}function h(u){const p=r.get(u);if(p){const f=u.index;f!==null&&p.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function eg(i,t,e){let n;function s(p){n=p}let r,o;function a(p){r=p.type,o=p.bytesPerElement}function l(p,f){i.drawElements(n,f,r,p*o),e.update(f,n,1)}function c(p,f,x){x!==0&&(i.drawElementsInstanced(n,f,r,p*o,x),e.update(f,n,x))}function h(p,f,x){if(x===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,p,0,x);let m=0;for(let d=0;d<x;d++)m+=f[d];e.update(m,n,1)}function u(p,f,x,g){if(x===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<p.length;d++)c(p[d]/o,f[d],g[d]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,p,0,g,0,x);let d=0;for(let S=0;S<x;S++)d+=f[S]*g[S];e.update(d,n,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function ng(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function ig(i,t,e){const n=new WeakMap,s=new Pe;function r(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let p=n.get(a);if(p===void 0||p.count!==u){let M=function(){A.dispose(),n.delete(a),a.removeEventListener("dispose",M)};var f=M;p!==void 0&&p.texture.dispose();const x=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,d=a.morphAttributes.position||[],S=a.morphAttributes.normal||[],b=a.morphAttributes.color||[];let v=0;x===!0&&(v=1),g===!0&&(v=2),m===!0&&(v=3);let C=a.attributes.position.count*v,R=1;C>t.maxTextureSize&&(R=Math.ceil(C/t.maxTextureSize),C=t.maxTextureSize);const T=new Float32Array(C*R*4*u),A=new ou(T,C,R,u);A.type=qn,A.needsUpdate=!0;const y=v*4;for(let I=0;I<u;I++){const N=d[I],X=S[I],J=b[I],B=C*R*4*I;for(let W=0;W<N.count;W++){const Q=W*y;x===!0&&(s.fromBufferAttribute(N,W),T[B+Q+0]=s.x,T[B+Q+1]=s.y,T[B+Q+2]=s.z,T[B+Q+3]=0),g===!0&&(s.fromBufferAttribute(X,W),T[B+Q+4]=s.x,T[B+Q+5]=s.y,T[B+Q+6]=s.z,T[B+Q+7]=0),m===!0&&(s.fromBufferAttribute(J,W),T[B+Q+8]=s.x,T[B+Q+9]=s.y,T[B+Q+10]=s.z,T[B+Q+11]=J.itemSize===4?s.w:1)}}p={count:u,texture:A,size:new Gt(C,R)},n.set(a,p),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let x=0;for(let m=0;m<c.length;m++)x+=c[m];const g=a.morphTargetsRelative?1:1-x;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",p.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",p.size)}return{update:r}}function sg(i,t,e,n){let s=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=t.get(l,h);if(s.get(u)!==c&&(t.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const p=l.skeleton;s.get(p)!==c&&(p.update(),s.set(p,c))}return u}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}const yu=new xn,gh=new pu(1,1),Su=new ou,bu=new af,wu=new uu,xh=[],_h=[],vh=new Float32Array(16),Mh=new Float32Array(9),yh=new Float32Array(4);function Ks(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=xh[s];if(r===void 0&&(r=new Float32Array(s),xh[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function rn(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function on(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Io(i,t){let e=_h[t];e===void 0&&(e=new Int32Array(t),_h[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function rg(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function og(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(rn(e,t))return;i.uniform2fv(this.addr,t),on(e,t)}}function ag(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(rn(e,t))return;i.uniform3fv(this.addr,t),on(e,t)}}function lg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(rn(e,t))return;i.uniform4fv(this.addr,t),on(e,t)}}function cg(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(rn(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),on(e,t)}else{if(rn(e,n))return;yh.set(n),i.uniformMatrix2fv(this.addr,!1,yh),on(e,n)}}function hg(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(rn(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),on(e,t)}else{if(rn(e,n))return;Mh.set(n),i.uniformMatrix3fv(this.addr,!1,Mh),on(e,n)}}function ug(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(rn(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),on(e,t)}else{if(rn(e,n))return;vh.set(n),i.uniformMatrix4fv(this.addr,!1,vh),on(e,n)}}function dg(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function fg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(rn(e,t))return;i.uniform2iv(this.addr,t),on(e,t)}}function pg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(rn(e,t))return;i.uniform3iv(this.addr,t),on(e,t)}}function mg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(rn(e,t))return;i.uniform4iv(this.addr,t),on(e,t)}}function gg(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function xg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(rn(e,t))return;i.uniform2uiv(this.addr,t),on(e,t)}}function _g(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(rn(e,t))return;i.uniform3uiv(this.addr,t),on(e,t)}}function vg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(rn(e,t))return;i.uniform4uiv(this.addr,t),on(e,t)}}function Mg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(gh.compareFunction=su,r=gh):r=yu,e.setTexture2D(t||r,s)}function yg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||bu,s)}function Sg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||wu,s)}function bg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Su,s)}function wg(i){switch(i){case 5126:return rg;case 35664:return og;case 35665:return ag;case 35666:return lg;case 35674:return cg;case 35675:return hg;case 35676:return ug;case 5124:case 35670:return dg;case 35667:case 35671:return fg;case 35668:case 35672:return pg;case 35669:case 35673:return mg;case 5125:return gg;case 36294:return xg;case 36295:return _g;case 36296:return vg;case 35678:case 36198:case 36298:case 36306:case 35682:return Mg;case 35679:case 36299:case 36307:return yg;case 35680:case 36300:case 36308:case 36293:return Sg;case 36289:case 36303:case 36311:case 36292:return bg}}function Eg(i,t){i.uniform1fv(this.addr,t)}function Tg(i,t){const e=Ks(t,this.size,2);i.uniform2fv(this.addr,e)}function Ag(i,t){const e=Ks(t,this.size,3);i.uniform3fv(this.addr,e)}function Rg(i,t){const e=Ks(t,this.size,4);i.uniform4fv(this.addr,e)}function Cg(i,t){const e=Ks(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Pg(i,t){const e=Ks(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Dg(i,t){const e=Ks(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Lg(i,t){i.uniform1iv(this.addr,t)}function Ig(i,t){i.uniform2iv(this.addr,t)}function Ug(i,t){i.uniform3iv(this.addr,t)}function zg(i,t){i.uniform4iv(this.addr,t)}function Ng(i,t){i.uniform1uiv(this.addr,t)}function Fg(i,t){i.uniform2uiv(this.addr,t)}function Og(i,t){i.uniform3uiv(this.addr,t)}function kg(i,t){i.uniform4uiv(this.addr,t)}function Bg(i,t,e){const n=this.cache,s=t.length,r=Io(e,s);rn(n,r)||(i.uniform1iv(this.addr,r),on(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||yu,r[o])}function Hg(i,t,e){const n=this.cache,s=t.length,r=Io(e,s);rn(n,r)||(i.uniform1iv(this.addr,r),on(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||bu,r[o])}function Gg(i,t,e){const n=this.cache,s=t.length,r=Io(e,s);rn(n,r)||(i.uniform1iv(this.addr,r),on(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||wu,r[o])}function Vg(i,t,e){const n=this.cache,s=t.length,r=Io(e,s);rn(n,r)||(i.uniform1iv(this.addr,r),on(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Su,r[o])}function Wg(i){switch(i){case 5126:return Eg;case 35664:return Tg;case 35665:return Ag;case 35666:return Rg;case 35674:return Cg;case 35675:return Pg;case 35676:return Dg;case 5124:case 35670:return Lg;case 35667:case 35671:return Ig;case 35668:case 35672:return Ug;case 35669:case 35673:return zg;case 5125:return Ng;case 36294:return Fg;case 36295:return Og;case 36296:return kg;case 35678:case 36198:case 36298:case 36306:case 35682:return Bg;case 35679:case 36299:case 36307:return Hg;case 35680:case 36300:case 36308:case 36293:return Gg;case 36289:case 36303:case 36311:case 36292:return Vg}}class Xg{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=wg(e.type)}}class qg{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Wg(e.type)}}class Yg{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],n)}}}const ba=/(\w+)(\])?(\[|\.)?/g;function Sh(i,t){i.seq.push(t),i.map[t.id]=t}function $g(i,t,e){const n=i.name,s=n.length;for(ba.lastIndex=0;;){const r=ba.exec(n),o=ba.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Sh(e,c===void 0?new Xg(a,i,t):new qg(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new Yg(a),Sh(e,u)),e=u}}}class _o{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);$g(r,o,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&n.push(o)}return n}}function bh(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const Zg=37297;let jg=0;function Kg(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const wh=new me;function Jg(i){Le._getMatrix(wh,Le.workingColorSpace,i);const t=`mat3( ${wh.elements.map(e=>e.toFixed(4))} )`;switch(Le.getTransfer(i)){case Mo:return[t,"LinearTransferOETF"];case ke:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Eh(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+Kg(i.getShaderSource(t),a)}else return r}function Qg(i,t){const e=Jg(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function tx(i,t){let e;switch(t){case vd:e="Linear";break;case Md:e="Reinhard";break;case yd:e="Cineon";break;case $h:e="ACESFilmic";break;case bd:e="AgX";break;case wd:e="Neutral";break;case Sd:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const co=new U;function ex(){Le.getLuminanceCoefficients(co);const i=co.x.toFixed(4),t=co.y.toFixed(4),e=co.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function nx(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(gr).join(`
`)}function ix(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function sx(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function gr(i){return i!==""}function Th(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Ah(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const rx=/^[ \t]*#include +<([\w\d./]+)>/gm;function Al(i){return i.replace(rx,ax)}const ox=new Map;function ax(i,t){let e=xe[t];if(e===void 0){const n=ox.get(t);if(n!==void 0)e=xe[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Al(e)}const lx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Rh(i){return i.replace(lx,cx)}function cx(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Ch(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function hx(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===qh?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Ju?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===di&&(t="SHADOWMAP_TYPE_VSM"),t}function ux(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Xs:case qs:t="ENVMAP_TYPE_CUBE";break;case Ro:t="ENVMAP_TYPE_CUBE_UV";break}return t}function dx(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case qs:t="ENVMAP_MODE_REFRACTION";break}return t}function fx(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Yh:t="ENVMAP_BLENDING_MULTIPLY";break;case xd:t="ENVMAP_BLENDING_MIX";break;case _d:t="ENVMAP_BLENDING_ADD";break}return t}function px(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function mx(i,t,e,n){const s=i.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=hx(e),c=ux(e),h=dx(e),u=fx(e),p=px(e),f=nx(e),x=ix(r),g=s.createProgram();let m,d,S=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(gr).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(gr).join(`
`),d.length>0&&(d+=`
`)):(m=[Ch(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(gr).join(`
`),d=[Ch(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ki?"#define TONE_MAPPING":"",e.toneMapping!==ki?xe.tonemapping_pars_fragment:"",e.toneMapping!==ki?tx("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",xe.colorspace_pars_fragment,Qg("linearToOutputTexel",e.outputColorSpace),ex(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(gr).join(`
`)),o=Al(o),o=Th(o,e),o=Ah(o,e),a=Al(a),a=Th(a,e),a=Ah(a,e),o=Rh(o),a=Rh(a),e.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",e.glslVersion===Sc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Sc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const b=S+m+o,v=S+d+a,C=bh(s,s.VERTEX_SHADER,b),R=bh(s,s.FRAGMENT_SHADER,v);s.attachShader(g,C),s.attachShader(g,R),e.index0AttributeName!==void 0?s.bindAttribLocation(g,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(g,0,"position"),s.linkProgram(g);function T(I){if(i.debug.checkShaderErrors){const N=s.getProgramInfoLog(g)||"",X=s.getShaderInfoLog(C)||"",J=s.getShaderInfoLog(R)||"",B=N.trim(),W=X.trim(),Q=J.trim();let Y=!0,ct=!0;if(s.getProgramParameter(g,s.LINK_STATUS)===!1)if(Y=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,g,C,R);else{const j=Eh(s,C,"vertex"),Mt=Eh(s,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(g,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+B+`
`+j+`
`+Mt)}else B!==""?console.warn("THREE.WebGLProgram: Program Info Log:",B):(W===""||Q==="")&&(ct=!1);ct&&(I.diagnostics={runnable:Y,programLog:B,vertexShader:{log:W,prefix:m},fragmentShader:{log:Q,prefix:d}})}s.deleteShader(C),s.deleteShader(R),A=new _o(s,g),y=sx(s,g)}let A;this.getUniforms=function(){return A===void 0&&T(this),A};let y;this.getAttributes=function(){return y===void 0&&T(this),y};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=s.getProgramParameter(g,Zg)),M},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(g),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=jg++,this.cacheKey=t,this.usedTimes=1,this.program=g,this.vertexShader=C,this.fragmentShader=R,this}let gx=0;class xx{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new _x(t),e.set(t,n)),n}}class _x{constructor(t){this.id=gx++,this.code=t,this.usedTimes=0}}function vx(i,t,e,n,s,r,o){const a=new Vl,l=new xx,c=new Set,h=[],u=s.logarithmicDepthBuffer,p=s.vertexTextures;let f=s.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(y){return c.add(y),y===0?"uv":`uv${y}`}function m(y,M,I,N,X){const J=N.fog,B=X.geometry,W=y.isMeshStandardMaterial?N.environment:null,Q=(y.isMeshStandardMaterial?e:t).get(y.envMap||W),Y=Q&&Q.mapping===Ro?Q.image.height:null,ct=x[y.type];y.precision!==null&&(f=s.getMaxPrecision(y.precision),f!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",f,"instead."));const j=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,Mt=j!==void 0?j.length:0;let Yt=0;B.morphAttributes.position!==void 0&&(Yt=1),B.morphAttributes.normal!==void 0&&(Yt=2),B.morphAttributes.color!==void 0&&(Yt=3);let we,oe,ht,V;if(ct){const ge=Qn[ct];we=ge.vertexShader,oe=ge.fragmentShader}else we=y.vertexShader,oe=y.fragmentShader,l.update(y),ht=l.getVertexShaderID(y),V=l.getFragmentShaderID(y);const st=i.getRenderTarget(),vt=i.state.buffers.depth.getReversed(),Ht=X.isInstancedMesh===!0,Nt=X.isBatchedMesh===!0,ue=!!y.map,ye=!!y.matcap,D=!!Q,Jt=!!y.aoMap,Xt=!!y.lightMap,Vt=!!y.bumpMap,It=!!y.normalMap,te=!!y.displacementMap,pt=!!y.emissiveMap,yt=!!y.metalnessMap,re=!!y.roughnessMap,Re=y.anisotropy>0,P=y.clearcoat>0,w=y.dispersion>0,K=y.iridescence>0,ot=y.sheen>0,at=y.transmission>0,rt=Re&&!!y.anisotropyMap,Ut=P&&!!y.clearcoatMap,lt=P&&!!y.clearcoatNormalMap,bt=P&&!!y.clearcoatRoughnessMap,Rt=K&&!!y.iridescenceMap,mt=K&&!!y.iridescenceThicknessMap,At=ot&&!!y.sheenColorMap,$t=ot&&!!y.sheenRoughnessMap,Ot=!!y.specularMap,wt=!!y.specularColorMap,ce=!!y.specularIntensityMap,G=at&&!!y.transmissionMap,_t=at&&!!y.thicknessMap,Et=!!y.gradientMap,Ft=!!y.alphaMap,gt=y.alphaTest>0,ut=!!y.alphaHash,kt=!!y.extensions;let he=ki;y.toneMapped&&(st===null||st.isXRRenderTarget===!0)&&(he=i.toneMapping);const Ne={shaderID:ct,shaderType:y.type,shaderName:y.name,vertexShader:we,fragmentShader:oe,defines:y.defines,customVertexShaderID:ht,customFragmentShaderID:V,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:f,batching:Nt,batchingColor:Nt&&X._colorsTexture!==null,instancing:Ht,instancingColor:Ht&&X.instanceColor!==null,instancingMorph:Ht&&X.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:st===null?i.outputColorSpace:st.isXRRenderTarget===!0?st.texture.colorSpace:$s,alphaToCoverage:!!y.alphaToCoverage,map:ue,matcap:ye,envMap:D,envMapMode:D&&Q.mapping,envMapCubeUVHeight:Y,aoMap:Jt,lightMap:Xt,bumpMap:Vt,normalMap:It,displacementMap:p&&te,emissiveMap:pt,normalMapObjectSpace:It&&y.normalMapType===Cd,normalMapTangentSpace:It&&y.normalMapType===iu,metalnessMap:yt,roughnessMap:re,anisotropy:Re,anisotropyMap:rt,clearcoat:P,clearcoatMap:Ut,clearcoatNormalMap:lt,clearcoatRoughnessMap:bt,dispersion:w,iridescence:K,iridescenceMap:Rt,iridescenceThicknessMap:mt,sheen:ot,sheenColorMap:At,sheenRoughnessMap:$t,specularMap:Ot,specularColorMap:wt,specularIntensityMap:ce,transmission:at,transmissionMap:G,thicknessMap:_t,gradientMap:Et,opaque:y.transparent===!1&&y.blending===Hs&&y.alphaToCoverage===!1,alphaMap:Ft,alphaTest:gt,alphaHash:ut,combine:y.combine,mapUv:ue&&g(y.map.channel),aoMapUv:Jt&&g(y.aoMap.channel),lightMapUv:Xt&&g(y.lightMap.channel),bumpMapUv:Vt&&g(y.bumpMap.channel),normalMapUv:It&&g(y.normalMap.channel),displacementMapUv:te&&g(y.displacementMap.channel),emissiveMapUv:pt&&g(y.emissiveMap.channel),metalnessMapUv:yt&&g(y.metalnessMap.channel),roughnessMapUv:re&&g(y.roughnessMap.channel),anisotropyMapUv:rt&&g(y.anisotropyMap.channel),clearcoatMapUv:Ut&&g(y.clearcoatMap.channel),clearcoatNormalMapUv:lt&&g(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:bt&&g(y.clearcoatRoughnessMap.channel),iridescenceMapUv:Rt&&g(y.iridescenceMap.channel),iridescenceThicknessMapUv:mt&&g(y.iridescenceThicknessMap.channel),sheenColorMapUv:At&&g(y.sheenColorMap.channel),sheenRoughnessMapUv:$t&&g(y.sheenRoughnessMap.channel),specularMapUv:Ot&&g(y.specularMap.channel),specularColorMapUv:wt&&g(y.specularColorMap.channel),specularIntensityMapUv:ce&&g(y.specularIntensityMap.channel),transmissionMapUv:G&&g(y.transmissionMap.channel),thicknessMapUv:_t&&g(y.thicknessMap.channel),alphaMapUv:Ft&&g(y.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(It||Re),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:X.isPoints===!0&&!!B.attributes.uv&&(ue||Ft),fog:!!J,useFog:y.fog===!0,fogExp2:!!J&&J.isFogExp2,flatShading:y.flatShading===!0&&y.wireframe===!1,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:vt,skinning:X.isSkinnedMesh===!0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:Mt,morphTextureStride:Yt,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:y.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:he,decodeVideoTexture:ue&&y.map.isVideoTexture===!0&&Le.getTransfer(y.map.colorSpace)===ke,decodeVideoTextureEmissive:pt&&y.emissiveMap.isVideoTexture===!0&&Le.getTransfer(y.emissiveMap.colorSpace)===ke,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===$e,flipSided:y.side===Sn,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:kt&&y.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(kt&&y.extensions.multiDraw===!0||Nt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Ne.vertexUv1s=c.has(1),Ne.vertexUv2s=c.has(2),Ne.vertexUv3s=c.has(3),c.clear(),Ne}function d(y){const M=[];if(y.shaderID?M.push(y.shaderID):(M.push(y.customVertexShaderID),M.push(y.customFragmentShaderID)),y.defines!==void 0)for(const I in y.defines)M.push(I),M.push(y.defines[I]);return y.isRawShaderMaterial===!1&&(S(M,y),b(M,y),M.push(i.outputColorSpace)),M.push(y.customProgramCacheKey),M.join()}function S(y,M){y.push(M.precision),y.push(M.outputColorSpace),y.push(M.envMapMode),y.push(M.envMapCubeUVHeight),y.push(M.mapUv),y.push(M.alphaMapUv),y.push(M.lightMapUv),y.push(M.aoMapUv),y.push(M.bumpMapUv),y.push(M.normalMapUv),y.push(M.displacementMapUv),y.push(M.emissiveMapUv),y.push(M.metalnessMapUv),y.push(M.roughnessMapUv),y.push(M.anisotropyMapUv),y.push(M.clearcoatMapUv),y.push(M.clearcoatNormalMapUv),y.push(M.clearcoatRoughnessMapUv),y.push(M.iridescenceMapUv),y.push(M.iridescenceThicknessMapUv),y.push(M.sheenColorMapUv),y.push(M.sheenRoughnessMapUv),y.push(M.specularMapUv),y.push(M.specularColorMapUv),y.push(M.specularIntensityMapUv),y.push(M.transmissionMapUv),y.push(M.thicknessMapUv),y.push(M.combine),y.push(M.fogExp2),y.push(M.sizeAttenuation),y.push(M.morphTargetsCount),y.push(M.morphAttributeCount),y.push(M.numDirLights),y.push(M.numPointLights),y.push(M.numSpotLights),y.push(M.numSpotLightMaps),y.push(M.numHemiLights),y.push(M.numRectAreaLights),y.push(M.numDirLightShadows),y.push(M.numPointLightShadows),y.push(M.numSpotLightShadows),y.push(M.numSpotLightShadowsWithMaps),y.push(M.numLightProbes),y.push(M.shadowMapType),y.push(M.toneMapping),y.push(M.numClippingPlanes),y.push(M.numClipIntersection),y.push(M.depthPacking)}function b(y,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),M.gradientMap&&a.enable(22),y.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reversedDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),y.push(a.mask)}function v(y){const M=x[y.type];let I;if(M){const N=Qn[M];I=wl.clone(N.uniforms)}else I=y.uniforms;return I}function C(y,M){let I;for(let N=0,X=h.length;N<X;N++){const J=h[N];if(J.cacheKey===M){I=J,++I.usedTimes;break}}return I===void 0&&(I=new mx(i,M,y,r),h.push(I)),I}function R(y){if(--y.usedTimes===0){const M=h.indexOf(y);h[M]=h[h.length-1],h.pop(),y.destroy()}}function T(y){l.remove(y)}function A(){l.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:v,acquireProgram:C,releaseProgram:R,releaseShaderCache:T,programs:h,dispose:A}}function Mx(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function yx(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Ph(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Dh(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u,p,f,x,g,m){let d=i[t];return d===void 0?(d={id:u.id,object:u,geometry:p,material:f,groupOrder:x,renderOrder:u.renderOrder,z:g,group:m},i[t]=d):(d.id=u.id,d.object=u,d.geometry=p,d.material=f,d.groupOrder=x,d.renderOrder=u.renderOrder,d.z=g,d.group=m),t++,d}function a(u,p,f,x,g,m){const d=o(u,p,f,x,g,m);f.transmission>0?n.push(d):f.transparent===!0?s.push(d):e.push(d)}function l(u,p,f,x,g,m){const d=o(u,p,f,x,g,m);f.transmission>0?n.unshift(d):f.transparent===!0?s.unshift(d):e.unshift(d)}function c(u,p){e.length>1&&e.sort(u||yx),n.length>1&&n.sort(p||Ph),s.length>1&&s.sort(p||Ph)}function h(){for(let u=t,p=i.length;u<p;u++){const f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:l,finish:h,sort:c}}function Sx(){let i=new WeakMap;function t(n,s){const r=i.get(n);let o;return r===void 0?(o=new Dh,i.set(n,[o])):s>=r.length?(o=new Dh,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function bx(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new U,color:new se};break;case"SpotLight":e={position:new U,direction:new U,color:new se,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new U,color:new se,distance:0,decay:0};break;case"HemisphereLight":e={direction:new U,skyColor:new se,groundColor:new se};break;case"RectAreaLight":e={color:new se,position:new U,halfWidth:new U,halfHeight:new U};break}return i[t.id]=e,e}}}function wx(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Gt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Gt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Gt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let Ex=0;function Tx(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Ax(i){const t=new bx,e=wx(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new U);const s=new U,r=new le,o=new le;function a(c){let h=0,u=0,p=0;for(let y=0;y<9;y++)n.probe[y].set(0,0,0);let f=0,x=0,g=0,m=0,d=0,S=0,b=0,v=0,C=0,R=0,T=0;c.sort(Tx);for(let y=0,M=c.length;y<M;y++){const I=c[y],N=I.color,X=I.intensity,J=I.distance,B=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)h+=N.r*X,u+=N.g*X,p+=N.b*X;else if(I.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(I.sh.coefficients[W],X);T++}else if(I.isDirectionalLight){const W=t.get(I);if(W.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const Q=I.shadow,Y=e.get(I);Y.shadowIntensity=Q.intensity,Y.shadowBias=Q.bias,Y.shadowNormalBias=Q.normalBias,Y.shadowRadius=Q.radius,Y.shadowMapSize=Q.mapSize,n.directionalShadow[f]=Y,n.directionalShadowMap[f]=B,n.directionalShadowMatrix[f]=I.shadow.matrix,S++}n.directional[f]=W,f++}else if(I.isSpotLight){const W=t.get(I);W.position.setFromMatrixPosition(I.matrixWorld),W.color.copy(N).multiplyScalar(X),W.distance=J,W.coneCos=Math.cos(I.angle),W.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),W.decay=I.decay,n.spot[g]=W;const Q=I.shadow;if(I.map&&(n.spotLightMap[C]=I.map,C++,Q.updateMatrices(I),I.castShadow&&R++),n.spotLightMatrix[g]=Q.matrix,I.castShadow){const Y=e.get(I);Y.shadowIntensity=Q.intensity,Y.shadowBias=Q.bias,Y.shadowNormalBias=Q.normalBias,Y.shadowRadius=Q.radius,Y.shadowMapSize=Q.mapSize,n.spotShadow[g]=Y,n.spotShadowMap[g]=B,v++}g++}else if(I.isRectAreaLight){const W=t.get(I);W.color.copy(N).multiplyScalar(X),W.halfWidth.set(I.width*.5,0,0),W.halfHeight.set(0,I.height*.5,0),n.rectArea[m]=W,m++}else if(I.isPointLight){const W=t.get(I);if(W.color.copy(I.color).multiplyScalar(I.intensity),W.distance=I.distance,W.decay=I.decay,I.castShadow){const Q=I.shadow,Y=e.get(I);Y.shadowIntensity=Q.intensity,Y.shadowBias=Q.bias,Y.shadowNormalBias=Q.normalBias,Y.shadowRadius=Q.radius,Y.shadowMapSize=Q.mapSize,Y.shadowCameraNear=Q.camera.near,Y.shadowCameraFar=Q.camera.far,n.pointShadow[x]=Y,n.pointShadowMap[x]=B,n.pointShadowMatrix[x]=I.shadow.matrix,b++}n.point[x]=W,x++}else if(I.isHemisphereLight){const W=t.get(I);W.skyColor.copy(I.color).multiplyScalar(X),W.groundColor.copy(I.groundColor).multiplyScalar(X),n.hemi[d]=W,d++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ct.LTC_FLOAT_1,n.rectAreaLTC2=Ct.LTC_FLOAT_2):(n.rectAreaLTC1=Ct.LTC_HALF_1,n.rectAreaLTC2=Ct.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=p;const A=n.hash;(A.directionalLength!==f||A.pointLength!==x||A.spotLength!==g||A.rectAreaLength!==m||A.hemiLength!==d||A.numDirectionalShadows!==S||A.numPointShadows!==b||A.numSpotShadows!==v||A.numSpotMaps!==C||A.numLightProbes!==T)&&(n.directional.length=f,n.spot.length=g,n.rectArea.length=m,n.point.length=x,n.hemi.length=d,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.pointShadow.length=b,n.pointShadowMap.length=b,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=S,n.pointShadowMatrix.length=b,n.spotLightMatrix.length=v+C-R,n.spotLightMap.length=C,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=T,A.directionalLength=f,A.pointLength=x,A.spotLength=g,A.rectAreaLength=m,A.hemiLength=d,A.numDirectionalShadows=S,A.numPointShadows=b,A.numSpotShadows=v,A.numSpotMaps=C,A.numLightProbes=T,n.version=Ex++)}function l(c,h){let u=0,p=0,f=0,x=0,g=0;const m=h.matrixWorldInverse;for(let d=0,S=c.length;d<S;d++){const b=c[d];if(b.isDirectionalLight){const v=n.directional[u];v.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),u++}else if(b.isSpotLight){const v=n.spot[f];v.position.setFromMatrixPosition(b.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),f++}else if(b.isRectAreaLight){const v=n.rectArea[x];v.position.setFromMatrixPosition(b.matrixWorld),v.position.applyMatrix4(m),o.identity(),r.copy(b.matrixWorld),r.premultiply(m),o.extractRotation(r),v.halfWidth.set(b.width*.5,0,0),v.halfHeight.set(0,b.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),x++}else if(b.isPointLight){const v=n.point[p];v.position.setFromMatrixPosition(b.matrixWorld),v.position.applyMatrix4(m),p++}else if(b.isHemisphereLight){const v=n.hemi[g];v.direction.setFromMatrixPosition(b.matrixWorld),v.direction.transformDirection(m),g++}}}return{setup:a,setupView:l,state:n}}function Lh(i){const t=new Ax(i),e=[],n=[];function s(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function Rx(i){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new Lh(i),t.set(s,[a])):r>=o.length?(a=new Lh(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}const Cx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Px=`uniform sampler2D shadow_pass;
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
}`;function Dx(i,t,e){let n=new Yl;const s=new Gt,r=new Gt,o=new Pe,a=new Kf({depthPacking:Rd}),l=new Jf,c={},h=e.maxTextureSize,u={[_i]:Sn,[Sn]:_i,[$e]:$e},p=new Yn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Gt},radius:{value:4}},vertexShader:Cx,fragmentShader:Px}),f=p.clone();f.defines.HORIZONTAL_PASS=1;const x=new Ce;x.setAttribute("position",new cn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new ae(x,p),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=qh;let d=this.type;this.render=function(R,T,A){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||R.length===0)return;const y=i.getRenderTarget(),M=i.getActiveCubeFace(),I=i.getActiveMipmapLevel(),N=i.state;N.setBlending(Oi),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const X=d!==di&&this.type===di,J=d===di&&this.type!==di;for(let B=0,W=R.length;B<W;B++){const Q=R[B],Y=Q.shadow;if(Y===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(Y.autoUpdate===!1&&Y.needsUpdate===!1)continue;s.copy(Y.mapSize);const ct=Y.getFrameExtents();if(s.multiply(ct),r.copy(Y.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/ct.x),s.x=r.x*ct.x,Y.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/ct.y),s.y=r.y*ct.y,Y.mapSize.y=r.y)),Y.map===null||X===!0||J===!0){const Mt=this.type!==di?{minFilter:In,magFilter:In}:{};Y.map!==null&&Y.map.dispose(),Y.map=new Bi(s.x,s.y,Mt),Y.map.texture.name=Q.name+".shadowMap",Y.camera.updateProjectionMatrix()}i.setRenderTarget(Y.map),i.clear();const j=Y.getViewportCount();for(let Mt=0;Mt<j;Mt++){const Yt=Y.getViewport(Mt);o.set(r.x*Yt.x,r.y*Yt.y,r.x*Yt.z,r.y*Yt.w),N.viewport(o),Y.updateMatrices(Q,Mt),n=Y.getFrustum(),v(T,A,Y.camera,Q,this.type)}Y.isPointLightShadow!==!0&&this.type===di&&S(Y,A),Y.needsUpdate=!1}d=this.type,m.needsUpdate=!1,i.setRenderTarget(y,M,I)};function S(R,T){const A=t.update(g);p.defines.VSM_SAMPLES!==R.blurSamples&&(p.defines.VSM_SAMPLES=R.blurSamples,f.defines.VSM_SAMPLES=R.blurSamples,p.needsUpdate=!0,f.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new Bi(s.x,s.y)),p.uniforms.shadow_pass.value=R.map.texture,p.uniforms.resolution.value=R.mapSize,p.uniforms.radius.value=R.radius,i.setRenderTarget(R.mapPass),i.clear(),i.renderBufferDirect(T,null,A,p,g,null),f.uniforms.shadow_pass.value=R.mapPass.texture,f.uniforms.resolution.value=R.mapSize,f.uniforms.radius.value=R.radius,i.setRenderTarget(R.map),i.clear(),i.renderBufferDirect(T,null,A,f,g,null)}function b(R,T,A,y){let M=null;const I=A.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(I!==void 0)M=I;else if(M=A.isPointLight===!0?l:a,i.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0||T.alphaToCoverage===!0){const N=M.uuid,X=T.uuid;let J=c[N];J===void 0&&(J={},c[N]=J);let B=J[X];B===void 0&&(B=M.clone(),J[X]=B,T.addEventListener("dispose",C)),M=B}if(M.visible=T.visible,M.wireframe=T.wireframe,y===di?M.side=T.shadowSide!==null?T.shadowSide:T.side:M.side=T.shadowSide!==null?T.shadowSide:u[T.side],M.alphaMap=T.alphaMap,M.alphaTest=T.alphaToCoverage===!0?.5:T.alphaTest,M.map=T.map,M.clipShadows=T.clipShadows,M.clippingPlanes=T.clippingPlanes,M.clipIntersection=T.clipIntersection,M.displacementMap=T.displacementMap,M.displacementScale=T.displacementScale,M.displacementBias=T.displacementBias,M.wireframeLinewidth=T.wireframeLinewidth,M.linewidth=T.linewidth,A.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const N=i.properties.get(M);N.light=A}return M}function v(R,T,A,y,M){if(R.visible===!1)return;if(R.layers.test(T.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&M===di)&&(!R.frustumCulled||n.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(A.matrixWorldInverse,R.matrixWorld);const X=t.update(R),J=R.material;if(Array.isArray(J)){const B=X.groups;for(let W=0,Q=B.length;W<Q;W++){const Y=B[W],ct=J[Y.materialIndex];if(ct&&ct.visible){const j=b(R,ct,y,M);R.onBeforeShadow(i,R,T,A,X,j,Y),i.renderBufferDirect(A,null,X,j,R,Y),R.onAfterShadow(i,R,T,A,X,j,Y)}}}else if(J.visible){const B=b(R,J,y,M);R.onBeforeShadow(i,R,T,A,X,B,null),i.renderBufferDirect(A,null,X,B,R,null),R.onAfterShadow(i,R,T,A,X,B,null)}}const N=R.children;for(let X=0,J=N.length;X<J;X++)v(N[X],T,A,y,M)}function C(R){R.target.removeEventListener("dispose",C);for(const A in c){const y=c[A],M=R.target.uuid;M in y&&(y[M].dispose(),delete y[M])}}}const Lx={[ka]:Ba,[Ha]:Wa,[Ga]:Xa,[Ws]:Va,[Ba]:ka,[Wa]:Ha,[Xa]:Ga,[Va]:Ws};function Ix(i,t){function e(){let G=!1;const _t=new Pe;let Et=null;const Ft=new Pe(0,0,0,0);return{setMask:function(gt){Et!==gt&&!G&&(i.colorMask(gt,gt,gt,gt),Et=gt)},setLocked:function(gt){G=gt},setClear:function(gt,ut,kt,he,Ne){Ne===!0&&(gt*=he,ut*=he,kt*=he),_t.set(gt,ut,kt,he),Ft.equals(_t)===!1&&(i.clearColor(gt,ut,kt,he),Ft.copy(_t))},reset:function(){G=!1,Et=null,Ft.set(-1,0,0,0)}}}function n(){let G=!1,_t=!1,Et=null,Ft=null,gt=null;return{setReversed:function(ut){if(_t!==ut){const kt=t.get("EXT_clip_control");ut?kt.clipControlEXT(kt.LOWER_LEFT_EXT,kt.ZERO_TO_ONE_EXT):kt.clipControlEXT(kt.LOWER_LEFT_EXT,kt.NEGATIVE_ONE_TO_ONE_EXT),_t=ut;const he=gt;gt=null,this.setClear(he)}},getReversed:function(){return _t},setTest:function(ut){ut?st(i.DEPTH_TEST):vt(i.DEPTH_TEST)},setMask:function(ut){Et!==ut&&!G&&(i.depthMask(ut),Et=ut)},setFunc:function(ut){if(_t&&(ut=Lx[ut]),Ft!==ut){switch(ut){case ka:i.depthFunc(i.NEVER);break;case Ba:i.depthFunc(i.ALWAYS);break;case Ha:i.depthFunc(i.LESS);break;case Ws:i.depthFunc(i.LEQUAL);break;case Ga:i.depthFunc(i.EQUAL);break;case Va:i.depthFunc(i.GEQUAL);break;case Wa:i.depthFunc(i.GREATER);break;case Xa:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Ft=ut}},setLocked:function(ut){G=ut},setClear:function(ut){gt!==ut&&(_t&&(ut=1-ut),i.clearDepth(ut),gt=ut)},reset:function(){G=!1,Et=null,Ft=null,gt=null,_t=!1}}}function s(){let G=!1,_t=null,Et=null,Ft=null,gt=null,ut=null,kt=null,he=null,Ne=null;return{setTest:function(ge){G||(ge?st(i.STENCIL_TEST):vt(i.STENCIL_TEST))},setMask:function(ge){_t!==ge&&!G&&(i.stencilMask(ge),_t=ge)},setFunc:function(ge,_n,Tn){(Et!==ge||Ft!==_n||gt!==Tn)&&(i.stencilFunc(ge,_n,Tn),Et=ge,Ft=_n,gt=Tn)},setOp:function(ge,_n,Tn){(ut!==ge||kt!==_n||he!==Tn)&&(i.stencilOp(ge,_n,Tn),ut=ge,kt=_n,he=Tn)},setLocked:function(ge){G=ge},setClear:function(ge){Ne!==ge&&(i.clearStencil(ge),Ne=ge)},reset:function(){G=!1,_t=null,Et=null,Ft=null,gt=null,ut=null,kt=null,he=null,Ne=null}}}const r=new e,o=new n,a=new s,l=new WeakMap,c=new WeakMap;let h={},u={},p=new WeakMap,f=[],x=null,g=!1,m=null,d=null,S=null,b=null,v=null,C=null,R=null,T=new se(0,0,0),A=0,y=!1,M=null,I=null,N=null,X=null,J=null;const B=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,Q=0;const Y=i.getParameter(i.VERSION);Y.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(Y)[1]),W=Q>=1):Y.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),W=Q>=2);let ct=null,j={};const Mt=i.getParameter(i.SCISSOR_BOX),Yt=i.getParameter(i.VIEWPORT),we=new Pe().fromArray(Mt),oe=new Pe().fromArray(Yt);function ht(G,_t,Et,Ft){const gt=new Uint8Array(4),ut=i.createTexture();i.bindTexture(G,ut),i.texParameteri(G,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(G,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let kt=0;kt<Et;kt++)G===i.TEXTURE_3D||G===i.TEXTURE_2D_ARRAY?i.texImage3D(_t,0,i.RGBA,1,1,Ft,0,i.RGBA,i.UNSIGNED_BYTE,gt):i.texImage2D(_t+kt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,gt);return ut}const V={};V[i.TEXTURE_2D]=ht(i.TEXTURE_2D,i.TEXTURE_2D,1),V[i.TEXTURE_CUBE_MAP]=ht(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),V[i.TEXTURE_2D_ARRAY]=ht(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),V[i.TEXTURE_3D]=ht(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),st(i.DEPTH_TEST),o.setFunc(Ws),Vt(!1),It(mc),st(i.CULL_FACE),Jt(Oi);function st(G){h[G]!==!0&&(i.enable(G),h[G]=!0)}function vt(G){h[G]!==!1&&(i.disable(G),h[G]=!1)}function Ht(G,_t){return u[G]!==_t?(i.bindFramebuffer(G,_t),u[G]=_t,G===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=_t),G===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=_t),!0):!1}function Nt(G,_t){let Et=f,Ft=!1;if(G){Et=p.get(_t),Et===void 0&&(Et=[],p.set(_t,Et));const gt=G.textures;if(Et.length!==gt.length||Et[0]!==i.COLOR_ATTACHMENT0){for(let ut=0,kt=gt.length;ut<kt;ut++)Et[ut]=i.COLOR_ATTACHMENT0+ut;Et.length=gt.length,Ft=!0}}else Et[0]!==i.BACK&&(Et[0]=i.BACK,Ft=!0);Ft&&i.drawBuffers(Et)}function ue(G){return x!==G?(i.useProgram(G),x=G,!0):!1}const ye={[es]:i.FUNC_ADD,[td]:i.FUNC_SUBTRACT,[ed]:i.FUNC_REVERSE_SUBTRACT};ye[nd]=i.MIN,ye[id]=i.MAX;const D={[sd]:i.ZERO,[rd]:i.ONE,[od]:i.SRC_COLOR,[Fa]:i.SRC_ALPHA,[dd]:i.SRC_ALPHA_SATURATE,[hd]:i.DST_COLOR,[ld]:i.DST_ALPHA,[ad]:i.ONE_MINUS_SRC_COLOR,[Oa]:i.ONE_MINUS_SRC_ALPHA,[ud]:i.ONE_MINUS_DST_COLOR,[cd]:i.ONE_MINUS_DST_ALPHA,[fd]:i.CONSTANT_COLOR,[pd]:i.ONE_MINUS_CONSTANT_COLOR,[md]:i.CONSTANT_ALPHA,[gd]:i.ONE_MINUS_CONSTANT_ALPHA};function Jt(G,_t,Et,Ft,gt,ut,kt,he,Ne,ge){if(G===Oi){g===!0&&(vt(i.BLEND),g=!1);return}if(g===!1&&(st(i.BLEND),g=!0),G!==Qu){if(G!==m||ge!==y){if((d!==es||v!==es)&&(i.blendEquation(i.FUNC_ADD),d=es,v=es),ge)switch(G){case Hs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case gc:i.blendFunc(i.ONE,i.ONE);break;case xc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case _c:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",G);break}else switch(G){case Hs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case gc:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case xc:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case _c:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",G);break}S=null,b=null,C=null,R=null,T.set(0,0,0),A=0,m=G,y=ge}return}gt=gt||_t,ut=ut||Et,kt=kt||Ft,(_t!==d||gt!==v)&&(i.blendEquationSeparate(ye[_t],ye[gt]),d=_t,v=gt),(Et!==S||Ft!==b||ut!==C||kt!==R)&&(i.blendFuncSeparate(D[Et],D[Ft],D[ut],D[kt]),S=Et,b=Ft,C=ut,R=kt),(he.equals(T)===!1||Ne!==A)&&(i.blendColor(he.r,he.g,he.b,Ne),T.copy(he),A=Ne),m=G,y=!1}function Xt(G,_t){G.side===$e?vt(i.CULL_FACE):st(i.CULL_FACE);let Et=G.side===Sn;_t&&(Et=!Et),Vt(Et),G.blending===Hs&&G.transparent===!1?Jt(Oi):Jt(G.blending,G.blendEquation,G.blendSrc,G.blendDst,G.blendEquationAlpha,G.blendSrcAlpha,G.blendDstAlpha,G.blendColor,G.blendAlpha,G.premultipliedAlpha),o.setFunc(G.depthFunc),o.setTest(G.depthTest),o.setMask(G.depthWrite),r.setMask(G.colorWrite);const Ft=G.stencilWrite;a.setTest(Ft),Ft&&(a.setMask(G.stencilWriteMask),a.setFunc(G.stencilFunc,G.stencilRef,G.stencilFuncMask),a.setOp(G.stencilFail,G.stencilZFail,G.stencilZPass)),pt(G.polygonOffset,G.polygonOffsetFactor,G.polygonOffsetUnits),G.alphaToCoverage===!0?st(i.SAMPLE_ALPHA_TO_COVERAGE):vt(i.SAMPLE_ALPHA_TO_COVERAGE)}function Vt(G){M!==G&&(G?i.frontFace(i.CW):i.frontFace(i.CCW),M=G)}function It(G){G!==ju?(st(i.CULL_FACE),G!==I&&(G===mc?i.cullFace(i.BACK):G===Ku?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):vt(i.CULL_FACE),I=G}function te(G){G!==N&&(W&&i.lineWidth(G),N=G)}function pt(G,_t,Et){G?(st(i.POLYGON_OFFSET_FILL),(X!==_t||J!==Et)&&(i.polygonOffset(_t,Et),X=_t,J=Et)):vt(i.POLYGON_OFFSET_FILL)}function yt(G){G?st(i.SCISSOR_TEST):vt(i.SCISSOR_TEST)}function re(G){G===void 0&&(G=i.TEXTURE0+B-1),ct!==G&&(i.activeTexture(G),ct=G)}function Re(G,_t,Et){Et===void 0&&(ct===null?Et=i.TEXTURE0+B-1:Et=ct);let Ft=j[Et];Ft===void 0&&(Ft={type:void 0,texture:void 0},j[Et]=Ft),(Ft.type!==G||Ft.texture!==_t)&&(ct!==Et&&(i.activeTexture(Et),ct=Et),i.bindTexture(G,_t||V[G]),Ft.type=G,Ft.texture=_t)}function P(){const G=j[ct];G!==void 0&&G.type!==void 0&&(i.bindTexture(G.type,null),G.type=void 0,G.texture=void 0)}function w(){try{i.compressedTexImage2D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function K(){try{i.compressedTexImage3D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function ot(){try{i.texSubImage2D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function at(){try{i.texSubImage3D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function rt(){try{i.compressedTexSubImage2D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Ut(){try{i.compressedTexSubImage3D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function lt(){try{i.texStorage2D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function bt(){try{i.texStorage3D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Rt(){try{i.texImage2D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function mt(){try{i.texImage3D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function At(G){we.equals(G)===!1&&(i.scissor(G.x,G.y,G.z,G.w),we.copy(G))}function $t(G){oe.equals(G)===!1&&(i.viewport(G.x,G.y,G.z,G.w),oe.copy(G))}function Ot(G,_t){let Et=c.get(_t);Et===void 0&&(Et=new WeakMap,c.set(_t,Et));let Ft=Et.get(G);Ft===void 0&&(Ft=i.getUniformBlockIndex(_t,G.name),Et.set(G,Ft))}function wt(G,_t){const Ft=c.get(_t).get(G);l.get(_t)!==Ft&&(i.uniformBlockBinding(_t,Ft,G.__bindingPointIndex),l.set(_t,Ft))}function ce(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},ct=null,j={},u={},p=new WeakMap,f=[],x=null,g=!1,m=null,d=null,S=null,b=null,v=null,C=null,R=null,T=new se(0,0,0),A=0,y=!1,M=null,I=null,N=null,X=null,J=null,we.set(0,0,i.canvas.width,i.canvas.height),oe.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:st,disable:vt,bindFramebuffer:Ht,drawBuffers:Nt,useProgram:ue,setBlending:Jt,setMaterial:Xt,setFlipSided:Vt,setCullFace:It,setLineWidth:te,setPolygonOffset:pt,setScissorTest:yt,activeTexture:re,bindTexture:Re,unbindTexture:P,compressedTexImage2D:w,compressedTexImage3D:K,texImage2D:Rt,texImage3D:mt,updateUBOMapping:Ot,uniformBlockBinding:wt,texStorage2D:lt,texStorage3D:bt,texSubImage2D:ot,texSubImage3D:at,compressedTexSubImage2D:rt,compressedTexSubImage3D:Ut,scissor:At,viewport:$t,reset:ce}}function Ux(i,t,e,n,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Gt,h=new WeakMap;let u;const p=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(P,w){return f?new OffscreenCanvas(P,w):So("canvas")}function g(P,w,K){let ot=1;const at=Re(P);if((at.width>K||at.height>K)&&(ot=K/Math.max(at.width,at.height)),ot<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const rt=Math.floor(ot*at.width),Ut=Math.floor(ot*at.height);u===void 0&&(u=x(rt,Ut));const lt=w?x(rt,Ut):u;return lt.width=rt,lt.height=Ut,lt.getContext("2d").drawImage(P,0,0,rt,Ut),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+at.width+"x"+at.height+") to ("+rt+"x"+Ut+")."),lt}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+at.width+"x"+at.height+")."),P;return P}function m(P){return P.generateMipmaps}function d(P){i.generateMipmap(P)}function S(P){return P.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?i.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function b(P,w,K,ot,at=!1){if(P!==null){if(i[P]!==void 0)return i[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let rt=w;if(w===i.RED&&(K===i.FLOAT&&(rt=i.R32F),K===i.HALF_FLOAT&&(rt=i.R16F),K===i.UNSIGNED_BYTE&&(rt=i.R8)),w===i.RED_INTEGER&&(K===i.UNSIGNED_BYTE&&(rt=i.R8UI),K===i.UNSIGNED_SHORT&&(rt=i.R16UI),K===i.UNSIGNED_INT&&(rt=i.R32UI),K===i.BYTE&&(rt=i.R8I),K===i.SHORT&&(rt=i.R16I),K===i.INT&&(rt=i.R32I)),w===i.RG&&(K===i.FLOAT&&(rt=i.RG32F),K===i.HALF_FLOAT&&(rt=i.RG16F),K===i.UNSIGNED_BYTE&&(rt=i.RG8)),w===i.RG_INTEGER&&(K===i.UNSIGNED_BYTE&&(rt=i.RG8UI),K===i.UNSIGNED_SHORT&&(rt=i.RG16UI),K===i.UNSIGNED_INT&&(rt=i.RG32UI),K===i.BYTE&&(rt=i.RG8I),K===i.SHORT&&(rt=i.RG16I),K===i.INT&&(rt=i.RG32I)),w===i.RGB_INTEGER&&(K===i.UNSIGNED_BYTE&&(rt=i.RGB8UI),K===i.UNSIGNED_SHORT&&(rt=i.RGB16UI),K===i.UNSIGNED_INT&&(rt=i.RGB32UI),K===i.BYTE&&(rt=i.RGB8I),K===i.SHORT&&(rt=i.RGB16I),K===i.INT&&(rt=i.RGB32I)),w===i.RGBA_INTEGER&&(K===i.UNSIGNED_BYTE&&(rt=i.RGBA8UI),K===i.UNSIGNED_SHORT&&(rt=i.RGBA16UI),K===i.UNSIGNED_INT&&(rt=i.RGBA32UI),K===i.BYTE&&(rt=i.RGBA8I),K===i.SHORT&&(rt=i.RGBA16I),K===i.INT&&(rt=i.RGBA32I)),w===i.RGB&&(K===i.UNSIGNED_INT_5_9_9_9_REV&&(rt=i.RGB9_E5),K===i.UNSIGNED_INT_10F_11F_11F_REV&&(rt=i.R11F_G11F_B10F)),w===i.RGBA){const Ut=at?Mo:Le.getTransfer(ot);K===i.FLOAT&&(rt=i.RGBA32F),K===i.HALF_FLOAT&&(rt=i.RGBA16F),K===i.UNSIGNED_BYTE&&(rt=Ut===ke?i.SRGB8_ALPHA8:i.RGBA8),K===i.UNSIGNED_SHORT_4_4_4_4&&(rt=i.RGBA4),K===i.UNSIGNED_SHORT_5_5_5_1&&(rt=i.RGB5_A1)}return(rt===i.R16F||rt===i.R32F||rt===i.RG16F||rt===i.RG32F||rt===i.RGBA16F||rt===i.RGBA32F)&&t.get("EXT_color_buffer_float"),rt}function v(P,w){let K;return P?w===null||w===os||w===Sr?K=i.DEPTH24_STENCIL8:w===qn?K=i.DEPTH32F_STENCIL8:w===yr&&(K=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===os||w===Sr?K=i.DEPTH_COMPONENT24:w===qn?K=i.DEPTH_COMPONENT32F:w===yr&&(K=i.DEPTH_COMPONENT16),K}function C(P,w){return m(P)===!0||P.isFramebufferTexture&&P.minFilter!==In&&P.minFilter!==Xn?Math.log2(Math.max(w.width,w.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?w.mipmaps.length:1}function R(P){const w=P.target;w.removeEventListener("dispose",R),A(w),w.isVideoTexture&&h.delete(w)}function T(P){const w=P.target;w.removeEventListener("dispose",T),M(w)}function A(P){const w=n.get(P);if(w.__webglInit===void 0)return;const K=P.source,ot=p.get(K);if(ot){const at=ot[w.__cacheKey];at.usedTimes--,at.usedTimes===0&&y(P),Object.keys(ot).length===0&&p.delete(K)}n.remove(P)}function y(P){const w=n.get(P);i.deleteTexture(w.__webglTexture);const K=P.source,ot=p.get(K);delete ot[w.__cacheKey],o.memory.textures--}function M(P){const w=n.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),n.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let ot=0;ot<6;ot++){if(Array.isArray(w.__webglFramebuffer[ot]))for(let at=0;at<w.__webglFramebuffer[ot].length;at++)i.deleteFramebuffer(w.__webglFramebuffer[ot][at]);else i.deleteFramebuffer(w.__webglFramebuffer[ot]);w.__webglDepthbuffer&&i.deleteRenderbuffer(w.__webglDepthbuffer[ot])}else{if(Array.isArray(w.__webglFramebuffer))for(let ot=0;ot<w.__webglFramebuffer.length;ot++)i.deleteFramebuffer(w.__webglFramebuffer[ot]);else i.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&i.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&i.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let ot=0;ot<w.__webglColorRenderbuffer.length;ot++)w.__webglColorRenderbuffer[ot]&&i.deleteRenderbuffer(w.__webglColorRenderbuffer[ot]);w.__webglDepthRenderbuffer&&i.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const K=P.textures;for(let ot=0,at=K.length;ot<at;ot++){const rt=n.get(K[ot]);rt.__webglTexture&&(i.deleteTexture(rt.__webglTexture),o.memory.textures--),n.remove(K[ot])}n.remove(P)}let I=0;function N(){I=0}function X(){const P=I;return P>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+s.maxTextures),I+=1,P}function J(P){const w=[];return w.push(P.wrapS),w.push(P.wrapT),w.push(P.wrapR||0),w.push(P.magFilter),w.push(P.minFilter),w.push(P.anisotropy),w.push(P.internalFormat),w.push(P.format),w.push(P.type),w.push(P.generateMipmaps),w.push(P.premultiplyAlpha),w.push(P.flipY),w.push(P.unpackAlignment),w.push(P.colorSpace),w.join()}function B(P,w){const K=n.get(P);if(P.isVideoTexture&&yt(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&K.__version!==P.version){const ot=P.image;if(ot===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ot.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{V(K,P,w);return}}else P.isExternalTexture&&(K.__webglTexture=P.sourceTexture?P.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,K.__webglTexture,i.TEXTURE0+w)}function W(P,w){const K=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&K.__version!==P.version){V(K,P,w);return}e.bindTexture(i.TEXTURE_2D_ARRAY,K.__webglTexture,i.TEXTURE0+w)}function Q(P,w){const K=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&K.__version!==P.version){V(K,P,w);return}e.bindTexture(i.TEXTURE_3D,K.__webglTexture,i.TEXTURE0+w)}function Y(P,w){const K=n.get(P);if(P.version>0&&K.__version!==P.version){st(K,P,w);return}e.bindTexture(i.TEXTURE_CUBE_MAP,K.__webglTexture,i.TEXTURE0+w)}const ct={[Ys]:i.REPEAT,[zi]:i.CLAMP_TO_EDGE,[$a]:i.MIRRORED_REPEAT},j={[In]:i.NEAREST,[Td]:i.NEAREST_MIPMAP_NEAREST,[zr]:i.NEAREST_MIPMAP_LINEAR,[Xn]:i.LINEAR,[Ho]:i.LINEAR_MIPMAP_NEAREST,[Ni]:i.LINEAR_MIPMAP_LINEAR},Mt={[Pd]:i.NEVER,[Nd]:i.ALWAYS,[Dd]:i.LESS,[su]:i.LEQUAL,[Ld]:i.EQUAL,[zd]:i.GEQUAL,[Id]:i.GREATER,[Ud]:i.NOTEQUAL};function Yt(P,w){if(w.type===qn&&t.has("OES_texture_float_linear")===!1&&(w.magFilter===Xn||w.magFilter===Ho||w.magFilter===zr||w.magFilter===Ni||w.minFilter===Xn||w.minFilter===Ho||w.minFilter===zr||w.minFilter===Ni)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(P,i.TEXTURE_WRAP_S,ct[w.wrapS]),i.texParameteri(P,i.TEXTURE_WRAP_T,ct[w.wrapT]),(P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY)&&i.texParameteri(P,i.TEXTURE_WRAP_R,ct[w.wrapR]),i.texParameteri(P,i.TEXTURE_MAG_FILTER,j[w.magFilter]),i.texParameteri(P,i.TEXTURE_MIN_FILTER,j[w.minFilter]),w.compareFunction&&(i.texParameteri(P,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(P,i.TEXTURE_COMPARE_FUNC,Mt[w.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===In||w.minFilter!==zr&&w.minFilter!==Ni||w.type===qn&&t.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){const K=t.get("EXT_texture_filter_anisotropic");i.texParameterf(P,K.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,s.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function we(P,w){let K=!1;P.__webglInit===void 0&&(P.__webglInit=!0,w.addEventListener("dispose",R));const ot=w.source;let at=p.get(ot);at===void 0&&(at={},p.set(ot,at));const rt=J(w);if(rt!==P.__cacheKey){at[rt]===void 0&&(at[rt]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,K=!0),at[rt].usedTimes++;const Ut=at[P.__cacheKey];Ut!==void 0&&(at[P.__cacheKey].usedTimes--,Ut.usedTimes===0&&y(w)),P.__cacheKey=rt,P.__webglTexture=at[rt].texture}return K}function oe(P,w,K){return Math.floor(Math.floor(P/K)/w)}function ht(P,w,K,ot){const rt=P.updateRanges;if(rt.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,w.width,w.height,K,ot,w.data);else{rt.sort((mt,At)=>mt.start-At.start);let Ut=0;for(let mt=1;mt<rt.length;mt++){const At=rt[Ut],$t=rt[mt],Ot=At.start+At.count,wt=oe($t.start,w.width,4),ce=oe(At.start,w.width,4);$t.start<=Ot+1&&wt===ce&&oe($t.start+$t.count-1,w.width,4)===wt?At.count=Math.max(At.count,$t.start+$t.count-At.start):(++Ut,rt[Ut]=$t)}rt.length=Ut+1;const lt=i.getParameter(i.UNPACK_ROW_LENGTH),bt=i.getParameter(i.UNPACK_SKIP_PIXELS),Rt=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,w.width);for(let mt=0,At=rt.length;mt<At;mt++){const $t=rt[mt],Ot=Math.floor($t.start/4),wt=Math.ceil($t.count/4),ce=Ot%w.width,G=Math.floor(Ot/w.width),_t=wt,Et=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,ce),i.pixelStorei(i.UNPACK_SKIP_ROWS,G),e.texSubImage2D(i.TEXTURE_2D,0,ce,G,_t,Et,K,ot,w.data)}P.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,lt),i.pixelStorei(i.UNPACK_SKIP_PIXELS,bt),i.pixelStorei(i.UNPACK_SKIP_ROWS,Rt)}}function V(P,w,K){let ot=i.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(ot=i.TEXTURE_2D_ARRAY),w.isData3DTexture&&(ot=i.TEXTURE_3D);const at=we(P,w),rt=w.source;e.bindTexture(ot,P.__webglTexture,i.TEXTURE0+K);const Ut=n.get(rt);if(rt.version!==Ut.__version||at===!0){e.activeTexture(i.TEXTURE0+K);const lt=Le.getPrimaries(Le.workingColorSpace),bt=w.colorSpace===mi?null:Le.getPrimaries(w.colorSpace),Rt=w.colorSpace===mi||lt===bt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,w.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,w.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Rt);let mt=g(w.image,!1,s.maxTextureSize);mt=re(w,mt);const At=r.convert(w.format,w.colorSpace),$t=r.convert(w.type);let Ot=b(w.internalFormat,At,$t,w.colorSpace,w.isVideoTexture);Yt(ot,w);let wt;const ce=w.mipmaps,G=w.isVideoTexture!==!0,_t=Ut.__version===void 0||at===!0,Et=rt.dataReady,Ft=C(w,mt);if(w.isDepthTexture)Ot=v(w.format===wr,w.type),_t&&(G?e.texStorage2D(i.TEXTURE_2D,1,Ot,mt.width,mt.height):e.texImage2D(i.TEXTURE_2D,0,Ot,mt.width,mt.height,0,At,$t,null));else if(w.isDataTexture)if(ce.length>0){G&&_t&&e.texStorage2D(i.TEXTURE_2D,Ft,Ot,ce[0].width,ce[0].height);for(let gt=0,ut=ce.length;gt<ut;gt++)wt=ce[gt],G?Et&&e.texSubImage2D(i.TEXTURE_2D,gt,0,0,wt.width,wt.height,At,$t,wt.data):e.texImage2D(i.TEXTURE_2D,gt,Ot,wt.width,wt.height,0,At,$t,wt.data);w.generateMipmaps=!1}else G?(_t&&e.texStorage2D(i.TEXTURE_2D,Ft,Ot,mt.width,mt.height),Et&&ht(w,mt,At,$t)):e.texImage2D(i.TEXTURE_2D,0,Ot,mt.width,mt.height,0,At,$t,mt.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){G&&_t&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Ft,Ot,ce[0].width,ce[0].height,mt.depth);for(let gt=0,ut=ce.length;gt<ut;gt++)if(wt=ce[gt],w.format!==Ln)if(At!==null)if(G){if(Et)if(w.layerUpdates.size>0){const kt=lh(wt.width,wt.height,w.format,w.type);for(const he of w.layerUpdates){const Ne=wt.data.subarray(he*kt/wt.data.BYTES_PER_ELEMENT,(he+1)*kt/wt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,gt,0,0,he,wt.width,wt.height,1,At,Ne)}w.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,gt,0,0,0,wt.width,wt.height,mt.depth,At,wt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,gt,Ot,wt.width,wt.height,mt.depth,0,wt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else G?Et&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,gt,0,0,0,wt.width,wt.height,mt.depth,At,$t,wt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,gt,Ot,wt.width,wt.height,mt.depth,0,At,$t,wt.data)}else{G&&_t&&e.texStorage2D(i.TEXTURE_2D,Ft,Ot,ce[0].width,ce[0].height);for(let gt=0,ut=ce.length;gt<ut;gt++)wt=ce[gt],w.format!==Ln?At!==null?G?Et&&e.compressedTexSubImage2D(i.TEXTURE_2D,gt,0,0,wt.width,wt.height,At,wt.data):e.compressedTexImage2D(i.TEXTURE_2D,gt,Ot,wt.width,wt.height,0,wt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):G?Et&&e.texSubImage2D(i.TEXTURE_2D,gt,0,0,wt.width,wt.height,At,$t,wt.data):e.texImage2D(i.TEXTURE_2D,gt,Ot,wt.width,wt.height,0,At,$t,wt.data)}else if(w.isDataArrayTexture)if(G){if(_t&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Ft,Ot,mt.width,mt.height,mt.depth),Et)if(w.layerUpdates.size>0){const gt=lh(mt.width,mt.height,w.format,w.type);for(const ut of w.layerUpdates){const kt=mt.data.subarray(ut*gt/mt.data.BYTES_PER_ELEMENT,(ut+1)*gt/mt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ut,mt.width,mt.height,1,At,$t,kt)}w.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,mt.width,mt.height,mt.depth,At,$t,mt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Ot,mt.width,mt.height,mt.depth,0,At,$t,mt.data);else if(w.isData3DTexture)G?(_t&&e.texStorage3D(i.TEXTURE_3D,Ft,Ot,mt.width,mt.height,mt.depth),Et&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,mt.width,mt.height,mt.depth,At,$t,mt.data)):e.texImage3D(i.TEXTURE_3D,0,Ot,mt.width,mt.height,mt.depth,0,At,$t,mt.data);else if(w.isFramebufferTexture){if(_t)if(G)e.texStorage2D(i.TEXTURE_2D,Ft,Ot,mt.width,mt.height);else{let gt=mt.width,ut=mt.height;for(let kt=0;kt<Ft;kt++)e.texImage2D(i.TEXTURE_2D,kt,Ot,gt,ut,0,At,$t,null),gt>>=1,ut>>=1}}else if(ce.length>0){if(G&&_t){const gt=Re(ce[0]);e.texStorage2D(i.TEXTURE_2D,Ft,Ot,gt.width,gt.height)}for(let gt=0,ut=ce.length;gt<ut;gt++)wt=ce[gt],G?Et&&e.texSubImage2D(i.TEXTURE_2D,gt,0,0,At,$t,wt):e.texImage2D(i.TEXTURE_2D,gt,Ot,At,$t,wt);w.generateMipmaps=!1}else if(G){if(_t){const gt=Re(mt);e.texStorage2D(i.TEXTURE_2D,Ft,Ot,gt.width,gt.height)}Et&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,At,$t,mt)}else e.texImage2D(i.TEXTURE_2D,0,Ot,At,$t,mt);m(w)&&d(ot),Ut.__version=rt.version,w.onUpdate&&w.onUpdate(w)}P.__version=w.version}function st(P,w,K){if(w.image.length!==6)return;const ot=we(P,w),at=w.source;e.bindTexture(i.TEXTURE_CUBE_MAP,P.__webglTexture,i.TEXTURE0+K);const rt=n.get(at);if(at.version!==rt.__version||ot===!0){e.activeTexture(i.TEXTURE0+K);const Ut=Le.getPrimaries(Le.workingColorSpace),lt=w.colorSpace===mi?null:Le.getPrimaries(w.colorSpace),bt=w.colorSpace===mi||Ut===lt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,w.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,w.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,bt);const Rt=w.isCompressedTexture||w.image[0].isCompressedTexture,mt=w.image[0]&&w.image[0].isDataTexture,At=[];for(let ut=0;ut<6;ut++)!Rt&&!mt?At[ut]=g(w.image[ut],!0,s.maxCubemapSize):At[ut]=mt?w.image[ut].image:w.image[ut],At[ut]=re(w,At[ut]);const $t=At[0],Ot=r.convert(w.format,w.colorSpace),wt=r.convert(w.type),ce=b(w.internalFormat,Ot,wt,w.colorSpace),G=w.isVideoTexture!==!0,_t=rt.__version===void 0||ot===!0,Et=at.dataReady;let Ft=C(w,$t);Yt(i.TEXTURE_CUBE_MAP,w);let gt;if(Rt){G&&_t&&e.texStorage2D(i.TEXTURE_CUBE_MAP,Ft,ce,$t.width,$t.height);for(let ut=0;ut<6;ut++){gt=At[ut].mipmaps;for(let kt=0;kt<gt.length;kt++){const he=gt[kt];w.format!==Ln?Ot!==null?G?Et&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,kt,0,0,he.width,he.height,Ot,he.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,kt,ce,he.width,he.height,0,he.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):G?Et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,kt,0,0,he.width,he.height,Ot,wt,he.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,kt,ce,he.width,he.height,0,Ot,wt,he.data)}}}else{if(gt=w.mipmaps,G&&_t){gt.length>0&&Ft++;const ut=Re(At[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,Ft,ce,ut.width,ut.height)}for(let ut=0;ut<6;ut++)if(mt){G?Et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0,0,0,At[ut].width,At[ut].height,Ot,wt,At[ut].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0,ce,At[ut].width,At[ut].height,0,Ot,wt,At[ut].data);for(let kt=0;kt<gt.length;kt++){const Ne=gt[kt].image[ut].image;G?Et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,kt+1,0,0,Ne.width,Ne.height,Ot,wt,Ne.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,kt+1,ce,Ne.width,Ne.height,0,Ot,wt,Ne.data)}}else{G?Et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0,0,0,Ot,wt,At[ut]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0,ce,Ot,wt,At[ut]);for(let kt=0;kt<gt.length;kt++){const he=gt[kt];G?Et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,kt+1,0,0,Ot,wt,he.image[ut]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,kt+1,ce,Ot,wt,he.image[ut])}}}m(w)&&d(i.TEXTURE_CUBE_MAP),rt.__version=at.version,w.onUpdate&&w.onUpdate(w)}P.__version=w.version}function vt(P,w,K,ot,at,rt){const Ut=r.convert(K.format,K.colorSpace),lt=r.convert(K.type),bt=b(K.internalFormat,Ut,lt,K.colorSpace),Rt=n.get(w),mt=n.get(K);if(mt.__renderTarget=w,!Rt.__hasExternalTextures){const At=Math.max(1,w.width>>rt),$t=Math.max(1,w.height>>rt);at===i.TEXTURE_3D||at===i.TEXTURE_2D_ARRAY?e.texImage3D(at,rt,bt,At,$t,w.depth,0,Ut,lt,null):e.texImage2D(at,rt,bt,At,$t,0,Ut,lt,null)}e.bindFramebuffer(i.FRAMEBUFFER,P),pt(w)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ot,at,mt.__webglTexture,0,te(w)):(at===i.TEXTURE_2D||at>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&at<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,ot,at,mt.__webglTexture,rt),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Ht(P,w,K){if(i.bindRenderbuffer(i.RENDERBUFFER,P),w.depthBuffer){const ot=w.depthTexture,at=ot&&ot.isDepthTexture?ot.type:null,rt=v(w.stencilBuffer,at),Ut=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,lt=te(w);pt(w)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,lt,rt,w.width,w.height):K?i.renderbufferStorageMultisample(i.RENDERBUFFER,lt,rt,w.width,w.height):i.renderbufferStorage(i.RENDERBUFFER,rt,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Ut,i.RENDERBUFFER,P)}else{const ot=w.textures;for(let at=0;at<ot.length;at++){const rt=ot[at],Ut=r.convert(rt.format,rt.colorSpace),lt=r.convert(rt.type),bt=b(rt.internalFormat,Ut,lt,rt.colorSpace),Rt=te(w);K&&pt(w)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Rt,bt,w.width,w.height):pt(w)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Rt,bt,w.width,w.height):i.renderbufferStorage(i.RENDERBUFFER,bt,w.width,w.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Nt(P,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,P),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ot=n.get(w.depthTexture);ot.__renderTarget=w,(!ot.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),B(w.depthTexture,0);const at=ot.__webglTexture,rt=te(w);if(w.depthTexture.format===br)pt(w)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,at,0,rt):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,at,0);else if(w.depthTexture.format===wr)pt(w)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,at,0,rt):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,at,0);else throw new Error("Unknown depthTexture format")}function ue(P){const w=n.get(P),K=P.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==P.depthTexture){const ot=P.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),ot){const at=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,ot.removeEventListener("dispose",at)};ot.addEventListener("dispose",at),w.__depthDisposeCallback=at}w.__boundDepthTexture=ot}if(P.depthTexture&&!w.__autoAllocateDepthBuffer){if(K)throw new Error("target.depthTexture not supported in Cube render targets");const ot=P.texture.mipmaps;ot&&ot.length>0?Nt(w.__webglFramebuffer[0],P):Nt(w.__webglFramebuffer,P)}else if(K){w.__webglDepthbuffer=[];for(let ot=0;ot<6;ot++)if(e.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer[ot]),w.__webglDepthbuffer[ot]===void 0)w.__webglDepthbuffer[ot]=i.createRenderbuffer(),Ht(w.__webglDepthbuffer[ot],P,!1);else{const at=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,rt=w.__webglDepthbuffer[ot];i.bindRenderbuffer(i.RENDERBUFFER,rt),i.framebufferRenderbuffer(i.FRAMEBUFFER,at,i.RENDERBUFFER,rt)}}else{const ot=P.texture.mipmaps;if(ot&&ot.length>0?e.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=i.createRenderbuffer(),Ht(w.__webglDepthbuffer,P,!1);else{const at=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,rt=w.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,rt),i.framebufferRenderbuffer(i.FRAMEBUFFER,at,i.RENDERBUFFER,rt)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function ye(P,w,K){const ot=n.get(P);w!==void 0&&vt(ot.__webglFramebuffer,P,P.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),K!==void 0&&ue(P)}function D(P){const w=P.texture,K=n.get(P),ot=n.get(w);P.addEventListener("dispose",T);const at=P.textures,rt=P.isWebGLCubeRenderTarget===!0,Ut=at.length>1;if(Ut||(ot.__webglTexture===void 0&&(ot.__webglTexture=i.createTexture()),ot.__version=w.version,o.memory.textures++),rt){K.__webglFramebuffer=[];for(let lt=0;lt<6;lt++)if(w.mipmaps&&w.mipmaps.length>0){K.__webglFramebuffer[lt]=[];for(let bt=0;bt<w.mipmaps.length;bt++)K.__webglFramebuffer[lt][bt]=i.createFramebuffer()}else K.__webglFramebuffer[lt]=i.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){K.__webglFramebuffer=[];for(let lt=0;lt<w.mipmaps.length;lt++)K.__webglFramebuffer[lt]=i.createFramebuffer()}else K.__webglFramebuffer=i.createFramebuffer();if(Ut)for(let lt=0,bt=at.length;lt<bt;lt++){const Rt=n.get(at[lt]);Rt.__webglTexture===void 0&&(Rt.__webglTexture=i.createTexture(),o.memory.textures++)}if(P.samples>0&&pt(P)===!1){K.__webglMultisampledFramebuffer=i.createFramebuffer(),K.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,K.__webglMultisampledFramebuffer);for(let lt=0;lt<at.length;lt++){const bt=at[lt];K.__webglColorRenderbuffer[lt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,K.__webglColorRenderbuffer[lt]);const Rt=r.convert(bt.format,bt.colorSpace),mt=r.convert(bt.type),At=b(bt.internalFormat,Rt,mt,bt.colorSpace,P.isXRRenderTarget===!0),$t=te(P);i.renderbufferStorageMultisample(i.RENDERBUFFER,$t,At,P.width,P.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+lt,i.RENDERBUFFER,K.__webglColorRenderbuffer[lt])}i.bindRenderbuffer(i.RENDERBUFFER,null),P.depthBuffer&&(K.__webglDepthRenderbuffer=i.createRenderbuffer(),Ht(K.__webglDepthRenderbuffer,P,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(rt){e.bindTexture(i.TEXTURE_CUBE_MAP,ot.__webglTexture),Yt(i.TEXTURE_CUBE_MAP,w);for(let lt=0;lt<6;lt++)if(w.mipmaps&&w.mipmaps.length>0)for(let bt=0;bt<w.mipmaps.length;bt++)vt(K.__webglFramebuffer[lt][bt],P,w,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,bt);else vt(K.__webglFramebuffer[lt],P,w,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0);m(w)&&d(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Ut){for(let lt=0,bt=at.length;lt<bt;lt++){const Rt=at[lt],mt=n.get(Rt);let At=i.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(At=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(At,mt.__webglTexture),Yt(At,Rt),vt(K.__webglFramebuffer,P,Rt,i.COLOR_ATTACHMENT0+lt,At,0),m(Rt)&&d(At)}e.unbindTexture()}else{let lt=i.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(lt=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(lt,ot.__webglTexture),Yt(lt,w),w.mipmaps&&w.mipmaps.length>0)for(let bt=0;bt<w.mipmaps.length;bt++)vt(K.__webglFramebuffer[bt],P,w,i.COLOR_ATTACHMENT0,lt,bt);else vt(K.__webglFramebuffer,P,w,i.COLOR_ATTACHMENT0,lt,0);m(w)&&d(lt),e.unbindTexture()}P.depthBuffer&&ue(P)}function Jt(P){const w=P.textures;for(let K=0,ot=w.length;K<ot;K++){const at=w[K];if(m(at)){const rt=S(P),Ut=n.get(at).__webglTexture;e.bindTexture(rt,Ut),d(rt),e.unbindTexture()}}}const Xt=[],Vt=[];function It(P){if(P.samples>0){if(pt(P)===!1){const w=P.textures,K=P.width,ot=P.height;let at=i.COLOR_BUFFER_BIT;const rt=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ut=n.get(P),lt=w.length>1;if(lt)for(let Rt=0;Rt<w.length;Rt++)e.bindFramebuffer(i.FRAMEBUFFER,Ut.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Rt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Ut.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Rt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Ut.__webglMultisampledFramebuffer);const bt=P.texture.mipmaps;bt&&bt.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ut.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ut.__webglFramebuffer);for(let Rt=0;Rt<w.length;Rt++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(at|=i.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(at|=i.STENCIL_BUFFER_BIT)),lt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Ut.__webglColorRenderbuffer[Rt]);const mt=n.get(w[Rt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,mt,0)}i.blitFramebuffer(0,0,K,ot,0,0,K,ot,at,i.NEAREST),l===!0&&(Xt.length=0,Vt.length=0,Xt.push(i.COLOR_ATTACHMENT0+Rt),P.depthBuffer&&P.resolveDepthBuffer===!1&&(Xt.push(rt),Vt.push(rt),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Vt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Xt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),lt)for(let Rt=0;Rt<w.length;Rt++){e.bindFramebuffer(i.FRAMEBUFFER,Ut.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Rt,i.RENDERBUFFER,Ut.__webglColorRenderbuffer[Rt]);const mt=n.get(w[Rt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Ut.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Rt,i.TEXTURE_2D,mt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ut.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&l){const w=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[w])}}}function te(P){return Math.min(s.maxSamples,P.samples)}function pt(P){const w=n.get(P);return P.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function yt(P){const w=o.render.frame;h.get(P)!==w&&(h.set(P,w),P.update())}function re(P,w){const K=P.colorSpace,ot=P.format,at=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||K!==$s&&K!==mi&&(Le.getTransfer(K)===ke?(ot!==Ln||at!==ei)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",K)),w}function Re(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(c.width=P.naturalWidth||P.width,c.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(c.width=P.displayWidth,c.height=P.displayHeight):(c.width=P.width,c.height=P.height),c}this.allocateTextureUnit=X,this.resetTextureUnits=N,this.setTexture2D=B,this.setTexture2DArray=W,this.setTexture3D=Q,this.setTextureCube=Y,this.rebindTextures=ye,this.setupRenderTarget=D,this.updateRenderTargetMipmap=Jt,this.updateMultisampleRenderTarget=It,this.setupDepthRenderbuffer=ue,this.setupFrameBufferTexture=vt,this.useMultisampledRTT=pt}function zx(i,t){function e(n,s=mi){let r;const o=Le.getTransfer(s);if(n===ei)return i.UNSIGNED_BYTE;if(n===zl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Nl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Jh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Qh)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===jh)return i.BYTE;if(n===Kh)return i.SHORT;if(n===yr)return i.UNSIGNED_SHORT;if(n===Ul)return i.INT;if(n===os)return i.UNSIGNED_INT;if(n===qn)return i.FLOAT;if(n===Rr)return i.HALF_FLOAT;if(n===tu)return i.ALPHA;if(n===eu)return i.RGB;if(n===Ln)return i.RGBA;if(n===br)return i.DEPTH_COMPONENT;if(n===wr)return i.DEPTH_STENCIL;if(n===Fl)return i.RED;if(n===Ol)return i.RED_INTEGER;if(n===nu)return i.RG;if(n===kl)return i.RG_INTEGER;if(n===Bl)return i.RGBA_INTEGER;if(n===po||n===mo||n===go||n===xo)if(o===ke)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===po)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===mo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===go)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===xo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===po)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===mo)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===go)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===xo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Za||n===ja||n===Ka||n===Ja)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Za)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ja)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ka)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ja)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Qa||n===tl||n===el)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Qa||n===tl)return o===ke?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===el)return o===ke?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===nl||n===il||n===sl||n===rl||n===ol||n===al||n===ll||n===cl||n===hl||n===ul||n===dl||n===fl||n===pl||n===ml)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===nl)return o===ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===il)return o===ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===sl)return o===ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===rl)return o===ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ol)return o===ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===al)return o===ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ll)return o===ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===cl)return o===ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===hl)return o===ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ul)return o===ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===dl)return o===ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===fl)return o===ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===pl)return o===ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ml)return o===ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===gl||n===xl||n===_l)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===gl)return o===ke?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===xl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===_l)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===vl||n===Ml||n===yl||n===Sl)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===vl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Ml)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===yl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Sl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Sr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const Nx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Fx=`
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

}`;class Ox{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new mu(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Yn({vertexShader:Nx,fragmentShader:Fx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ae(new Fi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class kx extends js{constructor(t,e){super();const n=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,p=null,f=null,x=null;const g=typeof XRWebGLBinding<"u",m=new Ox,d={},S=e.getContextAttributes();let b=null,v=null;const C=[],R=[],T=new Gt;let A=null;const y=new Pn;y.viewport=new Pe;const M=new Pn;M.viewport=new Pe;const I=[y,M],N=new op;let X=null,J=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(V){let st=C[V];return st===void 0&&(st=new la,C[V]=st),st.getTargetRaySpace()},this.getControllerGrip=function(V){let st=C[V];return st===void 0&&(st=new la,C[V]=st),st.getGripSpace()},this.getHand=function(V){let st=C[V];return st===void 0&&(st=new la,C[V]=st),st.getHandSpace()};function B(V){const st=R.indexOf(V.inputSource);if(st===-1)return;const vt=C[st];vt!==void 0&&(vt.update(V.inputSource,V.frame,c||o),vt.dispatchEvent({type:V.type,data:V.inputSource}))}function W(){s.removeEventListener("select",B),s.removeEventListener("selectstart",B),s.removeEventListener("selectend",B),s.removeEventListener("squeeze",B),s.removeEventListener("squeezestart",B),s.removeEventListener("squeezeend",B),s.removeEventListener("end",W),s.removeEventListener("inputsourceschange",Q);for(let V=0;V<C.length;V++){const st=R[V];st!==null&&(R[V]=null,C[V].disconnect(st))}X=null,J=null,m.reset();for(const V in d)delete d[V];t.setRenderTarget(b),f=null,p=null,u=null,s=null,v=null,ht.stop(),n.isPresenting=!1,t.setPixelRatio(A),t.setSize(T.width,T.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(V){r=V,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(V){a=V,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(V){c=V},this.getBaseLayer=function(){return p!==null?p:f},this.getBinding=function(){return u===null&&g&&(u=new XRWebGLBinding(s,e)),u},this.getFrame=function(){return x},this.getSession=function(){return s},this.setSession=async function(V){if(s=V,s!==null){if(b=t.getRenderTarget(),s.addEventListener("select",B),s.addEventListener("selectstart",B),s.addEventListener("selectend",B),s.addEventListener("squeeze",B),s.addEventListener("squeezestart",B),s.addEventListener("squeezeend",B),s.addEventListener("end",W),s.addEventListener("inputsourceschange",Q),S.xrCompatible!==!0&&await e.makeXRCompatible(),A=t.getPixelRatio(),t.getSize(T),g&&"createProjectionLayer"in XRWebGLBinding.prototype){let vt=null,Ht=null,Nt=null;S.depth&&(Nt=S.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,vt=S.stencil?wr:br,Ht=S.stencil?Sr:os);const ue={colorFormat:e.RGBA8,depthFormat:Nt,scaleFactor:r};u=this.getBinding(),p=u.createProjectionLayer(ue),s.updateRenderState({layers:[p]}),t.setPixelRatio(1),t.setSize(p.textureWidth,p.textureHeight,!1),v=new Bi(p.textureWidth,p.textureHeight,{format:Ln,type:ei,depthTexture:new pu(p.textureWidth,p.textureHeight,Ht,void 0,void 0,void 0,void 0,void 0,void 0,vt),stencilBuffer:S.stencil,colorSpace:t.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}else{const vt={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,vt),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),v=new Bi(f.framebufferWidth,f.framebufferHeight,{format:Ln,type:ei,colorSpace:t.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),ht.setContext(s),ht.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function Q(V){for(let st=0;st<V.removed.length;st++){const vt=V.removed[st],Ht=R.indexOf(vt);Ht>=0&&(R[Ht]=null,C[Ht].disconnect(vt))}for(let st=0;st<V.added.length;st++){const vt=V.added[st];let Ht=R.indexOf(vt);if(Ht===-1){for(let ue=0;ue<C.length;ue++)if(ue>=R.length){R.push(vt),Ht=ue;break}else if(R[ue]===null){R[ue]=vt,Ht=ue;break}if(Ht===-1)break}const Nt=C[Ht];Nt&&Nt.connect(vt)}}const Y=new U,ct=new U;function j(V,st,vt){Y.setFromMatrixPosition(st.matrixWorld),ct.setFromMatrixPosition(vt.matrixWorld);const Ht=Y.distanceTo(ct),Nt=st.projectionMatrix.elements,ue=vt.projectionMatrix.elements,ye=Nt[14]/(Nt[10]-1),D=Nt[14]/(Nt[10]+1),Jt=(Nt[9]+1)/Nt[5],Xt=(Nt[9]-1)/Nt[5],Vt=(Nt[8]-1)/Nt[0],It=(ue[8]+1)/ue[0],te=ye*Vt,pt=ye*It,yt=Ht/(-Vt+It),re=yt*-Vt;if(st.matrixWorld.decompose(V.position,V.quaternion,V.scale),V.translateX(re),V.translateZ(yt),V.matrixWorld.compose(V.position,V.quaternion,V.scale),V.matrixWorldInverse.copy(V.matrixWorld).invert(),Nt[10]===-1)V.projectionMatrix.copy(st.projectionMatrix),V.projectionMatrixInverse.copy(st.projectionMatrixInverse);else{const Re=ye+yt,P=D+yt,w=te-re,K=pt+(Ht-re),ot=Jt*D/P*Re,at=Xt*D/P*Re;V.projectionMatrix.makePerspective(w,K,ot,at,Re,P),V.projectionMatrixInverse.copy(V.projectionMatrix).invert()}}function Mt(V,st){st===null?V.matrixWorld.copy(V.matrix):V.matrixWorld.multiplyMatrices(st.matrixWorld,V.matrix),V.matrixWorldInverse.copy(V.matrixWorld).invert()}this.updateCamera=function(V){if(s===null)return;let st=V.near,vt=V.far;m.texture!==null&&(m.depthNear>0&&(st=m.depthNear),m.depthFar>0&&(vt=m.depthFar)),N.near=M.near=y.near=st,N.far=M.far=y.far=vt,(X!==N.near||J!==N.far)&&(s.updateRenderState({depthNear:N.near,depthFar:N.far}),X=N.near,J=N.far),N.layers.mask=V.layers.mask|6,y.layers.mask=N.layers.mask&3,M.layers.mask=N.layers.mask&5;const Ht=V.parent,Nt=N.cameras;Mt(N,Ht);for(let ue=0;ue<Nt.length;ue++)Mt(Nt[ue],Ht);Nt.length===2?j(N,y,M):N.projectionMatrix.copy(y.projectionMatrix),Yt(V,N,Ht)};function Yt(V,st,vt){vt===null?V.matrix.copy(st.matrixWorld):(V.matrix.copy(vt.matrixWorld),V.matrix.invert(),V.matrix.multiply(st.matrixWorld)),V.matrix.decompose(V.position,V.quaternion,V.scale),V.updateMatrixWorld(!0),V.projectionMatrix.copy(st.projectionMatrix),V.projectionMatrixInverse.copy(st.projectionMatrixInverse),V.isPerspectiveCamera&&(V.fov=Er*2*Math.atan(1/V.projectionMatrix.elements[5]),V.zoom=1)}this.getCamera=function(){return N},this.getFoveation=function(){if(!(p===null&&f===null))return l},this.setFoveation=function(V){l=V,p!==null&&(p.fixedFoveation=V),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=V)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(N)},this.getCameraTexture=function(V){return d[V]};let we=null;function oe(V,st){if(h=st.getViewerPose(c||o),x=st,h!==null){const vt=h.views;f!==null&&(t.setRenderTargetFramebuffer(v,f.framebuffer),t.setRenderTarget(v));let Ht=!1;vt.length!==N.cameras.length&&(N.cameras.length=0,Ht=!0);for(let D=0;D<vt.length;D++){const Jt=vt[D];let Xt=null;if(f!==null)Xt=f.getViewport(Jt);else{const It=u.getViewSubImage(p,Jt);Xt=It.viewport,D===0&&(t.setRenderTargetTextures(v,It.colorTexture,It.depthStencilTexture),t.setRenderTarget(v))}let Vt=I[D];Vt===void 0&&(Vt=new Pn,Vt.layers.enable(D),Vt.viewport=new Pe,I[D]=Vt),Vt.matrix.fromArray(Jt.transform.matrix),Vt.matrix.decompose(Vt.position,Vt.quaternion,Vt.scale),Vt.projectionMatrix.fromArray(Jt.projectionMatrix),Vt.projectionMatrixInverse.copy(Vt.projectionMatrix).invert(),Vt.viewport.set(Xt.x,Xt.y,Xt.width,Xt.height),D===0&&(N.matrix.copy(Vt.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),Ht===!0&&N.cameras.push(Vt)}const Nt=s.enabledFeatures;if(Nt&&Nt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&g){u=n.getBinding();const D=u.getDepthInformation(vt[0]);D&&D.isValid&&D.texture&&m.init(D,s.renderState)}if(Nt&&Nt.includes("camera-access")&&g){t.state.unbindTexture(),u=n.getBinding();for(let D=0;D<vt.length;D++){const Jt=vt[D].camera;if(Jt){let Xt=d[Jt];Xt||(Xt=new mu,d[Jt]=Xt);const Vt=u.getCameraImage(Jt);Xt.sourceTexture=Vt}}}}for(let vt=0;vt<C.length;vt++){const Ht=R[vt],Nt=C[vt];Ht!==null&&Nt!==void 0&&Nt.update(Ht,st,c||o)}we&&we(V,st),st.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:st}),x=null}const ht=new Mu;ht.setAnimationLoop(oe),this.setAnimationLoop=function(V){we=V},this.dispose=function(){}}}const Ki=new ii,Bx=new le;function Hx(i,t){function e(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function n(m,d){d.color.getRGB(m.fogColor.value,cu(i)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function s(m,d,S,b,v){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(m,d):d.isMeshToonMaterial?(r(m,d),u(m,d)):d.isMeshPhongMaterial?(r(m,d),h(m,d)):d.isMeshStandardMaterial?(r(m,d),p(m,d),d.isMeshPhysicalMaterial&&f(m,d,v)):d.isMeshMatcapMaterial?(r(m,d),x(m,d)):d.isMeshDepthMaterial?r(m,d):d.isMeshDistanceMaterial?(r(m,d),g(m,d)):d.isMeshNormalMaterial?r(m,d):d.isLineBasicMaterial?(o(m,d),d.isLineDashedMaterial&&a(m,d)):d.isPointsMaterial?l(m,d,S,b):d.isSpriteMaterial?c(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,e(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===Sn&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,e(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===Sn&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,e(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,e(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,e(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);const S=t.get(d),b=S.envMap,v=S.envMapRotation;b&&(m.envMap.value=b,Ki.copy(v),Ki.x*=-1,Ki.y*=-1,Ki.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(Ki.y*=-1,Ki.z*=-1),m.envMapRotation.value.setFromMatrix4(Bx.makeRotationFromEuler(Ki)),m.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,e(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,e(d.aoMap,m.aoMapTransform))}function o(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform))}function a(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function l(m,d,S,b){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*S,m.scale.value=b*.5,d.map&&(m.map.value=d.map,e(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function c(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function h(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function u(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function p(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,e(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,e(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function f(m,d,S){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,e(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,e(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,e(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,e(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,e(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Sn&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,e(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,e(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,e(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,e(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,e(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,e(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,e(d.specularIntensityMap,m.specularIntensityMapTransform))}function x(m,d){d.matcap&&(m.matcap.value=d.matcap)}function g(m,d){const S=t.get(d).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Gx(i,t,e,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,b){const v=b.program;n.uniformBlockBinding(S,v)}function c(S,b){let v=s[S.id];v===void 0&&(x(S),v=h(S),s[S.id]=v,S.addEventListener("dispose",m));const C=b.program;n.updateUBOMapping(S,C);const R=t.render.frame;r[S.id]!==R&&(p(S),r[S.id]=R)}function h(S){const b=u();S.__bindingPointIndex=b;const v=i.createBuffer(),C=S.__size,R=S.usage;return i.bindBuffer(i.UNIFORM_BUFFER,v),i.bufferData(i.UNIFORM_BUFFER,C,R),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,b,v),v}function u(){for(let S=0;S<a;S++)if(o.indexOf(S)===-1)return o.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function p(S){const b=s[S.id],v=S.uniforms,C=S.__cache;i.bindBuffer(i.UNIFORM_BUFFER,b);for(let R=0,T=v.length;R<T;R++){const A=Array.isArray(v[R])?v[R]:[v[R]];for(let y=0,M=A.length;y<M;y++){const I=A[y];if(f(I,R,y,C)===!0){const N=I.__offset,X=Array.isArray(I.value)?I.value:[I.value];let J=0;for(let B=0;B<X.length;B++){const W=X[B],Q=g(W);typeof W=="number"||typeof W=="boolean"?(I.__data[0]=W,i.bufferSubData(i.UNIFORM_BUFFER,N+J,I.__data)):W.isMatrix3?(I.__data[0]=W.elements[0],I.__data[1]=W.elements[1],I.__data[2]=W.elements[2],I.__data[3]=0,I.__data[4]=W.elements[3],I.__data[5]=W.elements[4],I.__data[6]=W.elements[5],I.__data[7]=0,I.__data[8]=W.elements[6],I.__data[9]=W.elements[7],I.__data[10]=W.elements[8],I.__data[11]=0):(W.toArray(I.__data,J),J+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,N,I.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(S,b,v,C){const R=S.value,T=b+"_"+v;if(C[T]===void 0)return typeof R=="number"||typeof R=="boolean"?C[T]=R:C[T]=R.clone(),!0;{const A=C[T];if(typeof R=="number"||typeof R=="boolean"){if(A!==R)return C[T]=R,!0}else if(A.equals(R)===!1)return A.copy(R),!0}return!1}function x(S){const b=S.uniforms;let v=0;const C=16;for(let T=0,A=b.length;T<A;T++){const y=Array.isArray(b[T])?b[T]:[b[T]];for(let M=0,I=y.length;M<I;M++){const N=y[M],X=Array.isArray(N.value)?N.value:[N.value];for(let J=0,B=X.length;J<B;J++){const W=X[J],Q=g(W),Y=v%C,ct=Y%Q.boundary,j=Y+ct;v+=ct,j!==0&&C-j<Q.storage&&(v+=C-j),N.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=v,v+=Q.storage}}}const R=v%C;return R>0&&(v+=C-R),S.__size=v,S.__cache={},this}function g(S){const b={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(b.boundary=4,b.storage=4):S.isVector2?(b.boundary=8,b.storage=8):S.isVector3||S.isColor?(b.boundary=16,b.storage=12):S.isVector4?(b.boundary=16,b.storage=16):S.isMatrix3?(b.boundary=48,b.storage=48):S.isMatrix4?(b.boundary=64,b.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),b}function m(S){const b=S.target;b.removeEventListener("dispose",m);const v=o.indexOf(b.__bindingPointIndex);o.splice(v,1),i.deleteBuffer(s[b.id]),delete s[b.id],delete r[b.id]}function d(){for(const S in s)i.deleteBuffer(s[S]);o=[],s={},r={}}return{bind:l,update:c,dispose:d}}class Vx{constructor(t={}){const{canvas:e=Qd(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:p=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;const x=new Uint32Array(4),g=new Int32Array(4);let m=null,d=null;const S=[],b=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ki,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const v=this;let C=!1;this._outputColorSpace=wn;let R=0,T=0,A=null,y=-1,M=null;const I=new Pe,N=new Pe;let X=null;const J=new se(0);let B=0,W=e.width,Q=e.height,Y=1,ct=null,j=null;const Mt=new Pe(0,0,W,Q),Yt=new Pe(0,0,W,Q);let we=!1;const oe=new Yl;let ht=!1,V=!1;const st=new le,vt=new U,Ht=new Pe,Nt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ue=!1;function ye(){return A===null?Y:1}let D=n;function Jt(E,$){return e.getContext(E,$)}try{const E={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Il}`),e.addEventListener("webglcontextlost",Et,!1),e.addEventListener("webglcontextrestored",Ft,!1),e.addEventListener("webglcontextcreationerror",gt,!1),D===null){const $="webgl2";if(D=Jt($,E),D===null)throw Jt($)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let Xt,Vt,It,te,pt,yt,re,Re,P,w,K,ot,at,rt,Ut,lt,bt,Rt,mt,At,$t,Ot,wt,ce;function G(){Xt=new Q0(D),Xt.init(),Ot=new zx(D,Xt),Vt=new q0(D,Xt,t,Ot),It=new Ix(D,Xt),Vt.reversedDepthBuffer&&p&&It.buffers.depth.setReversed(!0),te=new ng(D),pt=new Mx,yt=new Ux(D,Xt,It,pt,Vt,Ot,te),re=new $0(v),Re=new J0(v),P=new lp(D),wt=new W0(D,P),w=new tg(D,P,te,wt),K=new sg(D,w,P,te),mt=new ig(D,Vt,yt),lt=new Y0(pt),ot=new vx(v,re,Re,Xt,Vt,wt,lt),at=new Hx(v,pt),rt=new Sx,Ut=new Rx(Xt),Rt=new V0(v,re,Re,It,K,f,l),bt=new Dx(v,K,Vt),ce=new Gx(D,te,Vt,It),At=new X0(D,Xt,te),$t=new eg(D,Xt,te),te.programs=ot.programs,v.capabilities=Vt,v.extensions=Xt,v.properties=pt,v.renderLists=rt,v.shadowMap=bt,v.state=It,v.info=te}G();const _t=new kx(v,D);this.xr=_t,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const E=Xt.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=Xt.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(E){E!==void 0&&(Y=E,this.setSize(W,Q,!1))},this.getSize=function(E){return E.set(W,Q)},this.setSize=function(E,$,tt=!0){if(_t.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=E,Q=$,e.width=Math.floor(E*Y),e.height=Math.floor($*Y),tt===!0&&(e.style.width=E+"px",e.style.height=$+"px"),this.setViewport(0,0,E,$)},this.getDrawingBufferSize=function(E){return E.set(W*Y,Q*Y).floor()},this.setDrawingBufferSize=function(E,$,tt){W=E,Q=$,Y=tt,e.width=Math.floor(E*tt),e.height=Math.floor($*tt),this.setViewport(0,0,E,$)},this.getCurrentViewport=function(E){return E.copy(I)},this.getViewport=function(E){return E.copy(Mt)},this.setViewport=function(E,$,tt,et){E.isVector4?Mt.set(E.x,E.y,E.z,E.w):Mt.set(E,$,tt,et),It.viewport(I.copy(Mt).multiplyScalar(Y).round())},this.getScissor=function(E){return E.copy(Yt)},this.setScissor=function(E,$,tt,et){E.isVector4?Yt.set(E.x,E.y,E.z,E.w):Yt.set(E,$,tt,et),It.scissor(N.copy(Yt).multiplyScalar(Y).round())},this.getScissorTest=function(){return we},this.setScissorTest=function(E){It.setScissorTest(we=E)},this.setOpaqueSort=function(E){ct=E},this.setTransparentSort=function(E){j=E},this.getClearColor=function(E){return E.copy(Rt.getClearColor())},this.setClearColor=function(){Rt.setClearColor(...arguments)},this.getClearAlpha=function(){return Rt.getClearAlpha()},this.setClearAlpha=function(){Rt.setClearAlpha(...arguments)},this.clear=function(E=!0,$=!0,tt=!0){let et=0;if(E){let Z=!1;if(A!==null){const xt=A.texture.format;Z=xt===Bl||xt===kl||xt===Ol}if(Z){const xt=A.texture.type,Dt=xt===ei||xt===os||xt===yr||xt===Sr||xt===zl||xt===Nl,Bt=Rt.getClearColor(),Pt=Rt.getClearAlpha(),Zt=Bt.r,ne=Bt.g,jt=Bt.b;Dt?(x[0]=Zt,x[1]=ne,x[2]=jt,x[3]=Pt,D.clearBufferuiv(D.COLOR,0,x)):(g[0]=Zt,g[1]=ne,g[2]=jt,g[3]=Pt,D.clearBufferiv(D.COLOR,0,g))}else et|=D.COLOR_BUFFER_BIT}$&&(et|=D.DEPTH_BUFFER_BIT),tt&&(et|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(et)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Et,!1),e.removeEventListener("webglcontextrestored",Ft,!1),e.removeEventListener("webglcontextcreationerror",gt,!1),Rt.dispose(),rt.dispose(),Ut.dispose(),pt.dispose(),re.dispose(),Re.dispose(),K.dispose(),wt.dispose(),ce.dispose(),ot.dispose(),_t.dispose(),_t.removeEventListener("sessionstart",Tn),_t.removeEventListener("sessionend",Js),$n.stop()};function Et(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function Ft(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const E=te.autoReset,$=bt.enabled,tt=bt.autoUpdate,et=bt.needsUpdate,Z=bt.type;G(),te.autoReset=E,bt.enabled=$,bt.autoUpdate=tt,bt.needsUpdate=et,bt.type=Z}function gt(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function ut(E){const $=E.target;$.removeEventListener("dispose",ut),kt($)}function kt(E){he(E),pt.remove(E)}function he(E){const $=pt.get(E).programs;$!==void 0&&($.forEach(function(tt){ot.releaseProgram(tt)}),E.isShaderMaterial&&ot.releaseShaderCache(E))}this.renderBufferDirect=function(E,$,tt,et,Z,xt){$===null&&($=Nt);const Dt=Z.isMesh&&Z.matrixWorld.determinant()<0,Bt=No(E,$,tt,et,Z);It.setMaterial(et,Dt);let Pt=tt.index,Zt=1;if(et.wireframe===!0){if(Pt=w.getWireframeAttribute(tt),Pt===void 0)return;Zt=2}const ne=tt.drawRange,jt=tt.attributes.position;let ve=ne.start*Zt,Ie=(ne.start+ne.count)*Zt;xt!==null&&(ve=Math.max(ve,xt.start*Zt),Ie=Math.min(Ie,(xt.start+xt.count)*Zt)),Pt!==null?(ve=Math.max(ve,0),Ie=Math.min(Ie,Pt.count)):jt!=null&&(ve=Math.max(ve,0),Ie=Math.min(Ie,jt.count));const Fe=Ie-ve;if(Fe<0||Fe===1/0)return;wt.setup(Z,et,Bt,tt,Pt);let Ue,Se=At;if(Pt!==null&&(Ue=P.get(Pt),Se=$t,Se.setIndex(Ue)),Z.isMesh)et.wireframe===!0?(It.setLineWidth(et.wireframeLinewidth*ye()),Se.setMode(D.LINES)):Se.setMode(D.TRIANGLES);else if(Z.isLine){let Kt=et.linewidth;Kt===void 0&&(Kt=1),It.setLineWidth(Kt*ye()),Z.isLineSegments?Se.setMode(D.LINES):Z.isLineLoop?Se.setMode(D.LINE_LOOP):Se.setMode(D.LINE_STRIP)}else Z.isPoints?Se.setMode(D.POINTS):Z.isSprite&&Se.setMode(D.TRIANGLES);if(Z.isBatchedMesh)if(Z._multiDrawInstances!==null)Tr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Se.renderMultiDrawInstances(Z._multiDrawStarts,Z._multiDrawCounts,Z._multiDrawCount,Z._multiDrawInstances);else if(Xt.get("WEBGL_multi_draw"))Se.renderMultiDraw(Z._multiDrawStarts,Z._multiDrawCounts,Z._multiDrawCount);else{const Kt=Z._multiDrawStarts,He=Z._multiDrawCounts,Ee=Z._multiDrawCount,fn=Pt?P.get(Pt).bytesPerElement:1,si=pt.get(et).currentProgram.getUniforms();for(let hn=0;hn<Ee;hn++)si.setValue(D,"_gl_DrawID",hn),Se.render(Kt[hn]/fn,He[hn])}else if(Z.isInstancedMesh)Se.renderInstances(ve,Fe,Z.count);else if(tt.isInstancedBufferGeometry){const Kt=tt._maxInstanceCount!==void 0?tt._maxInstanceCount:1/0,He=Math.min(tt.instanceCount,Kt);Se.renderInstances(ve,Fe,He)}else Se.render(ve,Fe)};function Ne(E,$,tt){E.transparent===!0&&E.side===$e&&E.forceSinglePass===!1?(E.side=Sn,E.needsUpdate=!0,fs(E,$,tt),E.side=_i,E.needsUpdate=!0,fs(E,$,tt),E.side=$e):fs(E,$,tt)}this.compile=function(E,$,tt=null){tt===null&&(tt=E),d=Ut.get(tt),d.init($),b.push(d),tt.traverseVisible(function(Z){Z.isLight&&Z.layers.test($.layers)&&(d.pushLight(Z),Z.castShadow&&d.pushShadow(Z))}),E!==tt&&E.traverseVisible(function(Z){Z.isLight&&Z.layers.test($.layers)&&(d.pushLight(Z),Z.castShadow&&d.pushShadow(Z))}),d.setupLights();const et=new Set;return E.traverse(function(Z){if(!(Z.isMesh||Z.isPoints||Z.isLine||Z.isSprite))return;const xt=Z.material;if(xt)if(Array.isArray(xt))for(let Dt=0;Dt<xt.length;Dt++){const Bt=xt[Dt];Ne(Bt,tt,Z),et.add(Bt)}else Ne(xt,tt,Z),et.add(xt)}),d=b.pop(),et},this.compileAsync=function(E,$,tt=null){const et=this.compile(E,$,tt);return new Promise(Z=>{function xt(){if(et.forEach(function(Dt){pt.get(Dt).currentProgram.isReady()&&et.delete(Dt)}),et.size===0){Z(E);return}setTimeout(xt,10)}Xt.get("KHR_parallel_shader_compile")!==null?xt():setTimeout(xt,10)})};let ge=null;function _n(E){ge&&ge(E)}function Tn(){$n.stop()}function Js(){$n.start()}const $n=new Mu;$n.setAnimationLoop(_n),typeof self<"u"&&$n.setContext(self),this.setAnimationLoop=function(E){ge=E,_t.setAnimationLoop(E),E===null?$n.stop():$n.start()},_t.addEventListener("sessionstart",Tn),_t.addEventListener("sessionend",Js),this.render=function(E,$){if($!==void 0&&$.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),$.parent===null&&$.matrixWorldAutoUpdate===!0&&$.updateMatrixWorld(),_t.enabled===!0&&_t.isPresenting===!0&&(_t.cameraAutoUpdate===!0&&_t.updateCamera($),$=_t.getCamera()),E.isScene===!0&&E.onBeforeRender(v,E,$,A),d=Ut.get(E,b.length),d.init($),b.push(d),st.multiplyMatrices($.projectionMatrix,$.matrixWorldInverse),oe.setFromProjectionMatrix(st,ti,$.reversedDepth),V=this.localClippingEnabled,ht=lt.init(this.clippingPlanes,V),m=rt.get(E,S.length),m.init(),S.push(m),_t.enabled===!0&&_t.isPresenting===!0){const xt=v.xr.getDepthSensingMesh();xt!==null&&Qs(xt,$,-1/0,v.sortObjects)}Qs(E,$,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(ct,j),ue=_t.enabled===!1||_t.isPresenting===!1||_t.hasDepthSensing()===!1,ue&&Rt.addToRenderList(m,E),this.info.render.frame++,ht===!0&&lt.beginShadows();const tt=d.state.shadowsArray;bt.render(tt,E,$),ht===!0&&lt.endShadows(),this.info.autoReset===!0&&this.info.reset();const et=m.opaque,Z=m.transmissive;if(d.setupLights(),$.isArrayCamera){const xt=$.cameras;if(Z.length>0)for(let Dt=0,Bt=xt.length;Dt<Bt;Dt++){const Pt=xt[Dt];Gi(et,Z,E,Pt)}ue&&Rt.render(E);for(let Dt=0,Bt=xt.length;Dt<Bt;Dt++){const Pt=xt[Dt];tr(m,E,Pt,Pt.viewport)}}else Z.length>0&&Gi(et,Z,E,$),ue&&Rt.render(E),tr(m,E,$);A!==null&&T===0&&(yt.updateMultisampleRenderTarget(A),yt.updateRenderTargetMipmap(A)),E.isScene===!0&&E.onAfterRender(v,E,$),wt.resetDefaultState(),y=-1,M=null,b.pop(),b.length>0?(d=b[b.length-1],ht===!0&&lt.setGlobalState(v.clippingPlanes,d.state.camera)):d=null,S.pop(),S.length>0?m=S[S.length-1]:m=null};function Qs(E,$,tt,et){if(E.visible===!1)return;if(E.layers.test($.layers)){if(E.isGroup)tt=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update($);else if(E.isLight)d.pushLight(E),E.castShadow&&d.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||oe.intersectsSprite(E)){et&&Ht.setFromMatrixPosition(E.matrixWorld).applyMatrix4(st);const Dt=K.update(E),Bt=E.material;Bt.visible&&m.push(E,Dt,Bt,tt,Ht.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||oe.intersectsObject(E))){const Dt=K.update(E),Bt=E.material;if(et&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Ht.copy(E.boundingSphere.center)):(Dt.boundingSphere===null&&Dt.computeBoundingSphere(),Ht.copy(Dt.boundingSphere.center)),Ht.applyMatrix4(E.matrixWorld).applyMatrix4(st)),Array.isArray(Bt)){const Pt=Dt.groups;for(let Zt=0,ne=Pt.length;Zt<ne;Zt++){const jt=Pt[Zt],ve=Bt[jt.materialIndex];ve&&ve.visible&&m.push(E,Dt,ve,tt,Ht.z,jt)}}else Bt.visible&&m.push(E,Dt,Bt,tt,Ht.z,null)}}const xt=E.children;for(let Dt=0,Bt=xt.length;Dt<Bt;Dt++)Qs(xt[Dt],$,tt,et)}function tr(E,$,tt,et){const Z=E.opaque,xt=E.transmissive,Dt=E.transparent;d.setupLightsView(tt),ht===!0&&lt.setGlobalState(v.clippingPlanes,tt),et&&It.viewport(I.copy(et)),Z.length>0&&ds(Z,$,tt),xt.length>0&&ds(xt,$,tt),Dt.length>0&&ds(Dt,$,tt),It.buffers.depth.setTest(!0),It.buffers.depth.setMask(!0),It.buffers.color.setMask(!0),It.setPolygonOffset(!1)}function Gi(E,$,tt,et){if((tt.isScene===!0?tt.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[et.id]===void 0&&(d.state.transmissionRenderTarget[et.id]=new Bi(1,1,{generateMipmaps:!0,type:Xt.has("EXT_color_buffer_half_float")||Xt.has("EXT_color_buffer_float")?Rr:ei,minFilter:Ni,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Le.workingColorSpace}));const xt=d.state.transmissionRenderTarget[et.id],Dt=et.viewport||I;xt.setSize(Dt.z*v.transmissionResolutionScale,Dt.w*v.transmissionResolutionScale);const Bt=v.getRenderTarget(),Pt=v.getActiveCubeFace(),Zt=v.getActiveMipmapLevel();v.setRenderTarget(xt),v.getClearColor(J),B=v.getClearAlpha(),B<1&&v.setClearColor(16777215,.5),v.clear(),ue&&Rt.render(tt);const ne=v.toneMapping;v.toneMapping=ki;const jt=et.viewport;if(et.viewport!==void 0&&(et.viewport=void 0),d.setupLightsView(et),ht===!0&&lt.setGlobalState(v.clippingPlanes,et),ds(E,tt,et),yt.updateMultisampleRenderTarget(xt),yt.updateRenderTargetMipmap(xt),Xt.has("WEBGL_multisampled_render_to_texture")===!1){let ve=!1;for(let Ie=0,Fe=$.length;Ie<Fe;Ie++){const Ue=$[Ie],Se=Ue.object,Kt=Ue.geometry,He=Ue.material,Ee=Ue.group;if(He.side===$e&&Se.layers.test(et.layers)){const fn=He.side;He.side=Sn,He.needsUpdate=!0,yi(Se,tt,et,Kt,He,Ee),He.side=fn,He.needsUpdate=!0,ve=!0}}ve===!0&&(yt.updateMultisampleRenderTarget(xt),yt.updateRenderTargetMipmap(xt))}v.setRenderTarget(Bt,Pt,Zt),v.setClearColor(J,B),jt!==void 0&&(et.viewport=jt),v.toneMapping=ne}function ds(E,$,tt){const et=$.isScene===!0?$.overrideMaterial:null;for(let Z=0,xt=E.length;Z<xt;Z++){const Dt=E[Z],Bt=Dt.object,Pt=Dt.geometry,Zt=Dt.group;let ne=Dt.material;ne.allowOverride===!0&&et!==null&&(ne=et),Bt.layers.test(tt.layers)&&yi(Bt,$,tt,Pt,ne,Zt)}}function yi(E,$,tt,et,Z,xt){E.onBeforeRender(v,$,tt,et,Z,xt),E.modelViewMatrix.multiplyMatrices(tt.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),Z.onBeforeRender(v,$,tt,et,E,xt),Z.transparent===!0&&Z.side===$e&&Z.forceSinglePass===!1?(Z.side=Sn,Z.needsUpdate=!0,v.renderBufferDirect(tt,$,et,Z,E,xt),Z.side=_i,Z.needsUpdate=!0,v.renderBufferDirect(tt,$,et,Z,E,xt),Z.side=$e):v.renderBufferDirect(tt,$,et,Z,E,xt),E.onAfterRender(v,$,tt,et,Z,xt)}function fs(E,$,tt){$.isScene!==!0&&($=Nt);const et=pt.get(E),Z=d.state.lights,xt=d.state.shadowsArray,Dt=Z.state.version,Bt=ot.getParameters(E,Z.state,xt,$,tt),Pt=ot.getProgramCacheKey(Bt);let Zt=et.programs;et.environment=E.isMeshStandardMaterial?$.environment:null,et.fog=$.fog,et.envMap=(E.isMeshStandardMaterial?Re:re).get(E.envMap||et.environment),et.envMapRotation=et.environment!==null&&E.envMap===null?$.environmentRotation:E.envMapRotation,Zt===void 0&&(E.addEventListener("dispose",ut),Zt=new Map,et.programs=Zt);let ne=Zt.get(Pt);if(ne!==void 0){if(et.currentProgram===ne&&et.lightsStateVersion===Dt)return ps(E,Bt),ne}else Bt.uniforms=ot.getUniforms(E),E.onBeforeCompile(Bt,v),ne=ot.acquireProgram(Bt,Pt),Zt.set(Pt,ne),et.uniforms=Bt.uniforms;const jt=et.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(jt.clippingPlanes=lt.uniform),ps(E,Bt),et.needsLights=Dr(E),et.lightsStateVersion=Dt,et.needsLights&&(jt.ambientLightColor.value=Z.state.ambient,jt.lightProbe.value=Z.state.probe,jt.directionalLights.value=Z.state.directional,jt.directionalLightShadows.value=Z.state.directionalShadow,jt.spotLights.value=Z.state.spot,jt.spotLightShadows.value=Z.state.spotShadow,jt.rectAreaLights.value=Z.state.rectArea,jt.ltc_1.value=Z.state.rectAreaLTC1,jt.ltc_2.value=Z.state.rectAreaLTC2,jt.pointLights.value=Z.state.point,jt.pointLightShadows.value=Z.state.pointShadow,jt.hemisphereLights.value=Z.state.hemi,jt.directionalShadowMap.value=Z.state.directionalShadowMap,jt.directionalShadowMatrix.value=Z.state.directionalShadowMatrix,jt.spotShadowMap.value=Z.state.spotShadowMap,jt.spotLightMatrix.value=Z.state.spotLightMatrix,jt.spotLightMap.value=Z.state.spotLightMap,jt.pointShadowMap.value=Z.state.pointShadowMap,jt.pointShadowMatrix.value=Z.state.pointShadowMatrix),et.currentProgram=ne,et.uniformsList=null,ne}function Zn(E){if(E.uniformsList===null){const $=E.currentProgram.getUniforms();E.uniformsList=_o.seqWithValue($.seq,E.uniforms)}return E.uniformsList}function ps(E,$){const tt=pt.get(E);tt.outputColorSpace=$.outputColorSpace,tt.batching=$.batching,tt.batchingColor=$.batchingColor,tt.instancing=$.instancing,tt.instancingColor=$.instancingColor,tt.instancingMorph=$.instancingMorph,tt.skinning=$.skinning,tt.morphTargets=$.morphTargets,tt.morphNormals=$.morphNormals,tt.morphColors=$.morphColors,tt.morphTargetsCount=$.morphTargetsCount,tt.numClippingPlanes=$.numClippingPlanes,tt.numIntersection=$.numClipIntersection,tt.vertexAlphas=$.vertexAlphas,tt.vertexTangents=$.vertexTangents,tt.toneMapping=$.toneMapping}function No(E,$,tt,et,Z){$.isScene!==!0&&($=Nt),yt.resetTextureUnits();const xt=$.fog,Dt=et.isMeshStandardMaterial?$.environment:null,Bt=A===null?v.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:$s,Pt=(et.isMeshStandardMaterial?Re:re).get(et.envMap||Dt),Zt=et.vertexColors===!0&&!!tt.attributes.color&&tt.attributes.color.itemSize===4,ne=!!tt.attributes.tangent&&(!!et.normalMap||et.anisotropy>0),jt=!!tt.morphAttributes.position,ve=!!tt.morphAttributes.normal,Ie=!!tt.morphAttributes.color;let Fe=ki;et.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(Fe=v.toneMapping);const Ue=tt.morphAttributes.position||tt.morphAttributes.normal||tt.morphAttributes.color,Se=Ue!==void 0?Ue.length:0,Kt=pt.get(et),He=d.state.lights;if(ht===!0&&(V===!0||E!==M)){const an=E===M&&et.id===y;lt.setState(et,E,an)}let Ee=!1;et.version===Kt.__version?(Kt.needsLights&&Kt.lightsStateVersion!==He.state.version||Kt.outputColorSpace!==Bt||Z.isBatchedMesh&&Kt.batching===!1||!Z.isBatchedMesh&&Kt.batching===!0||Z.isBatchedMesh&&Kt.batchingColor===!0&&Z.colorTexture===null||Z.isBatchedMesh&&Kt.batchingColor===!1&&Z.colorTexture!==null||Z.isInstancedMesh&&Kt.instancing===!1||!Z.isInstancedMesh&&Kt.instancing===!0||Z.isSkinnedMesh&&Kt.skinning===!1||!Z.isSkinnedMesh&&Kt.skinning===!0||Z.isInstancedMesh&&Kt.instancingColor===!0&&Z.instanceColor===null||Z.isInstancedMesh&&Kt.instancingColor===!1&&Z.instanceColor!==null||Z.isInstancedMesh&&Kt.instancingMorph===!0&&Z.morphTexture===null||Z.isInstancedMesh&&Kt.instancingMorph===!1&&Z.morphTexture!==null||Kt.envMap!==Pt||et.fog===!0&&Kt.fog!==xt||Kt.numClippingPlanes!==void 0&&(Kt.numClippingPlanes!==lt.numPlanes||Kt.numIntersection!==lt.numIntersection)||Kt.vertexAlphas!==Zt||Kt.vertexTangents!==ne||Kt.morphTargets!==jt||Kt.morphNormals!==ve||Kt.morphColors!==Ie||Kt.toneMapping!==Fe||Kt.morphTargetsCount!==Se)&&(Ee=!0):(Ee=!0,Kt.__version=et.version);let fn=Kt.currentProgram;Ee===!0&&(fn=fs(et,$,Z));let si=!1,hn=!1,Wi=!1;const Ge=fn.getUniforms(),je=Kt.uniforms;if(It.useProgram(fn.program)&&(si=!0,hn=!0,Wi=!0),et.id!==y&&(y=et.id,hn=!0),si||M!==E){It.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),Ge.setValue(D,"projectionMatrix",E.projectionMatrix),Ge.setValue(D,"viewMatrix",E.matrixWorldInverse);const un=Ge.map.cameraPosition;un!==void 0&&un.setValue(D,vt.setFromMatrixPosition(E.matrixWorld)),Vt.logarithmicDepthBuffer&&Ge.setValue(D,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(et.isMeshPhongMaterial||et.isMeshToonMaterial||et.isMeshLambertMaterial||et.isMeshBasicMaterial||et.isMeshStandardMaterial||et.isShaderMaterial)&&Ge.setValue(D,"isOrthographic",E.isOrthographicCamera===!0),M!==E&&(M=E,hn=!0,Wi=!0)}if(Z.isSkinnedMesh){Ge.setOptional(D,Z,"bindMatrix"),Ge.setOptional(D,Z,"bindMatrixInverse");const an=Z.skeleton;an&&(an.boneTexture===null&&an.computeBoneTexture(),Ge.setValue(D,"boneTexture",an.boneTexture,yt))}Z.isBatchedMesh&&(Ge.setOptional(D,Z,"batchingTexture"),Ge.setValue(D,"batchingTexture",Z._matricesTexture,yt),Ge.setOptional(D,Z,"batchingIdTexture"),Ge.setValue(D,"batchingIdTexture",Z._indirectTexture,yt),Ge.setOptional(D,Z,"batchingColorTexture"),Z._colorsTexture!==null&&Ge.setValue(D,"batchingColorTexture",Z._colorsTexture,yt));const en=tt.morphAttributes;if((en.position!==void 0||en.normal!==void 0||en.color!==void 0)&&mt.update(Z,tt,fn),(hn||Kt.receiveShadow!==Z.receiveShadow)&&(Kt.receiveShadow=Z.receiveShadow,Ge.setValue(D,"receiveShadow",Z.receiveShadow)),et.isMeshGouraudMaterial&&et.envMap!==null&&(je.envMap.value=Pt,je.flipEnvMap.value=Pt.isCubeTexture&&Pt.isRenderTargetTexture===!1?-1:1),et.isMeshStandardMaterial&&et.envMap===null&&$.environment!==null&&(je.envMapIntensity.value=$.environmentIntensity),hn&&(Ge.setValue(D,"toneMappingExposure",v.toneMappingExposure),Kt.needsLights&&Si(je,Wi),xt&&et.fog===!0&&at.refreshFogUniforms(je,xt),at.refreshMaterialUniforms(je,et,Y,Q,d.state.transmissionRenderTarget[E.id]),_o.upload(D,Zn(Kt),je,yt)),et.isShaderMaterial&&et.uniformsNeedUpdate===!0&&(_o.upload(D,Zn(Kt),je,yt),et.uniformsNeedUpdate=!1),et.isSpriteMaterial&&Ge.setValue(D,"center",Z.center),Ge.setValue(D,"modelViewMatrix",Z.modelViewMatrix),Ge.setValue(D,"normalMatrix",Z.normalMatrix),Ge.setValue(D,"modelMatrix",Z.matrixWorld),et.isShaderMaterial||et.isRawShaderMaterial){const an=et.uniformsGroups;for(let un=0,bi=an.length;un<bi;un++){const jn=an[un];ce.update(jn,fn),ce.bind(jn,fn)}}return fn}function Si(E,$){E.ambientLightColor.needsUpdate=$,E.lightProbe.needsUpdate=$,E.directionalLights.needsUpdate=$,E.directionalLightShadows.needsUpdate=$,E.pointLights.needsUpdate=$,E.pointLightShadows.needsUpdate=$,E.spotLights.needsUpdate=$,E.spotLightShadows.needsUpdate=$,E.rectAreaLights.needsUpdate=$,E.hemisphereLights.needsUpdate=$}function Dr(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(E,$,tt){const et=pt.get(E);et.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,et.__autoAllocateDepthBuffer===!1&&(et.__useRenderToTexture=!1),pt.get(E.texture).__webglTexture=$,pt.get(E.depthTexture).__webglTexture=et.__autoAllocateDepthBuffer?void 0:tt,et.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,$){const tt=pt.get(E);tt.__webglFramebuffer=$,tt.__useDefaultFramebuffer=$===void 0};const Vi=D.createFramebuffer();this.setRenderTarget=function(E,$=0,tt=0){A=E,R=$,T=tt;let et=!0,Z=null,xt=!1,Dt=!1;if(E){const Pt=pt.get(E);if(Pt.__useDefaultFramebuffer!==void 0)It.bindFramebuffer(D.FRAMEBUFFER,null),et=!1;else if(Pt.__webglFramebuffer===void 0)yt.setupRenderTarget(E);else if(Pt.__hasExternalTextures)yt.rebindTextures(E,pt.get(E.texture).__webglTexture,pt.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const jt=E.depthTexture;if(Pt.__boundDepthTexture!==jt){if(jt!==null&&pt.has(jt)&&(E.width!==jt.image.width||E.height!==jt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");yt.setupDepthRenderbuffer(E)}}const Zt=E.texture;(Zt.isData3DTexture||Zt.isDataArrayTexture||Zt.isCompressedArrayTexture)&&(Dt=!0);const ne=pt.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(ne[$])?Z=ne[$][tt]:Z=ne[$],xt=!0):E.samples>0&&yt.useMultisampledRTT(E)===!1?Z=pt.get(E).__webglMultisampledFramebuffer:Array.isArray(ne)?Z=ne[tt]:Z=ne,I.copy(E.viewport),N.copy(E.scissor),X=E.scissorTest}else I.copy(Mt).multiplyScalar(Y).floor(),N.copy(Yt).multiplyScalar(Y).floor(),X=we;if(tt!==0&&(Z=Vi),It.bindFramebuffer(D.FRAMEBUFFER,Z)&&et&&It.drawBuffers(E,Z),It.viewport(I),It.scissor(N),It.setScissorTest(X),xt){const Pt=pt.get(E.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+$,Pt.__webglTexture,tt)}else if(Dt){const Pt=$;for(let Zt=0;Zt<E.textures.length;Zt++){const ne=pt.get(E.textures[Zt]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+Zt,ne.__webglTexture,tt,Pt)}}else if(E!==null&&tt!==0){const Pt=pt.get(E.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Pt.__webglTexture,tt)}y=-1},this.readRenderTargetPixels=function(E,$,tt,et,Z,xt,Dt,Bt=0){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Pt=pt.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Dt!==void 0&&(Pt=Pt[Dt]),Pt){It.bindFramebuffer(D.FRAMEBUFFER,Pt);try{const Zt=E.textures[Bt],ne=Zt.format,jt=Zt.type;if(!Vt.textureFormatReadable(ne)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Vt.textureTypeReadable(jt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}$>=0&&$<=E.width-et&&tt>=0&&tt<=E.height-Z&&(E.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+Bt),D.readPixels($,tt,et,Z,Ot.convert(ne),Ot.convert(jt),xt))}finally{const Zt=A!==null?pt.get(A).__webglFramebuffer:null;It.bindFramebuffer(D.FRAMEBUFFER,Zt)}}},this.readRenderTargetPixelsAsync=async function(E,$,tt,et,Z,xt,Dt,Bt=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Pt=pt.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Dt!==void 0&&(Pt=Pt[Dt]),Pt)if($>=0&&$<=E.width-et&&tt>=0&&tt<=E.height-Z){It.bindFramebuffer(D.FRAMEBUFFER,Pt);const Zt=E.textures[Bt],ne=Zt.format,jt=Zt.type;if(!Vt.textureFormatReadable(ne))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Vt.textureTypeReadable(jt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ve=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,ve),D.bufferData(D.PIXEL_PACK_BUFFER,xt.byteLength,D.STREAM_READ),E.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+Bt),D.readPixels($,tt,et,Z,Ot.convert(ne),Ot.convert(jt),0);const Ie=A!==null?pt.get(A).__webglFramebuffer:null;It.bindFramebuffer(D.FRAMEBUFFER,Ie);const Fe=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await tf(D,Fe,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,ve),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,xt),D.deleteBuffer(ve),D.deleteSync(Fe),xt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,$=null,tt=0){const et=Math.pow(2,-tt),Z=Math.floor(E.image.width*et),xt=Math.floor(E.image.height*et),Dt=$!==null?$.x:0,Bt=$!==null?$.y:0;yt.setTexture2D(E,0),D.copyTexSubImage2D(D.TEXTURE_2D,tt,0,0,Dt,Bt,Z,xt),It.unbindTexture()};const er=D.createFramebuffer(),ms=D.createFramebuffer();this.copyTextureToTexture=function(E,$,tt=null,et=null,Z=0,xt=null){xt===null&&(Z!==0?(Tr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),xt=Z,Z=0):xt=0);let Dt,Bt,Pt,Zt,ne,jt,ve,Ie,Fe;const Ue=E.isCompressedTexture?E.mipmaps[xt]:E.image;if(tt!==null)Dt=tt.max.x-tt.min.x,Bt=tt.max.y-tt.min.y,Pt=tt.isBox3?tt.max.z-tt.min.z:1,Zt=tt.min.x,ne=tt.min.y,jt=tt.isBox3?tt.min.z:0;else{const en=Math.pow(2,-Z);Dt=Math.floor(Ue.width*en),Bt=Math.floor(Ue.height*en),E.isDataArrayTexture?Pt=Ue.depth:E.isData3DTexture?Pt=Math.floor(Ue.depth*en):Pt=1,Zt=0,ne=0,jt=0}et!==null?(ve=et.x,Ie=et.y,Fe=et.z):(ve=0,Ie=0,Fe=0);const Se=Ot.convert($.format),Kt=Ot.convert($.type);let He;$.isData3DTexture?(yt.setTexture3D($,0),He=D.TEXTURE_3D):$.isDataArrayTexture||$.isCompressedArrayTexture?(yt.setTexture2DArray($,0),He=D.TEXTURE_2D_ARRAY):(yt.setTexture2D($,0),He=D.TEXTURE_2D),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,$.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,$.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,$.unpackAlignment);const Ee=D.getParameter(D.UNPACK_ROW_LENGTH),fn=D.getParameter(D.UNPACK_IMAGE_HEIGHT),si=D.getParameter(D.UNPACK_SKIP_PIXELS),hn=D.getParameter(D.UNPACK_SKIP_ROWS),Wi=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,Ue.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Ue.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Zt),D.pixelStorei(D.UNPACK_SKIP_ROWS,ne),D.pixelStorei(D.UNPACK_SKIP_IMAGES,jt);const Ge=E.isDataArrayTexture||E.isData3DTexture,je=$.isDataArrayTexture||$.isData3DTexture;if(E.isDepthTexture){const en=pt.get(E),an=pt.get($),un=pt.get(en.__renderTarget),bi=pt.get(an.__renderTarget);It.bindFramebuffer(D.READ_FRAMEBUFFER,un.__webglFramebuffer),It.bindFramebuffer(D.DRAW_FRAMEBUFFER,bi.__webglFramebuffer);for(let jn=0;jn<Pt;jn++)Ge&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,pt.get(E).__webglTexture,Z,jt+jn),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,pt.get($).__webglTexture,xt,Fe+jn)),D.blitFramebuffer(Zt,ne,Dt,Bt,ve,Ie,Dt,Bt,D.DEPTH_BUFFER_BIT,D.NEAREST);It.bindFramebuffer(D.READ_FRAMEBUFFER,null),It.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(Z!==0||E.isRenderTargetTexture||pt.has(E)){const en=pt.get(E),an=pt.get($);It.bindFramebuffer(D.READ_FRAMEBUFFER,er),It.bindFramebuffer(D.DRAW_FRAMEBUFFER,ms);for(let un=0;un<Pt;un++)Ge?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,en.__webglTexture,Z,jt+un):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,en.__webglTexture,Z),je?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,an.__webglTexture,xt,Fe+un):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,an.__webglTexture,xt),Z!==0?D.blitFramebuffer(Zt,ne,Dt,Bt,ve,Ie,Dt,Bt,D.COLOR_BUFFER_BIT,D.NEAREST):je?D.copyTexSubImage3D(He,xt,ve,Ie,Fe+un,Zt,ne,Dt,Bt):D.copyTexSubImage2D(He,xt,ve,Ie,Zt,ne,Dt,Bt);It.bindFramebuffer(D.READ_FRAMEBUFFER,null),It.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else je?E.isDataTexture||E.isData3DTexture?D.texSubImage3D(He,xt,ve,Ie,Fe,Dt,Bt,Pt,Se,Kt,Ue.data):$.isCompressedArrayTexture?D.compressedTexSubImage3D(He,xt,ve,Ie,Fe,Dt,Bt,Pt,Se,Ue.data):D.texSubImage3D(He,xt,ve,Ie,Fe,Dt,Bt,Pt,Se,Kt,Ue):E.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,xt,ve,Ie,Dt,Bt,Se,Kt,Ue.data):E.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,xt,ve,Ie,Ue.width,Ue.height,Se,Ue.data):D.texSubImage2D(D.TEXTURE_2D,xt,ve,Ie,Dt,Bt,Se,Kt,Ue);D.pixelStorei(D.UNPACK_ROW_LENGTH,Ee),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,fn),D.pixelStorei(D.UNPACK_SKIP_PIXELS,si),D.pixelStorei(D.UNPACK_SKIP_ROWS,hn),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Wi),xt===0&&$.generateMipmaps&&D.generateMipmap(He),It.unbindTexture()},this.initRenderTarget=function(E){pt.get(E).__webglFramebuffer===void 0&&yt.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?yt.setTextureCube(E,0):E.isData3DTexture?yt.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?yt.setTexture2DArray(E,0):yt.setTexture2D(E,0),It.unbindTexture()},this.resetState=function(){R=0,T=0,A=null,It.reset(),wt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ti}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=Le._getDrawingBufferColorSpace(t),e.unpackColorSpace=Le._getUnpackColorSpace()}}class Wx extends ae{constructor(t,e={}){super(t),this.isWater=!0;const n=this,s=e.textureWidth!==void 0?e.textureWidth:512,r=e.textureHeight!==void 0?e.textureHeight:512,o=e.clipBias!==void 0?e.clipBias:0,a=e.alpha!==void 0?e.alpha:1,l=e.time!==void 0?e.time:0,c=e.waterNormals!==void 0?e.waterNormals:null,h=e.sunDirection!==void 0?e.sunDirection:new U(.70707,.70707,0),u=new se(e.sunColor!==void 0?e.sunColor:16777215),p=new se(e.waterColor!==void 0?e.waterColor:8355711),f=e.eye!==void 0?e.eye:new U(0,0,0),x=e.distortionScale!==void 0?e.distortionScale:20,g=e.side!==void 0?e.side:_i,m=e.fog!==void 0?e.fog:!1,d=new pi,S=new U,b=new U,v=new U,C=new le,R=new U(0,0,-1),T=new Pe,A=new U,y=new U,M=new Pe,I=new le,N=new Pn,X=new Bi(s,r),J={name:"MirrorShader",uniforms:wl.merge([Ct.fog,Ct.lights,{normalSampler:{value:null},mirrorSampler:{value:null},alpha:{value:1},time:{value:0},size:{value:1},distortionScale:{value:20},textureMatrix:{value:new le},sunColor:{value:new se(8355711)},sunDirection:{value:new U(.70707,.70707,0)},eye:{value:new U},waterColor:{value:new se(5592405)}}]),vertexShader:`
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
				}`},B=new Yn({name:J.name,uniforms:wl.clone(J.uniforms),vertexShader:J.vertexShader,fragmentShader:J.fragmentShader,lights:!0,side:g,fog:m});B.uniforms.mirrorSampler.value=X.texture,B.uniforms.textureMatrix.value=I,B.uniforms.alpha.value=a,B.uniforms.time.value=l,B.uniforms.normalSampler.value=c,B.uniforms.sunColor.value=u,B.uniforms.waterColor.value=p,B.uniforms.sunDirection.value=h,B.uniforms.distortionScale.value=x,B.uniforms.eye.value=f,n.material=B,n.onBeforeRender=function(W,Q,Y){if(b.setFromMatrixPosition(n.matrixWorld),v.setFromMatrixPosition(Y.matrixWorld),C.extractRotation(n.matrixWorld),S.set(0,0,1),S.applyMatrix4(C),A.subVectors(b,v),A.dot(S)>0)return;A.reflect(S).negate(),A.add(b),C.extractRotation(Y.matrixWorld),R.set(0,0,-1),R.applyMatrix4(C),R.add(v),y.subVectors(b,R),y.reflect(S).negate(),y.add(b),N.position.copy(A),N.up.set(0,1,0),N.up.applyMatrix4(C),N.up.reflect(S),N.lookAt(y),N.far=Y.far,N.updateMatrixWorld(),N.projectionMatrix.copy(Y.projectionMatrix),I.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),I.multiply(N.projectionMatrix),I.multiply(N.matrixWorldInverse),d.setFromNormalAndCoplanarPoint(S,b),d.applyMatrix4(N.matrixWorldInverse),T.set(d.normal.x,d.normal.y,d.normal.z,d.constant);const ct=N.projectionMatrix;M.x=(Math.sign(T.x)+ct.elements[8])/ct.elements[0],M.y=(Math.sign(T.y)+ct.elements[9])/ct.elements[5],M.z=-1,M.w=(1+ct.elements[10])/ct.elements[14],T.multiplyScalar(2/T.dot(M)),ct.elements[2]=T.x,ct.elements[6]=T.y,ct.elements[10]=T.z+1-o,ct.elements[14]=T.w,f.setFromMatrixPosition(Y.matrixWorld);const j=W.getRenderTarget(),Mt=W.xr.enabled,Yt=W.shadowMap.autoUpdate;n.visible=!1,W.xr.enabled=!1,W.shadowMap.autoUpdate=!1,W.setRenderTarget(X),W.state.buffers.depth.setMask(!0),W.autoClear===!1&&W.clear(),W.render(Q,N),n.visible=!0,W.xr.enabled=Mt,W.shadowMap.autoUpdate=Yt,W.setRenderTarget(j);const we=Y.viewport;we!==void 0&&W.state.viewport(we)}}}function Eu(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,l=new Ce;let c=0;for(let h=0;h<i.length;++h){const u=i[h];let p=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in u.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(u.attributes[f]),p++}if(p!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in u.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[f]===void 0&&(o[f]=[]),o[f].push(u.morphAttributes[f])}if(t){let f;if(e)f=u.index.count;else if(u.attributes.position!==void 0)f=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,h),c+=f}}if(e){let h=0;const u=[];for(let p=0;p<i.length;++p){const f=i[p].index;for(let x=0;x<f.count;++x)u.push(f.getX(x)+h);h+=i[p].attributes.position.count}l.setIndex(u)}for(const h in r){const u=Ih(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(const h in o){const u=o[h][0].length;if(u===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let p=0;p<u;++p){const f=[];for(let g=0;g<o[h].length;++g)f.push(o[h][g][p]);const x=Ih(f);if(!x)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(x)}}return l}function Ih(i){let t,e,n,s=-1,r=0;for(let c=0;c<i.length;++c){const h=i[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}const o=new t(r),a=new cn(o,e,n);let l=0;for(let c=0;c<i.length;++c){const h=i[c];if(h.isInterleavedBufferAttribute){const u=l/e;for(let p=0,f=h.count;p<f;p++)for(let x=0;x<e;x++){const g=h.getComponent(p,x);a.setComponent(p+u,x,g)}}else o.set(h.array,l);l+=h.count*e}return s!==void 0&&(a.gpuType=s),a}const pe=1.8,Xx=2,qx=110*pe,Yx=108*pe,Qt=3,ks=Qt/2.15,ss=12.3*ks,Ji=ss+6,$x=ss+8,ho=17,Zx=ks,zn=i=>Object.freeze(Object.fromEntries(Object.entries(i).map(([t,e])=>[t,t==="yaw"?e:e*Zx])));Object.freeze({store:zn({width:4.4,depth:3.6}),nursery:zn({width:5.8,depth:5.9}),watchtower:zn({width:4.8,depth:4}),training:zn({width:5.7,depth:4.8}),palisade:zn({width:7,depth:1})});zn({x:-1.1825,z:-1.0664,yaw:0,width:7.68,depth:8.25});const jx=zn({x:-6.45,z:.43,yaw:-.5,width:4.8,depth:5.2});Object.freeze({store:zn({x:-6.0962,z:4.9054,yaw:0}),nursery:zn({x:6.5601,z:-3.869,yaw:0}),watchtower:zn({x:6.6295,z:5.3482,yaw:0}),training:zn({x:-6.2831,z:-6.0974,yaw:0}),palisade:zn({x:0,z:9.8,yaw:0})});const Kx=ss-.15,Jx=6.8,To=3.8,Qx=.9,Uh=(i,t)=>Number.isFinite(i)?i:t,t_=i=>i?.natural===!0||i?.mesh?.userData?.natural===!0,e_=Array.from({length:5},(i,t)=>Object.freeze({stage:t,unfinished:t<4,wallHeight:t===0?0:t===1?To*.35:To,keep:t>=3,gate:t===4})),n_=Object.freeze({stage:4,unfinished:!1,wallHeight:0,keep:!1,gate:!1});function zh(i){if(t_(i))return n_;const t=i.mesh?.userData?.visualState,e=i.underConstruction??t?.underConstruction??!1,n=e?Math.max(0,Math.min(1,Uh(i.constructionProgress,Uh(t?.constructionProgress,0)))):1,s=e?Math.min(3,Math.floor(n*4)):4;return e_[s]}const ts=(i,t=0)=>Number.isFinite(i)?i:t,Ao=(i,t,e)=>Math.max(t,Math.min(e,i)),Bs=1e-6,i_=i=>i&&i.active!==!1;function s_(i,t){const e=Math.cos(i.yaw||0),n=Math.sin(i.yaw||0),s=t.x-i.x,r=t.z-i.z;return{x:e*s-n*r,y:t.y,z:n*s+e*r}}function uo(i,t){const e=Math.cos(i.yaw||0),n=Math.sin(i.yaw||0);return{x:i.x+e*t.x+n*t.z,y:ts(t.y,i.floorY),z:i.z-n*t.x+e*t.z}}const Tu=(i,t,e=0)=>i.x>t.minX+e-Bs&&i.x<t.maxX-e+Bs&&i.z>t.minZ+e-Bs&&i.z<t.maxZ-e+Bs,ui=(i,t,e,n,s,r,o)=>({id:i,minX:t,maxX:e,minZ:n,maxZ:s,minY:r,maxY:o});function Nh(i,t,e=0){return t.outline?t.outline.every((s,r)=>{const o=t.outline[(r+1)%t.outline.length],a=o.x-s.x,l=o.z-s.z;return a*(i.z-s.z)-l*(i.x-s.x)>=Math.max(0,e)*Math.hypot(a,l)-Bs})||e<0&&t.outline.some((s,r)=>r_(i,s,t.outline[(r+1)%t.outline.length])<e*e-Bs):Tu(i,t,e)}function r_(i,t,e){const n=e.x-t.x,s=e.z-t.z,r=Ao(((i.x-t.x)*n+(i.z-t.z)*s)/(n*n+s*s||1),0,1);return(i.x-t.x-n*r)**2+(i.z-t.z-s*r)**2}function o_(i,t){return i.outline=t.map(([e,n])=>({x:e,z:n})),i.minX=Math.min(...t.map(e=>e[0])),i.maxX=Math.max(...t.map(e=>e[0])),i.minZ=Math.min(...t.map(e=>e[1])),i.maxZ=Math.max(...t.map(e=>e[1])),i}function a_(i,{terrainHeight:t,minimumFloorY:e=.82}={}){const n=t||(()=>0),s={id:i.id,x:ts(i.x),z:ts(i.z),yaw:ts(i.yaw,Math.atan2(-i.x,-i.z)),team:i.team||"neutral",active:!0};let r=-1/0,o=1/0;for(let x=-3.75;x<=3.76;x+=1.25)for(let g=-3.25;g<=4.26;g+=1.25){const m=uo(s,{x,z:g,y:0}),d=ts(n(m.x,m.z));r=Math.max(r,d),o=Math.min(o,d)}s.floorY=Math.max(e,r+.045),s.floorBottom=Math.min(o-.16,s.floorY-.22),s.roofBottom=s.floorY+2.25,s.roofTop=s.floorY+3.05,s.interior={minX:-3.1,maxX:3.1,minZ:-2.6,maxZ:.45},s.floor={minX:-3.75,maxX:3.75,minZ:-3.25,maxZ:4.1},s.entrance={x:1.55,z:4,minX:.3,maxX:2.8,minZ:3.35,maxZ:4,width:2.5,height:1.95},s.solids=[ui("floor",-3.75,3.75,-3.25,4.1,s.floorBottom,s.floorY),ui("left-wall",-3.75,-3.1,-3.25,4,s.floorY,s.roofBottom),ui("right-wall",3.1,3.75,-3.25,4,s.floorY,s.roofBottom),ui("back-wall",-3.75,3.75,-3.25,-2.6,s.floorY,s.roofBottom),ui("front-left",-3.75,.3,3.35,4,s.floorY,s.roofBottom),ui("front-right",2.8,3.75,3.35,4,s.floorY,s.roofBottom),ui("entrance-lintel",.3,2.8,3.35,4,s.floorY+1.95,s.roofBottom),ui("root-baffle",-.35,3.1,.45,1.05,s.floorY,s.roofBottom),ui("roof",-3.75,3.75,-3.25,4,s.roofBottom,s.roofTop)];const l={floor:[[-4.12,-2.2],[-3.45,-3.45],[2.9,-3.65],[4.1,-2.3],[4,3.4],[3.45,4.2],[-3.15,4.2],[-4.12,3.4]],roof:[[-4.12,-2.2],[-3.45,-3.45],[2.9,-3.65],[4.1,-2.3],[4,3.4],[3.45,4.22],[-3.15,4.45],[-4.12,3.4]],"left-wall":[[-3.1,-3.35],[-3.1,4.3],[-3.95,3.4],[-4.05,-2.2]],"right-wall":[[3.1,-3.35],[3.95,-2.3],[3.85,3.4],[3.1,4.2]],"back-wall":[[-3.25,-2.6],[-3.5,-3.3],[2.9,-3.5],[3.3,-2.6]],"front-left":[[-3.3,3.35],[.3,3.35],[.3,4.13],[-3.15,4.3]],"front-right":[[2.8,3.35],[3.3,3.35],[3.45,4],[2.8,4]],"root-baffle":[[-.35,.45],[3.1,.45],[3.1,1.05],[-.3,.98]]};for(const x of s.solids)o_(x,l[x.id]||[[x.minX,x.minZ],[x.maxX,x.minZ],[x.maxX,x.maxZ],[x.minX,x.maxZ]]);s.floor={...s.solids[0]},s.shellBounds={minX:Math.min(...s.solids.map(x=>x.minX)),maxX:Math.max(...s.solids.map(x=>x.maxX)),minZ:Math.min(...s.solids.map(x=>x.minZ)),maxZ:Math.max(...s.solids.map(x=>x.maxZ))};let c=4.5;const h=4.2;for(let x=0;x<3;x++){const g=uo(s,{x:s.entrance.x,z:h+c,y:0});c=Ao(Math.abs(s.floorY-n(g.x,g.z))/.32,4.5,14)}const u=Math.max(10,Math.ceil(c/.45)),p=6,f={minX:s.entrance.x-1.6,maxX:s.entrance.x+1.6,minZ:h,maxZ:h+c,rows:u,cols:p,heights:[],bottoms:[]};for(let x=0;x<=u;x++)for(let g=0;g<=p;g++){const m=x/u,d=f.minX+(f.maxX-f.minX)*g/p,S=f.minZ+c*m,b=uo(s,{x:d,z:S,y:0}),v=uo(s,{x:d,z:f.maxZ,y:0}),C=ts(n(b.x,b.z)),R=s.floorY+(ts(n(v.x,v.z))-s.floorY)*m;f.heights.push(x===0?s.floorY:Math.max(C+(x===u?.005:.02),R)),f.bottoms.push(Math.min(C-.14,R-.18))}return s.ramp=f,s.radius=Math.max(6,Math.hypot(f.maxX,f.maxZ)),s}function l_(i,t){const e=i.ramp;if(!e||!Tu(t,e))return null;const n=Ao((t.x-e.minX)/(e.maxX-e.minX)*e.cols,0,e.cols),s=Ao((t.z-e.minZ)/(e.maxZ-e.minZ)*e.rows,0,e.rows),r=Math.min(e.cols-1,Math.floor(n)),o=Math.min(e.rows-1,Math.floor(s)),a=n-r,l=s-o,c=(x,g)=>e.heights[g*(e.cols+1)+x],h=c(r,o),u=c(r+1,o),p=c(r,o+1),f=c(r+1,o+1);return a+l<=1?h+(u-h)*a+(p-h)*l:f+(p-f)*(1-a)+(u-f)*(1-l)}function c_(i,t,e,{y:n}={}){let s=null;for(const r of i||[]){if(!i_(r)||Math.hypot(t-r.x,e-r.z)>r.radius+1)continue;const o=s_(r,{x:t,z:e}),a=r.solids.find(u=>u.id==="roof");let l=null,c="floor";Nh(o,r.floor)&&(l=r.floorY);const h=l_(r,o);h!==null&&(l===null||h>l)&&(l=h,c="ramp"),Number.isFinite(n)&&n>=r.roofTop-.06&&Nh(o,a)&&(l=r.roofTop,c="roof"),l!==null&&(!s||l>s.height)&&(s={height:l,type:c==="roof"?"rock":"land",platform:r,refuge:r,surface:c})}return s}const ic=(i,t,e)=>Math.max(t,Math.min(e,i)),Vn=(i,t,e)=>{const n=ic((e-i)/(t-i),0,1);return n*n*(3-2*n)},Pi=-.035;function h_(i,t){if(!Number.isFinite(i)||!Number.isFinite(t))return .91;const e=Math.max(0,t-.215-i);return .91-.63*Vn(.1,.6,e)}const u_=Object.freeze({pond:{id:"pond",x:0,z:0,radius:8,label:"Λιμνούλα των νούφαρων",description:"Μύγες, ανθισμένα φύλλα και χαμηλές διαδρομές πάνω από το νερό.",hint:"Παρατήρησε πού μαζεύονται οι μύγες.",findPoint:{x:6.5,z:3}},creek:{id:"creek",x:8,z:-24,radius:7,label:"Το στενό ρυάκι",description:"Το ρεύμα αλλάζει τις διαδρομές και μεταφέρει την τροφή.",hint:"Ακολούθησε την κίνηση του νερού.",findPoint:{x:4,z:-29}},bank:{id:"bank",x:27,z:8,radius:7,label:"Η όχθη με τα βότσαλα",description:"Ψηλά βράχια, κρυψώνες και εκτεθειμένα περάσματα.",hint:"Οι καλαμιές κρύβουν μια δεύτερη προσέγγιση.",findPoint:{x:30,z:6}},roots:{id:"roots",x:24,z:-16,radius:5,label:"Το πέρασμα στις ρίζες",description:"Ένα φυσικό άνοιγμα που αποκαλύπτεται όταν χαμηλώνει το νερό.",hint:"Μικρά έντομα χάνονται κάτω από τις καμπύλες ρίζες.",findPoint:{x:31,z:-16}}});function d_(i){const t=e=>({...e,...i.toWorld(e.x,e.z)});return{landmarks:Object.values(u_).map(e=>({...t(e),findPoint:t(e.findPoint)})),nest:t({id:"creek-nest",x:17,z:16,radius:4,label:"Κοιλότητα κάτω από τις ρίζες"}),refuges:[{id:"willow-crevice",x:-20,z:7,label:"Κρυψώνα της πεσμένης ιτιάς"},{id:"bank-crevice",x:34,z:-9,label:"Κοιλότητα της πετρώδους όχθης"}].map(e=>({...t(e),yaw:Math.atan2(-e.x,-e.z)+i.yaw})),cover:[{id:"nest-reeds",x:14,z:20,radius:3.1},{id:"root-reeds",x:18,z:-7,radius:3},{id:"bank-reeds",x:29,z:11,radius:3.3},{id:"creek-reeds",x:18,z:-22,radius:3}].map(t)}}function Au(i){return 6+Math.sin(i*.035)*9}function f_(i,t,e=0,n=[]){const s=Math.abs(i-Au(t));let r=-1.9+Vn(6,17,s)*3.5+e*.22;r+=Vn(20,55,s)*(.4+Math.sin(t*.04+.6)**2*1.2);const o=1-Vn(11,20,Math.hypot(i*.95,t*.8));r=r*(1-o)+(-2.65+e*.2)*o;for(const l of n){const c=Math.hypot(i-l.x,t-l.z),u=l.radius*(1+.045*Math.sin(Math.atan2(t-l.z,i-l.x)*5+(l.shorePhase||0))),p=1-Vn(u*.46,u+5,c);p>0&&(r=Math.max(r,r*(1-p)+l.elevation*p))}const a=(1-Vn(1.9,4.7,Math.abs(t+16)))*Vn(9,14,i)*(1-Vn(31,36,i));return r=r*(1-a)+Math.min(r,-.18+e*.025)*a,r+=Vn(190,235,Math.max(Math.abs(i),Math.abs(t)))*4,r}function p_(i,t,e,n=.45){const s=i.toSource(t,e),r=Math.abs(s.x-Au(s.z)),o=ic(Number(n)||0,0,1.5)*(1-Vn(5,17,r))*(.55+.45*Vn(5,23,Math.abs(s.z)));if(o<=0)return{x:0,z:0,strength:0};const a=.315*Math.cos(s.z*.035),l=Math.hypot(a,1),c=i.toWorld(0,0),h=i.toWorld(a/l,1/l);return{x:(h.x-c.x)*o,z:(h.z-c.z)*o,strength:o}}function m_({group:i,layout:t,terrainHeight:e,surface:n,insertPlatform:s,materials:r,rockGeos:o,tube:a,leafGeometry:l,bladeGeometry:c,geography:h}){const u=new be;u.name="Natural creek discoveries",i.add(u);const p=[],f=new Ye,x=new Map,g=new cs(1,11,7),m=new Be({color:"#e0c58b",roughness:.68}),d=new Be({color:"#698d9d",roughness:.65}),S=l(.55,.38,.11),b=r.leaf.clone();b.color.set("#adc68a");const v=(B,W,Q)=>{const Y=t.toWorld(B,W);return[Y.x,Q,Y.z]},C=h.landmarks.find(B=>B.id==="roots"),R=e(C.x,C.z);for(const B of[-.48,.45]){const W=a([[0,-.1,-4.1],[-.3,2.3,-2.6],[.2,3.7,0],[.35,2.5,2.7],[0,-.1,4.2]].map(Q=>v(24+Q[0]+B,-16+Q[2],R+Q[1])),.48,r.bark,24,.14);W.name="Passable willow root arch",W.castShadow=!0,W.receiveShadow=!0,u.add(W)}for(const B of[-1,1])for(let W=0;W<4;W++){const Q=-16+B*(3.4+W*.45),Y=24+(W-1.5)*1.1,ct=t.toWorld(Y,Q),j=t.toWorld(Y-4.5,Q+B*1.5),Mt=a([[ct.x,e(ct.x,ct.z)+.8,ct.z],[(ct.x+j.x)/2,e(j.x,j.z)+.45,(ct.z+j.z)/2],[j.x,e(j.x,j.z)-.05,j.z]],.1+W*.025,r.bark,12,.75);Mt.castShadow=!0,u.add(Mt)}const T=[{id:"creek-stone",x:4,z:-29,r:1.8,height:3.5},{id:"root-approach",x:18,z:-7,r:1.65,height:1.65},{id:"root-perch",x:24,z:-11,r:1.7,height:2},{id:"bank-perch",x:30,z:6,r:2,height:2.05},{id:"nest-perch",x:19,z:20,r:1.8,height:1.7},{id:"pond-perch",x:-5,z:8,r:1.7,height:3.5}],A=new Be({color:"#c4d9ad",roughness:.82});for(const[B,W]of T.entries()){const Q=t.toWorld(W.x,W.z),Y=e(Q.x,Q.z),ct=W.height,j=new ae(o[B%o.length],r.mossRock);j.name="Moss-covered grip outcrop",j.position.set(Q.x,Y,Q.z),j.scale.set(W.r,ct,W.r),j.rotation.y=B*1.93,j.castShadow=!0,j.receiveShadow=!0,u.add(j);const Mt=s({id:W.id,type:"rock",...Q,y:Y+ct*.76,radius:W.r*.72,visualRadius:W.r,scaleY:ct}),Yt=new ae(g,A);Yt.name="Pale natural grip",Yt.position.set(Q.x,Mt.y+.045,Q.z),Yt.scale.set(.22,.07,.22),u.add(Yt),p.push({id:W.id,...Q,y:Mt.y+.13,radius:Mt.radius})}const y=c(123),M=new Cn(y,r.plant,h.cover.length*84);M.name="Dense camouflage reed pockets";let I=0;for(const[B,W]of h.cover.entries())for(let Q=0;Q<84;Q++){const Y=Q*2.399+B*.7,ct=Math.sqrt((Q+.4)/84)*W.radius,j=W.x+Math.cos(Y)*ct,Mt=W.z+Math.sin(Y)*ct;f.position.set(j,e(j,Mt),Mt),f.rotation.set(0,Y,0),f.scale.set(1.2,1.65+Q%5*.18,1.2),f.updateMatrix(),M.setMatrixAt(I++,f.matrix)}M.receiveShadow=!0,M.computeBoundingSphere(),u.add(M);function N(B,W,Q){const Y=new be;Y.name=Q?"Lost food and natural keepsakes":"Natural discovery";const ct=new ae(S,b);ct.rotation.y=x.size*2.4%6.28,ct.receiveShadow=!0,Y.add(ct);for(let j=0;j<(Q?3:1);j++){const Mt=new ae(g,W.kind==="keepsake"||W.keepsakesCount?m:d);Mt.position.set((j-1)*.15,.15+j%2*.035,.015),Mt.scale.set(.22,.15,.18),Mt.rotation.set(.2,j*.9,.1),Mt.castShadow=!0,Y.add(Mt)}return Y.userData.creekPoint={...W},u.add(Y),x.set(B,Y),Y}function X(B,W){const Q=new Set;for(const[Y,ct]of[[!1,B.finds||[]],[!0,B.dropped||[]]])for(const j of ct){if(!Number.isFinite(j.x)||!Number.isFinite(j.z)||j.collected||j.visible===!1)continue;const Mt=(Y?"drop:":"find:")+j.id;Q.add(Mt);const Yt=x.get(Mt)||N(Mt,j,Y);Yt.userData.creekPoint={...j},Yt.visible=!0,Yt.position.set(j.x,Math.max(n(j.x,j.z).height,W)+.07,j.z),Yt.updateMatrix()}for(const[Y,ct]of x)Q.has(Y)||(ct.removeFromParent(),x.delete(Y))}function J(B,W){for(const Q of x.values()){const Y=Q.userData.creekPoint,ct=n(Y.x,Y.z),j=ct.type==="water";Q.position.y=Math.max(ct.height,B)+.07+(j?Math.sin(W*1.5+Y.x)*.025:0),Q.rotation.z=j?Math.sin(W*.8+Y.z)*.045:0,Q.updateMatrix()}}return{group:u,grips:p,sync:X,update:J,resources:[g,m,d,S,b,A,y]}}function g_(i){const t=i.outline||[{x:i.minX,z:i.minZ},{x:i.maxX,z:i.minZ},{x:i.maxX,z:i.maxZ},{x:i.minX,z:i.maxZ}],e=t.length,n=[],s=[];for(const h of[i.minY,i.maxY])for(const u of t)n.push(u.x,h,u.z);for(let h=1;h<e-1;h++)s.push(0,h,h+1,e,e+h+1,e+h);for(let h=0;h<e;h++){const u=(h+1)%e;s.push(h,e+h,u,u,e+h,e+u)}const r=new Ce;r.setAttribute("position",new qt(n,3)),r.setIndex(s);const o=r.toNonIndexed();r.dispose(),o.computeVertexNormals();const a=o.attributes.position,l=o.attributes.normal,c=[];for(let h=0;h<a.count;h++){const u=Math.abs(l.getY(h))>.5;c.push((u?a.getX(h):Math.abs(l.getX(h))>.5?a.getZ(h):a.getX(h))*.35,(u?a.getZ(h):a.getY(h))*.35)}return o.setAttribute("uv",new qt(c,2)),o}function x_(i,{terrainHeight:t,materials:e,rockGeos:n,tube:s,leafGeometry:r,mergeStaticParts:o,teamColor:a}){const l=a_(i,{terrainHeight:t}),c=new be;c.name="Natural refuge "+(i.id||""),c.position.set(i.x,l.floorY,i.z),c.rotation.y=l.yaw;const h=[],u=e.leaf.clone(),p=e.rock.clone();p.color.set("#71816a"),h.push(u,p);const f=new be;f.name="Opaque rock and root cavity",c.add(f);const x=new be;x.name="Overhanging refuge slab",f.add(x);for(const T of l.solids){const A=g_(T),y=T.id==="root-baffle"?e.bark:T.id==="floor"?p:e.mossRock,M=new ae(A,y);M.name="Refuge solid · "+T.id,M.userData.refugeSolid=T,M.position.y=-l.floorY,M.castShadow=!0,M.receiveShadow=!0,h.push(A),(T.id==="roof"?x:f).add(M)}const g=l.ramp,m=[],d=[];for(let T=0;T<=g.rows;T++)for(let A=0;A<=g.cols;A++){const y=T*(g.cols+1)+A;m.push(g.minX+(g.maxX-g.minX)*A/g.cols,g.heights[y]-l.floorY,g.minZ+(g.maxZ-g.minZ)*T/g.rows)}for(let T=0;T<g.rows;T++)for(let A=0;A<g.cols;A++){const y=T*(g.cols+1)+A,M=y+1,I=y+g.cols+1,N=I+1;d.push(y,I,M,M,I,N)}const S=[];for(let T=0;T<=g.cols;T++)S.push(T);for(let T=1;T<=g.rows;T++)S.push(T*(g.cols+1)+g.cols);for(let T=g.cols-1;T>=0;T--)S.push(g.rows*(g.cols+1)+T);for(let T=g.rows-1;T>0;T--)S.push(T*(g.cols+1));for(let T=0;T<S.length;T++){const A=S[T],y=S[(T+1)%S.length],M=m.length/3,I=M+1;m.push(m[A*3],g.bottoms[A]-l.floorY,m[A*3+2],m[y*3],g.bottoms[y]-l.floorY,m[y*3+2]),d.push(A,y,M,y,I,M)}const b=new Ce;b.setAttribute("position",new qt(m,3)),b.setAttribute("uv",new qt(Array.from({length:m.length/3},(T,A)=>[m[A*3]*.35,m[A*3+2]*.35]).flat(),2)),b.setIndex(d),b.computeVertexNormals(),h.push(b);const v=new ae(b,e.mossRock);v.name="Terrain-joined natural refuge ledge",v.castShadow=!0,v.receiveShadow=!0,f.add(v);for(const T of[-1,1])for(let A=0;A<3;A++){const y=T*(3.6-A*.12),M=-2.4+A*2.3,I=s([[y,l.floorBottom-l.floorY,M+.55],[y+T*.08,.55,M+.35],[y-T*.12,1.8,M],[y-T*.45,2.6,M-.2]],.16+A*.045,e.bark,15,.48);I.castShadow=!0,h.push(I.geometry),f.add(I)}for(let T=0;T<5;T++){const A=-2.3+T*1.3,y=s([[-3.5,3.03,A],[-1.6,3.12,A-.2],[.5,3.1,A+.1],[3.4,3.04,A+.35]],.075+T%2*.045,e.bark,18,.35);y.castShadow=!0,h.push(y.geometry),x.add(y)}const C=[];for(let T=0;T<4;T++){const A=new be;A.name="Natural life "+T,C.push(A),x.add(A);for(let y=0;y<8+T*3;y++){const M=y*2.399+T*.7,I=Math.cos(M)*(2.1+y%3*.48),N=.35+Math.sin(M)*(2.1+y%4*.2),X=new ae(r(.65+y%3*.15,.85,.12),u);h.push(X.geometry),X.position.set(I,3.07+y%3*.025,N),X.rotation.set((y%3-1)*.08,M,(y%2-.5)*.1),X.castShadow=!0,X.receiveShadow=!0,A.add(X)}o(A,h)}const R=new be;R.name="Dry leaves inside the root hollow",f.add(R);for(let T=0;T<8;T++){const A=new ae(r(.3,.48,.045),u);h.push(A.geometry),A.position.set(Math.sin(T*2.4)*2,.025,-1.1+Math.cos(T*2.4)*.7),A.rotation.y=T*1.7,A.receiveShadow=!0,R.add(A)}return o(R,h),l.mesh=c,c.userData={id:i.id,natural:!0,radius:l.radius,owned:h,growth:C,leafMaterial:u,terrain:null,keepCollision:{rects:[]},trainingPoint:c.position.clone(),support:{x:i.x,z:i.z,y:l.floorY,type:"land",radius:0},team:i.team,refuge:l,refugeSolids:f,refugeRoof:x},Ru(c,i,a),c}function Ru(i,t={},e){const n=i.userData.visualState||{},s={...n,...t},r=ic(Math.floor(Number(s.nestLevel??s.level??s.tier??1)||0),0,3);return i.userData.visualState={team:s.team??"neutral",tier:s.tier??1,nestLevel:r,safe:s.safe!==!1,hp:s.hp,maxHp:s.maxHp,destroyed:!!s.destroyed},i.userData.team=i.userData.visualState.team,i.userData.level=r,i.userData.destroyed=!!s.destroyed,i.userData.refuge&&(i.userData.refuge.team=i.userData.team),i.userData.leafMaterial.color.set(e(i.userData.team)).lerp(new se("#72964b"),.7),i.userData.growth.forEach((o,a)=>{o.visible=a<=r}),i.userData.collisionRevision=(i.userData.collisionRevision||0)+1,i}const De=Math.PI*2,Ii=bl.clamp,Hn=(i,t,e)=>(e=Ii((e-i)/(t-i),0,1),e*e*(3-2*e));function xi(i){return()=>{i|=0,i=i+1831565813|0;let t=Math.imul(i^i>>>15,1|i);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}const fo=(i,t)=>Math.sin(i*.213+Math.sin(t*.137)*1.9)*.48+Math.sin(t*.329-i*.079)*.27+Math.cos(i*.741+t*.533)*.13,sn=i=>new se(i),ft=new Ye;new U(0,1,0);const Fh=[{sky:"#8aaab0",fog:"#819e91",earth:"#8b8a62",wet:"#43533b",deep:"#52634e",leaf:"#b5d28f",rock:"#a4a292",moss:"#89976c",bark:"#65513a",reed:"#b4a676",water:"#2c6258",nightWater:"#0c2b32"},{sky:"#91acbd",fog:"#8bada6",earth:"#82958a",wet:"#3c6257",deep:"#456b68",leaf:"#a0c9ad",rock:"#a7b5ae",moss:"#7f9b88",bark:"#605848",reed:"#aebca0",water:"#3b747b",nightWater:"#122c3b"},{sky:"#b4a58a",fog:"#a39b7e",earth:"#b09b6b",wet:"#685b3c",deep:"#626047",leaf:"#d0b46b",rock:"#b6a184",moss:"#9f9a6d",bark:"#78543b",reed:"#c8ad73",water:"#69765a",nightWater:"#25352b"},{sky:"#82989c",fog:"#738d81",earth:"#7a8064",wet:"#364f3b",deep:"#3e5c52",leaf:"#93b57d",rock:"#939b8b",moss:"#6b8664",bark:"#554934",reed:"#9b9d70",water:"#376b57",nightWater:"#112e29"}];function __(i=0,t=731+Math.max(0,i)*7919){const e=Math.max(0,Math.floor(Number(i)||0)),n=e%8,[s,r]=[[1,0],[0,1],[-1,0],[0,-1]][n%4],o=n>=4?-1:1,a=(h,u)=>e?{x:s*h*o+r*u,z:-r*h*o+s*u}:{x:h,z:u},l=(h,u)=>e?{x:o*(s*h-r*u),z:r*h+s*u}:{x:h,z:u},c=xi((Number(t)||731)^Math.imul(e,2654435761));return{index:e,seed:t,symmetry:n,yaw:n%4*Math.PI/2,toWorld:a,toSource:l,palette:{...Fh[e%Fh.length]},noiseOffset:e?{x:(c()-.5)*170,z:(c()-.5)*170}:{x:0,z:0}}}function sc(i,t,e=1){const n=document.createElement("canvas");n.width=n.height=i,t(n.getContext("2d"),i);const s=new fu(n);return s.colorSpace=wn,s.wrapS=s.wrapT=Ys,s.repeat.set(e,e),s.anisotropy=4,s}function wa(i,t=!1){const e=xi(i);return sc(256,(n,s)=>{n.fillStyle=t?"#6c7155":"#8b8978",n.fillRect(0,0,s,s);for(let r=0;r<15e3;r++){const o=e()*s,a=e()*s,l=45+e()*110;n.fillStyle=t?`rgba(${l*.8},${l},${l*.61},${.12+e()*.28})`:`rgba(${l*1.06},${l},${l*.85},${.15+e()*.3})`,n.fillRect(o,a,.5+e()*3,.5+e()*3)}n.lineWidth=.7;for(let r=0;r<26;r++){n.strokeStyle=`rgba(31,36,28,${.06+e()*.15})`,n.beginPath();let o=e()*s;n.moveTo(0,o);for(let a=0;a<s;a+=10)o+=(e()-.5)*9,n.lineTo(a,o);n.stroke()}},1)}function v_(i){const t=xi(i);return sc(512,(e,n)=>{const s=e.createRadialGradient(n*.5,n*.5,4,n*.5,n*.5,n*.54);s.addColorStop(0,"#588a39"),s.addColorStop(.6,"#6ca04a"),s.addColorStop(1,"#345d27"),e.fillStyle=s,e.fillRect(0,0,n,n);for(let r=0;r<9e3;r++)e.fillStyle=t()>.5?"rgba(185,214,109,.08)":"rgba(18,58,20,.06)",e.fillRect(t()*n,t()*n,t()*4+1,t()*4+1);for(let r=.18;r<De-.18;r+=.31){const o=n*.5+Math.cos(r)*n*.49,a=n*.5+Math.sin(r)*n*.49;e.strokeStyle="rgba(191,204,117,.42)",e.lineWidth=1.8,e.beginPath(),e.moveTo(n*.5,n*.5),e.quadraticCurveTo(n*.5+Math.cos(r+.08)*n*.28,n*.5+Math.sin(r+.08)*n*.28,o,a),e.stroke();for(let l=.2;l<.9;l+=.15)for(const c of[-1,1])e.strokeStyle="rgba(186,211,124,.19)",e.lineWidth=.8,e.beginPath(),e.moveTo(n*.5+Math.cos(r)*n*l*.5,n*.5+Math.sin(r)*n*l*.5),e.lineTo(n*.5+Math.cos(r+c*.12)*n*(l+.1)*.5,n*.5+Math.sin(r+c*.12)*n*(l+.1)*.5),e.stroke()}for(let r=0;r<13;r++){const o=t()*De,a=t()*n*.45;e.fillStyle="rgba(42,56,17,.16)",e.beginPath(),e.ellipse(n*.5+Math.cos(o)*a,n*.5+Math.sin(o)*a,t()*5+2,t()*3+1,o,0,De),e.fill()}})}function M_(i){const e=document.createElement("canvas");e.width=e.height=256;const n=e.getContext("2d"),s=n.createImageData(256,256);for(let o=0;o<256;o++)for(let a=0;a<256;a++){const l=(o*256+a)*4,c=a*De/256,h=o*De/256,u=Math.cos(c*9+h*7)*.27+Math.cos(c*17-h*11)*.14+Math.sin(c*31+h*19)*.07,p=Math.sin(c*7+h*13)*.27+Math.sin(c*19-h*9)*.13+Math.cos(c*29+h*23)*.08;s.data[l]=128+u*110,s.data[l+1]=128+p*110,s.data[l+2]=245,s.data[l+3]=255}n.putImageData(s,0,0);const r=new fu(e);return r.wrapS=r.wrapT=Ys,r.colorSpace=mi,r}function Rl(i,t,e=.1,n=1){const s=xi(n),r=i.attributes.position,o=new Float32Array(r.count*3),a=sn(t);for(let l=0;l<r.count;l++){const c=1+(s()-.5)*e;o[l*3]=a.r*c,o[l*3+1]=a.g*c,o[l*3+2]=a.b*c}return i.setAttribute("color",new cn(o,3)),i}function qe(i,t,e,n=12,s=0){const r=new Ar(i.map(a=>new U(...a))),o=new Lo(r,n,t,5,!1);if(s){const a=o.attributes.position;for(let l=0;l<=n;l++){const c=r.getPointAt(l/n),h=1-s*l/n;for(let u=0;u<=5;u++){const p=l*6+u;a.setXYZ(p,c.x+(a.getX(p)-c.x)*h,c.y+(a.getY(p)-c.y)*h,c.z+(a.getZ(p)-c.z)*h)}}o.computeVertexNormals()}return new ae(o,e)}function Gn(i,t=[],e=new Set){i.updateMatrixWorld(!0);const n=new le().copy(i.matrixWorld).invert(),s=new Map;i.traverse(r=>{if(!r.isMesh||r.isInstancedMesh||e.has(r)||Array.isArray(r.material))return;const o=r.material.uuid;s.has(o)||s.set(o,{material:r.material,meshes:[]}),s.get(o).meshes.push(r)});for(const{material:r,meshes:o}of s.values()){if(o.length<2)continue;const a=o.map(h=>h.geometry.clone().applyMatrix4(new le().multiplyMatrices(n,h.matrixWorld))),l=Eu(a,!1);for(const h of a)h.dispose();if(!l)continue;const c=new ae(l,r);c.castShadow=o.some(h=>h.castShadow),c.receiveShadow=!0,t.push(l);for(const h of o){h.removeFromParent();const u=t.indexOf(h.geometry);u>=0&&(t.splice(u,1),h.geometry.dispose())}i.add(c)}}function Di(i=1,t=1,e=.08){const n=[],s=[],r=[];for(let c=0;c<=3;c++)for(let h=0;h<=40;h++){const u=c/3,p=.22+h/40*(De-.44),f=1+.027*Math.sin(p*7)+.016*Math.cos(p*13),x=Math.cos(p)*u*f,g=Math.sin(p)*u*f;n.push(x*i,e*(u*u)+.014*Math.sin(p*4)*u*u,g*t),s.push(x*.48+.5,g*.48+.5)}for(let c=0;c<3;c++)for(let h=0;h<40;h++){const u=c*41+h,p=u+40+1;r.push(u,u+1,p,p,u+1,p+1)}const l=new Ce;return l.setAttribute("position",new qt(n,3)),l.setAttribute("uv",new qt(s,2)),l.setIndex(r),l.computeVertexNormals(),l}function Ea(i){const t=xi(i),e=28,n=[[-.47,.57],[-.2,.91],[.15,1],[.52,.86],[.71,.61],[.76,.08]],s=[],r=[],o=[],a=Array.from({length:e+1},(h,u)=>.87+.12*Math.sin(u*1.51+i)+t()*.12);a[e]=a[0];for(let h=0;h<n.length;h++)for(let u=0;u<=e;u++){const p=u/e*De,f=n[h][1]*a[u],x=(Math.sin(p*5+i)+Math.sin(p*9-i))*.045;s.push(Math.cos(p)*f,n[h][0]+x*(h===5?.15:1),Math.sin(p)*f*.86),r.push(Math.cos(p)*f*.5+.5,Math.sin(p)*f*.5+.5)}for(let h=0;h<n.length-1;h++)for(let u=0;u<e;u++){const p=h*(e+1)+u,f=p+e+1;o.push(p,f,p+1,p+1,f,f+1)}const l=s.length/3;s.push(0,.764,0),r.push(.5,.5);for(let h=0;h<e;h++)o.push(l,(n.length-1)*(e+1)+h+1,(n.length-1)*(e+1)+h);const c=new Ce;return c.setAttribute("position",new qt(s,3)),c.setAttribute("uv",new qt(r,2)),c.setIndex(o),c.computeVertexNormals(),c}function Cl(i){const t=xi(i),e=[],n=[],s=[],r=[];for(let a=0;a<5;a++){const l=t()*De,c=.55+t()*.7,h=.1+t()*.35,u=.022+t()*.035,p=sn(a%2?"#819c42":"#526f33"),f=e.length/3;for(let x=0;x<=7;x++){const g=x/7,m=Math.cos(l)*h*g*g,d=Math.sin(l)*h*g*g,S=u*Math.sin(Math.PI*(g*.94+.04));for(const b of[-1,1])e.push(m+Math.cos(l+Math.PI/2)*S*b,g*c,d+Math.sin(l+Math.PI/2)*S*b),n.push(b*.5+.5,g),r.push(p.r*(.65+g*.35),p.g*(.65+g*.35),p.b*(.65+g*.35))}for(let x=0;x<7;x++){const g=f+x*2;s.push(g,g+1,g+2,g+1,g+3,g+2)}}const o=new Ce;return o.setAttribute("position",new qt(e,3)),o.setAttribute("uv",new qt(n,2)),o.setAttribute("color",new qt(r,3)),o.setIndex(s),o.computeVertexNormals(),o}function y_(){const i=new Lo(new Ar([new U,new U(.03,.8,.015),new U(.1,1.8,.04)]),9,.013,5,!1);Rl(i,"#64754a",.15,8);const t=new cs(1,7,7);t.scale(.065,.25,.065),t.translate(.1,1.61,.04),Rl(t,"#5d3f27",.3,5);const e=Cl(92);e.scale(.8,1.45,.8);const n=Eu([i,t,e],!1);return i.dispose(),t.dispose(),e.dispose(),n}function S_(i){const t=new cs(1,13,9),e=t.attributes.position;for(let n=0;n<e.count;n++){const s=e.getX(n),r=e.getY(n),o=e.getZ(n),a=1+.06*Math.sin(s*12+i)*Math.sin(o*13-r*7);e.setXYZ(n,s*a,r*.83*a,o*a)}return t.computeVertexNormals(),t}function b_(){const i=[],t=[],e=[];function n(r,o,a,l){const c=i.length/3;i.push(...r,...o,...a);const h=sn(l);for(let u=0;u<3;u++)t.push(h.r,h.g,h.b);e.push(c,c+1,c+2)}n([0,.025,-.1],[-.045,0,0],[0,.04,.09],"#16201b"),n([0,.025,-.1],[0,.04,.09],[.045,0,0],"#293327"),n([0,0,0],[-.17,.025,-.035],[-.12,.015,.07],"#a0b3b0"),n([0,0,0],[.12,.015,.07],[.17,.025,-.035],"#a0b3b0");const s=new Ce;return s.setAttribute("position",new qt(i,3)),s.setAttribute("color",new qt(t,3)),s.setIndex(e),s.computeVertexNormals(),s}function pr(i,t,e,n,{castShadow:s=!1,receiveShadow:r=!1,dynamic:o=!1}={}){const a=new be;a.name=n;const l=new Map,c=[],h=[],u=new Set,p=128;e.forEach((f,x)=>{const g=Math.floor(f.x/p)+":"+Math.floor(f.z/p);l.has(g)||l.set(g,[]),l.get(g).push(x)});for(const[f,x]of l){const g=new Cn(i,t,x.length);g.name=n+" · "+f,g.castShadow=s,g.receiveShadow=r,g.userData.spatialChunk=!0,g.userData.chunkSpan=p,o&&g.instanceMatrix.setUsage(Ui),x.forEach((m,d)=>{c[m]={mesh:g,index:d}}),a.add(g),h.push(g)}return{group:a,meshes:h,count:e.length,setMatrixAt(f,x){const g=c[f];g.mesh.setMatrixAt(g.index,x),u.add(g.mesh)},setColorAt(f,x){const g=c[f];g.mesh.setColorAt(g.index,x)},finish(){for(const f of h)f.computeBoundingBox(),f.computeBoundingSphere(),f.boundingSphere.radius+=.75,f.instanceMatrix.needsUpdate=!0,f.instanceColor&&(f.instanceColor.needsUpdate=!0);u.clear()},flush(){for(const f of u)f.instanceMatrix.needsUpdate=!0;u.clear()}}}function w_(i,t,e={}){const n=Math.max(0,Math.floor(Number(e.regionIndex)||0)),s=e.seed??731+n*7919,r=__(n,s),o=r.palette,a=xi(s),l=new be;l.name="The living creek",i.add(l);const c=e.natural===!0,h=c?d_(r):null,u=h?.landmarks||[],p=h?.nest||null,f=h?.cover||[],x=[],g=[];let m=Pi,d=Pi,S={flow:.45},b=!1,v=null;const C=[],R=[],T=new Set,A=new Map,y=new Set,M=[],I=new Map,N=6;let X=null;const J={reflectionRenders:0,reflectionSkips:0,flyMatricesUpdated:0,spatialChunks:0,terrainUpdates:0};new se(o.sky);const B=new se(o.fog);i.fog?i.fog.color.copy(B):i.fog=new Co(B,.0042);const W=wa(s),Q=wa(s+9,!0),Y=v_(s),ct=M_();M.push(W,Q,Y,ct);const j={terrain:new Be({color:16777215,vertexColors:!0,map:Q,roughness:1}),leaf:new Be({color:o.leaf,map:Y,roughness:.44,metalness:.025,side:$e}),rock:new Be({color:o.rock,map:W,roughness:.89}),mossRock:new Be({color:o.moss,map:Q,roughness:.94}),plant:new Be({color:16777215,vertexColors:!0,roughness:.87,side:$e}),bark:new Be({color:o.bark,map:W,roughness:.94}),reed:new Be({color:o.reed,map:W,roughness:.83}),compost:new Be({color:"#57422e",map:Q,roughness:1}),fruit:new Be({color:"#b38539",map:W,roughness:.75}),darkFruit:new Be({color:"#685831",map:Q,roughness:.95})},Mt=[Ea(7),Ea(35),Ea(89)],Yt=Di(),we=S_(19),oe=[{id:"home",x:8,z:8,radius:7.4,team:"neutral",name:"Willow Haven"},{id:"mudfang",x:-31,z:-30,radius:7,team:"enemy",name:"Mudfang Den"},{id:"redreed",x:31,z:-56,radius:7.6,team:"enemy",name:"Red Reed Stronghold"},{id:"mossjaw",x:-24,z:49,radius:7.1,team:"enemy",name:"Mossjaw Hollow"},{id:"blackpool",x:34,z:79,radius:8,team:"enemy",name:"Blackwater Nest"},{id:"thornback",x:-8,z:-91,radius:8,team:"enemy",name:"Thornback Root"},{id:"oldwillow",x:-38,z:96,radius:7.5,team:"neutral",name:"Αυλή της Γέρικης Ιτιάς"},{id:"quietbend",x:29,z:32,radius:6.8,team:"neutral",name:"Quiet Bend"},{id:"foxglove",x:-39,z:2,radius:6.8,team:"neutral",name:"Foxglove Island"},{id:"reedcrossing",x:3,z:-45,radius:6.8,team:"neutral",name:"Πέρασμα των Καλαμιών"},{id:"longreed",x:-4,z:67,radius:6.8,team:"neutral",name:"Νησίδα των Ανέμων"},{id:"eastshallows",x:58,z:35,radius:6.8,team:"neutral",name:"Ανατολικές Αβαθείς"}],ht={home:.65,mudfang:2.7,redreed:4.1,mossjaw:1.8,blackpool:5.2,thornback:7.1,oldwillow:2.9,quietbend:1.2,foxglove:2.1,reedcrossing:1.7,longreed:2.5,eastshallows:3.4},V=xi(s^3582759),st={home:{x:17,z:16,radius:7.4,elevation:.65},mudfang:{x:38,z:-19,radius:9,elevation:1.35},redreed:{x:-37,z:-46,radius:11,elevation:1.2},mossjaw:{x:-34,z:44,radius:11,elevation:1.05},blackpool:{x:40,z:86,radius:12,elevation:1.5},thornback:{x:-16,z:-120,radius:12,elevation:1.65}};for(const _ of oe){const L=st[_.id],F=c&&L?{x:L.x,z:L.z}:{x:_.x*pe,z:_.z*pe};Object.assign(_,r.toWorld(F.x,F.z)),_.radius=c?L?.radius||10:Math.max(36,_.radius*(_.id==="thornback"?5.8:4.9)),_.elevation=c?L?.elevation||1.1:Math.max(.45,ht[_.id]+(n?(V()-.5)*.6:0)),_.shorePhase=F.x+(n?V()*De:0),n&&(_.yaw=r.yaw)}oe.find(_=>_.id==="thornback").stronghold=!0;const vt=[{id:"haven",name:"Απάνεμη Όχθη",x:0,z:12,radius:30,tint:"#77965d"},{id:"reedways",name:"Περάσματα των Καλαμιών",x:2,z:-50,radius:45,tint:"#a99d64"},{id:"westernroots",name:"Δυτικές Ρίζες",x:-34,z:22,radius:37,tint:"#657f67"},{id:"blackwater",name:"Βαθύ Νερό",x:10,z:75,radius:34,tint:"#496f79"}].map(_=>({..._,...r.toWorld(_.x*pe,_.z*pe),radius:_.radius*pe})),Ht={heron:r.toWorld(34*pe,14*pe),snake:r.toWorld(-38*pe,-22*pe),fish:r.toWorld(12*pe,48*pe)},Nt={heron:r.toWorld(43*pe,-73*pe),snake:r.toWorld(-39*pe,70*pe),fish:r.toWorld(11*pe,94*pe)};c&&(Object.assign(Ht,{heron:r.toWorld(34,15),snake:r.toWorld(-26,-23),fish:r.toWorld(5,-34)}),Object.assign(Nt,{heron:r.toWorld(41,-70),snake:r.toWorld(-34,62),fish:r.toWorld(7,106)}));const ue=c?oe.map(_=>({..._,...r.toSource(_.x,_.z)})):[];function ye(_,L){const F=r.toSource(_,L),O=F.x/pe,z=F.z/pe;if(c)return f_(F.x,F.z,fo(F.x+r.noiseOffset.x,F.z+r.noiseOffset.z),ue);const k=Math.sin(z*.032)*15+Math.sin(z*.073)*5,q=Math.abs(O-k);let H=-2.2+fo(F.x+r.noiseOffset.x,F.z+r.noiseOffset.z)*.47+Hn(44,71,q)*6;H+=Hn(47,72,q)*(1.5+3.3*Math.sin(z*.036+.7)**2),H+=Hn(105,132,Math.abs(z))*4.8;let nt=null,dt=0;for(const zt of oe){const ee=_-zt.x,Te=L-zt.z,Ae=Math.hypot(ee,Te),fe=r.toSource(ee,Te),Ke=zt.radius*(1+.05*Math.sin(Math.atan2(fe.z,fe.x)*5+zt.shorePhase));if(Ae<Ke+7){const Ze=$x,nn=zt.elevation-Hn(Ze,Ke+7,Ae)*(zt.elevation+2.8);H=Math.max(H,nn);const dn=1-Hn(Ze,Ze+8,Ae);dn>dt&&(nt=zt,dt=dn)}}nt&&(H=H*(1-dt)+nt.elevation*dt);let Tt=null,Wt=0,Lt=1/0;for(const zt of A.values()){const ee=Math.hypot(_-zt.x,L-zt.z),Te=1-Hn(Ji,Ji+ho,ee);(Te>Wt||Te===Wt&&Te>0&&ee<Lt)&&(Tt=zt,Wt=Te,Lt=ee)}if(Tt){const zt=H*(1-Wt)+Tt.elevation*Wt;H=Wt===1?Tt.elevation:Math.max(H,zt)}return H}const D=new Fi(270*pe,270*pe,216,216);D.rotateX(-Math.PI/2);const Jt=D.attributes.position,Xt=new Float32Array(Jt.count*3),Vt=sn(o.earth),It=sn(o.wet),te=sn(o.deep);for(let _=0;_<Jt.count;_++){const L=Jt.getX(_),F=Jt.getZ(_),O=ye(L,F);Jt.setY(_,O);const z=te.clone().lerp(It,Hn(-1.7,.05,O)).lerp(Vt,Hn(.02,2,O));z.multiplyScalar(.88+fo(L*2,F*2)*.18),z.toArray(Xt,_*3)}D.setAttribute("color",new cn(Xt,3)),D.computeVertexNormals(),Q.repeat.set(44*pe,44*pe);const pt=new ae(D,j.terrain);pt.receiveShadow=!0,pt.name="Creek bed and island banks",l.add(pt);const yt=135*pe,re=270*pe/216,Re=217;function P(_,L){const F=bl.clamp((_+yt)/re,0,216),O=bl.clamp((L+yt)/re,0,216),z=Math.min(215,Math.floor(F)),k=Math.min(215,Math.floor(O)),q=F-z,H=O-k,nt=k*Re+z,dt=nt+Re,Tt=Jt.getY(nt),Wt=Jt.getY(nt+1),Lt=Jt.getY(dt),zt=Jt.getY(dt+1);return q+H<=1?Tt+q*(Wt-Tt)+H*(Lt-Tt):zt+(1-q)*(Lt-zt)+(1-H)*(Wt-zt)}function w(_){const L=Ji+ho+re*2;for(let F=0;F<Jt.count;F++){const O=Jt.getX(F),z=Jt.getZ(F);if(Math.abs(O-_.x)>L||Math.abs(z-_.z)>L)continue;const k=ye(O,z);Jt.setY(F,k);const q=te.clone().lerp(It,Hn(-1.7,.05,k)).lerp(Vt,Hn(.02,2,k));q.multiplyScalar(.88+fo(O*2,z*2)*.18),q.toArray(Xt,F*3)}Jt.needsUpdate=!0,D.attributes.color.needsUpdate=!0,D.computeVertexNormals(),D.computeBoundingBox(),D.computeBoundingSphere(),J.terrainUpdates++}const K=wa(s+9,!0);M.push(K),j.mossRock.map=K,j.compost.map=K,j.darkFruit.map=K;const ot=new Fi(266*pe,266*pe,88,88),at=new Wx(ot,{textureWidth:512,textureHeight:512,waterNormals:ct,sunDirection:new U(.6,.8,-.3),sunColor:16771517,waterColor:3039835,distortionScale:2.5,alpha:.91,fog:!0});at.name="Reflecting creek",at.rotation.x=-Math.PI/2,at.position.y=Pi,at.material.transparent=!0,at.material.depthWrite=!1,at.renderOrder=-2,at.material.uniforms.size.value=4.8,l.add(at);const rt=at.onBeforeRender;let Ut=0;at.onBeforeRender=function(_,L,F){if(at.material.uniforms.eye.value.setFromMatrixPosition(F.matrixWorld),Ut++%2){J.reflectionSkips++;return}J.reflectionRenders++,rt.call(this,_,L,F)};const lt=ot.attributes.position.array.slice(),bt=[],Rt=new be,mt=[];Rt.name="Willow trunks and tangled roots",l.add(Rt);for(let _ of[-1,1])for(let L=0;L<15;L++){const F=(-122+L*17+(a()-.5)*7)*pe,O=(_*(59+a()*15)+Math.sin(F/pe*.032)*15)*pe,{x:z,z:k}=r.toWorld(O,F),q=ye(z,k);if(q<.2)continue;const H=new be;H.position.set(z,q,k);const nt=9+a()*14,dt=(a()-.5)*3,Tt=qe([[0,-.8,0],[.25,nt*.3,0],[dt,nt*.72,.6],[dt*.8,nt,1]],.68+a()*.65,j.bark,13,.72);Tt.castShadow=!0,H.add(Tt),bt.push(Tt.geometry);for(let Wt=0;Wt<5;Wt++){const Lt=Wt/5*De+a(),zt=3+a()*4,ee=qe([[0,.7,0],[Math.cos(Lt)*zt*.45,.1,Math.sin(Lt)*zt*.45],[Math.cos(Lt)*zt,-.4,Math.sin(Lt)*zt]],.15+a()*.2,j.bark,9,.82);ee.castShadow=!0,H.add(ee),bt.push(ee.geometry)}for(let Wt=0;Wt<4;Wt++){const Lt=a()*De,zt=nt*(.5+a()*.3),ee=3+a()*6,Te=qe([[dt*.4,zt,0],[Math.cos(Lt)*ee*.45,zt+2,Math.sin(Lt)*ee*.45],[Math.cos(Lt)*ee,zt+3,Math.sin(Lt)*ee]],.16+a()*.2,j.bark,10,.83);H.add(Te),bt.push(Te.geometry);for(let Ae=0;Ae<70;Ae++){const fe=Math.sqrt(a())*4,Ke=a()*De;mt.push({x:z+Math.cos(Lt)*ee+Math.cos(Ke)*fe,y:q+zt+3+(a()-.5)*3-Math.abs(fe)*.25,z:k+Math.sin(Lt)*ee+Math.sin(Ke)*fe,angle:a()*De,scale:.65+a()*.6})}}Rt.add(H)}Gn(Rt,bt);const At=new Ce;At.setAttribute("position",new qt([0,0,0,-.12,-.32,.035,0,-.38,.06,.12,-.32,.035,-.1,-.64,.02,0,-.76,.04,.1,-.64,.02,0,-1.05,0],3)),At.setAttribute("uv",new qt([.5,0,0,.3,.5,.35,1,.3,0,.6,.5,.7,1,.6,.5,1],2)),At.setIndex([0,1,2,0,2,3,1,4,2,2,4,5,2,5,6,2,6,3,4,7,5,5,7,6]),At.computeVertexNormals(),Rl(At,"#69834d",.25,s);const $t=pr(At,j.plant,mt,"Hanging willow foliage");mt.forEach((_,L)=>{ft.position.set(_.x,_.y,_.z),ft.rotation.set((a()-.5)*.8,_.angle,(a()-.5)*.7),ft.scale.setScalar(_.scale),ft.updateMatrix(),$t.setMatrixAt(L,ft.matrix)}),$t.finish(),l.add($t.group),J.spatialChunks+=$t.meshes.length;function Ot(_){C.push(_);const L=Math.floor((_.x-_.radius)/N),F=Math.floor((_.x+_.radius)/N),O=Math.floor((_.z-_.radius)/N),z=Math.floor((_.z+_.radius)/N);for(let k=L;k<=F;k++)for(let q=O;q<=z;q++){const H=k+":"+q;I.has(H)||I.set(H,[]),I.get(H).push(_)}return _}const wt=[],ce=[[],[],[]];function G(_,L,F=1.35+a()*.9){const O=Ot({id:"p"+C.length,type:"lily",x:_,z:L,y:.105,radius:F*.91,visualRadius:F,angle:a()*De,phase:a()*De});return wt.push(O),O}function _t(_,L,F=1.3+a()*1.3,O=.65+a()*.65){const z=Math.floor(a()*3),k=Ot({id:"p"+C.length,type:"rock",x:_,z:L,y:O*.76-.05,radius:F*.72,visualRadius:F,scaleY:O,angle:a()*De,variant:z});return ce[z].push(k),k}const Et=r.toWorld(3.7,1),Ft=r.toWorld(-3.9,2.2);if(G(0,0,3.1),G(Et.x,Et.z,2.3),_t(Ft.x,Ft.z,2.5,.9),c){const _=u.find(L=>L.id==="pond").findPoint;G(_.x,_.z,1.7)}function gt(_,L){const F=Math.hypot(L.x-_.x,L.z-_.z),O=Math.ceil(F/3.65),z=r.toSource(_.x,_.z),k=r.toSource(L.x,L.z);for(let q=1;q<O;q++){const H=q/O,{x:nt,z:dt}=r.toWorld(z.x+(k.x-z.x)*H+Math.sin(H*Math.PI*3)*1.25,z.z+(k.z-z.z)*H);if(ye(nt,dt)>-.1)continue;const Tt=r.toSource(nt,dt);c&&Tt.x>14&&Tt.x<32&&Math.abs(Tt.z+16)<3.7||(a()<.18?_t(nt,dt,1.8+a()*.7,.65+a()*.55):G(nt,dt,1.65+a()*.65))}}const ut={id:"origin",x:0,z:0},kt=new Map(oe.map(_=>[_.id,_]));kt.set("origin",ut);const Ne=[["origin","home"],["origin","foxglove"],["home","mudfang"],["home","quietbend"],["mudfang","reedcrossing"],["reedcrossing","redreed"],["reedcrossing","thornback"],["foxglove","mossjaw"],["quietbend","mossjaw"],["quietbend","eastshallows"],["mossjaw","longreed"],["longreed","blackpool"],["longreed","oldwillow"],["eastshallows","blackpool"],["redreed","thornback"]].map(([_,L])=>({from:_,to:L,start:kt.get(_),end:kt.get(L)}));for(const _ of Ne)gt(_.start,_.end);if(c){const _=L=>u.find(F=>F.id===L);for(const[L,F]of[[ut,_("creek")],[_("creek"),_("roots")],[_("roots"),_("bank")],[_("bank"),p]])gt(L,F)}for(let _=0;_<1180;_++){const L=(a()-.5)*218*pe,F=((a()-.5)*108+Math.sin(L/pe*.032)*10)*pe,{x:O,z}=r.toWorld(F,L);if(ye(O,z)>-.18)continue;const k=r.toSource(O,z);c&&k.x>14&&k.x<32&&Math.abs(k.z+16)<3.7||(I.get(Math.floor(O/N)+":"+Math.floor(z/N))||[]).some(H=>Math.hypot(H.x-O,H.z-z)<H.radius+1)||(a()<.15?_t(O,z,1.1+a()*2.3,.55+a()*1.2):G(O,z,1.1+a()*1.1))}for(const _ of oe)Ot({id:"island-"+_.id,type:"land",x:_.x,z:_.z,y:_.elevation,radius:_.radius*.8});const ge=pr(Yt,j.leaf,wt,"Veined water lily leaves",{castShadow:!0,receiveShadow:!0,dynamic:!0});wt.forEach((_,L)=>{ft.position.set(_.x,_.y,_.z),ft.rotation.set((a()-.5)*.04,_.angle,(a()-.5)*.035),ft.scale.set(_.visualRadius,1,_.visualRadius*(.89+a()*.18)),ft.updateMatrix(),ge.setMatrixAt(L,ft.matrix),ge.setColorAt(L,sn(["#b6cf8a","#88ac67","#749d59","#c0cc7e","#729958"][Math.floor(a()*5)]))}),ge.finish(),l.add(ge.group),J.spatialChunks+=ge.meshes.length,ce.forEach((_,L)=>{const F=pr(Mt[L],L===1?j.mossRock:j.rock,_,"Weathered waterline outcrops",{castShadow:!0,receiveShadow:!0});_.forEach((O,z)=>{ft.position.set(O.x,-.05,O.z),ft.rotation.set(0,O.angle,0),ft.scale.set(O.visualRadius,O.scaleY,O.visualRadius),ft.updateMatrix(),F.setMatrixAt(z,ft.matrix),F.setColorAt(z,sn("#ffffff").multiplyScalar(.7+a()*.4))}),F.finish(),l.add(F.group),J.spatialChunks+=F.meshes.length});const _n=new Ce,Tn=[],Js=[],$n=[];for(let _=0;_<=9;_++){const L=_/9,F=Math.sin(L*Math.PI)*.16;for(const O of[-1,1])Tn.push(O*F,.13*Math.sin(L*Math.PI)+.23*L*L,L*.65),Js.push(O*.5+.5,L)}for(let _=0;_<9;_++){const L=_*2;$n.push(L,L+1,L+2,L+1,L+3,L+2)}_n.setAttribute("position",new qt(Tn,3)),_n.setAttribute("uv",new qt(Js,2)),_n.setIndex($n),_n.computeVertexNormals();const Qs=new Be({color:"#f4e5d5",roughness:.48,side:$e}),tr=wt.filter((_,L)=>L%23===5),Gi=new Cn(_n,Qs,tr.length*13);let ds=0;for(const _ of tr)for(let L=0;L<13;L++)ft.position.set(_.x+.24,_.y+.045,_.z),ft.rotation.set(L>7?.1:0,L/8*De,L>7?.1:0),ft.scale.setScalar(L>7?.67:1),ft.updateMatrix(),Gi.setMatrixAt(ds++,ft.matrix);l.add(Gi);const yi=[];for(let _=0;_<26e3;_++){const L=(a()-.5)*254*pe,F=(a()-.5)*254*pe,O=ye(L,F);O<-.52||O>3.2||oe.some(z=>Math.hypot(z.x-L,z.z-F)<z.radius*.68)||Math.hypot(L,F)<8||yi.push({x:L,z:F,y:O,scale:.65+a()*2.2,angle:a()*De})}const fs=Cl(44),Zn=pr(fs,j.plant,yi,"Curved river reeds",{receiveShadow:!0});yi.forEach((_,L)=>{ft.position.set(_.x,_.y,_.z),ft.rotation.set(0,_.angle,0),ft.scale.set(.65+_.scale*.25,_.scale,.65+_.scale*.25),ft.updateMatrix(),Zn.setMatrixAt(L,ft.matrix),Zn.setColorAt(L,sn("#ffffff").multiplyScalar(.75+a()*.5))}),Zn.finish(),l.add(Zn.group),J.spatialChunks+=Zn.meshes.length;const ps=yi.filter((_,L)=>_.y<.5&&L%5===0),No=y_(),Si=pr(No,j.plant,ps,"Cattail patches");ps.forEach((_,L)=>{ft.position.set(_.x+.12,_.y,_.z),ft.rotation.set(0,_.angle,0),ft.scale.setScalar(.7+_.scale*.4),ft.updateMatrix(),Si.setMatrixAt(L,ft.matrix)}),Si.finish(),l.add(Si.group),J.spatialChunks+=Si.meshes.length;const Dr={value:0};j.plant.onBeforeCompile=_=>{_.uniforms.uCreekTime=Dr,_.vertexShader=`uniform float uCreekTime;
`+_.vertexShader,_.vertexShader=_.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
 transformed.x += sin(uCreekTime * 1.1 + position.y * 2.3 + instanceMatrix[3].x * .13 + instanceMatrix[3].z * .17) * pow(max(position.y, 0.0), 1.6) * .035;`)},j.plant.customProgramCacheKey=()=>"creek-wind-1";function Vi(_,L){const F=c?m-.065:-.1;let O=P(_,L),z=O>F?"land":"water",k=null;O<=F&&(O=c?m-.215:-.25);const q=I.get(Math.floor(_/N)+":"+Math.floor(L/N))||[];for(const H of q){if(H.type==="land")continue;const nt=Math.hypot(_-H.x,L-H.z);if(nt<=H.radius){let dt=H.y;if(H.type==="rock"&&(dt-=Hn(H.radius*.62,H.radius,nt)*.14*H.scaleY),c&&dt<=F)continue;dt>O&&(O=dt,z=H.type==="shelter"?"land":H.type,k=H)}}return c_(g,_,L)||{height:O,type:z,platform:k}}function er(_,L){return Vi(_,L).height}const ms=[{x:4.5/pe,z:-4/pe,rich:!1},{x:-10,z:12,rich:!0},{x:15,z:-20,rich:!1},{x:-25,z:-23,rich:!0},{x:26,z:-47,rich:!0},{x:-17,z:40,rich:!0},{x:27,z:69,rich:!0},{x:-4,z:-81,rich:!0},{x:-34,z:86,rich:!0},{x:23,z:26,rich:!1},{x:-33,z:7,rich:!1},{x:4,z:51,rich:!1},{x:9,z:-59,rich:!1},{x:-12,z:76,rich:!1},{x:39,z:-4,rich:!1},{x:-42,z:-59,rich:!0},{x:7,z:-39,rich:!0},{x:0,z:63,rich:!0},{x:53,z:33,rich:!0},{x:-24,z:17,rich:!1},{x:17,z:-70,rich:!1},{x:18,z:90,rich:!0}].map(_=>({..._,...r.toWorld(_.x*pe,_.z*pe)}));if(c)for(const[_,L]of[{x:4.5,z:-4},{x:18,z:14},{x:9,z:-24},{x:26,z:10},{x:31,z:-16},{x:-20,z:-8}].entries())Object.assign(ms[_],r.toWorld(L.x,L.z));const E=[],$=[],tt=[],et=new be;l.add(et);for(let _=0;_<ms.length;_++){const L=ms[_];ye(L.x,L.z)<-.15&&_t(L.x,L.z,L.rich?3.2:2.2,.62);const O=er(L.x,L.z),z={id:"flies-"+_,x:L.x,z:L.z,y:O+.25,flies:L.rich?240:100,maxFlies:L.rich?240:100,rich:L.rich};if(c){const q=[...u].sort((H,nt)=>Math.hypot(L.x-H.x,L.z-H.z)-Math.hypot(L.x-nt.x,L.z-nt.z))[0]?.id||"creek";z.ecology={habitat:q,activity:1},z.regenMultiplier=1}R.push(z);const k=new ae(Mt[_%3],j.compost);k.position.set(L.x,O+.05,L.z),k.scale.set(L.rich?1.7:1.05,.28,L.rich?1.25:.75),k.rotation.y=a()*De,l.add(k),$.push(k);for(let q=0;q<(L.rich?12:6);q++){const H=a()*De,nt=a()*(L.rich?1.5:.85),dt=.12+a()*.16;E.push({spot:_,groundOffset:dt,x:L.x+Math.cos(H)*nt,y:O+dt,z:L.z+Math.sin(H)*nt,scale:.12+a()*.18,rot:a()*De})}for(let q=0;q<3;q++){const H=a()*De,nt=.7+a()*.8,dt=qe([[0,0,0],[nt*.5,.02,.06],[nt,.04,.14]],.035,j.bark,4);dt.position.set(L.x+(a()-.5)*1.6,O+.1,L.z+(a()-.5)*1.6),dt.rotation.y=H,et.add(dt),tt.push(dt.geometry)}}Gn(et,tt);for(const _ of ms)if(ye(_.x,_.z)<-.15){const L=ce.flat().find(F=>Math.abs(F.x-_.x)<.01&&Math.abs(F.z-_.z)<.01);if(L){const F=new ae(Mt[L.variant],j.mossRock);F.position.set(L.x,-.05,L.z),F.rotation.y=L.angle,F.scale.set(L.visualRadius,L.scaleY,L.visualRadius),F.castShadow=!0,F.receiveShadow=!0,l.add(F)}}const Z=new Cn(we,j.fruit,E.length);E.forEach((_,L)=>{ft.position.set(_.x,_.y,_.z),ft.rotation.set(.3,_.rot,.2),ft.scale.setScalar(_.scale),ft.updateMatrix(),Z.setMatrixAt(L,ft.matrix),Z.setColorAt(L,sn(["#cb9d59","#6d7341","#aa7044","#c5ad62"][L%4]))}),l.add(Z);const xt=[];for(let _=0;_<R.length;_++)for(let L=0;L<(R[_].rich?65:30);L++)xt.push({spot:_,phase:a()*De,phase2:a()*De,r:.25+a()*(R[_].rich?2.3:1.35),height:.45+a()*1.9,speed:.65+a()*1.7,rank:L});const Dt=R.map(()=>[]);for(const _ of xt)Dt[_.spot].push(_);const Bt=new Be({vertexColors:!0,roughness:.45,side:$e}),Pt=new Cn(b_(),Bt,xt.length);Pt.instanceMatrix.setUsage(Ui),Pt.frustumCulled=!1,Pt.name="Fly swarms",Pt.count=0,l.add(Pt);const Zt=c?m_({group:l,layout:r,terrainHeight:P,surface:Vi,insertPlatform:Ot,materials:j,rockGeos:Mt,tube:qe,leafGeometry:Di,bladeGeometry:Cl,geography:h}):null;Zt&&x.push(...Zt.grips);function ne(_,L){return c&&Vi(_,L).type==="water"?p_(r,_,L,S.flow):{x:0,z:0,strength:0}}function jt(_,L){return c&&f.some(F=>Math.hypot(_-F.x,L-F.z)<F.radius*.85)&&P(_,L)>m-.5}function ve(_){m=_,at.position.y=_,at.updateMatrix(),Gi.position.y=_-Pi,Gi.updateMatrix();for(const L of wt)L.y=.105+_-Pi}function Ie(_={}){if(!c)return!1;S={...S,..._.phase||{}},d=Pi+Ii(Number(S.waterOffset)||0,-.75,.65),b||(ve(d),b=!0);for(const F of R){const O=F.ecology?.habitat===S.foodShift?1.4:typeof S.foodShift=="string"?.45:1;F.regenMultiplier=O,F.ecology.activity=O}const L=_.nest;if(L&&Number.isFinite(L.x)&&Number.isFinite(L.z)){const F={id:"living-creek-nest",x:L.x,z:L.z,team:"ally",natural:!0,nestLevel:L.level??0,safe:L.safe,hp:1,maxHp:1};v?Bo(v,F):v=Ir(F)}return Zt.sync(_,m),!0}const Fe=64,Ue=new Fi(2,2),Se=new rp;Ue.rotateX(-Math.PI/2),Se.index=Ue.index,Se.attributes.position=Ue.attributes.position,Se.attributes.uv=Ue.attributes.uv;const Kt=new Float32Array(Fe*3),He=new Float32Array(Fe).fill(-100),Ee=new Float32Array(Fe),fn=new Float32Array(Fe*3);Se.setAttribute("aCenter",new Fs(Kt,3)),Se.setAttribute("aStart",new Fs(He,1)),Se.setAttribute("aSize",new Fs(Ee,1)),Se.setAttribute("aTint",new Fs(fn,3)),Se.instanceCount=Fe;const si=new Yn({transparent:!0,depthWrite:!1,side:$e,uniforms:{uTime:{value:0}},vertexShader:"attribute vec3 aCenter; attribute float aStart; attribute float aSize; attribute vec3 aTint; uniform float uTime; varying vec2 vUv; varying float vLife; varying vec3 vTint; void main(){vUv=uv; vLife=(uTime-aStart)/2.4; vTint=aTint; vec3 p=position*aSize*(.35+clamp(vLife,0.,1.)*3.8)+aCenter; gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}",fragmentShader:"varying vec2 vUv;varying float vLife;varying vec3 vTint;void main(){if(vLife<0.||vLife>1.)discard;float r=length(vUv-.5)*2.;float band=exp(-pow((r-.82)/(.026+vLife*.018),2.))* .58+exp(-pow((r-.64)/.026,2.))*.22;float a=band*pow(1.-vLife,1.6);gl_FragColor=vec4(vTint,a);}"}),hn=new ae(Se,si);hn.frustumCulled=!1,hn.renderOrder=2,l.add(hn);let Wi=0,Ge=0;const je=1100,en=new Float32Array(je*3),an=new Float32Array(je*3),un=new Float32Array(je),bi=new Float32Array(je),jn=Array.from({length:je},()=>({life:0,max:1,vx:0,vy:0,vz:0,water:!0}));let Pu=0;const ri=new Ce;ri.setAttribute("position",new cn(en,3).setUsage(Ui)),ri.setAttribute("aColor",new cn(an,3).setUsage(Ui)),ri.setAttribute("aSize",new cn(un,1).setUsage(Ui)),ri.setAttribute("aAlpha",new cn(bi,1).setUsage(Ui));const Du=new Yn({transparent:!0,depthWrite:!1,uniforms:{uScale:{value:500}},vertexShader:"attribute vec3 aColor;attribute float aSize;attribute float aAlpha;uniform float uScale;varying vec3 vColor;varying float vAlpha;void main(){vColor=aColor;vAlpha=aAlpha;vec4 mv=modelViewMatrix*vec4(position,1.);gl_Position=projectionMatrix*mv;gl_PointSize=clamp(aSize*uScale/max(.1,-mv.z),1.,35.);}",fragmentShader:"varying vec3 vColor;varying float vAlpha;void main(){vec2 p=gl_PointCoord-.5;float d=length(p)*2.;if(d>1.)discard;float shade=.6+.4*max(0.,1.-length(p-vec2(-.12,.12))*2.);gl_FragColor=vec4(vColor*shade,smoothstep(1.,.55,d)*vAlpha);}"}),Fo=new zf(ri,Du);Fo.frustumCulled=!1,Fo.renderOrder=3,l.add(Fo);function Lu(_,L,F){const O=Wi++%Fe;Kt.set([_.x,c?(_.y??m)+.025:Math.max(-.005,(_.y??0)+.025),_.z],O*3),He[O]=Ge,Ee[O]=.7+L*.7,sn(F??"#c2e1d5").toArray(fn,O*3);for(const k of["aCenter","aStart","aSize","aTint"])Se.attributes[k].needsUpdate=!0}function oc(_,L,F,O){const z=Math.min(90,Math.round(18+L*21)),k=sn(F??(O?"#b2d7ce":"#d5bc80"));for(let q=0;q<z;q++){const H=Pu++%je,nt=jn[H],dt=a()*De,Tt=(.6+a()*2.7)*Math.sqrt(L);nt.life=nt.max=.5+a()*.8,nt.vx=Math.cos(dt)*Tt,nt.vz=Math.sin(dt)*Tt,nt.vy=(1.5+a()*4)*Math.sqrt(L),nt.water=O,en.set([_.x+(a()-.5)*.3,(_.y??0)+.12,_.z+(a()-.5)*.3],H*3),k.clone().multiplyScalar(.85+a()*.3).toArray(an,H*3),un[H]=(.045+a()*.085)*(O?1:.8),bi[H]=.9}ri.attributes.aColor.needsUpdate=!0,ri.attributes.aSize.needsUpdate=!0}function Iu(_,L=1,F){L=Ii(L,.1,4),Lu({x:_.x,y:c?m+.01:.01,z:_.z},L,F),oc({x:_.x,y:c?m+.03:.03,z:_.z},L,F,!0)}function Uu(_,L="#e9cb87",F=1){oc(_,F,L,!1)}function ac(_,L,F,O=1){const z=[],k=[],q=[],H=[],nt=xi(O),dt=16,Tt=20;for(let Lt=0;Lt<=dt;Lt++)for(let zt=0;zt<=Tt;zt++){const ee=zt/Tt*2-1,Te=Lt/dt,Ae=.5+Math.sqrt(Math.max(0,1-ee*ee))*F+.06*Math.sin(Te*23+ee*5),fe=ee*_*(.97+.025*Math.sin(Te*19));z.push(fe,Ae,(Te-.5)*L),k.push(zt/Tt,Lt/dt),sn("#809549").multiplyScalar(.85+nt()*.23).toArray(H,H.length)}for(let Lt=0;Lt<dt;Lt++)for(let zt=0;zt<Tt;zt++){const ee=Lt*(Tt+1)+zt,Te=ee+Tt+1;q.push(ee,Te,ee+1,Te,Te+1,ee+1)}const Wt=new Ce;return Wt.setAttribute("position",new qt(z,3)),Wt.setAttribute("uv",new qt(k,2)),Wt.setAttribute("color",new qt(H,3)),Wt.setIndex(q),Wt.computeVertexNormals(),Wt}function Oo(_,L,F){const O=new be,z=new Be({color:"#a6bf76",map:Y,vertexColors:!0,roughness:.78,side:$e});F.push(z);const k=ac(1.75,3.8,1.95,s+Math.round(_*7));F.push(k);const q=new ae(k,z);q.castShadow=!0,q.receiveShadow=!0,O.add(q);for(let H=0;H<8;H++){const nt=-1.85+H*.53,dt=[];for(let Wt=0;Wt<=12;Wt++){const Lt=Wt/12*Math.PI;dt.push([Math.cos(Lt)*1.75,.5+Math.sin(Lt)*1.96+.025,nt+.025*Math.sin(Lt*4)])}const Tt=qe(dt,.038,j.reed,18);F.push(Tt.geometry),O.add(Tt)}for(let H of[-1,1])for(let nt=0;nt<5;nt++){const dt=-1.6+nt*.8,Tt=qe([[H*1.68,-.08,dt],[H*1.7,.45,dt],[H*1.38,1.5,dt]],.052,j.bark,5);F.push(Tt.geometry),O.add(Tt)}for(let H=0;H<7;H++){const nt=.16+H*.12,dt=qe([[-1.65,nt,-1.8],[0,nt+.025,-1.88],[1.65,nt,-1.8]],.036,j.reed,8);F.push(dt.geometry),O.add(dt)}return Gn(O,F,new Set([q])),O.scale.setScalar(_),O.userData.roof=q,O}const nr={player:"#8ecf75",friendly:"#8ecf75",ally:"#8ecf75",enemy:"#cf7554",neutral:"#ceb785"};function gs(_){if(typeof _=="string"&&_.startsWith("enemy")){const L=["#e8aa70","#d8786b","#b9ad81","#a9a0d4","#8dc2b8"],F=parseInt(_.replace(/\D/g,""),10)||0;return L[F%L.length]}return nr[_]||nr.neutral}const ko=new Map;function Lr(_){if(ko.has(_))return ko.get(_);const L=["player","ally","friendly"].includes(_),F=_==="neutral",O=(parseInt(String(_).replace(/\D/g,""),10)||0)%5,z=sc(256,(k,q)=>{k.fillStyle="#eee9cb",k.fillRect(0,0,q,q);for(let nt=0;nt<256;nt+=4)k.fillStyle=nt%8?"#ded9bd":"#f3eed3",k.fillRect(nt,0,1,q),k.fillRect(0,nt,q,1);k.save(),k.translate(38,23),k.scale(2.8,2.8),k.fillStyle=L?"#194333":F?"#494633":"#472c29",k.strokeStyle="#fff2c9",k.lineWidth=2,k.beginPath(),k.moveTo(32,3),k.lineTo(59,14),k.lineTo(56,44),k.quadraticCurveTo(53,55,32,68),k.quadraticCurveTo(11,55,8,44),k.lineTo(5,14),k.closePath(),k.fill(),k.stroke(),k.lineWidth=3.2,k.lineCap="round",k.lineJoin="round";const H=nt=>{k.beginPath(),nt.forEach((dt,Tt)=>Tt?k.lineTo(...dt):k.moveTo(...dt)),k.stroke()};if(L)k.beginPath(),k.moveTo(43,20),k.bezierCurveTo(28,17,18,26,21,38),k.bezierCurveTo(24,48,35,47,40,37),k.bezierCurveTo(43,30,40,24,43,20),k.stroke(),H([[20,51],[37,27]]),H([[28,40],[23,32]]),H([[32,35],[39,34]]);else if(F)H([[24,27],[32,19],[40,27]]),H([[32,19],[32,49]]),H([[23,40],[32,49],[41,40]]);else if(O===0)H([[20,19],[27,31],[22,44]]),H([[44,19],[37,31],[42,44]]),H([[28,46],[36,46]]);else if(O===1)H([[22,18],[18,36],[32,49],[46,36],[42,18]]),H([[25,30],[32,36],[39,30]]);else if(O===2)for(const[nt,dt]of[[21,20],[32,15],[43,20]])H([[nt,dt],[nt,49]]),H([[nt-4,dt+6],[nt+4,dt+6]]);else O===3?(k.beginPath(),k.moveTo(44,17),k.bezierCurveTo(15,9,11,48,32,52),k.bezierCurveTo(39,53,44,50,47,45),k.bezierCurveTo(29,43,26,26,44,17),k.stroke()):H([[18,24],[25,30],[32,17],[39,30],[46,24],[41,46],[23,46],[18,24]]);k.restore()});return z.wrapS=z.wrapT=zi,ko.set(_,z),M.push(z),z}function zu(_,L,F=0){const O=new be;O.name="Woven reed courtyard and rooted foundations";const z=5.68;for(let k=0;k<43;k++){const q=-5.58+k*.266,H=Math.sqrt(Math.max(0,z*z-q*q))*(.97+.02*Math.sin(k*1.7)),nt=qe([[-H,-.045,q],[-H*.25,-.035,q+.022],[H*.4,-.04,q-.018],[H,-.045,q+.015]],.077,j.bark,7);nt.receiveShadow=!0,L.push(nt.geometry),O.add(nt)}for(let k=0;k<25;k++){const q=-5.4+k*.45,H=Math.sqrt(Math.max(0,z*z-q*q))*.98,nt=qe([[q,.018,-H],[q+.025,.028,0],[q-.018,.02,H]],.027,j.reed,10);L.push(nt.geometry),O.add(nt)}for(let k=0;k<16;k++){const q=k/16*De,H=Math.cos(q)*5.1,nt=Math.sin(q)*5.1,dt=(P(_.position.x+(H*Math.cos(F)+nt*Math.sin(F))*Qt,_.position.z+(nt*Math.cos(F)-H*Math.sin(F))*Qt)-_.position.y)/Qt,Tt=qe([[H,Math.min(-.18,dt-.15),nt],[H+.03,-.35,nt-.02],[H,-.08,nt]],.095,j.bark,5);L.push(Tt.geometry),O.add(Tt)}Gn(O,L),_.add(O),_.userData.foundation=O}function Nu(_,L){const F=new be,O=qe([[0,0,0],[.04,1.6,0],[-.03,3.1,.02]],.047,j.bark,7);L.push(O.geometry),F.add(O);const z=new Ce,k=[0,2.93,0,.9,2.8,.09,1.13,2.12,.02,.6,2.25,-.03,0,2.18,0],q=[0,1,1,1,1,0,.5,.1,0,0];z.setAttribute("position",new qt(k,3)),z.setAttribute("uv",new qt(q,2)),z.setIndex([0,1,3,1,2,3,0,3,4]),z.computeVertexNormals();const H=new Be({color:gs(_),roughness:.8,side:$e,map:Lr(_)}),nt=new ae(z,H);return nt.castShadow=!0,F.add(nt),F.userData.flag=nt,F.userData.emblemTeam=_,L.push(z,H),F}function Fu(_,L,F){const O=Kx,z=Jx,k=To,q=.11,H=new be;H.name="Enclosed creek castle",_.add(H);const nt=new be;nt.name="Reinforced castle perimeter",_.add(nt);const dt=Math.asin((z/2+.25)/O),Tt=44,Wt=(De-dt*2)/Tt,Lt=[],zt=[],ee=2*(O+.65)*Math.tan(Wt/2)+.08;for(let it=0;it<Tt;it++){const St=dt+Wt*(it+.5),ie=Math.sin(St)*O,Xe=Math.cos(St)*O;Lt.push({x:ie,z:Xe,y:q+k/2,w:ee,h:k,d:Qx,ry:St});for(const Oe of[-.29,.29]){const de=St+Wt*Oe;Lt.push({x:Math.sin(de)*O,z:Math.cos(de)*O,y:q+k+.37,w:.76,h:.74,d:1.2,ry:de})}zt.push({x:Math.sin(St)*(O+.64),z:Math.cos(St)*(O+.64),y:q+1.65,w:ee*.7,h:3.1,d:.5,ry:St}),zt.push({x:Math.sin(St)*(O+.4),z:Math.cos(St)*(O+.4),y:q+3.5,w:ee*1.01,h:.28,d:.9,ry:St})}const Te=[Math.PI/4,Math.PI*3/4,Math.PI*5/4,Math.PI*7/4],Ae=[];for(const it of Te){const St=Math.sin(it)*(O+.15),ie=Math.cos(it)*(O+.15);Ae.push({x:St,z:ie});for(let Xe=0;Xe<10;Xe++){const Oe=Xe/10*De;Lt.push({x:St+Math.sin(Oe)*1.42,z:ie+Math.cos(Oe)*1.42,y:q+6.15,w:.6,h:.85,d:.66,ry:Oe})}}for(const it of[-1,1])Lt.push({x:it*(z/2+.62),z:O,y:q+2.8,w:1.24,h:5.6,d:2}),Lt.push({x:it*(z/2+.62),z:O,y:q+5.95,w:1.6,h:.7,d:2.35}),zt.push({x:it*(z/2+.62),z:O+1.05,y:q+2.4,w:1.32,h:4.8,d:.25});Lt.push({x:0,z:O,y:q+4.85,w:z+1.2,h:.78,d:1.75});const fe=(it,St,ie,Xe)=>{const Oe=new ls(1,1,1),de=new Cn(Oe,Xe,ie.length);return F.push(Oe),de.name=St,de.castShadow=!0,de.receiveShadow=!0,ie.forEach((Je,Zu)=>{ft.position.set((Je.x||0)/Qt,(Je.y||0)/Qt,(Je.z||0)/Qt),ft.rotation.set(Je.rx||0,Je.ry||0,Je.rz||0),ft.scale.set(Je.w/Qt,Je.h/Qt,Je.d/Qt),ft.updateMatrix(),de.setMatrixAt(Zu,ft.matrix)}),it.add(de),de},Ke=fe(H,"Continuous moss-stone walls and crenellations",Lt,j.mossRock);Ke.userData.fullCount=Lt.length,Ke.userData.firstCoursesCount=Tt*3,fe(nt,"Whole-ring stone buttresses and gate reinforcement",zt,j.rock);const Ze=new Po(1,1.12,1,12,1),nn=new Cn(Ze,j.mossRock,4);F.push(Ze),nn.name="Four castle defence towers",nn.castShadow=!0,nn.receiveShadow=!0,Ae.forEach((it,St)=>{ft.position.set(it.x/Qt,(q+2.9)/Qt,it.z/Qt),ft.rotation.set(0,Te[St],0),ft.scale.set(1.65/Qt,5.8/Qt,1.65/Qt),ft.updateMatrix(),nn.setMatrixAt(St,ft.matrix)}),H.add(nn);const dn=Di(1,1,.28),pn=new Cn(dn,j.leaf,4);F.push(dn),pn.name="Folded leaf tower roofs",pn.castShadow=!0,Ae.forEach((it,St)=>{ft.position.set(it.x/Qt,(q+6.68)/Qt,it.z/Qt),ft.rotation.set(0,Te[St],0),ft.scale.set(2/Qt,2.4/Qt,2/Qt),ft.updateMatrix(),pn.setMatrixAt(St,ft.matrix)}),H.add(pn);const Fn=new be;Fn.name="Working south castle gate",Fn.position.set(0,q/Qt,O/Qt),H.add(Fn);const xs=[];for(const it of[-1,1]){const St=new be;St.position.x=it*z/(2*Qt),St.name=it<0?"Left hinged gate":"Right hinged gate",Fn.add(St);const ie=[],Xe=[],Oe=z/2;for(let de=0;de<7;de++)ie.push({x:-it*((de+.5)*Oe/7),y:k/2,z:0,w:Oe/7+.025,h:k-.08,d:.36});for(const de of[.65,1.9,3.2])Xe.push({x:-it*Oe/2,y:de,z:.23,w:Oe-.1,h:.22,d:.2});fe(St,"Bound timber gate leaf",ie,j.bark),fe(St,"Gate cross braces",Xe,j.reed),xs.push(St)}const Xi=new be;Xi.name="Breached gate fallen slabs",Fn.add(Xi),fe(Xi,"Broken gate timber",[{x:-1.45,y:.18,z:1.5,w:2.8,h:.3,d:3.5,ry:.18},{x:1.6,y:.23,z:.9,w:2.7,h:.35,d:3.2,ry:-.24}],j.bark);const sr=new Fi(1.7/Qt,1.9/Qt),rr=new Be({map:Lr(L.team),color:gs(L.team),side:$e,roughness:.85});F.push(sr,rr);const _s=new ae(sr,rr);return _s.name="Castle gate clan crest",_s.position.set(0,(q+5.2)/Qt,(O+1.02)/Qt),H.add(_s),_.userData.fortification=H,_.userData.palisade=nt,_.userData.gate=Fn,_.userData.gateLeaves=xs,_.userData.fallenGate=Xi,_.userData.gateCrest=_s,_.userData.fortWalls=Ke,_.userData.fortTowers=nn,_.userData.fortTowerRoofs=pn,_.userData.fortificationGeometry={radius:O,gateWidth:z,wallHeight:k,gateDirection:{x:0,z:1},towerCount:4},H}function Ou(_){const L=Oo(1,nr.ally,_);L.name="Stone keep beneath woven leaf roof",L.userData.groundWalls=[];const F=new be;F.name="Enclosed central keep";const O=(z,k,q,H,nt,dt,Tt=j.mossRock)=>{const Wt=new ls(H,nt,dt),Lt=new ae(Wt,Tt);_.push(Wt),Lt.position.set(z,k,q),Lt.castShadow=!0,Lt.receiveShadow=!0,F.add(Lt),k-nt/2<.03&&L.userData.groundWalls.push({minX:z-H/2,maxX:z+H/2,minZ:q-dt/2,maxZ:q+dt/2,height:k+nt/2})};O(-1.6,.68,0,.26,1.36,3.45),O(1.6,.68,0,.26,1.36,3.45),O(0,.68,-1.65,3.05,1.36,.25);for(const z of[-1,1])O(z*1.14,.68,1.64,.9,1.36,.26);O(0,1.22,1.64,1.45,.28,.27);for(const z of[-1.23,1.23])for(const k of[-1.34,1.34]){O(z,1.36,k,.58,2.72,.58);for(const q of[-.2,.2])for(const H of[-.2,.2])O(z+q,2.83,k+H,.19,.3,.19,j.rock)}return Gn(F,_),L.add(F),L}function lc(_){const L=Ji+ho+3,F=z=>Math.hypot(z.x-_.x,z.z-_.z)<L,O=z=>[...A.values()].some(k=>Math.hypot(z.x-k.x,z.z-k.z)<Ji-2);yi.forEach((z,k)=>{F(z)&&(ft.position.set(z.x,P(z.x,z.z),z.z),ft.rotation.set(0,z.angle,0),ft.scale.set(.65+z.scale*.25,z.scale,.65+z.scale*.25),O(z)&&ft.scale.setScalar(0),ft.updateMatrix(),Zn.setMatrixAt(k,ft.matrix))}),Zn.finish(),ps.forEach((z,k)=>{F(z)&&(ft.position.set(z.x+.12,P(z.x,z.z),z.z),ft.rotation.set(0,z.angle,0),ft.scale.setScalar(O(z)?0:.7+z.scale*.4),ft.updateMatrix(),Si.setMatrixAt(k,ft.matrix))}),Si.finish(),R.forEach((z,k)=>{F(z)&&(z.y=Vi(z.x,z.z).height+.25,$[k].position.y=z.y-.2,$[k].updateMatrix())}),E.forEach((z,k)=>{F(z)&&(ft.position.set(z.x,R[z.spot].y-.25+z.groundOffset,z.z),ft.rotation.set(.3,z.rot,.2),ft.scale.setScalar(z.scale),ft.updateMatrix(),Z.setMatrixAt(k,ft.matrix))}),Z.instanceMatrix.needsUpdate=!0,Z.computeBoundingBox(),Z.computeBoundingSphere()}function cc(_,L){for(const z of A.values())if(Math.hypot(z.x-_,z.z-L)<.01)return z.elevation;const F=oe.find(z=>Math.hypot(z.x-_,z.z-L)<.01);let O=F?Math.fround(F.elevation):Math.max(.35,er(_,L));if(!F){const z=Ji+re,k=Math.max(0,Math.floor((_-z+yt)/re)),q=Math.min(216,Math.ceil((_+z+yt)/re)),H=Math.max(0,Math.floor((L-z+yt)/re)),nt=Math.min(216,Math.ceil((L+z+yt)/re));for(let dt=H;dt<=nt;dt++)for(let Tt=k;Tt<=q;Tt++){const Wt=dt*Re+Tt;Math.hypot(Jt.getX(Wt)-_,Jt.getZ(Wt)-L)<=z&&(O=Math.max(O,Jt.getY(Wt)))}}return O}function ku(_){const L=cc(_.x,_.z),F={id:_.id,x:_.x,z:_.z,elevation:L};return A.set(_.id,F),w(F),lc(F),F}function Ir(_,L={}){if((c||_.natural===!0)&&!L.preview){const it=x_(_,{terrainHeight:P,materials:j,rockGeos:Mt,tube:qe,leafGeometry:Di,mergeStaticParts:Gn,teamColor:gs});return l.add(it),T.add(it),g.push(it.userData.refuge),it}const F=!!L.preview,O=F?null:ku(_),z=new be;z.name="Shelter "+(_.id??""),z.position.set(_.x,O?.elevation??0,_.z),z.scale.setScalar(Qt),z.userData.id=_.id,z.userData.radius=ss,z.userData.owned=[],z.userData.terrain=O;const k=z.userData.owned;zu(z,k,Number.isFinite(_.yaw)?_.yaw:0),F||(z.userData.support=Ot({id:"shelter-"+_.id,type:"shelter",x:_.x,z:_.z,y:z.position.y+.11,radius:ss-.2}),z.userData.landmark=Ot({id:"castle-land-"+_.id,type:"land",x:_.x,z:_.z,y:z.position.y,radius:Ji+ho*.45})),Fu(z,_,k);const q=Ou(k);q.position.set(-.55,.04,-.5),z.add(q),z.userData.core=q,z.userData.keepCollision={rects:q.userData.groundWalls.map(it=>({minX:(it.minX+q.position.x)*Qt,maxX:(it.maxX+q.position.x)*Qt,minZ:(it.minZ+q.position.z)*Qt,maxZ:(it.maxZ+q.position.z)*Qt,height:(it.height+q.position.y)*Qt})),door:{x:q.position.x*Qt,z:(q.position.z+1.64)*Qt}};const H=Nu(_.team,k);H.position.set(1.8,0,1.1),z.add(H),z.userData.banner=H;const nt=new be;nt.name="Additional sleeping leaves";const dt=Oo(.62,nr[_.team],k);dt.position.set(-3,.01,.2),dt.rotation.y=-.5,nt.add(dt),z.add(nt),z.userData.extra=nt;const Tt=new be;Tt.name="Hatchery";const Wt=Oo(.52,nr[_.team],k);Wt.position.set(3.05,0,-1.8),Wt.rotation.y=.7,Tt.add(Wt);for(let it=0;it<5;it++){const St=[];for(let Xe=0;Xe<=24;Xe++){const Oe=Xe/24*De;St.push([3.05+Math.cos(Oe)*.74,.06+it*.065,-1.7+Math.sin(Oe)*.63])}const ie=qe(St,.035,j.reed,25);k.push(ie.geometry),Tt.add(ie)}Gn(Tt,k),z.add(Tt),z.userData.nursery=Tt;const Lt=new be;Lt.name="Leaf training yard and woven sparring dummies",Lt.position.set(-2.9,.07,-3.2);for(let it=0;it<3;it++){const St=-.82+it*.8,ie=it%2?-.2:.2,Xe=new ae(Di(.46,.65,.04),j.leaf);Xe.position.set(St,.025,ie+.6),Xe.rotation.y=(it-1)*.35,k.push(Xe.geometry),Lt.add(Xe);for(const de of[-.21,.21]){const Je=qe([[St+de,-.02,ie-.25],[St+de*.3,.48,ie-.3],[St,.96,ie-.25]],.035,j.bark,5);k.push(Je.geometry),Lt.add(Je)}const Oe=qe([[St-.4,.64,ie-.2],[St,.72,ie-.28],[St+.4,.64,ie-.2]],.041,j.reed,6);k.push(Oe.geometry),Lt.add(Oe);for(let de=0;de<3;de++){const Je=new ae(Di(.23,.37,.15),j.leaf);Je.position.set(St+(de-1)*.06,.59,ie-.19),Je.rotation.set(Math.PI/2,(de-1)*.25,(de-1)*.3),k.push(Je.geometry),Lt.add(Je)}for(const de of[-.12,.12]){const Je=qe([[St+de,.89,ie-.22],[St+de*1.45,1.09,ie-.22],[St+de*.5,1.07,ie-.19],[St+de,.89,ie-.22]],.025,j.reed,10);k.push(Je.geometry),Lt.add(Je)}}for(const it of[-1.2,1.2]){const St=qe([[it,-.04,-.65],[it*.98,.75,-.68],[it,.98,-.65]],.04,j.bark,5);k.push(St.geometry),Lt.add(St)}for(let it=0;it<2;it++){const St=qe([[-1.2,.45+it*.28,-.65],[0,.38+it*.28,-.7],[1.2,.45+it*.28,-.65]],.025,j.reed,10);k.push(St.geometry),Lt.add(St)}Gn(Lt,k),z.add(Lt),z.userData.training=Lt,z.userData.trainingPoint=new U(_.x-2.9*Qt,z.position.y+.12,_.z-2.5*Qt);const zt=new be;zt.name="Leaf-wrapped food cache",zt.position.set(-2.8,.04,2.2);const ee=new Cn(we,j.fruit,15);for(let it=0;it<15;it++)ft.position.set(it%4*.32-.5,Math.floor(it/8)*.25+.15,Math.floor(it/4)%2*.35),ft.scale.setScalar(.22+it%3*.025),ft.rotation.set(it*.7,it*.4,0),ft.updateMatrix(),ee.setMatrixAt(it,ft.matrix),ee.setColorAt(it,sn(it%3?"#b7b06c":"#6d673f"));zt.add(ee);for(let it=0;it<3;it++){const St=qe([[-.85,.05,-.3+it*.45],[0,.02,-.3+it*.45],[.85,.08,-.3+it*.45]],.075,j.bark,5);k.push(St.geometry),zt.add(St)}const Te=new ae(Di(1,.8,.23),j.leaf);Te.position.set(0,.5,.1),Te.rotation.z=.17,k.push(Te.geometry),zt.add(Te),Gn(zt,k),z.add(zt),z.userData.storage=zt,z.userData.foodMesh=ee,z.userData.storageCover=Te;const Ae=new be;Ae.name="Lookout perch",Ae.position.set(3.1,0,2.5);for(let it=0;it<3;it++){const St=it/3*De,ie=qe([[Math.cos(St)*.7,-.1,Math.sin(St)*.7],[Math.cos(St)*.44,1.4,Math.sin(St)*.44],[Math.cos(St)*.35,2.65,Math.sin(St)*.35]],.085,j.bark,7);k.push(ie.geometry),Ae.add(ie)}for(let it=0;it<8;it++){const St=-.6+it*.17,ie=qe([[-.7,2.35,St],[0,2.32,St],[.7,2.36,St]],.06,j.reed,4);k.push(ie.geometry),Ae.add(ie)}const fe=new ae(Di(1.1,.9,.08),j.leaf);fe.position.y=3.15,fe.rotation.x=.17,k.push(fe.geometry),Ae.add(fe);for(let it=0;it<6;it++){const St=qe([[-.25,it*.34,.63],[.25,it*.34,.63]],.035,j.reed,2);k.push(St.geometry),Ae.add(St)}Gn(Ae,k),z.add(Ae),z.userData.watchtower=Ae;const Ke=new Cn(Mt[1],j.mossRock,25);for(let it=0;it<25;it++){const St=it/25*De;ft.position.set(Math.cos(St)*2.15,-.12,Math.sin(St)*2.35-.5),ft.rotation.set(0,St,0),ft.scale.set(.25,.25,.25),ft.updateMatrix(),Ke.setMatrixAt(it,ft.matrix)}z.add(Ke);const Ze=new be;Ze.name="Collapsed shelter remains";const nn=new Be({color:"#839061",map:Y,roughness:.94,side:$e});k.push(nn);for(let it=0;it<6;it++){const St=ac(.62+it%3*.16,1.35+it%2*.55,.14+it%3*.05,s+it*19),ie=new ae(St,nn);ie.position.set(-1.3+it%3*.85,-.46+it%2*.04,-1.5+Math.floor(it/3)*1.7),ie.rotation.set((it%2-.5)*.24,it*1.71,(it%3-1)*.13),ie.castShadow=!0,k.push(St),Ze.add(ie)}for(let it=0;it<22;it++){const St=it*2.399,ie=.65+it%5*.27,Xe=Math.cos(St)*(it<14?1.2:3.4),Oe=Math.sin(St)*(it<14?1.6:2.8)-.3,de=qe([[Xe,.055,Oe],[Xe+Math.cos(St+.7)*ie*.6,.11+it%3*.07,Oe+Math.sin(St+.7)*ie*.6],[Xe+Math.cos(St+.7)*ie,.04+it%4*.06,Oe+Math.sin(St+.7)*ie]],it%2?.045:.065,it%2?j.reed:j.bark,4);de.castShadow=!0,k.push(de.geometry),Ze.add(de)}Gn(Ze,k),z.add(Ze),z.userData.ruin=Ze;const dn=new Cn(we,j.fruit,8);dn.name="Supplies exposed in the ruins";for(let it=0;it<8;it++)ft.position.set(-.5+it%4*.29,.12+Math.floor(it/4)*.08,1.35+Math.floor(it/4)*.31),ft.rotation.set(it*.43,it*1.31,.2),ft.scale.setScalar(.16+it%3*.025),ft.updateMatrix(),dn.setMatrixAt(it,ft.matrix),dn.setColorAt(it,sn(it%2?"#a99958":"#d9a253"));z.add(dn),z.userData.looseLoot=dn;const pn=new Be({color:"#edc371",emissive:"#e5a64c",emissiveIntensity:.7,roughness:.7});k.push(pn);const Fn=new ae(we,pn);Fn.position.set(1.7,.55,1.1),Fn.scale.set(.15,.22,.15),z.add(Fn),z.userData.lamp=Fn;const xs=new np("#ffd098",1.8,25,2);xs.position.set(0,2.3,1.8),z.add(xs),z.userData.light=xs,z.updateMatrixWorld(!0),z.userData.buildingGroups={},z.userData.defaultPlacements={};for(const[it,St]of Object.entries({store:"storage",nursery:"nursery",watchtower:"watchtower",training:"training"})){const ie=z.userData[St],Xe=new ni().setFromObject(ie),Oe=z.worldToLocal(Xe.getCenter(new U)),de=new be;de.name=ie.name+" placement",de.position.set(Oe.x,ie.position.y,Oe.z),z.add(de),ie.position.sub(de.position),de.add(ie),z.userData[St]=de,z.userData.buildingGroups[it]=de,z.userData.defaultPlacements[it]={x:Oe.x*Qt,z:Oe.z*Qt,yaw:0}}z.updateMatrixWorld(!0);const Xi=new ni().setFromObject(q),sr=z.worldToLocal(Xi.getCenter(new U)),rr=Xi.getSize(new U);z.userData.coreFootprint={x:sr.x*Qt,z:sr.z*Qt,width:rr.x,depth:rr.z},F||(l.add(z),T.add(z)),Bo(z,_);const _s=new Set([z.userData.core.userData.roof,z.userData.storageCover,z.userData.banner.userData.flag]);return z.traverse(it=>{it.isMesh&&!_s.has(it)&&(it.updateMatrix(),it.matrixAutoUpdate=!1)}),z}function Bo(_,L={}){if(!_)return;if(_.userData.natural)return Ru(_,L,gs);const F=_.userData.visualState||{},O={...F,...L},z=Math.max(1,O.tier??1),k=O.buildings||{},q=Ii((O.hp??O.maxHp??100)/(O.maxHp??100),0,1),H=!!O.destroyed||q<=0,nt=O.team??F.team??"neutral",dt={};for(const[Ae,fe]of Object.entries(O.buildingPlacements||{}))_.userData.buildingGroups[Ae]&&fe&&Number.isFinite(fe.x)&&Number.isFinite(fe.z)&&Number.isFinite(fe.yaw??0)&&(dt[Ae]={x:fe.x,z:fe.z,yaw:fe.yaw??0});_.userData.visualState={team:nt,tier:z,hp:O.hp,maxHp:O.maxHp,buildings:{...k},buildingPlacements:dt,yaw:Number.isFinite(O.yaw)?O.yaw:0,storage:O.storage,resources:O.resources,lootTaken:!!O.lootTaken,gateHp:O.gateHp,gateOpen:!!O.gateOpen,destroyed:H,underConstruction:!!O.underConstruction,constructionProgress:Ii(Number(O.constructionProgress)||0,0,1)},_.rotation.y=_.userData.visualState.yaw;for(const[Ae,fe]of Object.entries(_.userData.buildingGroups)){const Ke=dt[Ae]||_.userData.defaultPlacements[Ae];fe.position.x=Ke.x/Qt,fe.position.z=Ke.z/Qt,fe.rotation.y=Ke.yaw}const Tt=_.userData.buildingGroups.training;_.updateMatrixWorld(!0),_.userData.trainingPoint.copy(Tt.getWorldPosition(new U)),_.userData.trainingPoint.y=_.position.y+.12,_.userData.team=nt,_.userData.tier=z,_.userData.health=q,_.userData.destroyed=H,_.userData.banner.userData.flag.material.color.set(gs(nt)),_.userData.banner.userData.emblemTeam!==nt&&(_.userData.banner.userData.flag.material.map=Lr(nt),_.userData.banner.userData.flag.material.needsUpdate=!0,_.userData.banner.userData.emblemTeam=nt),_.userData.gateCrest.material.color.set(gs(nt)),_.userData.gateCrest.material.map=Lr(nt);const Wt=!!(k.storage??k.store??!1);_.userData.core.visible=!H,_.userData.extra.visible=!H&&z>=2,_.userData.ruin.visible=H,_.userData.nursery.visible=!H&&!!(k.nursery||k.hatchery||k.spawn||k.breeding),_.userData.training.visible=!H&&!!(k.training||k.trainingGround||k.drill),_.userData.watchtower.visible=!H&&!!(k.watchtower||k.tower||k.guards);const Lt=!H&&!!(k.palisade||k.walls||k.wall||k.defense);_.userData.fortification.visible=!H,_.userData.palisade.visible=Lt;const zt=Number.isFinite(O.gateHp)&&O.gateHp<=0;_.userData.gate.userData.breached=zt,_.userData.gate.userData.open=!!O.gateOpen,_.userData.fallenGate.visible=zt;for(let Ae=0;Ae<2;Ae++){const fe=_.userData.gateLeaves[Ae];fe.visible=!zt,fe.rotation.y=O.gateOpen?(Ae===0?-1:1)*Math.PI*.52:0}_.userData.core.rotation.z=H?0:(1-q)*.09,_.userData.core.userData.roof.scale.y=H?1:.78+.22*q;let ee=typeof O.storage=="number"?O.storage:O.storage?.food??O.resources??0;Number.isFinite(ee)||(ee=0),ee=Math.max(0,ee);const Te=ee>0&&!O.lootTaken;_.userData.storage.visible=Wt&&(!H||Te),_.userData.storage.rotation.z=H?-.08:0,_.userData.foodMesh.count=H&&!Te?0:Math.min(15,Math.ceil(ee/8)),_.userData.storageCover.position.set(H?-.65:0,H?.1:.5,H?.52:.1),_.userData.storageCover.rotation.set(H?.28:0,0,H?-.32:.17),_.userData.looseLoot.visible=H&&Te&&!Wt,_.userData.looseLoot.count=Math.min(8,Math.ceil(ee/5)),_.userData.banner.position.y=H?.035:0,_.userData.banner.rotation.set(H?.08:0,H?.35:0,H?1.49:q<.25?.22:0),_.userData.lamp.visible=!H,H&&(_.userData.light.visible=!1),hc(_),_.userData.collisionRevision=(_.userData.collisionRevision||0)+1}function hc(_){const L=_.userData.visualState||{},F=zh({...L,mesh:_}),{stage:O,unfinished:z,wallHeight:k}=F,q=!!L.destroyed,H=_.userData.fortWalls,nt=k/To;if(H.visible=!q&&O>=1,H.count=O===1?H.userData.firstCoursesCount:H.userData.fullCount,H.scale.y=nt||1,H.position.y=.11*(1-(nt||1))/Qt,H.updateMatrix(),_.userData.fortification.visible=!q&&O>=1,_.userData.fortTowers.visible=!q&&O>=2,_.userData.fortTowerRoofs.visible=!q&&O>=3,_.userData.core.visible=!q&&O>=3,_.userData.gate.visible=!q&&!z,_.userData.gateCrest.visible=!q&&!z,_.userData.banner.visible=!z,z)for(const dt of["extra","nursery","training","watchtower","storage","palisade","lamp","light","looseLoot"])_.userData[dt].visible=!1;_.userData.constructionStage=O,_.userData.constructionWallHeight=k}function Bu(_,L,F){if(_?.type!=="shelter")return!1;const O=F?.mesh||[...T].find(H=>H.userData.id===(_.siteId||_.campId));if(!O?.userData?.fortWalls)return!1;const z=Ii(Number(L)||0,0,1);F&&(F.constructionProgress=z);const k=O.userData.visualState||{};return k.constructionProgress=z,k.underConstruction=F?.underConstruction??k.underConstruction??!0,O.userData.visualState=k,zh({...k,mesh:O}).stage!==O.userData.constructionStage&&(hc(O),O.userData.collisionRevision=(O.userData.collisionRevision||0)+1),!0}function uc(_){if(!_)return;if(X?.userData.camp===_&&ir(),l.remove(_),T.delete(_),_.userData.refuge){_.userData.refuge.active=!1;const F=g.indexOf(_.userData.refuge);F>=0&&g.splice(F,1)}_===v&&(v=null);for(const F of[_.userData.support,_.userData.landmark])if(F){const O=C.indexOf(F);O>=0&&C.splice(O,1);for(const z of I.values()){const k=z.indexOf(F);k>=0&&z.splice(k,1)}}const L=_.userData.terrain;L&&(A.delete(L.id),w(L),lc(L)),_.traverse(F=>{F.isInstancedMesh&&F.dispose()});for(const F of _.userData.owned||[])F.dispose?.()}function Hu(_){if(c||!["shelter","store","nursery","watchtower","training"].includes(_))return null;const L=Ir({id:"construction-preview",x:0,z:0,team:"ally",tier:1,hp:350,maxHp:350,buildings:{},storage:{food:80}},{preview:!0});if(L.name="Construction preview: "+_,L.userData.previewType=_,L.userData.previewMaterials=[],_!=="shelter"){const O=L.userData.buildingGroups[_];for(const z of L.children)z.visible=z===O;O.visible=!0,O.position.x=O.position.z=0,O.rotation.y=0}const F=new Map;return L.traverse(O=>{if(O.isLight){O.visible=!1;return}if(!O.isMesh)return;O.castShadow=!1,O.receiveShadow=!1,O.renderOrder=8;const z=k=>{if(F.has(k))return F.get(k);const q=k.clone();return q.transparent=!0,q.opacity=.46,q.depthWrite=!1,q.polygonOffset=!0,q.polygonOffsetFactor=-1,q.polygonOffsetUnits=-1,F.set(k,q),L.userData.previewMaterials.push(q),L.userData.owned.push(q),q};O.material=Array.isArray(O.material)?O.material.map(z):z(O.material)}),y.add(L),l.add(L),dc(L,{x:0,y:0,z:0,yaw:0,valid:!1}),L.visible=!1,L}function dc(_,{x:L,y:F,z:O,yaw:z=0,valid:k=!1}={}){if(_?.userData.previewType&&(Number.isFinite(L)&&(_.position.x=L),Number.isFinite(F)&&(_.position.y=F),Number.isFinite(O)&&(_.position.z=O),_.rotation.y=Number.isFinite(z)?z:0,_.visible=!0,_.userData.previewValid!==!!k)){_.userData.previewValid=!!k;for(const q of _.userData.previewMaterials)q.color?.set(k?"#69ed89":"#ef665b"),q.emissive?.set(k?"#266c37":"#782d27"),"emissiveIntensity"in q&&(q.emissiveIntensity=.4)}}function fc(_){!_||!y.has(_)||(y.delete(_),_.removeFromParent(),uc(_))}function ir(){if(!X)return;X.removeFromParent();const _=new Set,L=new Set;X.traverse(F=>{F.geometry&&_.add(F.geometry),F.material&&L.add(F.material)});for(const F of _)F.dispose();for(const F of L)F.dispose();X=null}function Gu(_){const L=_?.mesh||_;if(!L?.isObject3D)return ir(),null;if(X?.userData.camp===L)return X;ir(),X=new be,X.name="Construction courtyard guide",X.userData.camp=L;const F=(ss-.2)/Qt,O=.075,z=(nt,dt,Tt,Wt=!1)=>{const Lt=new Ce().setFromPoints(nt),zt=new $l({color:dt,transparent:!0,opacity:Tt,depthWrite:!1}),ee=Wt?new If(Lt,zt):new Lf(Lt,zt);return ee.renderOrder=6,X.add(ee),ee},k=[];for(let nt=0;nt<96;nt++){const dt=nt/96*De;k.push(new U(Math.cos(dt)*F,O,Math.sin(dt)*F))}z(k,"#9fe5af",.78,!0);const q=[];for(let nt=-7;nt<=7;nt++){const dt=nt*.7;if(Math.abs(dt)>=F)continue;const Tt=Math.sqrt(F*F-dt*dt);q.push(new U(dt,O,-Tt),new U(dt,O,Tt),new U(-Tt,O,dt),new U(Tt,O,dt))}z(q,"#b7ddbc",.22);const H=(nt,dt)=>{const Tt=nt.x/Qt,Wt=nt.z/Qt,Lt=nt.width/(2*Qt)+.025,zt=nt.depth/(2*Qt)+.025,ee=Math.cos(nt.yaw||0),Te=Math.sin(nt.yaw||0),Ae=O+.012,fe=(Ze,nn)=>new U(Tt+Ze*ee+nn*Te,Ae,Wt+nn*ee-Ze*Te);z([fe(-Lt,-zt),fe(Lt,-zt),fe(Lt,zt),fe(-Lt,zt)],"#ec8a72",.8,!0).name=dt+" outline";const Ke=[];for(let Ze=-Lt-zt;Ze<=Lt+zt;Ze+=.42){const nn=[];for(const dn of[-Lt,Lt]){const pn=Ze-dn;pn>=-zt&&pn<=zt&&nn.push(fe(dn,pn))}for(const dn of[-zt,zt]){const pn=Ze-dn;pn>-Lt&&pn<Lt&&nn.push(fe(pn,dn))}nn.length===2&&Ke.push(...nn)}z(Ke,"#d9806c",.35).name=dt+" hatch"};return H(L.userData.coreFootprint||{x:-1.1825*ks,z:-1.0664*ks,width:7.68*ks,depth:8.25*ks},"Main hut exclusion"),H(jx,"Sleeping hut reservation"),L.add(X),X}let Ur=0,pc=Pi;const Vu=sn(o.water),Wu=sn(o.nightWater),Xu=sn("#fff0cb"),qu=sn("#7aa5cb");function Yu(_,L,F=1,O){if(Ge=L,Ur++,F=Ii(F,0,1),Dr.value=L,c){const q=1-Math.exp(-Math.max(0,Math.min(.5,Number(_)||0))*3);ve(m+(d-m)*q);const H=at.material.uniforms.alpha,nt=h_(O?.y,m);if(H.value+=(nt-H.value)*(1-Math.exp(-Math.max(0,Math.min(.5,Number(_)||0))*8)),Math.abs(pc-m)>.008){for(let dt=0;dt<wt.length;dt++){const Tt=wt[dt];ft.position.set(Tt.x,Tt.y,Tt.z),ft.rotation.set(0,Tt.angle,0),ft.scale.set(Tt.visualRadius,1,Tt.visualRadius),ft.updateMatrix(),ge.setMatrixAt(dt,ft.matrix)}ge.flush(),pc=m}Zt.update(m,L)}if(at.material.uniforms.time.value=L*.45,at.material.uniforms.waterColor.value.copy(Wu).lerp(Vu,F),at.material.uniforms.sunColor.value.copy(qu).lerp(Xu,F),at.material.uniforms.sunDirection.value.set(.35+.25*Math.sin(L*.008),.45+F*.4,-.45).normalize(),Ur%3===0){const q=ot.attributes.position;for(let H=0;H<q.count;H++){const nt=lt[H*3],dt=lt[H*3+1];q.setZ(H,Math.sin(nt*.33+dt*.21+L*.91)*.025+Math.sin(nt*.14-dt*.38-L*.72)*.018)}q.needsUpdate=!0}si.uniforms.uTime.value=L;let z=!1;for(let q=0;q<je;q++){const H=jn[q];H.life<=0||(H.life-=_,H.vy-=9.2*_,en[q*3]+=H.vx*_,en[q*3+1]+=H.vy*_,en[q*3+2]+=H.vz*_,bi[q]=Math.max(0,H.life/H.max)*.88,(en[q*3+1]<(c?m-.03:-.03)||H.life<=0)&&(H.life=0,bi[q]=0),z=!0)}if(z&&(ri.attributes.position.needsUpdate=!0,ri.attributes.aAlpha.needsUpdate=!0),Ur%2===0){let q=0;for(let H=0;H<R.length;H++){const nt=R[H];if(O&&(nt.x-O.x)**2+(nt.z-O.z)**2>90**2)continue;const dt=(nt.rich?65:30)*Ii(nt.flies/nt.maxFlies,0,1)*(c?Math.min(1,nt.ecology?.activity??1):1);for(const Tt of Dt[H]){if(Tt.rank>=dt)continue;const Wt=L*Tt.speed+Tt.phase;ft.position.set(nt.x+Math.sin(Wt)*Tt.r+Math.sin(Wt*2.9)*.13,nt.y+Tt.height+Math.sin(Wt*1.7+Tt.phase2)*.26,nt.z+Math.cos(Wt*.83+Tt.phase2)*Tt.r),ft.scale.setScalar(.55+.3*Math.sin(Tt.phase2)**2),ft.rotation.set(Math.sin(Wt*3)*.25,-Wt,Math.sin(Wt*12)*.25),ft.updateMatrix(),Pt.setMatrixAt(q++,ft.matrix)}}Pt.count=q,J.flyMatricesUpdated=q,q&&(Pt.instanceMatrix.clearUpdateRanges(),Pt.instanceMatrix.addUpdateRange(0,q*16),Pt.instanceMatrix.needsUpdate=!0)}Ur%5===0&&O&&(wt.forEach((q,H)=>{Math.hypot(O.x-q.x,O.z-q.z)>48||(ft.position.set(q.x,q.y+Math.sin(L*.9+q.phase)*.018,q.z),ft.rotation.set(Math.sin(L*.61+q.phase)*.015,q.angle,Math.cos(L*.8+q.phase)*.015),ft.scale.set(q.visualRadius,1,q.visualRadius),ft.updateMatrix(),ge.setMatrixAt(H,ft.matrix))}),ge.flush());const k=[...T].filter(q=>!q.userData.natural&&!q.userData.destroyed&&!q.userData.visualState?.underConstruction).sort((q,H)=>O?q.position.distanceToSquared(O)-H.position.distanceToSquared(O):0).slice(0,3);for(const q of T)q.userData.natural||(q.userData.light.visible=k.includes(q),q.userData.light.intensity=.25+(1-F)*3,q.userData.lamp.material.emissiveIntensity=.3+(1-F)*1.3,q.userData.banner.userData.flag.rotation.y=Math.sin(L*1.4+q.position.x)*.06)}function $u(){ir();for(const F of[...y])fc(F);i.remove(l);const _=new Set,L=new Set;l.traverse(F=>{F.isInstancedMesh&&F.dispose(),F.geometry&&_.add(F.geometry),F.material&&(Array.isArray(F.material)?F.material.forEach(O=>L.add(O)):L.add(F.material))});for(const F of Zt?.resources||[])F.isBufferGeometry&&_.add(F),F.isMaterial&&L.add(F);for(const F of _)F.dispose();for(const F of L)F.dispose();for(const F of M)F.dispose();at.material.uniforms.mirrorSampler?.value?.dispose?.(),T.clear();for(const F of g)F.active=!1;g.length=0}for(const _ of h?.refuges||[])Ir({..._,natural:!0,team:"neutral",nestLevel:0});return l.traverse(_=>{_.updateMatrix(),_.matrixAutoUpdate=!1}),l.updateMatrixWorld(!0),{group:l,platforms:C,hotspots:R,campSites:oe,mapRegions:vt,routes:Ne,predatorAnchors:Ht,bossAnchors:Nt,renderStats:J,seed:s,regionIndex:n,palette:o,toRegionPoint:r.toWorld,radius:qx,boundary:Yx,revision:Xx,sampleHeight:er,getTerrainHeight:P,getSurface:Vi,shelterLandHeight:cc,update:Yu,splash:Iu,impact:Uu,createShelter:Ir,updateShelter:Bo,setConstructionProgress:Bu,removeShelter:uc,createBuildingPreview:Hu,setBuildingPreview:dc,removeBuildingPreview:fc,showBuildArea:Gu,hideBuildArea:ir,dispose:$u,water:at,shelterRadius:ss,shelterScale:Qt,natural:c,creekLandmarks:u,creekNest:p,creekCover:f,creekGrips:x,creekRefuges:g,creekSpawn:c?{x:0,z:0}:null,creekTerritories:c?oe.filter(_=>_.team==="enemy"):[],setCreekState:Ie,currentAt:ne,isCreekCover:jt,get waterLevel(){return c?m:Pi}}}const Jn=Math.PI*2,Ve=(i,t=0,e=1)=>Math.max(t,Math.min(e,i)),We=(i,t,e)=>i+(t-i)*e,Nn=(i,t,e)=>{const n=Ve((e-i)/(t-i));return n*n*(3-2*n)},mr=(i,t=0,e=0)=>{const n=Math.sin(i*127.1+t*311.7+e*74.7)*43758.5453;return n-Math.floor(n)},ze=(i=0,t=0,e=0)=>new U(i,t,e),Ta=new Map,Aa=new Map;let Li,Ra;const Pl=ze(0,1,0);ze();function Ca(i,t){if(typeof i=="number")return i;const e=Ve(t)*(i.length-1),n=Math.min(i.length-2,Math.floor(e)),s=e-n,r=s*s*(3-2*s);return We(i[n],i[n+1],r)}function rs(i,t){if(i.length===1)return[[i[0],1]];const e=Ve(t)*(i.length-1),n=Math.min(i.length-2,Math.floor(e)),s=e-n;return[[i[n],1-s],[i[n+1],s]]}function _e(i,t=0){return{color:i,mask:t}}class Dn{constructor(t=1){this.detail=t,this.p=[],this.uv=[],this.c=[],this.mask=[],this.si=[],this.sw=[],this.idx=[]}vertex(t,e=[0,0],n=[[0,1]],s={color:[1,1,1],mask:0}){const r=this.p.length/3;this.p.push(t.x,t.y,t.z),this.uv.push(...e),this.c.push(...s.color),this.mask.push(s.mask||0);let o=n.reduce((a,l)=>a+l[1],0)||1;for(let a=0;a<4;a++)this.si.push(n[a]?.[0]||0),this.sw.push((n[a]?.[1]||0)/o);return r}tri(t,e,n){this.idx.push(t,e,n)}quad(t,e,n,s,r=!1){r?(this.tri(t,n,e),this.tri(e,n,s)):(this.tri(t,e,n),this.tri(e,s,n))}tube(t,e,n,s={}){const{bones:r=[0],paint:o=()=>_e([.7,.7,.7],1),distort:a}=s,l=Math.max(2,Math.round((s.segments??28)*this.detail)),c=Math.max(3,Math.round((s.radial??16)*this.detail)),h=new Ar(t.map(b=>b.isVector3?b:ze(...b)),!1,"catmullrom",.5),u=this.p.length/3;for(let b=0;b<=l;b++){const v=b/l,C=h.getPoint(v),R=h.getTangent(v).normalize(),T=new U().crossVectors(Math.abs(R.y)>.94?ze(0,0,1):Pl,R).normalize(),A=new U().crossVectors(R,T).normalize();for(let y=0;y<=c;y++){const M=y/c,I=M*Jn,N=Math.cos(I)*Ca(e,v),X=Math.sin(I)*Ca(n,v),J=C.clone().addScaledVector(T,N).addScaledVector(A,X);a&&a(J,v,I,C);const B=typeof r=="function"?r(v,J):rs(r,v);this.vertex(J,[M,v],B,o(J,v,I))}}for(let b=0;b<l;b++)for(let v=0;v<c;v++){const C=u+b*(c+1)+v;this.quad(C,C+1,C+c+1,C+c+2)}const p=h.getPoint(0),f=h.getPoint(1),x=typeof r=="function"?r(0,p):rs(r,0),g=typeof r=="function"?r(1,f):rs(r,1),m=this.vertex(p,[.5,0],x,o(p,0,0)),d=this.vertex(f,[.5,1],g,o(f,1,0)),S=u+l*(c+1);for(let b=0;b<c;b++)this.tri(m,u+b+1,u+b),this.tri(d,S+b,S+b+1);return this}ellipsoid(t,e,{bone:n=0,rings:s=14,radial:r=24,paint:o=()=>_e([1,1,1]),rotationY:a=0,sculpt:l}={}){s=Math.max(3,Math.round(s*this.detail)),r=Math.max(4,Math.round(r*this.detail));const c=this.p.length/3,h=ze(...t),u=Math.cos(a),p=Math.sin(a);for(let f=0;f<=s;f++){const x=f/s,g=Math.PI*x;for(let m=0;m<=r;m++){const d=m/r,S=Jn*d;let b=Math.sin(g)*Math.cos(S)*e[0],v=Math.cos(g)*e[1],C=Math.sin(g)*Math.sin(S)*e[2];const R=ze(b,v,C);l&&l(R,d,x);const T=ze(R.x*u+R.z*p,R.y,-R.x*p+R.z*u).add(h);this.vertex(T,[d,x],[[n,1]],o(R,d,x))}}for(let f=0;f<s;f++)for(let x=0;x<r;x++){const g=c+f*(r+1)+x;this.quad(g,g+1,g+r+1,g+r+2)}return this}leaf(t,e,{bone:n=0,bones:s,segments:r=14,across:o=6,color:a=[.35,.45,.22],ridge:l=.025,mask:c=0,vein:h=!0}={}){r=Math.max(2,Math.round(r*this.detail)),o=Math.max(2,Math.round(o*this.detail));const u=new Ar(t.map(f=>f.isVector3?f:ze(...f)),!1,"catmullrom",.5),p=this.p.length/3;for(let f=0;f<=r;f++){const x=f/r,g=u.getPoint(x),m=u.getTangent(x).normalize(),d=new U().crossVectors(Math.abs(m.y)>.95?ze(0,0,1):Pl,m).normalize();for(let S=0;S<=o;S++){const b=S/o*2-1,v=g.clone().addScaledVector(d,b*Ca(e,x));v.y+=l*(1-Math.abs(b))*Math.sin(x*Math.PI);const C=(h?.88+.12*Math.cos(x*45+Math.abs(b)*9):1)+.12*(1-Math.abs(b));this.vertex(v,[(b+1)/2,x],s?rs(s,x):[[n,1]],_e(a.map(R=>R*C),c))}}for(let f=0;f<r;f++)for(let x=0;x<o;x++){const g=p+f*(o+1)+x;this.quad(g,g+1,g+o+1,g+o+2,!0)}return this}geometry(){const t=new Ce;return t.setAttribute("position",new qt(this.p,3)),t.setAttribute("uv",new qt(this.uv,2)),t.setAttribute("color",new qt(this.c,3)),t.setAttribute("skinTintMask",new qt(this.mask,1)),t.setAttribute("skinIndex",new Wl(this.si,4)),t.setAttribute("skinWeight",new qt(this.sw,4)),t.setIndex(this.idx),t.computeVertexNormals(),t.computeBoundingSphere(),t}}function Uo(){const i=[],t={};return{defs:i,ids:t,bone(e,n,s=null){const r=i.length;return t[e]=r,i.push({name:e,p:n,parent:typeof s=="string"?t[s]:s}),r}}}function Us(i,t=0,e=0){const n=1-Nn(.26,.47,i.y),s=Math.sin(i.x*31+Math.sin(i.z*13))*Math.sin(i.z*25+i.y*23),r=Nn(.42,.77,s)*.5,o=.75-r+.06*Math.sin(i.x*75+i.z*64),a=(1-Nn(.026,.065,Math.abs(i.x)))*Nn(.52,.67,i.y);return a>.3?_e([.78,.61,.18].map(l=>We(o,l,a)),1-a):_e([We(o,.76,n),We(o,.72,n),We(o,.49,n)],1-n*.96)}function Kn(i,t=0,e=0){const n=(1-Nn(-.55,.1,Math.sin(e)))*.65,r=.79-.36*Nn(.38,.78,Math.sin(i.x*35+i.z*17)*Math.sin(i.y*39-i.z*23));return _e([We(r,.7,n),We(r,.66,n),We(r,.43,n)],1-n*.92)}function Oh(i=1){const t=Uo(),e=new Dn(i),n=new Dn(i),s=new Dn(i),r=new Dn(i),o=new Dn(i),a=new Dn(i),l=t.bone("pelvis",[0,.36,-.35]),c=t.bone("spine",[0,.43,-.07],l),h=t.bone("head",[0,.47,.29],c),u=t.bone("jaw",[0,.39,.37],h),p=t.bone("throat",[0,.29,.36],u),f=t.bone("eyeL",[-.292,.685,.53],h),x=t.bone("eyeR",[.292,.685,.53],h),g=t.bone("mouth",[0,.405,.755],u);e.tube([[0,.35,-.72],[0,.42,-.48],[0,.43,-.08],[0,.47,.3],[0,.46,.58],[0,.43,.75]],[.012,.32,.435,.43,.34,.018],[.012,.245,.27,.235,.145,.025],{segments:42,radial:36,bones:d=>rs([l,l,c,h,h],d),paint:Us,distort(d,S,b){const v=Math.max(0,Math.sin(b));d.y+=v*.008*Math.sin(d.x*70+d.z*50);const C=Math.exp(-Math.pow((Math.abs(d.x)-.22)/.035,2));d.y+=C*v*.023*Math.sin(S*Math.PI)}});for(const d of[-1,1]){const S=d<0?f:x,b=[d*.292,.685,.53];e.ellipsoid([d*.292,.605,.405],[.15,.145,.165],{bone:h,rings:14,radial:24,paint:N=>Us(N.clone().add(ze(d*.292,.605,.405)))}),n.ellipsoid(b,[.106,.103,.113],{bone:S,radial:40,rings:22,rotationY:d*.32,paint(N,X,J){const B=N.z/.113,W=Math.pow(N.x/.084,2)+Math.pow(N.y/.029,2);if(B<.12)return _e([.065,.14,.018]);if(B<.34)return _e([.04,.065,.012]);if(B>.52&&W<1)return _e([.008,.012,.006]);const Q=.12*Math.sin(Math.atan2(N.y,N.x)*51+Math.hypot(N.x,N.y)*120);return _e([.74+Q,.52+Q*.6,.08+Q*.12])}});const v=t.bone(`hip${d}`,[d*.33,.32,-.33],l),C=t.bone(`knee${d}`,[d*.64,.24,.025],v),R=t.bone(`ankle${d}`,[d*.46,.09,-.61],C),T=t.bone(`foot${d}`,[d*.64,.045,-.49],R);e.ellipsoid([d*.64,.24,.025],[.143,.128,.148],{bone:C,rings:12,radial:18,paint:(N,X,J)=>Kn(N.clone().add(ze(d*.64,.24,.025)),X,Math.PI*(.5-J)),sculpt(N){N.x*=1+.06*Math.sin(N.z*30)}}),e.ellipsoid([d*.46,.09,-.61],[.069,.052,.071],{bone:R,rings:8,radial:12,paint:(N,X,J)=>Kn(N.clone().add(ze(d*.46,.09,-.61)),X,Math.PI*(.5-J))}),e.tube([[d*.3,.33,-.35],[d*.5,.3,-.21],[d*.64,.24,.025]],[.13,.223,.14],[.13,.173,.12],{segments:20,radial:22,bones:[v,v,C],paint:Kn}),e.tube([[d*.64,.24,.025],[d*.57,.15,-.27],[d*.46,.09,-.61]],[.12,.105,.065],[.11,.09,.05],{segments:20,radial:18,bones:[C,C,R],paint:Kn}),e.tube([[d*.46,.09,-.61],[d*.57,.06,-.55],[d*.72,.035,-.35]],[.06,.07,.047],[.047,.04,.025],{segments:12,radial:14,bones:[R,T,T],paint:Kn});const A=[];for(let N=0;N<4;N++){const X=d*(.7+(N-1.5)*.075),J=-.34+.36*(1-Math.abs(N-1.5)*.16),B=[d*(.67+(N-1.5)*.028),.036,-.37],W=[We(B[0],X,.53),.037,-.18];e.tube([B,W,[X,.035,J]],[.032,.024,.007],[.02,.014,.006],{segments:10,radial:8,bones:[T],paint:Kn}),A.push([X,.034,J*.66-.12])}for(let N=0;N<3;N++){const X=ze(d*.68,.035,-.36),J=ze(...A[N]),B=ze(...A[N+1]),W=J.clone().lerp(B,.5).lerp(X,.2),Q=e.vertex(X,[0,0],[[T,1]],Us(X)),Y=e.vertex(J,[1,0],[[T,1]],Us(J)),ct=e.vertex(W,[.5,1],[[T,1]],Us(W)),j=e.vertex(B,[0,1],[[T,1]],Us(B));e.tri(Q,Y,ct),e.tri(Q,ct,j),e.tri(ct,Y,j)}const y=t.bone(`shoulder${d}`,[d*.3,.43,.31],c),M=t.bone(`elbow${d}`,[d*.48,.235,.4],y),I=t.bone(`wrist${d}`,[d*.46,.058,.62],M);e.ellipsoid([d*.48,.235,.4],[.064,.066,.064],{bone:M,rings:8,radial:12,paint:(N,X,J)=>Kn(N.clone().add(ze(d*.48,.235,.4)),X,Math.PI*(.5-J))}),e.tube([[d*.3,.43,.31],[d*.43,.33,.335],[d*.48,.235,.4]],[.092,.085,.061],[.09,.077,.059],{segments:14,radial:16,bones:[y,y,M],paint:Kn}),e.tube([[d*.48,.235,.4],[d*.48,.14,.48],[d*.46,.058,.62]],[.062,.07,.039],[.058,.057,.03],{segments:12,radial:14,bones:[M,M,I],paint:Kn});for(let N=0;N<4;N++){const X=d*(.44+(N-1.5)*.075),J=.81+.04*(1.5-Math.abs(N-1.5));e.tube([[d*.46,.055,.61],[We(d*.46,X,.6),.031,.74],[X,.025,J]],[.025,.017,.009],[.021,.014,.006],{segments:9,radial:8,bones:[I],paint:Kn}),e.ellipsoid([X,.025,J],[.017,.01,.021],{bone:I,rings:6,radial:10,paint:()=>_e([.71,.65,.4],.4)})}for(let N=0;N<3;N++){const X=.32+N*.016;e.tube(Array.from({length:17},(J,B)=>[d*.415+Math.cos(B/16*Jn)*.085,X+Math.sin(B/16*Jn)*.072,.355+Math.sin(B/16*Jn)*.02]),.009,.009,{segments:20,radial:6,bones:[y],paint:()=>_e([.38,.55,.12],.25)})}s.leaf([[d*.12,.695,-.08],[d*.31,.69,-.19],[d*.48,.52,-.38]],[.012,.14,.03],{bone:c,color:[.26,.4,.12],ridge:.025,segments:15}),s.leaf([[d*.04,.715,.05],[d*.2,.73,-.03],[d*.36,.59,-.2]],[.008,.13,.015],{bone:c,color:[.34,.48,.18],ridge:.035,segments:15}),r.leaf([[d*.17,.76,.4],[d*.21,.89,.32],[d*.24,.91,.18]],[.025,.055,.002],{bone:h,color:[.69,.53,.19],ridge:.015,segments:12});for(const[N,X,J,B,W]of[[d*.16,.745,-.005,.18,.21],[d*.29,.67,-.25,.17,.19]])o.ellipsoid([N,X,J],[B,.055,W],{bone:c,rings:8,radial:18,paint:(Q,Y)=>_e([.84+.08*Math.cos(Y*Jn*9),.79,.59]),sculpt(Q){const Y=1+.035*Math.cos(Math.atan2(Q.x,Q.z)*9);Q.x*=Y,Q.z*=Y}});for(let N=0;N<3;N++){const X=.19+N*.028,J=.455-N*.017;a.tube(Array.from({length:13},(B,W)=>[d*.478+Math.cos(W/12*Jn)*.081,X+Math.sin(W/12*Jn)*.027,J+Math.sin(W/12*Jn)*.079]),.016,.014,{segments:14,radial:6,bones:[M],paint:()=>_e([.72,.47,.16])})}}const m=Array.from({length:13},(d,S)=>{const b=(S/12-.5)*.74;return[b,.414-.025*Math.abs(b)/.37,.748-.2*Math.pow(b/.37,2)]});return e.tube(m,.009,.009,{segments:34,radial:8,bones:[h],paint:()=>_e([.045,.065,.016])}),e.tube(m.map(d=>[d[0],d[1]-.019,d[2]+.001]),.009,.014,{segments:34,radial:8,bones:[u],paint:()=>_e([.65,.61,.35])}),e.ellipsoid([0,.284,.385],[.25,.125,.265],{bone:p,rings:18,radial:28,paint:()=>_e([.75,.72,.48]),sculpt(d){d.y+=.01*Math.sin(d.x*80)*Math.cos(d.z*60)}}),{type:"frog",rig:t,skin:e.geometry(),eyes:n.geometry(),armor:s.geometry(),shell:o.geometry(),bracers:a.geometry(),crest:r.geometry(),mouth:g,length:1.7,height:.8,scale:1}}function zs(i,t,e,n,s,r,o=.05){const a=ze(...t).lerp(ze(...e),.5);a.y+=o,i.leaf([t,a.toArray(),e],[.012,n,n*.7,.002],{bone:s,segments:13,across:6,ridge:.012,color:r,vein:!0})}function E_(){const i=Uo(),t=new Dn,e=new Dn,n=i.bone("pelvis",[0,2.45,-.16]),s=i.bone("spine",[0,2.79,.02],n),r=i.bone("neck0",[0,2.97,.24],s),o=i.bone("neck1",[0,3.35,.03],r),a=i.bone("neck2",[0,3.82,.18],o),l=i.bone("head",[0,4.19,.6],a),c=i.bone("jaw",[0,4.12,.7],l),h=i.bone("mouth",[0,4.11,1.48],c),u=i.bone("eyeL",[-.125,4.25,.69],l),p=i.bone("eyeR",[.125,4.25,.69],l),f=x=>{const g=Nn(2.7,3.02,x.y)*.35;return _e([.54-g,.59-g,.61-g])};t.tube([[0,2.43,-.95],[0,2.58,-.53],[0,2.78,-.05],[0,2.99,.27]],[.02,.34,.41,.14],[.02,.39,.48,.18],{segments:30,radial:28,bones:[n,n,s,s],paint:f}),t.tube([[0,2.97,.24],[0,3.22,.16],[0,3.46,.015],[0,3.83,.18],[0,4.12,.52],[0,4.21,.65]],[.16,.15,.12,.1,.1,.13],[.17,.17,.14,.12,.13,.14],{segments:40,radial:20,bones:[r,r,o,a,l,l],paint(x,g,m){const d=Math.cos(m)>.7?.65:.9;return _e([d,d*.99,d*.91])}}),t.tube([[0,4.18,.36],[0,4.28,.57],[0,4.25,.76],[0,4.18,.91]],[.018,.15,.14,.045],[.02,.16,.14,.07],{segments:22,radial:20,bones:[l],paint(x){return x.y>4.32?_e([.07,.1,.12]):_e([.83,.86,.82])}}),t.tube([[0,4.19,.81],[0,4.18,1.04],[0,4.15,1.32],[0,4.12,1.6]],[.072,.055,.027,.001],[.06,.044,.022,.001],{segments:20,radial:10,bones:[l],paint(x,g){return _e([We(.74,.34,g),We(.47,.24,g),.075])}}),t.tube([[0,4.112,.81],[0,4.105,1.06],[0,4.103,1.36],[0,4.115,1.59]],[.063,.046,.022,.001],[.026,.02,.012,.001],{segments:18,radial:8,bones:[c],paint:()=>_e([.68,.38,.07])});for(const x of[-1,1]){const g=x<0?u:p;e.ellipsoid([x*.132,4.255,.69],[.029,.039,.043],{bone:g,rings:10,radial:18,paint:A=>Math.abs(A.x)>.022&&Math.abs(A.y)<.018&&Math.abs(A.z)<.021?_e([.005,.008,.006]):_e([.9,.7,.13])});const m=i.bone(`hip${x}`,[x*.14,2.47,-.12],n),d=i.bone(`knee${x}`,[x*.18,1.5,-.12],m),S=i.bone(`ankle${x}`,[x*.22,.16,.04],d),b=i.bone(`foot${x}`,[x*.22,.075,.15],S),v=(A,y)=>{const M=.8+.2*Math.sin(A.y*110);return _e([.38*M,.36*M,.21*M])};t.tube([[x*.14,2.47,-.12],[x*.18,1.73,-.15],[x*.18,1.5,-.12]],[.077,.04,.049],[.074,.037,.049],{segments:20,radial:12,bones:[m,m,d],paint:v}),t.tube([[x*.18,1.5,-.12],[x*.2,.7,-.02],[x*.22,.16,.04]],[.042,.024,.031],[.042,.023,.03],{segments:22,radial:10,bones:[d,d,S],paint:v});for(let A=0;A<4;A++){const y=A<3?(A-1)*.23:-.08,M=A<3?.54-.06*Math.abs(A-1):-.21;t.tube([[x*.22,.16,.04],[x*.22+y*.5,.065,(M+.04)*.55],[x*.22+y,.035,M]],[.025,.017,.006],[.023,.013,.005],{segments:12,radial:8,bones:[b],paint:v})}const C=i.bone(`wing${x}`,[x*.31,2.91,-.03],s),R=i.bone(`wingElbow${x}`,[x*.94,2.83,-.12],C),T=i.bone(`wingWrist${x}`,[x*1.5,2.68,-.24],R);t.leaf([[x*.31,2.91,-.03],[x*.95,2.84,-.18],[x*1.58,2.69,-.35]],[.08,.29,.1],{bones:[C,R,T],segments:22,across:10,ridge:.05,color:[.36,.43,.47]});for(let A=0;A<15;A++){const y=.42+A*.088,M=A<6?C:A<11?R:T;zs(t,[x*y,2.89-A*.014,-.05-A*.012],[x*(y+.22+A*.009),2.73-A*.023,-.76-A*.018],.105-A*.002,M,[.26+A*.004,.32+A*.004,.36+A*.004]),A<12&&zs(t,[x*y,2.94-A*.014,.035],[x*(y+.1),2.86-A*.017,-.44],.077,M,[.49,.55,.57])}for(let A=0;A<11;A++)zs(t,[x*(.11+.015*A),2.86-.042*A,-.21],[x*(.29+.009*A),2.7-.044*A,-.75-.022*A],.075,s,[.51+A*.013,.56+A*.012,.56+A*.012]);zs(t,[x*.065,4.34,.51],[x*.13,4.28,-.02],.018,l,[.04,.07,.09],.025)}for(let x=0;x<9;x++)zs(t,[(x-4)*.045,2.53,-.65],[(x-4)*.075,2.34,-1.34-.1*(1-Math.abs(x-4)/4)],.07,n,[.21,.28,.31]);for(let x=0;x<9;x++)zs(t,[(x-4)*.025,3.06,.35],[(x-4)*.044,2.48-.06*(x%3),.42],.032,s,[.79,.8,.72],.01);return{type:"heron",rig:i,skin:t.geometry(),eyes:e.geometry(),mouth:h,length:3,height:4.55,scale:1}}function T_(){const i=Uo(),t=new Dn,e=new Dn,n=new Dn,s=i.bone("head",[0,.27,1.97]),r=[s];for(let u=1;u<=20;u++)r.push(i.bone(`coil${u}`,[0,.23,1.97-u*.22],r[u-1]));const o=i.bone("jaw",[0,.205,2.1],s),a=i.bone("mouth",[0,.19,2.48],o),l=i.bone("eyeL",[-.183,.346,2.21],s),c=i.bone("eyeR",[.183,.346,2.21],s),h=(u,p,f)=>{const x=1-Nn(.13,.22,u.y),g=.73-.26*Nn(.2,.65,Math.sin(u.z*7+u.x*18));return _e([We(g,.65,x),We(g,.6,x),We(g,.36,x)],1-x)};t.tube([[0,.25,2.05],[0,.23,1.4],[0,.23,.5],[0,.22,-.4],[0,.18,-1.5],[0,.09,-2.46]],[.13,.186,.205,.18,.115,.002],[.11,.16,.17,.15,.09,.003],{segments:100,radial:20,bones:u=>rs(r,u),paint:h,distort(u,p,f){u.y+=.003*Math.sin(p*390)*Math.sin(f*12)}}),t.tube([[0,.265,1.86],[0,.29,2.07],[0,.285,2.27],[0,.245,2.48]],[.115,.237,.202,.035],[.1,.12,.105,.038],{segments:24,radial:24,bones:[s],paint:h}),t.tube([[0,.192,1.99],[0,.179,2.25],[0,.207,2.47]],[.14,.19,.025],[.027,.035,.006],{segments:18,radial:16,bones:[o],paint:()=>_e([.66,.63,.42])});for(const u of[-1,1])e.ellipsoid([u*.183,.346,2.21],[.045,.043,.05],{bone:u<0?l:c,rings:12,radial:20,rotationY:u*.9,paint(p){return Math.abs(p.x)<.012&&p.z>.015?_e([.009,.008,.005]):_e([.69,.51,.12])}}),t.tube([[u*.2,.228,2.06],[u*.197,.218,2.29],[u*.045,.225,2.475]],.004,.004,{segments:20,radial:6,bones:[s],paint:()=>_e([.05,.06,.025])}),n.tube([[0,.194,2.47],[0,.19,2.73],[u*.06,.18,2.84]],[.014,.01,.001],[.007,.005,.001],{segments:16,radial:6,bones:[o],paint:()=>_e([.28,.025,.035])});return{type:"snake",rig:i,skin:t.geometry(),eyes:e.geometry(),tongue:n.geometry(),mouth:a,length:5,height:.43,scale:1}}function A_(){const i=Uo(),t=new Dn,e=new Dn,n=i.bone("spine",[0,.6,.18]),s=i.bone("head",[0,.61,.78],n),r=i.bone("tail0",[0,.55,-.44],n),o=i.bone("tail1",[0,.49,-.99],r),a=i.bone("tail",[0,.48,-1.43],o),l=i.bone("jaw",[0,.42,1.03],s),c=i.bone("mouth",[0,.43,1.55],l),h=i.bone("eyeL",[-.22,.72,1.06],s),u=i.bone("eyeR",[.22,.72,1.06],s),p=m=>{const d=1-Nn(.35,.62,m.y),S=.74-.25*Nn(.1,.6,Math.sin(m.z*18+m.y*29)*Math.sin(m.y*35));return _e([We(S,.81,d),We(S,.78,d),We(S,.61,d)],1-d)};t.tube([[0,.48,-1.46],[0,.51,-.92],[0,.61,-.28],[0,.64,.34],[0,.62,.84],[0,.55,1.24],[0,.52,1.56]],[.018,.15,.31,.35,.29,.19,.027],[.035,.22,.46,.48,.32,.19,.05],{segments:54,radial:28,bones:m=>rs([a,o,r,n,s,s,s],m),paint:p}),t.tube([[0,.43,.92],[0,.36,1.25],[0,.445,1.56]],[.14,.16,.025],[.055,.065,.018],{segments:18,radial:18,bones:[l],paint:()=>_e([.72,.69,.49])});const f=[.33,.4,.23],x=t.p.length/3;for(let m=0;m<=18;m++){const d=m/18,S=Math.cos(d*Math.PI)*.62,b=-1.45-(.3+.3*Math.abs(Math.cos(d*Math.PI)));for(let v=0;v<=6;v++){const C=v/6,R=ze(.025*Math.sin(d*Math.PI),.48+S*C,We(-1.43,b,C)),T=m%2?.85:1.15;t.vertex(R,[C,d],[[a,1]],_e(f.map(A=>A*T),.3))}}for(let m=0;m<18;m++)for(let d=0;d<6;d++){const S=x+m*7+d;t.quad(S,S+1,S+7,S+8)}const g=(m,d,S,b,v=1)=>{const C=ze(...m).lerp(ze(...d),.5);C.x+=v*S,t.leaf([m,C.toArray(),d],[.01,S*.8,.003],{bone:b,segments:16,across:8,ridge:.014,color:f,mask:.3})};for(const m of[-1,1]){e.ellipsoid([m*.22,.72,1.06],[.052,.07,.08],{bone:m<0?h:u,rings:12,radial:22,rotationY:m*1,paint(S){return S.z>.035&&Math.pow(S.x/.035,2)+Math.pow(S.y/.04,2)<1?_e([.005,.007,.004]):_e([.75,.59,.18])}});const d=i.bone(`fin${m}`,[m*.255,.42,.65],n);g([m*.255,.42,.65],[m*.63,.21,.11],.16,d,m),g([m*.2,.26,-.11],[m*.38,.13,-.57],.12,r,m),t.tube([[m*.24,.86,.71],[m*.31,.64,.67],[m*.24,.39,.69]],.009,.011,{segments:20,radial:6,bones:[s],paint:()=>_e([.19,.24,.12],.3)});for(let S=0;S<8;S++){const b=1.18+S*.04,v=m*(.12-S*.009);t.tube([[v,.445,b],[v*.9,.475,b+.005]],[.008,.001],[.008,.001],{segments:3,radial:5,bones:[l],paint:()=>_e([.78,.76,.56])})}}for(const m of[!0,!1]){const d=t.p.length/3,S=22;for(let b=0;b<=S;b++){const v=b/S,C=We(-.9,.18,v),R=m?.8+.22*v:.26-.1*v,T=Math.sin(Math.PI*v)*(m?.45:-.24),A=v<.5?r:n;for(let y=0;y<=6;y++){const M=y/6,I=ze(.012*Math.sin(v*6),R+T*M,C-.1*M);t.vertex(I,[M,v],[[A,1]],_e(f.map(N=>N*(b%2?.85:1.1)),.2))}}for(let b=0;b<S;b++)for(let v=0;v<6;v++){const C=d+b*7+v;t.quad(C,C+1,C+7,C+8)}}return{type:"fish",rig:i,skin:t.geometry(),eyes:e.geometry(),mouth:c,length:3.65,height:1.65,scale:1}}function R_(i){if(Aa.has(i))return Aa.get(i);const t=256,e=new Uint8Array(t*t*4);for(let s=0;s<t;s++)for(let r=0;r<t;r++){const o=r/t,a=s/t;let l=.82+mr(r,s)*.18;if(i==="frog"){const p=Math.floor(o*28),f=Math.floor(a*28),x=o*28-p-.5,g=a*28-f-.5,m=Math.hypot(x,g),d=Math.exp(-m*m*38)*(.1+mr(p,f)*.18);l=.79+.16*mr(r,s)+d-.11*Math.exp(-Math.pow(m-.31,2)*300)}else if(i==="snake"||i==="fish"){const u=i==="snake"?28:35,p=a*u,f=Math.floor(p),x=o*20+f%2*.5,g=x-Math.floor(x)-.5,m=p-f-.5,d=Math.abs(g)*1.4+Math.abs(m);l=.74+.22*(1-Nn(.49,.72,d))+.04*mr(r,s)}else l=.79+.15*Math.sin(o*170+.4*Math.sin(a*31))**2+.06*mr(r,s);const c=(s*t+r)*4,h=Math.floor(Ve(l)*255);e[c]=e[c+1]=e[c+2]=h,e[c+3]=255}const n=new Xl(e,t,t,Ln);return n.wrapS=n.wrapT=Ys,n.magFilter=Xn,n.minFilter=Ni,n.generateMipmaps=!0,n.needsUpdate=!0,n.repeat.set(i==="heron"?1:2,i==="frog"?3:2),Aa.set(i,n),n}function C_(i,t){const e=R_(i),n=new _u({color:16777215,vertexColors:!0,map:e,bumpMap:e,bumpScale:i==="frog"?.013:i==="heron"?.007:.009,roughness:i==="frog"?.32:i==="heron"?.68:.37,metalness:0,clearcoat:i==="heron"?0:.42,clearcoatRoughness:.25,envMapIntensity:.8,side:$e}),s=new se(t);return n.userData.tint=s,n.onBeforeCompile=r=>{r.uniforms.skinTint={value:s},r.vertexShader=`attribute float skinTintMask; varying float vSkinTint;
`+r.vertexShader,r.vertexShader=r.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
 vSkinTint = skinTintMask;`),r.fragmentShader=`uniform vec3 skinTint; varying float vSkinTint;
`+r.fragmentShader,r.fragmentShader=r.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
 diffuseColor.rgb *= mix(vec3(1.0),skinTint,vSkinTint);`)},n.customProgramCacheKey=()=>"anatomical-skin-v3",n}function P_(i,t){const e=new is({color:i,side:Sn,transparent:!0,opacity:.91,depthWrite:!1,toneMapped:!1});return e.userData.thickness={value:t},e.onBeforeCompile=n=>{n.uniforms.outlineThickness=e.userData.thickness,n.vertexShader=`uniform float outlineThickness;
`+n.vertexShader,n.vertexShader=n.vertexShader.replace("#include <begin_vertex>","vec3 transformed = position + normal * outlineThickness;")},e.customProgramCacheKey=()=>"skeletal-silhouette-v3",e}function D_(i){const t=i.map(e=>{const n=new du;return n.name=e.name,n});for(let e=0;e<i.length;e++){const n=i[e];t[e].position.fromArray(n.p),n.parent!==null&&n.parent!==void 0&&(t[e].position.sub(ze(...i[n.parent].p)),t[n.parent].add(t[e]))}return{bones:t,skeleton:new ql(t),root:t[0]}}function L_(){if(!Li){const n=[],s=[];for(let o=0;o<=48;o++){const a=o/48*Jn,l=Math.sin(a),c=Math.cos(a),h=Math.abs(o%8-4)/4,u=-.018*c,p=u+.1+.205*h,f=1+.08*h;n.push(l*.255,u,c*.175,l*.27*f,p,c*.188*f,l*.231,u,c*.151,l*(.27*f-.024),p,c*(.188*f-.024))}for(let o=0;o<48;o++){const a=o*4,l=a+4;s.push(a,l,a+1,l,l+1,a+1),s.push(a+2,a+3,l+2,l+2,a+3,l+3),s.push(a+1,l+1,a+3,l+1,l+3,a+3),s.push(a,a+2,l,l,a+2,l+2)}Li=new Ce,Li.setAttribute("position",new qt(n,3)),Li.setIndex(s),Li.computeVertexNormals(),Li.computeBoundingSphere(),Li.computeBoundingBox(),Ra=new Jl(.047,0),Ra.scale(.78,1.05,.5)}const i=new be;i.name="royal-crown",i.position.set(0,.22,-.11);const t=new ae(Li,new Be({color:15910746,roughness:.29,metalness:.58,emissive:5911813,emissiveIntensity:.12}));t.name="royal-crown-gold",t.castShadow=!0,t.receiveShadow=!0,i.add(t);const e=new ae(Ra,new Be({color:14562379,roughness:.18,metalness:.2,flatShading:!0,emissive:4785420,emissiveIntensity:.12}));return e.name="royal-crown-ruby",e.position.set(0,.042,.195),i.add(e),i}function kh(i,t=0){const e=i==="frog"&&t?`${i}:${t}`:i;if(!Ta.has(e)){const n=i==="frog"?Oh([1,.36,.18][t]):({heron:E_,snake:T_,fish:A_}[i]||Oh)();for(const s of["skin","eyes","armor","shell","bracers","crest","tongue"])n[s]?.boundingSphere&&(n[s].boundingSphere.radius*=1.9);Ta.set(e,n)}return Ta.get(e)}function Pa(i,t,e,n,s,r,o){const a=Math.hypot(n.y,n.z),l=Math.hypot(s.y,s.z),c=n.y+s.y+r,h=n.z+s.z+o,u=Math.max(Math.abs(a-l)+1e-5,Math.min(a+l-1e-5,Math.hypot(c,h))),p=Math.atan2(h,c),f=-Math.sign(n.y*s.z-n.z*s.y)||1,x=Math.acos(Ve((a*a+u*u-l*l)/(2*a*u),-1,1)),g=p+f*x,m=g-Math.atan2(n.z,n.y);i.rotation.x=Math.atan2(Math.sin(m),Math.cos(m));const d=Math.cos(g)*a,S=Math.sin(g)*a,b=Math.atan2(h-S,c-d)-i.rotation.x-Math.atan2(s.z,s.y);t.rotation.x=Math.atan2(Math.sin(b),Math.cos(b)),e.rotation.x=-i.rotation.x-t.rotation.x}function I_(i,t){if(!i)return{type:"",phase:0,force:0};let e="kick",n=t;return typeof i=="string"?e=i:typeof i=="number"?n=i:(e=i.type||i.kind||"kick",n=i.phase??i.progress??t),n=Ve(n),{type:e,phase:n,force:Math.sin(n*Math.PI)}}function Da(i,t,e){const n=i.points;if(t<=n[0].s)return e.copy(n[0]),e;for(let s=1;s<n.length;s++)if(t<=n[s].s){const r=n[s-1],o=n[s],a=(t-r.s)/(o.s-r.s||1);return e.set(We(r.x,o.x,a),We(r.y,o.y,a),We(r.z,o.z,a))}return e.copy(n.at(-1)),e}function U_(i="frog",t={}){["frog","heron","snake","fish"].includes(i)||(i="frog");const e=kh(i),n=new be,s=new be;n.name=`creature-${i}`,s.name="anatomical-animation-pivot",n.add(s);const r=i==="frog"?7378989:i==="snake"?6715206:i==="fish"?8624996:16777215,o=C_(i,t.color??r);o.emissive.set(16777215),o.emissiveIntensity=0;const a=new _u({color:16777215,vertexColors:!0,roughness:.13,clearcoat:1,clearcoatRoughness:.05,metalness:.05}),{bones:l,skeleton:c,root:h}=D_(e.rig.defs),u=new Qr(e.skin,o);u.name=`${i}-weighted-surface`,u.add(h),s.add(u),u.castShadow=!0,u.receiveShadow=!0,u.frustumCulled=!0,n.updateMatrixWorld(!0),u.bind(c);const p=new Qr(e.eyes,a);p.name="articulated-eyes",p.bind(c,u.bindMatrix),p.castShadow=!1,p.frustumCulled=!0,s.add(p);const f=new Qr(e.skin,P_(t.outlineColor??(t.team==="enemy"?16741200:t.team==="player"?11075554:i==="frog"?8513956:16755275),i==="frog"?.018:.027));f.name="animated-color-silhouette",f.bind(c,u.bindMatrix),f.frustumCulled=!0,f.renderOrder=-1,s.add(f);const x=[];for(const ht of["armor","shell","bracers","crest","tongue"])if(e[ht]){const V=new Be({color:16777215,vertexColors:!0,roughness:ht==="tongue"?.35:.79,side:$e}),st=new Qr(e[ht],V);st.name=ht,st.bind(c,u.bindMatrix),st.frustumCulled=!0,st.castShadow=ht!=="tongue",st.visible=ht==="tongue",s.add(st),x.push(st)}const g={};for(const ht of l)g[ht.name]=ht;const m=l.map(ht=>ht.position.clone()),d=new Ye;d.name="mouth-attachment",l[e.mouth].add(d);let S=(t.seed||0)*.731,b=0,v="",C=1,R=0,T=0,A=0,y=!0,M=!1,I=null,N=1,X=!1,J=0,B={x:0,z:1,strength:0,life:0,duration:.26,heavy:!1},W={armor:null,weapon:null,crest:!1};const Q=t.role||"scout",Y=i==="frog"?["guardian","brute","tank"].includes(Q)?[1.15,1.12,1.05]:["scout","hunter","agile"].includes(Q)?[.96,.98,1.04]:[1.03,1.02,1.02]:[1,1,1];s.scale.set(...Y);const ct=()=>{const ht=1+(C-1)*.04+Math.min(24,Math.max(0,N-1))*.004;s.scale.set(Y[0]*ht,Y[1]*ht,Y[2]*ht)},j=()=>{for(const ht of x)ht.name==="armor"&&(ht.visible=i==="frog"&&W.armor==="reed"),ht.name==="shell"&&(ht.visible=i==="frog"&&W.armor==="shell"),ht.name==="bracers"&&(ht.visible=i==="frog"&&W.weapon==="reed"),ht.name==="crest"&&(ht.visible=i==="frog"&&W.crest&&!M)},Mt=()=>{for(let ht=0;ht<l.length;ht++)l[ht].rotation.set(0,0,0),l[ht].scale.set(1,1,1),l[ht].position.copy(m[ht])};let Yt=null;function we(ht){if(i!=="snake"||!ht?.points?.length||!ht.weight)return;Yt||(Yt={targets:Array.from({length:21},()=>new le),local:new le,inverse:new le,point:ze(),before:ze(),after:ze(),translation:ze(),rotation:new as,scale:ze(1,1,1),localPosition:ze(),localRotation:new as,localScale:ze()});const V=Yt,st=Ve(ht.weight),vt=ht.scale||1,Ht=ht.origin,Nt=Math.cos(ht.yaw||0),ue=Math.sin(ht.yaw||0);s.position.y*=1-st,s.rotation.x*=1-st,s.rotation.z*=1-st;for(let D=0;D<=20;D++){const Jt=D?g["coil"+D]:g.head,Xt=1.97-D*.22,Vt=(D?Xt:2.17)*vt;Da(ht,Vt,V.point),Da(ht,Vt-.07*vt,V.before),Da(ht,Vt+.07*vt,V.after);const It=V.after.x-V.before.x,te=V.after.z-V.before.z,pt=Math.hypot(It,te),yt=pt>1e-4?Math.atan2(It,te):ht.yaw||0;D||(V.point.x-=Math.sin(yt)*.2*vt,V.point.z-=Math.cos(yt)*.2*vt);const re=(V.point.x-Ht.x)/vt,Re=(V.point.z-Ht.z)/vt,P=Math.max(V.point.y,V.before.y,V.after.y);V.translation.set(Nt*re-ue*Re,(P-Ht.y)/vt+(D?.26:.3),ue*re+Nt*Re),V.rotation.setFromAxisAngle(Pl,yt-(ht.yaw||0)),V.targets[D].compose(V.translation,V.rotation,V.scale),V.local.copy(V.targets[D]),D&&V.local.premultiply(V.inverse.copy(V.targets[D-1]).invert()),V.local.decompose(V.localPosition,V.localRotation,V.localScale),Jt.position.lerp(V.localPosition,st),Jt.quaternion.slerp(V.localRotation,st),Jt.scale.lerp(V.localScale,st)}g.jaw.rotation.x*=1-st*.8;const ye=x.find(D=>D.name==="tongue");ye&&st>.8&&(ye.visible=!1)}const oe={group:n,bones:g,skeleton:c,mesh:u,get crowned(){return M},get equipment(){return{...W}},get level(){return N},get working(){return X},stats:{type:i,vertices:e.skin.attributes.position.count+e.eyes.attributes.position.count,triangles:(e.skin.index.count+e.eyes.index.count)/3,boneCount:l.length,length:e.length,height:e.height,rigged:!0,renderLOD:0},setOutline(ht,V=!0){ht!=null&&f.material.color.set(ht),y=V,f.visible=V&&A===0},setRenderLOD(ht=0){const V=i==="frog"?Ve(Math.round(Number(ht)||0),0,2):0;if(V===A)return;A=V;const st=kh(i,V);for(const vt of[u,p,f,...x])vt.geometry=st[vt===u||vt===f?"skin":vt===p?"eyes":vt.name],vt.boundingSphere=null,vt.boundingBox=null,vt.castShadow=V===0&&vt!==p&&vt!==f&&vt.name!=="tongue";f.visible=y&&V===0,I&&(I.getObjectByName("royal-crown-gold").castShadow=V===0),oe.stats.vertices=st.skin.attributes.position.count+st.eyes.attributes.position.count,oe.stats.triangles=(st.skin.index.count+st.eyes.index.count)/3,oe.stats.renderLOD=V},setTier(ht){C=Ve(Math.round(ht||1),1,5),ct()},setLevel(ht){N=Ve(Math.floor(Number(ht)||1),1,999),ct()},setEquipment(ht={}){return W=i==="frog"?{armor:["reed","shell"].includes(ht?.armor)?ht.armor:null,weapon:ht?.weapon==="reed"?"reed":null,crest:ht?.crest===!0}:{armor:null,weapon:null,crest:!1},j(),{...W}},setWorking(ht=!1){X=i==="frog"&&!!ht},setImpact(ht={}){const V=Ve(Number(ht.strength)||0,0,1.5),st=Number(ht.x)||0,vt=Number(ht.z)||0,Ht=Math.hypot(st,vt)||1,Nt=Ve(Number(ht.duration)||.26,.08,.5);B={x:st/Ht,z:vt/Ht,strength:V,life:V?Nt:0,duration:Nt,heavy:!!ht.heavy},o.emissiveIntensity=V?Math.min(.82,.34+V*.35):0},setCrowned(ht=!1){return M=i==="frog"&&!!ht,M&&!I&&(I=L_(),g.head.add(I)),I&&(I.visible=M,I.getObjectByName("royal-crown-gold").castShadow=A===0),j(),M},mouthWorld(ht=new U){return n.updateWorldMatrix(!0,!0),d.getWorldPosition(ht)},update(ht,V={}){ht=Ve(Number(ht)||0,0,.1),S=V.time!==void 0?V.time+(t.seed||0)*.731:S+ht,Mt();const st=Math.max(0,Number(V.speed)||0),vt=Ve(st/(i==="frog"?2.8:3));T=We(T,vt,1-Math.exp(-ht*12));const Ht=V.swimming?1:0,Nt=typeof V.jump=="number"?Ve(V.jump):V.jump?.5:0,ue=typeof V.attack=="string"?V.attack:V.attack?.type||V.attack?.kind||(V.attack?"kick":"");ue!==v?(b=0,v=ue):V.attack&&(b+=ht/.55);const ye=I_(V.attack,b),D=ye.force,Jt=typeof V.roar=="number"?Ve(V.roar):V.roar?1:0,Xt=typeof V.hit=="number"?Ve(V.hit):V.hit?1:0;B.life=Math.max(0,B.life-ht),o.emissiveIntensity=B.life>0?Math.max(0,1-(B.duration-B.life)/.07)*Math.min(.82,.34+B.strength*.35):0,V.building!==void 0&&(X=i==="frog"&&!!V.building),J=We(J,X&&!V.dead&&!ye.type&&st<1?1:0,1-Math.exp(-ht*12)),R=We(R,V.dead?1:0,1-Math.exp(-ht*5)),s.position.set(0,0,0),s.rotation.set(0,0,0);const Vt=(S+(t.seed||0)*.4)%5.7,It=Vt>5.5?.08+.92*Math.abs((Vt-5.6)*10):1;if(g.eyeL&&(g.eyeL.scale.y=Ve(It,.08,1)),g.eyeR&&(g.eyeR.scale.y=Ve(It,.08,1)),i==="frog"){const te=V.hop||(Nt>0?{phase:"air",progress:1-Nt}:{phase:"idle",progress:0}),pt=Ve(te.progress||0),yt=te.phase==="air",re=te.phase==="gather"?pt:0,Re=te.phase==="land"?Math.sin(pt*Math.PI):0,P=yt?Math.sin(Ve(pt/.14)*Math.PI/2)*(1-Ve((pt-.16)/.48)):0,w=yt?Ve((pt-.82)/.18):0,K=yt?1-Ve(pt/.14):0,ot=yt?Ve((pt-.25)/.45)*(1-w):0,at=yt?Ve((pt-.6)/.35):0,rt=S*7.8,Ut=Math.sin(rt)*T;s.position.y=Ht?-.14+.023*Math.sin(S*3):-.085*(re+K)-.075*Re,s.rotation.x=Ht?-.12:(re+K)*.07-(yt?Math.sin(pt*Math.PI)*.12:0)+at*.08*(1-w),g.spine.rotation.x=Math.sin(S*2.6)*.009,g.spine.scale.y=1+Math.sin(S*2.6)*.018,g.head.rotation.x=.02*Math.sin(S*1.7)-Jt*.18-(yt?.04:0),g.jaw.rotation.x=-Jt*.13-(ye.type==="tongue"?D*.16:0),g.throat.scale.set(1+Jt*.26,1+Jt*1.45+Math.sin(S*2.5)*.035,1+Jt*.25);for(const lt of[-1,1])if(Ht)g[`hip${lt}`].rotation.x=-.32*Ut,g[`hip${lt}`].rotation.z=lt*.07*Ut,g[`knee${lt}`].rotation.x=.62*Ut,g[`ankle${lt}`].rotation.x=-.25*Ut,g[`foot${lt}`].rotation.x=.2*Ut,g[`shoulder${lt}`].rotation.x=-.23*Ut,g[`elbow${lt}`].rotation.x=.28*Ut,g[`wrist${lt}`].rotation.x=-.12*Ut,g[`shoulder${lt}`].rotation.z=lt*(.22+.25*Ut),g[`elbow${lt}`].rotation.y=lt*.3;else if(!V.dead){const bt=e.rig.ids,Rt=yt?.085*K+(-.1*P+.045*ot)*(1-K):-s.position.y,mt=yt?.035*K+(-.42*P+.11*ot)*(1-K):.035*re,At=yt?.085*K+(.085*(1-at)-.035*at)*(1-w)*(1-K):-s.position.y,$t=yt?(-.075*(1-at)+.13*at)*(1-w)*(1-K):0;Pa(g[`hip${lt}`],g[`knee${lt}`],g[`ankle${lt}`],m[bt[`knee${lt}`]],m[bt[`ankle${lt}`]],Rt,mt),Pa(g[`shoulder${lt}`],g[`elbow${lt}`],g[`wrist${lt}`],m[bt[`elbow${lt}`]],m[bt[`wrist${lt}`]],At,$t),g[`foot${lt}`].rotation.x=-P*.14}if(ye.type==="kick"||ye.type==="strike"){s.rotation.y=-D*.55,s.rotation.z=D*.22,s.position.y+=D*.16;const lt=e.rig.ids;Pa(g.hip1,g.knee1,g.ankle1,m[lt.knee1],m[lt.ankle1],.26*D,1.16*D),g.hip1.rotation.y=-D*.3,g.hip1.rotation.z=-D*.08,g["shoulder-1"].rotation.z=D*.55}else if(ye.type==="slam"||ye.type==="belly"){const lt=Math.sin(ye.phase*Math.PI);s.rotation.x=-lt*.28,s.position.y+=lt*.22;for(const bt of[-1,1])g[`hip${bt}`].rotation.x-=lt*.7,g[`shoulder${bt}`].rotation.z=bt*lt*.45}else ye.type==="tongue"&&(g.head.rotation.x-=D*.1,g.spine.rotation.x-=D*.07);if(J>.001){const lt=S*8.2,bt=.5+.5*Math.sin(lt),Rt=.5+.5*Math.sin(lt+Math.PI);g.spine.rotation.x+=.1*J,g.head.rotation.x+=(.12+.06*bt)*J,g.shoulder1.rotation.x-=(.25+bt*.85)*J,g.elbow1.rotation.x+=(.2+bt*.55)*J,g.wrist1.rotation.x-=bt*.3*J,g["shoulder-1"].rotation.x-=(.13+Rt*.35)*J,g["elbow-1"].rotation.x+=(.15+Rt*.2)*J,s.position.y+=.025*Math.cos(lt)*J}if(B.life>0){const lt=1-B.life/B.duration,bt=Math.sin(Math.min(1,lt/.22)*Math.PI/2)*Math.pow(1-lt,1.8)*B.strength,Rt=bt*(B.heavy?1.2:1);s.rotation.x+=B.z*.17*Rt,s.rotation.z-=B.x*.21*Rt,s.position.x+=B.x*.045*Rt,s.position.z+=B.z*.055*Rt,g.spine.scale.z*=1-.075*bt,g.head.rotation.x-=.15*Rt,g.head.rotation.z-=B.x*.08*Rt,g.jaw.rotation.x-=.12*Rt,g["shoulder-1"].rotation.z-=.1*Rt,g.shoulder1.rotation.z+=.1*Rt,g.eyeL.scale.y*=1-.55*bt,g.eyeR.scale.y*=1-.55*bt}else Xt>0&&(s.rotation.x+=Xt*.065);s.position.y-=R*.22,s.rotation.z+=R*1.35,g.spine.scale.y*=1-R*.15}else if(i==="heron"){const te=S*5.6,pt=T;s.position.y=.035*Math.sin(te*2)*pt,g.spine.rotation.x=-.03*Math.sin(te)*pt,g.neck0.rotation.x=.1*Math.sin(S*1.4)-D*.62,g.neck1.rotation.x=-.08*Math.sin(S*1.4)+D*.58,g.neck2.rotation.x=-.03+D*.7,g.head.rotation.x=-.06*Math.sin(S*1.8)+D*.48,g.jaw.rotation.x=-D*.5;for(const yt of[-1,1]){const re=te+(yt<0?Math.PI:0),Re=Math.sin(re);g[`hip${yt}`].rotation.x=Re*.31*pt,g[`knee${yt}`].rotation.x=Math.max(0,-Re)*.57*pt,g[`foot${yt}`].rotation.x=-.18*Re*pt,g[`wing${yt}`].rotation.y=yt*(1.24-D*1.07-Xt*.55),g[`wing${yt}`].rotation.z=yt*(.07+D*(.5+.25*Math.sin(S*18))+Xt*.5),g[`wingElbow${yt}`].rotation.y=yt*.12,g[`wingWrist${yt}`].rotation.z=yt*D*.18}s.rotation.z+=(B.life>0?0:Xt*.08*Math.sin(S*32))+R*1.45,s.position.y-=R*1.8}else if(i==="snake"){const te=S*(3+T*5),pt=.055+T*.105;for(let re=1;re<=20;re++)g[`coil${re}`].rotation.y=Math.sin(te-re*.48)*pt,g[`coil${re}`].rotation.x=re<6?-D*.18*(1-re/7):.006*Math.sin(S*3-re);g.head.rotation.x=D*.45,g.head.rotation.y=Math.sin(te)*.035,g.jaw.rotation.x=-D*.62,s.position.y=D*.28;const yt=x.find(re=>re.name==="tongue");yt&&(yt.visible=!V.dead&&(Math.sin(S*3.7)>.77||D>.2)),s.rotation.z=R*.65+(B.life>0?0:Xt*.1*Math.sin(S*32))}else if(i==="fish"){const te=S*(4+T*10),pt=.09+T*.22;g.spine.rotation.y=Math.sin(te)*pt*.2,g.head.rotation.y=-Math.sin(te)*pt*.13,g.tail0.rotation.y=Math.sin(te-.5)*pt,g.tail1.rotation.y=Math.sin(te-1.1)*pt*1.25,g.tail.rotation.y=Math.sin(te-1.6)*pt*1.2,g.jaw.rotation.x=-D*.62-.035*Math.sin(S*2.5);for(const yt of[-1,1])g[`fin${yt}`].rotation.z=yt*(.13+.16*Math.sin(S*6)),g[`fin${yt}`].rotation.y=yt*.15*Math.sin(S*5);s.rotation.x=-D*.35,s.position.y=.035*Math.sin(S*2),s.rotation.z=R*Math.PI+(B.life>0?0:Xt*.14*Math.sin(S*35))}if(i!=="frog"&&B.life>0){const te=1-B.life/B.duration,pt=Math.sin(Math.min(1,te/.22)*Math.PI/2)*Math.pow(1-te,1.8)*B.strength*(B.heavy?1.2:1);s.rotation.x+=B.z*.055*pt,s.rotation.z-=B.x*.08*pt,g.head.rotation.x-=.075*pt,g.head.rotation.z-=B.x*.05*pt}i==="snake"&&we(V.snakePose)},dispose(){o.dispose(),a.dispose(),f.material.dispose();for(const ht of x)ht.material.dispose();I&&I.traverse(ht=>{ht.isMesh&&ht.material.dispose()}),c.dispose(),n.removeFromParent()}};return oe.setTier(t.tier||1),oe.setLevel(t.level||1),oe.setEquipment(t.equipment),oe.setCrowned(t.crowned),oe.update(0,{}),n.userData.creature=oe,oe}const La="4.0.0",Bh="frog-arcade-save-v1",Ia="frog-arcade-settings-v1",tn=Object.freeze({radius:25,capacity:40,dizzyHits:6,dizzySeconds:4.5,tongueRange:8,kickRange:3.6,shotInterval:.14,projectileSpeed:32}),zo=Object.freeze([{x:-8,z:2,r:1.5},{x:8,z:-3,r:1.7},{x:-2,z:-12,r:1.4},{x:13,z:12,r:1.6}]),fi=(i,t,e)=>Math.max(t,Math.min(e,i)),En=(i,t)=>Math.hypot(i.x-t.x,i.z-t.z),Hi=(i,t)=>{const e=Math.hypot(i,t);return e>1e-6?{x:i/e,z:t/e}:{x:0,z:1}},bn=(i,t=0)=>Number.isFinite(i)?i:t;function Vs(i){let t=i.seed+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Ua(i,t,e){return{id:i,x:t,z:e,aimX:0,aimZ:-1,face:Math.PI,ammo:0,load:0,dizzy:0,dizzyTime:0,ko:!1,hit:0,invuln:0,shot:0,tongue:0,kick:0,kickPending:!1,impulseX:0,impulseZ:0,hop:0,hopX:0,hopZ:0,height:0,idle:0,brain:0,decision:0}}function vo(i,t,e){let n=i.x+t,s=i.z+e;for(const o of zo){const a=Math.hypot(n-o.x,s-o.z),l=o.r+.78;if(a<l){const c=Hi(n-o.x,s-o.z);n=o.x+c.x*l,s=o.z+c.z*l}}const r=Math.hypot(n,s);r>tn.radius-1&&(n*=(tn.radius-1)/r,s*=(tn.radius-1)/r),i.x=n,i.z=s}function Cu(i,t){for(let e=0;e<50;e++){const n=Vs(i)*Math.PI*2,s=Math.sqrt(Vs(i))*22;if(t.x=Math.sin(n)*s,t.z=Math.cos(n)*s,zo.every(r=>En(t,r)>r.r+1.3))break}t.wait=0,t.phase=Vs(i)*6.28}function Dl(i=731){const t={version:1,seed:i,time:0,status:"playing",actors:[Ua("player",0,8),Ua("rival-1",-12,-6),Ua("rival-2",12,-8)],flies:[],bullets:[],events:[],nextId:1,stats:{caught:0,shots:0,hits:0,kos:0}};t.actors[1].ammo=12,t.actors[2].ammo=12;for(let e=0;e<72;e++){const n={id:e,x:0,z:0,wait:0,phase:0};Cu(t,n),t.flies.push(n)}for(let e=0;e<10;e++)t.flies[e].x=(e%5-2)*.85,t.flies[e].z=4.8-Math.floor(e/5)*1.2;return t}function z_(i,t){const e=Math.hypot(i,t);return{x:e>.08?i/Math.max(1,e):0,z:e>.08?t/Math.max(1,e):0,fire:e>=.72}}function Ll(i,t){return i.actors.filter(e=>e!==t&&!e.ko&&e.dizzyTime>0&&En(t,e)<=tn.kickRange).sort((e,n)=>En(t,e)-En(t,n))[0]||null}function N_(i,t){if(t.ko||t.dizzyTime>0||t.tongue>0||t.ammo>=tn.capacity)return!1;t.tongue=.22;const n=i.flies.filter(s=>s.wait<=0&&En(t,s)<=tn.tongueRange).sort((s,r)=>{const o=a=>En(t,a)-2*((a.x-t.x)*t.aimX+(a.z-t.z)*t.aimZ)/Math.max(.1,En(t,a));return o(s)-o(r)})[0];return n?(t.ammo++,n.wait=7+Vs(i)*4,i.events.push({type:"tongue",id:t.id,x:n.x,z:n.z}),t.id==="player"&&i.stats.caught++,!0):(i.events.push({type:"tongue",id:t.id,x:t.x+t.aimX*4,z:t.z+t.aimZ*4,empty:!0}),!1)}function F_(i,t){if(t.ko||t.dizzyTime>0||t.shot>0||t.ammo<=0)return!1;t.shot=tn.shotInterval,t.ammo--;const e=Hi(t.aimX,t.aimZ);return i.bullets.push({id:i.nextId++,owner:t.id,x:t.x+e.x*1.2,z:t.z+e.z*1.2,dx:e.x,dz:e.z,life:1.6}),i.events.push({type:"shot",id:t.id}),t.id==="player"&&i.stats.shots++,!0}function O_(i,t,e){return t.ko||t.invuln>0?!1:(t.hit=.23,t.invuln=.15,t.impulseX=e.dx*5,t.impulseZ=e.dz*5,t.dizzyTime<=0&&(t.dizzy++,t.dizzy>=tn.dizzyHits&&(t.dizzy=tn.dizzyHits,t.dizzyTime=tn.dizzySeconds,t.hop=0,t.height=0,i.events.push({type:"dizzy",id:t.id}))),i.events.push({type:"hit",id:t.id,x:t.x,z:t.z,dx:e.dx,dz:e.dz}),e.owner==="player"&&i.stats.hits++,!0)}function k_(i,t){if(t.ko||t.dizzyTime>0||t.kick>0)return!1;const e=Ll(i,t);if(!e)return!1;const n=Hi(e.x-t.x,e.z-t.z);return t.aimX=n.x,t.aimZ=n.z,t.kick=.48,t.kickPending=!0,t.kickId=e.id,i.events.push({type:"kick",id:t.id}),!0}function B_(i,t){t.kickPending=!1;const e=i.actors.find(s=>s.id===t.kickId);if(!e||e.ko||e.dizzyTime<=0||En(t,e)>tn.kickRange+.25)return;const n=Hi(e.x-t.x,e.z-t.z);e.ko=!0,e.dizzyTime=0,e.height=.9,e.impulseX=n.x*17,e.impulseZ=n.z*17,i.events.push({type:"ko",id:e.id,by:t.id,x:e.x,z:e.z,dx:n.x,dz:n.z}),t.id==="player"&&i.stats.kos++}function H_(i,t){const e=i.actors.filter(a=>a!==t&&!a.ko);if(!e.length)return{};const n=e.reduce((a,l)=>En(t,a)<En(t,l)?a:l),s=En(t,n),r=Hi(n.x-t.x,n.z-t.z);if(t.brain-=1/60,t.brain<=0&&(t.brain=.7+Vs(i)*.5,t.decision=Vs(i)>.5?1:-1),t.ammo<5&&n.dizzyTime<=0){const a=i.flies.filter(l=>l.wait<=0).sort((l,c)=>En(t,l)-En(t,c))[0];if(a){const l=Hi(a.x-t.x,a.z-t.z);return{mx:l.x,mz:l.z,ax:l.x,az:l.z,collect:En(t,a)<8}}}const o=n.dizzyTime>0||s>11?1:s<6?-1:0;return{mx:r.x*o+r.z*t.decision*.45,mz:r.z*o-r.x*t.decision*.45,ax:r.x,az:r.z,fire:s<16&&n.dizzyTime<=0&&t.shot<=0,collect:t.ammo<24&&s>7,kick:n.dizzyTime>0&&s<3.3}}function Hh(i,t,e,n,s,r){const o=e-i,a=n-t,l=i-s.x,c=t-s.z,h=o*o+a*a,u=l*l+c*c-r*r;if(u<=0)return 0;if(h<1e-12)return null;const p=2*(l*o+c*a),f=p*p-4*h*u;if(f<0)return null;const x=(-p-Math.sqrt(f))/(2*h);return x>=0&&x<=1?x:null}function Gh(i,t={},e=1/60){if(i.status==="playing"){i.events.length=0,e=fi(bn(e),0,.05),i.time+=e;for(const n of i.flies)n.wait>0&&(n.wait-=e,n.wait<=0&&Cu(i,n));for(const n of i.actors){for(const r of["shot","tongue","invuln","hit","idle"])n[r]=Math.max(0,n[r]-e);if(n.ko){vo(n,n.impulseX*e,n.impulseZ*e),n.impulseX*=Math.exp(-e*3),n.impulseZ*=Math.exp(-e*3),n.height=Math.max(0,n.height-e*1.6);continue}n.kick>0&&(n.kick-=e,n.kickPending&&n.kick<.3&&B_(i,n)),n.dizzyTime>0&&(n.dizzyTime=Math.max(0,n.dizzyTime-e),n.dizzyTime===0&&(n.dizzy=0,n.invuln=.55,i.events.push({type:"recover",id:n.id})));const s=n.id==="player"?t:H_(i,n);if(Number.isFinite(s.ax)&&Number.isFinite(s.az)&&Math.hypot(s.ax,s.az)>.05){const r=Hi(s.ax,s.az);n.aimX=r.x,n.aimZ=r.z}if(n.dizzyTime<=0){s.collect&&N_(i,n),s.fire&&F_(i,n),s.kick&&k_(i,n);const r=bn(s.mx),o=bn(s.mz),a=Math.hypot(r,o);if(n.hop<=0&&n.idle<=0&&n.kick<=0&&a>.1){const l=Hi(r,o);n.hop=.43,n.hopX=l.x*(n.id==="player"?8.8:6.2),n.hopZ=l.z*(n.id==="player"?8.8:6.2),n.face=Math.atan2(l.x,l.z)}n.hop>0&&(n.hop=Math.max(0,n.hop-e),vo(n,n.hopX*e,n.hopZ*e),n.height=Math.sin((1-n.hop/.43)*Math.PI)*1.15,n.hop===0&&(n.height=0,n.idle=.085,i.events.push({type:"land",id:n.id,x:n.x,z:n.z})))}vo(n,n.impulseX*e,n.impulseZ*e),n.impulseX*=Math.exp(-e*10),n.impulseZ*=Math.exp(-e*10),n.load+=(n.ammo/tn.capacity-n.load)*(1-Math.exp(-e*12))}for(const n of i.bullets){if(n.life-=e,n.life<=0)continue;const s=n.x+n.dx*tn.projectileSpeed*e,r=n.z+n.dz*tn.projectileSpeed*e;let o=2,a=null;for(const l of zo){const c=Hh(n.x,n.z,s,r,l,l.r+.1);c!==null&&c<o&&(o=c,a={type:"wall",o:l})}for(const l of i.actors){if(l.id===n.owner||l.ko)continue;const c=Hh(n.x,n.z,s,r,l,1+l.load*.2);c!==null&&c<o&&(o=c,a={type:"actor",a:l})}a?(n.x+=(s-n.x)*o,n.z+=(r-n.z)*o,n.life=0,a.type==="actor"&&O_(i,a.a,n),i.events.push({type:"splat",x:n.x,z:n.z,wall:a.type==="wall",dx:n.dx,dz:n.dz})):(n.x=s,n.z=r,Math.hypot(s,r)>tn.radius-.2&&(n.life=0,i.events.push({type:"splat",x:s,z:r,wall:!1,dx:n.dx,dz:n.dz})))}i.bullets=i.bullets.filter(n=>n.life>0),i.actors[0].ko?i.status="lost":i.actors.slice(1).every(n=>n.ko)&&(i.status="won")}}function G_(i){return JSON.stringify({...i,events:[],bullets:[]})}function V_(i){try{const t=JSON.parse(i);if(t?.version!==1||!Array.isArray(t.actors)||t.actors.length!==3||!Array.isArray(t.flies)||t.flies.length!==72||!["playing","won","lost"].includes(t.status))return null;const e=Dl(bn(t.seed,731));e.time=fi(bn(t.time),0,1e7),e.status=t.status,e.nextId=Math.max(1,Math.floor(bn(t.nextId,1)));for(let n=0;n<3;n++){const s=t.actors[n];if(s.id!==e.actors[n].id||!Number.isFinite(s.x)||!Number.isFinite(s.z))return null;for(const r of Object.keys(e.actors[n]))typeof e.actors[n][r]=="number"&&(e.actors[n][r]=bn(s[r],e.actors[n][r]));Object.assign(e.actors[n],{ko:!!s.ko,ammo:fi(Math.floor(bn(s.ammo)),0,40),load:fi(bn(s.load),0,1),dizzy:fi(bn(s.dizzy),0,6),dizzyTime:fi(bn(s.dizzyTime),0,4.5),kickPending:!1,kick:0}),vo(e.actors[n],0,0)}for(let n=0;n<72;n++){const s=t.flies[n];Number.isFinite(s?.x)&&Number.isFinite(s?.z)&&Object.assign(e.flies[n],{x:fi(s.x,-24,24),z:fi(s.z,-24,24),wait:fi(bn(s.wait),0,12),phase:bn(s.phase)})}for(const n of Object.keys(e.stats))e.stats[n]=Math.max(0,Math.floor(bn(t.stats?.[n])));return e}catch{return null}}const Mn=U,Vh=new Mn(0,1,0),za=(i,t,e)=>Math.max(t,Math.min(e,i)),Wh=i=>{try{return localStorage.getItem(i)}catch{return null}},Na=(i,t)=>{try{return localStorage.setItem(i,t),!0}catch{return!1}},Pr=i=>`<svg viewBox="0 0 64 64" fill="none" aria-hidden="true">${i}</svg>`,W_=Pr('<ellipse cx="21" cy="22" rx="13" ry="8" fill="#e5fdff" transform="rotate(-30 21 22)"/><ellipse cx="43" cy="22" rx="13" ry="8" fill="#e5fdff" transform="rotate(30 43 22)"/><ellipse cx="32" cy="36" rx="12" ry="17" fill="#efc650" stroke="#14282c" stroke-width="4"/><path d="M21 33h22M21 42h22" stroke="#14282c" stroke-width="6"/><circle cx="27" cy="23" r="5" fill="white"/><circle cx="37" cy="23" r="5" fill="white"/><circle cx="28" cy="23" r="2" fill="#14282c"/><circle cx="36" cy="23" r="2" fill="#14282c"/>'),X_=Pr('<path d="M10 22c0 30 35 33 42 7 4-14-20-15-21-3-1 8 13 8 13 0" stroke="#ff8d9a" stroke-width="10" stroke-linecap="round"/>'),q_=Pr('<path d="m15 8 11 5-4 21 29 6 4 10-36 4-9-11z" fill="#d3ff80" stroke="#314b2d" stroke-width="3"/><path d="m46 13 4 8m9-5-6 9m9 4-9 1" stroke="#ffce71" stroke-width="4"/>'),Xh=Pr('<path d="M18 10v44l36-22z" fill="#f3ffd0" stroke="#264e26" stroke-width="4" stroke-linejoin="round"/>'),Y_=Pr('<path d="M12 18h40M12 32h40M12 46h40" stroke="#e9f3e5" stroke-width="5" stroke-linecap="round"/><circle cx="24" cy="18" r="6" fill="#fbc562"/><circle cx="42" cy="32" r="6" fill="#fbc562"/><circle cx="24" cy="46" r="6" fill="#fbc562"/>');class $_{constructor(){this.volume=.5,this.ctx=null,this.gain=null}resume(){try{this.ctx||(this.ctx=new(window.AudioContext||window.webkitAudioContext),this.gain=this.ctx.createGain(),this.gain.connect(this.ctx.destination)),this.gain.gain.value=this.volume,this.ctx.resume()}catch{}}pause(){this.ctx&&(this.gain.gain.value=0,this.ctx.suspend().catch(()=>{}))}play(t){if(!this.ctx||this.ctx.state!=="running"||this.volume<=0)return;const e=this.ctx,n=e.currentTime,s=e.createOscillator(),r=e.createGain(),a={shot:[200,70,.065],tongue:[560,150,.11],hit:[110,45,.12],dizzy:[700,240,.28],ko:[80,330,.26],win:[400,800,.45],lost:[220,55,.4]}[t];a&&(s.type=t==="hit"?"triangle":"sine",s.frequency.setValueAtTime(a[0],n),s.frequency.exponentialRampToValueAtTime(a[1],n+a[2]),r.gain.setValueAtTime(1e-4,n),r.gain.exponentialRampToValueAtTime(.14,n+.008),r.gain.exponentialRampToValueAtTime(1e-4,n+a[2]),s.connect(r),r.connect(this.gain),s.start(n),s.stop(n+a[2]+.01),s.onended=()=>{s.disconnect(),r.disconnect()})}}class Z_{constructor(){this.touch=matchMedia("(pointer: coarse)").matches||navigator.maxTouchPoints>0,this.settings={volume:.5,quality:this.touch?"low":"high"};try{Object.assign(this.settings,JSON.parse(Wh(Ia)||"{}"))}catch{}this.settings.volume=za(Number(this.settings.volume)||0,0,1),["low","high"].includes(this.settings.quality)||(this.settings.quality="low"),this.state=Dl(),this.saved=V_(Wh(Bh)),this.running=!1,this.mode="title",this.keys=new Set,this.actions={collect:!1,fire:!1,kick:!1},this.move={x:0,z:0},this.aim={x:0,z:-1},this.mouse={x:0,y:0,valid:!1},this.pointers=new Map,this.fx=[],this.particles=[],this.splats=[],this.tongues=new Map,this.bulletMeshes=new Map,this.koTimes=new Map,this.elapsed=0,this.shake=0,this.saveClock=0,this.accumulator=0,this.failures=[],this.scene=new Ef,this.scene.background=new se("#a4dcd2"),this.scene.fog=new Co("#b4d9c7",.007),this.renderer=new Vx({antialias:!this.touch,powerPreference:"high-performance"}),this.renderer.domElement.id="arcade-world",this.renderer.domElement.setAttribute("aria-label","FROG — κωμική μάχη με μύγες"),this.renderer.outputColorSpace=wn,this.renderer.toneMapping=$h,this.renderer.toneMappingExposure=1.3,document.body.append(this.renderer.domElement),this.camera=new ec(-20,20,14,-14,.1,250),this.camera.position.set(0,30,34),this.focus=new Mn(0,0,3),this.scene.add(new tp("#def8ff","#52733a",2.6)),this.sun=new sp("#fff1bf",3.2),this.sun.position.set(-16,36,12),this.scene.add(this.sun),this.world=w_(this.scene,this.renderer,{seed:731,natural:!0}),this.labels=document.createElement("canvas"),this.labels.id="arcade-labels",document.body.append(this.labels),this.labelCtx=this.labels.getContext("2d"),this.sound=new $_,this.sound.volume=this.settings.volume,this.shared={sphere:new cs(1,10,7),wing:new cs(1,6,4),cylinder:new Po(1,1,1,8),circle:new Zl(1,18)},this.materials={insect:new Be({color:"#e4bc3a",roughness:.65}),wing:new is({color:"#edfcff",transparent:!0,opacity:.8,side:$e,depthWrite:!1}),tongue:new Be({color:"#ff839c",roughness:.4}),shot:new Be({color:"#ffd750",emissive:"#bd7d12",emissiveIntensity:.4}),ink:new is({color:"#90e44c",transparent:!0,opacity:.9,depthWrite:!1,side:$e}),rock:new Be({color:"#617b70",roughness:.9}),rim:new is({color:"#eaff9e",transparent:!0,opacity:.6,depthWrite:!1})},this.createArena(),this.models=[],this.buildActors(),this.createFlies(),this.createUI(),this.bindInputs(),this.applyQuality(),this.resize(),this.showTitle(),window.__FROG__={version:La,mode:"arcade",inspect:()=>this.inspect(),save:()=>this.persist()},new URLSearchParams(location.search).has("test")&&(window.__FROG__.test={step:(t,e=1)=>{for(let n=0;n<e;n++)Gh(this.state,t,1/60),this.consumeEvents();this.updateHUD()},state:()=>this.state,setState:t=>{this.state=t,this.buildActors(),this.updateHUD()},input:()=>this.currentInput(),kickTarget:()=>Ll(this.state,this.state.actors[0])?.id}),this.last=performance.now(),this.renderer.setAnimationLoop(t=>this.frame(t)),document.getElementById("boot")?.remove()}ground(t,e){return this.world.getSurface(t,e).height}createArena(){this.obstacleMeshes=[];for(const n of zo){const s=new ae(new jl(n.r,1),this.materials.rock);s.scale.y=1.7,s.position.set(n.x,this.ground(n.x,n.z)+n.r*.9,n.z),this.scene.add(s),this.obstacleMeshes.push(s)}const t=[];for(let n=0;n<=160;n++){const s=n/160*Math.PI*2,r=Math.sin(s)*tn.radius,o=Math.cos(s)*tn.radius;t.push(new Mn(r,this.ground(r,o)+.06,o))}const e=new Eo(new Ce().setFromPoints(t),this.materials.rim);this.scene.add(e),this.playerRing=new ae(new Ql(1.05,1.18,32),new is({color:"#ecff9a",side:$e,transparent:!0,opacity:.85,depthWrite:!1})),this.playerRing.rotation.x=-Math.PI/2,this.scene.add(this.playerRing),this.aimGuide=new Eo(new Ce().setFromPoints([new Mn,new Mn]),new Qf({color:"#fff2b0",dashSize:.45,gapSize:.35,transparent:!0,opacity:.65})),this.scene.add(this.aimGuide)}buildActors(){for(const t of this.models||[])t.dispose();this.models=this.state.actors.map((t,e)=>{const n=U_("frog",{seed:7+e*39,team:e===0?"player":`enemy${e}`,role:e===2?"bruiser":"hunter",tier:1,level:1});return n.setEquipment({}),n.setOutline(e===0?"#e7fca7":e===1?"#ffae88":"#d3a8ff",!0),this.settings.quality==="low"&&n.setRenderLOD(1),this.scene.add(n.group),n})}createFlies(){this.flyBodies=new Cn(this.shared.sphere,this.materials.insect,72),this.flyWings=new Cn(this.shared.wing,this.materials.wing,144),this.flyBodies.instanceMatrix.setUsage(Ui),this.flyWings.instanceMatrix.setUsage(Ui),this.flyBodies.frustumCulled=!1,this.flyWings.frustumCulled=!1,this.scene.add(this.flyBodies,this.flyWings),this.dummy=new Ye}createUI(){this.ui=document.createElement("div"),this.ui.id="arcade-ui",this.ui.classList.toggle("is-touch",this.touch),this.ui.innerHTML=`<header id="arcade-hud" hidden><div class="ammo-card">${W_}<div class="ammo-info"><div class="ammo-numbers"><strong id="ammo-count">0 / 40</strong><b id="ammo-percent">0%</b></div><div id="ammo-track" role="progressbar" aria-label="Γέμιση με μύγες" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><i id="ammo-fill"></i></div><span id="ammo-state">Πιάσε μύγες με τη γλώσσα</span></div></div><div class="ko-card"><b id="ko-count">0 / 2</b><span>ΝΟΚ ΑΟΥΤ</span></div><button class="small-button" id="pause-button" aria-label="Παύση">Ⅱ</button></header>
  <div id="dizzy-banner" hidden>🌀 ΖΑΛΙΣΤΗΚΕΣ! <b id="dizzy-time"></b></div><div id="callout" aria-live="polite"></div>
  <div id="desktop-help" hidden><span><b>WASD</b> Άλματα</span><span><b>E / δεξί κλικ</b> Γλώσσα</span><span><b>Αριστερό κλικ</b> Βολές</span><span id="pc-kick"><b>Q</b> Κλωτσιά σε ζαλισμένο</span></div>
  <div id="touch-controls" hidden><div class="stick-zone move-zone"><div id="move-stick" class="stick" aria-label="Κίνηση"><div class="stick-inner"></div><div class="stick-knob"></div></div><span class="stick-caption">ΑΛΜΑΤΑ</span></div><button id="tongue-button" class="touch-action tongue-button" aria-label="Μάζεψε μύγες με τη γλώσσα">${X_}<span>ΓΛΩΣΣΑ</span></button><button id="kick-button" class="touch-action kick-button" aria-label="Κλωτσιά για νοκ άουτ" disabled>${q_}<span>ΚΛΩΤΣΙΑ</span></button><div class="stick-zone aim-zone"><div id="aim-stick" class="stick" aria-label="Στόχευση μέσα, πυροβολισμός στον εξωτερικό δακτύλιο"><div class="fire-ring"></div><div class="stick-inner"></div><div class="stick-knob"></div><b class="ring-label">ΠΥΡ</b></div><span class="stick-caption">ΣΤΟΧΕΥΣΗ</span></div></div>
  <section id="arcade-menu" class="menu"><div id="menu-main" class="menu-buttons"><button id="play-button" class="art-button play-button">${Xh}<span>ΠΑΙΞΕ</span></button><button id="settings-button" class="art-button settings-button">${Y_}<span>ΡΥΘΜΙΣΕΙΣ</span></button></div><div id="settings-panel" class="settings-panel" hidden><h2>Ρυθμίσεις</h2><label>Ήχος <input id="volume" type="range" min="0" max="100" value="${Math.round(this.settings.volume*100)}"></label><label>Γραφικά <select id="quality"><option value="low">Ομαλή κίνηση</option><option value="high">Υψηλά</option></select></label><button id="settings-back" class="art-button compact">ΠΙΣΩ</button></div><div id="result-panel" class="result-panel" hidden><span class="result-kicker">FROG • FLY FRENZY</span><h1 id="result-title"></h1><p id="result-copy"></p><button id="replay-button" class="art-button play-button">${Xh}<span>ΠΑΙΞΕ ΞΑΝΑ</span></button><button id="result-settings" class="plain-button">Ρυθμίσεις</button></div><span class="version">FROG ${La}</span></section>`,document.body.append(this.ui),this.$=t=>this.ui.querySelector("#"+t),this.$("quality").value=this.settings.quality,this.$("play-button").onclick=()=>this.startOrResume(),this.$("pause-button").onclick=()=>this.pause(),this.$("settings-button").onclick=()=>this.settingsMenu(),this.$("result-settings").onclick=()=>this.settingsMenu(),this.$("settings-back").onclick=()=>{this.$("settings-panel").hidden=!0,this.mode==="result"?this.$("result-panel").hidden=!1:this.$("menu-main").hidden=!1},this.$("replay-button").onclick=()=>this.startNew(),this.$("volume").oninput=t=>{this.settings.volume=Number(t.target.value)/100,this.sound.volume=this.settings.volume,Na(Ia,JSON.stringify(this.settings))},this.$("quality").onchange=t=>{this.settings.quality=t.target.value,this.applyQuality(),Na(Ia,JSON.stringify(this.settings))}}showTitle(){this.running=!1,this.mode="title",this.$("play-button").querySelector("span").textContent=this.saved?.status==="playing"?"ΣΥΝΕΧΕΙΑ":"ΠΑΙΞΕ",this.ui.classList.add("in-menu")}settingsMenu(){this.$("menu-main").hidden=!0,this.$("result-panel").hidden=!0,this.$("settings-panel").hidden=!1}startOrResume(){if(this.mode==="pause"){this.go();return}this.saved?.status==="playing"?(this.state=this.saved,this.saved=null,this.buildActors(),this.go()):this.startNew()}startNew(){this.state=Dl(731+Math.floor(Math.random()*1e5)),this.clearEffects(),this.buildActors(),this.go(),this.message("ΠΙΑΣΕ ΜΥΓΕΣ → ΠΥΡΟΒΟΛΗΣΕ → ΚΛΩΤΣΙΑ!",3.5)}go(){this.clearInputs(),this.accumulator=0,this.last=performance.now(),this.running=!0,this.mode="play",this.$("arcade-menu").hidden=!0,this.$("settings-panel").hidden=!0,this.$("result-panel").hidden=!0,this.$("menu-main").hidden=!1,this.$("arcade-hud").hidden=!1,this.$("desktop-help").hidden=this.touch,this.$("touch-controls").hidden=!this.touch,this.ui.classList.remove("in-menu"),this.sound.resume(),this.updateHUD(),this.persist()}pause(){this.running&&(this.running=!1,this.mode="pause",this.clearInputs(),this.persist(),this.sound.pause(),this.$("arcade-menu").hidden=!1,this.$("menu-main").hidden=!1,this.$("settings-panel").hidden=!0,this.$("play-button").querySelector("span").textContent="ΣΥΝΕΧΕΙΑ",this.ui.classList.add("in-menu"))}finish(){this.running=!1,this.mode="finishing",this.resultAt=this.elapsed+.85,this.clearInputs(),this.persist()}showResult(){this.running=!1,this.mode="result",this.clearInputs(),this.persist();const t=this.state.status==="won";this.sound.play(t?"win":"lost"),this.$("arcade-menu").hidden=!1,this.$("menu-main").hidden=!0,this.$("result-panel").hidden=!1,this.$("result-title").textContent=t?"Ο ΒΑΛΤΟΣ ΕΙΝΑΙ ΔΙΚΟΣ ΣΟΥ!":"ΣΕ ΕΚΑΝΑΝ ΣΑΛΑΤΑ!",this.$("result-copy").textContent=t?`Όλοι νοκ άουτ! ${this.state.stats.caught} μύγες · ${this.state.stats.shots} βολές · ${Math.floor(this.state.time)}″`:"Πιάσε μύγες, ζάλισε τους αντιπάλους και πλησίασε για την τελική κλωτσιά.",this.ui.classList.add("in-menu")}persist(){return this.mode==="title"?!1:Na(Bh,G_(this.state))}clearInputs(){if(this.keys.clear(),this.actions={collect:!1,fire:!1,kick:!1},this.move={x:0,z:0},this.pointers.clear(),this.ui){for(const t of this.ui.querySelectorAll(".stick-knob"))t.style.transform="translate(-50%,-50%)";this.$("aim-stick").classList.remove("firing")}}bindInputs(){addEventListener("keydown",s=>{if(!s.target.matches("input,select")){if(s.code==="Escape"){s.preventDefault(),this.running?this.pause():this.mode==="pause"&&this.go();return}this.running&&["KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","KeyE","KeyQ","Space"].includes(s.code)&&(s.preventDefault(),this.keys.add(s.code))}}),addEventListener("keyup",s=>this.keys.delete(s.code));const t=this.renderer.domElement;t.addEventListener("pointermove",s=>{s.pointerType==="mouse"&&(this.mouse={x:s.clientX,y:s.clientY,valid:!0})}),t.addEventListener("pointerdown",s=>{!this.running||s.pointerType==="touch"||(s.preventDefault(),this.mouse={x:s.clientX,y:s.clientY,valid:!0},s.button===0&&(this.actions.fire=!0),s.button===2&&(this.actions.collect=!0))}),addEventListener("pointerup",s=>{s.pointerType!=="touch"&&(s.button===0&&(this.actions.fire=!1),s.button===2&&(this.actions.collect=!1))}),t.addEventListener("contextmenu",s=>s.preventDefault());const e=(s,r)=>{const o=this.$(s),a=o.querySelector(".stick-knob");let l=null;const c=u=>{const p=o.getBoundingClientRect(),f=(u.clientX-p.left-p.width/2)/(p.width/2),x=(u.clientY-p.top-p.height/2)/(p.height/2),g=z_(f,x),m=Math.hypot(f,x),d=m>1?1/m:1;a.style.transform=`translate(-50%,-50%) translate(${f*d*p.width*.31}px,${x*d*p.height*.31}px)`,r==="move"?this.move={x:g.x,z:g.z}:(m>.08&&(this.aim={x:f/Math.max(m,.001),z:x/Math.max(m,.001)}),this.actions.fire=g.fire,o.classList.toggle("firing",g.fire)),this.mouse.valid=!1};o.onpointerdown=u=>{!this.running||l!==null&&this.pointers.has(r)||(u.preventDefault(),l=u.pointerId,this.pointers.set(r,l),o.setPointerCapture(u.pointerId),c(u))},o.onpointermove=u=>{l===u.pointerId&&this.pointers.get(r)===l&&(u.preventDefault(),c(u))};const h=u=>{u.pointerId===l&&(l=null,this.pointers.delete(r),a.style.transform="translate(-50%,-50%)",r==="move"?this.move={x:0,z:0}:(this.actions.fire=!1,o.classList.remove("firing")))};o.onpointerup=h,o.onpointercancel=h,o.onlostpointercapture=h};e("move-stick","move"),e("aim-stick","aim");const n=(s,r)=>{const o=this.$(s);o.onpointerdown=l=>{!this.running||o.disabled||(l.preventDefault(),o.setPointerCapture(l.pointerId),this.actions[r]=!0)};const a=()=>this.actions[r]=!1;o.onpointerup=a,o.onpointercancel=a,o.onlostpointercapture=a};n("tongue-button","collect"),n("kick-button","kick"),addEventListener("blur",()=>{this.clearInputs(),this.running&&this.pause()}),document.addEventListener("visibilitychange",()=>{document.hidden&&(this.clearInputs(),this.pause(),this.sound.pause())}),addEventListener("beforeunload",()=>this.persist()),addEventListener("resize",()=>{this.clearInputs(),this.resize()})}applyQuality(){const t=this.settings.quality==="low";this.renderer.setPixelRatio(Math.min(devicePixelRatio||1,t?1:1.5));for(const e of this.models)e.setRenderLOD(t?1:0);this.resize()}resize(){const t=innerWidth,e=innerHeight;this.renderer.setSize(t,e);const n=t<e?19:this.touch?11.5:14;this.camera.left=-n*t/e,this.camera.right=n*t/e,this.camera.top=n,this.camera.bottom=-n,this.camera.updateProjectionMatrix(),this.labels.width=t,this.labels.height=e,this.w=t,this.h=e}currentInput(){const t=this.state.actors[0];if(this.mouse.valid){const e=new oh;e.setFromCamera(new Gt(this.mouse.x/this.w*2-1,1-this.mouse.y/this.h*2),this.camera);const n=new Mn;if(e.ray.intersectPlane(new pi(Vh,-this.ground(t.x,t.z)-.8),n)){const s=n.x-t.x,r=n.z-t.z,o=Math.hypot(s,r);o>.1&&(this.aim={x:s/o,z:r/o})}}return{mx:this.move.x+(this.keys.has("KeyD")||this.keys.has("ArrowRight")?1:0)-(this.keys.has("KeyA")||this.keys.has("ArrowLeft")?1:0),mz:this.move.z+(this.keys.has("KeyS")||this.keys.has("ArrowDown")?1:0)-(this.keys.has("KeyW")||this.keys.has("ArrowUp")?1:0),ax:this.aim.x,az:this.aim.z,collect:this.actions.collect||this.keys.has("KeyE"),fire:this.actions.fire,kick:this.actions.kick||this.keys.has("KeyQ")}}message(t,e=1.5){this.$("callout").textContent=t,this.calloutUntil=this.elapsed+e}makeFlyBullet(){const t=new be,e=new ae(this.shared.sphere,this.materials.shot);e.scale.set(.16,.13,.24),t.add(e);for(const n of[-1,1]){const s=new ae(this.shared.wing,this.materials.wing);s.position.set(n*.19,.1,0),s.scale.set(.25,.025,.12),t.add(s)}return this.scene.add(t),t}consumeEvents(){for(const t of this.state.events){const e=this.state.actors.findIndex(r=>r.id===t.id),n=this.state.actors[e],s=this.models[e];if(t.type==="tongue"&&n){const r=this.tongues.get(n.id);r&&this.scene.remove(r.mesh);const o=new ae(this.shared.cylinder,this.materials.tongue);this.scene.add(o),this.tongues.set(n.id,{mesh:o,start:this.elapsed,x:t.x,z:t.z}),n.id==="player"&&!t.empty&&this.sound.play("tongue")}if(t.type==="shot"&&n?.id==="player"&&this.sound.play("shot"),t.type==="hit"&&s){s.mesh.material.emissive?.set("#ffffff");const r=s.group.rotation.y,o=Math.cos(r),a=Math.sin(r);s.setImpact({x:o*t.dx-a*t.dz,z:a*t.dx+o*t.dz,strength:1.3,duration:.27}),this.addText("ΣΠΛΑΤΣ!",t.x,t.z,"#ffed91",.65),this.burst(t.x,t.z),this.shake=Math.max(this.shake,n.id==="player"?.2:.08),this.sound.play("hit")}t.type==="dizzy"&&(this.addText("ΖΑΛΗ!",n.x,n.z,"#ffe375",1),this.sound.play("dizzy"),n.id!=="player"&&this.message("ΖΑΛΙΣΤΗΚΕ! ΠΛΗΣΙΑΣΕ ΚΑΙ ΔΩΣΕ ΚΛΩΤΣΙΑ.",2.4)),t.type==="ko"&&(this.koTimes.set(n.id,{time:this.elapsed,dx:t.dx,dz:t.dz}),this.addText("ΝΟΚ ΑΟΥΤ!",n.x,n.z,"#ffe791",1.4),this.sound.play("ko"),this.shake=.32,this.makeSplat({...t,wall:!1})),t.type==="splat"&&this.makeSplat(t)}}addText(t,e,n,s,r){this.fx.push({text:t,x:e,z:n,color:s,life:r,start:this.elapsed}),this.fx.length>28&&this.fx.shift()}burst(t,e){for(let n=0;n<9;n++){const s=new ae(this.shared.sphere,this.materials.shot);s.scale.setScalar(.06+Math.random()*.07),s.position.set(t,this.ground(t,e)+1,e),this.scene.add(s),this.particles.push({mesh:s,start:this.elapsed,v:new Mn((Math.random()-.5)*6,2+Math.random()*4,(Math.random()-.5)*6)})}for(;this.particles.length>90;)this.particles.shift().mesh.removeFromParent()}makeSplat(t){const e=[];for(let l=0;l<20;l++){const c=l/20*6.283,h=(l+1)/20*6.283,u=.4+l%3*.14,p=.4+(l+1)%3*.14;e.push(0,0,0,Math.cos(c)*u,Math.sin(c)*u,0,Math.cos(h)*p,Math.sin(h)*p,0)}const s=new Ce;s.setAttribute("position",new qt(e,3));const r=this.materials.ink.clone();r.color.set(["#d2ed4d","#f5bf52","#c6ef78"][this.splats.length%3]);const o=new ae(s,r),a=this.ground(t.x,t.z);if(t.wall){const l=new Mn(t.x-t.dx*1.5,a+.9,t.z-t.dz*1.5),c=new Mn(t.dx,0,t.dz);for(const u of this.obstacleMeshes)u.updateMatrixWorld();const h=new oh(l,c,0,5).intersectObjects(this.obstacleMeshes,!1)[0];if(h){const u=h.face.normal.clone().transformDirection(h.object.matrixWorld);o.position.copy(h.point).addScaledVector(u,.025),o.quaternion.setFromUnitVectors(new Mn(0,0,1),u)}else o.position.set(t.x,a+.05,t.z),o.rotation.x=-Math.PI/2}else o.position.set(t.x,a+.045,t.z),o.rotation.x=-Math.PI/2;if(this.scene.add(o),this.splats.push({mesh:o,start:this.elapsed}),this.splats.length>90){const l=this.splats.shift();l.mesh.removeFromParent(),l.mesh.geometry.dispose(),l.mesh.material.dispose()}}clearEffects(){for(const t of this.particles)t.mesh.removeFromParent();this.particles=[];for(const t of this.splats)t.mesh.removeFromParent(),t.mesh.geometry.dispose(),t.mesh.material.dispose();this.splats=[];for(const t of this.bulletMeshes.values())t.removeFromParent();this.bulletMeshes.clear();for(const t of this.tongues.values())t.mesh.removeFromParent();this.tongues.clear(),this.fx=[],this.koTimes.clear()}updateHUD(){const t=this.state.actors[0],e=Math.round(t.ammo/tn.capacity*100),n=Ll(this.state,t),s=this.state.actors.slice(1).filter(r=>r.ko).length;this.$("ammo-count").textContent=`${t.ammo} / ${tn.capacity}`,this.$("ammo-percent").textContent=e+"%",this.$("ammo-fill").style.transform=`scaleX(${e/100})`,this.$("ammo-track").setAttribute("aria-valuenow",String(e)),this.$("ammo-state").textContent=t.ammo===0?"ΑΔΕΙΟΣ — πιάσε μύγες!":t.ammo===40?"ΓΕΜΑΤΟΣ!":this.actions.collect||this.keys.has("KeyE")?"ΓΕΜΙΖΕΙ…":"Μύγες για βολές",this.$("ko-count").textContent=`${s} / 2`,this.$("kick-button").disabled=!n||t.dizzyTime>0||t.kick>0,this.$("kick-button").classList.toggle("ready",!!n&&t.dizzyTime<=0),this.$("pc-kick").classList.toggle("ready",!!n),this.$("dizzy-banner").hidden=t.dizzyTime<=0,this.$("dizzy-time").textContent=t.dizzyTime.toFixed(1)+"″",this.$("aim-stick").classList.toggle("empty",t.ammo===0),this.calloutUntil<this.elapsed&&(this.$("callout").textContent="")}renderActors(t){this.state.actors.forEach((s,r)=>{const o=this.models[r],a=this.ground(s.x,s.z);let l=s.x,c=s.z,h=a+s.height;const u=this.koTimes.get(s.id),p=u?this.elapsed-u.time:99;p<.65&&(l+=u.dx*p*5,c+=u.dz*p*5,h+=Math.sin(p/.65*Math.PI)*2.5),o.group.position.set(l,h,c);const f=s.shot>.02||s.tongue>0||s.kick>0,x=f?Math.atan2(s.aimX,s.aimZ):s.face;let g=Math.atan2(Math.sin(x-o.group.rotation.y),Math.cos(x-o.group.rotation.y));o.group.rotation.y+=g*Math.min(1,t*16),o.update(t,{time:this.elapsed,speed:s.hop>0?7:0,hop:s.hop>0?{phase:"air",progress:1-s.hop/.43}:s.idle>0?{phase:"land",progress:1-s.idle/.085}:{phase:"idle",progress:0},dead:s.ko,attack:s.kick>0?{type:"kick",phase:1-s.kick/.48}:s.tongue>0||s.shot>0?{type:"tongue",phase:s.tongue>0?1-s.tongue/.22:1-s.shot/.14}:null});const m=s.load;o.bones.spine.scale.x*=1+m*.75,o.bones.spine.scale.y*=1+m*.5,o.bones.spine.scale.z*=1+m*.45,o.bones.throat.scale.multiply(new Mn(1+m*.45,1+m*.7,1+m*.35)),o.group.scale.setScalar(1+m*.13),s.dizzyTime>0?(o.group.rotation.z=Math.sin(this.elapsed*7)*.17,o.bones.head.rotation.z+=Math.sin(this.elapsed*9)*.2):o.group.rotation.z=p<.65?p*6:0});const e=this.state.actors[0];this.playerRing.position.set(e.x,this.ground(e.x,e.z)+.07,e.z),this.playerRing.scale.setScalar(1+e.load*.25);const n=this.aimGuide.geometry.attributes.position;n.setXYZ(0,e.x+this.aim.x*1.5,this.ground(e.x,e.z)+.2,e.z+this.aim.z*1.5),n.setXYZ(1,e.x+this.aim.x*5,this.ground(e.x+this.aim.x*5,e.z+this.aim.z*5)+.2,e.z+this.aim.z*5),n.needsUpdate=!0,this.aimGuide.computeLineDistances(),this.aimGuide.visible=this.running&&!e.ko}renderFlies(){this.state.flies.forEach((e,n)=>{const s=this.dummy;e.wait>0?(s.scale.setScalar(0),s.position.set(e.x,-100,e.z)):(s.position.set(e.x+Math.sin(this.elapsed*3+e.phase)*.2,this.ground(e.x,e.z)+1+Math.sin(this.elapsed*5+e.phase)*.2,e.z),s.scale.set(.12,.1,.18)),s.rotation.set(0,e.phase,0),s.updateMatrix(),this.flyBodies.setMatrixAt(n,s.matrix);for(let r=0;r<2;r++)e.wait<=0&&(s.position.x+=r===0?-.15:.3,s.position.y+=.03,s.scale.set(.21,.015,.12),s.rotation.z=Math.sin(this.elapsed*55+e.phase)*(r===0?1:-1)*.5),s.updateMatrix(),this.flyWings.setMatrixAt(n*2+r,s.matrix)}),this.flyBodies.instanceMatrix.needsUpdate=!0,this.flyWings.instanceMatrix.needsUpdate=!0;const t=new Set;for(const e of this.state.bullets){t.add(e.id);let n=this.bulletMeshes.get(e.id);n||(n=this.makeFlyBullet(),this.bulletMeshes.set(e.id,n)),n.position.set(e.x,this.ground(e.x,e.z)+.9,e.z),n.rotation.y=Math.atan2(e.dx,e.dz),n.children[1].rotation.z=Math.sin(this.elapsed*75),n.children[2].rotation.z=-Math.sin(this.elapsed*75)}for(const[e,n]of this.bulletMeshes)t.has(e)||(n.removeFromParent(),this.bulletMeshes.delete(e));for(const[e,n]of this.tongues){const s=(this.elapsed-n.start)/.22;if(s>=1){n.mesh.removeFromParent(),this.tongues.delete(e);continue}const r=this.state.actors.findIndex(u=>u.id===e),o=this.models[r],a=o.mouthWorld(),l=new Mn(n.x,this.ground(n.x,n.z)+1,n.z),c=Math.sin(s*Math.PI);l.lerpVectors(a,l,c);const h=l.clone().sub(a);n.mesh.position.copy(a).addScaledVector(h,.5),n.mesh.quaternion.setFromUnitVectors(Vh,h.clone().normalize()),n.mesh.scale.set(.07,Math.max(.001,h.length()),.07)}}project(t,e,n){const s=new Mn(t,e,n).project(this.camera);return{x:(s.x+1)*this.w/2,y:(1-s.y)*this.h/2,visible:s.z>-1&&s.z<1}}drawLabels(){const t=this.labelCtx;t.clearRect(0,0,this.w,this.h),t.textAlign="center",t.lineJoin="round",this.state.actors.forEach((e,n)=>{const s=this.project(e.x,this.ground(e.x,e.z)+e.height+2.3,e.z);if(!s.visible)return;if(!(s.x>20&&s.x<this.w-20&&s.y>70&&s.y<this.h-40)&&n>0&&!e.ko&&this.running){const o=za(s.x,24,this.w-24),a=za(s.y,110,this.h-(this.touch?210:90));t.font="bold 24px sans-serif",t.fillStyle=n===1?"#ffbb8e":"#dfb5ff",t.fillText("▼",o,a);return}if(e.ko){t.font="900 23px sans-serif",t.strokeStyle="#1e2e28",t.lineWidth=5,t.strokeText("KO",s.x,s.y),t.fillStyle="#ffe374",t.fillText("KO",s.x,s.y);return}if(e.dizzyTime>0){for(let o=0;o<3;o++){const a=this.elapsed*4+o*2.094;t.font="bold 25px sans-serif",t.fillStyle="#ffdf57",t.strokeStyle="#725c21",t.lineWidth=3;const l=s.x+Math.cos(a)*27,c=s.y+Math.sin(a)*7;t.strokeText("★",l,c),t.fillText("★",l,c)}t.font="bold 15px sans-serif",t.fillStyle="#fff4ad",t.fillText(e.dizzyTime.toFixed(1)+"″",s.x,s.y+24)}else if(n>0){t.font="bold 16px sans-serif",t.strokeStyle="#163029",t.lineWidth=4;const o=n===1?"ΣΒΟΥΡΑΣ":"ΦΟΥΣΚΑΣ";t.strokeText(o,s.x,s.y-10),t.fillStyle=n===1?"#ffcf9f":"#e5c6ff",t.fillText(o,s.x,s.y-10);for(let a=0;a<6;a++)t.beginPath(),t.arc(s.x+(a-2.5)*9,s.y+3,3.4,0,Math.PI*2),t.fillStyle=a<e.dizzy?"#ffe16a":"#214036bb",t.fill()}}),this.fx=this.fx.filter(e=>this.elapsed-e.start<e.life);for(const e of this.fx){const n=(this.elapsed-e.start)/e.life,s=this.project(e.x,this.ground(e.x,e.z)+2+n*2,e.z);t.globalAlpha=1-n,t.font=`900 ${e.text==="ΝΟΚ ΑΟΥΤ!"?32:22}px sans-serif`,t.strokeStyle="#244136",t.lineWidth=6,t.strokeText(e.text,s.x,s.y),t.fillStyle=e.color,t.fillText(e.text,s.x,s.y)}t.globalAlpha=1}frame(t){const e=Math.min(.05,Math.max(0,(t-this.last)/1e3));if(this.last=t,this.running){for(this.elapsed+=e,this.accumulator+=e;this.accumulator>=1/60;)if(Gh(this.state,this.currentInput(),1/60),this.consumeEvents(),this.accumulator-=1/60,this.state.status!=="playing"){this.finish();break}this.saveClock+=e,this.saveClock>3&&(this.saveClock=0,this.persist())}else(this.mode==="result"||this.mode==="finishing")&&(this.elapsed+=e);this.mode==="finishing"&&this.elapsed>=this.resultAt&&this.showResult();const n=this.state.actors[0],s=new Mn(n.x,this.ground(n.x,n.z),n.z-1.5);this.focus.lerp(s,1-Math.exp(-e*6)),this.shake*=Math.exp(-e*15);const r=this.running?this.shake:0;if(this.camera.position.set(this.focus.x+(Math.random()-.5)*r,this.focus.y+30,this.focus.z+28),this.camera.lookAt(this.focus.x,this.focus.y,this.focus.z),this.camera.updateMatrixWorld(),this.running||this.mode==="title"||this.mode==="result"||this.mode==="finishing"){const o=this.mode==="title"?0:e;this.renderActors(o),this.renderFlies(),this.world.update(this.running?e:0,this.elapsed,1,new Mn(n.x,this.ground(n.x,n.z),n.z))}(this.running||this.mode==="finishing"||this.mode==="result")&&(this.particles=this.particles.filter(o=>this.elapsed-o.start>.55?(o.mesh.removeFromParent(),!1):(o.v.y-=e*16,o.mesh.position.addScaledVector(o.v,e),!0))),this.renderer.render(this.scene,this.camera),this.drawLabels(),this.updateHUD()}inspect(){return{version:La,mode:this.mode,status:this.state.status,ammo:this.state.actors[0].ammo,fillPercent:Math.round(this.state.actors[0].ammo/tn.capacity*100),actors:this.state.actors.map(t=>({id:t.id,x:t.x,z:t.z,ammo:t.ammo,dizzy:t.dizzy,dizzyTime:t.dizzyTime,ko:t.ko})),touch:this.touch,bullets:this.state.bullets.length,splats:this.splats.length,legacySavePreserved:!0}}}function j_(i){const t={fire:!1,collect:!1,kick:!1},e=r=>{i.running&&(t[r]=!0)},n=i.currentInput.bind(i),s=i.clearInputs.bind(i);i.currentInput=()=>{const r=n();for(const o of Object.keys(t))r[o]||=t[o],t[o]=!1;return r},i.clearInputs=()=>{for(const r of Object.keys(t))t[r]=!1;s()},addEventListener("keydown",r=>{r.repeat||r.target.matches("input,select")||(r.code==="KeyQ"&&e("kick"),r.code==="KeyE"&&e("collect"))},!0),addEventListener("pointerdown",r=>{if(r.target.closest?.("#tongue-button"))e("collect");else if(r.target.closest?.("#kick-button")&&!i.$("kick-button").disabled)e("kick");else if(r.target===i.renderer.domElement&&r.pointerType!=="touch")e(r.button===2?"collect":"fire");else if(r.target.closest?.("#aim-stick")){const o=i.$("aim-stick").getBoundingClientRect();Math.hypot(r.clientX-o.x-o.width/2,r.clientY-o.y-o.height/2)>=o.width*.36&&e("fire")}},!0),addEventListener("pointercancel",()=>{for(const r of Object.keys(t))t[r]=!1},!0)}function rc(i){console.error(i);let t=document.getElementById("boot");if(!t){t=document.createElement("div"),t.id="boot";const n=document.createElement("div");n.id="boot-error",t.append(n),document.body.append(t)}t.classList.add("has-error");const e=document.getElementById("boot-error");e.textContent=`Δεν μπόρεσε να ξεκινήσει ο 3D κόσμος. Ενεργοποίησε την επιτάχυνση γραφικών στον browser και κάνε ανανέωση.
`+(i?.message||String(i))}addEventListener("error",i=>rc(i.error||i.message));addEventListener("unhandledrejection",i=>rc(i.reason));requestAnimationFrame(()=>{try{window.frogArcade=new Z_,j_(window.frogArcade)}catch(i){rc(i)}});
