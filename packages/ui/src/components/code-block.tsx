"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
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
  return useRender({ defaultTagName: "div", render, props: mergeProps({
    "data-slot": "code-block",
    className: cn("flex min-w-0 max-w-full flex-col gap-(--qy-field-gap) text-body", className),
    children: <>
      {(language !== undefined || copyable) && <div data-slot="code-block-header" className="flex min-w-0 flex-wrap items-center justify-between gap-(--qy-action-gap)">
        {language !== undefined && <span data-slot="code-block-language" className="min-w-0 text-support text-muted-foreground wrap-anywhere">{language}</span>}
        {copyable && <Button data-slot="code-block-copy" variant="quiet" size="sm" disabled={isCopying} state={isCopying ? "in-progress" : "idle"} onClick={() => { setRequestText(code); setFailed(false); copyToClipboard(code); }}>{feedbackCurrent && isCopied ? messages.copied : messages.copyCode}</Button>}
      </div>}
      <pre data-slot="code-block-pre" tabIndex={0} className="m-0 max-w-full overflow-x-auto rounded-item bg-muted p-(--qy-panel-padding-sm) text-body text-foreground outline-none focus-visible:ring-(length:--qy-focus-quiet-width) focus-visible:ring-ring focus-visible:ring-inset"><code data-slot="code-block-code" className="font-mono">{code}</code></pre>
      {copyable && <p data-slot="code-block-status" role="status" className="m-0 min-w-0 text-support wrap-anywhere">{feedbackCurrent && failed ? messages.copyError : feedbackCurrent && isCopied ? messages.copied : null}</p>}
    </>,
  }, props) });
}
