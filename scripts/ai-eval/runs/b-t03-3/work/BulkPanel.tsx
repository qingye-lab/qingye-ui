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
    let initial = bulkReducer(initialBulk(query, total), { type: "select", ids: selectedIds });
    initial = bulkReducer(initial, { type: "all-matching", value: allMatching });
    return initial;
  });
  const stateRef = React.useRef(state);
  const sequence = React.useRef(0);
  const instanceId = React.useId();
  const [queryUnknown, setQueryUnknown] = React.useState(false);
  const selectionKey = JSON.stringify([...new Set(selectedIds)].sort());
  const send = React.useCallback((event: BulkEvent) => {
    const next = bulkReducer(stateRef.current, event);
    stateRef.current = next;
    dispatch(event);
    return next;
  }, []);

  React.useLayoutEffect(() => {
    send({ type: "query", query, total });
  }, [query, total, send]);
  React.useLayoutEffect(() => {
    const ids: string[] = JSON.parse(selectionKey);
    send({ type: "select", ids });
  }, [selectionKey, send]);
  React.useLayoutEffect(() => {
    send({ type: "all-matching", value: allMatching });
  }, [allMatching, send]);

  async function execute() {
    if (!canExecute(stateRef.current)) return;
    const requestId = `${instanceId}-archive-${++sequence.current}`;
    const started = send({ type: "start", requestId });
    if (started.pending?.requestId !== requestId) return;
    const captured = started.pending.scope;
    // The API receives its own copy so it cannot mutate the reducer's snapshot.
    const scope: Scope = captured.kind === "ids"
      ? { kind: "ids", ids: [...captured.ids] }
      : { ...captured };
    try {
      const results = await api.archive({ scope, requestId });
      if (stateRef.current.pending?.requestId !== requestId) return;
      if (captured.kind === "query") {
        setQueryUnknown(new Set(results.map((result) => result.id)).size < captured.total);
      }
      send({ type: "result", requestId, results });
    } catch {
      if (stateRef.current.pending?.requestId !== requestId) return;
      if (captured.kind === "query") setQueryUnknown(true);
      const results: ItemResult[] = captured.kind === "ids"
        ? captured.ids.map((id) => ({ id, kind: "unknown", message: "无法确认归档结果" }))
        : [];
      send({ type: "result", requestId, results });
    }
  }
  async function retry() {
    if (stateRef.current.pending !== null) return;
    const ids = retryIds(stateRef.current);
    if (ids.length === 0) return;
    send({ type: "all-matching", value: false });
    send({ type: "select", ids });
    send({ type: "confirm" });
    await execute();
  }
  const scope = currentScope(state);
  const pending = state.pending !== null;
  const emptyScope = scope.kind === "ids" ? scope.ids.length === 0 : !(scope.total > 0);
  return <section aria-label="批量归档">
    <ul aria-label="当前页">{rows.map((row) => <li key={row.id}>{row.title}</li>)}</ul>
    <p data-testid="scope-summary">{scope.kind === "ids" ? `已选 ${scope.ids.length} 项` : `匹配 ${scope.total} 项`}</p>
    <Button type="button" variant="outline" onClick={() => send({ type: "confirm" })} disabled={pending || emptyScope}>确认操作范围</Button>
    <Button type="button" onClick={() => void execute()} disabled={!canExecute(state)} loading={pending}>执行归档</Button>
    <Button type="button" variant="secondary" onClick={() => void retry()} disabled={pending || retryIds(state).length === 0}>重试失败项</Button>
    {pending && <p role="status">正在归档，请稍候…</p>}
    {queryUnknown && <p role="status">匹配集合的归档结果待确认</p>}
    <ul aria-label="归档结果" aria-live="polite">
      {state.results.map((result, index) => <li key={`${result.id}-${index}`}>
        {result.id}：{result.kind === "success" ? "归档成功" : result.kind === "failure" ? "归档失败" : "结果待确认"}
        {result.message && `（${result.message}）`}
      </li>)}
    </ul>
  </section>;
}
