import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarLink, SidebarSub, SidebarSubContent, SidebarSubTrigger } from "@qingye_lab/ui/components/sidebar";
import { useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { navSections, type NavItem, type NavSection } from "@/lib/nav";
import { useDocsLocale } from "@/lib/docs-locale";
import { localePath, routeIdentity, routeVisitKey } from "@/lib/paths";

/*
 * One index for the whole documentation area, built from the library's Sidebar:
 * the same entries in the same place on every page. Guides are listed by reading
 * order; the component categories fold under the 组件 group so the tree stays
 * short, and the category holding the current page is open.
 */
function Entry({ item, current, onNavigate }: { item: NavItem; current: string; onNavigate: (() => void) | undefined }) {
  const locale = useDocsLocale();
  const { pathname } = useLocation();
  const active = routeIdentity(item.path) === current;
  return (
    <SidebarLink active={active} render={<Link onClick={onNavigate} to={active ? pathname : localePath(item.path, locale)} />}>
      {/* The Chinese name is the label; the English API name is a recall aid that wraps under it when the rail is narrow. */}
      <span>{item.title}</span>
      {item.hint ? <span className="ms-(--qy-control-content-gap) text-caption text-muted-foreground">{item.hint}</span> : null}
    </SidebarLink>
  );
}

/** Plain sections first, then the collapsible categories continue the last of them as one group. */
function groupSections(sections: NavSection[]) {
  const groups: { title: string; items: NavItem[]; subs: NavSection[] }[] = [];
  for (const section of sections) {
    if (section.collapsible) groups.at(-1)?.subs.push(section);
    else groups.push({ title: section.title, items: section.items, subs: [] });
  }
  return groups;
}

/** The documentation index in the desktop sidebar. */
export function DocsNav({ onNavigate, className }: { onNavigate?: () => void; className?: string }) {
  const locale = useDocsLocale();
  const sections = navSections(locale);
  const { pathname } = useLocation();
  const visit = routeVisitKey(pathname);
  const current = routeIdentity(pathname);
  const root = useRef<HTMLElement>(null);
  const holder = sections.find((section) => section.collapsible && section.items.some((item) => routeIdentity(item.path) === current))?.title;
  // A category the reader folded stays folded, until a page inside it is opened.
  const [opened, setOpened] = useState<Record<string, boolean>>({});
  const [seen, setSeen] = useState(visit);
  if (seen !== visit) {
    setSeen(visit);
    if (holder) setOpened((state) => ({ ...state, [holder]: true }));
  }

  // Keep the current entry visible inside the sidebar's own scroll area.
  useLayoutEffect(() => {
    const nav = root.current;
    const entry = nav?.querySelector<HTMLElement>('[aria-current="page"]');
    const viewport = nav?.closest<HTMLElement>('[data-slot="scroll-area"]');
    if (!entry || !viewport) return;
    const item = entry.getBoundingClientRect();
    const box = viewport.getBoundingClientRect();
    if (item.top < box.top) viewport.scrollTop += item.top - box.top;
    else if (item.bottom > box.bottom) viewport.scrollTop += item.bottom - box.bottom;
  }, [visit]);

  return (
    <Sidebar className={className}>
      <SidebarContent aria-label={locale === "en" ? "Documentation navigation" : "文档导航"} ref={root}>
        {groupSections(sections).map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            {group.items.map((item) => <Entry current={current} item={item} key={routeIdentity(item.path)} onNavigate={onNavigate} />)}
            {group.subs.map((sub) => (
              <SidebarSub key={sub.title} onOpenChange={(open) => setOpened((state) => ({ ...state, [sub.title]: open }))} open={opened[sub.title] ?? sub.title === holder}>
                <SidebarSubTrigger>{sub.title}</SidebarSubTrigger>
                <SidebarSubContent>
                  {sub.items.map((item) => <Entry current={current} item={item} key={routeIdentity(item.path)} onNavigate={onNavigate} />)}
                </SidebarSubContent>
              </SidebarSub>
            ))}
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
