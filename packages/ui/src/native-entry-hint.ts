import * as React from "react";
import { readNativeEntry } from "./input-facts";

/** 平台自带分段输入的类型：空态的「年 /月/日」「--:--」由浏览器画，字样、间隔与样式各家不同，库无从设置。 */
export const nativeSegmentedTypes: ReadonlySet<string> = new Set(["date", "time", "datetime-local", "month", "week"]);

/**
 * 平台分段输入的空态提示（2026-11-01）。空、没有部分键入、焦点不在输入上，这三件事同时成立时返回 true，
 * 此时输入自己的分段隐藏、改由一条文字提示占位；聚焦后立刻回到分段供键入。
 * 「部分键入」不能被盖住：只填了月份就失焦时 `value` 仍是空串，要靠 `validity.badInput` 区分（见 `readNativeEntry`），
 * 否则用户已键入的几段会在失焦后凭空消失。
 * 受控值由 React 写回 DOM，不触发任何事件，所以每次渲染后也再读一次真实输入。
 */
export function useEmptyEntryHint(inputRef: React.RefObject<HTMLInputElement | null>, enabled: boolean, initiallyEmpty: boolean) {
  const [shown, setShown] = React.useState(enabled && initiallyEmpty);
  const focused = React.useRef(false);
  const sync = React.useCallback(() => {
    const input = inputRef.current;
    setShown(Boolean(enabled && input && !focused.current && readNativeEntry(input) === "empty"));
  }, [inputRef, enabled]);
  React.useLayoutEffect(sync);
  React.useEffect(() => {
    const input = inputRef.current;
    if (!enabled || !input) return;
    focused.current = input === input.ownerDocument.activeElement;
    const onFocus = () => { focused.current = true; sync(); };
    const onBlur = () => { focused.current = false; sync(); };
    // 表单 reset 的默认动作在事件之后，随后再读真实值（同 useInputFacts）。
    const form = input.form;
    const onReset = () => queueMicrotask(sync);
    input.addEventListener("focus", onFocus);
    input.addEventListener("blur", onBlur);
    input.addEventListener("input", sync);
    input.addEventListener("change", sync);
    form?.addEventListener("reset", onReset);
    return () => {
      input.removeEventListener("focus", onFocus);
      input.removeEventListener("blur", onBlur);
      input.removeEventListener("input", sync);
      input.removeEventListener("change", sync);
      form?.removeEventListener("reset", onReset);
    };
  }, [inputRef, enabled, sync]);
  return shown;
}
