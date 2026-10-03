import { TableBody, TableCell, TableHead } from "@qingye/ui/components/table";
import { TableHeader } from "@qingye/ui/components/table";
import { Badge } from "@qingye/ui/components/badge";
import { Button } from "@qingye/ui/components/button";
import { Checkbox } from "@qingye/ui/components/checkbox";
import { Field, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";
import { Label } from "@qingye/ui/components/label";
import { Slider } from "@qingye/ui/components/slider";
import { Switch } from "@qingye/ui/components/switch";
import { Table, TableRow } from "@qingye/ui/components/table";
import { useTheme } from "@qingye/ui/components/theme-provider";
import { ToggleGroup, ToggleGroupItem } from "@qingye/ui/components/toggle-group";
import { cn } from "@qingye/ui/utils";
import { useDocsLocale } from "@/lib/docs-locale";
import { useId, useMemo, useRef, useState, type CSSProperties } from "react";
import { CodeBlock } from "@/components/code-block";
import { A, Callout, Code, Facts, H2, H3, P, PageHeader } from "@/components/prose";

interface Brand {
  id: string;
  label: string;
  light?: { primary: string; foreground: string; ring: string };
  dark?: { primary: string; foreground: string; ring: string };
}

// These site preview palettes are presets; verify each real foreground/background combination.
const BRANDS: Brand[] = [
  { id: "neutral", label: "中性" }, {
    id: "indigo", label: "靛蓝", light: { primary: "oklch(0.51 0.18 268)", foreground: "oklch(0.985 0 0)", ring: "oklch(0.62 0.14 268)" }, dark: { primary: "oklch(0.72 0.13 268)", foreground: "oklch(0.21 0.04 268)", ring: "oklch(0.6 0.12 268)" }, }, {
    id: "teal", label: "青绿", light: { primary: "oklch(0.5 0.09 190)", foreground: "oklch(0.985 0 0)", ring: "oklch(0.64 0.09 190)" }, dark: { primary: "oklch(0.76 0.1 185)", foreground: "oklch(0.22 0.03 190)", ring: "oklch(0.6 0.08 190)" }, }, {
    id: "ochre", label: "赭石", light: { primary: "oklch(0.52 0.13 50)", foreground: "oklch(0.985 0 0)", ring: "oklch(0.66 0.12 55)" }, dark: { primary: "oklch(0.77 0.12 65)", foreground: "oklch(0.23 0.04 55)", ring: "oklch(0.62 0.1 60)" }, }, {
    id: "rose", label: "胭脂", light: { primary: "oklch(0.52 0.18 12)", foreground: "oklch(0.985 0 0)", ring: "oklch(0.66 0.14 12)" }, dark: { primary: "oklch(0.74 0.14 12)", foreground: "oklch(0.22 0.05 12)", ring: "oklch(0.6 0.12 12)" }, }, ];

const DEFAULT_RADIUS = 0.5;
const DEFAULT_PANEL_RADIUS = 0.75;

function radiusVars(radius: number, panelRadius: number): Record<string, string> {
  // The isolated preview explicitly rebinds the roles used by its children.
  // Production overrides live on html, where the library's aliases are resolved.
  const root = `${radius}rem`;
  const md = `max(0px, calc(${root} - 0.5px))`;
  return {
    "--qy-radius": root,
    "--qy-radius-md": md,
    "--qy-radius-lg": root,
    "--qy-radius-control": root,
    "--qy-radius-panel": `${panelRadius}rem`,
    "--radius-md": md,
  };
}

function cssFor(brand: Brand, radius: number, compact: boolean, panelRadius = DEFAULT_PANEL_RADIUS): string {
  const root: string[] = [];
  const dark: string[] = [];
  if (brand.light && brand.dark) {
    root.push(`--qy-primary: ${brand.light.primary};`, `--qy-primary-foreground: ${brand.light.foreground};`, `--qy-ring: ${brand.light.ring};`);
    dark.push(`--qy-primary: ${brand.dark.primary};`, `--qy-primary-foreground: ${brand.dark.foreground};`, `--qy-ring: ${brand.dark.ring};`);
  }
  if (radius !== DEFAULT_RADIUS) root.push(`--qy-radius: ${radius}rem;`);
  if (panelRadius !== DEFAULT_PANEL_RADIUS) root.push(`--qy-radius-panel: ${panelRadius}rem;`);
  const selector = `html[data-brand="${brand.id}"]`;
  const blocks = [`@import "tailwindcss";`, `@import "@qingye/ui/styles.css";`, `
/* <html data-brand="${brand.id}"${compact ? ' data-density="compact"' : ""}> */`];
  if (root.length) blocks.push(`
${selector} {
${root.map((line) => `  ${line}`).join("\n")}
}`);
  if (dark.length) blocks.push(`
${selector}:is(.dark, [data-theme="dark"]) {
${dark.map((line) => `  ${line}`).join("\n")}
}`);
  if (!root.length && !dark.length) blocks.push(`
/* 缺省品牌可省略 data-brand；无需颜色或圆角覆盖。 */`);
  return blocks.join("\n");
}

const rows = [
  { name: "A", owner: "1", status: "12" }, { name: "B", owner: "2", status: "0" }, { name: "C", owner: "1", status: "7" }, ];

function ThemeBench() {
  const en = useDocsLocale() === "en";
  const input = useRef<HTMLInputElement | null>(null);
  const [draft,setDraft] = useState("A");
  const [checked,setChecked] = useState(true);
  const { resolvedTheme } = useTheme();
  const [brandId, setBrandId] = useState("indigo");
  const [radius, setRadius] = useState(DEFAULT_RADIUS);
  const [panelRadius, setPanelRadius] = useState(DEFAULT_PANEL_RADIUS);
  const [compact, setCompact] = useState(false);
  const densityId = useId();
  const brand = BRANDS.find((item) => item.id === brandId) ?? BRANDS[0]!;
  const palette = resolvedTheme === "dark" ? brand.dark : brand.light;

  const style = useMemo(
    () =>
      ({
        ...(palette ? { "--qy-primary": palette.primary, "--qy-primary-foreground": palette.foreground, "--qy-ring": palette.ring } : {}), ...radiusVars(radius, panelRadius), }) as CSSProperties, [palette, radius, panelRadius], );

  return (
    <div className="my-6 overflow-hidden rounded-2xl border">
      <div className="flex flex-col gap-4 border-b bg-surface-subtle/60 p-4 sm:flex-row sm:flex-wrap sm:items-end sm:gap-x-8 dark:bg-surface/40">
        <div className="flex flex-col gap-2">
          <span className="font-medium text-muted-foreground text-caption" id="brand-label">
            {en ? "Brand" : "品牌色"}
          </span>
          <ToggleGroup
            aria-labelledby="brand-label"
            className="flex-wrap"
            onValueChange={(value) => value[0] && setBrandId(value[0] as string)}
            size="sm"
            value={[brandId]}
          >
            {BRANDS.map((item) => (
              <ToggleGroupItem className="gap-1.5 px-2" key={item.id} value={item.id}>
                <span
                  aria-hidden="true"
                  className="size-3 rounded-full border border-foreground/10"
                  style={{ background: (resolvedTheme === "dark" ? item.dark : item.light)?.primary ?? "var(--qy-neutral-800)" }}
                />
                <span className="text-caption">{en ? item.id : item.label}</span>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        <div className="flex min-w-48 flex-1 flex-col gap-2 sm:max-w-60">
          <div className="flex items-center justify-between">
            <span className="font-medium text-muted-foreground text-caption" id="radius-label">
              --qy-radius
            </span>
            <span className="font-mono text-muted-foreground text-caption numeric">{radius.toFixed(3).replace(/0+$/, "").replace(/\.$/, "")}rem</span>
          </div>
          <Slider
            aria-labelledby="radius-label"
            max={1}
            min={0}
            onValueChange={(value) => setRadius(Array.isArray(value) ? value[0]! : (value as number))}
            step={0.125}
            value={radius}
          />
        </div>
        <div className="flex min-w-48 flex-1 flex-col gap-2 sm:max-w-60">
          <div className="flex items-center justify-between">
            <span className="font-medium text-muted-foreground text-caption" id="panel-radius-label">--qy-radius-panel</span>
            <span className="font-mono text-muted-foreground text-caption numeric">{panelRadius}rem</span>
          </div>
          <Slider aria-labelledby="panel-radius-label" max={1.5} min={0} onValueChange={(value) => setPanelRadius(Array.isArray(value) ? value[0]! : value as number)} step={0.125} value={panelRadius} />
        </div>
        <div className="flex items-center gap-2 sm:pb-1">
          <Switch checked={compact} id={densityId} onCheckedChange={setCompact} />
          <Label htmlFor={densityId}>{en ? "Compact density" : "紧凑密度"}</Label>
        </div>
      </div>

      <div className="grid gap-6 p-5 sm:p-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]" data-density={compact ? "compact" : undefined} style={style}>
        <div className="flex flex-col gap-4">
          <Field>
            <FieldLabel>{en ? "Draft label" : "草稿名称"}</FieldLabel>
            <Input ref={input} value={draft} onChange={event => setDraft(event.target.value)} />
          </Field>
          <Label>
            <Checkbox checked={checked} onCheckedChange={setChecked} />
            {en ? "Include label" : "包含名称"}
          </Label>
          <div className="flex flex-wrap items-center gap-2">
            <Button onClick={() => input.current?.focus()}>{en ? "Edit label" : "编辑名称"}</Button>
            <Button variant="quiet" onClick={() => { setDraft("A"); setChecked(true); }}>{en ? "Reset" : "重置"}</Button>
            <Badge>{checked ? draft : "—"}</Badge>
          </div>
        </div>
        <div className={cn("min-w-0 overflow-hidden rounded-panel border")}>
          <Table data-density={compact ? "compact" : undefined}>
            <TableHeader>
              <TableRow>
                <TableHead className="ps-3">{en ? "Item" : "条目"}</TableHead>
                <TableHead>{en ? "Version" : "版本"}</TableHead>
                <TableHead className="pe-3 text-end">{en ? "Value" : "数值"}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell className="ps-3 font-medium">{row.name}</TableCell>
                  <TableCell className="text-muted-foreground">{row.owner}</TableCell>
                  <TableCell className="pe-3 text-end">
                    <Badge>{row.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="border-t">
        <CodeBlock className="my-0 rounded-none border-0" code={cssFor(brand, radius, compact, panelRadius)} lang="css" title={en ? "Preview CSS" : "预览 CSS"} />
      </div>
    </div>
  );
}

const headScript = `<script>
  // 在首帧绘制前应用已保存的主题，避免浅色闪烁。
  try {
    var t = localStorage.getItem("yq-theme");
    var dark = t === "dark" || ((!t || t === "system") && matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", dark);
  } catch (e) {}
</script>`;

const useThemeSnippet = `import { Button } from "@qingye/ui/components/button";
import { useTheme } from "@qingye/ui/components/theme-provider";

export function ThemeSwitch() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  // theme: "light" | "dark" | "system"；resolvedTheme 是实际生效的那一个
  return (
    <Button onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
      当前：{theme}
    </Button>
  );
}`;

export default function ThemingPage() {
  const en = useDocsLocale() === "en";
  return <article><PageHeader title={en ? "Theming" : "主题"} />
    <H2 id="axes">{en ? "Three independent axes" : "三个独立维度"}</H2><P>{en ? "Brand identity belongs to html[data-brand]. ThemeProvider controls light and dark classes by default; data-theme is reserved for its explicit attribute mode. Density uses data-density. Keep these roles independent." : "品牌写入 html[data-brand]。ThemeProvider 默认管理浅深色 class，data-theme 留给显式属性模式。密度使用 data-density，三个角色分别配置。"}</P>
    <CodeBlock lang="css" code={'html[data-brand="project"] { --qy-primary: var(--project-primary); }\nhtml[data-brand="project"].dark { --qy-primary: var(--project-primary-dark); }'} />
    <H2 id="preview">{en ? "Theme workbench" : "主题试验台"}</H2><P>{en ? "These isolated palettes and radius ranges are website presets. The preview rebinds the roles its controls consume. Verify text, boundaries, and focus against their actual backgrounds before using a palette in a project." : "试验台的配色与圆角范围是官网预设；预览局部重绑实际控件消费的角色。项目采用前，在真实背景上检查文字、边界和焦点。"}</P><ThemeBench />
    <H2 id="dark-mode">{en ? "Light and dark" : "浅色与深色"}</H2><P>{en ? "ThemeProvider stores the selected mode. Match the application's first-paint setup to its actual provider configuration." : "ThemeProvider 保存选择的明暗模式，应用首屏设置应与实际 Provider 配置一致。"}</P><CodeBlock code={headScript} lang="html" /><CodeBlock code={useThemeSnippet} />
    <H2 id="tokens">{en ? "Override consumed roles" : "覆盖实际消费的角色"}</H2><P>{en ? "Change the project's central theme entry, then inspect the computed values of affected controls. A token name or source reference count does not prove the rendered value." : "在项目集中主题入口修改角色，再检查受影响控件的实际计算值。令牌名称或源码引用数不能证明运行时取值。"} <A href="/docs/tokens">{en ? "Token reference" : "令牌参考"}</A></P>
  </article>;
}
