import { SheetHeader, SheetPanel, SheetPopup, SheetTitle } from "@yanqing/ui/components/sheet";
import { TooltipPopup } from "@yanqing/ui/components/tooltip";
import { Button } from "@yanqing/ui/components/button";
import { Sheet, SheetTrigger } from "@yanqing/ui/components/sheet";
import { Tooltip, TooltipTrigger } from "@yanqing/ui/components/tooltip";
import { cn } from "@yanqing/ui";
import { MenuIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { SITE } from "@/lib/site";
import { focusPageHeading } from "@/lib/use-route-effects";
import { DocsNav } from "./docs-nav";
import { GitHubIcon, LogoMark } from "./logo";
import { SearchTrigger } from "./search";
import { ThemeMenu } from "./theme-menu";

const topLinks = [
  { to: "/docs", label: "文档", match: (path: string) => path.startsWith("/docs") && !path.startsWith("/docs/components") },
  { to: "/docs/components", label: "组件", match: (path: string) => path.startsWith("/docs/components") },
];

export function Wordmark({ className }: { className?: string }) {
  return (
    <Link aria-label={`${SITE.name} 首页`} className={cn("focus-ring flex items-center gap-2 rounded-md", className)} to="/">
      <LogoMark className="text-foreground-strong" />
      <span className="font-semibold text-[0.9375rem] text-foreground-strong">{SITE.name}</span>
    </Link>
  );
}

function MobileNav() {
  const [open, setOpen] = useState(false);
  const navigated = useRef(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);
  return (
    <Sheet
      onOpenChange={(next) => {
        if (next) navigated.current = false;
        setOpen(next);
      }}
      open={open}
    >
      <SheetTrigger render={<Button aria-label="打开导航" className="-ms-2 lg:hidden" size="icon" variant="ghost" />}>
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
  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="mx-auto flex h-(--docs-header-height) w-full max-w-[90rem] items-center gap-2 px-4 sm:px-6 lg:px-8">
        <MobileNav />
        <Wordmark className="me-4" />
        <nav aria-label="主导航" className="hidden items-center gap-1 md:flex">
          {topLinks.map((link) => {
            const active = link.match(pathname);
            return (
              <Link
                aria-current={active ? "page" : undefined}
                className={cn(
                  "focus-ring rounded-md px-2.5 py-1.5 text-sm transition-colors",
                  active ? "font-medium text-foreground-strong" : "text-muted-foreground hover:text-foreground",
                )}
                key={link.to}
                to={link.to}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="ms-auto flex items-center gap-1">
          <SearchTrigger className="me-1" />
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  aria-label="GitHub 仓库"
                  nativeButton={false}
                  render={<a href={SITE.repo} rel="noreferrer" target="_blank" />}
                  size="icon"
                  variant="ghost"
                />
              }
            >
              <GitHubIcon className="size-4" />
            </TooltipTrigger>
            <TooltipPopup>GitHub</TooltipPopup>
          </Tooltip>
          <ThemeMenu />
        </div>
      </div>
    </header>
  );
}
