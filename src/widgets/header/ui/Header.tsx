import { useEffect } from "react";
import { Link } from "react-router-dom";

import { CSS_VARS, PAGE_ROUTES } from "@/shared/consts";
import { setCssVariables, useDebounce, useElementSize } from "@/shared/lib";
import {
  LanguageSelector,
  MENU_VARIANTS,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  SiteLogo,
  ThemeSelector,
} from "@/shared/ui";
import { buildNavigationMenu } from "@/widgets/header/lib";
import { MobileMenu } from "@/widgets/header/ui/MobileMenu.tsx";
import { UserMenu } from "@/widgets/header/ui/UserMenu.tsx";

export const Header = () => {
  const { ref: headerRef, size: headerSize } = useElementSize();
  const setCssVariablesDebounce = useDebounce();
  const desktopMenu = buildNavigationMenu(MENU_VARIANTS.DESKTOP);

  useEffect(() => {
    const height = headerSize.height;
    const width = headerSize.width;

    const setCssVariablesToDocument = () => {
      setCssVariables(document.documentElement, [
        {
          property: CSS_VARS.headerH,
          value: `${height}px`,
        },
        {
          property: CSS_VARS.headerW,
          value: `${width}px`,
        },
      ]);
    };

    setCssVariablesDebounce(setCssVariablesToDocument);
  }, [headerSize.height, headerSize.width, setCssVariablesDebounce]);

  return (
    <header
      ref={headerRef}
      className="tw:flex tw:items-stretch tw:justify-between tw:border-b tw:px-6 tw:py-3"
    >
      <div className="tw:flex tw:h-auto tw:items-center tw:gap-4">
        <SiteLogo clickableRoute={PAGE_ROUTES.ROOT}>ServiceMap</SiteLogo>

        <nav className="tw:hidden tw:md:flex">
          <NavigationMenu>
            <NavigationMenuList className="tw:flex tw:gap-3">
              {desktopMenu.map((menuItem) =>
                menuItem.children ? (
                  <NavigationMenuItem
                    key={menuItem.menuLabel}
                    className="tw:group/submenu tw:relative"
                  >
                    <span className="tw:cursor-pointer">
                      {menuItem.menuLabel}
                    </span>

                    <div className="tw:absolute tw:mt-0 tw:hidden tw:min-w-[150px] tw:rounded tw:border tw:bg-popover tw:p-2 tw:group-hover/submenu:block">
                      {menuItem.children.map((sub) => (
                        <Link
                          key={sub.menuLabel}
                          to={sub.path}
                          className="tw:block tw:px-3 tw:py-1 tw:text-popover-foreground tw:hover:bg-secondary"
                        >
                          {sub.menuLabel}
                        </Link>
                      ))}
                    </div>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={menuItem.menuLabel}>
                    <Link
                      to={menuItem.path as string}
                      className="tw:hover:text-primary"
                    >
                      {menuItem.menuLabel}
                    </Link>
                  </NavigationMenuItem>
                ),
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
      </div>

      <div className="tw:flex tw:items-center tw:md:gap-3">
        <ThemeSelector />
        <LanguageSelector />

        <div className="tw:flex tw:items-center tw:gap-3 tw:max-md:hidden">
          <UserMenu />
        </div>

        <MobileMenu />
      </div>
    </header>
  );
};
