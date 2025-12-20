
function getSpeedLabel(speed) {
  if (speed >= 100) return 'extremely fast';
  if (speed >= 80) return 'very fast';
  if (speed >= 60) return 'moderately fast';
  return 'slow';
}

function getAttackLabel(attack) {
  if (attack >= 100) return 'very strong attack';
  if (attack >= 80) return 'strong attack';
  if (attack >= 60) return 'moderate attack';
  return 'low attack power';
}

function getDefenseLabel(defense) {
  if (defense >= 100) return 'excellent defense';
  if (defense >= 80) return 'strong defense';
  if (defense >= 60) return 'decent defense';
  return 'low defensive strength';
}

function getBattleStyle(stats) {
  const { attack, defense, speed } = stats;

  if (speed >= 90 && attack >= 70) return 'fast offensive battles';
  if (defense >= 90) return 'defensive and endurance-based battles';
  if (attack >= 90) return 'aggressive attacking strategies';

  return 'balanced battle situations';
}

/**
 * Main description generator
 */
function generateDescription(pokemon) {
  const { name, types, stats } = pokemon;

  const speedDesc = getSpeedLabel(stats.speed);
  const attackDesc = getAttackLabel(stats.attack);
  const defenseDesc = getDefenseLabel(stats.defense);
  const battleStyle = getBattleStyle(stats);

  const typeText = types.join(' and ');

  return `${capitalize(name)} is a ${typeText} type Pokémon known for its ${speedDesc} speed and ${attackDesc}. 
It has ${defenseDesc} and performs best in ${battleStyle}.`;
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

module.exports = {
  generateDescription
};
