import * as React from "react";
import { Button } from "@qingye/ui/components/button";
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
  const [state, dispatch] = React.useReducer(bulkReducer, undefined, () => {
    const selected = bulkReducer(initialBulk(query, total), { type: "select", ids: selectedIds });
    return bulkReducer(selected, { type: "all-matching", value: allMatching });
  });
  const stateRef = React.useRef(state);
  stateRef.current = state;
  const sequence = React.useRef(0);
  const selectionKey = JSON.stringify([...new Set(selectedIds)].sort());
  const external = React.useRef({ query, total, selectionKey, allMatching });
  const [queryUnknown, setQueryUnknown] = React.useState<{ query: string; count: number } | null>(null);
  const apply = React.useCallback((event: BulkEvent) => {
    const next = bulkReducer(stateRef.current, event);
    stateRef.current = next;
    dispatch(event);
    return next;
  }, []);
  React.useLayoutEffect(() => {
    const previous = external.current;
    if (previous.query !== query || previous.total !== total) apply({ type: "query", query, total });
    if (previous.selectionKey !== selectionKey) apply({ type: "select", ids: JSON.parse(selectionKey) as string[] });
    if (previous.allMatching !== allMatching) apply({ type: "all-matching", value: allMatching });
    external.current = { query, total, selectionKey, allMatching };
  }, [query, total, selectionKey, allMatching, apply]);

  async function execute() {
    if (!canExecute(stateRef.current)) return;
    const requestId = `bulk-${++sequence.current}`;
    const started = apply({ type: "start", requestId });
    if (started.pending === null || started.pending.requestId !== requestId) return;
    const captured = started.pending.scope;
    const scope: Scope = captured.kind === "ids" ? { kind: "ids", ids: [...captured.ids] } : { ...captured };
    try {
      const results = await api.archive({ scope, requestId });
      if (stateRef.current.pending?.requestId !== requestId) return;
      if (captured.kind === "query") {
        const missing = Math.max(0, captured.total - new Set(results.map((result) => result.id)).size);
        setQueryUnknown(missing > 0 ? { query: captured.query, count: missing } : null);
      }
      apply({ type: "result", requestId, results });
    } catch {
      if (stateRef.current.pending?.requestId !== requestId) return;
      if (captured.kind === "query") setQueryUnknown({ query: captured.query, count: captured.total });
      apply({
        type: "result",
        requestId,
        results: captured.kind === "ids" ? captured.ids.map((id) => ({ id, kind: "unknown", message: "请求未返回可靠结果" })) : [],
      });
    }
  }
  async function retry() {
    if (stateRef.current.pending !== null) return;
    const ids = retryIds(stateRef.current);
    if (ids.length === 0) return;
    apply({ type: "select", ids });
    apply({ type: "all-matching", value: false });
    apply({ type: "confirm" });
    await execute();
  }
  const scope = currentScope(state);
  const empty = scope.kind === "ids" ? scope.ids.length === 0 : scope.total <= 0;
  return <section aria-label="批量归档">
    <ul aria-label="当前页">{rows.map((row) => <li key={row.id}>{row.title}</li>)}</ul>
    <p data-testid="scope-summary">{scope.kind === "ids" ? `已选 ${scope.ids.length} 项` : `匹配 ${scope.total} 项`}</p>
    <Button onClick={() => apply({ type: "confirm" })} disabled={empty || state.pending !== null}>确认操作范围</Button>
    <Button onClick={() => void execute()} disabled={!canExecute(state)} aria-busy={state.pending !== null}>执行归档</Button>
    <Button onClick={() => void retry()} disabled={state.pending !== null || retryIds(state).length === 0}>重试失败项</Button>
    {state.pending !== null && <p role="status">正在归档，等待结果…</p>}
    {state.results.length > 0 && <ul aria-label="归档结果" aria-live="polite">
      {state.results.map((result) => <li key={result.id}>
        {rows.find((row) => row.id === result.id)?.title ?? result.id}：
        {result.kind === "success" ? "已归档" : result.kind === "failure" ? "归档失败" : "结果待确认"}
        {result.message && `（${result.message}）`}
      </li>)}
    </ul>}
    {queryUnknown !== null && <p role="status">{queryUnknown.count} 项结果待确认（查询：{queryUnknown.query || "全部匹配项"}）</p>}
  </section>;
}
