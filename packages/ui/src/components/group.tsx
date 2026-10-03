"use client";

import { Inline, Stack, type InlineProps } from "./layout";

export type GroupProps = InlineProps & { orientation?: "horizontal" | "vertical" };

/** 只承载位置关系；语义来自调用方的原生元素、名称或 role。 */
export function Group({ orientation = "horizontal", gap = "panel", wrap = true, ...props }: GroupProps) {
  const shared = { "data-slot": "group", "data-orientation": orientation, gap, ...props };
  return orientation === "vertical" ? <Stack {...shared} /> : <Inline {...shared} wrap={wrap} />;
}
