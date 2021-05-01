import { Paper, TextField, Typography } from "@material-ui/core";
import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useAppSelector } from "app/hook";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(1),
    },
    main: {
      padding: theme.spacing(1),
    },
    textField: {
      margin: theme.spacing(1),
    },
  })
);

const GameProgress = () => {
  const classes = useStyles();
  const { saveCount, playerCount, money } = useAppSelector((state) => state.game);

  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom>
        遊戲進度
      </Typography>
      <Paper className={classes.main}>
        <TextField className={classes.textField} variant="outlined" size="small" label="存檔次數" value={saveCount} />
        <TextField className={classes.textField} variant="outlined" size="small" label="隊伍人數" value={playerCount} />
        <TextField className={classes.textField} variant="outlined" size="small" label="金錢" value={money} />
      </Paper>
    </div>
  );
};

export default GameProgress;
