import { Link } from "@/components/locale-link";
import { Card } from "@qingye/ui/components/card";
import { Stack } from "@qingye/ui/components/layout";
import { ComponentPreview } from "@/components/component-preview";
import { ContentBoundary } from "@/components/content-boundary";
import { PageHeader } from "@/components/prose";
import { PageState } from "@/components/page-state";
import { useParams } from "react-router-dom";
import { findComponent } from "@/lib/registry";
import { localizedMeta } from "@/lib/localized-meta";
import { useDocsLocale } from "@/lib/docs-locale";
const slugs = ["input-group", "tabs", "filter-bar", "bulk-action-bar", "data-table", "toolbar"];
export function ExamplesPage() {
  const locale = useDocsLocale(); return <main id="main" tabIndex={-1} className="mx-auto w-full max-w-[72rem] px-(--qy-panel-padding) py-(--qy-section-gap)"><PageHeader title={locale === "en" ? "Simple compositions" : "简单组合"} /><div className="grid grid-cols-2 gap-(--qy-section-gap)">{slugs.map(slug => { const found = findComponent(slug); if (!found) return null; const entry = localizedMeta(found, locale); return <Card key={slug} className="p-(--qy-panel-padding)"><Stack><Link className="focus-ring rounded-item text-heading" to={`/examples/${slug}`}>{entry.title}</Link><p className="m-0 text-support text-muted-foreground">{entry.description}</p><ContentBoundary title={locale === "en" ? "Example unavailable" : "示例暂时无法显示"}><ComponentPreview slug={slug} /></ContentBoundary></Stack></Card>; })}</div></main>;
}
export default function ExamplePage() {
  const { slug = "" } = useParams(); const locale = useDocsLocale(); const found = slugs.includes(slug) ? findComponent(slug) : undefined;
  if (!found) return <main id="main" tabIndex={-1} className="mx-auto max-w-[72rem] p-(--qy-panel-padding)"><PageState state="not-applicable" headingLevel={1} title={locale === "en" ? "Example not found" : "示例不存在"}><Link className="focus-ring rounded-item underline" to="/examples">{locale === "en" ? "Browse compositions" : "查看简单组合"}</Link></PageState></main>;
  const entry = localizedMeta(found, locale); return <main id="main" tabIndex={-1} className="mx-auto max-w-[48rem] p-(--qy-panel-padding)"><PageHeader title={entry.title} description={entry.description} /><ContentBoundary title={locale === "en" ? "Example unavailable" : "示例暂时无法显示"}><ComponentPreview slug={slug} /></ContentBoundary><p className="mt-(--qy-section-gap)"><Link className="focus-ring rounded-item underline" to={`/components/${slug}`}>API</Link></p></main>;
}
