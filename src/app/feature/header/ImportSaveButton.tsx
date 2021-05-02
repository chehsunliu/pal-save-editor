import React from "react";
import { Button, ButtonProps } from "@material-ui/core";
import * as saveEditor from "app/util/saveEditor";
import { useAppDispatch } from "app/hook";
import { replaced as gameProgressReplaced } from "app/feature/gameProgress/gameProgressSlice";
import { replaced as charactersReplaced } from "app/feature/characters/charactersSlice";

const ImportSaveButton = (props: ButtonProps<"label">) => {
  const dispatch = useAppDispatch();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target === null) {
        return;
      }

      const buffer = e.target.result;
      if (!(buffer instanceof ArrayBuffer)) {
        return;
      }

      const save = saveEditor.load(buffer);
      dispatch(gameProgressReplaced({ state: save.gameProgress }));
      dispatch(charactersReplaced({ state: save.characters }));
    };
    reader.readAsArrayBuffer(e.target.files[0]);
  };

  return (
    <Button {...props} component="label">
      {props.children}
      <input type="file" accept=".RPG" hidden onChange={handleFileUpload} />
    </Button>
  );
};

export default ImportSaveButton;
