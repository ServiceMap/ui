import { useEffect, useReducer } from "react";

import {
  AUTH_ERROR_EVENT_NAME,
  AUTH_INIT_ERROR_EVENT_NAME,
  AUTH_LOGOUT_EVENT_NAME,
  AUTH_READY_EVENT_NAME,
  AUTH_REFRESH_TOKEN_ERROR_EVENT_NAME,
  AUTH_SUCCESS_EVENT_NAME,
  AUTH_TOKEN_EXPIRED_EVENT_NAME,
  authService,
} from "@/shared/api/auth";

export const useAuthProvider = (initErrorCallback?: () => void) => {
  const [, forceUpdate] = useReducer((x) => {
    return x < 10 ? ++x : --x;
  }, 0);

  useEffect(() => {
    const rerender = () => forceUpdate();

    if (initErrorCallback) {
      authService.addEventListener(
        AUTH_INIT_ERROR_EVENT_NAME,
        initErrorCallback,
      );
    }
    authService.addEventListener(AUTH_READY_EVENT_NAME, rerender);
    authService.addEventListener(AUTH_SUCCESS_EVENT_NAME, rerender);
    authService.addEventListener(AUTH_ERROR_EVENT_NAME, rerender);
    authService.addEventListener(AUTH_LOGOUT_EVENT_NAME, rerender);
    authService.addEventListener(AUTH_REFRESH_TOKEN_ERROR_EVENT_NAME, rerender);
    authService.addEventListener(AUTH_TOKEN_EXPIRED_EVENT_NAME, rerender);

    void authService.init().catch((error) => {
      console.error("AuthProvider init error", error);
    });

    return () => {
      if (initErrorCallback) {
        authService.removeEventListener(
          AUTH_INIT_ERROR_EVENT_NAME,
          initErrorCallback,
        );
      }
      authService.removeEventListener(AUTH_READY_EVENT_NAME, rerender);
      authService.removeEventListener(AUTH_SUCCESS_EVENT_NAME, rerender);
      authService.removeEventListener(AUTH_ERROR_EVENT_NAME, rerender);
      authService.removeEventListener(AUTH_LOGOUT_EVENT_NAME, rerender);
      authService.removeEventListener(
        AUTH_REFRESH_TOKEN_ERROR_EVENT_NAME,
        rerender,
      );
      authService.removeEventListener(AUTH_TOKEN_EXPIRED_EVENT_NAME, rerender);
    };
  }, [initErrorCallback]);

  return {
    isInitiated: authService.isInitiated,
    isLoggedIn: authService.isLoggedIn,
    user: authService.user,
    login: authService.login,
    logout: authService.logout,
  };
};
