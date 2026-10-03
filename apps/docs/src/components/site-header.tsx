import { Link } from "@/components/locale-link";
import { buttonVariants } from "@qingye/ui/components/button";
import { Inline } from "@qingye/ui/components/layout";
import { cn } from "@qingye/ui/utils";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { SITE } from "@/lib/site";
import { GitHubIcon, LogoMark } from "./logo";
import { SearchTrigger } from "./search";
import { ThemeMenu } from "./theme-menu";
import { LanguageSwitch } from "./language-switch";
import { navLabel } from "@/lib/nav";
import { useDocsLocale } from "@/lib/docs-locale";
import { PATHS, routeIdentity } from "@/lib/paths";
const topLinks = [{ to: PATHS.examples, label: "示例", match: (path: string) => path.startsWith(PATHS.examples) }, { to: PATHS.docs, label: "文档", match: (path: string) => path.startsWith(PATHS.docs) && !path.startsWith(PATHS.components) }, { to: PATHS.components, label: "组件", match: (path: string) => path.startsWith(PATHS.components) }];
export function Wordmark({ className }: { className?: string }) {
  const locale = useDocsLocale(); return <Link aria-label={locale === "en" ? "Qingye UI home" : "Qingye UI 首页"} className={cn("focus-ring inline-flex items-center gap-(--qy-field-gap) rounded-item text-body-strong", className)} to="/"><LogoMark /><span>Qingye <span className="text-muted-foreground">UI</span></span></Link>;
}
export function SiteHeader() {
  const { pathname } = useLocation(); const locale = useDocsLocale(); const header = useRef<HTMLElement>(null);
  useEffect(() => { const element = header.current; if (!element) return; const style = document.documentElement.style; const previous = style.getPropertyValue("--docs-header-height"); const measure = () => { const height = element.getBoundingClientRect().height; if (height > 0) style.setProperty("--docs-header-height", `${height}px`); }; measure(); const observer = new ResizeObserver(measure); observer.observe(element); return () => { observer.disconnect(); if (previous) style.setProperty("--docs-header-height", previous); else style.removeProperty("--docs-header-height"); }; }, []);
  return <header className="docs-site-header sticky top-0 border-b border-border bg-background" ref={header}><Inline className="mx-auto min-h-(--qy-row-default) w-full max-w-[90rem] px-(--qy-panel-padding) py-(--qy-field-gap)" gap="panel"><Wordmark /><nav aria-label={locale === "en" ? "Main navigation" : "主导航"}><Inline>{topLinks.map(link => <Link aria-current={link.match(routeIdentity(pathname)) ? "page" : undefined} className={cn("focus-ring touch-target rounded-item px-(--qy-field-gap) text-body", link.match(routeIdentity(pathname)) ? "text-body-strong text-foreground" : "text-muted-foreground")} key={link.to} to={link.to}>{navLabel(link.label, locale)}</Link>)}</Inline></nav><Inline className="ms-auto" gap="actions"><SearchTrigger /><a aria-label={locale === "en" ? "GitHub repository" : "GitHub 仓库"} className={buttonVariants({ shape: "icon", size: "md", variant: "quiet" })} href={SITE.repo} rel="noreferrer" target="_blank"><GitHubIcon aria-hidden="true" /></a><LanguageSwitch /><ThemeMenu /></Inline></Inline></header>;
}
