import { Link } from "@/components/locale-link";
import { useParams } from "react-router-dom";
import { PageHeader, P } from "@/components/prose";
import { useDocsLocale } from "@/lib/docs-locale";
import { components } from "@/lib/registry";
import { localizedMeta } from "@/lib/localized-meta";
import { NotFoundContent } from "../not-found";
export function PatternsIndexPage() { const locale = useDocsLocale(); return <article><PageHeader title={locale === "en" ? "Composition" : "组件组合"} /><P>{locale === "en" ? "Combine current components around your application’s objects, drafts, selection scope and confirmed results." : "围绕应用自己的对象、草稿、选择范围与已确认结果组合组件。"}</P><p><Link className="focus-ring rounded-item underline" to="/examples">{locale === "en" ? "Open simple compositions" : "打开简单组合"}</Link></p><ul className="grid grid-cols-2 gap-(--qy-panel-gap) mt-(--qy-section-gap)">{components.filter(entry => entry.layer === "pattern").map(entry => <li key={entry.slug}><Link className="focus-ring rounded-item underline" to={`/components/${entry.slug}`}>{localizedMeta(entry, locale).title}</Link></li>)}</ul></article>; }
export default function PatternPage() { const { slug } = useParams(); const locale = useDocsLocale(); return <NotFoundContent detail={locale === "en" ? `No task application exists for “${slug}”. Use current component compositions.` : `没有名为“${slug}”的任务应用，请使用当前组件组合。`} />; }
