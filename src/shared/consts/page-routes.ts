// TODO add page configs (routes) as a classes instead of constants because it's more flexible

export const PAGE_ROUTES = {
  ROOT: "/",
  DEFAULT: "*",
  HOME: "/home",
  LOGIN: "/login",
  REGISTER: "/register",
  PROFILE: "/profile",
  USER_SETTINGS: "/user/settings",
  DASHBOARD: "/dashboard",
  PAYMENT: "/stripe-test",
  ACCESS_DENIED: "/access-denied",
  NOT_FOUND: "/not-found",
} as const;
