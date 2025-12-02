import { useTranslation } from "react-i18next";
import { GlobeIcon } from "lucide-react";

import { type Locale, LocaleNames } from "@/shared/config";
import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/shared/ui";

interface LanguageSelectorProps {
  menuAlign?: "center" | "end" | "start";
}

export const LanguageSelector = ({
  menuAlign = "end",
}: LanguageSelectorProps) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language as Locale;

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button aria-label="Language selector" variant="ghost" size="icon">
            <GlobeIcon size={18} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={menuAlign} className="tw:min-w-fit">
          {Object.entries(LocaleNames).map(([code]) => (
            <DropdownMenuCheckboxItem
              key={code}
              checked={code === currentLang}
              onClick={() => handleLanguageChange(code)}
            >
              {code.toUpperCase()}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
