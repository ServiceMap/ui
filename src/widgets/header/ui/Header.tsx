import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

import { CSS_VARS } from "@/shared/consts";
import { setCssVariables, useElementSize } from "@/shared/lib";
import {
  Button,
  LanguageSelector,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  ThemeSelector,
} from "@/shared/ui";
import { MobileMenu, UserMenu } from "@/widgets/header/navbar";

import useDebounce from "../../../shared/lib/useDebounce.ts";

const menu = [
  { name: "Home", to: "/" },
  { name: "About", to: "/about" },
  {
    name: "Products",
    submenu: [
      { name: "Item 1", to: "/products/1" },
      { name: "Item 2", to: "/products/2" },
    ],
  },
];

export function Header() {
  const { ref: headerRef, size: headerSize } = useElementSize();
  const setCssVariablesDebounce = useDebounce();

  const [mobileOpen, setMobileOpen] = useState(false);

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
        <Link to="/" className="tw:text-lg tw:font-bold tw:text-primary">
          ServiceMap
        </Link>

        <nav className="tw:hidden tw:md:flex">
          <NavigationMenu>
            <NavigationMenuList className="tw:flex tw:gap-3">
              {menu.map((item) =>
                item.submenu ? (
                  <NavigationMenuItem
                    key={item.name}
                    className="tw:group/submenu tw:relative"
                  >
                    <span className="tw:cursor-pointer">{item.name}</span>

                    <div className="tw:absolute tw:mt-0 tw:hidden tw:min-w-[150px] tw:rounded tw:border tw:bg-popover tw:p-2 tw:group-hover/submenu:block">
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.to}
                          to={sub.to}
                          className="tw:block tw:px-3 tw:py-1 tw:text-popover-foreground tw:hover:bg-secondary"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={item.name}>
                    <Link to={item.to} className="tw:hover:text-primary">
                      {item.name}
                    </Link>
                  </NavigationMenuItem>
                ),
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
      </div>

      <div className="tw:flex tw:items-center">
        <div className="tw:flex tw:items-center tw:gap-3 tw:max-md:hidden">
          <LanguageSelector />
          <ThemeSelector />
          <UserMenu />
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="tw:md:hidden"
          onClick={() => setMobileOpen(true)}
        >
          <Menu size={20} />
        </Button>
      </div>

      <MobileMenu open={mobileOpen} onOpenChange={setMobileOpen} menu={menu} />
    </header>
  );
}
