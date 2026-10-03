import { Fragment, useLayoutEffect, useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { languageTag, splitLocalePath } from "./paths";

export function useDocsLocale() {
  return splitLocalePath(useLocation().pathname).locale;
}

/**
 * Commit lang before rendering locale consumers. DataTable memoizes its
 * document collator on mount, so a language change must also remount content.
 */
export function DocsLanguageBoundary({ children }: { children: ReactNode }) {
  const locale = useDocsLocale();
  const [committed, setCommitted] = useState<string | null>(null);
  useLayoutEffect(() => {
    document.documentElement.lang = languageTag(locale);
    setCommitted(locale);
  }, [locale]);
  return committed === locale ? <Fragment key={locale}>{children}</Fragment> : null;
}
