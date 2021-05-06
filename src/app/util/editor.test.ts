import { readFileSync } from "fs";
import { load, overwrite, Save } from "app/util/editor";

let expected2RPGSave: Save;
let nodeBuffer: Buffer;

beforeAll(() => {
  expected2RPGSave = JSON.parse(readFileSync(`${__dirname}/../__tests__/2.RPG.json`, "utf8"));
  nodeBuffer = readFileSync(`${__dirname}/../__tests__/2.RPG`);
});

test("load buffer", () => {
  const save = load(nodeBuffer.buffer);
  expect(save).toEqual(expected2RPGSave);
});

test("overwrite buffer", () => {
  const arrayBuffer = nodeBuffer.buffer;

  const newGameProgress = {
    saveCount: 12,
    memberCount: 3,
    money: 1234,
  };
  const newCharacters = {
    ...expected2RPGSave.characters,
    zhao: {
      abilities: [297, 300, 301, 306, 307, 309, 312],
      equipment: {
        bodyArmor: 210,
        boots: 239,
        charm: 274,
        cloak: 228,
        helm: 199,
        weapon: 177,
      },
      stat: {
        abilityPower: 139,
        attackDamage: 119,
        health: 143,
        level: 25,
        luck: 28,
        mana: 232,
        maxHealth: 243,
        maxMana: 154,
        movement: 100,
        resistance: 100,
      },
    },
  };

  overwrite(arrayBuffer, {
    ...expected2RPGSave,
    gameProgress: newGameProgress,
    characters: newCharacters,
  });

  const newSave = load(arrayBuffer);
  expect(newSave).not.toEqual(expected2RPGSave);
  expect(newSave.gameProgress).toEqual(newGameProgress);
  expect(newSave.characters).toEqual(newCharacters);
  expect(newSave.inventory).toEqual(expected2RPGSave.inventory);
});
