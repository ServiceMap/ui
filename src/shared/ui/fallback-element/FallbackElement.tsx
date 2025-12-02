import type { FallbackProps } from "react-error-boundary";
import { t } from "i18next";
import { Frown } from "lucide-react";

import { cn } from "@/shared/lib";
import { Button, ErrorLayout, LineClampBox } from "@/shared/ui";

interface FallbackElementProps extends FallbackProps {
  className?: string;
}

export const FallbackElement = ({
  error,
  resetErrorBoundary,
  className,
}: FallbackElementProps) => {
  return (
    <ErrorLayout className={cn("tw:min-h-dvh tw:max-w-dvw", className)}>
      <ErrorLayout.TitleContainer>
        {t("something_went_wrong")}
        <Frown className="tw:shrink-0" size={40} />
      </ErrorLayout.TitleContainer>
      <ErrorLayout.DescriptionContainer>
        <LineClampBox
          className="tw:text-center tw:text-red-600"
          numberOfLines={10}
          content={(error as { message: string }).message}
        />
      </ErrorLayout.DescriptionContainer>
      <ErrorLayout.ActionContainer>
        <Button onClick={resetErrorBoundary}>{t("go_back_btn")}</Button>
      </ErrorLayout.ActionContainer>
    </ErrorLayout>
  );
};
