import Keycloak from "keycloak-js";

import { keycloakClient } from "@/shared/api";
import {
  AUTH_ERROR_EVENT_NAME,
  AUTH_EVENT_NAME,
  AUTH_INIT_ERROR_EVENT_NAME,
  AUTH_READY_EVENT_NAME,
  AUTH_REFRESH_TOKEN_ERROR_EVENT_NAME,
  AUTH_REFRESH_TOKEN_SUCCESS_EVENT_NAME,
  AUTH_SUCCESS_EVENT_NAME,
  AUTH_TOKEN_EXPIRED_EVENT_NAME,
} from "@/shared/api/auth/config";
import {
  AUTH_LOGOUT_EVENT_NAME,
  KEYCLOAK_TOKEN_MIN_VALIDITY_SECONDS,
  KEYCLOAK_UPDATE_TOKEN_INTERVAL_SECONDS,
} from "@/shared/api/auth/config/auth.ts";
import { getRealmFromHost, isRealmValid } from "@/shared/api/auth/lib";
import { type KeycloakUser } from "@/shared/api/auth/model";
import { AppConfig } from "@/shared/config";
import { API_ROUTES } from "@/shared/consts";

class AuthService extends EventTarget {
  private static _instance: AuthService;

  private _isInitiated = false;
  private currentRealm: string | undefined;
  private keycloak: Keycloak | undefined;

  constructor() {
    if (AuthService._instance) return AuthService._instance;

    super();
    AuthService._instance = this;

    const realm = getRealmFromHost();
    if (!isRealmValid(realm)) throw new Error("Invalid realm");

    this.currentRealm = realm;

    this.keycloak = new Keycloak({
      url: `${AppConfig.KEYCLOAK_URL}${API_ROUTES.AUTH.BASE}`,
      realm: this.currentRealm,
      clientId: AppConfig.KEYCLOAK_CLIENT_ID,
    });

    this.keycloak.onAuthSuccess = () => {
      this.emitAuthEvent();
      this.emit(AUTH_SUCCESS_EVENT_NAME);
    };
    this.keycloak.onAuthError = () => {
      this.emitAuthEvent();
      this.emit(AUTH_ERROR_EVENT_NAME);
    };
    this.keycloak.onReady = (authenticated) => {
      this._isInitiated = true;
      this.emitAuthEvent();
      this.emit(AUTH_READY_EVENT_NAME);

      if (!authenticated) return;

      setInterval(() => {
        this.keycloak!.updateToken(KEYCLOAK_TOKEN_MIN_VALIDITY_SECONDS).catch(
          (error) => {
            console.error("Keycloak update token error", error);
            this.logout();
          },
        );
      }, KEYCLOAK_UPDATE_TOKEN_INTERVAL_SECONDS * 1000);
    };
    this.keycloak.onAuthLogout = () => {
      this.emitAuthEvent();
      this.emit(AUTH_LOGOUT_EVENT_NAME);
    };
    this.keycloak.onAuthRefreshSuccess = () => {
      this.emitAuthEvent();
      this.emit(AUTH_REFRESH_TOKEN_SUCCESS_EVENT_NAME);
    };
    this.keycloak.onAuthRefreshError = () => {
      this.emitAuthEvent();
      this.emit(AUTH_REFRESH_TOKEN_ERROR_EVENT_NAME);
    };
    this.keycloak.onTokenExpired = () => {
      this.emitAuthEvent();
      this.emit(AUTH_TOKEN_EXPIRED_EVENT_NAME);
      this.logout();
    };
  }

  private emitAuthEvent() {
    this.emit(AUTH_EVENT_NAME);
  }

  private emit(eventName: string) {
    this.dispatchEvent(new Event(eventName));
  }

  async init() {
    if (this._isInitiated) return;

    const isRealmValid = await this.validateRealm(this.currentRealm);
    if (!isRealmValid) {
      throw new Error("Invalid realm. Please check the URL and try again.");
    }

    await this.keycloak!.init({
      onLoad: "check-sso",
      pkceMethod: "S256",
      checkLoginIframe: true,
      silentCheckSsoRedirectUri: `${window.location.origin}/auth/silent-check-sso.html`,
    }).catch((err) => {
      this.emit(AUTH_INIT_ERROR_EVENT_NAME);
      console.error("Keycloak init error", err);
    });
  }

  async validateRealm(realm?: string) {
    if (!realm || !isRealmValid(realm)) return false;

    let response;
    try {
      response = await keycloakClient.get(
        `${API_ROUTES.AUTH.REALMS}/${encodeURIComponent(realm)}`,
      );
    } catch (error) {
      console.error("Keycloak validate realm error", error);
      return false;
    }

    return response.status === 200;
  }

  get isInitiated() {
    return this._isInitiated;
  }

  get isLoggedIn() {
    return !!this.keycloak!.token;
  }

  get token() {
    return this.keycloak!.token;
  }

  get user(): KeycloakUser | undefined {
    const tokenParsed = this.keycloak!.tokenParsed;
    if (!tokenParsed) return;

    const fullNameArr: string[] = [];
    const givenName = tokenParsed?.given_name as string;
    if (givenName) fullNameArr.push(givenName);

    const familyName = tokenParsed?.family_name as string;
    if (familyName) fullNameArr.push(familyName);

    const roles = tokenParsed.realm_access?.roles || [];
    return {
      id: tokenParsed.sub as string,
      username: tokenParsed.name as string,
      preferredName: tokenParsed.preferred_username as string,
      email: tokenParsed.email as string,
      roles: roles,
    };
  }

  login = async (): Promise<void> => {
    await this.keycloak!.login().catch((error) => {
      console.error("Keycloak login error", error);
    });
  };

  register = async (): Promise<void> => {
    await this.keycloak!.register().catch((error) => {
      console.error("Keycloak register error", error);
    });
  };

  logout = async (): Promise<void> => {
    await this.keycloak!.logout({ redirectUri: window.location.origin }).catch(
      (error) => {
        console.error("Keycloak logout error", error);
      },
    );
  };

  hasRole = (roles: string[]): boolean => {
    return (
      !roles.length || roles.some((role) => this.keycloak!.hasRealmRole(role))
    );
  };
}

const authService = new AuthService();
export { authService };
