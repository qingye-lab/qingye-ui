"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import * as React from "react";
import { useUILocale } from "../locale";
import { cn } from "../utils";
import { CopyButton } from "./copy-button";

export type DescriptionListLayout = "horizontal" | "vertical" | "grid";

type DescriptionListContextValue = {
  layout: DescriptionListLayout;
  divided: boolean;
};

const DescriptionListContext = React.createContext<DescriptionListContextValue>(
  {
    divided: false,
    layout: "horizontal",
  },
);

export interface DescriptionListProps extends useRender.ComponentProps<"dl"> {
  /**
   * `horizontal` puts terms in a label column (`--description-list-term`),
   * `vertical` stacks each term above its details, `grid` flows stacked pairs
   * into as many columns as fit (`--description-list-column`, default 10rem).
   */
  layout?: DescriptionListLayout;
  /** Hairlines between items. */
  divided?: boolean;
}

/**
 * Key–value details rendered as a semantic `<dl>`. Wrap each pair in
 * `DescriptionListItem` so layouts and dividers apply per pair.
 */
export function DescriptionList({
  className,
  render,
  layout = "horizontal",
  divided = false,
  ...props
}: DescriptionListProps): React.ReactElement {
  const context = React.useMemo(() => ({ divided, layout }), [divided, layout]);
  const defaultProps = {
    className: cn(
      "m-0 min-w-0 text-sm [--description-list-column:10rem] [--description-list-term:--spacing(24)] sm:[--description-list-term:--spacing(36)]",
      layout === "grid"
        ? cn(
            "grid grid-cols-[repeat(auto-fill,minmax(min(100%,var(--description-list-column)),1fr))]",
            // Divided grids run their hairlines edge to edge across a row.
            divided ? "gap-x-0" : "gap-x-6",
          )
        : "flex flex-col",
      divided ? "gap-y-0" : layout === "grid" ? "gap-y-5" : "gap-y-3",
      className,
    ),
    "data-divided": divided ? "" : undefined,
    "data-layout": layout,
    "data-slot": "description-list",
  };

  const element = useRender({
    defaultTagName: "dl",
    props: mergeProps<"dl">(defaultProps, props),
    render,
  });

  return (
    <DescriptionListContext.Provider value={context}>
      {element}
    </DescriptionListContext.Provider>
  );
}

/** One term and its details. Renders a `<div>`, which is valid inside `<dl>`. */
export function DescriptionListItem({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const { layout, divided } = React.useContext(DescriptionListContext);
  const defaultProps = {
    className: cn(
      "min-w-0",
      layout === "horizontal"
        ? "grid grid-cols-[minmax(0,var(--description-list-term))_minmax(0,1fr)] gap-x-4"
        : "flex flex-col gap-1",
      divided &&
        (layout === "grid"
          ? "border-t pt-3 pe-6 pb-4"
          : "py-3 not-last:border-b first:pt-0 last:pb-0"),
      className,
    ),
    "data-slot": "description-list-item",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export function DescriptionTerm({
  className,
  render,
  ...props
}: useRender.ComponentProps<"dt">): React.ReactElement {
  const defaultProps = {
    className: cn(
      "wrap-break-word flex min-w-0 items-center gap-1.5 self-start text-muted-foreground leading-6 [&_svg:not([class*='opacity-'])]:opacity-80 [&_svg:not([class*='size-'])]:size-4 sm:[&_svg:not([class*='size-'])]:size-3.5 [&_svg]:pointer-events-none [&_svg]:shrink-0",
      className,
    ),
    "data-slot": "description-term",
  };

  return useRender({
    defaultTagName: "dt",
    props: mergeProps<"dt">(defaultProps, props),
    render,
  });
}

export interface DescriptionDetailsProps extends useRender.ComponentProps<"dd"> {
  /** Adds a copy button that writes this exact text to the clipboard. */
  copyValue?: string;
  /** Accessible name of the copy button; defaults to the locale `copy`. */
  copyLabel?: string;
}

export function DescriptionDetails({
  className,
  render,
  copyValue,
  copyLabel,
  children,
  ...props
}: DescriptionDetailsProps): React.ReactElement {
  const { messages } = useUILocale();
  const copyable = copyValue !== undefined;

  const defaultProps = {
    children: copyable ? (
      <>
        <span className="min-w-0" data-slot="description-details-value">
          {children}
        </span>
        <CopyButton
          className="shrink-0 text-muted-foreground hover:text-foreground max-sm:-my-0.5"
          copyLabel={copyLabel ?? messages.copy}
          size="icon-xs"
          value={copyValue}
          variant="ghost"
        />
      </>
    ) : (
      children
    ),
    className: cn(
      "wrap-break-word m-0 min-w-0 text-foreground leading-6",
      copyable && "flex items-start gap-1",
      className,
    ),
    "data-slot": "description-details",
  };

  return useRender({
    defaultTagName: "dd",
    props: mergeProps<"dd">(defaultProps, props),
    render,
  });
}
