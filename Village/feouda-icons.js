// Original SVG heraldry, etched unit portraits and interface marks for ΦΕΟΥΔΑ.
// Every painted definition receives its own id so adjacent inline SVGs stay independent.
let serial = 0;
const factions = {
  player: { main:'#427b9d', dark:'#1d3542', light:'#8fbdcc', name:'Αργυρή Δρυς' },
  red: { main:'#a74c41', dark:'#48231f', light:'#d6937b', name:'Σιδηρούς Λύκος' },
  gold: { main:'#b18b42', dark:'#493921', light:'#ddc180', name:'Οίκος του Ήλιου' },
  neutral: { main:'#868b75', dark:'#333c34', light:'#c1c5a8', name:'Ελεύθερη μεθόριος' }
};
const faction = owner => Object.hasOwn(factions,owner) ? factions[owner] : factions.player;

const marks = {
  crown:'<path d="M3 6l4.2 4L12 4l4.8 6L21 6l-2 12H5L3 6zm3 15h12M5 14h14"/><circle cx="3" cy="5" r="1"/><circle cx="12" cy="3" r="1"/><circle cx="21" cy="5" r="1"/>',
  castle:'<path d="M3 21V8h3v3h3V8h6v3h3V8h3v13H3zM8 8V3h3v3h2V3h3v5M9 21v-5a3 3 0 0 1 6 0v5M5 15h1m12 0h1"/>',
  realm:'<path d="M2 6l6-3 8 3 6-3v15l-6 3-8-3-6 3V6zm6-3v15m8-12v15M10 10l2-2 2 2-2 4-2-4z"/>',
  army:'<path d="M8 21v-5a4 4 0 0 1 8 0v5M9 7V5a3 3 0 0 1 6 0v2l-3 4-3-4zm0-1h6M2 21v-6a3 3 0 0 1 5-2m10 0a3 3 0 0 1 5 2v6M3 9V6h3v3L4.5 11 3 9zm15 0V6h3v3l-1.5 2L18 9zM12 15v6"/>',
  people:'<circle cx="12" cy="7" r="3"/><path d="M6 21v-3a6 6 0 0 1 12 0v3M4 10a3 3 0 0 1 0-6m16 6a3 3 0 0 0 0-6M2 20v-4a4 4 0 0 1 3-4m17 8v-4a4 4 0 0 0-3-4"/>',
  food:'<path d="M3 15c0-5 3-8 9-8s9 3 9 8v4H3v-4zM7 11l-1 3m6-4-1 3m6-2-1 3M6 4l1-2m5 2 1-2m5 2 1-2M3 17h18"/>',
  wood:'<path d="M5 18L15 4c2-2 5-1 6 1s0 4-2 5L9 22M5 18c2-2 6 1 4 4s-6-1-4-4zM7 20h.1M9 16l7-9m-4 11 7-8"/>',
  stone:'<path d="M2 18l4-8 7-2 6 4 3 8H2v-2zM6 10l4 6-2 4m5-12 2 7 7 5m-12-4 5-1M5 7l4-4 8 1 2 4"/>',
  iron:'<path d="M3 9l4-5h11l3 5v8l-4 4H6l-3-4V9zm0 0h18M7 4l2 5v8l-3 4m12-17-3 5v8l2 4M3 17h18"/>',
  money:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="6.5" stroke-dasharray="1 2"/><path d="M15 7c-4-2-6 1-4 5v5m-3-5h6m-6 5h8"/>',
  build:'<path d="M3 21l9-9m1-9 8 8-3 3-8-8 3-3zm1 9-2 2M3 4l3-1 15 15-3 3L3 6V4z"/>',
  research:'<path d="M3 4c4-2 7-1 9 1 2-2 5-3 9-1v15c-4-2-7-1-9 1-2-2-5-3-9-1V4zm9 1v15M6 7l3 1m-3 3 3 1m6-4 3-1m-3 5 3-1"/>',
  scroll:'<path d="M6 3h12a3 3 0 0 1 0 6h-1M6 3a3 3 0 0 0-3 3v1h4V6a3 3 0 0 0-1-3zm1 4v11a3 3 0 0 0 6 0v-1h8v1a3 3 0 0 1-3 3H10m7-15v11M10 8h4m-4 4h4"/>',
  map:'<path d="M2 6l6-3 8 3 6-3v15l-6 3-8-3-6 3V6zm6-3v15m8-12v15M10 13l4-4m-4 0 4 4"/>',
  shield:'<path d="M12 2l9 4v6c0 5-5 9-9 11-4-2-9-6-9-11V6l9-4zm0 3v15M6 9h12"/>',
  sword:'<path d="M4 20l3-3m-2-3 5 5m-3-5L17 3l4-1-1 4L10 17M6 18l-3 3m6-5 9-11"/>',
  bow:'<path d="M4 20C21 20 23 4 8 3l-4 17zm0 0L8 3M3 13h18m-4-3 4 3-4 3"/>',
  horse:'<path d="M5 21c-1-5 1-8 4-10L6 8l4-5 1-2 2 4 4 2 4 6-2 3-5-3-1 8M6 8l3 1m3-4 2 5m3-1h.1M5 21h11"/>',
  ram:'<path d="M3 16h18M4 8l8-5 8 5v8H4V8zm2 0h12M8 8v8m8-8v8M2 12h20M6 8l-1 4m13-4 1 4"/><circle cx="6" cy="20" r="2"/><circle cx="18" cy="20" r="2"/>',
  trebuchet:'<path d="M3 20h18M6 18l5-12 6 12M4 3l15 12m-8-9 5-4m0 0 4 2-2 5-4-2 2-5zM3 3l-1 7 3 2 2-2m4-4v14M4 23v-3m16 3v-3"/>',
  move:'<path d="M12 2v20M2 12h20M8 6l4-4 4 4M8 18l4 4 4-4M6 8l-4 4 4 4m12-8 4 4-4 4"/>',
  attack:'<path d="M4 20l3-3m-2-3 5 5m-3-5L17 3l4-1-1 4L10 17M20 20l-3-3m-3 2 5-5m-6-7L7 2 3 3l1 4 5 5"/>',
  hold:'<path d="M12 2l8 4v6c0 5-4 8-8 10-4-2-8-5-8-10V6l8-4zM9 8v8m6-8v8"/>',
  retreat:'<path d="M11 5l-7 7 7 7M4 12h16m-5-7 6 7-6 7"/>',
  line:'<path d="M2 4h20M4 8v5m4-5v5m4-5v5m4-5v5m4-5v5M4 17v4m4-4v4m4-4v4m4-4v4m4-4v4"/>',
  column:'<path d="M4 2v20M8 4h5m-5 4h5m-5 4h5m-5 4h5m-5 4h5m4-16h4m-4 4h4m-4 4h4m-4 4h4m-4 4h4"/>',
  wedge:'<path d="M12 2v4M8 7v4m8-4v4M4 12v4m8-4v4m8-4v4M2 18v4m6-4v4m8-4v4m6-4v4"/>',
  pause:'<path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>',
  play:'<path d="M7 3l14 9-14 9V3z"/>',
  plus:'<path d="M12 4v16M4 12h16"/>',
  minus:'<path d="M4 12h16"/>',
  close:'<path d="M5 5l14 14M5 19 19 5"/>',
  help:'<circle cx="12" cy="12" r="9"/><path d="M9 8a3 3 0 1 1 5 2c-2 1-2 2-2 3m0 4h.01"/>',
  settings:'<path d="M9 3h6l1 4 4 1 1 5-3 3v4l-6 2-3-3-4-1-2-5 3-3V6l3-3z"/><circle cx="12" cy="12" r="3"/>',
  sound:'<path d="M3 9h4l5-5v16l-5-5H3V9zm13-2a7 7 0 0 1 0 10m3-13a11 11 0 0 1 0 16"/>',
  mute:'<path d="M3 9h4l5-5v16l-5-5H3V9zm13 0 6 6m-6 0 6-6"/>',
  save:'<path d="M4 3h13l4 4v14H3V3h1zm3 0v6h10V3M7 21v-8h10v8M10 5h4"/>',
  download:'<path d="M12 2v13m-5-5 5 5 5-5M3 16v5h18v-5"/>',
  upload:'<path d="M12 16V3M7 8l5-5 5 5M3 16v5h18v-5"/>',
  home:'<path d="M2 11 12 2l10 9M5 9v13h14V9M9 22v-8h6v8M17 6V3h3v6"/>',
  chevron:'<path d="m9 4 8 8-8 8"/>',
  check:'<path d="m4 12 5 5L21 5"/>',
  warning:'<path d="m12 2 11 20H1L12 2zm0 6v6m0 4h.01"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 3M12 3v1m9 8h-1m-8 9v-1m-9-8h1"/>',
  flag:'<path d="M5 22V2m0 2c6-5 8 5 16 0v11c-8 5-10-5-16 0"/>',
  trade:'<path d="M3 7h17m-4-4 4 4-4 4M21 17H4m4-4-4 4 4 4"/>',
  well:'<path d="M3 9l9-7 9 7H3zm3 0v8m12-8v8M3 17h18v5H3v-5zm9-8v7m-3-4h6l-1 5h-4l-1-5zM7 19v3m7-3v3"/>',
  grain:'<path d="M12 23V3m0 8C6 12 4 8 5 5c4 0 7 2 7 6zm0 6c-6 1-8-3-7-6 4 0 7 2 7 6zm0-6c6 1 8-3 7-6-4 0-7 2-7 6zm0 6c6 1 8-3 7-6-4 0-7 2-7 6zM12 3l2-2"/>',
  search:'<circle cx="10" cy="10" r="6"/><path d="m15 15 7 7M7 10a3 3 0 0 1 3-3"/>',
  focus:'<path d="M3 9V3h6m6 0h6v6M3 15v6h6m6 0h6v-6M12 7v10M7 12h10"/>',
  quality:'<path d="m12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6z"/>',
  diamond:'<path d="m12 3 8 9-8 9-8-9 8-9zm0 4v10M8 12h8"/>'
};
const aliases = { spear:'army', cavalry:'horse', archer:'bow', taxes:'money', currency:'money', fort:'castle', technology:'research', menu:'scroll', back:'retreat', expand:'focus' };

export function icon(name, size=24) {
  const key = Object.hasOwn(marks,name) ? name : Object.hasOwn(aliases,name) ? aliases[name] : 'diamond';
  const dimension = Number.isFinite(Number(size)) ? Math.max(8,Math.min(160,Number(size))) : 24;
  return `<svg class="feouda-icon" data-art="icon:${key}:${dimension}" width="${dimension}" height="${dimension}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.55" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${marks[key]}</svg>`;
}

function heraldicMark(owner, color='#dfd0b2') {
  if (owner==='red') return `<path d="m20 33 6-13 7 8 10-9-1 15 9 9-11 4-3 11-10-5-4-10-7-3 9-2-5-5z" fill="${color}"/><path d="m32 35 5 2-5 2m-5 7 8 4m4-21-3 7" fill="none" stroke="#3d2424" stroke-width="2"/>`;
  if (owner==='gold') return `<g stroke="${color}" stroke-width="2"><path d="M32 18v8m0 26v8M11 39h8m26 0h8M17 24l6 6m18 18 6 6M17 54l6-6m18-18 6-6M24 20l3 8m10 22 3 8M13 31l8 3m22 10 8 3M13 47l8-3m22-10 8-3M24 58l3-8m10-22 3-8"/><circle cx="32" cy="39" r="10" fill="${color}"/></g><circle cx="32" cy="39" r="6" fill="none" stroke="#66502d" stroke-width="1"/>`;
  if (owner==='neutral') return `<g fill="none" stroke="${color}" stroke-width="2"><path d="M32 56V23m0 12-10-8m10 16-11-8m11 0 10-8m-10 16 11-8M25 57h14"/><path d="m22 27-2-7 7 3-5 4zm20 0 2-7-7 3 5 4zM21 35l-3-7 7 3-4 4zm22 0 3-7-7 3 4 4z" fill="${color}"/></g>`;
  return `<path d="M30 55V31h4v24l7 3H23l7-3z" fill="${color}"/><path d="m31 44-10-8m12 4 11-9M31 33l-6-9m8 10 5-12" fill="none" stroke="${color}" stroke-width="2.3"/><g fill="${color}"><path d="M24 36c-9 4-14-2-9-7-3-5 4-9 8-4 6-5 12 4 1 11zM36 32c-7-5-4-12 2-11 4-6 10-2 8 3 8 2 4 12-10 8zM29 28c-8-4-7-11-2-12 4-7 11-2 9 3 6 4 2 10-7 9zM41 40c3-6 9-7 11-3 5 3 0 9-4 7-2 5-10 3-7-4z"/></g>`;
}

export function crest(owner='player') {
  const p=faction(owner),id=`fd-crest-${++serial}`;
  return `<svg class="feouda-crest" data-art="crest:${owner}" viewBox="0 0 64 76" width="64" height="76" role="img" aria-label="Έμβλημα: ${p.name}" focusable="false"><defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${p.main}"/><stop offset="1" stop-color="${p.dark}"/></linearGradient></defs><path d="M5 8 32 3 59 8v28c0 18-14 31-27 38C19 67 5 54 5 36V8z" fill="#111719" stroke="#bd9757" stroke-width="1.5"/><path d="m9 12 23-5 23 5v24c0 16-11 27-23 34C20 63 9 52 9 36V12z" fill="url(#${id})" stroke="#dfd0b2" stroke-opacity=".22"/><path d="m10 13 44 39m-44-25 39 34m-34-3 28-42" stroke="#dfd0b2" stroke-opacity=".06" stroke-width="1"/>${heraldicMark(owner)}<path d="m12 12 20-4 20 4M12 49c4 7 11 14 20 19" stroke="#fff4d8" stroke-opacity=".18" fill="none"/></svg>`;
}

function portraitArt(type,p,id) {
  const metal=`url(#${id}-metal)`,cloth=`url(#${id}-cloth)`,dark='#192126',bone='#dfd0b2',edge='#968c79';
  const nail=(x,y)=>`<circle cx="${x}" cy="${y}" r="1.25" fill="#b8ad92" stroke="#141a1e" stroke-width=".5"/>`;
  if(type==='sword')return `<path d="M21 109v-17l9-17 20-6 21 5 14 23v12" fill="${cloth}" stroke="${dark}" stroke-width="2"/><path d="m29 81 9-5 5 33H27l2-28zm35-6 12 10 4 24H60l4-34z" fill="${metal}" stroke="${dark}" stroke-width="1.5"/><path d="m37 68-4-29c1-15 31-23 39-4l1 32-17 15-19-14z" fill="${metal}" stroke="${dark}" stroke-width="2"/><path d="m35 43 20-5 17 3v9l-17-3-19 5z" fill="#10181d"/><path d="m53 25 4 51m-21-20 17-4 20 1M38 64l13-3m12-3 7-1" fill="none" stroke="#d4c7ac" stroke-width="1.2"/><path d="m56 40 1 7m-18 12 3-1m-2 7 3-1m3-7 3-1m-2 7 3-1m13-3 3 1m-3 4 3 1m-3 4 3 1" stroke="#323c40" stroke-width="1.5"/>${nail(39,35)}${nail(67,35)}${nail(56,68)}<path d="m31 78 11 9-9 7m36-16-7 9 12 7M43 87l-3 19m23-16 5 15" fill="none" stroke="${bone}" stroke-opacity=".4"/><path d="m82 101-7-61 3-11 5 10 4 61" fill="${metal}" stroke="${dark}" stroke-width="1.5"/><path d="m72 90 18-2m-9 1 2 16" stroke="#bd9757" stroke-width="3"/><path d="m41 96 15 9 7-17" fill="none" stroke="${p.light}" stroke-opacity=".5"/>`;
  if(type==='archer')return `<path d="m18 109 8-24 15-13 22-1 18 15 8 23" fill="${cloth}" stroke="${dark}" stroke-width="2"/><path d="m29 75-4-27c0-13 10-28 24-31 17 5 28 19 27 32l-5 30-17 13-25-17z" fill="#4e574a" stroke="${dark}" stroke-width="2"/><path d="m35 50 13-17 15 10 4 17-11 18-14-4-8-16" fill="#a99778" stroke="#33352e" stroke-width="1.6"/><path d="m34 47 14-18 18 16-3 4-14-10-15 13m8 20 13 8 8-11" fill="#262f2c"/><path d="m41 52 6-2m10 0 5 2m-8 1-1 10 5 1m-10 5 10 1" fill="none" stroke="#4c473b" stroke-width="1.6"/><path d="m29 77 18 13 26-16M37 82l-5 22m29-21 12 21" fill="none" stroke="#b4b19b" stroke-opacity=".42"/><path d="m29 88 36 21" stroke="#342b22" stroke-width="8"/><path d="m30 87 36 21" stroke="#988164" stroke-width="1.5"/><path d="M81 24c-22 16-26 61-1 82" fill="none" stroke="#171e20" stroke-width="5"/><path d="M81 24c-22 16-26 61-1 82" fill="none" stroke="#b99765" stroke-width="2.5"/><path d="m81 24-2 82M47 67h45m-4-3 5 3-5 3" fill="none" stroke="#dfd0b2" stroke-width=".9"/><path d="m16 66 6-43m-2 1 5-4-1 7m-9 39 2-42m-2-2 4-4v7" stroke="#bdb391" stroke-width="1.2"/>`;
  if(type==='cavalry')return `<path d="m13 82 16-9 37 1 12-27 8-9 1-8 5 8 4 4-2 18-7 8-9 23-7 2-9-3-28 2-10 10H12l12-19" fill="#4c3930" stroke="#141a1e" stroke-width="2"/><path d="m80 52 5-7 2 12 8-2-3 6-8 2-8 22m-3 5 5 18m-45-17-4 18m24-19 5 19m-44-4 3-16" fill="none" stroke="#8f7460" stroke-width="3"/><path d="m84 42 3 1m-8 15 8 10-5 10m-2-18-16 12" stroke="#c4ae81" stroke-width="1.2" fill="none"/><path d="m32 74 17-7 22 9-9 22-17-1-13-23z" fill="${cloth}" stroke="${dark}" stroke-width="1.5"/><path d="m33 90 13 4 14-2m-19-22 7 19" fill="none" stroke="#b6bbad" stroke-opacity=".55"/><path d="m36 68 2-23 17-5 10 10-1 22-12 7-16-11z" fill="${metal}" stroke="${dark}" stroke-width="1.6"/><path d="m39 43-3-14 7-9 13 1 5 13-6 12-16-3z" fill="${metal}" stroke="${dark}" stroke-width="1.6"/><path d="m37 31 21-3 1 6-20 3zm10 8h8" fill="#192327"/><path d="m41 21 6-8 4 2 1 5" fill="${p.main}"/><path d="m36 51-6 13 7 3 7-11m18-6 8 16 10-6" fill="none" stroke="#abaca1" stroke-width="6"/><path d="m31 52 17-5 8 9-4 24-12 4-10-15 1-17z" fill="${cloth}" stroke="#bd9757" stroke-width="1.5"/><path d="M41 52v25m-8-14 17-4" stroke="#dfd0b2" stroke-width="2"/><path d="M70 81 77 9l-3-5-3 6 2 3" fill="none" stroke="#beac80" stroke-width="1.4"/><path d="m76 15 14 5-16 4" fill="${p.main}" stroke="#bd9757" stroke-width=".7"/>`;
  if(type==='ram')return `<path d="m10 70 22-27 53 9 8 27-83-9z" fill="#362a20" stroke="#131c20" stroke-width="2"/><path d="m11 70 20-27 55 9-23 21-52-3z" fill="#72624b" stroke="#141a1e" stroke-width="1.5"/><path d="m18 67 20-23m-8 24 20-22m-8 22 20-20m-8 23 21-22m-10 22 20-20" stroke="#baa782" stroke-opacity=".45"/><path d="m16 75 2 23m42-24 2 24m24-35-1 35M13 96h75" stroke="#221d18" stroke-width="8"/><path d="m16 75 2 21m42-22 2 22m24-33-1 33M13 96h75" stroke="#93764d" stroke-width="4"/><path d="m24 79 47 5m-47-9v14m46-11v14" stroke="#342b23" stroke-width="8"/><path d="m24 77 52 6" stroke="#c0a072" stroke-width="6"/><path d="m73 78 13 3 6 7-7 6-12-7v-9z" fill="${metal}" stroke="#111b21" stroke-width="1.8"/><path d="m29 59 1 18m28-16v19" stroke="#d0bf96" stroke-width="1.2"/><path d="m13 70 51 4 27-21m-27 21v22" stroke="#1a2021" stroke-width="3"/><g fill="#40382b" stroke="#c0a375" stroke-width="2"><circle cx="23" cy="99" r="9"/><circle cx="74" cy="101" r="9"/></g><g stroke="#ae9164" stroke-width="1.5"><path d="m23 91 0 16m-8-8h16m-14-6 12 12m0-12-12 12m57-12v16m-8-8h16m-14-6 12 12m0-12-12 12"/></g><circle cx="23" cy="99" r="2.5" fill="#d7c6a0"/><circle cx="74" cy="101" r="2.5" fill="#d7c6a0"/><path d="m36 54 19 3-5 11-17-2 3-12z" fill="${cloth}" stroke="#bd9757"/><path d="m44 57-1 8m-4-5 9 1" stroke="#dfd0b2" stroke-width="1.4"/>`;
  if(type==='trebuchet')return `<path d="M12 102h76m-63-2 29-57 21 57M41 100l11-57 6 57m-34-9 47 1M52 44v59" fill="none" stroke="#1a2021" stroke-width="7"/><path d="M12 102h76m-63-2 29-57 21 57M41 100l11-57 6 57m-34-9 47 1M52 44v59" fill="none" stroke="#9d8055" stroke-width="3.2"/><path d="M25 15 77 73" stroke="#192124" stroke-width="7"/><path d="M25 15 77 73" stroke="#b49866" stroke-width="3.5"/><path d="m25 15-9 31 6 12 10-3" fill="none" stroke="#c8b68e" stroke-width="1.2"/><path d="m15 45 3 12 8 3 7-6-3-7-15-2z" fill="#4b4030" stroke="#b4a27f" stroke-width="1.2"/><path d="m59 52 11-12 20 12-3 19-12 8-16-27z" fill="#4f4435" stroke="#c5ad80" stroke-width="1.5"/><path d="m69 41 8 20 11-9m-11 9-2 17m-9-19 16 10m-12-24 14 17" fill="none" stroke="#958062" stroke-width="1"/><path d="m24 99 29-35 19 35m-42 0 24-27 12 26" stroke="#6a583e" stroke-width="1.5" fill="none"/><circle cx="53" cy="45" r="5" fill="${metal}" stroke="#1a2225" stroke-width="1.8"/><circle cx="53" cy="45" r="1.3" fill="#2d3638"/><g fill="#453b2d" stroke="#aa926c" stroke-width="1.5"><circle cx="21" cy="106" r="6"/><circle cx="78" cy="106" r="6"/></g><path d="M21 101v10m-5-5h10m52-5v10m-5-5h10M51 82l17 2-5 15-12-2V82z" stroke="#c1ae89" stroke-width="1" fill="${cloth}"/><path d="m56 86 6 1m-4-2-1 10" stroke="#dfd0b2" stroke-width="1.4"/>`;
  return `<path d="M17 111v-16l13-18 21-8 21 9 14 22v11" fill="${cloth}" stroke="${dark}" stroke-width="2"/><path d="m34 72 4-16h27l1 19-15 13-17-16z" fill="#7c796d" stroke="#212a2d" stroke-width="1.5"/><path d="m35 58 6 13m0-14 6 17m0-17 6 17m0-17 6 14m0-16 6 11" stroke="#d3c6ab" stroke-opacity=".45" stroke-width="1"/><path d="m36 46 3-12 14-8 12 10 3 21-9 16-13-4-9-13" fill="#a99475" stroke="#353a35" stroke-width="1.5"/><path d="m31 43 6-14 13-8 13 4 9 16 4 3-1 5-46 2-2-4 4-4z" fill="${metal}" stroke="${dark}" stroke-width="2"/><path d="m52 22 2 24m-19-13 7-5m20 1 5 9M30 47l44-3" fill="none" stroke="#e1d5ba" stroke-opacity=".68" stroke-width="1.3"/><path d="m42 53 6-1m10-1 6 1m-11 0-2 10 6 1m-10 4 11 1" fill="none" stroke="#484237" stroke-width="1.5"/><path d="M21 109 24 29" stroke="#1a2327" stroke-width="5"/><path d="M21 109 24 29" stroke="#b49763" stroke-width="2.2"/><path d="m24 11 6 16-6 10-6-9 6-17z" fill="${metal}" stroke="${dark}" stroke-width="1.2"/><path d="m24 13-1 22" stroke="#e5d7b9" stroke-width=".9"/><path d="m53 85 19-7 16 13-4 20H53V85z" fill="${cloth}" stroke="#bd9757" stroke-width="1.8"/><path d="m70 82-2 29m-12-14 30-2" stroke="#dfd0b2" stroke-width="3"/><path d="m33 81 13 13-3 16m-6-26-10 16" fill="none" stroke="#b6c0b8" stroke-opacity=".35"/>${nail(55,86)}${nail(83,92)}`;
}

export function unitPortrait(type, owner='player') {
  const names={spear:'Λογχοφόρος',sword:'Ξιφομάχος',archer:'Τοξότης',cavalry:'Ιππέας',ram:'Πολιορκητικός κριός',trebuchet:'Καταπέλτης'};
  const key=Object.hasOwn(names,type)?type:'spear',p=faction(owner),id=`fd-unit-${++serial}`;
  return `<svg class="feouda-unit-portrait" data-art="unit:${key}:${owner}" viewBox="0 0 100 116" width="100" height="116" role="img" aria-label="${names[key]}" focusable="false"><defs><linearGradient id="${id}-back" x1="0" y1="0" x2=".8" y2="1"><stop stop-color="#354047"/><stop offset=".65" stop-color="#141d23"/><stop offset="1" stop-color="#0c1216"/></linearGradient><linearGradient id="${id}-metal" x1="0" y1="0" x2="1" y2=".4"><stop stop-color="#535f63"/><stop offset=".42" stop-color="#d7cfb9"/><stop offset=".55" stop-color="#a5aaa1"/><stop offset="1" stop-color="#39494f"/></linearGradient><linearGradient id="${id}-cloth" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${p.main}"/><stop offset="1" stop-color="${p.dark}"/></linearGradient><linearGradient id="${id}-vignette" x1="0" y1="0" x2="0" y2="1"><stop offset=".7" stop-color="#10171b" stop-opacity="0"/><stop offset="1" stop-color="#10171b" stop-opacity=".75"/></linearGradient><clipPath id="${id}-clip"><path d="M3 3h94v110H3z"/></clipPath></defs><path d="M1 1h98v114H1z" fill="#10171b" stroke="#8b7552" stroke-width="1"/><g clip-path="url(#${id}-clip)"><path d="M3 3h94v110H3z" fill="url(#${id}-back)"/><path d="m-15 100 90-110m-74 121 90-110m-64 122 90-110m-114 95 90-110m-38 126 90-110" stroke="#e3d5af" stroke-opacity=".055" stroke-width="8"/><path d="M10 105V46c0-39 80-39 80 0v59" fill="none" stroke="#b89a60" stroke-opacity=".18"/><path d="M14 104V45c0-34 72-34 72 0v59" fill="none" stroke="#b89a60" stroke-opacity=".1"/>${portraitArt(key,p,id)}<path d="M3 3h94v110H3z" fill="url(#${id}-vignette)"/></g><path d="M3 16V3h13m68 0h13v13M3 100v13h13m68 0h13v-13" fill="none" stroke="#cfad70" stroke-width="1.4"/><path d="m8 8 3 3m78 0 3-3M8 108l3-3m78 0 3 3" stroke="#c4aa78" stroke-width="1"/></svg>`;
}

// Original building command portraits: readable silhouettes at small RTS menu sizes.
// These illustrations are interface artwork, independent of the licensed 3D models.
export function buildingPortrait(type) {
 const id=`fd-building-${++serial}`,stone='#b8ac8b',shade='#726e61',wood='#927146',roof='#a87951',dark='#273033',light='#dfcfa8';
 const house=(x=22,y=30,w=38,h=23,r=16)=>`<path d="M${x} ${y}h${w}v${h}H${x}Z" fill="${stone}"/><path d="m${x+w} ${y} 14-8v${h}l-14 8Z" fill="${shade}"/><path d="m${x-5} ${y} ${w/2+5}-${r} ${w/2+5} ${r}Z" fill="${roof}"/><path d="m${x+w/2} ${y-r} 14-8 ${w/2+5} ${r} -14 8Z" fill="#765539"/><path d="M${x+w*.39} ${y+h}v-14a5 5 0 0 1 10 0v14" fill="${dark}"/><path d="M${x+5} ${y+5}h7v8h-7Zm${w-17} 0h7v8h-7Z" fill="#4c534d"/><path d="M${x} ${y+9}h${w}m-${w} 8h${w}" stroke="#807b67" stroke-width=".8"/>`;
 const rock=(x,y,k=1)=>`<path d="m${x} ${y} ${8*k}-${17*k} ${16*k}-${6*k} ${15*k} ${10*k} ${7*k} ${15*k}Z" fill="#939185"/><path d="m${x} ${y} ${22*k}-${11*k} ${24*k} ${13*k}Z" fill="#737769"/><path d="m${x+8*k} ${y-17*k} ${14*k} ${6*k} ${2*k}-${12*k}" fill="${stone}"/>`;
 const wheel=(x,y,r)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#332f26" stroke="#b29360" stroke-width="2.7"/><path d="M${x-r} ${y}h${r*2}m-${r}-${r}v${r*2}m-${r*.7}-${r*1.7} ${r*1.4} ${r*1.4}m-${r*1.4} 0 ${r*1.4}-${r*1.4}" stroke="#b29360" stroke-width="1.4"/><circle cx="${x}" cy="${y}" r="2.5" fill="#c4b080"/>`;
 let art='';
 switch(type){
 case 'houses':art=house(19,34,36,23,17)+`<path d="M51 18V9h7v14" fill="#9d9177"/><path d="M21 34v22m17-22v22m17-22v22m-34-11h34M23 37l13 15m4-15 13 15" stroke="#614b31" stroke-width="2"/>`;break;
 case 'farm':art=`<path d="m7 43 50-14 34 23-53 16Z" fill="#766948"/><path d="m15 45 29 19m-19-22 29 19m-19-22 29 19m-19-22 29 19m-19-22 29 19" stroke="#b4a361" stroke-width="3"/>${house(47,28,22,15,10)}<g stroke="#d4bd63" stroke-width="1.4"><path d="M21 44V29m0 7-4-4m4 9 4-5M31 48V32m0 6-4-4m4 9 4-5M41 52V36m0 6-4-4m4 9 4-5"/></g>`;break;
 case 'lumberyard':art=`<path d="m7 53 35-13 48 12-35 14Z" fill="#617d7b"/>${house(18,29,35,25,12)}${wheel(69,48,14)}<path d="M9 58h37m-35-5h32" stroke="#c0a571" stroke-width="5"/><path d="M10 53h34m-34 5h34" stroke="#665031" stroke-width="1"/>`;break;
 case 'quarry':art=rock(8,49,1.15)+rock(40,47,.8)+`<path d="M59 57V16l22 13M61 18 44 55m17-27h20m-2-1v24" fill="none" stroke="#bc9a62" stroke-width="3"/><path d="m71 51 14-3 8 7-13 6-9-10Z" fill="#c6b99a"/><path d="m13 59 15-4 11 5-14 6-12-7Zm20 0 15-4 11 5-14 6-12-7Z" fill="#b5aa90"/>`;break;
 case 'mine':art=rock(6,55,1.55)+`<path d="m28 53 1-20 11-6 20 7 2 20Z" fill="#141c1c"/><path d="M27 55V32l15-7 20 8v24m-38-26 43 3m-11 20-16 12-12-13" fill="none" stroke="#b08b53" stroke-width="4"/><path d="m38 56-15 9 13 3 20-11Z" fill="#867247"/><path d="m63 60 8-9 12 2 7 9Z" fill="#6c7780"/><path d="m64 57 10 2 7-6" stroke="#bcc1ba" fill="none"/>`;break;
 case 'granary':art=`<path d="M25 53v10m36-10v10" stroke="#675237" stroke-width="4"/>${house(20,29,42,26,19)}<path d="M22 33h38m-38 6h38m-38 6h38m-38 6h38M28 30v25m23-25v25" stroke="#6f5b3d" stroke-width="2"/><path d="m13 59 7-12 6 12-7 4Zm55 0 7-12 6 12-7 4Z" fill="#d0b66b"/>`;break;
 case 'market':art=`<path d="m11 41 18-20h45l15 20Z" fill="#c8b38d"/><path d="m22 41 17-20h12L36 41Zm28 0 11-20h12L65 41Z" fill="#608797"/><path d="M18 40v21m61-21v21m-61-4h62" stroke="#795a35" stroke-width="3"/><path d="M22 49h53v12H22Z" fill="#a48758"/><path d="M27 48v13m9-13v13m10-13v13m10-13v13m10-13v13" stroke="#614e35" stroke-width="1.3"/><path d="M30 48c-9-11 14-12 10 0m7 0c-9-12 13-11 10 0" fill="#ceb66a"/>`;break;
 case 'barracks':art=house(21,34,46,27,15)+`<path d="M14 32h13v28H14Zm50-5h13v27H64Z" fill="#aaa084"/><path d="M12 25h5v5h4v-5h7v11H12Zm50-5h5v5h4v-5h8v11H62Z" fill="#cec0a0"/><path d="M46 35v18l8-3V32Z" fill="#416d84"/><path d="M18 39h5v9h-5m45-16h5v9h-5" fill="#2c3537"/>`;break;
 case 'archery':art=`${house(47,25,25,23,16)}<path d="M18 37v27m20-27v27m-20-11h20" stroke="#967247" stroke-width="3"/><ellipse cx="28" cy="43" rx="14" ry="16" fill="#d5c497" stroke="#8e7447" stroke-width="2"/><ellipse cx="28" cy="43" rx="9" ry="11" fill="#865b48"/><ellipse cx="28" cy="43" rx="4" ry="5" fill="#c5c6ad"/><path d="m9 35 29 14m-6-6 7 7-10-2" fill="none" stroke="#333e40" stroke-width="1.8"/>`;break;
 case 'stable':art=house(15,34,59,23,14)+`<path d="M18 36h53v19H18" fill="#342f27"/><path d="M28 35v23m16-23v23m16-23v23" stroke="#b28f5f" stroke-width="3"/><path d="m35 56 4-12 5-4-1-6 7 7 1 7-7-1-3 12Z" fill="#aa7c55"/><path d="m33 57 11-1m13-8 13 8-1 6-13-5Z" stroke="#d2b870" stroke-width="2"/>`;break;
 case 'siege':art=house(30,32,35,23,15)+`<path d="M31 29V8h10v23" fill="#8d8a75"/><path d="M29 8h14v5H29" fill="#c0b498"/><path d="M19 46h25l-4 6-6 1-1 9H23l1-9-7-2Z" fill="#7d8990" stroke="#303c41"/><path d="m45 40 7 4-3 8-7-2" fill="#c47a36"/>`;break;
 case 'walls':art=`<path d="M10 34h77v24H10Z" fill="#a99e84"/><path d="M10 34h77v7H10Z" fill="#c5b894"/><path d="M8 27h10v8h9v-8h11v8h10v-8h11v8h10v-8h12v8h8v-8h5v14H8Z" fill="#c9bd9e"/><path d="M38 58V43a10 10 0 0 1 20 0v15" fill="#303938"/><path d="M42 43v15m6-20v20m6-16v16" stroke="#816946" stroke-width="2"/><path d="M11 48h23m26 0h26m-64-7v7m51-7v7m-59 0v8m12-8v8m41-8v8m13-8v8" stroke="#797969" stroke-width="1"/>`;break;
 case 'well':art=`<ellipse cx="47" cy="54" rx="26" ry="10" fill="#797a69"/><path d="M21 45v11c9 12 44 12 52 0V45" fill="#aca48b"/><ellipse cx="47" cy="45" rx="26" ry="10" fill="#d1c7a5"/><ellipse cx="47" cy="45" rx="17" ry="5" fill="#344649"/><path d="M28 44V25m36 19V25M23 26l23-17 24 17Z" stroke="#6d5332" stroke-width="3" fill="#a47c48"/><path d="M47 27v21m-6-11h12l-2 11h-7Z" fill="#b79962" stroke="#55452e" stroke-width="1.4"/>`;break;
 case 'infirmary':art=house(33,36,36,23,14)+`<path d="M20 26h21v35H20Z" fill="#baaf92"/><path d="m17 27 13-19 15 19Z" fill="#85624b"/><path d="M27 61V44a4 4 0 0 1 8 0v17" fill="#3d4140"/><path d="M30 12V2m-4 4h8" stroke="#e0c998" stroke-width="1.8"/><path d="M28 31h5v8h-5" fill="#776f5b"/>`;break;
 default:art=house();
 }
 const illustration=`<svg class="feouda-building-portrait" data-art="building:${type}" viewBox="0 0 100 72" width="100" height="72" aria-hidden="true" focusable="false"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#50605a" stop-opacity=".35"/><stop offset="1" stop-color="#101a1d" stop-opacity=".4"/></linearGradient></defs><path d="M1 1h98v70H1Z" fill="url(#${id})"/><ellipse cx="49" cy="61" rx="39" ry="7" fill="#061013" fill-opacity=".4"/><g stroke="#333b34" stroke-width=".65" stroke-linejoin="round">${art}</g></svg>`;
 const photographed=['houses','granary','lumberyard','quarry','mine','market','barracks','archery','stable','siege','well','infirmary'].includes(type);
 if(!photographed)return illustration;
 return `<span class="building-visual" data-static-art="building:${type}">${illustration}<img class="building-thumbnail" data-building-thumbnail="${type}" src="./assets/ui/buildings/${type}.webp" alt="" aria-hidden="true" loading="lazy" decoding="async" width="192" height="144"></span>`;
}
