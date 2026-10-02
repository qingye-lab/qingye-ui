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
  idle: "待上传",
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

function filesLocked(phase: UploadPhase) {
  return phase === "transmitting" || phase === "processing" || phase === "cancel-requested" || phase === "unknown";
}

function failureMessage(error: unknown) {
  return error instanceof Error ? error.message : "上传失败";
}

export function UploadPanel({ api, onComplete }: UploadPanelProps) {
  const [files, setFiles] = React.useState<File[]>([]);
  const [state, dispatch] = React.useReducer(uploadReducer, undefined, initialUpload);
  const sequence = React.useRef(0);
  const instanceId = React.useId();
  const filesRef = React.useRef<File[]>([]);
  const jobFile = React.useRef<File | null>(null);
  const stateRef = React.useRef(initialUpload());

  // Advance this guard synchronously, before React paints or any Promise settles.
  function send(event: UploadEvent) {
    const previous = stateRef.current;
    const next = uploadReducer(previous, event);
    stateRef.current = next;
    dispatch(event);
    return next !== previous;
  }

  function changeFiles(nextFiles: File[]) {
    if (filesLocked(stateRef.current.phase)) return;
    const next = nextFiles.slice(0, 1);
    filesRef.current = next;
    setFiles(next);
  }

  async function start() {
    const file = filesRef.current[0];
    if (!file || !canStart(stateRef.current.phase)) return;
    const jobId = `${instanceId}-upload-${++sequence.current}`;
    jobFile.current = file;
    send({ type: "start", jobId });

    try {
      await api.upload(file, jobId, (percent) => send({ type: "progress", jobId, percent }));
    } catch (error) {
      send({ type: "failure", jobId, message: failureMessage(error) });
      return;
    }

    // A cancellation may have arrived while the upload Promise was pending.
    if (!send({ type: "transmitted", jobId })) return;
    try {
      await api.process(jobId);
    } catch (error) {
      send({ type: "failure", jobId, message: failureMessage(error) });
      return;
    }

    if (send({ type: "processed", jobId })) onComplete(jobId);
  }

  async function cancel() {
    const jobId = stateRef.current.jobId;
    if (!jobId || !send({ type: "cancel-request" })) return;
    try {
      const result = await api.cancel(jobId);
      send({ type: "cancel-result", jobId, confirmed: result.confirmed });
    } catch {
      send({ type: "unknown", jobId });
    }
  }

  return <section aria-label="上传资料">
    <FileUpload
      files={files}
      onFilesChange={changeFiles}
      maxFiles={1}
      label="选择资料文件"
      disabled={filesLocked(state.phase)}
      getProgress={(file) => file === jobFile.current && state.phase === "transmitting" ? state.progress : null}
      getError={(file) => file === jobFile.current && state.phase === "error" ? state.error : null}
      renderActions={(file) => <Button
        variant="outline"
        size="sm"
        disabled={file !== jobFile.current || (state.phase !== "transmitting" && state.phase !== "processing")}
        onClick={() => void cancel()}
      >请求取消</Button>}
    />
    <p role="status">{phaseText[state.phase]}</p>
    {state.phase === "cancel-requested" ? <p>传输进度：{state.progress}%</p> : null}
    <Button onClick={() => void start()} disabled={files.length === 0 || !canStart(state.phase)}>开始上传</Button>
  </section>;
}
