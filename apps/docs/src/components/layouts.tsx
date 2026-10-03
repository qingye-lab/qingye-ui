import { ScrollArea } from "@qingye/ui/components/scroll-area";
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
      className="docs-skip-link sr-only focus-ring fixed start-3 top-3 rounded-item border border-border bg-surface-raised px-(--qy-panel-padding-sm) py-(--qy-field-gap) text-body-strong focus-visible:not-sr-only"
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

/** Quiet placeholder while a route chunk loads for the first time. */
function RouteFallback() {
  return <div aria-busy="true" className="min-h-[60dvh]" />;
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

export function DocsLayout({ children }: { children?: ReactNode }) {
  const en = useDocsLocale() === "en";
  const { pathname } = useLocation();
  const article = useRef<HTMLDivElement>(null);
  return (
    <div className="mx-auto flex w-full max-w-[90rem] px-4 sm:px-6 lg:px-8">
      <aside data-docs-sidebar aria-label={en ? "Documentation sidebar" : "侧栏"} className="sticky top-(--docs-header-height) hidden h-[calc(100dvh-var(--docs-header-height))] w-60 shrink-0 lg:block">
        <ScrollArea className="h-full -ms-2.5 pe-4">
          <DocsNav className="py-8" />
        </ScrollArea>
      </aside>
      <div className="flex min-w-0 flex-1 gap-12 lg:ps-10 xl:ps-12">
        <main className="min-w-0 flex-1 pt-8 pb-16 outline-none sm:pt-10" id="main" tabIndex={-1}>
          <div className="mx-auto w-full max-w-[48rem]" data-route-enter key={routeVisitKey(pathname)} ref={article}>
            {/* No Suspense here: the shell's boundary lets navigation keep the old page until the new one is ready. */}
            <DocsBreadcrumbs />
            {children ?? <Outlet />}
            <DocFooter path={pathname} />
          </div>
        </main>
        <aside data-docs-toc aria-label={en ? "On this page" : "本页目录"} className="hidden w-52 shrink-0 xl:block">
          <div className="sticky top-(--docs-header-height) max-h-[calc(100dvh-var(--docs-header-height))] overflow-y-auto pt-10 pb-8 [scrollbar-width:none]">
            <TableOfContents container={article} />
          </div>
        </aside>
      </div>
    </div>
  );
}
