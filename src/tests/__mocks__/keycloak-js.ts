import type {
  KeycloakInitOptions,
  KeycloakServerConfig,
  KeycloakTokenParsed,
} from "keycloak-js";

import {
  TEST_PREFERRED_USERNAME,
  TEST_USER_ROLES,
  TEST_USERNAME,
} from "@/tests/consts.ts";

export default class Keycloak {
  public authenticated = false;
  public realm: string;
  public clientId: string;
  public authServerUrl: string;
  public pkceMethod: string | undefined;
  public silentCheckSsoFallback: boolean = false;
  public silentCheckSsoRedirectUri: string | undefined;

  public token: string | undefined;
  public tokenParsed: KeycloakTokenParsed | undefined;

  onReady?: (authenticated?: boolean) => void;
  onAuthSuccess?: () => void;
  onAuthLogout?: () => void;
  onAuthRefreshSuccess?: () => void;

  constructor(config: KeycloakServerConfig) {
    this.realm = config.realm;
    this.clientId = config.clientId;
    this.authServerUrl = config.url;
  }

  private resetState() {
    this.authenticated = false;
    this.token = undefined;
    this.tokenParsed = undefined;
  }

  async init(options: KeycloakInitOptions): Promise<boolean> {
    this.resetState();
    this.pkceMethod = options.pkceMethod || "S256";
    this.silentCheckSsoFallback = !!options.silentCheckSsoRedirectUri;
    this.silentCheckSsoRedirectUri = options.silentCheckSsoRedirectUri;

    this.onReady?.(this.authenticated);

    return Promise.resolve(this.authenticated);
  }

  login(): Promise<void> {
    this.token = "mock-token";
    this.tokenParsed = {
      name: TEST_USERNAME,
      preferred_username: TEST_PREFERRED_USERNAME,
      realm_access: { roles: TEST_USER_ROLES },
    };
    this.authenticated = true;

    this.onAuthSuccess?.();

    return Promise.resolve();
  }

  logout(): Promise<void> {
    this.resetState();
    this.onAuthLogout?.();

    return Promise.resolve();
  }

  updateToken(): Promise<boolean> {
    this.onAuthRefreshSuccess?.();

    return Promise.resolve(true);
  }
}
