import { cn } from "@qingye_lab/ui/utils";
import { Toc, useTocHeadings, useTocScrollSpy } from "@qingye_lab/ui/components/toc";
import { IconEdit } from "@tabler/icons-react";
import { useEffect, useState, type MouseEvent, type RefObject } from "react";
import { useLocation } from "react-router-dom";
import { componentPath, GUIDES, OVERVIEW } from "@/lib/nav";
import { findComponent } from "@/lib/registry";
import { editComponentUrl, editPageUrl } from "@/lib/site";
import { useDocsLocale } from "@/lib/docs-locale";
import { PATHS, routeIdentity } from "@/lib/paths";
import { useHashLink } from "@/lib/use-route-effects";

/** The article's own `[data-toc]` headings (prose H2/H3), so pages never maintain a list by hand. */
const HEADINGS = "[data-toc][id]";

/** The page header's scroll padding is the reading line a heading has to cross to become current. */
function useScrollPadding() {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const read = () => setOffset(parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0);
    read();
    window.addEventListener("resize", read);
    return () => window.removeEventListener("resize", read);
  }, []);
  return offset;
}

export function editUrlFor(path: string): string | null {
  path = routeIdentity(path);
  const guide = GUIDES.find((page) => page.path === path);
  if (guide) return editPageUrl(guide.file);
  if (path === OVERVIEW.path) return editPageUrl("components-index.tsx");
  const prefix = `${PATHS.components}/`;
  const slug = path.startsWith(prefix) ? path.slice(prefix.length) : null;
  if (slug && findComponent(slug) && componentPath(slug) === path) return editComponentUrl(slug);
  return null;
}

/**
 * The source file of the current page on GitHub. It sits beside the contents (a reader looking
 * for "where is this written" is already in that column) and, where that column is hidden,
 * closes the article instead; `className` carries the placement, never the link's own look.
 */
export function EditLink({ className }: { className?: string | undefined }) {
  const locale = useDocsLocale();
  const href = editUrlFor(useLocation().pathname);
  if (!href) return null;
  return (
    <a
      className={cn("focus-ring inline-flex w-fit items-center gap-(--qy-control-content-gap) rounded-item text-support text-muted-foreground transition-colors hover:text-foreground", className)}
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      <IconEdit aria-hidden="true" className="size-(--qy-control-sm-icon)" />
      {locale === "en" ? "Edit on GitHub" : "在 GitHub 上编辑"}
    </a>
  );
}

/*
 * The on-page contents are the library's Toc: the vertical navigation line, with the
 * current section darkening its own segment. No visible title: its position beside the
 * article and its entries already say what it is; the landmark keeps the Toc's own
 * accessible name. A single section needs no contents. The edit link follows the
 * contents by 1 材, or stands alone in the column when there are no contents.
 */
export function TableOfContents({ container }: { container: RefObject<HTMLElement | null> }) {
  const items = useTocHeadings(container, HEADINGS);
  const current = useTocScrollSpy(items, { offset: useScrollPadding() });
  const onHashClick = useHashLink();
  const edit = <EditLink className={items.length < 2 ? undefined : "mt-(--qy-cai)"} />;
  if (items.length < 2) return edit;
  // Route-aware hash navigation for the Toc's plain anchors, delegated from the landmark.
  const onClick = (event: MouseEvent<HTMLElement>) => {
    const link = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
    const id = link ? decodeURIComponent(link.hash.slice(1)) : "";
    if (id) onHashClick(event as MouseEvent<HTMLAnchorElement>, id);
  };
  return <><Toc current={current} items={items} onClick={onClick} />{edit}</>;
}
