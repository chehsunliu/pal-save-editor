import { Typography } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "app/hook";
import { itemCountChanged, itemVisibilityToggled } from "app/feature/inventory/inventorySlice";
import ItemField from "app/feature/inventory/ItemField";
import { Item } from "app/util/editor";

const Inventory = () => {
  const inventory = useAppSelector((state) => state.inventory);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleChange = (id: number) => (value: number) => {
    dispatch(itemCountChanged({ id, count: value }));
  };

  const handleToggle = (id: number) => () => {
    dispatch(itemVisibilityToggled({ id }));
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
            <ItemField
              key={id}
              label={t(`inventory.names.${id}`)}
              value={item.count}
              visible={item.visible}
              onChange={handleChange(id2)}
              onVisibilityToggle={handleToggle(id2)}
            />
          );
        })}
      </div>
    </>
  );
};

export default Inventory;
