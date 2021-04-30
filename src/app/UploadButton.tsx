import React from "react";
import { IconButton } from "@material-ui/core";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";

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
    reader.readAsText(e.target.files[0]);
  };

  return (
    <IconButton color="inherit" component="label">
      <InsertDriveFileIcon />
      <input type="file" hidden onChange={handleFileUpload} />
    </IconButton>
  );
};

export default UploadButton;
