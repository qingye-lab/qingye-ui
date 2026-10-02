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

const phaseText: Record<UploadPhase, string> = {
  idle: "",
  transmitting: "传输中",
  processing: "处理中",
  "cancel-requested": "正在请求取消",
  cancelled: "已取消",
  done: "处理完成",
  error: "上传失败",
  unknown: "结果待确认",
};

function canStart(phase: UploadPhase) {
  return phase === "idle" || phase === "error" || phase === "cancelled";
}

function isWaiting(phase: UploadPhase) {
  return phase === "transmitting" || phase === "processing" || phase === "cancel-requested" || phase === "unknown";
}

function failureMessage(error: unknown) {
  return error instanceof Error ? error.message : "上传失败";
}

export function UploadPanel({ api, onComplete }: UploadPanelProps) {
  const [files, setFiles] = React.useState<File[]>([]);
  const [state, dispatch] = React.useReducer(uploadReducer, undefined, initialUpload);
  const sequence = React.useRef(0);
  const currentState = React.useRef(state);
  const activeFile = React.useRef<File | null>(null);
  const cancelDuringTransmission = React.useRef(false);

  // Update the guard immediately, before React renders the queued state change.
  function send(event: UploadEvent) {
    currentState.current = uploadReducer(currentState.current, event);
    dispatch(event);
  }

  function isCurrent(jobId: string, phase: UploadPhase) {
    return currentState.current.jobId === jobId && currentState.current.phase === phase;
  }

  async function start() {
    const file = files[0];
    if (!file || !canStart(currentState.current.phase)) return;
    const jobId = `upload-${++sequence.current}`;
    activeFile.current = file;
    cancelDuringTransmission.current = false;
    send({ type: "start", jobId });
    try {
      await api.upload(file, jobId, (percent) => send({ type: "progress", jobId, percent }));
    } catch (error) {
      send({ type: "failure", jobId, message: failureMessage(error) });
      return;
    }
    if (!isCurrent(jobId, "transmitting")) return;
    send({ type: "transmitted", jobId });
    try {
      await api.process(jobId);
    } catch (error) {
      send({ type: "failure", jobId, message: failureMessage(error) });
      return;
    }
    if (!isCurrent(jobId, "processing")) return;
    send({ type: "processed", jobId });
    onComplete(jobId);
  }

  async function cancel() {
    const current = currentState.current;
    if (!current.jobId || (current.phase !== "transmitting" && current.phase !== "processing")) return;
    const jobId = current.jobId;
    cancelDuringTransmission.current = current.phase === "transmitting";
    send({ type: "cancel-request" });
    try {
      const result = await api.cancel(jobId);
      send({ type: "cancel-result", jobId, confirmed: result.confirmed });
    } catch {
      send({ type: "unknown", jobId });
    }
  }

  function changeFiles(nextFiles: File[]) {
    if (!isWaiting(currentState.current.phase)) setFiles(nextFiles.slice(0, 1));
  }

  const waiting = isWaiting(state.phase);
  const canCancel = state.phase === "transmitting" || state.phase === "processing";
  return <section aria-label="上传资料">
    <FileUpload
      files={files}
      onFilesChange={changeFiles}
      maxFiles={1}
      label="选择资料文件"
      disabled={waiting}
      getProgress={(file) => file === activeFile.current && state.phase === "transmitting" ? state.progress : undefined}
      getError={(file) => file === activeFile.current && state.phase === "error" ? state.error ?? undefined : undefined}
      renderActions={(file) => <Button
        type="button"
        disabled={!canCancel || file !== activeFile.current}
        onClick={() => void cancel()}
      >请求取消</Button>}
    />
    <p role="status">{phaseText[state.phase]}</p>
    {state.phase === "cancel-requested" && cancelDuringTransmission.current && <p>已传输 {state.progress}%</p>}
    <Button type="button" onClick={() => void start()} disabled={files.length === 0 || !canStart(state.phase)}>开始上传</Button>
  </section>;
}
