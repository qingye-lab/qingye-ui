import { createSidebarDrawerHandle, type SidebarDrawerHandle } from "@qingye_lab/ui/components/sidebar";
import { useMediaQuery } from "@qingye_lab/ui/hooks/use-media-query";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { PATHS, routeIdentity, routeVisitKey } from "@/lib/paths";

/** Whether the current route renders inside DocsLayout and owns the documentation sidebar. */
export function isDocsSidebarRoute(pathname: string): boolean {
  const identity = routeIdentity(pathname);
  return identity === PATHS.docs || identity.startsWith(`${PATHS.docs}/`);
}

type DocsSidebarDrawerState = {
  /** Shared handle for Sidebar's built-in drawer (< 40rem). */
  handle: SidebarDrawerHandle;
  /** Tablet range (40rem <= width < 64rem) where the desktop rail is hidden but Sidebar's max-sm drawer is inactive. */
  isTablet: boolean;
  tabletOpen: boolean;
  openTablet: (trigger: HTMLElement | null) => void;
  setTabletOpen: (open: boolean) => void;
  getTabletTrigger: () => HTMLElement | null;
};

const fallbackHandle = createSidebarDrawerHandle();

const DocsSidebarDrawerContext = createContext<DocsSidebarDrawerState>({
  handle: fallbackHandle,
  isTablet: false,
  tabletOpen: false,
  openTablet: () => {},
  setTabletOpen: () => {},
  getTabletTrigger: () => null,
});

export function DocsSidebarDrawerProvider({ children }: { children: ReactNode }) {
  const [handle] = useState(() => createSidebarDrawerHandle());
  const isTablet = useMediaQuery("sm:max-lg");
  const [tabletOpen, setTabletOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);
  const { pathname } = useLocation();
  const visit = routeVisitKey(pathname);

  useEffect(() => {
    if (!isTablet) setTabletOpen(false);
  }, [isTablet]);

  useEffect(() => {
    setTabletOpen(false);
  }, [visit]);

  const openTablet = useCallback((trigger: HTMLElement | null) => {
    triggerRef.current = trigger;
    setTabletOpen(true);
  }, []);

  const getTabletTrigger = useCallback(() => {
    const node = triggerRef.current;
    return node?.isConnected ? node : null;
  }, []);

  const value = useMemo(
    () => ({ handle, isTablet, tabletOpen, openTablet, setTabletOpen, getTabletTrigger }),
    [handle, isTablet, tabletOpen, openTablet, getTabletTrigger],
  );

  return <DocsSidebarDrawerContext.Provider value={value}>{children}</DocsSidebarDrawerContext.Provider>;
}

export function useDocsSidebarDrawer() {
  return useContext(DocsSidebarDrawerContext);
}
