import { Button } from "@qingye/ui/components/button";
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@qingye/ui/components/empty";
import { SearchInput } from "@qingye/ui/components/search-input";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { H2, PageHeader } from "@/components/prose";
import { componentPath, componentsByCategory, splitTitle } from "@/lib/nav";
import { components, type ComponentEntry } from "@/lib/registry";

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

function matches(entry: ComponentEntry, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const haystack = [entry.title, entry.slug, entry.description, entry.category, ...(entry.keywords ?? []), ...entry.exports]
    .join(" ")
    .toLowerCase();
  return q.split(/\s+/).every((term) => haystack.includes(term));
}

export default function ComponentsIndexPage() {
  const [query, setQuery] = useState("");
  const groups = useMemo(
    () =>
      componentsByCategory()
        .map((group) => ({ ...group, items: group.items.filter((entry) => matches(entry, query)) }))
        .filter((group) => group.items.length),
    [query],
  );
  const shown = groups.reduce((sum, group) => sum + group.items.length, 0);
  const categories = componentsByCategory().length;

  return (
    <article>
      <PageHeader
        description={`${components.length} 个组件，按用途分为 ${categories} 类。每个组件页都有可交互的示例、导入方式、API 与键盘说明。`}
        title="组件"
      />
      <div className="sticky top-(--docs-header-height) z-10 -mx-1 mb-2 bg-background px-1 pt-1 pb-3">
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1 sm:max-w-sm">
            <SearchInput aria-label="筛选组件" onValueChange={setQuery} placeholder="筛选：名称、用途或关键词" value={query} />
          </div>
          <span aria-live="polite" className="shrink-0 text-muted-foreground text-xs numeric">
            {query.trim() ? `${shown} 个结果` : `共 ${components.length} 个`}
          </span>
        </div>
      </div>

      {groups.length === 0 ? (
        <Empty className="rounded-xl border border-dashed py-12 md:py-14">
          <EmptyHeader>
            <EmptyTitle className="text-base">没有匹配“{query.trim()}”的组件</EmptyTitle>
            <EmptyDescription>换个说法试试，例如“下拉”“date”“表格”，或者清除筛选查看全部。</EmptyDescription>
          </EmptyHeader>
          <Button onClick={() => setQuery("")} size="sm" variant="outline">
            清除筛选
          </Button>
        </Empty>
      ) : null}

      {groups.map((group) => (
        <section aria-labelledby={CATEGORY_IDS[group.category] ?? group.category} className="mt-10 first-of-type:mt-6" key={group.category}>
          <H2 className="mt-0 mb-3 text-[1.0625rem]" id={CATEGORY_IDS[group.category] ?? group.category}>
            {group.category}
            <span className="ms-2 font-normal text-muted-foreground text-[0.8125rem] numeric">{group.items.length}</span>
          </H2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {group.items.map((entry) => {
              const { zh, en } = splitTitle(entry.title);
              return (
                <li key={entry.slug}>
                  <Link
                    className="focus-ring flex h-full flex-col gap-1 rounded-xl border px-4 py-3 transition-colors hover:bg-accent/60"
                    to={componentPath(entry.slug)}
                  >
                    <span className="flex items-baseline gap-2">
                      <span className="font-medium text-[0.9375rem] text-foreground-strong">{zh}</span>
                      {en ? <span className="truncate text-muted-foreground text-xs">{en}</span> : null}
                    </span>
                    <span className="line-clamp-2 text-pretty text-[0.8125rem] text-muted-foreground leading-relaxed">{entry.description}</span>
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
