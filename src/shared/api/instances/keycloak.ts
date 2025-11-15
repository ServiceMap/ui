import { createApiInstance } from "@/shared/api/base";
import { AppConfig } from "@/shared/config";

export const keycloakClient = createApiInstance({
  baseURL: AppConfig.KEYCLOAK_URL,
});
