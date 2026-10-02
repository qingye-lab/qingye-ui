// Adapted from coss ui (MIT), apps/ui/registry/default/hooks/use-copy-to-clipboard.ts.
// See ../../THIRD_PARTY_NOTICES.md and ../../coss-source.json.
"use client";

import * as React from "react";

export function useCopyToClipboard({
  timeout = 2000,
  onCopy,
  onError,
}: {
  timeout?: number;
  onCopy?: () => void;
  /**
   * Called when the Clipboard API is unavailable (for example on an insecure
   * origin) or when the browser rejects the write.
   */
  onError?: (error: unknown) => void;
} = {}): { copyToClipboard: (value: string) => void; isCopied: boolean; isCopying: boolean } {
  const [isCopied, setIsCopied] = React.useState(false);
  const [isCopying, setIsCopying] = React.useState(false);
  const timeoutIdRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestRef = React.useRef(0);
  const mountedRef = React.useRef(true);

  const copyToClipboard = (value: string): void => {
    const request = ++requestRef.current;
    if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
    timeoutIdRef.current = null;
    setIsCopied(false);
    const ownsResult = () => mountedRef.current && request === requestRef.current;
    const fail = (error: unknown) => {
      if (!ownsResult()) return;
      setIsCopying(false);
      if (onError) onError(error);
      else console.error(error);
    };
    if (typeof window === "undefined" || !navigator.clipboard?.writeText) {
      fail(new Error("Clipboard API unavailable"));
      return;
    }

    setIsCopying(true);
    let write: Promise<void>;
    try {
      write = navigator.clipboard.writeText(value);
    } catch (error) {
      fail(error);
      return;
    }

    write.then(
      () => {
        if (!ownsResult()) return;
        setIsCopying(false);
        if (timeoutIdRef.current) {
          clearTimeout(timeoutIdRef.current);
        }
        setIsCopied(true);

        if (onCopy) {
          onCopy();
        }

        if (timeout !== 0) {
          timeoutIdRef.current = setTimeout(() => {
            setIsCopied(false);
            timeoutIdRef.current = null;
          }, timeout);
        }
      },
      fail,
    );
  };

  // Cleanup timeout on unmount
  React.useEffect(() => {
    mountedRef.current = true;
    return (): void => {
      mountedRef.current = false;
      requestRef.current++;
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, []);

  return { copyToClipboard, isCopied, isCopying };
}
