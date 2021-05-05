import { useTranslation } from "react-i18next";
import { Typography } from "@material-ui/core";
import React from "react";
import { CharacterId } from "app/util/editor";
import { useAppDispatch, useAppSelector } from "app/hook";
import ReactSelect, { ActionMeta } from "react-select";
import { abilityAdded, abilityRemoved } from "app/feature/characters/charactersSlice";

interface OptionType {
  label: string;
  value: number;
}

const ALL_ABILITIES: ReadonlyArray<number> = Array(397 - 295 + 1)
  .fill(0)
  .map((_, i) => i + 295);

interface AbilitySectionProps {
  characterId: CharacterId;
}

const AbilitySection = (props: AbilitySectionProps) => {
  const characters = useAppSelector((state) => state.characters);
  const { characterId } = props;
  const { abilities } = characters[characterId];
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const options: ReadonlyArray<OptionType> = ALL_ABILITIES.map((a) => ({
    label: t(`abilities.names.${a}`),
    value: a,
  }));

  const values: ReadonlyArray<OptionType> = abilities.map((a) => ({
    label: t(`abilities.names.${a}`),
    value: a,
  }));

  const handleValueChange = (values: ReadonlyArray<OptionType>, meta: ActionMeta<OptionType>) => {
    switch (meta.action) {
      case "select-option":
        const ability = meta.option?.value;
        if (ability === undefined) {
          console.error("ability is undefined");
          return;
        }
        dispatch(abilityAdded({ id: characterId, ability }));
        break;

      case "remove-value":
        dispatch(abilityRemoved({ id: characterId, ability: meta.removedValue.value }));
        break;

      default:
        console.error("Unhandled react-select action", meta);
    }
  };

  return (
    <>
      <Typography variant="h6" component="h2" gutterBottom>
        {t("abilities.title")}
      </Typography>
      <ReactSelect
        isMulti
        options={options}
        value={values}
        onChange={handleValueChange}
        menuPortalTarget={document.body}
        isClearable={false}
        closeMenuOnSelect={false}
      />
    </>
  );
};

export default AbilitySection;
