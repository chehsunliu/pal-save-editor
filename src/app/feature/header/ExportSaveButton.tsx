import { Button, ButtonProps } from "@material-ui/core";
import { useAppSelector } from "app/hook";

const ExportSaveButton = (props: ButtonProps) => {
  const raw = useAppSelector((state) => state.raw);
  const disabled = raw.filename === null;

  return (
    <Button {...props} disabled={disabled}>
      {props.children}
    </Button>
  );
};

export default ExportSaveButton;
