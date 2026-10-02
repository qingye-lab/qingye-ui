import * as React from "react";
import { Button } from "@qingye/ui/components/button";
import { bulkReducer, canExecute, currentScope, initialBulk, retryIds, type BulkState, type ItemResult, type Row, type Scope } from "./state";

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
    let initial = bulkReducer(initialBulk(query, total), { type: "select", ids: selectedIds });
    initial = bulkReducer(initial, { type: "all-matching", value: allMatching });
    return initial;
  });
  const sequence = React.useRef(0);
  const requestPrefix = React.useId();
  const inFlight = React.useRef<string | null>(null);
  const [unknownQuery, setUnknownQuery] = React.useState<{ query: string; total: number } | null>(null);
  const selectedKey = JSON.stringify([...new Set(selectedIds)].sort());
  React.useEffect(() => {
    dispatch({ type: "select", ids: JSON.parse(selectedKey) as string[] });
  }, [selectedKey]);
  React.useEffect(() => {
    dispatch({ type: "query", query, total });
  }, [query, total]);
  React.useEffect(() => {
    dispatch({ type: "all-matching", value: allMatching });
  }, [allMatching]);

  async function submit(prepared: BulkState) {
    if (inFlight.current || !canExecute(prepared)) return;
    const requestId = `${requestPrefix}-archive-${++sequence.current}`;
    const scope = currentScope(prepared);
    inFlight.current = requestId;
    dispatch({ type: "start", requestId });
    try {
      const inputScope: Scope = scope.kind === "ids"
        ? { kind: "ids", ids: [...scope.ids] }
        : { ...scope };
      const results = await api.archive({ scope: inputScope, requestId });
      if (inFlight.current !== requestId) return;
      dispatch({ type: "result", requestId, results });
      if (scope.kind === "query") {
        const returnedIds = new Set(results.map((item) => item.id));
        setUnknownQuery(returnedIds.size < scope.total ? { query: scope.query, total: scope.total } : null);
      }
    } catch {
      if (inFlight.current !== requestId) return;
      dispatch({
        type: "result",
        requestId,
        results: scope.kind === "ids" ? scope.ids.map((id) => ({ id, kind: "unknown" })) : [],
      });
      if (scope.kind === "query") setUnknownQuery({ query: scope.query, total: scope.total });
    } finally {
      if (inFlight.current === requestId) inFlight.current = null;
    }
  }
  async function execute() { await submit(state); }
  async function retry() {
    if (state.pending || inFlight.current) return;
    const ids = retryIds(state);
    if (ids.length === 0) return;
    const selection = { type: "select", ids } as const;
    const matching = { type: "all-matching", value: false } as const;
    let prepared = bulkReducer(state, matching);
    prepared = bulkReducer(prepared, selection);
    prepared = bulkReducer(prepared, { type: "confirm" });
    dispatch(matching);
    dispatch(selection);
    dispatch({ type: "confirm" });
    await submit(prepared);
  }
  const scope = currentScope(state);
  const empty = scope.kind === "ids" ? scope.ids.length === 0 : scope.total <= 0;
  const failures = retryIds(state);
  return <section aria-label="批量归档">
    <ul aria-label="当前页">{rows.map((row) => <li key={row.id}>{row.title}</li>)}</ul>
    <p data-testid="scope-summary">{scope.kind === "ids" ? `已选 ${scope.ids.length} 项` : `匹配 ${scope.total} 项`}</p>
    <Button type="button" variant="outline" onClick={() => dispatch({ type: "confirm" })} disabled={empty || state.pending !== null}>确认操作范围</Button>
    <Button type="button" onClick={() => void execute()} disabled={!canExecute(state)} loading={state.pending !== null}>执行归档</Button>
    <Button type="button" variant="secondary" onClick={() => void retry()} disabled={state.pending !== null || failures.length === 0}>重试失败项</Button>
    <div aria-live="polite" aria-atomic="false">
      {state.pending && <p role="status">正在归档，请等待…</p>}
      {unknownQuery && <p>匹配 {unknownQuery.total} 项的归档结果待确认{unknownQuery.query ? `（查询：${unknownQuery.query}）` : ""}。</p>}
      {state.results.length > 0 && <ul aria-label="归档结果">{state.results.map((item) => {
        const label = rows.find((row) => row.id === item.id)?.title ?? item.id;
        const outcome = item.kind === "success" ? "归档成功" : item.kind === "failure" ? "归档失败" : "结果待确认";
        return <li key={item.id}>{label}：{outcome}{item.message ? `，${item.message}` : ""}</li>;
      })}</ul>}
    </div>
  </section>;
}
