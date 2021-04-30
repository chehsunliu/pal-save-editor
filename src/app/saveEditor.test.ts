import { readFileSync } from "fs";
import { load, Save } from "app/saveEditor";

test("GG", () => {
  const nodeBuffer = readFileSync(`${__dirname}/__tests__/2.RPG`);
  const save = load(nodeBuffer.buffer);

  const expected: Save = {
    saveCount: 17,
    playerCount: 3,
    money: 496348,
    players: {
      anu: {
        equipment: {
          bodyArmor: 209,
          boots: 0,
          charm: 251,
          cloak: 231,
          helm: 202,
          weapon: 192,
        },
        stat: {
          abilityPower: 220,
          attackDamage: 168,
          health: 480,
          level: 28,
          luck: 150,
          mana: 410,
          maxHealth: 480,
          maxMana: 410,
          movement: 160,
          resistance: 110,
        },
      },
      dummy: {
        equipment: {
          bodyArmor: 215,
          boots: 244,
          charm: 253,
          cloak: 231,
          helm: 202,
          weapon: 193,
        },
        stat: {
          abilityPower: 562,
          attackDamage: 120,
          health: 3600,
          level: 40,
          luck: 40,
          mana: 720,
          maxHealth: 3600,
          maxMana: 720,
          movement: 110,
          resistance: 136,
        },
      },
      li: {
        equipment: {
          bodyArmor: 214,
          boots: 240,
          charm: 248,
          cloak: 228,
          helm: 196,
          weapon: 172,
        },
        stat: {
          abilityPower: 253,
          attackDamage: 251,
          health: 810,
          level: 50,
          luck: 130,
          mana: 568,
          maxHealth: 811,
          maxMana: 625,
          movement: 148,
          resistance: 154,
        },
      },
      lin: {
        equipment: {
          bodyArmor: 210,
          boots: 238,
          charm: 250,
          cloak: 228,
          helm: 199,
          weapon: 163,
        },
        stat: {
          abilityPower: 105,
          attackDamage: 120,
          health: 455,
          level: 21,
          luck: 64,
          mana: 268,
          maxHealth: 456,
          maxMana: 273,
          movement: 81,
          resistance: 83,
        },
      },
      queen: {
        equipment: {
          bodyArmor: 210,
          boots: 243,
          charm: 260,
          cloak: 234,
          helm: 202,
          weapon: 195,
        },
        stat: {
          abilityPower: 256,
          attackDamage: 168,
          health: 810,
          level: 48,
          luck: 60,
          mana: 790,
          maxHealth: 810,
          maxMana: 790,
          movement: 132,
          resistance: 136,
        },
      },
      zhao: {
        equipment: {
          bodyArmor: 210,
          boots: 239,
          charm: 274,
          cloak: 228,
          helm: 199,
          weapon: 177,
        },
        stat: {
          abilityPower: 200,
          attackDamage: 159,
          health: 643,
          level: 35,
          luck: 78,
          mana: 532,
          maxHealth: 643,
          maxMana: 554,
          movement: 130,
          resistance: 106,
        },
      },
    },
  };

  expect(save).toEqual(expected);
});
