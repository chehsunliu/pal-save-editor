import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import CharacterCard from "app/feature/characters/CharcterCard";
import { useAppSelector } from "app/hook";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(2),
    },
  })
);

const Characters = () => {
  const classes = useStyles();
  const characters = useAppSelector((state) => state.characters);

  const renderCharacterCards = () =>
    Object.entries(characters).map((k, v) => (
      <Grid item xs={4}>
        <CharacterCard name="李逍遙" />
      </Grid>
    ));

  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom>
        角色
      </Typography>
      <Grid container spacing={2}>
        {renderCharacterCards()}
      </Grid>
    </div>
  );
};

export default Characters;
