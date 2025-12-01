import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib";
import { Spinner } from "@/shared/ui";

interface LoadingComponentProps {
  fullscreen?: boolean;
  containerSpace?: boolean;
  isLoading?: boolean;
}

export const Loader = ({
  fullscreen,
  containerSpace,
  isLoading = true,
}: LoadingComponentProps) => {
  const { t } = useTranslation();

  return (
    isLoading && (
      <div
        className={cn(
          "tw:inset-0 tw:flex tw:grow tw:items-center tw:justify-center tw:gap-2 tw:place-self-stretch tw:bg-popover/50",
          {
            "tw:fixed tw:z-50": fullscreen,
            "tw:absolute": containerSpace,
          },
        )}
      >
        <Spinner className="tw:size-8 tw:text-primary" />
        <span className="tw:font-semibold">{t("loading_message")}</span>
      </div>
    )
  );
};
