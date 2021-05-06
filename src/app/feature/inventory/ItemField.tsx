import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { IconButton, InputBase } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
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
    },
    itemFieldInput: {
      width: 20,
    },
  })
);

interface ItemFieldProps {
  label: string;
  value: number;
  onDelete: () => void;
  onChange: (value: number) => void;
}

const ItemField = (props: ItemFieldProps) => {
  const { label, value, onDelete, onChange } = props;
  const classes = useStyles();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseInt(e.target.value);
    if (!isNaN(v)) {
      onChange(v);
    }
  };

  return (
    <span className={classes.itemField}>
      <IconButton className={classes.itemFieldButton} color="primary" size="small" onClick={() => onDelete()}>
        <ClearIcon fontSize="inherit" />
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
