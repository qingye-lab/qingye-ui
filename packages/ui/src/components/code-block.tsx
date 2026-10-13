"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import * as React from "react";
import { Button } from "./button";
import { useCopyToClipboard } from "../hooks/use-copy-to-clipboard";
import { useUILocale } from "../locale";
import { cn } from "../utils";

export type CodeBlockProps = Omit<useRender.ComponentProps<"div">, "children" | "title"> & {
  /** 被复制的文本；渲染内容由 children 替换时，复制的仍是它。 */
  code: string;
  language?: string;
  /** 标题栏的起始内容。字符串或数字是文件名一类的标签；其他节点（如 SegmentedControl）原样放入。有 title 才有标题栏。 */
  title?: React.ReactNode;
  /** 已高亮的标记：给出时放进 code 元素，代替纯文本 code 的显示。 */
  children?: React.ReactNode;
  /** 长行折行，而不是横向滚动。 */
  wrap?: boolean;
  copyable?: boolean;
  onCopySuccess?: () => void;
  onCopyError?: (error: unknown) => void;
};
export function CodeBlock({ code, language, title, children, wrap = false, copyable = true, onCopySuccess, onCopyError, render, className, ...props }: CodeBlockProps) {
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
  const hasBar = title !== undefined && title !== null && title !== false;
  const labelTitle = typeof title === "string" || typeof title === "number";
  /*
   * 骨法用笔：代码面的范围只用一种边界机制——一条清墨容器线（border-border）。底（--qy-code-surface）
   * 取页面底纸本身（用户 2026-10-12），坐在卡片上比卡片深一级、说「这是另一种材料」；坐在页面底纸上与页面无底色差，
   * 范围只由这条线划出。底不承担边界；圆角取面板角（rounded-panel）。
   *
   * 复制是代码的附属动作，不是与代码并列的一行（相成相制：佐不抢君）。两种坐法：
   * - 没有标题栏：图标按钮坐在代码面的右上角，与第一行同一条中线：
   *   top = 面的内缘 + 半材 − 半个 sm 控件高；右侧取同一距离。代码右缘让出「按钮宽 + 这段距离」，
   *   长行不会钻到按钮底下。
   * - 有标题栏：按钮坐在栏尾，栏高 2 材；上、下、末三边的空隙相等，都是 (2 材 − 控件高) / 2，
   *   自容器外缘量起（上、末两边要扣掉一条容器线宽 --qy-line-width，下边量到栏底的分隔线）。
   *   --qy-code-bar-inset 是扣线后的内缘距离；栏内容的中线落在按钮中线上，所以栏的下边线占的一线宽
   *   用 pb-line 让出，使内容区的中线 = 按钮中线。
   * 标题栏里的并列候选（SegmentedControl）把轨道面设为透明：栏本身已是代码面，再铺一块白轨道是
   * 第二张面；轨道自己的容器线保留，仍划出候选的范围。
   * 成功由图标换成勾表达，读屏仍从按钮名称与 status 得知；失败需要人去做事，才显示成文字。
   */
  const copyButton = copyable && <Button data-slot="code-block-copy" variant="quiet" size="sm" shape="icon" aria-label={copied ? messages.copied : messages.copyCode} data-copied={copied ? "" : undefined} loading={isCopying} className={cn("text-muted-foreground not-aria-disabled:hover:text-foreground", hasBar ? "shrink-0" : "absolute end-(--qy-code-copy-inset) top-(--qy-code-copy-inset)")} onClick={() => { setRequestText(code); setFailed(false); copyToClipboard(code); }}><Icon aria-hidden="true" /></Button>;
  return useRender({ defaultTagName: "div", render, props: mergeProps({
    "data-slot": "code-block",
    className: cn("flex min-w-0 max-w-full flex-col gap-(--qy-field-gap) text-body [--qy-code-copy-inset:calc(var(--qy-panel-padding-sm)+var(--qy-cai)/2-var(--qy-control-sm)/2)] [--qy-code-bar-inset:calc((2*var(--qy-cai)-var(--qy-control-sm))/2-var(--qy-line-width))]", className),
    children: <>
      {language !== undefined && <span data-slot="code-block-language" className="min-w-0 text-support text-muted-foreground wrap-anywhere">{language}</span>}
      <div data-slot="code-block-body" className="relative min-w-0 rounded-panel border border-border bg-(--qy-code-surface)">
        {hasBar && <div data-slot="code-block-header" className={cn("flex min-h-[calc(2*var(--qy-cai))] min-w-0 items-center gap-(--qy-control-content-gap) border-b border-border pe-(--qy-code-bar-inset) pb-line [--qy-track-surface:transparent]", labelTitle ? "ps-(--qy-panel-padding-sm)" : "ps-(--qy-code-bar-inset)")}>
          {/* 字符串标题的起始边与代码文字的起始边对齐（同一个内缘）；其他节点与按钮对称，距栏起始边同一段。 */}
          <div data-slot="code-block-title" className={cn("flex min-w-0 flex-1 items-center", labelTitle && "font-mono text-support text-muted-foreground wrap-anywhere")}>{title}</div>
          {copyButton}
        </div>}
        {/* 圆角 = 面板角 − 容器线（同一轮廓等距内缩，STANDARDS §4）：聚焦的内线跟着容器角走，不在角上露出直角。有标题栏时上边是直的。 */}
        <pre data-slot="code-block-pre" tabIndex={0} className={cn("m-0 max-w-full overflow-x-auto p-(--qy-panel-padding-sm) text-body text-foreground outline-none focus-visible:ring-(length:--qy-focus-quiet-width) focus-visible:ring-ring focus-visible:ring-inset", hasBar ? "rounded-b-[calc(var(--qy-radius-panel)-var(--qy-line-width))]" : "rounded-[calc(var(--qy-radius-panel)-var(--qy-line-width))]", wrap && "whitespace-pre-wrap wrap-anywhere", copyable && !hasBar && "pe-[calc(var(--qy-control-sm)+2*var(--qy-code-copy-inset))]")}><code data-slot="code-block-code" className="font-mono">{children ?? code}</code></pre>
        {!hasBar && copyButton}
      </div>
      {copyable && <p data-slot="code-block-status" role="status" className={feedbackCurrent && failed ? "m-0 min-w-0 text-support text-destructive-foreground wrap-anywhere" : "sr-only"}>{feedbackCurrent && failed ? messages.copyError : copied ? messages.copied : null}</p>}
    </>,
  }, props) });
}
