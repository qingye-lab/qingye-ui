"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../utils";
import { Separator } from "./separator";

const ItemGroupContext = React.createContext(false);

/** A list of items. Items rendered as plain `<div>` inside it become list items. */
export function ItemGroup({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className: cn("group/item-group flex flex-col", className),
    "data-slot": "item-group",
    role: "list",
  };

  const element = useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });

  return (
    <ItemGroupContext.Provider value={true}>
      {element}
    </ItemGroupContext.Provider>
  );
}

export function ItemSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>): React.ReactElement {
  return (
    <Separator
      className={cn("my-0", className)}
      data-slot="item-separator"
      orientation="horizontal"
      {...props}
    />
  );
}

export const itemVariants = cva(
  "group/item relative flex min-w-0 flex-wrap items-center border border-transparent text-sm outline-none transition-[background-color,border-color,box-shadow] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background [a&,button&]:cursor-pointer [button&]:w-full [button&]:text-start",
  {
    defaultVariants: {
      size: "default",
      variant: "default",
    },
    variants: {
      size: {
        default: "gap-x-3.5 gap-y-3 rounded-xl p-4",
        sm: "gap-x-2.5 gap-y-2 rounded-lg px-3 py-2.5 pointer-coarse:min-h-11",
      },
      variant: {
        default: "bg-transparent [a&,button&]:hover:bg-accent",
        muted: "bg-muted/72 [a&,button&]:hover:bg-muted",
        outline:
          "border-border bg-card not-dark:bg-clip-padding shadow-xs/5 before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-xl)-1px)] data-[size=sm]:before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] dark:before:shadow-[0_-1px_--theme(--color-white/6%)] [a&,button&]:hover:bg-[color-mix(in_srgb,var(--card),var(--color-black)_2%)] dark:[a&,button&]:hover:bg-[color-mix(in_srgb,var(--card),var(--color-white)_2%)]",
      },
    },
  },
);

export interface ItemProps extends useRender.ComponentProps<"div"> {
  variant?: VariantProps<typeof itemVariants>["variant"];
  size?: VariantProps<typeof itemVariants>["size"];
}

/**
 * A row of media, content and actions. Use `render={<a href="…" />}` (or a
 * router link) to make the whole item interactive.
 */
export function Item({
  className,
  render,
  variant = "default",
  size = "default",
  ...props
}: ItemProps): React.ReactElement {
  const inGroup = React.useContext(ItemGroupContext);
  const defaultProps = {
    className: cn(itemVariants({ className, size, variant })),
    "data-size": size,
    "data-slot": "item",
    "data-variant": variant,
    role: inGroup && !render ? "listitem" : undefined,
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export const itemMediaVariants = cva(
  "relative flex shrink-0 items-center justify-center gap-2 group-has-data-[slot=item-description]/item:self-start [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    defaultVariants: {
      variant: "default",
    },
    variants: {
      variant: {
        avatar:
          "group-has-data-[slot=item-description]/item:translate-y-0.5 [&_[data-slot=avatar]]:size-9",
        default:
          "text-muted-foreground group-has-data-[slot=item-description]/item:translate-y-0.5 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4",
        icon: "size-9 rounded-lg border bg-card not-dark:bg-clip-padding text-foreground shadow-xs/5 before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] dark:bg-input/32 dark:before:shadow-[0_-1px_--theme(--color-white/6%)] [&_svg:not([class*='opacity-'])]:opacity-80 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4",
        image:
          "size-10 overflow-hidden rounded-lg after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:border after:border-foreground/8 group-data-[size=sm]/item:size-8 group-data-[size=sm]/item:rounded-md group-data-[size=sm]/item:after:rounded-md [&_img]:size-full [&_img]:object-cover",
      },
    },
  },
);

export interface ItemMediaProps extends useRender.ComponentProps<"div"> {
  /** `icon` frames an icon in a small tile; `image` crops a thumbnail; `avatar` aligns an Avatar. */
  variant?: VariantProps<typeof itemMediaVariants>["variant"];
}

export function ItemMedia({
  className,
  render,
  variant = "default",
  ...props
}: ItemMediaProps): React.ReactElement {
  const defaultProps = {
    className: cn(itemMediaVariants({ className, variant })),
    "data-slot": "item-media",
    "data-variant": variant,
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export function ItemContent({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className: cn(
      "flex min-w-0 flex-1 flex-col gap-1 [&+[data-slot=item-content]]:flex-none",
      className,
    ),
    "data-slot": "item-content",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export function ItemTitle({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className: cn(
      "flex w-fit max-w-full items-center gap-2 font-medium text-foreground leading-snug",
      className,
    ),
    "data-slot": "item-title",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export function ItemDescription({
  className,
  render,
  ...props
}: useRender.ComponentProps<"p">): React.ReactElement {
  const defaultProps = {
    className: cn(
      "line-clamp-2 text-pretty font-normal text-muted-foreground text-sm leading-normal [&>a:hover]:text-foreground [&>a]:underline [&>a]:decoration-foreground/24 [&>a]:underline-offset-[0.25em]",
      className,
    ),
    "data-slot": "item-description",
  };

  return useRender({
    defaultTagName: "p",
    props: mergeProps<"p">(defaultProps, props),
    render,
  });
}

export function ItemActions({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className: cn("flex shrink-0 items-center gap-2", className),
    "data-slot": "item-actions",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export function ItemHeader({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className: cn(
      "flex basis-full items-center justify-between gap-2",
      className,
    ),
    "data-slot": "item-header",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export function ItemFooter({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className: cn(
      "flex basis-full items-center justify-between gap-2",
      className,
    ),
    "data-slot": "item-footer",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}
