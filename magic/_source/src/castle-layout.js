export const existingRooms = [
  { id: 'courtyard', label: 'Αυλή', x: -12, z: 4, w: 24, d: 16, enemies: 6 },
  { id: 'hall', label: 'Αίθουσα', x: -10, z: -10, w: 20, d: 14, enemies: 5 },
  { id: 'crypt', label: 'Κρύπτη / κειμήλιο', lines: ['Κρύπτη', 'κειμήλιο'], x: -7, z: -23, w: 14, d: 13, enemies: 4, boss: 1 },
  { id: 'bridge', label: 'Γέφυρα', x: -2.7, z: 20, w: 5.4, d: 7, enemies: 0 },
];
export const newRooms = [
  { id: 'armoury', label: 'Οπλοστάσιο', x: -32, z: -8, w: 18, d: 14, enemies: 5 },
  { id: 'barracks', label: 'Στρατώνες', x: 14, z: -8, w: 18, d: 14, enemies: 6 },
  { id: 'prison', label: 'Φυλακή', x: -25, z: -24, w: 14, d: 12, enemies: 4 },
  { id: 'ritual', label: 'Αίθουσα τελετής', lines: ['Αίθουσα', 'τελετής'], x: 11, z: -24, w: 14, d: 12, enemies: 4, boss: 2 },
  { id: 'library', label: 'Βιβλιοθήκη', x: -48, z: -11, w: 14, d: 16, enemies: 4 },
  { id: 'forge', label: 'Σιδηρουργείο', x: -49, z: -29, w: 16, d: 14, enemies: 5, boss: 3 },
  { id: 'catacombs', label: 'Κατακόμβες', x: -7, z: -40, w: 14, d: 13, enemies: 5 },
  { id: 'sanctum', label: 'Άδυτο', x: 11, z: -44, w: 18, d: 14, enemies: 4, boss: 4 },
  { id: 'gallery', label: 'Στοά', x: 34, z: -11, w: 14, d: 16, enemies: 4 },
  { id: 'watchtower', label: 'Φυλάκιο', x: 33, z: -29, w: 16, d: 14, enemies: 4 },
  { id: 'gatehouse', label: 'Φρουραρχείο', x: -32, z: 9, w: 16, d: 14, enemies: 4 },
];
export const corridors = [
  { x: -14, z: -2, w: 4, d: 3, from: 'armoury', to: 'hall' },
  { x: 10, z: -2, w: 4, d: 3, from: 'hall', to: 'barracks' },
  { x: -11, z: -18, w: 4, d: 3, from: 'prison', to: 'crypt' },
  { x: 7, z: -18, w: 4, d: 3, from: 'crypt', to: 'ritual' },
  { x: -34, z: -2, w: 2, d: 3, from: 'library', to: 'armoury' },
  { x: -33, z: -20, w: 8, d: 3, from: 'forge', to: 'prison' },
  { x: -43, z: -15, w: 3, d: 4, from: 'forge', to: 'library' },
  { x: 32, z: -2, w: 2, d: 3, from: 'barracks', to: 'gallery' },
  { x: 25, z: -20, w: 8, d: 3, from: 'ritual', to: 'watchtower' },
  { x: 40, z: -15, w: 3, d: 4, from: 'watchtower', to: 'gallery' },
  { x: -1.5, z: -27, w: 3, d: 4, from: 'catacombs', to: 'crypt' },
  { x: 7, z: -36, w: 4, d: 3, from: 'catacombs', to: 'sanctum' },
  { x: 16.5, z: -30, w: 3, d: 6, from: 'sanctum', to: 'ritual' },
  { x: -16, z: 15, w: 4, d: 3, from: 'gatehouse', to: 'courtyard' },
  { x: -24, z: 6, w: 3, d: 3, from: 'armoury', to: 'gatehouse', vertical: true },
];
const area = rooms => rooms.reduce((sum, room) => sum + room.w * room.d, 0);
export const layoutMetrics = { existingArea: area(existingRooms), newArea: area(newRooms) + area(corridors),
  proposedArea: area([...existingRooms, ...newRooms, ...corridors]), doorWidth: 3,
  mainRooms: existingRooms.length - 1 + newRooms.length,
  ordinaryEnemies: [...existingRooms, ...newRooms].reduce((sum, room) => sum + room.enemies, 0),
  bosses: [...existingRooms, ...newRooms].filter(room => room.boss).length,
  newConnections: corridors.length };

export function drawLayout(element) {
  const svg = [];
  svg.push('<svg xmlns="http://www.w3.org/2000/svg" viewBox="-53 -49 106 80" role="img" aria-label="Προτεινόμενη κάτοψη δεκατεσσάρων δωματίων, 64 εχθρών και τεσσάρων bosses">');
  svg.push('<defs><pattern id="tiles" width="2" height="2" patternUnits="userSpaceOnUse"><path d="M2 0H0V2" fill="none" stroke="#93a9b6" stroke-opacity=".08" stroke-width=".07"/></pattern></defs>');
  const rect = (r, fill, edge) => `<rect x="${r.x}" y="${r.z}" width="${r.w}" height="${r.d}" rx=".12" fill="${fill}" stroke="${edge}" stroke-width=".28"/>`;
  for (const r of existingRooms) svg.push(rect(r, '#334552', '#99b3c1'));
  for (const r of newRooms) svg.push(rect(r, '#2b5046', '#9edec7'));
  for (const r of [...existingRooms, ...newRooms]) svg.push(`<rect x="${r.x}" y="${r.z}" width="${r.w}" height="${r.d}" fill="url(#tiles)"/>`);
  for (const c of corridors) {
    const vertical = c.vertical || c.w === 3 && c.d !== 3;
    const x = c.x - (vertical ? 0 : .18), z = c.z - (vertical ? .18 : 0);
    svg.push(`<rect x="${x}" y="${z}" width="${c.w + (vertical ? 0 : .36)}" height="${c.d + (vertical ? .36 : 0)}" fill="#2b5046"/>`);
    svg.push(vertical
      ? `<path d="M${c.x} ${c.z}v${c.d}M${c.x + c.w} ${c.z}v${c.d}" stroke="#9edec7" stroke-width=".28" fill="none"/>`
      : `<path d="M${c.x} ${c.z}h${c.w}M${c.x} ${c.z + c.d}h${c.w}" stroke="#9edec7" stroke-width=".28" fill="none"/>`);
  }
  for (const z of [-10, 4, 20]) svg.push(`<path d="M-2.35 ${z}h4.7" stroke="#334552" stroke-width=".65"/>`);
  svg.push('<path d="M0 25V-19" fill="none" stroke="#adc7d4" stroke-width=".1" stroke-dasharray=".4 .45"/>');
  for (const r of [...existingRooms, ...newRooms]) {
    const cx = r.x + r.w / 2, cz = r.z + r.d / 2, lines = r.lines || [r.label];
    if (r.id === 'bridge') {
      svg.push(`<text x="${cx}" y="${cz}" text-anchor="middle" fill="#edf5f1" font-family="system-ui,sans-serif" font-size="1.45" font-weight="650">${r.label}</text>`);
      continue;
    }
    const first = cz - (lines.length > 1 ? 2.1 : 1.6);
    for (let i = 0; i < lines.length; i++) svg.push(`<text x="${cx}" y="${first + i * 1.8}" text-anchor="middle" fill="#edf5f1" font-family="system-ui,sans-serif" font-size="1.65" font-weight="650">${lines[i]}</text>`);
    const details = lines.length > 1 ? cz + 1.8 : cz + .4;
    svg.push(`<text x="${cx}" y="${details}" text-anchor="middle" fill="#c0d3cc" font-family="system-ui,sans-serif" font-size="1.45">${r.w} × ${r.d} m</text>`);
    svg.push(`<text x="${cx}" y="${details + 1.9}" text-anchor="middle" fill="#c0d3cc" font-family="system-ui,sans-serif" font-size="1.45">${r.enemies} εχθροί${r.boss ? ' + boss ' + r.boss : ''}</text>`);
    if (r.boss) svg.push(`<circle cx="${r.x + r.w - 1.8}" cy="${r.z + 1.8}" r=".68" fill="#c891d8"/><text x="${r.x + r.w - 1.8}" y="${r.z + 2.26}" text-anchor="middle" font-family="system-ui,sans-serif" font-size="1.15" font-weight="700" fill="#22162c">${r.boss}</text>`);
  }
  for (const [x, z] of [[-15.1, -.5], [15.1, -.5], [-12.1, -16.5], [12.1, -16.5], [-16.8, 16.5], [-1, -27.8]]) {
    svg.push(`<circle cx="${x}" cy="${z}" r=".45" fill="#efbb70"/>`);
  }
  svg.push('<path d="M0 -21.7l.65 .65L0 -20.4l-.65-.65z" fill="#dbc385"/><circle cx="0" cy="18" r=".5" fill="#a2e8d0"/>');
  svg.push('<g fill="#bbd0db" font-family="system-ui,sans-serif" font-size="1.5"><text x="-49" y="-46">ΒΟΡΡΑΣ ↑</text><text x="-49" y="29">14 ΔΩΜΑΤΙΑ + ΓΕΦΥΡΑ · CONCEPT</text></g>');
  svg.push('<path d="M35 27h10M35 26.5v1M45 26.5v1" stroke="#c2d2db" stroke-width=".12"/><text x="40" y="29.2" fill="#c2d2db" font-family="system-ui,sans-serif" font-size="1.5" text-anchor="middle">10 m</text></svg>');
  element.innerHTML = svg.join('');
}
