/** Player identity and movement rules shared by gameplay, saves and the HUD. */
export const MOVEMENT = Object.freeze({
  walk:6.2, sprint:9.6, swimming:.82, acceleration:14,
  ally:6.5, allyScout:7.1, enemy:5.4, enemyScout:6.5,
  catchUp:10.6, farCatchUp:12.2, dodge:14.8
});

export const CORONATION_TERRITORIES = 3;

export function royalProgress(player, camps = []) {
  const territories = new Set(camps.filter(c => c.originalEnemy && c.team === 'ally' && !c.destroyed && !c.underConstruction && (c.hp ?? 1) > 0).map(c => c.id)).size;
  const crowned = player?.crowned === true || territories >= CORONATION_TERRITORIES;
  return {
    crowned, territories, target:CORONATION_TERRITORIES,
    title:crowned?'Βασιλιάς':'Ευγενής',
    detail:crowned?'Κέρδισες το στέμμα ενώνοντας τρία αντίπαλα οχυρά.':'Κράτησε τρία αντίπαλα οχυρά για να στεφθείς βασιλιάς.'
  };
}
