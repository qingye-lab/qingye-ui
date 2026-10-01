// Adapted from coss ui (MIT), apps/ui/registry/default/ui/button.tsx.
// See ../../THIRD_PARTY_NOTICES.md and ../../coss-source.json.
"use client";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "../utils";
import { Spinner } from "./spinner";

export const buttonVariants = cva(
  "qy-pressable relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-(--qy-space-2) whitespace-nowrap rounded-control border font-medium text-button-mobile outline-none transition-[color,background-color,border-color,box-shadow] before:pointer-events-none before:absolute before:inset-0 before:rounded-[max(0px,calc(var(--qy-radius-control)-1px))] pointer-coarse:after:absolute pointer-coarse:after:size-full pointer-coarse:after:min-h-(--qy-touch-target) pointer-coarse:after:min-w-(--qy-touch-target) focus-visible:ring-[length:var(--qy-focus-button-width)] focus-visible:ring-ring focus-visible:ring-offset-[length:var(--qy-focus-button-offset)] focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-64 data-loading:select-none data-loading:text-transparent sm:text-button [&_svg:not([class*='opacity-'])]:opacity-80 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:-mx-0.5 [&_svg]:shrink-0",
  {
    defaultVariants: {
      size: "default",
      variant: "default",
    },
    variants: {
      size: {
        default: "h-[calc(var(--qy-control-md)+var(--qy-control-mobile-extra))] px-[calc(calc(var(--qy-space-1)*3.5)-1px)] sm:h-(--qy-control-md)",
        icon: "size-[calc(var(--qy-control-md)+var(--qy-control-mobile-extra))] sm:size-(--qy-control-md)",
        "icon-lg": "size-[calc(var(--qy-control-lg)+var(--qy-control-mobile-extra))] sm:size-(--qy-control-lg)",
        "icon-sm": "size-[calc(var(--qy-control-sm)+var(--qy-control-mobile-extra))] sm:size-(--qy-control-sm)",
        "icon-xl":
          "size-[calc(var(--qy-control-xl)+var(--qy-control-mobile-extra))] sm:size-(--qy-control-xl) [&_svg:not([class*='size-'])]:size-5 sm:[&_svg:not([class*='size-'])]:size-4.5",
        "icon-xs":
          "size-[calc(var(--qy-control-xs)+var(--qy-control-mobile-extra))] rounded-md before:rounded-[calc(var(--radius-md)-1px)] sm:size-(--qy-control-xs) not-in-data-[slot=input-group]:[&_svg:not([class*='size-'])]:size-4 sm:not-in-data-[slot=input-group]:[&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-[calc(var(--qy-control-lg)+var(--qy-control-mobile-extra))] px-[calc(var(--qy-space-4)-1px)] sm:h-(--qy-control-lg)",
        sm: "h-[calc(var(--qy-control-sm)+var(--qy-control-mobile-extra))] gap-[calc(var(--qy-space-1)*1.5)] px-[calc(calc(var(--qy-space-1)*2.5)-1px)] sm:h-(--qy-control-sm)",
        xl: "h-[calc(var(--qy-control-xl)+var(--qy-control-mobile-extra))] px-[calc(var(--qy-space-4)-1px)] text-button-lg sm:h-(--qy-control-xl) sm:text-button-mobile [&_svg:not([class*='size-'])]:size-5 sm:[&_svg:not([class*='size-'])]:size-4.5",
        xs: "h-[calc(var(--qy-control-xs)+var(--qy-control-mobile-extra))] gap-(--qy-space-1) rounded-md px-[calc(var(--qy-space-2)-1px)] text-button before:rounded-[calc(var(--radius-md)-1px)] sm:h-(--qy-control-xs) sm:text-button-xs [&_svg:not([class*='size-'])]:size-4 sm:[&_svg:not([class*='size-'])]:size-3.5",
      },
      variant: {
        default:
          "not-disabled:inset-shadow-[0_1px_--theme(--color-white/16%)] border-primary bg-primary text-primary-foreground hover:bg-primary/90 data-pressed:bg-primary/90 *:data-[slot=button-loading-indicator]:text-primary-foreground [:active,[data-pressed]]:inset-shadow-[0_1px_--theme(--color-black/8%)] [:disabled,:active,[data-pressed]]:shadow-none",
        destructive:
          "not-disabled:inset-shadow-[0_1px_--theme(--color-white/16%)] border-destructive bg-destructive-fill text-destructive-on-fill hover:bg-destructive-fill/90 data-pressed:bg-destructive-fill/90 *:data-[slot=button-loading-indicator]:text-destructive-on-fill [:active,[data-pressed]]:inset-shadow-[0_1px_--theme(--color-black/8%)] [:disabled,:active,[data-pressed]]:shadow-none",
        "destructive-outline":
          "border-input bg-popover not-dark:bg-clip-padding text-destructive-foreground shadow-control not-disabled:not-active:not-data-pressed:before:shadow-[0_1px_--theme(--color-black/4%)] hover:border-destructive/32 hover:bg-destructive/4 data-pressed:border-destructive/32 data-pressed:bg-destructive/4 *:data-[slot=button-loading-indicator]:text-foreground dark:bg-input/32 dark:not-disabled:before:shadow-[0_-1px_--theme(--color-white/2%)] dark:not-disabled:not-active:not-data-pressed:before:shadow-[0_-1px_--theme(--color-white/6%)] [:disabled,:active,[data-pressed]]:shadow-none",
        ghost:
          "border-transparent text-foreground hover:bg-accent data-pressed:bg-accent *:data-[slot=button-loading-indicator]:text-foreground",
        link: "border-transparent text-foreground underline-offset-4 hover:underline data-pressed:underline *:data-[slot=button-loading-indicator]:text-foreground",
        outline:
          "border-input bg-popover not-dark:bg-clip-padding text-foreground shadow-control not-disabled:not-active:not-data-pressed:before:shadow-[0_1px_--theme(--color-black/4%)] hover:border-border-strong hover:bg-surface-subtle data-pressed:bg-surface-subtle *:data-[slot=button-loading-indicator]:text-foreground dark:bg-input/32 dark:data-pressed:bg-input/64 dark:hover:bg-input/64 dark:not-disabled:before:shadow-[0_-1px_--theme(--color-white/2%)] dark:not-disabled:not-active:not-data-pressed:before:shadow-[0_-1px_--theme(--color-white/6%)] [:disabled,:active,[data-pressed]]:shadow-none",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-surface-hover data-pressed:bg-surface-active *:data-[slot=button-loading-indicator]:text-secondary-foreground [:active,[data-pressed]]:bg-surface-active",
      },
    },
  },
);

export interface ButtonProps extends useRender.ComponentProps<"button"> {
  variant?: VariantProps<typeof buttonVariants>["variant"];
  size?: VariantProps<typeof buttonVariants>["size"];
  loading?: boolean;
  /**
   * Set to `false` when `render` produces a non-button element (for example a
   * link styled as a button) so keyboard and disabled semantics stay correct.
   */
  nativeButton?: boolean;
}

export function Button({
  className,
  variant,
  size,
  render,
  children,
  loading = false,
  disabled: disabledProp,
  nativeButton,
  ...props
}: ButtonProps): React.ReactElement {
  if (nativeButton === false) {
    render = <ButtonPrimitive nativeButton={false} render={render} />;
  }
  const isDisabled: boolean = Boolean(loading || disabledProp);
  const typeValue: React.ButtonHTMLAttributes<HTMLButtonElement>["type"] =
    render ? undefined : "button";

  const defaultProps = {
    children: (
      <>
        {children}
        {loading && (
          <Spinner
            aria-hidden="true"
            className="pointer-events-none absolute"
            data-slot="button-loading-indicator"
          />
        )}
      </>
    ),
    className: cn(buttonVariants({ className, size, variant })),
    "aria-disabled": loading || undefined,
    "aria-busy": loading || undefined,
    "data-loading": loading ? "" : undefined,
    "data-slot": "button",
    disabled: isDisabled,
    type: typeValue,
  };

  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(defaultProps, props),
    render,
  });
}
