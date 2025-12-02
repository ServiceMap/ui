import { LoginButton, LogoutButton, RegisterButton } from "@/features/auth/ui";
import { authService } from "@/shared/api/auth";

interface AuthSwitchButtonProps {
  className?: string;
  showRegisterInsteadOfLogin?: boolean;
}

export const AuthSwitchButton = ({
  className,
  showRegisterInsteadOfLogin,
}: AuthSwitchButtonProps) => {
  if (!authService.isLoggedIn) {
    return showRegisterInsteadOfLogin ? (
      <RegisterButton className={className} />
    ) : (
      <LoginButton className={className} />
    );
  }

  return <LogoutButton className={className} />;
};
