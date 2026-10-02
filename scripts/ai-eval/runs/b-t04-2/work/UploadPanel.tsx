import * as React from "react";
import { Button, FileUpload } from "@qingye/ui";
import { initialUpload, uploadReducer, type UploadEvent, type UploadPhase } from "./state";

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
  const instanceId = React.useId();
  const current = React.useRef(state);
  const mounted = React.useRef(true);

  React.useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);

  function send(event: UploadEvent) {
    if (!mounted.current) return current.current;
    const next = uploadReducer(current.current, event);
    current.current = next;
    dispatch(event);
    return next;
  }

  function isCurrent(jobId: string, phase: UploadPhase) {
    return mounted.current && current.current.jobId === jobId && current.current.phase === phase;
  }

  async function start() {
    const file = files[0];
    const phase = current.current.phase;
    if (!mounted.current || !file || (phase !== "idle" && phase !== "error" && phase !== "cancelled")) return;
    const jobId = `${instanceId}-${++sequence.current}`;
    send({ type: "start", jobId });
    try {
      await api.upload(file, jobId, (percent) => { send({ type: "progress", jobId, percent }); });
      if (!isCurrent(jobId, "transmitting")) return;
      send({ type: "transmitted", jobId });
      await api.process(jobId);
    } catch (error) {
      send({ type: "failure", jobId, message: error instanceof Error && error.message ? error.message : "上传失败" });
      return;
    }
    if (!isCurrent(jobId, "processing")) return;
    send({ type: "processed", jobId });
    onComplete(jobId);
  }

  async function cancel() {
    const { jobId, phase } = current.current;
    if (!mounted.current || jobId === null || (phase !== "transmitting" && phase !== "processing")) return;
    send({ type: "cancel-request" });
    try {
      const result = await api.cancel(jobId);
      send({ type: "cancel-result", jobId, confirmed: result.confirmed });
    } catch {
      send({ type: "unknown", jobId });
    }
  }

  const canStart = state.phase === "idle" || state.phase === "error" || state.phase === "cancelled";
  const canCancel = state.phase === "transmitting" || state.phase === "processing";
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
  return <section aria-label="上传资料">
    <FileUpload
      files={files}
      onFilesChange={(nextFiles) => {
        const phase = current.current.phase;
        if (phase === "idle" || phase === "error" || phase === "cancelled") setFiles(nextFiles.slice(0, 1));
      }}
      maxFiles={1}
      label="选择资料文件"
      disabled={!canStart}
      getProgress={(file) => file === files[0] && state.phase === "transmitting" ? state.progress : undefined}
      getError={(file) => file === files[0] && state.phase === "error" ? state.error ?? undefined : undefined}
      renderActions={(file) => <Button type="button" onClick={() => void cancel()} disabled={file !== files[0] || !canCancel}>请求取消</Button>}
    />
    <p role="status">{phaseText[state.phase]}</p>
    {state.phase === "cancel-requested" && <p>已传输 {state.progress}%</p>}
    <Button type="button" onClick={() => void start()} disabled={files.length === 0 || !canStart}>开始上传</Button>
  </section>;
}
