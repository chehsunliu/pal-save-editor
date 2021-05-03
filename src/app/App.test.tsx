import App from "app/App";
import { render } from "app/test-utils";

describe("<App />", () => {
  it("renders without errors", () => {
    render(<App />);
  });
});
