import { Button } from "@qingye_lab/ui/components/button";
import { Empty, EmptyActions, EmptyTitle } from "@qingye_lab/ui/components/empty";
import { linkClassName } from "@qingye_lab/ui/components/link";
import { SearchInput } from "@qingye_lab/ui/components/search-input";
import { SegmentedControl, SegmentedControlItem } from "@qingye_lab/ui/components/segmented-control";
import { Fragment, useMemo, useState } from "react";
import { ComponentSpecimen } from "@/components/component-preview";
import { Link } from "@/components/locale-link";
import { Article, H2, PageHeader } from "@/components/prose";
import { useDocsLocale } from "@/lib/docs-locale";
import { componentLabel, componentPath, componentsByCategory, navLabel } from "@/lib/nav";
import { findComponent, type ComponentSummary } from "@/lib/registry";
import { useHashLink } from "@/lib/use-route-effects";
import "./components-index.css";

type LayerFilter = "all" | "foundation" | "primitive" | "pattern";

const LAYER_OPTIONS: { value: LayerFilter; zh: string; en: string }[] = [
  { value: "all", zh: "全部", en: "All" },
  { value: "foundation", zh: "Foundation", en: "Foundation" },
  { value: "primitive", zh: "Primitive", en: "Primitive" },
  { value: "pattern", zh: "Pattern", en: "Pattern" },
];

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

function matchesFilter(entry: ComponentSummary, terms: string[], layer: LayerFilter): boolean {
  if (layer !== "all" && entry.layer !== layer) return false;
  if (!terms.length) return true;
  const raw = findComponent(entry.slug);
  const haystack = [
    entry.title,
    entry.titleEn,
    raw?.title,
    entry.slug,
    entry.description,
    entry.descriptionEn,
    raw?.description,
    ...(entry.keywords ?? []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return terms.every((term) => haystack.includes(term));
}

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
  const onHashClick = useHashLink();
  const [query, setQuery] = useState("");
  const [layer, setLayer] = useState<LayerFilter>("all");
  const allGroups = useMemo(() => componentsByCategory(locale), [locale]);
  const total = useMemo(() => allGroups.reduce((sum, group) => sum + group.items.length, 0), [allGroups]);
  const terms = useMemo(() => query.trim().toLowerCase().split(/\s+/).filter(Boolean), [query]);
  const filteredGroups = useMemo(
    () =>
      allGroups
        .map((group) => ({ ...group, items: group.items.filter((entry) => matchesFilter(entry, terms, layer)) }))
        .filter((group) => group.items.length > 0),
    [allGroups, terms, layer],
  );
  const shown = useMemo(() => filteredGroups.reduce((sum, group) => sum + group.items.length, 0), [filteredGroups]);
  const filtering = terms.length > 0 || layer !== "all";

  return (
    <Article>
      <PageHeader
        documentTitle={en ? "Components" : "组件"}
        title={en ? "Components" : "组件"}
      />
      <div className="components-index-toolbar">
        <div className="components-index-controls">
          <SearchInput
            aria-label={en ? "Filter components" : "筛选组件"}
            controlClassName="components-index-search"
            onChange={(event) => setQuery(event.currentTarget.value)}
            onClear={() => setQuery("")}
            placeholder={en ? "Filter by name, slug, or keyword…" : "按名称、英文名或关键词筛选…"}
            value={query}
          />
          <SegmentedControl
            aria-label={en ? "Filter by layer" : "按层级筛选"}
            onValueChange={(value) => setLayer(value as LayerFilter)}
            size="sm"
            value={layer}
          >
            {LAYER_OPTIONS.map((option) => (
              <SegmentedControlItem key={option.value} value={option.value}>
                {en ? option.en : option.zh}
              </SegmentedControlItem>
            ))}
          </SegmentedControl>
          <span aria-live="polite" className="components-index-count numeric">
            {filtering ? `${shown} / ${total}` : null}
          </span>
        </div>
        {filteredGroups.length > 1 ? (
          <nav aria-label={en ? "Component categories" : "组件分类"} className="components-index-jumps">
            {filteredGroups.map((group) => {
              const id = CATEGORY_IDS[group.category] ?? group.category;
              return (
                <a className={linkClassName} href={`#${id}`} key={id} onClick={(event) => onHashClick(event, id)}>
                  {navLabel(group.category, locale)}
                </a>
              );
            })}
          </nav>
        ) : null}
      </div>
      {filteredGroups.length ? (
        filteredGroups.map((group) => {
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
        })
      ) : (
        <Empty className="components-index-empty" state="empty">
          <EmptyTitle level={2}>{en ? "No matching components" : "没有匹配的组件"}</EmptyTitle>
          <EmptyActions>
            <Button
              onClick={() => {
                setQuery("");
                setLayer("all");
              }}
              variant="bordered"
            >
              {en ? "Reset filters" : "重置筛选"}
            </Button>
          </EmptyActions>
        </Empty>
      )}
    </Article>
  );
}
