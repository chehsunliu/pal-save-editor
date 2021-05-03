import { ButtonProps, Button } from "@material-ui/core";
import { useState } from "react";

const languages = ["tw", "en"];

const LanguageToggleButton = (props: ButtonProps) => {
  const [languageIndex, setLanguageIndex] = useState(0);

  const handleClick = () => {
    setLanguageIndex((languageIndex + 1) % languages.length);
  };

  return (
    <Button {...props} onClick={() => handleClick()}>
      {languages[languageIndex]}
    </Button>
  );
};

export default LanguageToggleButton;
