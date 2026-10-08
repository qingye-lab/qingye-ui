import { Fragment } from "react";
import { ComponentSpecimen } from "@/components/component-preview";
import { Link } from "@/components/locale-link";
import { H2, PageHeader } from "@/components/prose";
import { useDocsLocale } from "@/lib/docs-locale";
import { componentLabel, componentPath, componentsByCategory, navLabel } from "@/lib/nav";
import "./component.css";

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

export default function ComponentsIndexPage() {
  const locale = useDocsLocale();
  const en = locale === "en";
  const groups = componentsByCategory(locale);
  const total = groups.reduce((sum, group) => sum + group.items.length, 0);

  return (
    <article className="components-index">
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
            <ul aria-labelledby={id} className="components-grid">
            {group.items.map((entry) => {
              const { title, hint } = componentLabel(entry, locale);
              return (
                <li className="components-entry" key={entry.slug}>
                  <ComponentSpecimen className="components-specimen" slug={entry.slug} />
                  <Link className="components-entry-link" to={componentPath(entry.slug, locale)}>
                    {title}
                    {hint ? <span lang="en">{hint}</span> : null}
                  </Link>
                  <p className="components-entry-use">{entry.description}</p>
                </li>
              );
            })}
            </ul>
          </Fragment>
        );
      })}
    </article>
  );
}
