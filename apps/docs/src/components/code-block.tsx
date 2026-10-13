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
 * frame's code area). It uses the code surface and the library block's text and padding, and
 * scrolls horizontally; keyboard users can scroll it too.
 */
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
  const text = code.replace(/\n$/, "");
  return (
    <pre
      className={cn(
        "m-0 max-w-full overflow-x-auto bg-(--qy-code-surface) p-(--qy-panel-padding-sm) text-body text-foreground outline-none focus-visible:ring-(length:--qy-focus-quiet-width) focus-visible:ring-ring focus-visible:ring-inset",
        wrap && "whitespace-pre-wrap wrap-anywhere",
        className,
      )}
      tabIndex={0}
    >
      <code className="font-mono">
        <Highlighted code={text} lang={lang} />
      </code>
    </pre>
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
