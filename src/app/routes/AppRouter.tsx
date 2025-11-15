import { ErrorBoundary } from "react-error-boundary";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Layout } from "@/app/layout";
import { AllRoutes } from "@/app/routes/config";
import { PAGE_ROUTES } from "@/shared/consts";
import { historyBackOrDefault } from "@/shared/lib";
import { FallbackElement } from "@/shared/ui";

const appRouter = createBrowserRouter([
  {
    path: PAGE_ROUTES.ROOT,
    element: (
      <ErrorBoundary
        fallbackRender={FallbackElement}
        onReset={() => historyBackOrDefault(PAGE_ROUTES.ROOT)}
        onError={(error, info) => {
          console.error(error, info);
        }}
      >
        <Layout />
      </ErrorBoundary>
    ),
    children: AllRoutes,
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={appRouter} />;
};
