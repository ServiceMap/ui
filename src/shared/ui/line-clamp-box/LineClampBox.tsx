import { cn } from "@/shared/lib";

interface LineClampBoxProps {
  className?: string;
  content: string;
  numberOfLines: number;
}

export const LineClampBox = ({
  className,
  content,
  numberOfLines,
}: LineClampBoxProps) => (
  <div
    className={cn(`tw:line-clamp-1`, className)}
    style={{ WebkitLineClamp: numberOfLines }}
  >
    {content}
  </div>
);
