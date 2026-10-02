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
function sortedIds(ids: string[]): string[] {
  return [...new Set(ids)].sort();
}
function copyScope(scope: Scope): Scope {
  return scope.kind === "ids" ? { kind: "ids", ids: sortedIds(scope.ids) } : { ...scope };
}
function sameScope(left: Scope, right: Scope): boolean {
  if (left.kind === "query" && right.kind === "query") {
    return left.query === right.query && left.total === right.total;
  }
  if (left.kind !== "ids" || right.kind !== "ids") return false;
  const a = sortedIds(left.ids);
  const b = sortedIds(right.ids);
  return a.length === b.length && a.every((id, index) => id === b[index]);
}
export function currentScope(state: BulkState): Scope {
  return state.allMatching
    ? { kind: "query", query: state.query, total: state.total }
    : { kind: "ids", ids: sortedIds(state.selectedIds) };
}
export function canExecute(state: BulkState): boolean {
  const scope = currentScope(state);
  const nonempty = scope.kind === "ids" ? scope.ids.length > 0 : scope.total > 0;
  return nonempty && state.pending === null && state.confirmation !== null && sameScope(state.confirmation, scope);
}
export function retryIds(state: BulkState): string[] {
  const excluded = new Set(state.results.filter((result) => result.kind !== "failure").map((result) => result.id));
  return sortedIds(state.results.filter((result) => result.kind === "failure" && !excluded.has(result.id)).map((result) => result.id));
}
export function bulkReducer(state: BulkState, event: BulkEvent): BulkState {
  switch (event.type) {
    case "select": {
      const ids = sortedIds(event.ids);
      if (sameScope({ kind: "ids", ids: state.selectedIds }, { kind: "ids", ids })) return state;
      return { ...state, selectedIds: ids, confirmation: null };
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
    case "result": {
      if (state.pending === null || state.pending.requestId !== event.requestId) return state;
      const scope = state.pending.scope;
      const requested = scope.kind === "ids" ? new Set(scope.ids) : null;
      const replacements = new Map<string, ItemResult>();
      for (const result of event.results) {
        if (requested === null || requested.has(result.id)) replacements.set(result.id, { ...result });
      }
      if (requested !== null) {
        for (const id of requested) {
          if (!replacements.has(id)) replacements.set(id, { id, kind: "unknown", message: "结果待确认" });
        }
      }
      const retained = state.results.filter((result) => requested === null ? !replacements.has(result.id) : !requested.has(result.id));
      return { ...state, pending: null, results: [...retained, ...replacements.values()] };
    }
  }
}
