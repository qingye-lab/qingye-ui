"use client";

import { CheckIcon, XIcon } from "lucide-react";
import type { ComponentProps, KeyboardEvent, ReactElement, ReactNode } from "react";
import { useUILocale } from "../locale";
import { cn } from "../utils";

export type StepStatus = "complete" | "current" | "upcoming" | "error";
export type StepsOrientation = "horizontal" | "vertical";
export type StepsSize = "sm" | "default";

export type StepItem = {
  id: string;
  title: ReactNode;
  description?: ReactNode;
  /** Overrides the status derived from `current`, e.g. `"error"` for a failed step. */
  status?: StepStatus;
  /** Replaces the step number in the indicator (complete and error keep their marks). */
  icon?: ReactNode;
  /** With `onStepClick`, keeps this step from being chosen. */
  disabled?: boolean;
};

export type StepsProps = Omit<ComponentProps<"ol">, "children"> & {
  items: readonly StepItem[];
  /** Index of the current step. Earlier steps are complete, later ones upcoming. */
  current: number;
  orientation?: StepsOrientation;
  size?: StepsSize;
  /** Makes steps buttons, e.g. to jump back to a finished step. */
  onStepClick?: (index: number, item: StepItem) => void;
  /** Accessible name of the list. */
  label?: string;
};

const indicatorClassNames: Record<StepStatus, string> = {
  complete: "border-primary bg-primary text-primary-foreground",
  current: "border-primary bg-background text-foreground shadow-[0_0_0_3px_--alpha(var(--color-primary)/10%)]",
  error: "border-destructive bg-destructive text-white",
  upcoming:
    "border-input bg-background text-muted-foreground in-[button:enabled:hover]:bg-[color-mix(in_srgb,var(--color-background),var(--color-foreground)_4%)]",
};

const titleClassNames: Record<StepStatus, string> = {
  complete: "text-foreground",
  current: "text-foreground",
  error: "text-destructive-foreground",
  upcoming: "text-muted-foreground in-[button:enabled:hover]:text-foreground",
};

function resolveStatus(item: StepItem, index: number, current: number): StepStatus {
  return item.status ?? (index < current ? "complete" : index === current ? "current" : "upcoming");
}

export function Steps({
  items,
  current,
  orientation = "horizontal",
  size = "default",
  onStepClick,
  label,
  className,
  onKeyDown,
  ...props
}: StepsProps): ReactElement {
  const { messages } = useUILocale();
  const statusLabel: Record<StepStatus, string> = {
    complete: messages.stepComplete,
    current: messages.stepCurrent,
    error: messages.stepError,
    upcoming: messages.stepUpcoming,
  };
  const vertical = orientation === "vertical";

  // Arrow keys move between clickable steps; Tab still reaches each one.
  const handleKeyDown = (event: KeyboardEvent<HTMLOListElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || !onStepClick) return;
    const triggers = Array.from(
      event.currentTarget.querySelectorAll<HTMLButtonElement>("[data-slot=steps-trigger]:not(:disabled)"),
    );
    const index = triggers.indexOf(document.activeElement as HTMLButtonElement);
    if (index < 0) return;
    const rtl = getComputedStyle(event.currentTarget).direction === "rtl";
    const forward = vertical ? "ArrowDown" : rtl ? "ArrowLeft" : "ArrowRight";
    const backward = vertical ? "ArrowUp" : rtl ? "ArrowRight" : "ArrowLeft";
    const next =
      event.key === forward ? Math.min(index + 1, triggers.length - 1)
      : event.key === backward ? Math.max(index - 1, 0)
      : event.key === "Home" ? 0
      : event.key === "End" ? triggers.length - 1
      : -1;
    if (next < 0) return;
    event.preventDefault();
    triggers[next]?.focus();
  };

  return (
    <ol
      aria-label={label ?? messages.steps}
      className={cn(
        "m-0 flex w-full min-w-0 list-none p-0 [--step-indicator:--spacing(7)] data-[size=sm]:[--step-indicator:--spacing(5)]",
        vertical ? "flex-col" : "flex-row",
        className,
      )}
      data-orientation={orientation}
      data-size={size}
      data-slot="steps"
      onKeyDown={handleKeyDown}
      {...props}
    >
      {items.map((item, index) => {
        const status = resolveStatus(item, index, current);
        const last = index === items.length - 1;
        const interactive = Boolean(onStepClick);
        const ariaCurrent = status === "current" || (index === current && item.status === "error") ? "step" : undefined;

        const body = (
          <>
            <span
              aria-hidden="true"
              className={cn(
                "relative flex size-(--step-indicator) shrink-0 items-center justify-center rounded-full border font-medium numeric transition-[background-color,border-color,color,box-shadow] duration-(--qy-duration-base) ease-(--qy-ease-out)",
                size === "sm" ? "text-[0.6875rem] [&_svg]:size-3" : "text-xs [&_svg]:size-3.5",
                indicatorClassNames[status],
              )}
              data-slot="steps-indicator"
            >
              {status === "complete" ? (
                <CheckIcon strokeWidth={2.75} />
              ) : status === "error" ? (
                <XIcon strokeWidth={2.75} />
              ) : (
                (item.icon ?? index + 1)
              )}
            </span>
            <span
              className={cn(
                "flex min-w-0 flex-col gap-0.5",
                vertical && size === "default" && "pt-1",
                vertical ? "pe-1" : "pe-3",
              )}
              data-slot="steps-content"
            >
              <span
                className={cn("font-medium text-sm leading-5 transition-colors", titleClassNames[status])}
                data-slot="steps-title"
              >
                {item.title}
                <span className="sr-only"> {statusLabel[status]}</span>
              </span>
              {item.description ? (
                <span
                  className={cn("text-muted-foreground text-pretty", size === "sm" ? "text-xs leading-4" : "text-sm leading-5")}
                  data-slot="steps-description"
                >
                  {item.description}
                </span>
              ) : null}
            </span>
          </>
        );

        const bodyClassName = cn(
          "relative flex min-w-0 text-start",
          vertical ? "flex-row gap-3" : "flex-col items-start gap-2",
        );

        return (
          <li
            aria-current={interactive ? undefined : ariaCurrent}
            className={cn(
              "relative flex min-w-0",
              vertical ? (size === "sm" ? "pb-4 last:pb-0" : "pb-6 last:pb-0") : "flex-1 last:flex-none",
            )}
            data-slot="steps-item"
            data-status={status}
            key={item.id}
          >
            {last ? null : (
              <span
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute bg-input transition-colors duration-(--qy-duration-base) ease-(--qy-ease-out) data-[status=complete]:bg-primary",
                  vertical
                    ? "start-[calc(var(--step-indicator)/2-0.5px)] top-[calc(var(--step-indicator)+--spacing(1.5))] bottom-1.5 w-px"
                    : "start-[calc(var(--step-indicator)+--spacing(2))] end-2 top-[calc(var(--step-indicator)/2-0.5px)] h-px",
                )}
                data-slot="steps-connector"
                data-status={status}
              />
            )}
            {interactive ? (
              <button
                aria-current={ariaCurrent}
                className={cn(
                  bodyClassName,
                  "cursor-pointer rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed",
                )}
                data-slot="steps-trigger"
                disabled={item.disabled}
                onClick={() => onStepClick?.(index, item)}
                type="button"
              >
                {body}
              </button>
            ) : (
              <div className={bodyClassName}>{body}</div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
