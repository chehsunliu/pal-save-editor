import { Button, ButtonProps } from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "app/hook";
import { loadBinaryAsArrayBuffer } from "app/util/storage";
import { load } from "app/util/editor";
import { replaced as gameProgressReplaced } from "app/feature/gameProgress/gameProgressSlice";
import { replaced as charactersReplaced } from "app/feature/characters/charactersSlice";
import { replaced as inventoryReplaced } from "app/feature/inventory/inventorySlice";

const ResetButton = (props: ButtonProps) => {
  const dispatch = useAppDispatch();
  const filename = useAppSelector((state) => state.raw.filename);
  const disabled = filename === null;

  const handleClick = () => {
    if (filename === null) {
      console.error("filename is null");
      return;
    }

    const buffer = loadBinaryAsArrayBuffer(filename);
    if (buffer === null) {
      console.error("buffer is null");
      return;
    }

    const save = load(buffer);
    dispatch(gameProgressReplaced({ state: save.gameProgress }));
    dispatch(charactersReplaced({ state: save.characters }));
    dispatch(inventoryReplaced({ state: save.inventory }));
  };

  return (
    <Button {...props} disabled={disabled} onClick={() => handleClick()}>
      {props.children}
    </Button>
  );
};

export default ResetButton;
