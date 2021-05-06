import { Badge, Chip, Grid, IconButton, InputAdornment, InputBase, TextField, Typography } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "app/hook";
import { Item } from "app/util/editor";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import ClearIcon from "@material-ui/icons/Clear";

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
}

const ItemField = (props: ItemFieldProps) => {
  const { label, value } = props;
  const classes = useStyles();
  return (
    <span className={classes.itemField}>
      <IconButton className={classes.itemFieldButton} size="small">
        <ClearIcon fontSize="inherit" />
      </IconButton>
      <span className={classes.itemFieldLabel}>{label}</span>
      <InputBase className={classes.itemFieldInput} inputProps={{ style: { textAlign: "right" } }} value={value} />
    </span>
  );
};

const Inventory = () => {
  const inventory = useAppSelector((state) => state.inventory);
  const { t } = useTranslation();

  return (
    <>
      <Typography variant="h4" gutterBottom>
        {t("inventory.title")}
      </Typography>
      <div>
        {Object.entries<Item>(inventory).map((a) => {
          const [id, item] = a;
          return <ItemField key={id} label={t(`inventory.names.${id}`)} value={item.count} />;
        })}
      </div>
    </>
  );
};

export default Inventory;
