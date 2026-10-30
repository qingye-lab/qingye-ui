"use client";

import { isName, received } from "../require-name";
import { cn } from "../utils";
import { Inline, type InlineProps } from "./layout";

export type ButtonGroupProps = Omit<InlineProps, "gap"> & { orientation?: "horizontal" | "vertical" };

/** 动作共有一个范围与一个名称（role="group"），但各自保留名称、焦点、状态与禁用。
 *  间隔是组内的动作间隔；纵排时换行不再有意义，改为纵向排列。 */
export function ButtonGroup({ orientation = "horizontal", className, ...props }: ButtonGroupProps) {
  if (!isName(props["aria-label"]) && !isName(props["aria-labelledby"])) throw new Error(`ButtonGroup requires a nonempty aria-label or aria-labelledby naming the group; received aria-label ${received(props["aria-label"])} and aria-labelledby ${received(props["aria-labelledby"])}.`);
  return <Inline role="group" data-slot="button-group" data-orientation={orientation} {...props} gap="actions"
    className={cn(orientation === "vertical" && "flex-col items-stretch", className)} />;
}
