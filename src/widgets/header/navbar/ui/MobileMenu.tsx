import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

import { cn } from "@/shared/lib";
import {
  LanguageSelector,
  Separator,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  ThemeSelector,
} from "@/shared/ui";
import { UserMenu } from "@/widgets/header/navbar";

interface MenuItem {
  name: string;
  to?: string;
  submenu?: { name: string; to: string }[];
}

interface MobileMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  menu: MenuItem[];
}

export function MobileMenu({ open, onOpenChange, menu }: MobileMenuProps) {
  const [openSub, setOpenSub] = useState<string | null>(null);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle className="tw:mb-2 tw:text-lg tw:font-bold tw:text-primary">
            ServiceMap
          </SheetTitle>
        </SheetHeader>

        <nav className="tw:mt-4 tw:flex tw:flex-col tw:gap-2">
          {menu.map((item) => (
            <div key={item.name}>
              {item.submenu ? (
                <div>
                  <button
                    onClick={() =>
                      setOpenSub(openSub === item.name ? null : item.name)
                    }
                    className="tw:flex tw:w-full tw:cursor-pointer tw:justify-between tw:rounded tw:px-2 tw:py-2"
                  >
                    {item.name}
                    <ChevronDown
                      size={16}
                      className={cn("tw:transition-transform", {
                        "tw:rotate-180": openSub === item.name,
                      })}
                    />
                  </button>

                  {openSub === item.name && (
                    <div className="tw:mt-1 tw:ml-4 tw:flex tw:flex-col tw:gap-1">
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.to}
                          to={sub.to}
                          className="tw:block tw:rounded tw:px-2 tw:py-1 tw:hover:bg-secondary"
                          onClick={() => onOpenChange(false)}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={item.to || "#"}
                  className="tw:block tw:rounded tw:px-2 tw:py-2 tw:hover:text-primary"
                  onClick={() => onOpenChange(false)}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <Separator className="tw:my-4" />

        <div className="tw:flex tw:justify-between">
          <span className="tw:flex tw:gap-3">
            <LanguageSelector />
            <ThemeSelector />
          </span>
          <UserMenu />
        </div>
      </SheetContent>
    </Sheet>
  );
}
