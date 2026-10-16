import test from 'node:test';import assert from 'node:assert/strict';
import {usesMobileTextures,textureVariant,loadTextureProfile} from './asset-profile.js';
test('desktop never downloads the separate mobile lookup table',async()=>{
 let reads=0;assert.equal(await loadTextureProfile(()=>{reads++;throw Error('Must not read')},{mobile:false}),false);assert.equal(reads,0);
});
test('mobile awaits its scoped lookup and propagates an unavailable profile instead of loading full textures',async()=>{
 const baseURI='https://test/magic/previews/greek-sanctuary/',row={file:'textures/mobile/test.webp',width:512,height:512,bytes:7};let requested;
 await loadTextureProfile(async url=>{requested=url;return new TextEncoder().encode(JSON.stringify({'profile-test.png':row}));},{mobile:true,baseURI});
 assert.equal(requested,baseURI+'mobile-textures.json');assert.equal(textureVariant('profile-test.png',{mobile:true,baseURI}).width,512);
 await assert.rejects(loadTextureProfile(async()=>{throw Error('offline profile missing')},{mobile:true,baseURI}),/offline profile missing/);
});
test('iPhone Chrome and desktop-mode iPad select mobile textures; PC retains originals',()=>{
 assert(usesMobileTextures({userAgent:'Mozilla iPhone CriOS/140 Mobile',maxTouchPoints:5}));assert(usesMobileTextures({userAgent:'Mozilla Macintosh Safari',maxTouchPoints:5}));
 assert(!usesMobileTextures({userAgent:'Windows NT Chrome',maxTouchPoints:10}));assert(!usesMobileTextures({userAgent:'Macintosh Safari',maxTouchPoints:0}));
});
test('variants resolve under the current isolated release and cannot replace another origin or scope',()=>{
 const options={baseURI:'https://test/magic/previews/greek-sanctuary/',mobile:true,manifest:{'textures/a.png':{file:'textures/mobile/a.webp',width:512,height:256,bytes:128}}};
 assert.deepEqual(textureVariant('textures/a.png',options),{...options.manifest['textures/a.png'],url:'https://test/magic/previews/greek-sanctuary/textures/mobile/a.webp'});
 assert.equal(textureVariant('textures/a.png',{...options,mobile:false}),null);assert.equal(textureVariant('https://elsewhere/textures/a.png',options),null);assert.equal(textureVariant('/other/textures/a.png',options),null);
});
