import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const mergeClasses = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        "display-lg", "display", "title", "heading", "body", "label", "caption",
        "button", "button-mobile", "button-lg", "button-xs",
        "field-input", "field-input-mobile", "field-label", "field-label-mobile",
      ],
      radius: ["control", "panel"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return mergeClasses(clsx(inputs));
}
