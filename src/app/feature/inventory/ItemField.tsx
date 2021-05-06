import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { IconButton, InputBase } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    itemField: {
      display: "inline-block",
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(1),
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      backgroundColor: "#eee",
      borderRadius: 5,
      height: "30px",
    },
    itemFieldButton: {
      verticalAlign: "-0.2em",
    },
    itemFieldLabel: {
      marginRight: theme.spacing(1),
      marginTop: 0,
      marginBottom: 0,
      display: "inline-block",
      width: "82px",
    },
    itemFieldInput: {
      width: 20,
    },
  })
);

interface ItemFieldProps {
  label: string;
  value: number;
  visible: boolean;
  onChange: (value: number) => void;
  onVisibilityToggle: () => void;
}

const ItemField = (props: ItemFieldProps) => {
  const { label, value, visible, onChange, onVisibilityToggle } = props;
  const classes = useStyles();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseInt(e.target.value);
    if (!isNaN(v)) {
      onChange(v);
    }
  };

  return (
    <span className={classes.itemField}>
      <IconButton className={classes.itemFieldButton} size="small" onClick={() => onVisibilityToggle()}>
        {visible ? <Visibility fontSize="inherit" /> : <VisibilityOff fontSize="inherit" />}
      </IconButton>
      <span className={classes.itemFieldLabel}>{label}</span>
      <InputBase
        className={classes.itemFieldInput}
        inputProps={{ style: { textAlign: "right" } }}
        value={value}
        onChange={handleChange}
      />
    </span>
  );
};

export default ItemField;
