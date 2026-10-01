// Adapted from coss ui (MIT), apps/ui/registry/default/ui/input.tsx.
// See ../../THIRD_PARTY_NOTICES.md and ../../coss-source.json.
"use client";

import { Input as InputPrimitive } from "@base-ui/react/input";
import type * as React from "react";
import { cn } from "../utils";

export type InputProps = Omit<
  InputPrimitive.Props & React.RefAttributes<HTMLInputElement>,
  "size"
> & {
  size?: "sm" | "default" | "lg" | number;
  unstyled?: boolean;
  nativeInput?: boolean;
};

export function Input({
  className,
  size = "default",
  unstyled = false,
  nativeInput = false,
  style,
  ...props
}: InputProps): React.ReactElement {
  const inputClassName = cn(
    "h-[calc(var(--qy-control-md)+var(--qy-control-mobile-extra)-2px)] w-full min-w-0 rounded-[inherit] pointer-coarse:min-h-[calc(var(--qy-touch-target)-2px)] px-[calc(calc(var(--qy-space-1)*3.5)-1px)] text-foreground leading-[calc(var(--qy-control-md)+var(--qy-control-mobile-extra)-2px)] outline-none [transition:background-color_5000000s_ease-in-out_0s] placeholder:text-muted-foreground/72 sm:h-[calc(var(--qy-control-md)-2px)] sm:leading-[calc(var(--qy-control-md)-2px)] autofill:[-webkit-text-fill-color:var(--foreground)]",
    size === "sm" &&
      "h-[calc(var(--qy-control-sm)+var(--qy-control-mobile-extra)-2px)] px-[calc(calc(var(--qy-space-1)*2.5)-1px)] leading-[calc(var(--qy-control-sm)+var(--qy-control-mobile-extra)-2px)] sm:h-[calc(var(--qy-control-sm)-2px)] sm:leading-[calc(var(--qy-control-sm)-2px)]",
    size === "lg" && "h-[calc(var(--qy-control-lg)+var(--qy-control-mobile-extra)-2px)] px-[calc(var(--qy-space-4)-1px)] leading-[calc(var(--qy-control-lg)+var(--qy-control-mobile-extra)-2px)] sm:h-[calc(var(--qy-control-lg)-2px)] sm:leading-[calc(var(--qy-control-lg)-2px)]",
    props.type === "search" &&
      "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none",
    props.type === "file" &&
      "text-muted-foreground file:me-(--qy-space-3) file:bg-transparent file:font-medium file:text-foreground file:text-sm",
  );

  return (
    <span
      className={
        cn(
          !unstyled &&
            "relative inline-flex w-full rounded-control border border-input bg-card not-dark:bg-clip-padding text-field-input-mobile shadow-control ring-ring/24 ring-offset-[length:var(--qy-focus-input-offset)] ring-offset-background transition-[background-color,border-color,box-shadow] not-has-disabled:not-has-focus-visible:not-has-aria-invalid:hover:border-border-strong before:pointer-events-none before:absolute before:inset-0 before:rounded-[max(0px,calc(var(--qy-radius-control)-1px))] not-has-disabled:not-has-focus-visible:not-has-aria-invalid:before:shadow-[0_1px_--theme(--color-black/4%)] has-focus-visible:has-aria-invalid:border-destructive/64 has-focus-visible:has-aria-invalid:ring-destructive/16 has-aria-invalid:border-destructive/36 has-focus-visible:border-ring has-autofill:bg-foreground/4 has-disabled:opacity-64 has-[:disabled,:focus-visible,[aria-invalid]]:shadow-none has-focus-visible:ring-[length:var(--qy-focus-input-width)] sm:text-field-input dark:bg-input/32 dark:has-autofill:bg-foreground/8 dark:has-aria-invalid:ring-destructive/24 dark:not-has-disabled:not-has-focus-visible:not-has-aria-invalid:before:shadow-[0_-1px_--theme(--color-white/6%)]",
          className,
        ) || undefined
      }
      data-size={size}
      data-slot="input-control"
    >
      {nativeInput ? (
        <input
          className={inputClassName}
          data-slot="input"
          size={typeof size === "number" ? size : undefined}
          style={typeof style === "function" ? undefined : style}
          {...props}
        />
      ) : (
        <InputPrimitive
          className={inputClassName}
          data-slot="input"
          size={typeof size === "number" ? size : undefined}
          style={style}
          {...props}
        />
      )}
    </span>
  );
}

export { InputPrimitive };
