import { useTranslation } from "react-i18next";

import ActionButtons from "@/components/action-buttons.tsx";
import { H1, H2 } from "@/components/typography.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import CharacterCard from "@/features/pal/character-card.tsx";
import InventorySection from "@/features/pal/inventory.tsx";
import { useStats } from "@/features/pal/stats-provider.tsx";
import { characterIds } from "@/features/pal/stats-provider.tsx";

function GeneralSection() {
  const { t } = useTranslation("common");
  const { t: t2 } = useTranslation("pal");
  const { stats, isEditingDisabled, setSavingCount, setHuluValue, setMoney } = useStats();

  return (
    <>
      <H2>{t("subtitle.general")}</H2>
      <div className={"grid grid-cols-8 gap-4"}>
        <div>
          <Label htmlFor={"savingCount"}>{t2("savingCount")}</Label>
          <Input
            id={"savingCount"}
            value={stats.savingCount}
            onChange={(e) => setSavingCount(parseInt(e.target.value, 10))}
            disabled={isEditingDisabled()}
          />
        </div>
        <div>
          <Label htmlFor={"huluValue"}>{t2("huluValue")}</Label>
          <Input
            id={"huluValue"}
            value={stats.huluValue}
            onChange={(e) => setHuluValue(parseInt(e.target.value, 10))}
            disabled={isEditingDisabled()}
          />
        </div>
        <div>
          <Label htmlFor={"money"}>{t2("money")}</Label>
          <Input
            id={"money"}
            value={stats.money}
            onChange={(e) => setMoney(parseInt(e.target.value, 10))}
            disabled={isEditingDisabled()}
          />
        </div>
      </div>
    </>
  );
}

function CharacterSection() {
  const { t } = useTranslation("common");
  const characterBlocks = characterIds.map((id) => <CharacterCard id={id} key={id} />);

  return (
    <>
      <H2>{t("subtitle.character")}</H2>
      <div className={"grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4"}>{characterBlocks}</div>
    </>
  );
}

export function PalApp() {
  const { t } = useTranslation("common");
  const { stats, getModifiedBuffer, setBufIn } = useStats();

  const handleImport = (input: { buffer: ArrayBuffer; filename: string }) => {
    setBufIn({ buf: input.buffer, filename: input.filename });
  };

  const handleExport = () => {
    return getModifiedBuffer();
  };

  const handleReset = () => {
    setBufIn({ buf: stats.bufIn, filename: stats.filename });
  };

  return (
    <div className={"space-y-8"}>
      <div className={"flex flex-row justify-between items-end"}>
        <H1>{t("title.pal")}</H1>
        <ActionButtons
          exportedFilename={stats.filename}
          exportDisabled={stats.bufIn.byteLength === 0}
          resetDisabled={stats.bufIn.byteLength === 0}
          onImport={handleImport}
          onExport={handleExport}
          onReset={handleReset}
        />
      </div>
      <GeneralSection />
      <CharacterSection />
      <InventorySection />
    </div>
  );
}
