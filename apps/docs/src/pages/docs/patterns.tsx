import { lazy, Suspense, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { A, Facts, H2, P, PageHeader } from "@/components/prose";
import { CodeBlock } from "@/components/code-block";
import { SITE } from "@/lib/site";
import { patterns } from "@/patterns/metadata";
import { NotFoundContent } from "../not-found";
import "@/patterns/patterns.css";

const views = { edit: lazy(() => import("@/patterns/edit")), collection: lazy(() => import("@/patterns/collection")), detail: lazy(() => import("@/patterns/detail")), review: lazy(() => import("@/patterns/review")), queue: lazy(() => import("@/patterns/queue")), read: lazy(() => import("@/patterns/read")) };
const sources = import.meta.glob<string>("../../patterns/*.{tsx,ts,css}", { query: "?raw", import: "default" });
export function PatternsIndexPage() {
  return <article><PageHeader title="围绕任务组合" description="正常、等待、失败、取消与返回，共同构成一次使用。" /><P>工作界面与阅读同样重要。先试用真实操作，再看每种组合怎样保存输入、范围与上下文。这些示例使用合成资料和确定的本地事件。</P><div className="qy-pattern-list">{patterns.map((pattern) => <Link className="focus-ring" key={pattern.slug} to={pattern.href}><h2 className="text-title font-semibold">{pattern.title}</h2><P>{pattern.description}</P><span className="text-caption text-muted-foreground">{pattern.methods.join(" · ")}</span></Link>)}</div></article>;
}
export default function PatternPage() {
  const { slug = "" } = useParams();
  const pattern = patterns.find((item) => item.slug === slug);
  const [code, setCode] = useState("");
  if (!pattern) return <NotFoundContent detail="没有这个任务模式。" />;
  const View = views[pattern.slug];
  return <article><PageHeader title={pattern.title} description={pattern.description} /><div className="qy-pattern-frame"><Suspense fallback={<p role="status">正在载入任务示例…</p>}><View key={pattern.slug} /></Suspense></div>
    <H2 id="decisions">使用判断</H2><Facts items={[{ term: "方法", detail: pattern.methods.join("、") }, { term: "公共库", detail: "基础交互、语义、样式与可访问部件。" }, { term: "示例应用", detail: "对象、输入、查询、选择、版本、计时与模拟结果。" }, { term: "后端接入", detail: "真实权限、写入、幂等、核实与取消协议由宿主负责；本地模拟没有验证这些能力。" }]} />
    <P>状态演示在示例底部的“演示与状态”中。先操作正常路径，再重放相关异常。{pattern.slug === "edit" && "可以输入后选择失败或超时，再保存、核实、放弃或恢复。"}{pattern.slug === "collection" && "可选择跨页对象，比较密度，并仅重试失败项。"}{pattern.slug === "review" && "核对后改变范围或建议版本，会要求重新确认。"}{pattern.slug === "queue" && "取消请求有延迟，过晚取消会返回真实完成结果。"}{pattern.slug === "detail" && "同一对象支持直接链接；对象消失后提供稳定返回。"}{pattern.slug === "read" && "章节可直接进入，记下位置后可以继续阅读。"}</P>
    {pattern.slug === "collection" && <P>这个比较示例用 Table 保留二维关系与显式查询范围；需要排序、分页和列治理时使用 <A href="/docs/components/data-table#server-selection">真实 DataTable 跨页选择示例</A>：ids 是所有页的已选范围，rows 是当前 data 中的对象。</P>}
    <H2 id="components">组成部件</H2><P>{pattern.components.map((name, index) => <span key={name}>{index > 0 && " · "}<A href={`/docs/components/${name}`}>{name}</A></span>)}</P>
    <H2 id="source">同源代码</H2><P>示例直接导入公共包；应用状态与项目布局集中在相邻文件。可以取得 <a className="focus-ring underline" href={`/ai/v${SITE.version}/patterns/${pattern.slug}.md`} download>版本化 Markdown</a>，或展开代码。</P><details onToggle={(event) => { if (event.currentTarget.open) Promise.all([pattern.slug + ".tsx", "state.ts", "shared.tsx", "patterns.css"].map(async (name) => { const text = await sources[`../../patterns/${name}`]?.(); return text ? `// ${name}\n${text}` : ""; })).then((files) => setCode(files.join("\n\n"))); }}><summary className="focus-ring cursor-pointer">查看当前示例源码</summary>{code ? <CodeBlock code={code} /> : <p>展开后读取同源代码。</p>}</details>
  </article>;
}
