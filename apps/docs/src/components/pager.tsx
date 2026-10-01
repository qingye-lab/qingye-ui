import { cn } from "@yanqing/ui/utils";
import { ArrowLeftIcon, ArrowRightIcon, SquarePenIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { componentPath, GUIDES, neighbours, OVERVIEW } from "@/lib/nav";
import { findComponent } from "@/lib/registry";
import { editComponentUrl, editPageUrl } from "@/lib/site";

function editUrlFor(path: string): string | null {
  const guide = GUIDES.find((page) => page.path === path);
  if (guide) return editPageUrl(guide.file);
  if (path === OVERVIEW.path) return editPageUrl("components-index.tsx");
  const slug = path.startsWith("/docs/components/") ? path.slice("/docs/components/".length) : null;
  if (slug && findComponent(slug) && componentPath(slug) === path) return editComponentUrl(slug);
  return null;
}

/** "Edit on GitHub" plus previous / next in reading order. */
export function DocFooter({ path }: { path: string }) {
  const { prev, next } = neighbours(path);
  const edit = editUrlFor(path);
  if (!prev && !next && !edit) return null;
  return (
    <footer className="mt-16 flex flex-col gap-8 border-t pt-6">
      {edit ? (
        <a
          className="focus-ring inline-flex w-fit items-center gap-1.5 rounded-sm text-muted-foreground text-sm transition-colors hover:text-foreground"
          href={edit}
          rel="noreferrer"
          target="_blank"
        >
          <SquarePenIcon aria-hidden="true" className="size-3.5" />
          在 GitHub 上编辑
        </a>
      ) : null}
      {prev || next ? (
        <nav aria-label="上一篇与下一篇" className="grid grid-cols-2 gap-3">
          {prev ? (
            <PagerLink direction="prev" hint="上一篇" title={prev.title} to={prev.path} />
          ) : (
            <span />
          )}
          {next ? <PagerLink direction="next" hint="下一篇" title={next.title} to={next.path} /> : null}
        </nav>
      ) : null}
    </footer>
  );
}

function PagerLink({ to, title, hint, direction }: { to: string; title: string; hint: string; direction: "prev" | "next" }) {
  const Icon = direction === "prev" ? ArrowLeftIcon : ArrowRightIcon;
  return (
    <Link
      className={cn(
        "group focus-ring flex min-w-0 flex-col gap-1 rounded-xl border px-4 py-3 transition-colors hover:bg-accent/60",
        direction === "next" && "col-start-2 items-end text-end",
      )}
      rel={direction}
      to={to}
    >
      <span className="flex items-center gap-1 text-muted-foreground text-xs">
        {direction === "prev" ? <Icon aria-hidden="true" className="size-3.5 transition-transform group-hover:-translate-x-0.5" /> : null}
        {hint}
        {direction === "next" ? <Icon aria-hidden="true" className="size-3.5 transition-transform group-hover:translate-x-0.5" /> : null}
      </span>
      <span className="max-w-full truncate font-medium text-foreground-strong text-sm">{title}</span>
    </Link>
  );
}
