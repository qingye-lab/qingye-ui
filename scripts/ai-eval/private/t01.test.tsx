import * as React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { test, expect, vi } from 'vitest';
import { initialEditor, editorReducer, isDirty, canSave } from '__STATE__';
import { Editor } from '__VIEW__';
const document = { id: 'record-9', title: '旧标题', body: '旧正文', version: 4 };
function deferred<T>() { let resolve!: (value: T) => void, reject!: (error: Error) => void; const promise = new Promise<T>((a, b) => { resolve = a; reject = b; }); return { promise, resolve, reject }; }
function changed() { return editorReducer(initialEditor(document), { type: 'edit', field: 'title', value: '新标题' }); }

test('[state-loss] reducer retains an error draft and permits an intentional retry', () => {
  let state = changed(); expect(isDirty(state)).toBe(true); expect(canSave(state)).toBe(true);
  state = editorReducer(state, { type: 'save-start', requestId: 'r1' });
  expect(canSave(state)).toBe(false); expect(state.pending?.draft.title).toBe('新标题');
  state = editorReducer(state, { type: 'save-result', requestId: 'r1', result: { kind: 'error', message: '版本冲突' } });
  expect(state.draft.title).toBe('新标题'); expect(state.error).toBe('版本冲突'); expect(canSave(state)).toBe(true); expect(state.pending).toBeNull();
});
test('[state-loss] late save response preserves newer typing and ignores stale requests', () => {
  let state = editorReducer(changed(), { type: 'save-start', requestId: 'r1' });
  state = editorReducer(state, { type: 'edit', field: 'body', value: '未提交的新正文' });
  const unchanged = editorReducer(state, { type: 'save-result', requestId: 'old', result: { kind: 'saved', document } });
  expect(unchanged).toEqual(state);
  state = editorReducer(state, { type: 'save-result', requestId: 'r1', result: { kind: 'saved', document: { ...document, title: '新标题', version: 5 } } });
  expect(state.base.version).toBe(5); expect(state.draft.body).toBe('未提交的新正文'); expect(isDirty(state)).toBe(true);
});
test('[false-success] unknown retains request identity and blocks duplicate writes', () => {
  let state = editorReducer(changed(), { type: 'save-start', requestId: 'r1' });
  state = editorReducer(state, { type: 'save-result', requestId: 'r1', result: { kind: 'unknown' } });
  expect(state.phase).toBe('unknown'); expect(state.pending?.requestId).toBe('r1'); expect(canSave(state)).toBe(false);
  expect(editorReducer(state, { type: 'save-start', requestId: 'r2' })).toEqual(state);
  state = editorReducer(state, { type: 'save-result', requestId: 'r1', result: { kind: 'saved', document: { ...document, title: '规范化标题', version: 5 } } });
  expect(state.draft.title).toBe('规范化标题'); expect(isDirty(state)).toBe(false); expect(state.phase).toBe('saved');
});
test('[api] real fields call API with draft/version, preserve focus and later edits', async () => {
  const pending = deferred<any>(), save = vi.fn(() => pending.promise), onSaved = vi.fn();
  const { container } = render(<Editor document={document} api={{ save, check: vi.fn() }} onSaved={onSaved} onBack={vi.fn()} />);
  expect(container.querySelectorAll('[data-slot="field"]').length).toBe(2);
  fireEvent.change(screen.getByLabelText('标题'), { target: { value: '新标题' } });
  fireEvent.click(screen.getByRole('button', { name: '保存资料' })); fireEvent.click(screen.getByRole('button', { name: '保存资料' }));
  expect(save).toHaveBeenCalledTimes(1); expect(save.mock.calls[0]![0]).toMatchObject({ id: document.id, version: 4, draft: { title: '新标题', body: '旧正文' } });
  const body = screen.getByLabelText('正文'); body.focus(); fireEvent.change(body, { target: { value: '输入仍在继续' } });
  await act(async () => pending.resolve({ kind: 'saved', document: { ...document, title: '新标题', version: 5 } }));
  expect(body).toHaveValue('输入仍在继续'); expect(body).toHaveFocus(); expect(onSaved).toHaveBeenCalledTimes(1);
});
test('[state-loss] returned draft and inline error remain usable', async () => {
  const save = vi.fn().mockResolvedValue({ kind: 'error', message: '权限已变化' }), onBack = vi.fn(), onSaved = vi.fn();
  render(<Editor document={document} api={{ save, check: vi.fn() }} onSaved={onSaved} onBack={onBack} />);
  fireEvent.change(screen.getByLabelText('标题'), { target: { value: '我的草稿' } }); fireEvent.click(screen.getByRole('button', { name: '保存资料' }));
  expect(await screen.findByRole('alert')).toHaveTextContent('权限已变化'); expect(screen.getByLabelText('标题')).toHaveValue('我的草稿');
  expect(screen.getByRole('button', { name: '保存资料' })).toBeEnabled(); fireEvent.click(screen.getByRole('button', { name: '返回列表' }));
  expect(onBack).toHaveBeenCalledWith({ draft: { title: '我的草稿', body: '旧正文' }, dirty: true }); expect(onSaved).not.toHaveBeenCalled();
});
test('[false-success] rejected transport is unknown until a real check confirms success', async () => {
  const save = vi.fn().mockRejectedValue(new Error('connection lost')), check = vi.fn().mockResolvedValue({ kind: 'saved', document: { ...document, title: '改后', version: 5 } }), onSaved = vi.fn();
  render(<Editor document={document} api={{ save, check }} onSaved={onSaved} onBack={vi.fn()} />);
  fireEvent.change(screen.getByLabelText('标题'), { target: { value: '改后' } }); fireEvent.click(screen.getByRole('button', { name: '保存资料' }));
  expect(await screen.findByText('结果待确认')).toBeInTheDocument(); expect(onSaved).not.toHaveBeenCalled(); expect(screen.getByRole('button', { name: '保存资料' })).toBeDisabled();
  fireEvent.click(screen.getByRole('button', { name: '查询保存结果' })); await waitFor(() => expect(onSaved).toHaveBeenCalledTimes(1));
  expect(check).toHaveBeenCalledWith(save.mock.calls[0]![0].requestId); expect(save).toHaveBeenCalledTimes(1);
});
test('[false-success] failed query remains unknown and does not clear the working draft', async () => {
  const save = vi.fn().mockResolvedValue({ kind: 'unknown' }), check = vi.fn().mockRejectedValue(new Error('offline')), onSaved = vi.fn();
  render(<Editor document={document} api={{ save, check }} onSaved={onSaved} onBack={vi.fn()} />);
  fireEvent.change(screen.getByLabelText('正文'), { target: { value: '尚未确认' } }); fireEvent.click(screen.getByRole('button', { name: '保存资料' }));
  await screen.findByText('结果待确认'); fireEvent.click(screen.getByRole('button', { name: '查询保存结果' }));
  await waitFor(() => expect(check).toHaveBeenCalledTimes(1)); expect(screen.getByLabelText('正文')).toHaveValue('尚未确认'); expect(onSaved).not.toHaveBeenCalled();
});
