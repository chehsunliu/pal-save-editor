import React, { createContext, useContext, useState } from "react";

const characterAddresses: Record<string, number> = {
  li: 0x0018,
  chao: 0x0240,
  lin: 0x0468,
  anu: 0x0690,
  queen: 0x8b8,
  li2: 0x1380,
};

export const characterIds: string[] = Object.keys(characterAddresses);

export const attrKeys = [
  "level",
  "xpMax",
  "xp",
  "hpMax",
  "hp",
  "mpMax",
  "mp",
  "physicalDamage",
  "magicalDamage",
  "defense",
  "speed",
  "luck",
] as const;

type AttrKey = (typeof attrKeys)[number];

const addresses = {
  money: 0x0004,
  inventorySize: 0x2b38,
  inventory: 0x2b3c,
  godOfWineUsage: 0x68c8,
};

const attrAddressOffsets: { [k in AttrKey]: number } = {
  level: 0x04,
  xpMax: 0x08,
  xp: 0x0c,
  hpMax: 0x14,
  hp: 0x18,
  mpMax: 0x1c,
  mp: 0x20,
  physicalDamage: 0x24,
  magicalDamage: 0x28,
  defense: 0x2c,
  speed: 0x30,
  luck: 0x34,
};

const abilityCountAddressOffset = 0x6c;

type Character = {
  attrs: {
    level: number;
    xpMax: number;
    xp: number;
    hpMax: number;
    hp: number;
    mpMax: number;
    mp: number;
    physicalDamage: number;
    magicalDamage: number;
    defense: number;
    speed: number;
    luck: number;
  };
  abilities: number[];
};

type StatsContextType = {
  stats: {
    filename: string;
    bufIn: ArrayBuffer;
    money: number;
    godOfWineUsage: number;
    chars: Record<string, Character>;
    inventory: Record<number, number>;
  };
  getModifiedBuffer(): ArrayBuffer;
  isEditingDisabled(): boolean;
  setBufIn(input: { buf: ArrayBuffer; filename: string }): void;
  setMoney(money: number): void;
  setGodOfWineUsage(usage: number): void;
  setAttr(id: string, attr: { key: AttrKey; value: number }): void;
  appendAbility(id: string, value: number): void;
  removeAbility(id: string, value: number): void;
  setInventoryItem(value: number, count: number): void;
};

const initialCharacter: Character = {
  attrs: {
    level: 0,
    xpMax: 0,
    xp: 0,
    hpMax: 0,
    hp: 0,
    mpMax: 0,
    mp: 0,
    physicalDamage: 0,
    magicalDamage: 0,
    defense: 0,
    speed: 0,
    luck: 0,
  },
  abilities: [],
};

const initialStats: StatsContextType["stats"] = {
  filename: "",
  bufIn: new ArrayBuffer(0),
  money: 0,
  godOfWineUsage: 0,
  chars: {
    li: initialCharacter,
    chao: initialCharacter,
    lin: initialCharacter,
    anu: initialCharacter,
    queen: initialCharacter,
    li2: initialCharacter,
  },
  inventory: {},
};

const StatsContext = createContext<StatsContextType>({
  stats: initialStats,
  getModifiedBuffer: () => new ArrayBuffer(0),
  isEditingDisabled: () => true,
  setBufIn: () => {},
  setMoney: () => {},
  setGodOfWineUsage: () => {},
  setAttr: () => {},
  appendAbility: () => {},
  removeAbility: () => {},
  setInventoryItem: () => {},
});

type StatsProviderProps = {
  children: React.ReactNode;
};

export function StatsProvider({ children, ...props }: StatsProviderProps) {
  const [stats, setStats] = useState<StatsContextType["stats"]>(initialStats);

  const getModifiedBuffer = () => {
    const bufOut = new DataView(stats.bufIn.slice(0));

    // Money
    bufOut.setUint32(addresses.money, stats.money, true);

    // God of wine usage
    bufOut.setUint8(addresses.godOfWineUsage, stats.godOfWineUsage);

    // Character
    Object.entries(stats.chars).forEach(([id, char]) => {
      const addr = characterAddresses[id];

      // Stats
      Object.entries(char.attrs).forEach(([attrKey, attrValue]) => {
        bufOut.setUint16(addr + attrAddressOffsets[attrKey as AttrKey], attrValue, true);
      });

      // Abilities
      const abilityCountAddr = addr + abilityCountAddressOffset;
      const abilityAddr = abilityCountAddr + 4;
      bufOut.setUint32(abilityCountAddr, char.abilities.length, true);
      for (let i = 0; i < char.abilities.length; i++) {
        bufOut.setUint32(abilityAddr + i * 4, char.abilities[i], true);
      }
    });

    // Inventory
    bufOut.setUint32(addresses.inventorySize, Object.keys(stats.inventory).length, true);
    Object.entries(stats.inventory).forEach(([id, count], i) => {
      const valueAddr = addresses.inventory + i * 20;
      const countAddr = valueAddr + 4;
      bufOut.setUint32(valueAddr, parseInt(id, 10), true);
      bufOut.setUint32(countAddr, count, true);
    });

    return bufOut.buffer;
  };

  const isEditingDisabled = () => stats.bufIn.byteLength === 0;

  const setBufIn = (input: { buf: ArrayBuffer; filename: string }) => {
    const bufViewer = new DataView(input.buf.slice(0));

    const inventorySize = bufViewer.getUint32(addresses.inventorySize, true);
    const inventory: StatsContextType["stats"]["inventory"] = {};
    for (let i = 0; i < inventorySize; i++) {
      const valueAddr = addresses.inventory + 20 * i;
      const countAddr = valueAddr + 4;

      const value = bufViewer.getUint32(valueAddr, true);
      if (value === 0) {
        // It's possible the whole 20 bytes are all zeros.
        continue;
      }

      inventory[value] = bufViewer.getUint32(countAddr, true);
    }

    setStats({
      filename: input.filename,
      bufIn: bufViewer.buffer,
      money: bufViewer.getUint32(addresses.money, true),
      godOfWineUsage: bufViewer.getUint8(addresses.godOfWineUsage),
      chars: Object.fromEntries(
        characterIds.map((id) => {
          const addr = characterAddresses[id];

          // Attributes
          const attrs = Object.fromEntries(
            attrKeys.map((key) => [key, bufViewer.getUint32(addr + attrAddressOffsets[key], true)]),
          ) as { [k in AttrKey]: number };

          // Abilities
          const abilityCountAddr = addr + abilityCountAddressOffset;
          const abilityAddr = abilityCountAddr + 4;

          const abilityCount = bufViewer.getUint32(abilityCountAddr, true);
          const abilities: number[] = [];
          for (let i = 0; i < abilityCount; i++) {
            abilities.push(bufViewer.getUint32(abilityAddr + i * 4, true));
          }

          return [id, { attrs, abilities }];
        }),
      ),
      inventory,
    });
  };

  const setMoney = (money: number) => {
    setStats({ ...stats, money });
  };

  const setGodOfWineUsage = (usage: number) => {
    setStats({ ...stats, godOfWineUsage: usage });
  };

  const setAttr = (id: string, attr: { key: AttrKey; value: number }) => {
    setStats({
      ...stats,
      chars: {
        ...stats.chars,
        [id]: {
          ...stats.chars[id],
          attrs: { ...stats.chars[id].attrs, [attr.key]: attr.value },
        },
      },
    });
  };

  const appendAbility = (id: string, value: number) => {
    const abilities = [...stats.chars[id].abilities, value];
    setStats({ ...stats, chars: { ...stats.chars, [id]: { ...stats.chars[id], abilities } } });
  };

  const removeAbility = (id: string, value: number) => {
    const abilities = stats.chars[id].abilities.filter((a) => a !== value);
    setStats({ ...stats, chars: { ...stats.chars, [id]: { ...stats.chars[id], abilities } } });
  };

  const setInventoryItem = (value: number, count: number) => {
    if (count > 99 || count < 0) {
      return;
    }

    const inventory = { ...stats.inventory };
    if (count > 0) {
      inventory[value] = count;
    } else {
      delete inventory[value];
    }
    setStats({ ...stats, inventory });
  };

  const value: StatsContextType = {
    stats,
    getModifiedBuffer,
    isEditingDisabled,
    setBufIn,
    setMoney,
    setGodOfWineUsage,
    setAttr,
    appendAbility,
    removeAbility,
    setInventoryItem,
  };

  return (
    <StatsContext.Provider {...props} value={value}>
      {children}
    </StatsContext.Provider>
  );
}

export const useStats = () => {
  const context = useContext(StatsContext);

  if (context === undefined) {
    throw new Error("useStats must be used within a StatsProvider");
  }

  return context;
};
