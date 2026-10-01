// Adapted from coss ui (MIT), apps/ui/registry/default/ui/number-field.tsx.
// See ../../THIRD_PARTY_NOTICES.md and ../../coss-source.json.
"use client";

import { NumberField as NumberFieldPrimitive } from "@base-ui/react/number-field";
import { MinusIcon, MoveHorizontalIcon, PlusIcon } from "lucide-react";
import * as React from "react";
import { useUILocale } from "../locale";
import { cn } from "../utils";
import { Label } from "./label";

export const NumberFieldContext: React.Context<{
  fieldId: string;
} | null> = React.createContext<{
  fieldId: string;
} | null>(null);

export function NumberField({
  id,
  className,
  size = "default",
  ...props
}: NumberFieldPrimitive.Root.Props & {
  size?: "sm" | "default" | "lg";
}): React.ReactElement {
  const { code } = useUILocale();
  const generatedId = React.useId();
  const fieldId = id ?? generatedId;

  return (
    <NumberFieldContext.Provider value={{ fieldId }}>
      <NumberFieldPrimitive.Root
        locale={code}
        className={cn("flex w-full flex-col items-start gap-(--qy-space-2)", className)}
        data-size={size}
        data-slot="number-field"
        id={fieldId}
        {...props}
      />
    </NumberFieldContext.Provider>
  );
}

export function NumberFieldGroup({
  className,
  ...props
}: NumberFieldPrimitive.Group.Props): React.ReactElement {
  return (
    <NumberFieldPrimitive.Group
      className={cn(
        "relative flex w-full justify-between rounded-control border border-input bg-background not-dark:bg-clip-padding text-field-input-mobile text-foreground shadow-xs/5 ring-ring/24 ring-offset-[length:var(--qy-focus-input-offset)] ring-offset-background transition-shadow before:pointer-events-none before:absolute before:inset-0 before:rounded-[max(0px,calc(var(--qy-radius-control)-1px))] not-data-disabled:not-focus-within:not-aria-invalid:before:shadow-[0_1px_--theme(--color-black/4%)] focus-within:border-ring focus-within:ring-[length:var(--qy-focus-input-width)] has-aria-invalid:border-destructive/36 focus-within:has-aria-invalid:border-destructive/64 focus-within:has-aria-invalid:ring-destructive/16 data-disabled:pointer-events-none data-disabled:opacity-64 sm:text-field-input dark:bg-input/32 dark:has-aria-invalid:ring-destructive/24 dark:not-data-disabled:not-focus-within:not-aria-invalid:before:shadow-[0_-1px_--theme(--color-white/6%)] [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 [[data-disabled],:focus-within,[aria-invalid]]:shadow-none",
        className,
      )}
      data-slot="number-field-group"
      {...props}
    />
  );
}

export function NumberFieldDecrement({
  className,
  ...props
}: NumberFieldPrimitive.Decrement.Props): React.ReactElement {
  const { messages } = useUILocale();
  return (
    <NumberFieldPrimitive.Decrement
      aria-label={messages.decrease}
      className={cn(
        "relative flex shrink-0 cursor-pointer items-center justify-center rounded-s-[max(0px,calc(var(--qy-radius-control)-1px))] in-data-[size=sm]:px-[calc(calc(var(--qy-space-1)*2.5)-1px)] px-[calc(var(--qy-space-3)-1px)] transition-colors pointer-coarse:after:absolute pointer-coarse:after:size-full pointer-coarse:after:min-h-11 pointer-coarse:after:min-w-11 hover:bg-accent data-disabled:pointer-events-none data-readonly:pointer-events-none not-in-data-disabled:data-disabled:*:opacity-40 data-readonly:*:opacity-40",
        className,
      )}
      data-slot="number-field-decrement"
      {...props}
    >
      <MinusIcon />
    </NumberFieldPrimitive.Decrement>
  );
}

export function NumberFieldIncrement({
  className,
  ...props
}: NumberFieldPrimitive.Increment.Props): React.ReactElement {
  const { messages } = useUILocale();
  return (
    <NumberFieldPrimitive.Increment
      aria-label={messages.increase}
      className={cn(
        "relative flex shrink-0 cursor-pointer items-center justify-center rounded-e-[max(0px,calc(var(--qy-radius-control)-1px))] in-data-[size=sm]:px-[calc(calc(var(--qy-space-1)*2.5)-1px)] px-[calc(var(--qy-space-3)-1px)] transition-colors pointer-coarse:after:absolute pointer-coarse:after:size-full pointer-coarse:after:min-h-11 pointer-coarse:after:min-w-11 hover:bg-accent data-disabled:pointer-events-none data-readonly:pointer-events-none not-in-data-disabled:data-disabled:*:opacity-40 data-readonly:*:opacity-40",
        className,
      )}
      data-slot="number-field-increment"
      {...props}
    >
      <PlusIcon />
    </NumberFieldPrimitive.Increment>
  );
}

export function NumberFieldInput({
  className,
  ...props
}: NumberFieldPrimitive.Input.Props): React.ReactElement {
  const { messages } = useUILocale();
  return (
    <NumberFieldPrimitive.Input
      aria-roledescription={messages.numberInput}
      className={cn(
        "h-8.5 pointer-coarse:min-h-[calc(var(--qy-touch-target)-2px)] in-data-[size=lg]:h-9.5 in-data-[size=sm]:h-7.5 w-full min-w-0 grow bg-transparent in-data-[size=sm]:px-[calc(calc(var(--qy-space-1)*2.5)-1px)] px-[calc(var(--qy-space-3)-1px)] text-center text-foreground tabular-nums in-data-[size=lg]:leading-9.5 in-data-[size=sm]:leading-7.5 leading-8.5 outline-none sm:h-7.5 sm:in-data-[size=lg]:h-8.5 sm:in-data-[size=sm]:h-6.5 sm:in-data-[size=lg]:leading-8.5 sm:in-data-[size=sm]:leading-8.5 sm:leading-7.5",
        className,
      )}
      data-slot="number-field-input"
      {...props}
    />
  );
}

export function NumberFieldScrubArea({
  className,
  label,
  ...props
}: NumberFieldPrimitive.ScrubArea.Props & {
  label: string;
}): React.ReactElement {
  const context = React.useContext(NumberFieldContext);

  if (!context) {
    throw new Error(
      "NumberFieldScrubArea must be used within a NumberField component for accessibility.",
    );
  }

  return (
    <NumberFieldPrimitive.ScrubArea
      className={cn("flex cursor-ew-resize", className)}
      data-slot="number-field-scrub-area"
      {...props}
    >
      <Label className="cursor-ew-resize" htmlFor={context.fieldId}>
        {label}
      </Label>
      <NumberFieldPrimitive.ScrubAreaCursor className="drop-shadow-[0_0_1px_--theme(--color-black/64%)] drop-shadow-[0_1px_1px_--theme(--color-white/64%)]">
        <CursorGrowIcon />
      </NumberFieldPrimitive.ScrubAreaCursor>
    </NumberFieldPrimitive.ScrubArea>
  );
}

export function CursorGrowIcon(
  props: React.ComponentProps<"svg">,
): React.ReactElement {
  return (
    <MoveHorizontalIcon aria-hidden="true" {...props} />
  );
}

export { NumberFieldPrimitive };
