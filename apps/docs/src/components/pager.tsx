import { cn } from "@qingye/ui/utils";
import { ArrowLeftIcon, ArrowRightIcon, SquarePenIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { componentPath, GUIDES, neighbours, OVERVIEW } from "@/lib/nav";
import { findComponent } from "@/lib/registry";
import { editComponentUrl, editPageUrl } from "@/lib/site";
import { useDocsLocale } from "@/lib/docs-locale";
import { PATHS, routeIdentity } from "@/lib/paths";

function editUrlFor(path: string): string | null {
  path = routeIdentity(path);
  const guide = GUIDES.find((page) => page.path === path);
  if (guide) return editPageUrl(guide.file);
  if (path === OVERVIEW.path) return editPageUrl("components-index.tsx");
  const prefix = `${PATHS.components}/`;
  const slug = path.startsWith(prefix) ? path.slice(prefix.length) : null;
  if (slug && findComponent(slug) && componentPath(slug) === path) return editComponentUrl(slug);
  return null;
}

/** "Edit on GitHub" plus previous / next in reading order. */
export function DocFooter({ path }: { path: string }) {
  const locale = useDocsLocale();
  const { prev, next } = neighbours(path, locale);
  const edit = editUrlFor(path);
  if (!prev && !next && !edit) return null;
  return (
    <footer className="mt-16 flex flex-col gap-8 border-t pt-6">
      {edit ? (
        <a
          className="focus-ring inline-flex w-fit items-center gap-1.5 rounded-sm text-muted-foreground text-body transition-colors hover:text-foreground"
          href={edit}
          rel="noreferrer"
          target="_blank"
        >
          <SquarePenIcon aria-hidden="true" className="size-3.5" />
          {locale === "en" ? "Edit on GitHub" : "在 GitHub 上编辑"}
        </a>
      ) : null}
      {prev || next ? (
        <nav aria-label={locale === "en" ? "Adjacent pages" : "相邻页面"} className="grid grid-cols-2 gap-3">
          {prev ? (
            <PagerLink direction="prev" title={prev.title} to={prev.path} />
          ) : (
            <span />
          )}
          {next ? <PagerLink direction="next" title={next.title} to={next.path} /> : null}
        </nav>
      ) : null}
    </footer>
  );
}

function PagerLink({ to, title, direction }: { to: string; title: string; direction: "prev" | "next" }) {
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
      {/* The arrow and the column already say which side this link sits on; the destination
          title is the only thing a reader needs, and the arrow carries the direction to
          assistive tech through `aria-hidden` icons plus the nav's own name. */}
      <span aria-hidden="true" className="flex items-center gap-1 text-muted-foreground text-caption">
        {direction === "prev" ? <Icon className="size-3.5 transition-transform group-hover:-translate-x-0.5" /> : null}
        {direction === "next" ? <Icon className="size-3.5 transition-transform group-hover:translate-x-0.5" /> : null}
      </span>
      <span className="max-w-full truncate font-medium text-foreground-strong text-body">{title}</span>
    </Link>
  );
}
