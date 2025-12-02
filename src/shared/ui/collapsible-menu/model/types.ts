import { type To } from "react-router-dom";

import { type ValueOf, type WithOptional } from "@/shared/types";

export const MENU_VARIANTS = { DESKTOP: "desktop", MOBILE: "mobile" } as const;

export type MENU_VARIANTS = ValueOf<typeof MENU_VARIANTS>;

export type CollapsibleMenuBaseItem = {
  icon?: React.ReactElement;
  i18nKey: string;
  path: To;

  priority?: number;
  desktop?: boolean;
  mobile?: boolean;

  isAuthRequired?: boolean;
  permissions?: string[];
  //featureFlag?: string;
};

export type CollapsibleMenuItem = WithOptional<
  CollapsibleMenuBaseItem,
  "path"
> & {
  children?: CollapsibleMenuBaseItem[];
};
