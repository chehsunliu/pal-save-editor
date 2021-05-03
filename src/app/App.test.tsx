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
    expect(moneyField.value).toEqual("0");
  });
});

describe("<App /> with 2.RPG", () => {
  beforeEach(async () => {
    render(<App />);

    const buffer = readFileSync(`${__dirname}/util/__tests__/2.RPG`);
    const file = new File([buffer], "2.RPG");
    const inputImport = screen.getByTestId("pal-import-btn-input");
    fireEvent.change(inputImport, { target: { files: [file] } });

    const moneyField = screen.getByTestId("pal-field-money").getElementsByTagName("input")[0];
    await waitFor(() => expect(moneyField.value).toEqual("496348"));
  });

  it("should render without disabled buttons", () => {
    const btnReset = screen.getByTestId("pal-reset-btn");
    const btnExport = screen.getByTestId("pal-export-btn");
    expect(btnReset.hasAttribute("disabled")).toBeFalsy();
    expect(btnExport.hasAttribute("disabled")).toBeFalsy();
  });

  test("when the game progress fields are modified and reset", () => {
    const saveCountField = screen.getByTestId("pal-field-save-count").getElementsByTagName("input")[0];
    const memberCountField = screen.getByTestId("pal-field-member-count").getElementsByTagName("input")[0];
    const moneyField = screen.getByTestId("pal-field-money").getElementsByTagName("input")[0];
    const btnReset = screen.getByTestId("pal-reset-btn");

    fireEvent.change(saveCountField, { target: { value: "22" } });
    fireEvent.change(memberCountField, { target: { value: "3" } });
    fireEvent.change(moneyField, { target: { value: "5566" } });
    expect(saveCountField.value).toEqual("22");
    expect(memberCountField.value).toEqual("3");
    expect(moneyField.value).toEqual("5566");

    fireEvent.click(btnReset);
    expect(saveCountField.value).toEqual("17");
    expect(memberCountField.value).toEqual("2");
    expect(moneyField.value).toEqual("496348");
  });
});
