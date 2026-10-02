import * as React from "react";
import { Button } from "@qingye/ui";
import { bulkReducer, canExecute, currentScope, initialBulk, retryIds, type ItemResult, type Row, type Scope } from "./state";

export type BulkPanelProps = {
  rows: Row[];
  query: string;
  total: number;
  selectedIds: string[];
  allMatching: boolean;
  api: { archive(input: { scope: Scope; requestId: string }): Promise<ItemResult[]> };
};
export function BulkPanel({ rows, query, total, selectedIds, allMatching, api }: BulkPanelProps) {
  const normalizedIds = [...new Set(selectedIds)].sort();
  const selectedKey = JSON.stringify(normalizedIds);
  const [state, dispatch] = React.useReducer(bulkReducer, undefined, () => ({
    ...initialBulk(query, total), selectedIds: normalizedIds, allMatching,
  }));
  const latest = React.useRef(state);
  const sequence = React.useRef(0);
  const [queryUnknown, setQueryUnknown] = React.useState<{ query: string; total: number; missing: number; rejected: boolean } | null>(null);
  // Updating the ref synchronously also guards clicks before React commits the pending state.
  const transition = React.useCallback((event: Parameters<typeof bulkReducer>[1]) => {
    latest.current = bulkReducer(latest.current, event);
    dispatch(event);
    return latest.current;
  }, []);
  React.useEffect(() => {
    transition({ type: "select", ids: JSON.parse(selectedKey) as string[] });
  }, [selectedKey, transition]);
  React.useEffect(() => {
    transition({ type: "query", query, total });
  }, [query, total, transition]);
  React.useEffect(() => {
    transition({ type: "all-matching", value: allMatching });
  }, [allMatching, transition]);

  async function execute() {
    if (!canExecute(latest.current)) return;
    const requestId = `bulk-${++sequence.current}`;
    const pending = transition({ type: "start", requestId }).pending;
    if (!pending || pending.requestId !== requestId) return;
    const scope = pending.scope;
    try {
      // The API receives its own copy and cannot mutate the confirmed/pending snapshot.
      const results = await api.archive({
        scope: scope.kind === "ids" ? { kind: "ids", ids: [...scope.ids] } : { ...scope }, requestId,
      });
      if (latest.current.pending?.requestId !== requestId) return;
      if (scope.kind === "query") {
        const missing = Math.max(0, scope.total - new Set(results.map((result) => result.id)).size);
        setQueryUnknown(missing > 0 ? { query: scope.query, total: scope.total, missing, rejected: false } : null);
      }
      transition({ type: "result", requestId, results });
    } catch {
      if (latest.current.pending?.requestId !== requestId) return;
      if (scope.kind === "query") {
        setQueryUnknown({ query: scope.query, total: scope.total, missing: scope.total, rejected: true });
      }
      transition({
        type: "result", requestId,
        results: scope.kind === "ids" ? scope.ids.map((id) => ({ id, kind: "unknown", message: "请求未返回可确认的结果" })) : [],
      });
    }
  }
  async function retry() {
    if (latest.current.pending) return;
    const ids = retryIds(latest.current);
    if (ids.length === 0) return;
    transition({ type: "select", ids });
    transition({ type: "all-matching", value: false });
    transition({ type: "confirm" });
    await execute();
  }
  const scope = currentScope(state);
  const empty = scope.kind === "ids" ? scope.ids.length === 0 : scope.total <= 0;
  const failures = retryIds(state);
  return <section aria-label="批量归档" aria-busy={Boolean(state.pending)}>
    <ul aria-label="当前页">{rows.map((row) => <li key={row.id}>{row.title}</li>)}</ul>
    <p data-testid="scope-summary">{scope.kind === "query" ? `匹配 ${scope.total} 项` : `已选 ${scope.ids.length} 项`}</p>
    {scope.kind === "query" && <p>查询：{scope.query || "全部记录"}</p>}
    <p>{state.confirmation ? "操作范围已确认" : "请先确认操作范围"}</p>
    <Button variant="outline" onClick={() => transition({ type: "confirm" })} disabled={empty || Boolean(state.pending)}>确认操作范围</Button>
    <Button onClick={() => void execute()} disabled={!canExecute(state)}>执行归档</Button>
    <Button variant="outline" onClick={() => void retry()} disabled={Boolean(state.pending) || failures.length === 0}>重试失败项</Button>
    <div role="status" aria-live="polite">
      {state.pending && <p>正在归档{state.pending.scope.kind === "query" ? `匹配 ${state.pending.scope.total} 项` : `${state.pending.scope.ids.length} 项`}，请等待结果。</p>}
      {queryUnknown && <p>查询“{queryUnknown.query || "全部记录"}”匹配 {queryUnknown.total} 项：{queryUnknown.rejected ? "归档结果待确认" : `${queryUnknown.missing} 项结果待确认`}。</p>}
      {state.results.length > 0 && <ul aria-label="归档结果">{state.results.map((result) => <li key={result.id}>
        {result.id}：{result.kind === "success" ? "已归档" : result.kind === "failure" ? "归档失败" : "结果待确认"}
        {result.message && `（${result.message}）`}
      </li>)}</ul>}
    </div>
  </section>;
}
