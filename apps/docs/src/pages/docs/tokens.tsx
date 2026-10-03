import themeCss from "@qingye/ui/theme.css?raw";
import componentsCss from "@qingye/ui/tokens/components.css?raw";
import semanticCss from "@qingye/ui/tokens/semantic.css?raw";
import { Table, TableBody, TableCaption, TableCell, TableContainer, TableHead, TableHeader, TableRow } from "@qingye/ui/components/table";
import { useTheme } from "@qingye/ui/components/theme-provider";
import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { A, Code, H2, P, PageHeader } from "@/components/prose";
import { useDocsLocale } from "@/lib/docs-locale";
const names = (css: string) => [...new Set([...css.matchAll(/--qy-([a-z0-9-]+)\s*:/g)].map(match => match[1]!))];
const colors = names(semanticCss).filter(name => !name.startsWith("shadow-"));
const roles = names(componentsCss);
const groups = [
  { id: "typography", zh: "排版", en: "Typography", names: roles.filter(name => name.startsWith("text-")) },
  { id: "spacing", zh: "间距与容量", en: "Spacing and capacity", names: roles.filter(name => /^(space-|field-|action-|panel-|section-|row-|topbar-)/.test(name)) },
  { id: "radius", zh: "圆角", en: "Radii", names: roles.filter(name => name.startsWith("radius")) },
  { id: "focus", zh: "焦点", en: "Focus", names: roles.filter(name => name.startsWith("focus-")) },
  { id: "controls", zh: "控件尺寸与命中区", en: "Control dimensions and targets", names: roles.filter(name => /^(control-|touch-target)/.test(name)) },
  { id: "motion", zh: "动效", en: "Motion", names: roles.filter(name => /^(duration-|ease-|stagger)/.test(name)) },
];
const allNames = [...colors, ...roles];
const utility = (name: string) => [...themeCss.matchAll(/--(?:color|radius|text)-([a-z0-9-]+):\s*var\(--qy-([a-z0-9-]+)\)/g)].filter(match => match[2] === name).map(match => match[1]).join(" / ");
function useValues() {
  const { resolvedTheme } = useTheme();
  const [values,setValues] = useState<Record<string,string>>({});
  useLayoutEffect(() => { const style = getComputedStyle(document.documentElement); setValues(Object.fromEntries(allNames.map(name => [name,style.getPropertyValue(`--qy-${name}`).trim()]))); },[resolvedTheme]);
  return values;
}
function ColorSample({ name }: { name: string }) {
  const { resolvedTheme } = useTheme();
  const probe = useRef<HTMLSpanElement>(null); const [computed,setComputed] = useState("");
  const text = name.includes("foreground") || name.endsWith("on-fill");
  const base = name === "danger-on-fill" ? "danger-fill" : name.replace(/-foreground$/," ").trim();
  const hasBase = base !== name && colors.includes(base);
  useLayoutEffect(() => { if (probe.current) { const style = getComputedStyle(probe.current); setComputed(text ? style.color : style.backgroundColor); } },[name,text,resolvedTheme]);
  const style = { ...(text ? { color: `var(--qy-${name})`, backgroundColor: hasBase ? `var(--qy-${base})` : "var(--qy-background)" } : { backgroundColor: `var(--qy-${name})` }) } as CSSProperties;
  return <span ref={probe} className="inline-flex min-w-11 min-h-11 items-center justify-center rounded-item border border-border text-body" style={style} title={computed}>{text ? "Aa" : ""}</span>;
}
function TokenRows({ list, values, caption, en, paint = false }: { list: string[]; values: Record<string,string>; caption: string; en: boolean; paint?: boolean }) {
  return <TableContainer><Table data-density="compact"><TableCaption>{caption}</TableCaption><TableHeader><TableRow><TableHead>{en ? "Token" : "令牌"}</TableHead><TableHead>{en ? "Current value" : "当前取值"}</TableHead><TableHead>{en ? "Utility alias" : "工具类别名"}</TableHead>{paint && <TableHead>{en ? "Current theme" : "当前主题"}</TableHead>}</TableRow></TableHeader><TableBody>{list.map(name => <TableRow key={name}><TableCell><code className="font-mono">--qy-{name}</code></TableCell><TableCell className="wrap-anywhere font-mono">{values[name] || "…"}</TableCell><TableCell className="wrap-anywhere font-mono">{utility(name) || "—"}</TableCell>{paint && <TableCell><ColorSample name={name} /></TableCell>}</TableRow>)}</TableBody></Table></TableContainer>;
}
export default function TokensPage() {
  const en = useDocsLocale() === "en"; const values = useValues();
  return <article><PageHeader title={en ? "Design tokens" : "设计令牌"} description={en ? "Names come from the current stylesheet. Values are read from this page's actual theme after mounting." : "名称来自当前样式表，取值在挂载后读取本页实际主题。"} /><P>{en ? "An override affects components that consume its role. Inspect the rendered result; a source reference or a color swatch alone does not prove contrast or usability." : "覆盖会影响实际消费该角色的组件。需要检查渲染结果；源码引用或单个色样不能证明对比度与可用性。"} <A href="/docs/theming">{en ? "Project theme entry" : "项目主题入口"}</A></P><H2 id="colors">{en ? "Colors" : "颜色"}</H2><P>{en ? "Switch the site's light and dark theme to inspect each combination. Filled actions and their text use paired roles; supporting text still needs the applicable text contrast." : "切换本站浅深色检查实际组合。实心动作与文字使用配对角色，辅助文字仍须满足适用文字对比度。"}</P><TokenRows list={colors} values={values} en={en} paint caption={en ? "Semantic colors in the current theme" : "当前主题的语义颜色"} />{groups.map(group => <section key={group.id}><H2 id={group.id}>{en ? group.en : group.zh}</H2><TokenRows list={group.names} values={values} en={en} caption={en ? group.en : group.zh} /></section>)}<P><Code>--qy-control-*</Code>{en ? " describes the control's external size. Narrow-viewport size and coarse-pointer targets are separate conditions. Focus roles draw inside the control boundary." : " 表达控件外部尺寸，窄视口尺寸与粗指针命中区分别判断；焦点角色绘制在控件边界内。"}</P></article>;
}
