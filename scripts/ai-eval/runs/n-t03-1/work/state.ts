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

function normalizedIds(ids: string[]): string[] {
  return [...new Set(ids)].sort();
}

function sameIds(left: string[], right: string[]): boolean {
  const a = normalizedIds(left);
  const b = normalizedIds(right);
  return a.length === b.length && a.every((id, index) => id === b[index]);
}

function sameScope(left: Scope, right: Scope): boolean {
  if (left.kind === "ids" && right.kind === "ids") return sameIds(left.ids, right.ids);
  return left.kind === "query" && right.kind === "query"
    && left.query === right.query && left.total === right.total;
}

function snapshot(scope: Scope): Scope {
  return scope.kind === "ids"
    ? { kind: "ids", ids: normalizedIds(scope.ids) }
    : { kind: "query", query: scope.query, total: scope.total };
}

function distinctResults(results: ItemResult[]): ItemResult[] {
  const byId = new Map<string, ItemResult>();
  for (const result of results) {
    const previous = byId.get(result.id);
    // Contradictory outcomes do not establish whether the write completed.
    byId.set(result.id, previous && previous.kind !== result.kind
      ? { id: result.id, kind: "unknown", message: "返回结果不一致，结果待确认" }
      : { ...result });
  }
  return [...byId.values()].sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
}

export function currentScope(state: BulkState): Scope {
  return state.allMatching
    ? { kind: "query", query: state.query, total: state.total }
    : { kind: "ids", ids: normalizedIds(state.selectedIds) };
}

export function canExecute(state: BulkState): boolean {
  const scope = currentScope(state);
  const nonempty = scope.kind === "ids" ? scope.ids.length > 0 : scope.total > 0;
  return nonempty && state.pending === null && state.confirmation !== null
    && sameScope(state.confirmation, scope);
}

export function retryIds(state: BulkState): string[] {
  const resolvedOrUnknown = new Set(state.results
    .filter((result) => result.kind !== "failure")
    .map((result) => result.id));
  return normalizedIds(state.results
    .filter((result) => result.kind === "failure" && !resolvedOrUnknown.has(result.id))
    .map((result) => result.id));
}

export function bulkReducer(state: BulkState, event: BulkEvent): BulkState {
  switch (event.type) {
    case "select":
      return sameIds(state.selectedIds, event.ids) ? state : {
        ...state, selectedIds: normalizedIds(event.ids), confirmation: null,
      };
    case "query":
      return state.query === event.query && state.total === event.total ? state : {
        ...state, query: event.query, total: event.total, confirmation: null,
      };
    case "all-matching":
      return state.allMatching === event.value ? state : {
        ...state, allMatching: event.value, confirmation: null,
      };
    case "confirm":
      return { ...state, confirmation: snapshot(currentScope(state)) };
    case "start":
      if (!canExecute(state)) return state;
      return {
        ...state,
        confirmation: null,
        pending: { requestId: event.requestId, scope: snapshot(currentScope(state)) },
      };
    case "result": {
      if (state.pending?.requestId !== event.requestId) return state;
      const scope = state.pending.scope;
      if (scope.kind === "query") {
        return { ...state, pending: null, results: distinctResults(event.results) };
      }
      const requested = new Set(scope.ids);
      const returned = new Map(distinctResults(event.results
        .filter((result) => requested.has(result.id)))
        .map((result) => [result.id, result]));
      const replacements: ItemResult[] = scope.ids.map((id) => returned.get(id)
        ?? { id, kind: "unknown", message: "未收到该项结果，结果待确认" });
      return {
        ...state,
        pending: null,
        results: distinctResults([
          ...state.results.filter((result) => !requested.has(result.id)),
          ...replacements,
        ]),
      };
    }
  }
}
