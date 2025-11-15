export const isRealmValid = (realm: string | null | undefined): boolean => {
  return !!realm && !["localhost", "ui", "www"].includes(realm);
};
