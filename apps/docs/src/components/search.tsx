import { Button } from "@qingye_lab/ui/components/button";
import { Kbd } from "@qingye_lab/ui/components/kbd";
import { cn } from "@qingye_lab/ui/utils";
import { IconSearch } from "@tabler/icons-react";
import { createContext, lazy, Suspense, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { useDocsLocale } from "@/lib/docs-locale";
import { routeVisitKey } from "@/lib/paths";

const loadDialog = () => import("./search-dialog");
const SearchDialog = lazy(loadDialog);

const SearchContext = createContext<{ openSearch: () => void }>({ openSearch: () => {} });

export const isMac = () => typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);

function isTyping(target: EventTarget | null) {
  const el = target as HTMLElement | null;
  return Boolean(el?.closest("input, textarea, select, [contenteditable=''], [contenteditable='true']"));
}

/** Owns the ⌘K dialog. The dialog code loads on first use (and is prefetched when idle). */
export function SearchProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { pathname } = useLocation();
  const visit = routeVisitKey(pathname);

  const openSearch = useCallback(() => {
    setMounted(true);
    setOpen(true);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey) && !event.altKey) {
        event.preventDefault();
        setMounted(true);
        setOpen((value) => !value);
      } else if (event.key === "/" && !event.metaKey && !event.ctrlKey && !isTyping(event.target)) {
        event.preventDefault();
        openSearch();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openSearch]);

  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((fn: () => void) => window.setTimeout(fn, 1500));
    const id = idle(() => void loadDialog());
    return () => (window.cancelIdleCallback ?? window.clearTimeout)(id);
  }, []);

  // Any navigation closes the palette.
  useEffect(() => setOpen(false), [visit]);

  return (
    <SearchContext.Provider value={{ openSearch }}>
      {children}
      {mounted ? (
        <Suspense fallback={null}>
          <SearchDialog onOpenChange={setOpen} open={open} />
        </Suspense>
      ) : null}
    </SearchContext.Provider>
  );
}

export const useSearch = () => useContext(SearchContext);

export function SearchTrigger({ className }: { className?: string }) {
  const { openSearch } = useSearch(); const locale = useDocsLocale(); const label = locale === "en" ? "Search documentation" : "搜索文档";
  const [mac, setMac] = useState(true);
  useEffect(() => setMac(isMac()), []);
  return (
    <Button shape="label"
      aria-label={label}
      aria-keyshortcuts={mac ? "Meta+K" : "Control+K"}
      className={cn(
        "shrink-0 text-muted-foreground",
        className,
      )}
      onClick={openSearch}
      size="md"
      variant="quiet"
    >
      <IconSearch aria-hidden="true" />
      <span>{label}</span>
      <span className="hidden items-center gap-(--qy-space-1) md:inline-flex pointer-coarse:hidden">
        <Kbd>{mac ? "⌘" : "Ctrl"}</Kbd>
        <Kbd>K</Kbd>
      </span>
    </Button>
  );
}
