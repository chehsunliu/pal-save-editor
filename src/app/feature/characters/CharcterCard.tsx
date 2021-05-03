import { Card, CardContent, TextField, Typography } from "@material-ui/core";
import { CharacterId, CharacterStat } from "app/util/editor";
import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useAppDispatch, useAppSelector } from "app/hook";
import { statUpdated } from "app/feature/characters/charactersSlice";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    customField: {
      margin: theme.spacing(1),
      maxWidth: 70,
    },
  })
);

interface CustomFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

const CustomField = (props: CustomFieldProps) => {
  const classes = useStyles();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value);
    if (isNaN(value)) {
      value = 0;
    }
    props.onChange(value);
  };
  return (
    <TextField
      variant="outlined"
      size="small"
      label={props.label}
      className={classes.customField}
      value={props.value}
      onChange={handleChange}
    />
  );
};

interface CharacterCardProps {
  name: string;
  characterId: CharacterId;
}

const CharacterCard = (props: CharacterCardProps) => {
  const characters = useAppSelector((state) => state.characters);
  const dispatch = useAppDispatch();

  const { characterId, name } = props;
  const { stat } = characters[characterId];
  const { t } = useTranslation();

  const handleStatUpdate = (field: keyof CharacterStat) => (value: number) => {
    const newStat = { ...stat };
    newStat[field] = value;
    dispatch(statUpdated({ id: characterId, stat: newStat }));
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          {name}
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          {t("stats.title")}
        </Typography>
        <CustomField label={t("stats.level")} value={stat.level} onChange={handleStatUpdate("level")} />
        <CustomField label={t("stats.maxHealth")} value={stat.maxHealth} onChange={handleStatUpdate("maxHealth")} />
        <CustomField label={t("stats.maxMana")} value={stat.maxMana} onChange={handleStatUpdate("maxMana")} />
        <CustomField label={t("stats.health")} value={stat.health} onChange={handleStatUpdate("health")} />
        <CustomField label={t("stats.mana")} value={stat.mana} onChange={handleStatUpdate("mana")} />
        <CustomField
          label={t("stats.attackDamage")}
          value={stat.attackDamage}
          onChange={handleStatUpdate("attackDamage")}
        />
        <CustomField
          label={t("stats.abilityPower")}
          value={stat.abilityPower}
          onChange={handleStatUpdate("abilityPower")}
        />
        <CustomField label={t("stats.resistance")} value={stat.resistance} onChange={handleStatUpdate("resistance")} />
        <CustomField label={t("stats.movement")} value={stat.movement} onChange={handleStatUpdate("movement")} />
        <CustomField label={t("stats.luck")} value={stat.luck} onChange={handleStatUpdate("luck")} />
      </CardContent>
    </Card>
  );
};

export default CharacterCard;
