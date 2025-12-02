import { authService } from "@/shared/api/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui";

export const UserAvatar = () => {
  return (
    <Avatar className="tw:cursor-pointer">
      <AvatarImage src="https://i.pravatar.cc/40" />
      <AvatarFallback>{authService.user?.username}</AvatarFallback>
    </Avatar>
  );
};
