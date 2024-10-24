import { useTranslation } from "react-i18next";

import { H2 } from "@/components/typography.tsx";
import { Button } from "@/components/ui/button";
import { useStats } from "@/features/swd-2e/stats-provider.tsx";
import { cn } from "@/lib/utils.ts";

const itemValueRanges = [
  [0x0001, 0x003a],
  [0x003c, 0x0040],
  [0x0042, 0x0043],
  // [0x0044, 0x0048], // Herbs of natural elements, which are all non-removable.
  [0x0049, 0x00b2],
  [0x00b4, 0x00c5],
  [0x00c7, 0x00de],
  [0x00e6, 0x010e],
];

const monsterValueRanges = [
  [0x013a, 0x0169],
  [0x016b, 0x018e],
  [0x0190, 0x01f0],
  [0x01f2, 0x01fd],
];

const createValues = (ranges: number[][]): number[] =>
  ranges.reduce((acc, x) => {
    const [a0, a1] = x;
    return [...acc, ...Array.from({ length: a1 - a0 + 1 }, (_, i) => i + a0)];
  }, []);

const itemValues = createValues(itemValueRanges);
const monsterValues = createValues(monsterValueRanges);

function Inventory() {
  const { t: t2 } = useTranslation("swd-2e");
  const { stats, removeInventoryItem } = useStats();

  const handleClick = (index: number) => () => {
    removeInventoryItem(index);
  };

  const items = stats.inventory.map((value, index) => (
    <Button key={index} variant={"ghost"} onClick={handleClick(index)}>
      {t2(`inventory.0x${value.toString(16).padStart(4, "0")}`)}
    </Button>
  ));

  return (
    <div
      className={cn(
        "grid grid-cols-8 gap-4 border-2 p-3 min-h-36",
        stats.inventory.length === 45 ? "border-red-400" : "",
      )}
    >
      {items}
    </div>
  );
}

function AvailableItems() {
  const { t: t2 } = useTranslation("swd-2e");
  const { isEditingDisabled, appendInventoryItem } = useStats();

  const handleClick = (addr: number) => () => {
    appendInventoryItem(addr);
  };

  const items = itemValues.map((value) => (
    <Button key={value} variant={"ghost"} onClick={handleClick(value)} disabled={isEditingDisabled()}>
      {t2(`inventory.0x${value.toString(16).padStart(4, "0")}`)}
    </Button>
  ));

  return <div className={"overflow-y-auto h-64 grid grid-cols-6 gap-4"}>{items}</div>;
}

function AvailableMonsters() {
  const { t: t2 } = useTranslation("swd-2e");
  const { isEditingDisabled, appendInventoryItem } = useStats();

  const handleClick = (addr: number) => () => {
    appendInventoryItem(addr);
  };

  const items = monsterValues.map((value) => (
    <Button key={value} variant={"ghost"} onClick={handleClick(value)} disabled={isEditingDisabled()}>
      {t2(`inventory.0x${value.toString(16).padStart(4, "0")}`)}
    </Button>
  ));

  return <div className={"overflow-y-auto h-64 grid grid-cols-6 gap-4"}>{items}</div>;
}

function InventorySection() {
  const { t } = useTranslation("common");

  return (
    <>
      <H2>{t("subtitle.inventory")}</H2>
      <div className={"flex flex-col space-x-4"}>
        <Inventory />
        <div className={"flex flex-row space-x-3 p-3"}>
          <div className={"flex-auto"}>
            <AvailableItems />
          </div>
          <div className={"flex-auto"}>
            <AvailableMonsters />
          </div>
        </div>
      </div>
    </>
  );
}

export default InventorySection;
