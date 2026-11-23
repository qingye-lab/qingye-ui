import { CodeBlock as LibraryCodeBlock } from "@qingye_lab/ui/components/code-block";
import { cn } from "@qingye_lab/ui/utils";
import { useMemo, type ReactNode } from "react";
import { highlight, type CodeLang } from "@/lib/highlight";

/** Highlighted markup for the library's `children` slot; the highlighter escapes its input. */
function Highlighted({ code, lang }: { code: string; lang: CodeLang }) {
  const html = useMemo(() => highlight(code, lang), [code, lang]);
  // biome-ignore lint: the highlighter escapes its input.
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

/**
 * Highlighted source without a frame of its own, for places that already sit inside one (the demo
 * frame's code area). Reuses the library CodeBlock (`framed={false}`, `copyable={false}`) so
 * overflowing code inherits conditional keyboard focus and an accessible region name.
 */
export function CodeView({
  code,
  lang = "tsx",
  wrap = false,
  maxLines,
  className,
}: {
  code: string;
  lang?: CodeLang;
  /** Wrap long lines (commands, URLs) instead of scrolling. */
  wrap?: boolean;
  /** Maximum visible lines before vertical scrolling inside the code surface. */
  maxLines?: number;
  className?: string | undefined;
}) {
  const text = code.replace(/\n$/, "");
  return (
    <LibraryCodeBlock
      className={cn("bg-(--qy-code-surface)", className)}
      code={text}
      copyable={false}
      framed={false}
      {...(maxLines !== undefined ? { maxLines } : {})}
      wrap={wrap}
    >
      <Highlighted code={text} lang={lang} />
    </LibraryCodeBlock>
  );
}

/** The library CodeBlock with the site's highlighter; `title` may be a file name or a control such as a SegmentedControl. */
export function CodeBlock({
  code,
  lang = "tsx",
  title,
  wrap,
  className,
}: {
  code: string;
  lang?: CodeLang;
  title?: ReactNode;
  wrap?: boolean;
  className?: string;
}) {
  const text = code.replace(/\n$/, "");
  return (
    <LibraryCodeBlock
      className={cn("my-(--qy-field-group-gap) [h3+&]:mt-0", className)}
      code={text}
      title={title}
      {...(wrap !== undefined ? { wrap } : {})}
    >
      <Highlighted code={text} lang={lang} />
    </LibraryCodeBlock>
  );
}
