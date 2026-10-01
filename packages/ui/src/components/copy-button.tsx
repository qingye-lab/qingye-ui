"use client";

import { useUILocale } from "../locale";

import { useEffect, useRef, useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";
import { Button, type ButtonProps } from "./button";
import { toastManager } from "./toast";

export type CopyButtonProps = Omit<ButtonProps, "onClick"> & { value: string; onCopy?: () => void; onCopyError?: (error: unknown) => void; copyLabel?: string; copiedLabel?: string; errorLabel?: string };
export function CopyButton(options: CopyButtonProps) {
  const { messages } = useUILocale();
  const { value, onCopy, onCopyError, copyLabel = messages.copy, copiedLabel = messages.copied, errorLabel = messages.copyError, children, disabled, ...props } = options;
  const [copied, setCopied] = useState(false);
  const [pending, setPending] = useState(false);
  const mounted = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; if (timer.current) clearTimeout(timer.current); }; }, []);
  return <Button type="button" variant="outline" aria-label={copied ? copiedLabel : copyLabel} {...props} disabled={disabled || pending} onClick={async () => {
    setPending(true);
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(value);
      if (!mounted.current) return;
      setCopied(true); onCopy?.();
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      if (mounted.current) { onCopyError?.(error); toastManager.add({ title: errorLabel, type: "error", timeout: 0 }); }
    } finally { if (mounted.current) setPending(false); }
  }}>{copied ? <CheckIcon aria-hidden="true" /> : <CopyIcon aria-hidden="true" />}{children ?? (copied ? copiedLabel : copyLabel)}</Button>;
}
