import { LoginButton, LogoutButton, RegisterButton } from "@/features/auth/ui";
import { useAuthContext } from "@/shared/ui";

interface AuthSwitchButtonProps {
  className?: string;
  showRegisterInsteadOfLogin?: boolean;
}

export const AuthSwitchButton = ({
  className,
  showRegisterInsteadOfLogin,
}: AuthSwitchButtonProps) => {
  const { isLoggedIn } = useAuthContext();

  if (!isLoggedIn) {
    return showRegisterInsteadOfLogin ? (
      <RegisterButton className={className} />
    ) : (
      <LoginButton className={className} />
    );
  }

  return <LogoutButton className={className} />;
};
