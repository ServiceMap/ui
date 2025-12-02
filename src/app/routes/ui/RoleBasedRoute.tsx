import React from "react";
import { Navigate } from "react-router-dom";

import { ROLES } from "@/entities/user";
import { authService } from "@/shared/api/auth";
import { PAGE_ROUTES } from "@/shared/consts";

export const RoleBasedRoute: React.FC<{
  children: React.ReactNode;
  roles: ROLES[];
}> = ({ children, roles }) => {
  const hasAccess = authService.hasRole(roles);
  return hasAccess ? (
    <>{children}</>
  ) : (
    <Navigate to={PAGE_ROUTES.ACCESS_DENIED} replace />
  );
};
