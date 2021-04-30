import { readFileSync } from "fs";
import { load, Save } from "app/saveEditor";

test("GG", () => {
  const nodeBuffer = readFileSync(`${__dirname}/__tests__/2.RPG`);
  const save = load(nodeBuffer.buffer);

  const expected: Save = {
    saveCount: 17,
    playerCount: 3,
    money: 496348,
    stats: {
      li: {
        level: 50,
        maxHealth: 811,
        maxMana: 625,
        health: 810,
        mana: 568,
        helm: 0xc4,
        attackDamage: 251,
        abilityPower: 253,
        resistance: 154,
        movement: 148,
        luck: 130,
      },
      zhao: {
        level: 35,
        maxHealth: 643,
        maxMana: 554,
        health: 643,
        mana: 532,
        helm: 0xc7,
        attackDamage: 159,
        abilityPower: 200,
        resistance: 106,
        movement: 130,
        luck: 78,
      },
      lin: {
        level: 21,
        maxHealth: 456,
        maxMana: 273,
        health: 455,
        mana: 268,
        helm: 0xc7,
        attackDamage: 120,
        abilityPower: 105,
        resistance: 83,
        movement: 81,
        luck: 64,
      },
      queen: {
        level: 48,
        maxHealth: 810,
        maxMana: 790,
        health: 810,
        mana: 790,
        helm: 0xca,
        attackDamage: 168,
        abilityPower: 256,
        resistance: 136,
        movement: 132,
        luck: 60,
      },
      anu: {
        level: 28,
        maxHealth: 480,
        maxMana: 410,
        health: 480,
        mana: 410,
        helm: 0xca,
        attackDamage: 168,
        abilityPower: 220,
        resistance: 110,
        movement: 160,
        luck: 150,
      },
      dummy: {
        level: 40,
        maxHealth: 3600,
        maxMana: 720,
        health: 3600,
        mana: 720,
        helm: 0xca,
        attackDamage: 120,
        abilityPower: 562,
        resistance: 136,
        movement: 110,
        luck: 40,
      },
    },
  };

  expect(save).toEqual(expected);
});
