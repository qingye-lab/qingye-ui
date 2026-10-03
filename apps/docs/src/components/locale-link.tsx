import { Link as RouterLink, type LinkProps } from "react-router-dom";
import { useDocsLocale } from "@/lib/docs-locale";
import { localePath } from "@/lib/paths";

/** Localizes absolute page links; relative links retain React Router semantics. */
export function Link({ to, ...props }: LinkProps) {
  const locale = useDocsLocale();
  const target = typeof to === "string"
    ? localePath(to, locale)
    : { ...to, ...(to.pathname ? { pathname: localePath(to.pathname, locale) } : {}) };
  return <RouterLink to={target} {...props} />;
}
