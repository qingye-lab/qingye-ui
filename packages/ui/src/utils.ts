import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";
import { TEXT_STEPS } from "./text-steps";

const mergeClasses = extendTailwindMerge({
  extend: {
    theme: {
      // Every step has to be listed. tailwind-merge groups utilities by prefix,
      // so an unknown `text-*` token is treated as a text-colour: without this
      // entry `cn("text-caption-strong", "text-muted-foreground")` sees one
      // group twice and silently drops the size.
      text: [...TEXT_STEPS],
      radius: ["control", "panel", "overlay", "marker", "item"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return mergeClasses(clsx(inputs));
}
