import { Button, ButtonProps } from "@material-ui/core";
import { useAppSelector } from "app/hook";
import { loadBinaryAsArrayBuffer } from "app/util/storage";
import { overwrite } from "app/util/editor";

const ExportSaveButton = (props: ButtonProps) => {
  const stat = useAppSelector((state) => state);
  const filename = stat.raw.filename;
  const disabled = filename === null;

  const handleDownload = async () => {
    if (filename === null) {
      console.error("filename is null");
      return;
    }

    const buffer = loadBinaryAsArrayBuffer(filename);
    if (buffer === null) {
      console.error("array buffer is null");
      return;
    }

    overwrite(buffer, stat);

    const blob = new Blob([new Uint8Array(buffer)]);
    const href = await URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = filename;
    link.click();
  };

  return (
    <Button {...props} disabled={disabled} onClick={() => handleDownload()}>
      {props.children}
    </Button>
  );
};

export default ExportSaveButton;
