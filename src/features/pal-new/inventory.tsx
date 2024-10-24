import { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

import { H2 } from "@/components/typography.tsx";
import { Input } from "@/components/ui/input";
import { useStats } from "@/features/pal-new/stats-provider.tsx";
import { tracer } from "@/lib/tracer.ts";
import { cn } from "@/lib/utils.ts";

const itemValueRanges = [
  [0x0bb9, 0x0bd3],
  [0x0beb, 0x0c03],
  [0x0c1d, 0x0c29],
  [0x0c4f, 0x0c5f],
  [0x0c81, 0x0c8a],
  [0x0cb3, 0x0cbe],
  [0x0ce5, 0x0ce8],
  [0x0d17, 0x0d19],
  [0x0d49, 0x0d53],
  [0x0d7b, 0x0d8b],
  [0x0e11, 0x0e2a],
  [0x0e43, 0x0e4f],
  [0x0e75, 0x0e78],
  [0x0ea7, 0x0eaf],
  [0x0ed9, 0x0edd],
  [0x0f3d, 0x0f43],
  [0x0f6f, 0x0f77],
  [0x1069, 0x1073],
  [0x109b, 0x109e],
  [0x10cd, 0x10d3],
  [0x10ff, 0x1107],
  [0x1131, 0x1139],
];

const createValues = (ranges: number[][]): number[] =>
  ranges.reduce((acc, x) => {
    const [a0, a1] = x;
    return [...acc, ...Array.from({ length: a1 - a0 + 1 }, (_, i) => i + a0)];
  }, []);

const itemValues = createValues(itemValueRanges);

function InventorySection() {
  const { t } = useTranslation("common");
  const { t: t2 } = useTranslation("pal-new");
  const { stats, isEditingDisabled, setInventoryItem } = useStats();

  const items = itemValues.map((v) => {
    const label = t2(`inventory.0x${v.toString(16).padStart(4, "0")}`);
    const count = stats.inventory[v] ?? 0;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const newCount = parseInt(e.target.value, 10);
      tracer.gtag("event", "retro_inventory_change", {
        page_title: document.title,
        item_name: label,
        item_count: newCount,
      });
      setInventoryItem(v, newCount);
    };

    return (
      <span
        key={v}
        className={cn(
          "rounded-lg px-2 flex items-center justify-between",
          count > 0 ? "bg-amber-400 dark:bg-amber-800" : "",
        )}
      >
        <span>{label}</span>
        <Input
          className={"border-none focus-visible:ring-0 text-right w-10 shadow-none"}
          value={count}
          onChange={handleChange}
          disabled={isEditingDisabled()}
        />
      </span>
    );
  });

  return (
    <>
      <H2>{t("subtitle.inventory")}</H2>
      <div className={"grid grid-cols-8 gap-2"}>{items}</div>
    </>
  );
}

export default InventorySection;
