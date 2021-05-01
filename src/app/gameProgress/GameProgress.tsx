import { TextField, Typography } from "@material-ui/core";
import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useAppDispatch, useAppSelector } from "app/hook";
import { memberCountUpdated, moneyUpdated, saveCountUpdated } from "app/gameProgress/slice";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(2),
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
  const { saveCount, memberCount, money } = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();

  const handleSaveCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let count = parseInt(e.target.value);
    if (isNaN(count)) {
      count = 0;
    }
    dispatch(saveCountUpdated({ count }));
  };
  const handleMemberCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let count = parseInt(e.target.value);
    if (isNaN(count)) {
      count = 0;
    }
    dispatch(memberCountUpdated({ count }));
  };
  const handleMoneyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let money = parseInt(e.target.value);
    if (isNaN(money)) {
      money = 0;
    }
    dispatch(moneyUpdated({ money }));
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom>
        遊戲進度
      </Typography>
      <div className={classes.main}>
        <TextField
          className={classes.textField}
          variant="outlined"
          size="small"
          label="存檔次數"
          value={saveCount}
          onChange={handleSaveCountChange}
        />
        <TextField
          className={classes.textField}
          variant="outlined"
          size="small"
          label="隊伍人數"
          value={memberCount}
          onChange={handleMemberCountChange}
        />
        <TextField
          className={classes.textField}
          variant="outlined"
          size="small"
          label="金錢"
          value={money}
          onChange={handleMoneyChange}
        />
      </div>
    </div>
  );
};

export default GameProgress;
