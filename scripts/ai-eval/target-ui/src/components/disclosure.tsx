"use client";

import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import { ChevronDownIcon } from "lucide-react";
import * as React from "react";
import { cn } from "../utils";

/**
 * A styled, single collapsible section: a labelled trigger with a chevron and
 * a panel that animates its height. Use it for secondary content that most
 * people skip — advanced settings, details, a log. For several sibling
 * sections use Accordion; for a fully custom trigger use Collapsible.
 */
export type DisclosureVariant = "plain" | "inset" | "separated";

const DisclosureContext: React.Context<DisclosureVariant> =
  React.createContext<DisclosureVariant>("plain");

export type DisclosureProps = CollapsiblePrimitive.Root.Props & {
  /**
   * `plain`: an inline text trigger inside a form or card.
   * `inset`: a self-contained bordered box.
   * `separated`: a full-width row under a divider, closing off a section.
   */
  variant?: DisclosureVariant;
};

export function Disclosure({
  className,
  variant = "plain",
  ...props
}: DisclosureProps): React.ReactElement {
  return (
    <DisclosureContext.Provider value={variant}>
      <CollapsiblePrimitive.Root
        className={cn(
          "min-w-0",
          variant === "inset" &&
            "rounded-xl border bg-card not-dark:bg-clip-padding text-card-foreground",
          variant === "separated" && "border-t",
          className,
        )}
        data-slot="disclosure"
        data-variant={variant}
        {...props}
      />
    </DisclosureContext.Provider>
  );
}

export function DisclosureTrigger({
  className,
  children,
  ...props
}: CollapsiblePrimitive.Trigger.Props): React.ReactElement {
  const variant = React.useContext(DisclosureContext);
  return (
    <CollapsiblePrimitive.Trigger
      className={cn(
        "group/disclosure relative flex cursor-pointer select-none items-center font-medium text-base outline-none transition-[color,background-color,box-shadow] focus-visible:ring-[length:var(--qy-focus-button-width)] focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-64 data-disabled:pointer-events-none data-disabled:opacity-64 sm:text-sm",
        "[&_svg:not([class*='opacity-'])]:opacity-80 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
        variant === "plain" &&
          "touch-target -mx-1 w-fit gap-(--qy-space-1) rounded-md px-(--qy-space-1) py-[calc(var(--qy-space-1)*0.5)] text-muted-foreground hover:text-foreground focus-visible:ring-offset-[length:var(--qy-focus-button-offset)] focus-visible:ring-offset-background data-panel-open:text-foreground",
        variant === "inset" &&
          "min-h-12 w-full justify-between gap-(--qy-space-3) rounded-[calc(var(--radius-xl)-1px)] px-(--qy-space-4) text-start hover:bg-accent focus-visible:ring-inset data-panel-open:rounded-b-none sm:min-h-11",
        variant === "separated" &&
          "min-h-12 w-full justify-between gap-(--qy-space-3) rounded-md text-start text-muted-foreground hover:text-foreground focus-visible:ring-offset-[length:var(--qy-focus-button-offset)] focus-visible:ring-offset-background data-panel-open:text-foreground sm:min-h-11",
        className,
      )}
      data-slot="disclosure-trigger"
      {...props}
    >
      <span className="flex min-w-0 items-center gap-(--qy-space-2)" data-slot="disclosure-label">
        {children}
      </span>
      <ChevronDownIcon
        aria-hidden="true"
        className="transition-transform duration-(--qy-duration-base) ease-(--qy-ease-out) group-data-panel-open/disclosure:rotate-180"
        data-slot="disclosure-indicator"
      />
    </CollapsiblePrimitive.Trigger>
  );
}

export type DisclosurePanelProps = Omit<
  CollapsiblePrimitive.Panel.Props,
  "className"
> & {
  /** Applied to the inner content box, which carries the padding. */
  className?: string;
};

/**
 * Stays mounted while closed by default, so form fields inside keep their
 * values and the browser's find-in-page can still reach the text.
 */
export function DisclosurePanel({
  className,
  children,
  keepMounted = true,
  ...props
}: DisclosurePanelProps): React.ReactElement {
  const variant = React.useContext(DisclosureContext);
  return (
    <CollapsiblePrimitive.Panel
      className="h-(--collapsible-panel-height) overflow-hidden transition-[height,opacity] duration-(--qy-duration-base) ease-(--qy-ease-out) data-ending-style:h-0 data-starting-style:h-0 data-ending-style:opacity-0 data-starting-style:opacity-0 data-ending-style:duration-(--qy-duration-fast)"
      data-slot="disclosure-panel"
      keepMounted={keepMounted}
      {...props}
    >
      <div
        className={cn(
          "min-w-0",
          variant === "plain" && "pt-(--qy-space-3)",
          variant === "inset" && "px-(--qy-space-4) pb-(--qy-space-4)",
          variant === "separated" && "pb-(--qy-space-4)",
          className,
        )}
        data-slot="disclosure-content"
      >
        {children}
      </div>
    </CollapsiblePrimitive.Panel>
  );
}

export { DisclosurePanel as DisclosureContent };
