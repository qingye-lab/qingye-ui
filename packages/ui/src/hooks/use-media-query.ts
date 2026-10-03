"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

// Query presets, not device classifications or design-derived constants.
const breakpoints = { sm: 640, md: 768, lg: 1024, xl: 1280, "2xl": 1536, "3xl": 1920, "4xl": 2560 };
type Breakpoint = keyof typeof breakpoints;
type BreakpointQuery = Breakpoint | `max-${Breakpoint}` | `${Breakpoint}:max-${Breakpoint}`;

export type MediaQueryInput = {
  min?: Breakpoint | number;
  max?: Breakpoint | number;
  pointer?: "coarse" | "fine";
};

function threshold(value: Breakpoint | number) {
  return typeof value === "number" ? value : breakpoints[value];
}

function queryText(input: BreakpointQuery | MediaQueryInput | (string & {})): string {
  if (typeof input !== "string") {
    const conditions: string[] = [];
    if (input.min !== undefined) conditions.push(`(min-width: ${threshold(input.min)}px)`);
    if (input.max !== undefined) conditions.push(`(width < ${threshold(input.max)}px)`);
    if (input.pointer) conditions.push(`(pointer: ${input.pointer})`);
    return conditions.join(" and ") || "all";
  }
  if (Object.hasOwn(breakpoints, input)) return `(min-width: ${threshold(input as Breakpoint)}px)`;
  const [min, max, extra] = input.split(":max-");
  if (min && max && extra === undefined && Object.hasOwn(breakpoints, min) && Object.hasOwn(breakpoints, max)) {
    return `(min-width: ${threshold(min as Breakpoint)}px) and (width < ${threshold(max as Breakpoint)}px)`;
  }
  if (input.startsWith("max-") && Object.hasOwn(breakpoints, input.slice(4))) {
    return `(width < ${threshold(input.slice(4) as Breakpoint)}px)`;
  }
  return input;
}

const serverSnapshot = () => false;

export function useMediaQuery(query: BreakpointQuery | MediaQueryInput | (string & {})): boolean {
  const text = queryText(query);
  const media = useMemo(() => typeof window !== "undefined" && typeof window.matchMedia === "function"
    ? window.matchMedia(text)
    : null, [text]);
  const subscribe = useCallback((notify: () => void) => {
    if (!media) return () => {};
    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", notify);
      return () => media.removeEventListener("change", notify);
    }
    media.addListener(notify);
    return () => media.removeListener(notify);
  }, [media]);
  const snapshot = useCallback(() => media?.matches ?? false, [media]);
  return useSyncExternalStore(subscribe, snapshot, serverSnapshot);
}
