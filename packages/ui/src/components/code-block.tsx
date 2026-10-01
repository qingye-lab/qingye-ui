"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import * as React from "react";
import { useUILocale } from "../locale";
import { cn } from "../utils";
import { CopyButton } from "./copy-button";

export interface CodeBlockProps extends Omit<
  React.ComponentProps<"div">,
  "children"
> {
  /** Source text. Rendered as-is (no highlighting) and used for copying. */
  code?: string;
  /**
   * Pre-highlighted nodes, rendered instead of `code`. Give each line
   * `data-line` to get line numbers and highlighting; pass `code` too so the
   * copy button copies clean text (otherwise it copies the rendered text).
   */
  children?: React.ReactNode;
  /** Shown in the header, e.g. `vite.config.ts`. */
  filename?: React.ReactNode;
  /** Shown in the header, e.g. `tsx`. Also set as `data-language`. */
  language?: string;
  /** Number each line. */
  lineNumbers?: boolean;
  /** 1-based line numbers to emphasise (plain-text `code` only). */
  highlightLines?: readonly number[];
  /** Soft-wrap long lines instead of scrolling horizontally. */
  wrap?: boolean;
  /** Scroll vertically past this height, e.g. `320` or `"20rem"`. */
  maxHeight?: number | string;
  /** Show the copy button. */
  copyable?: boolean;
  /** Accessible name of the copy button; defaults to the locale `copyCode`. */
  copyLabel?: string;
}

/** A read-only code listing with an optional header, copy button and line numbers. */
export function CodeBlock({
  className,
  style,
  code,
  children,
  filename,
  language,
  lineNumbers = false,
  highlightLines,
  wrap = false,
  maxHeight,
  copyable = true,
  copyLabel,
  ...props
}: CodeBlockProps): React.ReactElement {
  const { messages } = useUILocale();
  const codeRef = React.useRef<HTMLElement>(null);

  const source = code ?? (typeof children === "string" ? children : undefined);
  const usesSource =
    source !== undefined &&
    (children === undefined || typeof children === "string");
  const lines = usesSource ? source.replace(/\n$/, "").split("\n") : [];
  const highlighted = new Set(highlightLines);
  // Pre-highlighted children without `code`: copy the rendered text.
  const copyValue = source ?? (() => codeRef.current?.textContent ?? "");
  const hasHeader = filename !== undefined || language !== undefined;
  const gutter = `${Math.max(2, String(lines.length || 1).length)}ch`;

  const copyButton = copyable ? (
    <CopyButton
      className={cn(
        "shrink-0 text-muted-foreground hover:text-foreground",
        !hasHeader &&
          "absolute end-2 top-2 z-10 opacity-0 transition-[opacity,background-color,color] focus-visible:opacity-100 group-hover/code-block:opacity-100 group-focus-within/code-block:opacity-100 pointer-coarse:opacity-100 data-[status=copied]:opacity-100 data-[status=failed]:opacity-100",
      )}
      copyLabel={copyLabel ?? messages.copyCode}
      size="icon-xs"
      value={copyValue}
      variant={hasHeader ? "ghost" : "outline"}
    />
  ) : null;

  return (
    <div
      className={cn(
        "group/code-block relative flex min-w-0 flex-col overflow-hidden rounded-xl border bg-code not-dark:bg-clip-padding text-code-foreground shadow-xs/5 before:pointer-events-none before:absolute before:inset-0 before:z-10 before:rounded-[calc(var(--radius-xl)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
        className,
      )}
      data-language={language}
      data-slot="code-block"
      style={
        maxHeight === undefined
          ? style
          : ({
              "--code-block-max-height":
                typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight,
              ...style,
            } as React.CSSProperties)
      }
      {...props}
    >
      {hasHeader ? (
        <div
          className="flex h-10 shrink-0 items-center gap-3 border-b ps-4 pe-2 text-xs"
          data-slot="code-block-header"
        >
          {filename !== undefined ? (
            <span
              className="min-w-0 flex-1 truncate font-medium text-foreground"
              data-slot="code-block-filename"
            >
              {filename}
            </span>
          ) : null}
          {language !== undefined ? (
            <span
              className={cn(
                "shrink-0 text-muted-foreground",
                filename === undefined && "flex-1",
              )}
              data-slot="code-block-language"
            >
              {language}
            </span>
          ) : null}
          {copyButton}
        </div>
      ) : (
        copyButton
      )}
      <pre
        className={cn(
          "m-0 min-h-0 overflow-auto py-3 font-mono text-[0.8125rem] leading-6 outline-none [font-variant-ligatures:none] [scrollbar-width:thin] focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-inset",
          maxHeight !== undefined && "max-h-(--code-block-max-height)",
          wrap
            ? "whitespace-pre-wrap [overflow-wrap:anywhere]"
            : "whitespace-pre",
        )}
        data-slot="code-block-pre"
        dir="ltr"
        tabIndex={0}
      >
        <code
          className={cn(
            // With line numbers each line is a two-column grid, so the number
            // keeps its gutter and wrapped lines hang under their own text.
            lineNumbers
              ? "has-[[data-line]]:grid has-[[data-line]]:grid-cols-[auto_1fr] has-[[data-line]]:px-4 [&_[data-line]]:[counter-increment:line] [&_[data-line]]:before:me-4 [&_[data-line]]:before:min-w-0 [&_[data-line]]:before:select-none [&_[data-line]]:before:text-end [&_[data-line]]:before:text-muted-foreground/64 [&_[data-line]]:before:content-[counter(line)]"
              : "px-4",
            "[&_[data-line]]:block [&_[data-line]]:min-h-[1lh]",
            !lineNumbers && "[&_[data-line]]:px-4",
            "[&_[data-line][data-highlighted]]:bg-code-highlight [&_[data-line][data-highlighted]]:shadow-[inset_2px_0_0_var(--color-border-strong)]",
          )}
          data-slot="code-block-code"
          ref={codeRef}
          style={{ "--code-block-gutter": gutter } as React.CSSProperties}
        >
          {usesSource
            ? lines.map((line, index) => (
                <span
                  data-highlighted={highlighted.has(index + 1) ? "" : undefined}
                  data-line={index + 1}
                  // biome-ignore lint/suspicious/noArrayIndexKey: lines are positional
                  key={index}
                >
                  {line}
                </span>
              ))
            : children}
        </code>
      </pre>
    </div>
  );
}

/** Code inside running text: a file name, a prop, a short command. */
export function InlineCode({
  className,
  render,
  ...props
}: useRender.ComponentProps<"code">): React.ReactElement {
  const defaultProps = {
    className: cn(
      "box-decoration-clone rounded-[.3125rem] bg-muted px-[0.3em] py-[0.15em] font-mono text-[0.875em] text-foreground",
      className,
    ),
    "data-slot": "inline-code",
  };

  return useRender({
    defaultTagName: "code",
    props: mergeProps<"code">(defaultProps, props),
    render,
  });
}
