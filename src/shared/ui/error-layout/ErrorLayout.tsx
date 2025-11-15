import { cn } from "@/shared/lib";

interface ErrorLayoutProps {
  children: React.ReactNode;
  className?: string;
}
export const TitleContainer: React.FC<ErrorLayoutProps> = ({
  children,
  className,
}) => (
  <div
    className={cn(
      "tw:flex tw:items-center tw:justify-center tw:gap-2 tw:text-center tw:text-3xl tw:font-semibold",
      className,
    )}
  >
    {children}
  </div>
);

export const DescriptionContainer: React.FC<ErrorLayoutProps> = ({
  children,
  className,
}) => <div className={cn("tw:text-center", className)}>{children}</div>;

const ActionContainer: React.FC<ErrorLayoutProps> = ({
  children,
  className,
}) => <div className={className}>{children}</div>;

const ErrorLayout = ({ children, className }: ErrorLayoutProps) => {
  return (
    <div
      role="alert"
      className={cn(
        "tw:flex tw:grow tw:flex-col tw:items-center tw:justify-center tw:gap-10 tw:p-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

ErrorLayout.TitleContainer = TitleContainer;
ErrorLayout.DescriptionContainer = DescriptionContainer;
ErrorLayout.ActionContainer = ActionContainer;

export { ErrorLayout };
