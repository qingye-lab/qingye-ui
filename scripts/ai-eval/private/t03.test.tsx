import * as React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { test, expect, vi } from 'vitest';
import { initialBulk, bulkReducer, currentScope, canExecute, retryIds } from '__STATE__';
import { BulkPanel } from '__VIEW__';
function selected() { return bulkReducer(initialBulk('tag:active', 30), { type: 'select', ids: ['c', 'a', 'c'] }); }
function deferred<T>() { let resolve!: (v: T) => void; const promise = new Promise<T>(a => { resolve = a; }); return { promise, resolve }; }
const rows = [{ id: 'a', title: '当前页 A' }];
// Accept either the supplied display title or the ID, and nested text spans.
// Find the smallest rendered element that associates that item with unknown.
function unknownFor(id: string) {
  const labels = [id, rows.find(row => row.id === id)?.title].filter(Boolean) as string[];
  const matches = (element: Element) => {
    const text = element.textContent ?? '';
    return text.includes('结果待确认') && labels.some(label => text.includes(label));
  };
  return screen.getAllByText((_content, element) => Boolean(element && matches(element) && ![...element.children].some(matches)));
}


test('[scope] IDs are stable, canonical and query-all captures the matching collection', () => {
  let state = selected(); expect(currentScope(state)).toEqual({ kind: 'ids', ids: ['a', 'c'] });
  state = bulkReducer(state, { type: 'all-matching', value: true }); expect(currentScope(state)).toEqual({ kind: 'query', query: 'tag:active', total: 30 });
});
test('[scope] actual scope changes invalidate confirmation; identical updates do not', () => {
  let state = bulkReducer(selected(), { type: 'confirm' }); expect(canExecute(state)).toBe(true);
  state = bulkReducer(state, { type: 'select', ids: ['a', 'c'] }); expect(canExecute(state)).toBe(true);
  state = bulkReducer(state, { type: 'select', ids: ['a'] }); expect(canExecute(state)).toBe(false);
  state = bulkReducer(state, { type: 'confirm' }); state = bulkReducer(state, { type: 'query', query: 'tag:new', total: 30 }); expect(canExecute(state)).toBe(false);
  state = bulkReducer(state, { type: 'all-matching', value: true }); state = bulkReducer(state, { type: 'confirm' });
  expect(canExecute(state)).toBe(true); state = bulkReducer(state, { type: 'query', query: 'tag:active', total: 31 }); expect(canExecute(state)).toBe(false);
  expect(state.selectedIds).toEqual(['a']);
});
test('[false-success] stale responses ignored and retry includes failures only', () => {
  let state = bulkReducer(bulkReducer(bulkReducer(selected(), { type: 'select', ids: ['a', 'c', 'z'] }), { type: 'confirm' }), { type: 'start', requestId: 'r1' }); expect(canExecute(state)).toBe(false);
  expect(bulkReducer(state, { type: 'result', requestId: 'old', results: [] })).toEqual(state);
  state = bulkReducer(state, { type: 'result', requestId: 'r1', results: [{ id: 'a', kind: 'success' }, { id: 'c', kind: 'failure' }, { id: 'z', kind: 'unknown' }] });
  expect(retryIds(state)).toEqual(['c']); // Post-result confirmation consumption was not specified; either policy is allowed.
  state = bulkReducer(state, { type: 'select', ids: ['c'] }); state = bulkReducer(state, { type: 'confirm' }); state = bulkReducer(state, { type: 'start', requestId: 'r2' });
  state = bulkReducer(state, { type: 'result', requestId: 'r2', results: [{ id: 'c', kind: 'success' }] });
  expect(state.results).toContainEqual({ id: 'z', kind: 'unknown' }); expect(state.results).toContainEqual({ id: 'a', kind: 'success' }); expect(retryIds(state)).toEqual([]);
});
test('[api] actual off-page IDs are submitted and retry cannot include unknown outcomes', async () => {
  const api = { archive: vi.fn().mockResolvedValueOnce([{ id: 'a', kind: 'success' }, { id: 'c', kind: 'failure' }, { id: 'z', kind: 'unknown' }]).mockResolvedValueOnce([{ id: 'c', kind: 'success' }]) };
  render(<BulkPanel rows={rows} query="q" total={30} selectedIds={['a', 'c', 'z']} allMatching={false} api={api} />);
  expect(screen.getByTestId('scope-summary')).toHaveTextContent('已选 3 项'); fireEvent.click(screen.getByRole('button', { name: '确认操作范围' })); fireEvent.click(screen.getByRole('button', { name: '执行归档' }));
  await waitFor(() => expect(api.archive).toHaveBeenCalledTimes(1)); expect(api.archive.mock.calls[0]![0].scope).toEqual({ kind: 'ids', ids: ['a', 'c', 'z'] });
  await screen.findAllByText(/结果待确认/); fireEvent.click(screen.getByRole('button', { name: '重试失败项' }));
  await waitFor(() => expect(api.archive).toHaveBeenCalledTimes(2)); expect(api.archive.mock.calls[1]![0].scope).toEqual({ kind: 'ids', ids: ['c'] });
  expect(unknownFor('z').length).toBeGreaterThan(0);
});
test('[scope] props scope changes require reconfirmation while row paging does not', async () => {
  const api = { archive: vi.fn().mockResolvedValue([]) }, props = { rows, query: 'q', total: 30, selectedIds: ['c'], allMatching: false, api };
  const view = render(<BulkPanel {...props} />); fireEvent.click(screen.getByRole('button', { name: '确认操作范围' })); expect(screen.getByRole('button', { name: '执行归档' })).toBeEnabled();
  view.rerender(<BulkPanel {...props} rows={[{ id: 'b', title: '另一页' }]} />); expect(screen.getByRole('button', { name: '执行归档' })).toBeEnabled();
  view.rerender(<BulkPanel {...props} selectedIds={['c', 'b']} />); expect(screen.getByRole('button', { name: '执行归档' })).toBeDisabled();
  view.rerender(<BulkPanel {...props} allMatching />); fireEvent.click(screen.getByRole('button', { name: '确认操作范围' })); fireEvent.click(screen.getByRole('button', { name: '执行归档' }));
  await waitFor(() => expect(api.archive).toHaveBeenCalled()); expect(api.archive.mock.calls[0]![0].scope).toEqual({ kind: 'query', query: 'q', total: 30 });
});
test('[false-success] network rejection is unknown and duplicate execution is blocked', async () => {
  const pending = deferred<any>(), api = { archive: vi.fn(() => pending.promise) };
  render(<BulkPanel rows={rows} query="q" total={2} selectedIds={['a', 'z']} allMatching={false} api={api} />);
  fireEvent.click(screen.getByRole('button', { name: '确认操作范围' })); fireEvent.click(screen.getByRole('button', { name: '执行归档' })); fireEvent.click(screen.getByRole('button', { name: '执行归档' })); expect(api.archive).toHaveBeenCalledTimes(1);
  await act(async () => pending.resolve([{ id: 'a', kind: 'unknown' }, { id: 'z', kind: 'unknown' }]));
  expect(unknownFor('a').length).toBeGreaterThan(0); expect(unknownFor('z').length).toBeGreaterThan(0); expect(screen.getByRole('button', { name: '重试失败项' })).toBeDisabled();
});
test('[false-success] rejected promise does not report IDs as success or retry them', async () => {
  const api = { archive: vi.fn().mockRejectedValue(new Error('lost reply')) };
  render(<BulkPanel rows={rows} query="q" total={2} selectedIds={['a', 'z']} allMatching={false} api={api} />);
  fireEvent.click(screen.getByRole('button', { name: '确认操作范围' })); fireEvent.click(screen.getByRole('button', { name: '执行归档' }));
  await waitFor(() => { expect(unknownFor('a').length).toBeGreaterThan(0); expect(unknownFor('z').length).toBeGreaterThan(0); }); expect(screen.queryByText(/归档完成/)).not.toBeInTheDocument(); expect(screen.getByRole('button', { name: '重试失败项' })).toBeDisabled();
});
