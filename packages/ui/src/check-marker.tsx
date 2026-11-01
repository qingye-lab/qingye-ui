import { IconCheck, IconMinus } from "@tabler/icons-react";
import * as React from "react";
import { markerBoxGeometry, markerOffClassName, markerOnClassName, markerVariables } from "./marker-geometry";
import { cn } from "./utils";

/** 勾选标记的事实：true/false 是确定态，"mixed" 只用于由子级派生的父级。 */
export type CheckMarkState = boolean | "mixed";

/**
 * 装饰性勾选标记（Tree、Cascader 多选共用）：不是 Base UI Checkbox，不单独可聚焦——所在的 treeitem / option 自己承担交互。
 * 方框几何与选中 / 未选的墨色与 Checkbox 读同一份（src/marker-geometry.ts）；状态来自 state 参数而不是 Base UI 的 state 回调。
 * 定义在组件外部：它不依赖调用方的闭包，放在内部会让每次渲染都产生新的函数身份，白白重挂载全部标记。
 */
export function CheckMarker({ state, dim, className, ...props }: { state: CheckMarkState; dim: boolean } & Omit<React.ComponentProps<"span">, "children">) {
  const isChecked = state === true || state === "mixed";
  return <span {...props} aria-hidden="true" style={markerVariables}
    className={cn(
      markerBoxGeometry,
      isChecked ? markerOnClassName : markerOffClassName,
      dim && "opacity-disabled",
      className,
    )}
  >{state === "mixed" ? <IconMinus aria-hidden="true" className="size-3/4" /> : state === true ? <IconCheck aria-hidden="true" className="size-3/4" /> : null}</span>;
}
