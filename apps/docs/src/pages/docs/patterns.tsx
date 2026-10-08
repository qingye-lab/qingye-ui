import { useParams } from "react-router-dom";
import { A, PageHeader, Ul } from "@/components/prose";
import { useDocsLocale } from "@/lib/docs-locale";
import { components } from "@/lib/registry";
import { localizedMeta } from "@/lib/localized-meta";
import { NotFoundContent } from "../not-found";
export function PatternsIndexPage() {
  const locale = useDocsLocale(); const en = locale === "en";
  const patterns = components.filter(entry => entry.layer === "pattern");
  return <article><PageHeader title={en ? "Composition" : "组件组合"} description={en ? "Compose components around your application's objects, drafts, selection scope and confirmed results." : "围绕应用自己的对象、草稿、选择范围与已确认结果组合组件。"} />
    <Ul>{patterns.map(entry => <li key={entry.slug}><A href={`/components/${entry.slug}`}>{localizedMeta(entry, locale).title}</A></li>)}</Ul>
  </article>;
}
export default function PatternPage() { const { slug } = useParams(); const locale = useDocsLocale(); return <NotFoundContent detail={locale === "en" ? `No page named “${slug}”. Composed components are listed under Composition.` : `没有名为“${slug}”的页面。组合组件列在「组件组合」页。`} />; }
