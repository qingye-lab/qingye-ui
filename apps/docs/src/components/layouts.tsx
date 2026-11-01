import { ScrollArea } from "@qingye_lab/ui/components/scroll-area";
import { Skeleton, SkeletonBlock, SkeletonLine } from "@qingye_lab/ui/components/skeleton";
import { SkipLink } from "@qingye_lab/ui/components/skip-link";
import { Suspense, useRef, type ReactNode } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useRouteEffects } from "@/lib/use-route-effects";
import { DocsNav } from "./docs-nav";
import { DocFooter } from "./pager";
import { SearchProvider } from "./search";
import { SiteHeader } from "./site-header";
import { EditLink, TableOfContents } from "./toc";
import { SiteFooter } from "./site-footer";
import { DocsBreadcrumbs } from "./docs-breadcrumbs";
import { useDocsLocale } from "@/lib/docs-locale";
import { routeVisitKey } from "@/lib/paths";

function DocsSkipLink() {
  const en = useDocsLocale() === "en";
  return <SkipLink href="#main" className="docs-skip-link">{en ? "Skip to content" : "跳到正文"}</SkipLink>;
}

/**
 * While a route chunk loads for the first time: the outline every page shares (a title, a few
 * lines, a block). A load that finishes quickly shows nothing at all, because the reveal waits
 * one base step (see `.route-fallback`); a slow one shows the outline instead of a blank page.
 */
function RouteFallback() {
  return <Skeleton className="route-fallback site-frame min-h-[60dvh] gap-(--qy-field-group-gap) pt-(--qy-section-gap)">
    <SkeletonBlock className="h-[calc(2*var(--qy-cai))] w-1/3 rounded-item" />
    <div className="max-w-(--docs-measure)">
      <SkeletonLine />
      <SkeletonLine />
      <SkeletonLine className="w-2/3" />
    </div>
    <SkeletonBlock className="h-[calc(8*var(--qy-cai))]" />
  </Skeleton>;
}

export function SiteShell() {
  useRouteEffects();
  return (
    <SearchProvider>
      <DocsSkipLink />
      <SiteHeader />
      <Suspense fallback={<RouteFallback />}>
        <Outlet />
      </Suspense>
    </SearchProvider>
  );
}

/*
 * The documentation frame: index rail | paper | on-page contents, then the footer.
 * Regions are told apart by space alone (疏密有致): no rule between them and no
 * tinted rail. The frame is the site frame, the same width as the header, so the
 * wordmark, the sidebar and the contents column sit on edges the header already set.
 * Vertically (all in 材, --qy-cai): the paper starts 1 材 under the header's hairline; the rail's
 * first group name and the contents' first entry start 1 材 lower than the paper's top edge
 * (2 材 under the header), inside the sticky boxes so they keep that line while scrolling;
 * 2 材 of ground remain under the paper before the footer.
 *
 * The paper is one surface holding the whole article (header, body, pager): the paper colour
 * the library's Card uses (bg-card), a 1px border, the panel radius, no shadow, and 2 材 of
 * padding on every side (the library's --qy-prose-inset), counted from the paper's outer edge: the 1px of
 * border is taken out of the padding so the article column is exactly the Prose column (38 材, 760px).
 * The article inside is the library's Prose with framed={false}; this <main> is its frame. It is a plain <main> and not a Card because a Card shows the focus
 * colour on its border when it is the target of programmatic focus (focus-visible), and
 * <main tabindex="-1"> receives exactly that focus after navigation and from the skip link.
 * Every docs page gets it here, once, so no page draws its own.
 */
export function DocsLayout({ children }: { children?: ReactNode }) {
  const { pathname } = useLocation();
  const en = useDocsLocale() === "en";
  const visit = routeVisitKey(pathname);
  const article = useRef<HTMLDivElement>(null);
  return (
    <>
      <div className="site-frame flex pb-[calc(2*var(--qy-cai))]" data-docs-frame>
        <div className="sticky top-(--docs-header-height) hidden h-[calc(100dvh-var(--docs-header-height))] w-(--docs-rail) shrink-0 lg:block" data-docs-sidebar>
          <ScrollArea className="h-full">
            <DocsNav className="pt-[calc(2*var(--qy-cai))] pb-(--qy-section-gap) pe-(--qy-panel-padding)" />
          </ScrollArea>
        </div>
        <div className="flex min-w-0 flex-1 gap-(--docs-gap)" data-docs-body>
          <main
            className="mt-(--qy-cai) min-w-0 flex-1 self-start rounded-panel border border-border bg-card p-[calc(var(--qy-prose-inset)-1px)] text-card-foreground outline-none"
            id="main"
            tabIndex={-1}
          >
            <div className="w-full" data-route-enter key={visit} ref={article}>
              {/* No Suspense here: the shell's boundary lets navigation keep the old page until the new one is ready. */}
              <DocsBreadcrumbs />
              {children ?? <Outlet />}
              <DocFooter path={pathname} />
              {/* Where the contents column is hidden, the edit link closes the article instead (index.css). */}
              <div data-docs-edit-inline><EditLink className="mt-(--qy-section-gap)" /></div>
            </div>
          </main>
          {/* 本页目录与「在 GitHub 上编辑」是正文的附属内容：一个有名字的 aside（complementary），编辑链接因此也在地标之内。 */}
          <aside aria-label={en ? "About this page" : "本页"} className="w-(--docs-toc) shrink-0" data-docs-toc>
            <div className="sticky top-(--docs-header-height) max-h-[calc(100dvh-var(--docs-header-height))] overflow-y-auto pt-[calc(2*var(--qy-cai))] pb-(--qy-section-gap) [scrollbar-width:none]">
              {/* Keyed by visit: the article remounts per route, so the heading scan restarts on the new node. */}
              <TableOfContents container={article} key={visit} />
            </div>
          </aside>
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
