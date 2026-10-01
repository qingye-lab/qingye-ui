import { TableBody, TableCell, TableHead } from "@yanqing/ui/components/table";
import { TableHeader } from "@yanqing/ui/components/table";
import { Badge } from "@yanqing/ui/components/badge";
import { Button } from "@yanqing/ui/components/button";
import { Checkbox } from "@yanqing/ui/components/checkbox";
import { Field, FieldLabel } from "@yanqing/ui/components/field";
import { Input } from "@yanqing/ui/components/input";
import { Label } from "@yanqing/ui/components/label";
import { Slider } from "@yanqing/ui/components/slider";
import { Switch } from "@yanqing/ui/components/switch";
import { Table, TableRow } from "@yanqing/ui/components/table";
import { useTheme } from "@yanqing/ui/components/theme-provider";
import { ToggleGroup, ToggleGroupItem } from "@yanqing/ui/components/toggle-group";
import { cn } from "@yanqing/ui";
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

const DEFAULT_RADIUS = 0.625;

function radiusVars(radius: number): Record<string, string> {
  // Derived radii are resolved where they are declared (:root), so a scoped
  // override has to restate them; at :root, --qy-radius alone is enough.
  const r = `${radius}rem`;
  return {
    "--qy-radius": r, "--qy-radius-xs": `max(0rem, calc(${r} - 0.375rem))`, "--qy-radius-sm": `max(0rem, calc(${r} - 0.25rem))`, "--qy-radius-md": `max(0rem, calc(${r} - 0.125rem))`, "--qy-radius-lg": r, "--qy-radius-xl": `calc(${r} + 0.25rem)`, "--qy-radius-2xl": `calc(${r} + 0.375rem)`, "--radius": r, };
}

function cssFor(brand: Brand, radius: number, compact: boolean): string {
  const root: string[] = [];
  const dark: string[] = [];
  if (brand.light && brand.dark) {
    root.push(`--qy-primary: ${brand.light.primary};`, `--qy-primary-foreground: ${brand.light.foreground};`, `--qy-ring: ${brand.light.ring};`);
    dark.push(`--qy-primary: ${brand.dark.primary};`, `--qy-primary-foreground: ${brand.dark.foreground};`, `--qy-ring: ${brand.dark.ring};`);
  }
  if (radius !== DEFAULT_RADIUS) root.push(`--qy-radius: ${radius}rem;`);
  const blocks = [`@import "tailwindcss";`, `@import "@yanqing/ui/styles.css";`];
  if (root.length) blocks.push(`\n:root {\n${root.map((line) => `  ${line}`).join("\n")}\n}`);
  if (dark.length) blocks.push(`\n.dark {\n${dark.map((line) => `  ${line}`).join("\n")}\n}`);
  if (compact) blocks.push(`\n/* 在 <body> 或某个容器上：data-density="compact" */`);
  if (!root.length && !dark.length && !compact) blocks.push(`\n/* 默认主题：无需覆盖 */`);
  return blocks.join("\n");
}

const rows = [
  { name: "季度报告.pdf", owner: "林晚", size: "2.4 MB", status: "已发布" }, { name: "品牌规范 v3", owner: "周屿", size: "18.0 MB", status: "审核中" }, { name: "访谈纪要", owner: "陈默", size: "312 KB", status: "草稿" }, ];

function ThemeBench() {
  const { resolvedTheme } = useTheme();
  const [brandId, setBrandId] = useState("indigo");
  const [radius, setRadius] = useState(DEFAULT_RADIUS);
  const [compact, setCompact] = useState(false);
  const densityId = useId();
  const brand = BRANDS.find((item) => item.id === brandId) ?? BRANDS[0]!;
  const palette = resolvedTheme === "dark" ? brand.dark : brand.light;

  const style = useMemo(
    () =>
      ({
        ...(palette ? { "--qy-primary": palette.primary, "--qy-primary-foreground": palette.foreground, "--qy-ring": palette.ring } : {}), ...radiusVars(radius), }) as CSSProperties, [palette, radius], );

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
              圆角 --qy-radius
            </span>
            <span className="font-mono text-muted-foreground text-xs numeric">{radius.toFixed(3).replace(/0+$/, "").replace(/\.$/, "")}rem</span>
          </div>
          <Slider
            aria-labelledby="radius-label"
            max={1}
            min={0.25}
            onValueChange={(value) => setRadius(Array.isArray(value) ? value[0]! : (value as number))}
            step={0.125}
            value={radius}
          />
        </div>
        <div className="flex items-center gap-2 sm:pb-1">
          <Switch checked={compact} id={densityId} onCheckedChange={setCompact} />
          <Label htmlFor={densityId}>紧凑密度</Label>
        </div>
      </div>

      <div className="grid gap-6 p-5 sm:p-6 md:grid-cols-[minmax(0, 1fr)_minmax(0, 1.25fr)]" data-density={compact ? "compact" : undefined} style={style}>
        <div className="flex flex-col gap-4">
          <Field>
            <FieldLabel>邀请成员</FieldLabel>
            <Input defaultValue="lin.wan@example.com" type="email" />
          </Field>
          <label className="flex items-center gap-2 text-sm">
            <Checkbox defaultChecked />
            发送欢迎邮件
          </label>
          <div className="flex flex-wrap items-center gap-2">
            <Button>发送邀请</Button>
            <Button variant="outline">取消</Button>
            <Badge variant="outline">3 个席位</Badge>
          </div>
        </div>
        <div className={cn("min-w-0 overflow-hidden rounded-xl border")}>
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
        <CodeBlock className="my-0 rounded-none border-0" code={cssFor(brand, radius, compact)} lang="css" title="对应的 CSS" />
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

const useThemeSnippet = `import { useTheme } from "@yanqing/ui";

export function ThemeSwitch() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  // theme: "light" | "dark" | "system"；resolvedTheme 是实际生效的那一个
  return (
    <button onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
      当前：{theme}
    </button>
  );
}`;

export default function ThemingPage() {
  return (
    <article>
      <PageHeader
        description="组件只读取语义令牌。改动几个 CSS 变量就能换品牌色、圆角和密度；深色模式是同一组名字的另一套取值。"
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
      <P>选择一种品牌色、拖动圆角、打开紧凑密度。下方的 CSS 会同步更新，可以直接复制到项目里。</P>
      <ThemeBench />

      <H2 id="brand">品牌色</H2>
      <P>
        在引入 <Code>styles.css</Code> 之后覆盖语义令牌。浅色写在 <Code>:root</Code>，深色写在 <Code>.dark</Code>：
      </P>
      <CodeBlock code={cssFor(BRANDS[1]!, DEFAULT_RADIUS, false)} lang="css" title="src/index.css" />
      <Callout tone="warning" title="检查对比度">
        主色与它的前景色之间至少要有 4.5:1 的对比度，浅色和深色都要验证。状态色（<Code>--qy-danger</Code> 等）的浅色填充由实色自动派生，改了实色，填充随之变化。
      </Callout>

      <H2 id="radius">圆角</H2>
      <P>
        所有圆角都从 <Code>--qy-radius</Code>（默认 0.625rem）派生：菜单项用 <Code>md</Code>，控件和浮层用 <Code>lg</Code>，卡片和弹窗用 <Code>2xl</Code>
        ，嵌套圆角保持“外层减间距”。在 <Code>:root</Code> 上改这一个变量即可整体变圆或变方。
      </P>
      <CodeBlock code={`:root {\n  --qy-radius: 0.5rem;\n}`} lang="css" />
      <P className="text-[0.875rem] text-muted-foreground">
        派生令牌在声明它们的 <Code>:root</Code> 上求值。如果只想让某个区域使用不同圆角，需要在那个容器上同时声明 <Code>--qy-radius-sm</Code> 到{" "}
        <Code>--qy-radius-2xl</Code>，上面的示例就是这样做的。
      </P>

      <H2 id="density">密度</H2>
      <P>
        数据密集的界面可以在 <Code>{"<body>"}</Code> 或任意容器上加 <Code>data-density="compact"</Code>：表格行高从 48px 降到 40px，面板内边距与区块间距随之收紧，顶栏高度变为
        48px。单个表格也可以用 <Code>{'<Table density="compact">'}</Code> 单独调整。
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
        语义令牌也绑定在 <Code>.dark</Code> 类本身上，所以给任意容器加 <Code>className="dark"</Code>，其中的组件就按深色渲染，适合深色的代码区或预览框。
      </P>
    </article>
  );
}
