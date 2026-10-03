import { Alert, AlertDescription, AlertTitle } from "@qingye/ui/components/alert";
import { cn } from "@qingye/ui";
import { InfoIcon, LinkIcon, TriangleAlertIcon } from "lucide-react";
import { useEffect, type ComponentProps, type ReactNode } from "react";
import { Link } from "./locale-link";
import { pageTitle } from "@/lib/site";
import { useHashLink } from "@/lib/use-route-effects";

const proseWrapClass = "[overflow-wrap:break-word]";

export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = pageTitle(title);
  }, [title]);
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
  useDocumentTitle(documentTitle ?? (typeof title === "string" ? title : undefined));
  return (
    <header className={cn("flex min-w-0 flex-col gap-(--qy-space-3) pb-(--qy-space-6)", className)}>
      <h1 className="docs-page-title text-balance text-display text-foreground-strong" tabIndex={-1}>
        {title}
      </h1>
      {description ? <p className={cn(proseWrapClass, "max-w-[40rem] text-pretty text-prose text-muted-foreground leading-relaxed")}>{description}</p> : null}
      {children}
    </header>
  );
}

function Anchor({ id, children }: { id: string; children: ReactNode }) {
  const onHashClick = useHashLink();
  return (
    <a className="group/anchor focus-ring inline-flex max-w-full items-baseline gap-(--qy-space-2) rounded-sm" href={`#${id}`} onClick={(event) => onHashClick(event, id)}>
      <span className="min-w-0 [overflow-wrap:anywhere]">{children}</span>
      <LinkIcon
        aria-hidden="true"
        className="size-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover/anchor:opacity-72 group-focus-visible/anchor:opacity-72"
      />
    </a>
  );
}

export function H2({ id, children, className }: { id: string; children: ReactNode; className?: string }) {
  return (
    <h2
      className={cn(
        "docs-section-heading mt-14 mb-4 text-chapter text-foreground-strong first:mt-0 [header+&]:mt-6",
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
      className={cn("docs-section-heading mt-10 mb-3 text-heading text-foreground-strong [h2+&]:mt-5", className)}
      data-toc="3"
      id={id}
    >
      <Anchor id={id}>{children}</Anchor>
    </h3>
  );
}

export function P({ className, ...props }: ComponentProps<"p">) {
  return <p className={cn(proseWrapClass, "my-4 max-w-[42rem] text-pretty text-reading text-foreground/90 leading-[1.8]", className)} {...props} />;
}

export function Ul({ className, ...props }: ComponentProps<"ul">) {
  return (
    <ul
      className={cn(
        proseWrapClass,
        "my-4 flex max-w-[42rem] flex-col gap-2 ps-5 text-reading text-foreground/90 leading-[1.75] marker:text-foreground-subtle [list-style:disc]",
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
        "my-4 flex max-w-[42rem] list-decimal flex-col gap-2 ps-5 text-reading text-foreground/90 leading-[1.75] marker:text-muted-foreground marker:numeric",
        className,
      )}
      {...props}
    />
  );
}

export function Code({ className, ...props }: ComponentProps<"code">) {
  return <code className={cn("docs-inline-code", className)} {...props} />;
}

export function Strong({ className, ...props }: ComponentProps<"strong">) {
  return <strong className={cn("font-medium text-foreground-strong", className)} {...props} />;
}

const linkClass =
  "focus-ring rounded-sm font-medium text-foreground-strong underline decoration-foreground/24 underline-offset-[0.22em] transition-[text-decoration-color] hover:decoration-foreground/72";

/** Internal paths route client-side; anything with a scheme opens in a new tab. */
export function A({ href, className, children, ...props }: ComponentProps<"a"> & { href: string }) {
  if (/^https?:/.test(href)) {
    return (
      <a className={cn(linkClass, className)} href={href} rel="noreferrer" target="_blank" {...props}>
        {children}
      </a>
    );
  }
  return (
    <Link className={cn(linkClass, className)} to={href} {...props}>
      {children}
    </Link>
  );
}

export function Callout({
  tone = "info",
  title,
  children,
  className,
}: {
  tone?: "info" | "warning";
  title?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  const Icon = tone === "warning" ? TriangleAlertIcon : InfoIcon;
  return (
    <Alert className={cn("my-6 max-w-[42rem]", className)} role="note" tone={tone}>
      <Icon aria-hidden="true" />
      {title ? <AlertTitle>{title}</AlertTitle> : null}
      <AlertDescription className="text-foreground/80 leading-relaxed">{children}</AlertDescription>
    </Alert>
  );
}

/** A quiet two-column definition list for short reference facts. */
export function Facts({ items, className }: { items: { term: ReactNode; detail: ReactNode }[]; className?: string }) {
  return (
    <dl className={cn("my-6 grid max-w-[42rem] grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-[minmax(7rem,auto)_1fr]", className)}>
      {items.map((item, index) => (
        <div className="contents" key={index}>
          <dt className="font-medium text-body text-foreground-strong sm:pt-px">{item.term}</dt>
          <dd className="-mt-2 text-reading text-foreground/85 leading-relaxed sm:mt-0">{item.detail}</dd>
        </div>
      ))}
    </dl>
  );
}
