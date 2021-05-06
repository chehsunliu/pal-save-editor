import { Typography } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "app/hook";
import { Item } from "app/util/editor";
import { itemCountChanged } from "app/feature/inventory/inventorySlice";
import ItemField from "app/feature/inventory/ItemField";

const Inventory = () => {
  const inventory = useAppSelector((state) => state.inventory);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleChange = (id: number) => (value: number) => {
    dispatch(itemCountChanged({ id, count: value }));
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        {t("inventory.title")}
      </Typography>
      <div>
        {Object.entries<Item>(inventory).map((a) => {
          const [id, item] = a;
          const id2 = parseInt(id);
          return (
            <ItemField key={id} label={t(`inventory.names.${id}`)} value={item.count} onChange={handleChange(id2)} />
          );
        })}
      </div>
    </>
  );
};

export default Inventory;
