import themeCss from "@qingye_lab/ui/theme.css?raw";
import componentsCss from "@qingye_lab/ui/tokens/components.css?raw";
import semanticCss from "@qingye_lab/ui/tokens/semantic.css?raw";
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "@qingye_lab/ui/components/collapsible";
import { Button } from "@qingye_lab/ui/components/button";
import { ToggleGroup, ToggleGroupItem } from "@qingye_lab/ui/components/toggle-group";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow } from "@qingye_lab/ui/components/table";
import { useLayoutEffect, useRef, useState } from "react";
import { H2, PageHeader } from "@/components/prose";
import { useDocsLocale } from "@/lib/docs-locale";
import { colorOf, Probe, SECTIONS, SOURCES, useAppearanceKey, useMeasured, type Row, type Source, type Value } from "./foundations-ledger";
import { SPECIMENS } from "./foundations-specimens";
import "./tokens.css";

/*
 * 设计令牌页 = 法度台账（基础层 docs/decisions/2026-10-03-foundation.md 的公开投影）。
 * - 名实相符：每行写入口、实测值、与锚点的关系、来源类别；值在当前主题与密度里实测。
 * - 以材为祖：按材与分、等、疏密、圆角、墨与彩、文字、动分节，每节一个原尺寸标本。
 * - 疏密有致：节与节 3 材（预设，与设计理念页同值），节内标题、出处、标本、台账之间是组间距。
 * - 台账之外的入口收在文末，只列名称、值与工具类，不写关系（它们没有在基础层单独立项）。
 */

const ROWS = SECTIONS.flatMap((section) => section.rows);
const names = (css: string) => [...new Set([...css.matchAll(/--qy-([a-z0-9-]+)\s*:/g)].map((match) => match[1]!))];
const covered = new Set(
  ROWS.flatMap((row) => {
    const m = row.measure;
    if (m.kind === "type") return [`text-${m.step}-size`, `text-${m.step}-leading`];
    return [...m.exprs.join(" ").matchAll(/--qy-([a-z0-9-]+)/g)].map((match) => match[1]!);
  }).concat(ROWS.flatMap((row) => [...row.entry.matchAll(/--qy-([a-z0-9-]+)/g)].map((match) => match[1]!))),
);
const REST = [...names(semanticCss), ...names(componentsCss)].filter((name, index, all) => !covered.has(name) && all.indexOf(name) === index);
const utility = (name: string) =>
  [...themeCss.matchAll(/--(?:color|radius|text)-([a-z0-9-]+):\s*var\(--qy-([a-z0-9-]+)\)/g)].filter((match) => match[2] === name).map((match) => match[1]).join(" / ");

function relation(row: Row, value: Value | undefined, fen: number, cai: number, en: boolean) {
  if (row.measure.kind !== "type" || !value?.leading) return en ? row.rel.en : row.rel.zh;
  const units = value.leading / fen;
  if (value.leading === cai) return en ? "Line height = one module" : "行高 = 一材";
  return en ? `Line height = ${units} units` : `行高 = ${units} 分`;
}

function ValueCell({ value, en }: { value: Value | undefined; en: boolean }) {
  if (!value) return <>…</>;
  if (value.colors) {
    return (
      <span className="ledger-colors">
        {value.colors.map((color, index) => (
          <span key={index}>
            <span aria-hidden="true" className="ledger-swatch" style={{ backgroundColor: color.hex, opacity: color.alpha / 100 }} />
            {color.alpha < 100 ? `${color.hex} ${color.alpha}%` : color.hex}
          </span>
        ))}
      </span>
    );
  }
  return (
    <>
      {value.text}
      {value.compact ? <span className="ledger-compact">{en ? "Compact" : "紧凑"} {value.compact}</span> : null}
    </>
  );
}

function sourceName(id: Source, en: boolean) {
  const source = SOURCES.find((item) => item.id === id)!;
  return en ? source.en : source.zh;
}

/** 台账之外的入口：主题切换后重读当前值。 */
function useRestValues() {
  const appearance = useAppearanceKey();
  const probe = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState<Record<string, string>>({});
  useLayoutEffect(() => {
    const el = probe.current;
    const canvas = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
    if (!el || !canvas) return;
    const next: Record<string, string> = {};
    for (const name of REST) {
      const raw = getComputedStyle(el).getPropertyValue(`--qy-${name}`).trim();
      let text = raw;
      if (name.startsWith("shadow-") || name.startsWith("font-") || /^-?[\d.]+(ms|s|em)?$/.test(raw) || raw.startsWith("cubic-bezier")) text = raw;
      else if (/oklch|color-mix|rgb|#|color\(/.test(raw)) {
        el.style.backgroundColor = `var(--qy-${name})`;
        const color = colorOf(getComputedStyle(el).backgroundColor, canvas);
        text = color.alpha < 100 ? `${color.hex} ${color.alpha}%` : color.hex;
        el.style.backgroundColor = "";
      } else {
        el.style.inlineSize = `var(--qy-${name})`;
        const width = Number.parseFloat(getComputedStyle(el).inlineSize);
        if (Number.isFinite(width)) text = `${Math.round(width * 100) / 100}${/%/.test(raw) && !/px|rem/.test(raw) ? "%" : "px"}`;
        el.style.inlineSize = "";
      }
      next[name] = text;
    }
    setValues(next);
  }, [appearance]);
  return [probe, values] as const;
}

export default function TokensPage() {
  const en = useDocsLocale() === "en";
  // 空集合就是不筛选；可多选，这样「预设」能和它所指的锚点同屏对照。
  const [filter, setFilter] = useState<Source[]>([]);
  const all = filter.length === 0;
  const [host, values] = useMeasured(ROWS);
  const [restProbe, restValues] = useRestValues();
  const unit = (entry: string) => Number.parseFloat(values.get(ROWS.find((row) => row.entry === entry)!)?.text ?? "") || 0;
  const [fen, cai] = [unit("--qy-fen"), unit("--qy-cai")];
  const count = (id: Source) => ROWS.filter((row) => row.src.includes(id)).length;
  const head = en ? ["Entry", "Value", "Relation", "Source"] : ["入口", "值", "关系", "来源"];

  return (
    <article className="ledger">
      <PageHeader title={en ? "Design tokens" : "设计令牌"} />
      <div className="ledger-sources">
        <div className="ledger-filter">
          <ToggleGroup<Source> aria-label={en ? "Source" : "来源"} multiple onValueChange={(value) => setFilter(value)} value={filter}>
            {SOURCES.map((source) => <ToggleGroupItem key={source.id} value={source.id}>{en ? source.en : source.zh} {count(source.id)}</ToggleGroupItem>)}
          </ToggleGroup>
          {all ? null : <Button onClick={() => setFilter([])} variant="quiet">{en ? `Show all ${ROWS.length}` : `显示全部 ${ROWS.length}`}</Button>}
        </div>
        <dl className="ledger-legend">
          {SOURCES.map((source) => (
            <div data-current={filter.includes(source.id) || undefined} key={source.id}>
              <dt>{en ? source.en : source.zh}</dt>
              <dd>{en ? source.note.en : source.note.zh}</dd>
            </div>
          ))}
        </dl>
      </div>

      {SECTIONS.map((section) => {
        const Specimen = SPECIMENS[section.id]!;
        const rows = section.rows.filter((row) => all || row.src.some((id) => filter.includes(id)));
        const headingId = section.id;
        // 筛选时只留有该来源的节，标本让位给台账：此时读者在查值，不在看形。
        if (!rows.length) return null;
        return (
          <section className="ledger-section" key={section.id}>
            <H2 id={headingId}>{en ? section.title.en : section.title.zh}</H2>
            <p className="ledger-origin">{en ? section.origin.en : section.origin.zh}</p>
            {all ? <Specimen en={en} /> : null}
            <TableContainer data-density="compact">
              <Table aria-labelledby={headingId} className="ledger-table">
                <TableHeader><TableRow>{head.map((label) => <TableHead key={label}>{label}</TableHead>)}</TableRow></TableHeader>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.entry}>
                      <TableCell><code>{row.entry}</code></TableCell>
                      <TableCell className="ledger-value"><ValueCell en={en} value={values.get(row)} /></TableCell>
                      <TableCell>{relation(row, values.get(row), fen, cai, en)}</TableCell>
                      <TableCell className="ledger-source">{row.src.map((id) => sourceName(id, en)).join(en ? ", " : "、")}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </section>
        );
      })}

      {all ? <section className="ledger-section">
        <H2 id="others">{en ? "Other entries" : "其余入口"}</H2>
        <Collapsible>
          <CollapsibleTrigger>{en ? `${REST.length} entries` : `${REST.length} 个入口`}</CollapsibleTrigger>
          <CollapsiblePanel>
            <TableContainer data-density="compact">
              <Table aria-labelledby="others" className="ledger-table ledger-rest">
                <TableHeader><TableRow><TableHead>{head[0]}</TableHead><TableHead>{head[1]}</TableHead><TableHead>{en ? "Utility" : "工具类"}</TableHead></TableRow></TableHeader>
                <TableBody>
                  {REST.map((name) => (
                    <TableRow key={name}>
                      <TableCell><code>--qy-{name}</code></TableCell>
                      <TableCell className="ledger-value">{restValues[name] ?? "…"}</TableCell>
                      <TableCell className="ledger-value">{utility(name) || "—"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CollapsiblePanel>
        </Collapsible>
      </section> : null}
      <Probe host={host} />
      <div aria-hidden="true" className="ledger-probe" ref={restProbe} />
    </article>
  );
}
