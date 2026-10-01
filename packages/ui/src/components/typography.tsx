"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { ArrowUpRightIcon } from "lucide-react";
import type React from "react";
import { useUILocale } from "../locale";
import { cn } from "../utils";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingSize = "display" | "title" | "heading" | "label";

const headingSizeClasses: Record<HeadingSize, string> = {
  display: "text-display",
  heading: "text-heading",
  label: "text-label",
  title: "text-title",
};

const defaultSizeForLevel: Record<HeadingLevel, HeadingSize> = {
  1: "display",
  2: "title",
  3: "heading",
  4: "heading",
  5: "label",
  6: "label",
};

export interface HeadingProps extends useRender.ComponentProps<"h2"> {
  /** Document outline level; renders `<h1>`–`<h6>`. */
  level?: HeadingLevel;
  /**
   * Visual size from the type tokens, independent of `level`. Defaults:
   * 1 → display, 2 → title, 3–4 → heading, 5–6 → label.
   */
  size?: HeadingSize;
}

/** A section heading whose visual size is decoupled from its outline level. */
export function Heading({
  className,
  render,
  level = 2,
  size,
  ...props
}: HeadingProps): React.ReactElement {
  const resolvedSize = size ?? defaultSizeForLevel[level];
  const defaultProps = {
    className: cn(
      "text-balance font-heading font-semibold text-foreground",
      headingSizeClasses[resolvedSize],
      // CJK tracking is reset globally in utilities.css, which also covers body
      // copy and elements rendered outside this component.
      className,
    ),
    "data-level": level,
    "data-size": resolvedSize,
    "data-slot": "heading",
  };

  return useRender({
    defaultTagName: `h${level}` as "h2",
    props: mergeProps<"h2">(defaultProps, props),
    render,
  });
}

// Long-form styles reach only plain elements: anything a library component
// renders carries `data-slot` and keeps its own styling. Element rules sit in
// `:where()` so a `className` on an element inside still wins.
const proseClasses = [
  "min-w-0 text-foreground [overflow-wrap:break-word] [&>:first-child]:mt-0 [&>:last-child]:mb-0",
  // Blocks
  "[&_:where(p:not([data-slot]))]:my-[1em]",
  "[&_:where(:is(h1,h2,h3,h4,h5,h6):not([data-slot]))]:text-balance [&_:where(:is(h1,h2,h3,h4,h5,h6):not([data-slot]))]:font-heading [&_:where(:is(h1,h2,h3,h4,h5,h6):not([data-slot]))]:font-semibold [&_:where(:is(h1,h2,h3,h4,h5,h6):not([data-slot]))]:text-foreground",
  "[&_:where(h1:not([data-slot]))]:mt-0 [&_:where(h1:not([data-slot]))]:mb-[0.75em] [&_:where(h1:not([data-slot]))]:text-display",
  "[&_:where(h2:not([data-slot]))]:mt-[2em] [&_:where(h2:not([data-slot]))]:mb-[0.6em] [&_:where(h2:not([data-slot]))]:text-[1.25em] [&_:where(h2:not([data-slot]))]:leading-[1.4]",
  "[&_:where(h3:not([data-slot]))]:mt-[1.75em] [&_:where(h3:not([data-slot]))]:mb-[0.5em] [&_:where(h3:not([data-slot]))]:text-[1.0625em] [&_:where(h3:not([data-slot]))]:leading-[1.5]",
  "[&_:where(:is(h4,h5,h6):not([data-slot]))]:mt-[1.5em] [&_:where(:is(h4,h5,h6):not([data-slot]))]:mb-[0.5em] [&_:where(:is(h4,h5,h6):not([data-slot]))]:text-[1em]",
  "[&_:is(h2,h3,h4,h5,h6)+*]:mt-0",
  // Lists
  "[&_:where(:is(ul,ol):not([data-slot]))]:my-[1em] [&_:where(:is(ul,ol):not([data-slot]))]:ps-[1.375em] [&_:where(ol:not([data-slot]))]:list-decimal [&_:where(ul:not([data-slot]))]:list-disc",
  "[&_:where(li:not([data-slot]))]:my-[0.375em] [&_:where(li:not([data-slot]))]:ps-[0.25em] [&_:where(li:not([data-slot]))]:marker:text-muted-foreground [&_:where(ol>li:not([data-slot]))]:marker:tabular-nums [&_:where(li>:is(ul,ol))]:my-[0.375em]",
  // Quotes, rules, media
  "[&_:where(blockquote:not([data-slot]))]:my-[1.25em] [&_:where(blockquote:not([data-slot]))]:border-s-2 [&_:where(blockquote:not([data-slot]))]:border-border-strong [&_:where(blockquote:not([data-slot]))]:ps-[1em] [&_:where(blockquote:not([data-slot]))]:text-muted-foreground",
  "[&_:where(hr:not([data-slot]))]:my-[2em] [&_:where(hr:not([data-slot]))]:border-0 [&_:where(hr:not([data-slot]))]:border-t [&_:where(hr:not([data-slot]))]:border-border",
  "[&_:where(img:not([data-slot]))]:my-[1.5em] [&_:where(img:not([data-slot]))]:h-auto [&_:where(img:not([data-slot]))]:max-w-full [&_:where(img:not([data-slot]))]:rounded-xl [&_:where(img:not([data-slot]))]:outline [&_:where(img:not([data-slot]))]:outline-1 [&_:where(img:not([data-slot]))]:-outline-offset-1 [&_:where(img:not([data-slot]))]:outline-foreground/8",
  "[&_:where(figure:not([data-slot]))]:my-[1.5em] [&_:where(figure>img:not([data-slot]))]:my-0 [&_:where(figcaption:not([data-slot]))]:mt-[0.75em] [&_:where(figcaption:not([data-slot]))]:text-[0.875em] [&_:where(figcaption:not([data-slot]))]:text-muted-foreground",
  // Inline
  "[&_:where(:is(strong,b):not([data-slot]))]:font-semibold [&_:where(:is(strong,b):not([data-slot]))]:text-foreground",
  "[&_:where(a:not([data-slot]))]:rounded-[.125rem] [&_:where(a:not([data-slot]))]:font-medium [&_:where(a:not([data-slot]))]:text-foreground [&_:where(a:not([data-slot]))]:underline [&_:where(a:not([data-slot]))]:decoration-foreground/24 [&_:where(a:not([data-slot]))]:decoration-1 [&_:where(a:not([data-slot]))]:underline-offset-[0.25em] [&_:where(a:not([data-slot]))]:outline-none [&_:where(a:not([data-slot]))]:transition-[text-decoration-color] [&_:where(a:not([data-slot]))]:hover:decoration-foreground/64 [&_:where(a:not([data-slot]))]:focus-visible:ring-2 [&_:where(a:not([data-slot]))]:focus-visible:ring-ring [&_:where(a:not([data-slot]))]:focus-visible:ring-offset-1 [&_:where(a:not([data-slot]))]:focus-visible:ring-offset-background",
  "[&_:where(:not(pre)>code:not([data-slot]))]:box-decoration-clone [&_:where(:not(pre)>code:not([data-slot]))]:rounded-[.3125rem] [&_:where(:not(pre)>code:not([data-slot]))]:bg-muted [&_:where(:not(pre)>code:not([data-slot]))]:px-[0.3em] [&_:where(:not(pre)>code:not([data-slot]))]:py-[0.15em] [&_:where(:not(pre)>code:not([data-slot]))]:text-[0.875em]",
  "[&_:where(pre:not([data-slot]))]:my-[1.25em] [&_:where(pre:not([data-slot]))]:overflow-x-auto [&_:where(pre:not([data-slot]))]:rounded-xl [&_:where(pre:not([data-slot]))]:border [&_:where(pre:not([data-slot]))]:bg-code [&_:where(pre:not([data-slot]))]:px-4 [&_:where(pre:not([data-slot]))]:py-3 [&_:where(pre:not([data-slot]))]:text-[0.8125rem] [&_:where(pre:not([data-slot]))]:leading-6",
  "[&_:where(mark:not([data-slot]))]:rounded-[.125rem] [&_:where(mark:not([data-slot]))]:bg-warning/24 [&_:where(mark:not([data-slot]))]:px-[0.1em] [&_:where(mark:not([data-slot]))]:text-foreground",
  // Tables
  "[&_:where(table:not([data-slot]))]:my-[1.5em] [&_:where(table:not([data-slot]))]:w-full [&_:where(table:not([data-slot]))]:border-collapse [&_:where(table:not([data-slot]))]:text-[0.875em] [&_:where(table:not([data-slot]))]:leading-normal",
  "[&_:where(th:not([data-slot]))]:border-b [&_:where(th:not([data-slot]))]:border-border-strong [&_:where(th:not([data-slot]))]:py-[0.5em] [&_:where(th:not([data-slot]))]:pe-[1em] [&_:where(th:not([data-slot]))]:text-start [&_:where(th:not([data-slot]))]:align-bottom [&_:where(th:not([data-slot]))]:font-medium [&_:where(th:not([data-slot]))]:text-muted-foreground",
  "[&_:where(td:not([data-slot]))]:border-b [&_:where(td:not([data-slot]))]:py-[0.5em] [&_:where(td:not([data-slot]))]:pe-[1em] [&_:where(td:not([data-slot]))]:align-top [&_:where(:is(th,td):not([data-slot]):last-child)]:pe-0",
].join(" ");

export interface ProseProps extends useRender.ComponentProps<"div"> {
  /** `sm` for side panels and help text; `default` for articles. */
  size?: "sm" | "default";
}

/**
 * Styles long-form HTML (paragraphs, lists, links, quotes, code, tables,
 * rules, images) with CJK-friendly line height. Library components placed
 * inside keep their own styles.
 */
export function Prose({
  className,
  render,
  size = "default",
  ...props
}: ProseProps): React.ReactElement {
  const defaultProps = {
    className: cn(
      proseClasses,
      size === "sm"
        ? "text-sm leading-[1.75]"
        : "text-[0.9375rem] leading-[1.8]",
      className,
    ),
    "data-size": size,
    "data-slot": "prose",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export interface TextLinkProps extends useRender.ComponentProps<"a"> {
  /** `muted` sits in secondary text with a fainter underline. */
  variant?: "default" | "muted";
  /**
   * Opens in a new tab with `rel="noopener noreferrer"`, adds an arrow icon and
   * tells screen readers it opens a new tab.
   */
  external?: boolean;
}

/** An inline text link with a quiet underline and a visible keyboard focus ring. */
export function TextLink({
  className,
  render,
  variant = "default",
  external = false,
  children,
  ...props
}: TextLinkProps): React.ReactElement {
  const { messages } = useUILocale();
  const defaultProps = {
    children: external ? (
      <>
        {children}
        <ArrowUpRightIcon
          aria-hidden="true"
          className="ms-[0.1em] inline-block size-[0.875em] shrink-0 align-[-0.0625em] opacity-64 transition-opacity group-hover/text-link:opacity-100"
        />
        <span className="sr-only">{messages.opensInNewTab}</span>
      </>
    ) : (
      children
    ),
    className: cn(
      "group/text-link rounded-[.125rem] font-medium underline decoration-1 underline-offset-[0.25em] outline-none transition-[color,text-decoration-color] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
      variant === "muted"
        ? "text-muted-foreground decoration-muted-foreground/40 hover:text-foreground hover:decoration-foreground/48"
        : "text-foreground decoration-foreground/24 hover:decoration-foreground/64",
      className,
    ),
    "data-slot": "text-link",
    "data-variant": variant,
    rel: external ? "noopener noreferrer" : undefined,
    target: external ? "_blank" : undefined,
  };

  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(defaultProps, props),
    render,
  });
}
