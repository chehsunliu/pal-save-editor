type PlayerKey = "li" | "zhao" | "lin" | "queen" | "anu" | "dummy";

export interface Save {
  saveCount: number;
  playerCount: number;
  money: number;
  players: Record<PlayerKey, Player>;
}

interface Player {
  stat: {
    level: number;
    maxHealth: number;
    maxMana: number;
    health: number;
    mana: number;
    attackDamage: number;
    abilityPower: number;
    resistance: number;
    movement: number;
    luck: number;
  };
  equipment: {
    helm: number;
    cloak: number;
    bodyArmor: number;
    weapon: number;
    boots: number;
    charm: number;
  };
}

const loadPlayer = (data: DataView): Player[] => {
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
        stat: {
          level,
          maxHealth,
          maxMana,
          health,
          mana,
          attackDamage,
          abilityPower,
          resistance,
          movement,
          luck,
        },
        equipment: {
          helm,
          cloak,
          bodyArmor,
          weapon,
          boots,
          charm,
        },
      };
    });
};

export const load = (buffer: ArrayBuffer): Save => {
  const data = new DataView(buffer);
  const players: Player[] = loadPlayer(data);

  return {
    saveCount: data.getUint16(0x0000, true),
    playerCount: data.getUint16(0x0006, true) + 1,
    money: data.getUint32(0x0028, true),
    players: {
      li: players[0],
      zhao: players[1],
      lin: players[2],
      queen: players[3],
      anu: players[4],
      dummy: players[5],
    },
  };
};