import { cn } from "@qingye/ui/utils";
import { useLayoutEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { navSections } from "@/lib/nav";
import { useDocsLocale } from "@/lib/docs-locale";
import { localePath, routeIdentity, routeVisitKey } from "@/lib/paths";

/** The documentation index, shared by the desktop sidebar and the mobile sheet. */
export function DocsNav({ onNavigate, className }: { onNavigate?: () => void; className?: string }) {
  const locale = useDocsLocale();
  const sections = navSections(locale);
  const { pathname } = useLocation();
  const visit = routeVisitKey(pathname);
  const root = useRef<HTMLElement>(null);

  // Keep the current entry visible inside the sidebar's own scroll area.
  useLayoutEffect(() => {
    const nav = root.current;
    const current = nav?.querySelector<HTMLElement>('[aria-current="page"]');
    const viewport = nav?.closest<HTMLElement>('[data-slot="scroll-area-viewport"]');
    if (!current || !viewport) return;
    const item = current.getBoundingClientRect();
    const box = viewport.getBoundingClientRect();
    if (item.top < box.top + 8 || item.bottom > box.bottom - 8) {
      viewport.scrollTop += item.top - box.top - box.height / 3;
    }
  }, [visit]);

  return (
    <nav aria-label="文档导航" className={cn("flex flex-col gap-6 text-body", className)} ref={root}>
      {sections.map((section) => (
        <div className="flex flex-col gap-1" key={section.title}>
          <p className="px-2.5 pb-1 font-medium text-foreground-strong text-caption">{section.title}</p>
          <ul className="flex flex-col gap-px">
            {section.items.map((item) => (
              <li key={routeIdentity(item.path)}>
                <NavLink
                  className={({ isActive }) =>
                    cn(
                      "focus-ring flex min-h-8 items-center gap-2 rounded-md px-2.5 py-1 transition-colors pointer-coarse:min-h-10",
                      isActive
                        ? "bg-accent font-medium text-foreground-strong"
                        : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
                    )
                  }
                  end
                  onClick={onNavigate}
                  to={localePath(routeIdentity(item.path) === routeIdentity(pathname) ? pathname : item.path, locale)}
                >
                  {/* The Chinese name is the label; the English hint is a recall aid. `min-w-0`
                      lets the hint shrink so the label never truncates — `truncate` alone only
                      clips a box the flex item refuses to shrink below its min-content width. */}
                  <span className="shrink-0">{item.title}</span>
                  {item.hint ? <span className="min-w-0 truncate text-foreground-subtle text-caption">{item.hint}</span> : null}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
