import { useLabelableContext } from "@base-ui/react/internals/labelable-provider";
import * as React from "react";

/*
 * 附属按钮的名称 = 动作 + 所属字段的标签（2026-11-21，用户裁决「按推荐改」）。
 *
 * 附属按钮是长在一个字段上的动作：步进、清除、展开候选、打开日历、显示密码、添加标签。
 * 名称只写动作时，同一区域放两个同类字段，两枚「增加」就分不出属于谁——读屏、自动化测试和 AI
 * 都只能退到下标（design.md「名称与状态」：同一区域里的同类控件，名称要能区分）。
 * 写法与 React Aria 相同：按钮自己带 id 与 aria-label（动作），aria-labelledby 依次引用自己和字段标签，
 * 名称读作「增加 数量」。动作在前：读屏先听到要做什么；按名称找控件的脚本仍可按动作开头匹配。
 *
 * 只引用标签元素，不引用输入框：可编辑控件被 aria-labelledby 引用时，取名算进去的是它的值，不是它的名称。
 * 字段标签的来源：Field 里的 FieldLabel（Base UI 的 labelable 作用域给出 id），或调用处给的标签 id。
 * 两者都没有（字段只靠 aria-label、外部 label 命名）时只读动作，与改动前相同。
 * 调用方显式给附属按钮 aria-label 或 aria-labelledby 时一律以调用方为准，这里不追加。
 */

type NameProps = { id?: string | undefined; "aria-label"?: string | undefined; "aria-labelledby"?: string | undefined };

export type AdjunctName = { id?: string; "aria-label"?: string; "aria-labelledby"?: string };

/**
 * @param action 动作文案（来自 useUILocale）。
 * @param props 调用方给附属按钮的 id / aria-label / aria-labelledby。
 * @param ownerLabelledBy 所属字段标签的 id（空格分隔）；不传时取所在 Field 的 FieldLabel。
 */
export function useAdjunctName(action: string, props: NameProps, ownerLabelledBy?: string | undefined): AdjunctName {
  const uid = React.useId();
  const { labelId } = useLabelableContext();
  const own = props["aria-label"], ownBy = props["aria-labelledby"];
  if (own !== undefined || ownBy !== undefined) return { ...(own !== undefined ? { "aria-label": own } : {}), ...(ownBy !== undefined ? { "aria-labelledby": ownBy } : {}) };
  const owner = (ownerLabelledBy ?? labelId)?.trim();
  if (!owner) return { "aria-label": action };
  const id = props.id ?? uid;
  return { id, "aria-label": action, "aria-labelledby": `${id} ${owner}` };
}
