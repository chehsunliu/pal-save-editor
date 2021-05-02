import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import CharacterCard from "app/feature/characters/CharcterCard";
import { useAppSelector } from "app/hook";
import { Character, CharacterKey } from "app/util/saveEditor";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(2),
    },
  })
);

const nameMap: Record<CharacterKey, string> = {
  li: "李逍遙",
  zhao: "趙靈兒",
  lin: "林月如",
  queen: "巫后",
  anu: "阿奴",
  dummy: "冗員",
};

const Characters = () => {
  const classes = useStyles();
  const characters = useAppSelector((state) => state.characters);

  const renderCharacterCards = () =>
    Object.entries<Character>(characters).map(([k, c], index) => (
      <Grid item xs={4} key={k}>
        <CharacterCard name={nameMap[k as CharacterKey]} character={c} />
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
