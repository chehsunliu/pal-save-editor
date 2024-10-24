import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as fs from "node:fs";
import path from "path";
import { afterEach, describe, it, vi, expect } from "vitest";

import { pause } from "@/__tests__/utils.ts";
import { PalNewApp } from "@/features/pal-new";
import { attrKeys, StatsProvider as PalNewStatsProvider } from "@/features/pal-new/stats-provider.tsx";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("Before import", () => {
  afterEach(() => {
    cleanup();
  });

  it("blocks editing", async () => {
    render(
      <PalNewStatsProvider>
        <PalNewApp />
      </PalNewStatsProvider>,
    );

    expect(screen.getByLabelText("money").hasAttribute("disabled")).toBeTruthy();
    expect(screen.getByLabelText("godOfWineUsage").hasAttribute("disabled")).toBeTruthy();

    for (const attr of attrKeys) {
      const inputs = screen.getAllByLabelText(`attrs.${attr}`);
      expect(inputs.every((input) => input.hasAttribute("disabled"))).toBeTruthy();
    }
  });
});

describe("After import", () => {
  afterEach(() => {
    cleanup();
  });

  it("should show the game stats correctly", async () => {
    render(
      <PalNewStatsProvider>
        <PalNewApp />
      </PalNewStatsProvider>,
    );

    const importInput = screen.getByTestId("import-input");
    const buffer = fs.readFileSync(path.join(__dirname, "./data/1.sav"));
    await userEvent.upload(importInput, new File([buffer], "1.sav"));

    await pause(100);
    expect(screen.getByLabelText("money").getAttribute("value")).toBe("5058871");
  });
});
