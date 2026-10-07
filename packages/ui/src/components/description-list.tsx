"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "../utils";

export type DescriptionListProps = useRender.ComponentProps<"dl">;
/**
 * 基础层 §6（2026-10-05 打磨）：名称与值的列表默认是「名列按内容宽度、值列占其余」
 * 的两列关系，不是 50/50 的硬分栏——名称通常两三个字，五五分会把值和名字之间
 * 空出一大块，读起来不再成对。
 *
 * 为什么列由**列表**定义、条目用 subgrid 继承：每个条目各自开网格的话，每行的
 * 名列会按自己的内容独立定宽，多行之间左右都不齐，看上去像随手排的。父级定列、
 * 条目按 subgrid 对齐，整份值表共用同一条起始线（design.md「用关系成组」）。
 * 窄屏回到单列，名称在上、值在下——两列在手机上会把值挤到无处放下。
 */
export function DescriptionList({ render, className, ...props }: DescriptionListProps) {
  return useRender({ defaultTagName: "dl", render, props: mergeProps({ "data-slot": "description-list", className: cn("m-0 flex min-w-0 flex-col gap-(--qy-panel-gap) text-body sm:grid sm:grid-cols-[max-content_minmax(0,1fr)] sm:gap-x-(--qy-field-group-gap)", className) }, props) });
}
export type DescriptionListItemProps = useRender.ComponentProps<"div">;
export function DescriptionListItem({ render, className, ...props }: DescriptionListItemProps) {
  return useRender({ defaultTagName: "div", render, props: mergeProps({ "data-slot": "description-list-item", className: cn("grid min-w-0 gap-x-(--qy-field-gap) gap-y-(--qy-field-gap) sm:col-span-2 sm:grid-cols-subgrid", className) }, props) });
}
export type DescriptionListTermProps = useRender.ComponentProps<"dt">;
export function DescriptionListTerm({ render, className, ...props }: DescriptionListTermProps) {
  // 名称与值同为前景色：名称靠字重分主次，不靠降灰——辅助文字降灰会让「这是什么」
  // 比「它是什么」还淡，而名称恰恰是读到值之后要用来定位的那一列。
  return useRender({ defaultTagName: "dt", render, props: mergeProps({ "data-slot": "description-list-term", className: cn("min-w-0 text-body-strong wrap-anywhere", className) }, props) });
}
export type DescriptionListDetailProps = useRender.ComponentProps<"dd">;
export function DescriptionListDetail({ render, className, ...props }: DescriptionListDetailProps) {
  return useRender({ defaultTagName: "dd", render, props: mergeProps({ "data-slot": "description-list-detail", className: cn("m-0 min-w-0 text-foreground wrap-anywhere", className) }, props) });
}
