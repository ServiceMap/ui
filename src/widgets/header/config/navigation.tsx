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
      menuLabel: "Find a master",
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
      menuLabel: "How it works",
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
      menuLabel: "Provide a service",
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
      menuLabel: "Products",
      desktop: true,
      mobile: true,
      children: [
        {
          priority: 1,
          menuLabel: "Menu Item 1",
          path: `${PAGE_ROUTES.PRODUCTS}/1`,
          desktop: true,
          mobile: false,
        },
        {
          priority: 10,
          menuLabel: "Menu Item 2",
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
      menuLabel: "Dashboard",
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
      menuLabel: "Help",
      path: PAGE_ROUTES.HELP,
      desktop: true,
      mobile: true,
    },
  ],
] as const) as ReadonlyMap<PageRoute, CollapsibleMenuItem>;
