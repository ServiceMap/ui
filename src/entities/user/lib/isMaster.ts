import { ROLES } from "@/entities/user/model";
import { authService } from "@/shared/api/auth";

export const isMaster = () => authService.hasRole([ROLES.MASTER]);
