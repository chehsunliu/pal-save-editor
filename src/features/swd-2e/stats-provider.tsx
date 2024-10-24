import React, { createContext, useContext, useState } from "react";

const characterAddresses: Record<string, number> = {
  fu: 0x014a,
  wood: 0x01e9,
  stone: 0x0288,
  sang: 0x0327,
};

export const characterIds: string[] = Object.keys(characterAddresses);

export const attrKeys = [
  "level",
  "xp",
  "xpMax",
  "hp",
  "hpMax",
  "pp",
  "ppMax",
  "mp",
  "mpMax",
  //
  "power",
  "wisdom",
  "speed",
  "luck",
  //
  "response",
  "offense",
  "defense",
  "dodge",
] as const;

type AttrKey = (typeof attrKeys)[number];

const abilityFieldCount = 50;

const addresses = {
  money: 0x011b,
  mutableInventory: { start: 0x03a3, end: 0x03fd },
};

const attrAddressOffsets: { [k in AttrKey]: number } = {
  offense: -0x21,
  defense: -0x1f,
  hp: 0x00,
  hpMax: 0x02,
  level: 0x04,
  luck: 0x06,
  pp: 0x08,
  ppMax: 0x0a,
  xp: 0x0c,
  xpMax: 0x0e,
  power: 0x10,
  wisdom: 0x18,
  speed: 0x20,
  mp: 0x28,
  mpMax: 0x2a,
  response: 0x30,
  dodge: 0x38,
};

const abilityAddressOffset = 0x40;

type Character = {
  attrs: {
    level: number;
    xp: number;
    xpMax: number;
    hp: number;
    hpMax: number;
    pp: number;
    ppMax: number;
    mp: number;
    mpMax: number;
    //
    power: number;
    wisdom: number;
    speed: number;
    luck: number;
    //
    response: number;
    offense: number;
    defense: number;
    dodge: number;
  };
  abilities: number[];
};

type StatsContextType = {
  stats: {
    filename: string;
    bufIn: ArrayBuffer;
    money: number;
    chars: Record<string, Character>;
    inventory: number[];
  };
  getModifiedBuffer(): ArrayBuffer;
  isEditingDisabled(): boolean;
  setBufIn(input: { buf: ArrayBuffer; filename: string }): void;
  setMoney(money: number): void;
  setAttr(id: string, attr: { key: AttrKey; value: number }): void;
  appendAbility(id: string, value: number): void;
  removeAbility(id: string, value: number): void;
  appendInventoryItem(value: number): void;
  removeInventoryItem(index: number): void;
};

const initialCharacter: Character = {
  attrs: {
    level: 0,
    xp: 0,
    xpMax: 0,
    hp: 0,
    hpMax: 0,
    pp: 0,
    ppMax: 0,
    mp: 0,
    mpMax: 0,
    //
    power: 0,
    wisdom: 0,
    speed: 0,
    luck: 0,
    //
    response: 0,
    offense: 0,
    defense: 0,
    dodge: 0,
  },
  abilities: [],
};

const initialStats: StatsContextType["stats"] = {
  filename: "",
  bufIn: new ArrayBuffer(0),
  money: 0,
  chars: {
    fu: initialCharacter,
    sang: initialCharacter,
    wood: initialCharacter,
    stone: initialCharacter,
  },
  inventory: [],
};

const StatsContext = createContext<StatsContextType>({
  stats: initialStats,
  getModifiedBuffer: () => new ArrayBuffer(0),
  isEditingDisabled: () => true,
  setBufIn: () => {},
  setMoney: () => {},
  setAttr: () => {},
  appendInventoryItem: () => {},
  removeInventoryItem: () => {},
  appendAbility: () => {},
  removeAbility: () => {},
});

type StatsProviderProps = {
  children: React.ReactNode;
};

export function StatsProvider({ children, ...props }: StatsProviderProps) {
  const [stats, setStats] = useState<StatsContextType["stats"]>(initialStats);

  const getModifiedBuffer = (): ArrayBuffer => {
    const bufOut = new DataView(stats.bufIn.slice(0));

    // Money
    bufOut.setUint16(addresses.money, stats.money, true);

    // Character
    Object.entries(stats.chars).forEach(([id, char]) => {
      const addr = characterAddresses[id];

      // Stats
      Object.entries(char.attrs).forEach(([attrKey, attrValue]) => {
        bufOut.setUint16(addr + attrAddressOffsets[attrKey as AttrKey], attrValue, true);
      });

      // Abilities
      for (let i = 0; i < abilityFieldCount; i++) {
        bufOut.setUint8(addr + abilityAddressOffset + i, 0);
      }
      char.abilities.forEach((a, i) => {
        bufOut.setUint8(addr + abilityAddressOffset + i, a);
      });
    });

    // Inventory
    for (let addr = addresses.mutableInventory.start; addr < addresses.mutableInventory.end; addr += 2) {
      bufOut.setUint16(addr, 0, true);
    }
    for (let i = 0; i < stats.inventory.length; i++) {
      bufOut.setUint16(addresses.mutableInventory.start + i * 2, stats.inventory[i], true);
    }

    return bufOut.buffer;
  };

  const isEditingDisabled = () => stats.bufIn.byteLength === 0;

  const setBufIn = (input: { buf: ArrayBuffer; filename: string }) => {
    const bufViewer = new DataView(input.buf.slice(0));
    setStats({
      filename: input.filename,
      bufIn: bufViewer.buffer,
      money: bufViewer.getUint16(addresses.money, true),
      chars: Object.fromEntries(
        characterIds.map((id) => {
          const addr = characterAddresses[id];
          const attrs = Object.fromEntries(
            attrKeys.map((key) => [key, bufViewer.getUint16(addr + attrAddressOffsets[key], true)]),
          ) as { [k in AttrKey]: number };
          const abilities = [...Array(abilityFieldCount).keys()]
            .map((offset) => bufViewer.getUint8(addr + abilityAddressOffset + offset))
            .filter((value) => value > 0);

          return [id, { attrs, abilities }];
        }),
      ),
      inventory: Array.from(
        { length: (addresses.mutableInventory.end - addresses.mutableInventory.start) / 2 },
        (_, i) => i * 2 + addresses.mutableInventory.start,
      )
        .map((addr) => bufViewer.getUint16(addr, true))
        .filter((value) => value > 0),
    });
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
    if (stats.chars[id].abilities.length >= 50) {
      return;
    }

    const abilities = [...stats.chars[id].abilities, value];
    setStats({ ...stats, chars: { ...stats.chars, [id]: { ...stats.chars[id], abilities } } });
  };

  const removeAbility = (id: string, value: number) => {
    const abilities = stats.chars[id].abilities.filter((a) => a !== value);
    setStats({ ...stats, chars: { ...stats.chars, [id]: { ...stats.chars[id], abilities } } });
  };

  const appendInventoryItem = (itemValue: number) => {
    if (addresses.mutableInventory.start + stats.inventory.length * 2 >= addresses.mutableInventory.end) {
      return;
    }

    setStats({ ...stats, inventory: [...stats.inventory, itemValue] });
  };

  const removeInventoryItem = (index: number) => {
    const inventory = [...stats.inventory.slice(0, index), ...stats.inventory.slice(index + 1)];
    setStats({ ...stats, inventory });
  };

  const value: StatsContextType = {
    stats,
    getModifiedBuffer,
    isEditingDisabled,
    setBufIn,
    setMoney,
    setAttr,
    appendAbility,
    removeAbility,
    appendInventoryItem,
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
