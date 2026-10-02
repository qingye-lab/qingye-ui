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
          "group/field flex min-w-0 gap-(--qy-field-gap)",
          orientation === "vertical"
            ? "flex-col items-start"
            : "flex-row items-center gap-(--qy-space-3) has-[>[data-slot=field-content]]:items-start [&>[data-slot=field-content]]:flex-1 has-[>[data-slot=field-content]]:*:data-[slot=checkbox]:mt-px has-[>[data-slot=field-content]]:*:data-[slot=radio]:mt-px",
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
      className={cn("flex w-full flex-col gap-(--qy-field-group-gap)", className)}
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
      className={cn("flex min-w-0 flex-col gap-(--qy-space-1)", className)}
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
        "flex w-fit max-w-full wrap-anywhere items-center gap-(--qy-space-2) font-medium text-field-label-mobile text-foreground sm:text-field-label",
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
        <span className="relative mx-auto bg-background px-(--qy-space-2) text-muted-foreground text-xs">
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
        "inline-flex max-w-full wrap-anywhere items-center gap-(--qy-space-2) font-medium text-field-label-mobile text-foreground data-disabled:opacity-64 sm:text-field-label",
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
      className={cn("max-w-full wrap-anywhere text-muted-foreground text-xs", className)}
      data-slot="field-description"
      {...props}
    />
  );
}

type FieldErrorProps = FieldPrimitive.Error.Props & {
  /**
   * Validation messages from a form library such as react-hook-form or
   * TanStack Form. Empty entries are ignored, duplicates collapse, and several
   * distinct messages render as a list.
   */
  errors?: ReadonlyArray<{ message?: string | undefined } | undefined>;
};

const fieldErrorClassName =
  "max-w-full wrap-anywhere text-destructive-foreground text-xs transition-[opacity,translate] duration-(--qy-duration-fast) ease-(--qy-ease-out) data-ending-style:duration-(--qy-duration-press) data-starting-style:-translate-y-0.5 data-starting-style:opacity-0 data-ending-style:opacity-0 [&_ul]:ms-(--qy-space-4) [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-[calc(var(--qy-space-1)*0.5)]";

/**
 * With content (`children` or a non-empty `errors`), the message is shown
 * as given — the caller decides when it renders. Without content it follows
 * Base UI: the browser's validation message or the `Form` `errors` entry
 * appears while the field is invalid. Pass `match` (for example
 * `"valueMissing"`) to tie a custom message to one validity state.
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
        <ul>
          {messages.map((message) => (
            <li key={message}>{message}</li>
          ))}
        </ul>
      );
    }
    return messages[0];
  }, [children, errors]);

  if (!inField) {
    // Outside a Field there is no validity to follow: render content as is.
    if (!content) return null;
    const { render: _render, style, ...rest } = props;
    return (
      <div
        className={cn(fieldErrorClassName, typeof className === "string" ? className : undefined)}
        data-slot="field-error"
        style={typeof style === "function" ? undefined : style}
        {...(rest as React.ComponentProps<"div">)}
      >
        {content}
      </div>
    );
  }

  return (
    <FieldPrimitive.Error
      className={
        typeof className === "function"
          ? (state) => cn(fieldErrorClassName, className(state))
          : cn(fieldErrorClassName, className)
      }
      data-slot="field-error"
      match={match ?? (content ? true : undefined)}
      {...props}
      // An explicit `children: undefined` would hide Base UI's own message.
      {...(content ? { children: content } : null)}
    />
  );
}

export const FieldControl: typeof FieldPrimitive.Control =
  FieldPrimitive.Control;
export const FieldValidity: typeof FieldPrimitive.Validity =
  FieldPrimitive.Validity;

export { FieldPrimitive };
export { Fieldset as FieldSet, FieldsetLegend as FieldLegend } from "./fieldset";
