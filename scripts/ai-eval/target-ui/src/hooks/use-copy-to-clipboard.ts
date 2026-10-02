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
} = {}): { copyToClipboard: (value: string) => void; isCopied: boolean } {
  const [isCopied, setIsCopied] = React.useState(false);
  const timeoutIdRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const copyToClipboard = (value: string): void => {
    if (typeof window === "undefined" || !navigator.clipboard?.writeText) {
      onError?.(new Error("Clipboard API unavailable"));
      return;
    }

    if (!value) return;

    navigator.clipboard.writeText(value).then(
      () => {
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
      (error: unknown) => {
        if (onError) onError(error);
        else console.error(error);
      },
    );
  };

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return (): void => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, []);

  return { copyToClipboard, isCopied };
}
