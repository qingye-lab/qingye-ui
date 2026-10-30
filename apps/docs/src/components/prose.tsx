import { cn } from "@qingye_lab/ui";
import { linkClassName } from "@qingye_lab/ui/components/link";
import { Prose, type ProseProps } from "@qingye_lab/ui/components/prose";
import { IconLink } from "@tabler/icons-react";
import { useEffect, type ComponentProps, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "./locale-link";
import { syncDocumentHead } from "@/lib/document-head";
import { pageTitle } from "@/lib/site";
import { useDocsLocale } from "@/lib/docs-locale";
import { useHashLink } from "@/lib/use-route-effects";

/*
 * The article's typography is the library's Prose: sizes, rhythm, measure, lists, links and
 * justification all come from it, so the documentation and any project using Prose read the same.
 * This file only adds what a documentation site needs on top: the browser title, heading anchors
 * and the contents markers, client-side links, and the two-column facts list.
 *
 * Prose typesets its direct children, so a page is one <Article> and its headings, paragraphs and
 * lists sit directly inside it; a nested group of them (a section) is its own <Article render>.
 * Components and demos placed in the article keep their own drawing.
 */
const flow = "mt-0 mb-(--qy-field-group-gap)";
const measure = "max-w-(--docs-measure)";

/** One documentation article, or with `render` a section of one. The page's paper is DocsLayout's. */
export function Article(props: ProseProps) {
  return <Prose framed={false} {...props} />;
}

/**
 * A section that lays out its own parts (each spaced from the one above, in the page's stylesheet)
 * and takes only its heading from the article: the article's block spacing is switched off for
 * everything but the heading.
 */
export function ArticleSection({ className, ...props }: Omit<ProseProps, "render" | "framed">) {
  return <Prose className={cn("[&>:not(h2)]:mb-0", className)} framed={false} render={<section />} {...props} />;
}

export function useDocumentTitle(title?: string, description?: string) {
  const locale = useDocsLocale();
  const { pathname } = useLocation();
  useEffect(() => {
    const full = pageTitle(title, locale);
    document.title = full;
    syncDocumentHead({ title: full, description, pathname, locale });
  }, [title, description, locale, pathname]);
}

export function PageHeader({
  title,
  description,
  metaDescription,
  documentTitle,
  children,
  className,
}: {
  title: ReactNode;
  description?: ReactNode;
  /** 只写进文档头（搜索摘要、分享卡片），不在页面上显示。页面上的能力由示例本身表达。 */
  metaDescription?: string;
  /** Plain-text title for the browser tab when `title` is not a string. */
  documentTitle?: string;
  children?: ReactNode;
  className?: string;
}) {
  useDocumentTitle(documentTitle ?? (typeof title === "string" ? title : undefined), metaDescription ?? (typeof description === "string" ? description : undefined));
  return (
    <header className={cn("min-w-0", className)}>
      <h1 className="docs-page-title" tabIndex={-1}>
        {title}
      </h1>
      {description ? <p>{description}</p> : null}
      {/* What a page adds under its lead (facts, an import line, a download) draws itself; it is not running text. */}
      {children ? <div className="contents" data-slot="docs-header-extras">{children}</div> : null}
    </header>
  );
}

function Anchor({ id, children }: { id: string; children: ReactNode }) {
  const onHashClick = useHashLink();
  return (
    <a className="group/anchor focus-ring inline-flex max-w-full items-baseline gap-(--qy-space-2) rounded-sm" data-slot="docs-heading-anchor" href={`#${id}`} onClick={(event) => onHashClick(event, id)}>
      <span className="min-w-0 [overflow-wrap:anywhere]">{children}</span>
      <IconLink
        aria-hidden="true"
        className="size-(--qy-control-sm-icon) shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover/anchor:opacity-100 group-focus-visible/anchor:opacity-100"
      />
    </a>
  );
}

export function H2({ id, children, className }: { id: string; children: ReactNode; className?: string }) {
  return (
    <h2
      className={cn("docs-section-heading", className)}
      data-toc="2"
      id={id}
    >
      <Anchor id={id}>{children}</Anchor>
    </h2>
  );
}

export function H3({ id, children, className }: { id: string; children: ReactNode; className?: string }) {
  return (
    <h3
      className={cn("docs-section-heading", className)}
      data-toc="3"
      id={id}
    >
      <Anchor id={id}>{children}</Anchor>
    </h3>
  );
}

export function P({ className, ...props }: ComponentProps<"p">) {
  return <p className={className} {...props} />;
}

export function Ul({ className, ...props }: ComponentProps<"ul">) {
  return <ul className={className} {...props} />;
}

export function Ol({ className, ...props }: ComponentProps<"ol">) {
  return <ol className={className} {...props} />;
}

export { Code } from "@qingye_lab/ui/components/typography";

/** Internal paths route client-side; anything with a scheme opens in a new tab. */
export function A({ href, className, children, ...props }: ComponentProps<"a"> & { href: string }) {
  if (/^https?:/.test(href)) {
    return (
      <a className={cn(linkClassName, className)} href={href} rel="noreferrer" target="_blank" {...props}>
        {children}
      </a>
    );
  }
  return (
    <Link className={cn(linkClassName, className)} to={href} {...props}>
      {children}
    </Link>
  );
}

/** A quiet two-column definition list for short reference facts. */
export function Facts({ items, className }: { items: { term: ReactNode; detail: ReactNode }[]; className?: string }) {
  return (
    <dl className={cn(flow, measure, "grid grid-cols-1 sm:grid-cols-[max-content_minmax(0,1fr)] gap-x-(--qy-section-gap) gap-y-(--qy-field-gap)", className)}>
      {items.map((item, index) => (
        <div className="contents" key={index}>
          <dt className="text-reading text-muted-foreground">{item.term}</dt>
          <dd className="m-0 text-reading text-foreground">{item.detail}</dd>
        </div>
      ))}
    </dl>
  );
}
