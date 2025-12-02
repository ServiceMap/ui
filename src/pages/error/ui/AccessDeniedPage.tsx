import { useTranslation } from "react-i18next";
import { Frown } from "lucide-react";

import { PAGE_ROUTES } from "@/shared/consts";
import { ErrorLayout, GoBackButton } from "@/shared/ui";

export const AccessDeniedPage = () => {
  const { t } = useTranslation();

  return (
    <ErrorLayout>
      <ErrorLayout.TitleContainer className="tw:text-red-500">
        {t("access_denied").toUpperCase()}
        <Frown className="tw:shrink-0" size={40} />
      </ErrorLayout.TitleContainer>
      <ErrorLayout.DescriptionContainer>
        {t("access_denied_message")}
      </ErrorLayout.DescriptionContainer>
      <ErrorLayout.ActionContainer>
        <GoBackButton fallbackUrl={PAGE_ROUTES.ROOT} text={t("go_back_btn")} />
      </ErrorLayout.ActionContainer>
    </ErrorLayout>
  );
};
