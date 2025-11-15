import { UserAvatar } from "@/entities/user";
import { LoginButton } from "@/features/auth";
import { authService } from "@/shared/api/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui";

export function UserMenu() {
  if (!authService.isLoggedIn) {
    return <LoginButton />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="tw:cursor-pointer"
          onClick={() => alert("Profile clicked")}
        >
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          className="tw:cursor-pointer"
          onClick={() => alert("Settings clicked")}
        >
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem
          className="tw:cursor-pointer"
          onClick={() => void authService.logout()}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
