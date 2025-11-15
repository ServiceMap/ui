import { useTranslation } from "react-i18next";

import { authService } from "@/shared/api/auth";
import { Button } from "@/shared/ui";

interface RegisterButtonProps {
  className?: string;
}

export const RegisterButton = ({ className }: RegisterButtonProps) => {
  const { t } = useTranslation();

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
