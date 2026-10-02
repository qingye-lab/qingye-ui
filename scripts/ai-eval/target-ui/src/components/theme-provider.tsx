"use client";

import * as React from "react";

export type Theme = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

type ThemeContextValue = {
  /** The user's choice, including `system`. */
  theme: Theme;
  /** What is actually applied right now. */
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext: React.Context<ThemeContextValue | null> =
  React.createContext<ThemeContextValue | null>(null);

export type ThemeProviderProps = {
  children: React.ReactNode;
  /** Used when nothing is stored yet. */
  defaultTheme?: Theme;
  /** localStorage key. Set to `null` to skip persistence. */
  storageKey?: string | null;
  /** How the theme is written to `<html>`: a `.dark` class or `data-theme`. */
  attribute?: "class" | "data-theme";
  /**
   * Suppress CSS transitions for one frame while the theme flips, so every
   * surface changes together instead of fading at different speeds.
   */
  disableTransitionOnChange?: boolean;
};

const DARK_QUERY = "(prefers-color-scheme: dark)";

function systemTheme(): ResolvedTheme {
  if (typeof window === "undefined" || !window.matchMedia) return "light";
  return window.matchMedia(DARK_QUERY).matches ? "dark" : "light";
}

function readStored(key: string | null): Theme | null {
  if (!key || typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(key);
    return value === "light" || value === "dark" || value === "system" ? value : null;
  } catch {
    return null;
  }
}

function apply(resolved: ResolvedTheme, attribute: "class" | "data-theme", quiet: boolean) {
  const root = document.documentElement;
  let restore: (() => void) | undefined;
  if (quiet) {
    const style = document.createElement("style");
    style.textContent = "*,*::before,*::after{transition:none!important}";
    document.head.appendChild(style);
    restore = () => {
      // Force a style flush before re-enabling transitions.
      void window.getComputedStyle(document.body).opacity;
      requestAnimationFrame(() => style.remove());
    };
  }
  if (attribute === "class") {
    root.classList.toggle("dark", resolved === "dark");
    root.classList.toggle("light", resolved === "light");
  } else {
    root.setAttribute("data-theme", resolved);
  }
  root.style.colorScheme = resolved;
  restore?.();
}

/**
 * Owns the colour scheme for the whole document. Mount once near the root.
 * Pair it with an inline script in `<head>` that applies the stored theme
 * before first paint; see the theming guide.
 */
export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "yq-theme",
  attribute = "class",
  disableTransitionOnChange = true,
}: ThemeProviderProps): React.ReactElement {
  const [theme, setThemeState] = React.useState<Theme>(
    () => readStored(storageKey) ?? defaultTheme,
  );
  const [system, setSystem] = React.useState<ResolvedTheme>(systemTheme);
  const resolvedTheme: ResolvedTheme = theme === "system" ? system : theme;
  const firstRun = React.useRef(true);

  React.useEffect(() => {
    if (!window.matchMedia) return;
    const query = window.matchMedia(DARK_QUERY);
    const onChange = () => setSystem(query.matches ? "dark" : "light");
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // Follow changes made in another tab.
  React.useEffect(() => {
    if (!storageKey) return;
    const onStorage = (event: StorageEvent) => {
      if (event.key !== storageKey) return;
      const value = event.newValue;
      setThemeState(value === "light" || value === "dark" || value === "system" ? value : defaultTheme);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [storageKey, defaultTheme]);

  React.useEffect(() => {
    apply(resolvedTheme, attribute, disableTransitionOnChange && !firstRun.current);
    firstRun.current = false;
  }, [resolvedTheme, attribute, disableTransitionOnChange]);

  const setTheme = React.useCallback(
    (next: Theme) => {
      setThemeState(next);
      if (!storageKey) return;
      try {
        window.localStorage.setItem(storageKey, next);
      } catch {
        // Storage can be unavailable (private mode); the choice still applies.
      }
    },
    [storageKey],
  );

  const value = React.useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export type ThemeScriptOptions = Pick<
  ThemeProviderProps,
  "defaultTheme" | "storageKey" | "attribute"
>;

/**
 * Source of the inline script that applies the stored theme before first
 * paint. Put it in `<head>`, ahead of any stylesheet, with the same options
 * as the provider: paste the string into `index.html`, or render
 * `<script dangerouslySetInnerHTML={{ __html: themeScript() }} />` from a
 * server-rendered layout.
 */
export function themeScript({
  defaultTheme = "system",
  storageKey = "yq-theme",
  attribute = "class",
}: ThemeScriptOptions = {}): string {
  const key = JSON.stringify(storageKey);
  const fallback = JSON.stringify(defaultTheme);
  const write =
    attribute === "class"
      ? 'r.classList.toggle("dark",d);r.classList.toggle("light",!d)'
      : 'r.setAttribute("data-theme",d?"dark":"light")';
  return `(function(){try{var k=${key},t=null;if(k)try{t=localStorage.getItem(k)}catch(e){}if(t!=="light"&&t!=="dark"&&t!=="system")t=${fallback};var d=t==="dark"||(t==="system"&&matchMedia("(prefers-color-scheme: dark)").matches),r=document.documentElement;${write};r.style.colorScheme=d?"dark":"light"}catch(e){}})()`;
}

export function useTheme(): ThemeContextValue {
  const context = React.useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside <ThemeProvider>.");
  return context;
}
