export type Row = { id: string; title: string };
export type Scope = { kind: "ids"; ids: string[] } | { kind: "query"; query: string; total: number };
export type ItemResult = { id: string; kind: "success" | "failure" | "unknown"; message?: string };
export type BulkState = {
  selectedIds: string[];
  query: string;
  total: number;
  allMatching: boolean;
  confirmation: Scope | null;
  pending: { requestId: string; scope: Scope } | null;
  results: ItemResult[];
};
export type BulkEvent =
  | { type: "select"; ids: string[] }
  | { type: "query"; query: string; total: number }
  | { type: "all-matching"; value: boolean }
  | { type: "confirm" }
  | { type: "start"; requestId: string }
  | { type: "result"; requestId: string; results: ItemResult[] };
export function initialBulk(query: string, total: number): BulkState {
  return { selectedIds: [], query, total, allMatching: false, confirmation: null, pending: null, results: [] };
}
export function currentScope(state: BulkState): Scope {
  return state.allMatching
    ? { kind: "query", query: state.query, total: state.total }
    : { kind: "ids", ids: sortedIds(state.selectedIds) };
}
function sortedIds(ids: string[]): string[] {
  return [...new Set(ids)].sort();
}
function sameScope(a: Scope, b: Scope): boolean {
  if (a.kind === "query" && b.kind === "query") {
    return a.query === b.query && a.total === b.total;
  }
  if (a.kind === "ids" && b.kind === "ids") {
    const left = sortedIds(a.ids);
    const right = sortedIds(b.ids);
    return left.length === right.length && left.every((id, index) => id === right[index]);
  }
  return false;
}
function copyScope(scope: Scope): Scope {
  return scope.kind === "ids" ? { kind: "ids", ids: [...scope.ids] } : { ...scope };
}
export function canExecute(state: BulkState): boolean {
  const scope = currentScope(state);
  const nonempty = scope.kind === "ids" ? scope.ids.length > 0 : scope.total > 0;
  return nonempty && state.pending === null && state.confirmation !== null && sameScope(scope, state.confirmation);
}
export function retryIds(state: BulkState): string[] {
  const failed = new Set(state.results.filter((result) => result.kind === "failure").map((result) => result.id));
  for (const result of state.results) {
    if (result.kind !== "failure") failed.delete(result.id);
  }
  return [...failed].sort();
}
function mergeResults(previous: ItemResult[], scope: Scope, incoming: ItemResult[]): ItemResult[] {
  const targetIds = scope.kind === "ids" ? new Set(scope.ids) : null;
  const received = new Map<string, ItemResult>();
  const rank = { failure: 0, success: 1, unknown: 2 };
  for (const result of incoming) {
    if (targetIds && !targetIds.has(result.id)) continue;
    const existing = received.get(result.id);
    // Conflicting duplicates must never turn an uncertain ID into a retry target.
    if (!existing || rank[result.kind] >= rank[existing.kind]) received.set(result.id, { ...result });
  }
  if (targetIds) {
    for (const id of targetIds) {
      if (!received.has(id)) received.set(id, { id, kind: "unknown", message: "未收到该项结果" });
    }
  }
  const merged = new Map<string, ItemResult>();
  for (const result of previous) {
    if (!targetIds?.has(result.id) && !received.has(result.id)) merged.set(result.id, { ...result });
  }
  for (const [id, result] of received) merged.set(id, result);
  return [...merged.values()].sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
}
export function bulkReducer(state: BulkState, event: BulkEvent): BulkState {
  switch (event.type) {
    case "select": {
      const selectedIds = sortedIds(event.ids);
      if (sameScope({ kind: "ids", ids: state.selectedIds }, { kind: "ids", ids: selectedIds })) return state;
      return { ...state, selectedIds, confirmation: null };
    }
    case "query":
      if (state.query === event.query && state.total === event.total) return state;
      return { ...state, query: event.query, total: event.total, confirmation: null };
    case "all-matching":
      if (state.allMatching === event.value) return state;
      return { ...state, allMatching: event.value, confirmation: null };
    case "confirm":
      return { ...state, confirmation: copyScope(currentScope(state)) };
    case "start":
      if (!canExecute(state)) return state;
      return { ...state, pending: { requestId: event.requestId, scope: copyScope(currentScope(state)) } };
    case "result":
      if (state.pending?.requestId !== event.requestId) return state;
      return { ...state, pending: null, results: mergeResults(state.results, state.pending.scope, event.results) };
  }
}
