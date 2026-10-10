import * as React from "react";

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
    const observer = new MutationObserver(sync);
    const container = input.closest("fieldset") ?? input.parentElement;
    if (container) observer.observe(container, { attributes: true, subtree: true, attributeFilter: ["disabled", "readonly"] });
    const form = input.form;
    // 原生 reset 的默认动作发生在事件后；随后读真实值，不把非受控输入改成受控输入。
    const reset = () => queueMicrotask(sync);
    form?.addEventListener("reset", reset);
    return () => { observer.disconnect(); form?.removeEventListener("reset", reset); };
  }, [inputRef, sync, options.key]);
  return { ...facts, sync };
}

/** 用真实 input 事件写值：走原生、Field 与调用方同一条值变化链（进退相承，表单族决定 3）。 */
export function writeInputValue(input: HTMLInputElement, value: string) {
  const view = input.ownerDocument.defaultView!;
  Object.getOwnPropertyDescriptor(view.HTMLInputElement.prototype, "value")?.set?.call(input, value);
  input.dispatchEvent(new view.Event("input", { bubbles: true }));
}
