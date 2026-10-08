import { TableBody, TableCell, TableHead } from "@qingye_lab/ui/components/table";
import { TableHeader } from "@qingye_lab/ui/components/table";
import { Badge } from "@qingye_lab/ui/components/badge";
import { Button } from "@qingye_lab/ui/components/button";
import { Checkbox } from "@qingye_lab/ui/components/checkbox";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { Input } from "@qingye_lab/ui/components/input";
import { Label } from "@qingye_lab/ui/components/label";
import { Slider, SliderControl, SliderIndicator, SliderLabel, SliderThumb, SliderTrack, SliderValue } from "@qingye_lab/ui/components/slider";
import { Switch } from "@qingye_lab/ui/components/switch";
import { Table, TableRow } from "@qingye_lab/ui/components/table";
import { useTheme } from "@qingye_lab/ui/components/theme-provider";
import { ToggleGroup, ToggleGroupItem } from "@qingye_lab/ui/components/toggle-group";
import { Stack } from "@qingye_lab/ui/components/layout";
import { useDocsLocale } from "@/lib/docs-locale";
import { useEffect, useId, useMemo, useRef, useState, type CSSProperties } from "react";
import { CodeBlock } from "@/components/code-block";
import { A, Code, Facts, H2, P, PageHeader } from "@/components/prose";

interface Brand {
  id: string;
  label: string;
  labelEn: string;
  light?: { primary: string; foreground: string; ring: string };
  dark?: { primary: string; foreground: string; ring: string };
}

// These site preview palettes are presets; verify each real foreground/background combination.
const BRANDS: Brand[] = [
  { id: "neutral", label: "中性", labelEn: "Neutral" }, {
    id: "indigo", label: "靛蓝", labelEn: "Indigo", light: { primary: "oklch(0.51 0.18 268)", foreground: "oklch(0.985 0 0)", ring: "oklch(0.62 0.14 268)" }, dark: { primary: "oklch(0.72 0.13 268)", foreground: "oklch(0.21 0.04 268)", ring: "oklch(0.6 0.12 268)" }, }, {
    id: "teal", label: "青绿", labelEn: "Teal", light: { primary: "oklch(0.5 0.09 190)", foreground: "oklch(0.985 0 0)", ring: "oklch(0.64 0.09 190)" }, dark: { primary: "oklch(0.76 0.1 185)", foreground: "oklch(0.22 0.03 190)", ring: "oklch(0.6 0.08 190)" }, }, {
    id: "ochre", label: "赭石", labelEn: "Ochre", light: { primary: "oklch(0.52 0.13 50)", foreground: "oklch(0.985 0 0)", ring: "oklch(0.66 0.12 55)" }, dark: { primary: "oklch(0.77 0.12 65)", foreground: "oklch(0.23 0.04 55)", ring: "oklch(0.62 0.1 60)" }, }, {
    id: "rose", label: "胭脂", labelEn: "Rose", light: { primary: "oklch(0.52 0.18 12)", foreground: "oklch(0.985 0 0)", ring: "oklch(0.66 0.14 12)" }, dark: { primary: "oklch(0.74 0.14 12)", foreground: "oklch(0.22 0.05 12)", ring: "oklch(0.6 0.12 12)" }, }, ];

/*
 * Radius roles the components actually read: controls --qy-radius-control (overlays
 * derive from it), panels --qy-radius-panel. The defaults are read from the rendered
 * theme, not restated. Slider ranges are presets: controls up to 1 材, panels up to 8 分.
 */
interface Radii { control: number; panel: number }
const RADIUS_RANGE = { control: { max: 20, step: 2 }, panel: { max: 32, step: 4 } } as const;

function useThemeRadii(): Radii | null {
  const [radii, setRadii] = useState<Radii | null>(null);
  useEffect(() => {
    const probe = document.createElement("div");
    probe.setAttribute("aria-hidden", "true");
    probe.style.cssText = "position:absolute;visibility:hidden;border-start-start-radius:var(--qy-radius-control);border-start-end-radius:var(--qy-radius-panel)";
    document.body.appendChild(probe);
    const style = getComputedStyle(probe);
    setRadii({ control: parseFloat(style.borderStartStartRadius) || 0, panel: parseFloat(style.borderStartEndRadius) || 0 });
    probe.remove();
  }, []);
  return radii;
}

function previewVars(radii: Radii, compact: boolean): Record<string, string> {
  // Derived roles resolve where they are declared (the root), so the isolated preview
  // restates the ones its children read. A project override on html needs none of this.
  return {
    "--qy-radius-control": `${radii.control}px`,
    "--qy-radius-overlay": "calc(var(--qy-radius-control) + var(--qy-overlay-inset))",
    "--qy-radius-overlay-item": "max(0px, calc(var(--qy-radius-overlay) - var(--qy-overlay-inset)))",
    ...(compact ? {} : { "--qy-fill-radius": "var(--qy-radius-control)" }),
    "--qy-radius-panel": `${radii.panel}px`,
  };
}

function cssFor(brand: Brand, radii: Radii, defaults: Radii, compact: boolean, en: boolean): string {
  const root: string[] = [];
  const dark: string[] = [];
  if (brand.light && brand.dark) {
    root.push(`--qy-primary: ${brand.light.primary};`, `--qy-primary-foreground: ${brand.light.foreground};`, `--qy-ring: ${brand.light.ring};`);
    dark.push(`--qy-primary: ${brand.dark.primary};`, `--qy-primary-foreground: ${brand.dark.foreground};`, `--qy-ring: ${brand.dark.ring};`);
  }
  if (radii.control !== defaults.control) root.push(`--qy-radius-control: ${radii.control}px;`);
  if (radii.panel !== defaults.panel) root.push(`--qy-radius-panel: ${radii.panel}px;`);
  const selector = `html[data-brand="${brand.id}"]`;
  const blocks = [`@import "tailwindcss";`, `@import "@qingye_lab/ui/styles.css";`, `
/* <html data-brand="${brand.id}"${compact ? ' data-density="compact"' : ""}> */`];
  if (root.length) blocks.push(`
${selector} {
${root.map((line) => `  ${line}`).join("\n")}
}`);
  if (dark.length) blocks.push(`
${selector}:is(.dark, [data-theme="dark"]) {
${dark.map((line) => `  ${line}`).join("\n")}
}`);
  if (!root.length && !dark.length) blocks.push(en ? `
/* The default brand needs no overrides. */` : `
/* 默认品牌不需要覆盖。 */`);
  return blocks.join("\n");
}

const rows = [
  { name: "A", owner: "1", status: "12" }, { name: "B", owner: "2", status: "0" }, { name: "C", owner: "1", status: "7" }, ];

function RadiusSlider({ label, value, range, onChange }: { label: string; value: number; range: { max: number; step: number }; onChange: (value: number) => void }) {
  return (
    <Slider className="w-(--docs-toc)" max={range.max} min={0} onValueChange={(next) => onChange(Array.isArray(next) ? next[0]! : (next as number))} step={range.step} value={value}>
      <div className="flex items-baseline justify-between gap-(--qy-field-gap)">
        <SliderLabel>{label}</SliderLabel>
        <SliderValue className="numeric">{(formatted) => `${formatted}px`}</SliderValue>
      </div>
      <SliderControl><SliderTrack><SliderIndicator /><SliderThumb /></SliderTrack></SliderControl>
    </Slider>
  );
}

function ThemeBench() {
  const en = useDocsLocale() === "en";
  const input = useRef<HTMLInputElement | null>(null);
  const [draft,setDraft] = useState("A");
  const [checked,setChecked] = useState(true);
  const { resolvedTheme } = useTheme();
  const defaults = useThemeRadii();
  const [brandId, setBrandId] = useState("indigo");
  const [chosen, setChosen] = useState<Partial<Radii>>({});
  const [compact, setCompact] = useState(false);
  const densityId = useId();
  const brandLabel = useId();
  const brand = BRANDS.find((item) => item.id === brandId) ?? BRANDS[0]!;
  const palette = resolvedTheme === "dark" ? brand.dark : brand.light;
  const radii = defaults ? { ...defaults, ...chosen } : null;

  const style = useMemo(
    () =>
      ({
        ...(palette ? { "--qy-primary": palette.primary, "--qy-primary-foreground": palette.foreground, "--qy-ring": palette.ring } : {}), ...(radii ? previewVars(radii, compact) : {}), }) as CSSProperties, [palette, radii?.control, radii?.panel, compact], );

  return (
    <Stack className="mb-(--qy-space-module)" gap="panel">
      <div className="flex flex-wrap items-end gap-x-(--qy-section-gap) gap-y-(--qy-field-group-gap)">
        <div className="flex flex-col gap-(--qy-field-gap)">
          <span className="text-label text-foreground" id={brandLabel}>{en ? "Brand" : "品牌色"}</span>
          <ToggleGroup aria-labelledby={brandLabel} className="flex-wrap" onValueChange={(value) => value[0] && setBrandId(value[0] as string)} size="sm" value={[brandId]}>
            {BRANDS.map((item) => (
              <ToggleGroupItem key={item.id} value={item.id}>
                <span aria-hidden="true" className="size-(--qy-space-3) rounded-full" style={{ background: (resolvedTheme === "dark" ? item.dark : item.light)?.primary ?? "var(--qy-foreground)" }} />
                {en ? item.labelEn : item.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        {radii ? <>
          <RadiusSlider label={en ? "Control radius" : "控件圆角"} onChange={(control) => setChosen((prev) => ({ ...prev, control }))} range={RADIUS_RANGE.control} value={radii.control} />
          <RadiusSlider label={en ? "Panel radius" : "面板圆角"} onChange={(panel) => setChosen((prev) => ({ ...prev, panel }))} range={RADIUS_RANGE.panel} value={radii.panel} />
        </> : null}
        <div className="flex items-center gap-(--qy-field-gap)">
          <Switch checked={compact} id={densityId} onCheckedChange={setCompact} />
          <Label htmlFor={densityId}>{en ? "Compact density" : "紧凑密度"}</Label>
        </div>
      </div>

      {/* The one boundary on this bench marks where the preview overrides apply. */}
      <div className="grid gap-(--qy-section-gap) rounded-panel border p-(--qy-panel-padding) md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]" data-density={compact ? "compact" : undefined} style={style}>
        <Stack gap="fields">
          <Field>
            <FieldLabel>{en ? "Draft label" : "草稿名称"}</FieldLabel>
            <Input ref={input} value={draft} onChange={event => setDraft(event.target.value)} />
          </Field>
          <Label>
            <Checkbox checked={checked} onCheckedChange={setChecked} />
            {en ? "Include label" : "包含名称"}
          </Label>
          <div className="flex flex-wrap items-center gap-(--qy-action-gap)">
            <Button onClick={() => input.current?.focus()}>{en ? "Edit label" : "编辑名称"}</Button>
            <Button variant="quiet" onClick={() => { setDraft("A"); setChecked(true); }}>{en ? "Reset" : "重置"}</Button>
            <Badge>{checked ? draft : "—"}</Badge>
          </div>
        </Stack>
        <div className="min-w-0 overflow-hidden rounded-panel border">
          <Table data-density={compact ? "compact" : undefined}>
            <TableHeader>
              <TableRow>
                <TableHead>{en ? "Item" : "条目"}</TableHead>
                <TableHead>{en ? "Version" : "版本"}</TableHead>
                <TableHead className="text-end">{en ? "Value" : "数值"}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell className="text-muted-foreground">{row.owner}</TableCell>
                  <TableCell className="text-end"><Badge>{row.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      {radii && defaults ? <CodeBlock className="my-0" code={cssFor(brand, radii, defaults, compact, en)} lang="css" title={en ? "Preview CSS" : "预览 CSS"} /> : null}
    </Stack>
  );
}

const headScript = `<script>
  try {
    var t = localStorage.getItem("yq-theme");
    var dark = t === "dark" || ((!t || t === "system") && matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.add(dark ? "dark" : "light");
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
  } catch (e) {}
</script>`;

const useThemeSnippet = (en: boolean) => `import { Button } from "@qingye_lab/ui/components/button";
import { useTheme } from "@qingye_lab/ui/components/theme-provider";

export function ThemeSwitch() {
  // theme: "light" | "dark" | "system"; resolvedTheme: ${en ? "the one in effect" : "实际生效的一个"}
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <Button onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
      ${en ? '{resolvedTheme === "dark" ? "Light" : "Dark"}' : '{resolvedTheme === "dark" ? "浅色" : "深色"}'}
    </Button>
  );
}`;

export default function ThemingPage() {
  const en = useDocsLocale() === "en";
  return <article><PageHeader title={en ? "Theming" : "主题"} description={en ? "Brand, light/dark and density each live on their own attribute and never override one another." : "品牌、明暗与密度各写在自己的属性上，互不覆盖。"} />
    <H2 id="axes">{en ? "Three settings" : "三个设置"}</H2>
    <Facts items={[
      { term: en ? "Brand" : "品牌", detail: <><Code>{'html[data-brand="…"]'}</Code>{en ? ", written statically by the project." : "，由项目静态写入。"}</> },
      { term: en ? "Light and dark" : "明暗", detail: <>{en ? "ThemeProvider toggles " : "ThemeProvider 在 html 上切换 "}<Code>.light</Code> / <Code>.dark</Code>{en ? " on html; with " : "；设 "}<Code>{'attribute="data-theme"'}</Code>{en ? " it writes data-theme instead." : " 时改写 data-theme。"}</> },
      { term: en ? "Density" : "密度", detail: <><Code>{'data-density="compact"'}</Code>{en ? " on any container; only the controls inside it change." : "，可写在任何容器上，只影响其中的控件。"}</> },
    ]} />
    <P>{en ? "Keep brand out of data-theme: in attribute mode ThemeProvider overwrites it, and the brand is lost." : "品牌不要写进 data-theme：属性模式下 ThemeProvider 会覆盖它，品牌随之丢失。"}</P>
    <CodeBlock lang="css" code={'html[data-brand="project"] { --qy-primary: var(--project-primary); }\nhtml[data-brand="project"]:is(.dark, [data-theme="dark"]) { --qy-primary: var(--project-primary-dark); }'} />
    <H2 id="preview">{en ? "Workbench" : "试验台"}</H2><P>{en ? "The palettes and radius ranges here are presets for trying things out. Before adopting one, check text, boundaries and focus against the backgrounds they actually sit on." : "这里的配色与圆角范围是试用的预设。采用前，在实际背景上检查文字、边界与焦点的对比度。"}</P><ThemeBench />
    <H2 id="dark-mode">{en ? "Light and dark" : "浅色与深色"}</H2><P>{en ? "ThemeProvider stores the choice under the localStorage key yq-theme (change it with storageKey). Read the same key in <head> so the first paint already carries the right class:" : "ThemeProvider 把选择存在 localStorage 的 yq-theme 键（可用 storageKey 改名）。在 <head> 里先读同一个键，首帧就带上正确的 class，页面不会先亮后暗："}</P><CodeBlock code={headScript} lang="html" /><P>{en ? "Read and change the mode with useTheme:" : "在界面里读写当前模式用 useTheme："}</P><CodeBlock code={useThemeSnippet(en)} />
    <H2 id="tokens">{en ? "Override roles" : "覆盖角色"}</H2><P>{en ? "Override the roles components read, in the project's one theme entry: --qy-radius-control for controls, --qy-radius-panel for panels. --qy-radius is an alias no component reads. Afterwards, inspect the computed values of the affected controls; current values are listed under " : "在项目唯一的主题入口里覆盖组件实际读取的角色：控件写 --qy-radius-control，面板写 --qy-radius-panel；--qy-radius 是别名，没有组件读取它。改完检查受影响控件的计算值，当前取值见"}<A href="/docs/tokens">{en ? "Design tokens" : "设计令牌"}</A>{en ? "." : "。"}</P>
  </article>;
}
