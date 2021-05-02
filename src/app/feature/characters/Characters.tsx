import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import CharacterCard from "app/feature/characters/CharcterCard";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(2),
    },
  })
);

const Characters = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom>
        角色
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <CharacterCard name="李逍遙" />
        </Grid>
        <Grid item xs={4}>
          <CharacterCard name="趙靈兒" />
        </Grid>
        <Grid item xs={4}>
          <CharacterCard name="林月如" />
        </Grid>
        <Grid item xs={4}>
          <CharacterCard name="巫后" />
        </Grid>
        <Grid item xs={4}>
          <CharacterCard name="阿奴" />
        </Grid>
      </Grid>
    </div>
  );
};

export default Characters;
