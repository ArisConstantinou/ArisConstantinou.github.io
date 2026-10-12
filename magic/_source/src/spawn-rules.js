export function zoneAt(zones, point) {
  return zones.find(r=>point.x>=r.xMin&&point.x<=r.xMax&&point.z>=r.zMin&&point.z<=r.zMax);
}

// Reject the entire starting room, including footprints that cross its edge.
// Pursuing enemies may still enter it; this rule concerns spawning only.
export function enemySpawnAllowed(point, zones, spawn, radius=.65) {
  const room=zoneAt(zones,spawn);
  return !!room&&(point.x<room.xMin-radius||point.x>room.xMax+radius||point.z<room.zMin-radius||point.z>room.zMax+radius);
}

export function hearthSpawnRooms(zones, spawn) {
  const start=zoneAt(zones,spawn);
  return zones.filter(r=>r.name!==start?.name&&r.name!=='bridge'&&!r.secret);
}
