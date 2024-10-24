import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import fs from "node:fs";
import path from "path";
import { afterEach, describe, it, vi, expect } from "vitest";

import { pause } from "@/__tests__/utils.ts";
import { Swd2eApp } from "@/features/swd-2e";
import { attrKeys, StatsProvider as Swd2eStatsProvider } from "@/features/swd-2e/stats-provider.tsx";

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
      <Swd2eStatsProvider>
        <Swd2eApp />
      </Swd2eStatsProvider>,
    );

    expect(screen.getByLabelText("money").hasAttribute("disabled")).toBeTruthy();

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
      <Swd2eStatsProvider>
        <Swd2eApp />
      </Swd2eStatsProvider>,
    );

    const importInput = screen.getByTestId("import-input");
    const buffer = fs.readFileSync(path.join(__dirname, "./data/SAVE.ZA1"));
    await userEvent.upload(importInput, new File([buffer], "SAVE.ZA1"));

    await pause(100);
    expect(screen.getByLabelText("money").getAttribute("value")).toBe("12324");
  });
});
