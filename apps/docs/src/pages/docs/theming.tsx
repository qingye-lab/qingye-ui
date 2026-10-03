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
import { useId, useMemo, useState, type CSSProperties } from "react";
import { CodeBlock } from "@/components/code-block";
import { A, Callout, Code, Facts, H2, H3, P, PageHeader } from "@/components/prose";

interface Brand {
  id: string;
  label: string;
  light?: { primary: string; foreground: string; ring: string };
  dark?: { primary: string; foreground: string; ring: string };
}

// Primaries keep at least 4.5:1 against their foreground in both themes.
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
  { name: "季度报告.pdf", owner: "林晚", size: "2.4 MB", status: "已发布" }, { name: "品牌规范 v3", owner: "周屿", size: "18.0 MB", status: "审核中" }, { name: "访谈纪要", owner: "陈默", size: "312 KB", status: "草稿" }, ];

function ThemeBench() {
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
            品牌色
          </span>
          <ToggleGroup
            aria-labelledby="brand-label"
            className="flex-wrap"
            onValueChange={(value) => value[0] && setBrandId(value[0] as string)}
            size="sm"
            value={[brandId]}
            variant="outline"
          >
            {BRANDS.map((item) => (
              <ToggleGroupItem className="gap-1.5 px-2" key={item.id} value={item.id}>
                <span
                  aria-hidden="true"
                  className="size-3 rounded-full border border-foreground/10"
                  style={{ background: (resolvedTheme === "dark" ? item.dark : item.light)?.primary ?? "var(--qy-neutral-800)" }}
                />
                <span className="text-caption">{item.label}</span>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        <div className="flex min-w-48 flex-1 flex-col gap-2 sm:max-w-60">
          <div className="flex items-center justify-between">
            <span className="font-medium text-muted-foreground text-caption" id="radius-label">
              根圆角 --qy-radius
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
            <span className="font-medium text-muted-foreground text-caption" id="panel-radius-label">面板 --qy-radius-panel</span>
            <span className="font-mono text-muted-foreground text-caption numeric">{panelRadius}rem</span>
          </div>
          <Slider aria-labelledby="panel-radius-label" max={1.5} min={0} onValueChange={(value) => setPanelRadius(Array.isArray(value) ? value[0]! : value as number)} step={0.125} value={panelRadius} />
        </div>
        <div className="flex items-center gap-2 sm:pb-1">
          <Switch checked={compact} id={densityId} onCheckedChange={setCompact} />
          <Label htmlFor={densityId}>紧凑密度</Label>
        </div>
      </div>

      <div className="grid gap-6 p-5 sm:p-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]" data-density={compact ? "compact" : undefined} style={style}>
        <div className="flex flex-col gap-4">
          <Field>
            <FieldLabel>邀请成员</FieldLabel>
            <Input defaultValue="lin.wan@example.com" type="email" />
          </Field>
          <Label>
            <Checkbox defaultChecked />
            发送欢迎邮件
          </Label>
          <div className="flex flex-wrap items-center gap-2">
            <Button>发送邀请</Button>
            <Button variant="quiet">取消</Button>
            <Badge variant="outline">3 个席位</Badge>
          </div>
        </div>
        <div className={cn("min-w-0 overflow-hidden rounded-panel border")}>
          <Table density={compact ? "compact" : "default"}>
            <TableHeader>
              <TableRow>
                <TableHead className="ps-3">文件</TableHead>
                <TableHead>负责人</TableHead>
                <TableHead className="pe-3 text-end">状态</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell className="ps-3 font-medium">{row.name}</TableCell>
                  <TableCell className="text-muted-foreground">{row.owner}</TableCell>
                  <TableCell className="pe-3 text-end">
                    <Badge variant={row.status === "已发布" ? "success" : row.status === "审核中" ? "warning" : "secondary"}>{row.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="border-t">
        <CodeBlock className="my-0 rounded-none border-0" code={cssFor(brand, radius, compact, panelRadius)} lang="css" title="对应的 CSS" />
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
  return (
    <article>
      <PageHeader
        title="主题"
      />

      <H2 id="layers">三层令牌</H2>
      <Facts
        items={[
          {
            term: "原语",
            detail: (
              <>
                <Code>tokens/primitives.css</Code>：原始色板，不带含义，例如 <Code>--qy-neutral-800</Code>。数值与 Tailwind 4 色板一致。组件从不直接引用这一层。
              </>
            ),
          },
          {
            term: "语义",
            detail: (
              <>
                <Code>tokens/semantic.css</Code>：颜色角色，例如 <Code>--qy-primary</Code>、<Code>--qy-border</Code>、<Code>--qy-danger</Code>。浅色与深色是同名变量的两套绑定。
              </>
            ),
          },
          {
            term: "组件",
            detail: (
              <>
                <Code>tokens/components.css</Code>：字号、间距、圆角、控件高度、密度与动效。覆盖这些变量即可调整已有组件，无需修改组件源码或 API。
              </>
            ),
          },
        ]}
      />
      <P>
        <Code>theme.css</Code> 把语义令牌映射为 Tailwind 工具类：<Code>bg-primary</Code> 直接读取 <Code>var(--qy-primary)</Code>，因此切换主题不需要重新编译。另有一组不带前缀的兼容变量（
        <Code>--background</Code>、<Code>--card</Code>……）供 shadcn 风格的代码使用，它们总是指向 <Code>--qy-*</Code>，不要直接覆盖。完整取值见{" "}
        <A href="/docs/tokens">设计令牌</A>。
      </P>

      <H2 id="playground">试一试</H2>
      <P>预览中的颜色和圆角仅影响示例，生成的 CSS 应写在项目的 html 上。配色预设只用于本站示例，库内不提供这些品牌包。</P>
      <ThemeBench />

      <H2 id="brand">品牌色</H2>
      <P>
        在引入 <Code>styles.css</Code> 之后，用 <Code>html[data-brand]</Code> 覆盖项目品牌。默认明暗标记为 <Code>.light/.dark</Code>，密度用 <Code>data-density</Code>；品牌仅写入 <Code>data-brand</Code>，缺省品牌可省略该属性。使用 <Code>attribute="data-theme"</Code> 时，<Code>data-theme</Code> 仅保存 light/dark，不可填写品牌名。
      </P>
      <CodeBlock code={cssFor(BRANDS[1]!, DEFAULT_RADIUS, false)} lang="css" title="src/index.css" />
      <Callout tone="warning" title="检查对比度">
        主色与它的前景色之间至少要有 4.5:1 的对比度，浅色和深色都要验证。修改危险标记和边框的 <Code>--qy-danger</Code> 后，实心动作底色仍需另改 <Code>--qy-danger-fill</Code>；各角色对应关系见 <A href="/docs/tokens#colors">颜色令牌</A>。
      </Callout>

      <H2 id="radius">圆角</H2>
      <P>
        在 html[data-brand] 上设置 <Code>--qy-radius</Code> 调整控件圆角，设置 <Code>--qy-radius-panel</Code> 调整面板圆角。默认值与联动范围见 <A href="/docs/tokens#radius">设计令牌</A>。
      </P>
      <CodeBlock code={`html[data-brand="project"] {\n  --qy-radius: 0.5rem;\n  --qy-radius-panel: 0.75rem;\n}`} lang="css" />
      <P className="text-body text-muted-foreground">
        把这些覆盖写在 html；局部容器修改根变量时，继承的派生变量不一定重新计算。
      </P>

      <H2 id="density">密度</H2>
      <P>
        在 html 或局部容器设置 <Code>data-density="compact"</Code>，或给单个 Table 设置 <Code>density="compact"</Code>。表格行高默认从 48px 变为 40px，面板 gap 与 section-gap 同时减小；控件高度和触摸目标不变。面板 padding 和 topbar 高度按视口宽度变化，不由 compact 控制。密度只影响已使用这些变量的组件。
      </P>
      <CodeBlock code={`<main data-density="compact">\n  <Table>…</Table>\n</main>`} />

      <H2 id="dark-mode">深色模式</H2>
      <P>
        <Code>ThemeProvider</Code> 在 <Code>{"<html>"}</Code> 上切换 <Code>.dark</Code> 类（也可以用 <Code>attribute="data-theme"</Code> 改为属性），并把用户的选择存进{" "}
        <Code>localStorage</Code>。切换瞬间会暂停一帧过渡，让所有表面同时变色。
      </P>
      <H3 id="head-script">首屏脚本</H3>
      <P>
        React 挂载之前页面已经开始绘制。把下面的脚本放进 <Code>{"<head>"}</Code>，在首帧之前读出保存的主题，就不会出现浅色闪烁：
      </P>
      <CodeBlock code={headScript} lang="html" title="index.html" />
      <P className="text-body text-muted-foreground">
        修改了 <Code>storageKey</Code> 或 <Code>attribute</Code> 时，脚本里的键名与写法要一起改。
      </P>
      <H3 id="use-theme">读取与切换</H3>
      <CodeBlock code={useThemeSnippet} />
      <H3 id="scoped">局部深色</H3>
      <P>
        基础深色语义绑定也支持局部 <Code>className="dark"</Code>，适合预览框。项目的文档级品牌覆盖不会自动转成局部品牌，Portal 也不保证继承该容器配置；需要时明确设置对应作用域。
      </P>
    </article>
  );
}
