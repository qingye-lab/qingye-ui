import { Label } from "@qingye/ui/components/label";
import { Button, buttonVariants } from "@qingye/ui/components/button";
import { Checkbox } from "@qingye/ui/components/checkbox";
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "@qingye/ui/components/collapsible";
import { NativeSelect, NativeSelectOption } from "@qingye/ui/components/native-select";
import { Input } from "@qingye/ui/components/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@qingye/ui/components/table";
import { Dialog, DialogPopup, DialogHeader, DialogTitle, DialogDescription, DialogPanel } from "@qingye/ui/components/dialog";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { resources, batchResults, retryFailed, type ItemResult } from "./state";
import { FixtureSettings, Notice, StatusBadge, readSession, writeSession, useTaskTimers } from "./shared";

export default function CollectionPattern() {
  const location = useLocation();
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [appliedQuery, setAppliedQuery] = useState(query);
  const [page, setPage] = useState(Math.max(1, Number(params.get("page") || 1)));
  const [selected, setSelected] = useState<string[]>(() => readSession("collection-selection", []));
  const [results, setResults] = useState<Record<string, ItemResult>>({});
  const [busy, setBusy] = useState(false);
  const [queryBusy, setQueryBusy] = useState(false);
  const [compact, setCompact] = useState(false);
  const [preview, setPreview] = useState<(typeof resources)[number] | null>(null);
  const [collectionState, setCollectionState] = useState<"populated" | "empty" | "no-results" | "forbidden" | "failure">("populated");
  const [accessRequested, setAccessRequested] = useState(false);
  const [deletedIds, setDeletedIds] = useState<string[]>([]);
  const [previewMissing, setPreviewMissing] = useState(false);
  const collectionHeading = useRef<HTMLHeadingElement>(null);
  const [ignored, setIgnored] = useState(0);
  const [retried, setRetried] = useState<string[]>([]);
  const generation = useRef(0);
  const later = useTaskTimers();
  const filtered = (collectionState === "populated" ? resources.filter((row) => !deletedIds.includes(row.id)) : []).filter((row) => `${row.title} ${row.author} ${row.type}`.includes(appliedQuery));
  const pages = Math.max(1, Math.ceil(filtered.length / 3));
  const rows = filtered.slice((Math.min(page, pages) - 1) * 3, Math.min(page, pages) * 3);
  const counts = Object.values(results);
  useEffect(() => { writeSession("collection-selection", selected); }, [selected]);
  function search(value: string, slow = false) {
    if (collectionState === "no-results") setCollectionState("populated");
    setQuery(value); setQueryBusy(true);
    const id = ++generation.current;
    later(() => {
      if (id !== generation.current) { setIgnored((count) => count + 1); return; }
      setAppliedQuery(value); setPage(1); setQueryBusy(false); setParams({ ...(value ? { q: value } : {}), page: "1" }, { replace: true });
    }, slow ? 1700 : 350);
  }
  function toggle(id: string, checked: boolean) { setSelected((ids) => checked ? [...new Set([...ids, id])] : ids.filter((value) => value !== id)); }
  function process() { const scope = [...selected]; setBusy(true); later(() => { setResults(batchResults(scope)); setBusy(false); }); }
  const origin = `${location.pathname}?${params.toString()}`;
  return <section className="qy-task" data-pattern="collection" aria-label="资料集合"><header><div><p className="qy-task-kicker">田野资料</p><h2 ref={collectionHeading} tabIndex={-1}>查找与比较</h2></div>{collectionState !== "forbidden" && <Link className={buttonVariants()} to="/docs/patterns/edit">新建资料</Link>}</header>
    <div className="qy-task-fields"><Label htmlFor="resource-search">搜索名称、作者或类型</Label><Input id="resource-search" onValueChange={(value) => search(value)} type="search" value={query} /></div>
    <div className="qy-task-actions"><span>{selected.length} 项已选（包含其他页）</span><Button disabled={busy || collectionState !== "populated"} onClick={() => setSelected([...new Set([...selected, ...rows.map((row) => row.id)])])} size="sm" variant="outline">选择当前页</Button><Button disabled={busy || !selected.length || collectionState !== "populated"} onClick={() => setSelected([])} size="sm" variant="ghost">清空选择</Button><Button disabled={!selected.length || collectionState !== "populated"} loading={busy} onClick={process}>处理所选 {selected.length} 项</Button></div>
    {queryBusy && <p role="status">正在更新查询，原有结果仍可阅读。</p>}
    <Table className="qy-task-table" density={compact ? "compact" : "default"}><caption className="sr-only">资料名称、类型、大小、作者、更新时间及处理结果</caption><TableHeader><TableRow><TableHead>选择</TableHead><TableHead>资料</TableHead><TableHead>类型</TableHead><TableHead>大小</TableHead><TableHead>作者</TableHead><TableHead>更新日期</TableHead><TableHead>结果</TableHead><TableHead>预览</TableHead></TableRow></TableHeader><TableBody>{rows.map((row) => <TableRow key={row.id}><TableCell><Checkbox aria-label={`选择${row.title}`} checked={selected.includes(row.id)} disabled={busy} onCheckedChange={(checked) => toggle(row.id, checked)} /></TableCell><TableCell><Link className="focus-ring underline underline-offset-4" state={{ from: origin }} to={`/docs/patterns/detail/${row.id}`}>{row.title}</Link></TableCell><TableCell>{row.type}</TableCell><TableCell className="numeric">{row.size}</TableCell><TableCell>{row.author}</TableCell><TableCell className="numeric">{row.date}</TableCell><TableCell><StatusBadge value={results[row.id] ?? "ready"} /></TableCell><TableCell><Button onClick={() => { setPreview(row); setPreviewMissing(false); }} size="sm" variant="ghost">预览<span className="sr-only">{row.title}</span></Button></TableCell></TableRow>)}</TableBody></Table>
    {collectionState === "empty" && <Notice title="还没有资料"><Link className={buttonVariants({ variant: "outline" })} to="/docs/patterns/edit">创建第一份资料</Link></Notice>}
    {(collectionState === "no-results" || (collectionState === "populated" && !rows.length)) && <Notice title="没有符合当前查询的资料">已选对象不会自动清除。<Button onClick={() => { setCollectionState("populated"); search(""); }} variant="outline">清除查询并重新查找</Button></Notice>}
    {collectionState === "forbidden" && <Notice title="当前没有访问权限" tone="warning">资料不会被取回或隐藏在 DOM 中。<Button disabled={accessRequested} onClick={() => setAccessRequested(true)} variant="outline">申请资料访问</Button>{accessRequested && <p role="status">访问申请等待回复，尚未获得权限。</p>}</Notice>}
    {collectionState === "failure" && <Notice title="资料载入未完成" tone="error">原查询和选择仍保留。<Button onClick={() => setCollectionState("populated")} variant="outline">重试载入资料</Button></Notice>}
    <div className="qy-task-actions"><Button disabled={page <= 1} onClick={() => { setPage(page - 1); setParams({ ...(query ? { q: query } : {}), page: String(page - 1) }, { replace: true }); }} variant="outline">上一页</Button><span className="numeric">第 {Math.min(page, pages)} / {pages} 页</span><Button disabled={page >= pages} onClick={() => { setPage(page + 1); setParams({ ...(query ? { q: query } : {}), page: String(page + 1) }, { replace: true }); }} variant="outline">下一页</Button></div>
    {!!counts.length && <Notice title={`已完成 ${counts.filter((value) => value === "success").length} 项，未完成 ${counts.filter((value) => value === "failure").length} 项，待核实 ${counts.filter((value) => value === "unknown").length} 项`}><div className="qy-task-actions"><Button disabled={!counts.includes("failure")} onClick={() => { const retry = retryFailed(results); setResults(retry.results); setRetried(retry.ids); }} variant="outline">只重试失败项</Button><Button disabled={!counts.includes("unknown")} onClick={() => setResults(Object.fromEntries(Object.entries(results).map(([id, result]) => [id, result === "unknown" ? "success" : result])))} variant="outline">核实未知项</Button></div></Notice>}
    <Dialog open={Boolean(preview)} onOpenChange={(open) => { if (!open) setPreview(null); }}><DialogPopup finalFocus={previewMissing ? collectionHeading : undefined}><DialogHeader><DialogTitle>{previewMissing ? "资料已不可用" : preview?.title ?? "资料预览"}</DialogTitle><DialogDescription>先看摘要，再决定是否进入详情。</DialogDescription></DialogHeader><DialogPanel>{previewMissing ? <Notice title="这个对象已从集合移除" tone="warning">关闭预览后回到集合标题继续工作。</Notice> : <p>{preview?.type} · {preview?.author} · {preview?.size}</p>}{preview && !previewMissing && <Link className={buttonVariants()} state={{ from: origin }} to={`/docs/patterns/detail/${preview.id}`}>打开完整详情</Link>}<Collapsible className="qy-fixture-settings"><CollapsibleTrigger render={<Button size="sm" variant="ghost" />}>预览状态演示</CollapsibleTrigger><CollapsiblePanel keepMounted><Button disabled={!preview || previewMissing} onClick={() => { if (preview) { setDeletedIds((ids) => [...ids, preview.id]); setSelected((ids) => ids.filter((id) => id !== preview.id)); setPreviewMissing(true); } }} size="sm" variant="outline">重放预览对象消失</Button></CollapsiblePanel></Collapsible></DialogPanel></DialogPopup></Dialog>
    <FixtureSettings><div className="qy-task-fields"><Label htmlFor="collection-state">集合事实状态</Label><NativeSelect id="collection-state" onChange={(event) => { setCollectionState(event.target.value as typeof collectionState); setAccessRequested(false); }} value={collectionState}><NativeSelectOption value="populated">已有资料</NativeSelectOption><NativeSelectOption value="empty">初始空集合</NativeSelectOption><NativeSelectOption value="no-results">查询无结果</NativeSelectOption><NativeSelectOption value="forbidden">无访问权限</NativeSelectOption><NativeSelectOption value="failure">载入失败</NativeSelectOption></NativeSelect><p>集合、预览和详情只使用 Node 夹具白名单生成的同一授权 DTO；原始受限字段不会进入浏览器或公开响应。访问申请也只记录本地夹具事件，不是完整鉴权审计。</p></div><div className="qy-task-actions"><Button onClick={() => setCompact(!compact)} size="sm" variant="outline">{compact ? "标准" : "紧凑"}密度</Button><Button onClick={() => { search("林川", true); later(() => search("陈禾"), 50); }} size="sm" variant="outline">重放过期查询</Button><Button onClick={() => setSelected(resources.map((row) => row.id))} size="sm" variant="outline">选择全部五份夹具</Button></div><p>五项批量响应：三成功、一失败、一未知。最近安全重试 ID：{retried.join(", ") || "无"}；已忽略旧查询：{ignored}。选择在当前会话保留，刷新后的批量结果不作为真实保存记录。</p></FixtureSettings>
  </section>;
}
