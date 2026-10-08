"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import * as React from "react";
import { Button } from "./button";
import { useCopyToClipboard } from "../hooks/use-copy-to-clipboard";
import { useUILocale } from "../locale";
import { cn } from "../utils";

export type CodeBlockProps = Omit<useRender.ComponentProps<"div">, "children"> & {
  code: string;
  language?: string;
  copyable?: boolean;
  onCopySuccess?: () => void;
  onCopyError?: (error: unknown) => void;
};
export function CodeBlock({ code, language, copyable = true, onCopySuccess, onCopyError, render, className, ...props }: CodeBlockProps) {
  const { messages } = useUILocale();
  const [requestText, setRequestText] = React.useState<string | undefined>();
  const [failed, setFailed] = React.useState(false);
  const { copyToClipboard, isCopied, isCopying } = useCopyToClipboard({
    ...(onCopySuccess ? { onCopy: onCopySuccess } : {}),
    onError: (error) => { setFailed(true); onCopyError?.(error); },
  });
  const feedbackCurrent = requestText === code;
  const copied = feedbackCurrent && isCopied;
  const Icon = copied ? IconCheck : IconCopy;
  /*
   * 复制是代码的附属动作，不是与代码并列的一行（相成相制：佐不抢君）。
   * 图标按钮坐在代码面的右上角，与第一行同一条中线：
   *   top = 面的内缘 + 半材 − 半个 sm 控件高；右侧取同一距离。
   * 代码右缘让出「按钮宽 + 这段距离」，长行不会钻到按钮底下。
   * 成功由图标换成勾表达，读屏仍从按钮名称与 status 得知；失败需要人去做事，才显示成文字。
   */
  return useRender({ defaultTagName: "div", render, props: mergeProps({
    "data-slot": "code-block",
    className: cn("flex min-w-0 max-w-full flex-col gap-(--qy-field-gap) text-body [--qy-code-copy-inset:calc(var(--qy-panel-padding-sm)+var(--qy-cai)/2-var(--qy-control-sm)/2)]", className),
    children: <>
      {language !== undefined && <span data-slot="code-block-language" className="min-w-0 text-support text-muted-foreground wrap-anywhere">{language}</span>}
      <div data-slot="code-block-body" className="relative min-w-0">
        <pre data-slot="code-block-pre" tabIndex={0} className={cn("m-0 max-w-full overflow-x-auto rounded-item bg-muted p-(--qy-panel-padding-sm) text-body text-foreground outline-none focus-visible:ring-(length:--qy-focus-quiet-width) focus-visible:ring-ring focus-visible:ring-inset", copyable && "pe-[calc(var(--qy-control-sm)+2*var(--qy-code-copy-inset))]")}><code data-slot="code-block-code" className="font-mono">{code}</code></pre>
        {copyable && <Button data-slot="code-block-copy" variant="quiet" size="sm" shape="icon" aria-label={copied ? messages.copied : messages.copyCode} data-copied={copied ? "" : undefined} state={isCopying ? "in-progress" : "idle"} className="absolute end-(--qy-code-copy-inset) top-(--qy-code-copy-inset) text-muted-foreground not-aria-disabled:hover:text-foreground" onClick={() => { setRequestText(code); setFailed(false); copyToClipboard(code); }}><Icon aria-hidden="true" /></Button>}
      </div>
      {copyable && <p data-slot="code-block-status" role="status" className={feedbackCurrent && failed ? "m-0 min-w-0 text-support text-destructive-foreground wrap-anywhere" : "sr-only"}>{feedbackCurrent && failed ? messages.copyError : copied ? messages.copied : null}</p>}
    </>,
  }, props) });
}
