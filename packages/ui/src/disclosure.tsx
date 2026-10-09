import { IconChevronDown } from "@tabler/icons-react";

/*
 * 展开入口的共同画法（Accordion、Collapsible；基础层 §5、§18）。
 * - 经营位置：文字贴着内容的左缘，不带按钮的留白——触发项与它展开的内容是同一列。
 * - 应物象形：尾部一枚箭头说明「这里可以展开」，展开时旋转半周；状态只改变已有的形（NG9）。
 * - 骨法用笔：无底无框；焦点是自身盒内一道细线。
 */
export const disclosureTriggerClassName =
  "group/disclosure inline-flex min-w-0 cursor-pointer items-center gap-(--qy-control-content-gap) rounded-marker text-start text-foreground outline-none focus-visible:ring-inset focus-visible:ring-(length:--qy-focus-quiet-width) focus-visible:ring-ring data-disabled:cursor-not-allowed data-disabled:opacity-64";

export function DisclosureIcon() {
  return <IconChevronDown aria-hidden="true" data-slot="disclosure-icon" className="size-(--qy-control-md-icon) shrink-0 text-muted-foreground transition-[transform,color] duration-(--qy-duration-base) ease-(--qy-ease-out) group-hover/disclosure:text-foreground group-data-[panel-open]/disclosure:rotate-180 motion-reduce:transition-none" />;
}
