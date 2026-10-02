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
function canonicalIds(ids: string[]): string[] {
  return [...new Set(ids)].sort();
}
function snapshot(scope: Scope): Scope {
  return scope.kind === "ids"
    ? { kind: "ids", ids: [...scope.ids] }
    : { kind: "query", query: scope.query, total: scope.total };
}
function sameIds(left: string[], right: string[]): boolean {
  const a = canonicalIds(left);
  const b = canonicalIds(right);
  return a.length === b.length && a.every((id, index) => id === b[index]);
}
function sameScope(left: Scope, right: Scope): boolean {
  if (left.kind === "ids" && right.kind === "ids") return sameIds(left.ids, right.ids);
  return left.kind === "query" && right.kind === "query"
    && left.query === right.query && Object.is(left.total, right.total);
}
export function currentScope(state: BulkState): Scope {
  return state.allMatching
    ? { kind: "query", query: state.query, total: state.total }
    : { kind: "ids", ids: canonicalIds(state.selectedIds) };
}
export function canExecute(state: BulkState): boolean {
  if (state.pending || !state.confirmation) return false;
  const scope = currentScope(state);
  const nonempty = scope.kind === "ids" ? scope.ids.length > 0 : scope.total > 0;
  return nonempty && sameScope(scope, state.confirmation);
}
export function retryIds(state: BulkState): string[] {
  const excluded = new Set(state.results.filter((item) => item.kind !== "failure").map((item) => item.id));
  return canonicalIds(state.results.filter((item) => item.kind === "failure" && !excluded.has(item.id)).map((item) => item.id));
}
export function bulkReducer(state: BulkState, event: BulkEvent): BulkState {
  switch (event.type) {
    case "select":
      return sameIds(state.selectedIds, event.ids)
        ? state
        : { ...state, selectedIds: canonicalIds(event.ids), confirmation: null };
    case "query":
      return state.query === event.query && Object.is(state.total, event.total)
        ? state
        : { ...state, query: event.query, total: event.total, confirmation: null };
    case "all-matching":
      return state.allMatching === event.value
        ? state
        : { ...state, allMatching: event.value, confirmation: null };
    case "confirm":
      return { ...state, confirmation: snapshot(currentScope(state)) };
    case "start":
      return canExecute(state)
        ? { ...state, pending: { requestId: event.requestId, scope: snapshot(currentScope(state)) } }
        : state;
    case "result": {
      if (!state.pending || state.pending.requestId !== event.requestId) return state;
      const scope = state.pending.scope;
      const requestedIds = scope.kind === "ids" ? new Set(scope.ids) : null;
      const updates = new Map<string, ItemResult>();
      for (const item of event.results) {
        if (requestedIds && !requestedIds.has(item.id)) continue;
        const previous = updates.get(item.id);
        // Conflicting outcomes for one request cannot establish a known result.
        updates.set(item.id, previous && previous.kind !== item.kind
          ? { id: item.id, kind: "unknown" }
          : { ...item });
      }
      if (requestedIds) {
        for (const id of requestedIds) {
          if (!updates.has(id)) updates.set(id, { id, kind: "unknown" });
        }
      }
      return {
        ...state,
        pending: null,
        results: [
          ...state.results.filter((item) => !updates.has(item.id)),
          ...updates.values(),
        ],
      };
    }
  }
}
