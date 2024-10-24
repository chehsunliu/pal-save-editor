import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";

import { StatsProvider as PalNewStatsProvider } from "@/features/pal-new/stats-provider.tsx";
import { StatsProvider as PalStatsProvider } from "@/features/pal/stats-provider.tsx";
import { StatsProvider as Swd2eStatsProvider } from "@/features/swd-2e/stats-provider.tsx";
import { ThemeProvider } from "@/hooks/theme-provider.tsx";
import "@/i18n.ts";
import "@/index.css";
import App from "@/routes/app.tsx";
import PalNewApp from "@/routes/pal-new.tsx";
import PalApp from "@/routes/pal.tsx";
import Root from "@/routes/root.tsx";
import Swd2eApp from "@/routes/swd-2e.tsx";

const router = createHashRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<p>loading...</p>}>
        <Swd2eStatsProvider>
          <PalNewStatsProvider>
            <PalStatsProvider>
              <Root />
            </PalStatsProvider>
          </PalNewStatsProvider>
        </Swd2eStatsProvider>
      </Suspense>
    ),
    children: [
      {
        path: "",
        element: <App />,
      },
      {
        path: "pal",
        element: <PalApp />,
      },
      {
        path: "pal-new",
        element: <PalNewApp />,
      },
      {
        path: "swd-2e",
        element: <Swd2eApp />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);
