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
  const [state, dispatch] = React.useReducer(bulkReducer, undefined, () => initialBulk(query, total));
  const sequence = React.useRef(0);
  // TODO: sync exact external scope changes, preserving off-page selection.
  async function execute() { void api; void sequence; }
  async function retry() { /* TODO: retry explicit failures only. */ }
  return <section aria-label="批量归档">
    <ul aria-label="当前页">{rows.map((row) => <li key={row.id}>{row.title}</li>)}</ul>
    <p data-testid="scope-summary">{/* TODO: selected count or all matching count. */}</p>
    <Button onClick={() => dispatch({ type: "confirm" })}>确认操作范围</Button>
    <Button onClick={() => void execute()} disabled={!canExecute(state)}>执行归档</Button>
    <Button onClick={() => void retry()} disabled={retryIds(state).length === 0}>重试失败项</Button>
    {/* TODO: inline partial/unknown outcomes. */}
  </section>;
}
