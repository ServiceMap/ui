import type { ValueOf } from "@/shared/types";

export const ROLES = {
  SUPER_ADMIN: "super_admin",
  COMPANY_ADMIN: "company_admin",
  MASTER: "master",
  USER: "user",
} as const;

export type ROLES = ValueOf<typeof ROLES>;
