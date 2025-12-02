import { useTranslation } from "react-i18next";
import { Menu } from "lucide-react";

import { AuthSwitchButton, RegisterButton } from "@/features/auth";
import { PAGE_ROUTES } from "@/shared/consts";
import {
  Button,
  CollapsibleMenu,
  MENU_VARIANTS,
  ScrollArea,
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SiteLogo,
} from "@/shared/ui";
import { buildNavigationMenu } from "@/widgets/header/lib";

export const MobileMenu = () => {
  const { t } = useTranslation();
  const mobileMenu = buildNavigationMenu(MENU_VARIANTS.MOBILE);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="tw:md:hidden" variant="ghost" size="icon">
          <Menu size={20} />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="tw:gap-0">
        <SheetHeader>
          <SheetTitle>
            <SiteLogo clickableRoute={PAGE_ROUTES.ROOT}>
              {t("brand_name")}
            </SiteLogo>
          </SheetTitle>
        </SheetHeader>

        <ScrollArea
          type="auto"
          className="tw:[&:has(>div[data-state=visible][data-orientation=vertical])]:pr-2"
        >
          <div className={"tw:flex tw:flex-1 tw:flex-col tw:gap-2 tw:px-2"}>
            {mobileMenu.map((menuItem) => (
              <CollapsibleMenu key={menuItem.i18nKey} item={menuItem} />
            ))}
          </div>
        </ScrollArea>

        <SheetFooter>
          <AuthSwitchButton />
          <RegisterButton />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
