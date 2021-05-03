import App from "app/App";
import { render, screen, fireEvent, waitFor } from "app/test-utils";
import { readFileSync } from "fs";

describe("<App />", () => {
  beforeEach(() => {
    render(<App />);
  });

  it("renders with reset and export buttons disabled", async () => {
    const btnReset = screen.getByTestId("pal-reset-btn");
    const btnExport = screen.getByTestId("pal-export-btn");
    const btnImport = screen.getByTestId("pal-import-btn");
    const btnLanguage = screen.getByTestId("pal-language-btn");

    expect(btnReset.getAttribute("disabled")).toEqual("");
    expect(btnExport.getAttribute("disabled")).toEqual("");
    expect(btnImport.hasAttribute("disabled")).toBeFalsy();
    expect(btnLanguage.hasAttribute("disabled")).toBeFalsy();

    expect(btnLanguage.textContent).toEqual("tw");

    const moneyField = screen.getByTestId("pal-field-money").getElementsByTagName("input")[0];
    await waitFor(() => expect(moneyField.value).not.toBeNull());
    expect(moneyField.value).toEqual("0");
  });

  it("renders with 2.RPG uploaded", async () => {
    const buffer = readFileSync(`${__dirname}/util/__tests__/2.RPG`);
    const file = new File([buffer], "2.RPG");

    const inputImport = screen.getByTestId("pal-import-btn-input");
    fireEvent.change(inputImport, { target: { files: [file] } });

    const btnReset = screen.getByTestId("pal-reset-btn");
    await waitFor(() => expect(btnReset.getAttribute("disabled")).toBeNull());

    const moneyField = screen.getByTestId("pal-field-money").getElementsByTagName("input")[0];
    expect(moneyField.value).toEqual("496348");
  });
});
