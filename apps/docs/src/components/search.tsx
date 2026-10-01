import { Button } from "@qingye/ui/components/button";
import { Kbd, KbdGroup } from "@qingye/ui/components/kbd";
import { cn } from "@qingye/ui/utils";
import { SearchIcon } from "lucide-react";
import { createContext, lazy, Suspense, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";

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
  useEffect(() => setOpen(false), [pathname]);

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
  const { openSearch } = useSearch();
  const [mac, setMac] = useState(true);
  useEffect(() => setMac(isMac()), []);
  return (
    <>
      <Button
        aria-keyshortcuts={mac ? "Meta+K" : "Control+K"}
        className={cn(
          "hidden h-8 w-56 justify-start gap-2 ps-2.5 pe-1.5 font-normal text-muted-foreground shadow-none md:inline-flex lg:w-64 sm:h-8",
          className,
        )}
        onClick={openSearch}
        variant="outline"
      >
        <SearchIcon aria-hidden="true" />
        <span className="flex-1 text-start">搜索文档…</span>
        <KbdGroup>
          <Kbd>{mac ? "⌘" : "Ctrl"}</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </Button>
      <Button aria-label="搜索文档" className="md:hidden" onClick={openSearch} size="icon" variant="ghost">
        <SearchIcon aria-hidden="true" />
      </Button>
    </>
  );
}
