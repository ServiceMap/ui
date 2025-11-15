import { Loader2Icon } from "lucide-react";

import { cn } from "@/shared/lib";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn("tw:size-4 tw:animate-spin", className)}
      {...props}
    />
  );
}

export { Spinner };
