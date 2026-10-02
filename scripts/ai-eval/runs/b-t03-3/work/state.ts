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
function nonEmpty(scope: Scope): boolean {
  return scope.kind === "ids" ? scope.ids.length > 0 : scope.total > 0;
}
export function currentScope(state: BulkState): Scope {
  return state.allMatching
    ? { kind: "query", query: state.query, total: state.total }
    : { kind: "ids", ids: canonicalIds(state.selectedIds) };
}
export function canExecute(state: BulkState): boolean {
  const scope = currentScope(state);
  return state.pending === null && nonEmpty(scope) && state.confirmation !== null
    && sameScope(state.confirmation, scope);
}
export function retryIds(state: BulkState): string[] {
  const excluded = new Set(state.results.filter((result) => result.kind !== "failure").map((result) => result.id));
  return canonicalIds(state.results
    .filter((result) => result.kind === "failure" && !excluded.has(result.id))
    .map((result) => result.id));
}
export function bulkReducer(state: BulkState, event: BulkEvent): BulkState {
  switch (event.type) {
    case "select":
      return sameIds(state.selectedIds, event.ids) ? state
        : { ...state, selectedIds: canonicalIds(event.ids), confirmation: null };
    case "query":
      return state.query === event.query && Object.is(state.total, event.total) ? state
        : { ...state, query: event.query, total: event.total, confirmation: null };
    case "all-matching":
      return state.allMatching === event.value ? state
        : { ...state, allMatching: event.value, confirmation: null };
    case "confirm":
      return { ...state, confirmation: currentScope(state) };
    case "start":
      return canExecute(state)
        ? { ...state, pending: { requestId: event.requestId, scope: currentScope(state) } }
        : state;
    case "result": {
      if (state.pending === null || state.pending.requestId !== event.requestId) return state;
      const scope = state.pending.scope;
      const incoming = event.results.map((result) => ({ ...result }));
      if (scope.kind === "query") return { ...state, pending: null, results: incoming };
      const requested = new Set(scope.ids);
      const replacements = incoming.filter((result) => requested.has(result.id));
      const reported = new Set(replacements.map((result) => result.id));
      for (const id of scope.ids) {
        if (!reported.has(id)) replacements.push({ id, kind: "unknown" });
      }
      return {
        ...state,
        pending: null,
        results: [...state.results.filter((result) => !requested.has(result.id)), ...replacements],
      };
    }
  }
}
