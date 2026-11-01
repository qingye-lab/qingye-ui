import type * as React from "react";

/*
 * 勾选标记的方框几何，Checkbox 与装饰性的 CheckMarker（Tree、Cascader 多选）共用：同一种标记只有一套画法。
 * 边长读标记角色（--qy-marker-size[-narrow]，跟随相邻标签的文字档）；圆角取标记圆角与边长×圆角帽比例的较小者。
 * 交互态（焦点、悬停、无效、只读）只属于真正的 Checkbox，留在 checkbox.tsx。
 */
export const markerVariables = {
  "--qy-checkbox-edge": "var(--qy-marker-size)",
  "--qy-checkbox-edge-narrow": "var(--qy-marker-size-narrow)",
} as React.CSSProperties;

export const markerBoxGeometry = "inline-flex shrink-0 items-center justify-center size-(--qy-checkbox-edge-narrow) sm:size-(--qy-checkbox-edge) rounded-[min(var(--qy-radius-marker),calc(var(--qy-checkbox-edge-narrow)*var(--qy-radius-cap-ratio)))] sm:rounded-[min(var(--qy-radius-marker),calc(var(--qy-checkbox-edge)*var(--qy-radius-cap-ratio)))] border transition-[border-color,background-color] duration-(--qy-duration-fast) ease-(--qy-ease-out)";

/** 选中（含半选）：填充承担边界，边线透明。 */
export const markerOnClassName = "border-transparent bg-primary text-primary-foreground";
/** 未选：承载面加输入线。 */
export const markerOffClassName = "border-input bg-surface-field";
