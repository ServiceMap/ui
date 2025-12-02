import type { WindowEnvType } from "@/shared/types";

declare global {
  interface Window {
    env: WindowEnvType;
  }
}

export {};
