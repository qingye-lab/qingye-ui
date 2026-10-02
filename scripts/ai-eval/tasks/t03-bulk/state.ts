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
  // TODO: selected IDs are not derived from the currently visible rows.
  return { kind: "ids", ids: [] };
}
export function canExecute(state: BulkState): boolean { return false; }
export function retryIds(state: BulkState): string[] { return []; }
export function bulkReducer(state: BulkState, event: BulkEvent): BulkState {
  // TODO: confirmation belongs to an exact immutable scope.
  return state;
}
