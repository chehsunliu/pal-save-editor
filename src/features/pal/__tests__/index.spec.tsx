import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import assert from "node:assert";
import * as fs from "node:fs";
import path from "path";
import { beforeEach, afterEach, describe, it, vi, expect } from "vitest";

import { arrayBufferAreEqual, captureExportedBuffer, pause } from "@/__tests__/utils.ts";
import { PalApp } from "@/features/pal";
import { attrKeys, StatsProvider as PalStatsProvider } from "@/features/pal/stats-provider.tsx";

const mocks = {
  // @ts-expect-error: need `blob` to correct the type of `.mock.lastCall`.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  urlCreateObjectURL: vi.fn((blob: Blob) => ""),
};

// Handle `TypeError: URL.createObjectURL is not a function`.
assert.ok(global.URL.createObjectURL === undefined);
global.URL.createObjectURL = mocks.urlCreateObjectURL;

beforeEach(() => {
  mocks.urlCreateObjectURL.mockClear();
});

describe("Before import", () => {
  afterEach(() => {
    cleanup();
  });

  it("blocks editing", async () => {
    render(
      <PalStatsProvider>
        <PalApp />
      </PalStatsProvider>,
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
      <PalStatsProvider>
        <PalApp />
      </PalStatsProvider>,
    );

    const importInput = screen.getByTestId("import-input");
    const buffer = fs.readFileSync(path.join(__dirname, "./data/dos/1.RPG"));
    await userEvent.upload(importInput, new File([buffer], "1.RPG"));

    await pause(100);
    expect(screen.getByLabelText("money").getAttribute("value")).toBe("917153");
  });

  it("makes no change on exported file if nothing changes", async () => {
    render(
      <PalStatsProvider>
        <PalApp />
      </PalStatsProvider>,
    );

    const importInput = screen.getByTestId("import-input");
    const buffer = fs.readFileSync(path.join(__dirname, "./data/dos/1.RPG"));
    await userEvent.upload(importInput, new File([buffer], "1.RPG"));

    await pause(100);
    const exportButton = screen.getByTestId("export-button");
    await userEvent.click(exportButton);

    assert.ok(mocks.urlCreateObjectURL.mock.lastCall);
    const blob: Blob = mocks.urlCreateObjectURL.mock.lastCall[0];
    const exportedBuffer = await captureExportedBuffer(blob);
    expect(arrayBufferAreEqual(exportedBuffer, buffer.buffer)).toBeTruthy();
  });
});
