import * as React from "react";
import { Button, FileUpload } from "@qingye/ui";
import { initialUpload, uploadReducer } from "./state";
import type { UploadEvent, UploadPhase } from "./state";

const phaseText: Record<UploadPhase, string> = {
  idle: "待上传",
  transmitting: "传输中",
  processing: "处理中",
  "cancel-requested": "正在请求取消",
  cancelled: "已取消",
  done: "处理完成",
  error: "上传失败",
  unknown: "结果待确认",
};

export type UploadPanelProps = {
  api: {
    upload(file: File, jobId: string, onProgress: (percent: number) => void): Promise<void>;
    process(jobId: string): Promise<void>;
    cancel(jobId: string): Promise<{ confirmed: boolean }>;
  };
  onComplete(jobId: string): void;
};
export function UploadPanel({ api, onComplete }: UploadPanelProps) {
  const [files, setFiles] = React.useState<File[]>([]);
  const [state, dispatch] = React.useReducer(uploadReducer, undefined, initialUpload);
  const sequence = React.useRef(0);
  // Update this reference before dispatch so an in-flight promise observes a
  // cancellation immediately, including before React renders the new phase.
  const current = React.useRef(state);
  const mounted = React.useRef(true);
  React.useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);
  function send(event: UploadEvent) {
    if (!mounted.current) return current.current;
    current.current = uploadReducer(current.current, event);
    dispatch(event);
    return current.current;
  }
  function active(jobId: string, phase: UploadPhase) {
    return mounted.current && current.current.jobId === jobId && current.current.phase === phase;
  }
  async function start() {
    const file = files[0];
    if (!file || !["idle", "error", "cancelled"].includes(current.current.phase)) return;
    const jobId = `upload-${++sequence.current}`;
    send({ type: "start", jobId });
    try {
      await api.upload(file, jobId, (percent) => send({ type: "progress", jobId, percent }));
      if (!active(jobId, "transmitting")) return;
      send({ type: "transmitted", jobId });
      await api.process(jobId);
      if (!active(jobId, "processing")) return;
    } catch (error) {
      send({ type: "failure", jobId, message: error instanceof Error ? error.message : "上传失败" });
      return;
    }
    const completed = send({ type: "processed", jobId });
    if (mounted.current && completed.jobId === jobId && completed.phase === "done") onComplete(jobId);
  }
  async function cancel() {
    const snapshot = current.current;
    if (!snapshot.jobId || (snapshot.phase !== "transmitting" && snapshot.phase !== "processing")) return;
    const jobId = snapshot.jobId;
    send({ type: "cancel-request" });
    try {
      const result = await api.cancel(jobId);
      send({ type: "cancel-result", jobId, confirmed: result.confirmed });
    } catch {
      send({ type: "unknown", jobId });
    }
  }
  const canStart = files.length > 0 && ["idle", "error", "cancelled"].includes(state.phase);
  const canCancel = state.phase === "transmitting" || state.phase === "processing";
  const locked = canCancel || state.phase === "cancel-requested" || state.phase === "unknown";
  function changeFiles(nextFiles: File[]) {
    const phase = current.current.phase;
    if (phase === "transmitting" || phase === "processing" || phase === "cancel-requested" || phase === "unknown") return;
    setFiles(nextFiles);
  }
  return <section aria-label="上传资料">
    <FileUpload
      files={files}
      onFilesChange={changeFiles}
      maxFiles={1}
      disabled={locked}
      label="选择资料文件"
      getProgress={(file) => file === files[0] && state.phase === "transmitting" ? state.progress : undefined}
      getError={(file) => file === files[0] && state.phase === "error" ? state.error ?? "上传失败" : undefined}
      renderActions={(file) => <Button type="button" disabled={!canCancel || file !== files[0]} onClick={() => void cancel()}>请求取消</Button>}
    />
    <p role="status">{phaseText[state.phase]}</p>
    {state.phase === "cancel-requested" && <p>已传输 {state.progress}%</p>}
    <Button type="button" onClick={() => void start()} disabled={!canStart}>开始上传</Button>
  </section>;
}
