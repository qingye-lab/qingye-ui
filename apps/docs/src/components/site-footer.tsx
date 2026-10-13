import { linkClassName } from "@qingye_lab/ui/components/link";
import { navLabel } from "@/lib/nav";
import { useDocsLocale } from "@/lib/docs-locale";
import { PATHS } from "@/lib/paths";
import { SITE } from "@/lib/site";
import { Link } from "./locale-link";

/*
 * The documentation pages' footer: the version and licence on the start side, the way to the
 * other regions on the end side. It stands on the site frame (the header's own width), has no
 * rule above it (the space under the paper already ends the page, 2 材 set by DocsLayout) and
 * sits muted at the support step. The home page uses it too.
 */
export function SiteFooter() {
  const locale = useDocsLocale();
  const en = locale === "en";
  return (
    <footer className="site-frame flex flex-wrap items-center justify-between gap-x-(--qy-section-gap) gap-y-(--qy-field-gap) pb-(--qy-section-gap) text-support text-muted-foreground">
      <span>{en ? `Qingye UI ${SITE.version}, MIT License` : `Qingye UI ${SITE.version}，MIT 许可`}</span>
      <nav aria-label={en ? "Footer" : "页脚"} className="flex flex-wrap gap-x-(--qy-field-group-gap) gap-y-(--qy-field-gap)">
        <Link className={linkClassName} to={PATHS.docs}>{navLabel("文档", locale)}</Link>
        <Link className={linkClassName} to={PATHS.components}>{navLabel("组件", locale)}</Link>
        <Link className={linkClassName} to={PATHS.examples}>{navLabel("示例", locale)}</Link>
        <a className={linkClassName} href={SITE.repo} rel="noreferrer" target="_blank">GitHub</a>
      </nav>
    </footer>
  );
}
