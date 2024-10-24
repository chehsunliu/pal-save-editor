import { render, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { pause } from "@/__tests__/utils.ts";
import ActionButtons from "@/components/action-buttons.tsx";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("Import button", () => {
  afterEach(() => {
    cleanup();
  });

  it("triggers onImport after file upload", async () => {
    let buffer: ArrayBuffer | undefined;
    let filename = "";
    const handleImport = (params: { buffer: ArrayBuffer; filename: string }) => {
      buffer = params.buffer;
      filename = params.filename;
    };

    const { getByTestId } = render(<ActionButtons exportedFilename={""} onImport={handleImport} />);
    const importInput = getByTestId("import-input");

    const f = new File(["foobar"], "foo.txt", { type: "text/plain" });
    await userEvent.upload(importInput, f);

    await pause(100);
    expect(filename).toBe("foo.txt");
    expect(new TextDecoder().decode(buffer)).toBe("foobar");
  });
});
