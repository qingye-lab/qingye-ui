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
function equalIds(left: string[], right: string[]): boolean {
  const a = sortedIds(left);
  const b = sortedIds(right);
  return a.length === b.length && a.every((id, index) => id === b[index]);
}
function equalScopes(left: Scope, right: Scope): boolean {
  if (left.kind === "ids" && right.kind === "ids") return equalIds(left.ids, right.ids);
  return left.kind === "query" && right.kind === "query"
    && left.query === right.query && Object.is(left.total, right.total);
}
function copyScope(scope: Scope): Scope {
  return scope.kind === "ids" ? { kind: "ids", ids: [...scope.ids] } : { ...scope };
}
export function canExecute(state: BulkState): boolean {
  const scope = currentScope(state);
  const nonempty = scope.kind === "ids" ? scope.ids.length > 0 : Number.isFinite(scope.total) && scope.total > 0;
  return nonempty && state.pending === null && state.confirmation !== null
    && equalScopes(state.confirmation, scope);
}
export function retryIds(state: BulkState): string[] {
  const excluded = new Set(state.results.filter((item) => item.kind !== "failure").map((item) => item.id));
  return sortedIds(state.results.filter((item) => item.kind === "failure" && !excluded.has(item.id)).map((item) => item.id));
}
export function bulkReducer(state: BulkState, event: BulkEvent): BulkState {
  switch (event.type) {
    case "select":
      return equalIds(state.selectedIds, event.ids) ? state
        : { ...state, selectedIds: sortedIds(event.ids), confirmation: null };
    case "query":
      return state.query === event.query && Object.is(state.total, event.total) ? state
        : { ...state, query: event.query, total: event.total, confirmation: null };
    case "all-matching":
      return state.allMatching === event.value ? state
        : { ...state, allMatching: event.value, confirmation: null };
    case "confirm":
      return { ...state, confirmation: copyScope(currentScope(state)) };
    case "start":
      return canExecute(state)
        ? { ...state, pending: { requestId: event.requestId, scope: copyScope(currentScope(state)) } }
        : state;
    case "result": {
      if (state.pending === null || state.pending.requestId !== event.requestId) return state;
      const scope = state.pending.scope;
      const incoming = new Map<string, ItemResult>();
      const allowedIds = scope.kind === "ids" ? new Set(scope.ids) : null;
      for (const item of event.results) {
        if (allowedIds === null || allowedIds.has(item.id)) incoming.set(item.id, { ...item });
      }
      // An omitted ID has no known write outcome, even if an earlier attempt did.
      if (scope.kind === "ids") {
        for (const id of scope.ids) {
          if (!incoming.has(id)) incoming.set(id, { id, kind: "unknown" });
        }
      }
      const results = new Map(state.results.map((item) => [item.id, item]));
      for (const [id, item] of incoming) results.set(id, item);
      return { ...state, pending: null, results: [...results.values()] };
    }
  }
}
