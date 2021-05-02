import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import CharacterCard from "app/feature/characters/CharcterCard";
import { CharacterId, characterIds } from "app/util/saveEditor";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(2),
    },
  })
);

const nameMap: Record<CharacterId, string> = {
  li: "李逍遙",
  zhao: "趙靈兒",
  lin: "林月如",
  queen: "巫后",
  anu: "阿奴",
  dummy: "冗員",
};

const Characters = () => {
  const classes = useStyles();

  const renderCharacterCards = () =>
    characterIds.map((k) => (
      <Grid item xs={4} key={k}>
        <CharacterCard name={nameMap[k]} characterId={k} />
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
