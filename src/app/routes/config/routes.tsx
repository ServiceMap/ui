import { lazy } from "react";
import type { RouteObject } from "react-router";
import { Navigate } from "react-router-dom";

import { ProtectedRoute, RoleBasedRoute } from "@/app/routes/ui";
import { ROLES } from "@/entities/user";
import { PAGE_ROUTES } from "@/shared/consts";

const DashboardPage = lazy(() =>
  import("@/pages/dashboard").then((module) => ({
    default: module.DashboardPage,
  })),
);
const AccessDeniedPage = lazy(() =>
  import("@/pages/error").then((module) => ({
    default: module.AccessDeniedPage,
  })),
);
const NotFoundPage = lazy(() =>
  import("@/pages/error").then((module) => ({
    default: module.NotFoundPage,
  })),
);
const HomePage = lazy(() =>
  import("@/pages/home").then((module) => ({
    default: module.HomePage,
  })),
);
const StripeTestPage = lazy(() =>
  import("@/pages/payment").then((module) => ({
    default: module.StripeTestPage,
  })),
);
const UserSettingsPage = lazy(() =>
  import("@/pages/user-settings").then((module) => ({
    default: module.UserSettingsPage,
  })),
);

export const AllRoutes: RouteObject[] = [
  {
    index: true,
    element: <Navigate to={PAGE_ROUTES.HOME} replace />,
  },
  {
    path: PAGE_ROUTES.HOME,
    element: <HomePage />,
  },
  {
    path: PAGE_ROUTES.DASHBOARD,
    element: (
      <ProtectedRoute>
        <RoleBasedRoute
          roles={[ROLES.SUPER_ADMIN, ROLES.COMPANY_ADMIN, ROLES.MASTER]}
        >
          <DashboardPage />
        </RoleBasedRoute>
      </ProtectedRoute>
    ),
  },
  {
    path: PAGE_ROUTES.USER_SETTINGS,
    element: (
      <ProtectedRoute>
        <UserSettingsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: PAGE_ROUTES.PAYMENT,
    element: <StripeTestPage />,
  },
  {
    path: PAGE_ROUTES.ACCESS_DENIED,
    element: <AccessDeniedPage />,
  },
  {
    path: PAGE_ROUTES.DEFAULT,
    element: <NotFoundPage />,
  },
];
