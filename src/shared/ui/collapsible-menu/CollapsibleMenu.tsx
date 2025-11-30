import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

import { cn } from "@/shared/lib";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shared/ui";
import type {
  CollapsibleMenuBaseItem,
  CollapsibleMenuItem,
} from "@/shared/ui/collapsible-menu/model";

interface CollapsibleMenuItemTemplateProps {
  className?: string;
  item: CollapsibleMenuBaseItem;
  isSubMenu?: boolean;
}

const CollapsibleMenuItemTemplate = ({
  className,
  item,
  isSubMenu,
}: CollapsibleMenuItemTemplateProps) => {
  return (
    <Link
      to={item.path}
      className={cn(
        "tw:flex tw:h-8 tw:items-center tw:gap-2 tw:rounded-md tw:px-2 tw:text-sm tw:ring-sidebar-ring tw:hover:bg-sidebar-accent tw:[&>svg]:size-4 tw:[&>svg]:shrink-0",
        {
          "tw:h-7": isSubMenu,
          className,
        },
      )}
    >
      {item.icon}
      {item.menuLabel}
    </Link>
  );
};

interface CollapsibleMenuHeaderProps {
  className?: string;
  titleClassName?: string;
  iconClassName?: string;
  item: CollapsibleMenuItem;
}

const CollapsibleMenuHeader = ({
  className,
  titleClassName,
  iconClassName,
  item,
  ...props
}: CollapsibleMenuHeaderProps) => {
  return (
    <div
      {...props}
      className={cn(
        "tw:flex tw:h-8 tw:w-full tw:cursor-pointer tw:items-center tw:justify-between tw:rounded-md tw:p-2 tw:hover:bg-sidebar-accent",
        className,
      )}
    >
      <span
        className={cn(
          "tw:flex tw:items-center tw:gap-2 tw:[&>svg]:size-4 tw:[&>svg]:shrink-0",
          titleClassName,
        )}
      >
        {item.icon}
        {item.menuLabel}
      </span>
      <ChevronDown
        size={16}
        className={cn("collapse-icon tw:transition-transform", iconClassName)}
      />
    </div>
  );
};

interface CollapsibleMenuSubmenuProps {
  className?: string;
  items: CollapsibleMenuBaseItem[];

  ItemComponent?: React.ComponentType<
    Omit<CollapsibleMenuItemTemplateProps, "className">
  >;
}

const CollapsibleMenuSubmenu = ({
  className,
  items,
  ItemComponent = CollapsibleMenuItemTemplate,
}: CollapsibleMenuSubmenuProps) => {
  return (
    <div
      className={cn(
        "tw:mx-4 tw:my-1 tw:flex tw:flex-col tw:gap-1 tw:border-l tw:px-2",
        className,
      )}
    >
      {items.map((sub) => (
        <ItemComponent key={sub.menuLabel} item={sub} isSubMenu />
      ))}
    </div>
  );
};

interface CollapsibleMenuProps {
  className?: string;
  item: CollapsibleMenuItem;

  HeaderComponent?: React.ComponentType<
    Omit<
      CollapsibleMenuHeaderProps,
      "titleClassName" | "className" | "iconClassName"
    >
  >;
  SubmenuComponent?: React.ComponentType<
    Omit<CollapsibleMenuSubmenuProps, "className">
  >;
  ItemComponent?: React.ComponentType<
    Omit<CollapsibleMenuItemTemplateProps, "className">
  >;
}

const CollapsibleMenu = ({
  className,
  item,
  HeaderComponent = CollapsibleMenuHeader,
  SubmenuComponent = CollapsibleMenuSubmenu,
  ItemComponent = CollapsibleMenuItemTemplate,
}: CollapsibleMenuProps) => {
  if (!item.children) {
    return (
      <ItemComponent
        key={item.menuLabel}
        item={{ ...item, path: item.path || "#" }}
      />
    );
  }

  return (
    <Collapsible
      className={cn(
        "tw:text-sm tw:select-none tw:[&[data-state=open]_svg.collapse-icon]:rotate-180",
        className,
      )}
    >
      <CollapsibleTrigger asChild>
        <HeaderComponent item={item} />
      </CollapsibleTrigger>

      <CollapsibleContent>
        <SubmenuComponent items={item.children} ItemComponent={ItemComponent} />
      </CollapsibleContent>
    </Collapsible>
  );
};

export {
  CollapsibleMenu,
  CollapsibleMenuHeader,
  CollapsibleMenuItemTemplate,
  CollapsibleMenuSubmenu,
};
