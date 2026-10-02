import * as React from "react";
import { Button, FileUpload } from "@qingye/ui";
import { initialUpload, uploadReducer } from "./state";
export type UploadPanelProps = { api: { upload(file: File, jobId: string, onProgress: (percent: number) => void): Promise<void>; process(jobId: string): Promise<void>; cancel(jobId: string): Promise<{ confirmed: boolean }> }; onComplete(jobId: string): void };
export function UploadPanel({ api, onComplete }: UploadPanelProps) {
  const [files, setFiles] = React.useState<File[]>([]);
  const [state, dispatch] = React.useReducer(uploadReducer, undefined, initialUpload);
  const current = React.useRef(state), sequence = React.useRef(0); current.current = state;
  function apply(event: Parameters<typeof uploadReducer>[1]) { current.current = uploadReducer(current.current, event); dispatch(event); }
  async function start() {
    const file = files[0]; if (!file || !["idle", "error", "cancelled"].includes(current.current.phase)) return;
    const jobId = `upload-${++sequence.current}`; apply({ type: "start", jobId });
    try {
      await api.upload(file, jobId, percent => apply({ type: "progress", jobId, percent }));
      if (current.current.jobId !== jobId || current.current.phase !== "transmitting") return;
      apply({ type: "transmitted", jobId }); await api.process(jobId);
      if (current.current.jobId !== jobId || !["processing"].includes(current.current.phase)) return;
      apply({ type: "processed", jobId }); onComplete(jobId);
    } catch (error) { apply({ type: "failure", jobId, message: error instanceof Error ? error.message : "上传失败" }); }
  }
  async function cancel() {
    const jobId = current.current.jobId; if (!jobId || !["transmitting", "processing"].includes(current.current.phase)) return;
    apply({ type: "cancel-request" });
    try { apply({ type: "cancel-result", jobId, confirmed: (await api.cancel(jobId)).confirmed }); }
    catch { apply({ type: "unknown", jobId }); }
  }
  const active = !["idle", "error", "cancelled"].includes(state.phase);
  const text = { idle: "请选择文件", transmitting: "传输中", processing: "处理中", "cancel-requested": "正在请求取消", cancelled: "已取消", done: "处理完成", error: "上传失败", unknown: "结果待确认" }[state.phase];
  return <section aria-label="上传资料"><FileUpload files={files} onFilesChange={setFiles} maxFiles={1} label="选择资料文件" disabled={active}
    getProgress={() => state.phase === "transmitting" ? state.progress : null} getError={() => state.phase === "error" ? state.error : null}
    renderActions={() => <Button type="button" disabled={!["transmitting", "processing"].includes(state.phase)} onClick={() => void cancel()}>请求取消</Button>} />
    <p role="status">{text}</p><Button onClick={() => void start()} disabled={!files.length || active}>开始上传</Button></section>;
}
