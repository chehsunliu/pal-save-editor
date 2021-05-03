import { Button, ButtonProps } from "@material-ui/core";
import { useAppSelector } from "app/hook";

const ResetButton = (props: ButtonProps) => {
  const filename = useAppSelector((state) => state.raw.filename);
  const disabled = filename === null;
  return (
    <Button {...props} disabled={disabled}>
      {props.children}
    </Button>
  );
};

export default ResetButton;
