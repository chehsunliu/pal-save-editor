import { TextField, Typography } from "@material-ui/core";
import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useAppDispatch, useAppSelector } from "app/hook";
import { memberCountUpdated, moneyUpdated, saveCountUpdated } from "app/feature/gameProgress/gameProgressSlice";
import { useTranslation } from "react-i18next";

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
  const { saveCount, memberCount, money } = useAppSelector((state) => state.gameProgress);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

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
        {t("gameProgress.title")}
      </Typography>
      <div className={classes.main}>
        <TextField
          className={classes.textField}
          data-testid="pal-field-save-count"
          variant="outlined"
          size="small"
          label={t("gameProgress.saveCount")}
          value={saveCount}
          onChange={handleSaveCountChange}
        />
        <TextField
          className={classes.textField}
          data-testid="pal-field-member-count"
          variant="outlined"
          size="small"
          label={t("gameProgress.memberCount")}
          value={memberCount}
          onChange={handleMemberCountChange}
        />
        <TextField
          className={classes.textField}
          data-testid="pal-field-money"
          variant="outlined"
          size="small"
          label={t("gameProgress.money")}
          value={money}
          onChange={handleMoneyChange}
        />
      </div>
    </div>
  );
};

export default GameProgress;
