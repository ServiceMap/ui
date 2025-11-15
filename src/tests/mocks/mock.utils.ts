import { http, HttpHandler, HttpResponse, type JsonBodyType } from "msw";

import { HTTP_METHODS } from "@/shared/api/consts";

export type HttpResolver = Parameters<typeof http.get>[1];

interface MockRequestOptions {
  baseURL: string;
  url: string;
  method: HTTP_METHODS;
  mockData?: JsonBodyType;
  isError?: boolean;
  mockResolver?: HttpResolver;
  matchQueryParams?: boolean;
}

export const mockRequest = ({
  baseURL,
  url,
  method,
  mockData,
  isError = false,
  mockResolver,
}: MockRequestOptions): HttpHandler => {
  const { href: matchUrl } = new URL(url, baseURL);

  const defaultResolver = ((_) => {
    if (isError) {
      return HttpResponse.error();
    }
    return HttpResponse.json(mockData);
  }) as HttpResolver;
  const resolver = mockResolver ?? defaultResolver;

  switch (method) {
    case HTTP_METHODS.GET:
      return http.get(matchUrl, resolver);
    case HTTP_METHODS.POST:
      return http.post(matchUrl, () => {
        if (isError) return HttpResponse.error();

        return HttpResponse.json(mockData);
      });
    case HTTP_METHODS.PUT:
      return http.put(matchUrl, resolver);
    case HTTP_METHODS.DELETE:
      return http.delete(matchUrl, resolver);
  }
};
