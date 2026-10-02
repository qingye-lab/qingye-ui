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
  const panelId = React.useId();
  const current = React.useRef(state);
  const selected = React.useRef<File[]>([]);
  const jobFile = React.useRef<File | null>(null);
  const mounted = React.useRef(true);
  React.useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);

  // Update the guard immediately, including before React renders a cancel request.
  function send(event: UploadEvent) {
    if (!mounted.current) return;
    current.current = uploadReducer(current.current, event);
    dispatch(event);
  }
  function isCurrent(jobId: string, phase: UploadPhase) {
    return mounted.current && current.current.jobId === jobId && current.current.phase === phase;
  }
  function canStart(phase: UploadPhase) {
    return phase === "idle" || phase === "error" || phase === "cancelled";
  }
  function isLocked(phase: UploadPhase) {
    return phase === "transmitting" || phase === "processing" || phase === "cancel-requested" || phase === "unknown";
  }
  function changeFiles(next: File[]) {
    if (isLocked(current.current.phase)) return;
    selected.current = next.slice(0, 1);
    setFiles(selected.current);
  }
  async function start() {
    const file = selected.current[0];
    if (!mounted.current || !file || !canStart(current.current.phase)) return;
    const jobId = `${panelId}-${++sequence.current}`;
    jobFile.current = file;
    send({ type: "start", jobId });
    try {
      await api.upload(file, jobId, (percent) => send({ type: "progress", jobId, percent }));
      if (!isCurrent(jobId, "transmitting")) return;
      send({ type: "transmitted", jobId });
      await api.process(jobId);
    } catch (error) {
      send({ type: "failure", jobId, message: error instanceof Error ? error.message : "上传失败" });
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
  const phaseText: Record<UploadPhase, string> = {
    idle: "等待上传",
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
      onFilesChange={changeFiles}
      maxFiles={1}
      label="选择资料文件"
      disabled={isLocked(state.phase)}
      getProgress={(file) => file === jobFile.current && state.phase === "transmitting" ? state.progress : null}
      getError={(file) => file === jobFile.current && state.phase === "error" ? state.error : null}
      renderActions={(file) => <Button
        type="button"
        aria-label={`请求取消 ${file.name}`}
        disabled={file !== jobFile.current || (state.phase !== "transmitting" && state.phase !== "processing")}
        onClick={() => void cancel()}
      >请求取消</Button>}
    />
    <p role="status">{phaseText[state.phase]}</p>
    {state.phase === "cancel-requested" ? <p>传输进度：{state.progress}%</p> : null}
    <Button type="button" onClick={() => void start()} disabled={files.length === 0 || !canStart(state.phase)}>开始上传</Button>
  </section>;
}
