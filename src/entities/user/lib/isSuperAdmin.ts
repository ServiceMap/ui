import { ROLES } from "@/entities/user/model";
import { authService } from "@/shared/api/auth";

export const isSuperAdmin = () => authService.hasRole([ROLES.SUPER_ADMIN]);
