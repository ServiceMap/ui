import { ROLES } from "@/entities/user/model/consts.ts";

export const TEST_TIMEOUT = 5000;

export const TEST_SHOW_UNIMPLEMENTED_FEATURES = true;
export const TEST_UI_URL = "http://localhost:3000";
export const TEST_API_SERVER_URL = "http://localhost:2345";
export const TEST_KEYCLOAK_URL = "http://localhost:3456";
export const TEST_KEYCLOAK_CLIENT_ID = "test-client";
export const TEST_KEYCLOAK_DEFAULT_REALM = "test_realm_for_unit_tests";

export const TEST_NOT_EXISTED_URL = "http://localhost:0";

export const TEST_USERNAME = "test_user";
export const TEST_USER_ROLES = [ROLES.USER];
export const TEST_PREFERRED_USERNAME = "test_preferred_user";
