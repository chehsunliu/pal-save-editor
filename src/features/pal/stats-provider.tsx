import React, { createContext, useContext, useState } from "react";

const characterAddresses: Record<string, number> = {
  li: 0x0244,
  chao: 0x0246,
  lin: 0x0248,
  queen: 0x024a,
  anu: 0x024c,
  kai: 0x024e,
};

export const characterIds: string[] = Object.keys(characterAddresses);

export const attrKeys = [
  "level",
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
  savingCount: 0x0000,
  huluValue: 0x0018,
  money: 0x0028,
  inventory: 0x06c0,
};

const attrAddressOffsets: { [k in AttrKey]: number } = {
  level: 0x00,
  hpMax: 0x0c,
  mpMax: 0x18,
  hp: 0x24,
  mp: 0x30,
  physicalDamage: 0x84,
  magicalDamage: 0x90,
  defense: 0x9c,
  speed: 0xa8,
  luck: 0xb4,
};

const abilityAddressOffset = 0x138;

type Character = {
  attrs: {
    level: number;
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
    savingCount: number;
    huluValue: number;
    money: number;
    chars: Record<string, Character>;
    inventory: Record<number, { count: number; used: number }>;
  };
  getModifiedBuffer(): ArrayBuffer;
  isEditingDisabled(): boolean;
  setBufIn(input: { buf: ArrayBuffer; filename: string }): void;
  setSavingCount(count: number): void;
  setHuluValue(huluValue: number): void;
  setMoney(money: number): void;
  setAttr(id: string, attr: { key: AttrKey; value: number }): void;
  appendAbility(id: string, value: number): void;
  removeAbility(id: string, value: number): void;
  setInventoryItem(value: number, usage: { count: number; used: number }): void;
  removeInventoryItem(value: number): void;
};

const initialCharacter: Character = {
  attrs: {
    level: 0,
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
  savingCount: 0,
  huluValue: 0,
  money: 0,
  chars: {
    li: initialCharacter,
    chao: initialCharacter,
    lin: initialCharacter,
    queen: initialCharacter,
    anu: initialCharacter,
    kai: initialCharacter,
  },
  inventory: {},
};

const StatsContext = createContext<StatsContextType>({
  stats: initialStats,
  getModifiedBuffer: () => new ArrayBuffer(0),
  isEditingDisabled: () => true,
  setBufIn: () => {},
  setSavingCount: () => {},
  setHuluValue: () => {},
  setMoney: () => {},
  setAttr: () => {},
  appendAbility: () => {},
  removeAbility: () => {},
  setInventoryItem: () => {},
  removeInventoryItem: () => {},
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

    // Hulu value
    bufOut.setUint16(addresses.huluValue, stats.huluValue, true);

    // Character
    Object.entries(stats.chars).forEach(([id, char]) => {
      const addr = characterAddresses[id];

      // Stats
      Object.entries(char.attrs).forEach(([attrKey, attrValue]) => {
        bufOut.setUint16(addr + attrAddressOffsets[attrKey as AttrKey], attrValue, true);
      });

      // Abilities
      const abilityAddr = addr + abilityAddressOffset;
      for (let i = 0; i < 32; i++) {
        bufOut.setUint16(abilityAddr + i * 12, 0, true);
      }
      for (let i = 0; i < char.abilities.length; i++) {
        bufOut.setUint16(abilityAddr + i * 12, char.abilities[i], true);
      }
    });

    // Inventory
    for (let i = 0; i < 256; i++) {
      bufOut.setUint16(addresses.inventory + 6 * i, 0, true);
      bufOut.setUint16(addresses.inventory + 2 + 6 * i, 0, true);
      bufOut.setUint16(addresses.inventory + 4 + 6 * i, 0, true);
    }
    Object.entries(stats.inventory).forEach(([value, { count, used }], i) => {
      const valueAddr = addresses.inventory + 6 * i;
      const countAddr = valueAddr + 2;
      const usedAddr = countAddr + 2;

      bufOut.setUint16(valueAddr, parseInt(value, 10), true);
      bufOut.setUint16(countAddr, count, true);
      bufOut.setUint16(usedAddr, used, true);
    });

    return bufOut.buffer;
  };

  const isEditingDisabled = () => stats.bufIn.byteLength === 0;

  const setBufIn = (input: { buf: ArrayBuffer; filename: string }) => {
    const bufViewer = new DataView(input.buf.slice(0));

    const inventory: StatsContextType["stats"]["inventory"] = {};
    for (let i = 0; i < 256; i++) {
      const valueAddr = addresses.inventory + 6 * i;
      const countAddr = valueAddr + 2;
      const usedAddr = countAddr + 2;

      const value = bufViewer.getUint16(valueAddr, true);
      const count = bufViewer.getUint16(countAddr, true);
      const used = bufViewer.getUint16(usedAddr, true);
      if (value === 0) {
        continue;
      }

      inventory[value] = { count, used };
    }

    setStats({
      filename: input.filename,
      bufIn: bufViewer.buffer,
      savingCount: bufViewer.getUint16(addresses.savingCount, true),
      huluValue: bufViewer.getUint16(addresses.huluValue, true),
      money: bufViewer.getUint32(addresses.money, true),
      chars: Object.fromEntries(
        characterIds.map((id) => {
          const addr = characterAddresses[id];

          // Attributes
          const attrs = Object.fromEntries(
            attrKeys.map((key) => [key, bufViewer.getUint16(addr + attrAddressOffsets[key], true)]),
          ) as { [k in AttrKey]: number };

          // Abilities
          const abilityAddr = addr + abilityAddressOffset;
          const abilities = Array.from(Array(32).keys())
            .map((i) => bufViewer.getUint16(abilityAddr + i * 2 * 6, true))
            .filter((a) => a !== 0);

          return [id, { attrs, abilities }];
        }),
      ),
      inventory,
    });
  };

  const setSavingCount = (count: number) => {
    setStats({ ...stats, savingCount: count });
  };

  const setHuluValue = (huluValue: number) => {
    setStats({ ...stats, huluValue });
  };

  const setMoney = (money: number) => {
    setStats({ ...stats, money });
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

  const setInventoryItem = (value: number, usage: { count: number; used: number }) => {
    if (usage.count > 99 || usage.count < 0 || usage.used < 0 || usage.used > usage.count) {
      return;
    }

    const inventory = { ...stats.inventory };
    inventory[value] = usage;
    setStats({ ...stats, inventory });
  };

  const removeInventoryItem = (value: number) => {
    const inventory = { ...stats.inventory };
    delete inventory[value];
    setStats({ ...stats, inventory });
  };

  const value: StatsContextType = {
    stats,
    getModifiedBuffer,
    isEditingDisabled,
    setBufIn,
    setSavingCount,
    setHuluValue,
    setMoney,
    setAttr,
    appendAbility,
    removeAbility,
    setInventoryItem,
    removeInventoryItem,
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
