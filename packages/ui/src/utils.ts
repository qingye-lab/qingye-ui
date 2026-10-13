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
      // 系统尺度里有名字的两级：线宽与半分（theme.css 的 --spacing-line / --spacing-fen-half）。
      // 不登记的话 `cn("gap-2", "gap-fen-half")` 两个都留下，后写的不一定赢。
      spacing: ["line", "fen-half"],
    },
    classGroups: {
      // `opacity-disabled`（--qy-opacity-disabled）与数字档同属一组，调用方给的透明度才盖得过它。
      opacity: [{ opacity: ["disabled"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return mergeClasses(clsx(inputs));
}
