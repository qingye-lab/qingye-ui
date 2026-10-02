import * as React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { test, expect, vi } from 'vitest';
import { initialUpload, uploadReducer } from '__STATE__';
import { UploadPanel } from '__VIEW__';
function deferred<T>() { let resolve!: (v: T) => void, reject!: (v: Error) => void; const promise = new Promise<T>((a, b) => { resolve = a; reject = b; }); return { promise, resolve, reject }; }
const file = new File(['pdf'], 'report.pdf', { type: 'application/pdf' });
function pick(container: HTMLElement) { fireEvent.change(container.querySelector('input[type="file"]')!, { target: { files: [file] } }); }

test('[false-success] 100 percent and transmission completion are not business completion', () => {
  let state = uploadReducer(initialUpload(), { type: 'start', jobId: 'j1' });
  state = uploadReducer(state, { type: 'progress', jobId: 'j1', percent: 150 }); expect(state.progress).toBe(100); expect(state.phase).toBe('transmitting');
  expect(uploadReducer(state, { type: 'progress', jobId: 'old', percent: 1 })).toEqual(state);
  state = uploadReducer(state, { type: 'transmitted', jobId: 'j1' }); expect(state.phase).toBe('processing');
  state = uploadReducer(state, { type: 'processed', jobId: 'j1' }); expect(state.phase).toBe('done');
});
test('[false-success] cancellation needs confirmation and ignores every late successful event', () => {
  let state = uploadReducer(initialUpload(), { type: 'start', jobId: 'j1' }); state = uploadReducer(state, { type: 'cancel-request' }); expect(state.phase).toBe('cancel-requested');
  for (const event of [{ type: 'progress', jobId: 'j1', percent: 100 }, { type: 'transmitted', jobId: 'j1' }, { type: 'processed', jobId: 'j1' }] as const) expect(uploadReducer(state, event)).toEqual(state);
  state = uploadReducer(state, { type: 'cancel-result', jobId: 'j1', confirmed: false }); expect(state.phase).toBe('unknown');
  expect(uploadReducer(state, { type: 'start', jobId: 'j2' })).toEqual(state);
});
test('[state-loss] confirmed cancel/error can restart with a distinct job and old events ignored', () => {
  let state = uploadReducer(initialUpload(), { type: 'start', jobId: 'j1' }); state = uploadReducer(state, { type: 'cancel-request' }); state = uploadReducer(state, { type: 'cancel-result', jobId: 'j1', confirmed: true }); expect(state.phase).toBe('cancelled');
  state = uploadReducer(state, { type: 'start', jobId: 'j2' }); expect(state.progress).toBe(0); expect(uploadReducer(state, { type: 'failure', jobId: 'j1', message: 'late error' })).toEqual(state);
  state = uploadReducer(state, { type: 'failure', jobId: 'j2', message: '处理失败' }); expect(state.error).toBe('处理失败'); state = uploadReducer(state, { type: 'start', jobId: 'j3' }); expect(state.error).toBeNull();
});
test('[api] real FileUpload slots retain the object and separate transmission/processing/done', async () => {
  const upload = deferred<void>(), process = deferred<void>(), api = { upload: vi.fn(() => upload.promise), process: vi.fn(() => process.promise), cancel: vi.fn() }, onComplete = vi.fn();
  const { container } = render(<UploadPanel api={api} onComplete={onComplete} />); expect(container.querySelector('[data-slot="file-upload"]')).toBeInTheDocument(); pick(container);
  fireEvent.click(screen.getByRole('button', { name: '开始上传' })); expect(api.upload).toHaveBeenCalledTimes(1); expect(api.upload.mock.calls[0]![0]).toBe(file);
  const jobId = api.upload.mock.calls[0]![1]; act(() => api.upload.mock.calls[0]![2](100)); expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100'); expect(screen.getByRole('status')).toHaveTextContent('传输中'); expect(onComplete).not.toHaveBeenCalled();
  expect(container.querySelector('[data-slot="file-upload-remove"]')).toBeDisabled(); expect(container.querySelector('[data-slot="file-upload-item"] button')).toHaveTextContent('请求取消');
  await act(async () => upload.resolve()); expect(screen.getByRole('status')).toHaveTextContent('处理中'); expect(api.process).toHaveBeenCalledWith(jobId); expect(onComplete).not.toHaveBeenCalled();
  await act(async () => process.resolve()); expect(screen.getByRole('status')).toHaveTextContent('处理完成'); expect(onComplete).toHaveBeenCalledExactlyOnceWith(jobId);
});
test('[false-success] late transport resolution after cancel request cannot start processing', async () => {
  const upload = deferred<void>(), cancel = deferred<{ confirmed: boolean }>(), api = { upload: vi.fn(() => upload.promise), process: vi.fn().mockResolvedValue(undefined), cancel: vi.fn(() => cancel.promise) }, onComplete = vi.fn();
  const { container } = render(<UploadPanel api={api} onComplete={onComplete} />); pick(container); fireEvent.click(screen.getByRole('button', { name: '开始上传' })); fireEvent.click(screen.getByRole('button', { name: /^请求取消(?:\s|$)/ }));
  expect(screen.getByRole('status')).toHaveTextContent('正在请求取消'); expect(screen.queryByText('已取消')).not.toBeInTheDocument();
  await act(async () => upload.resolve()); expect(api.process).not.toHaveBeenCalled(); expect(onComplete).not.toHaveBeenCalled();
  await act(async () => cancel.resolve({ confirmed: true })); expect(screen.getByRole('status')).toHaveTextContent('已取消'); expect(screen.getByText('report.pdf')).toBeInTheDocument(); expect(screen.getByRole('button', { name: '开始上传' })).toBeEnabled();
});
test('[false-success] processing finishes after cancellation but cannot notify completion', async () => {
  const process = deferred<void>(), api = { upload: vi.fn().mockResolvedValue(undefined), process: vi.fn(() => process.promise), cancel: vi.fn().mockResolvedValue({ confirmed: false }) }, onComplete = vi.fn();
  const { container } = render(<UploadPanel api={api} onComplete={onComplete} />); pick(container); fireEvent.click(screen.getByRole('button', { name: '开始上传' })); await screen.findByText('处理中');
  fireEvent.click(screen.getByRole('button', { name: /^请求取消(?:\s|$)/ })); await screen.findByText('结果待确认'); await act(async () => process.resolve());
  expect(onComplete).not.toHaveBeenCalled(); expect(screen.getByRole('status')).toHaveTextContent('结果待确认');
});
test('[state-loss] actual file error slot retains file and retry issues a new job', async () => {
  const api = { upload: vi.fn().mockRejectedValueOnce(new Error('传输中断')).mockResolvedValue(undefined), process: vi.fn().mockResolvedValue(undefined), cancel: vi.fn() }, onComplete = vi.fn();
  const { container } = render(<UploadPanel api={api} onComplete={onComplete} />); pick(container); fireEvent.click(screen.getByRole('button', { name: '开始上传' }));
  await screen.findByText('传输中断'); expect(container.querySelector('[data-slot="file-upload-item-error"]')).toHaveTextContent('传输中断'); expect(screen.getByText('report.pdf')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: '开始上传' })); await waitFor(() => expect(onComplete).toHaveBeenCalledTimes(1)); expect(api.upload.mock.calls[1]![1]).not.toBe(api.upload.mock.calls[0]![1]);
});
test('[false-success] cancelled transport rejection cannot become ordinary error', async () => {
  const upload = deferred<void>(), api = { upload: vi.fn(() => upload.promise), process: vi.fn(), cancel: vi.fn().mockRejectedValue(new Error('no cancel reply')) }, onComplete = vi.fn();
  const { container } = render(<UploadPanel api={api} onComplete={onComplete} />); pick(container); fireEvent.click(screen.getByRole('button', { name: '开始上传' })); fireEvent.click(screen.getByRole('button', { name: /^请求取消(?:\s|$)/ }));
  await screen.findByText('结果待确认'); await act(async () => upload.reject(new Error('late transport failure')));
  expect(screen.getByRole('status')).toHaveTextContent('结果待确认'); expect(container.querySelector('[data-slot="file-upload-item-error"]')).not.toBeInTheDocument(); expect(onComplete).not.toHaveBeenCalled();
});
