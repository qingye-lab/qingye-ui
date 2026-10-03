import { Link } from "@/components/locale-link";
import { SheetHeader, SheetPanel, SheetPopup, SheetTitle } from "@qingye/ui/components/sheet";
import { Button, buttonVariants } from "@qingye/ui/components/button";
import { Sheet, SheetTrigger } from "@qingye/ui/components/sheet";
import { cn } from "@qingye/ui";
import { MenuIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { SITE } from "@/lib/site";
import { focusPageHeading } from "@/lib/use-route-effects";
import { DocsNav } from "./docs-nav";
import { GitHubIcon, LogoMark } from "./logo";
import { SearchTrigger } from "./search";
import { ThemeMenu } from "./theme-menu";
import { LanguageSwitch } from "./language-switch";
import { navLabel } from "@/lib/nav";
import { useDocsLocale } from "@/lib/docs-locale";
import { PATHS, routeIdentity, routeVisitKey } from "@/lib/paths";

const topLinks = [
  { to: PATHS.examples, label: "示例", match: (path: string) => path.startsWith(PATHS.examples) },
  { to: PATHS.docs, label: "文档", match: (path: string) => path.startsWith(PATHS.docs) && !path.startsWith(PATHS.components) },
  { to: PATHS.components, label: "组件", match: (path: string) => path.startsWith(PATHS.components) },
];

export function Wordmark({ className }: { className?: string }) {
  return (
    <Link aria-label={`${SITE.name} 首页`} className={cn("focus-ring flex items-center gap-2 rounded-md", className)} to="/">
      <LogoMark className="text-foreground-strong" />
      <span className="font-semibold text-reading text-foreground-strong">青野 <span className="text-muted-foreground font-medium">UI</span></span>
    </Link>
  );
}

function MobileNav() {
  const [open, setOpen] = useState(false);
  const navigated = useRef(false);
  const { pathname } = useLocation();
  const visit = routeVisitKey(pathname);
  useEffect(() => setOpen(false), [visit]);
  return (
    <Sheet
      onOpenChange={(next) => {
        if (next) navigated.current = false;
        setOpen(next);
      }}
      open={open}
    >
      <SheetTrigger render={<Button shape="icon" aria-label="打开导航" className="-ms-2 lg:hidden" size="md" variant="quiet" />}>
        <MenuIcon aria-hidden="true" />
      </SheetTrigger>
      <SheetPopup
        className="w-[min(20rem,calc(100%-3rem))]"
        finalFocus={() => {
          if (!navigated.current) return true;
          focusPageHeading();
          return false;
        }}
        side="left"
      >
        <SheetHeader className="pb-2">
          <SheetTitle className="sr-only">文档导航</SheetTitle>
          <Wordmark className="self-start" />
        </SheetHeader>
        <SheetPanel className="px-3.5 pt-2">
          <nav aria-label="演示导航" className="mb-4 border-b pb-3"><Link className="focus-ring block rounded-lg px-2.5 py-2 text-body font-medium" to="/examples" onClick={() => { navigated.current = true; setOpen(false); }}>完整示例</Link></nav>
          <DocsNav
            onNavigate={() => {
              navigated.current = true;
              setOpen(false);
            }}
          />
        </SheetPanel>
      </SheetPopup>
    </Sheet>
  );
}

export function SiteHeader() {
  const { pathname } = useLocation();
  const locale = useDocsLocale();
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    const element = header.current;
    if (!element) return;
    const style = document.documentElement.style;
    const previousHeight = style.getPropertyValue("--docs-header-height");
    const measure = () => {
      const height = element.getBoundingClientRect().height;
      if (height > 0) style.setProperty("--docs-header-height", `${height}px`);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => {
      observer.disconnect();
      if (previousHeight) style.setProperty("--docs-header-height", previousHeight);
      else style.removeProperty("--docs-header-height");
    };
  }, []);
  return (
    <header className="sticky top-0 z-40 border-b bg-background" ref={header}>
      <div className="mx-auto flex min-h-14 w-full max-w-[90rem] flex-wrap items-center gap-(--qy-space-2) px-4 py-(--qy-space-2) sm:px-6 lg:px-8">
        <MobileNav />
        <Wordmark className="me-4" />
        <nav aria-label="主导航" className="hidden min-w-0 flex-wrap items-center gap-(--qy-space-1) md:flex">
          {topLinks.map((link) => {
            const active = link.match(routeIdentity(pathname));
            return (
              <Link
                aria-current={active ? "page" : undefined}
                className={cn(
                  "focus-ring rounded-md px-2.5 py-1.5 text-body transition-colors",
                  active ? "font-medium text-foreground-strong" : "text-muted-foreground hover:text-foreground",
                )}
                key={link.to}
                to={link.to}
              >
                {navLabel(link.label, locale)}
              </Link>
            );
          })}
        </nav>
        <div className="ms-auto flex min-w-0 max-w-full flex-wrap items-center justify-end gap-(--qy-space-1)">
          <SearchTrigger className="me-1" />
          <a
            aria-label="GitHub 仓库"
            className={buttonVariants({ shape: "icon", size: "md", variant: "quiet" })}
            href={SITE.repo}
            rel="noreferrer"
            target="_blank"
          >
            <GitHubIcon className="size-4" />
          </a>
          <LanguageSwitch />
          <ThemeMenu />
        </div>
      </div>
    </header>
  );
}
