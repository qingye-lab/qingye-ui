import { useEffect, useLayoutEffect, useRef, type MouseEvent as ReactMouseEvent } from "react";
import { useLocation, useNavigate, useNavigationType } from "react-router-dom";
import { routeVisitKey, scrollPositionKey } from "./paths";

const STORAGE_KEY = "yq-docs-scroll";

function readPositions(): Map<string, number> {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return new Map(raw ? (JSON.parse(raw) as [string, number][]) : []);
  } catch {
    return new Map();
  }
}

const positions = typeof window === "undefined" ? new Map<string, number>() : readPositions();

function persist() {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify([...positions].slice(-50)));
  } catch {
    // Storage can be unavailable; restoration then works only within the session.
  }
}

const instant = (top: number) => window.scrollTo({ top, behavior: "instant" });

/**
 * Lazy pages and demos settle over a few frames, so a target may not exist (or
 * the page may not be tall enough) yet. Keep trying briefly, and give up the
 * moment the reader scrolls on their own.
 */
function settle(attempt: () => boolean, timeout = 1500) {
  const started = performance.now();
  let frame = 0;
  let cancelled = false;
  const cancel = () => {
    cancelled = true;
    cancelAnimationFrame(frame);
    for (const type of ["wheel", "touchstart", "keydown", "pointerdown"]) window.removeEventListener(type, cancel);
  };
  for (const type of ["wheel", "touchstart", "keydown", "pointerdown"]) window.addEventListener(type, cancel, { passive: true });
  const tick = () => {
    if (cancelled) return;
    if (attempt() || performance.now() - started > timeout) return cancel();
    frame = requestAnimationFrame(tick);
  };
  tick();
  return cancel;
}

export function scrollToHash(hash: string, smooth = false): boolean {
  let id: string;
  try {
    id = decodeURIComponent(hash.replace(/^#/, ""));
  } catch {
    // A malformed incoming URL has no reachable section.
    return false;
  }
  const target = id ? document.getElementById(id) : null;
  if (!target) return false;
  target.scrollIntoView({ block: "start", behavior: smooth ? "smooth" : "instant" });
  return true;
}

/** Prefer the page's H1; heading-free surfaces enter at their main landmark. */
export function focusPageHeading() {
  const main = document.querySelector<HTMLElement>("main");
  if (!main || main.closest('[aria-busy="true"]')) return false;
  const heading = [...main.querySelectorAll<HTMLElement>("h1")].find((element) =>
    !element.closest('[hidden], [inert], [aria-hidden="true"]') &&
    (!element.checkVisibility || element.checkVisibility({ visibilityProperty: true })),
  );
  const target = heading ?? main;
  if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
  target.focus({ preventScroll: true });
  return document.activeElement === target;
}

/**
 * Scroll restoration and focus management for BrowserRouter:
 * new pages start at the top (or at their #hash), back/forward restores the
 * previous position, and focus moves to the new page's heading.
 */
export function useRouteEffects() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const previous = useRef<{ key: string; pathname: string; focused: boolean } | null>(null);
  // Which history entry scroll events belong to. Updated during commit, before
  // this route scrolls, so the reset to the top is never saved for the old page.
  const currentKey = useRef(scrollPositionKey(location.key, location.pathname));

  useLayoutEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    const save = () => persist();
    window.addEventListener("pagehide", save);
    return () => window.removeEventListener("pagehide", save);
  }, []);

  // Remember the position for the current history entry while the reader scrolls.
  useEffect(() => {
    const onScroll = () => positions.set(currentKey.current, window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useLayoutEffect(() => {
    const last = previous.current;
    currentKey.current = scrollPositionKey(location.key, location.pathname);
    // StrictMode re-runs effects for the same entry; treat that as the same visit.
    const rerun = last?.key === location.key;
    const first = last === null || (rerun && !last.focused);
    const visit = routeVisitKey(location.pathname);
    const samePage = !rerun && last?.pathname === visit;
    previous.current = { key: location.key, pathname: visit, focused: !first };

    if (samePage) {
      // In-page anchors handle their own scrolling; back/forward between them is restored here.
      if (navigationType === "POP") {
        const saved = positions.get(currentKey.current);
        if (saved !== undefined) instant(saved);
        else if (location.hash) scrollToHash(location.hash);
      }
      return;
    }

    let cancel: (() => void) | undefined;
    const localeSwitch = navigationType === "PUSH" && typeof location.state?.localeSwitchScroll === "number";
    // Fresh loads all share the "default" key, so only pushed entries are restored.
    const saved = location.key === "default" ? undefined : positions.get(currentKey.current);
    if (location.hash) {
      cancel = settle(() => scrollToHash(location.hash));
    } else if ((navigationType === "POP" && saved !== undefined) || localeSwitch) {
      const top = localeSwitch ? location.state.localeSwitchScroll as number : saved!;
      cancel = settle(() => {
        const reachable = document.documentElement.scrollHeight - window.innerHeight >= top - 1;
        instant(top);
        return reachable;
      });
    } else {
      instant(0);
    }
    // The route may still be showing its Suspense fallback during this commit.
    const cancelFocus = !first || localeSwitch ? settle(focusPageHeading) : undefined;
    return () => {
      cancel?.();
      cancelFocus?.();
    };
  }, [location.key, location.pathname, location.hash, navigationType]);
}

/** Click handler for in-page anchors: records the hash in history and scrolls there. */
export function useHashLink() {
  const navigate = useNavigate();
  return (event: ReactMouseEvent<HTMLAnchorElement>, id: string) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    const smooth = !matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (window.location.hash !== `#${id}`) navigate({ hash: id });
    scrollToHash(id, smooth);
  };
}
