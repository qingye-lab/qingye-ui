"use client";

import { Group, type GroupProps } from "./group";

export type ButtonGroupProps = Omit<GroupProps, "gap">;

/** 动作共有一个范围，但各自保留名称、焦点、状态与禁用。 */
export function ButtonGroup(props: ButtonGroupProps) {
  return <Group role="group" data-slot="button-group" {...props} gap="actions" />;
}
