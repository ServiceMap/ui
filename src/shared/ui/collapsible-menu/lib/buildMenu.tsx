import { menuItemIsVisible } from "@/shared/lib";
import {
  type CollapsibleMenuBaseItem,
  type CollapsibleMenuItem,
  MENU_VARIANTS,
} from "@/shared/ui";

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
          menuItemIsVisible(menuItem)
        );
      })
      .sort((firstMenuItem, secondMenuItem) => {
        return (firstMenuItem.priority ?? 0) - (secondMenuItem.priority ?? 0);
      });
  };

  return filterAndSortMenuItems(menu) ?? [];
};
