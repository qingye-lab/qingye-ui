import { Button } from "@qingye_lab/ui/components/button";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { Input } from "@qingye_lab/ui/components/input";
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "@qingye_lab/ui/components/select";
import { Heading, Text } from "@qingye_lab/ui/components/typography";
import { useState } from "react";
import { useDocsLocale } from "@/lib/docs-locale";

const INK_STEPS = [
  { zh: "焦", en: "Charred", pct: "88%", token: "var(--qy-ink-jiao)" },
  { zh: "浓", en: "Dense", pct: "66%", token: "var(--qy-ink-nong)" },
  { zh: "重", en: "Heavy", pct: "50%", token: "var(--qy-ink-zhong)" },
  { zh: "淡", en: "Light", pct: "24%", token: "var(--qy-ink-dan)" },
  { zh: "清", en: "Clear", pct: "8%", token: "var(--qy-ink-qing)" },
] as const;

const CHART_PIGMENTS = [
  { zh: "花青", en: "Indigo", varName: "var(--qy-chart-1)" },
  { zh: "赭石", en: "Ochre", varName: "var(--qy-chart-2)" },
  { zh: "石绿", en: "Malachite", varName: "var(--qy-chart-3)" },
  { zh: "藤黄", en: "Gamboge", varName: "var(--qy-chart-4)" },
  { zh: "胭脂", en: "Carmine", varName: "var(--qy-chart-5)" },
] as const;

const GRADES = [
  { size: "xs", px: "24" },
  { size: "sm", px: "28" },
  { size: "md", px: "32" },
  { size: "lg", px: "36" },
  { size: "xl", px: "40" },
] as const;

const DEFAULT_SLUG = "qingye-console";
const DEFAULT_REGION = "cn-east";

const REGION_ITEMS = {
  zh: [
    { value: "cn-east", label: "华东节点" },
    { value: "ap-sg", label: "新加坡节点" },
    { value: "eu-frankfurt", label: "法兰克福节点" },
  ],
  en: [
    { value: "cn-east", label: "East China" },
    { value: "ap-sg", label: "Singapore" },
    { value: "eu-frankfurt", label: "Frankfurt" },
  ],
} as const;

/**
 * 首页「工艺」画幅：用 1px 清墨线划分非对称三格，直接呈现本库三项可实测的工艺——
 *   左主格   焦点不外扩、边框只加深到焦墨（实时可操作，「重置」恢复表单）
 *   右上格   五级中性墨阶与五种矿植物数据色（读真实 token，随明暗翻转）
 *   右下格   以材为祖：xs 到 xl 五等真实按钮阶梯（每级递增一分 4px）
 */
export function HomeCraft() {
  const locale = useDocsLocale();
  const en = locale === "en";
  const t = (zh: string, english: string) => (en ? english : zh);
  const [region, setRegion] = useState<string>(DEFAULT_REGION);
  const [slug, setSlug] = useState(DEFAULT_SLUG);
  const regions = en ? REGION_ITEMS.en : REGION_ITEMS.zh;

  return (
    <section aria-label={t("组件工艺", "Component craft")} className="home-craft site-frame">
      <div className="home-craft-sheet" data-ui>
        {/* 左主格：真实可交互的状态与焦点微场景 */}
        <div className="home-craft-cell home-craft-focus">
          <div className="home-craft-cell-head">
            <Heading level={2} step="heading">{t("焦点与边界", "Focus & boundaries")}</Heading>
          </div>

          <div className="home-craft-workbench">
            <div className="home-craft-fields">
              <Field>
                <FieldLabel>{t("项目标识", "Project slug")}</FieldLabel>
                <Input onChange={(event) => setSlug(event.target.value)} value={slug} />
              </Field>
              <Field>
                <FieldLabel>{t("部署区域", "Region")}</FieldLabel>
                <Select items={regions} onValueChange={(next) => { if (next) setRegion(next); }} value={region}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectPopup>
                    {regions.map((item) => (
                      <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                    ))}
                  </SelectPopup>
                </Select>
              </Field>
            </div>

            <div className="home-craft-controls">
              <div className="home-craft-buttons">
                <Button onClick={() => { setSlug(DEFAULT_SLUG); setRegion(DEFAULT_REGION); }} size="sm" variant="quiet">{t("重置", "Reset")}</Button>
              </div>
            </div>
          </div>
        </div>

        {/* 右上格：墨分五色与随类赋彩 */}
        <div className="home-craft-cell home-craft-ink">
          <div className="home-craft-cell-head">
            <Heading level={2} step="heading">{t("墨分五色", "Five inks")}</Heading>
          </div>

          <div className="home-craft-palette">
            <div className="home-ink-strip" role="list" aria-label={t("五级中性墨阶", "Five-step ink ladder")}>
              {INK_STEPS.map((step) => (
                <div className="home-ink-chip" key={step.zh} role="listitem">
                  <span
                    aria-hidden="true"
                    className="home-ink-bar"
                    style={{ background: `color-mix(in srgb, var(--qy-ink) ${step.token}, var(--qy-paper))` }}
                  />
                  <span className="home-ink-meta">
                    <span className="home-ink-name">{en ? step.en : step.zh}</span>
                    <span className="home-ink-pct numeric">{step.pct}</span>
                  </span>
                </div>
              ))}
            </div>

            <div className="home-pigment-strip" role="list" aria-label={t("五种数据颜料色", "Five data series pigments")}>
              {CHART_PIGMENTS.map((pigment) => (
                <div className="home-pigment-item" key={pigment.zh} role="listitem">
                  <span aria-hidden="true" className="home-pigment-swatch" style={{ background: pigment.varName }} />
                  <span className="home-pigment-name">{en ? pigment.en : pigment.zh}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 右下格：以材为祖五等按钮阶梯 */}
        <div className="home-craft-cell home-craft-scale">
          <div className="home-craft-cell-head">
            <Heading level={2} step="heading">{t("以材为祖", "Modular scale")}</Heading>
          </div>

          <div className="home-scale-stairs">
            {GRADES.map((grade) => (
              <div className="home-scale-step" key={grade.size}>
                <Button size={grade.size} variant="bordered">{grade.size}</Button>
                <span className="home-scale-px numeric">{grade.px}px</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
