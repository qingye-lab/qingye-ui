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
  const live = React.useRef(state);
  live.current = state;
  const sequence = React.useRef(0);
  const instanceId = React.useId();
  const [unknownQuery, setUnknownQuery] = React.useState<Extract<Scope, { kind: "query" }> | null>(null);
  const selectedKey = JSON.stringify([...new Set(selectedIds)].sort());

  function send(event: BulkEvent) {
    live.current = bulkReducer(live.current, event);
    dispatch(event);
    return live.current;
  }

  // Observe semantic prop changes. An equivalent array does not overwrite the
  // local failure-only scope prepared by retry, or invalidate confirmation.
  React.useLayoutEffect(() => {
    send({ type: "select", ids: JSON.parse(selectedKey) as string[] });
  }, [selectedKey]);
  React.useLayoutEffect(() => {
    send({ type: "query", query, total });
  }, [query, total]);
  React.useLayoutEffect(() => {
    send({ type: "all-matching", value: allMatching });
  }, [allMatching]);

  async function execute() {
    if (!canExecute(live.current)) return;
    const requestId = `bulk-${instanceId}-${++sequence.current}`;
    const started = send({ type: "start", requestId });
    const request = started.pending;
    if (!request || request.requestId !== requestId) return;
    // API consumers receive their own copy, independent of the captured scope.
    const scope: Scope = request.scope.kind === "ids"
      ? { kind: "ids", ids: [...request.scope.ids] }
      : { ...request.scope };
    if (request.scope.kind === "query") setUnknownQuery(null);
    try {
      const results = await api.archive({ scope, requestId });
      if (live.current.pending?.requestId !== requestId) return;
      const completed = send({ type: "result", requestId, results });
      if (request.scope.kind === "query") {
        const returnedIds = new Set(completed.results.map((result) => result.id));
        if (returnedIds.size < request.scope.total) setUnknownQuery({ ...request.scope });
      }
    } catch {
      if (live.current.pending?.requestId !== requestId) return;
      const results: ItemResult[] = request.scope.kind === "ids"
        ? request.scope.ids.map((id) => ({ id, kind: "unknown", message: "请求未返回可确认的结果" }))
        : [];
      send({ type: "result", requestId, results });
      if (request.scope.kind === "query") setUnknownQuery({ ...request.scope });
    }
  }

  async function retry() {
    if (live.current.pending) return;
    const ids = retryIds(live.current);
    if (ids.length === 0) return;
    send({ type: "all-matching", value: false });
    send({ type: "select", ids });
    send({ type: "confirm" });
    await execute();
  }

  const scope = currentScope(state);
  const count = scope.kind === "ids" ? scope.ids.length : scope.total;
  const titles = new Map(rows.map((row) => [row.id, row.title]));
  return <section aria-label="批量归档" aria-busy={state.pending !== null}>
    <ul aria-label="当前页">{rows.map((row) => <li key={row.id}>{row.title}</li>)}</ul>
    <p data-testid="scope-summary">{scope.kind === "query" ? `匹配 ${count} 项` : `已选 ${count} 项`}</p>
    <Button onClick={() => send({ type: "confirm" })} disabled={count <= 0 || state.pending !== null}>确认操作范围</Button>
    <Button onClick={() => void execute()} disabled={!canExecute(state)}>执行归档</Button>
    <Button onClick={() => void retry()} disabled={state.pending !== null || retryIds(state).length === 0}>重试失败项</Button>
    <div aria-live="polite" aria-atomic="false">
      {state.confirmation && <p>操作范围已确认</p>}
      {state.pending && <p role="status">归档中，请稍候</p>}
      {unknownQuery && <p role="status">结果待确认：查询“{unknownQuery.query || "全部"}”匹配的 {unknownQuery.total} 项尚未收到完整结果。</p>}
      {state.results.length > 0 && <ul aria-label="归档结果">
        {state.results.map((result) => <li key={result.id}>
          <span>{titles.get(result.id) ?? result.id}：</span>
          <span>{result.kind === "success" ? "归档成功" : result.kind === "failure" ? "归档失败" : "结果待确认"}</span>
          {result.message && <span>（{result.message}）</span>}
        </li>)}
      </ul>}
    </div>
  </section>;
}
