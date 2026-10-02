import type { BulkState, BulkEvent, Scope } from "../../../tasks/t03-bulk/state";
export type { Row, Scope, ItemResult } from "../../../tasks/t03-bulk/state";
const unique = (ids: string[]) => [...new Set(ids)].sort();
const same = (a: Scope | null, b: Scope) => a !== null && JSON.stringify(a) === JSON.stringify(b);
export function initialBulk(query: string, total: number): BulkState { return { selectedIds: [], query, total, allMatching: false, confirmation: null, pending: null, results: [] }; }
export function currentScope(state: BulkState): Scope { return state.allMatching ? { kind: "query", query: state.query, total: state.total } : { kind: "ids", ids: unique(state.selectedIds) }; }
export function canExecute(state: BulkState) { const scope = currentScope(state); return !state.pending && (scope.kind === "ids" ? scope.ids.length > 0 : scope.total > 0) && same(state.confirmation, scope); }
export function retryIds(state: BulkState) { return state.pending ? [] : unique(state.results.filter(r => r.kind === "failure").map(r => r.id)); }
export function bulkReducer(state: BulkState, event: BulkEvent): BulkState {
  if (event.type === "confirm") return { ...state, confirmation: structuredClone(currentScope(state)) };
  if (event.type === "start") return canExecute(state) ? { ...state, pending: { requestId: event.requestId, scope: structuredClone(currentScope(state)) } } : state;
  if (event.type === "result") {
    if (state.pending?.requestId !== event.requestId) return state;
    const replace = new Set(event.results.map(r => r.id));
    return { ...state, pending: null, confirmation: null, results: [...state.results.filter(r => !replace.has(r.id)), ...event.results] };
  }
  const next = event.type === "select" ? { ...state, selectedIds: unique(event.ids) } : event.type === "query" ? { ...state, query: event.query, total: event.total } : { ...state, allMatching: event.value };
  const changed = event.type === "query" ? event.query !== state.query || event.total !== state.total : event.type === "select" ? JSON.stringify(unique(event.ids)) !== JSON.stringify(unique(state.selectedIds)) : event.value !== state.allMatching;
  return changed ? { ...next, confirmation: null } : next;
}
