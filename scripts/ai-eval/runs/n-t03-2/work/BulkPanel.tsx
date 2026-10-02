import * as React from "react";
import { Button } from "@qingye/ui";
import { bulkReducer, canExecute, currentScope, initialBulk, retryIds, type BulkEvent, type ItemResult, type Row, type Scope } from "./state";

export type BulkPanelProps = {
  rows: Row[];
  query: string;
  total: number;
  selectedIds: string[];
  allMatching: boolean;
  api: { archive(input: { scope: Scope; requestId: string }): Promise<ItemResult[]> };
};
export function BulkPanel({ rows, query, total, selectedIds, allMatching, api }: BulkPanelProps) {
  const [state, dispatch] = React.useReducer(bulkReducer, undefined, () => ({
    ...initialBulk(query, total), selectedIds: [...new Set(selectedIds)].sort(), allMatching,
  }));
  const latest = React.useRef(state);
  const sequence = React.useRef(0);
  const [queryUnknown, setQueryUnknown] = React.useState<{ query: string; count: number } | null>(null);
  const send = React.useCallback((event: BulkEvent) => {
    latest.current = bulkReducer(latest.current, event);
    dispatch(event);
    return latest.current;
  }, []);
  const selectedKey = JSON.stringify([...new Set(selectedIds)].sort());
  // Only actual external changes synchronize each axis; a local retry owns its IDs.
  React.useLayoutEffect(() => {
    send({ type: "select", ids: JSON.parse(selectedKey) as string[] });
  }, [selectedKey, send]);
  React.useLayoutEffect(() => {
    send({ type: "query", query, total });
  }, [query, total, send]);
  React.useLayoutEffect(() => {
    send({ type: "all-matching", value: allMatching });
  }, [allMatching, send]);

  async function execute() {
    if (!canExecute(latest.current)) return;
    const requestId = `bulk-archive-${++sequence.current}`;
    const next = send({ type: "start", requestId });
    const pending = next.pending;
    if (pending === null || pending.requestId !== requestId) return;
    const scope = pending.scope;
    // The API receives its own copy so it cannot change the captured request scope.
    const apiScope: Scope = scope.kind === "ids" ? { kind: "ids", ids: [...scope.ids] } : { ...scope };
    try {
      const results = await api.archive({ scope: apiScope, requestId });
      if (latest.current.pending?.requestId !== requestId) return;
      if (scope.kind === "query") {
        const count = Math.max(0, scope.total - new Set(results.map((item) => item.id)).size);
        setQueryUnknown(count > 0 ? { query: scope.query, count } : null);
      }
      send({ type: "result", requestId, results });
    } catch {
      if (latest.current.pending?.requestId !== requestId) return;
      if (scope.kind === "query") setQueryUnknown({ query: scope.query, count: scope.total });
      send({ type: "result", requestId, results: scope.kind === "ids"
        ? scope.ids.map((id) => ({ id, kind: "unknown" as const, message: "请求未能确认写入结果" }))
        : [] });
    }
  }
  async function retry() {
    if (latest.current.pending !== null) return;
    const ids = retryIds(latest.current);
    if (ids.length === 0) return;
    send({ type: "all-matching", value: false });
    send({ type: "select", ids });
    send({ type: "confirm" });
    await execute();
  }
  const scope = currentScope(state);
  const nonempty = scope.kind === "ids" ? scope.ids.length > 0 : Number.isFinite(scope.total) && scope.total > 0;
  const successes = state.results.filter((item) => item.kind === "success").length;
  const failures = state.results.filter((item) => item.kind === "failure").length;
  const unknowns = state.results.filter((item) => item.kind === "unknown").length;
  const resultLabel = { success: "已归档", failure: "归档失败", unknown: "结果待确认" };
  return <section aria-label="批量归档">
    <ul aria-label="当前页">{rows.map((row) => <li key={row.id}>{row.title}</li>)}</ul>
    <p data-testid="scope-summary">{scope.kind === "query" ? `匹配 ${scope.total} 项` : `已选 ${scope.ids.length} 项`}</p>
    {scope.kind === "query" && <p>查询范围：{scope.query || "全部"}</p>}
    <Button onClick={() => send({ type: "confirm" })} disabled={state.pending !== null || !nonempty}>确认操作范围</Button>
    <Button onClick={() => void execute()} disabled={!canExecute(state)}>执行归档</Button>
    <Button onClick={() => void retry()} disabled={state.pending !== null || retryIds(state).length === 0}>重试失败项</Button>
    <div role="status" aria-live="polite" aria-atomic="true">
      {state.pending !== null && <p>正在归档 {state.pending.scope.kind === "ids" ? state.pending.scope.ids.length : state.pending.scope.total} 项，请等待结果。</p>}
      {state.pending === null && nonempty && <p>{canExecute(state) ? "操作范围已确认" : "请先确认操作范围"}</p>}
      {state.results.length > 0 && <p>已归档 {successes} 项；归档失败 {failures} 项；结果待确认 {unknowns} 项。</p>}
      {queryUnknown !== null && <p>上次匹配范围（{queryUnknown.query || "全部"}）另有 {queryUnknown.count} 项结果待确认。</p>}
    </div>
    {state.results.length > 0 && <ul aria-label="归档结果">{state.results.map((item) => <li key={item.id}>
      {item.id}：{resultLabel[item.kind]}{item.message ? `（${item.message}）` : ""}
    </li>)}</ul>}
  </section>;
}
