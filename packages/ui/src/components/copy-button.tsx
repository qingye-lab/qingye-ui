"use client";

import { IconCheck, IconCopy } from "@tabler/icons-react";
import * as React from "react";
import { useCopyToClipboard } from "../hooks/use-copy-to-clipboard";
import { useUILocale } from "../locale";
import { cn } from "../utils";
import { Button, type ButtonProps } from "./button";

// 同一个 hook 也从组件入口给出：CopyButton 的文档把它作为本组件的第二个部件，导入路径与组件一致。
export { useCopyToClipboard };

export type CopyButtonProps = Omit<ButtonProps, "state" | "value"> & {
  value: string;
  /** Clears feedback only; success comes from writeText resolving. */
  timeout?: number;
  onCopySuccess?: () => void;
  onCopyError?: (error: unknown) => void;
};

/** 递归看 children 里有没有读得出的文字（只看元素的 children，不进组件内部）。 */
function hasText(node: React.ReactNode): boolean {
  if (typeof node === "string") return node.trim() !== "";
  if (typeof node === "number") return true;
  if (Array.isArray(node)) return node.some(hasText);
  if (React.isValidElement<{ children?: React.ReactNode; "aria-hidden"?: React.AriaAttributes["aria-hidden"] }>(node)) {
    const hidden = node.props["aria-hidden"];
    return hidden === true || hidden === "true" ? false : hasText(node.props.children);
  }
  return false;
}

export function CopyButton({ value, timeout = 2000, onCopySuccess, onCopyError, onClick, children, shape = "label", variant = "quiet", ...props }: CopyButtonProps) {
  const { messages } = useUILocale();
  const statusId = React.useId();
  const actionId = React.useId();
  const [failed, setFailed] = React.useState(false);
  const [confirmedValue, setConfirmedValue] = React.useState<string | null>(null);
  const { copyToClipboard, isCopied, isCopying } = useCopyToClipboard({ timeout,
    onCopy: () => { setConfirmedValue(value); setFailed(false); onCopySuccess?.(); },
    onError: error => { setFailed(true); onCopyError?.(error); },
  });
  const copied = isCopied && confirmedValue === value;
  const Icon = copied ? IconCheck : IconCopy;
  /**
   * 可访问名称跟随看得见的文字（WCAG 2.5.3）：默认的「复制 / 已复制」与调用方传入的文字都是名称本身，
   * 不再被固定的 aria-label 盖掉。只有没有文字（图标形态、纯图标 children）时才用 locale 的「复制」。
   * 调用方传入自己的文字时，名称是它的文字，「复制」这个动作用 aria-describedby 补上。
   */
  const customText = children !== undefined && hasText(children);
  const named = children === undefined ? shape === "label" : customText;
  const explicitName = props["aria-label"] !== undefined || props["aria-labelledby"] !== undefined;
  const describedBy = [props["aria-describedby"], customText && !explicitName ? actionId : undefined, failed ? statusId : undefined].filter(Boolean).join(" ") || undefined;
  return <>
    <Button {...props} data-slot={(props as { "data-slot"?: string })["data-slot"] ?? "copy-button"} variant={variant} shape={shape} loading={isCopying}
      aria-label={props["aria-label"] ?? (named ? undefined : messages.copy)}
      aria-describedby={describedBy}
      data-copied={copied ? "" : undefined} data-copy-error={failed ? "" : undefined}
      onClick={event => {
        onClick?.(event);
        if (event.defaultPrevented || event.baseUIHandlerPrevented) return;
        setFailed(false);
        copyToClipboard(value);
      }}
    >{children ?? <span className="inline-flex items-center gap-(--qy-action-gap)"><Icon aria-hidden="true" />{shape === "label" && <span className="inline-grid">
      {/* 「复制」与「已复制」叠在同一格里，格宽取两者较宽的一个：切换状态时按钮外缘不动（design.md「随状态改变尺寸」是反例）。
       *  不在当前状态的那条文字不可见（invisible）并 aria-hidden，不进入名称。 */}
      <span aria-hidden={copied ? "true" : undefined} className={cn("col-start-1 row-start-1", copied && "invisible")}>{messages.copy}</span>
      <span aria-hidden={copied ? undefined : "true"} className={cn("col-start-1 row-start-1", !copied && "invisible")}>{messages.copied}</span>
    </span>}</span>}</Button>
    <span id={statusId} data-slot="copy-button-feedback" role="status" className={failed ? "text-support text-destructive-foreground" : "sr-only"}>{failed ? messages.copyError : copied ? messages.copied : ""}</span>
    {customText && !explicitName && <span id={actionId} hidden>{messages.copy}</span>}
  </>;
}
