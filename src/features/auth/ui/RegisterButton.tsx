import { useTranslation } from "react-i18next";

import { authService } from "@/shared/api/auth";
import { Button } from "@/shared/ui";

interface RegisterButtonProps {
  className?: string;
}

export const RegisterButton = ({ className }: RegisterButtonProps) => {
  const { t } = useTranslation();

  if (authService.isLoggedIn) return null;

  return (
    <Button
      className={className}
      variant="outline"
      onClick={() => void authService.register()}
    >
      {t("register_btn")}
    </Button>
  );
};
