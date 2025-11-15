import { type AxiosError, type AxiosInstance, type AxiosResponse } from "axios";

import { authService } from "@/shared/api/auth";

export const attachErrorInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        authService.logout();
      }
      return Promise.reject(error);
    },
  );
};
