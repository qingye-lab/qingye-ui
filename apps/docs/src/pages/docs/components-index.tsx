import { Fragment } from "react";
import { ComponentSpecimen } from "@/components/component-preview";
import { Link } from "@/components/locale-link";
import { Article, H2, PageHeader } from "@/components/prose";
import { useDocsLocale } from "@/lib/docs-locale";
import { componentLabel, componentPath, componentsByCategory, navLabel } from "@/lib/nav";
import "./components-index.css";

/* Stable fragment ids for the category headings; the right-hand contents read them. */
const CATEGORY_IDS: Record<string, string> = {
  通用: "general",
  表单: "forms",
  日期与时间: "date-time",
  数据展示: "data-display",
  反馈: "feedback",
  浮层: "overlays",
  导航: "navigation",
  布局: "layout",
  排版: "typography",
  工具: "utilities",
  其他: "other",
};

/**
 * One component: its live specimen in a frame, then its name and use. The name is the link and its
 * pseudo-element covers the whole tile, so the tile is one destination while the specimen (which may
 * itself contain links) stays outside the anchor and inert.
 */
function Tile({ slug, title, hint, use, to }: { slug: string; title: string; hint?: string | undefined; use: string; to: string }) {
  return (
    <li className="components-index-tile">
      <div className="components-index-frame"><ComponentSpecimen className="components-index-stage" name={title} slug={slug} /></div>
      <Link className="components-index-name" to={to}>
        {title}
        {hint ? <span lang="en">{hint}</span> : null}
      </Link>
      <p className="components-index-use">{use}</p>
    </li>
  );
}

export default function ComponentsIndexPage() {
  const locale = useDocsLocale();
  const en = locale === "en";
  const groups = componentsByCategory(locale);
  const total = groups.reduce((sum, group) => sum + group.items.length, 0);

  return (
    <Article>
      <PageHeader
        description={en ? `${total} components in ${groups.length} categories.` : `${total} 个组件，分 ${groups.length} 类。`}
        documentTitle={en ? "Components" : "组件"}
        title={en ? "Components" : "组件"}
      />
      {groups.map((group) => {
        const id = CATEGORY_IDS[group.category] ?? group.category;
        return (
          <Fragment key={id}>
            <H2 id={id}>{navLabel(group.category, locale)}</H2>
            <ul aria-labelledby={id} className="components-index-grid" data-slot="docs-index-grid">
              {group.items.map((entry) => {
                const { title, hint } = componentLabel(entry, locale);
                return <Tile hint={hint} key={entry.slug} slug={entry.slug} title={title} to={componentPath(entry.slug, locale)} use={entry.description} />;
              })}
            </ul>
          </Fragment>
        );
      })}
    </Article>
  );
}
