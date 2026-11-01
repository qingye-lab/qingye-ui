import { IconCheck, IconMinus } from "@tabler/icons-react";
import * as React from "react";
import { cn } from "./utils";

/** 勾选标记的事实：true/false 是确定态，"mixed" 只用于由子级派生的父级。 */
export type CheckMarkState = boolean | "mixed";

/**
 * 装饰性勾选标记（Tree、Cascader 多选共用）：不是 Base UI Checkbox，不单独可聚焦——所在的 treeitem / option 自己承担交互。
 * 几何与墨色读与 Checkbox 相同的角色 token（--qy-marker-size[-narrow]、--qy-marker-inset、--qy-radius-marker），
 * 但状态来自 state 参数而不是 Base UI 的 state 回调，因此不复用 Checkbox 的 (state)=>cn(...) 写法，直接照搬取值。
 * 定义在组件外部：它不依赖调用方的闭包，放在内部会让每次渲染都产生新的函数身份，白白重挂载全部标记。
 */
export function CheckMarker({ state, dim, className, ...props }: { state: CheckMarkState; dim: boolean } & Omit<React.ComponentProps<"span">, "children">) {
  const isChecked = state === true || state === "mixed";
  return <span {...props} aria-hidden="true" style={{ "--qy-tree-check-edge": "var(--qy-marker-size)", "--qy-tree-check-edge-narrow": "var(--qy-marker-size-narrow)" } as React.CSSProperties}
    className={cn(
      "inline-flex shrink-0 items-center justify-center size-(--qy-tree-check-edge-narrow) sm:size-(--qy-tree-check-edge) rounded-[min(var(--qy-radius-marker),calc(var(--qy-tree-check-edge-narrow)*var(--qy-radius-cap-ratio)))] sm:rounded-[min(var(--qy-radius-marker),calc(var(--qy-tree-check-edge)*var(--qy-radius-cap-ratio)))] border transition-[border-color,background-color] duration-(--qy-duration-fast) ease-(--qy-ease-out)",
      isChecked ? "border-transparent bg-primary text-primary-foreground" : "border-input bg-surface-field",
      dim && "opacity-disabled",
      className,
    )}
  >{state === "mixed" ? <IconMinus aria-hidden="true" className="size-3/4" /> : state === true ? <IconCheck aria-hidden="true" className="size-3/4" /> : null}</span>;
}
