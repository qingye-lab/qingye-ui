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
 * 字段标签的来源，依次：
 *   1. 调用处给的标签 id（字符串 owner）；
 *   2. 所在 Field 的 FieldLabel（Base UI 的 labelable 作用域给出 id）；
 *   3. 调用处给的查找函数（函数 owner）在渲染后找到的字段元素，按它自己的命名来源取：
 *      aria-labelledby（去掉指向字段自己的 id）→ 关联的 <label>（有 id 就引用，没有就取文字；
 *      包住字段的 label 只取文字，引用它会把字段的值算进去）→ aria-label 的文字。
 *      取到的是文字时，名称直接写成「动作 文字」；文字不随标签后续改动实时更新，按钮下次渲染时再核对。
 * 都没有时只读动作。调用方显式给附属按钮 aria-label 或 aria-labelledby 时一律以调用方为准，这里不追加。
 */

type NameProps = { id?: string | undefined; "aria-label"?: string | undefined; "aria-labelledby"?: string | undefined };

export type AdjunctName = { id?: string; "aria-label"?: string; "aria-labelledby"?: string };

/** 字段标签 id，或从按钮元素找到所属字段（或其 label）的函数。 */
export type AdjunctOwner = string | undefined | ((button: HTMLElement) => Element | null | undefined);

type Source = { by: string } | { text: string };

const textOf = (value: string | null | undefined): Source | null => {
  const text = value?.replace(/\s+/g, " ").trim();
  return text ? { text } : null;
};

function labelSource(label: HTMLLabelElement, field: Element | null): Source | null {
  if (label.id && !(field && label.contains(field))) return { by: label.id };
  return textOf(label.textContent);
}

/** 按字段自身的命名来源取标签；传入的是 <label> 时直接用它。 */
export function ownerSource(element: Element): Source | null {
  if (element instanceof HTMLLabelElement) return labelSource(element, null);
  const by = (element.getAttribute("aria-labelledby") ?? "").split(/\s+/).filter(token => token && token !== element.id).join(" ");
  if (by) return { by };
  const label = (element as HTMLInputElement).labels?.[0];
  if (label) return labelSource(label, element);
  return textOf(element.getAttribute("aria-label"));
}

const sameSource = (a: Source | null, b: Source | null) => a === b || Boolean(a && b && ("by" in a ? "by" in b && a.by === b.by : "text" in b && a.text === b.text));

/**
 * @param action 动作文案（来自 useUILocale）。
 * @param props 调用方给附属按钮的 id / aria-label / aria-labelledby。
 * @param owner 所属字段标签的 id（空格分隔），或从按钮找到所属字段的函数；见文件头的来源顺序。
 */
export function useAdjunctName(action: string, props: NameProps, owner?: AdjunctOwner): AdjunctName {
  const uid = React.useId();
  const { labelId } = useLabelableContext();
  const own = props["aria-label"], ownBy = props["aria-labelledby"];
  const explicit = own !== undefined || ownBy !== undefined;
  const fixed = ((typeof owner === "string" ? owner : undefined) ?? labelId)?.trim();
  const id = props.id ?? uid;
  const lookup = !explicit && !fixed && typeof owner === "function" ? owner : undefined;
  const [found, setFound] = React.useState<Source | null>(null);
  // 每次渲染后核对：字段与标签可能晚于按钮挂载，或改了命名。结果不变时不触发重渲染。
  React.useLayoutEffect(() => {
    const button = lookup && typeof document !== "undefined" ? document.getElementById(id) : null;
    const field = button ? lookup!(button) : null;
    const next = field ? ownerSource(field) : null;
    setFound(previous => sameSource(previous, next) ? previous : next);
  });
  if (explicit) return { ...(own !== undefined ? { "aria-label": own } : {}), ...(ownBy !== undefined ? { "aria-labelledby": ownBy } : {}) };
  const by = fixed || (lookup && found && "by" in found ? found.by : undefined);
  if (by) return { id, "aria-label": action, "aria-labelledby": `${id} ${by}` };
  if (lookup && found && "text" in found) return { id, "aria-label": `${action} ${found.text}` };
  return { id, "aria-label": action };
}

/** 查找函数：从按钮向上找到同一编辑边界（data-slot），取其中的字段元素；找不到（按钮不在边界里）时只读动作。 */
export const inControl = (boundary: string, field?: string) => (button: HTMLElement) =>
  button.closest(`[data-slot="${boundary}"]`)?.querySelector(field ? `[data-slot="${field}"]` : "input:not([type=hidden])");
