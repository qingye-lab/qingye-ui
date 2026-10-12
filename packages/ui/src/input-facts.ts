import type { Matcher } from "@daypicker/react";
import * as React from "react";

declare const process: { env: { NODE_ENV?: string } };

type InputRef = React.Ref<HTMLInputElement> | undefined;

/** 组合控件既要自己读真实输入，又要把调用方的 ref 原样交出去（含返回清理函数的回调 ref）。 */
export function useInputRef(ref: InputRef): [React.RefObject<HTMLInputElement | null>, (node: HTMLInputElement | null) => void | (() => void)] {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const setRef = React.useCallback((node: HTMLInputElement | null) => {
    inputRef.current = node;
    if (typeof ref === "function") {
      const cleanup = ref(node);
      if (typeof cleanup === "function") return () => { inputRef.current = null; cleanup(); };
    } else if (ref) ref.current = node;
  }, [ref]);
  return [inputRef, setRef];
}

/**
 * 观察「这个输入被禁用或只读」的全部来源（2026-10-12）：输入自己的 `disabled` / `readonly` 属性，
 * 以及**整条祖先链**上每一层 `<fieldset>` 的 `disabled`。
 * 原生禁用沿 fieldset 嵌套向下传递，外层 fieldset 在运行时被禁用时变化发生在内层之外；
 * 只观察最近一层会漏掉它（2026-10-12 实测：外层 DOM 禁用后，日期三件套的日历入口仍可点）。
 * `<legend>` 内的例外由浏览器的 `:disabled` 判定承担——回调里读 `input.matches(":disabled")`，这里不重复规则，
 * 只负责在任何一层变化时通知。返回停止观察的函数。
 */
export function observeInputBlocking(input: HTMLInputElement, callback: () => void, attributes: string[] = ["disabled", "readonly"]): () => void {
  const observer = new MutationObserver(callback);
  observer.observe(input, { attributes: true, attributeFilter: attributes });
  for (let node = input.parentElement; node; node = node.parentElement) {
    if (node.localName === "fieldset") observer.observe(node, { attributes: true, attributeFilter: ["disabled"] });
  }
  return () => observer.disconnect();
}

export type InputFacts = { value: string; disabled: boolean; readOnly: boolean };

/**
 * 表单族 §九/基础层 §15：附属动作与标记服从真实输入，而不是服从自己收到的属性——
 * 禁用可能来自 Field 或原生 fieldset，值可能被原生 reset 改掉，这些都不经过组件的 props。
 * `value: false` 时不跟踪值：只需要禁用与只读的控件不因每次输入多渲染一遍。
 */
export function useInputFacts(inputRef: React.RefObject<HTMLInputElement | null>, initial: Partial<InputFacts> = {}, options: { value?: boolean; key?: unknown } = {}) {
  const trackValue = options.value ?? true;
  const [facts, setFacts] = React.useState<InputFacts>({ value: initial.value ?? "", disabled: initial.disabled ?? false, readOnly: initial.readOnly ?? false });
  const sync = React.useCallback(() => {
    const input = inputRef.current;
    if (!input) return;
    const next = { value: trackValue ? input.value : "", disabled: input.disabled || input.matches(":disabled"), readOnly: input.readOnly };
    setFacts(previous => previous.value === next.value && previous.disabled === next.disabled && previous.readOnly === next.readOnly ? previous : next);
  }, [inputRef, trackValue]);
  React.useLayoutEffect(sync);
  React.useLayoutEffect(() => {
    const input = inputRef.current;
    if (!input) return;
    const stopObserving = observeInputBlocking(input, sync);
    const form = input.form;
    // 原生 reset 的默认动作发生在事件后；随后读真实值，不把非受控输入改成受控输入。
    const reset = () => queueMicrotask(sync);
    form?.addEventListener("reset", reset);
    return () => { stopObserving(); form?.removeEventListener("reset", reset); };
  }, [inputRef, sync, options.key]);
  return { ...facts, sync };
}

/** 用真实 input 事件写值：走原生、Field 与调用方同一条值变化链（进退相承，表单族决定 3）。 */
export function writeInputValue(input: HTMLInputElement, value: string) {
  const view = input.ownerDocument.defaultView!;
  Object.getOwnPropertyDescriptor(view.HTMLInputElement.prototype, "value")?.set?.call(input, value);
  input.dispatchEvent(new view.Event("input", { bubbles: true }));
}

/**
 * 原生 date / datetime-local 输入当前读到的内容（2026-10-12）。
 * 输入没有完整值时 `value` 恒为空串，但「用户清空了」与「正在键入、还差几段」是两回事：
 * 前者所有分段都空，后者 `validity.badInput` 为真。把后者当成清空会让一次误删分段丢掉已有的值。
 */
export function readNativeEntry(input: HTMLInputElement): "empty" | "partial" | string {
  if (input.value !== "") return input.value;
  return input.validity.badInput ? "partial" : "empty";
}

/**
 * 键入中间态：原生输入允许的写法比组件接受的宽（年份可到 6 位，分段可只填一半），
 * 这些写法不是「值」，既不能当作清空上报，也不能被受控的 `value` 立刻覆盖掉——React 在 onChange 之后
 * 会把未变的受控值写回 DOM，连同用户已经键入的几段一起抹掉。
 * `shown` 是此刻输入应显示的文本：有未被采纳的键入就显示它，已接受值变化（外部改值、清除、reset）后自动放弃。
 */
export function useTypingText(accepted: string) {
  const [typing, setTyping] = React.useState<{ text: string; base: string } | undefined>();
  const active = typing !== undefined && typing.base === accepted;
  const hold = React.useCallback((text: string) => setTyping({ text, base: accepted }), [accepted]);
  const release = React.useCallback(() => setTyping(undefined), []);
  return { shown: active ? typing.text : accepted, active, hold, release };
}

// ---- 日期边界：同源的 min / max（2026-10-12） ----------------------------------------------------
// 日期三件套的 `min` / `max` 一处声明，同时约束原生输入（min / max 属性）与日历（禁用范围、可翻到的月份）。
// 与旧写法并存：调用方仍可分别给 `inputProps.min` 与 `calendarProps.disabled`，两处同时给出取交集。

type CalendarBounds = { disabled?: Matcher | Matcher[]; startMonth?: Date; endMonth?: Date };

/** 日历侧：把 min / max 并进禁用范围（交集 = 禁用集合的并集）与可翻页的月份范围。 */
export function mergeCalendarBounds(calendar: { disabled?: Matcher | Matcher[] | undefined; startMonth?: Date | undefined; endMonth?: Date | undefined }, min: Date | undefined, max: Date | undefined): CalendarBounds {
  const own = calendar.disabled === undefined ? [] : Array.isArray(calendar.disabled) ? calendar.disabled : [calendar.disabled];
  const startMonth = min && calendar.startMonth ? (min > calendar.startMonth ? min : calendar.startMonth) : min ?? calendar.startMonth;
  const endMonth = max && calendar.endMonth ? (max < calendar.endMonth ? max : calendar.endMonth) : max ?? calendar.endMonth;
  const disabled = !min && !max ? calendar.disabled : [...own, ...(min ? [{ before: min }] : []), ...(max ? [{ after: max }] : [])];
  return { ...(disabled !== undefined ? { disabled } : {}), ...(startMonth ? { startMonth } : {}), ...(endMonth ? { endMonth } : {}) };
}

/** 原生侧：两处给出的文本边界取交集（更晚的下界、更早的上界）；固定宽度的 ISO 文本可直接按字典序比较。 */
export function intersectNativeBounds(own: { min?: string | number | undefined; max?: string | number | undefined }, min: string | undefined, max: string | undefined): { min: string | undefined; max: string | undefined } {
  const lo = [own.min === undefined ? undefined : String(own.min), min].filter((text): text is string => text !== undefined && text !== "");
  const hi = [own.max === undefined ? undefined : String(own.max), max].filter((text): text is string => text !== undefined && text !== "");
  return { min: lo.length ? lo.reduce((a, b) => (a > b ? a : b)) : undefined, max: hi.length ? hi.reduce((a, b) => (a < b ? a : b)) : undefined };
}

/** 开发期：交集为空（下界晚于上界）时没有任何值可选，给出警告；生产环境不提示也不改写。 */
export function warnEmptyBounds(component: string, min: string | undefined, max: string | undefined) {
  if (typeof process === "undefined" || process.env.NODE_ENV === "production") return;
  if (min !== undefined && max !== undefined && min > max) console.warn(`${component}: min (${min}) is later than max (${max}) after combining min/max with inputProps and calendarProps, so no date can be chosen.`);
}
