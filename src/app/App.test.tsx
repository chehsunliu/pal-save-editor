import App from "app/App";
import { render, screen } from "app/test-utils";

describe("<App />", () => {
  beforeEach(() => {
    render(<App />);
  });

  it("renders with reset and export buttons disabled", () => {
    const btnReset = screen.getByTestId("pal-reset-btn");
    const btnExport = screen.getByTestId("pal-export-btn");
    const btnImport = screen.getByTestId("pal-import-btn");
    const btnLanguage = screen.getByTestId("pal-language-btn");

    expect(btnReset.getAttribute("disabled")).toEqual("");
    expect(btnExport.getAttribute("disabled")).toEqual("");
    expect(btnImport.hasAttribute("disabled")).toBeFalsy();
    expect(btnLanguage.hasAttribute("disabled")).toBeFalsy();

    expect(btnLanguage.textContent).toEqual("tw");
  });
});
