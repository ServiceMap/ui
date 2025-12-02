import { authService } from "@/shared/api/auth";
import {
  type CollapsibleMenuBaseItem,
  type CollapsibleMenuItem,
  MENU_VARIANTS,
} from "@/shared/ui";

const isMenuItemVisible = (
  route: Omit<CollapsibleMenuBaseItem, "path">,
): boolean => {
  //if (route.hidden) return false;
  //if (!isFeatureEnabled(route.featureFlag)) return false;

  return (
    (!route.isAuthRequired || authService.isLoggedIn) &&
    authService.hasRole(route.permissions ?? [])
  );
};

export const buildMenu = (
  variant: MENU_VARIANTS,
  menu: CollapsibleMenuItem[],
): CollapsibleMenuItem[] => {
  const filterAndSortMenuItems = (
    menuItems: CollapsibleMenuItem[] | undefined,
  ) => {
    if (!menuItems) return menuItems;

    return menuItems
      .map((menuItem): CollapsibleMenuItem => {
        return {
          ...menuItem,
          ...(menuItem.children?.length
            ? {
                children: filterAndSortMenuItems(
                  menuItem.children,
                ) as CollapsibleMenuBaseItem[],
              }
            : {}),
        };
      })
      .filter((menuItem): boolean => {
        return (
          !!menuItem[variant] &&
          (!menuItem.children || !!menuItem.children.length) &&
          isMenuItemVisible(menuItem)
        );
      })
      .sort((firstMenuItem, secondMenuItem) => {
        return (firstMenuItem.priority ?? 0) - (secondMenuItem.priority ?? 0);
      });
  };

  return filterAndSortMenuItems(menu) ?? [];
};
