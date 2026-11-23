import { useParams } from "react-router-dom";
import { A, Article, PageHeader, Ul } from "@/components/prose";
import { useDocsLocale } from "@/lib/docs-locale";
import { components } from "@/lib/registry";
import { localizedMeta } from "@/lib/localized-meta";
import { NotFoundContent } from "../not-found";
export function PatternsIndexPage() {
  const locale = useDocsLocale(); const en = locale === "en";
  const patterns = components.filter(entry => entry.layer === "pattern");
  return <Article><PageHeader title={en ? "Composition" : "组件组合"} />
    <Ul>{patterns.map(entry => <li key={entry.slug}><A href={`/components/${entry.slug}`}>{localizedMeta(entry, locale).title}</A></li>)}</Ul>
  </Article>;
}
export default function PatternPage() { const { slug } = useParams(); const locale = useDocsLocale(); return <NotFoundContent detail={locale === "en" ? `No page named “${slug}”. Composed components are listed under Composition.` : `没有名为“${slug}”的页面。组合组件列在「组件组合」页。`} />; }
