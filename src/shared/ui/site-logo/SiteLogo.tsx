import { Link, type To } from "react-router-dom";

import { cn } from "@/shared/lib";

interface LogoProps {
  children?: React.ReactNode;
  className?: string;
  clickableRoute?: To;
}

const defaultStyles = "tw:text-lg tw:font-bold tw:text-primary";

export const SiteLogo = ({
  children,
  className,
  clickableRoute,
}: LogoProps) => {
  if (clickableRoute) {
    return (
      <Link to={clickableRoute} className={cn(defaultStyles, className)}>
        {children}
      </Link>
    );
  }

  return <span className={cn(defaultStyles, className)}>{children}</span>;
};
