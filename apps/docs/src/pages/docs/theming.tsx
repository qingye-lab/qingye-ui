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
          <span className="font-medium text-muted-foreground text-xs" id="brand-label">
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
                <span className="text-xs">{item.label}</span>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        <div className="flex min-w-48 flex-1 flex-col gap-2 sm:max-w-60">
          <div className="flex items-center justify-between">
            <span className="font-medium text-muted-foreground text-xs" id="radius-label">
              根圆角 --qy-radius
            </span>
            <span className="font-mono text-muted-foreground text-xs numeric">{radius.toFixed(3).replace(/0+$/, "").replace(/\.$/, "")}rem</span>
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
            <span className="font-medium text-muted-foreground text-xs" id="panel-radius-label">面板 --qy-radius-panel</span>
            <span className="font-mono text-muted-foreground text-xs numeric">{panelRadius}rem</span>
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
            <Button variant="outline">取消</Button>
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
        description="品牌、明暗与密度各自独立。通过文档级 CSS 覆盖颜色、控件与面板角色，组件继续使用同一套 API。"
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
                <Code>tokens/semantic.css</Code>：界面谈论的角色，例如 <Code>--qy-primary</Code>、<Code>--qy-border</Code>、<Code>--qy-danger</Code>。浅色与深色是同名变量的两套绑定。
              </>
            ),
          },
          {
            term: "组件",
            detail: (
              <>
                <Code>tokens/components.css</Code>：字号、间距、圆角、控件高度、密度与动效。让你不改源码就能把表格调密、把控件调圆、把动效调慢。
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
      <P>选择示例配色，分别调整根圆角和面板圆角，再切换紧凑密度。预览显式重绑局部角色；生成的 CSS 用于项目的 html 根节点。配色预设仅供本站演示，不是库内品牌包。</P>
      <ThemeBench />

      <H2 id="brand">品牌色</H2>
      <P>
        在引入 <Code>styles.css</Code> 之后，用 <Code>html[data-brand]</Code> 覆盖项目品牌。缺省品牌不需要此属性；品牌、明暗、密度分别使用 <Code>data-brand</Code>、<Code>.light/.dark</Code>（Provider 默认）和 <Code>data-density</Code>。显式设置 <Code>attribute="data-theme"</Code> 时，明暗改用该属性，品牌不能写进它。
      </P>
      <CodeBlock code={cssFor(BRANDS[1]!, DEFAULT_RADIUS, false)} lang="css" title="src/index.css" />
      <Callout tone="warning" title="检查对比度">
        主色与它的前景色之间至少要有 4.5:1 的对比度，浅色和深色都要验证。危险状态 mark/边框用 <Code>--qy-danger</Code>，页面文字用 <Code>--qy-danger-foreground</Code>，实心动作填充和其上文字分别用 <Code>--qy-danger-fill</Code> / <Code>--qy-danger-on-fill</Code>；修改 mark 不会自动改实心动作填充。
      </Callout>

      <H2 id="radius">圆角</H2>
      <P>
        根圆角 <Code>--qy-radius</Code> 默认 0.5rem（8px），只联动 <Code>md</Code>（根减0.5px，最小0）与 <Code>lg</Code>。<Code>--qy-radius-control</Code> 默认接 lg；面板角色 <Code>--qy-radius-panel</Code> 默认接独立的 2xl（12px）。xs/sm/xl/2xl/full 保持独立。
      </P>
      <CodeBlock code={`html[data-brand="project"] {\n  --qy-radius: 0.5rem;\n  --qy-radius-panel: 0.75rem;\n}`} lang="css" />
      <P className="text-[0.875rem] text-muted-foreground">
        接入 control/panel 角色的内高光按对应外层角色减1px并钳制到0。派生变量在声明节点求值；只在局部容器覆盖根变量不保证继承别名重新计算。上方预览显式重绑实际消费角色，不代表库已支持任意局部品牌或 Portal 品牌继承。
      </P>

      <H2 id="density">密度</H2>
      <P>
        文档级密度可设置 <Code>{'<html data-density="compact">'}</Code>；局部容器也可选用 compact 规则。消费这些角色的表格行高从48px降到40px，面板 padding/gap 和 topbar 角色随之收紧。单个表格可用 <Code>{'<Table density="compact">'}</Code>；不是所有组件的几何尺寸都会随密度变化。
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
      <P className="text-[0.875rem] text-muted-foreground">
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
