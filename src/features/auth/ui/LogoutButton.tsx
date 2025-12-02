import { useTranslation } from "react-i18next";

import { authService } from "@/shared/api/auth";
import { Button } from "@/shared/ui";

interface LogoutButtonProps {
  className?: string;
}

export const LogoutButton = ({ className }: LogoutButtonProps) => {
  const { t } = useTranslation();

  if (!authService.isLoggedIn) return null;

  return (
    <Button
      className={className}
      variant="outline"
      onClick={() => void authService.logout()}
    >
      {t("logout_btn")}
    </Button>
  );
};
