import React from "react";
import { IconButton } from "@material-ui/core";
import AttachFileIcon from "@material-ui/icons/AttachFile";

const UploadButton = () => {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target === null) {
        return;
      }

      console.log(e.target.result);
    };
    reader.readAsArrayBuffer(e.target.files[0]);
  };

  return (
    <IconButton color="inherit" component="label">
      <AttachFileIcon />
      <input type="file" hidden onChange={handleFileUpload} />
    </IconButton>
  );
};

export default UploadButton;
