import { ButtonGroup, Toolbar, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import ImportSaveButton from "app/feature/header/ImportSaveButton";
import React from "react";
import ExportSaveButton from "app/feature/header/ExportSaveButton";
import LanguageToggleButton from "app/feature/header/LanguageToggleButton";
import { useTranslation } from "react-i18next";
import ResetButton from "app/feature/header/ResetButton";

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
        <ResetButton data-testid="pal-reset-btn">{t("header.reset")}</ResetButton>
        <ExportSaveButton data-testid="pal-export-btn">{t("header.export")}</ExportSaveButton>
        <ImportSaveButton data-testid="pal-import-btn">{t("header.import")}</ImportSaveButton>
        <LanguageToggleButton data-testid="pal-language-btn" className={classes.langButton} variant="contained" />
      </ButtonGroup>
    </Toolbar>
  );
};

export default Header;
