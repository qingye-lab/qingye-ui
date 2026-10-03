import { Link } from "@/components/locale-link";
import { H2, PageHeader } from "@/components/prose";
import { componentLabel, componentPath, componentsByCategory } from "@/lib/nav";
import { useDocsLocale } from "@/lib/docs-locale";
import { navLabel } from "@/lib/nav";

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
  const groups = componentsByCategory(locale);

  return (
    <article>
      <PageHeader title={locale === "en" ? "Components" : "组件"} />
      {groups.map((group) => (
        <section aria-labelledby={CATEGORY_IDS[group.category] ?? group.category} className="mt-10 first-of-type:mt-6" key={group.category}>
          <H2 className="mt-0 mb-3" id={CATEGORY_IDS[group.category] ?? group.category}>
            {navLabel(group.category, locale)}
            <span className="ms-2 font-normal text-muted-foreground text-heading numeric">{group.items.length}</span>
          </H2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {group.items.map((entry) => {
              const { title, hint } = componentLabel(entry, locale);
              return (
                <li key={entry.slug}>
                  <Link
                    className="focus-ring flex h-full min-w-0 flex-col gap-(--qy-space-1) rounded-md px-(--qy-space-3) py-(--qy-space-3) transition-colors hover:bg-accent/60"
                    to={componentPath(entry.slug, locale)}
                  >
                    <span className="flex min-w-0 flex-wrap items-baseline gap-x-(--qy-space-2) gap-y-(--qy-space-1) [overflow-wrap:anywhere]">
                      <span className="min-w-0 font-medium text-reading text-foreground-strong">{title}</span>
                      {hint ? <span className="min-w-0 text-muted-foreground text-caption">{hint}</span> : null}
                    </span>
                    <span className="text-pretty text-heading text-muted-foreground leading-relaxed [overflow-wrap:anywhere]">{entry.description}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </article>
  );
}
