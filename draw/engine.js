import * as THREE from 'three';
import { OrbitControls } from './vendor/OrbitControls.js';
import { ASSETS, createAsset } from './assets.js';
import { MATERIALS, getMaterial, getMaterialTextures } from './materials.js';

const WORLD_SIZE = 76;
const SEGMENTS = 112;
const HALF = WORLD_SIZE / 2;
const UP = new THREE.Vector3(0, 1, 0);
const PAINT_COLORS = { grass: '#9db875', dirt: '#a98562', sand: '#d8c599', brick: '#b77f66', stone: '#a5aaa1', plaster: '#e2dbc6', concrete: '#b3b5ae', wood: '#a78155', roof: '#b96d4f', asphalt: '#667578', water: '#72bab8' };
const RELIEF = { brick: 0.038, stone: 0.06, plaster: 0.008, concrete: 0.012, wood: 0.014, roof: 0.03, asphalt: 0.009, sand: 0.015 };
const CLAMP = THREE.MathUtils.clamp;
const finite = (value, fallback = 0) => Number.isFinite(Number(value)) ? Number(value) : fallback;
const assetInfo = id => ASSETS.find(a => a.id === id);

/** Browser-local, fully editable world. All persisted records are plain JSON. */
export class WorldEngine extends EventTarget {
  constructor(container) {
    super();
    if (!container) throw new Error('The world viewport is missing.');
    this.container = container;
    this.tool = 'select';
    this.assetId = 'cottage';
    this.materialId = 'plaster';
    this.brush = { size: 5, strength: 0.55, mode: 'raise' };
    this.buildOptions = { height: 3.2, width: 0.3, rotation: 0, elevation: 0, snap: true };
    this.objects = new Map();
    this.selectedId = null;
    this.history = [];
    this.historyIndex = -1;
    this.nextId = 1;
    this.living = true;
    this.timeOfDay = 'day';
    this.roofsVisible = true;
    this.gridVisible = false;
    this.pointers = new Map();
    this.keys = new Set();
    this.walkInput = { x: 0, z: 0 };
    this.raycaster = new THREE.Raycaster();
    this.ndc = new THREE.Vector2();
    this.clock = new THREE.Clock();
    this._lastFrameTime = 0;
    this._frameCount = 0;
    this._statsAt = performance.now();
    this._sculptElapsed = 0;
    this._dirtyStroke = false;
    this._mobile = matchMedia('(max-width: 800px)').matches;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#dfe9e6');
    this.scene.fog = new THREE.Fog('#dfe9e6', 85, 210);
    this.camera = new THREE.PerspectiveCamera(38, 1, 0.08, 350);
    let contextError;
    for (const options of [{antialias:true,powerPreference:'high-performance'},{antialias:false,powerPreference:'default'}]) {
      try { this.renderer=new THREE.WebGLRenderer({ ...options, alpha:false, preserveDrawingBuffer:true, failIfMajorPerformanceCaveat:false }); break; }
      catch(error) { contextError=error; }
    }
    if(!this.renderer)throw new Error(`WebGL 2 is unavailable in this browser. Enable hardware acceleration or open Draw in a current Safari, Chrome, Firefox, or Edge browser. ${contextError?.message||''}`);
    this.renderer.setPixelRatio(Math.min(devicePixelRatio || 1, this._mobile ? 1.5 : 1.8));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.12;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.domElement.setAttribute('aria-label', 'Interactive 3D world. Drag to orbit; use the build tools to create.');
    this.renderer.domElement.setAttribute('role', 'application');
    this.renderer.domElement.tabIndex = 0;
    this.renderer.domElement.style.touchAction = 'none';
    this.renderer.domElement.style.outline = 'none';
    container.appendChild(this.renderer.domElement);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.minDistance = 3;
    this.controls.maxDistance = 125;
    this.controls.maxPolarAngle = Math.PI / 2 - 0.04;
    this.controls.screenSpacePanning = true;
    this.controls.target.set(0, 1.2, 0);
    this.controls.touches.ONE = THREE.TOUCH.ROTATE;
    this.controls.touches.TWO = THREE.TOUCH.DOLLY_PAN;
    this._createLighting();
    this._createTerrain();
    this._createHelpers();
    this._bindPointers();
    this._resizeObserver = new ResizeObserver(() => this._resize());
    this._resizeObserver.observe(container);
    this._resize();
    this.home(false);
    this._populateStarter();
    this._recordHistory('Started a new neighborhood');
    this._animate = this._animate.bind(this);
    this.renderer.setAnimationLoop(this._animate);
  }

  async init() { return this; }
  _emit(type, detail) { this.dispatchEvent(new CustomEvent(type, { detail })); }
  _hint(text) { this._emit('hint', text); }
  getState() {
    return { tool: this.tool, assetId: this.assetId, materialId: this.materialId, brush: { ...this.brush }, buildOptions: { ...this.buildOptions }, count: this.objects.size, objects: this.objects.size, selectedId: this.selectedId, canUndo: this.historyIndex > 0, canRedo: this.historyIndex < this.history.length - 1, living: this.living, time: this.timeOfDay, roofsVisible: this.roofsVisible, gridVisible: this.gridVisible, view: this.view || 'perspective', exploring: this.tool === 'explore' };
  }
  getSelected() { const record = this.objects.get(this.selectedId)?.record; return record ? structuredClone(record) : null; }
  getObjects() { return [...this.objects.values()].map(o => structuredClone(o.record)); }

  _createLighting() {
    this.hemisphere = new THREE.HemisphereLight('#f2f8ff', '#93a37d', 2.65);
    this.scene.add(this.hemisphere);
    this.sun = new THREE.DirectionalLight('#fff0d5', 3.4);
    this.sun.position.set(-26, 43, 27);
    this.sun.castShadow = true;
    this.sun.shadow.mapSize.set(this._mobile ? 1024 : 2048, this._mobile ? 1024 : 2048);
    Object.assign(this.sun.shadow.camera, { left: -46, right: 46, top: 46, bottom: -46, near: 1, far: 120 });
    this.sun.shadow.bias = -0.00022;
    this.sun.shadow.normalBias = 0.035;
    this.sun.shadow.radius = 3;
    this.sun.target.position.set(0, 0, 0);
    this.scene.add(this.sun, this.sun.target);
    this.fill = new THREE.DirectionalLight('#d0e7f4', 0.55);
    this.fill.position.set(25, 18, -30);
    this.scene.add(this.fill);
  }

  _initialHeight(x, z) {
    const edge = Math.max(Math.abs(x), Math.abs(z));
    const shore = THREE.MathUtils.smoothstep(edge, 29, 38);
    const hill = 3.9 * Math.exp(-((x - 24) ** 2 + (z + 24) ** 2) / 120);
    const hill2 = 1.9 * Math.exp(-((x + 25) ** 2 + (z + 25) ** 2) / 100);
    const townMask = 1 - Math.exp(-(Math.pow(x / 20, 4) + Math.pow(z / 20, 4)));
    const undulation = (Math.sin(x * 0.25) * Math.cos(z * 0.19) * 0.32 + Math.sin(x * 0.55 + z * 0.25) * 0.09) * townMask;
    return 0.25 + hill + hill2 + undulation - shore * (2.25 + hill * 0.6);
  }

  _createTerrain() {
    const geometry = new THREE.PlaneGeometry(WORLD_SIZE, WORLD_SIZE, SEGMENTS, SEGMENTS);
    geometry.rotateX(-Math.PI / 2);
    const positions = geometry.attributes.position;
    const colors = new Float32Array(positions.count * 3);
    const grass = new THREE.Color('#a9bf82');
    const sand = new THREE.Color('#d9caa4');
    const shade = new THREE.Color();
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i), z = positions.getZ(i);
      positions.setY(i, this._initialHeight(x, z));
      const edge = Math.max(Math.abs(x), Math.abs(z));
      shade.copy(grass).lerp(sand, THREE.MathUtils.smoothstep(edge, 31.5, 36));
      shade.multiplyScalar(0.97 + 0.035 * Math.sin(x * 0.4) * Math.cos(z * 0.3));
      colors.set([shade.r, shade.g, shade.b], i * 3);
    }
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.computeVertexNormals();
    const material = getMaterial('grass', { repeat: [26, 26] });
    material.color.set('#ffffff');
    material.vertexColors = false;
    material.roughness = 0.95;
    material.displacementScale = 0;
    material.normalScale.set(0.6, 0.6);
    this._configureTerrainMaterials(geometry, material);
    this.terrain = new THREE.Mesh(geometry, material);
    this.terrain.name = 'Sculptable landscape';
    this.terrain.receiveShadow = true;
    this.terrain.castShadow = true;
    this.terrain.userData.terrain = true;
    this.scene.add(this.terrain);
    const baseMat = getMaterial('sand').clone();
    baseMat.color.set('#a99b76');
    this.earthBase = new THREE.Mesh(new THREE.BoxGeometry(WORLD_SIZE, 3.3, WORLD_SIZE, 1, 2, 1), baseMat);
    this.earthBase.position.y = -3.58;
    this.earthBase.receiveShadow = true;
    this.scene.add(this.earthBase);
    const waterMaterial = getMaterial('water').clone();
    waterMaterial.color.set('#7eb7bd');
    waterMaterial.transparent = true;
    waterMaterial.opacity = 0.92;
    waterMaterial.roughness = 0.31;
    waterMaterial.metalness = 0.12;
    waterMaterial.displacementScale = 0;
    if (waterMaterial.normalMap) { waterMaterial.normalMap = waterMaterial.normalMap.clone(); waterMaterial.normalMap.repeat.set(45, 45); waterMaterial.normalScale.set(0.18, 0.18); }
    this.water = new THREE.Mesh(new THREE.PlaneGeometry(600, 600), waterMaterial);
    this.water.rotation.x = -Math.PI / 2;
    this.water.position.y = -2.03;
    this.water.receiveShadow = true;
    this.scene.add(this.water);
    this._originalHeights = Array.from(positions.array).filter((_, i) => i % 3 === 1);
    this._originalColors = Array.from(colors);
  }

  _configureTerrainMaterials(geometry, material) {
    // Sixteen surfaces share four atlases, keeping mobile texture-unit use low.
    // Per-vertex weights blend real albedo, normal, roughness and height maps.
    this._terrainIds = MATERIALS.slice(0, 16).map(m => m.id);
    const count = geometry.attributes.position.count;
    this._terrainLayers = Array.from({ length: 4 }, () => new THREE.BufferAttribute(new Float32Array(count * 4), 4));
    const sandIndex = Math.max(0, this._terrainIds.indexOf('sand'));
    for (let i = 0; i < count; i++) {
      const p = geometry.attributes.position;
      const edge = Math.max(Math.abs(p.getX(i)), Math.abs(p.getZ(i)));
      const sand = THREE.MathUtils.smoothstep(edge, 31.5, 36);
      this._terrainLayers[0].array[i * 4] = 1 - sand;
      this._terrainLayers[Math.floor(sandIndex / 4)].array[i * 4 + sandIndex % 4] = sand;
    }
    this._terrainLayers.forEach((attribute, i) => geometry.setAttribute(`terrainWeight${i}`, attribute));
    this._originalLayers = this._terrainLayers.map(a => a.array.slice());
    this._terrainAtlases = {};
    for (const [slot, name] of [['map','terrainAlbedo'], ['normalMap','terrainNormal'], ['roughnessMap','terrainRoughness'], ['displacementMap','terrainHeight']]) {
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 2048;
      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = slot === 'map' ? THREE.SRGBColorSpace : THREE.NoColorSpace;
      texture.anisotropy = Math.min(8, this.renderer.capabilities.getMaxAnisotropy());
      this._terrainAtlases[name] = { canvas, texture, slot };
    }
    this._refreshTerrainAtlases();
    this._materialLoaded = () => this._refreshTerrainAtlases();
    window.addEventListener('draw:material-loaded', this._materialLoaded);
    const varyings = `varying vec2 vTerrainUV;\nvarying vec4 vTerrainWeight0;\nvarying vec4 vTerrainWeight1;\nvarying vec4 vTerrainWeight2;\nvarying vec4 vTerrainWeight3;`;
    const uniforms = `uniform sampler2D terrainAlbedo;\nuniform sampler2D terrainNormal;\nuniform sampler2D terrainRoughness;\nuniform sampler2D terrainHeight;`;
    let blend = `vec4 terrainBlend(sampler2D atlas) { vec4 result = vec4(0.0); vec2 tile = fract(vTerrainUV) * 0.248046875 + vec2(0.0009765625);\n`;
    for (let i = 0; i < this._terrainIds.length; i++) {
      const weight = `vTerrainWeight${Math.floor(i/4)}.${'xyzw'[i%4]}`;
      blend += `if (${weight} > 0.0001) result += texture2D(atlas, tile + vec2(${(i%4)/4}, ${Math.floor(i/4)/4})) * ${weight};\n`;
    }
    blend += 'return result; }';
    material.onBeforeCompile = shader => {
      for (const [name, atlas] of Object.entries(this._terrainAtlases)) shader.uniforms[name] = { value: atlas.texture };
      shader.vertexShader = shader.vertexShader.replace('#include <common>', `#include <common>\n${varyings}\n${uniforms}\nattribute vec4 terrainWeight0;\nattribute vec4 terrainWeight1;\nattribute vec4 terrainWeight2;\nattribute vec4 terrainWeight3;\n${blend}`)
        .replace('#include <uv_vertex>', '#include <uv_vertex>\nvTerrainUV = uv * 26.0;\nvTerrainWeight0 = terrainWeight0;\nvTerrainWeight1 = terrainWeight1;\nvTerrainWeight2 = terrainWeight2;\nvTerrainWeight3 = terrainWeight3;')
        .replace('#include <displacementmap_vertex>', 'transformed += normalize(objectNormal) * ((terrainBlend(terrainHeight).r - 0.5) * 0.045);');
      shader.fragmentShader = shader.fragmentShader.replace('#include <common>', `#include <common>\n${varyings}\n${uniforms}\n${blend}`)
        .replace('#include <map_fragment>', 'diffuseColor *= terrainBlend(terrainAlbedo);')
        .replace('#include <normal_fragment_maps>', 'vec3 mapN = terrainBlend(terrainNormal).xyz * 2.0 - 1.0;\nmapN.xy *= normalScale;\nnormal = normalize(tbn * mapN);')
        .replace('#include <roughnessmap_fragment>', 'float roughnessFactor = roughness * terrainBlend(terrainRoughness).g;');
    };
    material.customProgramCacheKey = () => 'draw-terrain-splat-v1';
  }

  _refreshTerrainAtlases() {
    for (const atlas of Object.values(this._terrainAtlases || {})) {
      const context = atlas.canvas.getContext('2d');
      this._terrainIds.forEach((id, i) => {
        const image = getMaterialTextures(id)[atlas.slot]?.image;
        if (image && (image.width || image.naturalWidth)) context.drawImage(image, (i%4)*512, (3-Math.floor(i/4))*512, 512, 512);
      });
      atlas.texture.needsUpdate = true;
    }
  }

  sampleHeight(x, z) {
    const fx = CLAMP((x + HALF) / WORLD_SIZE * SEGMENTS, 0, SEGMENTS - 0.0001);
    const fz = CLAMP((z + HALF) / WORLD_SIZE * SEGMENTS, 0, SEGMENTS - 0.0001);
    const ix = Math.floor(fx), iz = Math.floor(fz), tx = fx - ix, tz = fz - iz;
    const p = this.terrain.geometry.attributes.position;
    const a = iz * (SEGMENTS + 1) + ix;
    return THREE.MathUtils.lerp(THREE.MathUtils.lerp(p.getY(a), p.getY(a + 1), tx), THREE.MathUtils.lerp(p.getY(a + SEGMENTS + 1), p.getY(a + SEGMENTS + 2), tx), tz);
  }

  _createHelpers() {
    this.grid = new THREE.GridHelper(WORLD_SIZE, 76, '#8eaa9b', '#b7c6ab');
    this.grid.position.y = 0.30;
    this.grid.material.transparent = true;
    this.grid.material.opacity = 0.22;
    this.grid.visible = false;
    this.scene.add(this.grid);
    const ringGeometry = new THREE.RingGeometry(0.97, 1.015, 80);
    ringGeometry.rotateX(-Math.PI / 2);
    this.brushRing = new THREE.Mesh(ringGeometry, new THREE.MeshBasicMaterial({ color: '#faffea', transparent: true, opacity: 0.9, side: THREE.DoubleSide, depthTest: false }));
    this.brushRing.renderOrder = 10;
    this.brushRing.visible = false;
    this.scene.add(this.brushRing);
    this.selectionBox = new THREE.Box3Helper(new THREE.Box3(), '#d7edbc');
    this.selectionBox.material.depthTest = false;
    this.selectionBox.material.transparent = true;
    this.selectionBox.material.opacity = 0.75;
    this.selectionBox.visible = false;
    this.selectionBox.renderOrder = 12;
    this.scene.add(this.selectionBox);
    this.guide = new THREE.Group();
    this.scene.add(this.guide);
    this.actorGroup = new THREE.Group();
    this.actorGroup.name = 'Living neighborhood';
    this.scene.add(this.actorGroup);
  }

  _populateStarter() {
    const place = (id, x, z, rotation = 0, scale = 1) => {
      if (!assetInfo(id)) return null;
      return this._insertRecord({ id: this._id(), assetId: id, name: assetInfo(id).name, position: { x, y: this.sampleHeight(x, z), z }, rotation, scale, material: null });
    };
    this._insertRecord(this._pathRecord([[-26, 4.8], [26, 4.8]], 4.4));
    this._insertRecord(this._pathRecord([[-2.5, -26], [-2.5, 24]], 4.4));
    place('cottage', -12, -3.5, 0, 1.05);
    place('townhouse', 7.8, -4.8, 0, 1);
    place('cafe', -12.8, 13.3, 180, 1.05);
    place('villa', 12.2, 15, 180, 1.05);
    place('cottage', -14, -17.5, 90, 0.95);
    place('townhouse', 7.3, -17.5, 0, 0.94);
    // A textured pedestrian square with raised curb and complete street furnishings.
    this._insertRecord({ id: this._id(), assetId: 'floor', name: 'Garden square', position: { x: 18.5, y: this.sampleHeight(18.5, -14) + 0.03, z: -14 }, rotation: 0, scale: 1, material: 'stone', primitive: { kind: 'floor', width: 11.3, depth: 13.8, height: 0.16 } });
    place('fountain', 18, -15, 0, 1.0);
    place('bench', 22, -11.5, -90, 1);
    place('bench', 14.4, -17.7, 90, 1);
    place('flowerbed', 18.6, -8.3, 90, 1.25);
    place('flowerbed', -17.8, -5.6, 0, 1.2);
    place('bench', -6.2, 10, 90, 1);
    for (const [x,z] of [[-21,8.2],[-7.4,1.4],[4.2,1.4],[19,1.4],[-5.9,-13],[0.9,17]]) place('lamp', x, z, 0, 1);
    const trees = [ [-24,-22],[-27,-13],[-23,-4],[-25,13],[-22,22],[-13,24],[-8,19],[3,24],[23,23],[27,15],[28,2],[27,-8],[27,-20],[19,-26],[10,-26],[-7,-27],[-21,-27],[24,-29],[29,-24],[30,-17],[-30,5] ];
    trees.forEach(([x,z], i) => place(i % 4 === 0 && assetInfo('pine') ? 'pine' : 'tree', x, z, i * 47, 0.85 + (i % 4) * 0.12));
    for (const [x,z,s] of [[-19,-8,.8],[-20,16,1],[19,22,.8],[27,-28,1.3],[-27,-24,1.1],[29,9,.8]]) place('bush',x,z,0,s);
    for (const [x,z,s] of [[-29,-17,.9],[31,-22,1.2],[30,26,.8],[-28,26,.8]]) place('rock',x,z,35,s);
    if (assetInfo('fence')) for (const [x,z,r] of [[-17.4,-12,90],[-17.4,-9.2,90],[16.2,22,0],[19,22,0]]) place('fence',x,z,r,.8);
    this._createActors();
  }

  _createActors() {
    for(const child of [...this.actorGroup.children]){this.actorGroup.remove(child);this._disposeRoot(child);}
    this.actors = [];
    this._actorRoutes=[];
    const roads=[...this.objects.values()].filter(o=>o.record.assetId==='road');
    for(const {record,root} of roads){
      root.updateMatrixWorld(true);
      const points=(record.primitive?.kind==='road'?record.primitive.points:[[0,-4],[0,4]]).map(p=>root.localToWorld(new THREE.Vector3(p[0],0,p[1])));
      if(points.length<2)continue;
      const curve=new THREE.CatmullRomCurve3(points,false,'centripetal');
      const length=curve.getLength();if(length<3)continue;
      this._actorRoutes.push({curve,length,width:(record.primitive?.width||4)*record.scale});
    }
    this._actorRoutes.sort((a,b)=>b.length-a.length);
    this._actorRoadSignature=this._roadSignature();
    if(!this._actorRoutes.length)return;
    if (assetInfo('car')) {
      for (let i=0;i<Math.min(3,this._actorRoutes.length+1);i++) {
        const car = createAsset('car', { color: i ? '#d8b270' : '#789b98' });
        car.scale.setScalar(0.68);
        this.actorGroup.add(car);
        this.actors.push({ mesh: car, type: 'car', phase: i*.7, speed: 2.8+i*.3, route:this._actorRoutes[i%this._actorRoutes.length] });
      }
    }
    if (assetInfo('person')) {
      for (let i=0;i<5;i++) {
        const person = createAsset('person', { color: ['#b97f62','#739a93','#c3b889','#718294','#9981a0'][i] });
        person.scale.setScalar(0.86);
        this.actorGroup.add(person);
        this.actors.push({ mesh: person, type: 'person', phase: i*.41, speed: .75+i*.08, route:this._actorRoutes[i%this._actorRoutes.length] });
      }
    }
    this._updateActors(this._elapsed||0);
  }
  _roadSignature(){return JSON.stringify([...this.objects.values()].filter(o=>o.record.assetId==='road').map(o=>({id:o.record.id,position:o.record.position,rotation:o.record.rotation,scale:o.record.scale,primitive:o.record.primitive})));}
  _syncActorRoutes(){if(this._roadSignature()!==this._actorRoadSignature)this._createActors();}

  _id() { return `item-${this.nextId++}`; }
  _reliefMaterial(id) {
    const material = getMaterial(id || 'plaster').clone();
    if (material.displacementMap) material.displacementScale = RELIEF[id] ?? 0.015;
    material.displacementBias = -(material.displacementScale || 0) * 0.25;
    return material;
  }

  _makePrimitive(record) {
    const p = record.primitive;
    if (p.kind === 'road') return this._makeRoad(record);
    const root = new THREE.Group();
    const width = Math.max(0.1, p.width), depth = Math.max(0.1, p.depth), height = Math.max(0.06, p.height);
    const wall = p.kind === 'wall';
    const material = this._reliefMaterial(record.material || (wall ? 'plaster' : 'stone'));
    const geometry = new THREE.BoxGeometry(width, height, depth, Math.min(64,Math.ceil(width*6)), Math.min(32,Math.ceil(height*6)), Math.min(64,Math.ceil(depth*6)));
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = height / 2;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.userData.paintable = true;
    root.add(mesh);
    if (wall) {
      const coping = new THREE.Mesh(new THREE.BoxGeometry(width + .09, .07, depth + .04), getMaterial('stone'));
      coping.position.y = height + .035;
      coping.castShadow = true;
      root.add(coping);
      const skirting = new THREE.Mesh(new THREE.BoxGeometry(width + .035, .13, depth + .015), getMaterial('stone'));
      skirting.position.y = .065;
      root.add(skirting);
    } else {
      const foundation = new THREE.Mesh(new THREE.BoxGeometry(width-.025, .08, depth-.025), getMaterial('concrete'));
      foundation.position.y = -.02;
      root.add(foundation);
    }
    root.userData = { assetId: record.assetId, width, depth, height, label: record.name };
    return root;
  }

  _pathRecord(points, width = 4) {
    const x = points.reduce((s,p)=>s+p[0],0)/points.length;
    const z = points.reduce((s,p)=>s+p[1],0)/points.length;
    return { id: this._id(), assetId: 'road', name: 'Drawn street', position: {x,y:0,z}, rotation: 0, scale: 1, material:'asphalt', primitive: { kind:'road', width, points: points.map(p=>[p[0]-x,p[1]-z]) } };
  }

  _makeRoad(record) {
    const root = new THREE.Group();
    const p=record.primitive, width=p.width || 4;
    const raw=p.points.map(v=>new THREE.Vector3(v[0],0,v[1]));
    if(raw.length<2) return root;
    const curve=new THREE.CatmullRomCurve3(raw,false,'centripetal');
    const count=Math.max(4,Math.min(240,Math.ceil(curve.getLength()*1.3)));
    const samples=curve.getPoints(count);
    const lateral=[];
    for(let i=0;i<samples.length;i++) {
      const a=samples[Math.max(0,i-1)], b=samples[Math.min(samples.length-1,i+1)];
      const tangent=b.clone().sub(a).normalize();
      lateral.push(new THREE.Vector3(-tangent.z,0,tangent.x));
    }
    const ribbon=(offset,halfWidth,height,material) => {
      const pos=[],uv=[],indices=[];let distance=0;
      for(let i=0;i<samples.length;i++) {
        if(i) distance+=samples[i].distanceTo(samples[i-1]);
        for(const side of [-1,1]) {
          const v=samples[i].clone().addScaledVector(lateral[i],offset+halfWidth*side);
          const y=this.sampleHeight(v.x+record.position.x,v.z+record.position.z)+height-record.position.y;
          pos.push(v.x,y,v.z);uv.push(side===-1?0:1,distance/3);
        }
        if(i<count) {const n=i*2;indices.push(n,n+1,n+2,n+1,n+3,n+2);}
      }
      const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(indices);g.computeVertexNormals();
      const m=new THREE.Mesh(g,material);m.receiveShadow=true;m.userData.paintable=true;root.add(m);return m;
    };
    ribbon(0,width/2,.065,getMaterial(record.material||'asphalt'));
    const curbMaterial=getMaterial('stone').clone();curbMaterial.color.set('#d7d1b9');
    ribbon(-width/2-.30,.29,.16,curbMaterial);
    ribbon(width/2+.30,.29,.16,curbMaterial);
    const edgeMaterial=new THREE.MeshStandardMaterial({color:'#e6e4cb',roughness:.9});
    ribbon(-width/2+.14,.035,.072,edgeMaterial);
    ribbon(width/2-.14,.035,.072,edgeMaterial);
    const length=curve.getLength(),dashes=Math.max(1,Math.floor(length/3));
    const dashMesh=new THREE.InstancedMesh(new THREE.BoxGeometry(.075,.012,1.25),edgeMaterial,dashes);
    const dummy=new THREE.Object3D();
    for(let i=0;i<dashes;i++) {
      const t=CLAMP((i+.5)/dashes,0,1),v=curve.getPoint(t),tangent=curve.getTangent(t);
      dummy.position.set(v.x,this.sampleHeight(v.x+record.position.x,v.z+record.position.z)+.08-record.position.y,v.z);
      dummy.rotation.y=Math.atan2(tangent.x,tangent.z);dummy.updateMatrix();dashMesh.setMatrixAt(i,dummy.matrix);
    }
    dashMesh.receiveShadow=true;root.add(dashMesh);
    root.userData={assetId:'road',label:'Drawn street',width,depth:length,height:.18};
    return root;
  }

  _insertRecord(record) {
    const root=record.primitive ? this._makePrimitive(record) : createAsset(record.assetId, { material: record.material || undefined, color: record.color });
    if (!root) return null;
    record.enterable=!!root.userData.enterable;
    record.position ||= {x:0,y:0,z:0};
    record.rotation=finite(record.rotation);record.scale=finite(record.scale,1);
    record.name ||= assetInfo(record.assetId)?.name || record.assetId;
    root.position.set(record.position.x,record.position.y,record.position.z);
    root.rotation.y=THREE.MathUtils.degToRad(record.rotation);
    root.scale.setScalar(record.scale);
    root.userData.recordId=record.id;
    let meshIndex=0;
    root.traverse(node=>{node.userData.recordId=record.id;if(node.userData.isRoof)node.visible=this.roofsVisible;if(node.isMesh){node.userData.surfaceIndex=meshIndex;if(record.paintedParts?.[meshIndex])node.material=this._reliefMaterial(record.paintedParts[meshIndex]);meshIndex++;}});
    this.objects.set(record.id,{record,root});this.scene.add(root);
    return root;
  }

  setTool(tool) {
    const allowed=['select','move','build','road','wall','floor','paint','sculpt','erase','explore'];
    if(!allowed.includes(tool))return;
    this._finishStroke();this._activePointer=null;
    if(this.tool==='explore'&&tool!=='explore')this._leaveExplore();
    if(tool==='explore'&&this.tool!=='explore')this._enterExplore(false);
    this.tool=tool;
    this._updateSelectionBox();
    this.controls.enabled=tool==='select';
    this.renderer.domElement.style.cursor=tool==='select'?'grab':tool==='explore'?'grab':tool==='move'?'move':'crosshair';
    this._clearGuide();this.brushRing.visible=false;
    if(this.ghost)this.ghost.visible=false;
    this._emit('tool',tool);
    const hints={select:'Drag to orbit · Scroll to zoom · Click an object to edit',move:'Drag an object across the ground',build:'Click or tap the ground to place an asset · R rotates the next asset',road:'Drag across the ground to draw a street',wall:'Drag to draw a wall · Set its height in the tool settings',floor:'Drag a rectangle to lay a floor',paint:'Brush the ground, or tap a surface to apply its material',sculpt:'Press and drag to shape the landscape',erase:'Click an object to remove it · Undo is always available',explore:'WASD / arrows to walk · Drag to look · Escape to return'};
    this._hint(hints[tool]);
  }
  setAsset(id) {if(!assetInfo(id))return;this.assetId=id;this._rebuildGhost();this.setTool('build');}
  setMaterial(id) {this.materialId=id;this._emit('settings',this.getState());}
  setBrush(values={}) {this.brush={...this.brush,...values};this.brush.size=CLAMP(finite(this.brush.size,5),.5,25);this.brush.strength=CLAMP(finite(this.brush.strength,.5),.01,2);}
  setBuildOptions(values={}) {this.buildOptions={...this.buildOptions,...values};if(this.ghost)this.ghost.rotation.y=THREE.MathUtils.degToRad(finite(this.buildOptions.rotation));}

  _rebuildGhost() {
    if(this.ghost){this.scene.remove(this.ghost);this._disposeRoot(this.ghost,true);}
    this.ghost=createAsset(this.assetId);
    this.ghost.traverse(n=>{if(n.isMesh){n.material=Array.isArray(n.material)?n.material.map(m=>m.clone()):n.material.clone();const mats=Array.isArray(n.material)?n.material:[n.material];for(const m of mats){m.transparent=true;m.opacity=.38;m.depthWrite=false;}n.castShadow=false;n.receiveShadow=false;}});
    this.ghost.visible=false;this.scene.add(this.ghost);
  }

  _point(event,objectsOnly=false) {
    const rect=this.renderer.domElement.getBoundingClientRect();
    this.ndc.set((event.clientX-rect.left)/rect.width*2-1,-(event.clientY-rect.top)/rect.height*2+1);
    this.raycaster.setFromCamera(this.ndc,this.camera);
    if(objectsOnly) {
      const roots=[...this.objects.values()].map(o=>o.root);
      const hits=this.raycaster.intersectObjects(roots,true).filter(hit=>this._isVisible(hit.object));
      return hits[0]||null;
    }
    const hit=this.raycaster.intersectObject(this.terrain,false)[0];
    if(!hit)return null;
    const p=hit.point.clone();
    if(this.buildOptions.snap&&!['sculpt','paint'].includes(this.tool)){p.x=Math.round(p.x*2)/2;p.z=Math.round(p.z*2)/2;p.y=this.sampleHeight(p.x,p.z);}
    return p;
  }
  _isVisible(node) {while(node){if(!node.visible)return false;node=node.parent;}return true;}

  _bindPointers() {
    const canvas=this.renderer.domElement;
    const down=e=> {
      if(e.pointerType==='mouse'&&e.button!==0){this._navPointer=e.pointerId;this.controls.enabled=this.tool!=='explore';return;}
      this.pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
      this._downClient={x:e.clientX,y:e.clientY};
      if(this.pointers.size>1){this._finishStroke();this._gesture=this._gestureState();return;}
      if(e.altKey||this.keys.has(' ')){this._navPointer=e.pointerId;this.controls.enabled=true;return;}
      if(this.tool==='select'){this._clickStart={x:e.clientX,y:e.clientY};return;}
      canvas.setPointerCapture(e.pointerId);
      this._activePointer=e.pointerId;
      this._lastPointer={clientX:e.clientX,clientY:e.clientY};
      if(this.tool==='explore'){this._lookAt={x:e.clientX,y:e.clientY};return;}
      if(this.tool==='paint'||this.tool==='erase'){
        const hit=this._point(e,true);
        if(hit){this._dirtyStroke=false;if(this.tool==='paint'){this._paintObject(hit);this._paintObjectStroke=true;}else{this.select(hit.object.userData.recordId);this.deleteSelected();}return;}
      }
      const p=this._point(e);if(!p)return;
      this._strokeStart=p;this._strokeEnd=p.clone();this._strokePoints=[[p.x,p.z]];
      this._dirtyStroke=false;
      if(this.tool==='move'){
        const hit=this._point(e,true);this.select(hit?.object.userData.recordId||null);
        if(this.selectedId){this._moveOffset=this.objects.get(this.selectedId).root.position.clone().sub(p);const original=this.objects.get(this.selectedId).record.position;this._moveOriginalY=original.y-this.sampleHeight(original.x,original.z);}
      } else if(this.tool==='sculpt'||this.tool==='paint') {
        if(this.tool==='sculpt')this._heightBeforeStroke=new Map([...this.objects.values()].map(o=>[o.record.id,this.sampleHeight(o.record.position.x,o.record.position.z)]));
        if(this.tool==='paint'){
          const hit=this._point(e,true);
          if(hit){this._paintObject(hit);this._paintObjectStroke=true;return;}
        }
        this._flattenTarget=p.y;this._brushPoint=p;this._applyBrush(p,.055);
      } else if(this.tool==='erase') {
        const hit=this._point(e,true);if(hit){this.select(hit.object.userData.recordId);this.deleteSelected();}
      }
    };
    const move=e=> {
      if(this.pointers.has(e.pointerId))this.pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
      if(this.pointers.size>1&&this.tool!=='select'){
        const current=this._gestureState();if(this._gesture)this._applyGesture(this._gesture,current);this._gesture=current;return;
      }
      if(this._navPointer===e.pointerId)return;
      if(this.tool==='explore'){
        if(this._activePointer===e.pointerId&&this._lookAt){this._yaw-=(e.clientX-this._lookAt.x)*.0045;this._pitch=CLAMP(this._pitch-(e.clientY-this._lookAt.y)*.004,-1.25,1.25);this._lookAt={x:e.clientX,y:e.clientY};}
        return;
      }
      const p=this._point(e);
      if(!p){this.brushRing.visible=false;if(this.ghost)this.ghost.visible=false;return;}
      this._lastPointer={clientX:e.clientX,clientY:e.clientY};
      if(['sculpt','paint'].includes(this.tool)){
        this.brushRing.visible=true;this.brushRing.position.copy(p).add(new THREE.Vector3(0,.08,0));this.brushRing.scale.setScalar(this.brush.size/2);
      }
      if(this.tool==='build'){
        if(!this.ghost)this._rebuildGhost();this.ghost.visible=true;this.ghost.position.copy(p);this.ghost.position.y+=finite(this.buildOptions.elevation);this.ghost.rotation.y=THREE.MathUtils.degToRad(this.buildOptions.rotation);
      }
      if(this._activePointer!==e.pointerId||!this._strokeStart)return;
      this._strokeEnd=p;
      if(this.tool==='move'&&this.selectedId){
        const o=this.objects.get(this.selectedId);const nx=p.x+this._moveOffset.x,nz=p.z+this._moveOffset.z;o.root.position.set(nx,this.sampleHeight(nx,nz)+finite(this._moveOriginalY),nz);o.record.position={x:o.root.position.x,y:o.root.position.y,z:o.root.position.z};this._dirtyStroke=true;this._updateSelectionBox();
      } else if(['wall','road','floor'].includes(this.tool)) {
        if(this.tool==='road'){
          const last=this._strokePoints[this._strokePoints.length-1];if(Math.hypot(p.x-last[0],p.z-last[1])>.8)this._strokePoints.push([p.x,p.z]);
        }
        this._previewStroke();
      } else if(['sculpt','paint'].includes(this.tool)&&!this._paintObjectStroke) {
        this._brushPoint=p;
      }
    };
    const up=e=> {
      const wasMulti=this.pointers.size>1;
      this.pointers.delete(e.pointerId);
      if(e.type==='pointercancel'){this._finishStroke();this._activePointer=null;this._gesture=null;return;}
      if(this._navPointer===e.pointerId){this._navPointer=null;requestAnimationFrame(()=>this.controls.enabled=this.tool==='select');return;}
      if(wasMulti){this._gesture=null;this._activePointer=null;return;}
      if(this.tool==='select'&&this._clickStart){
        if(Math.hypot(e.clientX-this._clickStart.x,e.clientY-this._clickStart.y)<6){const hit=this._point(e,true);this.select(hit?.object.userData.recordId||null);}
        this._clickStart=null;
      }
      if(this._activePointer!==e.pointerId)return;
      if(this.tool==='build'&&this._strokeStart&&this._downClient&&Math.hypot(e.clientX-this._downClient.x,e.clientY-this._downClient.y)<14){
        this._placeAsset(this._point(e)||this._strokeStart);
      } else if(['wall','floor','road'].includes(this.tool)&&this._strokeStart&&this._strokeEnd) {
        this._commitDrawn();
      }
      this._finishStroke();this._activePointer=null;this._lookAt=null;
    };
    this._pointerHandlers={down,move,up};
    canvas.addEventListener('pointerdown',down,true);canvas.addEventListener('pointermove',move,true);canvas.addEventListener('pointerup',up,true);canvas.addEventListener('pointercancel',up,true);
    canvas.addEventListener('contextmenu',e=>e.preventDefault());
    canvas.addEventListener('wheel',e=>{if(this.tool!=='select'&&this.tool!=='explore'){e.preventDefault();this.zoom(Math.exp(-e.deltaY*.001));}},{passive:false});
    this._keydown=e=>{if(/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)||e.target.isContentEditable)return;this.keys.add(e.key.toLowerCase());if(this.tool==='explore'&&['w','a','s','d','arrowup','arrowdown','arrowleft','arrowright',' '].includes(e.key.toLowerCase()))e.preventDefault();};
    this._keyup=e=>this.keys.delete(e.key.toLowerCase());
    window.addEventListener('keydown',this._keydown);window.addEventListener('keyup',this._keyup);window.addEventListener('blur',()=>{this.keys.clear();this.walkInput={x:0,z:0};this._finishStroke();this.pointers.clear();});
    canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();this.renderer.setAnimationLoop(null);this._emit('error','Your graphics context was interrupted. Your saved world is safe. Reload to resume.');});
    canvas.addEventListener('webglcontextrestored',()=>this.renderer.setAnimationLoop(this._animate));
  }

  _gestureState() {const p=[...this.pointers.values()];if(p.length<2)return null;return {x:(p[0].x+p[1].x)/2,y:(p[0].y+p[1].y)/2,d:Math.hypot(p[1].x-p[0].x,p[1].y-p[0].y)};}
  _applyGesture(a,b) {
    if(!a||!b||this.tool==='explore')return;
    const offset=this.camera.position.clone().sub(this.controls.target),s=new THREE.Spherical().setFromVector3(offset);
    s.radius=CLAMP(s.radius*(a.d/Math.max(10,b.d)),3,125);
    s.theta-=(b.x-a.x)*.006;s.phi=CLAMP(s.phi-(b.y-a.y)*.005,.08,Math.PI/2-.04);
    this.camera.position.copy(this.controls.target).add(new THREE.Vector3().setFromSpherical(s));this.camera.lookAt(this.controls.target);
  }

  _previewStroke() {
    this._clearGuide();
    const a=this._strokeStart,b=this._strokeEnd;
    const material=new THREE.MeshStandardMaterial({color:'#e7f4cf',transparent:true,opacity:.6,roughness:.8,depthWrite:false});
    let geometry,mesh;
    if(this.tool==='floor'){
      geometry=new THREE.BoxGeometry(Math.max(.15,Math.abs(a.x-b.x)),.18,Math.max(.15,Math.abs(a.z-b.z)));
      mesh=new THREE.Mesh(geometry,material);mesh.position.set((a.x+b.x)/2,Math.max(a.y,b.y)+finite(this.buildOptions.elevation)+.1,(a.z+b.z)/2);
    }else if(this.tool==='wall'){
      const height=CLAMP(finite(this.buildOptions.height,3.2),.2,20);
      geometry=new THREE.BoxGeometry(CLAMP(finite(this.buildOptions.width,.3),.12,2),height,Math.max(.1,a.distanceTo(b)));
      mesh=new THREE.Mesh(geometry,material);mesh.position.copy(a).add(b).multiplyScalar(.5);mesh.position.y=Math.max(a.y,b.y)+height/2+finite(this.buildOptions.elevation);mesh.rotation.y=Math.atan2(b.x-a.x,b.z-a.z);
    }else{
      const points=this._strokePoints.concat([[b.x,b.z]]).map(p=>new THREE.Vector3(p[0],this.sampleHeight(p[0],p[1])+.12,p[1]));
      geometry=new THREE.BufferGeometry().setFromPoints(points);mesh=new THREE.Line(geometry,new THREE.LineBasicMaterial({color:'#ecffd7',linewidth:3,depthTest:false}));
    }
    this.guide.add(mesh);
  }
  _clearGuide() {if(!this.guide)return;for(const child of [...this.guide.children]){this.guide.remove(child);child.geometry?.dispose();const mats=Array.isArray(child.material)?child.material:[child.material];for(const m of mats)m?.dispose();}}

  _placeAsset(p) {
    if(!p)return;
    const rec={id:this._id(),assetId:this.assetId,name:assetInfo(this.assetId)?.name||this.assetId,position:{x:p.x,y:p.y+finite(this.buildOptions.elevation),z:p.z},rotation:finite(this.buildOptions.rotation),scale:1,material:null};
    this._insertRecord(rec);this.select(rec.id);this._recordHistory(`Placed ${rec.name}`);
    this._hint(`${rec.name} placed · Keep tapping to add more`);
  }

  _commitDrawn() {
    const a=this._strokeStart,b=this._strokeEnd;if(a.distanceTo(b)<.3&&this._strokePoints.length<3)return;
    let rec;
    if(this.tool==='road'){
      const points=[...this._strokePoints];const last=points[points.length-1];if(Math.hypot(last[0]-b.x,last[1]-b.z)>.15)points.push([b.x,b.z]);
      const width=finite(this.buildOptions.width,4);rec=this._pathRecord(points,width<1?4:CLAMP(width,1.5,12));
    } else {
      const wall=this.tool==='wall';const width=wall?CLAMP(finite(this.buildOptions.width,.3),.12,2):Math.max(.4,Math.abs(a.x-b.x));
      const depth=wall?Math.hypot(b.x-a.x,b.z-a.z):Math.max(.4,Math.abs(a.z-b.z));
      rec={id:this._id(),assetId:wall?'wall':'floor',name:wall?'Drawn wall':'Drawn floor',position:{x:(a.x+b.x)/2,y:Math.max(a.y,b.y)+finite(this.buildOptions.elevation),z:(a.z+b.z)/2},rotation:wall?THREE.MathUtils.radToDeg(Math.atan2(b.x-a.x,b.z-a.z)):0,scale:1,material:this.materialId,primitive:{kind:wall?'wall':'floor',width,depth,height:wall?CLAMP(finite(this.buildOptions.height,3.2),.3,20):.16}};
    }
    this._insertRecord(rec);this.select(rec.id);this._recordHistory(`Created ${rec.name}`);this._clearGuide();
  }

  _finishStroke() {
    if(this._dirtyStroke){
      if(this.tool==='sculpt'){this.terrain.geometry.computeVertexNormals();this._resettleObjects();}
      this._recordHistory(this.tool==='sculpt'?'Sculpted landscape':this.tool==='paint'?'Painted material':'Moved object');
    }
    this._dirtyStroke=false;this._strokeStart=null;this._strokeEnd=null;this._brushPoint=null;this._paintObjectStroke=false;this._clearGuide();
  }

  _paintObject(hit) {
    const id=hit.object.userData.recordId,obj=this.objects.get(id);if(!obj)return;
    const material=this._reliefMaterial(this.materialId);
    hit.object.material=material;
    obj.record.paintedParts ||= {};obj.record.paintedParts[hit.object.userData.surfaceIndex ?? 0]=this.materialId;this.select(id);this._dirtyStroke=true;this._hint(`Applied ${this.materialId} material`);
  }

  _applyBrush(p,dt) {
    if(!p)return;
    const geometry=this.terrain.geometry,positions=geometry.attributes.position,colors=geometry.attributes.color;
    const radius=this.brush.size/2,r2=radius*radius,strength=this.brush.strength;
    const mode=this.brush.mode;
    const paintColor=new THREE.Color(PAINT_COLORS[this.materialId]||PAINT_COLORS.grass);
    const materialIndex=Math.max(0,this._terrainIds.indexOf(this.materialId));
    const minX=Math.max(0,Math.floor((p.x-radius+HALF)/WORLD_SIZE*SEGMENTS));
    const maxX=Math.min(SEGMENTS,Math.ceil((p.x+radius+HALF)/WORLD_SIZE*SEGMENTS));
    const minZ=Math.max(0,Math.floor((p.z-radius+HALF)/WORLD_SIZE*SEGMENTS));
    const maxZ=Math.min(SEGMENTS,Math.ceil((p.z+radius+HALF)/WORLD_SIZE*SEGMENTS));
    for(let z=minZ;z<=maxZ;z++)for(let x=minX;x<=maxX;x++){
      const i=z*(SEGMENTS+1)+x,dx=positions.getX(i)-p.x,dz=positions.getZ(i)-p.z,d2=dx*dx+dz*dz;if(d2>r2)continue;
      const falloff=Math.pow(1-Math.sqrt(d2)/radius,1.25);
      if(this.tool==='paint'){
        const k=CLAMP(falloff*strength*dt*8,0,1);
        for(let layer=0;layer<4;layer++)for(let channel=0;channel<4;channel++){const data=this._terrainLayers[layer].array,index=i*4+channel;data[index]=data[index]*(1-k)+(layer*4+channel===materialIndex?k:0);}
        colors.setXYZ(i,THREE.MathUtils.lerp(colors.getX(i),paintColor.r,k),THREE.MathUtils.lerp(colors.getY(i),paintColor.g,k),THREE.MathUtils.lerp(colors.getZ(i),paintColor.b,k));
      }else{
        let y=positions.getY(i);
        if(mode==='smooth'){
          let total=0,count=0;for(const j of [i-1,i+1,i-SEGMENTS-1,i+SEGMENTS+1])if(j>=0&&j<positions.count){total+=positions.getY(j);count++;}
          y=THREE.MathUtils.lerp(y,total/count,CLAMP(falloff*strength*dt*5,0,.8));
        }else if(mode==='flatten')y=THREE.MathUtils.lerp(y,this._flattenTarget??p.y,CLAMP(falloff*strength*dt*5,0,.8));
        else y+=(mode==='lower'?-1:1)*falloff*strength*dt*4.5;
        positions.setY(i,CLAMP(y,-2.8,18));
      }
    }
    if(this.tool==='paint'){colors.needsUpdate=true;this._terrainLayers.forEach(layer=>layer.needsUpdate=true);}
    else{positions.needsUpdate=true;geometry.computeVertexNormals();geometry.computeBoundingSphere();}
    this._dirtyStroke=true;
  }

  _resettleObjects() {
    for(const obj of this.objects.values()){
      if(obj.record.primitive?.kind==='road'){
        this.scene.remove(obj.root);this._disposeRoot(obj.root);obj.root=this._makeRoad(obj.record);obj.root.position.set(obj.record.position.x,obj.record.position.y,obj.record.position.z);obj.root.rotation.y=THREE.MathUtils.degToRad(obj.record.rotation);obj.root.scale.setScalar(obj.record.scale);let surfaceIndex=0;obj.root.traverse(n=>{n.userData.recordId=obj.record.id;if(n.isMesh){n.userData.surfaceIndex=surfaceIndex;if(obj.record.paintedParts?.[surfaceIndex])n.material=this._reliefMaterial(obj.record.paintedParts[surfaceIndex]);surfaceIndex++;}});this.scene.add(obj.root);
      }else{
        const oldHeight=this._heightBeforeStroke?.get(obj.record.id);
        if(oldHeight!==undefined){obj.record.position.y+=this.sampleHeight(obj.record.position.x,obj.record.position.z)-oldHeight;obj.root.position.y=obj.record.position.y;}
      }
    }
    this._heightBeforeStroke=null;this._updateSelectionBox();
  }

  select(id) {this.selectedId=this.objects.has(id)?id:null;this._updateSelectionBox();this._emit('selection',this.getSelected());return this.getSelected();}
  _updateSelectionBox(){const obj=this.objects.get(this.selectedId);this.selectionBox.visible=!!obj&&this.tool!=='explore';if(obj)this.selectionBox.box.setFromObject(obj.root);}
  updateSelected(values={}) {
    const o=this.objects.get(this.selectedId);if(!o)return;
    if(values.position){for(const axis of ['x','y','z'])if(values.position[axis]!==undefined)o.record.position[axis]=CLAMP(finite(values.position[axis]),axis==='y'?-4:-HALF,axis==='y'?40:HALF);o.root.position.set(o.record.position.x,o.record.position.y,o.record.position.z);}
    if(values.rotation!==undefined){o.record.rotation=finite(values.rotation);o.root.rotation.y=THREE.MathUtils.degToRad(o.record.rotation);}
    if(values.scale!==undefined){o.record.scale=CLAMP(finite(values.scale,1),.15,5);o.root.scale.setScalar(o.record.scale);}
    if(values.name!==undefined)o.record.name=String(values.name).slice(0,80);
    if(values.material){o.record.material=String(values.material);this.scene.remove(o.root);this._disposeRoot(o.root);this._insertRecord(o.record);}
    this._updateSelectionBox();this._emit('selection',this.getSelected());this._recordHistory('Updated object');
  }
  deleteSelected(){const o=this.objects.get(this.selectedId);if(!o)return;this.scene.remove(o.root);this._disposeRoot(o.root);this.objects.delete(this.selectedId);this.select(null);this._recordHistory(`Removed ${o.record.name}`);}
  duplicateSelected(){const o=this.objects.get(this.selectedId);if(!o)return;const rec=structuredClone(o.record);rec.id=this._id();rec.position.x+=2;rec.position.z+=2;rec.name=`${rec.name} copy`;this._insertRecord(rec);this.select(rec.id);this._recordHistory('Duplicated object');}
  rotateSelected(degrees=45){const o=this.objects.get(this.selectedId);if(o)this.updateSelected({rotation:(o.record.rotation+degrees)%360});else this.setBuildOptions({rotation:(finite(this.buildOptions.rotation)+degrees)%360});}

  setView(view){if(this.tool==='explore')this.exitExplore();this.view=view;const target=this.controls.target.clone();if(view==='top'){this.camera.position.copy(target).add(new THREE.Vector3(0,65,.01));this.camera.lookAt(target);}else this.home();this.controls.update();this._emit('view',view);}
  zoom(factor=1.2){if(this.tool==='explore')return;const offset=this.camera.position.clone().sub(this.controls.target);const distance=CLAMP(offset.length()/factor,3,125);offset.setLength(distance);this.camera.position.copy(this.controls.target).add(offset);this.controls.update();}
  home(animate=true){if(this.tool==='explore')this.exitExplore();this.view='perspective';this.controls.target.set(0,1,0);const mobile=this.container.clientWidth<700;this.camera.position.set(mobile?61:48,mobile?53:42,mobile?69:55);this.camera.lookAt(this.controls.target);this.controls.update();}
  toggleGrid(force){this.gridVisible=force===undefined?!this.gridVisible:!!force;this.grid.visible=this.gridVisible;this._emit('settings',this.getState());return this.gridVisible;}
  toggleRoofs(force){this.roofsVisible=force===undefined?!this.roofsVisible:!!force;for(const o of this.objects.values())o.root.traverse(n=>{if(n.userData.isRoof)n.visible=this.roofsVisible;});this._updateSelectionBox();this._emit('settings',this.getState());return this.roofsVisible;}
  setLiving(value){this.living=!!value;this._emit('settings',this.getState());}
  setTime(time){
    const presets={day:{sky:'#dfe9e6',sun:'#fff0d5',intensity:3.4,ambient:2.65,position:[-26,43,27],exposure:1.12},sunset:{sky:'#e8c9af',sun:'#ffbb72',intensity:3.1,ambient:1.7,position:[-42,16,22],exposure:1.05},night:{sky:'#22364b',sun:'#a4bce7',intensity:.5,ambient:.7,position:[-25,35,-24],exposure:1.0}};
    const p=presets[time]||presets.day;this.timeOfDay=presets[time]?time:'day';this.scene.background.set(p.sky);this.scene.fog.color.set(p.sky);this.sun.color.set(p.sun);this.sun.intensity=p.intensity;this.hemisphere.intensity=p.ambient;this.sun.position.set(...p.position);this.renderer.toneMappingExposure=p.exposure;
    const glass=getMaterial('glass');glass.emissive?.set('#ffbb64');glass.emissiveIntensity=time==='night'?.65:time==='sunset'?.2:.015;
    for(const o of this.objects.values())o.root.traverse(n=>{if(n.isMesh&&n.userData.isWindow){const mats=Array.isArray(n.material)?n.material:[n.material];for(const m of mats)if(m.emissive){m.emissive.set('#ffd493');m.emissiveIntensity=time==='night'?.75:.03;}}});
    this._emit('settings',this.getState());
  }

  _enterExplore(selected=false) {
    this._savedCamera={position:this.camera.position.clone(),target:this.controls.target.clone(),roofs:this.roofsVisible};
    const o=selected?this.objects.get(this.selectedId):null;
    if(o?.root.userData.enterable){
      const spawn=o.root.userData.interiorSpawn||{x:0,y:1.9,z:1};const p=new THREE.Vector3(spawn.x,spawn.y,spawn.z);o.root.localToWorld(p);this.camera.position.copy(p);this._yaw=o.root.rotation.y;this.toggleRoofs(false);
    }else{
      const t=this.controls.target;this.camera.position.set(t.x,this.sampleHeight(t.x,t.z+10)+1.75,t.z+10);this._yaw=0;
    }
    this._walkFootY=this.camera.position.y-1.72;
    this._pitch=-.06;this.camera.rotation.order='YXZ';this.controls.enabled=false;this.selectionBox.visible=false;
    this.walkInput={x:0,z:0};this._emit('explore',{active:true,interior:!!o});
  }
  enterSelected(){const o=this.objects.get(this.selectedId);if(!o?.root.userData.enterable){this._hint('Select a house to step inside.');return false;}if(this.tool==='explore')this._leaveExplore();this._enterExplore(true);this.tool='explore';this._emit('tool','explore');this._hint('Inside your house · WASD or touch controls to walk · Drag to look');return true;}
  _leaveExplore(){if(this._savedCamera){this.camera.position.copy(this._savedCamera.position);this.controls.target.copy(this._savedCamera.target);this.toggleRoofs(this._savedCamera.roofs);this.camera.rotation.order='XYZ';this.camera.lookAt(this.controls.target);}this.walkInput={x:0,z:0};this.keys.clear();this._savedCamera=null;this._walkFootY=null;this._emit('explore',{active:false});}
  exitExplore(){if(this.tool==='explore')this.setTool('select');}
  setWalkInput(values={}){this.walkInput={x:CLAMP(finite(values.x),-1,1),z:CLAMP(finite(values.z),-1,1)};}

  _walkFloorAt(position, feet, roots) {
    let floor=this.sampleHeight(position.x,position.z);
    const ray=this._walkRay||(this._walkRay=new THREE.Raycaster());
    ray.set(new THREE.Vector3(position.x,feet+2.05,position.z),new THREE.Vector3(0,-1,0));ray.near=0;ray.far=5;
    for(const hit of ray.intersectObjects(roots,true)) {
      if(!this._isVisible(hit.object)||!hit.face)continue;
      const normal=hit.face.normal.clone().transformDirection(hit.object.matrixWorld);
      if(normal.y>.55&&hit.point.y<=feet+.34&&hit.point.y>=feet-2.8){floor=Math.max(floor,hit.point.y);break;}
    }
    return floor;
  }

  _updateExplore(dt) {
    this.camera.rotation.set(this._pitch||0,this._yaw||0,0,'YXZ');
    const roots=[...this.objects.values()].map(o=>o.root);
    const feet=Number.isFinite(this._walkFootY)?this._walkFootY:this.camera.position.y-1.72;
    const currentFloor=this._walkFloorAt(this.camera.position,feet,roots);
    this._walkFootY=currentFloor;
    this.camera.position.y=THREE.MathUtils.lerp(this.camera.position.y,currentFloor+1.72,Math.min(1,dt*16));
    const x=this.walkInput.x+(this.keys.has('d')||this.keys.has('arrowright')?1:0)-(this.keys.has('a')||this.keys.has('arrowleft')?1:0);
    const z=this.walkInput.z+(this.keys.has('s')||this.keys.has('arrowdown')?1:0)-(this.keys.has('w')||this.keys.has('arrowup')?1:0);
    if(!x&&!z)return;
    const forward=new THREE.Vector3(-Math.sin(this._yaw),0,-Math.cos(this._yaw));
    const right=new THREE.Vector3(Math.cos(this._yaw),0,-Math.sin(this._yaw));
    const direction=right.multiplyScalar(x).addScaledVector(forward,-z).normalize();
    const movement=direction.clone().multiplyScalar(dt*(this.keys.has('shift')?7:4.1));
    const next=this.camera.position.clone().add(movement);next.x=CLAMP(next.x,-HALF+1,HALF-1);next.z=CLAMP(next.z,-HALF+1,HALF-1);
    const targetFloor=this._walkFloorAt(next,currentFloor,roots);
    // Physical support follows each tread immediately; only the eye height eases.
    // This avoids a lagging camera ray blocking the next quarter-metre riser.
    const bodyBase=Math.max(currentFloor,targetFloor);
    const ray=this._walkRay;
    ray.set(new THREE.Vector3(this.camera.position.x,bodyBase+1.05,this.camera.position.z),direction);ray.near=0;ray.far=movement.length()+.22;
    if(ray.intersectObjects(roots,true).some(h=>this._isVisible(h.object)&&!h.object.material?.transparent&&!h.object.userData.isStair))return;
    ray.set(new THREE.Vector3(this.camera.position.x,bodyBase+.40,this.camera.position.z),direction);ray.far=movement.length()+.055;
    if(ray.intersectObjects(roots,true).some(h=>this._isVisible(h.object)&&!h.object.material?.transparent&&!h.object.userData.isStair))return;
    this._walkFootY=targetFloor;
    next.y=THREE.MathUtils.lerp(this.camera.position.y,targetFloor+1.72,Math.min(1,dt*16));
    this.camera.position.copy(next);
  }

  _updateActors(elapsed) {
    for(const actor of this.actors||[]){
      const phase=(elapsed*actor.speed/actor.route.length+actor.phase)%2;
      const t=phase<=1?phase:2-phase,direction=phase<=1?1:-1;
      const point=actor.route.curve.getPointAt(CLAMP(t,.001,.999));
      const tangent=actor.route.curve.getTangentAt(CLAMP(t,.001,.999)).multiplyScalar(direction).normalize();
      const lateral=new THREE.Vector3(-tangent.z,0,tangent.x);
      point.addScaledVector(lateral,actor.type==='car'?Math.min(1,actor.route.width*.23):actor.route.width/2+.55);
      const bob=actor.type==='person'?Math.abs(Math.sin(elapsed*4+actor.phase*10))*.022:0;
      actor.mesh.position.set(point.x,this.sampleHeight(point.x,point.z)+(actor.type==='car'?.09:.18)+bob,point.z);
      actor.mesh.rotation.y=Math.atan2(tangent.x,tangent.z);
    }
  }

  serialize(){
    const pos=this.terrain.geometry.attributes.position;
    return {version:1,name:'My neighborhood',nextId:this.nextId,terrain:{size:WORLD_SIZE,segments:SEGMENTS,heights:Array.from({length:pos.count},(_,i)=>Math.round(pos.getY(i)*10000)/10000),layers:this._terrainLayers.map(layer=>Array.from(layer.array,v=>Math.round(v*10000)/10000))},objects:[...this.objects.values()].map(o=>structuredClone(o.record)),settings:{time:this.timeOfDay,living:this.living,roofsVisible:this.roofsVisible,gridVisible:this.gridVisible},camera:{position:this.camera.position.toArray(),target:this.controls.target.toArray()}};
  }
  load(data,options={}) {
    if(!data||data.version!==1||!Array.isArray(data.objects))throw new Error('This is not a compatible Draw world file.');
    if(data.objects.length>1500)throw new Error('This world contains more than 1,500 objects.');
    const count=this.terrain.geometry.attributes.position.count;
    if(data.terrain?.heights&&(!Array.isArray(data.terrain.heights)||data.terrain.heights.length!==count||!data.terrain.heights.every(Number.isFinite)))throw new Error('The landscape grid in this file is incompatible.');
    if(data.terrain?.layers&&(!Array.isArray(data.terrain.layers)||data.terrain.layers.length!==4||data.terrain.layers.some(layer=>!Array.isArray(layer)||layer.length!==count*4||!layer.every(Number.isFinite))))throw new Error('The painted landscape in this file is incompatible.');
    for(const vector of [data.camera?.position,data.camera?.target])if(vector&&(!Array.isArray(vector)||vector.length!==3||!vector.every(Number.isFinite)))throw new Error('The saved camera is invalid.');
    const seenIds=new Set();
    for(const record of data.objects){
      if(!record.id||typeof record.id!=='string'||seenIds.has(record.id)||!record.assetId||(!record.primitive&&!assetInfo(record.assetId)))throw new Error('This world contains an unsupported or duplicate asset.');
      seenIds.add(record.id);
      if(record.primitive&&!['wall','floor','road'].includes(record.primitive.kind))throw new Error('Unsupported construction shape.');
      if(record.primitive?.kind==='road'&&(!Array.isArray(record.primitive.points)||record.primitive.points.length<2||record.primitive.points.length>512||record.primitive.points.some(p=>!Array.isArray(p)||p.length!==2||!p.every(Number.isFinite))))throw new Error('A road in this file is invalid.');
    }
    if(this.tool==='explore')this.exitExplore();
    for(const obj of this.objects.values()){this.scene.remove(obj.root);this._disposeRoot(obj.root);}this.objects.clear();this.select(null);
    const pos=this.terrain.geometry.attributes.position;
    if(data.terrain?.heights)for(let i=0;i<count;i++)pos.setY(i,CLAMP(finite(data.terrain.heights[i]),-2.8,18));
    if(data.terrain?.layers?.length===4){for(let layer=0;layer<4;layer++){const values=data.terrain.layers[layer];if(values.length===count*4){for(let i=0;i<count*4;i++)this._terrainLayers[layer].array[i]=CLAMP(finite(values[i]),0,1);this._terrainLayers[layer].needsUpdate=true;}}}else this._terrainLayers.forEach((layer,i)=>{layer.array.set(this._originalLayers[i]);layer.needsUpdate=true;});
    if(data.terrain?.colors?.length===count*3){const colors=this.terrain.geometry.attributes.color;for(let i=0;i<count*3;i++)colors.array[i]=CLAMP(finite(data.terrain.colors[i],.5),0,1);colors.needsUpdate=true;}
    pos.needsUpdate=true;this.terrain.geometry.computeVertexNormals();this.terrain.geometry.computeBoundingSphere();
    this.nextId=Math.max(finite(data.nextId,1),data.objects.length+1);
    for(const incoming of data.objects){const rec=structuredClone(incoming);rec.position={x:CLAMP(finite(rec.position?.x),-HALF,HALF),y:CLAMP(finite(rec.position?.y),-4,40),z:CLAMP(finite(rec.position?.z),-HALF,HALF)};rec.scale=CLAMP(finite(rec.scale,1),.15,5);rec.name=String(rec.name||rec.assetId).slice(0,80);if(rec.primitive){rec.primitive.width=CLAMP(finite(rec.primitive.width,1),.1,76);rec.primitive.depth=CLAMP(finite(rec.primitive.depth,1),.1,76);rec.primitive.height=CLAMP(finite(rec.primitive.height,1),.06,20);if(rec.primitive.points)rec.primitive.points=rec.primitive.points.map(p=>p.map(v=>CLAMP(v,-76,76)));}this._insertRecord(rec);}
    const settings=data.settings||{};this.setTime(settings.time||'day');this.setLiving(settings.living!==false);this.toggleRoofs(settings.roofsVisible!==false);this.toggleGrid(!!settings.gridVisible);
    if(data.camera?.position?.length===3&&data.camera?.target?.length===3){this.camera.position.fromArray(data.camera.position.map(v=>CLAMP(finite(v),-150,150)));this.controls.target.fromArray(data.camera.target.map(v=>CLAMP(finite(v),-HALF,HALF))); this.controls.update();}
    this._createActors();
    if(!options.history){this.history=[];this.historyIndex=-1;this._recordHistory('Loaded world');}else this._emit('change',{reason:'Restored world',...this.getState()});
    return this;
  }

  newWorld(starter=false){
    if(this.tool==='explore')this.exitExplore();
    for(const o of this.objects.values()){this.scene.remove(o.root);this._disposeRoot(o.root);}this.objects.clear();this.select(null);
    const p=this.terrain.geometry.attributes.position,c=this.terrain.geometry.attributes.color;
    for(let i=0;i<p.count;i++)p.setY(i,this._originalHeights[i]);this._terrainLayers.forEach((layer,i)=>{layer.array.set(this._originalLayers[i]);layer.needsUpdate=true;});c.array.set(this._originalColors);p.needsUpdate=true;c.needsUpdate=true;this.terrain.geometry.computeVertexNormals();
    this.actorGroup.clear();this.actors=[];this.nextId=1;if(starter)this._populateStarter();this.home();this._recordHistory(starter?'Restored starter neighborhood':'Created blank landscape');
  }
  resetStarter(){this.newWorld(true);}
  _recordHistory(reason){
    this._syncActorRoutes();
    const snapshot=JSON.stringify(this.serialize());
    if(this.history[this.historyIndex]===snapshot)return;
    this.history=this.history.slice(0,this.historyIndex+1);this.history.push(snapshot);
    if(this.history.length>25)this.history.shift();this.historyIndex=this.history.length-1;
    this._emit('change',{reason,...this.getState()});
  }
  undo(){if(this.historyIndex<=0)return false;this.historyIndex--;this.load(JSON.parse(this.history[this.historyIndex]),{history:true});this._hint('Undone');return true;}
  redo(){if(this.historyIndex>=this.history.length-1)return false;this.historyIndex++;this.load(JSON.parse(this.history[this.historyIndex]),{history:true});this._hint('Redone');return true;}
  takeSnapshot(){this.brushRing.visible=false;if(this.ghost)this.ghost.visible=false;const selection=this.selectionBox.visible;this.selectionBox.visible=false;this.renderer.render(this.scene,this.camera);const data=this.renderer.domElement.toDataURL('image/png');this.selectionBox.visible=selection;return data;}

  _resize(){const w=Math.max(1,this.container.clientWidth),h=Math.max(1,this.container.clientHeight);this.renderer.setSize(w,h,false);this.camera.aspect=w/h;this.camera.updateProjectionMatrix();}
  _animate(time){
    const dt=Math.min(.05,this.clock.getDelta());this._elapsed=(this._elapsed||0)+(this.living?dt:0);
    if(this.tool==='explore')this._updateExplore(dt);else if(this.controls.enabled)this.controls.update();
    if(this.living){this._updateActors(this._elapsed);if(this.water.material.normalMap){this.water.material.normalMap.offset.x=this._elapsed*.008;this.water.material.normalMap.offset.y=this._elapsed*.004;}}
    if(this._brushPoint&&this._activePointer!==null&&this._activePointer!==undefined&&this.pointers.size===1&&!this._paintObjectStroke){
      this._sculptElapsed+=dt;
      if(this._sculptElapsed>.035){
        if(this.tool==='sculpt'&&!this._heightBeforeStroke)this._heightBeforeStroke=new Map([...this.objects.values()].map(o=>[o.record.id,this.sampleHeight(o.record.position.x,o.record.position.z)]));
        this._applyBrush(this._brushPoint,this._sculptElapsed);this._sculptElapsed=0;
      }
    }
    this.renderer.render(this.scene,this.camera);
    this._frameCount++;
    if(time-this._statsAt>1200){this._emit('stats',{fps:Math.round(this._frameCount*1000/(time-this._statsAt)),objects:this.objects.size,triangles:this.renderer.info.render.triangles,drawCalls:this.renderer.info.render.calls});this._statsAt=time;this._frameCount=0;}
  }
  _disposeRoot(root,materials=false){root.traverse(node=>{node.geometry?.dispose();if(materials){const list=Array.isArray(node.material)?node.material:[node.material];list.forEach(m=>m?.dispose());}});}
  dispose(){this.renderer.setAnimationLoop(null);this._resizeObserver.disconnect();this.controls.dispose();this.renderer.dispose();window.removeEventListener('keydown',this._keydown);window.removeEventListener('keyup',this._keyup);window.removeEventListener('draw:material-loaded',this._materialLoaded);this.renderer.domElement.remove();}
}
