import { cn } from "@qingye_lab/ui/utils";
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
        "docs-code focus-ring overflow-x-auto px-(--qy-space-4) py-(--qy-space-3) [scrollbar-width:thin]",
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
    <figure className={cn("group/code relative my-(--qy-space-module) min-w-0 overflow-hidden rounded-panel bg-surface-inset", className)}>
      {title ? (
        <figcaption className="flex items-center justify-between gap-(--qy-field-gap) border-b py-(--qy-fen) ps-(--qy-space-4) pe-(--qy-fen) text-muted-foreground text-caption">
          <span className="truncate font-mono">{title}</span>
          <CopyCodeButton value={code} />
        </figcaption>
      ) : (
        <div className="absolute end-(--qy-fen) top-(--qy-fen)">
          <CopyCodeButton value={code} />
        </div>
      )}
      <CodeView className={title ? undefined : "pe-[calc(2*var(--qy-cai))]"} code={code} lang={lang} />
    </figure>
  );
}
