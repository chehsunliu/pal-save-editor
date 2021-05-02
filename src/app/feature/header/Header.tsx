import { Button, ButtonGroup, Toolbar, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import ImportSaveButton from "app/feature/header/ImportSaveButton";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
    },
  })
);

const Header = () => {
  const classes = useStyles();

  return (
    <Toolbar>
      <Typography className={classes.title} variant="h3">
        仙劍奇俠傳1 存檔修改器
      </Typography>
      <ButtonGroup color="primary">
        <ImportSaveButton>輸入檔案</ImportSaveButton>
      </ButtonGroup>
    </Toolbar>
  );
};

export default Header;
