import * as React from "react";
import { Button } from "@qingye/ui";
import { bulkReducer, canExecute, currentScope, initialBulk, retryIds, type ItemResult, type Row, type Scope } from "./state";
export type BulkPanelProps = { rows: Row[]; query: string; total: number; selectedIds: string[]; allMatching: boolean; api: { archive(input: { scope: Scope; requestId: string }): Promise<ItemResult[]> } };
export function BulkPanel({ rows, query, total, selectedIds, allMatching, api }: BulkPanelProps) {
  const [state, dispatch] = React.useReducer(bulkReducer, undefined, () => initialBulk(query, total));
  const sequence = React.useRef(0), busy = React.useRef(false);
  React.useEffect(() => { dispatch({ type: "query", query, total }); }, [query, total]);
  React.useEffect(() => { dispatch({ type: "select", ids: selectedIds }); }, [selectedIds]);
  React.useEffect(() => { dispatch({ type: "all-matching", value: allMatching }); }, [allMatching]);
  async function call(scope: Scope) {
    if (busy.current) return; busy.current = true; const requestId = `bulk-${++sequence.current}`;
    dispatch({ type: "start", requestId });
    try { dispatch({ type: "result", requestId, results: await api.archive({ scope, requestId }) }); }
    catch { dispatch({ type: "result", requestId, results: scope.kind === "ids" ? scope.ids.map(id => ({ id, kind: "unknown" })) : [{ id: `query:${scope.query}`, kind: "unknown" }] }); }
    finally { busy.current = false; }
  }
  async function execute() { if (canExecute(state)) await call(currentScope(state)); }
  async function retry() {
    const ids = retryIds(state); if (!ids.length || busy.current) return;
    dispatch({ type: "select", ids }); dispatch({ type: "all-matching", value: false }); dispatch({ type: "confirm" });
    await call({ kind: "ids", ids });
  }
  const scope = currentScope(state);
  return <section aria-label="批量归档"><ul aria-label="当前页">{rows.map(row => <li key={row.id}>{row.title}</li>)}</ul><p data-testid="scope-summary">{scope.kind === "ids" ? `已选 ${scope.ids.length} 项` : `匹配 ${scope.total} 项`}</p>
    <Button onClick={() => dispatch({ type: "confirm" })}>确认操作范围</Button><Button onClick={() => void execute()} disabled={!canExecute(state)}>执行归档</Button><Button onClick={() => void retry()} disabled={retryIds(state).length === 0}>重试失败项</Button>
    {state.pending && <p role="status">归档中</p>}{state.results.map(r => <p key={r.id}>{r.id}：{r.kind === "unknown" ? "结果待确认" : r.kind === "failure" ? r.message ?? "归档失败" : "归档完成"}</p>)}
  </section>;
}
