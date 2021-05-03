import { ButtonGroup, Toolbar, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import ImportSaveButton from "app/feature/header/ImportSaveButton";
import React from "react";
import ExportSaveButton from "app/feature/header/ExportSaveButton";
import LanguageToggleButton from "app/feature/header/LanguageToggleButton";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
    },
    langButton: {
      width: 60,
    },
  })
);

const Header = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Toolbar>
      <Typography className={classes.title} variant="h3">
        {t("header.title")}
      </Typography>
      <ButtonGroup color="primary">
        <ExportSaveButton>{t("header.export")}</ExportSaveButton>
        <ImportSaveButton>{t("header.import")}</ImportSaveButton>
        <LanguageToggleButton className={classes.langButton} variant="contained" />
      </ButtonGroup>
    </Toolbar>
  );
};

export default Header;
