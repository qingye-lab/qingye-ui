import { cn } from "@yanqing/ui/utils";
import { useMemo, type ReactNode } from "react";
import { highlight, type CodeLang } from "@/lib/highlight";
import { CopyCodeButton } from "./copy-code-button";

/** Highlighted, horizontally scrollable source. Keyboard users can scroll it too. */
export function CodeView({
  code,
  lang = "tsx",
  wrap = false,
  className,
}: {
  code: string;
  lang?: CodeLang;
  /** Wrap long lines (commands, URLs) instead of scrolling. */
  wrap?: boolean;
  className?: string | undefined;
}) {
  const html = useMemo(() => highlight(code.replace(/\n$/, ""), lang), [code, lang]);
  return (
    <pre
      className={cn(
        "docs-code focus-ring overflow-x-auto px-4 py-3.5 [scrollbar-width:thin]",
        wrap && "whitespace-pre-wrap [overflow-wrap:anywhere]",
        className,
      )}
      // biome-ignore lint: the highlighter escapes its input.
      dangerouslySetInnerHTML={{ __html: `<code>${html}</code>` }}
      tabIndex={0}
    />
  );
}

export function CodeBlock({
  code,
  lang = "tsx",
  title,
  className,
}: {
  code: string;
  lang?: CodeLang;
  /** File name or short label shown in the header bar. */
  title?: ReactNode;
  className?: string;
}) {
  return (
    <figure className={cn("group/code relative my-5 min-w-0 overflow-hidden rounded-xl border bg-surface-subtle dark:bg-surface", className)}>
      {title ? (
        <figcaption className="flex h-10 items-center justify-between gap-2 border-b ps-4 pe-1.5 text-muted-foreground text-xs">
          <span className="truncate font-mono">{title}</span>
          <CopyCodeButton value={code} />
        </figcaption>
      ) : (
        <div className="absolute end-1.5 top-1.5 z-10">
          <CopyCodeButton className="bg-surface-subtle dark:bg-surface" value={code} />
        </div>
      )}
      <CodeView className={title ? undefined : "pe-12"} code={code} lang={lang} />
    </figure>
  );
}
