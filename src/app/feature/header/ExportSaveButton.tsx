import { Button, ButtonProps } from "@material-ui/core";
import { useAppSelector } from "app/hook";
import { loadBinaryAsArrayBuffer } from "app/util/storage";

const ExportSaveButton = (props: ButtonProps) => {
  const raw = useAppSelector((state) => state.raw);
  const disabled = raw.filename === null;

  const handleDownload = async () => {
    if (raw.filename === null) {
      console.error("filename is null");
      return;
    }

    const buffer = loadBinaryAsArrayBuffer(raw.filename);
    if (buffer === null) {
      console.error("array buffer is null");
      return;
    }

    const blob = new Blob([new Uint8Array(buffer)]);
    const href = await URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = raw.filename;
    link.click();
  };

  return (
    <Button {...props} disabled={disabled} onClick={() => handleDownload()}>
      {props.children}
    </Button>
  );
};

export default ExportSaveButton;
