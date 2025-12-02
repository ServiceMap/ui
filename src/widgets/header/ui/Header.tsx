import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { CSS_VARS, PAGE_ROUTES } from "@/shared/consts";
import { cn, setCssVariables, useDebounce, useElementSize } from "@/shared/lib";
import {
  LanguageSelector,
  MENU_VARIANTS,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
  SiteLogo,
  ThemeSelector,
} from "@/shared/ui";
import { buildNavigationMenu } from "@/widgets/header/lib";
import { MobileMenu } from "@/widgets/header/ui/MobileMenu.tsx";
import { UserMenu } from "@/widgets/header/ui/UserMenu.tsx";

export const Header = () => {
  const { t } = useTranslation();
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
        <SiteLogo clickableRoute={PAGE_ROUTES.ROOT}>{t("brand_name")}</SiteLogo>

        <nav className="tw:hidden tw:md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              {desktopMenu.map((menuItem) =>
                menuItem.children ? (
                  <NavigationMenuItem key={menuItem.i18nKey}>
                    <NavigationMenuTrigger>
                      {t(menuItem.i18nKey)}
                    </NavigationMenuTrigger>

                    <NavigationMenuContent>
                      <ul>
                        <li className="tw:flex tw:flex-col tw:p-1.5">
                          {menuItem.children.map((sub) => (
                            <NavigationMenuLink
                              key={sub.i18nKey}
                              asChild
                              className={cn(
                                navigationMenuTriggerStyle(),
                                "tw:h-auto tw:rounded-sm tw:bg-inherit tw:px-2.5 tw:py-1.5",
                              )}
                            >
                              <Link to={sub.path}>{t(sub.i18nKey)}</Link>
                            </NavigationMenuLink>
                          ))}
                        </li>
                      </ul>
                    </NavigationMenuContent>

                    <NavigationMenuViewport />
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={menuItem.i18nKey}>
                    <NavigationMenuLink
                      asChild
                      className={navigationMenuTriggerStyle()}
                    >
                      <Link to={menuItem.path as string}>
                        {t(menuItem.i18nKey)}
                      </Link>
                    </NavigationMenuLink>
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
