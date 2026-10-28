import * as THREE from 'three';
import { WorldEngine } from './engine.js';
import { ASSETS, createAsset } from './assets.js';
import { MATERIALS, getMaterialPreview, preloadMaterials } from './materials.js';

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
const paths = {
  cursor:'m4 3 7.1 18 2.4-7.5L21 11 4 3Z',
  box:'m12 3 9 5v9l-9 5-9-5V8l9-5Zm0 10v9M3 8l9 5 9-5M7.5 5.5l9 5',
  cube:'m12 3 9 5v9l-9 5-9-5V8l9-5Zm0 10v9M3 8l9 5 9-5',
  brush:'m14 6 4-4 4 4-4 4m-4-4-7 7 4 4 7-7M7 13c-4-1-5 3-4 7 4 1 8-1 7-4',
  mountain:'m2 20 7-15 4 7 3-5 6 13H2Zm4.5-9 2.5 2 2-3m2 2 3 4 2-2',
  lower:'m2 5 7 15 4-7 3 5 6-13H2Zm7 4v6m-2-2 2 2 2-2',
  walk:'M13 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm-1 3-3 4-4 1m7-5 4 4 4 1m-8-5-1 7 4 7m-4-7-4 7',
  undo:'M4 10h10a6 6 0 0 1 0 12M4 10l5-5m-5 5 5 5',
  redo:'M20 10H10a6 6 0 0 0 0 12m10-12-5-5m5 5-5 5',
  save:'M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12l4 4v12a2 2 0 0 1-2 2ZM7 3v6h10V3M7 21v-8h10v8',
  help:'M9.1 9a3 3 0 0 1 5.8 1c0 2-3 2-3 4m.1 3h.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z',
  chevronDown:'m6 9 6 6 6-6',chevronUp:'m6 15 6-6 6 6',chevronLeft:'m15 6-6 6 6 6',chevronRight:'m9 6 6 6-6 6',
  globe:'M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0ZM2 12h20M12 2c5 5 5 15 0 20-5-5-5-15 0-20Z',
  layers:'m12 3 10 5-10 5L2 8l10-5ZM2 12l10 5 10-5M2 17l10 5 10-5',
  search:'M21 21l-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z',
  x:'m6 6 12 12M6 18 18 6',plus:'M12 5v14M5 12h14',minus:'M5 12h14',
  sun:'M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5',
  sunset:'M2 18h20M5 21h14M6 18a6 6 0 0 1 12 0M12 3v8M8 7l4 4 4-4M3 12l2 2m14 0 2-2',
  moon:'M21 13a9 9 0 1 1-10-10 7 7 0 0 0 10 10Z',
  grid:'M3 3h18v18H3V3Zm6 0v18m6-18v18M3 9h18M3 15h18',
  home:'m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10Zm6 11v-8h6v8',
  focus:'M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z',
  plan:'M3 3h18v18H3V3Zm0 10h7V3m0 10v4m4-4h7M10 21v-1',
  sparkles:'m12 2 2.7 7.3L22 12l-7.3 2.7L12 22l-2.7-7.3L2 12l7.3-2.7L12 2ZM20 2v4m-2-2h4',
  mouse:'M8 2h8a3 3 0 0 1 3 3v10a7 7 0 0 1-14 0V5a3 3 0 0 1 3-3ZM12 2v6',
  door:'M4 21V3h16v18M9 21V7l8-2v14l-8 2Zm4-8h.01M2 21h20',
  arrowRight:'M4 12h16m-6-6 6 6-6 6',
  copy:'M9 9h12v12H9V9ZM5 15H3V3h12v2',
  rotate:'M3 10a9 9 0 1 1 1 8M3 3v7h7',
  trash:'M3 6h18M5 6l1 15h12l1-15M9 6V3h6v3m-5 4v7m4-7v7',
  wall:'M2 4h20v16H2V4Zm0 8h20M8 4v8m8-8v8M12 12v8',
  floor:'m12 4 10 6-10 6L2 10l10-6ZM2 14l10 6 10-6',
  road:'M5 2 2 22M19 2l3 20M12 2v4m0 4v4m0 4v4',
  stairs:'M3 21v-6h6V9h6V3h6v18H3Z',
  magnet:'M4 3v9a8 8 0 0 0 16 0V3h-5v9a3 3 0 0 1-6 0V3H4Zm0 5h5m6 0h5',
  waves:'M2 6c4-5 6 5 10 0s6 5 10 0M2 12c4-5 6 5 10 0s6 5 10 0M2 18c4-5 6 5 10 0s6 5 10 0',
  info:'M12 11v6m0-10h.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z',
  edit:'m16 3 5 5M4 20l5-1L21 7l-4-4L5 15l-1 5Z',
  download:'M12 3v12m-5-5 5 5 5-5M3 15v6h18v-6',
  upload:'M12 16V4m-5 5 5-5 5 5M3 15v6h18v-6',
  camera:'M3 6h4l2-3h6l2 3h4v15H3V6Zm13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z',
  expand:'M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5',
  check:'m5 12 4 4L19 6',
  move:'M12 2v20M2 12h20m-6-4 4 4-4 4M8 8l-4 4 4 4m0-10 4-4 4 4m-8 12 4 4 4-4',
  tree:'M12 22v-7M12 2 5 10h3l-5 7h18l-5-7h3L12 2Z',
  furniture:'M4 10V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5M4 15h16M3 10h2v8h14v-8h2v10H3V10Zm2 10v2m14-2v2',
};
function icon(name, cls = '') { return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${paths[name] || paths.box}"/></svg>`; }
function hydrateIcons(parent = document) { $$('[data-icon]', parent).forEach(el => { el.innerHTML = icon(el.dataset.icon); }); }
function escapeHTML(value) { const div = document.createElement('div'); div.textContent = String(value ?? ''); return div.innerHTML; }
hydrateIcons();

let engine;
let currentName = 'Seaside village';
let libraryMode = 'assets';
let category = 'Buildings';
let selectedAsset = 'cottage';
let selectedMaterial = 'plaster';
let primaryTool = 'select';
let buildTool = 'assets';
let rotation = 0;
let initialized = false;
let dirty = false;
let saveTimer;
let saveSequence = 0;
let toastTimer;
let modalReturnFocus;
let renderSequence = 0;
const isMobile = () => matchMedia('(max-width:700px)').matches;
const thumbnailCache = new Map();
const toolNames = {select:'Select',move:'Move',build:'Build',wall:'Wall',floor:'Floor',road:'Road',paint:'Paint',sculpt:'Sculpt',erase:'Erase',explore:'Explore'};

const dbReady = new Promise((resolve, reject) => {
  if (!window.indexedDB) { reject(new Error('Local storage is unavailable in this browser.')); return; }
  const request = indexedDB.open('draw-world-studio', 1);
  request.onupgradeneeded = () => request.result.createObjectStore('projects');
  request.onsuccess = () => resolve(request.result);
  request.onerror = () => reject(request.error);
}).catch(error => { console.warn('Local world storage:', error.message); return null; });
async function readSavedWorld() {
  const db = await dbReady;
  if (!db) return null;
  return new Promise(resolve => {
    const request = db.transaction('projects', 'readonly').objectStore('projects').get('current');
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => resolve(null);
  });
}
function projectDocument() { return { format:'draw-world', version:1, name:currentName, savedAt:new Date().toISOString(), world:engine.serialize() }; }
async function saveWorld(notify = false) {
  if (!engine || !initialized) return;
  clearTimeout(saveTimer);
  const sequence = ++saveSequence;
  const state = projectDocument();
  setSaveStatus('Saving…');
  try {
    const db = await dbReady;
    if (!db) throw new Error('Local storage is not available. Use Export project to keep your world.');
    await new Promise((resolve, reject) => {
      const tx = db.transaction('projects', 'readwrite');
      tx.objectStore('projects').put(state, 'current');
      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error || new Error('Saving was interrupted.'));
    });
    if (sequence === saveSequence) { dirty = false; setSaveStatus('Saved on this device'); }
    if (notify) toast('World saved on this device. Export a copy to take it with you.');
  } catch (error) {
    setSaveStatus('Export to keep a copy');
    if (notify || dirty) toast(error.message || 'Could not save. Export a project copy from the menu.', true);
  }
}
function setSaveStatus(message) { $('#save-status').innerHTML = `<i></i>${escapeHTML(message)}`; }
function markDirty() { if (!initialized) return; dirty = true; setSaveStatus('Unsaved changes'); clearTimeout(saveTimer); saveTimer = setTimeout(() => saveWorld(), 950); }
function setName(name) {
  currentName = String(name || 'Untitled world').trim().slice(0, 60) || 'Untitled world';
  $('#project-name').textContent = currentName;
  $('#canvas-project-name').textContent = currentName;
  document.title = `${currentName} — DRAW World Studio`;
}
function toast(message, error = false) { clearTimeout(toastTimer); $('#toast-text').textContent = message; $('#toast').classList.toggle('error', error); $('#toast').hidden = false; toastTimer = setTimeout(() => $('#toast').hidden = true, error ? 6500 : 4200); }
function updateState(state = engine.getState()) {
  $('#object-count').textContent = `${state.count} objects`;
  $('#undo').disabled = !state.canUndo;
  $('#redo').disabled = !state.canRedo;
  $('#grid-toggle').checked = state.gridVisible;
  $('#roof-toggle').checked = state.roofsVisible;
  $('#living-toggle').checked = state.living;
  $$('[data-time]').forEach(button => { const active = button.dataset.time === state.time; button.classList.toggle('active', active); button.setAttribute('aria-pressed', active); });
}

function switchLibrary(mode, open = true) {
  libraryMode = mode;
  $('#asset-search').value = '';
  $$('[data-library]').forEach(button => { const active = button.dataset.library === mode; button.classList.toggle('active', active); button.setAttribute('aria-selected', active); });
  $('#library-title').innerHTML = mode === 'materials' ? 'Feel the difference<span>.</span>' : 'Make it yours<span>.</span>';
  $('#library-note').textContent = mode === 'materials' ? 'Real surface detail, with normal and height maps.' : 'Choose an asset, then place it in your world.';
  renderCategories();
  renderLibrary();
  if (open && isMobile()) openLibrary();
}
function renderCategories() {
  const labels = libraryMode === 'assets' ? ['All', 'Buildings', 'Structures', 'Streets', 'Nature', 'Furniture', 'Life'] : ['All materials', 'Natural', 'Architecture', 'Surfaces'];
  if (libraryMode === 'assets' && !labels.includes(category)) category = 'Buildings';
  if (libraryMode === 'materials' && !labels.includes(category)) category = 'All materials';
  $('#categories').innerHTML = labels.map(label => `<button class="${category === label ? 'active' : ''}" data-category="${label}" aria-pressed="${category === label}">${label === 'Furniture' ? 'Interiors' : label}</button>`).join('');
  $$('[data-category]').forEach(button => button.addEventListener('click', () => { category = button.dataset.category; renderCategories(); renderLibrary(); }));
}
function materialCategory(id) { if (['grass','dirt','sand','water'].includes(id)) return 'Natural'; if (['brick','stone','plaster','concrete','roof','glass'].includes(id)) return 'Architecture'; return 'Surfaces'; }
function renderLibrary() {
  const query = $('#asset-search').value.trim().toLowerCase();
  const materials = libraryMode === 'materials';
  const entries = (materials ? MATERIALS : ASSETS).filter(item => {
    const groupMatch = category === 'All' || category === 'All materials' || (materials ? materialCategory(item.id) === category : item.category === category);
    const queryMatch = `${item.name} ${item.id} ${item.description} ${item.category || ''}`.toLowerCase().includes(query);
    return groupMatch && queryMatch;
  });
  const sequence = ++renderSequence;
  $('#collection-title').textContent = query ? 'Search results' : category === 'Furniture' ? 'Interiors & details' : category;
  $('#collection-count').textContent = `${entries.length} ${materials ? 'surfaces' : 'assets'}`;
  $('#empty-library').hidden = entries.length > 0;
  $('#asset-grid').innerHTML = entries.map(item => {
    const active = item.id === (materials ? selectedMaterial : selectedAsset);
    const meta = materials ? item.scanned ? 'Scanned PBR · 1K' : 'Normal + height' : item.category === 'Buildings' ? 'Furnished · Enterable' : `${item.width} × ${item.depth} m`;
    const source = materials ? getMaterialPreview(item.id) : thumbnailCache.get(item.id);
    return `<button class="asset-card ${materials ? 'asset-material' : ''} ${active ? 'active' : ''}" data-asset="${item.id}" title="${escapeHTML(item.description)}" aria-label="${materials ? 'Paint with' : 'Place'} ${escapeHTML(item.name)}" aria-pressed="${active}"><span class="asset-image">${source ? `<img src="${source}" alt="${escapeHTML(item.name)}" draggable="false"/>` : `<span class="thumbnail-rendering" aria-label="Rendering ${escapeHTML(item.name)}"></span>`}${materials ? '<span class="material-badge">PBR SURFACE</span>' : ''}<span class="asset-plus">${icon(active ? 'check' : 'plus')}</span></span><span class="asset-caption"><span class="asset-name">${escapeHTML(item.name)}</span><span class="asset-description">${escapeHTML(meta)}</span></span></button>`;
  }).join('');
  $$('[data-asset]').forEach(button => button.addEventListener('click', () => chooseLibraryItem(button.dataset.asset)));
  if (!materials) queueThumbnails(entries, sequence);
}

let thumbnailRenderer;
let thumbScene;
let thumbCamera;
function prepareThumbnailRenderer() {
  if (thumbnailRenderer) return;
  thumbnailRenderer = new THREE.WebGLRenderer({antialias:true, alpha:true, preserveDrawingBuffer:true});
  thumbnailRenderer.setSize(264, 210);
  thumbnailRenderer.setPixelRatio(1);
  thumbnailRenderer.outputColorSpace = THREE.SRGBColorSpace;
  thumbnailRenderer.toneMapping = THREE.ACESFilmicToneMapping;
  thumbnailRenderer.toneMappingExposure = 1.28;
  thumbnailRenderer.setClearColor(0x000000, 0);
  thumbScene = new THREE.Scene();
  thumbScene.add(new THREE.HemisphereLight('#ffffff','#b0b990', 3.0));
  const sun = new THREE.DirectionalLight('#fff2d9', 3.3); sun.position.set(-5, 9, 7); thumbScene.add(sun);
  const fill = new THREE.DirectionalLight('#e3f2ff', 1); fill.position.set(5, 3, -4); thumbScene.add(fill);
  thumbCamera = new THREE.OrthographicCamera(-5, 5, 4, -4, 0.1, 200);
}
async function queueThumbnails(entries, sequence) {
  for (const item of entries) {
    if (sequence !== renderSequence) return;
    if (thumbnailCache.has(item.id)) continue;
    await new Promise(resolve => requestAnimationFrame(resolve));
    if (sequence !== renderSequence) return;
    try {
      prepareThumbnailRenderer();
      const model = createAsset(item.id);
      const bounds = new THREE.Box3().setFromObject(model);
      const size = bounds.getSize(new THREE.Vector3());
      const center = bounds.getCenter(new THREE.Vector3());
      const horizontal = Math.max(size.x, size.z);
      const extent = Math.max(horizontal * 0.8, size.y * 0.71, 0.5) * 1.3;
      thumbCamera.left = -extent * 1.26; thumbCamera.right = extent * 1.26;
      thumbCamera.top = extent; thumbCamera.bottom = -extent;
      thumbCamera.updateProjectionMatrix();
      thumbCamera.position.copy(center).add(new THREE.Vector3(11, 8.5, 13));
      thumbCamera.lookAt(center.x, center.y * 0.92, center.z);
      thumbScene.add(model);
      thumbnailRenderer.render(thumbScene, thumbCamera);
      const url = thumbnailRenderer.domElement.toDataURL('image/webp', 0.88);
      thumbnailCache.set(item.id, url);
      thumbScene.remove(model);
      model.traverse(node => { if (node.isMesh) node.geometry.dispose(); });
      if (sequence === renderSequence) {
        const slot = $(`[data-asset="${item.id}"] .asset-image`);
        if (slot) { slot.querySelector('.thumbnail-rendering')?.remove(); const img = document.createElement('img'); img.src = url; img.alt = item.name; img.draggable = false; slot.prepend(img); }
      }
    } catch (error) { console.error('Asset thumbnail:', item.id, error); }
  }
}
function chooseLibraryItem(id) {
  if (!engine) return;
  if (libraryMode === 'materials') {
    selectedMaterial = id; engine.setMaterial(id);
    if (!['wall','floor','road'].includes(engine.tool)) { primaryTool = 'paint'; engine.setTool('paint'); }
    $('#context-title').textContent = MATERIALS.find(item => item.id === id)?.name || id;
    setHint(`Paint with ${MATERIALS.find(item => item.id === id)?.name || id} · Brush the ground or tap a surface`);
  } else {
    selectedAsset = id; buildTool = 'assets'; primaryTool = 'build';
    engine.setAsset(id);
    updateBuildTabs();
    $('#placing-label').textContent = `${ASSETS.find(item => item.id === id)?.name || id} · Click to place`;
    setHint(`${ASSETS.find(item => item.id === id)?.name || id} · ${isMobile() ? 'Tap the ground to place' : 'Click ground to place · R to rotate'}`);
  }
  renderLibrary();
  if (isMobile()) { closeLibrary(); $('#context-panel').hidden = true; $('#inspector').hidden = true; }
}
function openLibrary() { $('#library-panel').classList.add('open'); $('#context-panel').hidden = true; $('#inspector').hidden = true; }
function closeLibrary() { $('#library-panel').classList.remove('open'); }
function setHint(text) { $('#tool-hint-text').textContent = text; }
function syncTool(tool) {
  primaryTool = ['build','wall','floor','road'].includes(tool) ? 'build' : ['select','move','erase'].includes(tool) ? 'select' : tool;
  $$('[data-tool]').forEach(button => { const active = button.dataset.tool === primaryTool; button.classList.toggle('active', active); button.setAttribute('aria-pressed', active); });
  $('.studio').classList.toggle('exploring', tool === 'explore');
  $('#explore-ui').hidden = tool !== 'explore';
  if (tool === 'explore') { closeLibrary(); $('#context-panel').hidden = true; $('#inspector').hidden = true; $('.scene-controls').classList.remove('open'); }
  const libraryButton = $('#mobile-library-toggle');
  const label = tool === 'sculpt' ? 'Brush settings' : tool === 'paint' ? 'Materials' : 'Assets';
  libraryButton.innerHTML = `${icon(tool === 'sculpt' ? 'mountain' : tool === 'paint' ? 'layers' : 'box')}<span>${label}</span>`;
}
function chooseTool(tool) {
  if (!engine) return;
  const sameTool = primaryTool === tool;
  if (tool === 'select') { engine.setTool('select'); closeLibrary(); $('#context-panel').hidden = true; if (engine.getSelected()) showSelection(engine.getSelected()); }
  if (tool === 'build') {
    engine.setTool(buildTool === 'assets' || buildTool === 'stairs' ? 'build' : buildTool);
    if (isMobile() && buildTool === 'assets' && !sameTool) switchLibrary('assets');
    else showContext('build');
    if (!isMobile() && libraryMode !== 'assets') switchLibrary('assets', false);
  }
  if (tool === 'paint') { engine.setTool('paint'); switchLibrary('materials', isMobile()); if (!isMobile() || sameTool) showContext('paint'); }
  if (tool === 'sculpt') { engine.setTool('sculpt'); closeLibrary(); showContext('sculpt'); }
  if (tool === 'explore') { engine.setTool('explore'); }
}
function showContext(tool) {
  $('#context-panel').hidden = false;
  if (isMobile()) closeLibrary();
  $('#inspector').hidden = true;
  $('#build-settings').hidden = tool !== 'build';
  $('#brush-settings').hidden = tool === 'build';
  $('#sculpt-modes').hidden = tool !== 'sculpt';
  $('#context-icon').innerHTML = icon(tool === 'build' ? 'box' : tool === 'sculpt' ? 'mountain' : 'brush');
  $('#context-title').textContent = tool === 'build' ? 'Build something beautiful' : tool === 'sculpt' ? 'Shape the landscape' : MATERIALS.find(item => item.id === selectedMaterial)?.name || 'Paint your world';
  $('#context-subtitle').textContent = tool === 'build' ? 'Draw the structure. Add the details.' : tool === 'sculpt' ? 'A little hill. A whole new horizon.' : 'Choose a surface from the material library.';
  $('#brush-tip').innerHTML = `${icon('info')}${tool === 'sculpt' ? 'Press and move across the ground to shape it.' : 'Brush the ground or tap a model surface to paint it.'}`;
  updateBuildTabs();
}
function updateBuildTabs() {
  $$('[data-build]').forEach(button => button.classList.toggle('active', button.dataset.build === buildTool));
  $('#build-height').closest('label').hidden = buildTool !== 'wall';
  $('#build-width').closest('label').hidden = !['wall','road'].includes(buildTool);
}
function chooseBuildTool(tool) {
  buildTool = tool; updateBuildTabs();
  if (tool === 'assets') { engine.setAsset(selectedAsset); if (isMobile()) switchLibrary('assets'); }
  else if (tool === 'stairs') { selectedAsset = 'stairs'; engine.setAsset('stairs'); setHint('Place a real staircase · Set elevation to build above ground'); if (isMobile()) $('#context-panel').hidden = true; }
  else {
    if (tool === 'road') $('#build-width').value = '4';
    else if (tool === 'wall') $('#build-width').value = '0.3';
    engine.setBuildOptions({width:Number($('#build-width').value)});
    engine.setTool(tool);
    $('#placing-label').textContent = tool === 'wall' ? 'Drag a line to draw a wall' : tool === 'floor' ? 'Drag a rectangle to lay a floor' : 'Draw a path for your street';
  }
}
function showSelection(record) {
  if (!record) { $('#inspector').hidden = true; return; }
  $('#selected-name').textContent = record.name;
  const item = ASSETS.find(asset => asset.id === record.assetId);
  $('#selected-meta').textContent = `${item?.category || 'Structure'}${record.enterable ? ' · Furnished interior' : ''}`;
  for (const axis of ['x','y','z']) $(`#pos-${axis}`).value = Math.round(record.position[axis] * 100) / 100;
  $('#object-rotation').value = Math.round(record.rotation * 10) / 10;
  $('#object-scale').value = Math.round(record.scale * 100) / 100;
  $('#enter-house').hidden = !record.enterable;
  if (engine.tool === 'select' || engine.tool === 'move') { $('#inspector').hidden = false; $('#context-panel').hidden = true; }
}

function showModal(content) { modalReturnFocus = document.activeElement; $('#modal-content').innerHTML = content; $('#modal-backdrop').hidden = false; hydrateIcons($('#modal')); $('#project-menu').hidden = true; $('#project-menu-button').setAttribute('aria-expanded','false'); requestAnimationFrame(() => ($('#modal input') || $('#modal button')).focus()); }
function closeModal() { $('#modal-backdrop').hidden = true; if (modalReturnFocus?.isConnected) modalReturnFocus.focus(); }
function showHelp() {
  showModal(`<span class="eyebrow">WELCOME TO YOUR WORLD</span><h2>A little imagination.<br>Endless possibilities.</h2><p class="modal-intro">Draw a street, build a home, shape a hillside. Everything in your world is yours to change.</p><div class="help-grid">${[
    ['mouse','Find your perspective','Drag to orbit; scroll to zoom. Use two fingers to move around while creating on a phone.'],
    ['box','Build a place','Choose an asset and tap the ground. Use Wall, Floor and Road to draw custom structures.'],
    ['brush','Make it feel real','Choose a PBR surface, then brush the landscape or tap a model surface.'],
    ['mountain','Shape the landscape','Raise, lower, flatten or smooth. Brush size and strength give you control.'],
    ['door','Step inside','Select a house, then Step inside. Hide roofs to furnish your rooms from above.'],
    ['save','Keep your world','Changes save on this device. Export a project to back it up or open it elsewhere.'],
  ].map(([i,title,text]) => `<div class="help-item"><span>${icon(i)}</span><div><strong>${title}</strong><p>${text}</p></div></div>`).join('')}</div><div class="keyboard-help"><span><kbd>V B P S E</kbd> Main tools</span><span><kbd>R</kbd> Rotate object</span><span><kbd>⌘ / Ctrl Z</kbd> Undo</span><span><kbd>H</kbd> Fit world</span><span><kbd>WASD</kbd> Walk in Explore</span><span><kbd>ESC</kbd> Return to select</span></div><p class="modal-note">Build upper floors using Elevation. Set walls around doorways, add windows, then place a roof. Objects can be moved precisely in their properties.</p><div class="modal-actions"><button class="modal-primary" id="help-done">Let's make something</button></div>`);
  $('#help-done').addEventListener('click', closeModal);
}
function showNewWorld() {
  showModal(`<span class="eyebrow">A NEW BEGINNING</span><h2>What will you make?</h2><p>Your current world can be restored with Undo. Export a copy first if you want to keep it separately.</p><div class="world-options"><button class="world-option" id="new-blank"><span>${icon('mountain')}</span><strong>A blank landscape</strong><p>A sculptable island, ready for your first idea.</p></button><button class="world-option" id="new-starter"><span>${icon('home')}</span><strong>Seaside village</strong><p>A furnished Mediterranean neighbourhood to make your own.</p></button></div>`);
  $('#new-blank').addEventListener('click', () => { engine.newWorld(); setName('My little world'); engine.setTool('select'); closeModal(); closeLibrary(); markDirty(); toast('A fresh landscape. What will you build first?'); });
  $('#new-starter').addEventListener('click', () => { engine.resetStarter(); setName('Seaside village'); engine.setTool('select'); closeModal(); closeLibrary(); markDirty(); toast('Your seaside village is ready to explore.'); });
}
function renameWorld() {
  showModal(`<span class="eyebrow">MAKE IT YOURS</span><h2>Give your world a name.</h2><p>A place worth imagining deserves a name.</p><input class="modal-input" id="world-name-input" maxlength="60" aria-label="World name" value="${escapeHTML(currentName)}"/><div class="modal-actions"><button class="modal-secondary" id="rename-cancel">Cancel</button><button class="modal-primary" id="rename-confirm">Save name</button></div>`);
  const confirm = () => { setName($('#world-name-input').value); markDirty(); closeModal(); };
  $('#rename-confirm').addEventListener('click', confirm); $('#rename-cancel').addEventListener('click', closeModal);
  $('#world-name-input').addEventListener('keydown', e => { if (e.key === 'Enter') confirm(); });
}
function download(data, name, type) {
  const url = typeof data === 'string' && data.startsWith('data:') ? data : URL.createObjectURL(new Blob([data], {type}));
  const link = document.createElement('a'); link.href = url; link.download = name; document.body.appendChild(link); link.click(); link.remove();
  if (url.startsWith('blob:')) setTimeout(() => URL.revokeObjectURL(url), 10000);
}
function filename() { return currentName.toLowerCase().replace(/[^a-z0-9\u0370-\u03ff]+/g,'-').replace(/^-|-$/g,'') || 'my-world'; }
function exportWorld() { download(JSON.stringify(projectDocument()), `${filename()}.draw.json`, 'application/json'); toast('Project exported. Open it in DRAW on another device.'); }
function captureWorld() { download(engine.takeSnapshot(), `${filename()}.png`, 'image/png'); toast('Your view has been captured.'); }

function wireEvents() {
  $$('[data-tool]').forEach(button => button.addEventListener('click', () => chooseTool(button.dataset.tool)));
  $$('[data-build]').forEach(button => button.addEventListener('click', () => chooseBuildTool(button.dataset.build)));
  $$('[data-library]').forEach(button => button.addEventListener('click', () => switchLibrary(button.dataset.library)));
  $$('[data-view]').forEach(button => button.addEventListener('click', () => { engine.setView(button.dataset.view); $$('[data-view]').forEach(other => { const active = other === button; other.classList.toggle('active', active); other.setAttribute('aria-pressed', active); }); }));
  $$('[data-time]').forEach(button => button.addEventListener('click', () => { engine.setTime(button.dataset.time); markDirty(); }));
  $$('[data-sculpt]').forEach(button => button.addEventListener('click', () => { engine.setBrush({mode:button.dataset.sculpt}); $$('[data-sculpt]').forEach(other => other.classList.toggle('active', other === button)); }));
  $('#asset-search').addEventListener('input', renderLibrary);
  $('#clear-search').addEventListener('click', () => { $('#asset-search').value = ''; category = libraryMode === 'assets' ? 'All' : 'All materials'; renderCategories(); renderLibrary(); });
  $('.close-sheet').addEventListener('click', closeLibrary);
  $('#mobile-library-toggle').addEventListener('click', () => { if (primaryTool === 'sculpt') { if ($('#context-panel').hidden) showContext('sculpt'); else $('#context-panel').hidden = true; } else if ($('#library-panel').classList.contains('open')) closeLibrary(); else switchLibrary(primaryTool === 'paint' ? 'materials' : 'assets'); });
  $('#context-close').addEventListener('click', () => $('#context-panel').hidden = true);
  $('#close-inspector').addEventListener('click', () => { $('#inspector').hidden = true; engine.select(null); });
  $('#undo').addEventListener('click', () => { if (engine.undo()) toast('Last change undone.'); });
  $('#redo').addEventListener('click', () => { if (engine.redo()) toast('Change restored.'); });
  $('#save').addEventListener('click', () => saveWorld(true));
  $('#help').addEventListener('click', showHelp);
  $('#camera-home').addEventListener('click', () => { engine.home(); $$('[data-view]').forEach(b => { b.classList.toggle('active',b.dataset.view === 'perspective'); b.setAttribute('aria-pressed', b.dataset.view === 'perspective'); }); });
  $('#zoom-in').addEventListener('click', () => engine.zoom(1.2));
  $('#zoom-out').addEventListener('click', () => engine.zoom(1/1.2));
  $('#grid-toggle').addEventListener('change', e => { engine.toggleGrid(e.target.checked); markDirty(); });
  $('#roof-toggle').addEventListener('change', e => { engine.toggleRoofs(e.target.checked); markDirty(); });
  $('#living-toggle').addEventListener('change', e => { engine.setLiving(e.target.checked); markDirty(); });
  $('#scene-toggle').addEventListener('click', () => { const open = $('.scene-controls').classList.toggle('open'); $('#scene-toggle').setAttribute('aria-expanded', open); });
  for (const axis of ['x','y','z']) $(`#pos-${axis}`).addEventListener('change', e => engine.updateSelected({position:{[axis]:Number(e.target.value)}}));
  $('#object-rotation').addEventListener('change', e => engine.updateSelected({rotation:Number(e.target.value)}));
  $('#object-scale').addEventListener('change', e => engine.updateSelected({scale:Number(e.target.value)}));
  $('#duplicate-object').addEventListener('click', () => engine.duplicateSelected());
  $('#move-object').addEventListener('click', () => { engine.setTool('move'); $('#inspector').hidden = true; toast('Drag the object to move it. Choose Select to orbit again.'); });
  $('#rotate-object').addEventListener('click', () => engine.rotateSelected());
  $('#delete-object').addEventListener('click', () => engine.deleteSelected());
  $('#enter-house').addEventListener('click', () => engine.enterSelected());
  $('#exit-explore').addEventListener('click', () => { engine.exitExplore(); showSelection(engine.getSelected()); });
  for (const [id,key] of [['build-height','height'],['build-width','width'],['build-elevation','elevation']]) $(`#${id}`).addEventListener('change', e => engine.setBuildOptions({[key]:Number(e.target.value)}));
  $('#snap-toggle').addEventListener('change', e => engine.setBuildOptions({snap:e.target.checked}));
  $('#rotate-placement').addEventListener('click', rotatePlacement);
  $('#brush-size').addEventListener('input', e => { engine.setBrush({size:Number(e.target.value)}); $('#brush-size-output').textContent = `${e.target.value} m`; });
  $('#brush-strength').addEventListener('input', e => { engine.setBrush({strength:Number(e.target.value)}); $('#brush-strength-output').textContent = `${Math.round(e.target.value * 100)}%`; });
  $('#project-menu-button').addEventListener('click', () => { const open = $('#project-menu').hidden; $('#project-menu').hidden = !open; $('#project-menu-button').setAttribute('aria-expanded', open); });
  document.addEventListener('pointerdown', e => { if (!e.target.closest('#project-menu') && !e.target.closest('#project-menu-button')) { $('#project-menu').hidden = true; $('#project-menu-button').setAttribute('aria-expanded', 'false'); } });
  const actions = {rename:renameWorld,new:showNewWorld,export:exportWorld,import:() => $('#import-file').click(),snapshot:captureWorld,help:showHelp};
  $$('[data-action]').forEach(button => button.addEventListener('click', () => { $('#project-menu').hidden = true; actions[button.dataset.action]?.(); }));
  $('#import-file').addEventListener('change', async e => {
    const file = e.target.files[0]; if (!file) return;
    try {
      if (file.size > 20000000) throw new Error('Choose a DRAW project smaller than 20 MB.');
      const data = JSON.parse(await file.text());
      const world = data.world || data;
      engine.load(world); setName(data.name || 'Imported world'); engine.setTool('select'); updateState(); markDirty(); toast('Your world is open. Make yourself at home.');
    } catch (error) { toast(error.message || 'This file could not be opened.', true); }
    e.target.value = '';
  });
  $('#capture').addEventListener('click', captureWorld);
  $('#fullscreen').addEventListener('click', async () => {
    try { if (document.fullscreenElement) await document.exitFullscreen(); else if (document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen(); else toast('Add DRAW to your Home Screen for a full-screen experience.'); } catch { toast('Full-screen mode is not available in this browser.'); }
  });
  $('#modal-close').addEventListener('click', closeModal);
  $('#modal-backdrop').addEventListener('click', e => { if (e.target === $('#modal-backdrop')) closeModal(); });
  const directions = new Set();
  const updateWalk = () => engine.setWalkInput({x:(directions.has('right')?1:0)-(directions.has('left')?1:0),z:(directions.has('back')?1:0)-(directions.has('forward')?1:0)});
  $$('[data-walk]').forEach(button => {
    button.addEventListener('pointerdown', e => { e.preventDefault(); button.setPointerCapture(e.pointerId); directions.add(button.dataset.walk); updateWalk(); });
    const end = e => { directions.delete(button.dataset.walk); updateWalk(); };
    button.addEventListener('pointerup', end); button.addEventListener('pointercancel', end); button.addEventListener('lostpointercapture', end);
  });
  window.addEventListener('blur', () => { directions.clear(); updateWalk(); });
  document.addEventListener('keydown', handleKeys);
  document.addEventListener('visibilitychange', () => { if (document.hidden && dirty) saveWorld(); });
  matchMedia('(max-width:700px)').addEventListener('change', () => { closeLibrary(); $('#context-panel').hidden = true; });
}
function rotatePlacement() { rotation = (rotation + 45) % 360; engine.setBuildOptions({rotation}); $('#placement-angle').textContent = `${rotation}°`; }
function handleKeys(e) {
  const editing = /INPUT|TEXTAREA|SELECT/.test(e.target.tagName) || e.target.isContentEditable;
  if (!$('#modal-backdrop').hidden) {
    if (e.key === 'Escape') { e.preventDefault(); closeModal(); }
    if (e.key === 'Tab') { const focusable = $$('button,input,[tabindex="0"]', $('#modal')).filter(el => !el.disabled && el.offsetParent !== null); const first = focusable[0], last = focusable.at(-1); if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); } else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); } }
    return;
  }
  if ((e.ctrlKey || e.metaKey) && !editing) {
    if (e.key.toLowerCase() === 'z') { e.preventDefault(); e.shiftKey ? engine.redo() : engine.undo(); }
    if (e.key.toLowerCase() === 's') { e.preventDefault(); saveWorld(true); }
    if (e.key.toLowerCase() === 'd') { e.preventDefault(); engine.duplicateSelected(); }
    return;
  }
  if (editing) return;
  if (e.key === 'Escape') { engine.setTool('select'); closeLibrary(); $('#context-panel').hidden = true; $('#project-menu').hidden = true; return; }
  if (engine.tool === 'explore') return;
  const key = e.key.toLowerCase();
  const map = {v:'select',b:'build',p:'paint',s:'sculpt',e:'explore'};
  if (map[key]) { e.preventDefault(); chooseTool(map[key]); }
  if (key === 'r') { e.preventDefault(); primaryTool === 'build' ? rotatePlacement() : engine.rotateSelected(); }
  if (key === 'h') engine.home();
  if (key === 'm') { engine.setTool('move'); toast('Drag an object to move it. V returns to orbit.'); }
  if (key === '?' || key === 'f1') { e.preventDefault(); showHelp(); }
  if (key === '/') { e.preventDefault(); if (isMobile()) openLibrary(); $('#asset-search').focus(); }
  if (key === 'delete' || key === 'backspace') { e.preventDefault(); engine.deleteSelected(); }
  if (key === ' ') e.preventDefault();
}

async function start() {
  try {
    const [textures, saved] = await Promise.all([preloadMaterials(), readSavedWorld()]);
    engine = new WorldEngine($('#viewport'));
    engine.setBrush({size:4,strength:.6,mode:'raise'});
    engine.setBuildOptions({height:3,width:.3,snap:true,elevation:0,rotation:0});
    engine.addEventListener('change', event => { updateState(event.detail); markDirty(); });
    engine.addEventListener('settings', event => updateState(event.detail));
    engine.addEventListener('selection', event => showSelection(event.detail));
    engine.addEventListener('tool', event => syncTool(event.detail));
    engine.addEventListener('hint', event => setHint(event.detail));
    engine.addEventListener('stats', event => { $('#fps-counter').textContent = `${event.detail.fps} FPS · LIVE 3D`; $('#fps-counter').title = `${event.detail.drawCalls} draw calls · ${event.detail.triangles.toLocaleString()} triangles`; });
    engine.addEventListener('error', event => toast(event.detail, true));
    wireEvents();
    if (saved?.world) {
      try { engine.load(saved.world); setName(saved.name); } catch (error) { toast('Your previous project could not be restored. The starter world is ready.', true); console.warn(error); }
    }
    initialized = true;
    updateState();
    $('#asset-total').textContent = ASSETS.length;
    renderCategories();
    renderLibrary();
    $('#loading').classList.add('done');
    setTimeout(() => $('#loading').hidden = true, 550);
    if (!saved?.world) saveWorld();
    else setSaveStatus('Saved on this device');
    if (textures.failed?.length) toast('Some scanned surfaces could not load. Original textured materials remain available.', true);
  } catch (error) {
    console.error('DRAW startup:', error);
    $('#loading').innerHTML = `<div class="loading-mark">d<span>.</span></div><h2>Let's get your world running.</h2><p style="padding:0 30px;text-align:center;max-width:450px;line-height:1.7">${escapeHTML(error.message || 'Your browser could not start the 3D renderer. Try a browser with WebGL 2 support.')}</p><button class="modal-primary" style="margin-top:25px" id="retry-load">Try again</button>`;
    $('#retry-load').addEventListener('click', () => location.reload());
  }
}

start();
