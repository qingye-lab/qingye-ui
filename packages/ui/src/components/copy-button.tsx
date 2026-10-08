"use client";

import { IconCheck, IconCopy } from "@tabler/icons-react";
import * as React from "react";
import { useCopyToClipboard } from "../hooks/use-copy-to-clipboard";
import { useUILocale } from "../locale";
import { Button, type ButtonProps } from "./button";

export type CopyButtonProps = Omit<ButtonProps, "state" | "value"> & {
  value: string;
  /** Clears feedback only; success comes from writeText resolving. */
  timeout?: number;
  onCopySuccess?: () => void;
  onCopyError?: (error: unknown) => void;
};

export function CopyButton({ value, timeout = 2000, onCopySuccess, onCopyError, onClick, children, shape = "label", variant = "quiet", ...props }: CopyButtonProps) {
  const { messages } = useUILocale();
  const statusId = React.useId();
  const [failed, setFailed] = React.useState(false);
  const [confirmedValue, setConfirmedValue] = React.useState<string | null>(null);
  const { copyToClipboard, isCopied, isCopying } = useCopyToClipboard({ timeout,
    onCopy: () => { setConfirmedValue(value); setFailed(false); onCopySuccess?.(); },
    onError: error => { setFailed(true); onCopyError?.(error); },
  });
  const copied = isCopied && confirmedValue === value;
  const Icon = copied ? IconCheck : IconCopy;
  return <>
    <Button {...props} data-slot="copy-button" variant={variant} shape={shape} state={isCopying ? "in-progress" : "idle"}
      aria-label={props["aria-label"] ?? messages.copy}
      aria-describedby={[props["aria-describedby"], failed ? statusId : undefined].filter(Boolean).join(" ") || undefined}
      data-copied={copied ? "" : undefined} data-copy-error={failed ? "" : undefined}
      onClick={event => {
        onClick?.(event);
        if (event.defaultPrevented || event.baseUIHandlerPrevented) return;
        setFailed(false);
        copyToClipboard(value);
      }}
    >{children ?? <span className="inline-flex items-center gap-(--qy-action-gap)"><Icon aria-hidden="true" />{shape === "label" && <span>{copied ? messages.copied : messages.copy}</span>}</span>}</Button>
    <span id={statusId} data-slot="copy-button-feedback" role="status" className={failed ? "text-support text-destructive-foreground" : "sr-only"}>{failed ? messages.copyError : copied ? messages.copied : ""}</span>
  </>;
}
