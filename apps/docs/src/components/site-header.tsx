import { Link } from "@/components/locale-link";
import { buttonVariants } from "@qingye_lab/ui/components/button";
import { Inline } from "@qingye_lab/ui/components/layout";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@qingye_lab/ui/components/navigation-menu";
import { cn } from "@qingye_lab/ui/utils";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { SITE } from "@/lib/site";
import { GitHubIcon, LogoMark } from "./logo";
import { SearchTrigger } from "./search";
import { ThemeMenu } from "./theme-menu";
import { LanguageSwitch } from "./language-switch";
import { navLabel, navScope } from "@/lib/nav";
import { useDocsLocale } from "@/lib/docs-locale";
import { PATHS, routeIdentity } from "@/lib/paths";
// 页头只有三个入口；理念、法度和各指南都在文档的侧栏里，页头只点亮当前页所属的一处。
const topLinks = [
  { to: PATHS.docs, label: "文档", match: (path: string) => path.startsWith(PATHS.docs) && navScope(path) === "docs" },
  { to: PATHS.components, label: "组件", match: (path: string) => navScope(path) === "components" },
  { to: PATHS.examples, label: "示例", match: (path: string) => path.startsWith(PATHS.examples) },
];
export function Wordmark({ className }: { className?: string }) {
  const locale = useDocsLocale(); return <Link aria-label={locale === "en" ? "Qingye UI home" : "Qingye UI 首页"} className={cn("focus-ring inline-flex items-center gap-(--qy-field-gap) rounded-item text-body-strong", className)} to="/"><LogoMark /><span>Qingye <span className="text-muted-foreground">UI</span></span></Link>;
}
export function SiteHeader() {
  const { pathname } = useLocation(); const locale = useDocsLocale(); const header = useRef<HTMLElement>(null);
  useEffect(() => { const element = header.current; if (!element) return; const style = document.documentElement.style; const previous = style.getPropertyValue("--docs-header-height"); const measure = () => { const height = element.getBoundingClientRect().height; if (height > 0) style.setProperty("--docs-header-height", `${height}px`); }; measure(); const observer = new ResizeObserver(measure); observer.observe(element); return () => { observer.disconnect(); if (previous) style.setProperty("--docs-header-height", previous); else style.removeProperty("--docs-header-height"); }; }, []);
  // 所有页面同一个页头：吸顶、同一条底线、同一个宽度（--site-width）。
  return <header className="docs-site-header sticky top-0 border-b border-border bg-background text-foreground" ref={header}><Inline className="site-frame min-h-(--qy-row-default) py-(--qy-field-gap)" gap="panel"><Wordmark /><NavigationMenu aria-label={locale === "en" ? "Main navigation" : "主导航"}><NavigationMenuList>{topLinks.map(link => <NavigationMenuItem key={link.to}><NavigationMenuLink active={link.match(routeIdentity(pathname))} render={<Link to={link.to} />}>{navLabel(link.label, locale)}</NavigationMenuLink></NavigationMenuItem>)}</NavigationMenuList></NavigationMenu><Inline className="ms-auto" gap="actions"><SearchTrigger /><a aria-label={locale === "en" ? "GitHub repository" : "GitHub 仓库"} className={buttonVariants({ shape: "icon", size: "md", variant: "quiet" })} href={SITE.repo} rel="noreferrer" target="_blank"><GitHubIcon aria-hidden="true" /></a><LanguageSwitch /><ThemeMenu /></Inline></Inline></header>;
}
