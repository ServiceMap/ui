import { ROLES } from "@/entities/user/model";
import { authService } from "@/shared/api/auth";

export const isCompanyAdmin = () => authService.hasRole([ROLES.COMPANY_ADMIN]);
