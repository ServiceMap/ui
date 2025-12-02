import { navigateToLocation } from "@/shared/lib/navigation/navigateToLocation.ts";

export const historyBackOrDefault = (
  defaultUrl: string,
  stepsBack: number = 1,
) => {
  if (stepsBack > 0 && window.history.length > 1 + stepsBack) {
    window.history.go(-stepsBack);
    return;
  }

  navigateToLocation(defaultUrl);
};
