import { useTranslation } from "react-i18next";
import { Palette } from "lucide-react";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui";
import { useThemeContext } from "@/shared/ui/theme-provider";
import { ThemeItems } from "@/shared/ui/theme-selector/lib";

interface ThemeSelectorProps {
  menuAlign?: "center" | "end" | "start";
}

export const ThemeSelector = ({ menuAlign = "end" }: ThemeSelectorProps) => {
  const { t } = useTranslation();
  const { theme, changeTheme } = useThemeContext();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button aria-label="Theme selector" variant="ghost" size="icon">
            <Palette size={18} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={menuAlign} className="tw:min-w-fit">
          {ThemeItems.map((item) => (
            <DropdownMenuItem
              key={item.value}
              onClick={() => changeTheme(item.value)}
            >
              {item.getIcon(theme === item.value)}
              {t(item.tKey)}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
