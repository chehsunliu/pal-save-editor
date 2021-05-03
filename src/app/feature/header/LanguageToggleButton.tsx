import { ButtonProps, Button } from "@material-ui/core";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const languages = ["tw", "en"];

const LanguageToggleButton = (props: ButtonProps) => {
  const [languageIndex, setLanguageIndex] = useState(0);
  const { i18n } = useTranslation();

  const handleClick = () => {
    const nextLanguageIndex = (languageIndex + 1) % languages.length;
    setLanguageIndex(nextLanguageIndex);
    i18n.changeLanguage(languages[nextLanguageIndex]);
  };

  return (
    <Button {...props} onClick={() => handleClick()}>
      {languages[languageIndex]}
    </Button>
  );
};

export default LanguageToggleButton;
