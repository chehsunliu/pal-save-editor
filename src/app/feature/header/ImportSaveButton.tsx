import React from "react";
import { Button, ButtonProps } from "@material-ui/core";
import * as saveEditor from "app/util/editor";
import { useAppDispatch } from "app/hook";
import { replaced as gameProgressReplaced } from "app/feature/gameProgress/gameProgressSlice";
import { replaced as charactersReplaced } from "app/feature/characters/charactersSlice";
import { replaced as inventoryReplaced } from "app/feature/inventory/inventorySlice";
import { filenameUpdated } from "app/feature/header/rawSlice";
import { saveBinary } from "app/util/storage";

const ImportSaveButton = (props: ButtonProps<"label">) => {
  const dispatch = useAppDispatch();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) {
      console.error("e.target.files is null");
      return;
    }
    const targetFile = e.target.files[0];

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target === null) {
        console.error("e.target is null");
        return;
      }

      const buffer = e.target.result;
      if (!(buffer instanceof ArrayBuffer)) {
        console.error("buffer is not an instance of ArrayBuffer");
        return;
      }

      try {
        const save = saveEditor.load(buffer);
        saveBinary(targetFile.name, buffer);
        dispatch(gameProgressReplaced({ state: save.gameProgress }));
        dispatch(charactersReplaced({ state: save.characters }));
        dispatch(inventoryReplaced({ state: save.inventory }));
        dispatch(filenameUpdated({ filename: targetFile.name }));
      } catch (e) {
        console.error(e);
      }
    };
    reader.readAsArrayBuffer(targetFile);
  };

  return (
    <Button {...props} component="label">
      {props.children}
      <input data-testid="pal-import-btn-input" type="file" accept=".RPG" hidden onChange={handleFileUpload} />
    </Button>
  );
};

export default ImportSaveButton;
