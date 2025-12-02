import { configure } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, vi } from "vitest";

import {
  TEST_API_SERVER_URL,
  TEST_KEYCLOAK_CLIENT_ID,
  TEST_KEYCLOAK_DEFAULT_REALM,
  TEST_KEYCLOAK_URL,
  TEST_NOT_EXISTED_URL,
  TEST_SHOW_UNIMPLEMENTED_FEATURES,
  TEST_TIMEOUT,
} from "@/tests/consts.ts";
import { i18nextHandlers } from "@/tests/mocks/i18next/i18next.handlers.ts";
import { keycloakHandlers } from "@/tests/mocks/keycloak/keycloak.handlers.ts";

import "../../public/config.js";
import "@/app/config/i18n.ts";
import "@/app/config/dayjs.ts";
import "@testing-library/jest-dom";

vi.mock("keycloak-js", () => import("@/tests/__mocks__/keycloak-js.ts"));

vi.mock("@/shared/config/env.ts", async () => {
  const actual = await vi.importActual<typeof import("@/shared/config/env.ts")>(
    "@/shared/config/env.ts",
  );

  return {
    ...actual,
    AppConfig: {
      ...actual.AppConfig,
      SHOW_UNIMPLEMENTED_FEATURES: TEST_SHOW_UNIMPLEMENTED_FEATURES,
      API_SERVER_URL: TEST_API_SERVER_URL,
      KEYCLOAK_URL: TEST_KEYCLOAK_URL,
      KEYCLOAK_CLIENT_ID: TEST_KEYCLOAK_CLIENT_ID,
      KEYCLOAK_DEFAULT_REALM: TEST_KEYCLOAK_DEFAULT_REALM,
    },
  };
});

configure({
  asyncUtilTimeout: TEST_TIMEOUT,
});

const mockServer = setupServer(
  http.options("*", () => {
    return new HttpResponse(null, { status: 200 });
  }),
  http.all(TEST_NOT_EXISTED_URL, () => {
    return new HttpResponse(null, { status: 404 });
  }),
  ...keycloakHandlers,
  ...i18nextHandlers,
);

afterEach(() => {
  mockServer.restoreHandlers();
});

beforeAll(() => {
  mockServer.listen({
    onUnhandledRequest: (req) => {
      console.log("❌ Unhandled request:", req.method, req.url);
      throw new Error(`Unhandled ${req.method} request to ${req.url}`);
    },
  });
});

afterAll(() => mockServer.close());
