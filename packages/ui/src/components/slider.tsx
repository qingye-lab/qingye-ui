// Adapted from coss ui (MIT), apps/ui/registry/default/ui/slider.tsx.
// See ../../THIRD_PARTY_NOTICES.md and ../../coss-source.json.
"use client";

import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import * as React from "react";
import { useUILocale } from "../locale";
import { cn } from "../utils";

export function Slider({
  className,
  children,
  defaultValue,
  value,
  min = 0,
  max = 100,
  getAriaLabel,
  getAriaValueText,
  locale,
  ...props
}: SliderPrimitive.Root.Props & {
  /** Accessible name per thumb; needed for range sliders so each thumb is distinguishable. */
  getAriaLabel?: SliderPrimitive.Thumb.Props["getAriaLabel"];
  /** Spoken value per thumb, e.g. "¥1,200". */
  getAriaValueText?: SliderPrimitive.Thumb.Props["getAriaValueText"];
}): React.ReactElement {
  // Number formatting follows the UI locale, not the browser, like the calendar.
  const { code } = useUILocale();
  const _values = React.useMemo(() => {
    if (value !== undefined) {
      return Array.isArray(value) ? value : [value];
    }
    if (defaultValue !== undefined) {
      return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    }
    return [min];
  }, [value, defaultValue, min]);

  return (
    <SliderPrimitive.Root
      className={cn("data-[orientation=horizontal]:w-full", className)}
      data-slot="slider"
      defaultValue={defaultValue}
      locale={locale ?? code}
      max={max}
      min={min}
      thumbAlignment="edge"
      value={value}
      {...props}
    >
      {children}
      <SliderPrimitive.Control
        className="relative flex touch-none select-none before:absolute data-[orientation=horizontal]:before:inset-x-0 data-[orientation=horizontal]:before:-inset-y-2 data-[orientation=vertical]:before:inset-y-0 data-[orientation=vertical]:before:-inset-x-2 pointer-coarse:data-[orientation=horizontal]:before:-inset-y-5 pointer-coarse:data-[orientation=vertical]:before:-inset-x-5 data-disabled:pointer-events-none data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=horizontal]:w-full data-[orientation=horizontal]:min-w-44 data-[orientation=vertical]:flex-col data-disabled:opacity-64"
        data-slot="slider-control"
      >
        <SliderPrimitive.Track
          className="relative grow select-none before:absolute before:rounded-full before:bg-input data-[orientation=horizontal]:h-1 data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-1 data-[orientation=horizontal]:before:inset-x-0.5 data-[orientation=vertical]:before:inset-x-0 data-[orientation=horizontal]:before:inset-y-0 data-[orientation=vertical]:before:inset-y-0.5"
          data-slot="slider-track"
        >
          <SliderPrimitive.Indicator
            className="select-none rounded-full bg-primary data-[orientation=horizontal]:ms-0.5 data-[orientation=vertical]:mb-0.5"
            data-slot="slider-indicator"
          />
          {Array.from({ length: _values.length }, (_, index) => (
            <SliderPrimitive.Thumb
              className="block size-5 shrink-0 select-none rounded-full border border-input bg-white not-dark:bg-clip-padding shadow-xs/5 outline-none transition-[box-shadow,scale] before:absolute before:inset-0 before:rounded-full before:shadow-[0_1px_--theme(--color-black/4%)] has-focus-visible:ring-[3px] has-focus-visible:ring-ring/24 data-dragging:scale-120 sm:size-4 dark:border-background dark:has-focus-visible:ring-ring/48 [:has(*:focus-visible),[data-dragging]]:shadow-none"
              data-slot="slider-thumb"
              getAriaLabel={getAriaLabel ?? null}
              // Base UI appends an English "start range" / "end range" to range values;
              // thumbs are told apart by getAriaLabel instead.
              getAriaValueText={getAriaValueText ?? (_values.length > 1 ? (formatted: string) => formatted : null)}
              index={index}
              key={String(index)}
            />
          ))}
        </SliderPrimitive.Track>
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );
}

export function SliderValue({
  className,
  ...props
}: SliderPrimitive.Value.Props): React.ReactElement {
  return (
    <SliderPrimitive.Value
      className={cn("flex justify-end text-sm", className)}
      data-slot="slider-value"
      {...props}
    />
  );
}

export { SliderPrimitive };
