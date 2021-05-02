export const characterKeys = ["li", "zhao", "lin", "queen", "anu", "dummy"] as const;
export type CharacterKey = typeof characterKeys[number];

export interface Save {
  gameProgress: GameProgress;
  characters: Characters;
  inventory: Item[];
}

export interface GameProgress {
  saveCount: number;
  memberCount: number;
  money: number;
}

export type Characters = Record<CharacterKey, Character>;

export interface Character {
  stat: CharacterStat;
  equipment: {
    helm: number;
    cloak: number;
    bodyArmor: number;
    weapon: number;
    boots: number;
    charm: number;
  };
  abilities: number[];
}

export interface CharacterStat {
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
}

interface Item {
  id: number;
  count: number;
  used: number;
}

const loadCharacters = (data: DataView): Character[] => {
  const characterCount = 6;

  return Array(characterCount)
    .fill(0)
    .map((_, index) => {
      const characterOffset = 2 * index;

      const statBlocks = Array(17)
        .fill(0)
        .map((_, statBlockIndex) =>
          data.getUint16(0x0244 + characterOffset + statBlockIndex * characterCount * 2, true)
        );

      const abilities = Array(32)
        .fill(0)
        .map((_, abilityIndex) => data.getUint16(0x037c + characterOffset + abilityIndex * characterCount * 2, true))
        .filter((ability) => ability !== 0);

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
      ] = statBlocks;

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
        abilities,
      };
    });
};

const loadInventory = (data: DataView): Item[] => {
  return Array(256)
    .fill(0)
    .map((_, index) => ({
      id: data.getUint16(0x06c0 + index * 6, true),
      count: data.getUint16(0x06c2 + index * 6, true),
      used: data.getUint16(0x06c4 + index * 6, true),
    }))
    .filter((item) => item.id !== 0);
};

export const load = (buffer: ArrayBuffer): Save => {
  const data = new DataView(buffer);
  const characters: Character[] = loadCharacters(data);

  return {
    gameProgress: {
      saveCount: data.getUint16(0x0000, true),
      memberCount: data.getUint16(0x0006, true),
      money: data.getUint32(0x0028, true),
    },
    characters: {
      li: characters[0],
      zhao: characters[1],
      lin: characters[2],
      queen: characters[3],
      anu: characters[4],
      dummy: characters[5],
    },
    inventory: loadInventory(data),
  };
};
