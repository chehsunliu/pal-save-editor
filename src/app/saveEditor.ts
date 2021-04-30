type PlayerKey = "li" | "zhao" | "lin" | "queen" | "anu" | "dummy";

export interface Save {
  saveCount: number;
  playerCount: number;
  money: number;
  stats: Record<PlayerKey, Stat>;
}

interface Stat {
  level: number;
  maxHealth: number;
  maxMana: number;
  health: number;
  mana: number;
  helm: number;
  cloak: number;
  bodyArmor: number;
  weapon: number;
  boots: number;
  charm: number;
  attackDamage: number;
  abilityPower: number;
  resistance: number;
  movement: number;
  luck: number;
}

const loadStats = (data: DataView): Stat[] => {
  const playerCount = 6;

  return Array(playerCount)
    .fill(0)
    .map((_, index) => {
      const playerOffset = 2 * index;

      const blocks = Array(17)
        .fill(0)
        .map((_, blockIndex) => data.getUint16(0x0244 + playerOffset + blockIndex * playerCount * 2, true));

      const [
        level,
        maxHealth,
        maxMana,
        health,
        mana,
        helm,
        cloak,
        bodyArmor,
        weapon,
        boots,
        charm,
        attackDamage,
        abilityPower,
        resistance,
        movement,
        luck,
      ] = blocks;

      return {
        level,
        maxHealth,
        maxMana,
        health,
        mana,
        helm,
        cloak,
        bodyArmor,
        weapon,
        boots,
        charm,
        attackDamage,
        abilityPower,
        resistance,
        movement,
        luck,
      };
    });
};

export const load = (buffer: ArrayBuffer): Save => {
  const data = new DataView(buffer);
  const stats: Stat[] = loadStats(data);

  return {
    saveCount: data.getUint16(0x0000, true),
    playerCount: data.getUint16(0x0006, true) + 1,
    money: data.getUint32(0x0028, true),
    stats: {
      li: stats[0],
      zhao: stats[1],
      lin: stats[2],
      queen: stats[3],
      anu: stats[4],
      dummy: stats[5],
    },
  };
};
