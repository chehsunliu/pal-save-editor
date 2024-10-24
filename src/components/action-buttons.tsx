import { Download, RotateCcw, Upload } from "lucide-react";
import { ChangeEvent, useRef } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button.tsx";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip.tsx";
import { tracer } from "@/lib/tracer.ts";

type ActionButtonsProps = {
  exportedFilename: string;
  exportDisabled?: boolean;
  resetDisabled?: boolean;
  onImport?: (params: { buffer: ArrayBuffer; filename: string }) => void;
  onExport?: () => ArrayBuffer;
  onReset?: () => void;
};

function ActionButtons({
  exportedFilename,
  exportDisabled,
  resetDisabled,
  onImport,
  onExport,
  onReset,
}: ActionButtonsProps) {
  const { t } = useTranslation("common");

  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const handleImportClick = () => {
    tracer.gtag("event", "retro_import", { page_title: document.title });
    hiddenFileInput.current?.click();
  };
  const handleImport = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) {
      console.error("e.target.files is null");
      return;
    }

    const targetFile = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      if (e.target === null) {
        console.error("e.target is null");
        return;
      }

      const buffer = e.target.result;
      if (!(buffer instanceof ArrayBuffer)) {
        console.error("buffer is not an instance of ArrayBuffer");
        return;
      }

      onImport?.({ buffer, filename: targetFile.name });
    };
    reader.readAsArrayBuffer(targetFile);
  };

  const handleExport = () => {
    tracer.gtag("event", "retro_export", { page_title: document.title });
    const buf = onExport?.();
    if (buf === undefined) {
      return;
    }

    const href = URL.createObjectURL(new Blob([buf]));
    const link = document.createElement("a");
    link.href = href;
    link.download = exportedFilename;
    link.click();
  };

  const handleReset = () => {
    tracer.gtag("event", "retro_reset", { page_title: document.title });
    onReset?.();
  };

  return (
    <div className={"space-x-1"}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant={"ghost"} onClick={handleImportClick}>
              <Upload className={"h-[1.2rem] w-[1.2rem]"} />
              <input
                hidden={true}
                type={"file"}
                ref={hiddenFileInput}
                onChange={handleImport}
                data-testid="import-input"
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className={"text-sm"}>{t("action.import")}</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant={"ghost"} disabled={exportDisabled} onClick={handleExport} data-testid="export-button">
              <Download className={"h-[1.2rem] w-[1.2rem]"} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className={"text-sm"}>{t("action.export")}</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant={"ghost"} disabled={resetDisabled} onClick={handleReset} data-testid="reset-button">
              <RotateCcw className={"h-[1.2rem] w-[1.2rem]"} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className={"text-sm"}>{t("action.reset")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

export default ActionButtons;
