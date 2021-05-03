import React, { FC, ReactElement } from "react";
import { Provider } from "react-redux";
import { render, RenderOptions } from "@testing-library/react";
import { configureAppStore } from "app/store";

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, "queries">) => {
  const wrapper: FC = ({ children }) => {
    return <Provider store={configureAppStore()}>{children}</Provider>;
  };

  return render(ui, { wrapper, ...options });
};

export * from "@testing-library/react";
export { customRender as render };
