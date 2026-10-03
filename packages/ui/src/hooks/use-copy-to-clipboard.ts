"use client";

import { useCallback, useEffect, useRef, useState } from "react";

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
        if (typeof navigator === "undefined" || typeof navigator.clipboard?.writeText !== "function") {
          throw new Error("Clipboard API is unavailable");
        }
        await navigator.clipboard.writeText(value);
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
