import { Link } from "@/components/locale-link";
import { lazy, Suspense, useState } from "react";
import { Button } from "@qingye/ui/components/button";
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "@qingye/ui/components/collapsible";
import { useParams } from "react-router-dom";
import { A, Facts, H2, P, PageHeader } from "@/components/prose";
import { CodeBlock } from "@/components/code-block";
import { SITE } from "@/lib/site";
import { patterns } from "@/patterns/metadata";
import { NotFoundContent } from "../not-found";
import "@/patterns/patterns.css";

const views = { edit: lazy(() => import("@/patterns/edit")), collection: lazy(() => import("@/patterns/collection")), detail: lazy(() => import("@/patterns/detail")), review: lazy(() => import("@/patterns/review")), queue: lazy(() => import("@/patterns/queue")), read: lazy(() => import("@/patterns/read")) };
const sources = import.meta.glob<string>("../../patterns/*.{tsx,ts,css}", { query: "?raw", import: "default" });
export function PatternsIndexPage() {
  return <article><PageHeader title="围绕任务组合" /><P>示例使用合成资料和预设的本地事件。操作后检查输入、选中范围与返回位置是否保留。</P><div className="qy-pattern-list">{patterns.map((pattern) => <Link className="focus-ring" key={pattern.slug} to={pattern.href}><h2 className="text-title">{pattern.title}</h2><P>{pattern.description}</P><span className="text-caption text-muted-foreground">{pattern.methods.join(" · ")}</span></Link>)}</div></article>;
}
export default function PatternPage() {
  const { slug = "" } = useParams();
  const pattern = patterns.find((item) => item.slug === slug);
  const [code, setCode] = useState("");
  if (!pattern) return <NotFoundContent detail="没有这个任务模式。" />;
  const View = views[pattern.slug];
  return <article><PageHeader title={pattern.title} description={pattern.description} /><div className="qy-pattern-frame"><Suspense fallback={<p role="status">正在载入任务示例…</p>}><View key={pattern.slug} /></Suspense></div>
    <H2 id="decisions">使用判断</H2><Facts items={[{ term: "方法", detail: pattern.methods.join("、") }, { term: "公共库", detail: "基础交互、语义、样式与可访问部件。" }, { term: "示例应用", detail: "对象、输入、查询、选择、版本、计时与模拟结果。" }, { term: "后端接入", detail: "真实权限、写入、幂等、核实与取消协议由宿主负责；本地模拟没有验证这些能力。" }]} />
    {pattern.slug === "collection" && <P>用 Table 比较字段并明确查询范围；需要排序、分页和列治理时使用 <A href="/docs/components/data-table#server-selection">DataTable 跨页选择示例</A>。ids 包含跨页已选对象的 id，rows 只包含当前 data 中的已选对象。</P>}
    <H2 id="components">组成部件</H2><P>{pattern.components.map((name, index) => <span key={name}>{index > 0 && " · "}<A href={`/docs/components/${name}`}>{name}</A></span>)}</P>
    <H2 id="source">同源代码</H2><P>下载 <a className="focus-ring underline" href={`/ai/v${SITE.version}/patterns/${pattern.slug}.md`} download>版本化 Markdown</a>，或展开当前源码。</P><Collapsible onOpenChange={(open) => { if (open) Promise.all([pattern.slug + ".tsx", "state.ts", "shared.tsx", "patterns.css"].map(async (name) => { const text = await sources[`../../patterns/${name}`]?.(); return text ? `// ${name}\n${text}` : ""; })).then((files) => setCode(files.join("\n\n"))); }}><CollapsibleTrigger render={<Button size="sm" variant="quiet" />}>查看当前示例源码</CollapsibleTrigger><CollapsiblePanel keepMounted>{code ? <CodeBlock code={code} /> : <p>源码尚未载入。</p>}</CollapsiblePanel></Collapsible>
  </article>;
}
