import {
  CircleQuestionMarkIcon,
  FileQuestionMarkIcon,
  PackageOpenIcon,
  PencilRulerIcon,
  UserSearchIcon,
} from "lucide-react";

import { ROLES } from "@/entities/user";
import { PAGE_ROUTES } from "@/shared/consts";
import type { PageRoute } from "@/shared/types";
import type { CollapsibleMenuItem } from "@/shared/ui";

export const NAVIGATION_MENU = new Map<PageRoute, CollapsibleMenuItem>([
  [
    PAGE_ROUTES.MASTERS,
    {
      priority: 1,
      icon: <UserSearchIcon />,
      i18nKey: "navigation.find_a_master",
      path: PAGE_ROUTES.MASTERS,
      desktop: true,
      mobile: true,
    },
  ],
  [
    PAGE_ROUTES.HOW_IT_WORKS,
    {
      priority: 10,
      icon: <FileQuestionMarkIcon />,
      i18nKey: "navigation.how_it_works",
      path: PAGE_ROUTES.HOW_IT_WORKS,
      desktop: true,
      mobile: true,
    },
  ],
  [
    PAGE_ROUTES.PROVIDE_SERVICE,
    {
      priority: 20,
      icon: <PencilRulerIcon />,
      i18nKey: "navigation.provide_a_service",
      path: PAGE_ROUTES.PROVIDE_SERVICE,
      desktop: true,
      mobile: true,
    },
  ],
  [
    PAGE_ROUTES.PRODUCTS,
    {
      priority: 30,
      icon: <PackageOpenIcon />,
      i18nKey: "navigation.products",
      desktop: true,
      mobile: true,
      children: [
        {
          priority: 1,
          i18nKey: "navigation.menu_item_1",
          path: `${PAGE_ROUTES.PRODUCTS}/1`,
          desktop: true,
          mobile: false,
        },
        {
          priority: 10,
          i18nKey: "navigation.menu_item_2",
          path: `${PAGE_ROUTES.PRODUCTS}/2`,
          icon: <PencilRulerIcon />,
          desktop: false,
          mobile: true,
        },
      ],
    },
  ],
  [
    PAGE_ROUTES.DASHBOARD,
    {
      priority: 40,
      i18nKey: "navigation.dashboard",
      path: PAGE_ROUTES.DASHBOARD,
      isAuthRequired: true,
      permissions: [ROLES.SUPER_ADMIN, ROLES.COMPANY_ADMIN, ROLES.MASTER],
      desktop: true,
      mobile: true,
    },
  ],
  [
    PAGE_ROUTES.HELP,
    {
      priority: 50,
      icon: <CircleQuestionMarkIcon />,
      i18nKey: "navigation.help",
      path: PAGE_ROUTES.HELP,
      desktop: true,
      mobile: true,
    },
  ],
] as const) as ReadonlyMap<PageRoute, CollapsibleMenuItem>;
