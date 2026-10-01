"use client";

import { Field as FieldPrimitive } from "@base-ui/react/field";
import { ChevronsUpDownIcon } from "lucide-react";
import type * as React from "react";
import { useUILocale } from "../locale";
import { cn } from "../utils";

export type NativeSelectSize = "sm" | "default" | "lg";

export type NativeSelectProps = Omit<
  React.ComponentProps<"select">,
  "size" | "multiple" | "placeholder"
> & {
  /** Matches the `Select` trigger scale. */
  size?: NativeSelectSize;
  /**
   * Adds an empty first option shown in the muted placeholder colour until a
   * value is chosen. `true` uses the locale default (“请选择”). The option is
   * disabled when the select is `required`.
   */
  placeholder?: string | boolean;
  onValueChange?: (value: string) => void;
  /** Classes for the `<select>` itself; `className` styles the control box. */
  selectClassName?: string;
};

/**
 * A styled native `<select>` that matches `SelectTrigger`. Prefer it for
 * mobile-first forms (the platform picker opens) and very long option lists.
 * Works inside `Field` like `Input`: labels, descriptions and validity apply.
 */
export function NativeSelect({
  className,
  selectClassName,
  size = "default",
  placeholder,
  children,
  onValueChange,
  value,
  defaultValue,
  required,
  "aria-invalid": ariaInvalid,
  ...props
}: NativeSelectProps): React.ReactElement {
  const { messages } = useUILocale();
  const placeholderText =
    placeholder === true
      ? messages.selectPlaceholder
      : placeholder || undefined;
  // With a placeholder the empty option must be the initial selection, even
  // when it is disabled (browsers otherwise pick the first enabled option).
  const initialValue =
    value === undefined && defaultValue === undefined && placeholderText
      ? ""
      : defaultValue;
  const invalid =
    ariaInvalid === false || ariaInvalid === "false" ? undefined : ariaInvalid;

  const controlProps = {
    ...props,
    ...(value !== undefined ? { value } : {}),
    ...(initialValue !== undefined ? { defaultValue: initialValue } : {}),
    "aria-invalid": invalid,
    required,
    onValueChange: (next: string) => onValueChange?.(next),
  } as FieldPrimitive.Control.Props;

  return (
    <span
      className={cn(
        "relative inline-flex w-full min-w-36 rounded-lg border border-input bg-background not-dark:bg-clip-padding text-base text-foreground shadow-xs/5 ring-ring/24 transition-shadow before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] not-has-[select:disabled]:not-has-focus-visible:not-has-aria-invalid:before:shadow-[0_1px_--theme(--color-black/4%)] has-focus-visible:border-ring has-focus-visible:ring-[3px] has-aria-invalid:border-destructive/36 has-focus-visible:has-aria-invalid:border-destructive/64 has-focus-visible:has-aria-invalid:ring-destructive/16 has-[select:disabled]:pointer-events-none has-[select:disabled]:opacity-64 has-[select:disabled,select:focus-visible,select[aria-invalid=true]]:shadow-none sm:text-sm dark:bg-input/32 dark:has-aria-invalid:ring-destructive/24 dark:not-has-[select:disabled]:not-has-focus-visible:not-has-aria-invalid:before:shadow-[0_-1px_--theme(--color-white/6%)]",
        className,
      )}
      data-size={size}
      data-slot="native-select-control"
    >
      <FieldPrimitive.Control
        className={cn(
          "h-8.5 w-full min-w-0 cursor-default appearance-none truncate rounded-[inherit] bg-transparent ps-[calc(--spacing(3)-1px)] pe-[calc(--spacing(8.5)-1px)] text-foreground outline-none pointer-coarse:min-h-[calc(var(--qy-touch-target)-2px)] has-[option[value='']:checked]:text-muted-foreground/72 sm:h-7.5 sm:pe-[calc(--spacing(8)-1px)] [&_optgroup]:bg-popover [&_optgroup]:text-muted-foreground [&_option]:bg-popover [&_option]:text-popover-foreground",
          size === "sm" &&
            "h-7.5 ps-[calc(--spacing(2.5)-1px)] pe-[calc(--spacing(7.5)-1px)] sm:h-6.5 sm:pe-[calc(--spacing(7)-1px)]",
          size === "lg" && "h-9.5 sm:h-8.5",
          selectClassName,
        )}
        data-slot="native-select"
        render={<select />}
        {...controlProps}
      >
        {placeholderText ? (
          <option disabled={required} value="">
            {placeholderText}
          </option>
        ) : null}
        {children}
      </FieldPrimitive.Control>
      <ChevronsUpDownIcon
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute top-1/2 size-4.5 -translate-y-1/2 opacity-80 sm:size-4",
          size === "sm"
            ? "end-[calc(--spacing(1.5)-1px)]"
            : "end-[calc(--spacing(2)-1px)]",
        )}
        data-slot="native-select-icon"
      />
    </span>
  );
}

export function NativeSelectOption({
  className,
  ...props
}: React.ComponentProps<"option">): React.ReactElement {
  return (
    <option className={className} data-slot="native-select-option" {...props} />
  );
}

export function NativeSelectOptGroup({
  className,
  ...props
}: React.ComponentProps<"optgroup">): React.ReactElement {
  return (
    <optgroup
      className={className}
      data-slot="native-select-optgroup"
      {...props}
    />
  );
}
