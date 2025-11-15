import type { ValueOf } from "@/shared/types";

export const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
} as const;

export type HTTP_METHODS = ValueOf<typeof HTTP_METHODS>;

export const CONTENT_TYPE_HEADER_NAME = "Content-Type";
export const ACCEPT_HEADER_NAME = "Accept";

export const JSON_CONTENT_TYPE = "application/json";
export const PLAIN_TEXT_CONTENT_TYPE = "text/plain";
export const MULTIPART_FORM_DATA_CONTENT_TYPE = "multipart/form-data";
export const OCTET_STREAM_CONTENT_TYPE = "application/octet-stream";
