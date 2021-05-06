import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { InputBase } from "@material-ui/core";
import React from "react";

interface StyleProps {
  visible: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    itemField: (props: StyleProps) => ({
      display: "inline-block",
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(1),
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      backgroundColor: props.visible ? theme.palette.info.light : "#eee",
      borderRadius: 5,
      height: "30px",
    }),
    itemFieldLabel: {
      cursor: "pointer",
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
  const classes = useStyles({ visible });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseInt(e.target.value);
    if (!isNaN(v)) {
      onChange(v);
    }
  };

  return (
    <span className={classes.itemField}>
      <span className={classes.itemFieldLabel} onClick={() => onVisibilityToggle()}>
        {label}
      </span>
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
