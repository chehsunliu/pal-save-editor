import { ButtonGroup, Toolbar, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import ImportSaveButton from "app/feature/header/ImportSaveButton";
import React from "react";
import ExportSaveButton from "app/feature/header/ExportSaveButton";
import LanguageToggleButton from "app/feature/header/LanguageToggleButton";

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
        <ExportSaveButton>輸出檔案</ExportSaveButton>
        <ImportSaveButton>輸入檔案</ImportSaveButton>
        <LanguageToggleButton variant="contained" />
      </ButtonGroup>
    </Toolbar>
  );
};

export default Header;
