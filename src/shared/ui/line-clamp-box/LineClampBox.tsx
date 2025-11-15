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
    className={cn(
      `tw:[display:-webkit-box] tw:overflow-hidden tw:[-webkit-box-orient:vertical]`,
      className,
    )}
    style={{ WebkitLineClamp: numberOfLines }}
  >
    {content}
  </div>
);
