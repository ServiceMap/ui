import { useTranslation } from "react-i18next";

import { authService } from "@/shared/api/auth";
import { Button } from "@/shared/ui";

interface LoginButtonProps {
  className?: string;
}

export const LoginButton = ({ className }: LoginButtonProps) => {
  const { t } = useTranslation();

  return (
    <Button
      className={className}
      variant="outline"
      onClick={() => void authService.login()}
    >
      {t("login_btn")}
    </Button>
  );
};
