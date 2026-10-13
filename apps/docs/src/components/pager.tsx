import { cn } from "@qingye_lab/ui/utils";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { neighbours } from "@/lib/nav";
import { useDocsLocale } from "@/lib/docs-locale";

/*
 * Previous / next in reading order, the last thing inside the paper. Separated from the
 * article by 4 材 (80px, the step above an H2) instead of a rule; the links are text with
 * an arrow, not boxes, so nothing here competes with the page's own content. The edit
 * link lives beside the contents (toc.tsx), not here.
 */
export function DocFooter({ path }: { path: string }) {
  const locale = useDocsLocale();
  const { prev, next } = neighbours(path, locale);
  if (!prev && !next) return null;
  return (
    <nav aria-label={locale === "en" ? "Adjacent pages" : "相邻页面"} className="mt-[calc(4*var(--qy-cai))] grid grid-cols-2 gap-(--qy-section-gap)">
      {prev ? <PagerLink direction="prev" title={prev.title} to={prev.path} /> : <span />}
      {next ? <PagerLink direction="next" title={next.title} to={next.path} /> : null}
    </nav>
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
      <span className="min-w-0 truncate underline decoration-transparent underline-offset-[0.25em] transition-[text-decoration-color] group-hover:decoration-border">{title}</span>
      {direction === "next" ? <Icon aria-hidden="true" className="size-(--qy-control-sm-icon) shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" /> : null}
    </Link>
  );
}
