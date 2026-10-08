import { cn } from "@qingye_lab/ui/utils";
import { IconArrowLeft, IconArrowRight, IconEdit } from "@tabler/icons-react";
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

/*
 * Previous / next in reading order, then the edit link. Separated from the article by
 * the section step (3 材, as an H2 is) instead of a rule; the links are text with an
 * arrow, not boxes, so nothing here competes with the page's own content.
 */
export function DocFooter({ path }: { path: string }) {
  const locale = useDocsLocale();
  const { prev, next } = neighbours(path, locale);
  const edit = editUrlFor(path);
  if (!prev && !next && !edit) return null;
  return (
    <footer className="mt-[calc(3*var(--qy-cai))] flex flex-col gap-(--qy-field-group-gap)">
      {prev || next ? (
        <nav aria-label={locale === "en" ? "Adjacent pages" : "相邻页面"} className="grid grid-cols-2 gap-(--qy-section-gap)">
          {prev ? <PagerLink direction="prev" title={prev.title} to={prev.path} /> : <span />}
          {next ? <PagerLink direction="next" title={next.title} to={next.path} /> : null}
        </nav>
      ) : null}
      {edit ? (
        <a
          className="focus-ring inline-flex w-fit items-center gap-(--qy-control-content-gap) rounded-item text-support text-muted-foreground transition-colors hover:text-foreground"
          href={edit}
          rel="noreferrer"
          target="_blank"
        >
          <IconEdit aria-hidden="true" className="size-(--qy-control-sm-icon)" />
          {locale === "en" ? "Edit on GitHub" : "在 GitHub 上编辑"}
        </a>
      ) : null}
    </footer>
  );
}

function PagerLink({ to, title, direction }: { to: string; title: string; direction: "prev" | "next" }) {
  const Icon = direction === "prev" ? IconArrowLeft : IconArrowRight;
  // The arrow and the side carry the direction; the nav's name gives it to assistive tech.
  return (
    <Link
      className={cn(
        "group focus-ring flex min-w-0 items-center gap-(--qy-control-content-gap) rounded-item text-body text-foreground",
        direction === "next" && "col-start-2 justify-self-end",
      )}
      rel={direction}
      to={to}
    >
      {direction === "prev" ? <Icon aria-hidden="true" className="size-(--qy-control-sm-icon) shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" /> : null}
      <span className="min-w-0 truncate decoration-border underline-offset-[0.25em] group-hover:underline">{title}</span>
      {direction === "next" ? <Icon aria-hidden="true" className="size-(--qy-control-sm-icon) shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" /> : null}
    </Link>
  );
}
