import { cn } from "@/shared/lib";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="skeleton"
      className={cn("tw:animate-pulse tw:rounded-md tw:bg-accent", className)}
      {...props}
    />
  );
}

export { Skeleton };
