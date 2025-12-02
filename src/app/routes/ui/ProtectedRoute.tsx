import { authService } from "@/shared/api/auth";

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  if (!authService.isLoggedIn) {
    void authService.login();
    return null;
  }

  return <>{children}</>;
};
