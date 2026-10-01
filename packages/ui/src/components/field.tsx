// Adapted from coss ui (MIT), apps/ui/registry/default/ui/field.tsx.
// See ../../THIRD_PARTY_NOTICES.md and ../../coss-source.json.
"use client";

import { Field as FieldPrimitive } from "@base-ui/react/field";
import * as React from "react";
import { cn } from "../utils";
import { Separator } from "./separator";

const FieldContext: React.Context<boolean> = React.createContext(false);

export type FieldOrientation = "vertical" | "horizontal";

export function Field({
  className,
  orientation = "vertical",
  ...props
}: FieldPrimitive.Root.Props & {
  /** `horizontal` places the label beside the control, for switches and checkboxes. */
  orientation?: FieldOrientation;
}): React.ReactElement {
  return (
    <FieldContext.Provider value={true}>
      <FieldPrimitive.Root
        className={cn(
          "group/field flex gap-2",
          orientation === "vertical"
            ? "flex-col items-start"
            : "flex-row items-center [&>[data-slot=field-content]]:flex-1",
          className,
        )}
        data-orientation={orientation}
        data-slot="field"
        {...props}
      />
    </FieldContext.Provider>
  );
}

/** Vertical rhythm for a run of fields inside a form or fieldset. */
export function FieldGroup({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn("flex w-full flex-col gap-5", className)}
      data-slot="field-group"
      {...props}
    />
  );
}

/** Groups a label and description that sit beside a horizontal control. */
export function FieldContent({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn("flex min-w-0 flex-col gap-1", className)}
      data-slot="field-content"
      {...props}
    />
  );
}

/** A non-label heading for a field, used when the control labels itself. */
export function FieldTitle({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn(
        "flex w-fit items-center gap-2 font-medium text-base/4.5 text-foreground sm:text-sm/4",
        className,
      )}
      data-slot="field-title"
      {...props}
    />
  );
}

/** A divider between field groups, optionally carrying a short label. */
export function FieldSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn("relative flex h-5 items-center", className)}
      data-slot="field-separator"
      {...props}
    >
      <Separator className="absolute inset-x-0 top-1/2" />
      {children ? (
        <span className="relative mx-auto bg-background px-2 text-muted-foreground text-xs">
          {children}
        </span>
      ) : null}
    </div>
  );
}

export function FieldLabel({
  className,
  ...props
}: FieldPrimitive.Label.Props): React.ReactElement {
  return (
    <FieldPrimitive.Label
      className={cn(
        "inline-flex items-center gap-2 font-medium text-base/4.5 text-foreground data-disabled:opacity-64 sm:text-sm/4",
        className,
      )}
      data-slot="field-label"
      {...props}
    />
  );
}

export function FieldItem({
  className,
  ...props
}: FieldPrimitive.Item.Props): React.ReactElement {
  return (
    <FieldPrimitive.Item
      className={cn("flex", className)}
      data-slot="field-item"
      {...props}
    />
  );
}

export function FieldDescription({
  className,
  ...props
}: FieldPrimitive.Description.Props): React.ReactElement {
  return (
    <FieldPrimitive.Description
      className={cn("text-muted-foreground text-xs", className)}
      data-slot="field-description"
      {...props}
    />
  );
}

type FieldErrorProps = FieldPrimitive.Error.Props & {
  /**
   * Validation messages from a form library such as react-hook-form. Duplicates
   * collapse; several distinct messages render as a list.
   */
  errors?: ReadonlyArray<{ message?: string | undefined } | undefined>;
};

/**
 * Renders whenever it has content. Pass `match` to defer to Base UI's
 * constraint-validation states instead.
 */
export function FieldError({
  className,
  children,
  errors,
  match,
  ...props
}: FieldErrorProps): React.ReactElement | null {
  const inField = React.useContext(FieldContext);
  const content = React.useMemo(() => {
    if (children) return children;
    const messages = [
      ...new Set((errors ?? []).map((error) => error?.message).filter(Boolean)),
    ] as string[];
    if (messages.length > 1) {
      return (
        <ul className="ms-4 list-disc">
          {messages.map((message) => (
            <li key={message}>{message}</li>
          ))}
        </ul>
      );
    }
    return messages[0];
  }, [children, errors]);
  if (!content && match === undefined) return null;
  const error = (
    <FieldPrimitive.Error
      className={cn("text-destructive-foreground text-xs", className)}
      data-slot="field-error"
      match={match ?? true}
      {...props}
    >
      {content}
    </FieldPrimitive.Error>
  );
  // Base UI requires a Field root; standalone errors get an invisible one.
  return inField ? error : <FieldPrimitive.Root>{error}</FieldPrimitive.Root>;
}

export const FieldControl: typeof FieldPrimitive.Control =
  FieldPrimitive.Control;
export const FieldValidity: typeof FieldPrimitive.Validity =
  FieldPrimitive.Validity;

export { FieldPrimitive };
export { Fieldset as FieldSet, FieldsetLegend as FieldLegend } from "./fieldset";
