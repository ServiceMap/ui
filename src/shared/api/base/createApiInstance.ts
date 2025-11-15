import axios, { type AxiosInstance } from "axios";

import { AXIOS_REQUEST_TIMEOUT_SECONDS } from "@/shared/api/base/config";
import {
  attachAuthInterceptor,
  attachErrorInterceptor,
} from "@/shared/api/base/interceptors";
import {
  ACCEPT_HEADER_NAME,
  CONTENT_TYPE_HEADER_NAME,
  JSON_CONTENT_TYPE,
} from "@/shared/api/consts";

interface ApiConfig {
  baseURL: string;
  withAuth?: boolean;
}

export const createApiInstance = ({
  baseURL,
  withAuth = true,
}: ApiConfig): AxiosInstance => {
  const instance: AxiosInstance = axios.create({
    baseURL: baseURL,
    timeout: AXIOS_REQUEST_TIMEOUT_SECONDS * 1000,
    headers: {
      [ACCEPT_HEADER_NAME]: JSON_CONTENT_TYPE,
      [CONTENT_TYPE_HEADER_NAME]: JSON_CONTENT_TYPE,
    },
  });

  if (withAuth) attachAuthInterceptor(instance);
  attachErrorInterceptor(instance);

  return instance;
};
