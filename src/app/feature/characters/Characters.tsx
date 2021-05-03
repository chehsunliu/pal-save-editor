import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import CharacterCard from "app/feature/characters/CharcterCard";
import { characterIds } from "app/util/editor";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(2),
    },
  })
);

const Characters = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const renderCharacterCards = () =>
    characterIds.map((k) => (
      <Grid item xs={4} key={k}>
        <CharacterCard name={t(`characters.name.${k}`)} characterId={k} />
      </Grid>
    ));

  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom>
        {t("characters.title")}
      </Typography>
      <Grid container spacing={2}>
        {renderCharacterCards()}
      </Grid>
    </div>
  );
};

export default Characters;
