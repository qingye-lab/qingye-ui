import { cn } from "@qingye_lab/ui";
import { linkClassName } from "@qingye_lab/ui/components/link";
import { IconLink } from "@tabler/icons-react";
import { useEffect, type ComponentProps, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "./locale-link";
import { syncDocumentHead } from "@/lib/document-head";
import { pageTitle } from "@/lib/site";
import { useDocsLocale } from "@/lib/docs-locale";
import { useHashLink } from "@/lib/use-route-effects";

const proseWrapClass = "[overflow-wrap:break-word]";

/*
 * Article rhythm (疏密有致), three steps that read apart at a glance:
 *   a heading to the text it introduces   2 分  (--qy-field-gap, within a group)
 *   paragraph to paragraph, block to block 1 材  (--qy-space-module, between groups)
 *   subsection (H3)                        2 材  (--qy-section-gap)
 *   section (H2)                           3 材  (preset, as on the design-methods page)
 * Blocks carry only a bottom margin, so a heading's small gap is never swallowed by
 * the larger top margin of what follows it. Running text keeps one measure.
 */
const flow = "mt-0 mb-(--qy-space-module)";
const measure = "max-w-(--docs-measure)";

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
  documentTitle,
  children,
  className,
}: {
  title: ReactNode;
  description?: ReactNode;
  /** Plain-text title for the browser tab when `title` is not a string. */
  documentTitle?: string;
  children?: ReactNode;
  className?: string;
}) {
  useDocumentTitle(documentTitle ?? (typeof title === "string" ? title : undefined), typeof description === "string" ? description : undefined);
  return (
    <header className={cn("flex min-w-0 flex-col gap-(--qy-field-gap) pb-(--qy-section-gap)", className)}>
      <h1 className="docs-page-title text-balance text-display text-foreground" tabIndex={-1}>
        {title}
      </h1>
      {description ? <p className={cn(proseWrapClass, measure, "text-pretty text-reading text-muted-foreground")}>{description}</p> : null}
      {children}
    </header>
  );
}

function Anchor({ id, children }: { id: string; children: ReactNode }) {
  const onHashClick = useHashLink();
  return (
    <a className="group/anchor focus-ring inline-flex max-w-full items-baseline gap-(--qy-space-2) rounded-sm" href={`#${id}`} onClick={(event) => onHashClick(event, id)}>
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
      className={cn(
        "docs-section-heading mt-[calc(3*var(--qy-cai))] mb-(--qy-field-gap) text-title text-foreground first:mt-0 [header+&]:mt-0",
        className,
      )}
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
      className={cn("docs-section-heading mt-(--qy-section-gap) mb-(--qy-field-gap) text-chapter text-foreground [h2+&]:mt-(--qy-space-module)", className)}
      data-toc="3"
      id={id}
    >
      <Anchor id={id}>{children}</Anchor>
    </h3>
  );
}

export function P({ className, ...props }: ComponentProps<"p">) {
  return <p className={cn(proseWrapClass, flow, measure, "docs-p text-pretty text-reading text-foreground", className)} {...props} />;
}

export function Ul({ className, ...props }: ComponentProps<"ul">) {
  return (
    <ul
      className={cn(
        proseWrapClass,
        flow,
        measure,
        "flex flex-col gap-(--qy-field-gap) ps-(--qy-space-module) text-reading text-foreground marker:text-muted-foreground [list-style:disc]",
        className,
      )}
      {...props}
    />
  );
}

export function Ol({ className, ...props }: ComponentProps<"ol">) {
  return (
    <ol
      className={cn(
        proseWrapClass,
        flow,
        measure,
        "flex list-decimal flex-col gap-(--qy-field-gap) ps-(--qy-space-module) text-reading text-foreground marker:text-muted-foreground marker:numeric",
        className,
      )}
      {...props}
    />
  );
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
