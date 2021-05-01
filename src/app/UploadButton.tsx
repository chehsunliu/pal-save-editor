import React from "react";
import { IconButton } from "@material-ui/core";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import * as saveEditor from "app/util/saveEditor";
import { useAppDispatch } from "app/hook";
import { replaced as gameProgressReplaced } from "app/gameProgress/slice";

const UploadButton = () => {
  const dispatch = useAppDispatch();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.target !== null) {
          const save = saveEditor.load(e.target.result as ArrayBuffer);
          dispatch(gameProgressReplaced({ state: save.gameProgress }));
        }
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };

  return (
    <IconButton color="inherit" component="label">
      <AttachFileIcon />
      <input type="file" hidden onChange={handleFileUpload} />
    </IconButton>
  );
};

export default UploadButton;
