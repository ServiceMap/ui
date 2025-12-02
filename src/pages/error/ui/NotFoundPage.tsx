import { useTranslation } from "react-i18next";

import { PAGE_ROUTES } from "@/shared/consts";
import { ErrorLayout, GoBackButton } from "@/shared/ui";

export const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <ErrorLayout>
      <ErrorLayout.TitleContainer className="tw:mb-2 tw:text-8xl">
        404
      </ErrorLayout.TitleContainer>
      <ErrorLayout.DescriptionContainer className="tw:text-3xl tw:font-semibold">
        {t("page_not_found_message").toUpperCase()}
      </ErrorLayout.DescriptionContainer>
      <ErrorLayout.ActionContainer>
        <GoBackButton
          fallbackUrl={PAGE_ROUTES.ROOT}
          stepsBack={0}
          text={t("go_home_btn")}
        />
      </ErrorLayout.ActionContainer>
    </ErrorLayout>
  );
};
