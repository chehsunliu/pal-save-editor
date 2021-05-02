import { Character, CharacterKey, Characters, CharacterStat } from "app/util/saveEditor";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const emptyCharacter: Character = {
  stat: {
    level: 0,
    maxHealth: 0,
    maxMana: 0,
    health: 0,
    mana: 0,
    attackDamage: 0,
    abilityPower: 0,
    resistance: 0,
    movement: 0,
    luck: 0,
  },
  equipment: {
    helm: 0,
    cloak: 0,
    bodyArmor: 0,
    weapon: 0,
    boots: 0,
    charm: 0,
  },
  abilities: [],
};

const initialState: Characters = {
  li: emptyCharacter,
  zhao: emptyCharacter,
  lin: emptyCharacter,
  queen: emptyCharacter,
  anu: emptyCharacter,
  dummy: emptyCharacter,
};

const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    replaced: (state, action: PayloadAction<{ state: Characters }>) => {
      return action.payload.state;
    },
    statUpdated: (state, action: PayloadAction<{ id: CharacterKey; stat: CharacterStat }>) => {
      state[action.payload.id].stat = action.payload.stat;
    },
  },
});

export const { replaced, statUpdated } = charactersSlice.actions;
export default charactersSlice.reducer;
