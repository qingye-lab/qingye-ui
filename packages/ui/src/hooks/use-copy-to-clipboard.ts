"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Clipboard API 只在安全上下文（https、localhost）里存在；http 页面上 navigator.clipboard 为 undefined。
 * 回退用临时 textarea + execCommand("copy")：它是同一个动作在不可用环境里的另一条路，不是新的行为。
 * execCommand 返回 false 或抛错都当作失败，由调用方走原有的错误通道，不静默。
 * 复制需要选区，选区会抢走焦点，所以结束后把焦点还给原来的元素。
 */
function copyWithSelection(value: string): void {
  if (typeof document === "undefined" || typeof document.execCommand !== "function") throw new Error("Clipboard is unavailable");
  const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  const field = document.createElement("textarea");
  field.value = value;
  field.setAttribute("readonly", "");
  field.setAttribute("aria-hidden", "true");
  field.style.cssText = "position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;pointer-events:none;";
  document.body.appendChild(field);
  try {
    field.focus({ preventScroll: true });
    field.select();
    field.setSelectionRange(0, value.length);
    if (!document.execCommand("copy")) throw new Error("Copy command was rejected");
  } finally {
    field.remove();
    if (previous?.isConnected) previous.focus({ preventScroll: true });
  }
}

export function useCopyToClipboard({
  timeout = 2000,
  onCopy,
  onError,
}: {
  timeout?: number;
  onCopy?: () => void;
  onError?: (error: unknown) => void;
} = {}): { copyToClipboard: (value: string) => void; isCopied: boolean; isCopying: boolean } {
  const [isCopied, setCopied] = useState(false);
  const [isCopying, setCopying] = useState(false);
  const mounted = useRef(true);
  const request = useRef(0);
  const reset = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      request.current += 1;
      if (reset.current !== null) clearTimeout(reset.current);
    };
  }, []);

  const copyToClipboard = useCallback((value: string): void => {
    if (!mounted.current) return;
    const current = ++request.current;
    if (reset.current !== null) clearTimeout(reset.current);
    reset.current = null;
    setCopied(false);
    setCopying(true);
    const active = () => mounted.current && current === request.current;

    void (async () => {
      try {
        if (typeof navigator !== "undefined" && typeof navigator.clipboard?.writeText === "function") {
          try { await navigator.clipboard.writeText(value); } catch (denied: unknown) {
            // 权限被拒或文档未获焦点时，选区复制可能仍然成功；两条路都失败才报告，并保留第一条路的原因。
            try { copyWithSelection(value); } catch { throw denied; }
          }
        } else copyWithSelection(value);
      } catch (error: unknown) {
        if (active()) {
          setCopying(false);
          setCopied(false);
          onError?.(error);
        }
        return;
      }
      if (!active()) return;
      setCopying(false);
      setCopied(true);
      // This timer clears feedback only; it never establishes the result.
      reset.current = setTimeout(() => {
        reset.current = null;
        if (active()) setCopied(false);
      }, timeout);
      onCopy?.();
    })();
  }, [timeout, onCopy, onError]);

  return { copyToClipboard, isCopied, isCopying };
}
