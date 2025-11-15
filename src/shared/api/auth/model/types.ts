export type KeycloakUser = {
  id: string;
  username: string;
  preferredName: string;
  email?: string;
  roles: string[];
};
