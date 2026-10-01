"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { ArrowLeftIcon } from "lucide-react";
import type React from "react";
import { useUILocale } from "../locale";
import { cn } from "../utils";
import { Button, type ButtonProps } from "./button";

/**
 * The top of a page: optional breadcrumb, back button, title, description,
 * meta row and actions. Layout is intrinsic: actions sit beside the title
 * while there is room and wrap beneath it otherwise, whatever the viewport.
 */
export function PageHeader({
  className,
  render,
  ...props
}: useRender.ComponentProps<"header">): React.ReactElement {
  const defaultProps = {
    className: cn(
      "flex min-w-0 flex-wrap items-start gap-x-(--qy-space-3) gap-y-(--qy-space-4)",
      "*:data-[slot=breadcrumb]:-mb-1 *:data-[slot=breadcrumb]:basis-full *:data-[slot=page-header-nav]:-mb-1 *:data-[slot=page-header-nav]:basis-full",
      className,
    ),
    "data-slot": "page-header",
  };

  return useRender({
    defaultTagName: "header",
    props: mergeProps<"header">(defaultProps, props),
    render,
  });
}

/** A full-width row above the title for a breadcrumb or other wayfinding. */
export function PageHeaderNav({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className: cn("flex min-w-0 items-center gap-(--qy-space-2)", className),
    "data-slot": "page-header-nav",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

/**
 * Icon button that returns to the parent page. Pass `render={<a href="…" />}`
 * with `nativeButton={false}` for a link, or `onClick` for history back.
 */
export function PageHeaderBack({
  className,
  children,
  ...props
}: ButtonProps): React.ReactElement {
  const { messages } = useUILocale();
  return (
    <Button
      aria-label={messages.back}
      className={cn("shrink-0 max-sm:-my-0.5 sm:my-[calc(var(--qy-space-1)*0.5)]", className)}
      data-slot="page-header-back"
      size="icon-sm"
      variant="outline"
      {...props}
    >
      {children ?? (
        <ArrowLeftIcon aria-hidden="true" className="rtl:-scale-x-100" />
      )}
    </Button>
  );
}

/** Title, description and meta. Grows to fill the row and keeps actions apart. */
export function PageHeaderContent({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className: cn(
      "me-(--qy-space-3) flex min-w-0 flex-[1_1_15rem] flex-col gap-(--qy-space-1)",
      className,
    ),
    "data-slot": "page-header-content",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export function PageHeaderTitle({
  className,
  render,
  ...props
}: useRender.ComponentProps<"h1">): React.ReactElement {
  const defaultProps = {
    className: cn(
      "wrap-break-word text-balance font-heading font-semibold text-foreground text-xl/7 sm:text-2xl/8",
      className,
    ),
    "data-slot": "page-header-title",
  };

  return useRender({
    defaultTagName: "h1",
    props: mergeProps<"h1">(defaultProps, props),
    render,
  });
}

export function PageHeaderDescription({
  className,
  render,
  ...props
}: useRender.ComponentProps<"p">): React.ReactElement {
  const defaultProps = {
    className: cn(
      "max-w-[72ch] text-pretty text-muted-foreground text-sm",
      className,
    ),
    "data-slot": "page-header-description",
  };

  return useRender({
    defaultTagName: "p",
    props: mergeProps<"p">(defaultProps, props),
    render,
  });
}

/** Badges, status and facts about the page subject, under the description. */
export function PageHeaderMeta({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className: cn(
      "mt-(--qy-space-2) flex min-w-0 flex-wrap items-center gap-x-(--qy-space-4) gap-y-(--qy-space-2) text-muted-foreground text-sm [&_svg:not([class*='opacity-'])]:opacity-80 [&_svg:not([class*='size-'])]:size-4 sm:[&_svg:not([class*='size-'])]:size-3.5 [&_svg]:shrink-0",
      className,
    ),
    "data-slot": "page-header-meta",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export function PageHeaderActions({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className: cn(
      "flex max-w-full shrink-0 flex-wrap items-center gap-(--qy-space-2)",
      className,
    ),
    "data-slot": "page-header-actions",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}
