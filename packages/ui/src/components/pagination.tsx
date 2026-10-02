// Adapted from coss ui (MIT), apps/ui/registry/default/ui/pagination.tsx.
// See ../../THIRD_PARTY_NOTICES.md and ../../coss-source.json.
"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react";
import * as React from "react";
import { useUILocale } from "../locale";
import { cn } from "../utils";
import { type Button, buttonVariants } from "./button";

export function Pagination({
  className,
  ...props
}: React.ComponentProps<"nav">): React.ReactElement {
  const { messages } = useUILocale();
  return (
    <nav
      aria-label={messages.pagination}
      className={cn("mx-auto flex w-full justify-center", className)}
      data-slot="pagination"
      {...props}
    />
  );
}

export function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">): React.ReactElement {
  return (
    <ul
      className={cn("flex flex-row items-center gap-(--qy-space-1)", className)}
      data-slot="pagination-content"
      {...props}
    />
  );
}

export function PaginationItem({
  ...props
}: React.ComponentProps<"li">): React.ReactElement {
  return <li data-slot="pagination-item" {...props} />;
}

export type PaginationLinkProps = {
  isActive?: boolean;
  /**
   * Marks the link unavailable, e.g. "previous" on the first page. The link
   * becomes a native anchor without href and leaves the tab order, including
   * when `render` supplies a router link. Its content and place remain intact.
   */
  disabled?: boolean;
  size?: React.ComponentProps<typeof Button>["size"];
} & useRender.ComponentProps<"a">;

export function PaginationLink({
  className,
  isActive,
  disabled = false,
  size = "icon",
  render,
  ...props
}: PaginationLinkProps): React.ReactElement {
  const defaultProps = {
    "aria-current": isActive ? ("page" as const) : undefined,
    className: cn(
      buttonVariants({
        size,
        variant: isActive ? "outline" : "ghost",
      }),
      "numeric aria-disabled:pointer-events-none aria-disabled:opacity-64",
      className,
    ),
    "data-active": isActive,
    "data-slot": "pagination-link",
  };
  // A disabled link keeps its slot but drops href and the caller's handler.
  const disabledProps = disabled
    ? {
        "aria-disabled": true as const,
        "data-disabled": "",
        href: undefined,
        onClick: undefined,
        onClickCapture: (event: React.MouseEvent<HTMLAnchorElement>) => {
          event.preventDefault();
          event.stopPropagation();
        },
        onAuxClickCapture: (event: React.MouseEvent<HTMLAnchorElement>) => {
          event.preventDefault();
          event.stopPropagation();
        },
        role: "link",
        tabIndex: -1,
      }
    : undefined;
  // An opaque router component can recreate href from `to`, even when href
  // is cleared. A disabled page uses a native inert destination instead of
  // instantiating that component. Retain its content, name and presentation.
  const resolvedRender: typeof render = disabled && render
    ? (forwardedProps, state) => {
        const candidate = typeof render === "function" ? render(forwardedProps, state) : render;
        const renderedProps = React.isValidElement<Record<string, unknown>>(candidate) ? candidate.props : {};
        const attributes = Object.fromEntries(Object.entries(renderedProps).filter(([key]) =>
          key.startsWith("aria-") || key.startsWith("data-") || ["id", "title", "lang", "dir"].includes(key),
        ));
        return (
          <a
            {...attributes}
            {...forwardedProps}
            className={cn(forwardedProps.className, typeof renderedProps.className === "string" && renderedProps.className, className)}
            style={{ ...(renderedProps.style as React.CSSProperties), ...forwardedProps.style }}
          >
            {forwardedProps.children === undefined ? renderedProps.children as React.ReactNode : forwardedProps.children}
          </a>
        );
      }
    : render;

  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(defaultProps, { ...props, ...disabledProps }),
    render: resolvedRender,
  });
}

export function PaginationPrevious({
  className,
  children,
  ...props
}: React.ComponentProps<typeof PaginationLink>): React.ReactElement {
  const { messages } = useUILocale();
  return (
    <PaginationLink
      aria-label={messages.previousPage}
      className={cn("max-sm:aspect-square max-sm:p-0", className)}
      size="default"
      {...props}
    >
      <ChevronLeftIcon className="sm:-ms-1 rtl:-scale-x-100" />
      <span className="max-sm:hidden">{children ?? messages.previousPage}</span>
    </PaginationLink>
  );
}

export function PaginationNext({
  className,
  children,
  ...props
}: React.ComponentProps<typeof PaginationLink>): React.ReactElement {
  const { messages } = useUILocale();
  return (
    <PaginationLink
      aria-label={messages.nextPage}
      className={cn("max-sm:aspect-square max-sm:p-0", className)}
      size="default"
      {...props}
    >
      <span className="max-sm:hidden">{children ?? messages.nextPage}</span>
      <ChevronRightIcon className="sm:-me-1 rtl:-scale-x-100" />
    </PaginationLink>
  );
}

export function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">): React.ReactElement {
  const { messages } = useUILocale();
  return (
    <span
      className={cn("flex min-w-7 justify-center", className)}
      data-slot="pagination-ellipsis"
      {...props}
    >
      <MoreHorizontalIcon aria-hidden="true" className="size-5 sm:size-4" />
      <span className="sr-only">{messages.morePages}</span>
    </span>
  );
}
