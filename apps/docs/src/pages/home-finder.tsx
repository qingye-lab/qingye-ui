import { buttonVariants } from "@qingye_lab/ui/components/button";
import { Button } from "@qingye_lab/ui/components/button";
import { Empty, EmptyActions, EmptyTitle } from "@qingye_lab/ui/components/empty";
import { Item, ItemContent, ItemTitle } from "@qingye_lab/ui/components/item";
import { linkClassName } from "@qingye_lab/ui/components/link";
import { Heading, Text } from "@qingye_lab/ui/components/typography";
import { ScrollArea } from "@qingye_lab/ui/components/scroll-area";
import { SearchInput } from "@qingye_lab/ui/components/search-input";
import { SegmentedControl, SegmentedControlItem } from "@qingye_lab/ui/components/segmented-control";
import { Select, SelectItem, SelectPopup, SelectTrigger } from "@qingye_lab/ui/components/select";
import { useTheme } from "@qingye_lab/ui/components/theme-provider";
import { useDeferredValue, useId, useMemo, useState, type CSSProperties } from "react";
import { ComponentStage } from "@/components/component-preview";
import { Link } from "@/components/locale-link";
import { useDocsLocale } from "@/lib/docs-locale";
import { navLabel } from "@/lib/nav";
import { PATHS } from "@/lib/paths";
import { score, searchEntries } from "@/lib/search";
import { CATEGORIES } from "@/lib/types";

/*
 * 首页的工作台：用本库组件搭成的组件查找，数据是当前 registry 的全部组件。左列选一个，右侧的台上就是它的样张（活的，可以操作），
 * 「打开」去往组件页（展开有据：先看见，再深入）。
 * 台上方的三个控件是主题的三个独立轴——明暗、密度、品牌（design.md「主题三轴不混用」），只作用于这张台：
 *   明暗   台上加 .light / .dark，语义 token 在这个根上按墨与纸重算；
 *   密度   台上加 data-density，控件外高与关系间距换「等」，内容文字不变（屋有大小，人无大小）；
 *   品牌   台上写 --qy-primary 与其前景，实心按钮等读它的部位一起换色。
 * 弹出层（Select）挂在台内，与台同一个明暗根。查询与分类是本地状态，不写进地址，不发请求。
 */
type Brand = { id: string; zh: string; en: string; light?: [string, string]; dark?: [string, string] };
// 品牌是试用的预设（[primary, primary-foreground]）；「青」与本站 html[data-brand="qingye"] 的取值相同（index.css）。
const BRANDS: Brand[] = [
  { id: "ink", zh: "墨", en: "Ink" },
  { id: "qing", zh: "青", en: "Qing", light: ["oklch(0.48 0.085 200)", "oklch(0.985 0 0)"], dark: ["oklch(0.78 0.09 195)", "oklch(0.21 0.03 200)"] },
  { id: "ochre", zh: "赭", en: "Ochre", light: ["oklch(0.52 0.13 50)", "oklch(0.985 0 0)"], dark: ["oklch(0.77 0.12 65)", "oklch(0.23 0.04 55)"] },
  { id: "rose", zh: "胭", en: "Rose", light: ["oklch(0.52 0.18 12)", "oklch(0.985 0 0)"], dark: ["oklch(0.74 0.14 12)", "oklch(0.22 0.05 12)"] },
];

const ALL = "all";

/* 没有查询时的先后：先列一眼认得出、在台上能直接操作的组件，其余按名称。预设。 */
const FEATURED = ["date-picker", "button", "select", "segmented-control", "switch", "slider", "checkbox-group", "radio-group", "number-field", "tabs", "otp-field", "color-picker", "tag-input", "calendar", "progress", "meter"];
const featured = (id: string) => { const index = FEATURED.indexOf(id.split("/").pop() ?? ""); return index < 0 ? FEATURED.length : index; };

export function HomeFinder() {
  const locale = useDocsLocale();
  const en = locale === "en";
  const t = (zh: string, english: string) => (en ? english : zh);
  const { resolvedTheme } = useTheme();
  const [mode, setMode] = useState<"light" | "dark" | null>(null);
  const [density, setDensity] = useState<"default" | "compact">("default");
  const [brandId, setBrandId] = useState("qing");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>(ALL);
  const [picked, setPicked] = useState<string | null>(null);
  const [surface, setSurface] = useState<HTMLDivElement | null>(null);
  const deferred = useDeferredValue(query);
  const axesId = useId();

  // 台的明暗默认跟随站点；读者在台上选过之后，台保留自己的选择。
  const scheme = mode ?? (resolvedTheme === "dark" ? "dark" : "light");
  const brand = BRANDS.find((item) => item.id === brandId) ?? BRANDS[0]!;
  const pair = scheme === "dark" ? brand.dark : brand.light;
  const style = pair ? ({ "--qy-primary": pair[0], "--qy-primary-foreground": pair[1] } as CSSProperties) : undefined;

  const entries = useMemo(() => searchEntries(locale).filter((entry) => entry.group === "组件"), [locale]);
  const results = useMemo(() => entries
    .filter((entry) => category === ALL || entry.meta === category)
    .map((entry) => ({ entry, rank: score(entry, deferred) }))
    .filter((item) => item.rank > 0)
    .sort((a, b) => b.rank - a.rank || featured(a.entry.id) - featured(b.entry.id) || a.entry.title.localeCompare(b.entry.title, en ? "en" : "zh"))
    .map((item) => item.entry), [entries, category, deferred, en]);
  const categories = [{ value: ALL, label: t("全部分类", "All categories") }, ...CATEGORIES.map((value) => ({ value, label: navLabel(value, locale) }))];
  // 选中项不在结果里时（查询或分类变了），台上换成结果的第一项；选择只是本地状态，不改地址。
  const current = results.find((entry) => entry.id === picked) ?? results[0];
  const filtered = query.trim() !== "" || category !== ALL;
  const clear = () => { setQuery(""); setCategory(ALL); };

  return (
    <section aria-label={t("组件查找", "Component finder")} className="home-bench">
      <div aria-labelledby={axesId} className="home-axes" role="group">
        <span className="sr-only" id={axesId}>{t("预览主题", "Preview theme")}</span>
        <Axis label={t("明暗", "Scheme")}>
          <SegmentedControl aria-label={t("明暗", "Scheme")} onValueChange={(value) => setMode(value as "light" | "dark")} size="sm" value={scheme}>
            <SegmentedControlItem value="light">{t("浅", "Light")}</SegmentedControlItem>
            <SegmentedControlItem value="dark">{t("深", "Dark")}</SegmentedControlItem>
          </SegmentedControl>
        </Axis>
        <Axis label={t("密度", "Density")}>
          <SegmentedControl aria-label={t("密度", "Density")} onValueChange={(value) => setDensity(value as "default" | "compact")} size="sm" value={density}>
            <SegmentedControlItem value="default">{t("舒展", "Default")}</SegmentedControlItem>
            <SegmentedControlItem value="compact">{t("紧凑", "Compact")}</SegmentedControlItem>
          </SegmentedControl>
        </Axis>
        <Axis label={t("品牌", "Brand")}>
          <SegmentedControl aria-label={t("品牌", "Brand")} onValueChange={(value) => setBrandId(String(value))} size="sm" value={brandId}>
            {BRANDS.map((item) => (
              <SegmentedControlItem key={item.id} value={item.id}>
                <span aria-hidden="true" className="home-swatch" style={{ background: (scheme === "dark" ? item.dark : item.light)?.[0] ?? "var(--qy-foreground)" }} />
                {en ? item.en : item.zh}
              </SegmentedControlItem>
            ))}
          </SegmentedControl>
        </Axis>
      </div>

      <div className={`home-surface ${scheme}`} data-density={density} ref={setSurface} style={style}>
        <div className="home-surface-tools">
          <SearchInput
            aria-label={t("按名称或用途查找组件", "Find a component by name or use")}
            controlClassName="min-w-0 flex-1"
            onChange={(event) => setQuery(event.target.value)}
            onClear={() => setQuery("")}
            placeholder={t("按名称或用途查找", "Search by name or use")}
            value={query}
          />
          <Select items={categories} onValueChange={(value) => setCategory(String(value ?? ALL))} value={category}>
            <SelectTrigger aria-label={t("分类", "Category")} className="home-category" />
            <SelectPopup container={surface}>
              {categories.map((item) => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}
            </SelectPopup>
          </Select>
        </div>

        {results.length && current ? (
          <div className="home-surface-body">
            <ScrollArea aria-label={t("查找结果", "Results")} className="home-surface-list">
              <ul className="m-0 list-none p-0">
                {results.map((entry) => (
                  <li key={entry.id}>
                    <Item aria-pressed={entry.id === current.id} className="home-row" onClick={() => setPicked(entry.id)} render={<button type="button" />}>
                      <ItemContent>
                        <ItemTitle className="truncate">
                          {entry.title}
                          {entry.hint ? <span className="home-hint" lang="en">{entry.hint}</span> : null}
                        </ItemTitle>
                      </ItemContent>
                    </Item>
                  </li>
                ))}
              </ul>
            </ScrollArea>
            <div aria-label={current.title} className="home-stage" role="region">
              <div className="home-stage-head">
                <div className="min-w-0">
                  <Heading level={3} step="heading">
                    {current.title}
                    {current.hint ? <span className="home-hint" lang="en">{current.hint}</span> : null}
                  </Heading>
                  <Text className="text-muted-foreground" step="support">{current.description}</Text>
                </div>
                <Link className={buttonVariants({ size: "sm" })} to={current.id}>{t("打开", "Open")}</Link>
              </div>
              <ComponentStage className="home-stage-specimen" key={current.id} name={current.title} slug={current.id.split("/").pop()!} />
              <span className="home-stage-category">{navLabel(current.meta, locale)}</span>
            </div>
          </div>
        ) : (
          <Empty className="home-surface-empty" state="empty">
            <EmptyTitle level={3} step="body-strong">{t("没有匹配的组件", "No matching components")}</EmptyTitle>
            <EmptyActions><Button onClick={clear} size="sm" variant="bordered">{t("清除条件", "Clear filters")}</Button></EmptyActions>
          </Empty>
        )}

        <div className="home-surface-foot">
          <span aria-live="polite" className="numeric">
            {filtered ? t(`${results.length} / ${entries.length} 个组件`, `${results.length} of ${entries.length} components`) : t(`${entries.length} 个组件`, `${entries.length} components`)}
          </span>
          <Link className={linkClassName} to={PATHS.components}>{t("组件总览", "All components")}</Link>
        </div>
      </div>
    </section>
  );
}

function Axis({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="home-axis"><span aria-hidden="true">{label}</span>{children}</div>;
}
