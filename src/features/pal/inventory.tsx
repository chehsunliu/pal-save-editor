import { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

import { H2 } from "@/components/typography.tsx";
import { Input } from "@/components/ui/input.tsx";
import { useStats } from "@/features/pal/stats-provider.tsx";
import { cn } from "@/lib/utils.ts";

const itemValueRanges = [[0x003d, 0x0126]];

const createValues = (ranges: number[][]): number[] =>
  ranges.reduce((acc, x) => {
    const [a0, a1] = x;
    return [...acc, ...Array.from({ length: a1 - a0 + 1 }, (_, i) => i + a0)];
  }, []);

const itemValues = createValues(itemValueRanges);

function InventorySection() {
  const { t } = useTranslation("common");
  const { t: t2 } = useTranslation("pal");
  const { stats, isEditingDisabled, setInventoryItem, removeInventoryItem } = useStats();

  const items = itemValues.map((v) => {
    const label = t2(`inventory.0x${v.toString(16).padStart(4, "0")}`);
    const usage = stats.inventory[v];

    const handleClick = () => {
      if (usage !== undefined) {
        removeInventoryItem(v);
      } else {
        setInventoryItem(v, { count: 0, used: 0 });
      }
    };

    const handleCountChange = (e: ChangeEvent<HTMLInputElement>) => {
      const count = parseInt(e.target.value, 10);
      if (isNaN(count)) {
        return;
      }
      setInventoryItem(v, { ...usage, count });
    };

    const handleUsedChange = (e: ChangeEvent<HTMLInputElement>) => {
      const used = parseInt(e.target.value, 10);
      if (isNaN(used)) {
        return;
      }
      setInventoryItem(v, { ...usage, used });
    };

    return (
      <span
        key={v}
        className={cn(
          "rounded-lg px-2 flex items-center justify-between",
          usage !== undefined ? "bg-amber-400 dark:bg-amber-800" : "",
        )}
      >
        <span className={"hover:cursor-pointer"} onClick={handleClick}>
          {label}
        </span>
        <div className={"flex items-center space-x-0"}>
          <Input
            className={"border-none focus-visible:ring-0 text-right w-6 pl-0 pr-1 shadow-none"}
            value={usage?.count ?? 0}
            onChange={handleCountChange}
            disabled={isEditingDisabled()}
          />
          <span className={cn(isEditingDisabled() ? "text-slate-400" : "")}>/</span>
          <Input
            className={"border-none focus-visible:ring-0 text-right w-6 px-0 shadow-none"}
            value={usage?.used ?? 0}
            onChange={handleUsedChange}
            disabled={isEditingDisabled()}
          />
        </div>
      </span>
    );
  });

  return (
    <>
      <H2>{t("subtitle.inventory")}</H2>
      <div className={"grid grid-cols-6 gap-2"}>{items}</div>
    </>
  );
}

export default InventorySection;
