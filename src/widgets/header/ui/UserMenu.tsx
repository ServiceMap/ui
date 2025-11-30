import { UserAvatar } from "@/entities/user";
import { authService } from "@/shared/api/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui";

export const UserMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar />
      </DropdownMenuTrigger>

      {authService.isLoggedIn ? (
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => alert("Profile clicked")}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => alert("Settings clicked")}>
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => void authService.logout()}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      ) : (
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => void authService.login()}>
            Login
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => void authService.register()}>
            Register
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => alert("Help clicked")}>
            Help
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
};
