import { ScrollArea } from "@qingye_lab/ui/components/scroll-area";
import { useUILocale } from "@qingye_lab/ui/locale";
import { IconLoader2 } from "@tabler/icons-react";
import { Suspense, useRef, type ReactNode } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useRouteEffects } from "@/lib/use-route-effects";
import { DocsNav } from "./docs-nav";
import { DocFooter } from "./pager";
import { SearchProvider } from "./search";
import { SiteHeader } from "./site-header";
import { TableOfContents } from "./toc";
import { DocsBreadcrumbs } from "./docs-breadcrumbs";
import { useDocsLocale } from "@/lib/docs-locale";
import { routeVisitKey } from "@/lib/paths";

function SkipLink() {
  const en = useDocsLocale() === "en";
  return (
    <a
      className="docs-skip-link focus-ring fixed start-3 top-3 -translate-y-[200%] rounded-item border border-border bg-surface-raised px-(--qy-panel-padding-sm) py-(--qy-field-gap) text-body-strong focus-visible:translate-y-0"
      href="#main"
      onClick={(event) => {
        event.preventDefault();
        const main = document.getElementById("main");
        main?.focus({ preventScroll: true });
        main?.scrollIntoView({ block: "start" });
      }}
    >
      {en ? "Skip to content" : "跳到正文"}
    </a>
  );
}

/**
 * While a route chunk loads for the first time. A load that finishes quickly shows nothing at all
 * (the reveal waits 400ms, see `.route-fallback`); a slow one gets the same spinning mark a Button
 * shows for work in progress, named for assistive technology.
 */
function RouteFallback() {
  const { messages } = useUILocale();
  return <div aria-busy="true" className="route-fallback site-frame min-h-[60dvh] pt-(--qy-section-gap)" role="status">
    <IconLoader2 aria-hidden="true" className="size-(--qy-control-md-icon) animate-spin text-muted-foreground" />
    <span className="sr-only">{messages.loading}</span>
  </div>;
}

export function SiteShell() {
  useRouteEffects();
  return (
    <SearchProvider>
      <SkipLink />
      <SiteHeader />
      <Suspense fallback={<RouteFallback />}>
        <Outlet />
      </Suspense>
    </SearchProvider>
  );
}

/*
 * The documentation frame: index rail, article column, on-page contents.
 * Regions are told apart by space alone (疏密有致): no rule between them and no
 * tinted rail. The frame is the site frame, the same width as the header, so the
 * wordmark, the sidebar and the contents column sit on edges the header already set.
 * All three regions start one section gap below the header, so the first group
 * name, the page title and the first contents entry share a top line.
 */
export function DocsLayout({ children }: { children?: ReactNode }) {
  const { pathname } = useLocation();
  const visit = routeVisitKey(pathname);
  const article = useRef<HTMLDivElement>(null);
  return (
    <div className="site-frame flex" data-docs-frame>
      <div className="sticky top-(--docs-header-height) hidden h-[calc(100dvh-var(--docs-header-height))] w-(--docs-rail) shrink-0 lg:block" data-docs-sidebar>
        <ScrollArea className="h-full">
          <DocsNav className="py-(--qy-section-gap) pe-(--qy-panel-padding)" />
        </ScrollArea>
      </div>
      <div className="flex min-w-0 flex-1 gap-(--qy-section-gap)" data-docs-body>
        <main className="min-w-0 flex-1 pt-(--qy-section-gap) pb-[calc(2*var(--qy-section-gap))] outline-none" id="main" tabIndex={-1}>
          <div className="w-full" data-route-enter key={visit} ref={article}>
            {/* No Suspense here: the shell's boundary lets navigation keep the old page until the new one is ready. */}
            <DocsBreadcrumbs />
            {children ?? <Outlet />}
            <DocFooter path={pathname} />
          </div>
        </main>
        <div className="w-(--docs-toc) shrink-0" data-docs-toc>
          <div className="sticky top-(--docs-header-height) max-h-[calc(100dvh-var(--docs-header-height))] overflow-y-auto pt-(--qy-section-gap) pb-(--qy-section-gap) [scrollbar-width:none]">
            {/* Keyed by visit: the article remounts per route, so the heading scan restarts on the new node. */}
            <TableOfContents container={article} key={visit} />
          </div>
        </div>
      </div>
    </div>
  );
}
