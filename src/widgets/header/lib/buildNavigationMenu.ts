import { buildMenu, MENU_VARIANTS } from "@/shared/ui";
import { NAVIGATION_MENU } from "@/widgets/header/config";

export const buildNavigationMenu = (variant: MENU_VARIANTS) => {
  return buildMenu(variant, Array.from(NAVIGATION_MENU.values()));
};
