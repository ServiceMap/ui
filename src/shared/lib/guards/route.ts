import { authService } from "@/shared/api/auth";
import type { CollapsibleMenuBaseItem } from "@/shared/ui/collapsible-menu/model";

export const menuItemIsVisible = (
  route: Omit<CollapsibleMenuBaseItem, "path">,
) => {
  //if (route.hidden) return false;
  //if (!isFeatureEnabled(route.featureFlag)) return false;

  return (
    (!route.isAuthRequired || authService.isLoggedIn) &&
    authService.hasRole(route.permissions ?? [])
  );
};
