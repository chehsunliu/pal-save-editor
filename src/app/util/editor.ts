export const characterIds = ["li", "zhao", "lin", "queen", "anu", "dummy"] as const;
export type CharacterId = typeof characterIds[number];

export interface Save {
  gameProgress: GameProgress;
  characters: Characters;
  inventory: Inventory;
}

export interface GameProgress {
  saveCount: number;
  memberCount: number;
  money: number;
}

export type Characters = Record<CharacterId, Character>;

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

export type Inventory = { [id: number]: Item };

export interface Item {
  count: number;
  used: number;
  visible: boolean;
}

const SAVE_COUNT_ADDR = 0x000;
const MEMBER_COUNT_ADDR = 0x0006;
const MONEY_ADDR = 0x0028;
const STATS_ADDR = 0x0244;
const ABILITIES_ADDR = 0x037c;

const loadCharacters = (data: DataView): Character[] => {
  const characterCount = characterIds.length;

  return Array(characterCount)
    .fill(0)
    .map((_, index) => {
      const characterOffset = 2 * index;

      const statBlocks = Array(17)
        .fill(0)
        .map((_, statBlockIndex) =>
          data.getUint16(STATS_ADDR + characterOffset + statBlockIndex * characterCount * 2, true)
        );

      const abilities = Array(32)
        .fill(0)
        .map((_, abilityIndex) =>
          data.getUint16(ABILITIES_ADDR + characterOffset + abilityIndex * characterCount * 2, true)
        )
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

export const createAllInventoryItems = (): Inventory =>
  Object.fromEntries(
    Array(294 - 61 + 1)
      .fill(0)
      .map((_, index) => [
        index + 61,
        {
          count: 0,
          used: 0,
          visible: false,
        },
      ])
  );

const loadInventory = (data: DataView): Inventory => {
  const allItems = createAllInventoryItems();

  return Array(256)
    .fill(0)
    .map((_, index) => ({
      id: data.getUint16(0x06c0 + index * 6, true),
      count: data.getUint16(0x06c2 + index * 6, true),
      used: data.getUint16(0x06c4 + index * 6, true),
    }))
    .filter((item) => item.id !== 0)
    .reduce((inv: Inventory, item) => {
      inv[item.id] = { count: item.count, used: item.used, visible: true };
      return inv;
    }, allItems);
};

export const load = (buffer: ArrayBuffer): Save => {
  const data = new DataView(buffer);
  const characters: Character[] = loadCharacters(data);

  return {
    gameProgress: {
      saveCount: data.getUint16(SAVE_COUNT_ADDR, true),
      memberCount: data.getUint16(MEMBER_COUNT_ADDR, true),
      money: data.getUint32(MONEY_ADDR, true),
    },
    characters: Object.fromEntries(characterIds.map((id, index) => [id, characters[index]])) as Characters,
    inventory: loadInventory(data),
  };
};

const overwriteGameProgress = (buffer: ArrayBuffer, gameProgress: GameProgress) => {
  new Uint16Array(buffer, SAVE_COUNT_ADDR, 2)[0] = gameProgress.saveCount;
  new Uint16Array(buffer, MEMBER_COUNT_ADDR, 2)[0] = gameProgress.memberCount;
  new Uint32Array(buffer, MONEY_ADDR, 4)[0] = gameProgress.money;
};

const overwriteCharacters = (buffer: ArrayBuffer, characters: Characters) => {
  const characterCount = characterIds.length;
  const characterArray: Character[] = characterIds.map((id) => characters[id]);

  characterArray.forEach((character, index) => {
    const characterOffset = 2 * index;

    const values = [
      character.stat.level,
      character.stat.maxHealth,
      character.stat.maxMana,
      character.stat.health,
      character.stat.mana,
      character.equipment.helm,
      character.equipment.cloak,
      character.equipment.bodyArmor,
      character.equipment.weapon,
      character.equipment.boots,
      character.equipment.charm,
      character.stat.attackDamage,
      character.stat.abilityPower,
      character.stat.resistance,
      character.stat.movement,
      character.stat.luck,
    ];

    values.forEach((value, valueIndex) => {
      new Uint16Array(buffer, STATS_ADDR + characterOffset + valueIndex * characterCount * 2, 2)[0] = value;
    });

    const abilities: number[] = [...character.abilities, ...Array(32 - character.abilities.length).fill(0)];
    abilities.forEach((ability, abilityIndex) => {
      new Uint16Array(buffer, ABILITIES_ADDR + characterOffset + abilityIndex * characterCount * 2, 2)[0] = ability;
    });
  });
};

export const overwrite = (buffer: ArrayBuffer, save: Save) => {
  overwriteGameProgress(buffer, save.gameProgress);
  overwriteCharacters(buffer, save.characters);
};
