import { afterEach, beforeEach, vi } from "vitest";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

let oldAnchorClick: () => void = () => {};

beforeEach(() => {
  oldAnchorClick = HTMLAnchorElement.prototype.click;
  HTMLAnchorElement.prototype.click = vi.fn();
});

afterEach(() => {
  HTMLAnchorElement.prototype.click = oldAnchorClick;
});
